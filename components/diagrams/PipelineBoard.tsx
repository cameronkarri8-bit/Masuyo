import { createPen, INK, type InkTone } from '@/lib/brand/pen'
import { DrawnMark } from '@/components/brand/illustrations/shared'
import { Label } from './svg'

/**
 * A drawing of the pipeline board in the CRM Masuyo runs on: stages as
 * columns, enquiries as cards, one card being moved on.
 *
 * Deliberately a pen drawing rather than a mocked up screenshot. Nobody should
 * mistake it for the real screen, and it shows no names. Replace it with a real
 * screenshot when one is approved.
 */
const STAGES = ['New', 'Quoted', 'Won', 'Live']
const CARDS = [3, 2, 2, 1]

export default function PipelineBoard({
  tone = 'light',
  className = '',
  label = 'A drawing of a CRM pipeline board, with enquiries moving through four stages.',
}: {
  tone?: InkTone
  className?: string
  label?: string
}) {
  const c = INK[tone]
  const pen = createPen(52)
  const win = pen.rrect(8, 8, 704, 424, 16)
  const line = { fill: 'none', stroke: c.line, strokeWidth: 3, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  const colX = (i: number) => 150 + i * 138

  return (
    <svg viewBox="0 0 740 460" className={className} role="img" aria-label={label}>
      <path d={win} transform="translate(12 12)" fill={c.fill} />
      <path d={win} fill={tone === 'dark' ? '#0F3B4F' : '#F3F6F7'} />
      <g {...line}>
        <path d={win} />
        <path d={pen.line(8, 44, 712, 43)} />
        <path d={pen.line(124, 44, 125, 432)} />
        <path d={pen.line(30, 82, 98, 81)} />
        <path d={pen.line(30, 110, 88, 109)} />
        <path d={pen.line(30, 138, 94, 137)} />
        <path d={pen.line(30, 166, 80, 165)} />
      </g>
      <g fill={c.line}>
        <path d={pen.dot(28, 26, 4.5)} />
        <path d={pen.dot(44, 26, 4.5)} />
        <path d={pen.dot(60, 26, 4.5)} />
      </g>

      {STAGES.map((stage, i) => (
        <g key={stage}>
          <Label x={colX(i)} y={78} fill={c.text} size={17} weight={700}>
            {stage}
          </Label>
          {Array.from({ length: CARDS[i] }).map((_, k) => {
            const y = 96 + k * 92
            const moving = i === 1 && k === 0
            if (moving) return null
            return (
              <g key={k} {...line}>
                <path d={pen.rrect(colX(i), y, 118, 76, 8)} />
                <path d={pen.circle(colX(i) + 20, y + 22, 8)} />
                <path d={pen.line(colX(i) + 36, y + 22, colX(i) + 100, y + 21)} />
                <path d={pen.line(colX(i) + 14, y + 50, colX(i) + 84, y + 49)} />
              </g>
            )
          })}
        </g>
      ))}

      {/* One enquiry being moved on from Quoted to Won. */}
      <g transform="rotate(-4 470 330)">
        <path d={pen.rrect(412, 288, 124, 80, 8)} transform="translate(7 7)" fill={c.fill} />
        <path d={pen.rrect(412, 288, 124, 80, 8)} fill={tone === 'dark' ? '#0F3B4F' : '#F3F6F7'} />
        <g {...line}>
          <path d={pen.rrect(412, 288, 124, 80, 8)} />
          <path d={pen.circle(434, 312, 8)} />
          <path d={pen.line(450, 312, 516, 311)} />
          <path d={pen.line(426, 342, 498, 341)} />
        </g>
      </g>
      <path d={pen.rrect(288, 96, 118, 76, 8)} fill="none" stroke={c.line} strokeWidth={2} strokeDasharray="6 8" strokeLinecap="round" />
      <DrawnMark type="arrow" x={326} y={186} width={96} height={86} colour={c.mark} />
    </svg>
  )
}
