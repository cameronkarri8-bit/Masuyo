import { expect, test, type Page } from '@playwright/test'

/**
 * The free website check: the /check form and the corner card. The
 * website-check function is mocked at the network, so nothing is sent.
 */

const ENDPOINT = /functions\/v1\/website-check$/

async function mockCheck(page: Page, status = 202) {
  const bodies: Record<string, unknown>[] = []
  await page.route(ENDPOINT, async route => {
    bodies.push(JSON.parse(route.request().postData() ?? '{}'))
    await route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(status === 202 ? { ok: true } : { ok: false }) })
  })
  return bodies
}

test('the check page sends the form and shows the confirmation', async ({ page }) => {
  const bodies = await mockCheck(page)
  await page.goto('/check')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Free website check/)
  await page.getByRole('button', { name: 'Send my free report' }).click()
  await expect(page.locator('#check-url')).toBeFocused()
  await page.locator('#check-url').fill('example.co.uk')
  await page.locator('#check-email').fill('owner@example.co.uk')
  await page.getByRole('button', { name: 'Send my free report' }).click()
  await expect(page.getByRole('heading', { name: 'Thanks, we have your request.' })).toBeVisible()
  await expect(page.getByText('so your report will arrive within two working days')).toBeVisible()
  expect(bodies[0]).toMatchObject({ url: 'example.co.uk', email: 'owner@example.co.uk', marketing_opt_in: false, source: 'check-page' })
  // The card never shows on the check page.
  await expect(page.locator('[data-check-popup]')).toHaveCount(0)
})

test('the corner card opens from ?check=1, is not modal, and closes with Escape for 14 days', async ({ page }) => {
  await page.goto('/websites?check=1')
  const card = page.getByRole('dialog', { name: 'Free website check' })
  await expect(card).toBeVisible()
  await expect(card).toHaveAttribute('aria-modal', 'false')
  await expect(page.locator('#cp-url')).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(card).toHaveCount(0)
  const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('masuyo-check-popup') ?? '{}'))
  expect(stored.state).toBe('dismissed')
  await page.goto('/care')
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
  await page.waitForTimeout(600)
  await expect(page.locator('[data-check-popup]')).toHaveCount(0)
})

test('the corner card shows half way down the page and sends a check', async ({ page }) => {
  const bodies = await mockCheck(page)
  await page.goto('/websites')
  await expect(page.locator('[data-check-popup]')).toHaveCount(0)
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight * 0.6))
  const card = page.getByRole('dialog', { name: 'Free website check' })
  await expect(card).toBeVisible()
  await page.locator('#cp-url').fill('example.co.uk')
  await page.locator('#cp-email').fill('owner@example.co.uk')
  await card.getByRole('button', { name: 'Send my report' }).click()
  // The card is now named by its confirmation heading.
  await expect(page.getByRole('dialog', { name: 'Thanks, we have your request' })).toBeVisible()
  expect(bodies[0]).toMatchObject({ url: 'example.co.uk', email: 'owner@example.co.uk', source: 'popup' })
})

for (const path of ['/start', '/privacy-policy', '/made-in-lancashire', '/check']) {
  test(`the corner card never shows on ${path}`, async ({ page }) => {
    await page.goto(`${path}?check=1`)
    await page.waitForTimeout(600)
    await expect(page.locator('[data-check-popup]')).toHaveCount(0)
  })
}

test('a web report address that is not a real token is a 404', async ({ page }) => {
  const res = await page.goto('/check/report/not-a-real-token')
  expect(res?.status()).toBe(404)
})
