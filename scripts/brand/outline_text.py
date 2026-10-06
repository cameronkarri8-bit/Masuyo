"""
Turn a string set in Albert Sans Extra Bold into SVG path data.

Used once to produce the wordmark and the monogram, so the logo files carry no
font dependency and render identically everywhere. The font is shaped with
HarfBuzz, so kerning between letters comes from the font itself rather than
from a guess.

The output is JSON: one path for the letters, one for the final full stop (so
the dot can take its own colour), and the ink bounds of each.

Usage:
    python3 -I scripts/brand/outline_text.py "masuyo." > out.json

Needs: fonttools, uharfbuzz. Font: scripts/brand/fonts/AlbertSans[wght].ttf,
from github.com/google/fonts, licensed under the OFL (see OFL.txt beside it).
"""

import io
import json
import sys
from pathlib import Path

import uharfbuzz as hb
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

FONT = Path(__file__).parent / "fonts" / "AlbertSans[wght].ttf"
WEIGHT = 800  # Extra Bold, as the brand guide specifies for the wordmark

# Minus 4% tracking, the display setting from the type page of the guide.
# Measured from the guide itself: on the cover each glyph of the wordmark sits
# exactly 0.04 em further left than the font's own advances and kerning put it,
# so the wordmark is display type, tracked like every other display line.
TRACKING_EM = -0.04


def static_instance() -> tuple[TTFont, bytes]:
    vf = TTFont(FONT)
    static = instantiateVariableFont(vf, {"wght": WEIGHT})
    buf = io.BytesIO()
    static.save(buf)
    data = buf.getvalue()
    return TTFont(io.BytesIO(data)), data


def outline(text: str) -> dict:
    font, data = static_instance()
    upm = font["head"].unitsPerEm
    glyph_set = font.getGlyphSet()
    order = font.getGlyphOrder()

    face = hb.Face(data)
    hb_font = hb.Font(face)
    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()
    hb.shape(hb_font, buf, {"kern": True, "liga": False})

    tracking = TRACKING_EM * upm
    pieces = []
    x = 0
    for i, (info, pos) in enumerate(zip(buf.glyph_infos, buf.glyph_positions)):
        name = order[info.codepoint]
        pieces.append((name, x + pos.x_offset, pos.y_offset))
        x += pos.x_advance
        if i < len(buf.glyph_infos) - 1:
            x += tracking

    def draw(subset):
        svg = SVGPathPen(glyph_set)
        bounds = BoundsPen(glyph_set)
        for name, gx, gy in subset:
            # Font units are y up. SVG is y down, so flip about the baseline.
            t = (1, 0, 0, -1, gx, -gy)
            glyph_set[name].draw(TransformPen(svg, t))
            glyph_set[name].draw(TransformPen(bounds, t))
        return svg.getCommands(), bounds.bounds

    letters, letters_box = draw(pieces[:-1] if text.endswith(".") else pieces)
    dot, dot_box = draw(pieces[-1:]) if text.endswith(".") else ("", None)

    boxes = [b for b in (letters_box, dot_box) if b]
    ink = (
        min(b[0] for b in boxes),
        min(b[1] for b in boxes),
        max(b[2] for b in boxes),
        max(b[3] for b in boxes),
    )

    # Height of the lowercase o, which the guide uses as the clear space unit.
    o_box = BoundsPen(glyph_set)
    glyph_set[font.getBestCmap()[ord("o")]].draw(o_box)
    o_height = o_box.bounds[3] - o_box.bounds[1]

    return {
        "text": text,
        "unitsPerEm": upm,
        "weight": WEIGHT,
        "advance": x,
        "letters": letters,
        "dot": dot,
        "ink": ink,
        "lettersInk": letters_box,
        "dotInk": dot_box,
        "oHeight": o_height,
    }


if __name__ == "__main__":
    print(json.dumps(outline(sys.argv[1]), indent=2))
