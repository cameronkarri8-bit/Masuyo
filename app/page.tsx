import type { Metadata } from 'next'
import Link from 'next/link'
import Icon from '@/components/brand/Icon'
import BeforeAfter from '@/components/diagrams/BeforeAfter'
import EnquiryJourney from '@/components/diagrams/EnquiryJourney'
import { BrowserSketch, NodesSketch, StepsSketch } from '@/components/diagrams/OfferSketches'
import PipelineBoard from '@/components/diagrams/PipelineBoard'
import ClosingBand from '@/components/site/ClosingBand'
import PageHero from '@/components/site/PageHero'
import SectionHeader from '@/components/site/SectionHeader'
import Steps from '@/components/site/Steps'
import { ButtonLink } from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Eyebrow from '@/components/ui/Eyebrow'
import Highlighter from '@/components/ui/Highlighter'
import Rise from '@/components/ui/Rise'
import Section from '@/components/ui/Section'
import SectionTitle, { Dot } from '@/components/ui/SectionTitle'
import TextLink from '@/components/ui/TextLink'
import { pageMetadata } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata({
  title: 'Masuyo | Websites, systems and automation for growing businesses',
  description:
    'We build the websites, custom systems and automation that growing UK businesses run on. Designed, built and looked after by one senior engineer.',
  path: '/',
})

const PROBLEMS = [
  {
    icon: 'enquiries' as const,
    title: 'Enquiries get lost.',
    body: 'They arrive by email, phone, Facebook and the contact form. Some get answered. Some get forgotten.',
  },
  {
    icon: 'spreadsheet' as const,
    title: 'The admin lives in spreadsheets.',
    body: 'Quotes, jobs and stock are tracked by hand, and only one person knows where everything is.',
  },
  {
    icon: 'puzzle' as const,
    title: "The software doesn't fit.",
    body: "You pay monthly for big tools you use a fraction of, and they still don't match how you work.",
  },
]

const OFFERS = [
  {
    number: '01',
    label: 'Websites',
    title: 'Websites that win work.',
    body: 'Fast, clear sites that turn visitors into enquiries, bookings and sales. Every form lands where you handle it, not in a forgotten inbox.',
    link: 'Explore websites',
    href: '/websites',
    Sketch: BrowserSketch,
  },
  {
    number: '02',
    label: 'Systems',
    title: 'Systems that run the day.',
    body: "Custom CRMs, client portals and automation built around how you already work. Fewer spreadsheets, less copy and paste, no more tools you've outgrown.",
    link: 'Explore systems',
    href: '/systems',
    Sketch: NodesSketch,
  },
  {
    number: '03',
    label: 'Care',
    title: 'Care that keeps it improving.',
    body: 'Hosting, security, updates and steady improvements. What we build keeps getting better instead of getting older.',
    link: 'How Care works',
    href: '/care',
    Sketch: StepsSketch,
  },
]

const STEPS = [
  {
    title: 'Map it.',
    body: 'We start with how the business runs today: where work comes in, where it gets stuck, and what to fix first.',
  },
  {
    title: 'Build it.',
    body: 'Work happens in short stages you can see and click through. Nobody disappears for two months.',
  },
  {
    title: 'Launch it.',
    body: 'We move your data across, train your team and stay close for the first few weeks.',
  },
  {
    title: 'Improve it.',
    body: 'Care keeps everything secure and current, and we keep making it better as the business grows.',
  },
]

const UNDER_THE_HOOD = [
  { label: 'Stack', value: 'Next.js · headless CMS · modern databases' },
  { label: 'Hosting', value: 'Managed on our own servers' },
  { label: 'Security', value: 'SSL, daily backups, uptime monitoring' },
  { label: 'Ownership', value: 'Your code, your data, your accounts' },
]

export default function HomePage() {
  return (
    <>
      <PageHero
        eyebrow="Websites · Systems · Automation"
        title={
          <>
            We build the technology your business <Highlighter>runs</Highlighter> on
            <Dot />
          </>
        }
        body="Websites, custom systems and automation for growing businesses that have outgrown spreadsheets and off the shelf tools. Designed, built and looked after by one senior engineer."
        actions={
          <>
            <ButtonLink href="/start" dark>
              Start a project
            </ButtonLink>
            <ButtonLink href="/work" dark variant="secondary">
              See our work
            </ButtonLink>
          </>
        }
        smallPrint="Based in Lancashire. Replies within one working day."
        visual={<EnquiryJourney className="h-auto w-full" />}
      />

      {/* The problem */}
      <Section labelledBy="problem-title">
        <SectionHeader
          id="problem-title"
          eyebrow="Sound familiar?"
          title="Most businesses don't have a website problem. They have a systems problem."
          centred
        />
        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {PROBLEMS.map((p, i) => (
            <Rise as="li" key={p.title} delay={i as 0 | 1 | 2}>
              <Card className="h-full p-7 sm:p-8">
                <Icon name={p.icon} size={56} />
                <h3 className="mt-6 text-subhead text-deep">{p.title}</h3>
                <p className="mt-2 text-body text-steel">{p.body}</p>
              </Card>
            </Rise>
          ))}
        </ul>
        <p className="mx-auto mt-12 max-w-2xl text-center text-subhead text-petrol">
          We fix the gaps between the front door and the back office.
        </p>
      </Section>

      {/* Three ways we help */}
      <Section ground="paper" labelledBy="offers-title">
        <SectionHeader id="offers-title" title="Three ways we help." />
        <ul className="scroll-row -mx-5 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
          {OFFERS.map(offer => (
            <li key={offer.href} className="w-[82%] shrink-0 snap-start md:w-auto">
              <Link
                href={offer.href}
                className="group flex h-full flex-col rounded-card bg-mist p-7 transition-transform duration-200 ease-brand hover:-translate-y-1 sm:p-8"
              >
                <offer.Sketch className="h-24 w-auto self-start" />
                <p className="mt-6 text-small text-steel">
                  <span className="font-extrabold text-petrol">{offer.number}</span> {offer.label}
                </p>
                <h3 className="mt-2 text-title text-deep">
                  {offer.title.slice(0, -1)}
                  <Dot />
                </h3>
                <p className="mt-3 flex-1 text-body text-steel">{offer.body}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 font-semibold text-petrol underline decoration-petrol/40 decoration-2 underline-offset-[5px] group-hover:decoration-petrol">
                  {offer.link}
                  <svg viewBox="0 0 16 16" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" fill="none">
                    <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* Before and after */}
      <Section labelledBy="before-after-title">
        <SectionHeader
          id="before-after-title"
          title="One connected system instead of five disconnected ones."
          intro="Here is what that looks like for a typical service business."
        />
        <div className="mt-12">
          <BeforeAfter />
        </div>
      </Section>

      {/* Recent work: the in house fallback until a client project is approved */}
      <Section ground="deep" labelledBy="recent-work-title">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-16">
          <Rise>
            <PipelineBoard tone="dark" className="h-auto w-full" />
          </Rise>
          <div>
            <Eyebrow dark>Built in house</Eyebrow>
            <SectionTitle id="recent-work-title" dark className="mt-3">
              The system we run Masuyo on.
            </SectionTitle>
            <p className="mt-5 max-w-measure text-lead text-mist">
              Outreach, active contracts, invoices and a client portal, all in one CRM we designed and built for ourselves.
            </p>
          </div>
        </div>
      </Section>

      {/* How a project runs */}
      <Section labelledBy="how-title">
        <SectionHeader id="how-title" title="How a project runs." />
        <div className="mt-14">
          <Steps steps={STEPS} />
        </div>
        <div className="mt-14 flex flex-col gap-5 border-t border-petrol/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-subhead text-deep">
            You work directly with the engineer building it, from the first call to launch and after.
          </p>
          <TextLink href="/approach">More on our approach</TextLink>
        </div>
      </Section>

      {/* Under the hood */}
      <Section ground="paper" spacing="tight" labelledBy="hood-title">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionTitle id="hood-title">Built to last. Yours to keep.</SectionTitle>
            <p className="mt-5 max-w-measure text-body text-steel">
              Everything is built on modern, widely used technology, so it is fast today and easy to maintain later. You
              own the code, the data and the logins from day one.
            </p>
          </div>
          <dl className="divide-y divide-petrol/15 border-y border-petrol/15">
            {UNDER_THE_HOOD.map(row => (
              <div key={row.label} className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr] sm:gap-6">
                <dt className="text-small text-steel">{row.label}</dt>
                <dd className="text-body font-semibold text-deep">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <ClosingBand />
    </>
  )
}
