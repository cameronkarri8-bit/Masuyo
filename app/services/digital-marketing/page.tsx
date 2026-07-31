import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'
import ImagePlaceholder from '@/components/ImagePlaceholder'

export const metadata: Metadata = {
  title: 'Digital Marketing',
  description: 'Marketing that actually brings in business. SEO, paid ads, content and social that target the right audience at the right time.',
  openGraph: {
    title: 'Digital Marketing | Masuyo Digital',
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
      <section className="bg-navy py-24 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Digital Marketing
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl text-white mb-6">
                Marketing that actually brings in business.
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.7' }}>
                Getting traffic to your website is one thing. Getting the right traffic, people who are ready to buy, is another. We build digital marketing strategies that target the right audience, at the right time, through the right channels. Then we track everything so you always know what is working.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <Link href="/contact" className="btn-primary">
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

      {/* Services */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl text-ink mb-12">
              What we do
            </h2>
          </RevealAnimation>
          <div className="flex flex-col divide-y divide-[#e5e3df]" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
            {services.map((s, i) => (
              <RevealAnimation key={i} delay={(i % 3 + 1) as 1 | 2 | 3}>
                <div className="py-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <h3 className="text-base font-semibold text-ink">{s.title}</h3>
                  <p className="text-sm leading-relaxed md:col-span-2" style={{ color: 'var(--mid)' }}>{s.description}</p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-blue-tint">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <RevealAnimation>
              <h2 className="text-3xl text-ink mb-6">
                How it works
              </h2>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', lineHeight: '1.8' }}>
                We start by understanding your business and your goals. Then we build a strategy, implement it, track performance, and refine over time. No set-and-forget. We stay involved.
              </p>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <CTABand headline="Want to know what is possible for your business?" body="We will give you an honest picture of where you are and where you could be." />
    </>
  )
}
