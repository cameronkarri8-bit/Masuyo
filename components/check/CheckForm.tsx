'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import ResourceCard, { type CardData } from '@/components/resources/ResourceCard'
import { describedBy, ErrorText, focusFirst, INPUT, Label, SHADOW } from '@/components/made-in-lancashire/FormBits'
import { buttonClasses } from '@/components/ui/Button'
import { CHECK_CONSENT, CHECK_PRIVACY, GOALS } from '@/lib/check/config'
import { EMAIL, sendCheck, WEBSITE } from '@/lib/check/send'

/**
 * The free website check form on /check. Website and email are all it needs;
 * the rest helps the report (a town for the local checks, what matters most
 * for which quick wins come first). Checked here for quick messages, and
 * again by the website-check function.
 */

type Field = 'url' | 'first_name' | 'business_name' | 'email' | 'town' | 'goal'
type Errors = Partial<Record<Field, string>>
type Status = 'idle' | 'sending' | 'sent' | 'error' | 'limited'

const ORDER: Field[] = ['url', 'first_name', 'business_name', 'email', 'town', 'goal']

export default function CheckForm({ articles }: { articles: CardData[] }) {
  const [v, setV] = useState({ url: '', first_name: '', business_name: '', email: '', town: '', goal: '' })
  const [optIn, setOptIn] = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  const formRef = useRef<HTMLFormElement>(null)
  const doneRef = useRef<HTMLHeadingElement>(null)

  const set = (k: Field, value: string) => {
    setV(prev => ({ ...prev, [k]: value }))
    if (errors[k]) setErrors(prev => ({ ...prev, [k]: undefined }))
  }

  function check(): Errors {
    const e: Errors = {}
    const url = v.url.trim()
    if (!url) e.url = 'Add your website address.'
    else if (!WEBSITE.test(url) || url.length > 500) e.url = 'Check the website address, like yourbusiness.co.uk.'
    const email = v.email.trim()
    if (!email) e.email = 'Add your email, so we can send the report.'
    else if (!EMAIL.test(email) || email.length > 254) e.email = 'Check the email address.'
    if (v.first_name.trim().length > 80) e.first_name = 'Keep your name under 80 characters.'
    if (v.business_name.trim().length > 120) e.business_name = 'Keep the name under 120 characters.'
    if (v.town.trim().length > 80) e.town = 'Keep the town under 80 characters.'
    return e
  }

  async function submit(ev: React.FormEvent) {
    ev.preventDefault()
    const found = check()
    setErrors(found)
    const first = ORDER.find(k => found[k])
    if (first) return focusFirst(formRef.current, [first])
    setStatus('sending')
    const r = await sendCheck({
      url: v.url.trim(),
      email: v.email.trim(),
      first_name: v.first_name.trim(),
      business_name: v.business_name.trim(),
      town: v.town.trim(),
      goal: v.goal,
      marketing_opt_in: optIn,
      company_website: honeypot,
      source: 'check-page',
    })
    if (r.ok) {
      setStatus('sent')
      try {
        window.localStorage.setItem('masuyo-check-popup', JSON.stringify({ state: 'sent', at: Date.now() }))
      } catch {
        // The pop-up may show again in a private window; nothing breaks.
      }
      requestAnimationFrame(() => doneRef.current?.focus())
      return
    }
    if (r.kind === 'invalid') {
      setErrors(r.errors)
      setStatus('idle')
      const firstServer = ORDER.find(k => r.errors[k])
      if (firstServer) focusFirst(formRef.current, [firstServer])
      return
    }
    setStatus(r.kind)
  }

  if (status === 'sent') {
    return (
      <div className={`rounded-card bg-paper p-6 sm:p-10 ${SHADOW}`}>
        <h2 ref={doneRef} tabIndex={-1} className="text-heading text-deep outline-none" aria-live="polite">
          Your report is on its way.
        </h2>
        <p className="mt-4 max-w-measure text-lead text-steel">It usually arrives within five minutes. Check your spam folder if it has not arrived in ten.</p>
        {articles.length > 0 && (
          <>
            <p className="mt-8 text-body font-semibold text-deep">While you wait</p>
            <ul className="mt-4 grid gap-5 md:grid-cols-2">
              {articles.map(a => (
                <li key={a.slug}>
                  <ResourceCard r={a} onPaper />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    )
  }

  const field = (k: Field, label: string, opts: { optional?: boolean; type?: string; inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']; autoComplete?: string; placeholder?: string; max: number }) => (
    <div>
      <Label htmlFor={`check-${k}`} optional={opts.optional}>
        {label}
      </Label>
      <input
        id={`check-${k}`}
        name={k}
        type={opts.type ?? 'text'}
        inputMode={opts.inputMode}
        autoComplete={opts.autoComplete ?? 'off'}
        autoCapitalize={opts.type === 'email' || k === 'url' ? 'none' : undefined}
        spellCheck={k === 'url' || opts.type === 'email' ? false : undefined}
        placeholder={opts.placeholder}
        className={INPUT}
        value={v[k]}
        onChange={e => set(k, e.target.value)}
        aria-invalid={!!errors[k]}
        aria-describedby={describedBy(errors[k] && `check-${k}-error`)}
        maxLength={opts.max}
        required={!opts.optional}
      />
      <ErrorText id={`check-${k}-error`}>{errors[k]}</ErrorText>
    </div>
  )

  return (
    <form ref={formRef} onSubmit={submit} noValidate className={`relative space-y-6 rounded-card bg-paper p-6 sm:p-10 ${SHADOW}`} aria-describedby="check-privacy">
      {field('url', 'Website', { type: 'url', inputMode: 'url', autoComplete: 'url', placeholder: 'yourbusiness.co.uk', max: 500 })}
      <div className="grid gap-6 sm:grid-cols-2">
        {field('first_name', 'First name', { optional: true, autoComplete: 'given-name', max: 80 })}
        {field('business_name', 'Business name', { optional: true, autoComplete: 'organization', max: 120 })}
      </div>
      {field('email', 'Email', { type: 'email', inputMode: 'email', autoComplete: 'email', max: 254 })}
      <div className="grid gap-6 sm:grid-cols-2">
        {field('town', 'Town', { optional: true, autoComplete: 'address-level2', max: 80 })}
        <div>
          <Label htmlFor="check-goal" optional>
            What matters most
          </Label>
          <select id="check-goal" name="goal" value={v.goal} onChange={e => set('goal', e.target.value)} className={INPUT}>
            <option value="">Choose one</option>
            {GOALS.map(g => (
              <option key={g.value} value={g.value}>
                {g.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <label className="flex min-h-[2.75rem] cursor-pointer items-start gap-3 text-body text-deep">
        <input type="checkbox" checked={optIn} onChange={e => setOptIn(e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-petrol" />
        <span>{CHECK_CONSENT}</span>
      </label>

      {/* For bots only: people never see or fill this. */}
      <div aria-hidden="true" className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="check-company_website">Company website</label>
        <input id="check-company_website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={e => setHoneypot(e.target.value)} />
      </div>

      <div>
        <button type="submit" disabled={status === 'sending'} className={`${buttonClasses('primary', false, true)} disabled:cursor-wait disabled:opacity-70 sm:w-auto`}>
          {status === 'sending' ? 'Sending' : 'Send my free report'}
        </button>
        <div aria-live="polite">
          {status === 'limited' && <p className="mt-3 text-small font-semibold text-[#B42318]">That is the most checks we can run from here today. Try again tomorrow, or email hello@masuyodigital.com.</p>}
          {status === 'error' && (
            <p className="mt-3 text-small font-semibold text-[#B42318]">
              That did not go through. Try again, or email{' '}
              <a href="mailto:hello@masuyodigital.com" className="underline">
                hello@masuyodigital.com
              </a>
              .
            </p>
          )}
        </div>
        <p id="check-privacy" className="mt-4 text-small text-steel">
          {CHECK_PRIVACY} See our{' '}
          <Link href="/privacy-policy" className="inline-block py-1 font-semibold text-petrol underline underline-offset-4">
            privacy policy
          </Link>
          .
        </p>
      </div>
    </form>
  )
}
