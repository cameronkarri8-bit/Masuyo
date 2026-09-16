/**
 * Frozen Computers design concept: the facts the page is allowed to state.
 *
 * This is a speculative mockup drawn for a prospective client. It is not a live
 * client project and Masuyo Digital has no relationship with the business.
 *
 * Everything the page claims is listed here and nowhere else, so the page
 * cannot quietly grow a statistic that nobody supplied. Only these facts were
 * given. Do not add a review count, a turnaround time, a guarantee, a price or
 * a percentage to this file without a source.
 */

export const BUSINESS = {
  name: 'Frozen Computers',
  trade: 'Computer repair and custom PC builds',
  phoneDisplay: '01772 211858',
  addressLines: ['12 Watery Lane', 'Ashton-on-Ribble', 'Preston', 'PR2 2NN'],
} as const

/**
 * The verified facts, verbatim. The trust strip and the contact section both
 * read from here so the two can never disagree.
 */
export const TRUST_FACTS = [
  '4.9 on Google',
  'No Fix No Fee',
  '£35 diagnostic, credited against the repair',
  'Preston workshop',
] as const

/**
 * Every link and button on this concept is inert.
 *
 * Nothing points at frozencomputers.co.uk. The page must never send traffic to,
 * or appear to act on behalf of, the real business.
 *
 * The phone number in the nav reads as a call link and is styled as one. It is
 * held here rather than inline so that turning it into a working tel: link, if
 * the concept is ever shown live and that is wanted, is a one line change in
 * one file.
 */
export const INERT_HREF = '#'

export const NAV_LINKS = [
  { label: 'Repairs', href: INERT_HREF },
  { label: 'Custom PCs', href: INERT_HREF },
  { label: 'Shop', href: INERT_HREF },
  { label: 'Contact', href: INERT_HREF },
] as const

/** The sample notice, verbatim. Shown at the top of the page and in the footer. */
export const SAMPLE_NOTICE =
  'Design concept by Masuyo Digital. Not affiliated with or endorsed by Frozen Computers. Not licensed for use.'
