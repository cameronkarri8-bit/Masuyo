/**
 * A small pill tag: "Fixed price", "Live", a category.
 *
 * Filled pills are aqua with deep text on dark grounds, and petrol with paper
 * text on light grounds, because aqua is never a background on a light colour.
 * Outlined pills follow the text colour of their ground.
 */
export default function Tag({
  children,
  variant = 'outline',
  dark = false,
  className = '',
}: {
  children: React.ReactNode
  variant?: 'filled' | 'outline'
  dark?: boolean
  className?: string
}) {
  const style =
    variant === 'filled'
      ? dark
        ? 'bg-aqua text-deep'
        : 'bg-petrol text-paper'
      : dark
        ? 'ring-1 ring-inset ring-paper/60 text-paper'
        : 'ring-1 ring-inset ring-petrol/70 text-petrol'
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-small ${style} ${className}`}>
      {children}
    </span>
  )
}
