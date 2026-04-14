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
    <section style={{ background: 'var(--navy)' }} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 1440 320" fill="none" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
          <circle cx="1440" cy="320" r="640" stroke="rgba(53,173,223,0.10)" strokeWidth="1" fill="none" />
          <circle cx="1440" cy="320" r="460" stroke="rgba(53,173,223,0.07)" strokeWidth="1" fill="none" />
          <circle cx="1440" cy="320" r="280" stroke="rgba(53,173,223,0.10)" strokeWidth="1" fill="none" />
          <circle cx="0" cy="0" r="320" stroke="rgba(255,255,255,0.04)" strokeWidth="1" fill="none" />
          <circle cx="0" cy="0" r="180" stroke="rgba(255,255,255,0.03)" strokeWidth="1" fill="none" />
          <line x1="0" y1="80" x2="320" y2="0" stroke="rgba(255,255,255,0.025)" strokeWidth="1" />
          <circle cx="72" cy="260" r="3" fill="rgba(53,173,223,0.25)" />
          <circle cx="120" cy="220" r="2" fill="rgba(53,173,223,0.18)" />
          <circle cx="48" cy="300" r="1.5" fill="rgba(53,173,223,0.15)" />
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
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
