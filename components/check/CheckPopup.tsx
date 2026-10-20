'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { buttonClasses } from '@/components/ui/Button'
import { CHECK_PATH } from '@/lib/check/config'
import { EMAIL, sendCheck, WEBSITE } from '@/lib/check/send'
import { isStandaloneRoute } from '@/lib/proposals'

/**
 * The free website check, as a small card in the corner.
 *
 * Not a modal: no backdrop, focus is never trapped, and the page stays
 * usable. Bottom right at about 360px on larger screens; a compact card
 * across the bottom of a phone with 16px either side.
 *
 * When it shows: after 25 seconds or half way down the page, whichever is
 * first, never while someone is typing in a field, and at most once a
 * session. Closing it keeps it away for 14 days; sending a check keeps it
 * away for good. ?check=1 or #check opens it straight away (for Instagram
 * and email links).
 *
 * Where it never shows: the check itself, /start, proposal and legal pages,
 * and every Made in Lancashire page (which has its own pop-up, and the two
 * must never stack). It steps aside while any fixed bar at the bottom of the
 * screen is showing (anything marked data-fixed-bottom, such as the price
 * estimator's phone bar) and while the phone menu is open.
 */

const STORE = 'masuyo-check-popup'
const SESSION = 'masuyo-check-popup-shown'
const SNOOZE_DAYS = 14
const DELAY_MS = 25_000
const SCROLL_SHARE = 0.5

const INPUT =
  'mt-1 block w-full min-h-[2.75rem] rounded-control border-2 border-transparent bg-paper px-3.5 py-2.5 text-[16px] leading-normal text-deep placeholder:text-steel/80 focus:border-aqua aria-[invalid=true]:border-[#FF8A80]'

const NEVER = [CHECK_PATH, '/start', '/privacy-policy', '/terms', '/made-in-lancashire']

export function hiddenOn(pathname: string | null): boolean {
  if (!pathname) return true
  if (isStandaloneRoute(pathname)) return true
  return NEVER.some(p => pathname === p || pathname.startsWith(`${p}/`))
}

function remembered(): 'sent' | 'snoozed' | null {
  try {
    const raw = window.localStorage.getItem(STORE)
    if (!raw) return null
    const v = JSON.parse(raw) as { state?: string; at?: number }
    if (v.state === 'sent') return 'sent'
    if (v.state === 'dismissed' && typeof v.at === 'number' && Date.now() - v.at < SNOOZE_DAYS * 86_400_000) return 'snoozed'
  } catch {
    // Storage blocked or unreadable: treat it as new.
  }
  return null
}

function remember(state: 'sent' | 'dismissed') {
  try {
    window.localStorage.setItem(STORE, JSON.stringify({ state, at: Date.now() }))
  } catch {
    // Private window: it may show again next time.
  }
}

function shownThisSession(): boolean {
  try {
    return window.sessionStorage.getItem(SESSION) === '1'
  } catch {
    return false
  }
}

function markShown() {
  try {
    window.sessionStorage.setItem(SESSION, '1')
  } catch {
    // Nothing to do.
  }
}

const typing = () => {
  const el = document.activeElement
  return el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement || (el instanceof HTMLElement && el.isContentEditable)
}

/** Something else is fixed to the bottom of the screen, or the phone menu is open. */
function bottomBusy(): boolean {
  const menu = document.getElementById('mobile-menu')
  if (menu && !menu.hidden && getComputedStyle(menu).display !== 'none') return true
  return Array.from(document.querySelectorAll<HTMLElement>('[data-fixed-bottom]')).some(el => {
    if (el.getAttribute('aria-hidden') === 'true') return false
    const r = el.getBoundingClientRect()
    return r.height > 0 && r.top < window.innerHeight && r.bottom > 0 && getComputedStyle(el).visibility !== 'hidden'
  })
}

export default function CheckPopup() {
  const pathname = usePathname()
  const hidden = hiddenOn(pathname)
  const [open, setOpen] = useState(false)
  const [stepAside, setStepAside] = useState(false)
  const [url, setUrl] = useState('')
  const [email, setEmail] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [errors, setErrors] = useState<{ url?: string; email?: string }>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error' | 'limited'>('idle')
  const headingRef = useRef<HTMLHeadingElement>(null)
  const urlRef = useRef<HTMLInputElement>(null)
  const focusOnOpen = useRef(false)

  const show = useCallback((asked: boolean) => {
    markShown()
    // Asked for by a link: put the cursor in the first field. Otherwise leave focus where it is.
    focusOnOpen.current = asked
    setOpen(true)
  }, [])

  useEffect(() => {
    if (open && focusOnOpen.current && urlRef.current) {
      urlRef.current.focus()
      // Stepped aside for a bar at the bottom: try again when it comes back.
      if (document.activeElement === urlRef.current) focusOnOpen.current = false
    }
  }, [open, stepAside])

  const close = useCallback(() => {
    setOpen(false)
    if (status !== 'sent') remember('dismissed')
  }, [status])

  // When to open.
  useEffect(() => {
    if (hidden) return
    const asked = () => new URLSearchParams(window.location.search).get('check') === '1' || window.location.hash === '#check'
    const onHash = () => {
      if (window.location.hash === '#check') show(true)
    }
    window.addEventListener('hashchange', onHash)
    if (asked()) {
      show(true)
      return () => window.removeEventListener('hashchange', onHash)
    }
    if (remembered() || shownThisSession()) return () => window.removeEventListener('hashchange', onHash)

    let done = false
    let retry: ReturnType<typeof setTimeout> | undefined
    const trigger = () => {
      if (done) return
      if (typing()) {
        clearTimeout(retry)
        retry = setTimeout(trigger, 8_000)
        return
      }
      done = true
      show(false)
    }
    const timer = setTimeout(trigger, DELAY_MS)
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (max > 0 && window.scrollY / max >= SCROLL_SHARE) trigger()
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      done = true
      clearTimeout(timer)
      clearTimeout(retry)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('hashchange', onHash)
    }
  }, [hidden, show])

  // While open: Escape closes it, and it steps aside for fixed bars and the phone menu.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    const check = () => setStepAside(bottomBusy())
    check()
    const timer = setInterval(check, 400)
    document.addEventListener('keydown', onKey)
    window.addEventListener('scroll', check, { passive: true })
    return () => {
      clearInterval(timer)
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', check)
    }
  }, [open, close])

  if (hidden || !open) return null

  async function submit(ev: React.FormEvent) {
    ev.preventDefault()
    const e: { url?: string; email?: string } = {}
    if (!url.trim()) e.url = 'Add your website address.'
    else if (!WEBSITE.test(url.trim())) e.url = 'Check the address, like yourbusiness.co.uk.'
    if (!email.trim()) e.email = 'Add your email.'
    else if (!EMAIL.test(email.trim())) e.email = 'Check the email address.'
    setErrors(e)
    if (e.url) return document.getElementById('cp-url')?.focus()
    if (e.email) return document.getElementById('cp-email')?.focus()
    setStatus('sending')
    const r = await sendCheck({ url: url.trim(), email: email.trim(), company_website: honeypot, source: 'popup' })
    if (r.ok) {
      remember('sent')
      setStatus('sent')
      requestAnimationFrame(() => headingRef.current?.focus())
      return
    }
    if (r.kind === 'invalid') {
      setErrors({ url: r.errors.url, email: r.errors.email })
      setStatus('idle')
      return
    }
    setStatus(r.kind)
  }

  const err = (k: 'url' | 'email') =>
    errors[k] ? (
      <p id={`cp-${k}-error`} className="mt-1 text-small font-semibold text-[#FFB4AB]">
        {errors[k]}
      </p>
    ) : null

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cp-title"
      data-check-popup
      hidden={stepAside}
      className="ground-dark fixed inset-x-4 bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] z-30 max-h-[calc(100dvh-6.5rem)] overflow-y-auto overscroll-contain rounded-card bg-petrol p-4 text-paper shadow-[0_12px_40px_rgba(13,26,32,0.35)] ring-1 ring-inset ring-paper/15 sm:p-5 motion-safe:animate-[check-rise_220ms_ease-out] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[22.5rem]"
    >
      <button
        type="button"
        onClick={close}
        aria-label="Close the free website check"
        className="absolute right-1.5 top-1.5 flex h-11 w-11 items-center justify-center rounded-control text-mist transition-colors hover:bg-paper/10 hover:text-paper"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      {status === 'sent' ? (
        <div aria-live="polite">
          <h2 id="cp-title" ref={headingRef} tabIndex={-1} className="pr-10 text-subhead text-paper outline-none">
            Thanks, we have your request
          </h2>
          <p className="mt-2 text-small text-mist">Cameron goes through every website check by hand, so your report will arrive within two working days.</p>
        </div>
      ) : (
        <>
          <h2 id="cp-title" ref={headingRef} tabIndex={-1} className="pr-10 text-subhead text-paper outline-none">
            Free website check
          </h2>
          <p className="mt-1 text-small text-mist">Speed, Google and enquiries, checked by hand. Your report arrives within two working days.</p>
          <form onSubmit={submit} noValidate className="mt-3 space-y-3">
            <div>
              <label htmlFor="cp-url" className="text-small font-semibold text-paper">
                Website
              </label>
              <input
                id="cp-url"
                ref={urlRef}
                type="url"
                inputMode="url"
                autoComplete="url"
                autoCapitalize="none"
                spellCheck={false}
                placeholder="yourbusiness.co.uk"
                value={url}
                onChange={e => setUrl(e.target.value)}
                maxLength={500}
                aria-invalid={Boolean(errors.url)}
                aria-describedby={errors.url ? 'cp-url-error' : undefined}
                className={INPUT}
              />
              {err('url')}
            </div>
            <div>
              <label htmlFor="cp-email" className="text-small font-semibold text-paper">
                Email
              </label>
              <input
                id="cp-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                autoCapitalize="none"
                spellCheck={false}
                value={email}
                onChange={e => setEmail(e.target.value)}
                maxLength={254}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'cp-email-error' : undefined}
                className={INPUT}
              />
              {err('email')}
            </div>
            {/* For bots only: people never see or fill this. */}
            <div aria-hidden="true" className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden">
              <label htmlFor="cp-company_website">Company website</label>
              <input id="cp-company_website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={e => setHoneypot(e.target.value)} />
            </div>
            <button type="submit" disabled={status === 'sending'} className={`${buttonClasses('primary', true, true)} disabled:cursor-wait disabled:opacity-70`}>
              {status === 'sending' ? 'Sending' : 'Send my report'}
            </button>
            <div aria-live="polite">
              {status === 'limited' && <p className="text-small font-semibold text-[#FFB4AB]">That is the most checks we can run from here today. Try again tomorrow.</p>}
              {status === 'error' && <p className="text-small font-semibold text-[#FFB4AB]">That did not go through. Try again, or use the form on the check page.</p>}
            </div>
            <p className="text-small text-mist">
              Only used to send the report and follow up once.{' '}
              <Link href="/privacy-policy" className="inline-block py-1 font-semibold text-paper underline decoration-aqua underline-offset-4">
                Privacy
              </Link>
            </p>
          </form>
        </>
      )}
    </div>
  )
}
