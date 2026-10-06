import { createPen, INK } from '@/lib/brand/pen'
import { Label } from './svg'

/**
 * Sector page heroes: a phone showing the form a customer would fill in, drawn
 * in the pen line on petrol. A wireframe, clearly a drawing, not a screenshot.
 */
export type PhoneFormKind = 'quote' | 'repair' | 'appointment' | 'onboarding'

const CONTENT: Record<PhoneFormKind, { title: string; fields: string[]; slots?: boolean; upload?: string; button: string }> = {
  quote: { title: 'Request a quote', fields: ['Job type', 'Postcode'], upload: 'Add photos', button: 'Send' },
  repair: { title: 'Book a repair', fields: ['Repair type'], slots: true, button: 'Book' },
  appointment: { title: 'Book an appointment', fields: ['Treatment'], slots: true, button: 'Book' },
  onboarding: { title: 'Get started', fields: ['Your details', 'Company'], upload: 'Upload documents', button: 'Send' },
}

export default function PhoneForm({ kind, className = '' }: { kind: PhoneFormKind; className?: string }) {
  const c = INK.dark
  const pen = createPen(111 + kind.length)
  const f = CONTENT[kind]
  const phone = pen.rrect(80, 14, 240, 452, 34)
  const line = { fill: 'none', stroke: c.line, strokeWidth: 3, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  let y = 120
  return (
    <svg viewBox="0 0 400 490" className={className} role="img" aria-label={`A drawing of a phone showing a "${f.title}" form.`}>
      <path d={phone} transform="translate(12 12)" fill={c.fill} />
      <path d={phone} fill="#0F3B4F" />
      <g {...line}>
        <path d={phone} />
        <path d={pen.line(176, 40, 224, 40)} />
      </g>
      <Label x={108} y={92} size={22} weight={800} fill={c.line}>
        {f.title}
      </Label>
      {f.fields.map(label => {
        const top = y
        y += 74
        return (
          <g key={label}>
            <Label x={108} y={top} size={14} fill="#E4EAEC">
              {label}
            </Label>
            <path d={pen.rrect(108, top + 10, 184, 38, 8)} {...line} strokeWidth={2.5} />
          </g>
        )
      })}
      {f.upload && (
        <g>
          <path d={pen.rrect(108, y - 6, 184, 96, 10)} {...line} strokeWidth={2.5} strokeDasharray="7 7" />
          <path d={`M200 ${y + 50}L200 ${y + 18}M188 ${y + 30}L200 ${y + 18}L212 ${y + 30}`} {...line} strokeWidth={2.5} />
          <Label x={200} y={y + 76} size={13} anchor="middle" fill="#E4EAEC">
            {f.upload}
          </Label>
        </g>
      )}
      {f.slots && (
        <g>
          {[0, 1, 2, 3, 4, 5].map(i => {
            const x = 108 + (i % 3) * 64
            const sy = y - 6 + Math.floor(i / 3) * 46
            const chosen = i === 4
            return <path key={i} d={pen.rrect(x, sy, 56, 34, 9)} fill={chosen ? c.fill : 'none'} stroke={chosen ? c.fill : c.line} strokeWidth={2.5} />
          })}
        </g>
      )}
      <path d={pen.rrect(108, 404, 184, 44, 22)} fill={c.fill} />
      <Label x={200} y={432} size={17} weight={700} anchor="middle" fill="#0D1A20">
        {f.button}
      </Label>
    </svg>
  )
}
