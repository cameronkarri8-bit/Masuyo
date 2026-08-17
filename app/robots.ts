import type { MetadataRoute } from 'next'
import { PROPOSAL_ROUTES } from '@/lib/proposals'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [...PROPOSAL_ROUTES],
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://masuyodigital.com'}/sitemap.xml`,
  }
}
