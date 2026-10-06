import type { Metadata } from 'next'
import BuildLoop from '@/components/diagrams/BuildLoop'
import PipelineBoard from '@/components/diagrams/PipelineBoard'
import {
  AssistantSketch,
  IntegrationSketch,
  KanbanSketch,
  LearningSketch,
  PortalSketch,
} from '@/components/diagrams/SystemSketches'
import ClosingBand from '@/components/site/ClosingBand'
import FaqSection from '@/components/site/FaqSection'
import PageHero from '@/components/site/PageHero'
import PriceLine from '@/components/site/PriceLine'
import SectionHeader from '@/components/site/SectionHeader'
import SignsChecklist from '@/components/site/SignsChecklist'
import { ButtonLink } from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Eyebrow from '@/components/ui/Eyebrow'
import Section from '@/components/ui/Section'
import SectionTitle, { Dot } from '@/components/ui/SectionTitle'
import TextLink from '@/components/ui/TextLink'
import { pageMetadata } from '@/lib/metadata'
import { SYSTEMS } from '@/lib/pricing'

export const metadata: Metadata = pageMetadata({
  title: 'Custom CRM, portals and automation | Masuyo',
  description:
    'Custom CRMs, client portals and automation for businesses that have outgrown spreadsheets and off the shelf software. Scoped, fixed price and built in stages.',
  path: '/systems',
})

const BUILDS = [
  {
    title: 'Custom CRM.',
    body: 'Leads, customers, jobs and follow ups in one place, using the stages your business already works in. Reminders go out without anyone remembering to send them.',
    Sketch: KanbanSketch,
    wide: true,
  },
  {
    title: 'Client portals.',
    body: 'A private login where your customers see progress, documents and invoices, and pay online. Fewer "just checking in" calls.',
    Sketch: PortalSketch,
    wide: true,
  },
  {
    title: 'Automation and integrations.',
    body: 'Your tools passing information to each other. Enquiries filed, invoices raised, stock updated, without anyone touching them.',
    Sketch: IntegrationSketch,
  },
  {
    title: 'AI assistants.',
    body: 'Assistants that know your own information and answer common questions, qualify enquiries or draft replies. A person always stays in control.',
    Sketch: AssistantSketch,
  },
  {
    title: 'Learning and member platforms.',
    body: "Courses, cohorts, progress tracking and payments, on your own domain rather than someone else's platform.",
    Sketch: LearningSketch,
  },
]

const STAGES = [
  {
    title: 'Discovery',
    body: 'We map how work moves through the business today and agree what to fix first. A short paid discovery, credited against the build if you go ahead.',
  },
  { title: 'Prototype', body: 'A clickable version early on, so you can see and feel it before anything is final.' },
  { title: 'Build in stages', body: 'Each stage goes live and gets used. What we learn shapes the next one.' },
  { title: 'Launch and train', body: 'Your data moved across, your team trained, and Care keeps it running.' },
]

const COMPARISON = [
  ['Fits your process', 'You change how you work to fit it', 'It is built around how you already work'],
  ['Cost over time', 'Monthly fees per user, rising as you grow', 'A fixed build, then Care'],
  ['Ownership', 'You rent it', 'You own the code and the data'],
  ['Changes', "You wait for the vendor's roadmap", 'You ask, we build it'],
  ['Setup time', 'Quick to start', 'Takes weeks, delivered in stages'],
]

const SECURE = [
  { label: 'Logins', body: 'Secure accounts, with each person seeing only what they need' },
  { label: 'Data', body: 'Stored securely and backed up daily' },
  { label: 'Privacy', body: 'Built with UK GDPR in mind from the first day' },
  { label: 'Export', body: 'Your data can be exported whenever you want it' },
]

const FAQS = [
  {
    question: 'We already use HubSpot, Xero or similar. Do we start again?',
    answer: "Not necessarily. We can connect to what you use, or replace the parts that don't fit and keep the rest.",
  },
  {
    question: 'How long until we can use it?',
    answer: 'The first stage is usually live within weeks, not months. Bigger systems arrive in stages.',
  },
  {
    question: 'What happens when the business changes?',
    answer: 'The system changes with it. Small changes are part of Care; bigger ones are scoped and quoted.',
  },
  {
    question: 'Will my team be able to use it?',
    answer: 'It is built around the way they already work, and we train everyone at launch.',
  },
  { question: 'Who owns it?', answer: 'You do: the code, the data and the accounts.' },
]

export default function SystemsPage() {
  return (
    <>
      <PageHero
        eyebrow="Systems"
        title="Software built around how your business already works."
        body="Custom CRMs, client portals and automation for businesses that have outgrown spreadsheets and off the shelf tools. Less copy and paste, fewer workarounds, and no monthly fees for features you never use."
        actions={
          <>
            <ButtonLink href="/start" dark>
              Start a project
            </ButtonLink>
            <TextLink href="#how-we-build" dark>
              See how we build it
            </TextLink>
          </>
        }
        bleed
        visual={<PipelineBoard tone="dark" className="h-auto w-full min-w-0 lg:w-[120%] lg:max-w-none" />}
      />

      <Section labelledBy="signs-title">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-16">
          <SectionTitle id="signs-title">You might need a system if...</SectionTitle>
          <SignsChecklist />
        </div>
      </Section>

      <Section ground="paper" labelledBy="systems-build-title">
        <SectionHeader id="systems-build-title" title="What we build." />
        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {BUILDS.map(item => (
            <Card as="li" key={item.title} onPaper className={`p-7 sm:p-8 ${item.wide ? 'lg:col-span-3' : 'lg:col-span-2'}`}>
              <item.Sketch />
              <h3 className="mt-6 text-subhead text-deep">
                {item.title.slice(0, -1)}
                <Dot />
              </h3>
              <p className="mt-2 text-body text-steel">{item.body}</p>
            </Card>
          ))}
        </ul>
      </Section>

      <Section id="how-we-build" labelledBy="how-build-title">
        <SectionHeader
          id="how-build-title"
          title="How we build it."
          intro="Custom software goes wrong when it is built in one long, invisible stretch. We work in short, visible stages so you can steer as we go."
        />
        <div className="mt-24">
          <BuildLoop stages={STAGES} />
        </div>
      </Section>

      <Section ground="paper" labelledBy="compare-title">
        <SectionHeader id="compare-title" title="Off the shelf or custom?" />
        {/* On a phone a three column table would hide the column that matters,
            so each row becomes its own small comparison. */}
        <dl className="mt-10 space-y-4 md:hidden">
          {COMPARISON.map(([row, shelf, ours]) => (
            <div key={row} className="rounded-card bg-mist p-5">
              <dt className="text-subhead text-deep">{row}</dt>
              <dd className="mt-3 text-body text-steel">
                <span className="block text-small text-steel">Off the shelf software</span>
                {shelf}
              </dd>
              <dd className="mt-3 text-body font-semibold text-deep">
                <span className="block text-small font-semibold text-petrol">A Masuyo system</span>
                {ours}
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-10 hidden md:block">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">Off the shelf software compared with a Masuyo system</caption>
            <thead>
              <tr>
                <td className="w-1/4" />
                <th scope="col" className="pb-4 pr-6 text-subhead text-steel">
                  Off the shelf software
                </th>
                <th scope="col" className="pb-4 text-subhead text-petrol">
                  A Masuyo system
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map(([row, shelf, ours]) => (
                <tr key={row} className="border-t border-petrol/15">
                  <th scope="row" className="py-4 pr-6 align-top text-body font-bold text-deep">
                    {row}
                  </th>
                  <td className="py-4 pr-6 align-top text-body text-steel">{shelf}</td>
                  <td className="py-4 align-top text-body font-semibold text-deep">{ours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-8 max-w-2xl text-body text-steel">
          Sometimes off the shelf is the right answer. If an existing tool will do the job, we will tell you which one and
          skip the build.
        </p>
      </Section>

      <Section id="built-in-house" ground="deep" labelledBy="in-house-title">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16">
          <PipelineBoard tone="dark" className="h-auto w-full" />
          <div>
            <Eyebrow dark>Built in house</Eyebrow>
            <SectionTitle id="in-house-title" dark className="mt-3">
              We run Masuyo on a system we built.
            </SectionTitle>
            <p className="mt-5 max-w-measure text-lead text-mist">
              Outreach, active contracts, invoices and a client portal, all in one CRM we designed and built for ourselves.
              Our clients use the portal to see their project and pay.
            </p>
          </div>
        </div>
      </Section>

      <Section labelledBy="secure-title">
        <SectionHeader id="secure-title" title="Secure by default." />
        <dl className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {SECURE.map(item => (
            <div key={item.label} className="border-t-2 border-petrol pt-4">
              <dt className="text-small text-steel">{item.label}</dt>
              <dd className="mt-2 text-body font-semibold text-deep">{item.body}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <PriceLine>
        Systems usually start from {SYSTEMS.fromText.replace('From ', '')}. Every project is scoped and fixed in price
        before work begins.
      </PriceLine>

      <FaqSection items={FAQS} />

      <ClosingBand />
    </>
  )
}
