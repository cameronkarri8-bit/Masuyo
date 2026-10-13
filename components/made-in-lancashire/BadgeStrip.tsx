'use client'

import { useState } from 'react'
import SectionTitle from '@/components/ui/SectionTitle'
import TextLink from '@/components/ui/TextLink'
import { BADGE_PATH, BADGE_SIZE, STICKER_MAILTO } from '@/lib/made-in-lancashire/config'
import { SITE } from '@/lib/site'
import MilImage from './MilImage'

/**
 * "Featured here?": the badge, its embed code and a sticker request. The code
 * links the badge to `href` (the feature page on a feature, the hub on the hub).
 */
export default function BadgeStrip({ href, headingId = 'badge-title' }: { href: string; headingId?: string }) {
  const [copied, setCopied] = useState(false)
  const code = `<a href="${SITE.url}${href}"><img src="${SITE.url}${BADGE_PATH}" alt="Featured in Made in Lancashire" width="${BADGE_SIZE.width}" height="${BADGE_SIZE.height}"></a>`

  async function copy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16">
      <div>
        <SectionTitle id={headingId}>Featured here?</SectionTitle>
        <p className="mt-4 max-w-measure text-lead text-steel">Grab the badge for your website, or ask for a window sticker. Both free.</p>
        <div className="mt-6">
          <TextLink href={STICKER_MAILTO}>Ask for a sticker</TextLink>
        </div>
      </div>
      <div className="rounded-card bg-paper p-6 shadow-[0_1px_2px_rgba(13,26,32,0.06),0_8px_24px_rgba(13,26,32,0.06)] sm:p-8">
        <MilImage src={BADGE_PATH} alt="The Made in Lancashire badge: Featured in Made in Lancashire, a masuyo. project" width={BADGE_SIZE.width} height={BADGE_SIZE.height} />
        <label htmlFor={`${headingId}-code`} className="mt-6 block text-small font-semibold text-deep">
          Badge code for your website
        </label>
        <textarea
          id={`${headingId}-code`}
          readOnly
          value={code}
          rows={4}
          className="mt-2 w-full resize-none rounded-control border-2 border-petrol/20 bg-mist p-3 font-mono text-[0.8125rem] leading-relaxed text-deep"
          onFocus={e => e.currentTarget.select()}
        />
        <div className="mt-4 flex items-center gap-4">
          <button
            type="button"
            onClick={copy}
            className="inline-flex min-h-[3rem] items-center rounded-control bg-petrol px-6 py-3 font-semibold text-paper transition-colors hover:bg-deep"
          >
            Copy badge code
          </button>
          <span role="status" className="text-small text-steel">
            {copied ? 'Copied.' : ''}
          </span>
        </div>
      </div>
    </div>
  )
}
