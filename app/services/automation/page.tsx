import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'Automation',
  description: 'Stop doing manually what a machine can do for you. We find and automate the tasks eating your time.',
  openGraph: {
    title: 'Automation – Masuyo Digital',
    description: 'Stop doing manually what a machine can do for you.',
    url: 'https://masuyodigital.com/services/automation',
  },
  alternates: { canonical: 'https://masuyodigital.com/services/automation' },
}

const whatWeAutomate = [
  {
    title: 'Lead and enquiry handling',
    description: 'New enquiries automatically logged, assigned and followed up.',
  },
  {
    title: 'Client onboarding',
    description: 'Documents, welcome emails and setup tasks triggered automatically.',
  },
  {
    title: 'Invoicing and payments',
    description: 'Automated invoices, payment reminders and reconciliation.',
  },
  {
    title: 'Reporting',
    description: 'Regular reports generated and delivered without anyone lifting a finger.',
  },
  {
    title: 'Data and system sync',
    description: 'Information flowing automatically between your tools without manual input.',
  },
]

export default function AutomationPage() {
  return (
    <>
      <section className="crosshatch-bg pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                Automation
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'Fraunces, serif' }}>
                Stop doing manually what a machine can do for you.
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                Every business has tasks that eat time without adding value. Chasing invoices, moving data between systems, sending follow-up emails, updating spreadsheets. We find those tasks and automate them, so your team can focus on the work that actually matters.
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

      {/* What we automate */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-12" style={{ fontFamily: 'Fraunces, serif' }}>
              What we automate
            </h2>
          </RevealAnimation>
          <div className="flex flex-col divide-y" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
            {whatWeAutomate.map((item, i) => (
              <RevealAnimation key={i} delay={(i % 3 + 1) as 1 | 2 | 3}>
                <div className="py-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <h3 className="text-base font-semibold text-ink" style={{ fontFamily: 'Fraunces, serif' }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed md:col-span-2" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>{item.description}</p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <RevealAnimation>
              <h2 className="text-3xl font-semibold text-ink mb-6" style={{ fontFamily: 'Fraunces, serif' }}>
                How we work
              </h2>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                We start by mapping out how your business currently works. Then we identify where automation saves the most time and build it. Most clients are surprised by how quickly the time savings add up.
              </p>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <CTABand headline="Let us find the time you are losing." body="A short conversation is usually enough to identify the big wins." buttonLabel="Get in touch" buttonHref="/contact" />
    </>
  )
}
