// Server only: reads the feature files from disk.
import 'server-only'

import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { MADE_IN_LANCASHIRE_PUBLIC, MIL_PATH } from './config'

/**
 * Made in Lancashire features.
 *
 * One Markdown file per feature in content/made-in-lancashire, with these
 * front matter fields. The names match what MasCRM will hold, so features
 * can later come from the CRM instead of files without changing the pages.
 */
export interface Feature {
  slug: string
  business_name: string
  town: string
  category: string
  /** ISO date, YYYY-MM-DD. */
  featured_on: string
  /** One sentence, written to follow "featured for". */
  hook: string
  /** Two short paragraphs. */
  story: string[]
  in_their_words: string
  address: string
  map_url: string
  opening_hours?: string
  website: string
  instagram_handle: string
  instagram_post_url: string
  photo: string
  logo: string
  /** Optional 9:16 mp4. */
  video?: string
  video_poster?: string
  placeholder: boolean
}

const DIR = path.join(process.cwd(), 'content', 'made-in-lancashire')
const REQUIRED = ['slug', 'business_name', 'town', 'category', 'featured_on', 'hook', 'story', 'in_their_words', 'address', 'map_url', 'website', 'instagram_handle', 'instagram_post_url', 'photo', 'logo'] as const

const text = (v: unknown) => (typeof v === 'string' ? v.trim() : v instanceof Date ? v.toISOString().slice(0, 10) : '')
const optional = (v: unknown) => text(v) || undefined

function parse(file: string): Feature {
  const { data } = matter(fs.readFileSync(path.join(DIR, file), 'utf8'))
  for (const key of REQUIRED) {
    if (!text(data[key])) throw new Error(`[made-in-lancashire] ${file} has no "${key}"`)
  }
  const featuredOn = text(data.featured_on)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(featuredOn)) throw new Error(`[made-in-lancashire] ${file}: featured_on must be YYYY-MM-DD`)
  if (typeof data.placeholder !== 'boolean') throw new Error(`[made-in-lancashire] ${file}: placeholder must be true or false`)
  return {
    slug: text(data.slug),
    business_name: text(data.business_name),
    town: text(data.town),
    category: text(data.category),
    featured_on: featuredOn,
    hook: text(data.hook),
    story: text(data.story).split(/\n\s*\n/).map(p => p.replace(/\s+/g, ' ').trim()).filter(Boolean),
    in_their_words: text(data.in_their_words),
    address: text(data.address),
    map_url: text(data.map_url),
    opening_hours: optional(data.opening_hours),
    website: text(data.website),
    instagram_handle: text(data.instagram_handle).replace(/^@/, ''),
    instagram_post_url: text(data.instagram_post_url),
    photo: text(data.photo),
    logo: text(data.logo),
    video: optional(data.video),
    video_poster: optional(data.video_poster),
    placeholder: data.placeholder,
  }
}

function readAll(): Feature[] {
  if (!fs.existsSync(DIR)) return []
  return fs
    .readdirSync(DIR)
    .filter(f => f.endsWith('.md') && f !== 'README.md')
    .map(parse)
    .sort((a, b) => b.featured_on.localeCompare(a.featured_on) || a.business_name.localeCompare(b.business_name))
}

/** Every feature to show, newest first. Placeholders are hidden once the section is public. */
export function getFeatures(): Feature[] {
  return readAll().filter(f => !(MADE_IN_LANCASHIRE_PUBLIC && f.placeholder))
}

export function getFeature(slug: string): Feature | null {
  return getFeatures().find(f => f.slug === slug) ?? null
}

/** The older and newer features either side of this one. */
export function neighbours(slug: string): { older: Feature | null; newer: Feature | null } {
  const all = getFeatures()
  const i = all.findIndex(f => f.slug === slug)
  return { newer: i > 0 ? all[i - 1] : null, older: i >= 0 && i < all.length - 1 ? all[i + 1] : null }
}

export const featurePath = (slug: string) => `${MIL_PATH}/${slug}`

/** "October 2026". */
export function monthYear(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' })
}

/** The Instagram profile link. Placeholders never link to a real account. */
export function instagramUrl(f: Feature): string {
  return f.placeholder ? 'https://example.com/' : `https://www.instagram.com/${f.instagram_handle}/`
}

/** The plain factual sentence that opens a feature page. */
export function openingLine(f: Feature): string {
  return `${f.business_name} is an independent ${f.category.toLowerCase()} in ${f.town}, featured in ${monthYear(f.featured_on)} for ${f.hook}.`
}

/** The hook as a stand-alone sentence for cards. */
export function hookSentence(f: Feature): string {
  return `${f.hook.charAt(0).toUpperCase()}${f.hook.slice(1)}.`
}
