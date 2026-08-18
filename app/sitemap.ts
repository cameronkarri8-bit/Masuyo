import type { MetadataRoute } from 'next'
import { industries } from '@/lib/industries-data'
import { getAllPosts } from '@/lib/blog'
import { getAllGuides } from '@/lib/guides'

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://masuyodigital.com'

/**
 * Static public routes.
 *
 * Kept explicit rather than derived from the filesystem so that adding a page
 * is a deliberate decision to have it indexed. Anything intentionally excluded
 * is listed at the bottom of this file with the reason.
 */
const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },

  // Core commercial pages.
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/pricing', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/start-a-project', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/get-a-website', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },

  // Services.
  { path: '/services/web-design', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/digital-marketing', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/technology-solutions', priority: 0.8, changeFrequency: 'monthly' },

  // Technology.
  { path: '/technology', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/technology/web-development', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/technology/web-applications', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/technology/app-development', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/technology/ecommerce', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/technology/automation', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/technology/ai-chatbots', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/technology/crm', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/technology/database', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/technology/api', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/technology/architecture', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/technology/devops', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/technology/hosting', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/technology/community-platforms', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/technology/gdpr-compliance', priority: 0.7, changeFrequency: 'monthly' },

  // Marketing.
  { path: '/marketing', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/marketing/seo', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/marketing/content', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/marketing/paid-ads', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/marketing/social', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/marketing/email-automation', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/marketing/lead-generation', priority: 0.7, changeFrequency: 'monthly' },

  // Products.
  { path: '/products/bespoke', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/products/client-portal', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/products/community-platform', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/products/crm-lead-management', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/products/custom-learning-platform', priority: 0.6, changeFrequency: 'monthly' },

  // Local landing pages. Out of the main navigation, linked from the footer,
  // and deliberately indexable.
  { path: '/web-design-preston', priority: 0.8, changeFrequency: 'monthly' },

  // Sector landing pages.
  { path: '/industries', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/industries/community-interest-companies', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/lifestyle-venues', priority: 0.6, changeFrequency: 'monthly' },

  // Content and reference.
  { path: '/blog', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/guides', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/blog/tech-solutions-for-small-businesses', priority: 0.6, changeFrequency: 'yearly' },
  { path: '/resources', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/faq', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/glossary', priority: 0.6, changeFrequency: 'monthly' },

  // Legal.
  { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
]

/**
 * Resource guide slugs.
 *
 * Mirrors the list in app/resources/[slug]/page.tsx, which is not exported from
 * a page module. TODO: lift that array into lib/ so there is one source.
 */
const RESOURCE_SLUGS = [
  'uk-business-launch-checklist',
  'choosing-business-structure',
  'seo-quick-start-checklist',
  'social-media-content-calendar',
  'cash-flow-forecast-template',
  'tech-stack-guide',
  'website-brief-template',
  'website-legal-pages-checklist',
  'business-growth-template',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    ...STATIC_ROUTES.map(r => ({
      url: `${BASE}${r.path}`,
      lastModified,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),

    ...industries.map(i => ({
      url: `${BASE}/industries/${i.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),

    ...RESOURCE_SLUGS.map(slug => ({
      url: `${BASE}/resources/${slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),

    // MDX blog posts. lastModified prefers updatedAt, falling back to the
    // publish date. The hardcoded /blog/tech-solutions-for-small-businesses
    // stays in STATIC_ROUTES above, since it is not part of this content layer.
    // Guides. lastModified is the `updated` frontmatter field.
    ...getAllGuides().map(guide => ({
      url: `${BASE}/guides/${guide.slug}`,
      lastModified: new Date(guide.updated),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),

    ...getAllPosts().map(post => ({
      url: `${BASE}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}

/*
  Deliberately excluded:

  - Every route in PROPOSAL_ROUTES (lib/proposals.ts), currently
    /diogenes-proposal and /northcote-proposal. All are password gated, set
    noindex and nofollow in their own metadata, and are disallowed in
    robots.ts from the same list. They must never be added here.
  Blog posts are no longer excluded. They come from MDX in content/blog and
  are enumerated above. The one hardcoded post at
  /blog/tech-solutions-for-small-businesses is still listed in STATIC_ROUTES,
  because it is a standalone route rather than part of the content layer.
*/
