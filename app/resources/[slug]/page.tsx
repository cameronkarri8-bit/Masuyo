import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { ContentsRail, JumpTo } from '@/components/resources/Contents'
import { mdxComponents, withInlinePrompt } from '@/components/resources/mdx'
import ResourceCard from '@/components/resources/ResourceCard'
import ClosingBand from '@/components/site/ClosingBand'
import JsonLd from '@/components/site/JsonLd'
import Container from '@/components/ui/Container'
import { Dot } from '@/components/ui/SectionTitle'
import { pageMetadata } from '@/lib/metadata'
import { AUTHOR, formatDate, getRelated, getResource, getResourceSlugs } from '@/lib/resources'
import { SITE } from '@/lib/site'
import { slugify } from '@/lib/slug'

export const dynamicParams = false

export function generateStaticParams() {
  return getResourceSlugs().map(slug => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const r = getResource(params.slug)
  if (!r) return {}
  const base = pageMetadata({ title: `${r.title} | Masuyo`, description: r.description, path: `/resources/${r.slug}` })
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: 'article',
      publishedTime: r.date,
      modifiedTime: r.updated,
      authors: [AUTHOR.name],
    },
  }
}

export default function ResourceArticle({ params }: { params: { slug: string } }) {
  const r = getResource(params.slug)
  if (!r) notFound()
  const related = getRelated(r.slug)
  const url = `${SITE.url}/resources/${r.slug}`

  return (
    <>
      <article className="bg-mist pb-20 pt-10 sm:pt-14 lg:pb-28">
        <Container>
          <div className="grid gap-10 xl:grid-cols-[13rem_minmax(0,42.5rem)_13rem] xl:justify-center xl:gap-14">
            <aside className="hidden xl:block">
              {r.headings.length > 1 && <ContentsRail headings={r.headings} />}
            </aside>

            <div className="min-w-0">
              <nav aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-2 text-small text-steel">
                  <li>
                    <Link href="/resources" className="text-petrol underline decoration-petrol/30 underline-offset-4 hover:decoration-petrol">
                      Resources
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link
                      href={`/resources?category=${slugify(r.category)}`}
                      className="text-petrol underline decoration-petrol/30 underline-offset-4 hover:decoration-petrol"
                    >
                      {r.category}
                    </Link>
                  </li>
                </ol>
              </nav>

              <h1 className="mt-5 text-heading text-balance text-deep">{r.title}</h1>
              <p className="mt-5 text-small text-steel">
                By {AUTHOR.name} · Updated <time dateTime={r.updated}>{formatDate(r.updated)}</time>
                {r.readingTime > 0 && <> · {r.readingTime} min read</>}
              </p>

              <section aria-labelledby="short-answer" className="mt-8 rounded-card border-l-4 border-petrol bg-paper p-6 sm:p-7">
                <h2 id="short-answer" className="text-subhead text-deep">
                  The short answer
                  <Dot />
                </h2>
                <p className="mt-3 text-lead text-deep">{r.shortAnswer}</p>
              </section>

              {r.headings.length > 1 && (
                <div className="mt-8 xl:hidden">
                  <JumpTo headings={r.headings} />
                </div>
              )}

              <div className="article mt-10">
                <MDXRemote
                  source={withInlinePrompt(r.content)}
                  components={mdxComponents}
                  options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } }}
                />
              </div>

              {r.faqs.length > 0 && (
                <section aria-labelledby="also-ask" className="mt-16 border-t border-petrol/15 pt-10">
                  <h2 id="also-ask" className="text-title text-deep">
                    Questions people also ask
                    <Dot />
                  </h2>
                  <dl className="mt-8 space-y-7">
                    {r.faqs.map(f => (
                      <div key={f.question}>
                        <dt className="text-subhead text-deep">{f.question}</dt>
                        <dd className="mt-2 text-body text-steel">{f.answer}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}
            </div>
          </div>
        </Container>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related" className="bg-paper py-16 sm:py-20">
          <Container>
            <h2 id="related" className="text-title text-deep">
              Related reading
              <Dot />
            </h2>
            <ul className="mt-8 grid gap-5 md:grid-cols-3">
              {related.map(x => (
                <li key={x.slug}>
                  <ResourceCard r={x} onPaper />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <ClosingBand />

      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: r.title,
            description: r.description,
            datePublished: r.date,
            dateModified: r.updated,
            mainEntityOfPage: url,
            url,
            image: `${url}/opengraph-image`,
            author: { '@type': 'Person', name: AUTHOR.name, jobTitle: AUTHOR.role, url: `${SITE.url}/approach` },
            publisher: {
              '@type': 'Organization',
              name: SITE.legalName,
              url: SITE.url,
              logo: { '@type': 'ImageObject', url: `${SITE.url}/brand/masuyo-monogram-petrol-512.png` },
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Resources', item: `${SITE.url}/resources` },
              { '@type': 'ListItem', position: 2, name: r.category, item: `${SITE.url}/resources?category=${slugify(r.category)}` },
              { '@type': 'ListItem', position: 3, name: r.title, item: url },
            ],
          },
          ...(r.faqs.length > 0
            ? [
                {
                  '@context': 'https://schema.org',
                  '@type': 'FAQPage',
                  mainEntity: r.faqs.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
                },
              ]
            : []),
        ]}
      />
    </>
  )
}
