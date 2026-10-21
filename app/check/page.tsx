import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Icon from '@/components/brand/Icon'
import CheckForm from '@/components/check/CheckForm'
import ReportPreview from '@/components/check/ReportPreview'
import { ReportSection } from '@/components/check/ReportView'
import type { CardData } from '@/components/resources/ResourceCard'
import { SHADOW } from '@/components/made-in-lancashire/FormBits'
import PageHero from '@/components/site/PageHero'
import SectionHeader from '@/components/site/SectionHeader'
import Steps from '@/components/site/Steps'
import { ButtonLink } from '@/components/ui/Button'
import Checklist from '@/components/ui/Checklist'
import Highlighter from '@/components/ui/Highlighter'
import Section from '@/components/ui/Section'
import SectionTitle, { Dot } from '@/components/ui/SectionTitle'
import type { BrandIconName } from '@/lib/brand/icons'
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

/** One brand icon per part of the report, in the order REPORT_SECTIONS lists them. */
const PART_ICONS: BrandIconName[] = ['speed', 'web-apps', 'seo', 'shop', 'growth', 'enquiries', 'security']

const HOW = [
  {
    title: 'Send your website.',
    body: 'Your web address and an email is all it takes. Under a minute, and no call needed.',
    icon: 'websites' as const,
  },
  {
    title: 'Checked by hand.',
    body: 'The tools run first, then Cameron goes through every result and adds what matters for your business.',
    icon: 'seo' as const,
  },
  {
    title: 'Your report arrives.',
    body: 'Within two working days: a score, the quick wins worth doing first, and a web version you can share.',
    icon: 'document' as const,
  },
]

const GET = [
  'A score out of 100 and the three quick wins worth doing first.',
  'Every check explained: what we found, why it matters and how to fix it.',
  'A web version you can share with whoever looks after your site.',
  'No obligation. One follow up email, and that is it.',
]

const WHILE_YOU_WAIT = ['small-business-website-checklist', 'more-enquiries-from-your-website']

export default function CheckPage() {
  const articles = WHILE_YOU_WAIT.map(getResource)
    .filter(Boolean)
    .map(r => ({ slug: r!.slug, title: r!.title, description: r!.description, category: r!.category, readingTime: r!.readingTime }) as CardData)

  return (
    <>
      <PageHero
        eyebrow="Free website check"
        title={
          <>
            See what your website is <Highlighter>missing</Highlighter>
            <Dot />
          </>
        }
        body="A full report on your site's speed, Google visibility and enquiries. Cameron goes through every check by hand, and your report arrives within two working days."
        actions={
          <ButtonLink href="#check-form" dark>
            Get my free check
          </ButtonLink>
        }
        smallPrint={
          <>
            Free, with no obligation. If you do not have a website yet,{' '}
            <Link href="/start" className="font-semibold text-paper underline decoration-aqua decoration-2 underline-offset-[5px] hover:text-aqua">
              start a project instead
            </Link>
            .
          </>
        }
        visual={<ReportPreview />}
      />

      <Section ground="paper" labelledBy="how-title" spacing="tight">
        <SectionHeader id="how-title" title="How it works." />
        <div className="mt-12">
          <Steps steps={HOW} columns={3} onPaper />
        </div>
      </Section>

      <Section labelledBy="check-form-title" spacing="tight" id="check-form">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-14">
          <div>
            <SectionTitle id="check-form-title">Ask for your free check.</SectionTitle>
            <p className="mt-3 max-w-measure text-body text-steel">Only the website and your email are needed. The rest helps make the report more useful.</p>
            <div className="mt-8">
              <CheckForm articles={articles} />
            </div>
          </div>
          <aside className="space-y-5 lg:pt-2">
            <div className="ground-dark rounded-card bg-petrol p-6 text-paper sm:p-7">
              <h2 className="text-title text-paper">
                What you get
                <Dot />
              </h2>
              <Checklist dark items={GET} className="mt-5" />
            </div>
            <div className={`flex gap-5 rounded-card bg-paper p-6 sm:p-7 ${SHADOW}`}>
              <Image
                src="/people/cameron.webp"
                alt="Cameron Karri, founder of Masuyo"
                width={900}
                height={1125}
                sizes="96px"
                className="h-24 w-20 shrink-0 rounded-control object-cover"
              />
              <div>
                <h2 className="text-subhead text-deep">
                  Who checks it
                  <Dot />
                </h2>
                <p className="mt-2 text-body text-steel">
                  Cameron, the engineer behind Masuyo, reads every report and follows up personally.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <Section ground="paper" labelledBy="covers-title">
        <SectionHeader
          id="covers-title"
          title="What the report covers."
          intro="Seven parts, each checked only where it can be measured properly. Anything we cannot measure is left out rather than guessed."
        />
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {REPORT_SECTIONS.map((s, i) => (
            <li key={s.title} className="flex flex-col rounded-card bg-mist p-6">
              <div className="flex items-start justify-between gap-3">
                <span aria-hidden="true" className="text-subhead font-extrabold text-petrol">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <Icon name={PART_ICONS[i] ?? 'websites'} size={40} className="-mr-1 -mt-1" />
              </div>
              <h3 className="mt-5 text-subhead text-deep">{s.title}</h3>
              <p className="mt-2 text-body text-steel">{s.body}</p>
            </li>
          ))}
          <li className="ground-dark flex flex-col justify-between rounded-card bg-petrol p-6 text-paper">
            <p className="text-subhead text-paper">All seven, checked by hand, free.</p>
            <div className="mt-6">
              <ButtonLink href="#check-form" dark>
                Get my free check
              </ButtonLink>
            </div>
          </li>
        </ol>
      </Section>

      <Section labelledBy="sample-title">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionTitle id="sample-title">A sample.</SectionTitle>
            <p className="mt-4 max-w-measure text-body text-steel">
              One part of a report for Holly&apos;s Kitchen, a fictional café in Chorley. Every check says what we found, why
              it matters and, where there is something to do, exactly how to fix it.
            </p>
          </div>
          <div>
            <ReportSection s={SAMPLE} headingLevel="h3" />
          </div>
        </div>
      </Section>

      <Section ground="petrol" spacing="tight" labelledBy="ready-title">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 id="ready-title" className="text-heading text-paper">
              Two minutes now, a clear list later
              <Dot />
            </h2>
            <p className="mt-3 max-w-measure text-body text-mist">Free, checked by hand, and in your inbox within two working days.</p>
          </div>
          <ButtonLink href="#check-form" dark>
            Get my free check
          </ButtonLink>
        </div>
      </Section>
    </>
  )
}
