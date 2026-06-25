import type { Metadata } from 'next'
import './globals.css'
import NavWrapper from '@/components/NavWrapper'
import FooterWrapper from '@/components/FooterWrapper'

export const metadata: Metadata = {
  metadataBase: new URL('https://masuyodigital.com'),
  title: {
    default: 'Masuyo Digital – We build digital things that actually work.',
    template: '%s | Masuyo Digital',
  },
  description: 'A full-service digital agency based in the UK. Websites, marketing, technology, automation and hosting, all under one roof.',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://masuyodigital.com',
    siteName: 'Masuyo Digital',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <NavWrapper />
        <main>{children}</main>
        <FooterWrapper />
      </body>
    </html>
  )
}
