'use client'

import { useState, useEffect } from 'react'
import { submitQuestionnaire } from './actions'

const NAVY  = '#1A2939'
const BLUE  = '#35ADDF'
const WHITE = '#ffffff'
const INK   = '#111318'
const H     = "var(--font-poppins)"
const B     = "'Geist', sans-serif"

/* ---------- Question definitions ---------- */

type QType = 'single' | 'multi' | 'longtext'

interface Question {
  id: string
  type: QType
  question: string
  options?: string[]
  hasOther?: string   // option label that reveals a text input
  hasYesText?: boolean // "Yes" option reveals a textarea
  optional?: boolean
  note?: string
}

const QUESTIONS: Question[] = [
  {
    id: 'q1',
    type: 'single',
    question: 'Who will give the final sign-off on the project?',
    options: ['Liz alone', 'Liz with a small group', 'The full team', 'Not sure yet'],
  },
  {
    id: 'q2',
    type: 'single',
    question: 'How would you like to handle the copy, the wording on the site?',
    options: [
      'You write a draft and we review and shape it (recommended)',
      'We provide all final wording',
      'Not sure, let us discuss',
    ],
  },
  {
    id: 'q3',
    type: 'multi',
    question: 'Which pages do you need? Select all that apply.',
    options: [
      'Home',
      'New to Naturism and FAQs',
      'Facilities',
      'Membership and Arrange a Visit',
      'Events and News',
      'About and History',
      'Location and Contact',
      'Privacy Policy',
      'Something else',
    ],
    hasOther: 'Something else',
  },
  {
    id: 'q4',
    type: 'single',
    question: 'How far should the design lean toward a younger feel?',
    options: [
      'Lean noticeably younger',
      'A warm balance (recommended)',
      'Keep it close to the current feel',
      'Not sure, we would like your advice',
    ],
  },
  {
    id: 'q5',
    type: 'single',
    question: 'Do you have access to your current domain and hosting?',
    options: ['Yes, full access', 'We have some of it', 'No or not sure (we can help)'],
  },
  {
    id: 'q6',
    type: 'single',
    question: 'What is your preference for imagery on the site?',
    options: [
      'A professional photo and drone shoot',
      'Start with the grounds and add people later',
      'We have our own photos we can use',
      'Not sure, we would like your advice',
    ],
  },
  {
    id: 'q7',
    type: 'multi',
    question: 'Are you interested in any optional ongoing services?',
    options: [
      'Care plan at £100 per month (includes up to 4 hours support)',
      'Hosting only at £45 per month',
      'Weekly SEO articles at £100 per month',
      'Monthly SEO articles at £25 per month',
      'Google Ads setup at £100 per ad',
      'None for now',
    ],
  },
  {
    id: 'q8',
    type: 'single',
    question: 'Was there anything from the previous proposal you particularly liked?',
    options: ['Yes', 'No', 'There was no previous proposal'],
    hasYesText: true,
  },
  {
    id: 'q9',
    type: 'longtext',
    question: 'Is there anything else you would like us to know?',
    optional: true,
    note: 'This is entirely optional. Leave it blank if you prefer.',
  },
]

/* ---------- localStorage helpers ---------- */

const LS_KEY = 'dgp_questionnaire_v1'

type Answers = Record<string, string | string[]>
type Extras  = Record<string, string>

function lsLoad(): { step: number; answers: Answers; extras: Extras } | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(LS_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

function lsSave(step: number, answers: Answers, extras: Extras) {
  try { localStorage.setItem(LS_KEY, JSON.stringify({ step, answers, extras })) } catch {}
}

function lsClear() {
  try { localStorage.removeItem(LS_KEY) } catch {}
}

/* ---------- Button (public export) ---------- */

export default function QuestionnaireButton() {
  const [open, setOpen] = useState(false)

  function handleOpen() {
    setOpen(true)
    document.body.style.overflow = 'hidden'
  }

  function handleClose() {
    setOpen(false)
    document.body.style.overflow = ''
  }

  return (
    <>
      <button
        onClick={handleOpen}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: BLUE,
          color: WHITE,
          fontFamily: B,
          fontSize: '1.0625rem',
          fontWeight: 600,
          border: 'none',
          borderRadius: '0.5rem',
          padding: '1rem 2rem',
          cursor: 'pointer',
          letterSpacing: '0.01em',
          boxShadow: '0 4px 20px rgba(53,173,223,0.35)',
          transition: 'opacity 0.15s ease',
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
      >
        Answer a few quick questions
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" stroke={WHITE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && <QuestionnaireOverlay onClose={handleClose} />}
    </>
  )
}

/* ---------- Overlay ---------- */

function QuestionnaireOverlay({ onClose }: { onClose: () => void }) {
  const total = QUESTIONS.length

  const [step,    setStep]    = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [extras,  setExtras]  = useState<Extras>({})
  const [status,  setStatus]  = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [saved,   setSaved]   = useState(false)

  // Restore from localStorage
  useEffect(() => {
    const s = lsLoad()
    if (s) {
      setStep(Math.min(s.step ?? 0, total - 1))
      setAnswers(s.answers ?? {})
      setExtras(s.extras ?? {})
      setSaved(true)
    }
  }, [total])

  // Persist on every change
  useEffect(() => {
    if (status === 'success') return
    lsSave(step, answers, extras)
    setSaved(true)
  }, [step, answers, extras, status])

  // Close on Escape
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  }, [onClose])

  const q      = QUESTIONS[step]
  const answer = answers[q.id]
  const isLast = step === total - 1

  const canProceed =
    q.optional ? true
    : q.type === 'single' ? !!answer
    : q.type === 'multi'  ? Array.isArray(answer) && (answer as string[]).length > 0
    : true

  function setSingle(val: string) {
    setAnswers(prev => ({ ...prev, [q.id]: val }))
  }

  function toggleMulti(opt: string) {
    const cur = (answers[q.id] as string[]) ?? []
    setAnswers(prev => ({
      ...prev,
      [q.id]: cur.includes(opt) ? cur.filter(o => o !== opt) : [...cur, opt],
    }))
  }

  function setLong(val: string) {
    setAnswers(prev => ({ ...prev, [q.id]: val }))
  }

  function setExtra(key: string, val: string) {
    setExtras(prev => ({ ...prev, [key]: val }))
  }

  async function handleSubmit() {
    setStatus('submitting')
    const payload: Record<string, string> = {}
    QUESTIONS.forEach(qn => {
      const a = answers[qn.id]
      payload[qn.id] = Array.isArray(a) ? a.join(', ') : (a as string) ?? ''
    })
    Object.entries(extras).forEach(([k, v]) => { payload[k] = v })

    try {
      const result = await submitQuestionnaire(payload)
      if (result.ok) { setStatus('success'); lsClear() }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  function handleNext() {
    if (isLast) handleSubmit()
    else setStep(s => s + 1)
  }

  const pct = ((step + 1) / total) * 100

  /* --- shared styles --- */
  const optBase: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.875rem',
    width: '100%',
    textAlign: 'left',
    borderRadius: '0.625rem',
    padding: '0.9375rem 1rem',
    cursor: 'pointer',
    transition: 'all 0.12s ease',
    border: '1.5px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.04)',
  }
  const optActive: React.CSSProperties = {
    ...optBase,
    background: 'rgba(53,173,223,0.14)',
    border: `1.5px solid ${BLUE}`,
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Proposal questionnaire"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        background: 'rgba(8,15,24,0.93)',
        backdropFilter: 'blur(6px)',
      }}
    >
      <div
        style={{
          background: '#0d1820',
          border: '1px solid rgba(255,255,255,0.09)',
          borderRadius: '1.25rem',
          width: '100%',
          maxWidth: '38rem',
          maxHeight: '92svh',
          overflowY: 'auto',
          boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {status === 'success' ? (
          <SuccessScreen onClose={onClose} />
        ) : (
          <>
            {/* ── Header ── */}
            <div style={{ padding: '1.375rem 1.5rem 0', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px', marginBottom: '0.625rem' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: BLUE, borderRadius: '99px', transition: 'width 0.3s ease' }} />
                </div>
                <p style={{ fontFamily: B, fontSize: '0.6875rem', fontWeight: 700, color: 'rgba(255,255,255,0.38)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Question {step + 1} of {total}
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Save and close"
                style={{ flexShrink: 0, background: 'none', border: 'none', cursor: 'pointer', padding: '0.125rem', color: 'rgba(255,255,255,0.38)', lineHeight: 1, marginTop: '0.25rem' }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* ── Question body ── */}
            <div style={{ padding: '1.25rem 1.5rem 1rem', flex: 1 }}>
              <h2
                style={{
                  fontFamily: H,
                  fontSize: 'clamp(1.125rem, 3.5vw, 1.4375rem)',
                  fontWeight: 700,
                  color: WHITE,
                  lineHeight: 1.3,
                  letterSpacing: '-0.01em',
                  marginBottom: '1.25rem',
                }}
              >
                {q.question}
              </h2>

              {q.note && (
                <p style={{ fontFamily: B, fontSize: '0.875rem', color: 'rgba(255,255,255,0.42)', marginBottom: '1rem', lineHeight: 1.5 }}>
                  {q.note}
                </p>
              )}

              {/* ── Single select ── */}
              {q.type === 'single' && q.options && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {q.options.map(opt => {
                    const sel = answer === opt
                    return (
                      <button key={opt} onClick={() => setSingle(opt)} style={sel ? optActive : optBase}>
                        <Dot filled={sel} circle />
                        <span style={{ fontFamily: B, fontSize: '0.9375rem', fontWeight: sel ? 600 : 400, color: sel ? WHITE : 'rgba(255,255,255,0.72)', lineHeight: 1.4 }}>
                          {opt}
                        </span>
                      </button>
                    )
                  })}

                  {/* "Yes" free text (q8) */}
                  {q.hasYesText && answer === 'Yes' && (
                    <textarea
                      value={extras[`${q.id}_detail`] ?? ''}
                      onChange={e => setExtra(`${q.id}_detail`, e.target.value)}
                      placeholder="What did you particularly like?"
                      rows={3}
                      style={textareaStyle}
                    />
                  )}
                </div>
              )}

              {/* ── Multi select ── */}
              {q.type === 'multi' && q.options && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {q.options.map(opt => {
                    const sel = ((answers[q.id] as string[]) ?? []).includes(opt)
                    return (
                      <button key={opt} onClick={() => toggleMulti(opt)} style={sel ? optActive : optBase}>
                        <Dot filled={sel} circle={false} />
                        <span style={{ fontFamily: B, fontSize: '0.9375rem', fontWeight: sel ? 600 : 400, color: sel ? WHITE : 'rgba(255,255,255,0.72)', lineHeight: 1.4 }}>
                          {opt}
                        </span>
                      </button>
                    )
                  })}

                  {/* "Something else" free text (q3) */}
                  {q.hasOther && ((answers[q.id] as string[]) ?? []).includes(q.hasOther) && (
                    <input
                      type="text"
                      value={extras[`${q.id}_other`] ?? ''}
                      onChange={e => setExtra(`${q.id}_other`, e.target.value)}
                      placeholder="Please describe the additional page"
                      style={inputStyle}
                    />
                  )}
                </div>
              )}

              {/* ── Long text ── */}
              {q.type === 'longtext' && (
                <textarea
                  value={(answer as string) ?? ''}
                  onChange={e => setLong(e.target.value)}
                  placeholder="Type here..."
                  rows={5}
                  style={textareaStyle}
                />
              )}
            </div>

            {/* ── Error ── */}
            {status === 'error' && (
              <div style={{ margin: '0 1.5rem', padding: '0.875rem 1.125rem', background: 'rgba(220,60,60,0.12)', border: '1px solid rgba(220,60,60,0.28)', borderRadius: '0.625rem' }}>
                <p style={{ fontFamily: B, fontSize: '0.9375rem', color: '#ffaaaa', lineHeight: 1.5 }}>
                  Something went wrong sending your answers. Your progress is still saved on this device. Please try again, or get in touch with us directly.
                </p>
              </div>
            )}

            {/* ── Footer ── */}
            <div
              style={{
                padding: '1rem 1.5rem 1.375rem',
                borderTop: '1px solid rgba(255,255,255,0.07)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                marginTop: 'auto',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {step > 0 ? (
                  <button
                    onClick={() => setStep(s => s - 1)}
                    style={{ fontFamily: B, fontSize: '0.875rem', fontWeight: 500, color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left' }}
                  >
                    Back
                  </button>
                ) : (
                  <button
                    onClick={onClose}
                    style={{ fontFamily: B, fontSize: '0.875rem', fontWeight: 500, color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left' }}
                  >
                    Save and close
                  </button>
                )}
                {saved && status !== 'error' && (
                  <span style={{ fontFamily: B, fontSize: '0.6875rem', color: 'rgba(255,255,255,0.25)' }}>
                    Progress saved on this device
                  </span>
                )}
              </div>

              <button
                onClick={handleNext}
                disabled={!canProceed || status === 'submitting'}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  background: canProceed && status !== 'submitting' ? BLUE : 'rgba(53,173,223,0.22)',
                  color: canProceed && status !== 'submitting' ? WHITE : 'rgba(255,255,255,0.35)',
                  fontFamily: B,
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  border: 'none',
                  borderRadius: '0.5rem',
                  padding: '0.6875rem 1.25rem',
                  cursor: canProceed && status !== 'submitting' ? 'pointer' : 'default',
                  transition: 'all 0.15s ease',
                  flexShrink: 0,
                }}
              >
                {status === 'submitting' ? 'Sending...' : isLast ? 'Submit' : 'Next'}
                {!isLast && status !== 'submitting' && (
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                    <path d="M2 6.5h9M7.5 3l3 3.5-3 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

/* ---------- Success screen ---------- */

function SuccessScreen({ onClose }: { onClose: () => void }) {
  return (
    <div style={{ padding: '3.5rem 2rem', textAlign: 'center' }}>
      <div
        style={{
          width: '4.25rem',
          height: '4.25rem',
          borderRadius: '50%',
          background: 'rgba(53,173,223,0.14)',
          border: `1px solid rgba(53,173,223,0.3)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.75rem',
        }}
      >
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
          <path d="M5 13l6 6 10-12" stroke={BLUE} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2 style={{ fontFamily: H, fontSize: '1.5rem', fontWeight: 700, color: WHITE, marginBottom: '0.75rem', letterSpacing: '-0.01em' }}>
        Thank you, your answers are on their way.
      </h2>
      <p style={{ fontFamily: B, fontSize: '1rem', color: 'rgba(255,255,255,0.62)', lineHeight: 1.65, maxWidth: '22rem', margin: '0 auto 2.5rem' }}>
        Cameron will be in touch shortly. We are looking forward to working on this together.
      </p>
      <button
        onClick={onClose}
        style={{
          fontFamily: B,
          fontSize: '0.9375rem',
          fontWeight: 600,
          color: WHITE,
          background: BLUE,
          border: 'none',
          borderRadius: '0.5rem',
          padding: '0.8125rem 1.75rem',
          cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(53,173,223,0.3)',
        }}
      >
        Close
      </button>
    </div>
  )
}

/* ---------- Shared sub-components ---------- */

function Dot({ filled, circle }: { filled: boolean; circle: boolean }) {
  return (
    <span
      style={{
        flexShrink: 0,
        width: '1.125rem',
        height: '1.125rem',
        borderRadius: circle ? '50%' : '0.3125rem',
        border: filled ? 'none' : '1.5px solid rgba(255,255,255,0.28)',
        background: filled ? BLUE : 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.12s ease',
      }}
    >
      {filled && circle && (
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: WHITE, display: 'block' }} />
      )}
      {filled && !circle && (
        <svg width="11" height="9" viewBox="0 0 11 9" fill="none" aria-hidden="true">
          <path d="M1.5 4.5l3 3 5-6" stroke={WHITE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  )
}

/* ---------- Shared input styles ---------- */

const sharedInput: React.CSSProperties = {
  width: '100%',
  fontFamily: B,
  fontSize: '0.9375rem',
  color: WHITE,
  background: 'rgba(255,255,255,0.05)',
  border: '1.5px solid rgba(255,255,255,0.13)',
  borderRadius: '0.625rem',
  outline: 'none',
  boxSizing: 'border-box',
  lineHeight: 1.6,
}

const textareaStyle: React.CSSProperties = {
  ...sharedInput,
  padding: '0.875rem 1rem',
  resize: 'vertical',
  marginTop: '0.375rem',
}

const inputStyle: React.CSSProperties = {
  ...sharedInput,
  padding: '0.8125rem 1rem',
  marginTop: '0.375rem',
  display: 'block',
}
