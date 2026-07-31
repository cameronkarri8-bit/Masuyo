'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LogoFull from '@/components/LogoFull'

/**
 * One dropdown, capped at eight links. The old mega menu carried 45 or so and
 * buried everything. The deep pages are all still live and are reachable from
 * the footer sitemap instead.
 */
const WHAT_WE_DO = [
  { label: 'Websites', href: '/services/web-design', blurb: 'Fast, modern sites that convert' },
  { label: 'Web apps and software', href: '/technology/web-applications', blurb: 'Custom builds for real workflows' },
  { label: 'Marketing and SEO', href: '/marketing', blurb: 'More enquiries, less guesswork' },
  { label: 'Automation and AI', href: '/technology/automation', blurb: 'Get your time back' },
  { label: 'Hosting and support', href: '/technology/hosting', blurb: 'Looked after, properly' },
  { label: 'Custom products', href: '/products/bespoke', blurb: 'Built around your business' },
]

const PRIMARY = [
  { label: 'Work', href: '/work' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
]

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropOpen, setDropOpen] = useState(false)
  const [mobileDropOpen, setMobileDropOpen] = useState(false)
  const pathname = usePathname()
  const dropRef = useRef<HTMLDivElement>(null)

  // Close everything on navigation.
  useEffect(() => {
    setMenuOpen(false)
    setDropOpen(false)
    setMobileDropOpen(false)
  }, [pathname])

  // Lock the page behind the mobile drawer.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Escape closes whichever layer is open, and click outside closes the dropdown.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setDropOpen(false)
      setMenuOpen(false)
    }
    const onClick = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [])

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-white/90 backdrop-blur">
      <nav
        aria-label="Main"
        className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5 sm:px-6 lg:px-8"
      >
        <Link href="/" aria-label="Masuyo Digital home" className="flex flex-shrink-0 items-center">
          <LogoFull className="h-6 w-auto" />
        </Link>

        {/* ---------------- Desktop ---------------- */}
        <div className="hidden items-center gap-1 lg:flex">
          <div ref={dropRef} className="relative">
            <button
              type="button"
              onClick={() => setDropOpen(o => !o)}
              aria-expanded={dropOpen}
              aria-haspopup="true"
              className="flex items-center gap-1.5 rounded-full px-4 py-2.5 font-sans text-sm font-medium text-ink transition-colors hover:bg-blue-tint focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
            >
              What we do
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
                className={`transition-transform duration-200 ${dropOpen ? 'rotate-180' : ''}`}
              >
                <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {dropOpen && (
              <div className="absolute left-0 top-full mt-2 w-[26rem] overflow-hidden rounded-card border border-border bg-white p-2 shadow-2xl">
                {WHAT_WE_DO.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-2xl px-4 py-3 transition-colors hover:bg-blue-tint focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
                  >
                    <span className="block font-sans text-sm font-semibold text-ink">{item.label}</span>
                    <span className="mt-0.5 block font-sans text-xs text-mid">{item.blurb}</span>
                  </Link>
                ))}
                <Link
                  href="/services"
                  className="mt-1 flex items-center gap-1.5 border-t border-border px-4 py-3 font-sans text-sm font-semibold text-blue2 transition-colors hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
                >
                  See everything
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 7h8M7.5 4l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            )}
          </div>

          {PRIMARY.map(item => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={`rounded-full px-4 py-2.5 font-sans text-sm font-medium transition-colors hover:bg-blue-tint focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue ${
                isActive(item.href) ? 'text-blue2' : 'text-ink'
              }`}
            >
              {item.label}
            </Link>
          ))}

          <Link href="/start-a-project" className="btn-primary ml-3 !px-6 !py-3 !text-sm">
            Get an instant estimate
          </Link>
        </div>

        {/* ---------------- Mobile trigger ---------------- */}
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-expanded={menuOpen}
          aria-label="Open menu"
          className="flex h-11 w-11 items-center justify-center rounded-full text-navy transition-colors hover:bg-blue-tint focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue lg:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </nav>

      {/* ---------------- Mobile drawer ---------------- */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white lg:hidden">
          <div className="flex h-20 flex-shrink-0 items-center justify-between px-5 sm:px-6">
            <Link href="/" aria-label="Masuyo Digital home" className="flex items-center">
              <LogoFull className="h-6 w-auto" />
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="flex h-11 w-11 items-center justify-center rounded-full text-navy transition-colors hover:bg-blue-tint focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <path d="M5 5l12 12M17 5L5 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 pb-6 sm:px-6">
            <button
              type="button"
              onClick={() => setMobileDropOpen(o => !o)}
              aria-expanded={mobileDropOpen}
              className="flex w-full items-center justify-between py-4 text-left font-display text-3xl text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
            >
              What we do
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                aria-hidden="true"
                className={`text-mid transition-transform duration-200 ${mobileDropOpen ? 'rotate-180' : ''}`}
              >
                <path d="M4 7l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {mobileDropOpen && (
              <div className="mb-2 flex flex-col gap-1 border-l-2 border-blue/30 pl-4">
                {WHAT_WE_DO.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="py-2.5 font-sans text-base text-mid transition-colors hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/services"
                  className="py-2.5 font-sans text-base font-semibold text-blue2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
                >
                  See everything
                </Link>
              </div>
            )}

            {PRIMARY.map(item => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={`block py-4 font-display text-3xl transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue ${
                  isActive(item.href) ? 'text-blue2' : 'text-ink'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA pinned to the bottom of the drawer. */}
          <div className="flex-shrink-0 border-t border-border px-5 py-5 sm:px-6">
            <Link href="/start-a-project" className="btn-primary w-full">
              Get an instant estimate
            </Link>
            <Link
              href="/contact"
              className="mt-3 block text-center font-sans text-sm font-medium text-mid transition-colors hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
            >
              Talk to us
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
