import { FONT } from '@/components/brand/illustrations/shared'

export { FONT }

/** A line of text inside a drawing, in Albert Sans. */
export function Label({
  x,
  y,
  children,
  size = 15,
  weight = 600,
  fill,
  anchor = 'start',
}: {
  x: number
  y: number
  children: React.ReactNode
  size?: number
  weight?: number
  fill: string
  anchor?: 'start' | 'middle' | 'end'
}) {
  return (
    <text x={x} y={y} fontSize={size} fontWeight={weight} fill={fill} textAnchor={anchor} style={FONT}>
      {children}
    </text>
  )
}

/** A connecting stroke that draws itself in on load, after `delay` seconds. */
export function Connector({ d, colour, delay = 0, width = 3 }: { d: string; colour: string; delay?: number; width?: number }) {
  return (
    <path
      d={d}
      pathLength={1}
      className="draw-in"
      style={{ animationDelay: `${delay}s` }}
      fill="none"
      stroke={colour}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  )
}

/** An arrow head at (x, y) pointing in direction `angle` degrees (0 = right). */
export function arrowHead(x: number, y: number, angle: number, size = 9) {
  const a = (angle * Math.PI) / 180
  const l = a + Math.PI * 0.8
  const r = a - Math.PI * 0.8
  const p = (t: number) => `${(x + Math.cos(t) * size).toFixed(1)} ${(y + Math.sin(t) * size).toFixed(1)}`
  return `M${p(l)}L${x} ${y}L${p(r)}`
}
