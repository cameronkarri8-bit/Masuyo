// Server only: these functions read the filesystem.
import 'server-only'

import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import GithubSlugger from 'github-slugger'

/**
 * Resources: one searchable hub for guides and articles, replacing the old
 * blog, guides, glossary and FAQ sections.
 *
 * Each article is an .mdx file in content/resources with one frontmatter
 * shape. The categories are the hub's chips, in the copy spec's order.
 */

export const CATEGORIES = [
  'Websites',
  'Systems and CRM',
  'Automation and AI',
  'Costs and planning',
  'Care and security',
  'Guides by sector',
] as const

export type Category = (typeof CATEGORIES)[number]

export interface ResourceFaq {
  question: string
  answer: string
}

export interface Heading {
  id: string
  text: string
}

export interface Resource {
  title: string
  description: string
  slug: string
  category: Category
  date: string
  updated: string
  readingTime: number
  featured: boolean
  shortAnswer: string
  faqs: ResourceFaq[]
  headings: Heading[]
  content: string
}

export type ResourceMeta = Omit<Resource, 'content' | 'headings' | 'faqs'>

export const AUTHOR = { name: 'Cameron Karri', role: 'Founder, Masuyo' } as const

const DIR = path.join(process.cwd(), 'content', 'resources')

function isText(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0
}

function isCategory(v: unknown): v is Category {
  return isText(v) && (CATEGORIES as readonly string[]).includes(v)
}

/** The H2s, with the same ids rehype-slug gives them, for the contents list. */
function headingsOf(content: string): Heading[] {
  const slugger = new GithubSlugger()
  return content
    .split('\n')
    .filter(line => /^## /.test(line))
    .map(line => {
      const text = line.replace(/^## /, '').replace(/[*_`]/g, '').trim()
      return { id: slugger.slug(text), text }
    })
}

function parse(file: string): Resource | null {
  const raw = fs.readFileSync(path.join(DIR, file), 'utf8')
  const { data, content } = matter(raw)
  for (const field of ['title', 'description', 'slug', 'date', 'updated', 'shortAnswer']) {
    if (!isText(data[field])) {
      console.warn(`[resources] ${file} has no valid "${field}". Skipped.`)
      return null
    }
  }
  if (!isCategory(data.category)) {
    console.warn(`[resources] ${file} has category "${String(data.category)}", not one of ${CATEGORIES.join(', ')}. Skipped.`)
    return null
  }
  const faqs = Array.isArray(data.faqs)
    ? (data.faqs as ResourceFaq[]).filter(f => isText(f?.question) && isText(f?.answer))
    : []
  return {
    title: data.title,
    description: data.description,
    slug: data.slug,
    category: data.category,
    date: data.date,
    updated: data.updated,
    readingTime: typeof data.readingTime === 'number' ? data.readingTime : 0,
    featured: data.featured === true,
    shortAnswer: data.shortAnswer,
    faqs,
    headings: headingsOf(content),
    content,
  }
}

function readAll(): Resource[] {
  if (!fs.existsSync(DIR)) return []
  return fs
    .readdirSync(DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(parse)
    .filter((r): r is Resource => r !== null)
}

const byNewest = (a: ResourceMeta, b: ResourceMeta) => Date.parse(b.updated) - Date.parse(a.updated) || a.title.localeCompare(b.title)

function meta(r: Resource): ResourceMeta {
  return {
    title: r.title,
    description: r.description,
    slug: r.slug,
    category: r.category,
    date: r.date,
    updated: r.updated,
    readingTime: r.readingTime,
    featured: r.featured,
    shortAnswer: r.shortAnswer,
  }
}

/** Every article, newest first, without bodies. */
export function getAllResources(): ResourceMeta[] {
  return readAll().map(meta).sort(byNewest)
}

export function getResource(slug: string): Resource | null {
  return readAll().find(r => r.slug === slug) ?? null
}

export function getResourceSlugs(): string[] {
  return readAll().map(r => r.slug)
}

/** Three cards for "Related reading": the same category first, then the newest. */
export function getRelated(slug: string, count = 3): ResourceMeta[] {
  const all = getAllResources()
  const self = all.find(r => r.slug === slug)
  const others = all.filter(r => r.slug !== slug)
  const same = others.filter(r => r.category === self?.category)
  const rest = others.filter(r => r.category !== self?.category)
  return [...same, ...rest].slice(0, count)
}

/** A long date in British English: "18 August 2026". */
export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
}
