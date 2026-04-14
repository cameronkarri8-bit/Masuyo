import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'Technology Solutions',
  description: 'The right technology changes everything. CRM systems, custom platforms, integrations and technology audits.',
  openGraph: {
    title: 'Technology Solutions – Masuyo Digital',
    description: 'The right technology changes everything.',
    url: 'https://masuyodigital.com/services/technology-solutions',
  },
  alternates: { canonical: 'https://masuyodigital.com/services/technology-solutions' },
}

const whatWeDo = [
  {
    title: 'CRM systems',
    description: 'We set up and configure customer relationship management systems so your team can track leads, manage clients and stay organised.',
  },
  {
    title: 'CMS platforms',
    description: 'Content management systems that give your team full control over your website and content without needing a developer.',
  },
  {
    title: 'Custom platforms and web applications',
    description: 'When off-the-shelf does not cut it, we build it.',
  },
  {
    title: 'Third-party integrations',
    description: 'We connect the tools you already use so they work together properly.',
  },
  {
    title: 'Technology audits',
    description: 'We look at what you are currently using, identify gaps and inefficiencies, and recommend the right path forward.',
  },
]

export default function TechnologySolutionsPage() {
  return (
    <>
      <section className="crosshatch-bg pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                Technology Solutions
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'Fraunces, serif' }}>
                The right technology changes everything.
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                Most businesses are using a fraction of what technology could do for them. Some are using the wrong tools entirely. We help businesses find, build and implement technology that makes a real difference — whether that is a CRM, a custom platform, a client portal or something more specific to how you work.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <Link href="/contact" className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded" style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
                Book a conversation
              </Link>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-12" style={{ fontFamily: 'Fraunces, serif' }}>
              What we do
            </h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whatWeDo.map((item, i) => (
              <RevealAnimation key={i} delay={(i % 2 + 1) as 1 | 2}>
                <div className="p-6 hover:bg-light transition-colors" style={{ border: '1px solid var(--border)', borderRadius: '8px' }}>
                  <h3 className="text-base font-semibold text-ink mb-2" style={{ fontFamily: 'Fraunces, serif' }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>{item.description}</p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      <CTABand headline="Not sure what technology you need? Start there." body="We will help you figure out what is right for your business." buttonLabel="Book a conversation" buttonHref="/contact" />
    </>
  )
}
