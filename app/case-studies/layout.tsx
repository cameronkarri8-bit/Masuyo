import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Real results for real businesses. See how Masuyo Digital has helped UK businesses grow through web design, SEO, and digital marketing.',
  openGraph: {
    title: 'Case Studies – Masuyo Digital',
    description: 'Real results for real businesses. Web design, SEO, and digital marketing case studies.',
    url: 'https://masuyodigital.com/case-studies',
  },
  alternates: { canonical: 'https://masuyodigital.com/case-studies' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
