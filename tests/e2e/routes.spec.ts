import { expect, test } from '@playwright/test'
import { createHmac } from 'node:crypto'
import { PAGES } from './routes'
import nextConfig from '../../next.config.js'

test.describe('every new page', () => {
  for (const path of PAGES) {
    test(`${path} returns 200`, async ({ request }) => {
      const res = await request.get(path, { maxRedirects: 0 })
      expect(res.status()).toBe(200)
    })
  }

  test('every sitemap entry returns 200', async ({ request }) => {
    const xml = await (await request.get('/sitemap.xml')).text()
    const paths = [...xml.matchAll(/<loc>https:\/\/masuyodigital\.com([^<]*)<\/loc>/g)].map(m => m[1] || '/')
    expect(paths.length).toBeGreaterThan(20)
    for (const p of paths) expect((await request.get(p, { maxRedirects: 0 })).status(), p).toBe(200)
  })

  test('the unpublished case study is noindex and out of the sitemap', async ({ page, request }) => {
    await page.goto('/work/frozen-computers')
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
    expect(await (await request.get('/sitemap.xml')).text()).not.toContain('/work/frozen-computers')
    await page.goto('/work')
    await expect(page.locator('a[href="/work/frozen-computers"]')).toHaveCount(0)
  })
})

test.describe('every old URL redirects', () => {
  test('each redirect in next.config.js answers 301 to its target', async ({ request }) => {
    const redirects = (await nextConfig.redirects!()) as { source: string; destination: string }[]
    const samples: Record<string, string> = {
      '/technology/:path*': '/technology/crm',
      '/marketing/:path*': '/marketing/paid-ads',
      '/products/:path*': '/products/client-portal',
      '/blog/:slug': '/blog/what-is-virtual-marketing',
      '/guides/:slug': '/guides/website-cost-uk',
    }
    for (const r of redirects) {
      const source = samples[r.source] ?? r.source
      const expected = r.destination.includes(':slug') ? r.destination.replace(':slug', source.split('/').pop()!) : r.destination
      const res = await request.get(source, { maxRedirects: 0 })
      expect(res.status(), source).toBe(301)
      expect(new URL(res.headers()['location'], 'http://x').pathname + new URL(res.headers()['location'], 'http://x').search, source).toBe(expected)
    }
  })

  test('the kept CIC page is not caught by the industries redirects', async ({ request }) => {
    expect((await request.get('/industries/community-interest-companies', { maxRedirects: 0 })).status()).toBe(200)
  })
})

test.describe('the proposal and concept routes still render', () => {
  const dgp = createHmac('sha256', 'e2e-password').update('dgp_session_v1').digest('hex')
  const ncp = createHmac('sha256', 'E2E-PASSWORD').update('ncp_session_v1').digest('hex')

  test('Diogenes: gate, then content with a session', async ({ page, context }) => {
    await page.goto('/diogenes-proposal')
    await expect(page.locator('input[type="password"]')).toBeVisible()
    await context.addCookies([{ name: 'dgp_session', value: dgp, url: page.url() }])
    await page.goto('/diogenes-proposal')
    await expect(page.getByRole('heading', { name: 'Diogenes Sun Club' })).toBeVisible()
  })

  test('Northcote: gate, then content with a session', async ({ page, context }) => {
    await page.goto('/northcote-proposal')
    await expect(page.locator('input[type="password"]')).toBeVisible()
    await context.addCookies([{ name: 'ncp_session', value: ncp, url: page.url() }])
    await page.goto('/northcote-proposal')
    await expect(page.locator('main')).toContainText('Northcote')
  })

  test('the Frozen Computers concept keeps its notice and its own chrome', async ({ page }) => {
    await page.goto('/frozen-computers')
    await expect(page.getByRole('note').first()).toContainText('Design concept by Masuyo Digital.')
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
    // The site nav is hidden on standalone routes.
    await expect(page.locator('#mobile-menu')).toHaveCount(0)
  })
})
