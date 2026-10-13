// Server only: reads the directory from Supabase.
import 'server-only'

import fs from 'node:fs'
import path from 'node:path'
import { DIRECTORY_PATH, SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from './config'

/**
 * The Made in Lancashire directory: published members, read from the
 * directory_members view in the MasCRM Supabase project.
 *
 * Pages read it when they are built and refresh it every few minutes after
 * that (see REVALIDATE), so publishing a member in MasCRM reaches the site
 * without a rebuild. If Supabase cannot be reached the directory simply shows
 * no members rather than failing the build.
 *
 * MIL_DIRECTORY_FIXTURE, set only by the test run, points at a JSON file of
 * sample members so the member page can be tested without the network.
 */

export const REVALIDATE = 300

export interface Member {
  directory_slug: string
  business_name: string
  town: string
  category: string
  one_line: string
  directory_blurb: string
  directory_website: string | null
  directory_instagram: string | null
  directory_facebook: string | null
  directory_tiktok: string | null
  directory_linkedin: string | null
  directory_google_business: string | null
  directory_hours: string | null
  directory_address: string | null
  photo_urls: string[]
  approved_at: string | null
  founding_member: boolean
  updated_at: string
}

async function readView(query: string): Promise<Member[]> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/directory_members?${query}`, {
      headers: { apikey: SUPABASE_PUBLISHABLE_KEY },
      next: { revalidate: REVALIDATE },
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) {
      console.warn(`[directory] Supabase answered ${res.status}; showing no members.`)
      return []
    }
    const rows = (await res.json()) as Member[]
    return Array.isArray(rows) ? rows.filter(r => r.directory_slug) : []
  } catch (e) {
    console.warn(`[directory] Could not reach Supabase (${(e as Error).message}); showing no members.`)
    return []
  }
}

function fixture(): Member[] | null {
  const file = process.env.MIL_DIRECTORY_FIXTURE
  return file ? (JSON.parse(fs.readFileSync(path.resolve(process.cwd(), file), 'utf8')) as Member[]) : null
}

export async function getMembers(): Promise<Member[]> {
  return fixture() ?? readView('select=*&order=approved_at.desc')
}

/**
 * One member, read on its own. A member published since the list was last
 * cached is found straight away the first time their page is visited.
 */
export async function getMember(slug: string): Promise<Member | null> {
  const all = fixture()
  if (all) return all.find(m => m.directory_slug === slug) ?? null
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) return null
  return (await readView(`select=*&directory_slug=eq.${slug}&limit=1`))[0] ?? null
}

export const memberPath = (slug: string) => `${DIRECTORY_PATH}/${slug}`

/** A link as a full URL. Handles like @name become profile links for the networks that use them. */
export function linkUrl(kind: 'website' | 'instagram' | 'facebook' | 'tiktok' | 'linkedin' | 'google_business', value: string): string {
  const v = value.trim()
  if (/^https?:\/\//i.test(v)) return v
  const handle = v.replace(/^@/, '')
  switch (kind) {
    case 'instagram':
      return `https://www.instagram.com/${handle}/`
    case 'tiktok':
      return `https://www.tiktok.com/@${handle}`
    case 'facebook':
      return /\./.test(handle) ? `https://${handle}` : `https://www.facebook.com/${handle}`
    default:
      return `https://${v.replace(/^\/+/, '')}`
  }
}

export const LINK_LABELS = {
  website: 'Website',
  instagram: 'Instagram',
  facebook: 'Facebook',
  tiktok: 'TikTok',
  linkedin: 'LinkedIn',
  google_business: 'Google',
} as const

/** Every link a member gave, as label and URL, in a steady order. */
export function memberLinks(m: Member): { label: string; href: string }[] {
  const out: { label: string; href: string }[] = []
  const pairs: [keyof typeof LINK_LABELS, string | null][] = [
    ['website', m.directory_website],
    ['instagram', m.directory_instagram],
    ['facebook', m.directory_facebook],
    ['tiktok', m.directory_tiktok],
    ['linkedin', m.directory_linkedin],
    ['google_business', m.directory_google_business],
  ]
  for (const [kind, value] of pairs) if (value) out.push({ label: LINK_LABELS[kind], href: linkUrl(kind, value) })
  return out
}
