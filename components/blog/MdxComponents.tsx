import type { ComponentPropsWithoutRef } from 'react'
import Link from 'next/link'

/*
  Styled element overrides for MDX article bodies.

  Two things worth knowing:

  1. rehype-slug puts an id on every heading and rehype-autolink-headings then
     wraps the heading text in an anchor. Every heading here spreads its props
     so that id survives, otherwise in page anchor links would not resolve.

  2. That wrapping anchor would otherwise pick up the link styling below and
     render headings blue and underlined. The [&>a] rules neutralise it with
     important, which beats the anchor's own classes regardless of stylesheet
     order. In body anchor links keep their normal link styling.
*/

const HEADING_ANCHOR_RESET = '[&>a]:!text-inherit [&>a]:!no-underline'

function H2({ children, ...props }: ComponentPropsWithoutRef<'h2'>) {
  return (
    <h2 {...props} className={`mt-14 scroll-mt-28 text-3xl text-navy ${HEADING_ANCHOR_RESET}`}>
      {children}
    </h2>
  )
}

function H3({ children, ...props }: ComponentPropsWithoutRef<'h3'>) {
  return (
    <h3 {...props} className={`mt-10 scroll-mt-28 text-2xl text-navy ${HEADING_ANCHOR_RESET}`}>
      {children}
    </h3>
  )
}

function H4({ children, ...props }: ComponentPropsWithoutRef<'h4'>) {
  return (
    <h4 {...props} className={`mt-8 scroll-mt-28 text-xl text-navy ${HEADING_ANCHOR_RESET}`}>
      {children}
    </h4>
  )
}

function P({ children, ...props }: ComponentPropsWithoutRef<'p'>) {
  return (
    <p {...props} className="mt-6 font-sans text-base leading-[1.75] text-ink">
      {children}
    </p>
  )
}

function Ul({ children, ...props }: ComponentPropsWithoutRef<'ul'>) {
  return (
    <ul {...props} className="mt-6 flex list-disc flex-col gap-2 pl-6">
      {children}
    </ul>
  )
}

function Ol({ children, ...props }: ComponentPropsWithoutRef<'ol'>) {
  return (
    <ol {...props} className="mt-6 flex list-decimal flex-col gap-2 pl-6">
      {children}
    </ol>
  )
}

function Li({ children, ...props }: ComponentPropsWithoutRef<'li'>) {
  return (
    <li {...props} className="font-sans text-base leading-[1.75] text-ink">
      {children}
    </li>
  )
}

function A({ href, children, ...props }: ComponentPropsWithoutRef<'a'>) {
  const target = href ?? '#'
  const isInternal = target.startsWith('/') || target.startsWith('#')
  const className =
    'font-medium text-blue2 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue'

  if (isInternal) {
    return (
      <Link href={target} className={className} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <a href={target} target="_blank" rel="noopener noreferrer" className={className} {...props}>
      {children}
    </a>
  )
}

function Strong({ children, ...props }: ComponentPropsWithoutRef<'strong'>) {
  return (
    <strong {...props} className="font-semibold text-navy">
      {children}
    </strong>
  )
}

function Blockquote({ children, ...props }: ComponentPropsWithoutRef<'blockquote'>) {
  return (
    <blockquote
      {...props}
      className="mt-8 border-l-4 border-blue bg-blue-tint px-6 py-5 font-sans text-base leading-[1.75] text-ink"
    >
      {children}
    </blockquote>
  )
}

function Hr(props: ComponentPropsWithoutRef<'hr'>) {
  return <hr {...props} className="mt-12 border-t border-border" />
}

function Code({ children, ...props }: ComponentPropsWithoutRef<'code'>) {
  return (
    <code
      {...props}
      className="rounded bg-blue-tint px-1.5 py-0.5 font-mono text-[0.9em] text-navy"
    >
      {children}
    </code>
  )
}

function Pre({ children, ...props }: ComponentPropsWithoutRef<'pre'>) {
  return (
    <pre
      {...props}
      className="mt-8 overflow-x-auto rounded-card bg-navy p-6 font-mono text-sm leading-relaxed text-white [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-white"
    >
      {children}
    </pre>
  )
}

function Table({ children, ...props }: ComponentPropsWithoutRef<'table'>) {
  // Wrapped so a wide table scrolls inside itself rather than widening the page.
  return (
    <div className="mt-8 overflow-x-auto">
      <table {...props} className="w-full border-collapse text-left font-sans text-sm">
        {children}
      </table>
    </div>
  )
}

function Th({ children, ...props }: ComponentPropsWithoutRef<'th'>) {
  return (
    <th {...props} className="border-b border-border py-3 pr-6 font-semibold text-navy">
      {children}
    </th>
  )
}

function Td({ children, ...props }: ComponentPropsWithoutRef<'td'>) {
  return (
    <td {...props} className="border-b border-border py-3 pr-6 align-top text-ink">
      {children}
    </td>
  )
}

export const mdxComponents = {
  h2: H2,
  h3: H3,
  h4: H4,
  p: P,
  ul: Ul,
  ol: Ol,
  li: Li,
  a: A,
  strong: Strong,
  blockquote: Blockquote,
  hr: Hr,
  code: Code,
  pre: Pre,
  table: Table,
  th: Th,
  td: Td,
}

export default mdxComponents
