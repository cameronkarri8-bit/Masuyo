import { expect, test } from '@playwright/test'
import { PAGES } from './routes'

/**
 * The brand rules from the guidelines, checked on every page.
 *
 * - No letter spacing, apart from the minus 4% on display type.
 * - Aqua is never text or a fill on mist, paper or white. The allowed
 *   exceptions: the full stop that ends a section title, and the brand
 *   page's own logo, monogram and colour swatches, which show aqua as a ground.
 * - Headings in sentence case.
 * - Section titles end with a full stop (questions keep their question mark).
 * - One or two pen marks per section at most.
 */

const PROPER = new Set(
  'Masuyo Preston Leyland Lancashire Chorley Penwortham Buckshaw Village Bamber Bridge Google HubSpot Xero QuickBooks FreeAgent UK US CRM CRMs AI SEO CIC CICs Next.js WordPress Albert Sans North West Central Frozen Computers Nathan Cameron Karri Merchant Center Shopping Care Plus Systems Websites Website Venuva GDPR PDF SVG PNG I Notion Zapier Make Meta Analytics Search Console Facebook WhatsApp Instagram Sunday Wix Squarespace'.split(' ')
)

for (const path of PAGES) {
  test(`brand rules: ${path}`, async ({ page }) => {
    await page.goto(path)
    const report = await page.evaluate((proper: string[]) => {
      const PROPER = new Set(proper)
      const problems: string[] = []
      const rgb = (c: string) => (c.match(/\d+(\.\d+)?/g) ?? []).map(Number)
      const isAqua = (c: string) => { const [r, g, b, a = 1] = rgb(c); return a > 0.5 && Math.abs(r - 79) < 6 && Math.abs(g - 224) < 6 && Math.abs(b - 230) < 6 }
      const ground = (el: Element | null): number[] => {
        while (el) {
          const bg = getComputedStyle(el).backgroundColor
          const v = rgb(bg)
          if (v.length && (v[3] ?? 1) > 0.5) return v
          el = el.parentElement
        }
        return [228, 234, 236]
      }
      const isDark = (v: number[]) => 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2] < 90
      const main = document.querySelector('main')!
      const all = Array.from(main.querySelectorAll<HTMLElement>('*')).filter(el => !el.closest('svg'))

      for (const el of all) {
        const cs = getComputedStyle(el)
        const ownText = Array.from(el.childNodes).some(n => n.nodeType === 3 && n.textContent!.trim())
        if (ownText && cs.letterSpacing !== 'normal' && parseFloat(cs.letterSpacing) !== 0) {
          const display = el.closest('.text-display, .text-hero')
          if (!display) problems.push(`letter spacing ${cs.letterSpacing} on "${el.textContent!.trim().slice(0, 30)}"`)
        }
        if (ownText && isAqua(cs.color) && !isDark(ground(el.parentElement))) {
          const isTitleDot = el.textContent!.trim() === '.'
          if (!isTitleDot) problems.push(`aqua text on a light ground: "${el.textContent!.trim().slice(0, 30)}"`)
        }
        if (isAqua(cs.backgroundColor) && !isDark(ground(el.parentElement)) && !el.closest('[aria-labelledby="brand-logo"], [aria-labelledby="brand-monogram"], [aria-labelledby="brand-colour"]')) {
          problems.push(`aqua fill on a light ground: <${el.tagName.toLowerCase()} class="${el.className.toString().slice(0, 40)}">`)
        }
      }

      for (const h of Array.from(main.querySelectorAll<HTMLElement>('h1, h2, h3'))) {
        if (h.closest('.sr-only')) continue
        const words = h.innerText.replace(/[.,:;?!"“”'()]/g, ' ').split(/\s+/).filter(Boolean).slice(1)
        const caps = words.filter(w => /^[A-Z][a-z]/.test(w) && !PROPER.has(w))
        if (caps.length >= 3 && caps.length / words.length > 0.5) problems.push(`title case heading: "${h.innerText}"`)
      }

      // Section titles only. A heading inside a card link is a name (a client,
      // an article), not a statement, so it does not take the dot.
      for (const h of Array.from(main.querySelectorAll<HTMLElement>('h2.text-heading, h2.text-title'))) {
        if (h.closest('a')) continue
        const t = h.innerText.trim()
        if (!/[.?]$/.test(t)) problems.push(`section title without a full stop: "${t}"`)
      }

      for (const section of Array.from(main.querySelectorAll('section'))) {
        const own = Array.from(section.querySelectorAll('svg.pen-draw')).filter(s => s.closest('section') === section)
        if (own.length > 2) problems.push(`${own.length} pen marks in one section`)
      }
      return problems
    }, Array.from(PROPER))
    expect(report, path).toEqual([])
  })
}
