'use client'

import { useState } from 'react'
import SectionTitle from '@/components/ui/SectionTitle'
import TextLink from '@/components/ui/TextLink'
import { BADGE_PATH, BADGE_SIZE, MIL_PATH, STICKER_MAILTO } from '@/lib/made-in-lancashire/config'
import { SITE } from '@/lib/site'
import { SHADOW } from './FormBits'
import MilImage from './MilImage'

/**
 * "Featured with us.": the badge shown in a mock website footer, so people
 * can see how it looks on their own site, then three ways to use it: the
 * code (recommended, it links back on its own), PNGs for light and dark
 * backgrounds, and SVGs for print. `href` is where the code links: the hub,
 * or a feature's own page.
 */

const BADGE_DARK = '/made-in-lancashire/badge-dark-bg.svg'
const PNG_LIGHT = '/made-in-lancashire/badge-light-bg.png'
const PNG_DARK = '/made-in-lancashire/badge-dark-bg.png'

export function badgeCode(href: string) {
  return `<a href="${SITE.url}${href}"><img src="${SITE.url}${BADGE_PATH}" alt="Featured in Made in Lancashire" width="${BADGE_SIZE.width}" height="${BADGE_SIZE.height}"></a>`
}

/** Copy text, with a fallback for browsers that block the clipboard API. */
async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const area = document.createElement('textarea')
    area.value = text
    area.setAttribute('readonly', '')
    area.style.position = 'fixed'
    area.style.opacity = '0'
    document.body.appendChild(area)
    area.select()
    area.setSelectionRange(0, text.length)
    let ok = false
    try {
      ok = document.execCommand('copy')
    } catch {
      ok = false
    }
    area.remove()
    return ok
  }
}

function CopyButton({ text, label, id }: { text: string; label: string; id: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle')
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
      <button
        type="button"
        aria-describedby={`${id}-status`}
        onClick={async () => {
          setState((await copyText(text)) ? 'copied' : 'failed')
          setTimeout(() => setState('idle'), 2500)
        }}
        className="inline-flex min-h-[3rem] w-full items-center justify-center rounded-control bg-petrol px-6 py-3 text-[16px] font-semibold text-paper transition-colors hover:bg-deep sm:w-auto"
      >
        {label}
      </button>
      <span id={`${id}-status`} role="status" className="text-small text-steel">
        {state === 'copied' ? 'Copied.' : state === 'failed' ? 'Copy did not work here. Select the text and copy it instead.' : ''}
      </span>
    </div>
  )
}

const DOWNLOAD =
  'inline-flex min-h-[3rem] w-full items-center justify-center rounded-control border-2 border-petrol px-5 py-2.5 text-[16px] font-semibold text-petrol transition-colors hover:bg-petrol hover:text-paper sm:w-auto'

export default function BadgeStrip({ href = MIL_PATH, headingId = 'badge-title' }: { href?: string; headingId?: string }) {
  const code = badgeCode(href)
  const hubUrl = `${SITE.url}${MIL_PATH}`

  return (
    <div>
      <div className="max-w-3xl">
        <SectionTitle id={headingId}>Featured with us.</SectionTitle>
        <p className="mt-4 max-w-measure text-lead text-steel">Grab the badge for your website, or ask us for a window sticker. Both free.</p>
        <div className="mt-4">
          <TextLink href={STICKER_MAILTO}>Ask for a sticker</TextLink>
        </div>
      </div>

      {/* How it looks on a site: a plain, made-up business footer. */}
      <figure className={`mt-10 overflow-hidden rounded-card border border-petrol/15 bg-white ${SHADOW}`}>
        <div className="flex flex-col gap-6 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <p className="text-body font-semibold text-[#2b2b2b]">Your business</p>
            <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-small text-[#555555]" aria-label="Example footer links">
              <li>Home</li>
              <li>About</li>
              <li>Opening hours</li>
              <li>Contact</li>
            </ul>
            <p className="mt-3 text-[13px] text-[#555555]">© {new Date().getFullYear()} Your business. All rights reserved.</p>
          </div>
          <MilImage src={BADGE_PATH} alt="Featured in Made in Lancashire, a masuyo. project" width={BADGE_SIZE.width} height={BADGE_SIZE.height} className="h-auto w-[200px] sm:w-[246px]" />
        </div>
        <figcaption className="border-t border-petrol/10 bg-paper px-5 py-3 text-small text-steel sm:px-8">How the badge looks in a website footer.</figcaption>
      </figure>

      <ol className="mt-10 grid gap-6 lg:grid-cols-3">
        <li className={`flex flex-col rounded-card bg-paper p-5 sm:p-6 ${SHADOW}`}>
          <p className="text-small font-semibold text-steel">Recommended</p>
          <h3 className="mt-1 text-subhead text-deep">Copy the code</h3>
          <label htmlFor={`${headingId}-code`} className="mt-2 text-body text-steel">
            Copy the code. It links back to us automatically.
          </label>
          <textarea
            id={`${headingId}-code`}
            readOnly
            value={code}
            rows={4}
            wrap="off"
            className="mt-3 h-28 w-full resize-none overflow-auto rounded-control border-2 border-petrol/20 bg-mist p-3 font-mono text-[13px] leading-relaxed text-deep"
            onFocus={e => e.currentTarget.select()}
          />
          <div className="mt-4">
            <CopyButton text={code} label="Copy the code" id={`${headingId}-copy-code`} />
          </div>
        </li>

        <li className={`flex flex-col rounded-card bg-paper p-5 sm:p-6 ${SHADOW}`}>
          <h3 className="text-subhead text-deep">Download PNG</h3>
          <p className="mt-2 text-body text-steel">Sharp on high resolution screens.</p>
          <div className="mt-4 flex flex-col gap-3">
            <a href={PNG_LIGHT} download="made-in-lancashire-badge.png" className={DOWNLOAD}>
              For light backgrounds
            </a>
            <a href={PNG_DARK} download="made-in-lancashire-badge-dark-backgrounds.png" className={DOWNLOAD}>
              For dark backgrounds
            </a>
          </div>
          <p className="mt-5 text-body text-steel">
            If you use the image, link it to <span className="break-all font-semibold text-deep">{hubUrl}</span>
          </p>
          <div className="mt-3">
            <CopyButton text={hubUrl} label="Copy the link" id={`${headingId}-copy-link`} />
          </div>
        </li>

        <li className={`flex flex-col rounded-card bg-paper p-5 sm:p-6 ${SHADOW}`}>
          <h3 className="text-subhead text-deep">Download SVG</h3>
          <p className="mt-2 text-body text-steel">For print and designers. Sharp at any size.</p>
          <div className="mt-4 flex flex-col gap-3">
            <a href={BADGE_PATH} download="made-in-lancashire-badge.svg" className={DOWNLOAD}>
              For light backgrounds
            </a>
            <a href={BADGE_DARK} download="made-in-lancashire-badge-dark-backgrounds.svg" className={DOWNLOAD}>
              For dark backgrounds
            </a>
          </div>
        </li>
      </ol>
    </div>
  )
}
