import { createPen, INK, type InkTone, type Pen } from '@/lib/brand/pen'
import { Frame, LINE } from './shared'

/**
 * "The high street": a row of six different independent shops, a bakery, a
 * bike workshop, a florist, a café, a hair salon and a hardware shop, joined
 * by one string of bunting. Made in Lancashire's illustration: lots of
 * businesses, together.
 *
 * Same pen, line weight and palette as the other spot illustrations. The
 * signs are left blank so the drawing carries no text.
 */

export type Motif = 'bakery' | 'bikes' | 'florist' | 'cafe' | 'salon' | 'hardware' | 'empty'

interface Shop {
  x: number
  w: number
  top: number
  motif: Motif
  awning: boolean
  /** Sign height; taller on a single shop so real text can sit on it. */
  signH?: number
}

const GROUND = 292

/** The motif drawn in a shop window, centred on (cx, cy). */
function motifPaths(pen: Pen, motif: Motif, cx: number, cy: number): { line: string[]; fill: string[] } {
  switch (motif) {
    case 'bakery':
      return {
        fill: [`M${cx - 22} ${cy + 6}c0 -16 44 -16 44 0z`],
        line: [pen.line(cx - 24, cy + 7, cx + 24, cy + 7), `M${cx - 22} ${cy + 6}c2 -18 42 -18 44 0`, pen.line(cx - 8, cy - 4, cx - 4, cy + 2), pen.line(cx + 4, cy - 4, cx + 8, cy + 2)],
      }
    case 'bikes':
      return {
        fill: [],
        line: [pen.circle(cx - 14, cy + 6, 10), pen.circle(cx + 14, cy + 6, 10), pen.poly([[cx - 14, cy + 6], [cx - 2, cy - 8], [cx + 10, cy - 8], [cx + 14, cy + 6]]), pen.line(cx - 2, cy - 8, cx - 6, cy - 14)],
      }
    case 'florist':
      return {
        fill: [pen.dot(cx, cy - 8, 6), pen.dot(cx - 12, cy - 2, 5), pen.dot(cx + 12, cy - 2, 5)],
        line: [pen.line(cx, cy - 2, cx, cy + 14), pen.line(cx - 12, cy + 3, cx - 4, cy + 14), pen.line(cx + 12, cy + 3, cx + 4, cy + 14), pen.rrect(cx - 10, cy + 12, 20, 8, 2)],
      }
    case 'cafe':
      return {
        fill: [`M${cx - 12} ${cy - 2}h24v10c0 8 -24 8 -24 0z`],
        line: [`M${cx - 12} ${cy - 2}h24v10c0 8 -24 8 -24 0z`, `M${cx + 12} ${cy + 1}c8 0 8 8 0 8`, pen.line(cx - 4, cy - 14, cx - 2, cy - 7), pen.line(cx + 4, cy - 14, cx + 6, cy - 7)],
      }
    case 'salon':
      return {
        fill: [],
        line: [pen.circle(cx - 10, cy + 10, 6), pen.circle(cx + 10, cy + 10, 6), pen.line(cx - 6, cy + 6, cx + 12, cy - 14), pen.line(cx + 6, cy + 6, cx - 12, cy - 14)],
      }
    case 'hardware':
      return {
        fill: [pen.rrect(cx - 16, cy - 12, 22, 10, 2)],
        line: [pen.rrect(cx - 16, cy - 12, 22, 10, 2), pen.line(cx - 5, cy - 2, cx - 5, cy + 16), pen.line(cx + 10, cy - 12, cx + 18, cy + 16)],
      }
    default:
      return { fill: [], line: [] }
  }
}

function ShopFront({ pen, shop, colours }: { pen: Pen; shop: Shop; colours: { line: string; fill: string; ground: string } }) {
  const { x, w, top, motif, awning, signH = 24 } = shop
  const body = pen.rrect(x, top, w, GROUND - top, 4)
  const sign = pen.rrect(x + 10, top + 12, w - 20, signH, 4)
  const doorW = Math.round(w * 0.28)
  const doorX = x + w - doorW - 12
  const door = pen.rrect(doorX, GROUND - 78, doorW, 78, 3)
  const winX = x + 12
  const winW = doorX - winX - 10
  const win = pen.rrect(winX, GROUND - 92, winW, 58, 3)
  const m = motifPaths(pen, motif, winX + winW / 2, GROUND - 64)
  // A scalloped awning over the window on some shops, for variety.
  let scallop = ''
  if (awning) {
    const y = top + 48
    scallop = `M${x + 6} ${y}`
    const step = (w - 12) / 5
    for (let i = 0; i < 5; i++) scallop += `C${x + 6 + i * step + step * 0.2} ${y + 10} ${x + 6 + i * step + step * 0.8} ${y + 10} ${x + 6 + (i + 1) * step} ${y}`
  }
  return (
    <g>
      <path d={door} transform="translate(5 0)" fill={colours.fill} />
      <g fill={colours.fill}>
        {m.fill.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      <g fill="none" stroke={colours.line} strokeWidth={LINE} strokeLinecap="round" strokeLinejoin="round">
        <path d={body} fill={colours.ground} />
        <path d={sign} />
        {awning && (
          <>
            <path d={`M${x + 6} ${top + 40}H${x + w - 6}V${top + 48}H${x + 6}Z`} fill={colours.fill} stroke="none" />
            <path d={`${scallop}V${top + 48}Z`} fill={colours.fill} stroke="none" />
            <path d={pen.line(x + 6, top + 40, x + w - 6, top + 40)} />
            <path d={scallop} />
          </>
        )}
        <path d={win} />
        <path d={door} />
        {m.line.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      <path d={pen.dot(doorX + doorW - 7, GROUND - 38, 2.6)} fill={colours.line} />
    </g>
  )
}

const SHOPS: Shop[] = [
  { x: 24, w: 112, top: 96, motif: 'bakery', awning: true },
  { x: 146, w: 124, top: 64, motif: 'bikes', awning: false },
  { x: 280, w: 104, top: 104, motif: 'florist', awning: true },
  { x: 394, w: 124, top: 78, motif: 'cafe', awning: true },
  { x: 528, w: 104, top: 100, motif: 'salon', awning: false },
  { x: 642, w: 120, top: 70, motif: 'hardware', awning: true },
]

/** The bunting: one string swagging from roof to roof, with flags along it. */
function Bunting({ colours }: { colours: { line: string; flagA: string; flagB: string } }) {
  // Pinned to each roof's front corner, so it runs across the whole row.
  const points: [number, number][] = [[10, 40]]
  for (const s of SHOPS) points.push([s.x + s.w / 2, s.top + 4])
  points.push([776, 34])
  let d = `M${points[0][0]} ${points[0][1]}`
  const flags: { x: number; y: number; i: number }[] = []
  let n = 0
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1]
    const [x1, y1] = points[i]
    const sag = 18
    const cx = (x0 + x1) / 2
    const cy = (y0 + y1) / 2 + sag
    d += `Q${cx} ${cy} ${x1} ${y1}`
    // Flags hang at even steps along each swag.
    for (const t of [0.2, 0.4, 0.6, 0.8]) {
      const bx = (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * cx + t * t * x1
      const by = (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * cy + t * t * y1
      flags.push({ x: bx, y: by, i: n++ })
    }
  }
  return (
    <g strokeLinejoin="round">
      {flags.map(f => (
        <path
          key={f.i}
          d={`M${f.x - 7} ${f.y}L${f.x + 7} ${f.y}L${f.x} ${f.y + 16}Z`}
          fill={f.i % 2 === 0 ? colours.flagA : colours.flagB}
          stroke={colours.line}
          strokeWidth={2}
        />
      ))}
      <path d={d} fill="none" stroke={colours.line} strokeWidth={LINE - 1} strokeLinecap="round" />
    </g>
  )
}

function palette(tone: InkTone) {
  const c = INK[tone]
  return {
    line: c.line,
    fill: c.fill,
    ground: c.paper,
    flagA: c.fill,
    flagB: tone === 'dark' ? c.paper : c.line,
  }
}

export default function HighStreet({ tone = 'dark', className = '', title }: { tone?: InkTone; className?: string; title?: string }) {
  const pen = createPen(41)
  const colours = palette(tone)
  return (
    <Frame viewBox="0 0 786 310" className={className} title={title}>
      {SHOPS.map(shop => (
        <ShopFront key={shop.motif} pen={pen} shop={shop} colours={colours} />
      ))}
      <Bunting colours={colours} />
      <path d={pen.line(8, GROUND, 778, GROUND)} fill="none" stroke={colours.line} strokeWidth={LINE} strokeLinecap="round" />
    </Frame>
  )
}

/**
 * One shop from the high street on its own: an empty one for the "Your
 * business here" cards, or a member's category for a directory card with no
 * photo. Drawn for a petrol panel. The sign's position, as fractions of the
 * frame, is exported so real text can sit on it.
 */
export const SINGLE_SIGN = { left: 0.2, top: 82 / 310, width: 0.6, height: 40 / 310 }

export function SingleShop({ motif = 'empty', className = '' }: { motif?: Motif; className?: string }) {
  const pen = createPen(7)
  const colours = palette('dark')
  const shop: Shop = { x: 70, w: 260, top: 70, motif, awning: false, signH: 40 }
  return (
    <Frame viewBox="0 0 400 310" className={className}>
      <ShopFront pen={pen} shop={{ ...shop }} colours={colours} />
      <path d={pen.line(20, GROUND, 380, GROUND)} fill="none" stroke={colours.line} strokeWidth={LINE} strokeLinecap="round" />
    </Frame>
  )
}
