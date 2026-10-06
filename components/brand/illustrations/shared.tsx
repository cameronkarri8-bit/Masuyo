import { WORDMARK } from '@/lib/brand/logo-paths'
import { PEN_MARKS, type PenMarkType } from '@/lib/brand/pen-marks'

export const LINE = 4

export const FONT = { fontFamily: 'var(--font-albert), system-ui, sans-serif' }

/** The wordmark placed inside a drawing, at a given width, in one colour. */
export function DrawnWordmark({ x, y, width, colour }: { x: number; y: number; width: number; colour: string }) {
  const s = width / WORDMARK.width
  const [vx, vy] = WORDMARK.viewBox.split(' ').map(Number)
  return (
    <g transform={`translate(${x} ${y}) scale(${s}) translate(${-vx} ${-vy})`} fill={colour}>
      <path d={WORDMARK.letters} />
      <path d={WORDMARK.dot} />
    </g>
  )
}

/** A pen mark from the guide, placed and scaled inside a drawing. */
export function DrawnMark({
  type,
  x,
  y,
  width,
  height,
  colour,
  strokeWidth = LINE,
}: {
  type: PenMarkType
  x: number
  y: number
  width: number
  height: number
  colour: string
  strokeWidth?: number
}) {
  const shape = PEN_MARKS[type]
  const [, , vw, vh] = shape.viewBox.split(' ').map(Number)
  return (
    <g transform={`translate(${x} ${y}) scale(${width / vw} ${height / vh})`}>
      {shape.strokes.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke={colour}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </g>
  )
}

export function Frame({
  children,
  viewBox,
  className,
  title,
}: {
  children: React.ReactNode
  viewBox: string
  className?: string
  title?: string
}) {
  const a11y = title ? { role: 'img' as const, 'aria-label': title } : { 'aria-hidden': true as const }
  return (
    <svg viewBox={viewBox} className={className} focusable="false" {...a11y}>
      {children}
    </svg>
  )
}
