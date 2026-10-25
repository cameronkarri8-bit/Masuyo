import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { WORDMARK } from '@/lib/brand/logo-paths'

export const alt = 'Stepping back from web design? Your clients are in safe hands. A guide from masuyo for web designers.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const dynamic = 'force-static'

/** Share card in the Resources style: the headline in Albert Sans Extra Bold on petrol, with the wordmark. */
export default function Image() {
  const fonts = join(process.cwd(), 'lib', 'brand', 'fonts')
  const extraBold = readFileSync(join(fonts, 'AlbertSans-ExtraBold.ttf'))
  const semiBold = readFileSync(join(fonts, 'AlbertSans-SemiBold.ttf'))
  const [vx, vy, vw, vh] = WORDMARK.viewBox.split(' ').map(Number)

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#0F3B4F', padding: 72, fontFamily: 'Albert Sans' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <svg width={180} height={(180 * vh) / vw} viewBox={`${vx} ${vy} ${vw} ${vh}`}>
            <path d={WORDMARK.letters} fill="#F3F6F7" />
            <path d={WORDMARK.dot} fill="#4FE0E6" />
          </svg>
          <div style={{ display: 'flex', fontSize: 24, fontWeight: 600, color: '#E4EAEC' }}>For web designers stepping back</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 1000 }}>
          <div style={{ display: 'flex', fontSize: 66, fontWeight: 800, color: '#F3F6F7', lineHeight: 1.05 }}>Stepping back from web design?</div>
          <div style={{ display: 'flex', fontSize: 66, fontWeight: 800, color: '#F3F6F7', lineHeight: 1.05, marginTop: 12 }}>
            Your clients are in safe hands<span style={{ color: '#4FE0E6' }}>.</span>
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 24, fontWeight: 600, color: '#E4EAEC' }}>masuyodigital.com/sell-your-web-design-clients</div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Albert Sans', data: extraBold, weight: 800, style: 'normal' },
        { name: 'Albert Sans', data: semiBold, weight: 600, style: 'normal' },
      ],
    },
  )
}
