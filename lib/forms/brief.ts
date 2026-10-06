/**
 * The Start a project brief: its fields, options, validation and the plain
 * text the emails carry.
 *
 * Pure functions with no I/O, so they run the same on the server and in tests.
 * The error messages are the copy spec's, word for word, where the spec gives
 * one; the rest follow its rule of saying what to do.
 */
import { BUDGET_OPTIONS, ESTIMATOR, gbp } from '@/lib/pricing'

export const NEED_OPTIONS = ['Website', 'System or CRM', 'Automation', 'Care for an existing site', 'Not sure yet'] as const
export const SIZE_OPTIONS = ['Just me', '2 to 5', '6 to 25', 'More than 25'] as const
export { BUDGET_OPTIONS }

export const CONTACT_EMAIL = 'hello@masuyodigital.com'

/** Which form sent it. The venue page shares this pipeline with its own fields. */
export type FormSource = 'start' | 'lifestyle-venues'

export type BriefField = 'name' | 'email' | 'business' | 'needs' | 'brief' | 'size' | 'budget'

export interface Brief {
  source: FormSource
  name: string
  email: string
  business: string
  needs: string[]
  brief: string
  size: string
  budget: string
  /** The page they came from. */
  page: string
  /** Estimator choices, when they arrived from the pricing estimator. */
  estimator: string
}

export const MESSAGES = {
  name: 'Add your name so we know who to reply to.',
  email: 'Add an email address we can reply to, for example name@business.co.uk.',
  business: 'Add your business name, so we can look you up before we reply.',
  venue: 'Add the name of your venue.',
  needs: 'Pick at least one, or choose Not sure yet.',
  brief: 'Tell us a little about what you need. A sentence is fine.',
  size: 'Pick the closest size. A rough answer is fine.',
  sendFailed: `That didn't send. Try again, or email ${CONTACT_EMAIL} and we'll pick it up.`,
} as const

const LIMITS = { name: 120, email: 200, business: 200, brief: 5000, page: 300, estimator: 500 }

const clean = (v: unknown, max: number) =>
  typeof v === 'string' ? v.replace(/\r\n/g, '\n').trim().slice(0, max) : ''

/** Reads a submitted form into a Brief. Unknown option values are dropped. */
export function readBrief(form: FormData): Brief {
  const source: FormSource = form.get('source') === 'lifestyle-venues' ? 'lifestyle-venues' : 'start'
  const needs = form
    .getAll('needs')
    .map(v => clean(v, 60))
    .filter((v): v is (typeof NEED_OPTIONS)[number] => (NEED_OPTIONS as readonly string[]).includes(v))
  const size = clean(form.get('size'), 40)
  const budget = clean(form.get('budget'), 60)
  return {
    source,
    name: clean(form.get('name'), LIMITS.name),
    email: clean(form.get('email'), LIMITS.email),
    business: clean(form.get('business'), LIMITS.business),
    needs: Array.from(new Set(needs)),
    brief: clean(form.get('brief'), LIMITS.brief),
    size: (SIZE_OPTIONS as readonly string[]).includes(size) ? size : '',
    budget: (BUDGET_OPTIONS as readonly string[]).includes(budget) ? budget : '',
    page: clean(form.get('page'), LIMITS.page),
    estimator: clean(form.get('estimator'), LIMITS.estimator),
  }
}

/** A plain, practical email check: something@something.something, no spaces. */
export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
}

/** Field errors, or an empty object when the brief is complete. */
export function validate(b: Brief): Partial<Record<BriefField, string>> {
  const errors: Partial<Record<BriefField, string>> = {}
  if (!b.name) errors.name = MESSAGES.name
  if (!isEmail(b.email)) errors.email = MESSAGES.email
  if (!b.business) errors.business = b.source === 'lifestyle-venues' ? MESSAGES.venue : MESSAGES.business
  if (!b.brief) errors.brief = MESSAGES.brief
  // The venue form has no needs or size questions.
  if (b.source === 'start') {
    if (b.needs.length === 0) errors.needs = MESSAGES.needs
    if (!b.size) errors.size = MESSAGES.size
  }
  return errors
}

export const firstName = (name: string) => name.split(/\s+/)[0] ?? ''

export function subjectFor(b: Brief): string {
  return `New brief: ${b.business || b.name}`
}

const FORM_LABEL: Record<FormSource, string> = {
  start: 'Start a project',
  'lifestyle-venues': 'Lifestyle venues page',
}

/** The fields as labelled lines, shared by both emails. */
export function fieldLines(b: Brief): string[] {
  const venue = b.source === 'lifestyle-venues'
  const lines = [
    `Name: ${b.name}`,
    `Email: ${b.email}`,
    `${venue ? 'Venue' : 'Business and website'}: ${b.business}`,
  ]
  if (!venue) lines.push(`Needs help with: ${b.needs.join(', ') || 'Not given'}`)
  lines.push('', venue ? 'Message:' : 'What is slowing the business down:', b.brief, '')
  if (!venue) {
    lines.push(`People in the business: ${b.size || 'Not given'}`)
    lines.push(`Budget: ${b.budget || 'Not given'}`)
  }
  return lines
}

export function teamEmailText(b: Brief, sentAt: Date): string {
  const when = sentAt.toLocaleString('en-GB', { timeZone: 'Europe/London', dateStyle: 'long', timeStyle: 'short' })
  return [
    'New brief from the website',
    '',
    ...fieldLines(b),
    '',
    `Form: ${FORM_LABEL[b.source]}`,
    `Came from: ${b.page || 'Not known'}`,
    `Estimator choices: ${b.estimator || 'None'}`,
    `Sent: ${when}`,
    '',
    'Reply to this email to answer them directly.',
  ].join('\n')
}

export function visitorEmailText(b: Brief): string {
  return [
    `Thanks, ${firstName(b.name)}. Your brief is with us.`,
    '',
    'You will hear back within one working day. Here is a copy of what you sent, in case it is useful.',
    '',
    ...fieldLines(b),
    '',
    'No mailing list, no follow up sequence. Just a reply from a person.',
    '',
    'Masuyo',
    CONTACT_EMAIL,
  ].join('\n')
}

/* --- Estimator hand-off ---------------------------------------------------- */

/** Turns the estimator's query string into words for the brief and the email. */
export function fromEstimator(params: Record<string, string | undefined>) {
  if (params.from !== 'estimator') return null
  const size = ESTIMATOR.size.find(o => o.id === params.size)
  const features = (params.features ?? '')
    .split(',')
    .map(id => ESTIMATOR.features.find(o => o.id === id))
    .filter(Boolean) as { id: string; label: string }[]
  const words = ESTIMATOR.words.find(o => o.id === params.words)
  const range = /^(\d+)-(\d+)$/.exec(params.range ?? '')

  const featureText = features.map(f => f.label.charAt(0).toLowerCase() + f.label.slice(1))
  const list =
    featureText.length > 1 ? `${featureText.slice(0, -1).join(', ')} and ${featureText[featureText.length - 1]}` : featureText[0]
  const parts = [
    `A website${size ? ` of ${size.label.toLowerCase()}` : ''}${list ? ` that can ${list}` : ''}.`,
    words?.id === 'help' ? 'We would like help with the words.' : words?.id === 'we-supply' ? 'We will supply the words.' : '',
  ].filter(Boolean)

  const summary = [
    size?.label,
    features.map(f => f.label).join(', '),
    words ? `Words: ${words.label}` : '',
    range ? `Range ${gbp(+range[1])} to ${gbp(+range[2])}` : '',
  ]
    .filter(Boolean)
    .join('; ')

  return { brief: parts.join(' '), summary, budget: BUDGET_OPTIONS[1] as string }
}
