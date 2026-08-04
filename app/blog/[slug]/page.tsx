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
import { getAllPostSlugs, getPostBySlug, getRelatedPosts, type BlogPostMeta } from '@/lib/blog'

/*
  Post content comes from MDX in content/blog through lib/blog.ts. The Sanity
  client, its queries and PortableText have all been removed from this route.
  The sanity/ directory itself is left for a later cleanup pass.
*/

const SITE = 'https://masuyodigital.com'
const ORG_NAME = 'Masuyo Digital'
const ORG_LOGO = `${SITE}/opengraph-image`

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams(): { slug: string }[] {
  return getAllPostSlugs().map(slug => ({ slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getPostBySlug(params.slug)
  if (post === null) return {}

  const url = `${SITE}/blog/${post.slug}`

  return {
    // `absolute` so the root layout's "%s | Masuyo Digital" template does not
    // append the brand suffix on top of a title that is already complete.
    title: { absolute: post.metaTitle },
    description: post.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: post.metaTitle,
      description: post.metaDescription,
      url,
      publishedTime: post.publishedAt,
      ...(post.updatedAt === undefined ? {} : { modifiedTime: post.updatedAt }),
      authors: [post.author],
      // Only set images when the post overrides it. Left unset, Next uses the
      // generated card from opengraph-image.tsx in this same folder.
      ...(post.ogImage === undefined
        ? {}
        : {
            images: [
              {
                url: post.ogImage,
                alt: post.ogImageAlt ?? post.title,
              },
            ],
          }),
    },
    twitter: { card: 'summary_large_image' },
  }
}

/** For example "4 August 2026". */
function formatDate(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

function RelatedCard({ post }: { post: BlogPostMeta }) {
  return (
    <article className="h-full">
      <Link
        href={`/blog/${post.slug}`}
        className="hover-lift flex h-full flex-col rounded-card bg-white p-7 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
      >
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.06em] text-blue2">
          {post.category}
        </p>
        <h3 className="mt-3 text-xl text-navy">{post.title}</h3>
        <p className="mt-3 font-sans text-sm leading-relaxed text-mid">{post.excerpt}</p>
        <p className="mt-auto pt-6 font-sans text-sm text-mid">{post.readingTime}</p>
      </Link>
    </article>
  )
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug)
  if (post === null) notFound()

  const related = getRelatedPosts(params.slug, 3)

  const url = `${SITE}/blog/${post.slug}`
  const imageUrl = post.ogImage === undefined ? `${url}/opengraph-image` : `${SITE}${post.ogImage}`

  const blogPosting = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { '@type': 'Organization', name: ORG_NAME, url: SITE },
    publisher: {
      '@type': 'Organization',
      name: ORG_NAME,
      logo: { '@type': 'ImageObject', url: ORG_LOGO },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    image: imageUrl,
  }

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  }

  // Built from the structured faq array in frontmatter, not scraped from the
  // body, so the schema and the visible section cannot drift apart.
  const faqPage =
    post.faq === undefined || post.faq.length === 0
      ? null
      : {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.faq.map(item => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
          })),
        }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPosting) }}
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

      {/* ---------------- Article header ---------------- */}
      <Section bg="white" width="narrow" tight>
        <Link
          href="/blog"
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
          All posts
        </Link>

        <p className="mt-10 font-sans text-xs font-semibold uppercase tracking-[0.06em] text-blue2">
          {post.category}
        </p>

        <h1 className="mt-5 text-4xl text-navy md:text-5xl">{post.title}</h1>

        <p className="mt-8 font-sans text-sm text-mid">
          {post.author}
          <span aria-hidden="true"> &middot; </span>
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span aria-hidden="true"> &middot; </span>
          {post.readingTime}
        </p>
      </Section>

      {/* ---------------- Article body ---------------- */}
      <Section bg="white" width="narrow" flush className="pb-24 md:pb-32">
        <div>
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
              },
            }}
          />
        </div>
      </Section>

      {/* ---------------- Related posts ---------------- */}
      {related.length > 0 && (
        <Section bg="tint" width="wide">
          <RevealAnimation>
            <h2 className="text-4xl text-navy md:text-5xl">More reading.</h2>
          </RevealAnimation>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {related.map((item, i) => (
              <RevealAnimation key={item.slug} delay={(i % 3) as 0 | 1 | 2}>
                <RelatedCard post={item} />
              </RevealAnimation>
            ))}
          </div>
        </Section>
      )}

      <CTABand />
    </>
  )
}
