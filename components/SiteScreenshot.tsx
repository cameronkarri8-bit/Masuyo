import fs from 'node:fs'
import path from 'node:path'
import Image from 'next/image'
import BrowserMockup from '@/components/placeholder/BrowserMockup'
import { CHROME_PERCENT } from '@/components/placeholder/BrowserFrame'

/**
 * A real screenshot inside the same browser chrome the wireframe mockups use.
 *
 * Server component. It checks whether the file actually exists at build time and
 * falls back to the abstract wireframe when it does not, so the pages can be
 * wired up before the screenshots have been taken without anything 404ing or
 * rendering a broken image.
 *
 * The chrome is rebuilt here in HTML rather than SVG so it can hold a
 * next/image. CHROME_PERCENT keeps its proportions identical to BrowserFrame,
 * which means swapping a real screenshot in for a fallback causes no layout
 * shift at all.
 *
 * Alt text describes the interface. Never a client, never a result.
 */

const SCREENSHOT_DIR = path.join(process.cwd(), 'public', 'screenshots')

interface SiteScreenshotProps {
  /** File name inside public/screenshots, for example 'websites.png'. */
  file: string
  /**
   * Describes what the interface shows. Never name a client and never make a
   * claim about results, since the image cannot evidence either.
   */
  alt: string
  /** Outer aspect ratio, matching the mockups it sits beside. */
  aspect?: string
  rounded?: boolean
  /** Wireframe shown until the real file exists. */
  fallbackVariant?: number
  /** Passed to next/image. Defaults to a card sized slot. */
  sizes?: string
  priority?: boolean
  className?: string
}

export default function SiteScreenshot({
  file,
  alt,
  aspect = '4/3',
  rounded = true,
  fallbackVariant = 0,
  sizes = '(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw',
  priority = false,
  className = '',
}: SiteScreenshotProps) {
  const exists = fs.existsSync(path.join(SCREENSHOT_DIR, file))

  if (!exists) {
    return <BrowserMockup aspect={aspect} rounded={rounded} variant={fallbackVariant} className={className} />
  }

  return (
    <div
      style={{ aspectRatio: aspect }}
      className={`flex w-full flex-col overflow-hidden bg-navy shadow-lg ${
        rounded ? 'rounded-card' : ''
      } ${className}`}
    >
      {/* Chrome, matching BrowserFrame's proportions exactly. */}
      <div
        aria-hidden="true"
        style={{ height: `${CHROME_PERCENT}%` }}
        className="flex flex-shrink-0 items-center gap-[0.5%] bg-navy px-[1.2%]"
      >
        <span className="aspect-square h-[27%] rounded-full bg-white/35" />
        <span className="aspect-square h-[27%] rounded-full bg-white/25" />
        <span className="aspect-square h-[27%] rounded-full bg-white/[0.18]" />
        <span className="ml-[1.5%] h-[46%] w-[66%] rounded-full bg-white/[0.12]" />
      </div>

      <div className="relative min-h-0 flex-1">
        <Image src={`/screenshots/${file}`} alt={alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
      </div>
    </div>
  )
}
