"""
Build the Made in Lancashire badge: public/made-in-lancashire/badge.svg.

A petrol rounded rectangle with "Featured in" and "Made in Lancashire" in
paper, and the masuyo. wordmark with its aqua dot. The text is outlined from
Albert Sans, so the badge renders the same on any website, with or without
the font installed.

Usage:
    python3 -I scripts/brand/build_badge.py
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from outline_text import outline  # noqa: E402

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "public" / "made-in-lancashire" / "badge.svg"

PETROL = "#0F3B4F"
PAPER = "#F3F6F7"
MIST = "#E4EAEC"
AQUA = "#4FE0E6"

PAD = 40


def placed(text: str, weight: int, size: float, x: float, baseline: float, fill: str, split_dot: bool = False):
    o = outline(text, weight=weight, tracking_em=0, split_dot=split_dot)
    s = size / o["unitsPerEm"]
    width = (o["ink"][2]) * s
    t = f"translate({x:.2f} {baseline:.2f}) scale({s:.5f})"
    parts = [f'<path transform="{t}" fill="{fill}" d="{o["letters"]}"/>']
    if o["dot"]:
        parts.append(f'<path transform="{t}" fill="{AQUA}" d="{o["dot"]}"/>')
    return parts, width


def main():
    a, wa = placed("Featured in", 600, 30, PAD, 70, MIST)
    b, wb = placed("Made in Lancashire", 800, 46, PAD, 126, PAPER)
    c, wc = placed("masuyo.", 800, 40, PAD, 188, PAPER, split_dot=True)
    width = round(max(wa, wb, wc) + PAD * 2)
    height = 220
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width // 2}" height="{height // 2}" '
        f'role="img" aria-label="Featured in Made in Lancashire, a masuyo. project">'
        f"<title>Featured in Made in Lancashire</title>"
        f'<rect width="{width}" height="{height}" rx="28" fill="{PETROL}"/>'
        + "".join(a + b + c)
        + "</svg>\n"
    )
    OUT.write_text(svg)
    print(json.dumps({"file": str(OUT.relative_to(ROOT)), "width": width, "height": height, "bytes": len(svg)}))


if __name__ == "__main__":
    main()
