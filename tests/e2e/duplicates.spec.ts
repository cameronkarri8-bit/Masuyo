import { expect, test } from '@playwright/test'
import { PAGES } from './routes'

/**
 * One closing invitation per page, and never the same offer twice in a row.
 *
 * Every route on the site (the route list plus everything in the sitemap) is
 * opened and its main content checked for:
 *   - more than one ClosingBand
 *   - the same call to action in two sections side by side, such as a free
 *     check line straight above a closing band that also offers it
 *   - the same section heading twice
 */

/** Where a call to action leads. A link to one of these is an invitation, not a reference. */
const CTA_PATHS = ['/check', '/start']

async function routes(request: import('@playwright/test').APIRequestContext): Promise<string[]> {
  const xml = await (await request.get('/sitemap.xml')).text()
  const fromSitemap = Array.from(xml.matchAll(/<loc>https:\/\/masuyodigital\.com([^<]*)<\/loc>/g)).map(m => m[1] || '/')
  return Array.from(new Set([...PAGES, ...fromSitemap, '/check'])).filter(p => p !== '/work/frozen-computers')
}

test('no page repeats a section, a heading or a call to action', async ({ page, request }) => {
  test.setTimeout(300_000)
  const problems: string[] = []
  const all = await routes(request)
  console.log(`duplicates: checking ${all.length} routes`)
  expect(all.length).toBeGreaterThan(30)
  for (const path of all) {
    await page.goto(path)
    const found = await page.evaluate(ctaPaths => {
      const main = document.querySelector('main')
      if (!main) return { bands: 0, adjacent: [] as string[], headings: [] as string[] }
      const bands = main.querySelectorAll('[data-closing-band]').length

      // Each top level block of the page, and the invitations in it.
      const blocks = Array.from(main.children).filter(el => (el as HTMLElement).offsetHeight > 0)
      const ctas = blocks.map(el => {
        const out = new Set<string>()
        el.querySelectorAll<HTMLAnchorElement>('a[href]').forEach(a => {
          const u = new URL(a.href, location.href)
          if (u.origin === location.origin && ctaPaths.includes(u.pathname)) out.add(u.pathname)
        })
        return out
      })
      const adjacent: string[] = []
      for (let i = 1; i < blocks.length; i++) {
        for (const p of Array.from(ctas[i])) if (ctas[i - 1].has(p)) adjacent.push(`${p} in blocks ${i} and ${i + 1}`)
      }

      const seen = new Map<string, number>()
      main.querySelectorAll('h1, h2').forEach(h => {
        if (h.closest('.sr-only') || h.classList.contains('sr-only')) return
        const t = (h.textContent ?? '').replace(/\s+/g, ' ').trim().toLowerCase()
        if (t) seen.set(t, (seen.get(t) ?? 0) + 1)
      })
      const headings = Array.from(seen).filter(([, n]) => n > 1).map(([t, n]) => `"${t}" x${n}`)
      return { bands, adjacent, headings }
    }, CTA_PATHS)
    if (found.bands > 1) problems.push(`${path}: ${found.bands} closing bands`)
    for (const a of found.adjacent) problems.push(`${path}: the same call to action twice in a row (${a})`)
    for (const h of found.headings) problems.push(`${path}: repeated heading ${h}`)
  }
  expect(problems, problems.join('\n')).toEqual([])
})
