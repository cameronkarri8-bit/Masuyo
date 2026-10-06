/**
 * Every price and timeline the site publishes, in one place.
 *
 * Change a number here and it changes everywhere: the offer pages, the
 * pricing cards, the Care plans, the estimator and the start form's budget
 * options. Nothing on the site should state a price that is not in this file.
 *
 * Masuyo is not VAT registered, so every figure is the price paid. Never add
 * "plus VAT" or "excluding VAT" anywhere.
 */

/** Formats a whole pound amount as "£1,500". */
export function gbp(amount: number): string {
  return `£${amount.toLocaleString('en-GB')}`
}

/* --- Offers --------------------------------------------------------------- */

export const WEBSITES = {
  from: 1500,
  to: 4000,
  /** The range in words, for sentences. */
  get range() {
    return `${gbp(this.from)} to ${gbp(this.to)}`
  },
} as const

export const SYSTEMS = {
  from: 3000,
  get fromText() {
    return `From ${gbp(this.from)}`
  },
} as const

export const CARE_PLANS = {
  care: {
    name: 'Care',
    monthly: 190,
    summary: 'For websites that need to stay fast, secure and current.',
    includes: [
      'Managed hosting on our servers',
      'SSL, uptime monitoring and daily backups',
      'Security and software updates',
      'Small content changes',
      'Email support, replies within one working day',
    ],
  },
  carePlus: {
    name: 'Care Plus',
    monthly: 290,
    /*
      The copy spec labels this plan "Most chosen". That is a claim about what
      clients pick, and there is no data behind it yet, so the label says
      "Recommended" instead. If it becomes true, change it here.
    */
    label: 'Recommended',
    summary: 'For businesses that want their site to keep improving.',
    includes: [
      'Everything in Care, plus',
      'Monthly improvement time',
      'Ongoing SEO and content updates',
      'A short monthly report in plain English',
      'Priority support',
    ],
  },
  systemsCare: {
    name: 'Systems Care',
    priceText: 'Agreed per system',
    summary:
      'For custom CRMs, portals and automation. Monitoring, fixes and improvements matched to how much the system does.',
  },
} as const

/** "£190 a month" style text, used in sentences. */
export const careFromText = `${gbp(CARE_PLANS.care.monthly)} a month`
export const careBothText = `${gbp(CARE_PLANS.care.monthly)} or ${gbp(CARE_PLANS.carePlus.monthly)} a month`

/* --- Timelines and terms -------------------------------------------------- */

export const TIMELINES = {
  /** Typical time from first call to a website going live. */
  websiteLive: 'two to six weeks',
}

export const PAYMENT = {
  split: 'A deposit to begin each phase, the balance when you sign it off.',
  careBilling: 'Care billed monthly from launch, with every invoice in your client portal.',
  careTerm: 'Plans run month to month.',
}

/* --- Website estimator ---------------------------------------------------- */

/*
  The estimator turns three choices into a rough range. Each choice adds a
  low and a high amount, and the result is clamped so it always sits inside
  the published website range above. It can never quote outside what the
  pricing cards say.
*/

export interface EstimatorOption {
  id: string
  label: string
  low: number
  high: number
}

export const ESTIMATOR = {
  size: [
    { id: 'up-to-5', label: 'Up to 5 pages', low: 1500, high: 1900 },
    { id: '6-to-12', label: '6 to 12 pages', low: 1900, high: 2600 },
    { id: '13-plus', label: '13 pages or more', low: 2600, high: 3200 },
  ],
  features: [
    { id: 'bookings', label: 'Take bookings', low: 150, high: 250 },
    { id: 'quotes', label: 'Collect quote requests', low: 100, high: 150 },
    { id: 'shop', label: 'Sell products', low: 300, high: 450 },
    { id: 'stock', label: 'Show live stock', low: 200, high: 300 },
    { id: 'news', label: 'Publish news or guides', low: 50, high: 100 },
  ],
  words: [
    { id: 'we-supply', label: 'We will supply them', low: 0, high: 0 },
    { id: 'help', label: 'We would like help', low: 150, high: 250 },
  ],
} as const satisfies Record<string, readonly EstimatorOption[]>

/** The narrowest range the estimator will show, so a range never collapses to a single price. */
const MIN_SPREAD = 300

export interface EstimatorChoice {
  size?: string
  features: string[]
  words?: string
}

export function estimate(choice: EstimatorChoice): { low: number; high: number } | null {
  if (!choice.size && choice.features.length === 0 && !choice.words) return null
  const pick = (list: readonly EstimatorOption[], id?: string) => list.find(o => o.id === id)
  const size = pick(ESTIMATOR.size, choice.size) ?? ESTIMATOR.size[0]
  const words = pick(ESTIMATOR.words, choice.words)
  let low = size.low + (words?.low ?? 0)
  let high = size.high + (words?.high ?? 0)
  for (const id of choice.features) {
    const f = pick(ESTIMATOR.features, id)
    if (f) {
      low += f.low
      high += f.high
    }
  }
  const round = (v: number) => Math.round(v / 50) * 50
  high = Math.min(WEBSITES.to, round(high))
  low = Math.max(WEBSITES.from, Math.min(round(low), high - MIN_SPREAD))
  return { low, high }
}

/* --- Start form budget options -------------------------------------------- */

export const BUDGET_OPTIONS = [
  `Under ${gbp(WEBSITES.from)}`,
  WEBSITES.range,
  `${gbp(WEBSITES.to)} to ${gbp(10000)}`,
  `More than ${gbp(10000)}`,
  'Not sure',
] as const
