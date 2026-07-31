import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'
import ImagePlaceholder from '@/components/ImagePlaceholder'

export const metadata: Metadata = {
  title: 'GDPR Compliance for Websites and Apps UK | Masuyo Digital',
  description: 'GDPR compliance implementation for UK business websites and applications. Data protection that keeps you legal and builds customer trust.',
  openGraph: {
    title: 'GDPR Compliance for Websites and Apps UK | Masuyo Digital',
    description: 'GDPR compliance implementation for UK business websites and applications. Data protection that keeps you legal and builds customer trust.',
    url: 'https://masuyodigital.com/technology/gdpr-compliance',
  },
  alternates: { canonical: 'https://masuyodigital.com/technology/gdpr-compliance' },
}

const solutionPoints = [
  'Data audit and mapping (what data you collect and where it goes)',
  'Privacy policy and cookie policy implementation',
  'Cookie consent management',
  'Data retention and deletion workflows',
  'User rights implementation (access, deletion, portability)',
  'Third-party processor review',
  'ICO registration guidance',
]

const features = [
  'Data flow audit',
  'Privacy policy',
  'Cookie policy',
  'Consent management',
  'Data retention setup',
  'User rights workflows',
  'Processor agreements review',
  'Compliance documentation',
]

export default function GdprCompliancePage() {
  return (
    <>
      <section className="bg-navy py-24 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
                GDPR and Compliance
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl text-white mb-6">
                GDPR compliance that actually protects you
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.7' }}>
                We implement the technical and policy foundations that keep your business compliant with UK GDPR. Clear, practical, and built into your systems from the ground up.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <Link href="/start-a-project" className="btn-primary">
                Get an instant estimate
              </Link>
            </RevealAnimation>
            </div>

            <RevealAnimation delay={4}>
              <ImagePlaceholder aspect="4/3" label="PLACEHOLDER: recent work relevant to this service, shown in context" />
            </RevealAnimation>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <RevealAnimation>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--mid)' }}>
                  The problem
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', lineHeight: '1.8' }}>
                  Most businesses know they need to be GDPR compliant but are not sure what that means technically. A privacy policy alone is not enough. The way your systems collect, store, and process data needs to be compliant too.
                </p>
              </div>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <div>
                <h2 className="text-2xl text-ink mb-6">
                  What we implement
                </h2>
                <ul className="flex flex-col gap-4">
                  {solutionPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-1" style={{ color: 'var(--blue)' }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-sm leading-relaxed" style={{ color: 'var(--ink)' }}>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <section className="py-24 bg-blue-tint">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-10">
              What you get
            </h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, i) => (
              <RevealAnimation key={i} delay={(i % 4 + 1) as 1 | 2 | 3 | 4}>
                <div className="flex items-center gap-3 p-4 rounded-lg h-full" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                  <span className="flex-shrink-0" style={{ color: 'var(--blue)' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-ink">{feature}</span>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="Need to get compliant?"
        body="Tell us about your business and how you collect data. We will take care of the rest."
      />
    </>
  )
}
