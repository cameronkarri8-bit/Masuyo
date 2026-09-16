import RevealAnimation from '@/components/RevealAnimation'
import { STEPS } from './content'

/**
 * How it works. Three steps, numbered.
 *
 * The numerals are set low contrast and hidden from assistive technology on
 * purpose. They are a visual rhythm, and the ordered list already carries the
 * sequence, so a screen reader is not read two competing numbering schemes.
 */
export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-fc-frost py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <RevealAnimation>
          <p className="fc-label text-fc-slate">How it works</p>
          <h2 className="fc-h2 mt-5 max-w-2xl text-fc-navy">Three steps, start to finish.</h2>
        </RevealAnimation>

        <ol className="mt-16 grid gap-x-12 sm:mt-20 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <RevealAnimation
              key={step.title}
              as="li"
              delay={i as 0 | 1 | 2}
              className="fc-rule-light border-t pt-8"
            >
              {/* Navy at 50 per cent over frost measures 3.30:1, which clears the
                  3:1 large text threshold. A lighter numeral looked better and
                  failed, so this is the lightest value that still reads. */}
              <span aria-hidden className="fc-numeral block text-fc-navy/50">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="fc-h3 mt-6 text-fc-navy">{step.title}</h3>
              <p className="mt-3 max-w-xs pb-10 text-[0.9375rem] leading-relaxed text-fc-slate">
                {step.detail}
              </p>
            </RevealAnimation>
          ))}
        </ol>
      </div>
    </section>
  )
}
