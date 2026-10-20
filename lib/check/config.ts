/**
 * The free website check: endpoints and fixed wording shared by the /check
 * page, the corner pop-up and the web report. Safe to import from client
 * components.
 *
 * The work happens in two Supabase edge functions in the MasCRM project:
 * website-check runs the check and emails the report, and
 * website-check-report serves a report by its token. Neither needs a key.
 */

export const CHECK_PATH = '/check'
export const REPORT_PATH = '/check/report'

export const WEBSITE_CHECK_ENDPOINT = 'https://nxnaamwjpjzzfzazvpbz.supabase.co/functions/v1/website-check'
export const WEBSITE_CHECK_REPORT_ENDPOINT = 'https://nxnaamwjpjzzfzazvpbz.supabase.co/functions/v1/website-check-report'

/** The tips box. website-check stores this exact wording as consent_text, so the two must never drift apart. */
export const CHECK_CONSENT = 'Send me occasional tips and offers from Masuyo'

export const CHECK_PRIVACY = 'We only use your details to send the report and follow up once.'

export const GOALS = [
  { value: 'more_enquiries', label: 'More enquiries' },
  { value: 'more_bookings', label: 'More bookings' },
  { value: 'found_on_google', label: 'Being found on Google' },
  { value: 'not_sure', label: 'Not sure' },
] as const

/** What the report covers, in the order it appears. */
export const REPORT_SECTIONS = [
  { title: 'Speed', body: "Google's own speed test on a phone and a computer, with real visitor data where Google has it." },
  { title: 'On a phone', body: 'Whether the page fits a phone screen, is easy to tap and read, and works for everyone.' },
  { title: 'Found on Google', body: 'Page title, description, headings, sitemap and anything stopping Google listing you.' },
  { title: 'Local signals', body: 'Tap to call, your town or address, business details Google reads, and a map link.' },
  { title: 'Google Business Profile', body: 'Your reviews, hours, photos and website link, and whether your details match.' },
  { title: 'Enquiries', body: 'How easily people can get in touch: a form, an email link, and online booking.' },
  { title: 'Trust and security', body: 'A secure connection, everything loading securely, and a privacy policy.' },
] as const

/** Records an event in Umami, when it is loaded. */
export function track(event: string, data?: Record<string, string>) {
  try {
    ;(window as unknown as { umami?: { track?: (e: string, d?: object) => void } }).umami?.track?.(event, data)
  } catch {
    // Analytics never gets in the way.
  }
}
