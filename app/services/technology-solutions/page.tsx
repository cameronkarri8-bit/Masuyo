import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'Technology Solutions',
  description: 'The right technology changes everything. CRM systems, custom platforms, integrations and technology audits.',
  openGraph: {
    title: 'Technology Solutions | Masuyo Digital',
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
      <section className="bg-navy py-24 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div>
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Technology Solutions
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl text-white mb-6">
                The right technology changes everything.
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.7' }}>
                Most businesses are using a fraction of what technology could do for them. Some are using the wrong tools entirely. We help businesses find, build and implement technology that makes a real difference: whether that is a CRM, a custom platform, a client portal or something more specific to how you work.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <Link href="/contact" className="btn-primary">
                Get an instant estimate
              </Link>
            </RevealAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl text-ink mb-12">
              What we do
            </h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {whatWeDo.map((item, i) => (
              <RevealAnimation key={i} delay={(i % 2 + 1) as 1 | 2}>
                <div className="p-6 hover:bg-blue-tint transition-colors h-full flex flex-col gap-3" style={{ border: '1px solid var(--border)', borderRadius: '8px' }}>
                  <div
                    className="w-8 h-8 rounded flex items-center justify-center text-xs font-semibold flex-shrink-0"
                    style={{ background: 'rgba(53,173,223,0.1)', color: 'var(--blue)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-base font-semibold text-ink">{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)' }}>{item.description}</p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      <CTABand headline="Not sure what technology you need? Start there." body="We will help you figure out what is right for your business." />
    </>
  )
}
