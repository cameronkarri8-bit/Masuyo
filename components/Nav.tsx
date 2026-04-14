'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const services = [
  { label: 'Web Design & Development', href: '/services/web-design' },
  { label: 'Digital Marketing', href: '/services/digital-marketing' },
  { label: 'Lead Generation', href: '/services/lead-generation' },
  { label: 'Technology Solutions', href: '/services/technology-solutions' },
  { label: 'Automation', href: '/services/automation' },
  { label: 'Hosting & Infrastructure', href: '/services/hosting' },
]

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-16"
      style={{
        background: 'rgba(255,255,255,0.96)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <Image
            src="https://masuyodigital.com/wp-content/uploads/2025/05/Logo-03.png"
            alt="Masuyo Digital"
            width={140}
            height={40}
            className="h-8 w-auto"
            style={{ filter: 'none' }}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {/* Services dropdown */}
          <div className="nav-dropdown-trigger relative">
            <button
              className="text-sm font-medium text-ink hover:text-navy transition-colors flex items-center gap-1"
              style={{ fontFamily: 'Geist, sans-serif' }}
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              Services
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div
              className="nav-dropdown absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 rounded-lg shadow-lg overflow-hidden"
              style={{ background: 'var(--white)', border: '1px solid var(--border)' }}
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              {services.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="block px-4 py-3 text-sm text-ink hover:bg-light transition-colors"
                  style={{ fontFamily: 'Geist, sans-serif' }}
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/about" className="text-sm font-medium text-ink hover:text-navy transition-colors" style={{ fontFamily: 'Geist, sans-serif' }}>
            About
          </Link>
          <Link href="/blog" className="text-sm font-medium text-ink hover:text-navy transition-colors" style={{ fontFamily: 'Geist, sans-serif' }}>
            Blog
          </Link>
          <Link href="/get-a-website" className="text-sm font-medium text-ink hover:text-navy transition-colors" style={{ fontFamily: 'Geist, sans-serif' }}>
            Get a Website
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-white px-4 py-2 rounded transition-colors"
            style={{ background: 'var(--navy)', fontFamily: 'Geist, sans-serif' }}
          >
            Get in touch
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-ink transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-ink transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-ink transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden absolute top-16 left-0 right-0 h-screen overflow-y-auto"
          style={{ background: 'var(--white)', borderTop: '1px solid var(--border)' }}
        >
          <div className="px-4 py-6 flex flex-col gap-1">
            <div>
              <button
                className="w-full text-left text-base font-medium text-ink py-3 flex items-center justify-between"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                Services
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`transition-transform ${servicesOpen ? 'rotate-180' : ''}`}>
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {servicesOpen && (
                <div className="pl-4 flex flex-col gap-1 pb-2">
                  {services.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="text-sm text-mid py-2 hover:text-navy transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {[
              { href: '/about', label: 'About' },
              { href: '/blog', label: 'Blog' },
              { href: '/get-a-website', label: 'Get a Website' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium text-ink py-3 border-t"
                style={{ borderColor: 'var(--border)' }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4">
              <Link
                href="/contact"
                className="block text-center text-base font-medium text-white px-6 py-3 rounded"
                style={{ background: 'var(--navy)' }}
                onClick={() => setMenuOpen(false)}
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
