import type { Metadata } from 'next'
import { Fraunces } from 'next/font/google'
import './globals.css'
import NavWrapper from '@/components/NavWrapper'
import FooterWrapper from '@/components/FooterWrapper'

// Fraunces is a variable font. Weight is left unpinned so the full 100 to 900
// range is available, and the optical size axis is exposed so display type can
// be set high (opsz 144) for the tight, high contrast look on large headlines.
const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--font-fraunces',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://masuyodigital.com'),
  title: {
    default: 'Masuyo Digital: we build digital things that actually work.',
    template: '%s | Masuyo Digital',
  },
  description: 'A full-service digital agency based in the UK. Websites, marketing, technology, automation and hosting, all under one roof.',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://masuyodigital.com',
    siteName: 'Masuyo Digital',
    // The share card comes from app/opengraph-image.tsx, which Next applies
    // automatically. The old /og-default.png reference pointed at a file that
    // never existed, so shares unfurled blank.
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
    <html lang="en" className={fraunces.variable}>
      <body>
        <NavWrapper />
        <main>{children}</main>
        <FooterWrapper />
      </body>
    </html>
  )
}
