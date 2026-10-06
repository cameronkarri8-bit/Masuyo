import { expect, test, type Page } from '@playwright/test'

/** Everything interactive works from the keyboard alone. */

async function tabTo(page: Page, matches: () => boolean | Promise<boolean>, max = 60) {
  for (let i = 0; i < max; i++) {
    await page.keyboard.press('Tab')
    if (await matches()) return true
  }
  return false
}

const focused = (page: Page) => page.evaluate(() => {
  const el = document.activeElement as HTMLElement | null
  return { tag: el?.tagName ?? '', text: (el?.textContent ?? '').trim(), name: el?.getAttribute('name') ?? '', type: el?.getAttribute('type') ?? '', value: (el as HTMLInputElement)?.value ?? '' }
})

test('skip link, then the nav links in order, each with a visible focus ring', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  expect((await focused(page)).text).toBe('Skip to content')
  await page.keyboard.press('Tab')
  expect((await focused(page)).tag).toBe('A') // the wordmark, home
  const seen: string[] = []
  for (let i = 0; i < 7; i++) {
    await page.keyboard.press('Tab')
    const f = await focused(page)
    seen.push(f.text)
    const outline = await page.evaluate(() => getComputedStyle(document.activeElement as Element).outlineStyle)
    expect(outline, `${f.text} has a focus ring`).not.toBe('none')
  }
  expect(seen).toEqual(['Websites', 'Systems', 'Care', 'Work', 'Pricing', 'Resources', 'Start a project'])
})

test('the skip link moves focus to the main content', async ({ page }) => {
  await page.goto('/websites')
  await page.keyboard.press('Tab')
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/#main$/)
})

test.describe('mobile menu', () => {
  test.use({ viewport: { width: 390, height: 844 } })
  test('opens with Enter, traps focus, closes with Escape and returns focus', async ({ page }) => {
    await page.goto('/')
    const toggle = page.locator('button[aria-controls="mobile-menu"]')
    await toggle.focus()
    await page.keyboard.press('Enter')
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await expect(page.locator('#mobile-menu')).toBeVisible()
    for (let i = 0; i < 15; i++) {
      await page.keyboard.press('Tab')
      const inside = await page.evaluate(() => document.getElementById('mobile-menu')!.contains(document.activeElement) || document.activeElement?.getAttribute('aria-controls') === 'mobile-menu')
      expect(inside).toBe(true)
    }
    await page.keyboard.press('Escape')
    await expect(page.locator('#mobile-menu')).toBeHidden()
    await expect(toggle).toBeFocused()
  })
})

test('accordions open and close with Enter and Space, one at a time', async ({ page }) => {
  await page.goto('/websites')
  const first = page.getByRole('button', { name: 'Can you redesign my existing site?' })
  const second = page.getByRole('button', { name: 'Do I need to write the words and supply photos?' })
  await expect(first).toHaveAttribute('aria-expanded', 'false')
  await first.focus()
  await page.keyboard.press('Enter')
  await expect(first).toHaveAttribute('aria-expanded', 'true')
  await expect(page.getByText('We keep what works')).toBeVisible()
  await page.keyboard.press('Tab')
  await expect(second).toBeFocused()
  await page.keyboard.press('Space')
  await expect(second).toHaveAttribute('aria-expanded', 'true')
  await expect(first).toHaveAttribute('aria-expanded', 'false')
})

test('the estimator can be used without a mouse', async ({ page }) => {
  await page.goto('/pricing')
  const first = page.locator('input[name="size"]').first()
  await first.focus()
  await page.keyboard.press('Space')
  await expect(first).toBeChecked()
  await page.keyboard.press('ArrowRight')
  await expect(page.locator('input[name="size"]').nth(1)).toBeChecked()
  await page.keyboard.press('Tab')
  expect((await focused(page)).name).toBe('features')
  await page.keyboard.press('Space')
  await expect(page.locator('input[name="features"]').first()).toBeChecked()
  await expect(page.locator('.sticky [aria-live]')).toContainText('£')
  expect(await tabTo(page, async () => (await focused(page)).text === 'Send me a fixed quote')).toBe(true)
})

test('the systems checklist ticks with Space and reveals its button on the third', async ({ page }) => {
  await page.goto('/systems')
  const boxes = page.locator('input[type="checkbox"]')
  await boxes.first().focus()
  await page.keyboard.press('Space')
  await page.keyboard.press('Tab')
  await page.keyboard.press('Space')
  await expect(page.getByRole('link', { name: 'Talk it through' })).toHaveCount(0)
  await page.keyboard.press('Tab')
  await page.keyboard.press('Space')
  await expect(page.getByRole('link', { name: 'Talk it through' })).toBeVisible()
})

test('the start form can be filled and sent from the keyboard', async ({ page }) => {
  await page.goto('/start')
  await page.getByLabel('Your name').focus()
  await page.keyboard.type('Robin')
  await page.keyboard.press('Tab')
  await page.keyboard.type('robin@example.co.uk')
  await page.keyboard.press('Tab')
  await page.keyboard.type('Robin Electrical')
  await page.keyboard.press('Tab')
  expect((await focused(page)).name).toBe('needs')
  await page.keyboard.press('Space')
  expect(await tabTo(page, async () => (await focused(page)).name === 'brief')).toBe(true)
  await page.keyboard.type('Jobs live in a paper diary.')
  await page.keyboard.press('Tab')
  expect((await focused(page)).name).toBe('size')
  await page.keyboard.press('Space')
  await page.waitForTimeout(3200)
  expect(await tabTo(page, async () => (await focused(page)).text === 'Send my brief')).toBe(true)
  await page.keyboard.press('Enter')
  await expect(page.getByRole('heading', { name: 'Thanks, Robin. Your brief is with us.' })).toBeFocused()
})
