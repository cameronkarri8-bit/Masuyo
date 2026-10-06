'use server'

import { handleBrief, type BriefState } from '@/lib/forms/submit'
import { postToFormspree, sendEmail } from '@/lib/forms/transport'

/**
 * The server action behind the Start a project form and the lifestyle venues
 * form. Everything is validated here, on the server; the browser only
 * collects the fields.
 */
export async function submitBrief(_prev: BriefState, form: FormData): Promise<BriefState> {
  return handleBrief(form, { sendEmail, postToFormspree })
}
