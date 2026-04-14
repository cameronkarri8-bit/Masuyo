import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'Digital Marketing',
  description: 'Marketing that actually brings in business. SEO, paid ads, content and social that target the right audience at the right time.',
  openGraph: {
    title: 'Digital Marketing – Masuyo Digital',
    description: 'Marketing that actually brings in business.',
    url: 'https://masuyodigital.com/services/digital-marketing',
  },
  alternates: { canonical: 'https://masuyodigital.com/services/digital-marketing' },
}

const services = [
  {
    title: 'Search engine optimisation',
    description: 'We improve your visibility on Google so more of the right people find you organically over time.',
  },
  {
    title: 'Paid advertising',
    description: 'Google Ads, Meta Ads and more. We manage campaigns that drive real results, not just clicks.',
  },
  {
    title: 'Content marketing',
    description: 'Blog posts, landing pages and content that builds authority and drives search traffic.',
  },
  {
    title: 'Social media',
    description: 'Strategy, content and management for the platforms that matter to your audience.',
  },
  {
    title: 'Email marketing',
    description: 'Campaigns and automations that keep your audience engaged and drive repeat business.',
  },
]

export default function DigitalMarketingPage() {
  return (
    <>
      <section className="crosshatch-bg pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                Digital Marketing
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'Fraunces, serif' }}>
                Marketing that actually brings in business.
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                Getting traffic to your website is one thing. Getting the right traffic — people who are ready to buy — is another. We build digital marketing strategies that target the right audience, at the right time, through the right channels. Then we track everything so you always know what is working.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <Link href="/contact" className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded" style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
                Start a conversation
              </Link>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-12" style={{ fontFamily: 'Fraunces, serif' }}>
              What we do
            </h2>
          </RevealAnimation>
          <div className="flex flex-col divide-y divide-[#e5e3df]" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
            {services.map((s, i) => (
              <RevealAnimation key={i} delay={(i % 3 + 1) as 1 | 2 | 3}>
                <div className="py-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <h3 className="text-base font-semibold text-ink" style={{ fontFamily: 'Fraunces, serif' }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed md:col-span-2" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>{s.description}</p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <RevealAnimation>
              <h2 className="text-3xl font-semibold text-ink mb-6" style={{ fontFamily: 'Fraunces, serif' }}>
                How it works
              </h2>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                We start by understanding your business and your goals. Then we build a strategy, implement it, track performance, and refine over time. No set-and-forget. We stay involved.
              </p>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <CTABand headline="Want to know what is possible for your business?" body="We will give you an honest picture of where you are and where you could be." buttonLabel="Start a conversation" buttonHref="/contact" />
    </>
  )
}
