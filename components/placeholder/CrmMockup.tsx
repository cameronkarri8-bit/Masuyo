/* TEMPORARY PLACEHOLDER ARTWORK, REPLACE BEFORE LAUNCH */

import BrowserFrame, { NAVY, BLUE, BLUE2 } from './BrowserFrame'

/**
 * CRM: a four column pipeline of stacked cards, one card lifted mid drag over a
 * dashed drop target, and a value total in the top corner.
 *
 * The total is a shaped pill with grey runs inside rather than a figure. A
 * readable number would be an invented result.
 */

interface Props {
  className?: string
  aspect?: string
  rounded?: boolean
}

const COLUMN_X = [10, 88, 166, 244]
/** Cards per column, falling away to the right the way a real pipeline does. */
const COLUMN_CARDS = [3, 3, 2, 1]

function Card({ x, y, tint }: { x: number; y: number; tint: boolean }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x="0" y="0" width="66" height="30" rx="5" fill="#ffffff" />
      <rect x="0" y="0" width="66" height="30" rx="5" fill={NAVY} opacity="0.05" />
      <rect x="0" y="0" width="3" height="30" rx="1.5" fill={tint ? BLUE : BLUE2} opacity="0.7" />
      <rect x="9" y="7" width="40" height="5" rx="2.5" fill={NAVY} opacity="0.32" />
      <rect x="9" y="16" width="28" height="4" rx="2" fill={NAVY} opacity="0.16" />
      <circle cx="57" cy="20" r="4" fill={tint ? BLUE : BLUE2} opacity="0.3" />
    </g>
  )
}

export default function CrmMockup({ className = '', aspect = '4/3', rounded = true }: Props) {
  return (
    <BrowserFrame aspect={aspect} rounded={rounded} className={className}>
      {/* Header, with the pipeline value total in the corner */}
      <rect x="10" y="8" width="58" height="7" rx="3.5" fill={NAVY} opacity="0.42" />
      <rect x="228" y="4" width="82" height="20" rx="6" fill={BLUE} opacity="0.14" />
      <rect x="238" y="9" width="30" height="4" rx="2" fill={NAVY} opacity="0.25" />
      <rect x="238" y="16" width="46" height="5" rx="2.5" fill={BLUE2} opacity="0.85" />

      {/* Columns */}
      {COLUMN_X.map((x, col) => (
        <g key={x}>
          <rect x={x} y="34" width="66" height="150" rx="6" fill={NAVY} opacity="0.035" />
          <rect x={x + 8} y="42" width="30" height="5" rx="2.5" fill={NAVY} opacity="0.28" />
          <circle cx={x + 58} cy={44.5} r="3" fill={NAVY} opacity="0.14" />

          {Array.from({ length: COLUMN_CARDS[col] }).map((_, row) => (
            <Card key={row} x={x} y={56 + row * 38} tint={(col + row) % 2 === 0} />
          ))}
        </g>
      ))}

      {/* Drop target in the third column, where the dragged card is heading */}
      <rect
        x={COLUMN_X[2]}
        y={56 + 2 * 38}
        width="66"
        height="30"
        rx="5"
        fill="none"
        stroke={BLUE}
        strokeWidth="1.5"
        strokeDasharray="4 3"
        opacity="0.7"
      />

      {/* The card mid drag: lifted, tilted, with a soft shadow under it */}
      <g transform="translate(150, 118) rotate(-4)">
        <rect x="3" y="6" width="66" height="30" rx="5" fill={NAVY} opacity="0.16" />
        <rect x="0" y="0" width="66" height="30" rx="5" fill="#ffffff" />
        <rect x="0" y="0" width="66" height="30" rx="5" fill="none" stroke={BLUE} strokeWidth="1.2" />
        <rect x="0" y="0" width="3" height="30" rx="1.5" fill={BLUE} />
        <rect x="9" y="7" width="40" height="5" rx="2.5" fill={NAVY} opacity="0.36" />
        <rect x="9" y="16" width="28" height="4" rx="2" fill={NAVY} opacity="0.18" />
        <circle cx="57" cy="20" r="4" fill={BLUE} opacity="0.45" />
      </g>
    </BrowserFrame>
  )
}
