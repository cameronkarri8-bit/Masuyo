/* TEMPORARY PLACEHOLDER ARTWORK, REPLACE BEFORE LAUNCH */

import BrowserFrame, { NAVY, BLUE, BLUE2 } from './BrowserFrame'

/**
 * Client portal: sidebar nav, a document list, a progress bar and one status pill.
 *
 * Structural rather than generic, so the shape is recognisable as a portal at a
 * glance. Text runs are grey bars, never lettering, so nothing here can be read
 * as a claim or mistaken for a screenshot of real client work.
 */

interface Props {
  className?: string
  aspect?: string
  rounded?: boolean
}

/** One row of the document list. */
function DocumentRow({ y, active }: { y: number; active: boolean }) {
  return (
    <g transform={`translate(84, ${y})`}>
      <rect
        x="0"
        y="0"
        width="220"
        height="26"
        rx="6"
        fill={active ? BLUE : NAVY}
        opacity={active ? 0.1 : 0.05}
      />

      {/* File icon with a folded corner */}
      <path
        d="M10 6 h11 l6 6 v12 a2 2 0 0 1 -2 2 h-15 a2 2 0 0 1 -2 -2 v-16 a2 2 0 0 1 2 -2 z"
        fill={active ? BLUE : NAVY}
        opacity={active ? 0.55 : 0.28}
      />
      <path d="M21 6 v6 h6 z" fill={NAVY} opacity="0.18" />

      {/* File name and meta, as grey runs */}
      <rect x="36" y="8" width="86" height="5" rx="2.5" fill={NAVY} opacity="0.34" />
      <rect x="36" y="17" width="52" height="4" rx="2" fill={NAVY} opacity="0.17" />

      {active ? (
        <rect x="166" y="8" width="42" height="11" rx="5.5" fill={BLUE} />
      ) : (
        <rect x="176" y="9" width="32" height="9" rx="4.5" fill={NAVY} opacity="0.12" />
      )}
    </g>
  )
}

export default function ClientPortalMockup({
  className = '',
  aspect = '4/3',
  rounded = true,
}: Props) {
  return (
    <BrowserFrame aspect={aspect} rounded={rounded} className={className}>
      {/* Sidebar */}
      <rect x="0" y="0" width="72" height="192" fill={NAVY} opacity="0.06" />
      <rect x="12" y="12" width="30" height="7" rx="3.5" fill={NAVY} opacity="0.4" />
      <rect x="8" y="32" width="56" height="16" rx="5" fill={BLUE} opacity="0.9" />
      <rect x="16" y="37" width="30" height="6" rx="3" fill="#ffffff" opacity="0.75" />
      {[56, 76, 96, 116].map(y => (
        <g key={y}>
          <circle cx="18" cy={y + 8} r="3.5" fill={NAVY} opacity="0.2" />
          <rect x="28" y={y + 5} width="30" height="6" rx="3" fill={NAVY} opacity="0.18" />
        </g>
      ))}

      {/* Header and progress */}
      <rect x="84" y="12" width="74" height="8" rx="4" fill={NAVY} opacity="0.42" />
      <rect x="84" y="32" width="220" height="8" rx="4" fill={NAVY} opacity="0.09" />
      <rect x="84" y="32" width="141" height="8" rx="4" fill={BLUE2} />
      <rect x="84" y="48" width="46" height="5" rx="2.5" fill={NAVY} opacity="0.2" />

      {/* Document list. The second row is the highlighted one. */}
      <DocumentRow y={66} active={false} />
      <DocumentRow y={98} active />
      <DocumentRow y={130} active={false} />
      <DocumentRow y={162} active={false} />
    </BrowserFrame>
  )
}
