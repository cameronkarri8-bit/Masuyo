import { checkedJsonLd } from '@/lib/industries/schema'
import { SITE } from '@/lib/site'
import { MIL_PATH } from './config'
import { type Feature, featurePath, hookSentence, instagramUrl, openingLine } from './index'

/** Structured data for the hub (a CollectionPage listing every feature) and each feature (an Article about a LocalBusiness). */

const abs = (p: string) => (p.startsWith('http') ? p : `${SITE.url}${p}`)
const publisher = { '@type': 'Organization', name: SITE.legalName, url: SITE.url }

export const HUB_TITLE = 'Made in Lancashire: independent businesses worth knowing | Masuyo'
export const HUB_DESCRIPTION = 'One independent Lancashire business every week. The ones opening doors, winning awards and doing right by their town. Picked on merit, featured for free.'

export function hubJsonLd(features: Feature[]) {
  return checkedJsonLd({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Made in Lancashire',
    description: HUB_DESCRIPTION,
    url: `${SITE.url}${MIL_PATH}`,
    publisher,
    mainEntity: {
      '@type': 'ItemList',
      itemListOrder: 'https://schema.org/ItemListOrderDescending',
      numberOfItems: features.length,
      itemListElement: features.map((f, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE.url}${featurePath(f.slug)}`,
        name: `${f.business_name}, ${f.town}`,
      })),
    },
  })
}

export function featureJsonLd(f: Feature) {
  const url = `${SITE.url}${featurePath(f.slug)}`
  const sameAs = [instagramUrl(f), f.website].filter((v, i, a) => v && a.indexOf(v) === i)
  return checkedJsonLd({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${f.business_name}, ${f.town}`,
    description: hookSentence(f),
    abstract: openingLine(f),
    datePublished: f.featured_on,
    url,
    mainEntityOfPage: url,
    image: abs(f.photo),
    author: publisher,
    publisher,
    isPartOf: { '@type': 'CollectionPage', name: 'Made in Lancashire', url: `${SITE.url}${MIL_PATH}` },
    about: {
      '@type': 'LocalBusiness',
      name: f.business_name,
      image: abs(f.photo),
      logo: abs(f.logo),
      url: f.website,
      address: { '@type': 'PostalAddress', streetAddress: f.address, addressLocality: f.town, addressRegion: 'Lancashire', addressCountry: 'GB' },
      ...(f.opening_hours ? { openingHours: f.opening_hours } : {}),
      sameAs,
    },
  })
}
