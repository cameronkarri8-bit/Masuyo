'use client'

import { useState, useEffect, useRef } from 'react'

/* ─── Types ────────────────────────────────────────────────────────────────── */

type TabId = 'project' | 'features' | 'marketing' | 'scale' | 'timeline'

interface Option {
  id: string
  label: string
  price: number
  monthly?: boolean
  desc?: string
  tooltip?: string
}

interface LineItem {
  id: string
  label: string
  price: number
  monthly?: boolean
  tab: TabId
}

interface SelState {
  project: string
  features: string[]
  marketing: string[]
  scale: string
  timeline: string
}

/* ─── Data ─────────────────────────────────────────────────────────────────── */

const PROJECT_TYPES: Option[] = [
  { id: 'new-website',       label: 'New Website',                      price: 249,  tooltip: 'A professionally designed and developed website built from scratch, tailored to your business goals and brand.' },
  { id: 'website-redesign',  label: 'Website Redesign',                 price: 349,  tooltip: 'A full rebuild of your existing website with improved design, performance, and user experience.' },
  { id: 'mobile-app',        label: 'Mobile App',                       price: 2500, tooltip: 'A native or cross-platform mobile application for iOS and Android, built around your users and business logic.' },
  { id: 'web-application',   label: 'Web Application',                  price: 3500, tooltip: 'A custom browser-based application with complex functionality, user accounts, and data management.' },
  { id: 'course-platform',   label: 'Course or Learning Platform',      price: 1800, tooltip: 'A fully featured online learning environment with course management, student progress tracking, and payment integration.' },
  { id: 'community-hub',     label: 'Community Hub or Member Portal',   price: 2200, tooltip: 'A private, branded online space for your members, customers, or team with content, discussion, and access control.' },
  { id: 'custom-crm',        label: 'Custom CRM or Business System',    price: 3000, tooltip: 'A bespoke internal platform built around your workflows, replacing spreadsheets and disconnected tools.' },
  { id: 'digital-marketing', label: 'Digital Marketing Campaign',       price: 299,  monthly: true, tooltip: 'A managed campaign across your chosen channels, built to drive traffic, leads, and conversions.' },
  { id: 'automation',        label: 'Automation Project',               price: 800,  tooltip: 'A targeted automation build that removes manual tasks from your business processes and connects your tools.' },
  { id: 'hosting',           label: 'Hosting and Maintenance',          price: 40,   monthly: true, tooltip: 'Managed hosting on our own infrastructure with updates, monitoring, backups, and technical support included.' },
]

const FEATURES: Option[] = [
  { id: 'ecommerce',    label: 'E-commerce / Online Shop',            price: 400, tooltip: 'A fully integrated online store with product management, checkout, and payment processing.' },
  { id: 'booking',      label: 'Booking or Appointment System',       price: 250, tooltip: 'An online booking tool that lets customers schedule appointments, classes, or services directly.' },
  { id: 'cms-blog',     label: 'CMS / Blog',                          price: 150, tooltip: 'A content management system so your team can update pages, publish blog posts, and manage content without a developer.' },
  { id: 'members-area', label: 'Members Area or Login',               price: 600, tooltip: 'A secure, gated section of your site accessible only to registered or paying users.' },
  { id: 'resource-hub', label: 'Interactive Resource Hub',            price: 500, tooltip: 'A searchable library of guides, tools, and downloads with filtering, bookmarking, and gated premium content.' },
  { id: 'progress',     label: 'Student or Member Progress Tracking', price: 600, tooltip: 'A dashboard that shows users their progress through courses, modules, or membership milestones.' },
  { id: 'payment',      label: 'Payment Gateway',                     price: 200, tooltip: 'Secure online payment processing integrated into your site or application, supporting cards and digital wallets.' },
  { id: 'custom-forms', label: 'Custom Forms',                        price: 75,  tooltip: 'Tailored forms with conditional logic, validation, and automated notifications or CRM routing.' },
  { id: 'live-chat',    label: 'Live Chat Integration',               price: 75,  tooltip: 'A real-time chat widget connected to your support or sales team, with fallback to email or bot.' },
  { id: 'multilang',    label: 'Multi-language Support',              price: 400, tooltip: 'Full internationalisation of your site or app so content can be served in multiple languages.' },
  { id: 'api',          label: 'API Development or Integration',      price: 800, tooltip: 'Custom API build or third-party API connection to extend functionality and connect your platforms.' },
  { id: 'ai-chatbot',   label: 'AI Chatbot or Assistant',             price: 700, tooltip: 'An intelligent conversational assistant trained on your content to handle enquiries, support, or lead qualification.' },
]

const MARKETING_GROWTH: Option[] = [
  { id: 'seo-setup',         label: 'SEO Setup',                                        price: 199,  tooltip: 'Technical SEO foundation including metadata, sitemap, schema markup, and Google Search Console configuration.' },
  { id: 'analytics',         label: 'Google Analytics and Tracking',                   price: 99,   tooltip: 'Full analytics implementation with goal tracking, event monitoring, and conversion reporting.' },
  { id: 'email-automation',  label: 'Email Marketing Automation',                      price: 300,  tooltip: 'Automated email sequences triggered by user behaviour, from welcome flows to re-engagement campaigns.' },
  { id: 'full-funnel',       label: 'Full Funnel Build (ads, landing page, email, CRM)', price: 1200, tooltip: 'End-to-end campaign build covering paid ads, landing page, email sequence, and CRM integration.' },
  { id: 'onboarding',        label: 'Automated Onboarding Workflows',                  price: 350,  tooltip: 'A structured automated journey that guides new customers or users from sign-up to active engagement.' },
  { id: 'review-gen',        label: 'Review Generation Automation',                    price: 200,  tooltip: 'Post-purchase or post-service automated sequences designed to drive Google and Trustpilot reviews.' },
  { id: 'abandoned',         label: 'Abandoned Enquiry Recovery',                      price: 250,  tooltip: 'Automated follow-up sequences that re-engage leads who made contact but did not convert.' },
  { id: 'social-auto',       label: 'Social Media Automation and Scheduling',          price: 300,  tooltip: 'Content planning, creation, and scheduling automation across your social channels.' },
  { id: 'crm-integration',   label: 'CRM Integration',                                 price: 400,  tooltip: 'Connection of your website or application to your CRM platform for seamless lead and customer data flow.' },
  { id: 'whatsapp-sms',      label: 'WhatsApp or SMS Automation',                      price: 300,  tooltip: 'Automated messaging via WhatsApp or SMS for confirmations, reminders, follow-ups, and campaigns.' },
  { id: 'seo-retainer',      label: 'Monthly SEO and Content Retainer',                price: 499,  monthly: true, tooltip: 'Ongoing SEO management, keyword targeting, and content production to grow organic traffic month on month.' },
  { id: 'auto-retainer',     label: 'Managed Automation Retainer',                     price: 599,  monthly: true, tooltip: 'A monthly retainer where we continuously build, optimise, and manage your business automations.' },
  { id: 'growth-retainer',   label: 'Growth Retainer (SEO, content, ads, reporting)',  price: 899,  monthly: true, tooltip: 'A comprehensive monthly package combining SEO, content, paid ads, and performance reporting.' },
]

const SCALES: Option[] = [
  { id: 'small',      label: 'Small',      desc: '1 to 5 pages or basic scope',     price: 0,    tooltip: 'Suitable for straightforward projects with a clear, limited scope, typically up to 5 pages or a single core function.' },
  { id: 'medium',     label: 'Medium',     desc: '6 to 15 pages or moderate scope', price: 200,  tooltip: 'A moderate scope project with multiple sections, integrations, or content requirements, typically 6 to 15 pages.' },
  { id: 'large',      label: 'Large',      desc: '15+ pages or complex scope',      price: 500,  tooltip: 'A complex project with extensive page count, multiple integrations, custom functionality, or large content volumes.' },
  { id: 'enterprise', label: 'Enterprise', desc: 'Custom workflows, large team',    price: 1500, tooltip: 'A high-complexity build requiring bespoke architecture, large team access, advanced workflows, or phased delivery.' },
]

const TIMELINES: Option[] = [
  { id: 'flexible',   label: 'Flexible (no rush)', price: 0,   tooltip: 'No fixed deadline. We work this into our schedule at the most efficient point, keeping costs lean.' },
  { id: '3-6-months', label: '3 to 6 months',      price: 0,   tooltip: 'A comfortable timeline that allows for thorough discovery, design, build, and testing without a rush premium.' },
  { id: '1-3-months', label: '1 to 3 months',      price: 300, tooltip: 'An accelerated timeline that requires dedicated resource allocation and priority scheduling.' },
  { id: 'asap',       label: 'ASAP',               price: 700, tooltip: 'Urgent delivery requiring immediate resource prioritisation and extended working hours to hit your deadline.' },
]

const TABS: { id: TabId; label: string }[] = [
  { id: 'project',   label: 'Project Type' },
  { id: 'features',  label: 'Features' },
  { id: 'marketing', label: 'Marketing and Growth' },
  { id: 'scale',     label: 'Scale' },
  { id: 'timeline',  label: 'Timeline' },
]

/* ─── Helpers ──────────────────────────────────────────────────────────────── */

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

/* ─── Animated number ──────────────────────────────────────────────────────── */

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

/* ─── Tooltip ─────────────────────────────────────────────────────────────── */

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
          fontFamily: 'Georgia, serif',
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
          <p style={{ color: 'rgba(255,255,255,0.88)', fontFamily: 'Geist, sans-serif', fontSize: '0.75rem', lineHeight: '1.55', margin: 0 }}>
            {text}
          </p>
        </div>
      )}
    </span>
  )
}

/* ─── CheckCard ────────────────────────────────────────────────────────────── */

function CheckCard({ option, checked, onToggle }: { option: Option; checked: boolean; onToggle: () => void }) {
  return (
    <button type="button" onClick={onToggle} className="w-full text-left p-4 rounded-lg transition-all"
      style={{ border: `1px solid ${checked ? 'var(--blue)' : 'var(--border)'}`, background: checked ? 'rgba(53,173,223,0.06)' : 'var(--white)' }}>
      <div className="flex items-start gap-3">
        <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 transition-all"
          style={{ background: checked ? 'var(--blue)' : 'transparent', border: `1.5px solid ${checked ? 'var(--blue)' : 'var(--border)'}` }}>
          {checked && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
        </div>
        <div className="flex-1 flex items-center justify-between gap-3 min-w-0">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-0">
              <span className="text-sm font-medium text-ink" style={{ fontFamily: 'Geist, sans-serif' }}>{option.label}</span>
              {option.tooltip && <Tooltip text={option.tooltip} />}
            </span>
            {option.desc && <p className="text-xs mt-0.5" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>{option.desc}</p>}
          </div>
          <p className="text-xs font-semibold flex-shrink-0" style={{ color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
            {fmt(option.price)}{option.monthly ? '/mo' : ''}
          </p>
        </div>
      </div>
    </button>
  )
}

/* ─── RadioCard ────────────────────────────────────────────────────────────── */

function RadioCard({ option, selected, onSelect }: { option: Option; selected: boolean; onSelect: () => void }) {
  return (
    <button type="button" onClick={onSelect} className="w-full text-left p-4 rounded-lg transition-all"
      style={{ border: `1px solid ${selected ? 'var(--blue)' : 'var(--border)'}`, background: selected ? 'rgba(53,173,223,0.06)' : 'var(--white)' }}>
      <div className="flex items-start gap-3">
        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all"
          style={{ background: selected ? 'var(--blue)' : 'transparent', border: `1.5px solid ${selected ? 'var(--blue)' : 'var(--border)'}` }}>
          {selected && <div className="w-2 h-2 rounded-full bg-white" />}
        </div>
        <div className="flex-1 flex items-center justify-between gap-3 min-w-0">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-0">
              <span className="text-sm font-medium text-ink" style={{ fontFamily: 'Geist, sans-serif' }}>{option.label}</span>
              {option.tooltip && <Tooltip text={option.tooltip} />}
            </span>
            {option.desc && <p className="text-xs mt-0.5" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>{option.desc}</p>}
          </div>
          <p className="text-xs font-semibold flex-shrink-0" style={{ color: option.price > 0 ? 'var(--blue)' : 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
            {option.monthly ? fmt(option.price) + '/mo' : option.price > 0 ? fmt(option.price) : 'Included'}
          </p>
        </div>
      </div>
    </button>
  )
}

/* ─── QuoteLine ────────────────────────────────────────────────────────────── */

function QuoteLine({ item, onRemove }: { item: LineItem; onRemove: () => void }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 16)
    return () => clearTimeout(t)
  }, [])
  return (
    <div className="flex items-center gap-2 py-2.5" style={{
      borderBottom: '1px solid var(--border)',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateX(0)' : 'translateX(12px)',
      transition: 'opacity 0.25s ease, transform 0.25s ease',
    }}>
      <span className="text-sm flex-1" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>{item.label}</span>
      <span className="text-sm font-medium flex-shrink-0" style={{ color: item.monthly ? 'var(--blue)' : 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>
        {item.price === 0 ? 'Included' : fmt(item.price) + (item.monthly ? '/mo' : '')}
      </span>
      <button type="button" onClick={onRemove} aria-label={`Remove ${item.label}`}
        className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-colors"
        style={{ color: 'var(--mid)', background: 'transparent' }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.06)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <path d="M1 1l6 6M7 1L1 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  )
}

/* ─── Quote panel content ──────────────────────────────────────────────────── */

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
        <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
          Live quote
        </p>
        <h2 className="text-2xl font-semibold text-ink" style={{ fontFamily: 'Fraunces, serif' }}>
          Your Estimate
        </h2>
      </div>

      {/* Totals */}
      <div className="rounded-lg p-5 mb-6" style={{ background: 'var(--navy)' }}>
        {oneTimeTotal > 0 && (
          <div className={monthlyTotal > 0 ? 'mb-3 pb-3' : ''} style={monthlyTotal > 0 ? { borderBottom: '1px solid rgba(255,255,255,0.1)' } : {}}>
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>One-off total</p>
            <p className="text-3xl font-semibold text-white" style={{ fontFamily: 'Fraunces, serif' }}>
              {fmt(animatedOneTime)}
            </p>
          </div>
        )}
        {monthlyTotal > 0 && (
          <div>
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>Monthly total</p>
            <p className="text-3xl font-semibold text-white" style={{ fontFamily: 'Fraunces, serif' }}>
              {fmt(animatedMonthly)}<span className="text-base font-normal ml-1" style={{ color: 'rgba(255,255,255,0.6)' }}>/mo</span>
            </p>
          </div>
        )}
        {oneTimeTotal === 0 && monthlyTotal === 0 && (
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
            Select options to see your estimate
          </p>
        )}
      </div>

      {/* Line items */}
      <div className="flex-1 overflow-y-auto mb-4" style={{ minHeight: 0 }}>
        {lineItems.length === 0 ? (
          <p className="text-sm py-4" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
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
                  <span className="text-sm font-semibold text-ink" style={{ fontFamily: 'Geist, sans-serif' }}>One-off subtotal</span>
                  <span className="text-sm font-semibold text-ink" style={{ fontFamily: 'Geist, sans-serif' }}>{fmt(oneTimeTotal)}</span>
                </div>
              )}
              {monthlyTotal > 0 && (
                <div className="flex justify-between">
                  <span className="text-sm font-semibold text-ink" style={{ fontFamily: 'Geist, sans-serif' }}>Monthly subtotal</span>
                  <span className="text-sm font-semibold" style={{ color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>{fmt(monthlyTotal)}/mo</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <p className="text-xs leading-relaxed mb-5" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
        This estimate is indicative only. Prices vary depending on your specific requirements and will be confirmed following a discovery call. Monthly costs are shown where applicable and are billed separately.
      </p>

      {submitStatus === 'error' && (
        <p className="text-xs mb-3" style={{ color: '#dc2626', fontFamily: 'Geist, sans-serif' }}>
          Something went wrong. Please try again.
        </p>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button type="button" onClick={onSubmit} disabled={lineItems.length === 0 || submitStatus === 'submitting'}
          className="flex-1 text-sm font-semibold text-white py-3 rounded transition-opacity disabled:opacity-40"
          style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
          {submitStatus === 'submitting' ? 'Sending...' : 'Send my estimate'}
        </button>
        <button type="button" onClick={onReset}
          className="text-sm font-medium px-4 py-3 rounded transition-colors"
          style={{ border: '1px solid var(--border)', color: 'var(--mid)', fontFamily: 'Geist, sans-serif', background: 'var(--white)' }}>
          Start again
        </button>
      </div>
    </div>
  )
}

/* ─── Page ─────────────────────────────────────────────────────────────────── */

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
      <div className="pt-16 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: 'rgba(53,173,223,0.1)' }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M5 14l6.5 6.5L23 8" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-3xl font-semibold text-ink mb-3" style={{ fontFamily: 'Fraunces, serif' }}>Estimate sent</h1>
          <p className="text-base mb-8" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
            We have received your estimate request and will be in touch within one business day.
          </p>
          <button type="button" onClick={reset}
            className="inline-block text-sm font-semibold text-white px-6 py-3 rounded"
            style={{ background: 'var(--navy)', fontFamily: 'Geist, sans-serif' }}>
            Start a new estimate
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Split layout */}
      <div className="pt-16 flex flex-col lg:flex-row" style={{ minHeight: 'calc(100vh - 4rem)' }}>

        {/* Left panel */}
        <div className="flex-1 lg:w-[55%] overflow-y-auto" style={{ minHeight: 0 }}>
          <div className="px-6 md:px-10 pt-10 pb-0" style={{ borderBottom: '1px solid var(--border)' }}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
              Quote builder
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold text-ink mb-6" style={{ fontFamily: 'Fraunces, serif' }}>
              Start a project
            </h1>
            {/* Tabs */}
            <div className="flex -mb-px overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
              {TABS.map(t => (
                <button key={t.id} type="button" onClick={() => setTab(t.id)}
                  className="px-4 py-3 text-sm font-medium flex-shrink-0 transition-colors"
                  style={{
                    fontFamily: 'Geist, sans-serif',
                    color: tab === t.id ? 'var(--navy)' : 'var(--mid)',
                    borderBottom: tab === t.id ? '2px solid var(--navy)' : '2px solid transparent',
                    background: 'transparent',
                    outline: 'none',
                  }}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div className="px-6 md:px-10 py-8 pb-28 lg:pb-8">

            {tab === 'project' && (
              <div>
                <p className="text-sm mb-6" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                  Select the type of project you need. Pick one.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PROJECT_TYPES.map(o => (
                    <RadioCard key={o.id} option={o} selected={sel.project === o.id}
                      onSelect={() => setSel(p => ({ ...p, project: o.id }))} />
                  ))}
                </div>
              </div>
            )}

            {tab === 'features' && (
              <div>
                <p className="text-sm mb-6" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                  Select any features you need. Skip if unsure.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {FEATURES.map(o => (
                    <CheckCard key={o.id} option={o} checked={sel.features.includes(o.id)}
                      onToggle={() => toggleFeature(o.id)} />
                  ))}
                </div>
              </div>
            )}

            {tab === 'marketing' && (
              <div>
                <p className="text-sm mb-6" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                  Add marketing, growth, and automation services to your project.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {MARKETING_GROWTH.map(o => (
                    <CheckCard key={o.id} option={o} checked={sel.marketing.includes(o.id)}
                      onToggle={() => toggleMarketing(o.id)} />
                  ))}
                </div>
              </div>
            )}

            {tab === 'scale' && (
              <div>
                <p className="text-sm mb-6" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                  Choose the option that best describes the scope of your project.
                </p>
                <div className="flex flex-col gap-3">
                  {SCALES.map(o => (
                    <RadioCard key={o.id} option={o} selected={sel.scale === o.id}
                      onSelect={() => setSel(p => ({ ...p, scale: o.id }))} />
                  ))}
                </div>
              </div>
            )}

            {tab === 'timeline' && (
              <div>
                <p className="text-sm mb-6" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                  Rush fees apply for faster turnarounds.
                </p>
                <div className="flex flex-col gap-3">
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
        <div className="hidden lg:flex flex-col lg:w-[45%] flex-shrink-0 sticky top-16 overflow-y-auto"
          style={{ height: 'calc(100vh - 4rem)', borderLeft: '1px solid var(--border)', padding: '2.5rem' }}>
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

      {/* Mobile sticky bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50"
        style={{ background: 'var(--navy)', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <button type="button" onClick={() => setDrawerOpen(v => !v)}
          className="w-full flex items-center justify-between px-5 py-4">
          <span className="text-sm font-medium text-white" style={{ fontFamily: 'Geist, sans-serif' }}>
            Your estimate: <span className="font-semibold">{mobileTotal}</span>
          </span>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
            style={{ color: 'rgba(255,255,255,0.7)', transform: drawerOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}>
            <path d="M4 11.5l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Mobile drawer backdrop */}
      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-40" style={{ background: 'rgba(0,0,0,0.4)' }}
          onClick={() => setDrawerOpen(false)} />
      )}

      {/* Mobile drawer */}
      <div className="lg:hidden fixed left-0 right-0 bottom-0 z-50 rounded-t-2xl overflow-hidden flex flex-col"
        style={{
          background: 'var(--white)',
          maxHeight: '85vh',
          transform: drawerOpen ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
          borderTop: '1px solid var(--border)',
        }}>
        <div className="flex-shrink-0 flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full" style={{ background: 'var(--border)' }} />
        </div>
        <div className="flex-shrink-0 flex items-center justify-between px-6 pb-4"
          style={{ borderBottom: '1px solid var(--border)' }}>
          <h2 className="text-lg font-semibold text-ink" style={{ fontFamily: 'Fraunces, serif' }}>Your Estimate</h2>
          <button type="button" onClick={() => setDrawerOpen(false)} className="p-1" style={{ color: 'var(--mid)' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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
