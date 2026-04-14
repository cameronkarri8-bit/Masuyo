import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Straight answers to the questions we hear most often: pricing, timelines, process, SEO, and what makes Masuyo different.',
  openGraph: {
    title: 'FAQ – Masuyo Digital',
    description: 'Straight answers about our process, pricing, and services.',
    url: 'https://masuyodigital.com/faq',
  },
  alternates: { canonical: 'https://masuyodigital.com/faq' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
