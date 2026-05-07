import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'Custom Client Portal Development UK | Masuyo Digital',
  description: 'Give your clients a premium branded space to access work, files, and project updates. A fully custom client portal built for your business.',
  openGraph: {
    title: 'Custom Client Portal Development UK | Masuyo Digital',
    description: 'Give your clients a premium branded space to access work, files, and project updates.',
    url: 'https://masuyodigital.com/products/client-portal',
  },
  alternates: { canonical: 'https://masuyodigital.com/products/client-portal' },
}

const features = [
  { title: 'Branded Client Login', description: 'Your domain, your colours, your logo. A portal that looks like part of your business.' },
  { title: 'Project and Task Tracking', description: 'Clients see exactly where their project stands without needing to email you.' },
  { title: 'File and Document Sharing', description: 'Secure upload and download of deliverables, contracts, and assets.' },
  { title: 'Invoices and Payments', description: 'Send invoices and collect payments directly through the portal.' },
  { title: 'Messaging and Updates', description: 'Keep all client communication in one place, tied to their project.' },
  { title: 'Admin Dashboard', description: 'Manage all clients, projects, and activity from one clean control panel.' },
]

export default function ClientPortalPage() {
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
                We Build Custom Client Portals
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-10" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                Give your clients a premium branded space to access work, files, and updates. Fully custom, fully owned. No monthly platform fees.
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
        headline="Ready to give your clients a better experience?"
        body="Tell us how you work and what your clients need. We will build a portal that fits."
        buttonLabel="Get a Quote"
        buttonHref="/contact"
      />
    </>
  )
}
