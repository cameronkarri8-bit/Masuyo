import { ImageResponse } from 'next/og'
import { getPostBySlug } from '@/lib/blog'

export const alt = 'Masuyo Digital blog post'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Per post social share card, following the same file convention and visual
 * treatment as app/opengraph-image.tsx.
 *
 * A post can still override this with an ogImage in its frontmatter. When it
 * does not, Next serves this route and generateMetadata points at it.
 */
export default function BlogPostOpengraphImage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  const title = post === null ? 'Masuyo Digital' : post.title
  const category = post === null ? 'Blog' : post.category

  // Long titles drop a step so they cannot overflow the card. The longest
  // realistic headline still fits on four lines at the smaller size.
  const fontSize = title.length > 90 ? 54 : title.length > 60 ? 64 : 76

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#1A2939',
          padding: '80px',
        }}
      >
        {/* Wordmark */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: '#35ADDF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 34,
              fontWeight: 700,
              color: '#ffffff',
            }}
          >
            M
          </div>
          <div
            style={{
              marginLeft: 24,
              fontSize: 32,
              fontWeight: 600,
              color: '#35ADDF',
              letterSpacing: '-0.01em',
            }}
          >
            Masuyo Digital
          </div>
        </div>

        {/* Title */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 26,
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.55)',
            }}
          >
            {category}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize,
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              maxWidth: 1000,
              // Guards against a single very long word widening the card.
              overflow: 'hidden',
            }}
          >
            {title}
          </div>
        </div>

        {/* Accent rule */}
        <div style={{ display: 'flex', width: 200, height: 8, background: '#35ADDF', borderRadius: 4 }} />
      </div>
    ),
    size
  )
}
