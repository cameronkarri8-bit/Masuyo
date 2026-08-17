import type { ReactNode } from 'react'
import FadeIn from './FadeIn'

/*
  Layout primitives for the client proposal pages.

  Lifted verbatim out of app/diogenes-proposal/ProposalContent.tsx so both the
  Diogenes and Northcote proposals draw on one set. The markup, the inline
  styles and the prop signatures are unchanged from that file: this was a move,
  not a rewrite.

  These are not part of the marketing site's design system. The proposals keep
  their own inline style layer on purpose, which is why the tokens below are
  declared here rather than imported from the Tailwind config.
*/

/* ─── Brand tokens ─── */
export const NAVY  = '#1A2939'
export const BLUE  = '#35ADDF'
export const BLUE2 = '#1d96cb'
export const INK   = '#111318'
export const MID   = '#6b7280'
export const LIGHT = '#f5f4f2'
export const WHITE = '#ffffff'
export const BORDER = '#e5e3df'
export const H = "var(--font-geist)"
export const B = "var(--font-geist), system-ui, sans-serif"

/* Matches ProposalShell LOGO_H (40) + PROG_H (50). */
export const HDR = 90

/* ─── Layout primitives ─── */

export function Section({
  id, bg = WHITE, children, first = false,
}: {
  id: string; bg?: string; children: ReactNode; first?: boolean
}) {
  return (
    <section
      id={id}
      style={{
        background: bg,
        padding: '5rem 0',
        scrollMarginTop: `${HDR}px`,
        borderTop: first ? 'none' : `1px solid ${BORDER}`,
      }}
    >
      <div style={{ maxWidth: '60rem', margin: '0 auto', padding: '0 1.5rem' }}>{children}</div>
    </section>
  )
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      style={{
        fontFamily: B,
        fontSize: '0.75rem',
        fontWeight: 700,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: light ? BLUE : BLUE2,
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.625rem',
      }}
    >
      <span style={{ width: '1.75rem', height: '2px', background: BLUE, display: 'inline-block', flexShrink: 0 }} />
      {children}
    </p>
  )
}

export function H2({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <h2
      style={{
        fontFamily: H,
        fontSize: 'clamp(1.875rem, 4.5vw, 2.75rem)',
        fontWeight: 700,
        color: light ? WHITE : NAVY,
        lineHeight: 1.15,
        letterSpacing: '-0.02em',
        marginBottom: '1.75rem',
      }}
    >
      {children}
    </h2>
  )
}

export function Lead({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      style={{
        fontFamily: B,
        fontSize: 'clamp(1.125rem, 2.2vw, 1.375rem)',
        fontWeight: 500,
        lineHeight: 1.5,
        color: light ? 'rgba(255,255,255,0.92)' : INK,
        marginBottom: '1.5rem',
      }}
    >
      {children}
    </p>
  )
}

export function Chunk({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      style={{
        fontFamily: B,
        fontSize: '1.0625rem',
        lineHeight: 1.7,
        color: light ? 'rgba(255,255,255,0.78)' : MID,
        marginBottom: '1rem',
      }}
    >
      {children}
    </p>
  )
}

export function Check({ light = false }: { light?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: '0.1rem' }} aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill={light ? 'rgba(53,173,223,0.25)' : 'rgba(53,173,223,0.12)'} />
      <path d="M6 10.2l2.6 2.6 5.4-5.6" stroke={BLUE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function BulletList({ items, light = false }: { items: ReactNode[]; light?: boolean }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {items.map((it, i) => (
        <li
          key={i}
          style={{
            display: 'flex',
            gap: '0.75rem',
            alignItems: 'flex-start',
            fontFamily: B,
            fontSize: '1.0625rem',
            lineHeight: 1.55,
            color: light ? 'rgba(255,255,255,0.88)' : INK,
          }}
        >
          <Check light={light} />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  )
}

export function StatCard({ value, label, accent = false, small = false }: { value: ReactNode; label: string; accent?: boolean; small?: boolean }) {
  return (
    <div
      style={{
        background: accent ? NAVY : WHITE,
        border: `1px solid ${accent ? NAVY : BORDER}`,
        borderRadius: '0.875rem',
        padding: '1.75rem 1.25rem',
        textAlign: 'center',
        boxShadow: '0 1px 2px rgba(26,41,57,0.04)',
      }}
    >
      <p
        style={{
          fontFamily: H,
          fontSize: small ? 'clamp(0.9375rem, 2.5vw, 1.25rem)' : 'clamp(2rem, 6vw, 3rem)',
          fontWeight: 700,
          color: accent ? WHITE : NAVY,
          lineHeight: small ? 1.3 : 1,
          marginBottom: '0.5rem',
          letterSpacing: small ? '-0.01em' : '-0.02em',
          wordBreak: 'break-word',
        }}
      >
        {value}
      </p>
      <p style={{ fontFamily: B, fontSize: '0.875rem', fontWeight: 500, color: accent ? 'rgba(255,255,255,0.6)' : MID, lineHeight: 1.4 }}>
        {label}
      </p>
    </div>
  )
}

export function Callout({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div
      style={{
        borderLeft: `4px solid ${BLUE}`,
        background: light ? 'rgba(255,255,255,0.06)' : LIGHT,
        padding: '1.25rem 1.5rem',
        borderRadius: '0 0.625rem 0.625rem 0',
        margin: '1.75rem 0',
      }}
    >
      {children}
    </div>
  )
}

export function Head({ eyebrow, title, light = false }: { eyebrow: string; title: ReactNode; light?: boolean }) {
  return (
    <FadeIn>
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <H2 light={light}>{title}</H2>
    </FadeIn>
  )
}

export function NumberedCard({ n, title, children, last = false }: { n: string; title: string; children: ReactNode; last?: boolean }) {
  return (
    <FadeIn>
      <div style={{ display: 'flex', gap: '1.25rem', padding: '1.75rem 0', borderTop: `1px solid ${BORDER}`, borderBottom: last ? `1px solid ${BORDER}` : undefined }}>
        <div
          style={{
            flexShrink: 0,
            width: '2.75rem',
            height: '2.75rem',
            borderRadius: '0.75rem',
            background: NAVY,
            color: WHITE,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: H,
            fontSize: '1.25rem',
            fontWeight: 700,
          }}
        >
          {n}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ fontFamily: H, fontSize: '1.3125rem', fontWeight: 700, color: NAVY, marginBottom: '0.625rem', lineHeight: 1.3 }}>{title}</h3>
          {children}
        </div>
      </div>
    </FadeIn>
  )
}

export function Deliverable({ title, children, last = false }: { title: string; children: ReactNode; last?: boolean }) {
  return (
    <FadeIn>
      <div style={{ display: 'flex', gap: '0.875rem', padding: '1.25rem 0', borderTop: `1px solid ${BORDER}`, borderBottom: last ? `1px solid ${BORDER}` : undefined }}>
        <Check />
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontFamily: H, fontSize: '1.125rem', fontWeight: 700, color: NAVY, marginBottom: '0.3rem', lineHeight: 1.3 }}>{title}</p>
          <p style={{ fontFamily: B, fontSize: '1rem', lineHeight: 1.6, color: MID }}>{children}</p>
        </div>
      </div>
    </FadeIn>
  )
}

export function LineItem({ label, price }: { label: string; price: string }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        gap: '1rem',
        padding: '0.8125rem 0',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <span style={{ fontFamily: B, fontSize: '1rem', color: 'rgba(255,255,255,0.72)' }}>{label}</span>
      <span style={{ fontFamily: B, fontSize: '1rem', fontWeight: 600, color: WHITE, flexShrink: 0 }}>{price}</span>
    </div>
  )
}

export function PlanCard({ price, name, features, featured = false }: { price: string; name: string; features: string[]; featured?: boolean }) {
  return (
    <div
      style={{
        background: featured ? 'rgba(53,173,223,0.12)' : 'rgba(255,255,255,0.05)',
        border: featured ? '1.5px solid rgba(53,173,223,0.4)' : '1px solid rgba(255,255,255,0.1)',
        borderRadius: '0.875rem',
        padding: '1.5rem',
      }}
    >
      <p style={{ fontFamily: H, fontSize: 'clamp(1.625rem, 5vw, 2.125rem)', fontWeight: 700, color: WHITE, letterSpacing: '-0.02em', lineHeight: 1, marginBottom: '0.375rem' }}>
        {price}
      </p>
      <p style={{ fontFamily: B, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: featured ? BLUE : 'rgba(255,255,255,0.42)', marginBottom: '1.25rem' }}>
        {name}
      </p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
        {features.map((f, i) => (
          <li key={i} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}>
            <Check light />
            <span style={{ fontFamily: B, fontSize: '0.9375rem', color: 'rgba(255,255,255,0.78)', lineHeight: 1.5 }}>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ExtraRow({ title, desc, price }: { title: string; desc: string; price: string }) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.09)',
        borderRadius: '0.75rem',
        padding: '1.125rem 1.375rem',
      }}
    >
      <div
        className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-3"
        style={{ marginBottom: '0.4rem' }}
      >
        <p style={{ fontFamily: H, fontSize: '1.0625rem', fontWeight: 700, color: WHITE, margin: 0 }}>{title}</p>
        <p style={{ fontFamily: B, fontSize: '0.875rem', fontWeight: 600, color: BLUE, whiteSpace: 'nowrap', flexShrink: 0, margin: 0 }}>{price}</p>
      </div>
      <p style={{ fontFamily: B, fontSize: '0.9375rem', color: 'rgba(255,255,255,0.58)', lineHeight: 1.55, margin: 0 }}>{desc}</p>
    </div>
  )
}

/* ─── Sub-label for investment blocks ─── */
/* ─── Sub-label for investment blocks ─── */
export const subLabel: React.CSSProperties = {
  fontFamily: B,
  fontSize: '0.6875rem',
  fontWeight: 700,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.42)',
  marginTop: '2.75rem',
  marginBottom: '1rem',
}
