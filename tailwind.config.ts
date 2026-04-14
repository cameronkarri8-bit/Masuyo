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
    },
  },
  plugins: [],
}
export default config
