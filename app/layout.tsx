import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import NavWrapper from '@/components/NavWrapper'
import FooterWrapper from '@/components/FooterWrapper'
import AnalyticsWrapper from '@/components/AnalyticsWrapper'

/*
  One typeface for the whole site. Contrast comes from weight and tracking
  rather than a second family, which is tuned in globals.css and in the
  fontSize scale in tailwind.config.ts.

  Geist is self hosted rather than loaded from next/font/google, because Geist
  is not in the Google Fonts manifest that ships with Next 14.2.5. This is the
  variable file from Vercel's own geist package, vendored into the repo so the
  build does not depend on node_modules layout. The 100 to 900 range covers the
  400, 500, 600 and 800 weights the type scale uses.
*/
const geist = localFont({
  src: './fonts/Geist-Variable.woff2',
  weight: '100 900',
  style: 'normal',
  variable: '--font-geist',
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

/*
  Sitewide Organization schema. One instance in the root layout rather than
  repeated per page, so search engines see a single consistent entity.

  sameAs lists only profiles that actually exist. Adding a placeholder URL here
  would be worse than an empty list, because a dead profile link undermines the
  entity rather than strengthening it.
*/
const ORGANIZATION = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Masuyo Digital',
  url: 'https://masuyodigital.com',
  logo: 'https://masuyodigital.com/opengraph-image',
  description:
    'Websites, marketing and software for growing businesses. Fair prices published up front, one senior person on every project.',
  email: 'hello@masuyodigital.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Hertford',
    addressRegion: 'Hertfordshire',
    addressCountry: 'GB',
  },
  sameAs: [] as string[],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={geist.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION) }}
        />
        <NavWrapper />
        <main>{children}</main>
        <FooterWrapper />
        <AnalyticsWrapper />
      </body>
    </html>
  )
}
