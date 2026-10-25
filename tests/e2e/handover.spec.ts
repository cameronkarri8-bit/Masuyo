import { expect, test } from '@playwright/test'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { OUTBOX } from '../../playwright.config'

/**
 * /sell-your-web-design-clients, for web designers handing over their
 * clients: what is on the page, its structured data, the confidential form
 * (tagged "handover"), the printable checklist, and how it works on a phone.
 */

const PATH = '/sell-your-web-design-clients'

function outbox(): Record<string, string>[] {
  if (!existsSync(OUTBOX)) return []
  return readFileSync(OUTBOX, 'utf8').trim().split('\n').filter(Boolean).map(l => JSON.parse(l))
}

test.beforeEach(() => writeFileSync(OUTBOX, ''))

test('one H1, question-led sections in order, and every word in the server HTML', async ({ page, request }) => {
  const html = await (await request.get(PATH)).text()
  for (const words of ['Stepping back from web design?', 'The short answer', 'How does a handover work?', 'How do I get paid?', 'What happens to my clients?', 'What do I need to have ready?', 'Why hand over to masuyo?', 'Will you contact my clients without asking me?']) {
    expect(html, words).toContain(words.replace("'", '&#x27;'))
  }
  await page.goto(PATH)
  await expect(page.locator('h1')).toHaveCount(1)
  await expect(page.locator('h1')).toHaveText('Stepping back from web design? Your clients are in safe hands.')
  const h2s = await page.locator('main h2').allInnerTexts()
  const order = ['The short answer.', 'Is this for me?', 'How does a handover work?', 'How do I get paid?', 'What happens to my clients?', 'What do I need to have ready?', 'Why hand over to masuyo?', 'Questions designers ask.', 'How do I start a confidential chat?', 'Who will I be talking to?']
  expect(h2s.map(t => t.trim())).toEqual(order)
  // Not in the main navigation, but in the footer.
  await expect(page.locator('header nav a[href="/sell-your-web-design-clients"]')).toHaveCount(0)
  await expect(page.locator('footer a[href="/sell-your-web-design-clients"]')).toHaveCount(1)
})

test('the metadata, structured data and share image are in place, and it is indexable', async ({ page, request }) => {
  await page.goto(PATH)
  await expect(page).toHaveTitle('Sell your web design clients: Lancashire and UK | masuyo')
  const description = await page.locator('meta[name="description"]').getAttribute('content')
  expect(description!.length).toBeGreaterThanOrEqual(140)
  expect(description!.length).toBeLessThanOrEqual(160)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://masuyodigital.com${PATH}`)
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /\/sell-your-web-design-clients\/opengraph-image/)
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image')
  const robots = (await page.locator('meta[name="robots"]').getAttribute('content')) ?? ''
  expect(robots).not.toMatch(/noindex|nosnippet|max-snippet/)

  const blocks = (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap(t => {
    const v = JSON.parse(t)
    return Array.isArray(v) ? v : [v]
  })
  const types = blocks.map(b => b['@type'])
  expect(types).toEqual(expect.arrayContaining(['Organization', 'WebPage', 'Service', 'BreadcrumbList']))
  const service = blocks.find(b => b['@type'] === 'Service')
  expect(service.areaServed.map((a: { name: string }) => a.name)).toEqual(['United Kingdom', 'Lancashire'])
  // The Service describes the page in the page's own words.
  await expect(page.getByText(service.description)).toBeVisible()

  const image = await request.get(`${PATH}/opengraph-image`)
  expect(image.status()).toBe(200)
  expect(image.headers()['content-type']).toBe('image/png')
  expect(await (await request.get('/sitemap.xml')).text()).toContain(`<loc>https://masuyodigital.com${PATH}</loc>`)
})

test('the copy keeps the brand rules on the rendered page', async ({ page }) => {
  await page.goto(PATH)
  const text = await page.locator('main').innerText()
  expect(text).not.toMatch(/[–—]/)
  expect(text).not.toMatch(/\bMasuyo\b/)
  expect(text).not.toMatch(/plain english|\bstudio\b|\bfreelancer\b|seamless|unlock|leverage|\d+\s?%/i)
})

test('the confidential form is sent tagged "handover", through the usual spam checks', async ({ page }) => {
  const errors: string[] = []
  page.on('console', m => m.type() === 'error' && errors.push(m.text()))
  page.on('pageerror', e => errors.push(e.message))
  await page.goto(PATH)
  const form = page.locator('form', { has: page.locator('input[name="source"][value="handover"]') })
  await expect(form.getByText('Confidential.')).toBeVisible()
  await expect(form.locator('input[name="company_url"]')).toHaveCount(1)

  // The form refuses anything sent faster than a person could fill it in, so wait before the first try.
  await page.waitForTimeout(3200)
  await form.getByRole('button', { name: 'Send in confidence' }).click()
  await expect(form.getByText('Add your name so we know who to reply to.')).toBeVisible()
  await expect(form.getByLabel('Your name')).toBeFocused()

  await form.getByLabel('Your name').fill('Alex Morgan')
  await form.getByLabel('Email').fill('alex@morgandesign.co.uk')
  await form.getByText('16 to 30', { exact: true }).click()
  await form.getByText('WordPress', { exact: true }).click()
  await form.getByText('In 3 to 6 months', { exact: true }).click()
  await form.getByLabel(/Anything else/).fill('Retiring next spring.')
  await form.getByRole('button', { name: 'Send in confidence' }).click()

  await expect(page.getByRole('heading', { name: 'Thanks, Alex. Your message is with us.' })).toBeVisible()
  const sent = outbox()
  expect(sent).toHaveLength(2)
  expect(sent[0]).toMatchObject({ to: 'hello@masuyodigital.com', replyTo: 'alex@morgandesign.co.uk', subject: 'Handover (confidential): Alex Morgan, 16 to 30 client sites' })
  expect(sent[0].text).toContain('Form: Handover (sell your web design clients page)')
  expect(sent[1]).toMatchObject({ to: 'alex@morgandesign.co.uk', subject: 'Your message is with us' })
  expect(errors).toEqual([])
})

test('prints only the checklist', async ({ page }) => {
  await page.goto(PATH)
  await page.emulateMedia({ media: 'print' })
  const visible = await page.evaluate(() =>
    Array.from(document.querySelectorAll('h1, h2, footer, header, form')).filter(el => (el as HTMLElement).offsetParent !== null || getComputedStyle(el).position === 'fixed' && getComputedStyle(el).display !== 'none').map(el => el.textContent?.trim().slice(0, 40)),
  )
  expect(visible).toEqual(['What do I need to have ready?'])
  // One A4 page: the area fits in the printable height (297mm less 32mm of margins, at 96 dpi).
  const height = await page.locator('[data-print-area]').evaluate(el => el.getBoundingClientRect().height)
  expect(height).toBeLessThan((265 / 25.4) * 96)
})

test.describe('on a phone', () => {
  test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })

  test('no sideways scroll, the table stacks, and the form is thumb sized', async ({ page }) => {
    await page.goto(PATH)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
    // The payment table becomes one card per option, each with its labels.
    const row = page.locator('tbody tr').first()
    expect(await row.evaluate(el => getComputedStyle(el).display)).toBe('block')
    await expect(row.getByText('Upfront cost to masuyo')).toBeVisible()
    const form = page.locator('form', { has: page.locator('input[name="source"][value="handover"]') })
    for (const el of await form.locator('input:not([type=hidden]):not([tabindex="-1"]):not(.sr-only), textarea, button').all()) {
      const box = await el.boundingBox()
      if (!box) continue
      expect(box.height, await el.evaluate(e => e.outerHTML.slice(0, 80))).toBeGreaterThanOrEqual(44)
      expect(await el.evaluate(e => parseFloat(getComputedStyle(e).fontSize))).toBeGreaterThanOrEqual(16)
    }
    // Nothing covers the page on arrival.
    await expect(page.locator('[data-check-popup]')).toHaveCount(0)
  })
})
