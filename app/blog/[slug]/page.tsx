import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/client'
import { postBySlugQuery, allPostSlugsQuery, latestPostsQuery } from '@/sanity/queries'
import type { SanityPost } from '@/sanity/types'

export const revalidate = 60

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch(allPostSlugsQuery)
    return slugs
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post: SanityPost = await client.fetch(postBySlugQuery, { slug: params.slug })
    if (!post) return {}
    return {
      title: post.title,
      description: post.excerpt,
      openGraph: {
        title: `${post.title} – Masuyo Digital`,
        description: post.excerpt,
        url: `https://masuyodigital.com/blog/${params.slug}`,
        images: post.featuredImage?.asset?.url ? [{ url: post.featuredImage.asset.url }] : [],
      },
      alternates: { canonical: `https://masuyodigital.com/blog/${params.slug}` },
    }
  } catch {
    return {}
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const portableTextComponents = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-2xl font-semibold text-ink mt-10 mb-4" style={{ fontFamily: 'Fraunces, serif' }}>{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-xl font-semibold text-ink mt-8 mb-3" style={{ fontFamily: 'Fraunces, serif' }}>{children}</h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-base mb-5 leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 pl-4 my-6 italic" style={{ borderColor: 'var(--blue)', color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>{children}</blockquote>
    ),
  },
  types: {
    image: ({ value }: { value: { asset?: { url: string }; alt?: string; caption?: string } }) => {
      if (!value?.asset?.url) return null
      return (
        <figure className="my-8">
          <div className="relative w-full h-72 md:h-96 rounded-lg overflow-hidden">
            <Image
              src={value.asset.url}
              alt={value.alt || ''}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          {value.caption && (
            <figcaption className="text-xs text-center mt-2" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
  marks: {
    link: ({ children, value }: { children?: React.ReactNode; value?: { href: string } }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)', textDecoration: 'underline' }}>
        {children}
      </a>
    ),
    strong: ({ children }: { children?: React.ReactNode }) => <strong className="font-semibold text-ink">{children}</strong>,
  },
}

export default async function BlogPostPage({ params }: Props) {
  let post: SanityPost | null = null
  let relatedPosts: SanityPost[] = []

  try {
    post = await client.fetch(postBySlugQuery, { slug: params.slug })
    relatedPosts = await client.fetch(latestPostsQuery)
    relatedPosts = relatedPosts.filter((p) => p.slug.current !== params.slug).slice(0, 3)
  } catch {
    // Sanity not configured
  }

  if (!post) notFound()

  return (
    <>
      {/* Featured image */}
      {post.featuredImage?.asset?.url && (
        <div className="relative w-full h-72 md:h-[480px] mt-16" style={{ background: 'var(--light)' }}>
          <Image
            src={post.featuredImage.asset.url}
            alt={post.featuredImage.alt || post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      )}

      {/* Post content */}
      <article className="py-16 md:py-24" style={{ marginTop: post.featuredImage ? '0' : '64px' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
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
            {post.author && (
              <>
                <span style={{ color: 'var(--border)' }}>·</span>
                <span className="text-xs" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                  {post.author}
                </span>
              </>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-semibold text-ink mb-8 leading-tight" style={{ fontFamily: 'Fraunces, serif' }}>
            {post.title}
          </h1>

          {/* Body */}
          {post.body && (
            // @ts-expect-error PortableText types
            <PortableText value={post.body} components={portableTextComponents} />
          )}

          {/* Back link */}
          <div className="mt-12 pt-8" style={{ borderTop: '1px solid var(--border)' }}>
            <Link
              href="/blog"
              className="text-sm font-medium flex items-center gap-1 transition-colors hover:opacity-80"
              style={{ color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M11 7H3M6.5 4L3 7l3.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to blog
            </Link>
          </div>
        </div>
      </article>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16" style={{ background: 'var(--light)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-ink mb-8" style={{ fontFamily: 'Fraunces, serif' }}>
              More from the blog
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related._id}
                  href={`/blog/${related.slug.current}`}
                  className="group p-6 rounded-lg transition-colors hover:bg-white"
                  style={{ border: '1px solid var(--border)', background: 'var(--white)' }}
                >
                  {related.category && (
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded mb-3 inline-block"
                      style={{ background: 'rgba(53,173,223,0.1)', color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}
                    >
                      {related.category}
                    </span>
                  )}
                  <h3 className="text-base font-semibold text-ink mb-2 leading-snug" style={{ fontFamily: 'Fraunces, serif' }}>
                    {related.title}
                  </h3>
                  <p className="text-xs" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                    {formatDate(related.publishedAt)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
