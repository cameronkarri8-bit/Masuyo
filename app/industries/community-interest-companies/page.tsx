import type { Metadata } from 'next'
import CornerShop from '@/components/brand/illustrations/CornerShop'
import PenMark from '@/components/brand/PenMark'
import ResourceCard from '@/components/resources/ResourceCard'
import PageHero from '@/components/site/PageHero'
import SectionHeader from '@/components/site/SectionHeader'
import { ButtonLink } from '@/components/ui/Button'
import Checklist from '@/components/ui/Checklist'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import { pageMetadata } from '@/lib/metadata'
import { getResource } from '@/lib/resources'
import { BOOKING_URL } from '@/lib/site'

/*
  Kept from the previous site and restyled to the new brand, with its words
  unchanged. Out of the navigation and the footer pending a decision on it.
*/

export const metadata: Metadata = pageMetadata({
  title: 'CIC website design | Websites for community interest companies | Masuyo',
  description:
    'Website design for community interest companies. Built to evidence your impact for funders and commissioners, accessible to WCAG 2.2 AA, and costable into a funding bid. From £1,750.',
  path: '/industries/community-interest-companies',
})

/* Office of the Regulator of Community Interest Companies, Annual Report 2024 to 2025. */
const STATS = [
  { value: '37,081', label: 'CICs on the register' },
  { value: '8,376', label: 'registered last year, a record' },
  { value: '3,832', label: 'dissolved in the same year' },
  { value: '22%', label: 'of the 2005 cohort still going' },
]

const TRUST = ['WCAG 2.2 AA as standard', 'Costable into a funding bid', 'Your team can update it']

const GUIDES = [
  { slug: 'website-design-for-cics', description: 'What a CIC site must do differently, how to fund it, and what it should cost.' },
  { slug: 'website-cost-uk', description: 'Market context for how our fixed CIC packages compare with what else is out there.' },
]

export default function CommunityInterestCompaniesPage() {
  const guides = GUIDES.map(g => {
    const r = getResource(g.slug)
    return r ? { slug: r.slug, title: r.title, description: g.description, category: r.category, readingTime: r.readingTime } : null
  }).filter(Boolean) as { slug: string; title: string; description: string; category: string; readingTime: number }[]

  return (
    <>
      <PageHero
        eyebrow="Masuyo for community interest companies"
        title={
          <>
            Website design for{' '}
            <span className="relative inline-block">
              community interest companies
              <PenMark type="underline" tone="aqua" className="absolute -bottom-3 left-0 h-3 w-full" />
            </span>
          </>
        }
        body={
          <>
            <p className="text-paper">&ldquo;We do good work in the community&rdquo; is not evidence. Your website can be.</p>
            <p className="mt-4">Built for the way CICs actually earn. Grants, contracts and traded income. Not donation buttons.</p>
          </>
        }
        actions={
          BOOKING_URL ? (
            <ButtonLink href={BOOKING_URL} dark>
              Book a 20 minute call
            </ButtonLink>
          ) : (
            <ButtonLink href="/start" dark>
              Start a project
            </ButtonLink>
          )
        }
        visual={
          <div>
            <CornerShop tone="dark" className="h-auto w-full" />
            <div className="mt-6 max-w-xs rounded-card bg-paper/[0.06] p-5 ring-1 ring-inset ring-paper/15">
              <p className="text-small text-mist">On the register</p>
              <p className="mt-1 text-heading text-paper">37,081</p>
              <p className="mt-1 text-small text-mist">community interest companies in the UK, up 12% in a year</p>
            </div>
          </div>
        }
      >
        <Checklist items={TRUST} dark className="mt-8" />
      </PageHero>

      <Section labelledBy="cic-guides">
        <SectionHeader id="cic-guides" title="Guides for CICs." />
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {guides.map(g => (
            <li key={g.slug}>
              <ResourceCard r={g} />
            </li>
          ))}
        </ul>
      </Section>

      <section aria-labelledby="cic-stats" className="ground-dark bg-petrol py-20 text-paper sm:py-24">
        <Container>
          <h2 id="cic-stats" className="max-w-3xl text-title text-paper">
            The sector has never grown faster. It has also never closed faster. Both records were set in the same twelve
            months.
          </h2>
          <dl className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map(s => (
              <div key={s.label} className="flex flex-col-reverse border-t-2 border-aqua pt-4">
                <dt className="mt-2 text-body text-mist">{s.label}</dt>
                <dd className="text-heading text-paper">{s.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-10 text-small text-mist">
            Office of the Regulator of Community Interest Companies, Annual Report 2024 to 2025
          </p>
        </Container>
      </section>
    </>
  )
}
