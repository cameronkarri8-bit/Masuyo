// Server only. These functions read the filesystem, so importing this module
// into a client component is a build error rather than a runtime surprise.
import 'server-only'

import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface BlogFaqItem {
  question: string
  answer: string
}

export interface BlogPost {
  title: string
  /** Always derived from the filename, never from frontmatter. */
  slug: string
  metaTitle: string
  metaDescription: string
  excerpt: string
  primaryKeyword: string
  secondaryKeywords: string[]
  category: string
  /** For example "9 minute read". Calculated when absent from frontmatter. */
  readingTime: string
  author: string
  publishedAt: string
  updatedAt?: string
  /** Optional per post override. Phase 4 generates a card from the title. */
  ogImage?: string
  /** Optional per post override, paired with ogImage. */
  ogImageAlt?: string
  featured?: boolean
  faq?: BlogFaqItem[]
  content: string
}

/** The same shape without the body, for index and listing views. */
export type BlogPostMeta = Omit<BlogPost, 'content'>

/* -------------------------------------------------------------------------- */
/* Internals                                                                  */
/* -------------------------------------------------------------------------- */

const POSTS_DIR = path.join(process.cwd(), 'content', 'blog')

/** Frontmatter keys that a post cannot render without. */
const REQUIRED_STRING_FIELDS = [
  'title',
  'metaTitle',
  'metaDescription',
  'excerpt',
  'primaryKeyword',
  'category',
  'author',
  'publishedAt',
] as const

type RequiredStringField = (typeof REQUIRED_STRING_FIELDS)[number]

function isString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(item => typeof item === 'string')
}

function isFaqArray(value: unknown): value is BlogFaqItem[] {
  return (
    Array.isArray(value) &&
    value.every(
      item =>
        typeof item === 'object' &&
        item !== null &&
        isString((item as Record<string, unknown>).question) &&
        isString((item as Record<string, unknown>).answer)
    )
  )
}

/** "9 minute read", rounded up so a short post never reads as zero minutes. */
function formatReadingTime(content: string): string {
  const minutes = Math.max(1, Math.round(readingTime(content).minutes))
  return `${minutes} minute read`
}

/**
 * Parse one MDX file into a post.
 *
 * Returns null and logs a warning if a required field is missing, so one bad
 * file cannot take the whole build down.
 */
function parsePostFile(fileName: string): BlogPost | null {
  const slug = fileName.replace(/\.mdx$/, '')
  const filePath = path.join(POSTS_DIR, fileName)

  let raw: string
  try {
    raw = fs.readFileSync(filePath, 'utf8')
  } catch (error) {
    console.warn(`[blog] Could not read ${fileName}, skipping.`, error)
    return null
  }

  const parsed = matter(raw)
  const data: Record<string, unknown> = parsed.data
  const content = parsed.content

  // Required strings.
  const missing: RequiredStringField[] = []
  for (let i = 0; i < REQUIRED_STRING_FIELDS.length; i += 1) {
    const field = REQUIRED_STRING_FIELDS[i]
    if (!isString(data[field])) missing.push(field)
  }
  if (missing.length > 0) {
    console.warn(
      `[blog] Skipping ${fileName}: missing or empty frontmatter field(s): ${missing.join(', ')}`
    )
    return null
  }

  if (!isStringArray(data.secondaryKeywords)) {
    console.warn(`[blog] Skipping ${fileName}: secondaryKeywords must be an array of strings.`)
    return null
  }

  // Reading the required fields back through the guard keeps the types honest
  // without a non-null assertion or a cast to any.
  const readString = (field: RequiredStringField): string => {
    const value = data[field]
    return isString(value) ? value : ''
  }

  const post: BlogPost = {
    title: readString('title'),
    slug,
    metaTitle: readString('metaTitle'),
    metaDescription: readString('metaDescription'),
    excerpt: readString('excerpt'),
    primaryKeyword: readString('primaryKeyword'),
    secondaryKeywords: data.secondaryKeywords,
    category: readString('category'),
    readingTime: isString(data.readingTime) ? data.readingTime : formatReadingTime(content),
    author: readString('author'),
    publishedAt: readString('publishedAt'),
    content,
  }

  if (isString(data.updatedAt)) post.updatedAt = data.updatedAt
  if (isString(data.ogImage)) post.ogImage = data.ogImage
  if (isString(data.ogImageAlt)) post.ogImageAlt = data.ogImageAlt
  if (typeof data.featured === 'boolean') post.featured = data.featured
  if (isFaqArray(data.faq)) post.faq = data.faq

  return post
}

/** Every .mdx filename in content/blog. Empty if the directory is absent. */
function listPostFiles(): string[] {
  try {
    if (!fs.existsSync(POSTS_DIR)) return []
    return fs.readdirSync(POSTS_DIR).filter(name => name.endsWith('.mdx'))
  } catch (error) {
    console.warn('[blog] Could not read content/blog, treating it as empty.', error)
    return []
  }
}

/** Newest first. Falls back to string order when a date will not parse. */
function byPublishedAtDescending(a: BlogPostMeta, b: BlogPostMeta): number {
  const left = Date.parse(a.publishedAt)
  const right = Date.parse(b.publishedAt)
  if (Number.isNaN(left) || Number.isNaN(right)) {
    return b.publishedAt.localeCompare(a.publishedAt)
  }
  return right - left
}

function stripContent(post: BlogPost): BlogPostMeta {
  const { content: _content, ...meta } = post
  return meta
}

/** Read and parse every valid post once per call. */
function readAllPosts(): BlogPost[] {
  const files = listPostFiles()
  const posts: BlogPost[] = []
  for (let i = 0; i < files.length; i += 1) {
    const post = parsePostFile(files[i])
    if (post !== null) posts.push(post)
  }
  return posts
}

/* -------------------------------------------------------------------------- */
/* Public API                                                                 */
/* -------------------------------------------------------------------------- */

/** All posts, newest first, without their body content. */
export function getAllPosts(): BlogPostMeta[] {
  return readAllPosts().map(stripContent).sort(byPublishedAtDescending)
}

/** One post including its body, or null if the slug does not resolve. */
export function getPostBySlug(slug: string): BlogPost | null {
  const files = listPostFiles()
  const match = `${slug}.mdx`
  if (files.indexOf(match) === -1) return null
  return parsePostFile(match)
}

/** Slugs for static generation. */
export function getAllPostSlugs(): string[] {
  return getAllPosts().map(post => post.slug)
}

/**
 * Posts in the same category, newest first, excluding the current one.
 *
 * Tops up with the most recent other posts when the category does not have
 * enough, so the related section is never half empty.
 */
export function getRelatedPosts(slug: string, limit: number): BlogPostMeta[] {
  if (limit <= 0) return []

  const all = getAllPosts()
  const current = all.find(post => post.slug === slug)
  const others = all.filter(post => post.slug !== slug)

  const sameCategory =
    current === undefined
      ? []
      : others.filter(post => post.category === current.category)

  if (sameCategory.length >= limit) return sameCategory.slice(0, limit)

  const chosen = sameCategory.slice()
  for (let i = 0; i < others.length && chosen.length < limit; i += 1) {
    const candidate = others[i]
    if (chosen.indexOf(candidate) === -1) chosen.push(candidate)
  }
  return chosen
}
