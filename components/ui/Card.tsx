/**
 * A card. Paper on mist, flat, with no shadow, as the guide shows them. On a
 * dark ground the card is a quiet step lighter than the band behind it.
 */
export default function Card({
  children,
  className = '',
  dark = false,
  onPaper = false,
  as: Tag = 'div',
}: {
  children: React.ReactNode
  className?: string
  dark?: boolean
  /** On a paper section the card steps down to mist, so it still reads as a card. */
  onPaper?: boolean
  as?: 'div' | 'li' | 'article'
}) {
  const ground = dark ? 'bg-paper/[0.06] ring-1 ring-inset ring-paper/10' : onPaper ? 'bg-mist' : 'bg-paper'
  return (
    <Tag className={`rounded-card ${ground} ${className}`}>
      {children}
    </Tag>
  )
}
