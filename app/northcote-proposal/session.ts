import crypto from 'crypto'

/**
 * Normalises the password before it is used anywhere.
 *
 * Entry is case insensitive on this proposal, so the same normalisation has to
 * run on both sides: the value compared at sign in, and the value used to key
 * the cookie HMAC. Normalise on one side only and the cookie derived at sign in
 * will not match the one derived at verification, which fails silently and
 * looks like the password being rejected at random.
 */
export function normalisePassword(value: string): string {
  return value.trim().toUpperCase()
}

export function getSessionToken(): string {
  const secret = process.env.NORTHCOTE_PROPOSAL_PASSWORD
  if (!secret) return ''
  return crypto
    .createHmac('sha256', normalisePassword(secret))
    .update('ncp_session_v1')
    .digest('hex')
}
