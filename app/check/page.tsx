import type { Metadata } from 'next'
import Link from 'next/link'
import CheckForm from '@/components/check/CheckForm'
import { ReportSection } from '@/components/check/ReportView'
import type { CardData } from '@/components/resources/ResourceCard'
import { SHADOW } from '@/components/made-in-lancashire/FormBits'
import PageHero from '@/components/site/PageHero'
import SectionHeader from '@/components/site/SectionHeader'
import Section from '@/components/ui/Section'
import { Dot } from '@/components/ui/SectionTitle'
import { REPORT_SECTIONS } from '@/lib/check/config'
import type { Section as ReportSectionData } from '@/lib/check/report'
import { pageMetadata } from '@/lib/metadata'
import { getResource } from '@/lib/resources'

export const metadata: Metadata = pageMetadata({
  title: 'Free website check | Masuyo',
  description:
    'A free report on your website: speed, Google visibility, local signals and enquiries. Checked by hand by Cameron, the engineer behind Masuyo, and sent within two working days.',
  path: '/check',
})

/** The sample on this page: one section from a fictional café, so visitors can see what a report looks like. */
const SAMPLE: ReportSectionData = {
  id: 'local',
  title: 'Local signals',
  summary: '2 working well and 2 quick wins.',
  score: 70,
  findings: [
    {
      id: 'local-call',
      label: 'Tap to call',
      status: 'good',
      finding: 'Your phone number can be tapped to call.',
      why: 'On a phone, one tap to call is the quickest way for a customer to reach you.',
      fix: [],
      impact: 3,
      effort: 1,
    },
    {
      id: 'local-town',
      label: 'Your town on the page',
      status: 'good',
      finding: 'Your homepage mentions Chorley.',
      why: 'Saying where you are helps local people, and Google, know you serve their area.',
      fix: [],
      impact: 2,
      effort: 1,
    },
    {
      id: 'local-schema',
      label: 'Business details for Google',
      status: 'quick_win',
      finding: 'Your homepage does not describe the business in a way Google reads directly (LocalBusiness schema).',
      why: 'This helps Google show your details, such as opening hours and address, with confidence.',
      fix: ['Add LocalBusiness schema with your name, address, phone and hours.', 'Most SEO plugins have a local business setting that does it for you.'],
      impact: 2,
      effort: 2,
    },
    {
      id: 'local-maps',
      label: 'Map or directions',
      status: 'quick_win',
      finding: 'We could not find a link to Google Maps.',
      why: 'A map link gives people directions in one tap, and connects your site with your Google listing.',
      fix: ['Add a "Get directions" link to your Google Maps listing.', 'Or embed a small map on your contact page.'],
      impact: 1,
      effort: 1,
    },
  ],
}

const WHILE_YOU_WAIT = ['small-business-website-checklist', 'more-enquiries-from-your-website']

export default function CheckPage() {
  const articles = WHILE_YOU_WAIT.map(getResource)
    .filter(Boolean)
    .map(r => ({ slug: r!.slug, title: r!.title, description: r!.description, category: r!.category, readingTime: r!.readingTime }) as CardData)

  return (
    <>
      <PageHero
        title={
          <>
            Free website check
            <Dot />
          </>
        }
        body="A full report on your site's speed, Google visibility and enquiries. Cameron goes through every check by hand, and your report arrives within two working days."
        smallPrint={
          <>
            If you do not have a website yet,{' '}
            <Link href="/start" className="font-semibold text-paper underline decoration-aqua decoration-2 underline-offset-[5px] hover:text-aqua">
              start a project instead
            </Link>
            .
          </>
        }
      />

      <Section labelledBy="check-form-title" spacing="tight">
        <h2 id="check-form-title" className="sr-only tracking-normal">
          Ask for your free check
        </h2>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-14">
          <div id="check-form">
            <CheckForm articles={articles} />
          </div>
          <aside className="space-y-4">
            <div className={`rounded-card bg-paper p-6 sm:p-7 ${SHADOW}`}>
              <h2 className="text-title text-deep">
                What you get
                <Dot />
              </h2>
              <ul className="mt-4 space-y-3 text-body text-steel">
                <li>A score out of 100 and the three quick wins worth doing first.</li>
                <li>Every check explained: what we found, why it matters and how to fix it.</li>
                <li>A web version you can share with whoever looks after your site.</li>
              </ul>
            </div>
            <div className={`rounded-card bg-paper p-6 sm:p-7 ${SHADOW}`}>
              <h2 className="text-title text-deep">
                Who checks it
                <Dot />
              </h2>
              <p className="mt-4 text-body text-steel">Cameron, the engineer behind Masuyo, reads every report and follows up personally.</p>
            </div>
          </aside>
        </div>
      </Section>

      <Section ground="paper" labelledBy="covers-title">
        <SectionHeader id="covers-title" title="What the report covers." intro="Seven parts, each checked only where it can be measured properly. Anything we cannot measure is left out rather than guessed." />
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {REPORT_SECTIONS.map((s, i) => (
            <li key={s.title} className={`rounded-card bg-mist p-6`}>
              <span aria-hidden="true" className="text-subhead font-extrabold text-petrol">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-2 text-subhead text-deep">{s.title}</h3>
              <p className="mt-2 text-body text-steel">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section labelledBy="sample-title">
        <SectionHeader id="sample-title" title="A sample." intro="One part of a report for Holly's Kitchen, a fictional café in Chorley." />
        <div className="mt-10 max-w-3xl">
          <ReportSection s={SAMPLE} headingLevel="h3" />
        </div>
      </Section>
    </>
  )
}
