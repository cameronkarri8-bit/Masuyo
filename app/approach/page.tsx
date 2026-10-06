import type { Metadata } from 'next'
import AtTheDesk from '@/components/brand/illustrations/AtTheDesk'
import RegionMap from '@/components/diagrams/RegionMap'
import ClosingBand from '@/components/site/ClosingBand'
import PageHero from '@/components/site/PageHero'
import SectionHeader from '@/components/site/SectionHeader'
import Container from '@/components/ui/Container'
import Highlighter from '@/components/ui/Highlighter'
import Section from '@/components/ui/Section'
import SectionTitle, { Dot } from '@/components/ui/SectionTitle'
import Tag from '@/components/ui/Tag'
import { pageMetadata } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata({
  title: 'Our approach | Masuyo',
  description:
    'How Masuyo works: one senior engineer from first call to launch, short visible stages, honest advice and full ownership of everything we build.',
  path: '/approach',
})

const PRINCIPLES = [
  {
    title: 'Process before pixels.',
    body: 'We look at how work moves through your business before we design a single screen. Most problems are workflow problems wearing a website costume.',
  },
  {
    title: 'Small, visible steps.',
    body: 'You see progress early and often, and you can change direction before it gets expensive.',
  },
  {
    title: 'Straight advice.',
    body: "If you don't need a custom build, we will say so and point you to something that already exists.",
  },
  {
    title: 'Yours to keep.',
    body: 'Code, data, domains and logins belong to you. Nothing is rented back.',
  },
]

const STACK = ['Next.js', 'TypeScript', 'headless CMS', 'modern databases', 'AI models', 'managed hosting']

export default function ApproachPage() {
  return (
    <>
      <PageHero
        eyebrow="Approach"
        title="Fix the process first. Then build the technology."
        body="Masuyo is a small technology company in Lancashire. We build websites, systems and automation for businesses that run on jobs, quotes, bookings and stock, and we stay on to look after them."
        visual={<AtTheDesk tone="dark" className="h-auto w-full" title="A drawing of a desk with a laptop showing the Masuyo website, a plant and a mug." />}
      />

      <Section labelledBy="who-title">
        <Container narrow className="!px-0">
          <SectionTitle id="who-title">Who you&apos;ll work with.</SectionTitle>
          <div className="mt-8 space-y-5 text-lead text-deep">
            <p>
              I&apos;m Cameron, and I founded Masuyo. I&apos;ve spent years in digital marketing and web development,
              building websites, CRMs and tools for businesses in the UK and the US.
            </p>
            <p>
              I started Masuyo because too many small businesses were paying for technology that didn&apos;t fit them:
              websites that looked fine but brought in nothing, and software built for companies ten times their size.
            </p>
            <p>
              When you work with Masuyo, you work with me, from the first conversation to launch and after. When a
              project needs a specialist, such as a designer or a security expert, I bring in people I trust and stay
              responsible for the result.
            </p>
          </div>
          <blockquote className="mt-12 border-l-4 border-petrol pl-6">
            <p className="text-title text-petrol">
              The best technology is the kind your team stops noticing, because it just works.
            </p>
          </blockquote>
        </Container>
      </Section>

      <Section ground="paper" labelledBy="think-title">
        <SectionHeader id="think-title" title="How we think." />
        <ol className="mt-12 grid gap-5 md:grid-cols-2">
          {PRINCIPLES.map((p, i) => (
            <li key={p.title} className="rounded-card bg-mist p-7 sm:p-8">
              <span aria-hidden="true" className="text-title text-petrol">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 text-subhead text-deep">
                {p.title.slice(0, -1)}
                <Dot />
              </h3>
              <p className="mt-2 text-body text-steel">{p.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section ground="petrol" labelledBy="where-title">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionTitle id="where-title" dark>
              Local when it helps. Remote when it doesn&apos;t.
            </SectionTitle>
            <p className="mt-5 max-w-measure text-lead text-mist">
              We are based near Preston and work in person with businesses across Lancashire and the North West. It is
              often quicker to understand a business by standing in it for an hour. For everyone else, video calls and a
              shared project space work just as well.
            </p>
          </div>
          <RegionMap className="mx-auto h-auto w-full max-w-md" />
        </div>
      </Section>

      <Section ground="paper" spacing="tight" labelledBy="with-title">
        <h2 id="with-title" className="max-w-2xl text-lead text-deep">
          Modern, widely supported technology, chosen so your project is easy to maintain for years.
        </h2>
        <ul className="mt-6 flex flex-wrap gap-3">
          {STACK.map(item => (
            <li key={item}>
              <Tag>{item}</Tag>
            </li>
          ))}
        </ul>
      </Section>

      {/* The page closes on the tagline, set as the guide's cover sets it. */}
      <Section spacing="tight" labelledBy="tagline">
        <p id="tagline" className="text-display text-deep">
          <span className="whitespace-nowrap">Measured twice.</span>{' '}
          <span className="whitespace-nowrap">
            Shipped <Highlighter>once.</Highlighter>
          </span>
        </p>
      </Section>

      <ClosingBand />
    </>
  )
}
