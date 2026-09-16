import RevealAnimation from '@/components/RevealAnimation'
import FrostLines from './FrostLines'
import { BookRepair, CallDark } from './Cta'
import { BUSINESS } from './content'

/**
 * Contact. The address and the phone number as supplied, and the booking
 * action given the weight it has been promised everywhere else on the page.
 */
export default function Contact() {
  return (
    <section
      id="contact"
      className="fc-noise relative isolate overflow-hidden bg-fc-navy text-fc-frost"
    >
      <div aria-hidden className="fc-light-wash absolute inset-0" />
      <FrostLines className="absolute inset-0 h-full w-full" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 sm:py-32 lg:py-40">
        <RevealAnimation>
          <p className="fc-label text-fc-frost/50">Contact</p>
          <h2 className="fc-h2 mt-5 max-w-2xl">Bring it in.</h2>
        </RevealAnimation>

        <RevealAnimation delay={1}>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <BookRepair />
            <CallDark />
          </div>
        </RevealAnimation>

        {/* The booking action sits directly under the headline, where the hero
            puts it, rather than in a second column. Balancing it against the
            address left a large empty quarter on wide screens and made the
            most important control on the section look incidental. */}
        <RevealAnimation delay={2}>
          <dl className="fc-rule-dark mt-16 grid gap-y-10 border-t pt-10 sm:mt-20 sm:grid-cols-2 sm:gap-x-12">
            <div>
              <dt className="fc-label text-fc-cyan">Workshop</dt>
              <dd className="fc-lead mt-4">
                <address className="not-italic text-fc-frost/80">
                  {BUSINESS.addressLines.map(line => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </dd>
            </div>

            <div>
              <dt className="fc-label text-fc-cyan">Phone</dt>
              <dd className="fc-lead mt-4 text-fc-frost/80">{BUSINESS.phoneDisplay}</dd>
            </div>
          </dl>
        </RevealAnimation>
      </div>
    </section>
  )
}
