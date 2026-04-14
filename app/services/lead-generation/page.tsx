import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'Lead Generation',
  description: 'More enquiries. Better leads. Less chasing. We build lead generation systems that work in the background.',
  openGraph: {
    title: 'Lead Generation – Masuyo Digital',
    description: 'More enquiries. Better leads. Less chasing.',
    url: 'https://masuyodigital.com/services/lead-generation',
  },
  alternates: { canonical: 'https://masuyodigital.com/services/lead-generation' },
}

const whatWeBuild = [
  'Landing pages designed specifically to convert visitors into enquiries.',
  'Paid ad campaigns on Google and social media targeting people actively looking for what you offer.',
  'SEO strategies that bring in organic traffic over time.',
  'Lead capture systems and forms that connect directly to your CRM or inbox.',
  'Automated follow-up sequences so no lead goes cold.',
]

export default function LeadGenerationPage() {
  return (
    <>
      <section className="crosshatch-bg pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                Lead Generation
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'Fraunces, serif' }}>
                More enquiries. Better leads. Less chasing.
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                Most businesses are not short of potential customers. They are short of a reliable way to reach them. We build lead generation systems that work in the background, bringing enquiries directly to you while you focus on running your business.
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

      {/* What we build */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-12" style={{ fontFamily: 'Fraunces, serif' }}>
              What we build
            </h2>
          </RevealAnimation>
          <div className="flex flex-col gap-4">
            {whatWeBuild.map((item, i) => (
              <RevealAnimation key={i} delay={(i % 3 + 1) as 1 | 2 | 3}>
                <div className="flex gap-4 p-6" style={{ border: '1px solid var(--border)', borderRadius: '8px' }}>
                  <span className="text-lg font-semibold flex-shrink-0 w-8" style={{ color: 'var(--blue)', fontFamily: 'Fraunces, serif' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', paddingTop: '2px' }}>
                    {item}
                  </p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Who this is for */}
      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <RevealAnimation>
              <h2 className="text-3xl font-semibold text-ink mb-6" style={{ fontFamily: 'Fraunces, serif' }}>
                Who this is for
              </h2>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                Whether you are a service business, a trade, a professional practice or a growing company, if you want a more consistent flow of qualified enquiries, this is where we start.
              </p>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <CTABand headline="Let us look at your lead generation together." body="We will show you where the gaps are and how we fix them." buttonLabel="Get in touch" buttonHref="/contact" />
    </>
  )
}
