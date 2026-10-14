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
  /** Shown on the member's page as Email and Call buttons, only when set. */
  directory_email: string | null
  directory_phone: string | null
  /** Addresses this member's page had before. Each still finds them, and redirects to the current one. */
  previous_slugs?: string[]
}

/** The cache tag on the directory list, so MasCRM can refresh it straight after a save (app/api/revalidate). */
export const DIRECTORY_TAG = 'mil-directory'

/**
 * Reads the directory_members view. A failure while building gives an empty
 * directory, so a build never depends on Supabase. A failure while the site
 * is running throws instead: the page or sitemap being refreshed keeps its
 * last good version, rather than briefly showing no members (which would
 * drop them from search). One member's page can still say "not found".
 */
async function readView(query: string, { strict, fresh = false }: { strict: boolean; fresh?: boolean }): Promise<Member[]> {
  const building = process.env.NEXT_PHASE === 'phase-production-build'
  const fail = (why: string): Member[] => {
    if (strict && !building) throw new Error(`[directory] ${why}`)
    console.warn(`[directory] ${why}; showing no members.`)
    return []
  }
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/directory_members?${query}`, {
      headers: { apikey: SUPABASE_PUBLISHABLE_KEY },
      ...(fresh ? { cache: 'no-store' as const } : { next: { revalidate: REVALIDATE, tags: [DIRECTORY_TAG] } }),
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) return fail(`Supabase answered ${res.status}`)
    const rows = (await res.json()) as Member[]
    return Array.isArray(rows) ? rows.filter(r => r.directory_slug) : []
  } catch (e) {
    return fail(`Could not reach Supabase (${(e as Error).message})`)
  }
}

function fixture(): Member[] | null {
  const file = process.env.MIL_DIRECTORY_FIXTURE
  return file ? (JSON.parse(fs.readFileSync(path.resolve(process.cwd(), file), 'utf8')) as Member[]) : null
}

export async function getMembers(): Promise<Member[]> {
  return fixture() ?? readView('select=*&order=approved_at.desc', { strict: true })
}

/**
 * One member, read on its own and never cached, so their page reflects
 * approval, edits and unpublishing the moment they happen in MasCRM. Found by
 * their current address or any address they had before: the page then
 * redirects an old one to the current one.
 */
export async function getMember(slug: string): Promise<Member | null> {
  const all = fixture()
  if (all) return all.find(m => m.directory_slug === slug) ?? all.find(m => m.previous_slugs?.includes(slug)) ?? null
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) return null
  const rows = await readView(`select=*&or=(directory_slug.eq.${slug},previous_slugs.cs.%7B${slug}%7D)&limit=2`, { strict: false, fresh: true })
  return rows.find(m => m.directory_slug === slug) ?? rows[0] ?? null
}

/**
 * A member's public email, reversed and base64 encoded, so the address is not
 * in the page as written. ContactCard decodes it when a visitor asks.
 */
export function encodeEmail(email: string): string {
  return Buffer.from(email.split('').reverse().join(''), 'utf8').toString('base64')
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
