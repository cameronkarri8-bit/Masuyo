import fs from 'node:fs'
import path from 'node:path'
import { expect, test } from '@playwright/test'
import { APPLICATION_ENDPOINT, MADE_IN_LANCASHIRE_PUBLIC, NOMINATION_ENDPOINT, ROUNDUP_CONSENT } from '../../lib/made-in-lancashire/config'
import { MIL_FIXTURE_MEMBERS, MIL_PAGES } from './routes'

/**
 * Made in Lancashire: the preview switch, the hub, both forms, the badge and
 * the directory. Form endpoints are mocked here; the real edge functions are
 * tested from inside the database. Run with MIL_DIRECTORY_FIXTURE set (and a
 * build made with it) to check member pages; without it, the empty directory.
 */

const SITE = 'https://masuyodigital.com'

// A 16x16 PNG, for the photo upload.
const PNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAFklEQVR4nGPgt/YnCTGMahjVMHw1AAAYxpkBFWEqewAAAABJRU5ErkJggg==', 'base64')

test.describe('while the preview switch is off', () => {
  test.skip(MADE_IN_LANCASHIRE_PUBLIC, 'the section is public')

  test('every page is noindex, out of the sitemap and unlinked', async ({ page, request }) => {
    const sitemap = await (await request.get('/sitemap.xml')).text()
    for (const path of MIL_PAGES) {
      const html = await (await request.get(path)).text()
      expect(html, path).toContain('<meta name="robots" content="noindex, nofollow"/>')
      expect(sitemap, path).not.toContain(`${SITE}${path}<`)
    }
    for (const path of ['/', '/resources']) {
      await page.goto(path)
      await expect(page.locator('a[href^="/made-in-lancashire"]'), path).toHaveCount(0)
    }
  })
})

test.describe('once public', () => {
  test.skip(!MADE_IN_LANCASHIRE_PUBLIC, 'still in preview')

  test('the hub is indexable, in the sitemap and linked from the footer and Resources', async ({ page, request }) => {
    const html = await (await request.get('/made-in-lancashire')).text()
    expect(html).not.toContain('noindex')
    expect(html).toContain('<link rel="canonical" href="https://masuyodigital.com/made-in-lancashire"/>')
    expect(html).toMatch(/<title>Made in Lancashire[^<]*<\/title>/)
    for (const prop of ['og:title', 'og:description', 'og:url', 'og:image', 'og:image:alt']) expect(html, prop).toContain(`property="${prop}"`)
    expect(html).toContain('<meta property="og:url" content="https://masuyodigital.com/made-in-lancashire"/>')
    expect(html).toContain('name="twitter:card" content="summary_large_image"')
    const description = /<meta name="description" content="([^"]*)"/.exec(html)?.[1] ?? ''
    expect(description.length).toBeGreaterThan(50)
    expect(description).not.toMatch(/week/i)
    const image = /<meta property="og:image" content="([^"]*)"/.exec(html)?.[1] ?? ''
    const og = await request.get(new URL(image).pathname)
    expect(og.status()).toBe(200)
    expect(og.headers()['content-type']).toBe('image/png')

    const sitemap = await (await request.get('/sitemap.xml')).text()
    expect(sitemap).toContain(`<loc>${SITE}/made-in-lancashire</loc>`)

    await page.goto('/')
    await expect(page.locator('footer a[href="/made-in-lancashire"]')).toHaveCount(1)
    await page.goto('/resources')
    await expect(page.locator('main a[href="/made-in-lancashire"]')).toHaveCount(1)
  })

  test('the directory follows its members: noindex and out of the sitemap while empty, listed once it has one', async ({ request }) => {
    const sitemap = await (await request.get('/sitemap.xml')).text()
    const html = await (await request.get('/made-in-lancashire/directory')).text()
    if (MIL_FIXTURE_MEMBERS.length === 0) {
      expect(html).toContain('<meta name="robots" content="noindex, nofollow"/>')
      expect(sitemap).not.toContain(`${SITE}/made-in-lancashire/directory<`)
      expect(sitemap).not.toContain(`${SITE}/made-in-lancashire/directory/`)
    } else {
      expect(html).not.toContain('noindex')
      expect(sitemap).toContain(`<loc>${SITE}/made-in-lancashire/directory</loc>`)
      for (const m of MIL_FIXTURE_MEMBERS) {
        expect(sitemap).toContain(`<loc>${SITE}/made-in-lancashire/directory/${m}</loc>`)
        expect(await (await request.get(`/made-in-lancashire/directory/${m}`)).text()).not.toContain('noindex')
      }
    }
    // A member that is not published (or was unpublished) is a 404, and never in the sitemap.
    expect((await request.get('/made-in-lancashire/directory/not-a-member')).status()).toBe(404)
    expect(sitemap).not.toContain('/made-in-lancashire/directory/not-a-member')
  })

  test('the badge section has the anchor the approval emails link to', async ({ page }) => {
    await page.goto('/made-in-lancashire#badge')
    await expect(page.locator('section#badge h2')).toHaveText('Featured with us.')
  })
})

test('the sample businesses are gone and their pages 404', async ({ request }) => {
  for (const slug of ['example-bakery', 'sample-bike-workshop', 'placeholder-florist']) {
    expect((await request.get(`/made-in-lancashire/${slug}`)).status(), slug).toBe(404)
  }
  const html = await (await request.get('/made-in-lancashire')).text()
  expect(html).not.toMatch(/Example Bakery|Sample Bike Workshop|Placeholder Florist|placeholder content/i)
})

test('the hub: one H1, sections in order, no weekly promise, no circles', async ({ page }) => {
  await page.goto('/made-in-lancashire')
  await expect(page.locator('h1')).toHaveCount(1)
  await expect(page.locator('h1')).toHaveText('Made in Lancashire.')
  await expect(page.locator('h1 .highlighter')).toHaveText('Lancashire')
  await expect(page.locator('h1 svg')).toHaveCount(0)
  const titles = await page.locator('main h2:not(.sr-only)').allInnerTexts()
  const directory = MIL_FIXTURE_MEMBERS.length > 0 ? ['The directory.'] : []
  expect(titles).toEqual(['Why it matters.', 'Recently added.', ...directory, 'Put your business forward.', 'Featured with us.', 'Made in Lancashire is a masuyo. project.'])
  const text = await page.locator('main').innerText()
  expect(text).not.toMatch(/\bweekly\b|\bevery week\b|\bthis week\b/i)
  expect(await page.locator('meta[name="description"]').getAttribute('content')).not.toMatch(/week/i)
})

test('the hero offers Submit your business first, then the smaller Nominate link', async ({ page }) => {
  await page.goto('/made-in-lancashire')
  const hero = page.locator('main section').first()
  const links = hero.locator('a:not(nav a)')
  await expect(links.nth(0)).toHaveText('Submit your business')
  await expect(links.nth(0)).toHaveAttribute('href', '#apply')
  await expect(links.nth(1)).toHaveText('Nominate a business')
  await expect(links.nth(1)).toHaveAttribute('href', '#nominate')
})

test('Recently added shows the newest members first, then Your business here cards', async ({ page }) => {
  await page.goto('/made-in-lancashire')
  const cards = page.locator('section[aria-labelledby="recent-title"] li')
  await expect(cards).toHaveCount(3)
  // The directory view sorts newest first; the fixture is already in that order.
  for (let i = 0; i < 3; i++) {
    const slug = MIL_FIXTURE_MEMBERS[i]
    if (slug) {
      await expect(cards.nth(i).locator('a')).toHaveAttribute('href', `/made-in-lancashire/directory/${slug}`)
    } else {
      await expect(cards.nth(i)).toContainText('Your business here')
      await expect(cards.nth(i)).toContainText('Submit your business to be considered for a feature.')
      await expect(cards.nth(i).locator('a')).toHaveAttribute('href', '#apply')
    }
  }
  await expect(page.getByText('Every feature so far.')).toHaveCount(0)
})

test('the why section has three points', async ({ page }) => {
  await page.goto('/made-in-lancashire')
  const points = page.locator('section[aria-labelledby="why-title"] li h3')
  await expect(points).toHaveText(['Your money stays local.', 'You get the real thing.', 'A little goes a long way.'])
})

test.describe('the application form', () => {
  test('opens from the hero, checks each step and keeps answers when going back', async ({ page }) => {
    await page.goto('/made-in-lancashire')
    await page.locator('main section').first().getByRole('link', { name: 'Submit your business' }).click()
    await expect(page.getByText('Tell us about your business. Only a few fields are required')).toBeVisible()
    await expect(page.getByText('Step 1 of 4')).toBeVisible()

    await page.getByRole('button', { name: 'Next: Your business' }).click()
    await expect(page.getByText('Add your name.')).toBeVisible()
    await expect(page.getByText('Choose your role.')).toBeVisible()
    await expect(page.locator('#app-applicant_name')).toBeFocused()

    await page.locator('#app-applicant_name').fill('Sam Test')
    await page.getByRole('radio', { name: 'Owner' }).check()
    await page.locator('#app-email').fill('sam@example.test')
    await expect(page.locator('#app-email')).toHaveAttribute('type', 'email')
    await expect(page.locator('#app-email')).toHaveAttribute('autocomplete', 'email')
    await expect(page.locator('#app-phone')).toHaveAttribute('type', 'tel')
    await page.getByRole('button', { name: 'Next: Your business' }).click()
    await expect(page.getByText('Step 2 of 4')).toBeVisible()

    await page.getByRole('button', { name: 'Back' }).click()
    await expect(page.locator('#app-applicant_name')).toHaveValue('Sam Test')
  })

  async function fillToPhotos(page: import('@playwright/test').Page, stepOneExtra?: () => Promise<void>) {
    await page.goto('/made-in-lancashire#apply')
    await expect(page.getByText('Step 1 of 4')).toBeVisible()
    await page.locator('#app-applicant_name').fill('Sam Test')
    await page.getByRole('radio', { name: 'Owner' }).check()
    await page.locator('#app-email').fill('sam@example.test')
    if (stepOneExtra) await stepOneExtra()
    await page.getByRole('button', { name: 'Next: Your business' }).click()
    await page.locator('#app-business_name').fill('Test Bakery')
    await page.locator('#app-town').fill('Leyland')
    await page.locator('#app-category').selectOption('Food and drink')
    await page.locator('#app-one_line').fill('Sourdough and coffee.')
    await page.locator('#app-description').fill('A longer story.')
    await expect(page.getByText('15 of 1,500 characters')).toBeVisible()
    await page.getByRole('button', { name: 'Next: Find you online' }).click()
    await page.locator('#app-website').fill('not a website')
    await page.getByRole('button', { name: 'Next: Photos' }).click()
    await expect(page.getByText("That doesn't look quite right. Check it, or leave it blank.")).toBeVisible()
    await page.locator('#app-website').fill('testbakery.co.uk')
    await page.locator('#app-instagram').fill('@testbakery')
    await page.getByRole('button', { name: 'Next: Photos' }).click()
    await expect(page.getByText('Step 4 of 4')).toBeVisible()
  }

  test('adds a photo, asks for consent, and sends everything', async ({ page }) => {
    let body = ''
    await page.route(APPLICATION_ENDPOINT, async route => {
      body = route.request().postDataBuffer()?.toString('latin1') ?? ''
      await new Promise(r => setTimeout(r, 300))
      await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' })
    })
    await fillToPhotos(page)
    await expect(page.getByLabel(ROUNDUP_CONSENT)).not.toBeChecked()
    await page.locator('#app-photos').setInputFiles({ name: 'shop.png', mimeType: 'image/png', buffer: PNG })
    await expect(page.getByAltText('Photo 1, the cover')).toBeVisible()
    await expect(page.getByText('Cover', { exact: true })).toBeVisible()
    await page.locator('#forward-forms form').getByRole('button', { name: 'Submit your business' }).click()
    await expect(page.getByText('Tick the box to confirm you can share these photos.')).toBeVisible()
    await page.getByRole('checkbox', { name: /I own these photos/ }).check()
    await page.locator('#forward-forms form').getByRole('button', { name: 'Submit your business' }).click()
    await expect(page.getByText("Thanks, your application is in. We'll get back to you within 7 working days.")).toBeVisible()
    expect(body).toContain('name="business_name"')
    expect(body).toContain('Test Bakery')
    expect(body).toContain('name="photo_consent"\r\n\r\ntrue')
    expect(body).toContain('filename="photo-1.jpg"')
    expect(body).toContain('Content-Type: image/jpeg')
    // The contact box was left unticked: nothing for the directory.
    expect(body).toContain('name="contact_consent"\r\n\r\nfalse')
    expect(body).not.toContain('name="public_email"')
    expect(body).not.toContain('name="public_phone"')
  })

  test('a ticked contact box sends a public email and phone, prefilled and checked', async ({ page }) => {
    let body = ''
    await page.route(APPLICATION_ENDPOINT, async route => {
      body = route.request().postDataBuffer()?.toString('latin1') ?? ''
      await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' })
    })
    await page.setViewportSize({ width: 390, height: 844 })
    await fillToPhotos(page, async () => {
      await page.locator('#app-phone').fill('01772 123456')
      const box = page.getByRole('checkbox', { name: 'Show a contact email and phone on my directory page' })
      await expect(box).not.toBeChecked()
      await expect(page.locator('#app-public_email')).toHaveCount(0)
      await box.check()
      await expect(page.locator('#app-public_email')).toHaveValue('sam@example.test')
      await expect(page.locator('#app-public_phone')).toHaveValue('01772 123456')
      await expect(page.locator('#app-public_email')).toHaveAttribute('type', 'email')
      await expect(page.locator('#app-public_phone')).toHaveAttribute('type', 'tel')
      await page.locator('#app-public_email').fill('not an email')
      await page.getByRole('button', { name: 'Next: Your business' }).click()
      await expect(page.locator('#app-public_email-error')).toHaveText('Check the email address.')
      await page.locator('#app-public_email').fill('')
      await page.locator('#app-public_phone').fill('')
      await page.getByRole('button', { name: 'Next: Your business' }).click()
      await expect(page.locator('#app-public_email-error')).toHaveText('Add a public email or phone, or untick the box.')
      await page.locator('#app-public_email').fill('shop@example.test')
      await page.locator('#app-public_phone').fill('01772 654321')
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390)
    })
    await page.locator('#forward-forms form').getByRole('button', { name: 'Submit your business' }).click()
    await expect(page.getByText("Thanks, your application is in. We'll get back to you within 7 working days.")).toBeVisible()
    expect(body).toContain('name="contact_consent"\r\n\r\ntrue')
    expect(body).toContain('name="public_email"\r\n\r\nshop@example.test')
    expect(body).toContain('name="public_phone"\r\n\r\n01772 654321')
  })

  test('explains when a photo cannot be opened, and when sending fails', async ({ page }) => {
    await page.route(APPLICATION_ENDPOINT, route => route.fulfill({ status: 500, body: '{}' }))
    await fillToPhotos(page)
    await page.locator('#app-photos').setInputFiles({ name: 'notes.jpg', mimeType: 'image/jpeg', buffer: Buffer.from('not an image') })
    await expect(page.getByText(/Your browser can't open that photo/)).toBeVisible()
    await page.getByRole('button', { name: 'Remove photo 1' }).click()
    await page.locator('#forward-forms form').getByRole('button', { name: 'Submit your business' }).click()
    await expect(page.getByText('That didn’t send. Please try again in a moment, or email hello@masuyodigital.com.')).toBeVisible()
  })
})

test('the nomination form opens from the smaller link', async ({ page }) => {
  await page.route(NOMINATION_ENDPOINT, route => route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }))
  await page.goto('/made-in-lancashire')
  await page.getByRole('button', { name: 'Nominate a business' }).click()
  await expect(page.getByRole('button', { name: 'Send nomination' })).toBeVisible()
  await expect(page.getByText('Your email is only used to reply about this nomination, unless you tick the round-up box.')).toBeVisible()
})

test('the badge strip: mock footer, then code, PNG and SVG in that order', async ({ page, request }) => {
  await page.goto('/made-in-lancashire')
  const strip = page.locator('section[aria-labelledby="badge-title"]')
  await expect(strip.getByText('Grab the badge for your website, or ask us for a window sticker. Both free.')).toBeVisible()
  await expect(strip.locator('figure img')).toBeVisible()
  await expect(strip.locator('ol > li h3')).toHaveText(['Copy the code', 'Download PNG', 'Download SVG'])
  await expect(strip.getByText('Copy the code. It links back to us automatically.')).toBeVisible()
  await expect(strip.locator('textarea')).toHaveValue(/^<a href="https:\/\/masuyodigital\.com\/made-in-lancashire"><img src="https:\/\/masuyodigital\.com\/made-in-lancashire\/badge\.svg" alt="Featured in Made in Lancashire"/)
  await expect(strip.getByText(`If you use the image, link it to ${SITE}/made-in-lancashire`)).toBeVisible()
  for (const [path, type] of [
    ['/made-in-lancashire/badge-light-bg.png', 'image/png'],
    ['/made-in-lancashire/badge-dark-bg.png', 'image/png'],
    ['/made-in-lancashire/badge.svg', 'image/svg+xml'],
    ['/made-in-lancashire/badge-dark-bg.svg', 'image/svg+xml'],
  ]) {
    const res = await request.get(path)
    expect(res.status(), path).toBe(200)
    expect(res.headers()['content-type'], path).toContain(type)
  }
  // The PNGs are 2x the badge's display size.
  const png = await (await request.get('/made-in-lancashire/badge-light-bg.png')).body()
  expect(png.readUInt32BE(16)).toBe(492)
  expect(png.readUInt32BE(20)).toBe(220)
})

test.describe('breadcrumbs: Made in Lancashire sits under Home, not Industries', () => {
  const trail = async (page: import('@playwright/test').Page) => (await page.getByRole('navigation', { name: 'Breadcrumb' }).first().innerText()).split(/\s*\/\s*|\n+/).filter(Boolean)
  for (const width of [390, 1280]) {
    test(`at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.goto('/made-in-lancashire')
      expect(await trail(page)).toEqual(['Home', 'Made in Lancashire'])
      await page.goto('/made-in-lancashire/directory')
      expect(await trail(page)).toEqual(['Home', 'Made in Lancashire', 'The directory'])
      if (MIL_FIXTURE_MEMBERS.length > 0) {
        await page.goto('/made-in-lancashire/directory/test-member-bakery')
        expect(await trail(page)).toEqual(['Home', 'Made in Lancashire', 'The directory', 'Test Member Bakery'])
      }
      const html = await (await page.request.get('/made-in-lancashire')).text()
      expect(html).not.toContain('"name":"Industries"')
      expect(html).toContain('"@type":"BreadcrumbList"')
    })
  }
})

test.describe('the directory block on the hub with no members', () => {
  test.skip(MIL_FIXTURE_MEMBERS.length > 0, 'sample members are switched on')
  test('is hidden, while the directory page stays live', async ({ page, request }) => {
    for (const width of [390, 1280]) {
      await page.setViewportSize({ width, height: 900 })
      await page.goto('/made-in-lancashire')
      await expect(page.getByRole('heading', { name: 'The directory.' })).toHaveCount(0)
      await expect(page.getByRole('link', { name: 'Browse the directory' })).toHaveCount(0)
    }
    expect((await request.get('/made-in-lancashire/directory')).status()).toBe(200)
  })
})

test('the directory is linked from the hub once it has members', async ({ page }) => {
  test.skip(MIL_FIXTURE_MEMBERS.length === 0, 'no sample members in this run')
  await page.goto('/made-in-lancashire')
  await page.getByRole('link', { name: 'Browse the directory' }).click()
  await expect(page).toHaveURL(/\/made-in-lancashire\/directory$/)
  await expect(page.locator('h1')).toHaveText('The directory.')
  await expect(page.getByText('Independent Lancashire businesses, checked and approved by us. Every one is a founding member of the Made in Lancashire network.')).toBeVisible()
})

test.describe('the directory with no members', () => {
  test.skip(MIL_FIXTURE_MEMBERS.length > 0, 'sample members are switched on')
  test('says the first members are on their way', async ({ page }) => {
    await page.goto('/made-in-lancashire/directory')
    await expect(page.getByText('Our first members are being added now.')).toBeVisible()
  })
})

test.describe('the directory with members', () => {
  test.skip(MIL_FIXTURE_MEMBERS.length === 0, 'no sample members in this run')

  test('cards, filters and the photo fallback', async ({ page }) => {
    await page.goto('/made-in-lancashire/directory')
    const cards = page.locator('main ul li a[href^="/made-in-lancashire/directory/"]')
    await expect(cards).toHaveCount(2)
    await expect(cards.first().getByText('Founding member')).toBeVisible()
    await page.getByRole('group', { name: 'Towns' }).getByRole('button', { name: 'Chorley' }).click()
    await expect(cards).toHaveCount(1)
    await expect(cards.first()).toContainText('Test Member Joinery')
    await expect(cards.first().locator('svg')).toHaveCount(1)
  })

  test('a member page: gallery, details, links and LocalBusiness data', async ({ page, request }) => {
    await page.goto('/made-in-lancashire/directory/test-member-bakery')
    expect(await page.title()).toBe('Test Member Bakery, Leyland | Made in Lancashire directory')
    await expect(page.locator('h1')).toHaveText('Test Member Bakery')
    await expect(page.getByText('Founding member')).toBeVisible()
    await expect(page.getByRole('region', { name: /Photos of Test Member Bakery, 3 in all/ })).toBeVisible()
    await expect(page.getByText('Tuesday to Saturday, 8am to 3pm')).toBeVisible()
    await expect(page.getByRole('link', { name: 'Instagram' })).toHaveAttribute('href', 'https://www.instagram.com/testmember/')
    await expect(page.getByRole('link', { name: 'Back to the directory' })).toBeVisible()
    const html = await (await request.get('/made-in-lancashire/directory/test-member-bakery')).text()
    const data = Array.from(html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)).flatMap(m => [JSON.parse(m[1])].flat()).find(b => b['@type'] === 'LocalBusiness')
    expect(data.image).toHaveLength(3)
    expect(data.sameAs).toContain('https://www.instagram.com/testmember/')
    expect(data.address.addressLocality).toBe('Leyland')
  })

  test('member and directory content is in the HTML as served, for search engines', async ({ request }) => {
    const member = await (await request.get('/made-in-lancashire/directory/test-member-bakery')).text()
    expect(member).toContain('<h1')
    expect(member).toContain('Test Member Bakery')
    expect(member).toContain('Tuesday to Saturday, 8am to 3pm')
    expect(member).toContain('https://www.instagram.com/testmember/')
    const directory = await (await request.get('/made-in-lancashire/directory')).text()
    for (const m of MIL_FIXTURE_MEMBERS) expect(directory).toContain(`href="/made-in-lancashire/directory/${m}"`)
  })
})

test.describe('a member page follows publishing straight away', () => {
  test.skip(MIL_FIXTURE_MEMBERS.length === 0, 'no sample members in this run')

  // The bug this guards against: a URL requested before its member was
  // published cached a 404 that outlived the publish until a restart.
  test('404 before publishing, 200 straight after, 404 again after unpublishing', async ({ request }) => {
    const file = path.join(__dirname, '..', '..', process.env.MIL_DIRECTORY_FIXTURE as string)
    const original = fs.readFileSync(file, 'utf8')
    const slug = 'test-member-published-late'
    const url = `/made-in-lancashire/directory/${slug}`
    try {
      expect((await request.get(url)).status()).toBe(404)
      const members = JSON.parse(original) as { directory_slug: string; business_name: string }[]
      fs.writeFileSync(file, JSON.stringify([...members, { ...members[members.length - 1], directory_slug: slug, business_name: 'Test Member Published Late' }], null, 2))
      const res = await request.get(url)
      expect(res.status()).toBe(200)
      expect(await res.text()).toContain('Test Member Published Late')
      fs.writeFileSync(file, original)
      expect((await request.get(url)).status()).toBe(404)
    } finally {
      fs.writeFileSync(file, original)
    }
  })
})

test.describe('the Contact card on a member page', () => {
  test.skip(MIL_FIXTURE_MEMBERS.length === 0, 'no sample members in this run')
  const bakery = '/made-in-lancashire/directory/test-member-bakery'

  /** Runs with the bakery's email and phone changed in the fixture, then puts the file back. */
  async function withBakery(contact: { directory_email: string | null; directory_phone: string | null }, run: () => Promise<void>) {
    const file = path.join(__dirname, '..', '..', process.env.MIL_DIRECTORY_FIXTURE as string)
    const original = fs.readFileSync(file, 'utf8')
    try {
      const members = (JSON.parse(original) as { directory_slug: string }[]).map(m => (m.directory_slug === 'test-member-bakery' ? { ...m, ...contact } : m))
      fs.writeFileSync(file, JSON.stringify(members, null, 2))
      await run()
    } finally {
      fs.writeFileSync(file, original)
    }
  }

  test('email and phone: both buttons, the address hidden until asked for, telephone in the data', async ({ page, request }) => {
    const html = await (await request.get(bakery)).text()
    expect(html).not.toContain('hello@testmemberbakery.example')
    const data = Array.from(html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g))
      .flatMap(m => [JSON.parse(m[1])].flat())
      .find(b => b['@type'] === 'LocalBusiness')
    expect(data.telephone).toBe('01772 000000')
    expect(JSON.stringify(data)).not.toContain('@testmemberbakery')

    await page.goto(bakery)
    const card = page.getByRole('region', { name: /^Contact/ })
    await expect(card).toBeVisible()
    await expect(card.getByRole('link', { name: 'Call 01772 000000' })).toHaveAttribute('href', 'tel:01772000000')
    const email = card.getByRole('link', { name: 'Email Test Member Bakery' })
    await expect(email).not.toHaveAttribute('href', /mailto/)
    await email.dispatchEvent('click')
    await expect(email).toHaveAttribute('href', 'mailto:hello@testmemberbakery.example?subject=Found%20you%20on%20Made%20in%20Lancashire')
    await expect(card.getByText('hello@testmemberbakery.example')).toHaveCount(0)
    await card.getByRole('button', { name: 'Show email' }).click()
    await expect(card.getByText('hello@testmemberbakery.example')).toBeVisible()
  })

  test('on a phone the card comes before the photos', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto(bakery)
    const card = await page.getByRole('region', { name: /^Contact/ }).boundingBox()
    const photos = await page.getByRole('region', { name: /Photos of Test Member Bakery/ }).boundingBox()
    expect(card!.y).toBeLessThan(photos!.y)
    expect(card!.y).toBeLessThan(844)
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390)
  })

  test('no email or phone: no Contact card, and no telephone in the data', async ({ page, request }) => {
    await page.goto('/made-in-lancashire/directory/test-member-joinery')
    await expect(page.getByRole('heading', { name: /^Their story/ })).toBeVisible()
    await expect(page.getByRole('heading', { name: /^Contact/ })).toHaveCount(0)
    const html = await (await request.get('/made-in-lancashire/directory/test-member-joinery')).text()
    expect(html).not.toContain('"telephone"')
  })

  test('email only, then phone only', async ({ page }) => {
    await withBakery({ directory_email: 'hello@testmemberbakery.example', directory_phone: null }, async () => {
      await page.goto(bakery)
      const card = page.getByRole('region', { name: /^Contact/ })
      await expect(card.getByRole('link', { name: 'Email Test Member Bakery' })).toBeVisible()
      await expect(card.getByRole('link', { name: /^Call/ })).toHaveCount(0)
    })
    await withBakery({ directory_email: null, directory_phone: '+44 1772 000000' }, async () => {
      await page.goto(bakery)
      const card = page.getByRole('region', { name: /^Contact/ })
      await expect(card.getByRole('link', { name: 'Call +44 1772 000000' })).toHaveAttribute('href', 'tel:+441772000000')
      await expect(card.getByRole('link', { name: /^Email/ })).toHaveCount(0)
      await expect(card.getByRole('button', { name: 'Show email' })).toHaveCount(0)
    })
  })
})
