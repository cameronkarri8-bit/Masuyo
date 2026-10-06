'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { buttonClasses } from '@/components/ui/Button'
import { careFromText, ESTIMATOR, estimate, gbp, type EstimatorChoice } from '@/lib/pricing'

/**
 * Get a rough website price in a minute.
 *
 * Three questions, a live range. Every figure comes from lib/pricing.ts and
 * the range is clamped to the published website range, so it can never
 * disagree with the cards above it.
 *
 * The result stays in view beside the choices on desktop. On a phone it is a
 * bar pinned to the bottom of the screen while the estimator is on screen.
 * The range changes with a quick fade, never a counting animation.
 */

function Chip({
  type,
  name,
  checked,
  onChange,
  children,
}: {
  type: 'radio' | 'checkbox'
  name: string
  checked: boolean
  onChange: () => void
  children: React.ReactNode
}) {
  return (
    <label className="cursor-pointer">
      <input type={type} name={name} checked={checked} onChange={onChange} className="peer sr-only" />
      <span
        className={`inline-flex min-h-[2.75rem] items-center gap-2 rounded-full px-4 py-2 text-[1rem] font-semibold ring-2 ring-inset transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-petrol ${
          checked ? 'bg-petrol text-paper ring-petrol' : 'bg-paper text-petrol ring-petrol/30 hover:ring-petrol'
        }`}
      >
        {children}
      </span>
    </label>
  )
}

export function estimatorHref(choice: EstimatorChoice, range: { low: number; high: number } | null) {
  const params = new URLSearchParams({ from: 'estimator' })
  if (choice.size) params.set('size', choice.size)
  if (choice.features.length) params.set('features', choice.features.join(','))
  if (choice.words) params.set('words', choice.words)
  if (range) params.set('range', `${range.low}-${range.high}`)
  return `/start?${params.toString()}`
}

export default function Estimator() {
  const [choice, setChoice] = useState<EstimatorChoice>({ features: [] })
  const range = useMemo(() => estimate(choice), [choice])
  const [inView, setInView] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [fadeKey, setFadeKey] = useState(0)

  useEffect(() => setFadeKey(k => k + 1), [range?.low, range?.high])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.05 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const toggleFeature = (id: string) =>
    setChoice(c => ({ ...c, features: c.features.includes(id) ? c.features.filter(f => f !== id) : [...c.features, id] }))

  const value = range ? `${gbp(range.low)} to ${gbp(range.high)}` : null
  const href = estimatorHref(choice, range)

  const result = (
    <div aria-live="polite">
      <p className="text-small text-mist">Your rough range</p>
      {value ? (
        <p key={fadeKey} className="fade-in mt-1 text-heading text-paper">
          {value}
        </p>
      ) : (
        <p className="mt-2 text-subhead text-paper">Pick a few options to see a rough range.</p>
      )}
    </div>
  )

  return (
    // On a phone the pinned bar covers the bottom of the screen, so the
    // estimator carries matching padding and its last choices can scroll clear.
    <div ref={sectionRef} className="grid gap-8 pb-44 sm:pb-0 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-12">
      <div className="space-y-10 rounded-card bg-paper p-6 sm:p-8">
        <fieldset>
          <legend className="text-subhead text-deep">How big is the site?</legend>
          <div className="mt-4 flex flex-wrap gap-3">
            {ESTIMATOR.size.map(o => (
              <Chip key={o.id} type="radio" name="size" checked={choice.size === o.id} onChange={() => setChoice(c => ({ ...c, size: o.id }))}>
                {o.label}
              </Chip>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-subhead text-deep">
            What should it do? <span className="text-body font-normal text-steel">(choose any)</span>
          </legend>
          <div className="mt-4 flex flex-wrap gap-3">
            {ESTIMATOR.features.map(o => (
              <Chip key={o.id} type="checkbox" name="features" checked={choice.features.includes(o.id)} onChange={() => toggleFeature(o.id)}>
                {o.label}
              </Chip>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-subhead text-deep">Who writes the words?</legend>
          <div className="mt-4 flex flex-wrap gap-3">
            {ESTIMATOR.words.map(o => (
              <Chip key={o.id} type="radio" name="words" checked={choice.words === o.id} onChange={() => setChoice(c => ({ ...c, words: o.id }))}>
                {o.label}
              </Chip>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Desktop and tablet: the result stays beside the choices. */}
      <div className="hidden sm:block">
        <div className="ground-dark sticky top-28 rounded-card bg-petrol p-7 text-paper sm:p-8">
          {result}
          <p className="mt-4 text-body text-mist">
            Plus Care from {careFromText}. We confirm a fixed price after a short call.
          </p>
          <a href={href} className={`${buttonClasses('primary', true, true)} mt-7`}>
            Send me a fixed quote
          </a>
        </div>
      </div>

      {/* Phone: a bar pinned to the bottom of the screen while the estimator is on screen. */}
      <div
        className={`ground-dark fixed inset-x-0 bottom-0 z-30 border-t border-paper/15 bg-petrol px-5 py-4 text-paper shadow-[0_-8px_24px_rgba(13,26,32,0.25)] transition-transform duration-200 sm:hidden ${
          inView ? 'translate-y-0' : 'translate-y-full'
        }`}
        aria-hidden={!inView}
      >
        <p className="text-small text-mist">Your rough range</p>
        <p className="text-subhead text-paper">{value ?? 'Pick a few options to see a rough range.'}</p>
        <a href={href} tabIndex={inView ? 0 : -1} className={`${buttonClasses('primary', true, true)} mt-3`}>
          Send me a fixed quote
        </a>
      </div>
      <p className="text-body text-steel sm:hidden">
        Plus Care from {careFromText}. We confirm a fixed price after a short call.
      </p>
    </div>
  )
}
