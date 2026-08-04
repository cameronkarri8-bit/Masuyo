'use client'

import { useState } from 'react'

export interface FaqItem {
  q: string
  a: string
}

function Row({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border">
      {/* The button sits inside a heading so the FAQ keeps a real outline. */}
      <h3>
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
          className="flex w-full items-center justify-between gap-4 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
        >
          <span className="font-sans text-base font-semibold text-ink">{item.q}</span>
          <span
            aria-hidden="true"
            className="flex-shrink-0 text-mid transition-transform"
            style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
              <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
        </button>
      </h3>
      <div className={`accordion-content ${open ? 'open' : ''}`}>
        <p className="pb-5 font-sans text-base leading-relaxed text-mid">{item.a}</p>
      </div>
    </div>
  )
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div>
      {items.map(item => (
        <Row key={item.q} item={item} />
      ))}
    </div>
  )
}
