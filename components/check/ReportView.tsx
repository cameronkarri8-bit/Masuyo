import { SHADOW } from '@/components/made-in-lancashire/FormBits'
import { Dot } from '@/components/ui/SectionTitle'
import { METRIC_SOURCE_LABELS, STATUS_LABELS, type CheckResults, type CheckStatus, type Finding, type Section } from '@/lib/check/report'

/**
 * A free website check report, in the site's own style. Used by the web
 * report (/check/report/[token]) and for the sample on /check. Everything it
 * says comes from the stored results; nothing here judges the site.
 */

const MARK: Record<CheckStatus, { line: string; text: string; icon: React.ReactNode }> = {
  good: {
    line: 'border-petrol/30',
    text: 'text-petrol',
    icon: <path d="M4 10.5l4 4 8-9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />,
  },
  quick_win: {
    line: 'border-petrol',
    text: 'text-deep',
    icon: <path d="M11 2L4 11h5l-1 7 7-9h-5l1-7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />,
  },
  worth_a_look: {
    line: 'border-steel/50',
    text: 'text-steel',
    icon: (
      <>
        <path d="M2 10s3-5.5 8-5.5S18 10 18 10s-3 5.5-8 5.5S2 10 2 10z" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="10" cy="10" r="2.3" fill="currentColor" />
      </>
    ),
  },
}

export function StatusLabel({ status }: { status: CheckStatus }) {
  const m = MARK[status]
  return (
    <span className={`inline-flex items-center gap-1.5 text-small font-semibold ${m.text}`}>
      <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0" fill="none" aria-hidden="true">
        {m.icon}
      </svg>
      {STATUS_LABELS[status]}
    </span>
  )
}

function FindingCard({ f, headingLevel = 'h4' }: { f: Finding; headingLevel?: 'h3' | 'h4' }) {
  const H = headingLevel
  return (
    <li className={`rounded-card border-l-4 bg-paper p-5 sm:p-6 ${MARK[f.status].line} ${SHADOW}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <H className="text-subhead text-deep">{f.label}</H>
        <StatusLabel status={f.status} />
      </div>
      <p className="mt-2 text-body text-deep">{f.finding}</p>
      <p className="mt-2 text-body text-steel">
        <span className="font-semibold text-deep">Why it matters. </span>
        {f.why}
      </p>
      {f.fix.length > 0 && (
        <div className="mt-3">
          <p className="text-body font-semibold text-deep">How to fix it</p>
          <ol className="mt-1.5 list-decimal space-y-1 pl-5 text-body text-steel marker:font-semibold marker:text-petrol">
            {f.fix.map(step => (
              <li key={step} className="break-words">
                {step}
              </li>
            ))}
          </ol>
        </div>
      )}
    </li>
  )
}

function SpeedFigures({ s }: { s: Section }) {
  const m = s.metrics
  if (!m) return null
  const rows: { label: string; value: string; note?: string }[] = []
  if (typeof m.mobile === 'number') rows.push({ label: 'Speed score on a phone', value: `${m.mobile} out of 100` })
  if (typeof m.desktop === 'number') rows.push({ label: 'Speed score on a computer', value: `${m.desktop} out of 100` })
  if (m.lcp) rows.push({ label: 'Main content appears', value: `${m.lcp.seconds.toFixed(1)} seconds`, note: METRIC_SOURCE_LABELS[m.lcp.source] })
  if (m.cls) rows.push({ label: 'Layout shift', value: m.cls.value.toFixed(2), note: METRIC_SOURCE_LABELS[m.cls.source] })
  if (m.inp) rows.push({ label: 'Response to a tap', value: `${m.inp.ms} milliseconds`, note: METRIC_SOURCE_LABELS[m.inp.source] })
  if (!rows.length) return null
  return (
    <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {rows.map(r => (
        <div key={r.label} className="rounded-card bg-paper p-4">
          <dt className="text-small text-steel">{r.label}</dt>
          <dd className="mt-1 text-subhead text-deep">{r.value}</dd>
          {r.note && <dd className="mt-0.5 text-small text-steel">From {r.note}</dd>}
        </div>
      ))}
    </dl>
  )
}

export function ReportSection({ s, headingLevel = 'h2' }: { s: Section; headingLevel?: 'h2' | 'h3' }) {
  const H = headingLevel
  return (
    <section aria-labelledby={`section-${s.id}`}>
      <H id={`section-${s.id}`} className="text-heading text-balance text-deep">
        {s.title}
        <Dot />
      </H>
      <p className="mt-2 text-lead text-steel">{s.summary}</p>
      <SpeedFigures s={s} />
      <ul className="mt-6 space-y-4">
        {s.findings.map(f => (
          <FindingCard key={f.id} f={f} headingLevel={headingLevel === 'h2' ? 'h3' : 'h4'} />
        ))}
      </ul>
    </section>
  )
}

export function ScoreBlock({ results, title }: { results: CheckResults; title: string }) {
  return (
    <div className="ground-dark rounded-card bg-petrol p-6 text-paper sm:p-8">
      <p className="text-small font-semibold text-mist">{title}</p>
      <p className="mt-2 flex items-baseline gap-2">
        <span className="text-[3.5rem] font-extrabold leading-none text-paper">{results.score}</span>
        <span className="text-subhead text-mist">out of 100</span>
      </p>
      <p className="mt-4 max-w-measure text-body text-mist">{results.summary}</p>
    </div>
  )
}

export function QuickWins({ results }: { results: CheckResults }) {
  if (!results.quick_wins.length) {
    return <p className="text-lead text-deep">We did not find any quick wins: the basics are all in place.</p>
  }
  return (
    <ol className="grid gap-4 lg:grid-cols-3">
      {results.quick_wins.map((w, i) => (
        <li key={w.id} className={`flex flex-col rounded-card bg-paper p-6 ${SHADOW}`}>
          <span aria-hidden="true" className="text-subhead font-extrabold text-petrol">
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3 className="mt-2 text-subhead text-deep">{w.label}</h3>
          <p className="mt-2 text-body text-steel">{w.finding}</p>
          {w.fix[0] && (
            <p className="mt-3 break-words text-body text-deep">
              <span className="font-semibold">Start here: </span>
              {w.fix[0]}
            </p>
          )}
        </li>
      ))}
    </ol>
  )
}
