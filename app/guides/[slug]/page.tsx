import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

import Section from '@/components/Section'
import CTABand from '@/components/CTABand'
import RevealAnimation from '@/components/RevealAnimation'
import mdxComponents from '@/components/blog/MdxComponents'
import { getAllGuideSlugs, getGuideBySlug } from '@/lib/guides'

/*
  One guide. Body comes from MDX in content/guides through lib/guides.ts, using
  the same renderer and heading plugins the blog uses so the two read alike.

  The FAQ section is generated from the `faqs` frontmatter array rather than
  written into the body, so the visible questions and the FAQPage schema come
  from one source and cannot drift apart.
*/

const SITE = 'https://masuyodigital.com'
const ORG_NAME = 'Masuyo Digital'

const ORG_ENTITY = {
  '@type': 'Organization',
  name: ORG_NAME,
  url: SITE,
}

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams(): { slug: string }[] {
  return getAllGuideSlugs().map(slug => ({ slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const guide = getGuideBySlug(params.slug)
  if (guide === null) return { title: 'Guide not found' }

  const url = `${SITE}/guides/${guide.slug}`
  return {
    title: guide.title,
    description: guide.description,
    openGraph: {
      type: 'article',
      title: `${guide.title} | ${ORG_NAME}`,
      description: guide.description,
      url,
      publishedTime: guide.date,
      modifiedTime: guide.updated,
    },
    alternates: { canonical: url },
  }
}

function formatDate(value: string): string {
  const parsed = Date.parse(value)
  if (Number.isNaN(parsed)) return value
  return new Date(parsed).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/**
 * Headings for the contents list.
 *
 * Pulled from the raw MDX rather than the rendered output, because the body is
 * a server component and there is nothing to query at build time. The slugs
 * match what rehype-slug generates, so the anchors line up.
 *
 * Fenced code blocks are stripped first so a commented line starting with "##"
 * inside a snippet cannot appear in the contents.
 */
function extractHeadings(markdown: string): { id: string; text: string }[] {
  const withoutCode = markdown.replace(/```[\s\S]*?```/g, '')
  const headings: { id: string; text: string }[] = []

  for (const line of withoutCode.split('\n')) {
    const match = /^##\s+(.+?)\s*$/.exec(line)
    if (match === null) continue
    const text = match[1].replace(/[*_`]/g, '').trim()
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
    if (id.length > 0) headings.push({ id, text })
  }

  return headings
}

export default function GuidePage({ params }: PageProps) {
  const guide = getGuideBySlug(params.slug)
  if (guide === null) notFound()

  const url = `${SITE}/guides/${guide.slug}`
  const headings = extractHeadings(guide.content)

  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    datePublished: guide.date,
    dateModified: guide.updated,
    // Guides are published under the company rather than a named byline, so
    // author and publisher are the same entity.
    author: ORG_ENTITY,
    publisher: ORG_ENTITY,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  }

  // Built from the same array the page renders below.
  const faqPage =
    guide.faqs.length === 0
      ? null
      : {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: guide.faqs.map(item => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
          })),
        }

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE}/guides` },
      { '@type': 'ListItem', position: 3, name: guide.title, item: url },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      {faqPage !== null && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
        />
      )}

      {/* ---------------- Header ---------------- */}
      <Section bg="white" width="narrow" tight>
        <Link
          href="/guides"
          className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-mid transition-colors hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M11 7H3M6.5 4l-3 3 3 3"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          All guides
        </Link>

        <h1 className="mt-10 text-4xl text-navy md:text-5xl">{guide.title}</h1>

        <p className="mt-8 font-sans text-sm text-mid">
          Updated <time dateTime={guide.updated}>{formatDate(guide.updated)}</time>
          {guide.readingTime > 0 && (
            <>
              <span aria-hidden="true"> &middot; </span>
              {guide.readingTime} min read
            </>
          )}
        </p>
      </Section>

      {/* ---------------- Body, with contents alongside ---------------- */}
      <Section bg="white" width="wide" flush className="pb-24 md:pb-32">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16">
          <div className="min-w-0 lg:max-w-[42rem]">
            <MDXRemote
              source={guide.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
                },
              }}
            />

            {/* FAQs come from frontmatter, never from the body. */}
            {guide.faqs.length > 0 && (
              <div className="mt-16 border-t border-border pt-12">
                <h2 className="text-3xl text-navy md:text-4xl">Common questions</h2>
                <div className="mt-8 flex flex-col divide-y divide-border border-y border-border">
                  {guide.faqs.map(item => (
                    <div key={item.question} className="py-7">
                      <h3 className="font-sans text-lg font-semibold text-navy">
                        {item.question}
                      </h3>
                      <p className="mt-3 font-sans text-base leading-relaxed text-mid">
                        {item.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/*
            Contents. Sticky from lg, where there is a column for it to sit in.
            Below that it runs inline above the body, which is why it is ordered
            first on small screens.
          */}
          {headings.length > 1 && (
            <nav
              aria-label="On this page"
              className="order-first min-w-0 lg:order-none lg:sticky lg:top-28 lg:self-start"
            >
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.06em] text-blue2">
                On this page
              </p>
              <ul className="mt-4 flex flex-col gap-2.5 border-l border-border pl-4">
                {headings.map(heading => (
                  <li key={heading.id}>
                    <a
                      href={`#${heading.id}`}
                      className="font-sans text-sm leading-snug text-mid transition-colors hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </Section>

      <CTABand />
    </>
  )
}
