import drivingInstructors from '@/content/industries/driving-instructors'
import { citations } from './text'
import type { Industry, IndustryEntry } from './types'

/**
 * Every industry landing page. Add a data file in content/industries and list
 * it here; the route, the hub, the sitemap and the footer pick it up.
 *
 * The entries are checked when this module loads, which happens during the
 * build, so a page with a broken source marker, an unknown price, a long dash
 * or a banned phrase fails the build instead of shipping.
 */
export const INDUSTRIES: IndustryEntry[] = [drivingInstructors]

const BANNED: { pattern: RegExp; reason: string }[] = [
  { pattern: /[\u2013\u2014]/, reason: 'a long dash (en or em)' },
  { pattern: /plain\s+english/i, reason: 'a phrase the brand bans' },
]

/** Every string in an entry, with a path for the error message. */
function strings(value: unknown, path: string): [string, string][] {
  if (typeof value === 'string') return [[path, value]]
  if (Array.isArray(value)) return value.flatMap((v, i) => strings(v, `${path}[${i}]`))
  if (value && typeof value === 'object') return Object.entries(value).flatMap(([k, v]) => strings(v, `${path}.${k}`))
  return []
}

/** Copy strings: everything except source details and the slug. */
function copyStrings(entry: Industry): [string, string][] {
  const { sources: _s, slug: _sl, relatedResources: _r, siblingIndustries: _si, ...copy } = entry
  return strings(copy, entry.slug)
}

export function checkIndustry(entry: IndustryEntry): string[] {
  const problems: string[] = []
  for (const [path, text] of strings(entry, entry.slug)) {
    for (const { pattern, reason } of BANNED) if (pattern.test(text)) problems.push(`${path} contains ${reason}`)
  }
  if (entry.status !== 'published') return problems

  const numbers = new Set(entry.sources.map(s => s.n))
  for (const [path, text] of copyStrings(entry)) {
    try {
      for (const n of citations(text)) if (!numbers.has(n)) problems.push(`${path} cites [${n}], which is not in sources`)
    } catch (e) {
      problems.push(`${path}: ${(e as Error).message}`)
    }
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(entry.updatedDate)) problems.push(`${entry.slug}.updatedDate is not YYYY-MM-DD`)
  const titles = [entry.answerBlock.heading, ...entry.sections.map(s => s.heading)]
  for (const t of titles) if (!/[.?]$/.test(t)) problems.push(`Section title "${t}" should end with a full stop`)
  return problems
}

const seen = new Set<string>()
for (const entry of INDUSTRIES) {
  if (seen.has(entry.slug)) throw new Error(`Industry slug "${entry.slug}" is used twice`)
  seen.add(entry.slug)
  const problems = checkIndustry(entry)
  if (problems.length) throw new Error(`Industry "${entry.slug}" has problems:\n- ${problems.join('\n- ')}`)
}

export function getPublishedIndustries(): Industry[] {
  return INDUSTRIES.filter((e): e is Industry => e.status === 'published')
}

export function getIndustry(slug: string): Industry | null {
  return getPublishedIndustries().find(i => i.slug === slug) ?? null
}

export function industryPath(slug: string) {
  return `/industries/${slug}`
}

/** The hub's place in every breadcrumb trail. */
export const HUB_CRUMBS = [
  { name: 'Home', href: '/' },
  { name: 'Industries', href: '/industries' },
]

/** The trail shown on an industry page and given to BreadcrumbList. */
export function industryCrumbs(industry: Industry) {
  return [...HUB_CRUMBS, { name: industry.breadcrumb, href: industryPath(industry.slug) }]
}
