'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'

export default function VenueContactForm() {
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

  if (status === 'success') {
    return (
      <div
        className="p-8 rounded-lg text-center"
        style={{ background: 'var(--white)', border: '1px solid var(--border)' }}
      >
        <svg className="mx-auto mb-4" width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="20" fill="var(--blue)" fillOpacity="0.1" />
          <path d="M12 20l5.5 5.5 10.5-11" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h3 className="text-xl font-semibold text-ink mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>Message sent</h3>
        <p className="text-sm" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
          Thanks for getting in touch. We will get back to you within a day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Hidden fields to identify the enquiry source */}
      <input type="hidden" name="_subject" value="New enquiry from Lifestyle Venues page" />
      <input type="hidden" name="source" value="lifestyle-venues" />

      <div>
        <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>
          Your name *
        </label>
        <input
          name="name"
          type="text"
          required
          className="w-full px-4 py-3 text-sm rounded outline-none transition-colors"
          style={{ border: '1px solid var(--border)', fontFamily: 'Geist, sans-serif', color: 'var(--ink)', background: 'var(--white)' }}
          placeholder="Your name"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>
          Venue name *
        </label>
        <input
          name="venue"
          type="text"
          required
          className="w-full px-4 py-3 text-sm rounded outline-none transition-colors"
          style={{ border: '1px solid var(--border)', fontFamily: 'Geist, sans-serif', color: 'var(--ink)', background: 'var(--white)' }}
          placeholder="Your venue"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>
          Email address *
        </label>
        <input
          name="email"
          type="email"
          required
          className="w-full px-4 py-3 text-sm rounded outline-none transition-colors"
          style={{ border: '1px solid var(--border)', fontFamily: 'Geist, sans-serif', color: 'var(--ink)', background: 'var(--white)' }}
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>
          A short message *
        </label>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full px-4 py-3 text-sm rounded outline-none transition-colors resize-none"
          style={{ border: '1px solid var(--border)', fontFamily: 'Geist, sans-serif', color: 'var(--ink)', background: 'var(--white)' }}
          placeholder="Tell us a little about your venue and what you need..."
        />
      </div>

      {status === 'error' && (
        <p className="text-sm" style={{ color: '#dc2626', fontFamily: 'Geist, sans-serif' }}>
          Something went wrong. Please try again or email us directly at hello@masuyodigital.com.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="text-sm font-semibold text-white px-6 py-3.5 rounded transition-opacity disabled:opacity-60"
        style={{ background: 'var(--navy)', fontFamily: 'Geist, sans-serif' }}
      >
        {status === 'submitting' ? 'Sending...' : 'Send'}
      </button>

      <p className="text-xs" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.6' }}>
        We work discreetly and professionally with every client. Your enquiry stays between us.
      </p>
    </form>
  )
}
