import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Start a Project',
  description: 'Answer a few quick questions and get an indicative cost estimate for your website, marketing, or technology project.',
  openGraph: {
    title: 'Start a Project – Masuyo Digital',
    description: 'Get an indicative estimate for your project in under 2 minutes.',
    url: 'https://masuyodigital.com/start-a-project',
  },
  alternates: { canonical: 'https://masuyodigital.com/start-a-project' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
