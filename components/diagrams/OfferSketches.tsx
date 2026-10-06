import { createPen, INK } from '@/lib/brand/pen'

/**
 * The small drawings at the top of the three offer cards on the homepage:
 * a browser outline, three connected nodes, and a line stepping upwards.
 */
const c = INK.light
const line = { fill: 'none', stroke: c.line, strokeWidth: 3, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

export function BrowserSketch({ className = '' }: { className?: string }) {
  const pen = createPen(61)
  const frame = pen.rrect(10, 10, 180, 100, 10)
  return (
    <svg viewBox="0 0 220 130" className={className} aria-hidden="true">
      <path d={frame} transform="translate(8 8)" fill={c.fill} />
      <path d={frame} fill="#F3F6F7" />
      <g {...line}>
        <path d={frame} />
        <path d={pen.line(10, 30, 190, 29)} />
        <path d={pen.line(28, 52, 112, 51)} />
        <path d={pen.line(28, 70, 86, 69)} />
      </g>
      <path d={pen.rrect(28, 82, 54, 16, 8)} fill={c.line} />
      <path d={pen.dot(22, 20, 2.6)} fill={c.line} />
      <path d={pen.dot(31, 20, 2.6)} fill={c.line} />
    </svg>
  )
}

export function NodesSketch({ className = '' }: { className?: string }) {
  const pen = createPen(62)
  return (
    <svg viewBox="0 0 220 130" className={className} aria-hidden="true">
      <g fill={c.fill}>
        <path d={pen.circle(44, 72, 24)} transform="translate(6 6)" />
        <path d={pen.circle(176, 40, 20)} transform="translate(6 6)" />
      </g>
      <g {...line}>
        <path d={pen.line(66, 62, 92, 50)} />
        <path d={pen.line(134, 50, 158, 44)} />
        <path d={pen.line(130, 78, 162, 92)} />
        <path d={pen.circle(44, 72, 24)} />
        <path d={pen.circle(112, 50, 20)} />
        <path d={pen.circle(176, 40, 20)} />
        <path d={pen.circle(178, 100, 15)} />
      </g>
    </svg>
  )
}

export function StepsSketch({ className = '' }: { className?: string }) {
  const pen = createPen(63)
  const steps: [number, number][] = [
    [14, 112], [58, 112], [58, 84], [102, 84], [102, 56], [146, 56], [146, 28], [196, 28],
  ]
  const area = `${pen.poly(steps)}L196 112Z`
  return (
    <svg viewBox="0 0 220 130" className={className} aria-hidden="true">
      <path d={area} transform="translate(8 8)" fill={c.fill} />
      <g {...line}>
        <path d={pen.poly(steps)} />
        <path d={pen.line(10, 116, 206, 115)} />
        <path d="M182 16L198 27L184 38" />
      </g>
    </svg>
  )
}
