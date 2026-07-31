import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#1A2939',
        blue: {
          DEFAULT: '#35ADDF',
          // #35ADDF composited at 7% over white. Used for section backgrounds
          // in place of grey, so panels read as warm rather than timid.
          tint: '#F1F9FD',
          // A slightly stronger tint for cards sitting on top of blue-tint.
          tint2: '#E3F2FA',
        },
        blue2: '#1d96cb',
        ink: '#111318',
        mid: '#6b7280',
        light: '#f5f4f2',
        border: '#e5e3df',
        // Stat callouts and data highlights only. Never buttons, links or nav.
        // Contrast: 5.38:1 on navy (passes AA text). 2.75:1 on white (decorative only).
        amber: '#E0863C',
      },
      fontFamily: {
        // Fraunces. Display and headings.
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        // Geist. Body and UI.
        sans: ['Geist', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '22px',
      },
      fontSize: {
        'xs':   ['0.75rem',  { lineHeight: '1.25rem' }],   // 12px, decorative labels only
        'sm':   ['1rem',     { lineHeight: '1.625rem' }],  // 16px
        'base': ['1.125rem', { lineHeight: '1.75rem' }],   // 18px
        'lg':   ['1.25rem',  { lineHeight: '1.875rem' }],  // 20px
        'xl':   ['1.375rem', { lineHeight: '1.875rem' }],  // 22px
        '2xl':  ['1.625rem', { lineHeight: '2rem' }],      // 26px
        '3xl':  ['2rem',     { lineHeight: '2.25rem' }],   // 32px
        '4xl':  ['2.5rem',   { lineHeight: '1.1' }],       // 40px, section heading floor
        '5xl':  ['3.5rem',   { lineHeight: '1.05' }],      // 56px, section heading ceiling
        '6xl':  ['4rem',     { lineHeight: '1.05' }],      // 64px, hero floor
        '7xl':  ['5rem',     { lineHeight: '1.03' }],      // 80px
        '8xl':  ['6rem',     { lineHeight: '1.02' }],      // 96px, hero ceiling
      },
    },
  },
  plugins: [],
}
export default config
