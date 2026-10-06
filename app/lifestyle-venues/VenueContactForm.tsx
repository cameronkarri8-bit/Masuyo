'use client'

import { useEffect, useRef, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { submitBrief } from '@/app/start/actions'
import { Button } from '@/components/ui/Button'
import type { BriefField } from '@/lib/forms/brief'
import { initialBriefState } from '@/lib/forms/submit'

/**
 * The lifestyle venues contact form. It posts to the same server action as
 * Start a project, marked with source=lifestyle-venues so the email says
 * which form it came from. Same spam checks, same Resend and Formspree route.
 */

const inputClass =
  'mt-2 block w-full rounded-control border-2 border-petrol/25 bg-paper px-4 py-3 text-body text-deep placeholder:text-steel/80 focus:border-petrol focus:outline-none'

function Submit() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? 'Sending...' : 'Send'}
    </Button>
  )
}

export default function VenueContactForm() {
  const [state, action] = useFormState(submitBrief, initialBriefState)
  const [started, setStarted] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const doneRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => setStarted(String(Date.now())), [])
  useEffect(() => {
    if (state.status === 'sent') doneRef.current?.focus()
    if (state.status === 'invalid') {
      const first = (['name', 'business', 'email', 'brief'] as BriefField[]).find(f => state.errors[f])
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
    }
  }, [state])

  if (state.status === 'sent') {
    return (
      <div className="rounded-card bg-mist p-8">
        <h3 ref={doneRef} tabIndex={-1} className="text-subhead text-deep outline-none">
          Message sent
        </h3>
        <p className="mt-2 text-body text-steel">Thanks for getting in touch. We will get back to you within a day.</p>
      </div>
    )
  }

  const e = state.errors
  const field = (name: BriefField, label: string, input: React.ReactNode) => (
    <div>
      <label htmlFor={`venue-${name}`} className="text-subhead text-deep">
        {label}
      </label>
      {input}
      {e[name] && (
        <p id={`venue-${name}-error`} className="mt-2 text-body font-semibold text-petrol">
          {e[name]}
        </p>
      )}
    </div>
  )
  const a11y = (name: BriefField) => ({
    'aria-invalid': !!e[name] || undefined,
    'aria-describedby': e[name] ? `venue-${name}-error` : undefined,
  })

  return (
    <form ref={formRef} action={action} noValidate className="space-y-6">
      <input type="hidden" name="source" value="lifestyle-venues" />
      <input type="hidden" name="started" value={started} />
      <input type="hidden" name="page" value="/lifestyle-venues" />
      <div aria-hidden="true" className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="venue-company_url">Company website</label>
        <input id="venue-company_url" type="text" name="company_url" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === 'failed' && (
        <p role="alert" className="rounded-control border-l-4 border-petrol bg-mist p-4 text-body font-semibold text-petrol">
          Something went wrong. Please try again or email us directly at hello@masuyodigital.com.
        </p>
      )}

      {field('name', 'Your name', <input id="venue-name" name="name" type="text" autoComplete="name" placeholder="Your name" defaultValue={state.values?.name} className={inputClass} {...a11y('name')} />)}
      {field('business', 'Venue name', <input id="venue-business" name="business" type="text" placeholder="Your venue" defaultValue={state.values?.business} className={inputClass} {...a11y('business')} />)}
      {field('email', 'Email address', <input id="venue-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" defaultValue={state.values?.email} className={inputClass} {...a11y('email')} />)}
      {field(
        'brief',
        'A short message',
        <textarea id="venue-brief" name="brief" rows={5} placeholder="Tell us a little about your venue and what you need..." defaultValue={state.values?.brief} className={`${inputClass} resize-y`} {...a11y('brief')} />
      )}

      <Submit />
      <p className="text-body text-steel">We work discreetly and professionally with every client. Your enquiry stays between us.</p>
    </form>
  )
}
