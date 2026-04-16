'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'
import RevealAnimation from '@/components/RevealAnimation'

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch('https://formspree.io/f/xlgpogqk', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="crosshatch-bg pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-2xl">
            <RevealAnimation>
              <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4 leading-tight" style={{ fontFamily: 'Fraunces, serif' }}>
                Let us talk about your business.
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <p className="text-lg" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                No hard sell. No lengthy forms. Just an honest conversation about where you are and how we might be able to help.
              </p>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Form + info */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Form */}
            <RevealAnimation>
              {status === 'success' ? (
                <div
                  className="p-8 rounded-lg text-center"
                  style={{ background: 'var(--light)', border: '1px solid var(--border)' }}
                >
                  <svg className="mx-auto mb-4" width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="20" fill="var(--blue)" fillOpacity="0.1"/>
                    <path d="M12 20l5.5 5.5 10.5-11" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <h3 className="text-xl font-semibold text-ink mb-2" style={{ fontFamily: 'Fraunces, serif' }}>Message sent</h3>
                  <p className="text-sm" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                    Thanks for getting in touch. We will be back with you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <input type="hidden" name="source" value="contact_form" />
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>
                      Name *
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      className="w-full px-4 py-3 text-sm rounded outline-none transition-colors"
                      style={{
                        border: '1px solid var(--border)',
                        fontFamily: 'Geist, sans-serif',
                        color: 'var(--ink)',
                        background: 'var(--white)',
                      }}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>
                      Business name
                    </label>
                    <input
                      name="business"
                      type="text"
                      className="w-full px-4 py-3 text-sm rounded outline-none transition-colors"
                      style={{
                        border: '1px solid var(--border)',
                        fontFamily: 'Geist, sans-serif',
                        color: 'var(--ink)',
                        background: 'var(--white)',
                      }}
                      placeholder="Optional"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>
                      Email *
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      className="w-full px-4 py-3 text-sm rounded outline-none transition-colors"
                      style={{
                        border: '1px solid var(--border)',
                        fontFamily: 'Geist, sans-serif',
                        color: 'var(--ink)',
                        background: 'var(--white)',
                      }}
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>
                      What are you looking to do? *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      className="w-full px-4 py-3 text-sm rounded outline-none transition-colors resize-none"
                      style={{
                        border: '1px solid var(--border)',
                        fontFamily: 'Geist, sans-serif',
                        color: 'var(--ink)',
                        background: 'var(--white)',
                      }}
                      placeholder="Tell us a bit about your business and what you are looking for..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>
                      How did you hear about us?
                    </label>
                    <select
                      name="referral"
                      className="w-full px-4 py-3 text-sm rounded outline-none transition-colors"
                      style={{
                        border: '1px solid var(--border)',
                        fontFamily: 'Geist, sans-serif',
                        color: 'var(--ink)',
                        background: 'var(--white)',
                      }}
                    >
                      <option value="">Select an option</option>
                      <option value="google">Google</option>
                      <option value="social">Social media</option>
                      <option value="word-of-mouth">Word of mouth</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  {status === 'error' && (
                    <p className="text-sm" style={{ color: '#dc2626', fontFamily: 'Geist, sans-serif' }}>
                      Something went wrong. Please try again or email us directly.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="text-sm font-semibold text-white px-6 py-3.5 rounded transition-opacity disabled:opacity-60"
                    style={{ background: 'var(--navy)', fontFamily: 'Geist, sans-serif' }}
                  >
                    {status === 'submitting' ? 'Sending...' : 'Send message'}
                  </button>
                </form>
              )}
            </RevealAnimation>

            {/* Contact info */}
            <RevealAnimation delay={1}>
              <div className="flex flex-col gap-8">
                <div>
                  <h2 className="text-2xl font-semibold text-ink mb-4" style={{ fontFamily: 'Fraunces, serif' }}>
                    Or drop us an email
                  </h2>
                  <a
                    href="mailto:hello@masuyodigital.com"
                    className="text-base font-medium transition-colors hover:opacity-80"
                    style={{ color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}
                  >
                    hello@masuyodigital.com
                  </a>
                </div>
                <div
                  className="p-6 rounded-lg"
                  style={{ background: 'var(--light)', border: '1px solid var(--border)' }}
                >
                  <h3 className="text-base font-semibold text-ink mb-3" style={{ fontFamily: 'Fraunces, serif' }}>
                    What to expect
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {[
                      'We reply within one business day',
                      'No pressure, no hard sell',
                      'An honest conversation about what you actually need',
                      'Clear next steps if we are a good fit',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                        <svg className="flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7l3 3 6-6" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>
    </>
  )
}
