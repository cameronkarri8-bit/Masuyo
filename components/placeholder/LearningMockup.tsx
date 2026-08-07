/* TEMPORARY PLACEHOLDER ARTWORK, REPLACE BEFORE LAUNCH */

import BrowserFrame, { NAVY, BLUE, BLUE2 } from './BrowserFrame'

/**
 * Learning platform: a module list with completion ticks, a progress ring, a
 * locked module and a certificate badge.
 *
 * The ring shows an arc rather than a percentage. A readable figure would be an
 * invented statistic about somebody's course.
 */

interface Props {
  className?: string
  aspect?: string
  rounded?: boolean
}

type RowState = 'done' | 'current' | 'locked'

const ROWS: RowState[] = ['done', 'done', 'current', 'locked']

function StateGlyph({ state }: { state: RowState }) {
  if (state === 'done') {
    return (
      <g>
        <circle cx="0" cy="0" r="8" fill={BLUE} />
        <path
          d="M-3.5 0 l2.5 2.5 l4.5 -5"
          stroke="#ffffff"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    )
  }
  if (state === 'current') {
    return (
      <g>
        <circle cx="0" cy="0" r="8" fill="none" stroke={BLUE} strokeWidth="1.8" />
        <circle cx="0" cy="0" r="3" fill={BLUE} />
      </g>
    )
  }
  // Locked: a small padlock, drawn rather than lettered.
  return (
    <g opacity="0.3">
      <circle cx="0" cy="0" r="8" fill={NAVY} opacity="0.35" />
      <path d="M-3 -1 v-2.5 a3 3 0 0 1 6 0 v2.5" fill="none" stroke={NAVY} strokeWidth="1.5" />
      <rect x="-4" y="-1" width="8" height="6.5" rx="1.5" fill={NAVY} />
    </g>
  )
}

export default function LearningMockup({
  className = '',
  aspect = '4/3',
  rounded = true,
}: Props) {
  // Progress ring: circumference of r=22 is about 138. Roughly half filled.
  const CIRC = 2 * Math.PI * 22

  return (
    <BrowserFrame aspect={aspect} rounded={rounded} className={className}>
      {/* Course heading */}
      <rect x="12" y="10" width="80" height="8" rx="4" fill={NAVY} opacity="0.42" />
      <rect x="12" y="24" width="52" height="5" rx="2.5" fill={NAVY} opacity="0.18" />

      {/* Module list */}
      {ROWS.map((state, i) => {
        const y = 46 + i * 34
        return (
          <g key={i}>
            <rect
              x="12"
              y={y}
              width="200"
              height="28"
              rx="6"
              fill={state === 'current' ? BLUE : NAVY}
              opacity={state === 'current' ? 0.08 : 0.04}
            />
            <g transform={`translate(30, ${y + 14})`}>
              <StateGlyph state={state} />
            </g>
            <rect
              x="46"
              y={y + 8}
              width={state === 'locked' ? 62 : 88}
              height="5"
              rx="2.5"
              fill={NAVY}
              opacity={state === 'locked' ? 0.14 : 0.32}
            />
            <rect
              x="46"
              y={y + 17}
              width="44"
              height="4"
              rx="2"
              fill={NAVY}
              opacity={state === 'locked' ? 0.08 : 0.16}
            />
          </g>
        )
      })}

      {/* Progress ring */}
      <g transform="translate(268, 62)">
        <circle cx="0" cy="0" r="22" fill="none" stroke={NAVY} strokeWidth="7" opacity="0.09" />
        <circle
          cx="0"
          cy="0"
          r="22"
          fill="none"
          stroke={BLUE}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={`${CIRC * 0.55} ${CIRC}`}
          transform="rotate(-90)"
        />
        <rect x="-11" y="-3" width="22" height="6" rx="3" fill={NAVY} opacity="0.22" />
      </g>

      {/* Certificate badge */}
      <g transform="translate(268, 140)">
        <path d="M-9 6 l-4 18 l9 -5 l9 5 l-4 -18 z" fill={BLUE2} opacity="0.55" />
        <circle cx="0" cy="2" r="15" fill={BLUE} opacity="0.22" />
        <circle cx="0" cy="2" r="15" fill="none" stroke={BLUE} strokeWidth="1.6" />
        <path
          d="M-5 2 l3 3 l7 -7"
          stroke={BLUE}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    </BrowserFrame>
  )
}
