import { WEBSITE_CHECK_ENDPOINT, track } from './config'

/**
 * Sends a website check request, from the /check page or the corner pop-up.
 * The website-check function checks everything again, answers straight away
 * and emails a receipt. The report itself follows once Cameron has reviewed
 * it, within two working days.
 */

export type CheckFields = {
  url: string
  email: string
  first_name?: string
  business_name?: string
  town?: string
  goal?: string
  marketing_opt_in?: boolean
  /** The honeypot: people never see or fill it. */
  company_website?: string
  source: 'check-page' | 'popup'
}

export type CheckOutcome =
  | { ok: true }
  | { ok: false; kind: 'invalid'; errors: Partial<Record<'url' | 'email' | 'first_name' | 'business_name' | 'town' | 'goal', string>> }
  | { ok: false; kind: 'limited' | 'error' }

export const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
/** A website address as people type it: a name with a dot in it, with or without https:// in front. */
export const WEBSITE = /^(https?:\/\/)?[^\s/.]+(\.[^\s/.]+)+(\/\S*)?$/i

export async function sendCheck(fields: CheckFields): Promise<CheckOutcome> {
  try {
    const res = await fetch(WEBSITE_CHECK_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields),
    })
    if (res.status === 429) return { ok: false, kind: 'limited' }
    if (res.status === 422) {
      const body = await res.json().catch(() => ({}))
      return { ok: false, kind: 'invalid', errors: body?.errors ?? {} }
    }
    if (!res.ok) return { ok: false, kind: 'error' }
    track('check_requested', { source: fields.source })
    return { ok: true }
  } catch {
    return { ok: false, kind: 'error' }
  }
}
