'use client'

import { useState, useEffect } from 'react'

interface ResourceModalProps {
  resourceTitle: string
  resourceSlug: string
  isPremium: boolean
  resourceContent: string[]
}

const HTML2PDF_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'

function buildResourceHtml(title: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; background: #ffffff;">
      <div style="background: #1A2939; padding: 24px 32px; display: flex; justify-content: space-between; align-items: center;">
        <span style="color: #ffffff; font-family: Georgia, serif; font-size: 20px; font-weight: 600;">Masuyo Digital</span>
        <span style="color: rgba(255,255,255,0.85); font-size: 14px; font-style: italic;">${title}</span>
      </div>
      <div style="background: #ffffff; padding: 48px 40px;">
        <h1 style="color: #1A2939; font-family: Georgia, serif; font-size: 26px; margin: 0 0 12px 0; font-weight: 600;">${title}</h1>
        <div style="height: 2px; background: #35ADDF; border-radius: 2px; margin-bottom: 32px;"></div>
        <p style="color: #374151; font-size: 16px; line-height: 1.7; margin: 0;">Full content coming soon.</p>
      </div>
      <div style="background: #1A2939; padding: 20px 32px; display: flex; justify-content: space-between; align-items: center;">
        <span style="color: rgba(255,255,255,0.75); font-size: 12px;">masuyodigital.com</span>
        <span style="color: rgba(255,255,255,0.75); font-size: 12px;">&#169; 2025 Masuyo Digital</span>
        <span style="color: rgba(255,255,255,0.75); font-size: 12px;">hello@masuyodigital.com</span>
      </div>
    </div>
  `
}

function loadHtml2Pdf(): Promise<void> {
  return new Promise((resolve, reject) => {
    if ((window as any).html2pdf) { resolve(); return }
    const existing = document.querySelector(`script[src="${HTML2PDF_SRC}"]`)
    if (existing) {
      existing.addEventListener('load', () => resolve())
      return
    }
    const script = document.createElement('script')
    script.src = HTML2PDF_SRC
    script.onload = () => resolve()
    script.onerror = reject
    document.head.appendChild(script)
  })
}

export default function ResourceModal({ resourceTitle, resourceSlug, isPremium, resourceContent: _resourceContent }: ResourceModalProps) {
  const [unlocked, setUnlocked] = useState(false)
  const [gateOpen, setGateOpen] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [pendingAction, setPendingAction] = useState<'view' | 'download' | null>(null)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    if (localStorage.getItem('masuyo_unlocked')) setUnlocked(true)
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setLightboxOpen(false)
        setGateOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  function handleAction(action: 'view' | 'download') {
    if (isPremium && !unlocked) {
      setPendingAction(action)
      setGateOpen(true)
    } else {
      executeAction(action)
    }
  }

  function executeAction(action: 'view' | 'download') {
    if (action === 'view') {
      setLightboxOpen(true)
    } else {
      triggerDownload()
    }
  }

  async function triggerDownload() {
    try {
      await loadHtml2Pdf()
      const html = buildResourceHtml(resourceTitle)
      const el = document.createElement('div')
      el.innerHTML = html
      el.style.position = 'fixed'
      el.style.left = '-9999px'
      el.style.top = '0'
      document.body.appendChild(el)
      await (window as any).html2pdf()
        .set({
          margin: 0,
          filename: `masuyo-${resourceSlug}.pdf`,
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        })
        .from(el)
        .save()
      document.body.removeChild(el)
    } catch (err) {
      console.error('PDF generation failed:', err)
    }
  }

  async function handleGateSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes('@') || !email.includes('.')) {
      setEmailError('Please enter a valid email address.')
      return
    }
    setSubmitting(true)
    setSubmitError('')
    try {
      const res = await fetch('https://formspree.io/f/xlgpogqk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, source: 'resource_unlock' }),
      })
      if (res.ok) {
        localStorage.setItem('masuyo_unlocked', 'true')
        setUnlocked(true)
        setGateOpen(false)
        setEmail('')
        const action = pendingAction
        setPendingAction(null)
        if (action) executeAction(action)
      } else {
        setSubmitError('Something went wrong. Please try again.')
      }
    } catch {
      setSubmitError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      {/* Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => handleAction('view')}
          className="flex-1 text-sm font-semibold py-2.5 rounded transition-colors"
          style={{ border: '1px solid var(--navy)', color: 'var(--navy)', background: 'transparent', fontFamily: 'Geist, sans-serif' }}>
          View
        </button>
        <button
          onClick={() => handleAction('download')}
          className="flex-1 text-sm font-semibold py-2.5 rounded transition-colors text-white"
          style={{ background: 'var(--navy)', fontFamily: 'Geist, sans-serif' }}>
          Download
        </button>
      </div>

      {/* Email gate modal */}
      {gateOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.75)' }}
          onClick={() => setGateOpen(false)}>
          <div
            className="w-full rounded-xl overflow-hidden"
            style={{ maxWidth: 480, background: '#ffffff' }}
            onClick={e => e.stopPropagation()}>
            <div className="px-7 py-6" style={{ background: 'var(--navy)' }}>
              <p className="font-semibold text-white mb-1" style={{ fontFamily: 'Fraunces, serif', fontSize: 17 }}>
                Masuyo Digital
              </p>
              <h2 className="text-xl font-semibold text-white leading-snug" style={{ fontFamily: 'Fraunces, serif' }}>
                Unlock all premium resources
              </h2>
            </div>
            <div className="px-7 py-6">
              <p className="text-sm mb-5" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: 1.7 }}>
                Enter your email to unlock all premium resources instantly. You will never be asked again on this device.
              </p>
              <form onSubmit={handleGateSubmit} className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setEmailError('') }}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 text-sm rounded-lg outline-none"
                  style={{ border: `1px solid ${emailError ? '#dc2626' : 'var(--border)'}`, fontFamily: 'Geist, sans-serif', color: 'var(--ink)' }} />
                {emailError && (
                  <p className="text-xs" style={{ color: '#dc2626', fontFamily: 'Geist, sans-serif' }}>{emailError}</p>
                )}
                {submitError && (
                  <p className="text-xs" style={{ color: '#dc2626', fontFamily: 'Geist, sans-serif' }}>{submitError}</p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full text-sm font-semibold text-white py-3 rounded-lg"
                  style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif', opacity: submitting ? 0.7 : 1, cursor: submitting ? 'not-allowed' : 'pointer' }}>
                  {submitting ? 'Unlocking...' : 'Unlock free access'}
                </button>
                <button
                  type="button"
                  onClick={() => setGateOpen(false)}
                  className="w-full text-sm py-2 rounded-lg"
                  style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          style={{ background: 'rgba(0,0,0,0.85)' }}
          onClick={() => setLightboxOpen(false)}>
          <div className="flex min-h-full items-center justify-center p-6 py-10">
            <div
              className="w-full rounded-xl overflow-hidden"
              style={{ maxWidth: 800, background: '#ffffff' }}
              onClick={e => e.stopPropagation()}>
              {/* Top bar */}
              <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
                <h2 className="text-base font-semibold text-ink pr-4" style={{ fontFamily: 'Fraunces, serif' }}>
                  {resourceTitle}
                </h2>
                <button
                  onClick={() => setLightboxOpen(false)}
                  className="flex-shrink-0 p-1 rounded transition-colors hover:opacity-60"
                  aria-label="Close">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5 5l10 10M15 5L5 15" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              {/* Content */}
              <div className="p-8">
                <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--navy)', fontFamily: 'Fraunces, serif' }}>
                  {resourceTitle}
                </h3>
                <div className="mb-6" style={{ height: 2, background: '#35ADDF', borderRadius: 2 }} />
                <p className="text-sm" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: 1.7 }}>
                  Full content coming soon.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
