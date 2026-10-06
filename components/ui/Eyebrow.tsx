/**
 * The small label above a heading.
 *
 * Albert Sans Small: 14px semibold, sentence case, no letter spacing. Steel on
 * light grounds, mist on dark ones.
 */
export default function Eyebrow({
  children,
  dark = false,
  className = '',
  as: Tag = 'p',
}: {
  children: React.ReactNode
  dark?: boolean
  className?: string
  as?: 'p' | 'span' | 'div'
}) {
  return <Tag className={`text-small ${dark ? 'text-mist' : 'text-steel'} ${className}`}>{children}</Tag>
}
