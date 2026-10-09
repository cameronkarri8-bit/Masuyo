import { expect, test } from '@playwright/test'
import { NAV_LINKS } from '../../lib/navigation'
import { INDUSTRY_PAGES } from './routes'

/**
 * The industry landing pages and their hub: what the server sends, the
 * structured data, the sources, and the links in and out. The content,
 * accessibility and brand suites cover these pages through PAGES as well.
 */

const SITE = 'https://masuyodigital.com'
const BANNED = new RegExp(['plain', 'english'].join('\\s+'), 'i')

test('the footer links to the hub and the main navigation does not', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('footer a[href="/industries"]')).toHaveText('Who we build for')
  expect(NAV_LINKS.map(l => l.href)).not.toContain('/industries')
  await expect(page.locator('header a[href="/industries"]')).toHaveCount(0)
})

test('the websites page links to the hub', async ({ page }) => {
  await page.goto('/websites')
  await expect(page.locator('a[href="/industries"]', { hasText: 'See who we build for.' })).toBeVisible()
})

test('the footer and /websites links reach the hub with no redirect', async ({ request }) => {
  expect((await request.get('/industries', { maxRedirects: 0 })).status()).toBe(200)
})

test.describe('with industry pages published', () => {
  test.skip(INDUSTRY_PAGES.length === 0, 'no industry page is published yet')

  test('the hub has one H1, a card per industry, breadcrumb schema, and is in the sitemap', async ({ page, request }) => {
    await page.goto('/industries')
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('h1')).toHaveText('Who we build for.')
    for (const path of INDUSTRY_PAGES) await expect(page.locator(`main a[href="${path}"]`).first()).toBeVisible()
    const types = await page.$$eval('script[type="application/ld+json"]', s => s.map(x => JSON.parse(x.textContent!)['@type']))
    expect(types).toContain('BreadcrumbList')
    const sitemap = await (await request.get('/sitemap.xml')).text()
    expect(sitemap).toContain(`<loc>${SITE}/industries</loc>`)
  })

  for (const path of INDUSTRY_PAGES) {
    test(`${path}: server HTML, schema, sources and canonical`, async ({ request }) => {
      const html = await (await request.get(path)).text()
      expect(html.match(/<h1[\s>]/g)?.length, 'exactly one H1').toBe(1)
      expect(html).not.toMatch(/[\u2013\u2014]/)
      expect(html).not.toMatch(BANNED)
      expect(html).toContain(`<link rel="canonical" href="${SITE}${path}"/>`)
      expect(html).toMatch(/<meta name="robots" content="index, follow"\/>/)

      const blocks = Array.from(html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)).flatMap(m => {
        const parsed = JSON.parse(m[1])
        return Array.isArray(parsed) ? parsed : [parsed]
      })
      const types = blocks.map(b => b['@type'])
      for (const t of ['Service', 'FAQPage', 'BreadcrumbList']) expect(types).toContain(t)
      const service = blocks.find(b => b['@type'] === 'Service')
      expect(service.provider.url).toBe(SITE)
      expect(service.areaServed.name).toBe('United Kingdom')
      expect(service.offers.length).toBeGreaterThan(0)

      // Every source marker links to a source that is also listed at the foot.
      const listed = Array.from(html.matchAll(/<li id="source-\d+"[^]*?href="([^"]+)"/g)).map(m => m[1])
      const cited = Array.from(html.matchAll(/<sup[^>]*><a href="([^"]+)"/g)).map(m => m[1])
      expect(listed.length).toBeGreaterThan(0)
      for (const href of cited) expect(listed).toContain(href)

      const sitemap = await (await request.get('/sitemap.xml')).text()
      expect(sitemap).toContain(`<loc>${SITE}${path}</loc>`)
    })
  }
})
