import type { Config } from 'tailwindcss'

/*
  Masuyo design tokens, from the brand guidelines (October 2026).

  Six colours, one typeface, and a type scale that steps down fluidly on small
  screens. Everything a page needs to look like Masuyo is named here, so a
  stray shade or size is easy to spot in review.
*/
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './content/**/*.mdx',
  ],
  theme: {
    extend: {
      colors: {
        /*
          Proportions across a page: mist and paper about half, petrol about a
          third, deep about a sixth, aqua a spark.

          Aqua only sits on petrol or deep. It is never text, a button or a
          background on mist, paper or white. The guide's own exceptions are
          the fill inside an icon and the highlighter behind part of a word.

          Contrast, from the guide: paper on petrol 11:1, aqua on petrol 7.5:1,
          deep on aqua 11:1, petrol on mist 9.8:1, steel on mist 5.2:1 (body
          copy only), aqua on mist 1.3:1 (never text).
        */
        petrol: '#0F3B4F',
        deep: '#0D1A20',
        aqua: '#4FE0E6',
        steel: '#52626A',
        mist: '#E4EAEC',
        paper: '#F3F6F7',

        /*
          Page scoped palette for the /frozen-computers design concept. Not part
          of the Masuyo brand and not used anywhere else on the site.
        */
        fc: {
          navy: '#0B1A26',
          slate: '#3A4A57',
          cyan: '#35C6F4',
          frost: '#EAF4F9',
        },
      },
      fontFamily: {
        sans: ['var(--font-albert)', 'system-ui', 'sans-serif'],
      },
      /*
        The brand type scale. Large sizes are clamps, so a headline shrinks
        with the screen rather than jumping at a breakpoint.

        Sentence case always. No letter spacing anywhere apart from the minus
        4% on display type, which is what the guide specifies.
      */
      fontSize: {
        // Display, 72 to 120px on large screens. Hero H1s.
        display: ['clamp(2.75rem, 1.25rem + 4.6vw, 6.25rem)', { lineHeight: '0.98', letterSpacing: '-0.04em', fontWeight: '800' }],
        // Display for a hero that shares the width with a visual: 72px on large
        // screens, the bottom of the guide's display range, so a hero headline
        // stays on two or three lines beside the picture.
        hero: ['clamp(2.5rem, 1.1rem + 3.9vw, 4.5rem)', { lineHeight: '1', letterSpacing: '-0.04em', fontWeight: '800' }],
        // Heading, 48px. Section headings, stepping down to 32px on a phone.
        heading: ['clamp(2rem, 1.45rem + 1.7vw, 3rem)', { lineHeight: '1.06', letterSpacing: '0', fontWeight: '800' }],
        // Section title, 32px. Smaller section headings and card titles.
        title: ['clamp(1.625rem, 1.35rem + 0.85vw, 2rem)', { lineHeight: '1.12', letterSpacing: '0', fontWeight: '800' }],
        // Subhead, 22px bold.
        subhead: ['clamp(1.25rem, 1.15rem + 0.3vw, 1.375rem)', { lineHeight: '1.3', letterSpacing: '0', fontWeight: '700' }],
        // A roomier body size for hero introductions, as the guide sets them.
        lead: ['clamp(1.0625rem, 0.95rem + 0.4vw, 1.25rem)', { lineHeight: '1.5', letterSpacing: '0' }],
        // Body, 17px regular, 1.5 line height.
        body: ['1.0625rem', { lineHeight: '1.5', letterSpacing: '0' }],
        // Small, 14px semibold. Eyebrows, labels, meta lines.
        small: ['0.875rem', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '600' }],
      },
      maxWidth: {
        // About 65 characters of body copy, as the copy spec asks.
        measure: '38rem',
        site: '75rem',
      },
      borderRadius: {
        control: '0.5rem',
        card: '1rem',
      },
      transitionTimingFunction: {
        brand: 'cubic-bezier(0.2, 0.7, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
export default config
