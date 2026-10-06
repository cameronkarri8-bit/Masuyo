/**
 * The Start a project server action, with the email transport mocked.
 *
 * These run the real action (app/start/actions.ts) and the real validation;
 * only the two ways a brief leaves the server, Resend and Formspree, are
 * replaced, so nothing is ever sent.
 */
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/forms/transport', () => ({
  sendEmail: vi.fn(),
  postToFormspree: vi.fn(),
  FORMSPREE_ENDPOINT: 'https://formspree.io/f/xlgpogqk',
}))

import { submitBrief } from '@/app/start/actions'
import { fromEstimator, MESSAGES } from '@/lib/forms/brief'
import { initialBriefState } from '@/lib/forms/submit'
import { postToFormspree, sendEmail } from '@/lib/forms/transport'
import { estimate, WEBSITES } from '@/lib/pricing'

const send = vi.mocked(sendEmail)
const formspree = vi.mocked(postToFormspree)

function form(fields: Record<string, string | string[]>) {
  const f = new FormData()
  for (const [k, v] of Object.entries(fields)) {
    for (const item of Array.isArray(v) ? v : [v]) f.append(k, item)
  }
  return f
}

const VALID = {
  source: 'start',
  started: String(Date.now() - 20_000),
  page: '/pricing',
  estimator: '6 to 12 pages; Take bookings; Range £2,500 to £3,550',
  company_url: '',
  name: 'Sam Taylor',
  email: 'sam@taylorplumbing.co.uk',
  business: 'Taylor Plumbing, taylorplumbing.co.uk',
  needs: ['Website', 'Automation'],
  brief: 'Quotes take hours and live in a spreadsheet.',
  size: '2 to 5',
  budget: '£1,500 to £4,000',
}

beforeEach(() => {
  send.mockReset()
  formspree.mockReset()
  send.mockResolvedValue({ ok: true, id: 're_123' })
  formspree.mockResolvedValue({ ok: true })
})

describe('a valid brief', () => {
  it('sends to hello@masuyodigital.com with the visitor as reply to', async () => {
    const state = await submitBrief(initialBriefState, form(VALID))
    expect(state.status).toBe('sent')
    expect(state.firstName).toBe('Sam')

    const team = send.mock.calls[0][0]
    expect(team.to).toBe('hello@masuyodigital.com')
    expect(team.from).toBe('Masuyo website <hello@masuyodigital.com>')
    expect(team.replyTo).toBe('sam@taylorplumbing.co.uk')
    expect(team.subject).toBe('New brief: Taylor Plumbing, taylorplumbing.co.uk')
    for (const line of [
      'Name: Sam Taylor',
      'Email: sam@taylorplumbing.co.uk',
      'Needs help with: Website, Automation',
      'Quotes take hours and live in a spreadsheet.',
      'People in the business: 2 to 5',
      'Budget: £1,500 to £4,000',
      'Came from: /pricing',
      'Estimator choices: 6 to 12 pages; Take bookings; Range £2,500 to £3,550',
      'Form: Start a project',
    ]) {
      expect(team.text).toContain(line)
    }
    expect(formspree).not.toHaveBeenCalled()
  })

  it('sends the visitor a short copy of what they sent', async () => {
    await submitBrief(initialBriefState, form(VALID))
    expect(send).toHaveBeenCalledTimes(2)
    const copy = send.mock.calls[1][0]
    expect(copy.to).toBe('sam@taylorplumbing.co.uk')
    expect(copy.replyTo).toBe('hello@masuyodigital.com')
    expect(copy.text).toContain('Thanks, Sam. Your brief is with us.')
    expect(copy.text).toContain('Quotes take hours and live in a spreadsheet.')
  })

  it('still confirms when only the visitor copy fails', async () => {
    send.mockResolvedValueOnce({ ok: true, id: 're_1' }).mockResolvedValueOnce({ ok: false, reason: 'bounced' })
    const state = await submitBrief(initialBriefState, form(VALID))
    expect(state.status).toBe('sent')
    expect(formspree).not.toHaveBeenCalled()
  })
})

describe('missing or malformed fields', () => {
  it('rejects an empty brief with the copy spec messages', async () => {
    const state = await submitBrief(initialBriefState, form({ source: 'start', started: VALID.started }))
    expect(state.status).toBe('invalid')
    expect(state.errors.name).toBe('Add your name so we know who to reply to.')
    expect(state.errors.email).toBe('Add an email address we can reply to, for example name@business.co.uk.')
    expect(state.errors.brief).toBe('Tell us a little about what you need. A sentence is fine.')
    expect(state.errors.business).toBe(MESSAGES.business)
    expect(state.errors.needs).toBe(MESSAGES.needs)
    expect(state.errors.size).toBe(MESSAGES.size)
    expect(state.errors.budget).toBeUndefined()
    expect(send).not.toHaveBeenCalled()
    expect(formspree).not.toHaveBeenCalled()
  })

  it('rejects an email address that is not one', async () => {
    const state = await submitBrief(initialBriefState, form({ ...VALID, email: 'sam at taylor plumbing' }))
    expect(state.status).toBe('invalid')
    expect(Object.keys(state.errors)).toEqual(['email'])
    expect(send).not.toHaveBeenCalled()
  })

  it('treats a blank brief of spaces as missing', async () => {
    const state = await submitBrief(initialBriefState, form({ ...VALID, brief: '   \n  ' }))
    expect(state.errors.brief).toBe(MESSAGES.brief)
  })

  it('ignores option values that are not on the form', async () => {
    const state = await submitBrief(initialBriefState, form({ ...VALID, needs: ['Hacking'], size: 'A million' }))
    expect(state.errors.needs).toBe(MESSAGES.needs)
    expect(state.errors.size).toBe(MESSAGES.size)
  })

  it('keeps what was typed so the form can be refilled', async () => {
    const state = await submitBrief(initialBriefState, form({ ...VALID, name: '' }))
    expect(state.values?.email).toBe(VALID.email)
    expect(state.values?.brief).toBe(VALID.brief)
  })
})

describe('spam protection', () => {
  it('silently drops a submission with the honeypot filled in', async () => {
    const state = await submitBrief(initialBriefState, form({ ...VALID, company_url: 'http://spam.example' }))
    expect(state.status).toBe('sent')
    expect(send).not.toHaveBeenCalled()
    expect(formspree).not.toHaveBeenCalled()
  })

  it('silently drops a form sent faster than a person could fill it in', async () => {
    const state = await submitBrief(initialBriefState, form({ ...VALID, started: String(Date.now() - 500) }))
    expect(state.status).toBe('sent')
    expect(send).not.toHaveBeenCalled()
  })

  it('refuses, visibly, a submission with no time on page', async () => {
    const state = await submitBrief(initialBriefState, form({ ...VALID, started: '' }))
    expect(state.status).toBe('failed')
    expect(state.message).toBe(MESSAGES.sendFailed)
    expect(send).not.toHaveBeenCalled()
  })
})

describe('when Resend fails', () => {
  it('falls back to Formspree with the same fields', async () => {
    send.mockResolvedValue({ ok: false, reason: 'RESEND_API_KEY is not set' })
    const state = await submitBrief(initialBriefState, form(VALID))
    expect(state.status).toBe('sent')
    expect(formspree).toHaveBeenCalledTimes(1)
    const fields = formspree.mock.calls[0][0]
    expect(fields._replyto).toBe('sam@taylorplumbing.co.uk')
    expect(fields._subject).toBe('New brief: Taylor Plumbing, taylorplumbing.co.uk')
    expect(fields.brief).toBe(VALID.brief)
    expect(fields.needs).toBe('Website, Automation')
    expect(fields.page).toBe('/pricing')
  })

  it('shows "That didn\'t send" with the email address when both fail', async () => {
    send.mockResolvedValue({ ok: false, reason: 'down' })
    formspree.mockResolvedValue({ ok: false, reason: 'down too' })
    const state = await submitBrief(initialBriefState, form(VALID))
    expect(state.status).toBe('failed')
    expect(state.message).toBe("That didn't send. Try again, or email hello@masuyodigital.com and we'll pick it up.")
  })
})

describe('the lifestyle venues form', () => {
  const VENUE = {
    source: 'lifestyle-venues',
    started: VALID.started,
    page: '/lifestyle-venues',
    name: 'Alex',
    business: 'The Venue',
    email: 'alex@thevenue.co.uk',
    brief: 'We need a new site.',
  }

  it('uses the same action, marked with its source, without the start form questions', async () => {
    const state = await submitBrief(initialBriefState, form(VENUE))
    expect(state.status).toBe('sent')
    const team = send.mock.calls[0][0]
    expect(team.to).toBe('hello@masuyodigital.com')
    expect(team.replyTo).toBe('alex@thevenue.co.uk')
    expect(team.subject).toBe('New brief: The Venue')
    expect(team.text).toContain('Form: Lifestyle venues page')
    expect(team.text).toContain('Venue: The Venue')
    expect(team.text).not.toContain('Needs help with')
  })

  it('asks for the venue name in its own words', async () => {
    const state = await submitBrief(initialBriefState, form({ ...VENUE, business: '' }))
    expect(state.errors.business).toBe(MESSAGES.venue)
  })
})

describe('the estimator hand-off', () => {
  it('turns the choices into a brief and a budget inside the published range', () => {
    const range = estimate({ size: '6-to-12', features: ['bookings', 'shop'], words: 'help' })!
    const out = fromEstimator({ from: 'estimator', size: '6-to-12', features: 'bookings,shop', words: 'help', range: `${range.low}-${range.high}` })!
    expect(out.brief).toBe('A website of 6 to 12 pages that can take bookings and sell products. We would like help with the words.')
    expect(out.budget).toBe(WEBSITES.range)
    expect(out.summary).toContain('6 to 12 pages')
    expect(range.low).toBeGreaterThanOrEqual(WEBSITES.from)
    expect(range.high).toBeLessThanOrEqual(WEBSITES.to)
  })

  it('ignores a page that did not come from the estimator', () => {
    expect(fromEstimator({ size: '6-to-12' })).toBeNull()
  })
})
