// Server only: reads a website check report from Supabase by its token.
import 'server-only'

import { WEBSITE_CHECK_REPORT_ENDPOINT } from './config'

/**
 * The report as Cameron approved it in MasCRM (its shape is
 * supabase/functions/_shared/website-check-review.ts there). The function
 * only returns a report once it has been approved and sent; before that the
 * answer is just "not ready", with nothing about the site. Every finding
 * carries its own words, so the page only renders them.
 */

export type CheckStatus = 'good' | 'quick_win' | 'worth_a_look'

export const STATUS_LABELS: Record<CheckStatus, string> = {
  good: 'Working well',
  quick_win: 'Quick win',
  worth_a_look: 'Worth a look',
}

export type MetricSource = 'field-page' | 'field-site' | 'lab'

export const METRIC_SOURCE_LABELS: Record<MetricSource, string> = {
  'field-page': 'real visitors to this page, last 28 days',
  'field-site': 'real visitors across your site, last 28 days',
  lab: 'a test visit by Google',
}

export type Finding = { id: string; label: string; status: CheckStatus; finding: string; why: string; fix: string[]; impact: number; effort: number }

export type Section = {
  id: string
  title: string
  summary: string
  findings: Finding[]
  score: number
  metrics?: {
    mobile?: number
    desktop?: number
    lcp?: { seconds: number; source: MetricSource }
    cls?: { value: number; source: MetricSource }
    inp?: { ms: number; source: MetricSource }
  }
}

export type CheckResults = {
  version: 1
  checked_at: string
  final_url: string
  domain: string
  score: number
  summary: string
  quick_wins: { section: string; id: string; label: string; finding: string; fix: string[] }[]
  sections: Section[]
}

export type Report = {
  domain: string
  url: string
  business_name: string | null
  /** Cameron's note, at the top. */
  intro: string | null
  /** Null when Cameron chose not to show a score. */
  score: number | null
  results: CheckResults
  created_at: string
  sent_at: string | null
}

export type ReportLookup = { state: 'ready'; report: Report; preview: boolean } | { state: 'pending' } | { state: 'missing' }

const TOKEN = /^[0-9a-f]{48}$/

/**
 * A report by token, read fresh every time (reports are private to the link).
 * `preview` is the check's private preview token, used only by Cameron's
 * preview in MasCRM: it shows the draft before it is sent.
 */
export async function getReport(token: string, preview?: string): Promise<ReportLookup> {
  if (!TOKEN.test(token)) return { state: 'missing' }
  const asPreview = Boolean(preview && TOKEN.test(preview))
  try {
    const q = `token=${token}${asPreview ? `&preview=${preview}` : ''}`
    const res = await fetch(`${WEBSITE_CHECK_REPORT_ENDPOINT}?${q}`, { cache: 'no-store', signal: AbortSignal.timeout(8000) })
    if (res.status === 404) return { state: 'missing' }
    if (!res.ok) throw new Error(`report answered ${res.status}`)
    const body = (await res.json()) as { ok: boolean; ready?: boolean; preview?: boolean; report?: Report }
    if (body.ready && body.report?.results) return { state: 'ready', report: body.report, preview: Boolean(body.preview) }
    return { state: 'pending' }
  } catch (e) {
    console.warn(`[check] Could not read report: ${(e as Error).message}`)
    throw e
  }
}
