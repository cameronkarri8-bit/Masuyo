/**
 * Every word on /sell-your-web-design-clients, in one place so it can be
 * checked. checkHandoverCopy() runs when this module loads, which happens
 * during the build, so a long dash, a banned word or a capitalised brand
 * name fails the build instead of shipping. The same check runs in the
 * unit tests.
 *
 * Rules from the brief: UK English, sentence case, "you" and "we", masuyo in
 * lower case, never a studio or a freelancer, no figures for the payment
 * terms, no testimonials, statistics or claims of past acquisitions.
 */

export const HANDOVER = {
  titleTag: 'Sell your web design clients: Lancashire and UK | masuyo',
  metaDescription:
    'Stepping back from web design? Hand your clients to a Lancashire web company that looks after them properly, with a monthly revenue share and no upfront cost.',
  eyebrow: 'For web designers stepping back',
  h1: 'Stepping back from web design? Your clients are in safe hands.',
  heroBody: 'A practical guide to handing over your clients, written for freelance web designers and small agencies.',

  answerHeading: 'The short answer.',
  answer: [
    'At masuyo, we take on the clients of web designers who are stepping away. We look after their sites and hosting, keep everything running as it is, and pay you a share of what those clients pay each month for an agreed period. There is no large upfront payment, and nothing reaches your clients without your say.',
    'This page covers how a handover works, how you get paid, what happens to your clients and what to have ready.',
  ],

  who: {
    heading: 'Is this for me?',
    intro:
      'This is for freelance web designers, sole traders and small agencies in the UK who want their clients looked after when they step back. It suits you if one of these sounds familiar.',
    items: [
      'You are retiring, or winding down over the next year or two.',
      'You are starting a full time job and client work no longer fits around it.',
      'You are tired of being on call and want your evenings back.',
      'You are moving into something else, inside or outside the industry.',
      'Family or health changes mean it is time to step back.',
    ],
    after:
      'Most designers we speak to look after somewhere from a handful to a few dozen sites, often with hosting and maintenance attached. Lancashire and the North West come first, and we work with designers anywhere in the UK.',
  },

  how: {
    heading: 'How does a handover work?',
    intro: 'A handover happens in six steps, at your pace, and nothing reaches your clients until you say so.',
    steps: [
      { title: 'A confidential chat.', body: 'We talk about your clients and what you want from the handover. Nothing is shared with anyone.' },
      { title: 'You share a simple list.', body: 'Sites, platforms, hosting, domains and renewal dates. A spreadsheet or a few notes is fine.' },
      { title: 'We agree terms in writing.', body: 'Including how and when you get paid. You see everything before you sign anything.' },
      { title: 'We write to your clients together.', body: 'Nothing is sent without your approval, and no client is contacted before you say so.' },
      { title: 'Sites move at each client’s pace.', body: 'Nothing is rebuilt unless the client asks for it. Most clients notice very little.' },
      { title: 'You get paid each month.', body: 'Payments come from what your clients pay, for the period we agreed.' },
    ],
  },

  paid: {
    heading: 'How do I get paid?',
    intro:
      'You choose between a monthly share of what your clients pay over an agreed period, or a one-off payment for a small portfolio. The terms are agreed in writing for each portfolio, because no two are the same.',
    caption: 'The two ways a handover can be paid',
    columns: ['How it works', 'Upfront cost to masuyo', 'What you get', 'Best for'],
    rows: [
      {
        option: 'Monthly revenue share',
        cells: [
          'We pay you a share of what your clients pay us each month, for an agreed period after the handover.',
          'None. Payments come from what your clients pay.',
          'A regular payment that follows your clients, with nothing to chase.',
          'Portfolios with steady hosting and support income, and anyone happy to be paid over time.',
        ],
      },
      {
        option: 'One-off payment',
        cells: [
          'We agree a single price for the portfolio and pay it once the clients have moved over.',
          'A single agreed payment.',
          'One payment and a clean break.',
          'Small portfolios, or anyone who would rather settle everything in one go.',
        ],
      },
    ],
    after: 'We agree the share, the period or the price with you for each portfolio. Everything is written down before any client hears about it.',
  },

  clients: {
    heading: 'What happens to my clients?',
    intro: 'Your clients’ sites keep running as they are, and their prices stay the same for an agreed period after the handover.',
    items: [
      'Their sites, hosting and email carry on without a gap.',
      'They pay what they pay now for an agreed period.',
      'They get a named contact in Lancashire who answers the phone and replies to email.',
      'Afterwards, they can choose a masuyo support plan or move elsewhere.',
      'They own their site, domain and content either way.',
    ],
    afterBefore: 'Nobody is locked in, and nobody is surprised by a bill.',
  },

  ready: {
    heading: 'What do I need to have ready?',
    intro: 'A simple list of your clients and what each site runs on is enough to start, and it does not need to be perfect. Print this list and tick things off as you find them.',
    items: [
      { label: 'Client list and contacts', detail: 'Business names, the person you deal with, and their email and phone.' },
      { label: 'Domains', detail: 'Each domain and where it is registered.' },
      { label: 'Hosting accounts', detail: 'Who hosts each site, and whose name the account is in.' },
      { label: 'Logins', detail: 'Where they are kept. Do not send passwords by email; we agree a safe way to share them.' },
      { label: 'Renewal dates', detail: 'Domains, hosting, licences and anything else that renews.' },
      { label: 'Contracts and agreed prices', detail: 'Anything written down, and anything agreed on a handshake.' },
      { label: 'Anything mid-project', detail: 'Work in progress, promised changes and unpaid invoices.' },
    ],
    after: 'Gaps are normal. We fill them in together during the handover.',
  },

  why: {
    heading: 'Why hand over to masuyo?',
    intro: 'Your clients get someone local who knows them by name, works to published fixed prices and can grow their site with them.',
    points: [
      { title: 'Founder-led, in Leyland.', body: 'masuyo is run by Cameron from Leyland, Lancashire. Your clients deal with the person doing the work.' },
      { title: 'Published fixed prices.', body: 'Every price is on the website, so your clients know what they will pay before they ask.' },
      { title: 'Room to grow.', body: 'We build websites, web apps and custom systems, so a client who outgrows their site has somewhere to go.' },
      { title: 'Honest about size.', body: 'One founder, and every client known by name. We take on a portfolio only when we can look after it properly.' },
    ],
  },

  faqs: [
    {
      question: 'Will you contact my clients without asking me?',
      answer:
        'No. You approve every word of the introduction before it is sent, and no client hears from us until you say so. Most designers like to tell their clients personally first, and until then the fact that you are talking to us stays between us.',
    },
    {
      question: 'Do you only take on WordPress sites?',
      answer:
        'No. We look at every site whatever it is built on, starting with a short health check, and tell you honestly which ones we can look after as they are. Where a site needs more than we can offer, we say so before the handover and agree with you what happens to it, so no client is left without help.',
    },
    {
      question: 'Do I need to be in Lancashire?',
      answer:
        'No. We work with designers and their clients anywhere in the UK, with a focus on Lancashire and the North West, where we can meet clients in person. Most of the work happens by phone, email and video call, so distance rarely gets in the way.',
    },
    {
      question: 'Can I stay involved for a while?',
      answer:
        'Yes, if you want to. Some designers stay on hand for a few months to answer questions and introduce us properly, while others prefer a clean break. We agree what suits you at the start, and it can change as the handover goes on.',
    },
  ],

  dataFaq: {
    question: 'What about my clients’ data?',
    answer:
      'Your clients are told about the handover, and their data is moved properly and only as far as it needs to go. We agree together what moves, how and when, and keep a record of it. The ICO covers business handovers in',
    icoLabel: 'Data sharing: a code of practice',
    icoUrl: 'https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-sharing/data-sharing-a-code-of-practice/',
    note: ', and this answer is general guidance, not legal advice.',
  },

  next: {
    heading: 'How do I start a confidential chat?',
    intro: 'Send a few details below and Cameron will reply personally within one working day to arrange a confidential chat.',
    after: 'There is no obligation and no pressure. If it helps your thinking, read',
  },

  cameron: {
    heading: 'Who will I be talking to?',
    lines: [
      'You will be talking to Cameron, who founded masuyo and designs, builds and looks after every website and system from Leyland in Lancashire.',
      'He will be your clients’ named contact too, from the first introduction onwards.',
    ],
  },
} as const

const BANNED: { pattern: RegExp; reason: string }[] = [
  { pattern: /[–—]/, reason: 'a long dash (en or em)' },
  { pattern: /plain\s+english/i, reason: 'a banned phrase' },
  { pattern: /\bMasuyo\b/, reason: 'a capitalised Masuyo (always lower case on this page)' },
  { pattern: /\bstudio\b/i, reason: 'the word studio' },
  { pattern: /\bfreelancer\b/i, reason: 'the word freelancer' },
  {
    pattern: /\b(unlock|elevate|supercharge|game[- ]changer|seamless(ly)?|leverage|cutting[- ]edge|robust|synergy|holistic|delve|navigate|look no further|next level)\b/i,
    reason: 'a word the brief cuts on sight',
  },
  { pattern: /\bsolutions\b/i, reason: 'the word solutions' },
  { pattern: /\d+\s?%|£\s?\d/, reason: 'a percentage or an amount (terms are agreed per portfolio)' },
]

function strings(value: unknown, path: string): [string, string][] {
  if (typeof value === 'string') return [[path, value]]
  if (Array.isArray(value)) return value.flatMap((v, i) => strings(v, `${path}[${i}]`))
  if (value && typeof value === 'object') return Object.entries(value).flatMap(([k, v]) => strings(v, `${path}.${k}`))
  return []
}

/** Every rule the copy breaks, as readable lines. Empty when it is clean. */
export function checkHandoverCopy(copy: unknown = HANDOVER): string[] {
  const problems: string[] = []
  for (const [path, text] of strings(copy, 'handover')) {
    if (path.endsWith('.icoUrl')) continue
    for (const { pattern, reason } of BANNED) if (pattern.test(text)) problems.push(`${path} contains ${reason}`)
  }
  const h = HANDOVER
  if (h.titleTag.length < 50 || h.titleTag.length > 60 || !h.titleTag.endsWith('| masuyo')) problems.push(`The title tag is ${h.titleTag.length} characters; it should be 50 to 60 and end "| masuyo"`)
  if (h.metaDescription.length < 140 || h.metaDescription.length > 160) problems.push(`The meta description is ${h.metaDescription.length} characters; it should be 140 to 160`)
  const words = h.answer[0].split(/\s+/).length
  if (words < 40 || words > 60) problems.push(`The short answer is ${words} words; it should be 40 to 60`)
  for (const f of h.faqs) {
    const n = f.answer.split(/\s+/).length
    if (n < 40 || n > 80) problems.push(`The answer to "${f.question}" is ${n} words; it should be 40 to 80`)
  }
  return problems
}

const problems = checkHandoverCopy()
if (problems.length) throw new Error(`The handover page copy breaks the brand rules:\n- ${problems.join('\n- ')}`)
