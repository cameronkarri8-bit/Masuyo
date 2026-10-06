import Container from './Container'

/**
 * A full width band with one of the brand grounds.
 *
 * mist is the default page ground, paper is for cards and quiet panels, and
 * petrol and deep are the dark sections. Dark grounds add `ground-dark`, which
 * switches focus rings to aqua and drops the highlighter to 45%.
 */

export type Ground = 'mist' | 'paper' | 'petrol' | 'deep'

const GROUNDS: Record<Ground, string> = {
  mist: 'bg-mist text-deep',
  paper: 'bg-paper text-deep',
  petrol: 'ground-dark bg-petrol text-paper',
  deep: 'ground-dark bg-deep text-paper',
}

const SPACING = {
  default: 'py-20 sm:py-24 lg:py-32',
  tight: 'py-14 sm:py-16 lg:py-20',
  hero: 'pt-14 pb-20 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-32',
  none: '',
} as const

export function isDark(ground: Ground) {
  return ground === 'petrol' || ground === 'deep'
}

export default function Section({
  children,
  ground = 'mist',
  spacing = 'default',
  id,
  className = '',
  container = true,
  labelledBy,
  navGround,
}: {
  children: React.ReactNode
  ground?: Ground
  spacing?: keyof typeof SPACING
  id?: string
  className?: string
  container?: boolean
  labelledBy?: string
  /** Set on a hero so the fixed nav matches it while it sits underneath. */
  navGround?: 'dark'
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      data-nav-ground={navGround}
      className={`relative ${GROUNDS[ground]} ${SPACING[spacing]} ${className}`}
    >
      {container ? <Container>{children}</Container> : children}
    </section>
  )
}
