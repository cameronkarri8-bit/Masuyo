import { ImageResponse } from 'next/og'

export const alt = 'Masuyo Digital: we build digital things that actually work.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Default social share card.
 *
 * Generated at build time rather than committed as a binary, because this
 * environment has no SVG to PNG toolchain. Next serves the result at
 * /opengraph-image, and picks it up automatically for any page that does not
 * declare its own image, so no metadata reference is needed.
 */
export default function OpengraphImage() {
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
              fontSize: 34,
              fontWeight: 600,
              color: '#ffffff',
              letterSpacing: '-0.01em',
            }}
          >
            Masuyo Digital
          </div>
        </div>

        {/* Tagline */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              maxWidth: 900,
            }}
          >
            We build digital things that actually work.
          </div>
          <div
            style={{
              marginTop: 32,
              fontSize: 30,
              color: 'rgba(255,255,255,0.68)',
              maxWidth: 820,
            }}
          >
            Websites, marketing and software. Fair prices, published up front.
          </div>
        </div>

        {/* Accent rule */}
        <div style={{ display: 'flex', width: 200, height: 8, background: '#35ADDF', borderRadius: 4 }} />
      </div>
    ),
    size
  )
}
