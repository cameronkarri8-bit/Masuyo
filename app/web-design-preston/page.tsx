import type { Metadata } from 'next'
import RegionMap from '@/components/diagrams/RegionMap'
import ClosingBand from '@/components/site/ClosingBand'
import FaqSection from '@/components/site/FaqSection'
import PageHero from '@/components/site/PageHero'
import SectionHeader from '@/components/site/SectionHeader'
import WebsiteTiles from '@/components/site/WebsiteTiles'
import { ButtonLink } from '@/components/ui/Button'
import Checklist from '@/components/ui/Checklist'
import Section from '@/components/ui/Section'
import SectionTitle, { Dot } from '@/components/ui/SectionTitle'
import { WEBSITE_INCLUDES } from '@/lib/content/websites'
import { pageMetadata } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata({
  title: 'Web design in Preston | Websites that bring in work | Masuyo',
  description:
    'Websites and systems for Preston businesses, built just down the road in Leyland. Meet in person, fixed prices, and support from the person who built it.',
  path: '/web-design-preston',
})

const LOCAL = [
  { title: 'Meet in person.', body: 'An hour in your premises tells us more than a week of emails.' },
  { title: 'Same person throughout.', body: 'The person you meet is the person who builds and looks after the site.' },
  { title: 'Know the area.', body: 'We understand who your customers are and how they search locally.' },
]

const FAQS = [
  {
    question: 'Can we meet in person?',
    answer: 'Yes. For businesses in and around Preston, the first meeting is usually at your premises.',
  },
  {
    question: 'Do you only work with Preston businesses?',
    answer: 'No, but local businesses get the benefit of meeting face to face.',
  },
  {
    question: 'Can you help us show up in local searches?',
    answer: 'Yes. Every site launches with local search foundations, and ongoing local SEO is part of Care Plus.',
  },
]

export default function WebDesignPrestonPage() {
  return (
    <>
      <PageHero
        eyebrow="Web design in Preston"
        title="Websites for Preston businesses, built just down the road."
        body="We design and build fast, connected websites for businesses across Preston and Central Lancashire. Based in Leyland, so we can sit down with you, see how the business works and build around it."
        actions={
          <ButtonLink href="/start" dark>
            Start a project
          </ButtonLink>
        }
        visual={<RegionMap view="local" className="mx-auto h-auto w-full max-w-md" />}
      />

      <Section labelledBy="local-title">
        <SectionHeader id="local-title" title="Why local helps." />
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {LOCAL.map(item => (
            <div key={item.title}>
              <h3 className="text-subhead text-deep">
                {item.title.slice(0, -1)}
                <Dot />
              </h3>
              <p className="mt-2 text-body text-steel">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section ground="paper" spacing="tight" labelledBy="areas-title">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
          <SectionTitle id="areas-title">Areas we cover.</SectionTitle>
          <p className="text-lead text-deep">
            Preston, Leyland, Chorley, Buckshaw Village, Penwortham, Bamber Bridge and the rest of Central Lancashire.
            Further afield by video call.
          </p>
        </div>
      </Section>

      <Section labelledBy="preston-build-title">
        <SectionHeader id="preston-build-title" title="What we build." />
        <div className="mt-12">
          <WebsiteTiles />
        </div>
      </Section>

      <Section ground="paper" labelledBy="preston-included-title">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
          <SectionTitle id="preston-included-title">Included in every website.</SectionTitle>
          <Checklist items={WEBSITE_INCLUDES} columns={2} />
        </div>
      </Section>

      <FaqSection items={FAQS} />
      <ClosingBand />
    </>
  )
}
