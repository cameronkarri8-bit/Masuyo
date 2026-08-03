'use client'

import { useState, useEffect, useRef } from 'react'


import {
  type TabId,
  type Option,
  type LineItem,
  type SelState,
  PROJECT_TYPES,
  FEATURES,
  MARKETING_GROWTH,
  SCALES,
  TIMELINES,
} from '@/lib/pricing'


const TABS: { id: TabId; label: string }[] = [
  { id: 'project',   label: 'Project Type' },
  { id: 'features',  label: 'Features' },
  { id: 'marketing', label: 'Marketing and Growth' },
  { id: 'scale',     label: 'Scale' },
  { id: 'timeline',  label: 'Timeline' },
]

/* --- Helpers ---------------------------------------------------------------- */

function fmt(n: number) {
  return '\u00a3' + n.toLocaleString('en-GB')
}

function computeLineItems(sel: SelState): LineItem[] {
  const items: LineItem[] = []

  if (sel.project) {
    const o = PROJECT_TYPES.find(x => x.id === sel.project)
    if (o) items.push({ id: o.id, label: o.label, price: o.price, monthly: o.monthly, tab: 'project' })
  }

  sel.features.forEach(id => {
    const o = FEATURES.find(x => x.id === id)
    if (o) items.push({ id: o.id, label: o.label, price: o.price, tab: 'features' })
  })

  sel.marketing.forEach(id => {
    const o = MARKETING_GROWTH.find(x => x.id === id)
    if (o) items.push({ id: o.id, label: o.label, price: o.price, monthly: o.monthly, tab: 'marketing' })
  })

  if (sel.scale) {
    const o = SCALES.find(x => x.id === sel.scale)
    if (o) items.push({ id: 'scale-' + o.id, label: 'Scale: ' + o.label, price: o.price, tab: 'scale' })
  }

  if (sel.timeline) {
    const o = TIMELINES.find(x => x.id === sel.timeline)
    if (o) items.push({ id: 'timeline-' + o.id, label: 'Timeline: ' + o.label, price: o.price, tab: 'timeline' })
  }

  return items
}

/* --- Animated number -------------------------------------------------------- */

function useAnimatedNumber(target: number) {
  const [value, setValue] = useState(target)
  const prev = useRef(target)
  const raf = useRef<number | null>(null)
  useEffect(() => {
    const start = prev.current
    if (start === target) return
    const t0 = performance.now()
    const dur = 380
    if (raf.current) cancelAnimationFrame(raf.current)
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1)
      const e = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(start + (target - start) * e))
      if (p < 1) raf.current = requestAnimationFrame(tick)
      else prev.current = target
    }
    raf.current = requestAnimationFrame(tick)
    return () => { if (raf.current) cancelAnimationFrame(raf.current) }
  }, [target])
  return value
}

/* --- Tooltip --------------------------------------------------------------- */

function Tooltip({ text }: { text: string }) {
  const [open, setOpen] = useState(false)
  const [coords, setCoords] = useState({ top: 0, left: 0 })
  const btnRef = useRef<HTMLButtonElement>(null)

  function calcAndShow() {
    if (!btnRef.current) return
    const r = btnRef.current.getBoundingClientRect()
    // Anchor tooltip below-left of the icon, clamped to viewport
    const tipW = 232
    const left = Math.min(Math.max(8, r.right - tipW), window.innerWidth - tipW - 8)
    setCoords({ top: r.bottom + 6, left })
    setOpen(true)
  }

  // Close on outside click/tap
  useEffect(() => {
    if (!open) return
    function handler(e: MouseEvent | TouchEvent) {
      if (btnRef.current && btnRef.current.contains(e.target as Node)) return
      setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler)
    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('touchstart', handler)
    }
  }, [open])

  return (
    <span className="inline-flex flex-shrink-0 ml-1.5 relative" style={{ verticalAlign: 'middle' }}>
      <button
        ref={btnRef}
        type="button"
        aria-label="More information"
        onMouseEnter={calcAndShow}
        onMouseLeave={() => setOpen(false)}
        onClick={e => { e.stopPropagation(); open ? setOpen(false) : calcAndShow() }}
        className="w-4 h-4 rounded-full inline-flex items-center justify-center flex-shrink-0 transition-colors"
        style={{
          background: 'rgba(107,114,128,0.15)',
          color: 'var(--mid)',
          fontSize: '9px',
          fontStyle: 'italic',
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        i
      </button>
      {open && (
        <div
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          style={{
            position: 'fixed',
            top: coords.top,
            left: coords.left,
            width: '232px',
            zIndex: 9999,
            background: 'var(--ink)',
            borderRadius: '8px',
            padding: '10px 12px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.22)',
          }}
        >
          <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: '0.75rem', lineHeight: '1.55', margin: 0 }}>
            {text}
          </p>
        </div>
      )}
    </span>
  )
}

/* --- CheckCard -------------------------------------------------------------- */

function CheckCard({ option, checked, onToggle }: { option: Option; checked: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={checked}
      className={`w-full rounded-2xl border-2 p-5 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue ${
        checked ? 'border-blue bg-blue-tint' : 'border-border bg-white hover:border-blue/40'
      }`}
    >
      <div className="flex items-start gap-3.5">
        <span
          aria-hidden="true"
          className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg border-2 transition-colors ${
            checked ? 'border-blue bg-blue' : 'border-border bg-transparent'
          }`}
        >
          {checked && (
            <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
              <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
        <div className="flex min-w-0 flex-1 items-start justify-between gap-3">
          <div className="min-w-0">
            <span className="inline-flex items-center">
              <span className="font-sans text-base font-medium text-ink">{option.label}</span>
              {option.tooltip && <Tooltip text={option.tooltip} />}
            </span>
            {option.desc && <p className="mt-1 font-sans text-sm text-mid">{option.desc}</p>}
          </div>
          <p className="flex-shrink-0 font-sans text-sm font-semibold text-blue2">
            {fmt(option.price)}{option.monthly ? ' pm' : ''}
          </p>
        </div>
      </div>
    </button>
  )
}

/* --- RadioCard -------------------------------------------------------------- */

function RadioCard({ option, selected, onSelect }: { option: Option; selected: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`w-full rounded-2xl border-2 p-5 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue ${
        selected ? 'border-blue bg-blue-tint' : 'border-border bg-white hover:border-blue/40'
      }`}
    >
      <div className="flex items-start gap-3.5">
        <span
          aria-hidden="true"
          className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
            selected ? 'border-blue bg-blue' : 'border-border bg-transparent'
          }`}
        >
          {selected && <span className="h-2.5 w-2.5 rounded-full bg-white" />}
        </span>
        <div className="flex min-w-0 flex-1 items-start justify-between gap-3">
          <div className="min-w-0">
            <span className="inline-flex items-center">
              <span className="font-sans text-base font-medium text-ink">{option.label}</span>
              {option.tooltip && <Tooltip text={option.tooltip} />}
            </span>
            {option.desc && <p className="mt-1 font-sans text-sm text-mid">{option.desc}</p>}
          </div>
          <p
            className={`flex-shrink-0 font-sans text-sm font-semibold ${
              option.price > 0 ? 'text-blue2' : 'text-mid'
            }`}
          >
            {option.monthly ? fmt(option.price) + ' pm' : option.price > 0 ? fmt(option.price) : 'Included'}
          </p>
        </div>
      </div>
    </button>
  )
}

/* --- QuoteLine -------------------------------------------------------------- */

function QuoteLine({ item, onRemove }: { item: LineItem; onRemove: () => void }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 16)
    return () => clearTimeout(t)
  }, [])
  return (
    <div
      className="flex items-center gap-2 border-b border-border py-3"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(12px)',
        transition: 'opacity 0.25s ease, transform 0.25s ease',
      }}
    >
      <span className="flex-1 font-sans text-sm text-ink">{item.label}</span>
      <span
        className={`flex-shrink-0 font-sans text-sm font-semibold ${
          item.monthly ? 'text-blue2' : 'text-ink'
        }`}
      >
        {item.price === 0 ? 'Included' : fmt(item.price) + (item.monthly ? ' pm' : '')}
      </span>
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${item.label}`}
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-mid transition-colors hover:bg-blue-tint hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
      >
        <svg width="10" height="10" viewBox="0 0 8 8" fill="none" aria-hidden="true">
          <path d="M1 1l6 6M7 1L1 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  )
}

/* --- Quote panel content ---------------------------------------------------- */

function QuotePanelContent({
  lineItems, oneTimeTotal, monthlyTotal, animatedOneTime, animatedMonthly,
  onRemove, onSubmit, onReset, submitStatus,
}: {
  lineItems: LineItem[]
  oneTimeTotal: number
  monthlyTotal: number
  animatedOneTime: number
  animatedMonthly: number
  onRemove: (item: LineItem) => void
  onSubmit: () => void
  onReset: () => void
  submitStatus: 'idle' | 'submitting' | 'success' | 'error'
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.06em] text-blue2">
          Live quote
        </p>
        <h2 className="mt-2 text-3xl text-navy">Your estimate</h2>
      </div>

      {/* Totals */}
      <div className="mb-6 rounded-card bg-navy p-7">
        {oneTimeTotal > 0 && (
          <div className={monthlyTotal > 0 ? 'mb-5 border-b border-white/10 pb-5' : ''}>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.06em] text-white/50">
              One-off total
            </p>
            <p aria-hidden="true" className="mt-2 font-display text-6xl leading-none text-white">
              {fmt(animatedOneTime)}
            </p>
          </div>
        )}
        {monthlyTotal > 0 && (
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.06em] text-white/50">
              Monthly total
            </p>
            <p aria-hidden="true" className="mt-2 font-display text-6xl leading-none text-white">
              {fmt(animatedMonthly)}
              <span className="ml-2 font-sans text-base font-normal text-white/60">per month</span>
            </p>
          </div>
        )}
        {oneTimeTotal === 0 && monthlyTotal === 0 && (
          <p className="font-sans text-base text-white/50">Select options to see your estimate</p>
        )}

        {/* The animating figures are decorative. This is what gets announced. */}
        <p aria-live="polite" className="sr-only">
          {oneTimeTotal === 0 && monthlyTotal === 0
            ? 'No options selected yet'
            : `Estimate ${fmt(oneTimeTotal)}${monthlyTotal > 0 ? `, plus ${fmt(monthlyTotal)} per month` : ''}`}
        </p>
      </div>

      {/* Line items */}
      <div className="flex-1 overflow-y-auto mb-4" style={{ minHeight: 0 }}>
        {lineItems.length === 0 ? (
          <p className="py-4 font-sans text-sm text-mid">
            No items selected yet. Use the tabs on the left to build your quote.
          </p>
        ) : (
          <div>
            {lineItems.map(item => (
              <QuoteLine key={item.id} item={item} onRemove={() => onRemove(item)} />
            ))}
            <div className="pt-3 mt-1 flex flex-col gap-1">
              {oneTimeTotal > 0 && (
                <div className="flex justify-between">
                  <span className="font-sans text-sm font-semibold text-ink">One-off subtotal</span>
                  <span className="font-sans text-sm font-semibold text-ink">{fmt(oneTimeTotal)}</span>
                </div>
              )}
              {monthlyTotal > 0 && (
                <div className="flex justify-between">
                  <span className="font-sans text-sm font-semibold text-ink">Monthly subtotal</span>
                  <span className="font-sans text-sm font-semibold text-blue2">{fmt(monthlyTotal)} pm</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <p className="mb-6 font-sans text-xs leading-relaxed text-mid">
        This estimate is indicative only. Prices vary depending on your specific requirements and will be confirmed following a discovery call. Monthly costs are shown where applicable and are billed separately.
      </p>

      {submitStatus === 'error' && (
        <p role="alert" className="mb-3 font-sans text-sm font-medium text-[#dc2626]">
          Something went wrong. Please try again.
        </p>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onSubmit}
          disabled={lineItems.length === 0 || submitStatus === 'submitting'}
          className="btn-primary flex-1 disabled:opacity-40"
        >
          {submitStatus === 'submitting' ? 'Sending...' : 'Send my estimate'}
        </button>
        <button type="button" onClick={onReset} className="btn-secondary flex-shrink-0">
          Start again
        </button>
      </div>
    </div>
  )
}

/* --- Page ------------------------------------------------------------------- */

const EMPTY_SEL: SelState = { project: '', features: [], marketing: [], scale: '', timeline: '' }

export default function StartAProjectPage() {
  const [tab, setTab] = useState<TabId>('project')
  const [sel, setSel] = useState<SelState>(EMPTY_SEL)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const lineItems = computeLineItems(sel)
  const oneTimeTotal = lineItems.filter(i => !i.monthly).reduce((s, i) => s + i.price, 0)
  const monthlyTotal = lineItems.filter(i => i.monthly).reduce((s, i) => s + i.price, 0)
  const animatedOneTime = useAnimatedNumber(oneTimeTotal)
  const animatedMonthly = useAnimatedNumber(monthlyTotal)

  const mobileTotal = oneTimeTotal > 0 && monthlyTotal > 0
    ? fmt(oneTimeTotal) + ' + ' + fmt(monthlyTotal) + '/mo'
    : oneTimeTotal > 0
    ? fmt(oneTimeTotal)
    : monthlyTotal > 0
    ? fmt(monthlyTotal) + '/mo'
    : fmt(0)

  function toggleFeature(id: string) {
    setSel(p => ({ ...p, features: p.features.includes(id) ? p.features.filter(v => v !== id) : [...p.features, id] }))
  }
  function toggleMarketing(id: string) {
    setSel(p => ({ ...p, marketing: p.marketing.includes(id) ? p.marketing.filter(v => v !== id) : [...p.marketing, id] }))
  }
  function removeItem(item: LineItem) {
    if (item.tab === 'project') setSel(p => ({ ...p, project: '' }))
    else if (item.tab === 'features') setSel(p => ({ ...p, features: p.features.filter(v => v !== item.id) }))
    else if (item.tab === 'marketing') setSel(p => ({ ...p, marketing: p.marketing.filter(v => v !== item.id) }))
    else if (item.tab === 'scale') setSel(p => ({ ...p, scale: '' }))
    else if (item.tab === 'timeline') setSel(p => ({ ...p, timeline: '' }))
  }
  function reset() {
    setSel(EMPTY_SEL)
    setSubmitStatus('idle')
    setDrawerOpen(false)
  }
  async function handleSubmit() {
    setSubmitStatus('submitting')
    const body = {
      source: 'start_a_project',
      items: lineItems.map(i => `${i.label}: ${i.price === 0 ? 'Included' : fmt(i.price) + (i.monthly ? '/mo' : '')}`).join('\n'),
      oneOffTotal: fmt(oneTimeTotal),
      monthlyTotal: monthlyTotal > 0 ? fmt(monthlyTotal) + '/mo' : 'None',
    }
    try {
      const res = await fetch('https://formspree.io/f/xlgpogqk', {
        method: 'POST', body: JSON.stringify(body),
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      })
      setSubmitStatus(res.ok ? 'success' : 'error')
      if (res.ok) setDrawerOpen(false)
    } catch { setSubmitStatus('error') }
  }

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') setDrawerOpen(false) }
    document.addEventListener('keydown', fn)
    return () => document.removeEventListener('keydown', fn)
  }, [])

  useEffect(() => {
    if (drawerOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  if (submitStatus === 'success') {
    return (
      <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-6 py-20">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-blue-tint">
            <svg width="34" height="34" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <path d="M5 14l6.5 6.5L23 8" stroke="var(--blue)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-5xl text-navy">Estimate sent.</h1>
          <p className="mt-6 font-sans text-base leading-relaxed text-mid">
            We have got it, and we will be in touch within one business day.
          </p>
          <button type="button" onClick={reset} className="btn-primary mt-10">
            Start a new estimate
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Split layout. The nav is sticky at h-20, so offsets are 5rem. */}
      <div className="flex flex-col lg:flex-row" style={{ minHeight: 'calc(100vh - 5rem)' }}>

        {/* Left panel */}
        <div className="flex-1 lg:w-[55%]" style={{ minHeight: 0 }}>
          <div className="border-b border-border px-6 pt-10 md:px-10">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.06em] text-blue2">
              Quote builder
            </p>
            <h1 className="mt-4 text-5xl text-navy md:text-6xl">Start a project.</h1>
            <p className="mt-5 max-w-[46ch] font-sans text-base leading-relaxed text-mid">
              Build it up and watch the number move. Nothing here asks for your email.
            </p>

            {/* Tabs, as pills */}
            <div
              className="dgp-tabs -mx-6 mt-8 flex gap-2 overflow-x-auto px-6 pb-6 md:-mx-10 md:px-10"
              style={{ scrollbarWidth: 'none' }}
              role="tablist"
              aria-label="Estimate sections"
            >
              {TABS.map(t => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={tab === t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex-shrink-0 rounded-full px-5 py-3 font-sans text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue ${
                    tab === t.id
                      ? 'bg-navy text-white'
                      : 'bg-blue-tint text-navy hover:bg-blue/15'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div className="px-6 md:px-10 py-8 pb-40 lg:pb-10">

            {tab === 'project' && (
              <div>
                <p className="mb-8 font-sans text-base leading-relaxed text-mid">
                  Select the type of project you need. Pick one.
                </p>
                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  {PROJECT_TYPES.map(o => (
                    <RadioCard key={o.id} option={o} selected={sel.project === o.id}
                      onSelect={() => setSel(p => ({ ...p, project: o.id }))} />
                  ))}
                </div>
              </div>
            )}

            {tab === 'features' && (
              <div>
                <p className="mb-8 font-sans text-base leading-relaxed text-mid">
                  Select any features you need. Skip if unsure.
                </p>
                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  {FEATURES.map(o => (
                    <CheckCard key={o.id} option={o} checked={sel.features.includes(o.id)}
                      onToggle={() => toggleFeature(o.id)} />
                  ))}
                </div>
              </div>
            )}

            {tab === 'marketing' && (
              <div>
                <p className="mb-8 font-sans text-base leading-relaxed text-mid">
                  Add marketing, growth, and automation services to your project.
                </p>
                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  {MARKETING_GROWTH.map(o => (
                    <CheckCard key={o.id} option={o} checked={sel.marketing.includes(o.id)}
                      onToggle={() => toggleMarketing(o.id)} />
                  ))}
                </div>
              </div>
            )}

            {tab === 'scale' && (
              <div>
                <p className="mb-8 font-sans text-base leading-relaxed text-mid">
                  Choose the option that best describes the scope of your project.
                </p>
                <div className="flex flex-col gap-3.5">
                  {SCALES.map(o => (
                    <RadioCard key={o.id} option={o} selected={sel.scale === o.id}
                      onSelect={() => setSel(p => ({ ...p, scale: o.id }))} />
                  ))}
                </div>
              </div>
            )}

            {tab === 'timeline' && (
              <div>
                <p className="mb-8 font-sans text-base leading-relaxed text-mid">
                  Rush fees apply for faster turnarounds.
                </p>
                <div className="flex flex-col gap-3.5">
                  {TIMELINES.map(o => (
                    <RadioCard key={o.id} option={o} selected={sel.timeline === o.id}
                      onSelect={() => setSel(p => ({ ...p, timeline: o.id }))} />
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Right panel: desktop */}
        <div className="sticky top-20 hidden flex-shrink-0 flex-col overflow-y-auto border-l border-border bg-blue-tint p-10 lg:flex lg:w-[45%]"
          style={{ height: 'calc(100vh - 5rem)' }}>
          <QuotePanelContent
            lineItems={lineItems}
            oneTimeTotal={oneTimeTotal}
            monthlyTotal={monthlyTotal}
            animatedOneTime={animatedOneTime}
            animatedMonthly={animatedMonthly}
            onRemove={removeItem}
            onSubmit={handleSubmit}
            onReset={reset}
            submitStatus={submitStatus}
          />
        </div>

      </div>

      {/* Mobile sticky bar. Large tap target, total set big. */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-navy lg:hidden">
        <button
          type="button"
          onClick={() => setDrawerOpen(v => !v)}
          aria-expanded={drawerOpen}
          className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white"
        >
          <span>
            <span className="block font-sans text-xs font-semibold uppercase tracking-[0.06em] text-white/50">
              Your estimate
            </span>
            <span className="mt-1 block font-display text-3xl leading-none text-white">
              {mobileTotal}
            </span>
          </span>
          <span
            aria-hidden="true"
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-transform"
            style={{ transform: drawerOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
              <path d="M4 11.5l5-5 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
      </div>

      {/* Mobile drawer backdrop */}
      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-40" style={{ background: 'rgba(0,0,0,0.4)' }}
          onClick={() => setDrawerOpen(false)} />
      )}

      {/* Mobile drawer */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col overflow-hidden rounded-t-[28px] border-t border-border bg-white lg:hidden"
        style={{
          maxHeight: '88svh',
          transform: drawerOpen ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
        }}>
        <div className="flex flex-shrink-0 justify-center pb-2 pt-3" aria-hidden="true">
          <div className="h-1.5 w-12 rounded-full bg-border" />
        </div>
        <div className="flex flex-shrink-0 items-center justify-between border-b border-border px-6 pb-4">
          <h2 className="text-2xl text-navy">Your estimate</h2>
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close estimate"
            className="flex h-11 w-11 items-center justify-center rounded-full text-mid transition-colors hover:bg-blue-tint focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
          >
            <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-6" style={{ paddingBottom: '5rem' }}>
          <QuotePanelContent
            lineItems={lineItems}
            oneTimeTotal={oneTimeTotal}
            monthlyTotal={monthlyTotal}
            animatedOneTime={animatedOneTime}
            animatedMonthly={animatedMonthly}
            onRemove={removeItem}
            onSubmit={handleSubmit}
            onReset={reset}
            submitStatus={submitStatus}
          />
        </div>
      </div>
    </>
  )
}
