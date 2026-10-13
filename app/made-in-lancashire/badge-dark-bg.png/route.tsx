import { badgePng } from '@/lib/made-in-lancashire/badge-png'

/** The badge for dark backgrounds, as a 2x PNG. */
export const dynamic = 'force-static'
export function GET() {
  return badgePng('badge-dark-bg.svg')
}
