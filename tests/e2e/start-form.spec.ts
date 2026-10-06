import { expect, test } from '@playwright/test'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { OUTBOX } from '../../playwright.config'

/**
 * Fills in and sends the Start a project form in a real browser. The server
 * runs with FORMS_TRANSPORT=mock, so the two emails land in a local outbox
 * file instead of being sent, and the test reads them back.
 */

function outbox(): Record<string, string>[] {
  if (!existsSync(OUTBOX)) return []
  return readFileSync(OUTBOX, 'utf8').trim().split('\n').filter(Boolean).map(l => JSON.parse(l))
}

test.beforeEach(() => writeFileSync(OUTBOX, ''))

test('sends a brief and shows the confirmation in place', async ({ page }) => {
  await page.goto('/start')
  await page.getByLabel('Your name').fill('Sam Taylor')
  await page.getByLabel('Email').fill('sam@taylorplumbing.co.uk')
  await page.getByLabel('Business name and website').fill('Taylor Plumbing')
  await page.getByText('Website', { exact: true }).click()
  await page.getByLabel('What is slowing the business down?').fill('Quotes take hours and live in a spreadsheet.')
  await page.getByText('2 to 5', { exact: true }).click()
  // The form refuses anything sent faster than a person could fill it in.
  await page.waitForTimeout(3200)
  await page.getByRole('button', { name: 'Send my brief' }).click()

  const done = page.getByRole('heading', { name: 'Thanks, Sam. Your brief is with us.' })
  await expect(done).toBeVisible()
  await expect(done).toBeFocused()
  await expect(page.getByText('You will hear back within one working day.')).toBeVisible()
  // Two articles, chosen because they asked for help with a website.
  await expect(page.getByRole('link', { name: /How much does a website cost in the UK\?/ })).toBeVisible()
  await expect(page).toHaveURL(/\/start$/)

  const sent = outbox()
  expect(sent).toHaveLength(2)
  expect(sent[0]).toMatchObject({ kind: 'resend', to: 'hello@masuyodigital.com', replyTo: 'sam@taylorplumbing.co.uk', subject: 'New brief: Taylor Plumbing' })
  expect(sent[0].text).toContain('Quotes take hours and live in a spreadsheet.')
  expect(sent[1]).toMatchObject({ kind: 'resend', to: 'sam@taylorplumbing.co.uk' })
})

test('shows the copy spec errors and moves focus to the first one', async ({ page }) => {
  await page.goto('/start')
  await page.waitForTimeout(3200)
  await page.getByRole('button', { name: 'Send my brief' }).click()
  await expect(page.getByText('Add your name so we know who to reply to.')).toBeVisible()
  await expect(page.getByText('Add an email address we can reply to, for example name@business.co.uk.')).toBeVisible()
  await expect(page.getByText('Tell us a little about what you need. A sentence is fine.')).toBeVisible()
  await expect(page.getByLabel('Your name')).toBeFocused()
  await expect(page.getByLabel('Your name')).toHaveAttribute('aria-invalid', 'true')
  expect(outbox()).toHaveLength(0)
})

test('arrives from the estimator with the choices filled in', async ({ page }) => {
  await page.goto('/start?from=estimator&size=6-to-12&features=bookings%2Cshop&words=help&range=2500-3550')
  await expect(page.getByLabel('What is slowing the business down?')).toHaveValue(
    'A website of 6 to 12 pages that can take bookings and sell products. We would like help with the words.'
  )
  await expect(page.locator('input[name="needs"][value="Website"]')).toBeChecked()
  await expect(page.locator('input[name="budget"][value="£1,500 to £4,000"]')).toBeChecked()
})

test('the lifestyle venues form sends through the same action', async ({ page }) => {
  await page.goto('/lifestyle-venues')
  await page.getByLabel('Your name').fill('Alex')
  await page.getByLabel('Venue name').fill('The Venue')
  await page.getByLabel('Email address').fill('alex@thevenue.co.uk')
  await page.getByLabel('A short message').fill('We need a new site.')
  await page.waitForTimeout(3200)
  await page.getByRole('button', { name: 'Send' }).click()
  await expect(page.getByRole('heading', { name: 'Message sent' })).toBeVisible()
  const sent = outbox()
  expect(sent[0]).toMatchObject({ to: 'hello@masuyodigital.com', replyTo: 'alex@thevenue.co.uk', subject: 'New brief: The Venue' })
  expect(sent[0].text).toContain('Form: Lifestyle venues page')
})

async function fillValid(page: import('@playwright/test').Page, email: string) {
  await page.goto('/start')
  await page.getByLabel('Your name').fill('Sam Taylor')
  await page.getByLabel('Email').fill(email)
  await page.getByLabel('Business name and website').fill('Taylor Plumbing')
  await page.getByText('Not sure yet', { exact: true }).click()
  await page.getByLabel('What is slowing the business down?').fill('Jobs live on paper.')
  await page.getByText('Just me', { exact: true }).click()
  await page.waitForTimeout(3200)
  await page.getByRole('button', { name: 'Send my brief' }).click()
}

test('falls back to Formspree when Resend fails', async ({ page }) => {
  await fillValid(page, 'fail-resend@example.test')
  await expect(page.getByRole('heading', { name: 'Thanks, Sam. Your brief is with us.' })).toBeVisible()
  const sent = outbox()
  expect(sent.map(s => s.kind)).toEqual(['resend', 'formspree'])
  expect(sent[1]).toMatchObject({ _replyto: 'fail-resend@example.test', _subject: 'New brief: Taylor Plumbing', brief: 'Jobs live on paper.' })
})

test('says plainly that it did not send when Resend and Formspree both fail', async ({ page }) => {
  await fillValid(page, 'fail-both@example.test')
  await expect(page.getByRole('alert').filter({ hasText: "That didn't send" })).toHaveText(
    "That didn't send. Try again, or email hello@masuyodigital.com and we'll pick it up."
  )
  // What they typed is still there to send again.
  await expect(page.getByLabel('What is slowing the business down?')).toHaveValue('Jobs live on paper.')
})
