'use client'

import { useState, useEffect, useCallback, type ReactNode } from 'react'
import LogoFullWhite from '@/components/LogoFullWhite'

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
  { id: 'discuss',    label: 'Things to Agree' },
  { id: 'next',       label: 'Next Steps' },
]

const NAVY = '#1A2939'
const BLUE = '#35ADDF'
const BAR = 56 // px, kept in sync with header height and content padding

export default function ProposalShell({ children }: { children: ReactNode }) {
  const [active, setActive] = useState('welcome')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { rootMargin: '-20% 0px -70% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })

    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setProgress(h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      observers.forEach(o => o.disconnect())
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // Keep the active item visible inside the horizontally scrolling nav
  useEffect(() => {
    const btn = document.getElementById(`navitem-${active}`)
    btn?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [active])

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - BAR
    window.scrollTo({ top: y, behavior: 'smooth' })
  }, [])

  return (
    <div style={{ fontFamily: "'Geist', sans-serif", background: '#ffffff' }}>
      {/* Hide the nav scrollbar on webkit without removing scroll function */}
      <style dangerouslySetInnerHTML={{ __html: '.dgp-navscroll::-webkit-scrollbar{display:none}' }} />

      {/* Sticky horizontal top progress nav */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: `${BAR}px`,
          background: NAVY,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 1px 12px rgba(0,0,0,0.18)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            maxWidth: '80rem',
            margin: '0 auto',
            paddingLeft: '1rem',
          }}
        >
          {/* Masuyo logo */}
          <a
            href="https://masuyodigital.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Masuyo Digital"
            style={{
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              paddingRight: '0.875rem',
              marginRight: '0.5rem',
              borderRight: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            <LogoFullWhite className="h-[11px] w-auto" />
          </a>

          {/* Section items, horizontally scrollable */}
          <nav
            className="dgp-navscroll"
            aria-label="Proposal sections"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              height: '100%',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              paddingRight: '1rem',
            }}
          >
            {SECTIONS.map((s, i) => {
              const isActive = s.id === active
              return (
                <button
                  key={s.id}
                  id={`navitem-${s.id}`}
                  onClick={() => scrollTo(s.id)}
                  aria-current={isActive ? 'true' : undefined}
                  style={{
                    flexShrink: 0,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    background: isActive ? BLUE : 'transparent',
                    color: isActive ? '#ffffff' : 'rgba(255,255,255,0.6)',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.4rem 0.85rem',
                    borderRadius: '999px',
                    fontFamily: "'Geist', sans-serif",
                    fontSize: '0.8125rem',
                    fontWeight: isActive ? 600 : 500,
                    whiteSpace: 'nowrap',
                    transition: 'background 0.2s ease, color 0.2s ease',
                  }}
                >
                  <span style={{ fontSize: '0.6875rem', fontWeight: 700, opacity: isActive ? 0.9 : 0.45 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {s.label}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Scroll progress line */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            height: '2px',
            width: `${progress}%`,
            background: BLUE,
            transition: 'width 0.1s linear',
          }}
        />
      </header>

      {/* Content begins below the bar so the nav never overlaps it */}
      <div style={{ paddingTop: `${BAR}px` }}>{children}</div>
    </div>
  )
}
