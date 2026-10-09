import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/industries/Breadcrumbs'
import ClosingBand from '@/components/site/ClosingBand'
import JsonLd from '@/components/site/JsonLd'
import PageHero from '@/components/site/PageHero'
import Section from '@/components/ui/Section'
import { withDot } from '@/components/ui/SectionTitle'
import { getPublishedIndustries, HUB_CRUMBS, industryPath } from '@/lib/industries'
import { breadcrumbJsonLd, checkedJsonLd } from '@/lib/industries/schema'
import { plainText } from '@/lib/industries/text'
import { pageMetadata } from '@/lib/metadata'
import { SITE } from '@/lib/site'

/**
 * The industry hub: one card per published industry page, generated from the
 * data files. Linked from the footer, not the main navigation.
 *
 * If no industry page were published there would be nothing to list, so the
 * hub would answer 404 rather than show an empty page.
 */

export const metadata: Metadata = {
  ...pageMetadata({ title: 'Who we build for | Masuyo', description: SITE.oneLiner, path: '/industries' }),
  robots: { index: true, follow: true },
}


export default function IndustriesHub() {
  const industries = getPublishedIndustries()
  if (industries.length === 0) notFound()

  return (
    <>
      <PageHero breadcrumbs={<Breadcrumbs items={HUB_CRUMBS} dark />} title={withDot('Who we build for.')} body={SITE.oneLiner} />

      <Section>
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {industries.map(i => (
            <li key={i.slug}>
              <Link
                href={industryPath(i.slug)}
                className="group flex h-full flex-col rounded-card bg-paper p-6 transition-transform duration-200 ease-brand hover:-translate-y-1 sm:p-7"
              >
                <h2 className="text-title text-deep underline decoration-transparent decoration-2 underline-offset-[5px] transition-colors group-hover:decoration-petrol">
                  {i.label}
                </h2>
                <p className="mt-3 flex-1 text-body text-steel">{plainText(i.cardSummary ?? i.metaDescription)}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <ClosingBand />

      <JsonLd data={checkedJsonLd(breadcrumbJsonLd(HUB_CRUMBS))} />
    </>
  )
}
