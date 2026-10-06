/**
 * The pen: hand drawn primitives for illustrations and diagrams.
 *
 * The same rules as the icons, at a bigger scale: straight edges bow a little,
 * corners are slightly uneven, circles are a fraction off true. Every shape is
 * built from a seeded random sequence, so a drawing comes out identically on
 * the server and in the browser, and on every build.
 *
 * Usage:
 *   const pen = createPen(7)
 *   <path d={pen.rrect(10, 10, 200, 120, 12)} />
 */

function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const n = (v: number) => {
  const s = (Math.round(v * 100) / 100).toString()
  return s === '-0' ? '0' : s
}

export interface Pen {
  /** A slightly bowed straight stroke from one point to another. */
  line(x0: number, y0: number, x1: number, y1: number): string
  /** A polyline through points, each leg slightly bowed. */
  poly(points: [number, number][], close?: boolean): string
  /** A rounded rectangle with uneven sides. */
  rrect(x: number, y: number, w: number, h: number, r: number): string
  /** A circle a fraction off true. */
  circle(cx: number, cy: number, r: number): string
  /** A true circle, for small solid dots. */
  dot(cx: number, cy: number, r: number): string
}

export function createPen(seed: number, amp = 1.1): Pen {
  const rand = mulberry32(seed)
  const j = (scale = 1) => (rand() * 2 - 1) * amp * scale

  function seg(x0: number, y0: number, x1: number, y1: number, move = true) {
    const dx = x1 - x0
    const dy = y1 - y0
    const len = Math.hypot(dx, dy) || 1
    const nx = -dy / len
    const ny = dx / len
    const k = Math.min(1, len / 40)
    const a = j(k)
    const b = j(k)
    const c1x = x0 + dx / 3 + nx * a
    const c1y = y0 + dy / 3 + ny * a
    const c2x = x0 + (2 * dx) / 3 + nx * b
    const c2y = y0 + (2 * dy) / 3 + ny * b
    return `${move ? `M${n(x0)} ${n(y0)}` : ''}C${n(c1x)} ${n(c1y)} ${n(c2x)} ${n(c2y)} ${n(x1)} ${n(y1)}`
  }

  return {
    line: (x0, y0, x1, y1) => seg(x0, y0, x1, y1),

    poly(points, close = false) {
      let d = `M${n(points[0][0])} ${n(points[0][1])}`
      for (let i = 1; i < points.length; i++) d += seg(points[i - 1][0], points[i - 1][1], points[i][0], points[i][1], false)
      if (close) d += seg(points[points.length - 1][0], points[points.length - 1][1], points[0][0], points[0][1], false) + 'Z'
      return d
    },

    rrect(x, y, w, h, r) {
      const k = 0.5523
      const e = () => j(0.6)
      const p: [number, number][] = [
        [x + r, y + e()], [x + w - r, y + e()],
        [x + w + e(), y + r], [x + w + e(), y + h - r],
        [x + w - r, y + h + e()], [x + r, y + h + e()],
        [x + e(), y + h - r], [x + e(), y + r],
      ]
      let d = `M${n(p[0][0])} ${n(p[0][1])}`
      d += seg(p[0][0], p[0][1], p[1][0], p[1][1], false)
      d += `C${n(p[1][0] + r * k)} ${n(p[1][1])} ${n(p[2][0])} ${n(p[2][1] - r * k)} ${n(p[2][0])} ${n(p[2][1])}`
      d += seg(p[2][0], p[2][1], p[3][0], p[3][1], false)
      d += `C${n(p[3][0])} ${n(p[3][1] + r * k)} ${n(p[4][0] + r * k)} ${n(p[4][1])} ${n(p[4][0])} ${n(p[4][1])}`
      d += seg(p[4][0], p[4][1], p[5][0], p[5][1], false)
      d += `C${n(p[5][0] - r * k)} ${n(p[5][1])} ${n(p[6][0])} ${n(p[6][1] + r * k)} ${n(p[6][0])} ${n(p[6][1])}`
      d += seg(p[6][0], p[6][1], p[7][0], p[7][1], false)
      d += `C${n(p[7][0])} ${n(p[7][1] - r * k)} ${n(p[0][0] - r * k)} ${n(p[0][1])} ${n(p[0][0])} ${n(p[0][1])}Z`
      return d
    },

    circle(cx, cy, r) {
      const k = 0.5523
      const rs = [0, 1, 2, 3].map(() => r + j(Math.min(1, r / 30) * 0.8))
      const pts: [number, number][] = [[cx + rs[0], cy], [cx, cy + rs[1]], [cx - rs[2], cy], [cx, cy - rs[3]]]
      const ta = [[0, 1], [-1, 0], [0, -1], [1, 0]]
      const tb = [[-1, 0], [0, -1], [1, 0], [0, 1]]
      let d = `M${n(pts[0][0])} ${n(pts[0][1])}`
      for (let i = 0; i < 4; i++) {
        const a = pts[i]
        const b = pts[(i + 1) % 4]
        const ra = rs[i]
        const rb = rs[(i + 1) % 4]
        d += `C${n(a[0] + ta[i][0] * ra * k)} ${n(a[1] + ta[i][1] * ra * k)} ${n(b[0] - tb[i][0] * rb * k)} ${n(b[1] - tb[i][1] * rb * k)} ${n(b[0])} ${n(b[1])}`
      }
      return d + 'Z'
    },

    dot(cx, cy, r) {
      return `M${n(cx - r)} ${n(cy)}a${n(r)} ${n(r)} 0 1 0 ${n(2 * r)} 0a${n(r)} ${n(r)} 0 1 0 ${n(-2 * r)} 0Z`
    },
  }
}

/** Colours for a drawing on a light ground and on a dark one. */
export const INK = {
  light: { line: '#0F3B4F', fill: '#4FE0E6', paper: '#F3F6F7', mark: '#0F3B4F', text: '#0F3B4F', onFill: '#0D1A20' },
  dark: { line: '#F3F6F7', fill: '#4FE0E6', paper: '#0F3B4F', mark: '#4FE0E6', text: '#F3F6F7', onFill: '#0D1A20' },
} as const

export type InkTone = keyof typeof INK
