'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { SingleShop, type Motif } from '@/components/brand/illustrations/HighStreet'
import { SHADOW } from './FormBits'

export interface DirectoryCard {
  slug: string
  href: string
  business_name: string
  town: string
  category: string
  one_line: string
  cover: string | null
}

/** A shopfront for each category, for members with no photo yet. */
export const CATEGORY_MOTIF: Record<string, Motif> = {
  'Food and drink': 'cafe',
  Retail: 'florist',
  Trades: 'hardware',
  Services: 'bikes',
  Wellbeing: 'salon',
  Makers: 'bakery',
  Other: 'empty',
}

export function FoundingTag({ dark = false }: { dark?: boolean }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[13px] font-semibold leading-none ${dark ? 'border border-paper/40 text-paper' : 'bg-petrol text-paper'}`}>
      Founding member
    </span>
  )
}

function Chips({ label, options, value, onChange }: { label: string; options: string[]; value: string | null; onChange: (v: string | null) => void }) {
  const chip = (active: boolean) =>
    `min-h-[2.75rem] rounded-full border-2 px-4 py-2 text-small font-semibold transition-colors ${
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

export default function DirectoryGrid({ members }: { members: DirectoryCard[] }) {
  const [town, setTown] = useState<string | null>(null)
  const [category, setCategory] = useState<string | null>(null)
  const towns = useMemo(() => Array.from(new Set(members.map(m => m.town))).sort(), [members])
  const categories = useMemo(() => Array.from(new Set(members.map(m => m.category))).sort(), [members])
  const shown = members.filter(m => (!town || m.town === town) && (!category || m.category === category))

  return (
    <div>
      {members.length > 1 && (
        <div className="space-y-3">
          <Chips label="Towns" options={towns} value={town} onChange={setTown} />
          <Chips label="Categories" options={categories} value={category} onChange={setCategory} />
        </div>
      )}
      <p className="sr-only" aria-live="polite">
        {shown.length} {shown.length === 1 ? 'business' : 'businesses'} shown
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {shown.map(m => (
          <li key={m.slug}>
            <Link href={m.href} className={`group flex h-full flex-col overflow-hidden rounded-card bg-paper transition-transform duration-200 ease-brand hover:-translate-y-1 ${SHADOW}`}>
              {m.cover ? (
                <Image src={m.cover} alt="" width={800} height={600} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="aspect-[4/3] h-auto w-full bg-mist object-cover" />
              ) : (
                <div className="ground-dark bg-petrol px-6 pt-4">
                  <SingleShop motif={CATEGORY_MOTIF[m.category] ?? 'empty'} className="mx-auto h-auto w-full max-w-[16rem]" />
                </div>
              )}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-subhead text-deep underline decoration-transparent decoration-2 underline-offset-[5px] transition-colors group-hover:decoration-petrol">{m.business_name}</h3>
                <p className="mt-1 text-small text-steel">
                  {m.town} · {m.category}
                </p>
                <p className="mt-3 flex-1 text-body text-steel">{m.one_line}</p>
                <div className="mt-4">
                  <FoundingTag />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {shown.length === 0 && <p className="mt-8 text-body text-steel">No members match those filters yet.</p>}
    </div>
  )
}
