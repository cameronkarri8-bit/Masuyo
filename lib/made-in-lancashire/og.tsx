import { readFileSync } from 'node:fs'
import { extname, join } from 'node:path'
import { WORDMARK } from '@/lib/brand/logo-paths'

/** Shared pieces for the Made in Lancashire share images. */

export const OG_SIZE = { width: 1200, height: 630 }

export function ogFonts() {
  const dir = join(process.cwd(), 'lib', 'brand', 'fonts')
  return [
    { name: 'Albert Sans', data: readFileSync(join(dir, 'AlbertSans-ExtraBold.ttf')), weight: 800 as const, style: 'normal' as const },
    { name: 'Albert Sans', data: readFileSync(join(dir, 'AlbertSans-SemiBold.ttf')), weight: 600 as const, style: 'normal' as const },
  ]
}

const TYPES: Record<string, string> = { '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp' }

/** A file from /public as a data URI, so the image renders at build time with no network. */
export function publicDataUri(publicPath: string): string | null {
  try {
    const file = join(process.cwd(), 'public', publicPath.replace(/^\//, ''))
    const type = TYPES[extname(file).toLowerCase()]
    if (!type) return null
    return `data:${type};base64,${readFileSync(file).toString('base64')}`
  } catch {
    return null
  }
}

export function OgWordmark({ width = 160 }: { width?: number }) {
  const [vx, vy, vw, vh] = WORDMARK.viewBox.split(' ').map(Number)
  return (
    <svg width={width} height={(width * vh) / vw} viewBox={`${vx} ${vy} ${vw} ${vh}`}>
      <path d={WORDMARK.letters} fill="#F3F6F7" />
      <path d={WORDMARK.dot} fill="#4FE0E6" />
    </svg>
  )
}
