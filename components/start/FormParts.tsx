/**
 * The pieces the brief forms share: the input style, the error line under a
 * field, and the chip buttons for single and multiple choice. Used by Start a
 * project and the handover form, so the two look and behave the same.
 */

export const inputClass =
  'mt-2 block w-full rounded-control border-2 border-petrol/25 bg-paper px-4 py-3 text-body text-deep placeholder:text-steel/80 focus:border-petrol focus:outline-none aria-[invalid=true]:border-petrol'

export function FieldError({ id, message }: { id: string; message?: string }) {
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

export function Chips({
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
