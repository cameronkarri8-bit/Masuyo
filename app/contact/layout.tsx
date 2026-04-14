import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Let us talk about your business. No hard sell, no lengthy forms, just an honest conversation.',
  openGraph: {
    title: 'Contact – Masuyo Digital',
    description: 'Let us talk about your business.',
    url: 'https://masuyodigital.com/contact',
  },
  alternates: { canonical: 'https://masuyodigital.com/contact' },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
