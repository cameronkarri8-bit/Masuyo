import { Playfair_Display, DM_Sans } from 'next/font/google'
import { checkPassword } from './actions'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ph',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-pb',
  display: 'swap',
})

const H = 'var(--font-ph)'
const B = 'var(--font-pb)'
const CREAM = '#F9F7F4'
const GREEN = '#2A3D2B'
const SAGE = '#7A9E75'
const MUTED = '#7A7570'
const BODY = '#4A4540'

export default function PasswordGate({ hasError }: { hasError: boolean }) {
  return (
    <div
      className={`${playfair.variable} ${dmSans.variable}`}
      style={{
        minHeight: '100svh',
        background: CREAM,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        fontFamily: B,
      }}
    >
      <div style={{ width: '100%', maxWidth: '22rem', textAlign: 'center' }}>
        {/* Monogram / logo */}
        <div
          style={{
            width: '3rem',
            height: '3rem',
            borderRadius: '50%',
            border: `1.5px solid ${SAGE}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2rem',
          }}
        >
          <span style={{ fontFamily: H, fontSize: '1.125rem', fontWeight: 500, color: GREEN, letterSpacing: '0.05em' }}>D</span>
        </div>

        <h1
          style={{
            fontFamily: H,
            fontSize: '1.5rem',
            fontWeight: 500,
            color: GREEN,
            marginBottom: '0.375rem',
            letterSpacing: '-0.01em',
          }}
        >
          Diogenes Sun Club
        </h1>
        <p
          style={{
            fontFamily: B,
            fontSize: '0.9375rem',
            color: MUTED,
            marginBottom: '2.5rem',
            lineHeight: 1.6,
          }}
        >
          Your proposal is waiting.
        </p>

        <form action={checkPassword} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          <div style={{ position: 'relative' }}>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="Enter password"
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                fontSize: '0.9375rem',
                fontFamily: B,
                color: BODY,
                background: '#FFFFFF',
                border: hasError ? '1.5px solid #c0392b' : `1.5px solid #D4D0CA`,
                borderRadius: '0.5rem',
                outline: 'none',
                textAlign: 'center',
                letterSpacing: hasError ? 'normal' : '0.1em',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {hasError && (
            <p style={{ fontSize: '0.875rem', color: '#c0392b', fontFamily: B, textAlign: 'center' }}>
              That password is not right. Please try again.
            </p>
          )}

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.875rem 1.5rem',
              background: GREEN,
              color: CREAM,
              fontFamily: B,
              fontSize: '0.9375rem',
              fontWeight: 500,
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              letterSpacing: '0.01em',
            }}
          >
            Continue
          </button>
        </form>

        <p
          style={{
            marginTop: '3rem',
            fontSize: '0.75rem',
            color: '#B0ACA6',
            fontFamily: B,
            lineHeight: 1.6,
          }}
        >
          This page is private. Prepared by Masuyo Digital.
        </p>
      </div>
    </div>
  )
}
