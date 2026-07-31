import type { ReactNode } from 'react'

type Variant = 'white' | 'light' | 'navy'

interface SectionShellProps {
  children: ReactNode
  /** Background treatment. Never use the same variant on two consecutive sections. */
  variant?: Variant
  id?: string
  /** Trims the vertical padding, for sections that should read as a shorter beat. */
  tight?: boolean
  className?: string
  /** Accessible name for the section landmark. */
  ariaLabelledby?: string
}

const VARIANTS: Record<Variant, string> = {
  white: 'bg-white text-ink',
  light: 'bg-light text-ink',
  navy: 'bg-navy text-white',
}

/**
 * Full bleed section wrapper with a centred, width capped inner column.
 *
 * Owns the page's vertical rhythm so spacing stays consistent across sections,
 * and the alternating background logic so no two neighbours share a variant.
 */
export default function SectionShell({
  children,
  variant = 'white',
  id,
  tight = false,
  className = '',
  ariaLabelledby,
}: SectionShellProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={`w-full ${VARIANTS[variant]} ${tight ? 'py-16 md:py-20' : 'py-20 md:py-28'} ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl px-6 md:px-8">{children}</div>
    </section>
  )
}
