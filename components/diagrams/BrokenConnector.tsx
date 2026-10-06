import { createPen } from '@/lib/brand/pen'

/**
 * 404: two nodes and the connector between them, broken. Quiet, not jokey.
 * Petrol line on a light ground, with the aqua fill only inside the nodes,
 * the way the icons carry it.
 */
export default function BrokenConnector({ className = '' }: { className?: string }) {
  const pen = createPen(404)
  const line = { fill: 'none', stroke: '#0F3B4F', strokeWidth: 4, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  const left = pen.circle(70, 70, 38)
  const right = pen.circle(410, 70, 38)
  return (
    <svg viewBox="0 0 480 140" className={className} aria-hidden="true">
      <path d={left} transform="translate(7 7)" fill="#4FE0E6" />
      <path d={right} transform="translate(7 7)" fill="#4FE0E6" />
      <g {...line}>
        <path d={left} fill="#F3F6F7" />
        <path d={right} fill="#F3F6F7" />
        <path d="M110 70C140 70 168 64 196 74" />
        <path d="M284 66C312 76 342 70 370 70" />
        <path d="M206 58L216 88" />
        <path d="M262 54L274 82" />
      </g>
      <g stroke="#0F3B4F" strokeWidth={3} strokeLinecap="round">
        <path d="M232 42L236 52" />
        <path d="M246 40L244 50" />
        <path d="M240 98L240 108" />
      </g>
    </svg>
  )
}
