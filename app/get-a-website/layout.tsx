import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Get a Website',
  description: 'Your website, live in 7 working days. Professional, fast and built around your business. Starting at £249.',
  openGraph: {
    title: 'Get a Website – Masuyo Digital',
    description: 'Your website, live in 7 working days. Starting at £249.',
    url: 'https://masuyodigital.com/get-a-website',
  },
  alternates: { canonical: 'https://masuyodigital.com/get-a-website' },
}

export default function GetAWebsiteLayout({ children }: { children: React.ReactNode }) {
  return children
}
