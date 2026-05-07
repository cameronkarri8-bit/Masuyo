import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'Bespoke Technology Solutions UK | Masuyo Digital',
  description: 'We build bespoke technology products from scratch. If your idea does not fit a template, we design and build it from the ground up.',
  openGraph: {
    title: 'Bespoke Technology Solutions UK | Masuyo Digital',
    description: 'We build bespoke technology products from scratch.',
    url: 'https://masuyodigital.com/products/bespoke',
  },
  alternates: { canonical: 'https://masuyodigital.com/products/bespoke' },
}

const products = [
  { title: 'Custom Learning Platform', description: 'Branded course platform and coaching academy.', href: '/products/custom-learning-platform' },
  { title: 'Client Portal', description: 'Premium branded space for your clients to access work and files.', href: '/products/client-portal' },
  { title: 'Community Platform', description: 'Private branded community your members will actually use.', href: '/products/community-platform' },
  { title: 'CRM and Lead Management', description: 'Lightweight custom CRM built around your sales process.', href: '/products/crm-lead-management' },
]

const capabilities = [
  'Custom web applications and internal tools',
  'Marketplace and multi-vendor platforms',
  'Booking and scheduling systems',
  'Subscription and membership platforms',
  'Data dashboards and reporting tools',
  'Complex API and third-party integrations',
  'Workflow automation and business systems',
  'Mobile applications for iOS and Android',
]

export default function BespokePage() {
  return (
    <>
      <section className="crosshatch-bg pt-16 pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-32">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                Bespoke Technology
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'Fraunces, serif' }}>
                We Build What Others Cannot Template
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-10" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                If your idea does not fit a standard platform or template, we design and build it from the ground up. Custom software built exactly for your business.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <Link href="/contact" className="inline-block text-center text-sm font-semibold text-white px-6 py-3.5 rounded" style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
                Book a Discovery Call
              </Link>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <RevealAnimation>
              <div>
                <h2 className="text-3xl font-semibold text-ink mb-6" style={{ fontFamily: 'Fraunces, serif' }}>
                  What we can build
                </h2>
                <ul className="flex flex-col gap-3">
                  {capabilities.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm" style={{ fontFamily: 'Geist, sans-serif', color: 'var(--ink)' }}>
                      <span style={{ color: 'var(--blue)', marginTop: 2 }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <div>
                <h2 className="text-3xl font-semibold text-ink mb-6" style={{ fontFamily: 'Fraunces, serif' }}>
                  Ready-made products
                </h2>
                <p className="text-sm mb-6" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: 1.7 }}>
                  If your needs fit one of our existing product types, we can start from a proven foundation and customise it for you.
                </p>
                <div className="flex flex-col gap-4">
                  {products.map((p, i) => (
                    <Link key={i} href={p.href} className="flex items-center justify-between p-4 rounded-lg transition-colors hover:bg-light" style={{ border: '1px solid var(--border)' }}>
                      <div>
                        <p className="text-sm font-semibold text-ink" style={{ fontFamily: 'Fraunces, serif' }}>{p.title}</p>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>{p.description}</p>
                      </div>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: 'var(--blue)', flexShrink: 0 }}>
                        <path d="M3 7h8M7.5 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <CTABand
        headline="Have an idea that needs a custom build?"
        body="Book a discovery call. We will listen, ask the right questions, and tell you exactly what it would take to build it."
        buttonLabel="Book a Discovery Call"
        buttonHref="/contact"
      />
    </>
  )
}
