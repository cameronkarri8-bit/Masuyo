"""
Build the Made in Lancashire badges, the one source for every version:

  public/made-in-lancashire/badge.svg          for light backgrounds: petrol,
                                               paper text, the aqua dot
  public/made-in-lancashire/badge-dark-bg.svg  for dark backgrounds: paper,
                                               petrol text and a petrol dot,
                                               since aqua never sits on paper

The PNG downloads are rendered from these files when the site builds
(app/made-in-lancashire/badge-*.png), so a change here updates every version.
The text is outlined from Albert Sans, so the badge renders the same on any
website, with or without the font installed.

Usage:
    python3 -I scripts/brand/build_badge.py
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from outline_text import outline  # noqa: E402

ROOT = Path(__file__).resolve().parents[2]
OUT_DIR = ROOT / "public" / "made-in-lancashire"

PETROL = "#0F3B4F"
PAPER = "#F3F6F7"
MIST = "#E4EAEC"
AQUA = "#4FE0E6"

PAD = 40


def placed(text: str, weight: int, size: float, x: float, baseline: float, fill: str, split_dot: bool = False, dot: str = AQUA):
    o = outline(text, weight=weight, tracking_em=0, split_dot=split_dot)
    s = size / o["unitsPerEm"]
    width = (o["ink"][2]) * s
    t = f"translate({x:.2f} {baseline:.2f}) scale({s:.5f})"
    parts = [f'<path transform="{t}" fill="{fill}" d="{o["letters"]}"/>']
    if o["dot"]:
        parts.append(f'<path transform="{t}" fill="{dot}" d="{o["dot"]}"/>')
    return parts, width


VARIANTS = {
    "badge.svg": {"ground": PETROL, "small": MIST, "big": PAPER, "dot": AQUA},
    "badge-dark-bg.svg": {"ground": PAPER, "small": "#52626A", "big": PETROL, "dot": PETROL},
}


def build(name: str, c: dict) -> dict:
    a, wa = placed("Featured in", 600, 30, PAD, 70, c["small"])
    b, wb = placed("Made in Lancashire", 800, 46, PAD, 126, c["big"])
    m, wc = placed("masuyo.", 800, 40, PAD, 188, c["big"], split_dot=True, dot=c["dot"])
    width = round(max(wa, wb, wc) + PAD * 2)
    height = 220
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width // 2}" height="{height // 2}" '
        f'role="img" aria-label="Featured in Made in Lancashire, a masuyo. project">'
        f"<title>Featured in Made in Lancashire</title>"
        f'<rect width="{width}" height="{height}" rx="28" fill="{c["ground"]}"/>'
        + "".join(a + b + m)
        + "</svg>\n"
    )
    out = OUT_DIR / name
    out.write_text(svg)
    return {"file": str(out.relative_to(ROOT)), "width": width, "height": height, "bytes": len(svg)}


def main():
    print(json.dumps([build(n, c) for n, c in VARIANTS.items()]))


if __name__ == "__main__":
    main()
