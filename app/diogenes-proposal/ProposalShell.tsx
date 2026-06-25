'use client'

import { useState, useEffect, useCallback, type ReactNode } from 'react'
import { Playfair_Display, DM_Sans } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ph',
  display: 'swap',
})
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-pb',
  display: 'swap',
})

const SECTIONS = [
  { id: 'welcome',    label: 'Welcome' },
  { id: 'challenge',  label: 'The Challenge' },
  { id: 'strategy',   label: 'Strategy' },
  { id: 'discovery',  label: 'Getting Found' },
  { id: 'scope',      label: 'What We Build' },
  { id: 'imagery',    label: 'Imagery' },
  { id: 'compliance', label: 'Compliance' },
  { id: 'investment', label: 'Investment' },
  { id: 'future',     label: 'Future Phases' },
  { id: 'next',       label: 'Next Steps' },
]

const GREEN = '#2A3D2B'
const SAGE = '#7A9E75'
const CREAM = '#F9F7F4'
const MUTED = '#7A7570'
const B = 'var(--font-pb)'

export default function ProposalShell({ children }: { children: ReactNode }) {
  const [active, setActive] = useState('welcome')
  const [mobileNavVisible, setMobileNavVisible] = useState(false)

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { rootMargin: '-35% 0px -55% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })

    const onScroll = () => {
      setMobileNavVisible(window.scrollY > 120)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observers.forEach(o => o.disconnect())
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 24
    window.scrollTo({ top: y, behavior: 'smooth' })
  }, [])

  const activeIndex = SECTIONS.findIndex(s => s.id === active)

  return (
    <div className={`${playfair.variable} ${dmSans.variable}`} style={{ fontFamily: B, background: CREAM }}>

      {/* Mobile sticky progress nav */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 60,
          background: 'rgba(249,247,244,0.95)',
          backdropFilter: 'blur(8px)',
          borderBottom: `1px solid #E0DDD6`,
          padding: '0.75rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          opacity: mobileNavVisible ? 1 : 0,
          transform: mobileNavVisible ? 'translateY(0)' : 'translateY(-100%)',
        }}
        className="lg:hidden"
      >
        {/* Progress dots */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flex: 1 }}>
          {SECTIONS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              aria-label={s.label}
              style={{
                width: i === activeIndex ? 20 : 6,
                height: 6,
                borderRadius: 3,
                background: i === activeIndex ? SAGE : '#D4D0CA',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'width 0.3s ease, background 0.3s ease',
                flexShrink: 0,
              }}
            />
          ))}
        </div>
        {/* Active label */}
        <span style={{ fontFamily: B, fontSize: '0.75rem', color: MUTED, whiteSpace: 'nowrap', flexShrink: 0 }}>
          {SECTIONS[activeIndex]?.label}
        </span>
      </div>

      {/* Desktop sidebar nav */}
      <aside
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '11.5rem',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '2rem 1.5rem 2rem 2rem',
          zIndex: 50,
        }}
        className="hidden lg:flex"
      >
        {/* Logo mark */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div
            style={{
              width: '2rem',
              height: '2rem',
              borderRadius: '50%',
              border: `1.5px solid ${SAGE}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontFamily: 'var(--font-ph)', fontSize: '0.875rem', fontWeight: 500, color: GREEN }}>D</span>
          </div>
        </div>

        {/* Nav items */}
        <nav aria-label="Proposal sections">
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
            {SECTIONS.map((s) => {
              const isActive = s.id === active
              return (
                <li key={s.id}>
                  <button
                    onClick={() => scrollTo(s.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.625rem',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '0.3125rem 0',
                      width: '100%',
                      textAlign: 'left',
                    }}
                  >
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: '50%',
                        background: isActive ? SAGE : '#C8C4BC',
                        flexShrink: 0,
                        transition: 'background 0.25s ease, transform 0.25s ease',
                        transform: isActive ? 'scale(1.4)' : 'scale(1)',
                      }}
                    />
                    <span
                      style={{
                        fontFamily: B,
                        fontSize: '0.75rem',
                        color: isActive ? GREEN : MUTED,
                        fontWeight: isActive ? 500 : 400,
                        transition: 'color 0.25s ease',
                        letterSpacing: '0.01em',
                      }}
                    >
                      {s.label}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Masuyo credit at bottom */}
        <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
          <p style={{ fontFamily: B, fontSize: '0.6875rem', color: '#C0BAB2', lineHeight: 1.5 }}>
            Prepared by<br />Masuyo Digital
          </p>
        </div>
      </aside>

      {/* Main content - offset for sidebar on desktop */}
      <div style={{ paddingLeft: 0 }} className="lg:pl-[11.5rem]">
        {children}
      </div>
    </div>
  )
}
