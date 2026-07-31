import type { Metadata } from 'next'
import { Jost } from 'next/font/google'
import './globals.css'
import NavWrapper from '@/components/NavWrapper'
import FooterWrapper from '@/components/FooterWrapper'

// Jost is the display face. A geometric sans, so it wants tighter tracking at
// large sizes and looser tracking in small caps, which is tuned in globals.css
// and in the fontSize scale in tailwind.config.ts.
const jost = Jost({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-jost',
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
    <html lang="en" className={jost.variable}>
      <body>
        <NavWrapper />
        <main>{children}</main>
        <FooterWrapper />
      </body>
    </html>
  )
}
