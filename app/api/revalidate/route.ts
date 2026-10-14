import { timingSafeEqual } from 'node:crypto'
import { revalidatePath, revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'
import { DIRECTORY_TAG, memberPath } from '@/lib/made-in-lancashire/directory'
import { DIRECTORY_PATH, MIL_PATH } from '@/lib/made-in-lancashire/config'

/**
 * Refreshes the Made in Lancashire directory straight away, instead of within
 * five minutes. MasCRM calls it after every listing save:
 *
 *   POST /api/revalidate
 *   x-revalidate-secret: <REVALIDATE_SECRET>
 *   { "slugs": ["their-page", "an-old-address"] }
 *
 * It refreshes the directory list (hub, directory and sitemap) and the
 * member pages named. Member pages are never cached anyway, so this mainly
 * matters for the list. Off (503) until REVALIDATE_SECRET is set, and the
 * same secret must be set in MasCRM.
 */

export const dynamic = 'force-dynamic'

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/

function sameSecret(given: string, expected: string): boolean {
  const a = Buffer.from(given)
  const b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a, b)
}

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET
  if (!secret || secret.length < 16) return NextResponse.json({ ok: false, error: 'not configured' }, { status: 503 })
  if (!sameSecret(request.headers.get('x-revalidate-secret') ?? '', secret)) return NextResponse.json({ ok: false }, { status: 401 })

  let slugs: string[] = []
  try {
    const body = (await request.json()) as { slugs?: unknown }
    slugs = Array.isArray(body.slugs) ? body.slugs.filter((s): s is string => typeof s === 'string' && SLUG.test(s)).slice(0, 20) : []
  } catch {
    // No body: refresh the list only.
  }

  revalidateTag(DIRECTORY_TAG)
  const paths = [MIL_PATH, DIRECTORY_PATH, '/sitemap.xml', ...slugs.map(memberPath)]
  for (const p of paths) revalidatePath(p)
  return NextResponse.json({ ok: true, revalidated: paths })
}
