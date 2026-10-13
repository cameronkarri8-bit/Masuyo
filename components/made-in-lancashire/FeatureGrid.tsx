'use client'

import { useMemo, useState } from 'react'
import FeatureCard, { type CardFeature } from './FeatureCard'

/**
 * Every feature so far, newest first, with chips to filter by town and by
 * category. The chips are toggle buttons (aria-pressed), and the count of
 * matching features is announced politely as it changes.
 */
function Chips({ label, options, value, onChange }: { label: string; options: string[]; value: string | null; onChange: (v: string | null) => void }) {
  const chip = (active: boolean) =>
    `min-h-[2.5rem] rounded-full border-2 px-4 py-1.5 text-small font-semibold transition-colors ${
      active ? 'border-petrol bg-petrol text-paper' : 'border-petrol/25 bg-paper text-petrol hover:border-petrol'
    }`
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      <button type="button" aria-pressed={value === null} className={chip(value === null)} onClick={() => onChange(null)}>
        All {label.toLowerCase()}
      </button>
      {options.map(o => (
        <button key={o} type="button" aria-pressed={value === o} className={chip(value === o)} onClick={() => onChange(value === o ? null : o)}>
          {o}
        </button>
      ))}
    </div>
  )
}

export default function FeatureGrid({ features }: { features: CardFeature[] }) {
  const [town, setTown] = useState<string | null>(null)
  const [category, setCategory] = useState<string | null>(null)
  const towns = useMemo(() => Array.from(new Set(features.map(f => f.town))).sort(), [features])
  const categories = useMemo(() => Array.from(new Set(features.map(f => f.category))).sort(), [features])
  const shown = features.filter(f => (!town || f.town === town) && (!category || f.category === category))

  return (
    <div>
      <div className="space-y-3">
        <Chips label="Towns" options={towns} value={town} onChange={setTown} />
        <Chips label="Categories" options={categories} value={category} onChange={setCategory} />
      </div>
      <p className="sr-only" aria-live="polite">
        {shown.length} {shown.length === 1 ? 'feature' : 'features'} shown
      </p>
      {shown.length > 0 ? (
        <ul className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {shown.map(f => (
            <li key={f.slug}>
              <FeatureCard f={f} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-8 text-body text-steel">No features match those filters yet.</p>
      )}
    </div>
  )
}
