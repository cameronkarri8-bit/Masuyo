import { expect, test } from '@playwright/test'
import { PAGES } from './routes'

/**
 * Performance basics on every page:
 * - no image skips next/image (every <img> must come from it),
 * - fonts are self hosted by next/font, with no request to Google at runtime,
 * - no layout shift from late loading elements (CLS under 0.05, well inside
 *   Google's 0.1 "good" line) while the page loads and is scrolled.
 */

for (const path of PAGES) {
  test(`performance: ${path}`, async ({ page }) => {
    const external: string[] = []
    page.on('request', r => {
      const u = new URL(r.url())
      if (u.hostname !== 'localhost') external.push(u.hostname)
    })
    await page.addInitScript(() => {
      ;(window as unknown as { __cls: number }).__cls = 0
      new PerformanceObserver(list => {
        for (const e of list.getEntries() as (PerformanceEntry & { value: number; hadRecentInput: boolean })[]) {
          if (!e.hadRecentInput) (window as unknown as { __cls: number }).__cls += e.value
        }
      }).observe({ type: 'layout-shift', buffered: true })
    })
    await page.goto(path, { waitUntil: 'load' })
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y)
        await new Promise(r => setTimeout(r, 30))
      }
    })
    await page.waitForTimeout(300)
    const cls = await page.evaluate(() => (window as unknown as { __cls: number }).__cls)
    expect(cls, `${path} layout shift`).toBeLessThan(0.05)

    const rawImages = await page.evaluate(() =>
      Array.from(document.querySelectorAll('main img')).filter(img => !(img as HTMLImageElement).srcset && !img.getAttribute('data-nimg')).map(i => i.getAttribute('src'))
    )
    expect(rawImages, `${path} images outside next/image`).toEqual([])

    const fonts = await page.evaluate(() => performance.getEntriesByType('resource').map(r => r.name).filter(n => /\.(woff2?|ttf)(\?|$)/.test(n)))
    for (const f of fonts) expect(new URL(f).pathname.startsWith('/_next/static/media/'), f).toBe(true)
    expect(external.filter(h => /fonts\.(googleapis|gstatic)\.com/.test(h)), `${path} font requests to Google`).toEqual([])
  })
}
