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

/**
 * The repair services, exactly the nine that were supplied.
 *
 * The second line of each describes the symptom a customer arrives with. That
 * is deliberate: symptoms are generic and observable, so the page stays useful
 * without claiming a turnaround, a success rate or a scope of work that nobody
 * confirmed. Nothing here promises an outcome.
 */
export const REPAIRS = [
  { name: 'Laptop screen repair', symptom: 'Cracked, dim, or showing lines.' },
  { name: 'Laptop repair', symptom: 'Will not boot, overheating, or running slow.' },
  { name: 'Desktop repair', symptom: 'Towers and all-in-ones that have stopped behaving.' },
  { name: 'Game console repair', symptom: 'Overheating, disc faults, and failed ports.' },
  { name: 'Data recovery', symptom: 'Photos and files on a drive that will not open.' },
  { name: 'Virus removal', symptom: 'Pop-ups, redirects, and software you did not install.' },
  { name: 'Hardware upgrades', symptom: 'More memory, faster storage, a better graphics card.' },
  { name: 'Screen replacement', symptom: 'Panels and glass on laptops, monitors and all-in-ones.' },
  { name: 'Battery replacement', symptom: 'Batteries that swell, drain fast, or stop charging.' },
] as const

/**
 * Custom PC section, written as a spec sheet rather than a sales pitch.
 *
 * Each line describes how a machine is put together. None of them states a
 * price, a delivery time or a warranty, because none was supplied.
 */
export const BUILD_SPECS = [
  {
    term: 'Specification',
    detail: 'Chosen part by part around what the machine is actually for.',
  },
  {
    term: 'Assembly',
    detail: 'Built, cable managed and tested before it leaves the workshop.',
  },
  {
    term: 'Headroom',
    detail: 'Room left to add memory, storage or a new card further down the line.',
  },
] as const

/**
 * How it works.
 *
 * Steps two and three carry the two supplied facts, the £35 diagnostic credited
 * against the repair and No Fix No Fee, at the point in the journey where each
 * one actually applies.
 */
export const STEPS = [
  {
    title: 'Book online',
    detail: 'Tell us the device and what it is doing.',
  },
  {
    title: 'We diagnose',
    detail: 'A £35 diagnostic fee, credited against the repair.',
  },
  {
    title: 'We fix it and you collect',
    detail: 'No Fix No Fee, so there is nothing to pay if it cannot be put right.',
  },
] as const

/** Areas covered, as an inline list. Not a map. */
export const AREAS = [
  'Ashton',
  'Brookfield',
  'Cadley',
  'Avenham',
  'Ribbleton',
  'Deepdale',
  'Preston City Centre',
  'Callon',
] as const
