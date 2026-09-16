import RevealAnimation from '@/components/RevealAnimation'
import FrostLines from './FrostLines'
import { BookRepair, CallDark } from './Cta'

/**
 * The hero. One statement, one supporting line, two actions, and otherwise
 * empty. The height comes from the padding, not from anything filling it.
 *
 * Three layers behind the type, all drawn: the radial light wash, the
 * crystalline line work, and a fine grain over the top of both.
 */
export default function Hero() {
  return (
    <section className="fc-noise relative isolate overflow-hidden bg-fc-navy text-fc-frost">
      <div aria-hidden className="fc-light-wash absolute inset-0" />
      <FrostLines className="absolute inset-0 h-full w-full" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-28 sm:py-36 lg:py-48">
        <RevealAnimation>
          <h1 className="fc-display max-w-4xl">Your computer fixed properly, in Preston.</h1>
        </RevealAnimation>

        <RevealAnimation delay={1}>
          <p className="fc-lead mt-8 max-w-xl text-fc-frost/70">
            Repairs, upgrades and custom builds, from the workshop on Watery Lane in
            Ashton-on-Ribble.
          </p>
        </RevealAnimation>

        <RevealAnimation delay={2}>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <BookRepair />
            <CallDark />
          </div>
        </RevealAnimation>
      </div>
    </section>
  )
}
