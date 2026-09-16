import RevealAnimation from '@/components/RevealAnimation'
import { AREAS, BUSINESS } from './content'

/**
 * Areas covered, as an inline list.
 *
 * Deliberately not a map. A map would imply a service radius, a call out or a
 * collection service, none of which was supplied. A list of place names claims
 * only what it says.
 *
 * The mark sits inside each item rather than between items, so a wrapped row
 * never starts with an orphan separator.
 */
export default function Areas() {
  return (
    <section id="areas" className="bg-white py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <RevealAnimation>
          <p className="fc-label text-fc-slate">Areas covered</p>
          <h2 className="fc-h2 mt-5 max-w-2xl text-fc-navy">Around Preston.</h2>
          <p className="fc-lead mt-8 max-w-xl text-fc-slate">
            The workshop is on Watery Lane in {BUSINESS.addressLines[1]}, a short run from:
          </p>
        </RevealAnimation>

        <RevealAnimation delay={1}>
          <ul className="fc-rule-light mt-14 flex flex-wrap gap-x-10 gap-y-4 border-t pt-10">
            {AREAS.map(area => (
              <li key={area} className="fc-h3 flex items-center gap-3 text-fc-navy">
                <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-fc-cyan" />
                {area}
              </li>
            ))}
          </ul>
        </RevealAnimation>
      </div>
    </section>
  )
}
