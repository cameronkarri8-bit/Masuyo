import type { Metadata } from 'next'
import ClosingBand from '@/components/site/ClosingBand'
import Estimator from '@/components/site/Estimator'
import FaqSection from '@/components/site/FaqSection'
import PageHero from '@/components/site/PageHero'
import PricingCards from '@/components/site/PricingCards'
import SectionHeader from '@/components/site/SectionHeader'
import Steps from '@/components/site/Steps'
import Section from '@/components/ui/Section'
import { pageMetadata } from '@/lib/metadata'
import { PAYMENT } from '@/lib/pricing'

export const metadata: Metadata = pageMetadata({
  title: 'Pricing | Masuyo',
  description:
    'Typical prices for websites, custom systems and ongoing care. Every project is scoped and fixed in price before work begins.',
  path: '/pricing',
})

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
        <PricingCards />
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
