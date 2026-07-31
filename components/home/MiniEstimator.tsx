'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  type Option,
  PROJECT_TYPES,
  FEATURES,
  MARKETING_GROWTH,
} from '@/lib/pricing'

/** Pull a real option out of the shared price list. Never retype a price. */
function opt(list: Option[], id: string): Option {
  const found = list.find(o => o.id === id)
  if (!found) throw new Error(`Unknown pricing option: ${id}`)
  return found
}

// The four most common starting points, straight from the full builder.
const BASES = [
  opt(PROJECT_TYPES, 'new-website'),
  opt(PROJECT_TYPES, 'website-redesign'),
  opt(PROJECT_TYPES, 'web-application'),
]

const ADD_ONS = [
  opt(FEATURES, 'cms-blog'),
  opt(FEATURES, 'ecommerce'),
  opt(FEATURES, 'booking'),
  opt(MARKETING_GROWTH, 'seo-setup'),
]

const HOSTING = opt(PROJECT_TYPES, 'hosting')

const money = (n: number) => `£${n.toLocaleString('en-GB')}`

/** Counts to a new total, unless the user prefers reduced motion. */
function useAnimatedTotal(target: number) {
  const [shown, setShown] = useState(target)
  const from = useRef(target)

  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      from.current = target
      setShown(target)
      return
    }

    const start = performance.now()
    const origin = from.current
    const delta = target - origin
    let frame = 0

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 420)
      const eased = 1 - Math.pow(1 - t, 3)
      setShown(Math.round(origin + delta * eased))
      if (t < 1) frame = requestAnimationFrame(tick)
      else from.current = target
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target])

  return shown
}

export default function MiniEstimator() {
  const [baseId, setBaseId] = useState(BASES[0].id)
  const [addOns, setAddOns] = useState<string[]>(['cms-blog'])
  const [hosting, setHosting] = useState(true)

  const base = BASES.find(b => b.id === baseId) ?? BASES[0]
  const chosen = ADD_ONS.filter(a => addOns.includes(a.id))
  const oneOff = base.price + chosen.reduce((sum, a) => sum + a.price, 0)
  const monthly = hosting ? HOSTING.price : 0
  const shown = useAnimatedTotal(oneOff)

  const toggle = (id: string) =>
    setAddOns(prev => (prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]))

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_22rem] lg:gap-8">
      {/* ---------------- Choices ---------------- */}
      <div className="rounded-card bg-white p-6 md:p-8">
        <fieldset>
          <legend className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-blue2">
            What do you need?
          </legend>
          <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
            {BASES.map(b => {
              const active = b.id === baseId
              return (
                <label
                  key={b.id}
                  className={`cursor-pointer rounded-2xl border-2 p-4 transition-colors ${
                    active ? 'border-blue bg-blue-tint' : 'border-border hover:border-blue/40'
                  } focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-blue`}
                >
                  <input
                    type="radio"
                    name="mini-base"
                    value={b.id}
                    checked={active}
                    onChange={() => setBaseId(b.id)}
                    className="sr-only"
                  />
                  <span className="block font-sans text-sm font-semibold text-ink">{b.label}</span>
                  <span className="mt-1 block font-sans text-xs text-mid">from {money(b.price)}</span>
                </label>
              )
            })}
          </div>
        </fieldset>

        <fieldset className="mt-8">
          <legend className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-blue2">
            Anything else?
          </legend>
          <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {ADD_ONS.map(a => {
              const active = addOns.includes(a.id)
              return (
                <label
                  key={a.id}
                  className={`flex cursor-pointer items-center justify-between gap-3 rounded-2xl border-2 p-4 transition-colors ${
                    active ? 'border-blue bg-blue-tint' : 'border-border hover:border-blue/40'
                  } focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-blue`}
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={active}
                      onChange={() => toggle(a.id)}
                      className="sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                        active ? 'border-blue bg-blue' : 'border-border'
                      }`}
                    >
                      {active && (
                        <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                          <path d="M1.5 4.5l3 3 5-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    <span className="font-sans text-sm font-medium text-ink">{a.label}</span>
                  </span>
                  <span className="whitespace-nowrap font-sans text-xs font-semibold text-mid">
                    +{money(a.price)}
                  </span>
                </label>
              )
            })}
          </div>
        </fieldset>

        <label className="mt-6 flex cursor-pointer items-center justify-between gap-3 rounded-2xl bg-blue-tint p-4 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-blue">
          <span className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={hosting}
              onChange={() => setHosting(h => !h)}
              className="sr-only"
            />
            <span
              aria-hidden="true"
              className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                hosting ? 'border-blue bg-blue' : 'border-white bg-white'
              }`}
            >
              {hosting && (
                <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                  <path d="M1.5 4.5l3 3 5-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
            <span className="font-sans text-sm font-medium text-ink">{HOSTING.label}</span>
          </span>
          <span className="whitespace-nowrap font-sans text-xs font-semibold text-mid">
            {money(HOSTING.price)} per month
          </span>
        </label>
      </div>

      {/* ---------------- Total ---------------- */}
      <div className="flex flex-col rounded-card bg-navy p-6 text-white md:p-8">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-blue">
          Your rough estimate
        </p>

        <p aria-hidden="true" className="mt-4 font-display text-6xl leading-none text-white">
          {money(shown)}
        </p>
        {monthly > 0 && (
          <p aria-hidden="true" className="mt-3 font-sans text-base text-white/70">
            plus {money(monthly)} per month
          </p>
        )}

        {/* The animated figure is decorative. This is what gets announced. */}
        <p aria-live="polite" className="sr-only">
          Estimated total {money(oneOff)}
          {monthly > 0 ? `, plus ${money(monthly)} per month` : ''}
        </p>

        <ul className="mt-7 flex flex-col gap-2 border-t border-white/15 pt-6">
          <li className="flex items-baseline justify-between gap-3 font-sans text-sm">
            <span className="text-white/70">{base.label}</span>
            <span className="whitespace-nowrap text-white">{money(base.price)}</span>
          </li>
          {chosen.map(a => (
            <li key={a.id} className="flex items-baseline justify-between gap-3 font-sans text-sm">
              <span className="text-white/70">{a.label}</span>
              <span className="whitespace-nowrap text-white">{money(a.price)}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-8">
          <Link href="/start-a-project" className="btn-primary w-full">
            Get the full estimate
          </Link>
          <p className="mt-4 font-sans text-xs leading-relaxed text-white/50">
            A guide price, not a quote. The full builder covers scale, timeline and
            everything else, and still does not ask for your email.
          </p>
        </div>
      </div>
    </div>
  )
}
