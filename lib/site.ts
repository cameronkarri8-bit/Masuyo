/**
 * Facts about Masuyo that more than one page states.
 *
 * Kept in one place so the footer, the schema, the contact panel and the brand
 * page can never disagree. Prices and timelines live in lib/pricing.ts.
 */

export const SITE = {
  name: 'Masuyo',
  legalName: 'Masuyo Digital',
  url: 'https://masuyodigital.com',
  email: 'hello@masuyodigital.com',
  /** Positioning line, from the brand guidelines. */
  positioning:
    'Masuyo builds websites, web apps and custom CRMs for small businesses that run on bookings, quotes and stock. Fixed prices, scoped properly, and looked after once they are live.',
  /** One line version, for partners and the brand page. */
  oneLiner:
    'Masuyo builds websites, web apps and custom CRMs for small businesses that run on bookings, quotes and stock.',
  tagline: 'Measured twice. Shipped once.',
  replyPromise: 'Replies within one working day.',
} as const

/**
 * Booking calendar for "Book a 20 minute call".
 *
 * Empty until a calendar exists. While it is empty the booking link is hidden
 * everywhere and the email link stays, so nothing on the site points nowhere.
 */
export const BOOKING_URL = ''
