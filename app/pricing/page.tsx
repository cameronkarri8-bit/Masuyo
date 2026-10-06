import type { Metadata } from 'next'
import ClosingBand from '@/components/site/ClosingBand'
import Estimator from '@/components/site/Estimator'
import FaqSection from '@/components/site/FaqSection'
import PageHero from '@/components/site/PageHero'
import SectionHeader from '@/components/site/SectionHeader'
import Steps from '@/components/site/Steps'
import Card from '@/components/ui/Card'
import Section from '@/components/ui/Section'
import TextLink from '@/components/ui/TextLink'
import { pageMetadata } from '@/lib/metadata'
import { careBothText, PAYMENT, SYSTEMS, WEBSITES } from '@/lib/pricing'

export const metadata: Metadata = pageMetadata({
  title: 'Pricing | Masuyo',
  description:
    'Typical prices for websites, custom systems and ongoing care. Every project is scoped and fixed in price before work begins.',
  path: '/pricing',
})

const CARDS = [
  {
    name: 'Websites',
    price: WEBSITES.range,
    body: 'A fast, connected website with bookings, quotes or a shop. Simpler sites sit at the lower end.',
    link: 'About websites',
    href: '/websites',
  },
  {
    name: 'Systems',
    price: SYSTEMS.fromText,
    body: 'A custom CRM, portal or automation, built in stages. Most start with one stage and grow.',
    link: 'About systems',
    href: '/systems',
  },
  {
    name: 'Care',
    price: careBothText,
    body: 'Hosting, security, updates and improvements. Included with every build from launch.',
    link: 'Compare Care plans',
    href: '/care#plans',
  },
]

const MOVES = [
  { title: 'Size.', body: 'How many pages, features or user types the project needs.' },
  { title: 'Connections.', body: 'How many other tools it has to talk to, such as your accounts, calendar or supplier.' },
  { title: 'Content.', body: 'Whether we write the words and source the images, or you supply them.' },
  { title: 'Data.', body: 'How much needs moving across from spreadsheets or old systems.' },
  { title: 'Timing.', body: 'A fixed deadline that needs work prioritised can add to the cost.' },
]

const PAYING = [
  { title: 'A fixed price, agreed in writing before we start.' },
  { title: PAYMENT.split },
  { title: PAYMENT.careBilling },
]

const FAQS = [
  {
    question: "Why don't you just list one price?",
    answer: 'Because a five page site and a shop with live stock are different jobs. A range is more honest than a starting price nobody actually pays.',
  },
  {
    question: 'What if the scope changes?',
    answer: 'We tell you the cost before doing any extra work, and nothing is added without your agreement.',
  },
  { question: 'Do you offer payment in stages?', answer: 'Yes. Larger projects are split into phases, each paid separately.' },
  {
    question: 'Is Care required?',
    answer: 'Every build launches with Care, because an unattended site or system is a risk to you and to us. You can change plan later.',
  },
]

export default function PricingPage() {
  return (
    <>
      <PageHero
        centred
        eyebrow="Pricing"
        title="Clear prices, agreed before we start."
        body="Every project is scoped and fixed in price before any work begins. Here is what most projects cost, and what moves the number."
      />

      <Section labelledBy="typical-title">
        <SectionHeader id="typical-title" title="What most projects cost." />
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {CARDS.map(card => (
            <Card as="li" key={card.name} className="flex flex-col p-7 sm:p-8">
              <h3 className="text-subhead text-deep">{card.name}</h3>
              <p className="mt-3 text-title text-petrol">{card.price}</p>
              <p className="mt-3 flex-1 text-body text-steel">{card.body}</p>
              <div className="mt-6">
                <TextLink href={card.href}>{card.link}</TextLink>
              </div>
            </Card>
          ))}
        </ul>
        <p className="mt-8 text-body font-semibold text-deep">
          Masuyo is not VAT registered, so the price you see is the price you pay.
        </p>
      </Section>

      <Section ground="paper" labelledBy="moves-title">
        <SectionHeader id="moves-title" title="What moves the number." />
        <dl className="mt-10 grid gap-x-12 gap-y-7 md:grid-cols-2">
          {MOVES.map(m => (
            <div key={m.title}>
              <dt className="text-subhead text-deep">{m.title}</dt>
              <dd className="mt-1 text-body text-steel">{m.body}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="estimator" labelledBy="estimator-title">
        <SectionHeader
          id="estimator-title"
          title="Get a rough website price in a minute."
          intro="No email needed. You will see a range, not a quote."
        />
        <div className="mt-10">
          <Estimator />
        </div>
      </Section>

      <Section ground="paper" labelledBy="paying-title">
        <SectionHeader id="paying-title" title="How paying works." />
        <div className="mt-14">
          <Steps steps={PAYING} columns={3} />
        </div>
      </Section>

      <FaqSection items={FAQS} />

      <ClosingBand />
    </>
  )
}
