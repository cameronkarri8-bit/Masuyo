import { CHECK_PATH } from './check/config'
import { MADE_IN_LANCASHIRE_PUBLIC, MIL_PATH } from './made-in-lancashire/config'

/**
 * Site navigation, from the copy spec: six words a visitor can understand in
 * two seconds and one destination, plus the free website check.
 */

export const NAV_LINKS = [
  { label: 'Websites', href: '/websites' },
  { label: 'Systems', href: '/systems' },
  { label: 'Care', href: '/care' },
  { label: 'Work', href: '/work' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Resources', href: '/resources' },
  { label: 'Free check', href: '/check' },
] as const

export const PRIMARY_CTA = { label: 'Start a project', href: '/start' } as const

/** The free website check: the way in for visitors not ready for a project. */
export const CHECK_CTA = { label: 'Free website check', href: CHECK_PATH } as const
export { CHECK_PATH }

export const FOOTER_COLUMNS = [
  {
    heading: 'What we do',
    links: [
      { label: 'Websites', href: '/websites' },
      { label: 'Systems', href: '/systems' },
      { label: 'Care', href: '/care' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Who we build for', href: '/industries' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Work', href: '/work' },
      { label: 'Approach', href: '/approach' },
      { label: 'Start a project', href: '/start' },
      { label: 'Brand', href: '/brand' },
    ],
  },
  {
    heading: 'Learn',
    links: [
      { label: 'Resources', href: '/resources' },
      { label: 'Free website check', href: '/check' },
      { label: 'Web design in Preston', href: '/web-design-preston' },
      // Made in Lancashire joins the footer when its preview switch is turned on.
      ...(MADE_IN_LANCASHIRE_PUBLIC ? [{ label: 'Made in Lancashire', href: MIL_PATH }] : []),
    ],
  },
] as const

export function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}
