import RevealAnimation from '@/components/RevealAnimation'
import { REPAIRS } from './content'

/**
 * Repairs. Type led, divided by hairlines, with nothing boxed.
 *
 * Each item carries a rule along its top rather than a border all the way
 * round, so the grid reads as a set of ruled rows at every column count and
 * needs no nth-child arithmetic to stay tidy when it reflows.
 *
 * The second line is the symptom somebody arrives with, not a promise about
 * the repair. Nothing here states a price or a turnaround.
 */
export default function Repairs() {
  return (
    <section id="repairs" className="bg-white py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <RevealAnimation>
          <p className="fc-label text-fc-slate">Repairs</p>
          <h2 className="fc-h2 mt-5 max-w-2xl text-fc-navy">
            Bring it in and we will find out what is wrong with it.
          </h2>
        </RevealAnimation>

        <ul className="mt-16 grid gap-x-12 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
          {REPAIRS.map((repair, i) => (
            <RevealAnimation
              key={repair.name}
              as="li"
              delay={(i % 3) as 0 | 1 | 2}
              className="fc-rule-light border-t py-7"
            >
              <h3 className="fc-h3 text-fc-navy">{repair.name}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-fc-slate">
                {repair.symptom}
              </p>
            </RevealAnimation>
          ))}
        </ul>
      </div>
    </section>
  )
}
