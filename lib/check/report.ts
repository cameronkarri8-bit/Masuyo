// Server only: reads a website check report from Supabase by its token.
import 'server-only'

import { WEBSITE_CHECK_REPORT_ENDPOINT } from './config'

/**
 * The report, as stored by the website-check function (its shape is
 * supabase/functions/_shared/website-check-model.ts in MasCRM). Every
 * finding carries its own words, so the page only renders them.
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

export type Report = { domain: string; url: string; business_name: string | null; score: number; results: CheckResults; created_at: string }

export type ReportLookup = { state: 'ready'; report: Report } | { state: 'pending'; domain: string } | { state: 'missing' }

const TOKEN = /^[0-9a-f]{48}$/

/** A report by token, read fresh every time (reports are private to the link). */
export async function getReport(token: string): Promise<ReportLookup> {
  if (!TOKEN.test(token)) return { state: 'missing' }
  try {
    const res = await fetch(`${WEBSITE_CHECK_REPORT_ENDPOINT}?token=${token}`, { cache: 'no-store', signal: AbortSignal.timeout(8000) })
    if (res.status === 404) return { state: 'missing' }
    if (!res.ok) throw new Error(`report answered ${res.status}`)
    const body = (await res.json()) as { ok: boolean; ready?: boolean; domain?: string; report?: Report }
    if (body.ready && body.report?.results) return { state: 'ready', report: body.report }
    return { state: 'pending', domain: body.domain ?? '' }
  } catch (e) {
    console.warn(`[check] Could not read report: ${(e as Error).message}`)
    throw e
  }
}
