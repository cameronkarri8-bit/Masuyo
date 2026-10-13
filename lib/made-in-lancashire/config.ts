/**
 * Made in Lancashire: settings and fixed wording shared by the pages, the
 * forms and the footer. Safe to import from client components.
 */

/**
 * The preview switch.
 *
 * false (preview): every Made in Lancashire page is live at its URL but
 * noindex, left out of the sitemap, not linked from the navigation, footer
 * or Resources, and placeholder features show with a "Preview" note.
 *
 * true (public): indexed, in the sitemap, linked from the footer and the
 * Resources hub, and placeholder features are hidden.
 */
export const MADE_IN_LANCASHIRE_PUBLIC = false

export const MIL_PATH = '/made-in-lancashire'

/** The Supabase Edge Function that stores nominations (MasCRM project). No key needed. */
export const NOMINATION_ENDPOINT = 'https://nxnaamwjpjzzfzazvpbz.supabase.co/functions/v1/submit-nomination'

/**
 * The round-up box. The submit-nomination function stores this exact wording
 * as consent_text, so the two must never drift apart.
 */
export const ROUNDUP_CONSENT = 'Send me the monthly Made in Lancashire round-up. Unsubscribe any time.'

export const STICKER_MAILTO = 'mailto:hello@masuyodigital.com?subject=Made%20in%20Lancashire%20sticker'

export const BADGE_PATH = '/made-in-lancashire/badge.svg'
/** Rendered size of the badge in embed code; the SVG is drawn at twice this. */
export const BADGE_SIZE = { width: 246, height: 110 }

/** The Supabase Edge Function that stores applications and their photos. */
export const APPLICATION_ENDPOINT = 'https://nxnaamwjpjzzfzazvpbz.supabase.co/functions/v1/submit-application'

/**
 * Reading the directory. The publishable key is designed to be public: it can
 * read the directory_members view (safe columns of published members) and
 * nothing else.
 */
export const SUPABASE_URL = 'https://nxnaamwjpjzzfzazvpbz.supabase.co'
export const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable__inaHc0L5ShR32zIs1CtMQ_Rs0i0HDR'
export const DIRECTORY_PHOTO_HOST = 'nxnaamwjpjzzfzazvpbz.supabase.co'

export const DIRECTORY_PATH = `${MIL_PATH}/directory`

/** The application categories, matching the check in campaign_applications. */
export const CATEGORIES = ['Food and drink', 'Retail', 'Trades', 'Services', 'Wellbeing', 'Makers', 'Other'] as const

/** What applicants are promised, used in the copy and in MasCRM's days waiting. */
export const REPLY_WORKING_DAYS = 7

/** The hub's description, for metadata and share cards. No schedule is promised. */
export const HUB_DESCRIPTION =
  'Independent Lancashire businesses worth knowing. The ones opening doors, winning awards and doing right by their town. Picked on merit, featured for free.'
