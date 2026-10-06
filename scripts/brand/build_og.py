"""
Build the default social share card as an SVG with every word outlined.

    python3 -I scripts/brand/build_og.py

Writes scripts/brand/og-default.svg, which `npm run brand:png` renders to
app/opengraph-image.png. Outlining the type means the card renders the same
wherever it is drawn, with no font to load.

The composition follows the cover of the brand guidelines: the wordmark large
on petrol, a pen circle around the dot with an arrow pointing at it, and the
tagline bottom left with the highlighter behind "once.".
"""

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from outline_text import outline  # noqa: E402

ROOT = Path(__file__).resolve().parents[2]
OUT = Path(__file__).parent / "og-default.svg"

W, H = 1200, 630
M = 64
PETROL, PAPER, AQUA, MIST = "#0F3B4F", "#F3F6F7", "#4FE0E6", "#E4EAEC"


def place(o: dict, x: float, baseline: float, size: float, fill: str, part: str = "letters") -> str:
    s = size / o["unitsPerEm"]
    return f'<path transform="translate({x:.2f} {baseline:.2f}) scale({s:.5f})" fill="{fill}" d="{o[part]}"/>'


def width(o: dict, size: float) -> float:
    return (o["ink"][2]) * size / o["unitsPerEm"]


def main():
    parts = [f'<rect width="{W}" height="{H}" fill="{PETROL}"/>']

    # Small line, top left.
    site = outline("masuyodigital.com", weight=600, tracking_em=0, split_dot=False)
    parts.append(place(site, M, 84, 22, MIST))

    # The wordmark.
    word = outline("masuyo.")
    wm_width = 760
    s = wm_width / (word["ink"][2] - word["ink"][0])
    x0 = M - 4 - word["ink"][0] * s
    baseline = 330
    size = s * word["unitsPerEm"]
    parts.append(place(word, x0, baseline, size, PAPER, "letters"))
    parts.append(place(word, x0, baseline, size, AQUA, "dot"))

    # Pen circle around the dot, and an arrow pointing at it.
    dx0, dy0, dx1, dy1 = word["dotInk"]
    cx = x0 + (dx0 + dx1) / 2 * s
    cy = baseline + (dy0 + dy1) / 2 * s
    rx, ry = 56, 46
    parts.append(
        f'<path fill="none" stroke="{AQUA}" stroke-width="4.5" stroke-linecap="round" '
        f'd="M{cx + 30:.1f} {cy - ry + 2:.1f}C{cx - 10:.1f} {cy - ry - 6:.1f} {cx - rx - 2:.1f} {cy - 22:.1f} {cx - rx + 4:.1f} {cy + 10:.1f}'
        f'C{cx - rx + 10:.1f} {cy + ry:.1f} {cx + 20:.1f} {cy + ry + 6:.1f} {cx + rx - 6:.1f} {cy + 22:.1f}'
        f'C{cx + rx + 10:.1f} {cy - 4:.1f} {cx + rx - 4:.1f} {cy - ry + 2:.1f} {cx + 6:.1f} {cy - ry + 4:.1f}"/>'
    )
    ax, ay = cx + rx + 26, cy + ry + 8
    parts.append(
        f'<path fill="none" stroke="{AQUA}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" '
        f'd="M{W - 120} {H - 112}C{W - 160} {H - 210} {ax + 120:.1f} {ay + 50:.1f} {ax:.1f} {ay:.1f}'
        f'M{ax + 6:.1f} {ay + 30:.1f}C{ax + 2:.1f} {ay + 20:.1f} {ax:.1f} {ay + 10:.1f} {ax:.1f} {ay:.1f}'
        f'C{ax + 10:.1f} {ay - 2:.1f} {ax + 20:.1f} {ay - 3:.1f} {ax + 30:.1f} {ay - 4:.1f}"/>'
    )

    # Tagline, bottom left, with the highlighter behind "once.".
    t_size = 46
    t_base = H - 70
    first = outline("Measured twice. Shipped ", tracking_em=0, split_dot=False)
    last = outline("once.", tracking_em=0, split_dot=False)
    gap = first["advance"] * t_size / 1000
    hx0 = M + gap - 0.06 * t_size
    hx1 = M + gap + width(last, t_size) + 0.1 * t_size
    parts.append(
        f'<rect x="{hx0:.1f}" y="{t_base - 0.44 * t_size:.1f}" width="{hx1 - hx0:.1f}" height="{0.5 * t_size:.1f}" '
        f'fill="{AQUA}" fill-opacity="0.45" transform="rotate(-1.2 {(hx0 + hx1) / 2:.1f} {t_base:.1f})"/>'
    )
    parts.append(place(first, M, t_base, t_size, PAPER))
    parts.append(place(last, M + gap, t_base, t_size, PAPER))

    # Top right, where the cover carries its other small line. At share card
    # width the tagline fills the bottom edge, so the two cannot share it.
    what = outline("Websites, web apps, CRM and support", weight=600, tracking_em=0, split_dot=False)
    parts.append(place(what, W - M - width(what, 22), 84, 22, MIST))

    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">'
        + "".join(parts)
        + "</svg>\n"
    )
    OUT.write_text(svg)
    print("wrote", OUT.relative_to(ROOT), f"{len(svg) // 1024} KB")


if __name__ == "__main__":
    main()
