import type { Metadata } from 'next'
import { SITE } from './site'

/**
 * Page metadata from the copy spec: the full title, the description, a
 * canonical URL and matching Open Graph fields. The share image comes from
 * app/opengraph-image.png unless a route provides its own.
 */
export function pageMetadata({
  title,
  description,
  path,
  noindex = false,
}: {
  title: string
  description: string
  path: string
  noindex?: boolean
}): Metadata {
  const url = `${SITE.url}${path === '/' ? '' : path}`
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: SITE.name, locale: 'en_GB', type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
    ...(noindex
      ? { robots: { index: false, follow: false, googleBot: { index: false, follow: false } } }
      : {}),
  }
}
