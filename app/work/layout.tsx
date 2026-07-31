import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Case studies from Masuyo Digital. Websites, web apps, marketing and automation for growing UK businesses.',
  openGraph: {
    title: 'Work | Masuyo Digital',
    description:
      'Case studies from Masuyo Digital. Websites, web apps, marketing and automation for growing UK businesses.',
    url: 'https://masuyodigital.com/work',
  },
  alternates: { canonical: 'https://masuyodigital.com/work' },
}

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children
}
