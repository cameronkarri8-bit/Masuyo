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

  generateMetadata and JSON-LD arrive in Phase 4.
*/

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams(): { slug: string }[] {
  return getAllPostSlugs().map(slug => ({ slug }))
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

  return (
    <>
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
