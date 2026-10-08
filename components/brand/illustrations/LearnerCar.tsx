import { createPen } from '@/lib/brand/pen'
import { DrawnMark, Frame, FONT, LINE } from './shared'

/**
 * "Learner car": for the driving instructors page. A driving school car with
 * an L plate and a roof sign, beside a phone showing open lesson slots.
 *
 * Drawn for the petrol hero, in paper line with aqua offset fills, so it uses
 * petrol, aqua and paper only. The underline under "Spaces this month" is the
 * layout's one pen mark.
 */
const PAPER = '#F3F6F7'
const PETROL = '#0F3B4F'
const AQUA = '#4FE0E6'

export default function LearnerCar({ className = '', title }: { className?: string; title?: string }) {
  const pen = createPen(52)

  const body = pen.poly(
    [
      [36, 262], [36, 216], [78, 204], [128, 158], [254, 156], [304, 204], [346, 214], [346, 262],
    ],
    true,
  )
  const sign = pen.rrect(166, 132, 70, 24, 6)
  const frontWindow = pen.poly([[198, 168], [248, 168], [284, 202], [198, 202]], true)
  const backWindow = pen.poly([[134, 168], [186, 168], [186, 202], [100, 202]], true)
  const plate = pen.rrect(306, 222, 32, 30, 4)
  const phone = pen.rrect(382, 40, 154, 280, 22)
  const slots = [118, 162, 206, 250].map(y => pen.rrect(398, y, 122, 34, 8))

  return (
    <Frame viewBox="0 0 560 340" className={className} title={title}>
      {/* Offset fills, the guide's flat shadow. */}
      <g fill={AQUA}>
        <path d={body} transform="translate(10 10)" />
        <path d={phone} transform="translate(10 10)" />
      </g>
      <g fill={PETROL} stroke={PAPER} strokeWidth={LINE} strokeLinecap="round" strokeLinejoin="round">
        <path d={body} />
        <path d={phone} />
        <path d={backWindow} />
        <path d={frontWindow} />
        <path d={sign} />
        <path d={pen.circle(112, 264, 26)} />
        <path d={pen.circle(274, 264, 26)} />
        <path d={pen.line(198, 210, 210, 210)} />
        <path d={pen.line(20, 292, 364, 292)} fill="none" />
        <path d={pen.line(436, 58, 482, 58)} fill="none" />
        {slots.map((d, i) => (
          <path key={i} d={d} fill={i === 1 ? AQUA : PETROL} />
        ))}
      </g>
      {/* The L plate: a paper square with a petrol L. */}
      <path d={plate} fill={PAPER} />
      <path d="M316 230V246H330" fill="none" stroke={PETROL} strokeWidth={LINE + 1} strokeLinecap="round" strokeLinejoin="round" />
      <g fill={PAPER}>
        <path d={pen.dot(112, 264, 6)} />
        <path d={pen.dot(274, 264, 6)} />
      </g>
      <text x={201} y={149} textAnchor="middle" fontSize={13} fontWeight={700} fill={PAPER} style={FONT}>
        L
      </text>
      <text x={397} y={96} fontSize={14.5} fontWeight={700} fill={PAPER} style={FONT}>
        Spaces this month
      </text>
      <DrawnMark type="underline" x={395} y={100} width={124} height={12} colour={AQUA} />
      {/* Slot rows: a dot and a line of text, the open slot filled. */}
      {[118, 162, 206, 250].map((y, i) => (
        <g key={y}>
          <path d={pen.dot(414, y + 17, 4)} fill={i === 1 ? PETROL : PAPER} />
          <path
            d={pen.line(428, y + 17, i === 1 ? 494 : 470, y + 17)}
            stroke={i === 1 ? PETROL : PAPER}
            strokeWidth={LINE}
            strokeLinecap="round"
            fill="none"
          />
        </g>
      ))}
    </Frame>
  )
}
