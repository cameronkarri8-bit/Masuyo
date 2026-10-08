'use client'

import { useId, useState } from 'react'

/**
 * Questions and answers. One answer open at a time, and all closed to start,
 * so the page does not jump when it loads.
 *
 * Each question is a real button with aria-expanded and aria-controls, so it
 * works with a keyboard and a screen reader. Answers stay in the markup when
 * closed (hidden, not removed), so search engines and the FAQPage schema see
 * the same text a reader does.
 */

export interface QA {
  question: string
  answer: React.ReactNode
}

export default function Accordion({ items, dark = false }: { items: QA[]; dark?: boolean }) {
  const [open, setOpen] = useState<number | null>(null)
  const base = useId()

  return (
    <div className={`border-t ${dark ? 'border-paper/15' : 'border-petrol/15'}`}>
      {items.map((item, i) => {
        const isOpen = open === i
        const buttonId = `${base}-q${i}`
        const panelId = `${base}-a${i}`
        return (
          <div key={item.question} className={`border-b ${dark ? 'border-paper/15' : 'border-petrol/15'}`}>
            <h3 className="m-0">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className={`flex w-full items-start justify-between gap-6 py-5 text-left text-subhead ${
                  dark ? 'text-paper' : 'text-deep'
                }`}
              >
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className={`relative mt-1.5 h-4 w-4 shrink-0 ${dark ? 'text-aqua' : 'text-petrol'}`}
                >
                  <span className="absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 rounded bg-current" />
                  <span
                    className={`absolute left-1/2 top-0 h-4 w-0.5 -translate-x-1/2 rounded bg-current transition-transform duration-200 ${
                      isOpen ? 'scale-y-0' : 'scale-y-100'
                    }`}
                  />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className={`max-w-measure pb-6 text-body ${dark ? 'text-mist' : 'text-steel'}`}
            >
              {item.answer}
            </div>
          </div>
        )
      })}
    </div>
  )
}
