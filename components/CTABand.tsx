import Link from 'next/link'
import RevealAnimation from './RevealAnimation'

interface CTABandProps {
  headline?: string
  body?: string
  buttonLabel?: string
  buttonHref?: string
}

export default function CTABand({
  headline = "Not sure where to start? That is fine.",
  body = "Most of our clients come to us with a rough idea of what they need. We help them figure out the rest.",
  buttonLabel = "Start a conversation",
  buttonHref = "/contact",
}: CTABandProps) {
  return (
    <section style={{ background: 'var(--navy)' }} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <RevealAnimation>
          <h2
            className="text-3xl md:text-4xl font-semibold text-white mb-4"
            style={{ fontFamily: 'Fraunces, serif' }}
          >
            {headline}
          </h2>
        </RevealAnimation>
        <RevealAnimation delay={1}>
          <p
            className="text-base mb-8 max-w-xl mx-auto"
            style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif' }}
          >
            {body}
          </p>
        </RevealAnimation>
        <RevealAnimation delay={2}>
          <Link
            href={buttonHref}
            className="inline-block text-sm font-semibold text-white px-6 py-3 rounded transition-colors"
            style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}
          >
            {buttonLabel}
          </Link>
        </RevealAnimation>
      </div>
    </section>
  )
}
