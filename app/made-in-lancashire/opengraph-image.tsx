import { ImageResponse } from 'next/og'
import { OG_SIZE, OgWordmark, ogFonts } from '@/lib/made-in-lancashire/og'

export const alt = 'Made in Lancashire: independent Lancashire businesses worth knowing, from masuyo.'
export const size = OG_SIZE
export const contentType = 'image/png'
export const dynamic = 'force-static'

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#0F3B4F', padding: 72, fontFamily: 'Albert Sans' }}>
        <OgWordmark />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 104, fontWeight: 800, color: '#F3F6F7', lineHeight: 1 }}>
            Made in Lancashire<span style={{ color: '#4FE0E6' }}>.</span>
          </div>
          <div style={{ display: 'flex', marginTop: 28, fontSize: 34, fontWeight: 600, color: '#E4EAEC', maxWidth: 900 }}>
            Independent Lancashire businesses worth knowing. Picked on merit, featured for free.
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 24, fontWeight: 600, color: '#E4EAEC' }}>masuyodigital.com/made-in-lancashire</div>
      </div>
    ),
    { ...size, fonts: ogFonts() }
  )
}
