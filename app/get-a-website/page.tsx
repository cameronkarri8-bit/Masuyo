'use client'

import { useState } from 'react'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'

const steps = [
  { number: '01', title: 'Choose your package below.' },
  { number: '02', title: 'Complete a short brief telling us about your business.' },
  { number: '03', title: 'We get to work. No lengthy calls, no back and forth.' },
  { number: '04', title: 'Your site is live within 7 working days.' },
]

const packages = [
  {
    name: 'Starter',
    price: '£249',
    description: 'A clean, professional website for businesses getting online.',
    features: ['Up to 5 pages', 'Contact form', 'Mobile ready', 'SEO setup', 'Hosted by us'],
    cta: 'Get started',
    featured: false,
  },
  {
    name: 'Growth',
    price: '£XXX',
    description: 'For businesses that need more.',
    features: ['Up to 10 pages', 'Blog setup', 'Lead capture', 'Analytics', 'Priority delivery'],
    cta: 'Get started',
    featured: true,
  },
  {
    name: 'Custom',
    price: 'Let\'s talk',
    description: 'Got something more specific in mind? Get in touch.',
    features: ['Tailored to your needs', 'Custom functionality', 'Full consultation', 'Bespoke quote'],
    cta: 'Contact us',
    featured: false,
  },
]

const included = [
  'Built by a real team, not a template generator',
  'Hosted on our own servers',
  'SSL certificate included',
  'Mobile and tablet optimised',
  'Basic SEO setup',
  'Delivered in 7 working days',
]

const faqs = [
  {
    q: 'What do I need to provide?',
    a: 'Just a short brief about your business, your logo if you have one, and any copy or images you want included. We can advise on the rest.',
  },
  {
    q: 'What if I do not have a logo or copy?',
    a: 'We can help with that. Just mention it when you submit your brief.',
  },
  {
    q: 'What happens after the 7 days?',
    a: 'Your site goes live. We then offer ongoing hosting and support packages if you want us to stay involved.',
  },
  {
    q: 'Can I make changes after?',
    a: 'Yes. We offer a revision round as standard and ongoing support if needed.',
  },
]

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      <button
        className="w-full text-left py-5 flex items-center justify-between gap-4"
        onClick={() => setOpen(!open)}
      >
        <span className="text-sm font-semibold text-ink" style={{ fontFamily: 'Geist, sans-serif' }}>{q}</span>
        <span className="flex-shrink-0 transition-transform" style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)', color: 'var(--mid)' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </span>
      </button>
      <div className={`accordion-content ${open ? 'open' : ''}`}>
        <p className="pb-5 text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>{a}</p>
      </div>
    </div>
  )
}

export default function GetAWebsitePage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--blue)' }} className="pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-3xl">
            <RevealAnimation>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-4 leading-tight" style={{ fontFamily: 'Fraunces, serif' }}>
                Your website, live in 7 working days.
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <p className="text-xl" style={{ color: 'rgba(255,255,255,0.85)', fontFamily: 'Geist, sans-serif' }}>
                Professional, fast and built around your business. Starting at £249.
              </p>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-12" style={{ fontFamily: 'Fraunces, serif' }}>
              How it works
            </h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <RevealAnimation key={i} delay={(i % 4 + 1) as 1 | 2 | 3 | 4}>
                <div className="flex flex-col gap-3">
                  <span className="text-3xl font-semibold" style={{ color: 'var(--blue)', fontFamily: 'Fraunces, serif' }}>{step.number}</span>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>{step.title}</p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-12" style={{ fontFamily: 'Fraunces, serif' }}>
              Choose your package
            </h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <RevealAnimation key={pkg.name} delay={(i + 1) as 1 | 2 | 3}>
                <div
                  className="p-8 rounded-lg flex flex-col gap-6 relative"
                  style={{
                    background: pkg.featured ? 'var(--navy)' : 'var(--white)',
                    border: pkg.featured ? 'none' : '1px solid var(--border)',
                  }}
                >
                  {pkg.featured && (
                    <span
                      className="absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 rounded"
                      style={{ background: 'var(--blue)', color: 'var(--white)', fontFamily: 'Geist, sans-serif' }}
                    >
                      Most popular
                    </span>
                  )}
                  <div>
                    <p
                      className="text-xs font-semibold uppercase tracking-widest mb-2"
                      style={{ color: pkg.featured ? 'rgba(255,255,255,0.5)' : 'var(--mid)', fontFamily: 'Geist, sans-serif' }}
                    >
                      {pkg.name}
                    </p>
                    <p
                      className="text-4xl font-semibold mb-2"
                      style={{ fontFamily: 'Fraunces, serif', color: pkg.featured ? 'var(--white)' : 'var(--ink)' }}
                    >
                      {pkg.price}
                    </p>
                    <p
                      className="text-sm"
                      style={{ color: pkg.featured ? 'rgba(255,255,255,0.65)' : 'var(--mid)', fontFamily: 'Geist, sans-serif' }}
                    >
                      {pkg.description}
                    </p>
                  </div>
                  <ul className="flex flex-col gap-2 flex-1">
                    {pkg.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm" style={{ color: pkg.featured ? 'rgba(255,255,255,0.8)' : 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7l3 3 6-6" stroke={pkg.featured ? 'rgba(255,255,255,0.5)' : 'var(--blue)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  {pkg.name === 'Custom' ? (
                    <Link
                      href="/contact"
                      className="block text-center text-sm font-semibold px-6 py-3.5 rounded transition-colors"
                      style={{ background: 'var(--light)', color: 'var(--navy)', fontFamily: 'Geist, sans-serif' }}
                    >
                      {pkg.cta}
                    </Link>
                  ) : (
                    <a
                      href="https://formspree.io/f/xlgpogqk"
                      className="block text-center text-sm font-semibold px-6 py-3.5 rounded transition-colors"
                      style={{
                        background: pkg.featured ? 'var(--blue)' : 'var(--navy)',
                        color: 'var(--white)',
                        fontFamily: 'Geist, sans-serif',
                      }}
                    >
                      {pkg.cta}
                    </a>
                  )}
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <RevealAnimation>
              <h2 className="text-3xl font-semibold text-ink mb-4" style={{ fontFamily: 'Fraunces, serif' }}>
                What is included in every package
              </h2>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <ul className="flex flex-col gap-3">
                {included.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm pb-3" style={{ borderBottom: i < included.length - 1 ? '1px solid var(--border)' : 'none', fontFamily: 'Geist, sans-serif', color: 'var(--ink)' }}>
                    <span style={{ color: 'var(--blue)', flexShrink: 0 }}>
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

      {/* FAQ */}
      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <RevealAnimation>
              <h2 className="text-3xl font-semibold text-ink mb-10" style={{ fontFamily: 'Fraunces, serif' }}>
                Questions
              </h2>
            </RevealAnimation>
            <div style={{ borderTop: '1px solid var(--border)' }}>
              {faqs.map((faq, i) => (
                <FAQ key={i} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <RevealAnimation>
            <h2 className="text-2xl font-semibold text-ink mb-4" style={{ fontFamily: 'Fraunces, serif' }}>
              Not ready to order yet? That is fine.
            </h2>
          </RevealAnimation>
          <RevealAnimation delay={1}>
            <Link href="/contact" className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded" style={{ background: 'var(--navy)', fontFamily: 'Geist, sans-serif' }}>
              Ask us a question
            </Link>
          </RevealAnimation>
        </div>
      </section>
    </>
  )
}
