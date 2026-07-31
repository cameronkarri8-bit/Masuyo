import type { ReactNode } from 'react'

type Background = 'white' | 'tint' | 'navy' | 'blue'
type Width = 'default' | 'narrow' | 'wide' | 'full'

interface SectionProps {
  children: ReactNode
  /** Background treatment. Avoid using the same value on two neighbours. */
  bg?: Background
  /** Inner column width. `full` opts out of the max width for edge to edge content. */
  width?: Width
  /** Trims the vertical rhythm for sections that should read as a shorter beat. */
  tight?: boolean
  /** Drops vertical padding entirely, for sections managing their own spacing. */
  flush?: boolean
  id?: string
  className?: string
  /** Renders as a plain div instead of a section landmark. */
  as?: 'section' | 'div'
}

const BACKGROUNDS: Record<Background, string> = {
  white: 'bg-white text-ink',
  tint: 'bg-blue-tint text-ink',
  // `on-dark` flips the secondary button and any other dark aware styling.
  navy: 'bg-navy text-white on-dark',
  blue: 'bg-blue text-white on-dark',
}

const WIDTHS: Record<Width, string> = {
  narrow: 'max-w-3xl',
  default: 'max-w-6xl',
  wide: 'max-w-7xl',
  full: 'max-w-none',
}

/**
 * Full bleed section with a centred inner column.
 *
 * Owns the page's vertical rhythm and the background palette so section styling
 * stays consistent and inline styles are not needed.
 */
export default function Section({
  children,
  bg = 'white',
  width = 'default',
  tight = false,
  flush = false,
  id,
  className = '',
  as: Tag = 'section',
}: SectionProps) {
  const padding = flush ? '' : tight ? 'py-16 md:py-20' : 'py-24 md:py-32'

  return (
    <Tag id={id} className={`w-full ${BACKGROUNDS[bg]} ${padding} ${className}`}>
      <div className={`mx-auto w-full px-6 md:px-8 ${WIDTHS[width]}`}>{children}</div>
    </Tag>
  )
}
