import LogoFullWhite from '@/components/LogoFullWhite'
import { checkPassword } from './actions'

const BLUE = '#35ADDF'
const WHITE = '#ffffff'
const H = "var(--font-poppins)"
const B = "'Geist', sans-serif"

export default function PasswordGate({ hasError }: { hasError: boolean }) {
  return (
    <div
      className="crosshatch-bg"
      style={{
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        fontFamily: B,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Concentric brand circles */}
      <svg viewBox="0 0 1440 900" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <circle cx="1100" cy="200" r="520" stroke="rgba(53,173,223,0.10)" strokeWidth="1" />
        <circle cx="1100" cy="200" r="340" stroke="rgba(53,173,223,0.08)" strokeWidth="1" />
        <circle cx="300" cy="780" r="220" stroke="rgba(53,173,223,0.07)" strokeWidth="1" />
      </svg>

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '24rem', textAlign: 'center' }}>
        <LogoFullWhite className="h-5 w-auto mx-auto mb-10" />

        <h1 style={{ fontFamily: H, fontSize: '1.75rem', fontWeight: 700, color: WHITE, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
          Diogenes Sun Club
        </h1>
        <p style={{ fontFamily: B, fontSize: '1rem', color: 'rgba(255,255,255,0.65)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
          Your proposal is waiting. Please enter the password to continue.
        </p>

        <form action={checkPassword} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="Enter password"
            style={{
              width: '100%',
              padding: '0.9375rem 1rem',
              fontSize: '1rem',
              fontFamily: B,
              color: WHITE,
              background: 'rgba(255,255,255,0.08)',
              border: hasError ? '1.5px solid #e25555' : '1.5px solid rgba(255,255,255,0.22)',
              borderRadius: '0.5rem',
              outline: 'none',
              textAlign: 'center',
              letterSpacing: '0.08em',
              boxSizing: 'border-box',
            }}
          />

          {hasError && (
            <p style={{ fontSize: '0.9375rem', color: '#ff9a9a', fontFamily: B, textAlign: 'center' }}>
              That password is not right. Please try again.
            </p>
          )}

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.9375rem 1.5rem',
              background: BLUE,
              color: WHITE,
              fontFamily: B,
              fontSize: '1rem',
              fontWeight: 600,
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              letterSpacing: '0.01em',
              transition: 'background 0.2s ease',
            }}
          >
            Continue
          </button>
        </form>

        <p style={{ marginTop: '3rem', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)', fontFamily: B, lineHeight: 1.6 }}>
          This page is private. Prepared by Masuyo Digital.
        </p>
      </div>
    </div>
  )
}
