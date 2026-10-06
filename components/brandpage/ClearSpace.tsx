import { WORDMARK } from '@/lib/brand/logo-paths'

/**
 * The clear space diagram from page 3 of the guide: the wordmark inside a
 * dashed line set the height of the "o" away on every side, with an x marking
 * the gap on each side.
 */
export default function ClearSpace({ className = '' }: { className?: string }) {
  const [vx, vy, vw, vh] = WORDMARK.viewBox.split(' ').map(Number)
  const pad = WORDMARK.oHeight
  const box = { x: vx - pad, y: vy - pad, w: vw + pad * 2, h: vh + pad * 2 }
  const outer = 140
  const mark = (x: number, y: number) => (
    <g stroke="#4FE0E6" strokeWidth={40} strokeLinecap="round">
      <path d={`M${x - 70} ${y - 70}L${x + 70} ${y + 70}M${x + 70} ${y - 70}L${x - 70} ${y + 70}`} />
    </g>
  )
  return (
    <svg
      viewBox={`${box.x - outer} ${box.y - outer} ${box.w + outer * 2} ${box.h + outer * 2}`}
      className={className}
      role="img"
      aria-label="The wordmark with clear space the height of the letter o on every side."
    >
      <rect x={box.x} y={box.y} width={box.w} height={box.h} fill="none" stroke="#F3F6F7" strokeOpacity={0.6} strokeWidth={14} strokeDasharray="44 36" />
      <path d={WORDMARK.letters} fill="#F3F6F7" />
      <path d={WORDMARK.dot} fill="#4FE0E6" />
      {mark(vx + vw / 2, vy - pad / 2)}
      {mark(vx + vw / 2, vy + vh + pad / 2)}
      {mark(vx - pad / 2, vy + vh / 2)}
      {mark(vx + vw + pad / 2, vy + vh / 2)}
    </svg>
  )
}
