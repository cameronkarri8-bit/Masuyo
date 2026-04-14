import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/client'
import { allPostsQuery } from '@/sanity/queries'
import type { SanityPost } from '@/sanity/types'
import RevealAnimation from '@/components/RevealAnimation'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thinking out loud about digital, marketing and technology. No jargon. Just useful.',
  openGraph: {
    title: 'Blog – Masuyo Digital',
    description: 'Thinking out loud about digital, marketing and technology.',
    url: 'https://masuyodigital.com/blog',
  },
  alternates: { canonical: 'https://masuyodigital.com/blog' },
}

export const revalidate = 60

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function BlogIndexPage() {
  let posts: SanityPost[] = []
  try {
    posts = await client.fetch(allPostsQuery)
  } catch {
    // Sanity not configured yet — show empty state
  }

  return (
    <>
      {/* Hero */}
      <section className="crosshatch-bg pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-2xl">
            <RevealAnimation>
              <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4 leading-tight" style={{ fontFamily: 'Fraunces, serif' }}>
                Thinking out loud about digital, marketing and technology.
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <p className="text-lg" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif' }}>
                No jargon. Just useful.
              </p>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-base" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                Posts coming soon. Check back shortly.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, i) => (
                <RevealAnimation key={post._id} delay={(i % 3 + 1) as 1 | 2 | 3}>
                  <Link
                    href={`/blog/${post.slug.current}`}
                    className="group flex flex-col rounded-lg overflow-hidden transition-colors hover:bg-light"
                    style={{ border: '1px solid var(--border)' }}
                  >
                    {post.featuredImage?.asset?.url && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={post.featuredImage.asset.url}
                          alt={post.featuredImage.alt || post.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="p-6 flex flex-col gap-3 flex-1">
                      <div className="flex items-center gap-3">
                        {post.category && (
                          <span
                            className="text-xs font-semibold px-2.5 py-1 rounded"
                            style={{ background: 'rgba(53,173,223,0.1)', color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}
                          >
                            {post.category}
                          </span>
                        )}
                        <span className="text-xs" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                          {formatDate(post.publishedAt)}
                        </span>
                      </div>
                      <h2 className="text-lg font-semibold text-ink leading-snug" style={{ fontFamily: 'Fraunces, serif' }}>
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                          {post.excerpt}
                        </p>
                      )}
                      <span
                        className="text-sm font-medium flex items-center gap-1 mt-auto"
                        style={{ color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}
                      >
                        Read more
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M3 7h8M7.5 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </div>
                  </Link>
                </RevealAnimation>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
