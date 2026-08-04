import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import Section from '@/components/Section'
import CTABand from '@/components/CTABand'
import { getAllPosts, type BlogPostMeta } from '@/lib/blog'

/*
  Posts now come from MDX files in content/blog through lib/blog.ts. The Sanity
  client and the hardcoded staticPosts array this page used before have both
  been removed. The sanity/ directory is left in place for a later cleanup pass.

  Phase 4 replaces this static metadata with generateMetadata.
*/

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Thinking out loud about digital, marketing and technology. No jargon, just useful.',
  openGraph: {
    title: 'Blog | Masuyo Digital',
    description:
      'Thinking out loud about digital, marketing and technology. No jargon, just useful.',
    url: 'https://masuyodigital.com/blog',
  },
  alternates: { canonical: 'https://masuyodigital.com/blog' },
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

function PostCard({ post }: { post: BlogPostMeta }) {
  return (
    <article className="h-full">
      {/* The whole card is the click target. */}
      <Link
        href={`/blog/${post.slug}`}
        className="hover-lift flex h-full flex-col rounded-card bg-blue-tint p-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
      >
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.06em] text-blue2">
          {post.category}
        </p>

        <h2 className="mt-4 text-2xl text-navy">{post.title}</h2>

        <p className="mt-4 font-sans text-base leading-relaxed text-mid">{post.excerpt}</p>

        <p className="mt-auto pt-7 font-sans text-sm text-mid">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span aria-hidden="true"> &middot; </span>
          {post.readingTime}
        </p>
      </Link>
    </article>
  )
}

export default function BlogIndexPage() {
  const posts = getAllPosts()

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <Section bg="white" width="wide" tight>
        <RevealAnimation>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.06em] text-blue2">
            Blog
          </p>
          <h1 className="mt-5 max-w-[16ch] text-navy hero-display">
            Thinking out loud.
          </h1>
          <p className="mt-8 max-w-[52ch] font-sans text-lg leading-relaxed text-mid">
            Practical writing on digital, marketing and technology for people running real
            businesses. No jargon, just useful.
          </p>
        </RevealAnimation>
      </Section>

      {/* ---------------- Posts ---------------- */}
      <Section bg="white" width="wide" flush className="pb-24 md:pb-32">
        {posts.length === 0 ? (
          <RevealAnimation>
            <div className="max-w-[52ch] rounded-card bg-blue-tint p-10">
              <h2 className="text-2xl text-navy">Nothing published yet.</h2>
              <p className="mt-4 font-sans text-base leading-relaxed text-mid">
                We are writing the first pieces now. In the meantime, have a look at what we
                do or get an estimate for your own project.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/services" className="btn-secondary">
                  See what we do
                </Link>
              </div>
            </div>
          </RevealAnimation>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <RevealAnimation key={post.slug} delay={(i % 3) as 0 | 1 | 2}>
                <PostCard post={post} />
              </RevealAnimation>
            ))}
          </div>
        )}
      </Section>

      <CTABand />
    </>
  )
}
