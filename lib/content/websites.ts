/**
 * Shared copy for the Websites page, reused by the Preston page, which shows
 * the same "What we build" tiles and the same checklist.
 */
import type { BrandIconName } from '@/lib/brand/icons'

export const WEBSITE_TILES: { icon: BrandIconName; title: string; body: string }[] = [
  { icon: 'websites', title: 'Business websites', body: 'A clear, fast site that explains what you do and makes it easy to get in touch.' },
  { icon: 'bookings', title: 'Bookings and appointments', body: 'Customers choose a service and a time, and it lands in your calendar.' },
  { icon: 'enquiries', title: 'Quote requests', body: 'A guided form that collects the details you need, so you can price the job first time.' },
  { icon: 'shop', title: 'Shops and trade catalogues', body: 'Products, stock and prices kept up to date, including feeds from your suppliers.' },
  { icon: 'growth', title: 'Landing pages for ads', body: 'A focused page for each campaign, so your ad spend lands somewhere that converts.' },
  { icon: 'code', title: 'Redesigns', body: 'Your existing site rebuilt on a faster, more modern base, keeping what already works.' },
]

export const WEBSITE_INCLUDES = [
  'Design around your brand and your customers',
  'Built for phones first',
  'Search foundations: page titles, structured data, sitemap and Google Search Console',
  'Analytics and enquiry tracking, so you can see what works',
  'A simple editor, so you can change text and photos yourself',
  'Hosting set up on our servers, with SSL',
  'A handover session for you and your team',
  'Full ownership of the site, the domain and the data',
]
