'use client'

import { useEffect, useRef, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { submitBrief } from '@/app/start/actions'
import ResourceCard, { type CardData } from '@/components/resources/ResourceCard'
import { Button } from '@/components/ui/Button'
import { Dot } from '@/components/ui/SectionTitle'
import { BUDGET_OPTIONS, NEED_OPTIONS, SIZE_OPTIONS, type BriefField } from '@/lib/forms/brief'
import { initialBriefState } from '@/lib/forms/submit'

/**
 * The Start a project form. Seven fields on one page; labels above the
 * fields; only the optional one says so. Errors come back from the server
 * under each field, and the first one is focused. When it sends, the form is
 * replaced in place by the confirmation, so the page never jumps or reloads.
 */

export interface StartDefaults {
  needs: string[]
  brief: string
  budget: string
  estimator: string
}

function Submit() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? 'Sending...' : 'Send my brief'}
    </Button>
  )
}

const inputClass =
  'mt-2 block w-full rounded-control border-2 border-petrol/25 bg-paper px-4 py-3 text-body text-deep placeholder:text-steel/80 focus:border-petrol focus:outline-none aria-[invalid=true]:border-petrol'

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="mt-2 flex items-start gap-2 text-body font-semibold text-petrol">
      <svg viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" />
        <path d="M10 5.5v5.5M10 14v.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
      {message}
    </p>
  )
}

function Chips({
  name,
  options,
  type,
  value,
  onChange,
  invalid,
  describedBy,
}: {
  name: string
  options: readonly string[]
  type: 'checkbox' | 'radio'
  value: string[]
  onChange: (next: string[]) => void
  invalid?: boolean
  describedBy?: string
}) {
  return (
    <div className="mt-3 flex flex-wrap gap-2.5">
      {options.map(opt => {
        const on = value.includes(opt)
        return (
          <label key={opt} className="cursor-pointer">
            <input
              type={type}
              name={name}
              value={opt}
              checked={on}
              aria-invalid={invalid || undefined}
              aria-describedby={describedBy}
              onChange={() => onChange(type === 'radio' ? [opt] : on ? value.filter(v => v !== opt) : [...value, opt])}
              className="peer sr-only"
            />
            <span
              className={`inline-flex min-h-[2.75rem] items-center rounded-full px-4 py-2 text-[1rem] font-semibold ring-2 ring-inset transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-petrol ${
                on ? 'bg-petrol text-paper ring-petrol' : 'bg-paper text-petrol ring-petrol/30 hover:ring-petrol'
              }`}
            >
              {opt}
            </span>
          </label>
        )
      })}
    </div>
  )
}

export default function StartForm({
  defaults,
  suggestions,
}: {
  defaults: StartDefaults
  suggestions: Record<string, CardData[]>
}) {
  const [state, action] = useFormState(submitBrief, initialBriefState)
  const [needs, setNeeds] = useState<string[]>(defaults.needs)
  const [size, setSize] = useState<string[]>([])
  const [budget, setBudget] = useState<string[]>(defaults.budget ? [defaults.budget] : [])
  const [started, setStarted] = useState('')
  const [page, setPage] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const doneRef = useRef<HTMLHeadingElement>(null)
  const errors = state.errors

  // Time on page and the page they came from, for spam checks and the email.
  useEffect(() => {
    setStarted(String(Date.now()))
    try {
      const ref = document.referrer ? new URL(document.referrer) : null
      setPage(ref && ref.origin === window.location.origin ? ref.pathname + ref.search : ref ? ref.href : '')
    } catch {
      setPage('')
    }
  }, [])

  // After a failed check, move focus to the first field that needs attention.
  useEffect(() => {
    if (state.status !== 'invalid') return
    const order: BriefField[] = ['name', 'email', 'business', 'needs', 'brief', 'size']
    const first = order.find(f => errors[f])
    if (!first) return
    const el = formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)
    el?.focus()
  }, [state, errors])

  useEffect(() => {
    if (state.status === 'sent') doneRef.current?.focus()
  }, [state.status])

  if (state.status === 'sent') {
    const key = state.needs?.[0] ?? 'Not sure yet'
    const cards = suggestions[key] ?? suggestions['Not sure yet'] ?? []
    return (
      <div className="rounded-card bg-paper p-6 sm:p-10">
        <h2 ref={doneRef} tabIndex={-1} className="text-heading text-deep outline-none">
          Thanks{state.firstName ? `, ${state.firstName}` : ''}. Your brief is with us
          <Dot />
        </h2>
        <p className="mt-4 max-w-measure text-lead text-steel">
          You will hear back within one working day. In the meantime, you might find these useful.
        </p>
        {cards.length > 0 && (
          <ul className="mt-8 grid gap-5 md:grid-cols-2">
            {cards.map(c => (
              <li key={c.slug}>
                <ResourceCard r={c} onPaper />
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }

  const v = state.values
  const err = (f: BriefField) => (errors[f] ? `${f}-error` : undefined)

  return (
    <form ref={formRef} action={action} noValidate className="space-y-8 rounded-card bg-paper p-6 sm:p-10">
      <input type="hidden" name="source" value="start" />
      <input type="hidden" name="started" value={started} />
      <input type="hidden" name="page" value={page} />
      <input type="hidden" name="estimator" value={defaults.estimator} />
      {/* A field for bots only. People never see it or tab into it. */}
      <div aria-hidden="true" className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="company_url">Company website</label>
        <input id="company_url" type="text" name="company_url" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === 'failed' && state.message && (
        <div role="alert" className="rounded-control border-l-4 border-petrol bg-mist p-4 text-body font-semibold text-petrol">
          {state.message}
        </div>
      )}

      <div>
        <label htmlFor="name" className="text-subhead text-deep">
          Your name
        </label>
        <input id="name" name="name" type="text" autoComplete="name" defaultValue={v?.name} aria-invalid={!!errors.name || undefined} aria-describedby={err('name')} className={inputClass} />
        <FieldError id="name-error" message={errors.name} />
      </div>

      <div>
        <label htmlFor="email" className="text-subhead text-deep">
          Email
        </label>
        <p id="email-help" className="mt-1 text-body text-steel">
          We only use this to reply.
        </p>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          defaultValue={v?.email}
          aria-invalid={!!errors.email || undefined}
          aria-describedby={['email-help', err('email')].filter(Boolean).join(' ')}
          className={inputClass}
        />
        <FieldError id="email-error" message={errors.email} />
      </div>

      <div>
        <label htmlFor="business" className="text-subhead text-deep">
          Business name and website
        </label>
        <p id="business-help" className="mt-1 text-body text-steel">
          If you have a website, paste the address.
        </p>
        <input
          id="business"
          name="business"
          type="text"
          autoComplete="organization"
          defaultValue={v?.business}
          aria-invalid={!!errors.business || undefined}
          aria-describedby={['business-help', err('business')].filter(Boolean).join(' ')}
          className={inputClass}
        />
        <FieldError id="business-error" message={errors.business} />
      </div>

      <fieldset>
        <legend className="text-subhead text-deep">What do you need help with?</legend>
        <Chips name="needs" type="checkbox" options={NEED_OPTIONS} value={needs} onChange={setNeeds} invalid={!!errors.needs} describedBy={err('needs')} />
        <FieldError id="needs-error" message={errors.needs} />
      </fieldset>

      <div>
        <label htmlFor="brief" className="text-subhead text-deep">
          What is slowing the business down?
        </label>
        <p id="brief-help" className="mt-1 text-body text-steel">
          For example: &ldquo;Quotes take hours and live in a spreadsheet.&rdquo;
        </p>
        <textarea
          id="brief"
          name="brief"
          rows={6}
          defaultValue={v?.brief ?? defaults.brief}
          aria-invalid={!!errors.brief || undefined}
          aria-describedby={['brief-help', err('brief')].filter(Boolean).join(' ')}
          className={`${inputClass} resize-y`}
        />
        <FieldError id="brief-error" message={errors.brief} />
      </div>

      <fieldset>
        <legend className="text-subhead text-deep">How many people work in the business?</legend>
        <Chips name="size" type="radio" options={SIZE_OPTIONS} value={size} onChange={setSize} invalid={!!errors.size} describedBy={err('size')} />
        <FieldError id="size-error" message={errors.size} />
      </fieldset>

      <fieldset>
        <legend className="text-subhead text-deep">
          Roughly what budget do you have in mind? <span className="text-body font-normal text-steel">(optional)</span>
        </legend>
        <p className="mt-1 text-body text-steel">It helps us suggest the right approach.</p>
        <Chips name="budget" type="radio" options={BUDGET_OPTIONS} value={budget} onChange={setBudget} />
      </fieldset>

      <div className="border-t border-petrol/15 pt-8">
        <Submit />
        <p className="mt-4 text-body text-steel">No mailing list, no follow up sequence. Just a reply from a person.</p>
      </div>
    </form>
  )
}
