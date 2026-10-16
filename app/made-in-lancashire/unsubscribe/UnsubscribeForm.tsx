'use client'

import { useSearchParams } from 'next/navigation'
import { useRef, useState } from 'react'
import { buttonClasses } from '@/components/ui/Button'
import { Dot } from '@/components/ui/SectionTitle'
import TextLink from '@/components/ui/TextLink'
import { MIL_PATH, UNSUBSCRIBE_ENDPOINT } from '@/lib/made-in-lancashire/config'

type Status = 'idle' | 'sending' | 'done' | 'not_found' | 'error'

export default function UnsubscribeForm() {
  const token = useSearchParams().get('t') ?? ''
  const [status, setStatus] = useState<Status>(token ? 'idle' : 'not_found')
  const headingRef = useRef<HTMLHeadingElement>(null)

  async function leave() {
    setStatus('sending')
    try {
      const res = await fetch(UNSUBSCRIBE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })
      setStatus(res.ok ? 'done' : res.status === 404 ? 'not_found' : 'error')
    } catch {
      setStatus('error')
    }
    requestAnimationFrame(() => headingRef.current?.focus())
  }

  const title =
    status === 'done' ? 'You’re unsubscribed' : status === 'not_found' ? 'That link has not worked' : 'Leave the mailing list'

  return (
    <div aria-live="polite">
      <h1 id="unsubscribe-title" ref={headingRef} tabIndex={-1} className="text-heading text-petrol outline-none">
        {title}
        <Dot />
      </h1>
      {status === 'done' ? (
        <p className="mt-4 text-lead text-steel">You won&rsquo;t get any more Made in Lancashire emails. Thanks for being part of it.</p>
      ) : status === 'not_found' ? (
        <p className="mt-4 text-lead text-steel">
          The link may be incomplete. Email{' '}
          <a href="mailto:hello@masuyodigital.com?subject=Unsubscribe" className="font-semibold text-petrol underline">
            hello@masuyodigital.com
          </a>{' '}
          and we&rsquo;ll take you off the list.
        </p>
      ) : (
        <>
          <p className="mt-4 text-lead text-steel">Tap the button and you&rsquo;ll stop getting the Made in Lancashire round-up.</p>
          <button type="button" onClick={leave} disabled={status === 'sending'} className={`${buttonClasses('primary')} mt-8 w-full disabled:opacity-60 sm:w-auto`}>
            {status === 'sending' ? 'Unsubscribing' : 'Unsubscribe me'}
          </button>
          {status === 'error' && (
            <p className="mt-4 text-small font-semibold text-[#B42318]">
              That did not go through. Try again, or email hello@masuyodigital.com.
            </p>
          )}
        </>
      )}
      <div className="mt-10">
        <TextLink href={MIL_PATH}>Back to Made in Lancashire</TextLink>
      </div>
    </div>
  )
}
