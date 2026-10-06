'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import Wordmark from '@/components/brand/Wordmark'
import { buttonClasses } from '@/components/ui/Button'
import { NAV_LINKS, PRIMARY_CTA, isActive } from '@/lib/navigation'
import { SITE } from '@/lib/site'

const NAV_HEIGHT = 72

/** The short hand drawn underline under the current page's link. */
function ActiveMark({ dark }: { dark: boolean }) {
  return (
    <svg
      viewBox="0 0 140 16"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -bottom-1.5 left-0 h-2 w-full"
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M4 11C44 8 92 6 136 4"
        stroke={dark ? '#4FE0E6' : '#0F3B4F'}
        strokeWidth="2.5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

/**
 * The site header.
 *
 * Fixed, 72px tall. Mist with a thin line underneath once the page has
 * scrolled; petrol while it sits over a petrol hero, so the two read as one
 * band. Both states are driven by IntersectionObserver rather than a scroll
 * listener: one watches a marker at the very top of the page, the other
 * watches whichever section is marked data-nav-ground="dark".
 *
 * On a phone it becomes the wordmark and a menu button, which opens a full
 * screen panel with the links in large type and the button within thumb reach.
 */
export default function Nav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [overDark, setOverDark] = useState(false)
  const [open, setOpen] = useState(false)
  const topMarker = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Scrolled: the marker at the top of the page has left the screen.
  useEffect(() => {
    const marker = topMarker.current
    if (!marker) return
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting))
    observer.observe(marker)
    return () => observer.disconnect()
  }, [])

  // Over a dark hero: that section overlaps the band where the nav sits.
  useEffect(() => {
    setOverDark(false)
    const target = document.querySelector('[data-nav-ground="dark"]')
    if (!target) return
    let observer: IntersectionObserver | null = null
    const watch = () => {
      observer?.disconnect()
      const band = NAV_HEIGHT + 8
      observer = new IntersectionObserver(([entry]) => setOverDark(entry.isIntersecting), {
        rootMargin: `0px 0px -${Math.max(0, window.innerHeight - band)}px 0px`,
      })
      observer.observe(target)
    }
    watch()
    window.addEventListener('resize', watch)
    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', watch)
    }
  }, [pathname])

  // Close the menu whenever the page changes.
  useEffect(() => setOpen(false), [pathname])

  const close = useCallback(() => {
    setOpen(false)
    toggleRef.current?.focus()
  }, [])

  // While the menu is open: lock the page behind it, move focus in, keep it
  // in, and close on Escape.
  useEffect(() => {
    if (!open) return
    const panel = panelRef.current
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusables = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [])
    focusables()[0]?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
        return
      }
      if (e.key !== 'Tab') return
      const items = [toggleRef.current, ...focusables()].filter(Boolean) as HTMLElement[]
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKey)
    }
  }, [open, close])

  const dark = overDark || open

  return (
    <>
      <div ref={topMarker} aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-2 w-px" />
      {/* Holds the space the fixed header covers. */}
      <div aria-hidden="true" style={{ height: NAV_HEIGHT }} />

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
          dark
            ? 'ground-dark bg-petrol text-paper'
            : `bg-mist text-deep ${scrolled ? 'shadow-[0_1px_0_rgba(15,59,79,0.14)]' : ''}`
        }`}
        style={{ height: NAV_HEIGHT }}
      >
        <nav
          aria-label="Main"
          className="mx-auto flex h-full max-w-site items-center justify-between gap-6 px-5 sm:px-8"
        >
          <Link href="/" className="shrink-0 rounded-sm" aria-label="Masuyo, home">
            <Wordmark tone={dark ? 'paper' : 'petrol'} className="h-[26px] w-auto" title="Masuyo" />
          </Link>

          <ul className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map(link => {
              const active = isActive(pathname, link.href)
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={`relative inline-block py-1 text-[1rem] font-semibold transition-colors ${
                      dark
                        ? active
                          ? 'text-paper'
                          : 'text-mist hover:text-paper'
                        : active
                          ? 'text-petrol'
                          : 'text-deep hover:text-petrol'
                    }`}
                  >
                    {link.label}
                    {active && <ActiveMark dark={dark} />}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-3">
            <Link
              href={PRIMARY_CTA.href}
              className={`${buttonClasses('primary', dark)} hidden min-h-[2.75rem] px-5 py-2.5 sm:inline-flex`}
            >
              {PRIMARY_CTA.label}
            </Link>

            <button
              ref={toggleRef}
              type="button"
              className="inline-flex h-11 items-center gap-2 rounded-control px-2 text-[1rem] font-semibold lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(v => !v)}
            >
              <span>{open ? 'Close' : 'Menu'}</span>
              <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true" fill="none">
                {open ? (
                  <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                ) : (
                  <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </nav>
      </header>

      <div
        id="mobile-menu"
        ref={panelRef}
        // The display class must follow the state too: a display utility
        // outranks the hidden attribute, so hidden alone would leave it open.
        hidden={!open}
        className={`ground-dark fixed inset-x-0 bottom-0 z-40 flex-col overflow-y-auto bg-petrol px-5 pb-6 pt-6 text-paper sm:px-8 lg:hidden ${open ? 'flex' : 'hidden'}`}
        style={{ top: NAV_HEIGHT }}
      >
        <nav aria-label="Main, mobile" className="flex-1">
          <ul className="space-y-1">
            {NAV_LINKS.map(link => {
              const active = isActive(pathname, link.href)
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={`relative inline-block py-2 text-heading ${active ? 'text-paper' : 'text-mist'}`}
                  >
                    {link.label}
                    {active && <ActiveMark dark />}
                  </Link>
                </li>
              )
            })}
          </ul>
          <a href={`mailto:${SITE.email}`} className="mt-8 inline-block text-lead font-semibold text-paper underline decoration-aqua decoration-2 underline-offset-[5px]">
            {SITE.email}
          </a>
        </nav>
        <Link href={PRIMARY_CTA.href} className={`${buttonClasses('primary', true, true)} mt-8`}>
          {PRIMARY_CTA.label}
        </Link>
      </div>
    </>
  )
}
