import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'Custom Community Platform Development UK | Masuyo Digital',
  description: 'Launch a private branded community your members will actually use. A fully custom community platform built for your audience.',
  openGraph: {
    title: 'Custom Community Platform Development UK | Masuyo Digital',
    description: 'Launch a private branded community your members will actually use.',
    url: 'https://masuyodigital.com/products/community-platform',
  },
  alternates: { canonical: 'https://masuyodigital.com/products/community-platform' },
}

const features = [
  { title: 'Discussion Feed and Forums', description: 'Threaded discussions, topic channels, and a feed that keeps members engaged.' },
  { title: 'Member Profiles and Directory', description: 'Custom profiles, bios, and a searchable directory to help members connect.' },
  { title: 'Content and Resource Library', description: 'Share videos, guides, templates, and other resources exclusively with members.' },
  { title: 'Events and Live Sessions', description: 'Schedule and manage events, webinars, and live calls within the platform.' },
  { title: 'Membership and Access Control', description: 'Free tiers, paid tiers, or invitation-only. Full control over who gets in and what they see.' },
  { title: 'Admin and Moderation Tools', description: 'Manage members, moderate content, and keep your community healthy from one dashboard.' },
]

export default function CommunityPlatformPage() {
  return (
    <>
      <section className="crosshatch-bg pt-16 pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-32">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                Technology Product
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'Fraunces, serif' }}>
                We Build Custom Community Platforms
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-10" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                Launch a private branded community your members will actually use. Built on your domain, owned by you, with no third-party platform fees.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="inline-block text-center text-sm font-semibold text-white px-6 py-3.5 rounded" style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
                  Get a Quote
                </Link>
                <Link href="/products/bespoke" className="inline-block text-center text-sm font-semibold text-white px-6 py-3.5 rounded border border-[#35ADDF] bg-transparent hover:bg-[#35ADDF] transition-colors" style={{ fontFamily: 'Geist, sans-serif' }}>
                  See All Products
                </Link>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-10" style={{ fontFamily: 'Fraunces, serif' }}>
              What is included
            </h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <RevealAnimation key={i} delay={(i % 3 + 1) as 1 | 2 | 3}>
                <div className="p-6 rounded-lg h-full" style={{ background: 'var(--light)', border: '1px solid var(--border)' }}>
                  <h3 className="text-base font-semibold text-ink mb-2" style={{ fontFamily: 'Fraunces, serif' }}>{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>{f.description}</p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="Ready to build a community your members love?"
        body="Tell us about your audience and what you want them to experience. We will build it."
        buttonLabel="Get a Quote"
        buttonHref="/contact"
      />
    </>
  )
}
