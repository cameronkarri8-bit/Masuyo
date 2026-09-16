import { TRUST_FACTS } from './content'

/**
 * The trust strip. Thin by design: it is a line of facts, not a section.
 *
 * Each fact is marked with a short cyan hairline rather than a divider between
 * items, because a divider between items leaves an orphan rule at the start of
 * a wrapped row. The mark travels with the item it belongs to, so it is
 * correct at every width.
 *
 * Every string here comes from TRUST_FACTS and nowhere else. There are four
 * facts because four were supplied.
 */
export default function TrustStrip() {
  return (
    <section
      aria-label="At a glance"
      className="fc-rule-light border-b border-t bg-fc-frost"
    >
      <ul className="mx-auto flex max-w-6xl flex-wrap justify-center gap-x-10 gap-y-3 px-6 py-5 sm:gap-x-14 sm:py-6">
        {TRUST_FACTS.map(fact => (
          <li key={fact} className="flex items-center gap-3 text-[0.9375rem] text-fc-slate">
            <span aria-hidden className="h-px w-4 shrink-0 bg-fc-cyan" />
            {fact}
          </li>
        ))}
      </ul>
    </section>
  )
}
