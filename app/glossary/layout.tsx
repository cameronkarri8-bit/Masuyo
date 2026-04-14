import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Digital Marketing Glossary',
  description: 'Plain-English definitions of 30+ digital marketing and web terms: from A/B testing and bounce rate to SEO, UX, and conversion rate.',
  openGraph: {
    title: 'Digital Marketing Glossary – Masuyo Digital',
    description: 'Plain-English definitions of digital marketing, SEO, and web terms for UK businesses.',
    url: 'https://masuyodigital.com/glossary',
  },
  alternates: { canonical: 'https://masuyodigital.com/glossary' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
