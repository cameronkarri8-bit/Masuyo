/**
 * A sample report card for the Free check hero: a score dial, the summary and
 * the three quick wins, laid out the way a real report opens.
 *
 * It is labelled as a sample and uses the same fictional café as the sample
 * section further down the page, so nobody reads it as a real business.
 */

const SCORE = 72
const WINS = [
  { label: 'Add business details for Google', area: 'Local signals' },
  { label: 'Compress the homepage images', area: 'Speed' },
  { label: 'Link to your Google Maps listing', area: 'Local signals' },
]
const PARTS = [
  { label: 'Speed', value: 64 },
  { label: 'On a phone', value: 90 },
  { label: 'Found on Google', value: 78 },
  { label: 'Enquiries', value: 58 },
]

function Dial({ score }: { score: number }) {
  const r = 34
  const c = 2 * Math.PI * r
  return (
    <svg viewBox="0 0 84 84" className="h-24 w-24 shrink-0 sm:h-28 sm:w-28" aria-hidden="true">
      <circle cx="42" cy="42" r={r} fill="none" stroke="#E3E9EC" strokeWidth="9" />
      <circle
        cx="42"
        cy="42"
        r={r}
        fill="none"
        stroke="#0F3B4F"
        strokeWidth="9"
        strokeLinecap="round"
        strokeDasharray={`${(score / 100) * c} ${c}`}
        transform="rotate(-90 42 42)"
      />
      <text x="42" y="47" textAnchor="middle" className="fill-deep" style={{ font: '800 22px var(--font-albert), sans-serif' }}>
        {score}
      </text>
    </svg>
  )
}

export default function ReportPreview() {
  return (
    <figure className="relative mx-auto w-full max-w-[30rem]">
      {/* The offset aqua block behind the card, as the guide offsets its panels. */}
      <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 rounded-card bg-aqua" />
      <div className="relative rounded-card bg-paper p-6 text-deep shadow-[0_24px_48px_-24px_rgba(8,31,40,0.6)] sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <p className="text-small font-semibold text-steel">Website check</p>
          <span className="rounded-full bg-mist px-3 py-1 text-small font-semibold text-petrol">Sample</span>
        </div>

        <div className="mt-5 flex items-center gap-5">
          <Dial score={SCORE} />
          <div>
            <p className="text-small text-steel">Holly&apos;s Kitchen, Chorley</p>
            <p className="mt-1 text-subhead text-deep">Your score: {SCORE} out of 100</p>
            <p className="mt-1 text-small text-steel">A solid site with three quick wins.</p>
          </div>
        </div>

        <ul className="mt-6 grid grid-cols-2 gap-x-5 gap-y-3" aria-label="Scores by part">
          {PARTS.map(p => (
            <li key={p.label}>
              <div className="flex justify-between text-small">
                <span className="text-steel">{p.label}</span>
                <span className="font-semibold text-deep">{p.value}</span>
              </div>
              <div className="mt-1.5 h-1.5 rounded-full bg-mist">
                <div className="h-1.5 rounded-full bg-petrol" style={{ width: `${p.value}%` }} />
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 border-t border-petrol/15 pt-5">
          <p className="text-small font-semibold text-deep">Do these first</p>
          <ol className="mt-3 space-y-2.5">
            {WINS.map((w, i) => (
              <li key={w.label} className="flex items-center gap-3 rounded-control bg-mist px-3 py-2.5">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-petrol text-[0.75rem] font-bold text-paper">
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1 text-small font-semibold text-deep">{w.label}</span>
                <span className="hidden shrink-0 text-[0.75rem] text-steel sm:inline">{w.area}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <figcaption className="sr-only">A sample report for a fictional café, showing a score of {SCORE} out of 100 and three quick wins.</figcaption>
    </figure>
  )
}
