import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { IntroNote, QuickWins, ReportSection, ScoreBlock } from '@/components/check/ReportView'
import { ButtonLink } from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import { Dot } from '@/components/ui/SectionTitle'
import TextLink from '@/components/ui/TextLink'
import { getReport } from '@/lib/check/report'
import { BOOKING_URL } from '@/lib/site'

/**
 * The web version of a free website check report, at the private link in
 * the email. Never indexed and never in the sitemap. Cameron reviews every
 * check by hand, so until he has approved and sent it this page only says
 * the report is not ready yet: never partial results. ?preview= is his
 * private preview of the draft, from MasCRM.
 */

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: { absolute: 'Your website check | Masuyo' },
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
}

const dateFmt = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/London' })

export default async function ReportPage({ params, searchParams }: { params: { token: string }; searchParams: { preview?: string } }) {
  const found = await getReport(params.token, typeof searchParams.preview === 'string' ? searchParams.preview : undefined)
  if (found.state === 'missing') notFound()

  if (found.state === 'pending') {
    return (
      <section className="ground-dark bg-petrol text-paper" data-nav-ground="dark">
        <Container className="pb-20 pt-12 sm:pt-16">
          <p className="text-small font-semibold text-mist">Free website check</p>
          <h1 className="mt-3 text-display text-balance text-paper">
            This report is not ready yet
            <Dot />
          </h1>
          <p className="mt-5 max-w-measure text-lead text-mist">
            Cameron goes through every website check by hand, so your report will arrive within two working days of your request. It comes by email, and this link will show it from then.
          </p>
        </Container>
      </section>
    )
  }

  const { report, preview } = found
  const r = report.results
  const name = report.business_name ?? r.domain

  return (
    <>
      {preview && (
        <p className="bg-aqua px-5 py-2 text-center text-small font-semibold text-petrol">Preview. This is how the report will look once you approve and send it.</p>
      )}
      <section className="ground-dark bg-petrol text-paper" data-nav-ground="dark">
        <Container className="pb-12 pt-10 sm:pb-16 sm:pt-14">
          <p className="text-small font-semibold text-mist">Free website check</p>
          <h1 className="mt-3 text-display text-balance text-paper">
            {name}
            <Dot />
          </h1>
          <p className="mt-4 text-lead text-mist">
            {r.domain} · checked {dateFmt.format(new Date(r.checked_at))}
          </p>
        </Container>
      </section>

      <Section spacing="tight" labelledBy="score-title">
        <h2 id="score-title" className="sr-only tracking-normal">
          {report.score === null ? 'In short' : 'Your score'}
        </h2>
        <div className="space-y-6">
          {report.intro && <IntroNote text={report.intro} />}
          <ScoreBlock results={r} score={report.score} />
        </div>
      </Section>

      <Section ground="paper" spacing="tight" labelledBy="wins-title">
        <h2 id="wins-title" className="text-heading text-balance text-deep">
          {r.quick_wins.length === 1 ? 'One quick win to start with' : r.quick_wins.length ? `${r.quick_wins.length === 2 ? 'Two' : 'Three'} quick wins to start with` : 'Quick wins'}
          <Dot />
        </h2>
        <p className="mt-2 max-w-measure text-lead text-steel">The changes likely to make the most difference for the least work.</p>
        <div className="mt-8">
          <QuickWins results={r} />
        </div>
      </Section>

      <Section spacing="tight" labelledBy="sections-title">
        <h2 id="sections-title" className="sr-only tracking-normal">
          The full report
        </h2>
        <div className="max-w-3xl space-y-16">
          {r.sections.map(s => (
            <ReportSection key={s.id} s={s} />
          ))}
        </div>
      </Section>

      <section aria-labelledby="offer-title" className="ground-dark bg-petrol text-paper">
        <Container className="py-14 sm:py-16">
          <div className="max-w-2xl">
            <h2 id="offer-title" className="text-heading text-balance text-paper">
              Want these done for you?
            </h2>
            <p className="mt-4 max-w-measure text-lead text-mist">Reply to the email or book a short call.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
              <ButtonLink href={BOOKING_URL || '/start'} dark full className="sm:w-auto">
                Book a short call
              </ButtonLink>
              <TextLink href="/care" dark>
                How Care works
              </TextLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
