/**
 * A heading that ends with the brand dot.
 *
 * Section titles end with a full stop, and the full stop is the aqua dot, as
 * every title in the brand guide shows. Questions keep their question mark,
 * because a question cannot end with a full stop; the dot is never added to
 * them.
 *
 * Pass a string and the final full stop is coloured for you. Pass anything
 * else (for example a title with a highlighted word) and add <Dot /> yourself.
 */

type Level = 'h1' | 'h2' | 'h3'
type Size = 'display' | 'heading' | 'title' | 'subhead'

const SIZES: Record<Size, string> = {
  display: 'text-display',
  heading: 'text-heading',
  title: 'text-title',
  subhead: 'text-subhead',
}

export function Dot() {
  return <span className="text-aqua">.</span>
}

export function withDot(text: string): React.ReactNode {
  if (!text.endsWith('.') || text.endsWith('...')) return text
  return (
    <>
      {text.slice(0, -1)}
      <Dot />
    </>
  )
}

export default function SectionTitle({
  children,
  as: Tag = 'h2',
  size = 'heading',
  dark = false,
  id,
  className = '',
}: {
  children: React.ReactNode
  as?: Level
  size?: Size
  dark?: boolean
  id?: string
  className?: string
}) {
  const content = typeof children === 'string' ? withDot(children) : children
  return (
    <Tag
      id={id}
      className={`${SIZES[size]} text-balance ${dark ? 'text-paper' : 'text-deep'} ${className}`}
    >
      {content}
    </Tag>
  )
}
