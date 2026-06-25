'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getSessionToken } from './session'

export async function checkPassword(formData: FormData) {
  const input = (formData.get('password') as string | null) ?? ''
  const correct = process.env.DIOGENES_PROPOSAL_PASSWORD ?? ''

  if (correct && input === correct) {
    cookies().set('dgp_session', getSessionToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/diogenes-proposal',
    })
    redirect('/diogenes-proposal')
  }

  redirect('/diogenes-proposal?err=1')
}
