import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import AnswerBlock from '@/components/industries/AnswerBlock'
import Breadcrumbs from '@/components/industries/Breadcrumbs'
import ContentSection from '@/components/industries/ContentSection'
import FurtherReading from '@/components/industries/FurtherReading'
import IndustryIllustration from '@/components/industries/IndustryIllustration'
import IndustryFaqs from '@/components/industries/IndustryFaqs'
import RichText from '@/components/industries/RichText'
import SourcesList from '@/components/industries/SourcesList'
import ClosingBand from '@/components/site/ClosingBand'
import JsonLd from '@/components/site/JsonLd'
import PageHero from '@/components/site/PageHero'
import { ButtonLink } from '@/components/ui/Button'
import { formatIndustryDate, getIndustry, getPublishedIndustries, industryPath } from '@/lib/industries'
import { checkedJsonLd, industryJsonLd } from '@/lib/industries/schema'
import { pageMetadata } from '@/lib/metadata'
import { getAllResources } from '@/lib/resources'
import { BOOKING_URL } from '@/lib/site'

/**
 * An industry landing page, built from its data file in content/industries.
 * Every word is in the server HTML. Not linked from the main navigation.
 */

export const dynamicParams = false

export function generateStaticParams() {
  return getPublishedIndustries().map(i => ({ slug: i.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const industry = getIndustry(params.slug)
  if (!industry) return {}
  return {
    ...pageMetadata({ title: industry.titleTag, description: industry.metaDescription, path: industryPath(industry.slug) }),
    robots: { index: true, follow: true },
  }
}

/** "Book a call" goes to the calendar once there is one, and to the start form until then. */
const BOOK_A_CALL = BOOKING_URL || '/start'

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const industry = getIndustry(params.slug)
  if (!industry) notFound()
  const { sources } = industry

  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Who we build for', href: '/industries' },
    { name: industry.label, href: industryPath(industry.slug) },
  ]

  // Grounds alternate down the page: sections, then the questions, then sources.
  const groundAt = (i: number) => (i % 2 === 0 ? 'mist' : 'paper') as 'mist' | 'paper'
  const faqIndex = industry.sections.length
  const sourcesGround = groundAt(industry.faqs.length > 0 ? faqIndex + 1 : faqIndex)

  const hasPricing = industry.sections.some(s => s.pricing)
  const resources = getAllResources().filter(r => industry.relatedResources.includes(r.slug))
  const siblings = getPublishedIndustries()
    .filter(i => industry.siblingIndustries.includes(i.slug))
    .map(i => ({ label: i.label, href: industryPath(i.slug) }))

  return (
    <>
      <PageHero
        breadcrumbs={<Breadcrumbs items={crumbs} dark />}
        eyebrow={industry.label}
        title={industry.h1}
        body={<RichText text={industry.subline} sources={sources} dark />}
        visual={<IndustryIllustration illustration={industry.illustration} />}
        actions={
          <>
            <ButtonLink href={BOOK_A_CALL} dark>
              Book a call
            </ButtonLink>
            <ButtonLink href={hasPricing ? '#pricing' : '/pricing'} variant="secondary" dark>
              See pricing
            </ButtonLink>
          </>
        }
        smallPrint={
          <>
            By {industry.author} · Updated <time dateTime={industry.updatedDate}>{formatIndustryDate(industry.updatedDate)}</time>
          </>
        }
      />

      <AnswerBlock heading={industry.answerBlock.heading} paragraphs={industry.answerBlock.paragraphs} sources={sources} />

      {industry.sections.map((section, i) => (
        <ContentSection key={section.heading} section={section} sources={sources} ground={groundAt(i)} />
      ))}

      {industry.faqs.length > 0 && (
        <IndustryFaqs
          faqs={industry.faqs}
          sources={sources}
          title={industry.faqHeading}
          ground={groundAt(faqIndex)}
        />
      )}

      <SourcesList sources={sources} ground={sourcesGround} />

      <ClosingBand
        penMark={false}
        action={{ label: 'Book a call', href: BOOK_A_CALL }}
        {...(industry.closing ? { title: industry.closing.heading, body: industry.closing.body } : {})}
      />

      <FurtherReading resources={resources} industries={siblings} />

      <JsonLd data={checkedJsonLd(industryJsonLd(industry))} />
    </>
  )
}
