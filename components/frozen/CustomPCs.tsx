import RevealAnimation from '@/components/RevealAnimation'
import TowerRender from './TowerRender'
import { BUILD_SPECS } from './content'

/**
 * Custom PCs. Full bleed dark, laid out like a product page: the machine on
 * one side, the specification on the other, and nothing else competing.
 *
 * The spec sheet is a description list, so a screen reader reads each term with
 * its detail rather than as six loose lines.
 */
export default function CustomPCs() {
  return (
    <section
      id="custom-pcs"
      className="fc-noise relative isolate overflow-hidden bg-fc-navy text-fc-frost"
    >
      <div aria-hidden className="fc-light-wash absolute inset-0" />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-16 px-6 py-24 sm:py-32 lg:grid-cols-2 lg:gap-24 lg:py-40">
        <RevealAnimation className="order-2 lg:order-1">
          <p className="fc-label text-fc-frost/50">Custom PCs</p>
          <h2 className="fc-h2 mt-5">Built to a spec, not pulled off a shelf.</h2>

          <dl className="mt-12">
            {BUILD_SPECS.map(spec => (
              <div key={spec.term} className="fc-rule-dark border-t py-6">
                <dt className="fc-label text-fc-cyan">{spec.term}</dt>
                <dd className="fc-lead mt-3 text-fc-frost/80">{spec.detail}</dd>
              </div>
            ))}
          </dl>
        </RevealAnimation>

        <RevealAnimation delay={1} className="order-1 lg:order-2">
          <TowerRender className="mx-auto h-auto w-full max-w-[22rem] lg:max-w-none" />
        </RevealAnimation>
      </div>
    </section>
  )
}
