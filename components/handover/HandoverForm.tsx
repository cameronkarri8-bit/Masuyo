'use client'

import { useEffect, useRef, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { submitBrief } from '@/app/start/actions'
import { Chips, FieldError, inputClass } from '@/components/start/FormParts'
import { Button } from '@/components/ui/Button'
import { Dot } from '@/components/ui/SectionTitle'
import { PLATFORM_OPTIONS, SITES_OPTIONS, TIMELINE_OPTIONS, type BriefField } from '@/lib/forms/brief'
import { initialBriefState } from '@/lib/forms/submit'

/**
 * The confidential handover form on /sell-your-web-design-clients. It goes
 * through the same server action as Start a project, with the same honeypot
 * and time on page checks, tagged with the source "handover" so these
 * enquiries arrive marked as such.
 */

function Submit() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? 'Sending...' : 'Send in confidence'}
    </Button>
  )
}

const ORDER: BriefField[] = ['name', 'email', 'sites', 'platforms', 'timeline']

export default function HandoverForm() {
  const [state, action] = useFormState(submitBrief, initialBriefState)
  const [sites, setSites] = useState<string[]>([])
  const [platforms, setPlatforms] = useState<string[]>([])
  const [timeline, setTimeline] = useState<string[]>([])
  const [started, setStarted] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const doneRef = useRef<HTMLHeadingElement>(null)
  const errors = state.errors

  // Time on page, for the spam check.
  useEffect(() => setStarted(String(Date.now())), [])

  useEffect(() => {
    if (state.status !== 'invalid') return
    const first = ORDER.find(f => errors[f])
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
  }, [state, errors])

  useEffect(() => {
    if (state.status === 'sent') doneRef.current?.focus()
  }, [state.status])

  if (state.status === 'sent') {
    return (
      <div className="rounded-card bg-paper p-6 sm:p-10">
        <h3 ref={doneRef} tabIndex={-1} className="text-heading text-deep outline-none">
          Thanks{state.firstName ? `, ${state.firstName}` : ''}. Your message is with us
          <Dot />
        </h3>
        <p className="mt-4 max-w-measure text-lead text-steel">
          Cameron will reply personally within one working day to arrange a confidential chat. None of your clients will be contacted.
        </p>
      </div>
    )
  }

  const v = state.values
  const err = (f: BriefField) => (errors[f] ? `${f}-error` : undefined)

  return (
    <form ref={formRef} action={action} noValidate aria-describedby="handover-confidential" className="space-y-8 rounded-card bg-paper p-6 sm:p-10">
      <input type="hidden" name="source" value="handover" />
      <input type="hidden" name="started" value={started} />
      <input type="hidden" name="page" value="/sell-your-web-design-clients" />
      {/* A field for bots only. People never see it or tab into it. */}
      <div aria-hidden="true" className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="company_url">Company website</label>
        <input id="company_url" type="text" name="company_url" tabIndex={-1} autoComplete="off" />
      </div>

      <p id="handover-confidential" className="flex items-start gap-3 rounded-control bg-mist p-4 text-body text-deep">
        <svg viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0 text-petrol" fill="none" aria-hidden="true">
          <rect x="4" y="9" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
          <path d="M7 9V6.5a3 3 0 0 1 6 0V9" stroke="currentColor" strokeWidth="1.8" />
        </svg>
        <span>
          <strong className="font-semibold">Confidential.</strong> Only Cameron reads this, and none of your clients are contacted.
        </span>
      </p>

      {state.status === 'failed' && state.message && (
        <div role="alert" className="rounded-control border-l-4 border-petrol bg-mist p-4 text-body font-semibold text-petrol">
          {state.message}
        </div>
      )}

      <div>
        <label htmlFor="handover-name" className="text-subhead text-deep">
          Your name
        </label>
        <input id="handover-name" name="name" type="text" autoComplete="name" defaultValue={v?.name} aria-invalid={!!errors.name || undefined} aria-describedby={err('name')} className={inputClass} />
        <FieldError id="name-error" message={errors.name} />
      </div>

      <div>
        <label htmlFor="handover-email" className="text-subhead text-deep">
          Email
        </label>
        <input
          id="handover-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          defaultValue={v?.email}
          aria-invalid={!!errors.email || undefined}
          aria-describedby={err('email')}
          className={inputClass}
        />
        <FieldError id="email-error" message={errors.email} />
      </div>

      <fieldset>
        <legend className="text-subhead text-deep">Roughly how many client sites?</legend>
        <Chips name="sites" type="radio" options={SITES_OPTIONS} value={sites} onChange={setSites} invalid={!!errors.sites} describedBy={err('sites')} />
        <FieldError id="sites-error" message={errors.sites} />
      </fieldset>

      <fieldset>
        <legend className="text-subhead text-deep">Main platforms</legend>
        <p className="mt-1 text-body text-steel">Pick any that apply.</p>
        <Chips name="platforms" type="checkbox" options={PLATFORM_OPTIONS} value={platforms} onChange={setPlatforms} invalid={!!errors.platforms} describedBy={err('platforms')} />
        <FieldError id="platforms-error" message={errors.platforms} />
      </fieldset>

      <fieldset>
        <legend className="text-subhead text-deep">Rough timeline</legend>
        <Chips name="timeline" type="radio" options={TIMELINE_OPTIONS} value={timeline} onChange={setTimeline} invalid={!!errors.timeline} describedBy={err('timeline')} />
        <FieldError id="timeline-error" message={errors.timeline} />
      </fieldset>

      <div>
        <label htmlFor="handover-message" className="text-subhead text-deep">
          Anything else <span className="text-body font-normal text-steel">(optional)</span>
        </label>
        <p id="handover-message-help" className="mt-1 text-body text-steel">
          For example, why you are stepping back, or anything about your clients we should know.
        </p>
        <textarea id="handover-message" name="brief" rows={5} defaultValue={v?.brief} aria-describedby="handover-message-help" className={`${inputClass} resize-y`} />
      </div>

      <div className="border-t border-petrol/15 pt-8">
        <Submit />
        <p className="mt-4 text-body text-steel">A reply from Cameron within one working day. No mailing list.</p>
      </div>
    </form>
  )
}
