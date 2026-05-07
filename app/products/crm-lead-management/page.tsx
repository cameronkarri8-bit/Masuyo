import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'Custom CRM and Lead Management UK | Masuyo Digital',
  description: 'A lightweight custom CRM built around how your business actually works. Track leads, manage relationships, and close more deals without the bloat.',
  openGraph: {
    title: 'Custom CRM and Lead Management UK | Masuyo Digital',
    description: 'A lightweight custom CRM built around how your business actually works.',
    url: 'https://masuyodigital.com/products/crm-lead-management',
  },
  alternates: { canonical: 'https://masuyodigital.com/products/crm-lead-management' },
}

const features = [
  { title: 'Lead Pipeline and Stages', description: 'A visual pipeline built around your actual sales process, not a generic template.' },
  { title: 'Contact and Company Records', description: 'Full contact history, notes, files, and communication logs in one place.' },
  { title: 'Task and Follow-Up Reminders', description: 'Never let a lead go cold. Automated reminders and task assignment built in.' },
  { title: 'Reporting and Dashboards', description: 'See your pipeline health, conversion rates, and revenue forecast at a glance.' },
  { title: 'Email and Activity Tracking', description: 'Log calls, emails, and meetings against each contact automatically.' },
  { title: 'Custom Fields and Workflows', description: 'Build the data structure and automation rules your business actually needs.' },
]

export default function CrmLeadManagementPage() {
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
                A CRM Built Around Your Business
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-10" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                A lightweight custom CRM built around how your business actually works. Track leads, manage relationships, and close more deals without the bloat.
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
        headline="Ready for a CRM that actually fits your business?"
        body="Tell us how you manage leads today. We will build the system around your process."
        buttonLabel="Get a Quote"
        buttonHref="/contact"
      />
    </>
  )
}
