import SectionTitle from '@/components/ui/SectionTitle'
import Section from '@/components/ui/Section'
import { SHADOW } from './FormBits'

/** "Why it matters.": straight after the hero. Three points in a row on desktop, stacked on a phone. */
const POINTS = [
  { title: 'Your money stays local.', body: 'Buying from an independent pays local wages and keeps high streets open.' },
  { title: 'You get the real thing.', body: 'People who know their trade, care about their work and know your name.' },
  { title: 'A little goes a long way.', body: "A follow, a review or a recommendation can make a small business's week." },
]

export default function WhyItMatters() {
  return (
    <Section labelledBy="why-title">
      <div className="max-w-3xl">
        <SectionTitle id="why-title">Why it matters.</SectionTitle>
        <p className="mt-4 max-w-measure text-lead text-steel">
          Independent businesses are what make Lancashire feel like Lancashire. The bakery that knows your order. The garage that tells you straight. The shop that stocks things you won&apos;t find anywhere else.
        </p>
      </div>
      <ul className="mt-10 grid gap-4 sm:gap-5 md:grid-cols-3">
        {POINTS.map(p => (
          <li key={p.title} className={`rounded-card bg-paper p-6 sm:p-7 ${SHADOW}`}>
            <h3 className="text-subhead text-deep">{p.title}</h3>
            <p className="mt-2 text-body text-steel">{p.body}</p>
          </li>
        ))}
      </ul>
      <p className="mt-10 max-w-measure text-lead text-deep">
        Most of them don&apos;t have a marketing team behind them. Made in Lancashire puts the county&apos;s best independents in front of more people, and brings them together so they can help each other grow.
      </p>
    </Section>
  )
}
