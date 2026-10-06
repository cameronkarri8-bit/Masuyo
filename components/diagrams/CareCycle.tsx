import { createPen } from '@/lib/brand/pen'
import { arrowHead, Label } from './svg'

/**
 * What happens each month: monitor, update, improve, report, round again.
 *
 * On a light ground, so "Improve", the step that separates Care from basic
 * hosting, is highlighted with a petrol fill rather than aqua.
 *
 * The ring is decoration; the steps themselves are an ordered list beside it,
 * which on a phone becomes a vertical list ending in a looping arrow.
 */
export interface CycleStep {
  title: string
  body: string
}

const PETROL = '#0F3B4F'

function Ring() {
  const pen = createPen(91)
  const cx = 180
  const cy = 180
  const r = 120
  // Nodes at 10:30, 1:30, 4:30 and 7:30, clockwise from Monitor.
  const angles = [-135, -45, 45, 135]
  const names = ['Monitor', 'Update', 'Improve', 'Report']
  const pts = angles.map(a => [cx + r * Math.cos((a * Math.PI) / 180), cy + r * Math.sin((a * Math.PI) / 180)])
  // Arcs between nodes, clockwise, stopping short of each node.
  const arcs = angles.map((a, i) => {
    const a0 = ((a + 22) * Math.PI) / 180
    const a1 = ((angles[(i + 1) % 4] + (i === 3 ? 360 : 0) - 22) * Math.PI) / 180
    const x0 = cx + r * Math.cos(a0)
    const y0 = cy + r * Math.sin(a0)
    const x1 = cx + r * Math.cos(a1)
    const y1 = cy + r * Math.sin(a1)
    const tangent = (a1 * 180) / Math.PI + 90
    return `M${x0.toFixed(1)} ${y0.toFixed(1)}A${r} ${r} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}${arrowHead(x1, y1, tangent, 9)}`
  })
  return (
    <svg viewBox="0 0 360 360" className="h-auto w-full" aria-hidden="true">
      {arcs.map((d, i) => (
        <path key={i} d={d} fill="none" stroke={PETROL} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      ))}
      {pts.map(([x, y], i) => {
        const on = i === 2
        return (
          <g key={names[i]}>
            <path d={pen.circle(x, y, 40)} fill={on ? PETROL : '#F3F6F7'} stroke={PETROL} strokeWidth={3} />
            <Label x={x} y={y + 5} anchor="middle" size={14} weight={700} fill={on ? '#F3F6F7' : PETROL}>
              {names[i]}
            </Label>
          </g>
        )
      })}
    </svg>
  )
}

export default function CareCycle({ steps }: { steps: CycleStep[] }) {
  const [monitor, update, improve, report] = steps
  const Item = ({ step, n, on = false }: { step: CycleStep; n: number; on?: boolean }) => (
    <li className="max-w-xs" value={n}>
      <h3 className="text-subhead text-deep">
        <span className="mr-2 font-extrabold text-petrol">{n}</span>
        {on ? <span className="highlighter">{step.title}</span> : step.title}
      </h3>
      <p className="mt-1.5 text-body text-steel">{step.body}</p>
    </li>
  )
  return (
    <div>
      {/* Desktop: the ring in the middle, each step beside its node. */}
      <div className="hidden items-center gap-10 lg:grid lg:grid-cols-[1fr_minmax(0,22rem)_1fr]">
        <ol className="flex flex-col items-end gap-24 text-right">
          <Item step={monitor} n={1} />
          <Item step={report} n={4} />
        </ol>
        <Ring />
        <ol className="flex flex-col gap-24">
          <Item step={update} n={2} />
          <Item step={improve} n={3} on />
        </ol>
      </div>

      {/* Phone: a list that loops back to the start. */}
      <div className="lg:hidden">
        <ol className="space-y-7 border-l-2 border-petrol/20 pl-6">
          {steps.map((step, i) => (
            <Item key={step.title} step={step} n={i + 1} on={i === 2} />
          ))}
        </ol>
        <p className="mt-6 flex items-center gap-3 text-small text-petrol">
          <svg viewBox="0 0 40 30" className="h-6 w-8" fill="none" aria-hidden="true">
            <path d="M6 22C2 10 14 2 24 5C33 8 36 18 30 24" stroke="#0F3B4F" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M24 20L30 25L35 19" stroke="#0F3B4F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Then round again, every month.
        </p>
      </div>
    </div>
  )
}
