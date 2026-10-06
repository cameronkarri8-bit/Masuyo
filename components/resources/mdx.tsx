import Link from 'next/link'
import type { MDXComponents } from 'mdx/types'
import InlinePrompt from './InlinePrompt'

/** How article markdown renders. Internal links use the router; tables scroll on a phone. */
export const mdxComponents: MDXComponents = {
  a: ({ href = '', children, ...rest }) =>
    href.startsWith('/') ? (
      <Link href={href} {...rest}>
        {children}
      </Link>
    ) : (
      <a href={href} rel="noopener noreferrer" target={href.startsWith('#') ? undefined : '_blank'} {...rest}>
        {children}
      </a>
    ),
  table: props => (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    <div className="table-scroll" role="region" aria-label="Table" tabIndex={0}>
      <table {...props} />
    </div>
  ),
  InlinePrompt,
}

/** Puts the inline prompt just before the third section, so it follows the second. */
export function withInlinePrompt(source: string): string {
  const lines = source.split('\n')
  let h2 = 0
  for (let i = 0; i < lines.length; i++) {
    if (/^## /.test(lines[i])) {
      h2++
      if (h2 === 3) {
        lines.splice(i, 0, '<InlinePrompt />', '')
        return lines.join('\n')
      }
    }
  }
  return `${source}\n\n<InlinePrompt />\n`
}
