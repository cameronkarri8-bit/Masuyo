/**
 * Work: real projects only, each shared with the client's permission.
 *
 * `published: false` means built but not live: the page exists at its URL for
 * review, but nothing links to it, it is noindex, and the sitemap leaves it
 * out. Flip it to true once the client has approved the page.
 *
 * Fields that need the client (a location, a measured result, an approved
 * quote) stay empty until they are real. Empty fields are not rendered: the
 * page simply leaves that element out rather than showing a placeholder.
 */
import type { BrandIconName } from './brand/icons'

export interface CaseStudy {
  title: string
  metaTitle: string
  description: string
  atAGlance: { needed: string; built: string; result?: string }
  situation: string[]
  features: { icon: BrandIconName; title: string; body: string }[]
  nowFlow: { icon: BrandIconName; title: string }[]
  results?: string[]
  quote?: { text: string; name: string }
  underTheHood: string
}

export interface WorkItem {
  slug: string
  client: string
  sector: string
  location?: string
  line: string
  tags: string[]
  published: boolean
  /** Where the card links when there is no case study page. */
  href?: string
  caseStudy?: CaseStudy
}

export const WORK: WorkItem[] = [
  {
    slug: 'masuyo',
    client: 'Masuyo',
    sector: 'Our own tools',
    line: 'The CRM and client portal we run the business on',
    tags: ['Systems'],
    published: true,
    href: '/systems#built-in-house',
  },
  {
    slug: 'frozen-computers',
    client: 'Frozen Computers',
    sector: 'Repair and retail',
    location: '',
    line: 'Bookings, stock and customers in one system',
    tags: ['Website', 'Systems'],
    // Publish only once the project is live and Nathan has approved the page.
    published: false,
    caseStudy: {
      title: 'Frozen Computers: bookings, stock and customers in one system.',
      metaTitle: 'Frozen Computers case study | Masuyo',
      description:
        'How a computer repair and custom PC business moved from phone bookings to online bookings, a live supplier fed shop and a custom CRM.',
      atAGlance: {
        needed: 'Online bookings, a live shop and a CRM that fits',
        built: 'Website, supplier stock feed, custom CRM',
        result: '',
      },
      situation: [
        'Frozen Computers repairs computers and builds custom PCs. Repairs were booked by phone or in person, the product range lived with their supplier rather than on their site, and customer records sat in HubSpot, which they used for a small part of what they paid for.',
        'Nathan, the owner, wanted something live quickly and a clear plan for the rest. So we built it in phases, with the most useful part first.',
      ],
      features: [
        { icon: 'bookings', title: 'Repair bookings', body: 'Customers pick a repair type and a time online, and it arrives ready to work on.' },
        {
          icon: 'shop',
          title: 'A shop fed by the supplier',
          body: "Products, stock levels and prices come from their supplier's feed, so the shop stays current without manual updates.",
        },
        { icon: 'seo', title: 'Google Shopping listings', body: 'Products appear in Google search results through Merchant Center.' },
        { icon: 'crm', title: 'A custom CRM', body: 'Customers, repairs and orders in one place, replacing HubSpot.' },
        { icon: 'web-apps', title: 'A client portal', body: 'Invoices and project progress in one login.' },
      ],
      nowFlow: [
        { icon: 'support', title: 'Phone and walk in bookings' },
        { icon: 'bookings', title: 'Online booking' },
        { icon: 'crm', title: 'CRM' },
        { icon: 'growth', title: 'Repair tracked' },
        { icon: 'enquiries', title: 'Customer updated' },
      ],
      results: [],
      underTheHood:
        'Custom Next.js site, supplier feed integration, Google Merchant Center, custom CRM and portal, hosted and maintained under Care.',
    },
  },
]

export const publishedWork = () => WORK.filter(w => w.published)
export const caseStudySlugs = () => WORK.filter(w => w.caseStudy).map(w => w.slug)
export const getWork = (slug: string) => WORK.find(w => w.slug === slug)
