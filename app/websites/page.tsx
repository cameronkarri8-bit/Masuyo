import type { Metadata } from 'next'
import BookingFlow from '@/components/diagrams/BookingFlow'
import IconFlow from '@/components/diagrams/IconFlow'
import TimelineBar from '@/components/diagrams/TimelineBar'
import ClosingBand from '@/components/site/ClosingBand'
import FaqSection from '@/components/site/FaqSection'
import PageHero from '@/components/site/PageHero'
import PriceLine from '@/components/site/PriceLine'
import SectionHeader from '@/components/site/SectionHeader'
import WebsiteTiles from '@/components/site/WebsiteTiles'
import { ButtonLink } from '@/components/ui/Button'
import Checklist from '@/components/ui/Checklist'
import Section from '@/components/ui/Section'
import SectionTitle, { Dot } from '@/components/ui/SectionTitle'
import TextLink from '@/components/ui/TextLink'
import { WEBSITE_INCLUDES } from '@/lib/content/websites'
import { pageMetadata } from '@/lib/metadata'
import { careFromText, TIMELINES, WEBSITES } from '@/lib/pricing'

export const metadata: Metadata = pageMetadata({
  title: 'Websites that win work | Masuyo',
  description:
    'Fast, clear websites for growing businesses, built around bookings, quotes and sales, and connected to the way you handle them.',
  path: '/websites',
})

const DIFFERENT = [
  {
    title: 'Built around one action.',
    body: 'Every page leads to the thing that brings you money: a booking, a quote request, an order or a call. Nothing on the page competes with it.',
  },
  {
    title: 'Connected from day one.',
    body: 'Enquiries go into your CRM, calendar or inbox with the details already sorted. Nobody retypes anything.',
  },
  {
    title: 'Fast on a phone.',
    body: 'Built phone first, because that is where people look you up between jobs. Pages load quickly, even on a weak signal.',
  },
]

const ENQUIRY = [
  { icon: 'seo' as const, title: 'Found', body: 'They search Google and find a page that answers their question.' },
  { icon: 'support' as const, title: 'Convinced', body: 'Clear pricing, real work and reviews give them a reason to act.' },
  { icon: 'bookings' as const, title: 'Booked', body: 'They book, order or ask for a quote in under a minute.' },
  { icon: 'crm' as const, title: 'Sorted', body: 'The details land in your system and you get a notification.' },
  { icon: 'enquiries' as const, title: 'Confirmed', body: 'The customer gets an instant confirmation, so they stop shopping around.' },
]

const FAQS = [
  {
    question: 'Can you redesign my existing site?',
    answer: 'Yes. We keep what works, such as your best pages and anything Google already ranks, and rebuild the rest on a faster base.',
  },
  {
    question: 'Do I need to write the words and supply photos?',
    answer: 'You can, or we can write them with you. Most clients send rough notes and we shape them into clear copy.',
  },
  {
    question: 'Will it show up on Google?',
    answer: 'Every site launches with the technical foundations search engines need. Ranking for competitive terms takes ongoing work, which is part of Care.',
  },
  {
    question: 'Can I edit it myself?',
    answer: 'Yes. Text, photos, prices and posts are editable through a simple dashboard. Bigger changes are part of Care.',
  },
  {
    question: 'What is it built on?',
    answer: 'Modern web technology rather than WordPress. In plain terms: faster pages, fewer security updates and nothing to break when a plugin changes.',
  },
  {
    question: 'Do I own it?',
    answer: 'Yes. The code, the domain, the content and the data are yours from day one.',
  },
  // The next two moved here from the old FAQ page, which Resources replaced.
  {
    question: 'Do you use templates or build from scratch?',
    answer:
      'We build from scratch using modern frameworks. We do not use page builders or cookie-cutter templates. This gives you a faster, more flexible site that is designed around your specific business rather than a generic layout.',
  },
  {
    question: 'Do I get to review the work before it goes live?',
    answer: 'Yes, always. We share the site for your review before launch.',
  },
]

export default function WebsitesPage() {
  return (
    <>
      <PageHero
        eyebrow="Websites"
        title="A website that brings in work, not just visitors."
        body="We design and build fast, clear websites for businesses where enquiries, bookings and sales matter. Every form, booking and order goes straight to where you deal with it."
        actions={
          <>
            <ButtonLink href="/start" dark>
              Start a project
            </ButtonLink>
            <TextLink href="/pricing" dark>
              See pricing
            </TextLink>
          </>
        }
        visual={<BookingFlow className="mx-auto h-auto w-full max-w-lg" />}
      />

      <Section labelledBy="different-title">
        <SectionHeader id="different-title" title="Most websites are brochures. Ours are built to do something." />
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {DIFFERENT.map(item => (
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

      <Section ground="paper" labelledBy="build-title">
        <SectionHeader id="build-title" title="What we build." />
        <div className="mt-12">
          <WebsiteTiles onPaper />
        </div>
      </Section>

      <Section labelledBy="enquiry-title">
        <SectionHeader id="enquiry-title" title="What happens when someone gets in touch." />
        <div className="mt-14">
          <IconFlow steps={ENQUIRY} highlight={3} />
        </div>
      </Section>

      <Section ground="paper" labelledBy="included-title">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
          <SectionTitle id="included-title">Included in every website.</SectionTitle>
          <Checklist items={WEBSITE_INCLUDES} columns={2} />
        </div>
      </Section>

      <Section ground="petrol" labelledBy="timeline-title">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
          <div>
            <SectionTitle id="timeline-title" dark>
              From first call to live.
            </SectionTitle>
            <p className="mt-5 max-w-measure text-body text-mist">
              Most websites go live in {TIMELINES.websiteLive}, depending on size and how quickly the words and photos are
              ready. Bigger sites can launch in stages, with the most important pages live first.
            </p>
          </div>
          <TimelineBar />
        </div>
      </Section>

      <PriceLine>
        Most websites cost between {WEBSITES.range}, with Care from {careFromText}.
      </PriceLine>

      <FaqSection items={FAQS} />

      <ClosingBand />
    </>
  )
}
