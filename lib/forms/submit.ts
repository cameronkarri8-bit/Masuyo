import {
  CONTACT_EMAIL,
  firstName,
  MESSAGES,
  readBrief,
  subjectFor,
  teamEmailText,
  validate,
  visitorEmailText,
  type Brief,
  type BriefField,
} from './brief'
import type { Email, SendResult } from './transport'

/**
 * What happens to a submitted brief, with the transport passed in so tests
 * can replace it.
 *
 * 1. Spam checks. A filled honeypot, or a form sent faster than a person
 *    could fill it in, is dropped silently: the sender sees the normal
 *    confirmation and nothing is sent.
 * 2. Validation, field by field, with the copy spec's messages.
 * 3. Resend to hello@, with reply-to set to the visitor, then a short copy to
 *    the visitor.
 * 4. If Resend is not configured or fails, the same fields go to Formspree.
 * 5. If both fail, the visitor sees "That didn't send" with the email address.
 */

export interface BriefState {
  status: 'idle' | 'invalid' | 'sent' | 'failed'
  errors: Partial<Record<BriefField, string>>
  message?: string
  firstName?: string
  needs?: string[]
  /** What was sent, so the form can be refilled after an error. */
  values?: Partial<Brief>
}

export const initialBriefState: BriefState = { status: 'idle', errors: {} }

export interface Transport {
  sendEmail(email: Email): Promise<SendResult>
  postToFormspree(fields: Record<string, string>): Promise<SendResult>
}

/** Below this, a form was filled in too quickly for a person. */
export const MIN_FILL_MS = 3000

export const SENDER = `Masuyo website <${CONTACT_EMAIL}>`

export async function handleBrief(form: FormData, transport: Transport, now: Date = new Date()): Promise<BriefState> {
  // The honeypot is a field people never see. Anything in it is a bot.
  if (String(form.get('company_url') ?? '').trim() !== '') return { status: 'sent', errors: {}, firstName: '' }

  const brief = readBrief(form)

  // Time on page. The field is set by the page's script; without it the
  // submission cannot be checked, so it is refused visibly rather than sent.
  const started = Number(form.get('started'))
  if (!Number.isFinite(started) || started <= 0) {
    return { status: 'failed', errors: {}, message: MESSAGES.sendFailed, values: brief }
  }
  if (now.getTime() - started < MIN_FILL_MS) return { status: 'sent', errors: {}, firstName: firstName(brief.name) }

  const errors = validate(brief)
  if (Object.keys(errors).length > 0) return { status: 'invalid', errors, values: brief }

  const team = await transport.sendEmail({
    from: SENDER,
    to: CONTACT_EMAIL,
    replyTo: brief.email,
    subject: subjectFor(brief),
    text: teamEmailText(brief, now),
  })

  if (team.ok) {
    // The visitor's copy is a courtesy. If it fails, the brief has still
    // arrived, so the visitor still sees the confirmation.
    const copy = await transport.sendEmail({
      from: SENDER,
      to: brief.email,
      replyTo: CONTACT_EMAIL,
      subject: 'Your brief is with us',
      text: visitorEmailText(brief),
    })
    if (!copy.ok) console.warn('[brief] Visitor confirmation not sent:', copy.reason)
    return { status: 'sent', errors: {}, firstName: firstName(brief.name), needs: brief.needs }
  }

  console.warn('[brief] Resend did not send, falling back to Formspree:', team.reason)
  const fallback = await transport.postToFormspree({
    _subject: subjectFor(brief),
    _replyto: brief.email,
    form: brief.source,
    name: brief.name,
    email: brief.email,
    business: brief.business,
    needs: brief.needs.join(', '),
    brief: brief.brief,
    size: brief.size,
    budget: brief.budget,
    page: brief.page,
    estimator: brief.estimator,
  })
  if (fallback.ok) return { status: 'sent', errors: {}, firstName: firstName(brief.name), needs: brief.needs }

  console.error('[brief] Formspree fallback failed too:', fallback.reason)
  return { status: 'failed', errors: {}, message: MESSAGES.sendFailed, values: brief }
}
