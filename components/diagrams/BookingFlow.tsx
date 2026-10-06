import { createPen, INK } from '@/lib/brand/pen'
import { Label } from './svg'

/**
 * Websites hero: a phone taking a booking in three steps (pick a service,
 * pick a time, confirm), in front of a laptop showing the same site.
 *
 * A wireframe, drawn in the pen line and clearly a diagram, until a real
 * client's screens are approved for use.
 */
export default function BookingFlow({ className = '' }: { className?: string }) {
  const c = INK.dark
  const pen = createPen(71)
  const line = { fill: 'none', stroke: c.line, strokeWidth: 3, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  const screen = pen.rrect(16, 20, 420, 262, 14)
  const phone = pen.rrect(330, 104, 168, 318, 26)
  const slots = [0, 1, 2, 3, 4, 5]
  return (
    <svg
      viewBox="0 0 520 440"
      className={className}
      role="img"
      aria-label="A drawing of a phone taking a booking in three steps, pick a service, pick a time and confirm, in front of a laptop showing the same website."
    >
      {/* Laptop */}
      <g {...line}>
        <path d={screen} />
        <path d={pen.poly([[0, 296], [452, 296], [430, 318], [22, 318]], true)} />
        <path d={pen.line(16, 52, 436, 51)} />
        <path d={pen.line(330, 36, 372, 36)} />
        <path d={pen.line(384, 36, 418, 36)} />
      </g>
      <path d={pen.rrect(40, 30, 64, 12, 6)} fill={c.line} />
      <g fill="none" stroke={c.line} strokeWidth={9} strokeLinecap="round">
        <path d={pen.line(44, 98, 270, 97)} />
        <path d={pen.line(44, 126, 214, 125)} />
      </g>
      <g {...line} strokeWidth={3}>
        <path d={pen.line(44, 162, 250, 161)} />
        <path d={pen.line(44, 180, 226, 179)} />
      </g>
      <path d={pen.rrect(44, 206, 108, 30, 15)} fill={c.fill} />

      {/* Phone */}
      <path d={phone} transform="translate(10 10)" fill={c.fill} />
      <path d={phone} fill="#0F3B4F" />
      <g {...line}>
        <path d={phone} />
        <path d={pen.line(392, 124, 436, 124)} />
      </g>

      {/* Steps: service done, time current, confirm next */}
      <g {...line} strokeWidth={2.5}>
        <path d={pen.circle(366, 160, 11)} />
        <path d={pen.line(380, 160, 400, 160)} />
        <path d={pen.line(428, 160, 448, 160)} />
        <path d={pen.circle(462, 160, 11)} />
      </g>
      <path d="M360 160L364 165L372 155" fill="none" stroke={c.line} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      <path d={pen.circle(414, 160, 11)} fill={c.fill} />
      <Label x={414} y={165} size={13} weight={800} anchor="middle" fill={c.onFill}>2</Label>
      <Label x={462} y={165} size={13} weight={700} anchor="middle" fill={c.line}>3</Label>

      <Label x={350} y={205} size={17} weight={700} fill={c.line}>Pick a time</Label>
      {slots.map(i => {
        const x = 350 + (i % 2) * 64
        const y = 222 + Math.floor(i / 2) * 44
        const chosen = i === 3
        return (
          <path
            key={i}
            d={pen.rrect(x, y, 56, 32, 10)}
            fill={chosen ? c.fill : 'none'}
            stroke={chosen ? c.fill : c.line}
            strokeWidth={2.5}
          />
        )
      })}
      <path d={pen.rrect(350, 362, 120, 36, 18)} fill={c.line} />
      <Label x={410} y={385} size={15} weight={700} anchor="middle" fill="#0F3B4F">Confirm</Label>
    </svg>
  )
}
