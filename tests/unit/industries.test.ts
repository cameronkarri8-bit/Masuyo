/**
 * Industry landing pages: the data checks, the copy tokens and the
 * structured data. The fixture below is test data only, never a page.
 */
import { describe, expect, it } from 'vitest'
import { checkIndustry, INDUSTRIES } from '@/lib/industries'
import { checkedJsonLd, industryJsonLd } from '@/lib/industries/schema'
import { citations, plainText, segments } from '@/lib/industries/text'
import type { Industry } from '@/lib/industries/types'
import { CARE_PLANS, WEBSITES } from '@/lib/pricing'

const fixture: Industry = {
  status: 'published',
  slug: 'test-industry',
  titleTag: 'Test title | Masuyo',
  metaDescription: 'Test description.',
  label: 'Test label',
  breadcrumb: 'Test crumb',
  h1: 'Test heading.',
  subline: 'Test subline [1].',
  author: 'Cameron Karri',
  updatedDate: '2026-10-08',
  answerBlock: { heading: 'Test answer.', paragraphs: ['Costs {{price:websites.range}} [2].'] },
  sections: [{ heading: 'Test section.', paragraphs: ['Text.'], pricing: ['websites', 'care'] }],
  faqs: [{ question: 'Test question?', answer: 'Test answer [1].' }],
  sources: [
    { n: 1, title: 'One', publisher: 'Pub', url: 'https://example.com/1' },
    { n: 2, title: 'Two', publisher: 'Pub', url: 'https://example.com/2' },
  ],
  relatedResources: [],
  siblingIndustries: [],
  illustration: { key: 'dual-control-car', alt: 'Test alt.' },
}

describe('copy tokens', () => {
  it('resolves prices from lib/pricing.ts and strips source markers from plain text', () => {
    expect(plainText('Costs {{price:websites.range}} [2].')).toBe(`Costs ${WEBSITES.range}.`)
    expect(citations('A [1] and [3].')).toEqual([1, 3])
  })

  it('throws on an unknown price token', () => {
    expect(() => segments('{{price:nope}}')).toThrow(/Unknown price token/)
  })
})

describe('checkIndustry', () => {
  it('passes a valid entry', () => {
    expect(checkIndustry(fixture)).toEqual([])
  })

  it('catches a marker with no source, long dashes, the banned phrase and an undotted title', () => {
    const bad: Industry = {
      ...fixture,
      subline: 'Cites [9].',
      h1: 'Long \u2014 dash',
      metaDescription: `In ${['plain', 'English'].join(' ')}.`, // built so the repo stays free of the phrase
      sections: [{ heading: 'No full stop', paragraphs: [] }],
    }
    const problems = checkIndustry(bad).join('\n')
    expect(problems).toMatch(/cites \[9\]/)
    expect(problems).toMatch(/long dash/)
    expect(problems).toMatch(/phrase the brand bans/)
    expect(problems).toMatch(/should end with a full stop/)
  })

  it('every real entry passes', () => {
    for (const entry of INDUSTRIES) expect(checkIndustry(entry)).toEqual([])
  })
})

describe('industry JSON-LD', () => {
  const blocks = checkedJsonLd(industryJsonLd(fixture))

  it('has Service, FAQPage and BreadcrumbList that parse', () => {
    expect(blocks.map(b => b['@type'])).toEqual(['Service', 'FAQPage', 'BreadcrumbList'])
    for (const b of blocks) expect(JSON.parse(JSON.stringify(b))).toEqual(b)
  })

  it('names Masuyo as provider, serves the United Kingdom and prices from lib/pricing.ts', () => {
    const service = blocks[0] as Record<string, any>
    expect(service.provider).toEqual({ '@type': 'Organization', name: 'Masuyo Digital', url: 'https://masuyodigital.com' })
    expect(service.areaServed.name).toBe('United Kingdom')
    const offers = service.offers as Record<string, any>[]
    expect(offers[0].priceSpecification).toMatchObject({ minPrice: WEBSITES.from, maxPrice: WEBSITES.to })
    expect(offers.map(o => o.price).filter(Boolean)).toEqual([CARE_PLANS.care.monthly, CARE_PLANS.carePlus.monthly])
  })

  it('strips source markers from FAQ answers', () => {
    const faq = blocks[1] as Record<string, any>
    expect(faq.mainEntity[0].acceptedAnswer.text).toBe('Test answer.')
  })

  it('rejects a block without a type', () => {
    expect(() => checkedJsonLd({ '@context': 'https://schema.org' })).toThrow()
  })
})
