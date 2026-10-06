import 'server-only'

import { appendFileSync } from 'node:fs'
import { Resend } from 'resend'

/**
 * How the brief leaves the server.
 *
 * Resend is the main route. If the key is missing or Resend returns an error,
 * the same fields go to the existing Formspree form from the server, so an
 * enquiry is never lost to a single failure.
 *
 * FORMS_TRANSPORT=mock replaces both with an outbox file, for the browser
 * tests. It has to be set explicitly, so production can never fall into it.
 */

export interface Email {
  from: string
  to: string
  replyTo: string
  subject: string
  text: string
}

export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xlgpogqk'

export type SendResult = { ok: true; id?: string } | { ok: false; reason: string }

/**
 * Mock mode only: two reserved test addresses make the transport fail, so a
 * browser test can walk the real fallback and failure paths.
 * fail-resend@example.test fails Resend and leaves Formspree working;
 * fail-both@example.test fails both. example.test is reserved and can never
 * belong to a real person.
 */
function mockOutbox(entry: Record<string, unknown>): SendResult {
  const path = process.env.FORMS_MOCK_OUTBOX
  if (path) appendFileSync(path, `${JSON.stringify(entry)}\n`)
  const visitor = String(entry.replyTo ?? entry._replyto ?? '')
  if (visitor === 'fail-both@example.test') return { ok: false, reason: 'mock failure' }
  if (visitor === 'fail-resend@example.test' && entry.kind === 'resend') return { ok: false, reason: 'mock failure' }
  return { ok: true, id: 'mock' }
}

export async function sendEmail(email: Email): Promise<SendResult> {
  if (process.env.FORMS_TRANSPORT === 'mock') return mockOutbox({ kind: 'resend', ...email })
  const key = process.env.RESEND_API_KEY
  if (!key) return { ok: false, reason: 'RESEND_API_KEY is not set' }
  try {
    const { data, error } = await new Resend(key).emails.send(email)
    if (error) return { ok: false, reason: `${error.name}: ${error.message}` }
    return { ok: true, id: data?.id }
  } catch (err) {
    return { ok: false, reason: err instanceof Error ? err.message : String(err) }
  }
}

export async function postToFormspree(fields: Record<string, string>): Promise<SendResult> {
  if (process.env.FORMS_TRANSPORT === 'mock') return mockOutbox({ kind: 'formspree', ...fields })
  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(fields),
    })
    if (!res.ok) return { ok: false, reason: `Formspree answered ${res.status}` }
    return { ok: true }
  } catch (err) {
    return { ok: false, reason: err instanceof Error ? err.message : String(err) }
  }
}
