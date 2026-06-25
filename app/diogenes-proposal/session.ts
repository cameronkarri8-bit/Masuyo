import crypto from 'crypto'

export function getSessionToken(): string {
  const secret = process.env.DIOGENES_PROPOSAL_PASSWORD
  if (!secret) return ''
  return crypto.createHmac('sha256', secret).update('dgp_session_v1').digest('hex')
}
