/**
 * A card. Paper on mist, flat, with no shadow, as the guide shows them. On a
 * dark ground the card is a quiet step lighter than the band behind it.
 */
export default function Card({
  children,
  className = '',
  dark = false,
  as: Tag = 'div',
}: {
  children: React.ReactNode
  className?: string
  dark?: boolean
  as?: 'div' | 'li' | 'article'
}) {
  return (
    <Tag className={`rounded-card ${dark ? 'bg-paper/[0.06] ring-1 ring-inset ring-paper/10' : 'bg-paper'} ${className}`}>
      {children}
    </Tag>
  )
}
