import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Resources',
  description: 'Free guides, templates, checklists, and toolkits for UK businesses: covering marketing, finance, technology, legal, and growth.',
  openGraph: {
    title: 'Free Business Resources – Masuyo Digital',
    description: 'Practical guides, templates and checklists for growing UK businesses.',
    url: 'https://masuyodigital.com/resources',
  },
  alternates: { canonical: 'https://masuyodigital.com/resources' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
