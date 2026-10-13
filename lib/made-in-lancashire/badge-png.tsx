import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { BADGE_SIZE } from './config'

/**
 * A badge PNG, rendered from its SVG when the site builds, at twice the
 * badge's display size so it is sharp on high density screens. The SVG in
 * public/made-in-lancashire is the one source for every version.
 */
export function badgePng(svgFile: 'badge.svg' | 'badge-dark-bg.svg') {
  const svg = readFileSync(join(process.cwd(), 'public', 'made-in-lancashire', svgFile))
  const width = BADGE_SIZE.width * 2
  const height = BADGE_SIZE.height * 2
  const src = `data:image/svg+xml;base64,${svg.toString('base64')}`
  return new ImageResponse(
    (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} width={width} height={height} alt="" />
    ),
    { width, height, headers: { 'Cache-Control': 'public, max-age=86400' } }
  )
}
