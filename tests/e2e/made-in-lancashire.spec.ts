import { expect, test } from '@playwright/test'
import { MADE_IN_LANCASHIRE_PUBLIC, NOMINATION_ENDPOINT, ROUNDUP_CONSENT } from '../../lib/made-in-lancashire/config'
import { MIL_FEATURES, MIL_PAGES } from './routes'

/**
 * Made in Lancashire: the preview switch, the hub's sections and filters, the
 * feature pages, the badge and the nomination form. The form's endpoint is
 * mocked here; the real edge function is tested from inside the database.
 */

const SITE = 'https://masuyodigital.com'

test.describe('while the preview switch is off', () => {
  test.skip(MADE_IN_LANCASHIRE_PUBLIC, 'the section is public')

  test('every page is noindex, out of the sitemap and unlinked', async ({ page, request }) => {
    const sitemap = await (await request.get('/sitemap.xml')).text()
    for (const path of MIL_PAGES) {
      const html = await (await request.get(path)).text()
      expect(html, path).toContain('<meta name="robots" content="noindex, nofollow"/>')
      expect(sitemap, path).not.toContain(`${SITE}${path}<`)
    }
    await page.goto('/')
    await expect(page.locator('a[href^="/made-in-lancashire"]')).toHaveCount(0)
    await page.goto('/resources')
    await expect(page.locator('a[href^="/made-in-lancashire"]')).toHaveCount(0)
  })

  test('the hub shows the preview note while placeholders are present', async ({ page }) => {
    await page.goto('/made-in-lancashire')
    await expect(page.getByText('Preview: placeholder content')).toBeVisible()
  })
})

test('the hub has its six sections in order, with one H1', async ({ page }) => {
  await page.goto('/made-in-lancashire')
  await expect(page.locator('h1')).toHaveCount(1)
  await expect(page.locator('h1')).toHaveText('Made in Lancashire.')
  const titles = await page.locator('main h2').allInnerTexts()
  expect(titles).toEqual(['This week.', 'Every feature so far.', 'Know somewhere brilliant?', 'Featured here?', 'Made in Lancashire is a masuyo. project.'])
  // Nominate scrolls to the form.
  await expect(page.getByRole('link', { name: 'Nominate a business' })).toHaveAttribute('href', '#nominate')
  await expect(page.locator('#nominate form')).toBeVisible()
})

test('the newest feature leads This week, and the filters narrow the grid', async ({ page }) => {
  await page.goto('/made-in-lancashire')
  const thisWeek = page.locator('section[aria-labelledby="this-week-title"]')
  await expect(thisWeek.getByRole('heading', { level: 3 })).toHaveText('Example Bakery')
  await expect(thisWeek.getByRole('link', { name: 'Read the story' })).toHaveAttribute('href', '/made-in-lancashire/example-bakery')

  const grid = page.locator('section[aria-labelledby="every-feature-title"] ul li')
  await expect(grid).toHaveCount(MIL_FEATURES.length)
  await page.getByRole('group', { name: 'Towns' }).getByRole('button', { name: 'Chorley' }).click()
  await expect(grid).toHaveCount(1)
  await expect(grid.first()).toContainText('Sample Bike Workshop')
  await page.getByRole('group', { name: 'Towns' }).getByRole('button', { name: 'All towns' }).click()
  await page.getByRole('group', { name: 'Categories' }).getByRole('button', { name: 'Florist' }).click()
  await expect(grid).toHaveCount(1)
  await expect(grid.first()).toContainText('Placeholder Florist')
})

test('feature pages: opening line, previous and next, schema and badge code', async ({ page, request }) => {
  await page.goto('/made-in-lancashire/sample-bike-workshop')
  await expect(page.locator('h1')).toHaveText('Sample Bike Workshop')
  await expect(page.getByText('Sample Bike Workshop is an independent bike shop in Chorley, featured in October 2026 for')).toBeVisible()
  await expect(page.locator('a[rel="prev"]')).toHaveAttribute('href', '/made-in-lancashire/placeholder-florist')
  await expect(page.locator('a[rel="next"]')).toHaveAttribute('href', '/made-in-lancashire/example-bakery')
  await expect(page.locator('textarea')).toHaveValue(/href="https:\/\/masuyodigital\.com\/made-in-lancashire\/sample-bike-workshop"/)
  expect(await page.title()).toBe('Sample Bike Workshop, Chorley | Made in Lancashire')

  const html = await (await request.get('/made-in-lancashire/sample-bike-workshop')).text()
  const blocks = Array.from(html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)).map(m => JSON.parse(m[1]))
  const article = blocks.find(b => b['@type'] === 'Article')
  expect(article.about['@type']).toBe('LocalBusiness')
  expect(article.about.address.addressLocality).toBe('Chorley')
  expect(article.about.sameAs.length).toBeGreaterThan(0)

  const hub = await (await request.get('/made-in-lancashire')).text()
  const collection = Array.from(hub.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)).map(m => JSON.parse(m[1])).find(b => b['@type'] === 'CollectionPage')
  expect(collection.mainEntity['@type']).toBe('ItemList')
  expect(collection.mainEntity.itemListElement).toHaveLength(MIL_FEATURES.length)
})

test('the badge, share images and placeholder images are served', async ({ request }) => {
  const badge = await request.get('/made-in-lancashire/badge.svg')
  expect(badge.status()).toBe(200)
  expect(badge.headers()['content-type']).toContain('image/svg+xml')
  for (const path of ['/made-in-lancashire/opengraph-image', '/made-in-lancashire/example-bakery/opengraph-image']) {
    const res = await request.get(path)
    expect(res.status(), path).toBe(200)
    expect(res.headers()['content-type'], path).toContain('image/png')
  }
})

test.describe('the nomination form', () => {
  test('checks fields inline and moves focus to the first problem', async ({ page }) => {
    await page.goto('/made-in-lancashire')
    await page.getByRole('button', { name: 'Send nomination' }).click()
    await expect(page.getByText('Add the business name.')).toBeVisible()
    await expect(page.getByText('Choose yes or no.')).toBeVisible()
    await expect(page.locator('#business_name')).toBeFocused()
    await page.getByLabel(ROUNDUP_CONSENT).check()
    await page.getByLabel('Business name').fill('Example')
    await page.getByRole('button', { name: 'Send nomination' }).click()
    await expect(page.getByText('Add your email to get the round-up.')).toBeVisible()
  })

  test('the round-up box starts unticked and the honeypot is hidden', async ({ page }) => {
    await page.goto('/made-in-lancashire')
    await expect(page.getByLabel(ROUNDUP_CONSENT)).not.toBeChecked()
    await expect(page.locator('#company_website')).not.toBeInViewport()
    await expect(page.getByText('Your email is only used to reply about this nomination, unless you tick the round-up box.')).toBeVisible()
  })

  async function fill(page: import('@playwright/test').Page) {
    await page.goto('/made-in-lancashire')
    await page.getByLabel('Business name').fill('Example Bakery')
    await page.getByLabel('Town', { exact: true }).fill('Leyland')
    await page.getByLabel('Why should they be featured?').fill('Best sourdough in town.')
    await page.getByRole('radio', { name: 'No' }).check()
  }

  test('sends, disables the button while sending, and thanks the visitor', async ({ page }) => {
    let body: Record<string, unknown> = {}
    await page.route(NOMINATION_ENDPOINT, async route => {
      body = route.request().postDataJSON()
      await new Promise(r => setTimeout(r, 300))
      await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' })
    })
    await fill(page)
    await page.getByRole('button', { name: 'Send nomination' }).click()
    await expect(page.getByRole('button', { name: 'Sending…' })).toBeDisabled()
    await expect(page.getByText("Thanks, I'll take a look. Every business gets checked before it's featured, so it might take a few weeks.")).toBeVisible()
    expect(body).toMatchObject({ business_name: 'Example Bakery', town: 'Leyland', is_own_business: false, roundup_opt_in: false, company_website: '' })
  })

  test('shows a friendly retry message when it fails', async ({ page }) => {
    await page.route(NOMINATION_ENDPOINT, route => route.fulfill({ status: 500, body: '{}' }))
    await fill(page)
    await page.getByRole('button', { name: 'Send nomination' }).click()
    await expect(page.getByText('That didn’t send. Please try again in a moment, or email hello@masuyodigital.com.')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Send nomination' })).toBeEnabled()
  })
})
