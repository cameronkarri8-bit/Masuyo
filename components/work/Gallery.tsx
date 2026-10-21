'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { PHONE_RADIUS } from '@/components/work/AppScreens'
import type { WorkImage } from '@/lib/work'

/**
 * Every screen for a project. On a phone it is a row you swipe; on wider
 * screens a grid. Tapping a screen opens it larger, with previous and next,
 * and Escape or the close button to leave.
 */
export default function Gallery({ images, name }: { images: WorkImage[]; name: string }) {
  const [open, setOpen] = useState<number | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const opener = useRef<HTMLButtonElement | null>(null)

  const show = (i: number, el: HTMLButtonElement) => {
    opener.current = el
    setOpen(i)
  }
  const close = useCallback(() => setOpen(null), [])
  const step = useCallback((d: number) => setOpen(i => (i === null ? i : (i + d + images.length) % images.length)), [images.length])

  useEffect(() => {
    const el = dialog.current
    if (!el) return
    if (open !== null && !el.open) el.showModal()
    if (open === null && el.open) {
      el.close()
      opener.current?.focus()
    }
  }, [open])

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, step])

  const current = open === null ? null : images.at(open)
  /** An app's screens are all phone screens: a row of six on wide screens. */
  const allPhones = images.every(i => i.device === 'phone')

  return (
    <>
      <ul
        aria-label={`Screens from the ${name}`}
        className={`scroll-row -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-3 sm:-mx-8 sm:px-8 md:mx-0 md:grid md:items-start md:gap-8 md:overflow-visible md:px-0 ${
          allPhones ? 'md:grid-cols-3 lg:grid-cols-6 lg:gap-6' : 'md:grid-cols-2 lg:grid-cols-3'
        }`}
      >
        {images.map((img, i) => (
          <li key={img.src} className={`shrink-0 snap-start ${img.device === 'phone' ? 'w-[58%] md:w-auto' : 'w-[82%] md:w-auto'}`}>
            <figure>
              <button
                type="button"
                onClick={e => show(i, e.currentTarget)}
                className={`block w-full text-left transition-transform duration-300 ease-brand hover:-translate-y-0.5 ${
                  img.device === 'phone' ? '' : 'overflow-hidden rounded-[0.875rem] bg-mist p-3 sm:p-4'
                }`}
                aria-label={`Open larger: ${img.caption ?? img.alt}`}
              >
                <span className="mx-auto block">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    sizes={img.device === 'phone' ? '(min-width: 1024px) 15vw, (min-width: 768px) 30vw, 58vw' : '(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 82vw'}
                    loading="lazy"
                    className={`block h-auto w-full ${img.device === 'phone' ? `${PHONE_RADIUS} shadow-[0_18px_36px_-18px_rgba(8,31,40,0.4)] ring-1 ring-petrol/10` : 'rounded-[0.5rem] ring-1 ring-petrol/15'}`}
                  />
                </span>
              </button>
              {img.caption && <figcaption className="mt-3 text-small text-steel">{img.caption}</figcaption>}
            </figure>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        onClose={close}
        onClick={e => e.target === e.currentTarget && close()}
        aria-label={current ? (current.caption ?? current.alt) : undefined}
        className="m-auto max-h-[92dvh] w-[min(96vw,1200px)] bg-transparent p-0 backdrop:bg-deep/85"
      >
        {current && (
          <div className="flex flex-col items-center gap-4">
            <Image
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              sizes="96vw"
              className={`h-auto max-h-[78dvh] w-auto max-w-full object-contain ${current.device === 'phone' ? PHONE_RADIUS : 'rounded-[0.75rem]'}`}
            />
            <div className="flex w-full items-center justify-between gap-3 text-paper">
              <button type="button" onClick={() => step(-1)} className="min-h-11 min-w-11 rounded-full px-4 font-semibold hover:bg-paper/10">
                Previous
              </button>
              <p className="text-center text-small text-mist">
                {current.caption ?? current.alt}
                <span className="sr-only">
                  , screen {(open ?? 0) + 1} of {images.length}
                </span>
              </p>
              <div className="flex gap-1">
                <button type="button" onClick={() => step(1)} className="min-h-11 min-w-11 rounded-full px-4 font-semibold hover:bg-paper/10">
                  Next
                </button>
                <button type="button" onClick={close} className="min-h-11 min-w-11 rounded-full px-4 font-semibold hover:bg-paper/10">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  )
}
