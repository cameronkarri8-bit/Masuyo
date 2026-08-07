/* TEMPORARY PLACEHOLDER ARTWORK, REPLACE BEFORE LAUNCH */

import type { ReactNode } from 'react'

/**
 * The browser window every SVG mockup is drawn inside.
 *
 * Factored out so the chrome is defined exactly once, which keeps the five
 * product mockups reading as one system.
 *
 * The drawing area is 320 wide by 192 tall in the child coordinate space.
 */

export const NAVY = '#1A2939'
export const BLUE = '#35ADDF'
export const BLUE2 = '#1d96cb'
export const OFFWHITE = '#F1F9FD'

interface BrowserFrameProps {
  children: ReactNode
  className?: string
  aspect?: string
  rounded?: boolean
}

export default function BrowserFrame({
  children,
  className = '',
  aspect = '4/3',
  rounded = true,
}: BrowserFrameProps) {
  return (
    <div
      /* Decorative. The surrounding heading and copy carry the meaning. */
      aria-hidden="true"
      style={{ aspectRatio: aspect }}
      className={`w-full overflow-hidden ${rounded ? 'rounded-card' : ''} ${className}`}
    >
      {/*
        Anchored to the top rather than centred. At a wide aspect such as the
        16/9 homepage cards, a centred slice crops the chrome off entirely and
        the mockup stops reading as a browser window. Cropping the bottom
        instead looks like a scrolled interface, which is what we want.
      */}
      <svg viewBox="0 0 320 240" preserveAspectRatio="xMidYMin slice" className="h-full w-full">
        <rect x="0" y="0" width="320" height="240" fill={OFFWHITE} />

        {/* Window chrome */}
        <rect x="0" y="0" width="320" height="26" fill={NAVY} />
        <circle cx="14" cy="13" r="3.5" fill="#ffffff" opacity="0.35" />
        <circle cx="26" cy="13" r="3.5" fill="#ffffff" opacity="0.25" />
        <circle cx="38" cy="13" r="3.5" fill="#ffffff" opacity="0.18" />
        <rect x="54" y="7" width="212" height="12" rx="6" fill="#ffffff" opacity="0.12" />

        <g transform="translate(0, 34)">{children}</g>

        <rect x="0" y="226" width="320" height="14" fill={NAVY} opacity="0.06" />
      </svg>
    </div>
  )
}
