'use client'

import { useEffect, useState } from 'react'
import type { Heading } from '@/lib/resources'

/**
 * The contents list. On wide screens it sits in the left margin and marks the
 * section being read. On a phone it is a "Jump to" list that opens on tap.
 */
export function ContentsRail({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const els = headings.map(h => document.getElementById(h.id)).filter(Boolean) as HTMLElement[]
    if (els.length === 0) return
    // The active section is the last heading above a line a third of the way
    // down the screen. Checked on scroll, at most once a frame. An observer
    // alone misses instant jumps (a click on "back to top", a restored scroll
    // position), because no heading changes state relative to the screen.
    let frame = 0
    const pick = () => {
      frame = 0
      const line = window.innerHeight * 0.33
      let current: string | null = null
      for (const el of els) if (el.getBoundingClientRect().top <= line) current = el.id
      setActive(current ?? els[0].id)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(pick)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    pick()
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [headings])

  return (
    <nav aria-label="Contents" className="sticky top-28">
      <p className="text-small text-steel">Contents</p>
      <ol className="mt-4 space-y-1 border-l-2 border-petrol/15">
        {headings.map(h => {
          const on = active === h.id
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                aria-current={on ? 'location' : undefined}
                className={`-ml-0.5 block border-l-2 py-1.5 pl-4 text-[0.95rem] leading-snug transition-colors ${
                  on ? 'border-petrol font-semibold text-petrol' : 'border-transparent text-steel hover:text-deep'
                }`}
              >
                {h.text}
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export function JumpTo({ headings }: { headings: Heading[] }) {
  return (
    <details className="group rounded-card bg-paper">
      <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-body font-semibold text-deep">
        Jump to
        <svg viewBox="0 0 16 16" className="h-4 w-4 text-petrol transition-transform group-open:rotate-180" fill="none" aria-hidden="true">
          <path d="M3.5 6 8 10.5 12.5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>
      <ol className="space-y-1 px-5 pb-4">
        {headings.map(h => (
          <li key={h.id}>
            <a href={`#${h.id}`} className="block py-1.5 text-body text-petrol underline decoration-petrol/30 underline-offset-4">
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </details>
  )
}
