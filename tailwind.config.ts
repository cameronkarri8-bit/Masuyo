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
        blue: '#35ADDF',
        blue2: '#1d96cb',
        ink: '#111318',
        mid: '#6b7280',
        light: '#f5f4f2',
        border: '#e5e3df',
      },
      fontFamily: {
        fraunces: ['Fraunces', 'serif'],
        geist: ['Geist', 'sans-serif'],
      },
      fontSize: {
        'xs':   ['0.75rem',  { lineHeight: '1.25rem' }],   // 12px – decorative labels only
        'sm':   ['1rem',     { lineHeight: '1.625rem' }],  // 16px (was 14px)
        'base': ['1.125rem', { lineHeight: '1.75rem' }],   // 18px (was 16px)
        'lg':   ['1.25rem',  { lineHeight: '1.875rem' }],  // 20px (was 18px)
        'xl':   ['1.375rem', { lineHeight: '1.875rem' }],  // 22px
        '2xl':  ['1.625rem', { lineHeight: '2rem' }],      // 26px
        '3xl':  ['2rem',     { lineHeight: '2.25rem' }],   // 32px
        '4xl':  ['2.375rem', { lineHeight: '2.625rem' }],  // 38px
        '5xl':  ['3rem',     { lineHeight: '1' }],
        '6xl':  ['3.75rem',  { lineHeight: '1' }],
        '7xl':  ['4.5rem',   { lineHeight: '1' }],
      },
    },
  },
  plugins: [],
}
export default config
