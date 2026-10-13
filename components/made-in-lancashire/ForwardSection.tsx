'use client'

import { useEffect, useRef, useState } from 'react'
import Checklist from '@/components/ui/Checklist'
import SectionTitle from '@/components/ui/SectionTitle'
import { REPLY_WORKING_DAYS } from '@/lib/made-in-lancashire/config'
import ApplicationForm from './ApplicationForm'
import { BUTTON_PRIMARY } from './FormBits'
import NominationForm from './NominationForm'

/**
 * "Put your business forward.": the copy, then whichever form the visitor
 * opened. "Submit your business" opens the application form; the smaller
 * "Nominate a business" link opens the nomination form. Links anywhere on the
 * page to #apply or #nominate open the matching form here.
 */

type Open = 'apply' | 'nominate' | null

export default function ForwardSection() {
  const [open, setOpen] = useState<Open>(null)
  const formArea = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fromHash = () => {
      const h = window.location.hash.replace('#', '')
      if (h === 'apply' || h === 'nominate') {
        setOpen(h)
        requestAnimationFrame(() => formArea.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
      }
    }
    // Links elsewhere on the page may be router links, which change the hash
    // without a hashchange event, or may point at the hash already showing.
    // Catch the click itself as well.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href$="#apply"], a[href$="#nominate"]') as HTMLAnchorElement | null
      if (!a || a.pathname !== window.location.pathname) return
      e.preventDefault()
      history.replaceState(null, '', a.hash)
      fromHash()
    }
    fromHash()
    window.addEventListener('hashchange', fromHash)
    document.addEventListener('click', onClick, true)
    return () => {
      window.removeEventListener('hashchange', fromHash)
      document.removeEventListener('click', onClick, true)
    }
  }, [])

  const show = (which: Exclude<Open, null>) => {
    setOpen(which)
    history.replaceState(null, '', `#${which}`)
    requestAnimationFrame(() => {
      formArea.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      formArea.current?.querySelector<HTMLElement>('input:not([type=hidden]):not([tabindex="-1"])')?.focus({ preventScroll: true })
    })
  }

  return (
    <div>
      {/* Anchors for links from elsewhere on the page. */}
      <span id="apply" className="relative -top-24 block" aria-hidden="true" />
      <span id="nominate" className="relative -top-24 block" aria-hidden="true" />
      <div className="max-w-3xl">
        <SectionTitle id="forward-title">Put your business forward.</SectionTitle>
        <p className="mt-4 max-w-measure text-lead text-steel">
          If you run an independent business in Lancashire, we&apos;d love to hear about it. Tell us what you do, add a few photos and send it over. It&apos;s free, and we read every application.
        </p>
        <p className="mt-6 text-body font-semibold text-deep">Every approved business gets:</p>
        <Checklist
          className="mt-4"
          items={[
            'A free page in the Made in Lancashire directory, with your photos and links.',
            'A founding member place in our Lancashire business network when it launches.',
            'A chance to be featured on our Instagram and here on our site.',
          ]}
        />
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <button type="button" className={BUTTON_PRIMARY} onClick={() => show('apply')} aria-expanded={open === 'apply'} aria-controls="forward-forms">
            Submit your business
          </button>
          <p className="text-small text-steel">We&apos;ll get back to you within {REPLY_WORKING_DAYS} working days.</p>
        </div>
        <p className="mt-6 text-body text-steel">
          You can also nominate a business you love.{' '}
          <button
            type="button"
            onClick={() => show('nominate')}
            aria-expanded={open === 'nominate'}
            aria-controls="forward-forms"
            className="inline-flex min-h-[2.75rem] items-center font-semibold text-petrol underline decoration-petrol/40 decoration-2 underline-offset-[5px] hover:decoration-petrol"
          >
            Nominate a business
          </button>
        </p>
      </div>

      <div id="forward-forms" ref={formArea} className="scroll-mt-24">
        {open === 'apply' && (
          <section aria-labelledby="apply-form-title" className="mt-10 max-w-3xl">
            <h3 id="apply-form-title" className="sr-only">
              Submit your business
            </h3>
            <ApplicationForm />
          </section>
        )}
        {open === 'nominate' && (
          <section aria-labelledby="nominate-form-title" className="mt-10 max-w-3xl">
            <h3 id="nominate-form-title" className="text-title text-deep">
              Nominate a business
            </h3>
            <p className="mt-2 text-body text-steel">Tell us about a Lancashire business that deserves a shout. A big win, a new opening, or just the place everyone round here loves.</p>
            <div className="mt-6">
              <NominationForm />
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
