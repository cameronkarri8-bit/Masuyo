import { ImageResponse } from 'next/og'
import { getFeature, getFeatures } from '@/lib/made-in-lancashire'
import { OG_SIZE, OgWordmark, ogFonts, publicDataUri } from '@/lib/made-in-lancashire/og'

export const alt = 'A Made in Lancashire feature: the business photo with its name and town'
export const size = OG_SIZE
export const contentType = 'image/png'
export const dynamic = 'force-static'

export function generateStaticParams() {
  return getFeatures().map(f => ({ slug: f.slug }))
}

/** The business photo on the left, a petrol panel with the name and town on the right. */
export default function Image({ params }: { params: { slug: string } }) {
  const f = getFeature(params.slug)
  const photo = f ? publicDataUri(f.photo) : null
  const name = f?.business_name ?? 'Made in Lancashire'
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#E4EAEC', fontFamily: 'Albert Sans' }}>
        {photo ? <img src={photo} width={680} height={630} style={{ objectFit: 'cover' }} alt="" /> : <div style={{ display: 'flex', width: 680, height: 630, background: '#E4EAEC' }} />}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: 520, height: 630, background: '#0F3B4F', padding: 56 }}>
          <div style={{ display: 'flex', fontSize: 26, fontWeight: 600, color: '#E4EAEC' }}>
            Made in Lancashire<span style={{ color: '#4FE0E6' }}>.</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontSize: name.length > 22 ? 56 : 68, fontWeight: 800, color: '#F3F6F7', lineHeight: 1.05 }}>{name}</div>
            {f && <div style={{ display: 'flex', marginTop: 18, fontSize: 30, fontWeight: 600, color: '#E4EAEC' }}>{f.town}</div>}
          </div>
          <OgWordmark width={140} />
        </div>
      </div>
    ),
    { ...size, fonts: ogFonts() }
  )
}
