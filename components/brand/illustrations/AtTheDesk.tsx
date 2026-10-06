import { createPen, INK, type InkTone } from '@/lib/brand/pen'
import { DrawnMark, DrawnWordmark, Frame, LINE } from './shared'

/**
 * "At the desk": the work behind the work. For the approach page, process and
 * support. A laptop with the Masuyo site open, a plant and a mug, and one pen
 * mark circling the button on screen.
 */
export default function AtTheDesk({ tone = 'light', className = '', title }: { tone?: InkTone; className?: string; title?: string }) {
  const c = INK[tone]
  // Everything drawn on the aqua screen is deep on a dark ground, so it stays
  // readable against the fill (deep on aqua is 11:1). On a light ground the
  // screen contents share the petrol line.
  const onScreen = tone === 'dark' ? c.onFill : c.line
  const pen = createPen(31)
  const screen = pen.rrect(152, 54, 270, 178, 12)
  const pot = pen.poly([[62, 232], [112, 232], [106, 270], [68, 270]], true)
  const mug = 'M468 218L512 218L510 258C509.6 266 504 271 496 271L484 271C476 271 470.4 266 470 258Z'
  return (
    <Frame viewBox="0 0 560 300" className={className} title={title}>
      <g fill={c.fill}>
        <path d={screen} transform="translate(9 9)" />
        <path d={pot} transform="translate(6 6)" />
        <path d={mug} transform="translate(6 6)" />
      </g>
      <g fill="none" stroke={c.line} strokeWidth={LINE} strokeLinecap="round" strokeLinejoin="round">
        <path d={screen} />
        <path d={pen.line(152, 76, 422, 75)} />
        <path d={pen.poly([[120, 240], [462, 239], [442, 270]])} />
        <path d={pen.line(120, 240, 142, 270)} />
        <path d={pen.line(30, 271, 532, 270)} />
        <path d={pot} />
        <path d="M87 232C87 214 87 200 89 186" />
        <path d="M88 204C80 190 66 186 56 191C59 203 73 210 88 204Z" />
        <path d="M89 190C93 176 106 168 120 171C118 185 105 193 89 190Z" />
        <path d={mug} />
        <path d="M510 228C522 226 529 233 527 241C525 249 517 252 509 251" />
        <path d="M480 190C476 196 484 200 480 207" />
        <path d="M494 186C490 192 498 196 494 203" />
      </g>
      <g fill={c.line}>
        <path d={pen.dot(170, 65, 3.2)} />
        <path d={pen.dot(182, 65, 3.2)} />
      </g>
      <g fill="none" stroke={onScreen} strokeWidth={LINE} strokeLinecap="round">
        <path d={pen.line(178, 146, 330, 144)} />
        <path d={pen.line(178, 166, 268, 165)} />
      </g>
      <path d={pen.rrect(188, 186, 78, 22, 11)} fill={onScreen} />
      <DrawnWordmark x={178} y={96} width={128} colour={onScreen} />
      <DrawnMark type="circle" x={166} y={170} width={124} height={54} colour={onScreen} />
    </Frame>
  )
}
