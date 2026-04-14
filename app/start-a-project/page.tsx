'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'

/* ─── Types ─────────────────────────────────────────────── */
interface Selections {
  projectType: string[]
  features: string[]
  scale: string
  timeline: string
  budget: string
}

/* ─── Step config ───────────────────────────────────────── */
const PROJECT_TYPES = [
  { value: 'website', label: 'Website', desc: 'Marketing, brochure or portfolio site' },
  { value: 'ecommerce', label: 'E-commerce store', desc: 'Sell products or services online' },
  { value: 'webapp', label: 'Web application', desc: 'Custom platform, portal or tool' },
  { value: 'marketing', label: 'Digital marketing', desc: 'SEO, ads, content, social' },
  { value: 'automation', label: 'Automation', desc: 'Workflows, integrations, time saving' },
  { value: 'hosting', label: 'Hosting & support', desc: 'Managed hosting for an existing site' },
]

const FEATURES = [
  { value: 'cms', label: 'Content management system (CMS)' },
  { value: 'booking', label: 'Booking or appointment system' },
  { value: 'payments', label: 'Payment processing' },
  { value: 'crm', label: 'CRM integration' },
  { value: 'seo', label: 'SEO setup and strategy' },
  { value: 'analytics', label: 'Analytics and reporting' },
  { value: 'multilang', label: 'Multi-language support' },
  { value: 'api', label: 'Third-party API integrations' },
  { value: 'membership', label: 'Membership or login area' },
  { value: 'blog', label: 'Blog or news section' },
  { value: 'livechat', label: 'Live chat or chatbot' },
  { value: 'email', label: 'Email marketing setup' },
]

const SCALES = [
  { value: 'small', label: 'Small', desc: 'Straightforward, limited pages or scope' },
  { value: 'medium', label: 'Medium', desc: 'Moderate complexity, several sections or features' },
  { value: 'large', label: 'Large', desc: 'Complex, many features or high volume of content' },
]

const TIMELINES = [
  { value: 'asap', label: 'As soon as possible' },
  { value: '1-3mo', label: 'Within 1–3 months' },
  { value: '3-6mo', label: 'Within 3–6 months' },
  { value: 'flexible', label: 'I am flexible' },
]

const BUDGETS = [
  { value: 'exploring', label: 'Just exploring options' },
  { value: 'planning', label: 'Planning to start within 3 months' },
  { value: 'ready', label: 'Ready to start now' },
]

/* ─── Estimate logic ────────────────────────────────────── */
function calcEstimate(s: Selections): { low: number; high: number; unit: string } | null {
  if (!s.projectType.length || !s.scale) return null

  const scaleMulti = s.scale === 'small' ? 1 : s.scale === 'medium' ? 1.5 : 2.2
  const timelineMod = s.timeline === 'asap' ? 1.15 : s.timeline === 'flexible' ? 0.95 : 1

  let low = 0; let high = 0; let isMonthly = false

  const types = s.projectType
  if (types.includes('website') || types.includes('ecommerce')) {
    low += types.includes('ecommerce') ? 1200 : 500
    high += types.includes('ecommerce') ? 3500 : 1800
  }
  if (types.includes('webapp')) { low += 2500; high += 9000 }
  if (types.includes('automation')) { low += 600; high += 2500 }
  if (types.includes('marketing')) {
    low += 400; high += 1400
    if (!types.includes('website') && !types.includes('webapp')) isMonthly = true
  }
  if (types.includes('hosting') && types.length === 1) {
    return { low: 20, high: 80, unit: '/mo' }
  }

  const featureAdds: Record<string, [number, number]> = {
    cms: [250, 600], booking: [350, 800], payments: [200, 450],
    crm: [300, 700], seo: [350, 900], analytics: [150, 350],
    multilang: [500, 1200], api: [300, 800], membership: [600, 1500],
    blog: [150, 350], livechat: [150, 400], email: [200, 500],
  }
  s.features.forEach(f => {
    if (featureAdds[f]) { low += featureAdds[f][0]; high += featureAdds[f][1] }
  })

  low = Math.round(low * scaleMulti * timelineMod / 50) * 50
  high = Math.round(high * scaleMulti * timelineMod / 50) * 50

  return { low, high, unit: isMonthly && types.length === 1 ? '/mo' : '' }
}

function fmt(n: number) {
  return '£' + n.toLocaleString('en-GB')
}

/* ─── Step indicator ────────────────────────────────────── */
function StepDot({ n, current, done }: { n: number; current: number; done: boolean }) {
  const active = n === current
  const bg = done ? 'var(--blue)' : active ? 'var(--navy)' : 'var(--border)'
  const textCol = done || active ? '#fff' : 'var(--mid)'
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors"
        style={{ background: bg, color: textCol, fontFamily: 'Geist, sans-serif' }}>
        {done ? <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg> : n}
      </div>
    </div>
  )
}

/* ─── Checkbox card ─────────────────────────────────────── */
function CheckCard({ value, label, desc, checked, onChange }: {
  value: string; label: string; desc?: string; checked: boolean; onChange: (v: string) => void
}) {
  return (
    <button type="button" onClick={() => onChange(value)}
      className="w-full text-left p-4 rounded-lg transition-all"
      style={{ border: `1px solid ${checked ? 'var(--blue)' : 'var(--border)'}`, background: checked ? 'rgba(53,173,223,0.06)' : 'var(--white)' }}>
      <div className="flex items-start gap-3">
        <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors"
          style={{ background: checked ? 'var(--blue)' : 'var(--white)', border: `1.5px solid ${checked ? 'var(--blue)' : 'var(--border)'}` }}>
          {checked && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
        </div>
        <div>
          <p className="text-sm font-semibold text-ink" style={{ fontFamily: 'Geist, sans-serif' }}>{label}</p>
          {desc && <p className="text-xs mt-0.5" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>{desc}</p>}
        </div>
      </div>
    </button>
  )
}

/* ─── Radio card ────────────────────────────────────────── */
function RadioCard({ value, label, desc, selected, onChange }: {
  value: string; label: string; desc?: string; selected: boolean; onChange: (v: string) => void
}) {
  return (
    <button type="button" onClick={() => onChange(value)}
      className="w-full text-left p-4 rounded-lg transition-all"
      style={{ border: `1px solid ${selected ? 'var(--blue)' : 'var(--border)'}`, background: selected ? 'rgba(53,173,223,0.06)' : 'var(--white)' }}>
      <div className="flex items-start gap-3">
        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors"
          style={{ background: selected ? 'var(--blue)' : 'var(--white)', border: `1.5px solid ${selected ? 'var(--blue)' : 'var(--border)'}` }}>
          {selected && <div className="w-2 h-2 rounded-full bg-white" />}
        </div>
        <div>
          <p className="text-sm font-semibold text-ink" style={{ fontFamily: 'Geist, sans-serif' }}>{label}</p>
          {desc && <p className="text-xs mt-0.5" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>{desc}</p>}
        </div>
      </div>
    </button>
  )
}

/* ─── Page ──────────────────────────────────────────────── */
export default function StartAProjectPage() {
  const [step, setStep] = useState(1)
  const TOTAL = 5
  const [sel, setSel] = useState<Selections>({ projectType: [], features: [], scale: '', timeline: '', budget: '' })
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const estimate = calcEstimate(sel)

  function toggleMulti(field: 'projectType' | 'features', val: string) {
    setSel(prev => {
      const arr = prev[field]
      return { ...prev, [field]: arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val] }
    })
  }

  function canAdvance() {
    if (step === 1) return sel.projectType.length > 0
    if (step === 2) return true // features optional
    if (step === 3) return sel.scale !== ''
    if (step === 4) return sel.timeline !== '' && sel.budget !== ''
    return true
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitStatus('submitting')
    const payload = {
      projectType: sel.projectType.join(', '),
      features: sel.features.join(', ') || 'None selected',
      scale: sel.scale,
      timeline: sel.timeline,
      budget: sel.budget,
      estimate: estimate ? `${fmt(estimate.low)} – ${fmt(estimate.high)}${estimate.unit}` : 'Not calculated',
    }
    try {
      const res = await fetch('https://formspree.io/f/xlgpogqk', {
        method: 'POST', body: JSON.stringify(payload),
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      })
      setSubmitStatus(res.ok ? 'success' : 'error')
    } catch { setSubmitStatus('error') }
  }

  return (
    <>
      {/* Hero */}
      <section className="crosshatch-bg pt-16 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24">
          <div className="max-w-2xl">
            <RevealAnimation>
              <h1 className="text-4xl md:text-5xl font-semibold text-white mb-3 leading-tight" style={{ fontFamily: 'Fraunces, serif' }}>
                Start a project
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <p className="text-lg" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif' }}>
                Answer a few quick questions and we will give you an indicative cost range.
              </p>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Estimator */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {submitStatus === 'success' ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: 'rgba(53,173,223,0.1)' }}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M6 16l7 7 13-13" stroke="var(--blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="text-3xl font-semibold text-ink mb-3" style={{ fontFamily: 'Fraunces, serif' }}>Enquiry sent</h2>
              <p className="text-base mb-8" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                We have received your project brief. We will be in touch within one business day.
              </p>
              <Link href="/" className="inline-block text-sm font-semibold text-white px-6 py-3 rounded"
                style={{ background: 'var(--navy)', fontFamily: 'Geist, sans-serif' }}>
                Back to home
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Step indicator */}
              <div className="flex items-center justify-between mb-10">
                {Array.from({ length: TOTAL }).map((_, i) => (
                  <div key={i} className="flex items-center flex-1">
                    <StepDot n={i + 1} current={step} done={i + 1 < step} />
                    {i < TOTAL - 1 && (
                      <div className="flex-1 h-px mx-2" style={{ background: i + 1 < step ? 'var(--blue)' : 'var(--border)' }} />
                    )}
                  </div>
                ))}
              </div>

              {/* ── Step 1: Project type ── */}
              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-semibold text-ink mb-2" style={{ fontFamily: 'Fraunces, serif' }}>
                    What kind of project is this?
                  </h2>
                  <p className="text-sm mb-6" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>Select all that apply.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {PROJECT_TYPES.map(pt => (
                      <CheckCard key={pt.value} value={pt.value} label={pt.label} desc={pt.desc}
                        checked={sel.projectType.includes(pt.value)}
                        onChange={v => toggleMulti('projectType', v)} />
                    ))}
                  </div>
                </div>
              )}

              {/* ── Step 2: Features ── */}
              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-semibold text-ink mb-2" style={{ fontFamily: 'Fraunces, serif' }}>
                    Which features do you need?
                  </h2>
                  <p className="text-sm mb-6" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>Select anything relevant. Skip if unsure.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {FEATURES.map(f => (
                      <CheckCard key={f.value} value={f.value} label={f.label}
                        checked={sel.features.includes(f.value)}
                        onChange={v => toggleMulti('features', v)} />
                    ))}
                  </div>
                </div>
              )}

              {/* ── Step 3: Scale ── */}
              {step === 3 && (
                <div>
                  <h2 className="text-2xl font-semibold text-ink mb-2" style={{ fontFamily: 'Fraunces, serif' }}>
                    How would you describe the scale?
                  </h2>
                  <p className="text-sm mb-6" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>Your best guess is fine.</p>
                  <div className="flex flex-col gap-3">
                    {SCALES.map(sc => (
                      <RadioCard key={sc.value} value={sc.value} label={sc.label} desc={sc.desc}
                        selected={sel.scale === sc.value} onChange={v => setSel(p => ({ ...p, scale: v }))} />
                    ))}
                  </div>
                </div>
              )}

              {/* ── Step 4: Timeline + Budget ── */}
              {step === 4 && (
                <div>
                  <h2 className="text-2xl font-semibold text-ink mb-2" style={{ fontFamily: 'Fraunces, serif' }}>
                    Timeline and readiness
                  </h2>
                  <p className="text-sm mb-6" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>No commitment — just helps us understand your situation.</p>
                  <p className="text-sm font-semibold text-ink mb-3" style={{ fontFamily: 'Geist, sans-serif' }}>Ideal timeline</p>
                  <div className="flex flex-col gap-3 mb-8">
                    {TIMELINES.map(t => (
                      <RadioCard key={t.value} value={t.value} label={t.label}
                        selected={sel.timeline === t.value} onChange={v => setSel(p => ({ ...p, timeline: v }))} />
                    ))}
                  </div>
                  <p className="text-sm font-semibold text-ink mb-3" style={{ fontFamily: 'Geist, sans-serif' }}>Where are you in the process?</p>
                  <div className="flex flex-col gap-3">
                    {BUDGETS.map(b => (
                      <RadioCard key={b.value} value={b.value} label={b.label}
                        selected={sel.budget === b.value} onChange={v => setSel(p => ({ ...p, budget: v }))} />
                    ))}
                  </div>
                </div>
              )}

              {/* ── Step 5: Estimate summary ── */}
              {step === 5 && (
                <div>
                  <h2 className="text-2xl font-semibold text-ink mb-2" style={{ fontFamily: 'Fraunces, serif' }}>
                    Your indicative estimate
                  </h2>
                  <p className="text-sm mb-8" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                    Based on your selections, here is a rough cost range.
                  </p>

                  {estimate ? (
                    <div className="rounded-xl p-8 mb-6 text-center" style={{ background: 'var(--navy)' }}>
                      <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>Estimated investment</p>
                      <p className="text-5xl font-semibold text-white mb-1" style={{ fontFamily: 'Fraunces, serif' }}>
                        {fmt(estimate.low)}<span className="text-2xl mx-2" style={{ color: 'rgba(255,255,255,0.4)' }}>–</span>{fmt(estimate.high)}
                        {estimate.unit && <span className="text-xl ml-1" style={{ color: 'rgba(255,255,255,0.6)' }}>{estimate.unit}</span>}
                      </p>
                    </div>
                  ) : (
                    <div className="rounded-xl p-8 mb-6 text-center" style={{ background: 'var(--light)', border: '1px solid var(--border)' }}>
                      <p className="text-base" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                        We were not able to calculate an estimate with those selections. Get in touch and we will work it out together.
                      </p>
                    </div>
                  )}

                  <div className="rounded-lg p-4 mb-6 text-sm leading-relaxed"
                    style={{ background: 'var(--light)', border: '1px solid var(--border)', color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                    <strong className="text-ink">Disclaimer:</strong> This is an indicative estimate only. Final pricing depends on your specific requirements and will be confirmed after a discovery call.
                  </div>

                  {/* Selections summary */}
                  <div className="rounded-lg p-5 mb-6" style={{ border: '1px solid var(--border)' }}>
                    <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>Your selections</p>
                    {[
                      ['Project type', sel.projectType.join(', ')],
                      ['Features', sel.features.join(', ') || 'None selected'],
                      ['Scale', sel.scale],
                      ['Timeline', sel.timeline],
                      ['Readiness', sel.budget],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between py-2 text-sm" style={{ borderBottom: '1px solid var(--border)' }}>
                        <span style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>{label}</span>
                        <span className="capitalize" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>{value}</span>
                      </div>
                    ))}
                  </div>

                  {submitStatus === 'error' && (
                    <p className="text-sm mb-4" style={{ color: '#dc2626', fontFamily: 'Geist, sans-serif' }}>
                      Something went wrong. Please try again or email us at hello@masuyodigital.com.
                    </p>
                  )}
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex items-center justify-between mt-8 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
                {step > 1 ? (
                  <button type="button" onClick={() => setStep(s => s - 1)}
                    className="text-sm font-medium flex items-center gap-2 transition-colors hover:opacity-70"
                    style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M11 7H3M6.5 4L3 7l3.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Back
                  </button>
                ) : <div />}

                {step < TOTAL ? (
                  <button type="button" disabled={!canAdvance()} onClick={() => setStep(s => s + 1)}
                    className="text-sm font-semibold text-white px-6 py-3 rounded transition-opacity disabled:opacity-40"
                    style={{ background: 'var(--navy)', fontFamily: 'Geist, sans-serif' }}>
                    {step === TOTAL - 1 ? 'See estimate' : 'Continue'}
                    <svg className="inline ml-2" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 7h8M7.5 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                ) : (
                  <button type="submit" disabled={submitStatus === 'submitting'}
                    className="text-sm font-semibold text-white px-6 py-3 rounded transition-opacity disabled:opacity-60"
                    style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
                    {submitStatus === 'submitting' ? 'Sending…' : 'Send enquiry'}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
