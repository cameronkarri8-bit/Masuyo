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
        // Jost. Display and headings.
        display: ['var(--font-jost)', 'system-ui', 'sans-serif'],
        // Geist. Body and UI.
        sans: ['Geist', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '22px',
      },
      /*
        Sizes from 3xl up are only ever used on display type, so each carries
        its own Jost tuning. Because the tuning rides on the size class, a
        heading written `text-4xl md:text-5xl` moves from the section tier to
        the large tier by itself at the breakpoint.

        Sizes 2xl and below are shared with body copy, so they stay untuned
        here. Headings at those sizes pick up the small heading tier from the
        h1 to h6 rule in globals.css instead.
      */
      fontSize: {
        'xs':   ['0.75rem',  { lineHeight: '1.25rem' }],   // 12px, decorative labels only
        'sm':   ['1rem',     { lineHeight: '1.625rem' }],  // 16px
        'base': ['1.125rem', { lineHeight: '1.75rem' }],   // 18px
        'lg':   ['1.25rem',  { lineHeight: '1.875rem' }],  // 20px
        'xl':   ['1.375rem', { lineHeight: '1.875rem' }],  // 22px
        '2xl':  ['1.625rem', { lineHeight: '2rem' }],      // 26px

        // Section heading tier: 32px to 48px.
        '3xl':  ['2rem',     { lineHeight: '1.1',  letterSpacing: '-0.02em', fontWeight: '600' }],  // 32px
        '4xl':  ['2.5rem',   { lineHeight: '1.1',  letterSpacing: '-0.02em', fontWeight: '600' }],  // 40px

        // Large headline tier: 48px and above.
        '5xl':  ['3.5rem',   { lineHeight: '1.02', letterSpacing: '-0.03em', fontWeight: '700' }],  // 56px
        '6xl':  ['4rem',     { lineHeight: '1.02', letterSpacing: '-0.03em', fontWeight: '700' }],  // 64px
        '7xl':  ['5rem',     { lineHeight: '1.02', letterSpacing: '-0.03em', fontWeight: '700' }],  // 80px
        '8xl':  ['6rem',     { lineHeight: '1.02', letterSpacing: '-0.03em', fontWeight: '700' }],  // 96px
      },
    },
  },
  plugins: [],
}
export default config
