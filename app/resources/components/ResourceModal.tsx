'use client'

import { useState, useEffect, useRef } from 'react'

interface ResourceModalProps {
  resourceTitle: string
  resourceSlug: string
  /** Retained so callers do not need changing. No longer gates anything. */
  isPremium?: boolean
  resourceContent: string[]
}

const HTML2PDF_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'

function getResourceContent(slug: string): string {
  if (slug === 'uk-business-launch-checklist') return `
<h2>Before you register</h2>
<ul>
<li>Define your business idea and target market</li>
<li>Choose your business name and check it is available on Companies House</li>
<li>Check your chosen name is not trademarked at the IPO</li>
<li>Check the domain name is available and register it</li>
<li>Decide on your business structure (sole trader, limited company, partnership)</li>
<li>Open a separate business bank account</li>
<li>Set up a business email address</li>
<li>Define your core services or products and initial pricing</li>
<li>Research your competitors and identify your differentiators</li>
<li>Create a simple one-page business plan</li>
</ul>
<h2>Registering your business</h2>
<ul>
<li>Register as a sole trader with HMRC (if applicable)</li>
<li>Register your limited company with Companies House (if applicable)</li>
<li>Register for Self Assessment with HMRC</li>
<li>Register for VAT if your turnover will exceed &#163;90,000</li>
<li>Set up PAYE if you plan to employ staff</li>
<li>Register for Corporation Tax within 3 months of starting to trade</li>
<li>Get any licences or permits required for your industry</li>
<li>Take out appropriate insurance (public liability, professional indemnity, employers liability)</li>
</ul>
<h2>Setting up your operations</h2>
<ul>
<li>Set up accounting software (Xero, QuickBooks, or FreeAgent recommended)</li>
<li>Create invoice and quote templates</li>
<li>Set up a system for tracking expenses</li>
<li>Create standard terms and conditions for clients</li>
<li>Register with the ICO if you process personal data (&#163;40/year)</li>
<li>Set up a simple project management system</li>
</ul>
<h2>Your online presence</h2>
<ul>
<li>Build or commission your website</li>
<li>Set up Google Business Profile</li>
<li>Set up and optimise your LinkedIn page</li>
<li>Install Google Analytics and Google Search Console</li>
<li>Get listed in relevant UK business directories</li>
<li>Set up a professional email signature</li>
</ul>
<h2>Your first 30 days</h2>
<ul>
<li>Tell your network you are open for business</li>
<li>Reach out to potential clients or referral partners</li>
<li>Set monthly financial targets and review dates</li>
<li>Join a relevant industry association or local business group</li>
<li>Set up a simple CRM to track leads and clients</li>
</ul>
<p><em>This checklist is a general guide and does not constitute legal or financial advice.</em></p>
`
  return ''
}

function buildResourceHtml(title: string, contentHtml: string): string {
  const body = contentHtml
    ? `<style>.pdf-rc h2{color:#1A2939;font-family:Georgia,serif;font-size:17px;font-weight:600;margin:22px 0 9px}.pdf-rc ul{padding-left:20px;margin:6px 0 14px;list-style-type:disc}.pdf-rc li{color:#374151;font-size:14px;line-height:1.6;margin-bottom:5px}.pdf-rc p{color:#374151;font-size:14px;line-height:1.7;margin-bottom:12px}.pdf-rc strong{color:#111318;font-weight:600}.pdf-rc em{font-style:italic;color:#6b7280}</style><div class="pdf-rc">${contentHtml}</div>`
    : '<p style="color:#374151;font-size:15px;line-height:1.7;">Full content coming soon.</p>'
  return `
    <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; background: #ffffff;">
      <div style="background: #1A2939; padding: 24px 32px; display: flex; justify-content: space-between; align-items: center;">
        <span style="color: #ffffff; font-family: Georgia, serif; font-size: 20px; font-weight: 600;">Masuyo Digital</span>
        <span style="color: rgba(255,255,255,0.85); font-size: 14px; font-style: italic;">${title}</span>
      </div>
      <div style="background: #ffffff; padding: 48px 40px;">
        <h1 style="color: #1A2939; font-family: Georgia, serif; font-size: 26px; margin: 0 0 12px 0; font-weight: 600;">${title}</h1>
        <div style="height: 2px; background: #35ADDF; border-radius: 2px; margin-bottom: 32px;"></div>
        ${body}
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

export default function ResourceModal({ resourceTitle, resourceSlug, resourceContent: _resourceContent }: ResourceModalProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const pdfContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setLightboxOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // The email gate has been removed. Every guide is directly accessible.
  function handleAction(action: 'view' | 'download') {
    executeAction(action)
  }

  function executeAction(action: 'view' | 'download') {
    if (action === 'view') {
      setLightboxOpen(true)
    } else {
      triggerDownload()
    }
  }

  async function triggerDownload() {
    const container = pdfContainerRef.current
    if (!container) return
    try {
      await loadHtml2Pdf()
      container.innerHTML = buildResourceHtml(resourceTitle, getResourceContent(resourceSlug))
      await new Promise(resolve => setTimeout(resolve, 300))
      await (window as any).html2pdf()
        .set({
          margin: 0,
          filename: `masuyo-${resourceSlug}.pdf`,
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        })
        .from(container)
        .save()
      container.innerHTML = ''
    } catch (err) {
      console.error('PDF generation failed:', err)
      container.innerHTML = ''
    }
  }

  return (
    <>
      {/* Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => handleAction('view')}
          className="flex-1 text-sm font-semibold py-2.5 rounded transition-colors"
          style={{ border: '1px solid var(--navy)', color: 'var(--navy)', background: 'transparent' }}>
          View
        </button>
        <button
          onClick={() => handleAction('download')}
          className="flex-1 text-sm font-semibold py-2.5 rounded transition-colors text-white"
          style={{ background: 'var(--navy)' }}>
          Download
        </button>
      </div>

      {/* Hidden PDF render target, always in DOM so html2canvas can measure it */}
      <div
        ref={pdfContainerRef}
        aria-hidden="true"
        style={{ position: 'fixed', left: '-9999px', top: 0, width: '800px', pointerEvents: 'none', zIndex: -1 }}
      />

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
                <h2 className="text-base font-semibold text-ink pr-4">
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
                <style>{`
                  .lb-rc h2{color:#1A2939;font-family:var(--font-jost),system-ui,sans-serif;font-size:1.05rem;font-weight:600;margin:1.5rem 0 0.5rem}
                  .lb-rc ul{padding-left:1.25rem;margin:0.4rem 0 1rem;list-style-type:disc}
                  .lb-rc li{color:#6b7280;font-family:Geist,sans-serif;font-size:0.875rem;line-height:1.65;margin-bottom:0.3rem}
                  .lb-rc p{color:#6b7280;font-family:Geist,sans-serif;font-size:0.875rem;line-height:1.7;margin-bottom:0.75rem}
                  .lb-rc strong{color:#111318;font-weight:600}
                  .lb-rc em{font-style:italic}
                `}</style>
                <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--navy)' }}>
                  {resourceTitle}
                </h3>
                <div className="mb-6" style={{ height: 2, background: '#35ADDF', borderRadius: 2 }} />
                {getResourceContent(resourceSlug) ? (
                  <div className="lb-rc" dangerouslySetInnerHTML={{ __html: getResourceContent(resourceSlug) }} />
                ) : (
                  <p className="text-sm" style={{ color: 'var(--mid)', lineHeight: 1.7 }}>
                    Full content coming soon.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
