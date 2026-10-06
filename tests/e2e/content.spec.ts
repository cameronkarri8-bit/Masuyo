import { expect, test } from '@playwright/test'
import { PAGES } from './routes'

/**
 * The content rules, checked against what visitors and search engines
 * actually receive: the visible text, the title, every meta description and
 * Open Graph field, every alt text and aria-label, and the structured data.
 *
 * The proposal and concept routes are out of scope for the redesign and are
 * not scanned.
 */

const FORBIDDEN: [string, RegExp][] = [
  ['an em dash', /—/],
  ['an en dash', /–/],
  ['PLACEHOLDER', /PLACEHOLDER/i],
  ['TODO', /\bTODO\b/],
  ['Lorem', /\bLorem\b/i],
  ['[confirm', /\[confirm/i],
  ['a bracketed placeholder', /\[(?:client|confirm|set |location|measured|approved|number|insert|tbc|tbd|name|date|x\])[^\]]*\]/i],
  ['£249', /£249/],
  ['£349', /£349/],
  ['plus VAT', /plus VAT/i],
  ['excluding VAT', /excluding VAT/i],
  ['seamless', /seamless/i],
  ['best in class', /best[ -]in[ -]class/i],
]

for (const path of PAGES) {
  test(`content rules: ${path}`, async ({ page }) => {
    await page.goto(path)
    // Open every accordion and details panel, so hidden answers are checked too.
    await page.evaluate(() => {
      document.querySelectorAll('details').forEach(d => d.setAttribute('open', ''))
      document.querySelectorAll('[hidden]').forEach(el => el.removeAttribute('hidden'))
    })
    const text = await page.evaluate(() => {
      const parts = [document.title, document.body.innerText]
      document.querySelectorAll('meta[name="description"], meta[property^="og:"], meta[name^="twitter:"]').forEach(m => parts.push(m.getAttribute('content') ?? ''))
      document.querySelectorAll('[alt], [aria-label], [title]').forEach(el => parts.push(el.getAttribute('alt') ?? '', el.getAttribute('aria-label') ?? '', el.getAttribute('title') ?? ''))
      document.querySelectorAll('script[type="application/ld+json"]').forEach(s => parts.push(s.textContent ?? ''))
      return parts.join('\n')
    })
    for (const [name, pattern] of FORBIDDEN) {
      const hit = text.match(pattern)
      expect(hit, `${path} contains ${name}: "${hit ? text.slice(Math.max(0, hit.index! - 40), hit.index! + 40) : ''}"`).toBeNull()
    }
  })
}

test('llms.txt and the feed follow the same rules', async ({ request }) => {
  for (const path of ['/llms.txt', '/resources/rss.xml']) {
    const body = await (await request.get(path)).text()
    for (const [name, pattern] of FORBIDDEN) expect(body.match(pattern), `${path} contains ${name}`).toBeNull()
  }
})
