/* TEMPORARY PLACEHOLDER ARTWORK, REPLACE BEFORE LAUNCH */

/**
 * A phone frame holding an abstract wireframe, for mobile first sections.
 *
 * As with BrowserMockup, there is no readable text and no real interface, so
 * it cannot be mistaken for a screenshot of finished client work. Replace with
 * real, permissioned screenshots.
 */

const NAVY = '#1A2939'
const BLUE = '#35ADDF'
const BLUE2 = '#1d96cb'
const OFFWHITE = '#F1F9FD'

interface DeviceMockupProps {
  variant?: number
  className?: string
  aspect?: string
  rounded?: boolean
}

function Screen({ variant }: { variant: number }) {
  switch (variant % 3) {
    // Feed of cards.
    case 0:
      return (
        <>
          <rect x="14" y="14" width="70" height="8" rx="4" fill={NAVY} opacity="0.8" />
          <rect x="14" y="32" width="116" height="54" rx="8" fill={BLUE} opacity="0.26" />
          <rect x="14" y="96" width="116" height="34" rx="8" fill={NAVY} opacity="0.08" />
          <rect x="14" y="138" width="116" height="34" rx="8" fill={NAVY} opacity="0.08" />
          <rect x="14" y="180" width="72" height="16" rx="8" fill={BLUE} />
        </>
      )
    // Profile or detail.
    case 1:
      return (
        <>
          <rect x="14" y="14" width="116" height="60" rx="8" fill={BLUE2} opacity="0.26" />
          <rect x="14" y="84" width="92" height="8" rx="4" fill={NAVY} opacity="0.8" />
          <rect x="14" y="100" width="116" height="6" rx="3" fill={NAVY} opacity="0.25" />
          <rect x="14" y="112" width="98" height="6" rx="3" fill={NAVY} opacity="0.25" />
          <rect x="14" y="130" width="54" height="54" rx="8" fill={NAVY} opacity="0.08" />
          <rect x="76" y="130" width="54" height="54" rx="8" fill={NAVY} opacity="0.08" />
        </>
      )
    // Checkout.
    default:
      return (
        <>
          <rect x="14" y="14" width="84" height="8" rx="4" fill={NAVY} opacity="0.8" />
          <rect x="14" y="32" width="116" height="14" rx="7" fill={NAVY} opacity="0.08" />
          <rect x="14" y="54" width="116" height="14" rx="7" fill={NAVY} opacity="0.08" />
          <rect x="14" y="76" width="116" height="14" rx="7" fill={NAVY} opacity="0.08" />
          <rect x="14" y="104" width="116" height="44" rx="8" fill={BLUE} opacity="0.22" />
          <rect x="14" y="160" width="116" height="18" rx="9" fill={BLUE} />
        </>
      )
  }
}

export default function DeviceMockup({
  variant = 0,
  className = '',
  aspect = '4/3',
  rounded = true,
}: DeviceMockupProps) {
  return (
    <div
      aria-hidden="true"
      style={{ aspectRatio: aspect }}
      className={`flex w-full items-center justify-center overflow-hidden bg-blue-tint ${
        rounded ? 'rounded-card' : ''
      } ${className}`}
    >
      <svg viewBox="0 0 220 260" preserveAspectRatio="xMidYMid meet" className="h-full w-full">
        {/* Soft backdrop shapes so the phone does not float on flat colour. */}
        <circle cx="34" cy="46" r="46" fill={BLUE} opacity="0.12" />
        <circle cx="188" cy="216" r="54" fill={BLUE2} opacity="0.1" />

        {/* Phone body */}
        <rect x="52" y="16" width="116" height="228" rx="18" fill={NAVY} />
        <rect x="58" y="30" width="104" height="200" rx="10" fill={OFFWHITE} />
        {/* Speaker and home indicator */}
        <rect x="96" y="22" width="28" height="4" rx="2" fill="#ffffff" opacity="0.3" />
        <rect x="94" y="234" width="32" height="4" rx="2" fill="#ffffff" opacity="0.3" />

        <g transform="translate(58, 30)">
          <Screen variant={variant} />
        </g>
      </svg>
    </div>
  )
}
