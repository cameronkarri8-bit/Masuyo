import type { Metadata } from 'next'
import type { CardData } from '@/components/resources/ResourceCard'
import StartForm, { type StartDefaults } from '@/components/start/StartForm'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import { fromEstimator, NEED_OPTIONS } from '@/lib/forms/brief'
import { pageMetadata } from '@/lib/metadata'
import { getResource } from '@/lib/resources'
import { BOOKING_URL, SITE } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Start a project | Masuyo',
  description: 'Tell us what is slowing the business down. Short form, no obligation, and a reply within one working day.',
  path: '/start',
})

/** Two articles for the confirmation, chosen by the first thing the visitor needs help with. */
const SUGGESTIONS: Record<(typeof NEED_OPTIONS)[number], string[]> = {
  Website: ['website-cost-uk', 'more-enquiries-from-your-website'],
  'System or CRM': ['tech-solutions-for-small-businesses', 'how-to-brief-a-web-design-agency'],
  Automation: ['tech-solutions-for-small-businesses', 'more-enquiries-from-your-website'],
  'Care for an existing site': ['website-care-plans', 'small-business-website-checklist'],
  'Not sure yet': ['website-cost-uk', 'small-business-website-checklist'],
}

const NEXT = [
  'We read your brief and look at your current site.',
  'You get a reply within one working day, usually with a couple of questions.',
  'If it is a fit, we book a short call or visit, then send a fixed price proposal.',
]

function NextSteps() {
  return (
    <div>
      <ol className="space-y-5">
        {NEXT.map((step, i) => (
          <li key={step} className="flex gap-4">
            <span aria-hidden="true" className="text-subhead font-extrabold text-aqua">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="text-body text-paper">{step}</span>
          </li>
        ))}
      </ol>
      <hr className="my-8 border-paper/15" />
      <h3 className="text-subhead text-paper">
        Rather talk?
      </h3>
      <ul className="mt-4 space-y-3">
        {BOOKING_URL && (
          <li>
            <a href={BOOKING_URL} className="font-semibold text-paper underline decoration-aqua decoration-2 underline-offset-[5px] hover:text-aqua">
              Book a 20 minute call
            </a>
          </li>
        )}
        <li>
          <a href={`mailto:${SITE.email}`} className="break-all font-semibold text-paper underline decoration-aqua decoration-2 underline-offset-[5px] hover:text-aqua sm:break-normal">
            {SITE.email}
          </a>
        </li>
      </ul>
    </div>
  )
}

export default function StartPage({ searchParams }: { searchParams: Record<string, string | undefined> }) {
  const est = fromEstimator(searchParams)
  const need = searchParams.need === 'system' ? 'System or CRM' : searchParams.need === 'care' ? 'Care for an existing site' : undefined
  const defaults: StartDefaults = {
    needs: est ? ['Website'] : need ? [need] : [],
    brief: est?.brief ?? '',
    budget: est?.budget ?? '',
    estimator: est?.summary ?? '',
  }

  const suggestions = Object.fromEntries(
    Object.entries(SUGGESTIONS).map(([k, slugs]) => [
      k,
      slugs
        .map(getResource)
        .filter(Boolean)
        .map(r => ({ slug: r!.slug, title: r!.title, description: r!.description, category: r!.category, readingTime: r!.readingTime }) as CardData),
    ])
  )

  return (
    <section className="bg-mist pb-20 pt-12 sm:pt-16 lg:pb-28 lg:pt-20">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow>Start a project</Eyebrow>
          <h1 className="mt-4 text-display text-balance text-deep">Tell us what is slowing the business down.</h1>
          <p className="mt-6 max-w-measure text-lead text-steel">
            A few lines is plenty. We reply within one working day with a straight answer on whether we can help and what it
            might involve.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-10">
          {/* On a phone the panel sits above the form, collapsed to one line. */}
          <details className="ground-dark group rounded-card bg-petrol text-paper lg:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-5 text-subhead">
              What happens next
              <svg viewBox="0 0 16 16" className="h-4 w-4 text-aqua transition-transform group-open:rotate-180" fill="none" aria-hidden="true">
                <path d="M3.5 6 8 10.5 12.5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </summary>
            <div className="px-6 pb-7">
              <NextSteps />
            </div>
          </details>

          <StartForm defaults={defaults} suggestions={suggestions} />

          <aside className="hidden lg:block">
            <div className="ground-dark sticky top-28 rounded-card bg-petrol p-8 text-paper">
              <h2 className="text-subhead text-paper">
                What happens next
              </h2>
              <div className="mt-6">
                <NextSteps />
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  )
}
