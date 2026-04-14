import type { Metadata } from 'next'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'We are Masuyo. A digital agency that does things properly. Based in the UK, working globally.',
  openGraph: {
    title: 'About Masuyo Digital',
    description: 'We are Masuyo. A digital agency that does things properly.',
    url: 'https://masuyodigital.com/about',
  },
  alternates: { canonical: 'https://masuyodigital.com/about' },
}

const values = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 2.5a8.5 8.5 0 100 17 8.5 8.5 0 000-17z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M11 7v4.5l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    title: 'We are honest',
    body: 'If something will not work, we say so. We would rather lose a project than take your money for something that will not deliver results.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 11h14M11 4l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Results over deliverables',
    body: 'A beautiful website that generates no enquiries is a failure. We measure success by business outcomes, not by what we have produced.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="3" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M7 11l3 3 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'No jargon',
    body: 'We explain what we are doing and why in plain language. You should always understand exactly where your money is going.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="8" r="4" stroke="currentColor" strokeWidth="1.6" />
        <path d="M4 19c0-3.866 3.134-7 7-7h.5a7 7 0 017 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    title: 'Direct relationships',
    body: 'No account managers, no handoffs to offshore teams. The people you talk to are the people doing the work.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 3v4M11 15v4M3 11h4M15 11h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="11" cy="11" r="3" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
    title: 'Everything connected',
    body: 'Your website, marketing and technology should work together. Siloed digital services produce siloed results. We join it all up.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M5 17L9 7l4 6 3-4 3 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Long-term thinking',
    body: 'We build digital assets that grow in value over time. SEO, content, technology: the compounding effect of doing this properly is significant.',
  },
]

const milestones = [
  {
    year: '2022',
    title: 'Founded',
    body: 'Masuyo was started with one principle: build digital things that actually deliver results for the businesses behind them.',
  },
  {
    year: '2023',
    title: 'First international clients',
    body: 'Projects expanded beyond the UK as word spread. We began working with businesses in Europe and North America.',
  },
  {
    year: '2024',
    title: 'Full-service expansion',
    body: 'We formalised our automation and technology solutions offer, giving clients access to a complete digital operation under one roof.',
  },
  {
    year: '2025',
    title: 'Growing and focused',
    body: 'We continue to grow while deliberately staying small. Better work, not more clients. That is the plan.',
  },
]

const stats = [
  { value: '10+', label: 'Businesses helped' },
  { value: '2', label: 'Countries served' },
  { value: '100%', label: 'Work done in-house' },
  { value: '7 days', label: 'Average site delivery' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="crosshatch-bg pt-16 pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-3xl">
            <RevealAnimation>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight"
                style={{ fontFamily: 'Fraunces, serif' }}
              >
                We are Masuyo. A digital agency that does things properly.
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <p className="text-lg" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                Based in the UK. Working globally. No outsourcing, no bloated retainers, no fluff.
              </p>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: '1px', background: 'var(--border)', border: '1px solid var(--border)' }}>
            {stats.map((stat, i) => (
              <div
                key={i}
                className="py-10 px-6 text-center flex flex-col items-center justify-center"
                style={{ background: 'var(--white)' }}
              >
                <p className="text-4xl font-semibold mb-1" style={{ fontFamily: 'Fraunces, serif', color: 'var(--blue)' }}>
                  {stat.value}
                </p>
                <p className="text-xs" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                Our story
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold text-ink mb-6" style={{ fontFamily: 'Fraunces, serif' }}>
                Why we started, and why it matters
              </h2>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <p className="text-base mb-5" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                We started Masuyo because we saw too many businesses being sold digital services they did not understand, did not need, or that simply did not deliver. Overpromised SEO campaigns. Websites built by the cheapest contractor. Retainers for reports nobody reads.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-base mb-5" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                We wanted to do it differently. Honest work, delivered properly, by a team that cares whether it works.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-base" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                We work with businesses of all sizes, from sole traders getting online for the first time to established companies scaling their digital presence. What they share is that they want results, not jargon, and a team they can actually trust to get it done.
              </p>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 relative overflow-hidden" style={{ background: 'var(--light)' }}>
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg viewBox="0 0 1440 600" fill="none" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
            <circle cx="0" cy="600" r="500" stroke="rgba(26,41,57,0.06)" strokeWidth="1" fill="none" />
            <circle cx="0" cy="600" r="350" stroke="rgba(26,41,57,0.05)" strokeWidth="1" fill="none" />
            <circle cx="1440" cy="0" r="400" stroke="rgba(53,173,223,0.08)" strokeWidth="1" fill="none" />
            <circle cx="1440" cy="0" r="250" stroke="rgba(53,173,223,0.06)" strokeWidth="1" fill="none" />
            <line x1="1100" y1="0" x2="1440" y2="400" stroke="rgba(53,173,223,0.05)" strokeWidth="1" />
            <line x1="1200" y1="0" x2="1440" y2="300" stroke="rgba(53,173,223,0.04)" strokeWidth="1" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-xl mb-14">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                How we work
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold text-ink" style={{ fontFamily: 'Fraunces, serif' }}>
                What we believe in
              </h2>
            </RevealAnimation>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <RevealAnimation key={i} delay={(i % 3) as 0 | 1 | 2}>
                <div
                  className="p-6 rounded-lg h-full"
                  style={{ background: 'var(--white)', border: '1px solid var(--border)', borderLeft: '3px solid var(--blue)' }}
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded mb-4"
                    style={{ background: 'var(--light)', color: 'var(--navy)' }}
                  >
                    {v.icon}
                  </div>
                  <h3 className="text-base font-semibold text-ink mb-2" style={{ fontFamily: 'Fraunces, serif' }}>
                    {v.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.75' }}>
                    {v.body}
                  </p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-14">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                Our journey
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold text-ink" style={{ fontFamily: 'Fraunces, serif' }}>
                How we got here
              </h2>
            </RevealAnimation>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-6 md:left-8 top-0 bottom-0 w-px hidden sm:block"
              style={{ background: 'var(--border)' }}
            />
            <div className="flex flex-col gap-0">
              {milestones.map((m, i) => (
                <RevealAnimation key={i} delay={(i % 3) as 0 | 1 | 2}>
                  <div className="relative flex gap-8 pb-12">
                    {/* Dot */}
                    <div className="relative flex-shrink-0 hidden sm:flex items-start justify-center w-16">
                      <div
                        className="w-4 h-4 rounded-full mt-1 z-10"
                        style={{ background: 'var(--blue)', border: '2px solid var(--white)', boxShadow: '0 0 0 2px var(--blue)' }}
                      />
                    </div>
                    <div className="flex-1 sm:pt-0 pt-2">
                      <span
                        className="text-xs font-semibold uppercase tracking-widest mb-1 block"
                        style={{ color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}
                      >
                        {m.year}
                      </span>
                      <h3 className="text-lg font-semibold text-ink mb-2" style={{ fontFamily: 'Fraunces, serif' }}>
                        {m.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.75' }}>
                        {m.body}
                      </p>
                    </div>
                  </div>
                </RevealAnimation>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services prompt */}
      <section className="py-16" style={{ background: 'var(--light)', borderTop: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <RevealAnimation>
                <h2 className="text-2xl font-semibold text-ink mb-2" style={{ fontFamily: 'Fraunces, serif' }}>
                  Want to work with us?
                </h2>
              </RevealAnimation>
              <RevealAnimation delay={1}>
                <p className="text-sm" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                  Tell us about your business and what you need. We will take it from there.
                </p>
              </RevealAnimation>
            </div>
            <RevealAnimation delay={2}>
              <div className="flex gap-3">
                <Link href="/start-a-project"
                  className="inline-block text-sm font-semibold px-5 py-2.5 rounded"
                  style={{ background: 'var(--blue)', color: 'var(--white)', fontFamily: 'Geist, sans-serif' }}>
                  Start a project
                </Link>
                <Link href="/services"
                  className="inline-block text-sm font-semibold px-5 py-2.5 rounded"
                  style={{ border: '1px solid var(--border)', color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>
                  Our services
                </Link>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
