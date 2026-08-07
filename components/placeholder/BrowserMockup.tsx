/* TEMPORARY PLACEHOLDER ARTWORK, REPLACE BEFORE LAUNCH */

/**
 * An abstract browser frame holding a wireframe layout.
 *
 * Deliberately contains no readable text and no real interface, so it reads as
 * "a website" without ever being mistakable for a screenshot of a finished
 * client site. Replace with real, permissioned screenshots of actual work.
 *
 * `variant` shuffles the composition so a grid of these does not look cloned.
 */

import BrowserFrame, { NAVY, BLUE, BLUE2, OFFWHITE } from './BrowserFrame'

export type MockupVariant = 0 | 1 | 2 | 3 | 4 | 5


interface BrowserMockupProps {
  variant?: number
  className?: string
  /** Aspect ratio of the outer box. Defaults to 4/3. */
  aspect?: string
  rounded?: boolean
}

/** Wireframe bodies. Each is drawn inside a 320 by 200 viewport. */
function Body({ variant }: { variant: number }) {
  switch (variant % 6) {
    // Hero and two cards.
    case 0:
      return (
        <>
          <rect x="16" y="16" width="120" height="10" rx="5" fill={NAVY} opacity="0.85" />
          <rect x="16" y="32" width="180" height="8" rx="4" fill={NAVY} opacity="0.3" />
          <rect x="16" y="46" width="150" height="8" rx="4" fill={NAVY} opacity="0.3" />
          <rect x="16" y="66" width="64" height="18" rx="9" fill={BLUE} />
          <rect x="212" y="16" width="92" height="68" rx="8" fill={BLUE} opacity="0.25" />
          <rect x="16" y="102" width="88" height="72" rx="8" fill={OFFWHITE} stroke={BLUE} strokeOpacity="0.35" />
          <rect x="116" y="102" width="88" height="72" rx="8" fill={OFFWHITE} stroke={BLUE} strokeOpacity="0.35" />
          <rect x="216" y="102" width="88" height="72" rx="8" fill={OFFWHITE} stroke={BLUE} strokeOpacity="0.35" />
        </>
      )
    // Split hero, image left.
    case 1:
      return (
        <>
          <rect x="16" y="16" width="130" height="90" rx="8" fill={BLUE} opacity="0.28" />
          <rect x="162" y="20" width="120" height="10" rx="5" fill={NAVY} opacity="0.85" />
          <rect x="162" y="38" width="142" height="7" rx="3.5" fill={NAVY} opacity="0.28" />
          <rect x="162" y="51" width="118" height="7" rx="3.5" fill={NAVY} opacity="0.28" />
          <rect x="162" y="64" width="132" height="7" rx="3.5" fill={NAVY} opacity="0.28" />
          <rect x="162" y="82" width="58" height="16" rx="8" fill={BLUE} />
          <rect x="16" y="122" width="288" height="52" rx="8" fill={NAVY} opacity="0.08" />
        </>
      )
    // Dashboard: metric row and list.
    case 2:
      return (
        <>
          <rect x="16" y="16" width="86" height="9" rx="4.5" fill={NAVY} opacity="0.8" />
          <rect x="16" y="36" width="88" height="42" rx="8" fill={BLUE} opacity="0.22" />
          <rect x="116" y="36" width="88" height="42" rx="8" fill={BLUE2} opacity="0.22" />
          <rect x="216" y="36" width="88" height="42" rx="8" fill={NAVY} opacity="0.14" />
          <rect x="16" y="92" width="288" height="14" rx="7" fill={NAVY} opacity="0.08" />
          <rect x="16" y="114" width="288" height="14" rx="7" fill={NAVY} opacity="0.08" />
          <rect x="16" y="136" width="288" height="14" rx="7" fill={NAVY} opacity="0.08" />
          <rect x="16" y="158" width="190" height="14" rx="7" fill={NAVY} opacity="0.08" />
        </>
      )
    // Article: wide column of rules.
    case 3:
      return (
        <>
          <rect x="16" y="16" width="200" height="12" rx="6" fill={NAVY} opacity="0.85" />
          <rect x="16" y="40" width="288" height="46" rx="8" fill={BLUE} opacity="0.2" />
          <rect x="16" y="98" width="270" height="7" rx="3.5" fill={NAVY} opacity="0.25" />
          <rect x="16" y="112" width="288" height="7" rx="3.5" fill={NAVY} opacity="0.25" />
          <rect x="16" y="126" width="240" height="7" rx="3.5" fill={NAVY} opacity="0.25" />
          <rect x="16" y="146" width="288" height="7" rx="3.5" fill={NAVY} opacity="0.25" />
          <rect x="16" y="160" width="180" height="7" rx="3.5" fill={NAVY} opacity="0.25" />
        </>
      )
    // Grid of six tiles.
    case 4:
      return (
        <>
          <rect x="16" y="16" width="104" height="9" rx="4.5" fill={NAVY} opacity="0.8" />
          {[0, 1, 2].map(c =>
            [0, 1].map(r => (
              <rect
                key={`${c}-${r}`}
                x={16 + c * 100}
                y={38 + r * 72}
                width="88"
                height="60"
                rx="8"
                fill={(c + r) % 2 === 0 ? BLUE : BLUE2}
                opacity={(c + r) % 3 === 0 ? 0.28 : 0.16}
              />
            ))
          )}
        </>
      )
    // Checkout or form.
    default:
      return (
        <>
          <rect x="16" y="16" width="110" height="10" rx="5" fill={NAVY} opacity="0.85" />
          <rect x="16" y="40" width="170" height="16" rx="8" fill={NAVY} opacity="0.08" />
          <rect x="16" y="64" width="170" height="16" rx="8" fill={NAVY} opacity="0.08" />
          <rect x="16" y="88" width="170" height="16" rx="8" fill={NAVY} opacity="0.08" />
          <rect x="16" y="118" width="76" height="18" rx="9" fill={BLUE} />
          <rect x="204" y="34" width="100" height="102" rx="8" fill={BLUE} opacity="0.22" />
          <rect x="16" y="152" width="288" height="22" rx="8" fill={NAVY} opacity="0.06" />
        </>
      )
  }
}

export default function BrowserMockup({
  variant = 0,
  className = '',
  aspect = '4/3',
  rounded = true,
}: BrowserMockupProps) {
  return (
    <BrowserFrame aspect={aspect} rounded={rounded} className={className}>
      <Body variant={variant} />
    </BrowserFrame>
  )
}
