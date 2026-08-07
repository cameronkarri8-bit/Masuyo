/* TEMPORARY PLACEHOLDER ARTWORK, REPLACE BEFORE LAUNCH */

import BrowserFrame, { NAVY, BLUE, BLUE2 } from './BrowserFrame'

/**
 * Community platform: a thread feed with avatars and reply counts, a pinned
 * marker on the first post, and a member sidebar on the right.
 *
 * Avatars are plain tinted circles. They are never faces, and never initials,
 * because an initial reads as a person we do not have.
 */

interface Props {
  className?: string
  aspect?: string
  rounded?: boolean
}

function Thread({ y, pinned, lines }: { y: number; pinned: boolean; lines: number }) {
  return (
    <g transform={`translate(12, ${y})`}>
      <rect
        x="0"
        y="0"
        width="212"
        height="40"
        rx="7"
        fill={pinned ? BLUE : NAVY}
        opacity={pinned ? 0.08 : 0.04}
      />
      {pinned && <rect x="0" y="0" width="3" height="40" rx="1.5" fill={BLUE} />}

      {/* Avatar */}
      <circle cx="22" cy="20" r="10" fill={pinned ? BLUE : BLUE2} opacity={pinned ? 0.5 : 0.3} />

      {/* Author and body runs */}
      <rect x="40" y="9" width="46" height="5" rx="2.5" fill={NAVY} opacity="0.36" />
      <rect x="40" y="19" width="122" height="4.5" rx="2.25" fill={NAVY} opacity="0.18" />
      {lines > 1 && <rect x="40" y="27" width="92" height="4.5" rx="2.25" fill={NAVY} opacity="0.18" />}

      {/* Pin marker, top right of the pinned thread */}
      {pinned && (
        <g transform="translate(186, 8)" fill={BLUE}>
          <path d="M5 0 h6 v7 l3 4 h-12 l3 -4 z" />
          <rect x="7.2" y="11" width="1.6" height="5" rx="0.8" />
        </g>
      )}

      {/* Reply count: a speech dot plus a short run */}
      <g transform="translate(176, 26)" opacity="0.5">
        <path
          d="M2 0 h14 a2 2 0 0 1 2 2 v6 a2 2 0 0 1 -2 2 h-9 l-4 3 v-3 h-1 a2 2 0 0 1 -2 -2 v-6 a2 2 0 0 1 2 -2 z"
          fill={NAVY}
          opacity="0.3"
        />
        <rect x="6" y="4" width="8" height="3" rx="1.5" fill={NAVY} opacity="0.45" />
      </g>
    </g>
  )
}

export default function CommunityMockup({
  className = '',
  aspect = '4/3',
  rounded = true,
}: Props) {
  return (
    <BrowserFrame aspect={aspect} rounded={rounded} className={className}>
      {/* Feed heading */}
      <rect x="12" y="10" width="66" height="7" rx="3.5" fill={NAVY} opacity="0.42" />

      <Thread y={26} pinned lines={2} />
      <Thread y={72} pinned={false} lines={2} />
      <Thread y={118} pinned={false} lines={1} />
      <Thread y={164} pinned={false} lines={1} />

      {/* Member sidebar */}
      <rect x="236" y="0" width="84" height="192" fill={NAVY} opacity="0.04" />
      <rect x="248" y="12" width="42" height="6" rx="3" fill={NAVY} opacity="0.34" />
      {[30, 54, 78, 102, 126].map((y, i) => (
        <g key={y}>
          <circle cx="256" cy={y + 8} r="7" fill={i % 2 === 0 ? BLUE : BLUE2} opacity="0.32" />
          <rect x="270" y={y + 4} width="36" height="5" rx="2.5" fill={NAVY} opacity="0.2" />
          <rect x="270" y={y + 12} width="22" height="4" rx="2" fill={NAVY} opacity="0.1" />
        </g>
      ))}
      <rect x="248" y="158" width="58" height="14" rx="7" fill={BLUE} opacity="0.85" />
    </BrowserFrame>
  )
}
