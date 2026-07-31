import Link from 'next/link'
import RevealAnimation from './RevealAnimation'

interface CTABandProps {
  headline?: string
  body?: string
}

/**
 * The closing band used across the site.
 *
 * Full bleed navy with a large rounded inner container, a giant display
 * headline and the site's only two calls to action.
 */
export default function CTABand({
  headline = "Let's build something that actually works.",
  body = "We're a small team of experts. No account managers, no offices, no bloat. That's why our prices look like a typo.",
}: CTABandProps) {
  return (
    <section className="on-dark w-full bg-white px-4 pb-20 pt-4 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-navy px-6 py-20 text-center md:px-12 md:py-28">
        {/* Quiet brand geometry, decorative only. */}
        <svg
          viewBox="0 0 1440 480"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <circle cx="1380" cy="440" r="560" stroke="rgba(53,173,223,0.12)" strokeWidth="1" />
          <circle cx="1380" cy="440" r="380" stroke="rgba(53,173,223,0.09)" strokeWidth="1" />
          <circle cx="60" cy="40" r="300" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        </svg>

        <div className="relative mx-auto max-w-3xl">
          <RevealAnimation>
            <h2 className="text-4xl text-white md:text-5xl">{headline}</h2>
          </RevealAnimation>

          <RevealAnimation delay={1}>
            <p className="mx-auto mt-7 max-w-xl font-sans text-base leading-relaxed text-white/75">
              {body}
            </p>
          </RevealAnimation>

          <RevealAnimation delay={2}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/start-a-project" className="btn-primary w-full sm:w-auto">
                Get an instant estimate
              </Link>
              <Link href="/contact" className="btn-secondary w-full sm:w-auto">
                Talk to us
              </Link>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  )
}
