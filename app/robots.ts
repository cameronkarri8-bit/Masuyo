import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/diogenes-proposal',
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://masuyodigital.com'}/sitemap.xml`,
  }
}
