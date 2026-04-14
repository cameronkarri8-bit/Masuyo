import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'Web Design & Development',
  description: 'Websites that work as hard as you do. Fast, modern, mobile-friendly websites built to convert visitors into customers.',
  openGraph: {
    title: 'Web Design & Development – Masuyo Digital',
    description: 'Websites that work as hard as you do. Fast, modern, mobile-friendly websites built to convert visitors into customers.',
    url: 'https://masuyodigital.com/services/web-design',
  },
  alternates: { canonical: 'https://masuyodigital.com/services/web-design' },
}

const features = [
  { title: 'Fast loading', description: 'Built lean and hosted on our own servers for strong performance.' },
  { title: 'Mobile first', description: 'Designed to work perfectly on every device.' },
  { title: 'SEO ready', description: 'Built with search engines in mind from day one.' },
  { title: 'Easy to manage', description: 'CMS options available so your team can update content.' },
  { title: 'Secure', description: 'SSL included, maintained and monitored.' },
  { title: 'Built around you', description: 'Designed around your business goals, not a template.' },
]

const whatWeBuild = [
  'Marketing and brochure websites',
  'E-commerce stores',
  'Landing pages and lead generation pages',
  'Web applications and client portals',
  'CMS-powered websites with full content control',
]

export default function WebDesignPage() {
  return (
    <>
      <section className="crosshatch-bg pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                Web Design & Development
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'Fraunces, serif' }}>
                Websites that work as hard as you do.
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                Your website is often the first thing a potential customer sees. It needs to represent your business well, load fast, work on every device, and give visitors a reason to get in touch. We build websites that do all of that, without the bloat and without the faff.
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

      {/* Features */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-12" style={{ fontFamily: 'Fraunces, serif' }}>
              What every site includes
            </h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 -m-px items-stretch">
            {features.map((f, i) => (
              <RevealAnimation key={i} delay={(i % 3 + 1) as 1 | 2 | 3}>
                <div className="p-6 hover:bg-light transition-colors h-full flex flex-col gap-3" style={{ border: '1px solid var(--border)' }}>
                  <div className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(53,173,223,0.1)', color: 'var(--blue)' }}>
                    {i === 0 && <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="8" cy="9" r="6" stroke="currentColor" strokeWidth="1.5"/></svg>}
                    {i === 1 && <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="2" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M5 15h6M8 12v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>}
                    {i === 2 && <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/><path d="M5.5 8l2 2 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    {i === 3 && <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M5 8h6M8 5v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>}
                    {i === 4 && <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    {i === 5 && <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M3 14c0-2.761 2.239-5 5-5s5 2.239 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>}
                  </div>
                  <h3 className="text-base font-semibold text-ink" style={{ fontFamily: 'Fraunces, serif' }}>{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>{f.description}</p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* What we build */}
      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <RevealAnimation>
              <h2 className="text-3xl font-semibold text-ink mb-4" style={{ fontFamily: 'Fraunces, serif' }}>
                What we build
              </h2>
              <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                From simple brochure sites to complex web applications, we cover the full spectrum.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <ul className="flex flex-col gap-3">
                {whatWeBuild.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm pb-3" style={{ borderBottom: i < whatWeBuild.length - 1 ? '1px solid var(--border)' : 'none', fontFamily: 'Geist, sans-serif', color: 'var(--ink)' }}>
                    <span style={{ color: 'var(--blue)' }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <CTABand headline="Ready to talk about your website?" body="Tell us what you need. We will handle the rest." buttonLabel="Get in touch" buttonHref="/contact" />
    </>
  )
}
