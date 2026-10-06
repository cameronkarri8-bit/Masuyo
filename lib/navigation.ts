/**
 * Site navigation, from the copy spec. Six words a visitor can understand in
 * two seconds, and one destination.
 */

export const NAV_LINKS = [
  { label: 'Websites', href: '/websites' },
  { label: 'Systems', href: '/systems' },
  { label: 'Care', href: '/care' },
  { label: 'Work', href: '/work' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Resources', href: '/resources' },
] as const

export const PRIMARY_CTA = { label: 'Start a project', href: '/start' } as const

export const FOOTER_COLUMNS = [
  {
    heading: 'What we do',
    links: [
      { label: 'Websites', href: '/websites' },
      { label: 'Systems', href: '/systems' },
      { label: 'Care', href: '/care' },
      { label: 'Pricing', href: '/pricing' },
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
      { label: 'Web design in Preston', href: '/web-design-preston' },
    ],
  },
] as const

export function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}
