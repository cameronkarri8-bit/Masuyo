// Server only. These functions read the filesystem, so importing this module
// into a client component is a build error rather than a runtime surprise.
import 'server-only'

import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface GuideFaqItem {
  question: string
  answer: string
}

/**
 * The clusters the hub groups by.
 *
 * Only clusters with content are rendered, so adding one here without adding a
 * guide changes nothing on the page.
 */
export const GUIDE_CLUSTERS = ['websites', 'software', 'seo', 'sectors'] as const

export type GuideCluster = (typeof GUIDE_CLUSTERS)[number]

export const GUIDE_CLUSTER_LABELS: Record<GuideCluster, string> = {
  websites: 'Websites and web design',
  software: 'Software and automation',
  seo: 'SEO and content',
  sectors: 'Sector guides',
}

export interface Guide {
  title: string
  description: string
  slug: string
  cluster: GuideCluster
  date: string
  updated: string
  author: string
  /** Minutes, as authored in frontmatter. */
  readingTime: number
  featured: boolean
  faqs: GuideFaqItem[]
  content: string
}

export type GuideMeta = Omit<Guide, 'content'>

/* -------------------------------------------------------------------------- */
/* Parsing                                                                    */
/* -------------------------------------------------------------------------- */

const GUIDES_DIR = path.join(process.cwd(), 'content', 'guides')

function isString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function isCluster(value: unknown): value is GuideCluster {
  return isString(value) && (GUIDE_CLUSTERS as readonly string[]).includes(value)
}

function isFaqArray(value: unknown): value is GuideFaqItem[] {
  return (
    Array.isArray(value) &&
    value.every(
      item =>
        typeof item === 'object' &&
        item !== null &&
        isString((item as GuideFaqItem).question) &&
        isString((item as GuideFaqItem).answer)
    )
  )
}

/**
 * Parse one file, or return null if a required field is missing or malformed.
 *
 * A bad file is skipped with a warning rather than failing the build, so one
 * broken guide cannot take the whole hub down. The warning is what surfaces it.
 */
function parseGuideFile(fileName: string): Guide | null {
  const fullPath = path.join(GUIDES_DIR, fileName)

  let raw: string
  try {
    raw = fs.readFileSync(fullPath, 'utf8')
  } catch (error) {
    console.warn(`[guides] Could not read ${fileName}.`, error)
    return null
  }

  const { data, content } = matter(raw)

  const required = ['title', 'description', 'slug', 'date', 'updated', 'author']
  for (const field of required) {
    if (!isString(data[field])) {
      console.warn(`[guides] ${fileName} is missing a valid "${field}". Skipped.`)
      return null
    }
  }

  if (!isCluster(data.cluster)) {
    console.warn(
      `[guides] ${fileName} has cluster "${String(data.cluster)}", which is not one of ` +
        `${GUIDE_CLUSTERS.join(', ')}. Skipped.`
    )
    return null
  }

  // Authored as a number of minutes rather than computed, so an editor can
  // override it. Anything unparseable falls back to 0 and simply renders no
  // reading time rather than a wrong one.
  const minutes =
    typeof data.readingTime === 'number' && Number.isFinite(data.readingTime)
      ? data.readingTime
      : 0

  return {
    title: data.title as string,
    description: data.description as string,
    slug: data.slug as string,
    cluster: data.cluster,
    date: data.date as string,
    updated: data.updated as string,
    author: data.author as string,
    readingTime: minutes,
    featured: data.featured === true,
    faqs: isFaqArray(data.faqs) ? data.faqs : [],
    content,
  }
}

/** Every .mdx filename in content/guides. Empty if the directory is absent. */
function listGuideFiles(): string[] {
  try {
    if (!fs.existsSync(GUIDES_DIR)) return []
    return fs.readdirSync(GUIDES_DIR).filter(name => name.endsWith('.mdx'))
  } catch (error) {
    console.warn('[guides] Could not read content/guides, treating it as empty.', error)
    return []
  }
}

/** Featured first, then newest by updated date. */
function byFeaturedThenUpdated(a: GuideMeta, b: GuideMeta): number {
  if (a.featured !== b.featured) return a.featured ? -1 : 1
  const left = Date.parse(a.updated)
  const right = Date.parse(b.updated)
  if (Number.isNaN(left) || Number.isNaN(right)) {
    return b.updated.localeCompare(a.updated)
  }
  return right - left
}

function stripContent(guide: Guide): GuideMeta {
  const { content: _content, ...meta } = guide
  return meta
}

function readAllGuides(): Guide[] {
  const files = listGuideFiles()
  const guides: Guide[] = []
  for (let i = 0; i < files.length; i += 1) {
    const guide = parseGuideFile(files[i])
    if (guide !== null) guides.push(guide)
  }
  return guides
}

/* -------------------------------------------------------------------------- */
/* Public API                                                                 */
/* -------------------------------------------------------------------------- */

/** All guides, featured first then newest, without their body content. */
export function getAllGuides(): GuideMeta[] {
  return readAllGuides().map(stripContent).sort(byFeaturedThenUpdated)
}

/** One guide including its body, or null if the slug does not resolve. */
export function getGuideBySlug(slug: string): Guide | null {
  const guides = readAllGuides()
  return guides.find(guide => guide.slug === slug) ?? null
}

/** Guides in one cluster, featured first then newest. */
export function getGuidesByCluster(cluster: GuideCluster): GuideMeta[] {
  return getAllGuides().filter(guide => guide.cluster === cluster)
}

/** Slugs for static generation. */
export function getAllGuideSlugs(): string[] {
  return getAllGuides().map(guide => guide.slug)
}
