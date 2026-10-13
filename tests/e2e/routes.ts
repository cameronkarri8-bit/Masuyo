import fs from 'node:fs'
import path from 'node:path'

/**
 * Published industry landing pages, read from their data files the same way
 * next.config.js does, so the suites cover each page as soon as it goes live.
 */
const INDUSTRIES_DIR = path.join(__dirname, '..', '..', 'content', 'industries')
export const INDUSTRY_PAGES: string[] = fs.existsSync(INDUSTRIES_DIR)
  ? fs
      .readdirSync(INDUSTRIES_DIR)
      .filter(f => f.endsWith('.ts'))
      .map(f => fs.readFileSync(path.join(INDUSTRIES_DIR, f), 'utf8'))
      .filter(src => /status:\s*'published'/.test(src))
      .map(src => `/industries/${/slug:\s*'([^']+)'/.exec(src)![1]}`)
  : []

/** Made in Lancashire: the hub and every feature file in content/made-in-lancashire. */
const MIL_DIR = path.join(__dirname, '..', '..', 'content', 'made-in-lancashire')
export const MIL_FEATURES: string[] = fs.existsSync(MIL_DIR)
  ? fs.readdirSync(MIL_DIR).filter(f => f.endsWith('.md')).map(f => f.replace(/\.md$/, ''))
  : []
export const MIL_PAGES: string[] = ['/made-in-lancashire', ...MIL_FEATURES.map(s => `/made-in-lancashire/${s}`)]

/** Every page of the new site, for the route, content and accessibility suites. */
export const PAGES = [
  '/',
  '/websites',
  '/systems',
  '/care',
  '/work',
  '/approach',
  '/pricing',
  '/start',
  '/resources',
  '/resources?category=glossary',
  '/resources/how-to-brief-a-web-design-agency',
  '/resources/more-enquiries-from-your-website',
  '/resources/nextjs-vs-wordpress',
  '/resources/small-business-website-checklist',
  '/resources/tech-solutions-for-small-businesses',
  '/resources/website-care-plans',
  '/resources/website-cost-uk',
  '/resources/website-design-for-cics',
  '/resources/what-is-virtual-marketing',
  '/web-design-preston',
  '/trades',
  '/repair-and-retail',
  '/clinics',
  '/professional-services',
  '/brand',
  '/privacy-policy',
  '/terms',
  '/industries/community-interest-companies',
  '/lifestyle-venues',
  '/work/frozen-computers',
  ...(INDUSTRY_PAGES.length > 0 ? ['/industries', ...INDUSTRY_PAGES] : []),
  ...MIL_PAGES,
]
