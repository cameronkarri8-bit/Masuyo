'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'
import RevealAnimation from '@/components/RevealAnimation'
import Section from '@/components/Section'

/** Shared field styling, so every control matches without inline styles. */
const FIELD =
  'w-full rounded-2xl border-2 border-border bg-white px-4 py-3.5 font-sans text-base text-ink outline-none transition-colors placeholder:text-mid/60 focus:border-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue'

const LABEL = 'mb-2 block font-sans text-sm font-semibold text-ink'

const WHAT_TO_EXPECT = [
  'We reply within one business day',
  'No pressure, no hard sell',
  'An honest conversation about what you actually need',
  'Clear next steps if we are a good fit',
]

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  // Formspree wiring is unchanged.
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
      {/* ---------------- Hero ---------------- */}
      <Section bg="white" width="wide" tight>
        <RevealAnimation>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-blue2">
            Contact
          </p>
          <h1 className="mt-5 max-w-[15ch] text-6xl text-navy md:text-7xl lg:text-8xl">
            Let us talk about your business.
          </h1>
          <p className="mt-8 max-w-[52ch] font-sans text-lg leading-relaxed text-mid">
            No hard sell. No lengthy forms. Just an honest conversation about where you are
            and how we might be able to help.
          </p>
        </RevealAnimation>
      </Section>

      {/* ---------------- Form and info ---------------- */}
      <Section bg="tint" width="wide" flush className="pb-24 md:pb-32">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
          {/* ---------- Form ---------- */}
          <RevealAnimation>
            <div className="rounded-card bg-white p-8 md:p-10">
              {status === 'success' ? (
                <div className="py-10 text-center">
                  <svg className="mx-auto mb-6" width="56" height="56" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                    <circle cx="20" cy="20" r="20" fill="var(--blue)" fillOpacity="0.12" />
                    <path d="M12 20l5.5 5.5 10.5-11" stroke="var(--blue)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <h2 className="text-3xl text-navy">Message sent.</h2>
                  <p className="mx-auto mt-4 max-w-[36ch] font-sans text-base leading-relaxed text-mid">
                    Thanks for getting in touch. We will be back with you within one
                    business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <input type="hidden" name="source" value="contact_form" />

                  <div>
                    <label htmlFor="name" className={LABEL}>
                      Name *
                    </label>
                    <input id="name" name="name" type="text" required className={FIELD} placeholder="Your name" />
                  </div>

                  <div>
                    <label htmlFor="business" className={LABEL}>
                      Business name
                    </label>
                    <input id="business" name="business" type="text" className={FIELD} placeholder="Optional" />
                  </div>

                  <div>
                    <label htmlFor="email" className={LABEL}>
                      Email *
                    </label>
                    <input id="email" name="email" type="email" required className={FIELD} placeholder="you@example.com" />
                  </div>

                  <div>
                    <label htmlFor="message" className={LABEL}>
                      What are you looking to do? *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className={`${FIELD} resize-none`}
                      placeholder="Tell us a bit about your business and what you are looking for..."
                    />
                  </div>

                  <div>
                    <label htmlFor="referral" className={LABEL}>
                      How did you hear about us?
                    </label>
                    <select id="referral" name="referral" className={FIELD}>
                      <option value="">Select an option</option>
                      <option value="google">Google</option>
                      <option value="social">Social media</option>
                      <option value="word-of-mouth">Word of mouth</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {status === 'error' && (
                    <p role="alert" className="font-sans text-sm font-medium text-[#dc2626]">
                      Something went wrong. Please try again or email us directly at
                      hello@masuyodigital.com.
                    </p>
                  )}

                  <div className="mt-2">
                    <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full disabled:opacity-60">
                      {status === 'submitting' ? 'Sending...' : 'Send message'}
                    </button>
                    {/* Response time promise, sat directly under the submit button. */}
                    <p className="mt-4 text-center font-sans text-sm text-mid">
                      We reply within one business day. Usually the same afternoon.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </RevealAnimation>

          {/* ---------- Info ---------- */}
          <RevealAnimation delay={1}>
            <div className="flex flex-col gap-5">
              <div className="rounded-card bg-navy p-8 md:p-10">
                <h2 className="text-3xl text-white">Or just email us.</h2>
                <a
                  href="mailto:hello@masuyodigital.com"
                  className="mt-5 inline-block font-sans text-lg font-semibold text-blue transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
                >
                  hello@masuyodigital.com
                </a>
              </div>

              <div className="rounded-card bg-white p-8 md:p-10">
                <h2 className="text-2xl text-navy">What to expect</h2>
                <ul className="mt-6 flex flex-col gap-4">
                  {WHAT_TO_EXPECT.map(item => (
                    <li key={item} className="flex gap-3 font-sans text-base leading-relaxed text-ink">
                      <svg
                        className="mt-1 flex-shrink-0 text-blue"
                        width="18"
                        height="18"
                        viewBox="0 0 14 14"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </RevealAnimation>
        </div>
      </Section>
    </>
  )
}
