'use client'

import { useState } from 'react'
import { buttonClasses } from '@/components/ui/Button'
import { Dot } from '@/components/ui/SectionTitle'
import { SHADOW } from './FormBits'

/**
 * "Contact": email and call buttons for a directory member.
 *
 * The email address never appears in the page as written: the server passes
 * it encoded (encodeEmail in lib/made-in-lancashire/directory.ts), and the
 * mailto link is built only when the button is pressed, which keeps it away
 * from simple scrapers. The address itself shows only after "Show email".
 * A phone number is fine as text.
 */

export const MAIL_SUBJECT = 'Found you on Made in Lancashire'

function decodeEmail(code: string): string {
  try {
    return new TextDecoder().decode(Uint8Array.from(atob(code), c => c.charCodeAt(0))).split('').reverse().join('')
  } catch {
    return ''
  }
}

/** A number as a tel: link: digits, with a leading + kept. */
export function telHref(phone: string): string {
  const t = phone.trim()
  return `tel:${t.startsWith('+') ? '+' : ''}${t.replace(/\D/g, '')}`
}

export default function ContactCard({ name, emailCode, phone }: { name: string; emailCode: string | null; phone: string | null }) {
  const [shown, setShown] = useState<string | null>(null)

  // The link's real address is filled in as it is pressed, just before the
  // browser follows it.
  const email = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const address = emailCode ? decodeEmail(emailCode) : ''
    if (address) e.currentTarget.href = `mailto:${address}?subject=${encodeURIComponent(MAIL_SUBJECT)}`
    else e.preventDefault()
  }

  return (
    <section aria-labelledby="contact-title" className={`rounded-card bg-paper p-6 sm:p-7 ${SHADOW}`}>
      <h2 id="contact-title" className="text-title text-deep">
        Contact
        <Dot />
      </h2>
      <div className="mt-5 flex flex-col gap-3">
        {emailCode && (
          <a href="#contact-title" onClick={email} className={buttonClasses('primary', false, true)}>
            Email {name}
          </a>
        )}
        {phone && (
          <a href={telHref(phone)} className={buttonClasses(emailCode ? 'secondary' : 'primary', false, true)}>
            Call {phone}
          </a>
        )}
      </div>
      {emailCode &&
        (shown ? (
          <p className="mt-4 break-all text-body text-deep">{shown}</p>
        ) : (
          <button
            type="button"
            onClick={() => setShown(decodeEmail(emailCode))}
            className="mt-3 inline-flex min-h-[2.75rem] items-center text-small font-semibold text-petrol underline decoration-petrol/40 underline-offset-4 hover:decoration-petrol"
          >
            Show email
          </button>
        ))}
    </section>
  )
}
