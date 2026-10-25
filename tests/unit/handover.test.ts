/**
 * The handover form on /sell-your-web-design-clients: the real server action
 * and validation, with the two email routes mocked so nothing is sent. Also
 * the page's copy check, which the build runs too.
 */
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/forms/transport', () => ({
  sendEmail: vi.fn(),
  postToFormspree: vi.fn(),
  FORMSPREE_ENDPOINT: 'https://formspree.io/f/xlgpogqk',
}))

import { submitBrief } from '@/app/start/actions'
import { checkHandoverCopy, HANDOVER } from '@/app/sell-your-web-design-clients/copy'
import { MESSAGES } from '@/lib/forms/brief'
import { initialBriefState } from '@/lib/forms/submit'
import { postToFormspree, sendEmail } from '@/lib/forms/transport'

const send = vi.mocked(sendEmail)
const formspree = vi.mocked(postToFormspree)

function form(fields: Record<string, string | string[]>) {
  const f = new FormData()
  for (const [k, v] of Object.entries(fields)) for (const item of Array.isArray(v) ? v : [v]) f.append(k, item)
  return f
}

const VALID = {
  source: 'handover',
  started: String(Date.now() - 20_000),
  page: '/sell-your-web-design-clients',
  company_url: '',
  name: 'Alex Morgan',
  email: 'alex@morgandesign.co.uk',
  sites: '16 to 30',
  platforms: ['WordPress', 'Squarespace'],
  timeline: 'In 3 to 6 months',
  brief: 'Retiring next spring.',
}

beforeEach(() => {
  send.mockReset()
  formspree.mockReset()
  send.mockResolvedValue({ ok: true, id: 're_123' })
  formspree.mockResolvedValue({ ok: true })
})

describe('a handover enquiry', () => {
  it('is sent to hello@ tagged as a handover, with a copy to the designer', async () => {
    const state = await submitBrief(initialBriefState, form(VALID))
    expect(state.status).toBe('sent')
    expect(send).toHaveBeenCalledTimes(2)
    const team = send.mock.calls[0][0]
    expect(team).toMatchObject({ to: 'hello@masuyodigital.com', replyTo: 'alex@morgandesign.co.uk', subject: 'Handover (confidential): Alex Morgan, 16 to 30 client sites' })
    expect(team.text).toContain('Form: Handover (sell your web design clients page)')
    expect(team.text).toContain('Main platforms: WordPress, Squarespace')
    expect(team.text).toContain('Timeline: In 3 to 6 months')
    expect(send.mock.calls[1][0]).toMatchObject({ to: 'alex@morgandesign.co.uk', subject: 'Your message is with us' })
    expect(send.mock.calls[1][0].text).toContain('none of your clients will be contacted')
  })

  it('needs no business name or message', async () => {
    const state = await submitBrief(initialBriefState, form({ ...VALID, brief: '' }))
    expect(state.status).toBe('sent')
  })

  it('asks for the sites, platforms and timeline', async () => {
    const state = await submitBrief(initialBriefState, form({ ...VALID, sites: '', platforms: [], timeline: 'Next decade' }))
    expect(state.status).toBe('invalid')
    expect(state.errors).toEqual({ sites: MESSAGES.sites, platforms: MESSAGES.platforms, timeline: MESSAGES.timeline })
    expect(send).not.toHaveBeenCalled()
  })

  it('keeps the honeypot: a bot is told it worked and nothing is sent', async () => {
    const state = await submitBrief(initialBriefState, form({ ...VALID, company_url: 'https://spam.example' }))
    expect(state.status).toBe('sent')
    expect(send).not.toHaveBeenCalled()
  })

  it('keeps the time on page check', async () => {
    const state = await submitBrief(initialBriefState, form({ ...VALID, started: String(Date.now() - 500) }))
    expect(state.status).toBe('sent')
    expect(send).not.toHaveBeenCalled()
  })

  it('falls back to Formspree with the handover fields when Resend fails', async () => {
    send.mockResolvedValue({ ok: false, reason: 'down' })
    const state = await submitBrief(initialBriefState, form(VALID))
    expect(state.status).toBe('sent')
    expect(formspree.mock.calls[0][0]).toMatchObject({ form: 'handover', sites: '16 to 30', platforms: 'WordPress, Squarespace', timeline: 'In 3 to 6 months' })
  })
})

describe('the handover page copy', () => {
  it('passes the brand rules', () => {
    expect(checkHandoverCopy()).toEqual([])
  })

  it('catches a long dash, a banned word, a capitalised brand name and a figure', () => {
    const bad = { ...HANDOVER, who: { ...HANDOVER.who, after: 'Masuyo — a studio to unlock 20% more.' } }
    const found = checkHandoverCopy(bad).join('\n')
    expect(found).toMatch(/long dash/)
    expect(found).toMatch(/capitalised Masuyo/)
    expect(found).toMatch(/studio/)
    expect(found).toMatch(/cuts on sight/)
    expect(found).toMatch(/percentage/)
  })
})
