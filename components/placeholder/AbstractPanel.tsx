/* TEMPORARY PLACEHOLDER ARTWORK, REPLACE BEFORE LAUNCH */

/**
 * A decorative composition of arcs, shapes and a diagonal hatch, for section
 * slots where a photograph will eventually sit.
 *
 * Purely abstract. It depicts nothing and claims nothing, which is exactly why
 * it is safe to ship while real photography is commissioned.
 */

const NAVY = '#1A2939'
const BLUE = '#35ADDF'
const BLUE2 = '#1d96cb'
const OFFWHITE = '#F1F9FD'

interface AbstractPanelProps {
  variant?: number
  className?: string
  aspect?: string
  rounded?: boolean
  /** `dark` sits on navy sections. */
  tone?: 'light' | 'dark'
}

export default function AbstractPanel({
  variant = 0,
  className = '',
  aspect = '4/3',
  rounded = true,
  tone = 'light',
}: AbstractPanelProps) {
  const dark = tone === 'dark'
  const bg = dark ? NAVY : OFFWHITE
  const hatch = dark ? '#ffffff' : NAVY
  const id = `ap-${variant}-${tone}`

  return (
    <div
      aria-hidden="true"
      style={{ aspectRatio: aspect }}
      className={`w-full overflow-hidden ${rounded ? 'rounded-card' : ''} ${className}`}
    >
      <svg viewBox="0 0 320 240" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        <defs>
          <pattern id={id} width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="12" stroke={hatch} strokeOpacity={dark ? 0.12 : 0.08} strokeWidth="1" />
          </pattern>
        </defs>

        <rect x="0" y="0" width="320" height="240" fill={bg} />
        <rect x="0" y="0" width="320" height="240" fill={`url(#${id})`} />

        {variant % 3 === 0 && (
          <>
            <circle cx="248" cy="58" r="86" fill={BLUE} opacity={dark ? 0.22 : 0.18} />
            <circle cx="248" cy="58" r="54" fill={BLUE2} opacity={dark ? 0.26 : 0.2} />
            <path d="M0 196c74 0 106-58 176-58 52 0 96 22 144 22v80H0Z" fill={BLUE} opacity={dark ? 0.16 : 0.13} />
            <rect x="34" y="40" width="96" height="96" rx="20" fill={dark ? '#ffffff' : NAVY} opacity={dark ? 0.1 : 0.09} />
          </>
        )}

        {variant % 3 === 1 && (
          <>
            <path d="M320 0v150c-70 0-118-44-186-44C88 106 40 132 0 132V0Z" fill={BLUE} opacity={dark ? 0.2 : 0.16} />
            <circle cx="64" cy="186" r="62" fill={BLUE2} opacity={dark ? 0.24 : 0.18} />
            <path
              d="M180 200a56 56 0 0 1 112 0"
              fill="none"
              stroke={dark ? '#ffffff' : NAVY}
              strokeOpacity={dark ? 0.28 : 0.18}
              strokeWidth="10"
              strokeLinecap="round"
            />
          </>
        )}

        {variant % 3 === 2 && (
          <>
            <rect x="-20" y="24" width="150" height="150" rx="36" transform="rotate(-18 55 99)" fill={BLUE} opacity={dark ? 0.2 : 0.16} />
            <circle cx="238" cy="150" r="76" fill={BLUE2} opacity={dark ? 0.22 : 0.17} />
            <path
              d="M40 214h240"
              stroke={dark ? '#ffffff' : NAVY}
              strokeOpacity={dark ? 0.25 : 0.16}
              strokeWidth="8"
              strokeLinecap="round"
            />
            <circle cx="238" cy="150" r="34" fill={dark ? NAVY : OFFWHITE} opacity="0.5" />
          </>
        )}
      </svg>
    </div>
  )
}
