import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Industries We Work With',
  description: 'Masuyo Digital works with businesses across 13 industries in the UK: from e-commerce and healthcare to tradespeople and professional services.',
  openGraph: {
    title: 'Industries We Work With – Masuyo Digital',
    description: 'Bespoke digital solutions tailored to your industry. Web design, SEO, and marketing for UK businesses.',
    url: 'https://masuyodigital.com/industries',
  },
  alternates: { canonical: 'https://masuyodigital.com/industries' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
