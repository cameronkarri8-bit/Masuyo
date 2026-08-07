/* TEMPORARY PLACEHOLDER ARTWORK, REPLACE BEFORE LAUNCH */

import BrowserFrame, { NAVY, BLUE, BLUE2 } from './BrowserFrame'

/**
 * Bespoke: an interface part way through being assembled.
 *
 * Solid on the left, resolving into dashed outlines and loose blocks on the
 * right. Deliberately the most abstract of the five, because the product is
 * "whatever your business actually needs" and any specific interface would be a
 * narrower promise than the page makes.
 */

interface Props {
  className?: string
  aspect?: string
  rounded?: boolean
}

export default function BespokeMockup({
  className = '',
  aspect = '4/3',
  rounded = true,
}: Props) {
  return (
    <BrowserFrame aspect={aspect} rounded={rounded} className={className}>
      {/* Settled: a formed header and sidebar on the left */}
      <rect x="12" y="10" width="72" height="8" rx="4" fill={NAVY} opacity="0.42" />
      <rect x="12" y="26" width="48" height="5" rx="2.5" fill={NAVY} opacity="0.18" />

      <rect x="12" y="44" width="88" height="140" rx="7" fill={NAVY} opacity="0.06" />
      <rect x="22" y="56" width="52" height="6" rx="3" fill={NAVY} opacity="0.26" />
      <rect x="22" y="72" width="68" height="16" rx="5" fill={BLUE} opacity="0.75" />
      {[96, 116, 136].map(y => (
        <rect key={y} x="22" y={y} width="58" height="6" rx="3" fill={NAVY} opacity="0.14" />
      ))}

      {/* Middle: mostly formed, edges softening */}
      <rect x="112" y="44" width="92" height="62" rx="7" fill={BLUE} opacity="0.16" />
      <rect x="122" y="56" width="46" height="5" rx="2.5" fill={NAVY} opacity="0.22" />
      <rect x="122" y="68" width="64" height="4" rx="2" fill={NAVY} opacity="0.12" />

      <rect
        x="112"
        y="118"
        width="92"
        height="66"
        rx="7"
        fill={BLUE2}
        opacity="0.08"
        stroke={BLUE2}
        strokeWidth="1.2"
        strokeDasharray="5 4"
        strokeOpacity="0.5"
      />
      <rect x="122" y="132" width="40" height="5" rx="2.5" fill={NAVY} opacity="0.14" />

      {/* Right: still resolving. Outlines only, drifting out of alignment. */}
      <rect
        x="216"
        y="44"
        width="92"
        height="44"
        rx="7"
        fill="none"
        stroke={BLUE}
        strokeWidth="1.3"
        strokeDasharray="5 4"
        opacity="0.55"
      />
      <rect
        x="222"
        y="100"
        width="80"
        height="36"
        rx="7"
        fill="none"
        stroke={NAVY}
        strokeWidth="1.2"
        strokeDasharray="4 4"
        opacity="0.28"
      />

      {/* Loose blocks, not yet snapped into the grid */}
      <rect
        x="232"
        y="148"
        width="42"
        height="18"
        rx="5"
        fill={BLUE}
        opacity="0.3"
        transform="rotate(-6 253 157)"
      />
      <rect
        x="272"
        y="158"
        width="30"
        height="14"
        rx="4"
        fill={BLUE2}
        opacity="0.22"
        transform="rotate(7 287 165)"
      />
      <rect x="284" y="126" width="20" height="10" rx="3" fill={NAVY} opacity="0.1" />
    </BrowserFrame>
  )
}
