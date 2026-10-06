import { createPen, INK } from '@/lib/brand/pen'
import { arrowHead, Connector, Label } from './svg'

/**
 * Home hero: one enquiry travelling through a business. A website form, then
 * a CRM card, then a quote, then a booked job, clockwise.
 *
 * Drawn on petrol, so the one highlight (the booked job) can be aqua. The
 * connecting lines draw in once as the page loads.
 */
export default function EnquiryJourney({ className = '' }: { className?: string }) {
  const c = INK.dark
  const pen = createPen(41)
  const line = { fill: 'none', stroke: c.line, strokeWidth: 3, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

  // Node frames: [x, y, w, h]
  const A = [20, 30, 230, 150]
  const B = [310, 30, 230, 150]
  const C = [310, 268, 230, 150]
  const D = [20, 268, 230, 150]

  const calendar = pen.rrect(D[0] + 54, D[1] + 24, 122, 98, 10)

  return (
    <svg
      viewBox="0 0 560 450"
      className={className}
      role="img"
      aria-label="An enquiry travelling through a business: a website form, then a card in the CRM, then a quote sent, then a job booked."
    >
      <rect x="0" y="0" width="560" height="450" rx="24" fill="#F3F6F7" fillOpacity="0.06" />

      {/* Website form */}
      <g {...line}>
        <path d={pen.rrect(A[0] + 28, A[1] + 16, 174, 112, 10)} />
        <path d={pen.line(A[0] + 28, A[1] + 34, A[0] + 202, A[1] + 33)} />
        <path d={pen.rrect(A[0] + 46, A[1] + 48, 138, 18, 5)} />
        <path d={pen.rrect(A[0] + 46, A[1] + 74, 138, 18, 5)} />
      </g>
      <path d={pen.rrect(A[0] + 46, A[1] + 100, 66, 18, 9)} fill={c.line} />
      <path d={pen.dot(A[0] + 40, A[1] + 25, 2.6)} fill={c.line} />
      <path d={pen.dot(A[0] + 50, A[1] + 25, 2.6)} fill={c.line} />
      <Label x={A[0] + 115} y={A[1] + 160} anchor="middle" fill={c.line}>Website form</Label>

      {/* CRM card */}
      <g {...line}>
        <path d={pen.rrect(B[0] + 28, B[1] + 16, 174, 112, 10)} />
        <path d={pen.circle(B[0] + 64, B[1] + 52, 15)} />
        <path d={pen.line(B[0] + 92, B[1] + 46, B[0] + 178, B[1] + 45)} />
        <path d={pen.line(B[0] + 92, B[1] + 62, B[0] + 150, B[1] + 61)} />
        <path d={pen.rrect(B[0] + 48, B[1] + 90, 92, 22, 11)} />
      </g>
      <Label x={B[0] + 94} y={B[1] + 106} size={12} anchor="middle" fill={c.line}>New enquiry</Label>
      <Label x={B[0] + 115} y={B[1] + 160} anchor="middle" fill={c.line}>CRM</Label>

      {/* Quote */}
      <g {...line}>
        <path d={`M${C[0] + 62} ${C[1] + 14}L${C[0] + 146} ${C[1] + 14}L${C[0] + 170} ${C[1] + 38}L${C[0] + 170} ${C[1] + 126}L${C[0] + 62} ${C[1] + 126}Z`} />
        <path d={`M${C[0] + 146} ${C[1] + 14}L${C[0] + 146} ${C[1] + 38}L${C[0] + 170} ${C[1] + 38}`} />
        <path d={pen.line(C[0] + 80, C[1] + 54, C[0] + 152, C[1] + 53)} />
        <path d={pen.line(C[0] + 80, C[1] + 72, C[0] + 152, C[1] + 71)} />
        <path d={pen.line(C[0] + 80, C[1] + 90, C[0] + 124, C[1] + 89)} />
      </g>
      <path d={`M${C[0] + 128} ${C[1] + 112}C${C[0] + 133} ${C[1] + 102} ${C[0] + 137} ${C[1] + 117} ${C[0] + 143} ${C[1] + 107}C${C[0] + 146} ${C[1] + 102} ${C[0] + 150} ${C[1] + 112} ${C[0] + 156} ${C[1] + 106}`} {...line} />
      <Label x={C[0] + 115} y={C[1] + 160} anchor="middle" fill={c.line}>Quote sent</Label>

      {/* Booked job, the highlight */}
      <path d={calendar} transform="translate(7 7)" fill={c.fill} />
      <g {...line}>
        <path d={calendar} />
        <path d={pen.line(D[0] + 54, D[1] + 46, D[0] + 176, D[1] + 45)} />
        <path d={pen.line(D[0] + 84, D[1] + 14, D[0] + 84, D[1] + 32)} />
        <path d={pen.line(D[0] + 146, D[1] + 14, D[0] + 146, D[1] + 32)} />
      </g>
      <path d={`M${D[0] + 92} ${D[1] + 84}L${D[0] + 108} ${D[1] + 100}L${D[0] + 140} ${D[1] + 66}`} fill="none" stroke={c.onFill} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
      <Label x={D[0] + 115} y={D[1] + 160} anchor="middle" fill={c.fill} weight={700}>Job booked</Label>

      {/* Connectors, clockwise, drawn in order */}
      <Connector d={`M${A[0] + 214} ${A[1] + 72}L${B[0] + 18} ${B[1] + 72}${arrowHead(B[0] + 18, B[1] + 72, 0)}`} colour={c.mark} delay={0.2} />
      <Connector d={`M${B[0] + 115} ${B[1] + 176}L${C[0] + 115} ${C[1] + 4}${arrowHead(C[0] + 115, C[1] + 4, 90)}`} colour={c.mark} delay={0.6} />
      <Connector d={`M${C[0] + 46} ${C[1] + 72}L${D[0] + 212} ${D[1] + 72}${arrowHead(D[0] + 212, D[1] + 72, 180)}`} colour={c.mark} delay={1.0} />
    </svg>
  )
}
