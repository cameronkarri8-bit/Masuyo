/**
 * The shape of an industry landing page.
 *
 * One typed data file per industry lives in content/industries. The page
 * template, the metadata, the structured data, the sitemap and the hub all
 * read from it, so they can never disagree.
 *
 * Copy strings can carry two kinds of token:
 * - [n] cites source n from `sources`. It renders as a small link to that
 *   source, and every source is listed at the foot of the page.
 * - {{price:key}} prints a price from lib/pricing.ts (see PRICE_TOKENS in
 *   lib/industries/text.ts). Prices are never typed into copy.
 */

import type { PricingCardKey } from '@/components/site/PricingCards'

export interface IndustrySource {
  /** The number used by [n] markers in the copy. */
  n: number
  /** The page title, as the source publishes it. */
  title: string
  publisher: string
  url: string
}

export interface BulletGroup {
  subheading: string
  items: string[]
}

export interface NumberedStep {
  title: string
  body?: string
}

export interface IndustrySection {
  heading: string
  paragraphs: string[]
  /** Rendered as a two column feature list, one column per group. */
  bulletGroups?: BulletGroup[]
  steps?: NumberedStep[]
  /** Paragraphs after the lists or steps. */
  after?: string[]
  /** Shows the shared pricing cards in this section. */
  pricing?: PricingCardKey[]
}

export interface IndustryFaq {
  question: string
  answer: string
}

export type IllustrationKey = 'dual-control-car'

export interface Industry {
  status: 'published'
  slug: string
  titleTag: string
  metaDescription: string
  /** Short name, for the eyebrow and the hub card. */
  label: string
  /** The page's name in the breadcrumb trail. */
  breadcrumb: string
  h1: string
  subline: string
  /** Shown on the hub card. Falls back to the meta description. */
  cardSummary?: string
  author: string
  /** ISO date, YYYY-MM-DD. */
  updatedDate: string
  answerBlock: { heading: string; paragraphs: string[] }
  sections: IndustrySection[]
  faqs: IndustryFaq[]
  /** Defaults to "Questions." */
  faqHeading?: string
  closing?: { heading: string; body: string }
  sources: IndustrySource[]
  /** Resource slugs, shown under Further reading. */
  relatedResources: string[]
  /** Other industry slugs, shown under Further reading once they exist. */
  siblingIndustries: string[]
  illustration: { key: IllustrationKey; alt: string }
}

/** The fields that do not depend on the page copy. */
type CopyFreeFields = 'slug' | 'author' | 'sources' | 'relatedResources' | 'siblingIndustries' | 'illustration'

/**
 * An industry whose page copy has not been supplied yet. It is not built,
 * listed or put in the sitemap until its copy is filled in and its status
 * becomes 'published'.
 */
export type IndustryAwaitingCopy = Pick<Industry, CopyFreeFields> & { status: 'awaiting-copy' }

export type IndustryEntry = Industry | IndustryAwaitingCopy
