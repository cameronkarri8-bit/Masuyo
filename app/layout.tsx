import type { Metadata, Viewport } from 'next'
import { Albert_Sans } from 'next/font/google'
import './globals.css'
import NavWrapper from '@/components/NavWrapper'
import FooterWrapper from '@/components/FooterWrapper'
import AnalyticsWrapper from '@/components/AnalyticsWrapper'
import { SITE } from '@/lib/site'

/*
  Albert Sans for everything, as the brand guide specifies. next/font downloads
  it at build time and serves it from this domain, so there is no request to
  Google from a visitor's browser and no layout shift while it loads.
*/
const albert = Albert_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-albert',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Masuyo | Websites, systems and automation for growing businesses',
    // Every page sets its full title from the copy spec, so no suffix here.
    template: '%s',
  },
  description:
    'We build the websites, custom systems and automation that growing UK businesses run on. Designed, built and looked after by one senior engineer.',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: SITE.url,
    siteName: 'Masuyo',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export const viewport: Viewport = {
  themeColor: '#0F3B4F',
}

/*
  Sitewide Organization schema, once, in the root layout.

  sameAs lists only profiles that exist. An empty list is better than a dead
  link, which would weaken the entity rather than strengthen it.
*/
const ORGANIZATION = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.legalName,
  alternateName: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/brand/masuyo-monogram-petrol-512.png`,
  description: SITE.positioning,
  slogan: SITE.tagline,
  email: SITE.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Leyland',
    addressRegion: 'Lancashire',
    addressCountry: 'GB',
  },
  areaServed: ['Lancashire', 'North West England', 'United Kingdom'],
  sameAs: [] as string[],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={albert.variable}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION) }}
        />
        <NavWrapper />
        <main id="main">{children}</main>
        <FooterWrapper />
        <AnalyticsWrapper />
      </body>
    </html>
  )
}
