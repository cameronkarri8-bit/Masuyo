'use client'

import { useState } from 'react'
import { ButtonLink } from '@/components/ui/Button'

/**
 * "You might need a system if..." The visitor ticks the lines that apply.
 * Once three are ticked, the closing line turns petrol and a button appears.
 * Nothing is saved or sent.
 *
 * Real checkboxes under the styling, so it works with a keyboard and a screen
 * reader, and the change is announced politely.
 */
const SIGNS = [
  'You track jobs, leads or stock in a spreadsheet.',
  'Customers ring to ask where their order or repair has got to.',
  'The same details get typed into two or three places.',
  'You pay for software like HubSpot and use a fraction of it.',
  'Only one person really knows how the admin works.',
  'Quotes, invoices or reminders go out late because someone forgot.',
]

export default function SignsChecklist() {
  const [ticked, setTicked] = useState<boolean[]>(() => SIGNS.map(() => false))
  const count = ticked.filter(Boolean).length
  const enough = count >= 3

  return (
    <div>
      <ul className="space-y-3">
        {SIGNS.map((sign, i) => (
          <li key={sign}>
            <label
              className={`flex cursor-pointer items-start gap-4 rounded-control px-4 py-3.5 transition-colors ${
                ticked[i] ? 'bg-paper' : 'bg-paper/60 hover:bg-paper'
              }`}
            >
              <input
                type="checkbox"
                className="peer sr-only"
                checked={ticked[i]}
                onChange={() => setTicked(t => t.map((v, k) => (k === i ? !v : v)))}
              />
              <span
                aria-hidden="true"
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 border-petrol peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-petrol"
              >
                {ticked[i] && (
                  <svg viewBox="0 0 80 66" className="h-4 w-5" fill="none">
                    <path d="M5 34C12 42 19 50 26 59C40 40 56 21 75 5" stroke="#0F3B4F" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <span className="text-body text-deep">{sign}</span>
            </label>
          </li>
        ))}
      </ul>
      <div aria-live="polite" className="mt-8">
        <p className={`text-subhead transition-colors ${enough ? 'text-petrol' : 'text-steel'}`}>
          If three or more sound familiar, a custom system usually pays for itself.
        </p>
        {enough && (
          <div className="mt-5">
            <ButtonLink href="/start?need=system">Talk it through</ButtonLink>
          </div>
        )}
      </div>
    </div>
  )
}
