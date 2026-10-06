import type { Metadata } from 'next'
import CareCycle from '@/components/diagrams/CareCycle'
import ClosingBand from '@/components/site/ClosingBand'
import FaqSection from '@/components/site/FaqSection'
import PageHero from '@/components/site/PageHero'
import SectionHeader from '@/components/site/SectionHeader'
import StatusPanel from '@/components/site/StatusPanel'
import { ButtonLink } from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Checklist from '@/components/ui/Checklist'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import SectionTitle from '@/components/ui/SectionTitle'
import Tag from '@/components/ui/Tag'
import TextLink from '@/components/ui/TextLink'
import { pageMetadata } from '@/lib/metadata'
import { CARE_PLANS, gbp, PAYMENT } from '@/lib/pricing'

export const metadata: Metadata = pageMetadata({
  title: 'Website and system care | Masuyo',
  description:
    'Hosting, security, updates and steady improvements for your website and systems. One monthly plan, someone who answers, no surprise invoices.',
  path: '/care',
})

const WHY = [
  { label: 'Security', body: 'Software needs regular updates. Left alone, a site becomes slower, less secure and harder to fix.' },
  { label: 'Search', body: 'Google rewards sites that are fast, current and well maintained. Neglect quietly costs you rankings.' },
  { label: 'Growth', body: 'Your business changes. Your website and systems should keep up without a rebuild every few years.' },
]

const CYCLE = [
  { title: 'Monitor', body: 'We watch uptime, speed and errors, and fix problems before you notice them.' },
  { title: 'Update', body: 'Software and security updates applied and tested.' },
  { title: 'Improve', body: 'Small changes, new content and fixes from your list.' },
  { title: 'Report', body: 'A short summary of what was done and what is next (Care Plus).' },
]

const FAQS = [
  { question: 'Is there a long contract?', answer: `No. ${PAYMENT.careTerm}` },
  {
    question: 'What counts as a small change?',
    answer: 'Updating text, swapping photos, adding a team member or a new service. Anything that needs new design or development is quoted first.',
  },
  { question: 'What if something breaks?', answer: 'Tell us and we fix it. Problems caused by updates or hosting are covered by the plan.' },
  { question: 'Can I change plans?', answer: 'Yes, up or down, from the next month.' },
]

function Price({ amount, dark = false }: { amount: number; dark?: boolean }) {
  return (
    <p className={`mt-4 ${dark ? 'text-paper' : 'text-deep'}`}>
      <span className="text-heading">{gbp(amount)}</span>{' '}
      <span className={`text-body ${dark ? 'text-mist' : 'text-steel'}`}>a month</span>
    </p>
  )
}

export default function CarePage() {
  const { care, carePlus, systemsCare } = CARE_PLANS
  return (
    <>
      <PageHero
        centred
        eyebrow="Care"
        title="Looked after, and getting better every month."
        body="Hosting, security, updates and steady improvements for everything we build. You get one monthly plan, a real person who answers, and no surprise invoices."
        actions={
          <>
            <ButtonLink href="/start?need=care" dark>
              Start a project
            </ButtonLink>
            <TextLink href="#plans" dark>
              Compare plans
            </TextLink>
          </>
        }
      >
        <StatusPanel />
      </PageHero>

      <Section labelledBy="why-title">
        <SectionHeader id="why-title" title="Websites and systems don't stay new on their own." />
        <dl className="mt-12 grid gap-10 md:grid-cols-3">
          {WHY.map(item => (
            <div key={item.label} className="border-t-2 border-petrol pt-4">
              <dt className="text-small text-steel">{item.label}</dt>
              <dd className="mt-2 text-body text-deep">{item.body}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="plans" ground="paper" labelledBy="plans-title">
        <SectionHeader id="plans-title" title="Choose a plan." />
        <ul className="mt-12 grid items-stretch gap-5 lg:grid-cols-[1fr_1fr_0.85fr]">
          <Card as="li" onPaper className="flex flex-col p-7 sm:p-8">
            <h3 className="text-title text-deep">{care.name}</h3>
            <Price amount={care.monthly} />
            <p className="mt-3 text-body text-steel">{care.summary}</p>
            <Checklist items={[...care.includes]} className="mt-6 flex-1" />
            <ButtonLink href="/start?need=care" variant="secondary" className="mt-8 self-start">
              Start a project
            </ButtonLink>
          </Card>

          <li className="ground-dark flex flex-col rounded-card bg-petrol p-7 text-paper sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-title text-paper">{carePlus.name}</h3>
              <Tag variant="filled" dark>
                {carePlus.label}
              </Tag>
            </div>
            <Price amount={carePlus.monthly} dark />
            <p className="mt-3 text-body text-mist">{carePlus.summary}</p>
            <Checklist items={[...carePlus.includes]} dark className="mt-6 flex-1" />
            <ButtonLink href="/start?need=care" dark className="mt-8 self-start">
              Start a project
            </ButtonLink>
          </li>

          <Card as="li" onPaper className="flex flex-col p-7 sm:p-8">
            <h3 className="text-title text-deep">{systemsCare.name}</h3>
            <p className="mt-4 text-subhead text-deep">{systemsCare.priceText}</p>
            <p className="mt-3 flex-1 text-body text-steel">{systemsCare.summary}</p>
            <ButtonLink href="/start?need=care" variant="secondary" className="mt-8 self-start">
              Start a project
            </ButtonLink>
          </Card>
        </ul>
        <p className="mt-8 max-w-3xl text-body text-steel">
          Every new build comes with Care for the first months, so nothing is left unattended at launch.{' '}
          {PAYMENT.careTerm}
        </p>
      </Section>

      <Section labelledBy="cycle-title">
        <SectionHeader id="cycle-title" title="What happens each month." />
        <div className="mt-14">
          <CareCycle steps={CYCLE} />
        </div>
      </Section>

      <section aria-labelledby="takeover-title" className="bg-mist pb-20 sm:pb-24">
        <Container>
          <div className="flex flex-col gap-6 rounded-card bg-paper p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <SectionTitle id="takeover-title" size="title">
                Already have a site we didn&apos;t build?
              </SectionTitle>
              <p className="mt-3 text-body text-steel">
                We can take it over. We start with a health check and tell you honestly whether to keep it, fix it or
                replace it.
              </p>
            </div>
            <TextLink href="/start?need=care" className="shrink-0">
              Ask for a health check
            </TextLink>
          </div>
        </Container>
      </section>

      <FaqSection items={FAQS} ground="paper" />

      <ClosingBand />
    </>
  )
}
