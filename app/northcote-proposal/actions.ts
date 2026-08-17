'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getSessionToken, normalisePassword } from './session'

/* ---------- Password check ---------- */

export async function checkPassword(formData: FormData) {
  const input = normalisePassword((formData.get('password') as string | null) ?? '')
  const correct = normalisePassword(process.env.NORTHCOTE_PROPOSAL_PASSWORD ?? '')

  if (correct && input === correct) {
    cookies().set('ncp_session', getSessionToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
      path: '/northcote-proposal',
    })
    redirect('/northcote-proposal')
  }

  redirect('/northcote-proposal?err=1')
}
