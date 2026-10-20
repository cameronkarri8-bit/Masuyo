import type { MetadataRoute } from 'next'
import { getPublishedIndustries, industryPath } from '@/lib/industries'
import { featurePath, getFeatures } from '@/lib/made-in-lancashire'
import { getMembers, memberPath, REVALIDATE } from '@/lib/made-in-lancashire/directory'
import { DIRECTORY_PATH, MADE_IN_LANCASHIRE_PUBLIC, MIL_PATH } from '@/lib/made-in-lancashire/config'
import { getAllResources } from '@/lib/resources'
import { SITE } from '@/lib/site'
import { WORK } from '@/lib/work'

/**
 * The sitemap: the redesigned site's public pages, every Resources article and
 * every published case study.
 *
 * Kept explicit rather than read from the filesystem, so a page is indexed by
 * decision rather than by accident. Deliberately left out:
 *
 * - The proposal routes (/diogenes-proposal, /northcote-proposal). Password
 *   gated, noindex, and disallowed in robots.ts.
 * - The design concept at /frozen-computers. noindex in its own metadata, so
 *   it never competes with the real business.
 * - Unpublished case studies (published: false in lib/work.ts). Reachable for
 *   review, noindex, and not linked anywhere.
 * Industry landing pages and their hub take lastModified from the updatedDate
 * in the data files.
 *
 * - Made in Lancashire, while its preview switch (MADE_IN_LANCASHIRE_PUBLIC)
 *   is off. Once on, the hub and every real feature are listed, and the
 *   directory and its published members join as soon as there is at least
 *   one. The directory is read every few minutes (revalidate below), so a
 *   member published or unpublished in MasCRM is added or dropped without a
 *   rebuild.
 * - /industries/community-interest-companies and /lifestyle-venues. Kept and
 *   restyled, but taken out of the navigation pending a decision on them, so
 *   they are not promoted here either.
 */

const PAGES: { path: string; priority: number }[] = [
  { path: '/', priority: 1 },
  { path: '/websites', priority: 0.9 },
  { path: '/systems', priority: 0.9 },
  { path: '/care', priority: 0.9 },
  { path: '/pricing', priority: 0.9 },
  { path: '/start', priority: 0.9 },
  // The free website check. Its reports (/check/report/...) are private and never listed.
  { path: '/check', priority: 0.8 },
  { path: '/work', priority: 0.7 },
  { path: '/about', priority: 0.7 },
  { path: '/resources', priority: 0.8 },
  { path: '/web-design-preston', priority: 0.8 },
  { path: '/trades', priority: 0.8 },
  { path: '/repair-and-retail', priority: 0.8 },
  { path: '/clinics', priority: 0.8 },
  { path: '/professional-services', priority: 0.8 },
  { path: '/brand', priority: 0.4 },
  { path: '/privacy-policy', priority: 0.2 },
  { path: '/terms', priority: 0.2 },
]

export const revalidate = REVALIDATE

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const industries = getPublishedIndustries()
  const members = MADE_IN_LANCASHIRE_PUBLIC ? await getMembers() : []
  return [
    ...PAGES.map(p => ({
      url: `${SITE.url}${p.path === '/' ? '' : p.path}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: p.priority,
    })),
    ...getAllResources().map(r => ({
      url: `${SITE.url}/resources/${r.slug}`,
      lastModified: new Date(`${r.updated}T12:00:00Z`),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    // The hub changes when an industry page does, so it takes the newest updatedDate.
    ...(industries.length > 0
      ? [
          {
            url: `${SITE.url}/industries`,
            lastModified: new Date(`${industries.map(i => i.updatedDate).sort().at(-1)}T12:00:00Z`),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
          },
        ]
      : []),
    ...industries.map(i => ({
      url: `${SITE.url}${industryPath(i.slug)}`,
      lastModified: new Date(`${i.updatedDate}T12:00:00Z`),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...(MADE_IN_LANCASHIRE_PUBLIC
      ? [
          { url: `${SITE.url}${MIL_PATH}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 },
          ...getFeatures().map(f => ({
            url: `${SITE.url}${featurePath(f.slug)}`,
            lastModified: new Date(`${f.featured_on}T12:00:00Z`),
            changeFrequency: 'yearly' as const,
            priority: 0.5,
          })),
          ...(members.length > 0
            ? [{ url: `${SITE.url}${DIRECTORY_PATH}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 }]
            : []),
          ...members.map(m => ({
            url: `${SITE.url}${memberPath(m.directory_slug)}`,
            lastModified: new Date(m.updated_at),
            changeFrequency: 'monthly' as const,
            priority: 0.5,
          })),
        ]
      : []),
    ...WORK.filter(w => w.published && w.caseStudy).map(w => ({
      url: `${SITE.url}/work/${w.slug}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ]
}
