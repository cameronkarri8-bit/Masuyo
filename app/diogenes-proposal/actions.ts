'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Resend } from 'resend'
import { getSessionToken } from './session'

/* ---------- Password check ---------- */

export async function checkPassword(formData: FormData) {
  const input   = (formData.get('password') as string | null) ?? ''
  const correct = process.env.DIOGENES_PROPOSAL_PASSWORD ?? ''

  if (correct && input === correct) {
    cookies().set('dgp_session', getSessionToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
      path: '/diogenes-proposal',
    })
    redirect('/diogenes-proposal')
  }

  redirect('/diogenes-proposal?err=1')
}

/* ---------- Questionnaire submission ---------- */

const QUESTION_LABELS: Record<string, string> = {
  q2: 'How would you like to handle the copy?',
  q3: 'Which pages do you need?',
  q4: 'How far should the design lean toward a younger feel?',
  q5: 'Do you have access to your current domain and hosting?',
  q6: 'What is your preference for imagery?',
  q7: 'Are you interested in any optional ongoing services?',
  q9: 'Is there anything else you would like us to know?',
}

export async function submitQuestionnaire(
  data: Record<string, string>
): Promise<{ ok: boolean }> {
  const resend = new Resend(process.env.RESEND_API_KEY)

  const lines = Object.entries(QUESTION_LABELS).map(([key, label]) => {
    const answer = data[key] || '(not answered)'
    const extra  = data[`${key}_detail`] || data[`${key}_other`]
    const detail = extra ? `\n   Note: ${extra}` : ''
    return `${label}\n   ${answer}${detail}`
  })

  const text = [
    'Diogenes Sun Club – Questionnaire Response',
    'Submitted via the proposal page',
    '',
    lines.join('\n\n'),
  ].join('\n')

  try {
    const { error } = await resend.emails.send({
      from: 'Masuyo Digital <hello@masuyodigital.com>',
      to:   'hello@masuyodigital.com',
      subject: 'Diogenes questionnaire response',
      text,
    })
    if (error) {
      console.error('Resend error:', error)
      return { ok: false }
    }
    return { ok: true }
  } catch (err) {
    console.error('submitQuestionnaire error:', err)
    return { ok: false }
  }
}
