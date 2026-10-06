import Link from 'next/link'

/**
 * A text link with an arrow.
 *
 * Petrol with a petrol underline on light grounds; paper with an aqua underline
 * on dark ones. The arrow moves 2px on hover. The words say where the link
 * goes ("How Care works"), never "Learn more".
 */
export default function TextLink({
  href,
  children,
  dark = false,
  arrow = true,
  className = '',
  ...rest
}: {
  href: string
  children: React.ReactNode
  dark?: boolean
  arrow?: boolean
  className?: string
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className'>) {
  const classes = `group inline-flex items-center gap-1.5 font-semibold underline decoration-2 underline-offset-[5px] transition-colors ${
    dark ? 'text-paper decoration-aqua hover:text-aqua' : 'text-petrol decoration-petrol/40 hover:decoration-petrol'
  } ${className}`
  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <svg
          viewBox="0 0 16 16"
          className="h-4 w-4 shrink-0 transition-transform duration-200 ease-brand group-hover:translate-x-0.5"
          aria-hidden="true"
          fill="none"
        >
          <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </>
  )
  if (/^(https?:|mailto:|tel:)/.test(href)) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    )
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  )
}
