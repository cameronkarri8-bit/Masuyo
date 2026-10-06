import { WORDMARK } from '@/lib/brand/logo-paths'
import { PEN_MARKS } from '@/lib/brand/pen-marks'

/**
 * Four ways not to use the logo, from page 3 of the guide: stretched,
 * recoloured, shadowed and outlined. Each wears the cross pen mark.
 *
 * The off brand colours in the "recoloured" example are deliberate. They are
 * the guide's own example of what not to do.
 */
const EXAMPLES = [
  { caption: 'Stretch or squash it', kind: 'stretch' },
  { caption: 'Change the colours', kind: 'recolour' },
  { caption: 'Add shadows or glows', kind: 'shadow' },
  { caption: 'Outline it', kind: 'outline' },
] as const

function Mark({ kind }: { kind: (typeof EXAMPLES)[number]['kind'] }) {
  const [vx, vy, vw, vh] = WORDMARK.viewBox.split(' ').map(Number)
  const pad = 200
  const view = `${vx - pad} ${vy - pad} ${vw + pad * 2} ${vh + pad * 2}`
  const id = `dont-${kind}`
  return (
    <svg viewBox={view} className="h-auto w-full" aria-hidden="true">
      {kind === 'shadow' && (
        <defs>
          <filter id={id} x="-20%" y="-60%" width="140%" height="220%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="34" result="blur" />
            <feOffset in="blur" dx="34" dy="46" result="offset" />
            <feFlood floodColor="#4FE0E6" floodOpacity="0.95" result="colour" />
            <feComposite in="colour" in2="offset" operator="in" result="shadow" />
            <feMerge>
              <feMergeNode in="shadow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      )}
      <g
        transform={kind === 'stretch' ? `translate(${vx + vw / 2} ${vy + vh / 2}) scale(1.1 0.6) translate(${-(vx + vw / 2)} ${-(vy + vh / 2)})` : undefined}
        filter={kind === 'shadow' ? `url(#${id})` : undefined}
      >
        {kind === 'outline' ? (
          <>
            <path d={WORDMARK.letters} fill="none" stroke="#0F3B4F" strokeWidth={16} />
            <path d={WORDMARK.dot} fill="none" stroke="#0F3B4F" strokeWidth={16} />
          </>
        ) : (
          <>
            <path d={WORDMARK.letters} fill={kind === 'recolour' ? '#7C4DDB' : '#0F3B4F'} />
            <path d={WORDMARK.dot} fill={kind === 'recolour' ? '#F06A2A' : '#0F3B4F'} />
          </>
        )}
      </g>
    </svg>
  )
}

export default function Donts() {
  const cross = PEN_MARKS.cross
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {EXAMPLES.map(e => (
        <li key={e.kind}>
          <div className="relative flex aspect-[4/3] items-center justify-center rounded-card bg-paper px-6">
            <Mark kind={e.kind} />
            <svg viewBox={cross.viewBox} className="absolute right-4 top-4 h-6 w-6" aria-hidden="true" fill="none">
              {cross.strokes.map((d, i) => (
                <path key={i} d={d} stroke="#0F3B4F" strokeWidth={3} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              ))}
            </svg>
          </div>
          <p className="mt-3 text-small text-deep">{e.caption}</p>
        </li>
      ))}
    </ul>
  )
}
