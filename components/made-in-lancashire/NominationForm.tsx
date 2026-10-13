'use client'

import { useRef, useState } from 'react'
import { NOMINATION_ENDPOINT, ROUNDUP_CONSENT } from '@/lib/made-in-lancashire/config'

/**
 * The nomination form. Sends to the submit-nomination edge function, which
 * checks everything again on the server, so these checks are for the visitor's
 * benefit only.
 *
 * Accessible by design: every field has a visible label, errors are tied to
 * their fields with aria-describedby, the first error takes focus, and the
 * result is announced in a live region.
 */

type Field = 'business_name' | 'town' | 'link' | 'reason' | 'is_own_business' | 'nominator_name' | 'nominator_email'
type Errors = Partial<Record<Field, string>>
type Status = 'idle' | 'sending' | 'sent' | 'error' | 'limited'

const MAX_REASON = 500
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

interface Values {
  business_name: string
  town: string
  link: string
  reason: string
  is_own_business: '' | 'yes' | 'no'
  nominator_name: string
  nominator_email: string
  roundup_opt_in: boolean
  company_website: string
}

const EMPTY: Values = {
  business_name: '',
  town: '',
  link: '',
  reason: '',
  is_own_business: '',
  nominator_name: '',
  nominator_email: '',
  roundup_opt_in: false,
  company_website: '',
}

export function validate(v: Values): Errors {
  const e: Errors = {}
  if (!v.business_name.trim()) e.business_name = 'Add the business name.'
  else if (v.business_name.trim().length > 120) e.business_name = 'Keep the name under 120 characters.'
  if (!v.town.trim()) e.town = 'Add the town.'
  else if (v.town.trim().length > 80) e.town = 'Keep the town under 80 characters.'
  if (v.link.trim().length > 300) e.link = 'Keep the link under 300 characters.'
  if (!v.reason.trim()) e.reason = 'Tell us why they should be featured.'
  else if (v.reason.trim().length > MAX_REASON) e.reason = `Keep it to ${MAX_REASON} characters.`
  if (!v.is_own_business) e.is_own_business = 'Choose yes or no.'
  if (v.nominator_name.trim().length > 120) e.nominator_name = 'Keep your name under 120 characters.'
  const email = v.nominator_email.trim()
  if (email && !EMAIL.test(email)) e.nominator_email = 'Check the email address.'
  else if (!email && v.roundup_opt_in) e.nominator_email = 'Add your email to get the round-up.'
  return e
}

const ORDER: Field[] = ['business_name', 'town', 'link', 'reason', 'is_own_business', 'nominator_name', 'nominator_email']

const input =
  'mt-2 block w-full rounded-control border-2 bg-paper px-4 py-3 text-body text-deep placeholder:text-steel/70 focus:border-petrol aria-[invalid=true]:border-[#B42318]'

function Hint({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-1.5 text-small text-steel">
      {children}
    </p>
  )
}

function ErrorText({ id, children }: { id: string; children?: string }) {
  if (!children) return null
  return (
    <p id={id} className="mt-1.5 text-small font-semibold text-[#B42318]">
      {children}
    </p>
  )
}

export default function NominationForm() {
  const [v, setV] = useState<Values>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    const next = { ...v, [key]: value }
    setV(next)
    // Once a field has been left, keep its message current as the visitor types.
    if (touched[key as Field] || errors[key as Field]) setErrors(validate(next))
  }
  const blur = (key: Field) => {
    setTouched(t => ({ ...t, [key]: true }))
    const all = validate(v)
    setErrors(e => ({ ...e, [key]: all[key] }))
  }

  const describedBy = (key: Field, hint?: boolean) => [hint ? `${key}-hint` : '', errors[key] ? `${key}-error` : ''].filter(Boolean).join(' ') || undefined

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const found = validate(v)
    setErrors(found)
    const first = ORDER.find(k => found[k])
    if (first) {
      const el = formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)
      el?.focus()
      return
    }
    setStatus('sending')
    try {
      const res = await fetch(NOMINATION_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...v, is_own_business: v.is_own_business === 'yes' }),
      })
      if (res.status === 429) return setStatus('limited')
      if (res.status === 422) {
        const body = await res.json().catch(() => ({}))
        if (body?.errors) setErrors(body.errors)
        return setStatus('idle')
      }
      if (!res.ok) return setStatus('error')
      setStatus('sent')
      setV(EMPTY)
      setTouched({})
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="rounded-card bg-paper p-6 shadow-[0_1px_2px_rgba(13,26,32,0.06),0_8px_24px_rgba(13,26,32,0.06)] sm:p-8">
        <p className="text-subhead text-deep">Thanks, I&apos;ll take a look. Every business gets checked before it&apos;s featured, so it might take a few weeks.</p>
        <button type="button" onClick={() => setStatus('idle')} className="mt-5 font-semibold text-petrol underline decoration-2 underline-offset-[5px]">
          Nominate another business
        </button>
      </div>
    )
  }

  const sending = status === 'sending'

  return (
    <form ref={formRef} onSubmit={submit} noValidate className="relative rounded-card bg-paper p-6 shadow-[0_1px_2px_rgba(13,26,32,0.06),0_8px_24px_rgba(13,26,32,0.06)] sm:p-8" aria-describedby="nomination-privacy">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="business_name" className="text-body font-semibold text-deep">
            Business name
          </label>
          <input id="business_name" name="business_name" className={input} value={v.business_name} onChange={e => set('business_name', e.target.value)} onBlur={() => blur('business_name')} aria-invalid={!!errors.business_name} aria-describedby={describedBy('business_name')} autoComplete="organization" required maxLength={200} />
          <ErrorText id="business_name-error">{errors.business_name}</ErrorText>
        </div>
        <div>
          <label htmlFor="town" className="text-body font-semibold text-deep">
            Town
          </label>
          <input id="town" name="town" className={input} value={v.town} onChange={e => set('town', e.target.value)} onBlur={() => blur('town')} aria-invalid={!!errors.town} aria-describedby={describedBy('town')} autoComplete="address-level2" required maxLength={120} />
          <ErrorText id="town-error">{errors.town}</ErrorText>
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="link" className="text-body font-semibold text-deep">
          Their Instagram or website <span className="font-normal text-steel">(optional)</span>
        </label>
        <input id="link" name="link" className={input} value={v.link} onChange={e => set('link', e.target.value)} onBlur={() => blur('link')} aria-invalid={!!errors.link} aria-describedby={describedBy('link')} inputMode="url" maxLength={400} />
        <ErrorText id="link-error">{errors.link}</ErrorText>
      </div>

      <div className="mt-6">
        <label htmlFor="reason" className="text-body font-semibold text-deep">
          Why should they be featured?
        </label>
        <textarea id="reason" name="reason" rows={5} className={input} value={v.reason} onChange={e => set('reason', e.target.value)} onBlur={() => blur('reason')} aria-invalid={!!errors.reason} aria-describedby={describedBy('reason', true)} required maxLength={MAX_REASON} />
        <Hint id="reason-hint">
          {v.reason.length} of {MAX_REASON} characters
        </Hint>
        <ErrorText id="reason-error">{errors.reason}</ErrorText>
      </div>

      <fieldset className="mt-6" aria-describedby={errors.is_own_business ? 'is_own_business-error' : undefined}>
        <legend className="text-body font-semibold text-deep">Is this your business?</legend>
        <div className="mt-2 flex gap-6">
          {(['yes', 'no'] as const).map(option => (
            <label key={option} className="inline-flex min-h-[2.75rem] items-center gap-2.5 text-body text-deep">
              <input type="radio" name="is_own_business" value={option} checked={v.is_own_business === option} onChange={() => set('is_own_business', option)} onBlur={() => blur('is_own_business')}  className="h-5 w-5 accent-petrol" />
              {option === 'yes' ? 'Yes' : 'No'}
            </label>
          ))}
        </div>
        <ErrorText id="is_own_business-error">{errors.is_own_business}</ErrorText>
      </fieldset>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="nominator_name" className="text-body font-semibold text-deep">
            Your name <span className="font-normal text-steel">(optional)</span>
          </label>
          <input id="nominator_name" name="nominator_name" className={input} value={v.nominator_name} onChange={e => set('nominator_name', e.target.value)} onBlur={() => blur('nominator_name')} aria-invalid={!!errors.nominator_name} aria-describedby={describedBy('nominator_name')} autoComplete="name" maxLength={200} />
          <ErrorText id="nominator_name-error">{errors.nominator_name}</ErrorText>
        </div>
        <div>
          <label htmlFor="nominator_email" className="text-body font-semibold text-deep">
            Your email <span className="font-normal text-steel">(optional)</span>
          </label>
          <input id="nominator_email" name="nominator_email" type="email" className={input} value={v.nominator_email} onChange={e => set('nominator_email', e.target.value)} onBlur={() => blur('nominator_email')} aria-invalid={!!errors.nominator_email} aria-describedby={describedBy('nominator_email')} autoComplete="email" maxLength={300} />
          <ErrorText id="nominator_email-error">{errors.nominator_email}</ErrorText>
        </div>
      </div>

      <label className="mt-6 flex items-start gap-3 text-body text-deep">
        <input type="checkbox" name="roundup_opt_in" checked={v.roundup_opt_in} onChange={e => set('roundup_opt_in', e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-petrol" />
        <span>{ROUNDUP_CONSENT}</span>
      </label>

      {/* Honeypot: hidden from people and screen readers. Bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="company_website">Company website</label>
        <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" value={v.company_website} onChange={e => set('company_website', e.target.value)} />
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" disabled={sending} className="inline-flex min-h-[3rem] items-center justify-center rounded-control bg-petrol px-6 py-3 font-semibold text-paper transition-colors hover:bg-deep disabled:cursor-not-allowed disabled:opacity-60">
          {sending ? 'Sending…' : 'Send nomination'}
        </button>
        <div role="status" aria-live="polite" className="text-small font-semibold text-[#B42318]">
          {status === 'error' && 'That didn’t send. Please try again in a moment, or email hello@masuyodigital.com.'}
          {status === 'limited' && 'You’ve sent a few nominations today. Please try again tomorrow.'}
        </div>
      </div>

      <p id="nomination-privacy" className="mt-6 text-small text-steel">
        Your email is only used to reply about this nomination, unless you tick the round-up box.
      </p>
    </form>
  )
}
