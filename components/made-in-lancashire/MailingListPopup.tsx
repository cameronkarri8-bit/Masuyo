'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { buttonClasses } from '@/components/ui/Button'
import { Dot } from '@/components/ui/SectionTitle'
import { DIRECTORY_PATH, MIL_PATH, SUBSCRIBE_ENDPOINT } from '@/lib/made-in-lancashire/config'

/**
 * The Made in Lancashire mailing list pop-up, on every Made in Lancashire page.
 *
 * Waits until the visitor has had a look: 15 seconds on the page, or 40% of
 * the way down it, and never while they are typing in a form. A bottom sheet
 * on a phone, a centred card on larger screens. Closing it keeps it away for
 * 14 days in this browser; joining keeps it away for good.
 *
 * Opens straight away from a link with ?join=1 or #join (for the Instagram
 * bio), or from anywhere on the page with window.dispatchEvent(new Event('mil:join')).
 *
 * Sends to the subscribe edge function, which checks everything again and
 * sends the welcome email.
 */

const STORE = 'mil-mailing-list'
const SNOOZE_DAYS = 14
const DELAY_MS = 15_000
const SCROLL_SHARE = 0.4
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

type Audience = '' | 'business' | 'supporter'
type Field = 'email' | 'name' | 'business_name' | 'audience'
type Status = 'idle' | 'sending' | 'joined' | 'error' | 'limited'

const INPUT =
  'mt-1.5 block w-full min-h-[3rem] rounded-control border-2 border-transparent bg-paper px-4 py-3 text-[16px] leading-normal text-deep placeholder:text-steel/80 focus:border-aqua aria-[invalid=true]:border-[#FF8A80]'

function remembered(): 'joined' | 'snoozed' | null {
  try {
    const raw = window.localStorage.getItem(STORE)
    if (!raw) return null
    const v = JSON.parse(raw) as { state?: string; at?: number }
    if (v.state === 'joined') return 'joined'
    if (v.state === 'dismissed' && typeof v.at === 'number' && Date.now() - v.at < SNOOZE_DAYS * 86_400_000) return 'snoozed'
  } catch {
    // Storage blocked or unreadable: show it as if new.
  }
  return null
}

function remember(state: 'joined' | 'dismissed') {
  try {
    window.localStorage.setItem(STORE, JSON.stringify({ state, at: Date.now() }))
  } catch {
    // Private window: it simply shows again next time.
  }
}

const typing = () => {
  const el = document.activeElement
  return el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement
}

export default function MailingListPopup() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [audience, setAudience] = useState<Audience>('')
  const [name, setName] = useState('')
  const [business, setBusiness] = useState('')
  const [email, setEmail] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const panelRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const lastFocus = useRef<Element | null>(null)
  const hidden = pathname?.startsWith(`${MIL_PATH}/unsubscribe`)

  const show = useCallback(() => {
    lastFocus.current = document.activeElement
    setOpen(true)
  }, [])

  const close = useCallback(() => {
    setOpen(false)
    if (status !== 'joined') remember('dismissed')
    const back = lastFocus.current
    if (back instanceof HTMLElement) requestAnimationFrame(() => back.focus())
  }, [status])

  // When to open.
  useEffect(() => {
    if (hidden) return
    const asked = new URLSearchParams(window.location.search).get('join') === '1' || window.location.hash === '#join'
    const onAsk = () => show()
    window.addEventListener('mil:join', onAsk)
    if (asked) {
      show()
      return () => window.removeEventListener('mil:join', onAsk)
    }
    if (remembered()) return () => window.removeEventListener('mil:join', onAsk)

    let done = false
    let retry: ReturnType<typeof setTimeout> | undefined
    const trigger = () => {
      if (done) return
      if (typing()) {
        clearTimeout(retry)
        retry = setTimeout(trigger, 10_000)
        return
      }
      done = true
      show()
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
      window.removeEventListener('mil:join', onAsk)
    }
  }, [hidden, show])

  // While open: focus inside, Escape closes, Tab stays inside, the page behind holds still.
  useEffect(() => {
    if (!open) return
    headingRef.current?.focus()
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return
      const items = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), [tabindex="0"]'),
      ).filter(el => el.offsetParent !== null)
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && (document.activeElement === first || document.activeElement === headingRef.current)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', onKey)
    }
  }, [open, close])

  if (hidden || !open) return null

  function check(): Partial<Record<Field, string>> {
    const e: Partial<Record<Field, string>> = {}
    const em = email.trim()
    if (!em) e.email = 'Add your email address.'
    else if (!EMAIL.test(em) || em.length > 254) e.email = 'Check the email address.'
    if (name.trim().length > 120) e.name = 'Keep your name under 120 characters.'
    if (business.trim().length > 120) e.business_name = 'Keep the name under 120 characters.'
    return e
  }

  async function submit(ev: React.FormEvent) {
    ev.preventDefault()
    const found = check()
    setErrors(found)
    const first = (['name', 'business_name', 'email'] as Field[]).find(k => found[k])
    if (first) {
      document.getElementById(`mil-${first}`)?.focus()
      return
    }
    setStatus('sending')
    try {
      const res = await fetch(SUBSCRIBE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim(),
          audience,
          business_name: audience === 'business' ? business.trim() : '',
          company_website: honeypot,
        }),
      })
      if (res.status === 429) return setStatus('limited')
      if (res.status === 422) {
        const body = await res.json().catch(() => ({}))
        if (body?.errors) setErrors(body.errors)
        return setStatus('idle')
      }
      if (!res.ok) return setStatus('error')
      remember('joined')
      setStatus('joined')
      ;(window as unknown as { umami?: { track?: (e: string, d?: object) => void } }).umami?.track?.('Mailing list joined', { audience: audience || 'not said' })
      requestAnimationFrame(() => headingRef.current?.focus())
    } catch {
      setStatus('error')
    }
  }

  const describedBy = (k: Field) => (errors[k] ? `mil-${k}-error` : undefined)
  const errorText = (k: Field) =>
    errors[k] ? (
      <p id={`mil-${k}-error`} className="mt-1.5 text-small font-semibold text-[#FFB4AB]">
        {errors[k]}
      </p>
    ) : null

  const option = (value: Exclude<Audience, ''>, label: string) => (
    <label
      className={`flex min-h-[3rem] cursor-pointer items-center gap-2.5 rounded-control border-2 px-3.5 py-2.5 text-body font-semibold transition-colors ${
        audience === value ? 'border-aqua bg-paper/10 text-paper' : 'border-paper/25 text-mist hover:border-paper/50'
      }`}
    >
      <input type="radio" name="mil-audience" value={value} checked={audience === value} onChange={() => setAudience(value)} className="h-5 w-5 shrink-0 accent-aqua" />
      {label}
    </label>
  )

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6">
      <button type="button" aria-label="Close" tabIndex={-1} onClick={close} className="absolute inset-0 h-full w-full cursor-default bg-deep/55" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mil-list-title"
        className="ground-dark relative max-h-[90dvh] w-full overflow-y-auto overscroll-contain rounded-t-card bg-petrol px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] pt-6 text-paper shadow-[0_-12px_40px_rgba(13,26,32,0.35)] sm:max-w-[32rem] sm:rounded-card sm:px-8 sm:pb-8 sm:pt-8"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-control text-mist transition-colors hover:bg-paper/10 hover:text-paper sm:right-3 sm:top-3"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {status === 'joined' ? (
          <div aria-live="polite">
            <h2 id="mil-list-title" ref={headingRef} tabIndex={-1} className="pr-10 text-title text-paper outline-none focus-visible:outline-none">
              You&rsquo;re in
              <Dot />
            </h2>
            <p className="mt-3 text-body text-mist">Thanks for backing Lancashire&rsquo;s independents. A welcome email is on its way.</p>
            {audience === 'business' ? (
              <>
                <p className="mt-3 text-body text-mist">Your business can go in the directory for free, with its own page.</p>
                <Link href={`${MIL_PATH}#apply`} onClick={close} className={`${buttonClasses('primary', true, true)} mt-6`}>
                  Add your business
                </Link>
              </>
            ) : (
              <Link href={DIRECTORY_PATH} onClick={close} className={`${buttonClasses('primary', true, true)} mt-6`}>
                Browse the directory
              </Link>
            )}
          </div>
        ) : (
          <>
            <h2 id="mil-list-title" ref={headingRef} tabIndex={-1} className="pr-10 text-title text-balance text-paper outline-none focus-visible:outline-none">
              Join Lancashire&rsquo;s business community
              <Dot />
            </h2>
            <p className="mt-3 text-body text-mist">
              Back Lancashire&rsquo;s independents. One round-up a month: new members, local business news and offers from businesses across the county.
            </p>

            <form onSubmit={submit} noValidate className="mt-6">
              <fieldset>
                <legend className="text-body font-semibold text-paper">I&rsquo;m joining as</legend>
                <div className="mt-2 grid gap-2 min-[360px]:grid-cols-2">
                  {option('business', 'A business')}
                  {option('supporter', 'A supporter')}
                </div>
              </fieldset>

              {audience === 'business' && (
                <div className="mt-4">
                  <label htmlFor="mil-business_name" className="text-body font-semibold text-paper">
                    Business name <span className="font-normal text-mist">(optional)</span>
                  </label>
                  <input
                    id="mil-business_name"
                    value={business}
                    onChange={e => setBusiness(e.target.value)}
                    maxLength={120}
                    autoComplete="organization"
                    aria-invalid={Boolean(errors.business_name)}
                    aria-describedby={describedBy('business_name')}
                    className={INPUT}
                  />
                  {errorText('business_name')}
                </div>
              )}

              <div className="mt-4 grid gap-4 sm:grid-cols-[2fr_3fr]">
                <div>
                  <label htmlFor="mil-name" className="text-body font-semibold text-paper">
                    First name <span className="font-normal text-mist">(optional)</span>
                  </label>
                  <input
                    id="mil-name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    maxLength={120}
                    autoComplete="given-name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={describedBy('name')}
                    className={INPUT}
                  />
                  {errorText('name')}
                </div>
                <div>
                  <label htmlFor="mil-email" className="text-body font-semibold text-paper">
                    Email
                  </label>
                  <input
                    id="mil-email"
                    type="email"
                    inputMode="email"
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value)
                      if (errors.email) setErrors(x => ({ ...x, email: undefined }))
                    }}
                    autoComplete="email"
                    autoCapitalize="none"
                    required
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={describedBy('email')}
                    className={INPUT}
                  />
                  {errorText('email')}
                </div>
              </div>

              {/* For bots only: people never see or fill this. */}
              <div aria-hidden="true" className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden">
                <label htmlFor="mil-company_website">Company website</label>
                <input id="mil-company_website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={e => setHoneypot(e.target.value)} />
              </div>

              <button type="submit" disabled={status === 'sending'} className={`${buttonClasses('primary', true, true)} mt-6 disabled:cursor-wait disabled:opacity-70`}>
                {status === 'sending' ? 'Joining' : 'Join the community'}
              </button>

              <div aria-live="polite">
                {status === 'limited' && <p className="mt-3 text-small font-semibold text-[#FFB4AB]">Too many sign-ups from here today. Try again tomorrow.</p>}
                {status === 'error' && (
                  <p className="mt-3 text-small font-semibold text-[#FFB4AB]">
                    That did not go through. Try again, or email{' '}
                    <a href="mailto:hello@masuyodigital.com" className="underline">
                      hello@masuyodigital.com
                    </a>
                    .
                  </p>
                )}
              </div>

              <p className="mt-3 text-small font-normal text-mist">
                One email a month. Unsubscribe any time. See our{' '}
                <Link href="/privacy-policy" className="inline-block py-1 font-semibold text-paper underline decoration-aqua underline-offset-4">
                  privacy policy
                </Link>
                .
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
