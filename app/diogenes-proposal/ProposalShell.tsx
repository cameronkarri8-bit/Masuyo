'use client'

import { useState, useEffect, useCallback, type ReactNode } from 'react'
import LogoFullWhite from '@/components/LogoFullWhite'

const SECTIONS = [
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

const NAVY = '#1A2939' // logo bar
const NAVY2 = '#16212E' // progress strip, a touch darker to separate the two
const BLUE = '#35ADDF'
const LOGO_H = 40 // px, slim logo bar
const PROG_H = 50 // px, progress strip
const TOTAL = LOGO_H + PROG_H // total fixed header height

export default function ProposalShell({ children }: { children: ReactNode }) {
  const [active, setActive] = useState('challenge')
  const [progress, setProgress] = useState(0)
  const activeIndex = Math.max(0, SECTIONS.findIndex(s => s.id === active))
  const total = SECTIONS.length

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

  // Keep the active step visible inside the horizontally scrolling track
  useEffect(() => {
    const btn = document.getElementById(`navitem-${active}`)
    btn?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [active])

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - TOTAL + 1
    window.scrollTo({ top: y, behavior: 'smooth' })
  }, [])

  return (
    <div style={{ fontFamily: "'Geist', sans-serif" }}>
      {/* Hide the track scrollbar on webkit without removing scroll function */}
      <style dangerouslySetInnerHTML={{ __html: '.dgp-navscroll::-webkit-scrollbar{display:none}' }} />

      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, boxShadow: '0 2px 16px rgba(0,0,0,0.2)' }}>
        {/* ---------- Strip 1: slim logo bar ---------- */}
        <div
          style={{
            height: `${LOGO_H}px`,
            background: NAVY,
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              maxWidth: '80rem',
              width: '100%',
              margin: '0 auto',
              padding: '0 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <a
              href="https://masuyodigital.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Masuyo Digital"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <LogoFullWhite className="h-[11px] w-auto" />
            </a>
            <span
              style={{
                fontFamily: "'Geist', sans-serif",
                fontSize: '0.625rem',
                fontWeight: 600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)',
              }}
            >
              Proposal
            </span>
          </div>
        </div>

        {/* ---------- Strip 2: section progress bar ---------- */}
        <div style={{ height: `${PROG_H}px`, background: NAVY2, position: 'relative' }}>
          <div
            style={{
              maxWidth: '80rem',
              width: '100%',
              height: '100%',
              margin: '0 auto',
              padding: '0 1rem',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {/* Step counter (desktop, fixed at left of the track) */}
            <div
              className="hidden md:flex"
              aria-hidden="true"
              style={{
                flexShrink: 0,
                alignItems: 'baseline',
                gap: '0.25rem',
                marginRight: '1rem',
                paddingRight: '1rem',
                borderRight: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <span style={{ fontFamily: "'Geist', sans-serif", fontSize: '0.8125rem', fontWeight: 700, color: BLUE }}>
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span style={{ fontFamily: "'Geist', sans-serif", fontSize: '0.6875rem', fontWeight: 500, color: 'rgba(255,255,255,0.4)' }}>
                / {String(total).padStart(2, '0')}
              </span>
            </div>

            {/* Steps along the track (desktop, horizontally scrollable) */}
            <nav
              className="dgp-navscroll hidden md:flex"
              aria-label="Proposal sections"
              style={{
                alignItems: 'center',
                height: '100%',
                overflowX: 'auto',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {SECTIONS.map((s, i) => {
                const isActive = i === activeIndex
                const isDone = i < activeIndex
                return (
                  <div key={s.id} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                    {/* Connector segment: filled once the path into this step is reached */}
                    {i > 0 && (
                      <span
                        style={{
                          width: '1.25rem',
                          height: '2px',
                          flexShrink: 0,
                          background: i <= activeIndex ? BLUE : 'rgba(255,255,255,0.15)',
                          transition: 'background 0.3s ease',
                        }}
                      />
                    )}
                    <button
                      id={`navitem-${s.id}`}
                      onClick={() => scrollTo(s.id)}
                      aria-current={isActive ? 'true' : undefined}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        flexShrink: 0,
                        cursor: 'pointer',
                        border: 'none',
                        whiteSpace: 'nowrap',
                        background: isActive ? BLUE : 'transparent',
                        borderRadius: '999px',
                        padding: isActive ? '0.35rem 0.8rem' : '0.35rem 0.4rem',
                        transition: 'background 0.25s ease',
                      }}
                    >
                      {/* Step dot: done = filled blue, current = white on pill, upcoming = hollow */}
                      <span
                        style={{
                          width: isActive ? 7 : 8,
                          height: isActive ? 7 : 8,
                          borderRadius: '50%',
                          flexShrink: 0,
                          boxSizing: 'border-box',
                          background: isActive ? '#ffffff' : isDone ? BLUE : 'transparent',
                          border: isActive ? 'none' : isDone ? 'none' : '1.5px solid rgba(255,255,255,0.3)',
                          transition: 'background 0.25s ease, border-color 0.25s ease',
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "'Geist', sans-serif",
                          fontSize: '0.8125rem',
                          fontWeight: isActive ? 600 : 500,
                          color: isActive ? '#ffffff' : isDone ? 'rgba(255,255,255,0.82)' : 'rgba(255,255,255,0.42)',
                          transition: 'color 0.25s ease',
                        }}
                      >
                        {s.label}
                      </span>
                    </button>
                  </div>
                )
              })}
            </nav>

            {/* Condensed current-step readout (mobile) */}
            <div className="flex md:hidden" style={{ alignItems: 'center', gap: '0.4rem', width: '100%', minWidth: 0 }}>
              <span style={{ fontFamily: "'Geist', sans-serif", fontSize: '0.8125rem', fontWeight: 700, color: BLUE, flexShrink: 0 }}>
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span style={{ fontFamily: "'Geist', sans-serif", fontSize: '0.6875rem', fontWeight: 500, color: 'rgba(255,255,255,0.4)', flexShrink: 0 }}>
                / {String(total).padStart(2, '0')}
              </span>
              <span
                style={{
                  fontFamily: "'Geist', sans-serif",
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#ffffff',
                  marginLeft: '0.4rem',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  minWidth: 0,
                }}
              >
                {SECTIONS[activeIndex]?.label}
              </span>
            </div>
          </div>

          {/* Continuous scroll-progress fill, runs along the very bottom of the strip */}
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '3px', background: 'rgba(255,255,255,0.1)' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: BLUE, transition: 'width 0.1s linear' }} />
          </div>
        </div>
      </header>

      {/* Content begins below the full header so the bar never overlaps it */}
      <div style={{ paddingTop: `${TOTAL}px` }}>{children}</div>
    </div>
  )
}
