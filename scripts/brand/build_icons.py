"""
Draw the twelve brand icons as SVG, following page 6 of the guide.

Run from the repository root after changing any drawing:

    python3 -I scripts/brand/build_icons.py

Writes:
    lib/brand/icons.ts                                  (what the site renders)
    public/brand/icons/masuyo-icon-<name>.svg           (petrol line, aqua fill)
    public/brand/icons/masuyo-icon-<name>-on-petrol.svg (aqua line, paper fill)

The rules, from the guide:

1. Line: 2.4 on a 48 grid, round ends and joins, a little wobble from the pen.
2. Fill: aqua, knocked two units down and to the right, like a print that
   slipped. The fill is the outline's own shape, offset, so it shows as a
   sliver past the line on two sides and leaves a gap on the other two.
3. Detail: one small thing that makes each icon ours. Below 24px the line
   thickens and the detail is dropped so the shape still reads.
4. Tilt: two to four degrees. Never perfectly straight.

Straight edges are drawn with a seeded wobble, so the icons look hand drawn
and come out exactly the same on every run.
"""

import json
import math
import random
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "public" / "brand" / "icons"
TS = ROOT / "lib" / "brand" / "icons.ts"

LINE = 2.4
FILL_OFFSET = 2.0

TONES = {
    "light": {"ink": "#0F3B4F", "fill": "#4FE0E6", "knock": "#F3F6F7"},
    "petrol": {"ink": "#4FE0E6", "fill": "#F3F6F7", "knock": "#0F3B4F"},
}


def f(n: float) -> str:
    s = f"{n:.2f}".rstrip("0").rstrip(".")
    return "0" if s == "-0" else s


class Pen:
    """Draws wobbly primitives. Each icon gets its own seed."""

    def __init__(self, seed: int, amp: float = 0.45):
        self.rng = random.Random(seed)
        self.amp = amp

    def j(self, scale: float = 1.0) -> float:
        return (self.rng.random() * 2 - 1) * self.amp * scale

    def seg(self, x0, y0, x1, y1, move=True) -> str:
        """A straight stroke that bows very slightly, as a hand drawn one does."""
        dx, dy = x1 - x0, y1 - y0
        length = math.hypot(dx, dy) or 1
        nx, ny = -dy / length, dx / length
        k = min(1.0, length / 16)
        a, b = self.j(k), self.j(k)
        c1 = (x0 + dx / 3 + nx * a, y0 + dy / 3 + ny * a)
        c2 = (x0 + 2 * dx / 3 + nx * b, y0 + 2 * dy / 3 + ny * b)
        start = f"M{f(x0)} {f(y0)}" if move else ""
        return f"{start}C{f(c1[0])} {f(c1[1])} {f(c2[0])} {f(c2[1])} {f(x1)} {f(y1)}"

    def line(self, x0, y0, x1, y1) -> str:
        return self.seg(x0, y0, x1, y1)

    def rrect(self, x, y, w, h, r) -> str:
        """A rounded rectangle with gently uneven sides and corners."""
        k = 0.5523
        jx = lambda: self.j(0.5)  # noqa: E731
        p = [
            (x + r, y + jx()), (x + w - r, y + jx()),
            (x + w + jx(), y + r), (x + w + jx(), y + h - r),
            (x + w - r, y + h + jx()), (x + r, y + h + jx()),
            (x + jx(), y + h - r), (x + jx(), y + r),
        ]
        d = f"M{f(p[0][0])} {f(p[0][1])}"
        d += self.seg(*p[0], *p[1], move=False)
        d += f"C{f(p[1][0] + r * k)} {f(p[1][1])} {f(p[2][0])} {f(p[2][1] - r * k)} {f(p[2][0])} {f(p[2][1])}"
        d += self.seg(*p[2], *p[3], move=False)
        d += f"C{f(p[3][0])} {f(p[3][1] + r * k)} {f(p[4][0] + r * k)} {f(p[4][1])} {f(p[4][0])} {f(p[4][1])}"
        d += self.seg(*p[4], *p[5], move=False)
        d += f"C{f(p[5][0] - r * k)} {f(p[5][1])} {f(p[6][0])} {f(p[6][1] + r * k)} {f(p[6][0])} {f(p[6][1])}"
        d += self.seg(*p[6], *p[7], move=False)
        d += f"C{f(p[7][0])} {f(p[7][1] - r * k)} {f(p[0][0] - r * k)} {f(p[0][1])} {f(p[0][0])} {f(p[0][1])}Z"
        return d

    def circle(self, cx, cy, r, wobble=True) -> str:
        """A circle drawn in four arcs, each a fraction off true."""
        k = 0.5523
        rs = [r + (self.j(0.35) if wobble else 0) for _ in range(4)]
        pts = [(cx + rs[0], cy), (cx, cy + rs[1]), (cx - rs[2], cy), (cx, cy - rs[3])]
        d = f"M{f(pts[0][0])} {f(pts[0][1])}"
        for i in range(4):
            a, b = pts[i], pts[(i + 1) % 4]
            ra, rb = rs[i], rs[(i + 1) % 4]
            # tangents for a counterclockwise-in-screen, clockwise-in-math walk
            ta = [(0, 1), (-1, 0), (0, -1), (1, 0)][i]
            tb = [(-1, 0), (0, -1), (1, 0), (0, 1)][i]
            c1 = (a[0] + ta[0] * ra * k, a[1] + ta[1] * ra * k)
            c2 = (b[0] - tb[0] * rb * k, b[1] - tb[1] * rb * k)
            d += f"C{f(c1[0])} {f(c1[1])} {f(c2[0])} {f(c2[1])} {f(b[0])} {f(b[1])}"
        return d + "Z"

    def dot(self, cx, cy, r) -> str:
        return self.circle(cx, cy, r, wobble=False)


def icon(name, label, tilt, seed, build):
    pen = Pen(seed)
    parts = build(pen)
    parts.setdefault("fills", [])
    parts.setdefault("lines", [])
    parts.setdefault("solids", [])
    parts.setdefault("knocked", [])
    parts.setdefault("detail", {})
    return {"name": name, "label": label, "tilt": tilt, **parts}


def websites(p: Pen):
    body = p.rrect(6, 11, 34, 25, 4)
    return {
        "fills": [body],
        "lines": [body, p.line(6.5, 17.5, 39.5, 17.2), p.line(11, 23, 24, 22.6), p.line(11, 28.2, 19, 28)],
        "solids": [p.dot(10.6, 14.3, 1), p.dot(14, 14.3, 1)],
        # The cursor, the detail: a pointer clicking on the page.
        "detail": {
            "knocked": ["M30.5 25.5L30.8 39.2L34.4 35.6L37.4 41.6L40.2 40.3L37.1 34.3L42.2 34Z"],
        },
    }


def web_apps(p: Pen):
    body = p.rrect(14, 7, 20, 35, 4.5)
    return {
        "fills": [body],
        "lines": [
            body,
            p.line(21, 11.2, 27, 11),
            p.rrect(18.2, 15.2, 5, 5, 1.3),
            p.rrect(25, 15.2, 5, 5, 1.3),
            p.rrect(18.2, 22.2, 5, 5, 1.3),
        ],
        "solids": [p.dot(24, 37.4, 1.2)],
        # A notification arriving.
        "detail": {"knocked": [p.dot(34.2, 8, 3.6)]},
    }


def code(p: Pen):
    left = "M15.5 8.5C11.6 8.4 11.2 10.6 11.2 14.6L11.1 19.8C11 22.4 9.7 23.4 7.4 24C9.7 24.6 11 25.7 11.1 28.2L11.2 33.4C11.3 37.4 11.6 39.6 15.4 39.5"
    right = "M32.5 8.5C36.4 8.4 36.8 10.6 36.8 14.6L36.9 19.8C37 22.4 38.3 23.4 40.6 24C38.3 24.6 37 25.7 36.9 28.2L36.8 33.4C36.7 37.4 36.4 39.6 32.6 39.5"
    return {
        "fills": [p.dot(23, 23, 10.2)],
        "lines": [left, right, p.line(26.6, 16.8, 21.4, 31.2)],
    }


def seo(p: Pen):
    lens = p.circle(20, 20, 11.5)
    return {
        "fills": [lens],
        "lines": [lens, p.line(28.6, 28.8, 39.6, 39.8)],
        # The glint on the lens.
        "detail": {"lines": ["M13.4 18.8C13.6 15.9 15.8 13.6 18.8 13.3"]},
    }


def crm(p: Pen):
    front = p.rrect(7, 15.5, 27, 21, 3)
    back = "M17.2 15.4L17 10.8C17 9 18 8 19.8 8L38.4 8.5C40.4 8.6 41.2 9.6 41.2 11.4L41 23.6C41 25.4 40 26.2 38.2 26.2L34.6 26.2"
    return {
        "fills": [front],
        "lines": [back, front, p.circle(14.6, 23.4, 2.6), "M10.6 31.8C11 29.2 12.6 27.9 14.6 27.9C16.6 27.9 18.2 29.2 18.6 31.8"],
        # Notes on the contact card.
        "detail": {"lines": [p.line(22.2, 22.8, 30.2, 22.5), p.line(22.2, 27.8, 28, 27.6)]},
    }


def bookings(p: Pen):
    body = p.rrect(7, 10, 34, 30, 4.5)
    return {
        "fills": [body],
        "lines": [body, p.line(7.5, 17.6, 40.5, 17.3), p.line(16, 6.4, 16.1, 12.6), p.line(32, 6.4, 31.9, 12.6), "M17.2 28.4L22 33.2L31.4 23.6"],
    }


def enquiries(p: Pen):
    body = p.rrect(6, 19, 30, 21, 2.6)
    return {
        "fills": [body],
        "lines": [body, "M7.4 21C12 24.4 16.6 27.6 21 30.6C25.4 27.6 30 24.4 34.6 21"],
        "solids": ["M44.2 4L30.6 10.6L35.8 12.6L37.5 17.6Z"],
        # The message on its way: speed lines behind the paper plane.
        "detail": {"lines": [p.line(25.4, 11.4, 28.6, 11.3), p.line(27, 15.4, 30.4, 15.3)]},
    }


def hosting(p: Pen):
    cloud = "M14.2 31C9.2 31 6.6 28.1 6.6 24.6C6.6 20.9 9.6 18.1 13.3 18.4C14.4 12.9 18.8 9.6 24 9.6C29.6 9.6 33.8 13.4 34.7 18.5C38.7 18.5 41.5 21.3 41.5 24.9C41.5 28.4 38.8 31 35 31Z"
    return {
        "fills": [cloud],
        "lines": [cloud, p.line(24, 31.2, 24.1, 39), p.line(16.6, 39.6, 31.4, 39.4)],
        # A server, humming.
        "detail": {"solids": [p.dot(15.4, 24.6, 1.15), p.dot(18.9, 24.6, 1.15)], "lines": [p.line(22.8, 24.6, 32, 24.4)]},
    }


def security(p: Pen):
    body = p.rrect(10, 21, 28, 20, 3.6)
    return {
        "fills": [body],
        "lines": ["M16.2 21.6L16.1 15.6C16.1 10.8 19.6 7.4 24 7.4C28.4 7.4 31.9 10.8 31.9 15.6L31.8 21.6", body],
        "solids": ["M24 26.2C25.6 26.2 26.8 27.4 26.8 29C26.8 30.1 26.2 30.9 25.3 31.4L25.4 35.2L22.6 35.2L22.7 31.4C21.8 30.9 21.2 30.1 21.2 29C21.2 27.4 22.4 26.2 24 26.2Z"],
    }


def support(p: Pen):
    body = "M9.4 18.2L32.8 17.9L32.1 32.8C31.9 37 29.2 40.1 25.1 40.1L17.1 40.2C13.1 40.2 10.4 37.2 10.2 33Z"
    return {
        "fills": [body],
        "lines": [
            body,
            "M32.6 22.6C37.6 21.9 40.6 24.6 40.1 28.1C39.6 31.6 36.1 33.1 31.9 32.7",
            "M15.2 6C13.6 8 16.8 9.6 15.2 12.2",
            "M21.4 5C19.8 7 23 8.6 21.4 11.2",
            "M27.6 6C26 8 29.2 9.6 27.6 12.2",
        ],
        # The heart on the mug.
        "detail": {"solids": ["M21.2 32.6C17.2 29.9 15.8 27.9 15.8 26C15.8 24.3 17.1 23.1 18.6 23.1C19.8 23.1 20.7 23.7 21.2 24.7C21.7 23.7 22.6 23.1 23.8 23.1C25.3 23.1 26.6 24.3 26.6 26C26.6 27.9 25.2 29.9 21.2 32.6Z"]},
    }


def speed(p: Pen):
    shoe = "M13.2 31.6L13.1 21.9C13.1 19.4 14.7 18 17.1 18.3C19.6 18.6 20.6 20.6 23.1 20.5L25.6 15.6C26.1 14.6 27.3 14.3 28.3 14.9L39.6 24.1C41.9 25.9 43 27.6 43 30.1L43 31.6Z"
    return {
        "fills": [shoe],
        "lines": [shoe, p.line(12.4, 35.6, 43.2, 35.3), p.line(3.2, 21.2, 9.2, 21.1), p.line(4.2, 26.3, 10.2, 26.2), p.line(5.8, 31.3, 10.2, 31.2)],
        # Laces.
        "detail": {"lines": [p.line(29, 18.6, 31.6, 16.9), p.line(31.6, 21.2, 34.3, 19.4), p.line(34.1, 23.7, 36.9, 21.8)]},
    }


def growth(p: Pen):
    pot = "M10.2 25.6L38 25.3L37.6 29.1L35 29.1L32.6 41L15.6 41.1L13.1 29.3L10.6 29.3Z"
    leaf_right = "M24.6 14.2C26.1 9.1 30.6 6.6 35.2 7.6C34.6 12.6 30.1 15.6 24.6 14.2Z"
    return {
        "fills": [pot, leaf_right],
        "lines": [
            "M10.2 25.6L38 25.3L37.6 29.1L10.6 29.3Z",
            "M13.1 29.3L15.6 41.1L32.6 41L35 29.1",
            "M24.1 25.4C24 21 24 17.6 24.4 14",
            "M24.2 17.2C21.6 12.1 16.6 10.6 13 12.1C14 16.6 18.6 19.6 24.2 17.2Z",
            leaf_right,
        ],
    }


ICONS = [
    icon("websites", "Websites", -3, 11, websites),
    icon("web-apps", "Web apps", 3, 12, web_apps),
    icon("code", "Code", -2, 13, code),
    icon("seo", "SEO", 3, 14, seo),
    icon("crm", "CRM", -3, 15, crm),
    icon("bookings", "Bookings", 2, 16, bookings),
    icon("enquiries", "Enquiries", -3, 17, enquiries),
    icon("hosting", "Hosting", 2, 18, hosting),
    icon("security", "Security", -2, 19, security),
    icon("support", "Support", 3, 20, support),
    icon("speed", "Speed", -2, 21, speed),
    icon("growth", "Growth", 3, 22, growth),
]


def svg(ic: dict, tone: str) -> str:
    c = TONES[tone]
    detail = ic["detail"]
    fills = "".join(f'<path d="{d}"/>' for d in ic["fills"])
    lines = "".join(f'<path d="{d}"/>' for d in ic["lines"] + detail.get("lines", []))
    solids = "".join(f'<path d="{d}"/>' for d in ic["solids"] + detail.get("solids", []))
    knocked = "".join(
        f'<path d="{d}" fill="{c["ink"]}" stroke="{c["knock"]}" stroke-width="1.6" stroke-linejoin="round" paint-order="stroke"/>'
        for d in ic["knocked"] + detail.get("knocked", [])
    )
    return (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">'
        f'<title>{ic["label"]}</title>'
        f'<g transform="rotate({ic["tilt"]} 24 24)">'
        f'<g fill="{c["fill"]}" transform="translate({FILL_OFFSET} {FILL_OFFSET})">{fills}</g>'
        f'<g fill="none" stroke="{c["ink"]}" stroke-width="{LINE}" stroke-linecap="round" stroke-linejoin="round">{lines}</g>'
        f'<g fill="{c["ink"]}">{solids}</g>'
        f"{knocked}"
        "</g></svg>\n"
    )


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for ic in ICONS:
        (OUT / f'masuyo-icon-{ic["name"]}.svg').write_text(svg(ic, "light"))
        (OUT / f'masuyo-icon-{ic["name"]}-on-petrol.svg').write_text(svg(ic, "petrol"))

    data = json.dumps(ICONS, indent=2)
    TS.write_text(
        "/**\n"
        " * The twelve brand icons, from page 6 of the guide.\n"
        " *\n"
        " * Generated by scripts/brand/build_icons.py, which also writes the\n"
        " * downloadable SVGs in public/brand/icons. Do not edit by hand.\n"
        " *\n"
        " * fills    aqua shapes, drawn two units down and right of the line\n"
        " * lines    the pen line, 2.4 wide on the 48 grid\n"
        " * solids   small filled marks in the line colour\n"
        " * knocked  filled marks with a ground coloured outline, so they sit\n"
        " *          on top of the drawing (the cursor, the notification)\n"
        " * detail   the one small thing that makes the icon ours, dropped\n"
        " *          below 24px so the shape still reads\n"
        " */\n\n"
        "export interface BrandIconParts {\n"
        "  lines?: string[]\n"
        "  solids?: string[]\n"
        "  knocked?: string[]\n"
        "}\n\n"
        "export interface BrandIcon {\n"
        "  name: string\n"
        "  label: string\n"
        "  tilt: number\n"
        "  fills: string[]\n"
        "  lines: string[]\n"
        "  solids: string[]\n"
        "  knocked: string[]\n"
        "  detail: BrandIconParts\n"
        "}\n\n"
        f"export const ICON_LINE = {LINE}\n"
        f"export const ICON_FILL_OFFSET = {FILL_OFFSET}\n\n"
        f"export const BRAND_ICONS: BrandIcon[] = {data}\n\n"
        "export type BrandIconName =\n"
        + "\n".join(f"  | '{ic['name']}'" for ic in ICONS)
        + "\n"
    )
    print(f"wrote {len(ICONS) * 2} SVGs and {TS.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
