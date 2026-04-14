import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'Hosting & Infrastructure',
  description: 'Fast, reliable hosting. Managed by us. We host your website on our own server infrastructure.',
  openGraph: {
    title: 'Hosting & Infrastructure – Masuyo Digital',
    description: 'Fast, reliable hosting. Managed by us.',
    url: 'https://masuyodigital.com/services/hosting',
  },
  alternates: { canonical: 'https://masuyodigital.com/services/hosting' },
}

const included = [
  'Your own space on our managed server infrastructure.',
  'Fast load times, built on high performance hardware.',
  'SSL certificate included and maintained.',
  'Regular backups so nothing is ever lost.',
  'Uptime monitoring and proactive management.',
  'A team who knows your site and can act quickly if anything needs attention.',
]

export default function HostingPage() {
  return (
    <>
      <section className="crosshatch-bg pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                Hosting & Infrastructure
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'Fraunces, serif' }}>
                Fast, reliable hosting. Managed by us.
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                Most hosting companies are hands-off. Something breaks, you raise a ticket and wait. We do it differently. We host your website on our own server infrastructure, which means we are responsible for it and we stay on top of it.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <Link href="/contact" className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded" style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
                Get in touch
              </Link>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-12" style={{ fontFamily: 'Fraunces, serif' }}>
              What is included
            </h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {included.map((item, i) => (
              <RevealAnimation key={i} delay={(i % 2 + 1) as 1 | 2}>
                <div className="flex gap-4 p-5" style={{ border: '1px solid var(--border)', borderRadius: '8px' }}>
                  <span className="flex-shrink-0 mt-0.5" style={{ color: 'var(--blue)' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>{item}</p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <RevealAnimation>
              <h2 className="text-3xl font-semibold text-ink mb-6" style={{ fontFamily: 'Fraunces, serif' }}>
                Why it matters
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                A slow website loses visitors. A website that goes down loses business. Good hosting is not glamorous but it is essential, and it is something we take seriously.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <div className="p-6 rounded-lg" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                <p className="text-sm font-semibold text-ink mb-2" style={{ fontFamily: 'Geist, sans-serif' }}>Note</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                  Hosting is included with every website we build. We also offer hosting for existing sites built elsewhere. Get in touch to discuss.
                </p>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <CTABand headline="Want us to host your site?" body="Get in touch and we will talk through what is involved." buttonLabel="Get in touch" buttonHref="/contact" />
    </>
  )
}
