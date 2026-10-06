import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { WORDMARK } from '@/lib/brand/logo-paths'
import { getResource, getResourceSlugs } from '@/lib/resources'

export const alt = 'A Masuyo resources article'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const dynamic = 'force-static'

export function generateStaticParams() {
  return getResourceSlugs().map(slug => ({ slug }))
}

/**
 * Share card for an article: the title in Albert Sans Extra Bold on petrol,
 * with the wordmark. Built at build time from the static font instances in
 * lib/brand/fonts, which next.config.js also traces into the standalone build.
 */
export default function Image({ params }: { params: { slug: string } }) {
  const r = getResource(params.slug)
  const title = r?.title ?? 'Resources'
  const fonts = join(process.cwd(), 'lib', 'brand', 'fonts')
  const extraBold = readFileSync(join(fonts, 'AlbertSans-ExtraBold.ttf'))
  const semiBold = readFileSync(join(fonts, 'AlbertSans-SemiBold.ttf'))
  const fontSize = title.length > 70 ? 56 : title.length > 45 ? 66 : 76
  const [vx, vy, vw, vh] = WORDMARK.viewBox.split(' ').map(Number)

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#0F3B4F', padding: 72, fontFamily: 'Albert Sans' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <svg width={180} height={(180 * vh) / vw} viewBox={`${vx} ${vy} ${vw} ${vh}`}>
            <path d={WORDMARK.letters} fill="#F3F6F7" />
            <path d={WORDMARK.dot} fill="#4FE0E6" />
          </svg>
          <div style={{ display: 'flex', fontSize: 24, fontWeight: 600, color: '#E4EAEC' }}>{r ? `Resources · ${r.category}` : 'Resources'}</div>
        </div>
        <div style={{ display: 'flex', fontSize, fontWeight: 800, color: '#F3F6F7', lineHeight: 1.05, maxWidth: 1000 }}>{title}</div>
        <div style={{ display: 'flex', fontSize: 24, fontWeight: 600, color: '#E4EAEC' }}>masuyodigital.com</div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Albert Sans', data: extraBold, weight: 800, style: 'normal' },
        { name: 'Albert Sans', data: semiBold, weight: 600, style: 'normal' },
      ],
    }
  )
}
