import type { PricingCardKey } from '@/components/site/PricingCards'
import { CARE_PLANS, SYSTEMS, WEBSITES } from '@/lib/pricing'
import { SITE } from '@/lib/site'
import { industryCrumbs, industryPath } from './index'
import { plainText } from './text'
import type { Industry } from './types'

/**
 * Structured data for an industry page, built from the same data file as the
 * page: Service (with offers from lib/pricing.ts), FAQPage and BreadcrumbList.
 */

type Json = Record<string, unknown>

const GBP = 'GBP'

function offersFor(keys: PricingCardKey[]): Json[] {
  const offers: Json[] = []
  if (keys.includes('websites'))
    offers.push({
      '@type': 'Offer',
      name: 'Websites',
      url: `${SITE.url}/websites`,
      priceCurrency: GBP,
      priceSpecification: { '@type': 'PriceSpecification', priceCurrency: GBP, minPrice: WEBSITES.from, maxPrice: WEBSITES.to },
    })
  if (keys.includes('systems'))
    offers.push({
      '@type': 'Offer',
      name: 'Systems',
      url: `${SITE.url}/systems`,
      priceCurrency: GBP,
      priceSpecification: { '@type': 'PriceSpecification', priceCurrency: GBP, minPrice: SYSTEMS.from },
    })
  if (keys.includes('care'))
    for (const plan of [CARE_PLANS.care, CARE_PLANS.carePlus])
      offers.push({
        '@type': 'Offer',
        name: plan.name,
        url: `${SITE.url}/care`,
        priceCurrency: GBP,
        price: plan.monthly,
        priceSpecification: { '@type': 'UnitPriceSpecification', priceCurrency: GBP, price: plan.monthly, unitText: 'month' },
      })
  return offers
}

/** The pricing shown on the page, or websites and Care when it shows none. */
export function pricingKeys(industry: Industry): PricingCardKey[] {
  const shown = industry.sections.flatMap(s => s.pricing ?? [])
  const keys = shown.length > 0 ? shown : (['websites', 'care'] as PricingCardKey[])
  return Array.from(new Set(keys))
}

export function industryJsonLd(industry: Industry): Json[] {
  const url = `${SITE.url}${industryPath(industry.slug)}`
  const service: Json = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: plainText(industry.h1),
    description: industry.metaDescription,
    url,
    serviceType: 'Website design and development',
    audience: { '@type': 'BusinessAudience', audienceType: industry.label },
    provider: { '@type': 'Organization', name: SITE.legalName, url: SITE.url },
    areaServed: { '@type': 'Country', name: 'United Kingdom' },
    offers: offersFor(pricingKeys(industry)),
  }
  const faq: Json = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: industry.faqs.map(f => ({
      '@type': 'Question',
      name: plainText(f.question),
      acceptedAnswer: { '@type': 'Answer', text: plainText(f.answer) },
    })),
  }
  const breadcrumbs = breadcrumbJsonLd(industryCrumbs(industry))
  return [service, ...(industry.faqs.length > 0 ? [faq] : []), breadcrumbs]
}

export function breadcrumbJsonLd(items: { name: string; href: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.href === '/' ? '' : item.href}`,
    })),
  }
}

/**
 * Checks structured data serialises and parses back to the same thing, with
 * a context and a type on every block. Pages call it while they render, which
 * for these static pages is during the build, so bad data fails the build.
 */
export function checkedJsonLd<T extends Json | Json[]>(data: T): T {
  const blocks = Array.isArray(data) ? data : [data]
  for (const block of blocks) {
    const text = JSON.stringify(block)
    if (text.includes(':null')) throw new Error(`JSON-LD contains an empty value: ${text.slice(0, 200)}`)
    const parsed = JSON.parse(text) as Json
    if (parsed['@context'] !== 'https://schema.org' || typeof parsed['@type'] !== 'string')
      throw new Error(`JSON-LD block is missing @context or @type: ${text.slice(0, 200)}`)
    if (JSON.stringify(parsed) !== text) throw new Error('JSON-LD did not survive a round trip')
  }
  return data
}
