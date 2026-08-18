import Link from 'next/link'
import LogoFullWhite from '@/components/LogoFullWhite'

/**
 * The footer carries the full sitemap. Pages pulled out of the main navigation
 * are all still live and are linked from here, so nothing is orphaned.
 */
const COLUMNS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: 'Services',
    links: [
      { label: 'What we do', href: '/services' },
      { label: 'Websites', href: '/services/web-design' },
      { label: 'Digital marketing', href: '/services/digital-marketing' },
      { label: 'Technology solutions', href: '/services/technology-solutions' },
      { label: 'Get a website', href: '/get-a-website' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    heading: 'Technology',
    links: [
      { label: 'All technology', href: '/technology' },
      { label: 'Web development', href: '/technology/web-development' },
      { label: 'Web applications', href: '/technology/web-applications' },
      { label: 'App development', href: '/technology/app-development' },
      { label: 'Automation', href: '/technology/automation' },
      { label: 'AI chatbots', href: '/technology/ai-chatbots' },
      { label: 'E-commerce', href: '/technology/ecommerce' },
      { label: 'CRM', href: '/technology/crm' },
      { label: 'Database', href: '/technology/database' },
      { label: 'API integration', href: '/technology/api' },
      { label: 'Architecture', href: '/technology/architecture' },
      { label: 'DevOps', href: '/technology/devops' },
      { label: 'Community platforms', href: '/technology/community-platforms' },
      { label: 'Hosting', href: '/technology/hosting' },
      { label: 'GDPR compliance', href: '/technology/gdpr-compliance' },
    ],
  },
  {
    heading: 'Marketing',
    links: [
      { label: 'All marketing', href: '/marketing' },
      { label: 'SEO', href: '/marketing/seo' },
      { label: 'Content', href: '/marketing/content' },
      { label: 'Paid ads', href: '/marketing/paid-ads' },
      { label: 'Social', href: '/marketing/social' },
      { label: 'Email automation', href: '/marketing/email-automation' },
      { label: 'Lead generation', href: '/marketing/lead-generation' },
    ],
  },
  {
    heading: 'Industries',
    links: [
      { label: 'All industries', href: '/industries' },
      { label: 'Community interest companies', href: '/industries/community-interest-companies' },
      { label: 'Lifestyle venues', href: '/lifestyle-venues' },
      { label: 'Bespoke products', href: '/products/bespoke' },
      { label: 'Client portals', href: '/products/client-portal' },
      { label: 'Community platforms', href: '/products/community-platform' },
      { label: 'CRM and lead management', href: '/products/crm-lead-management' },
      { label: 'Learning platforms', href: '/products/custom-learning-platform' },
    ],
  },
  {
    // Local landing pages. Kept out of the main navigation, so this column is
    // what makes them crawlable and passes internal link equity to them.
    heading: 'Locations',
    links: [
      { label: 'Web design Preston', href: '/web-design-preston' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Guides', href: '/guides' },
      { label: 'Blog', href: '/blog' },
      { label: 'Resources', href: '/resources' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Glossary', href: '/glossary' },
      { label: 'Contact', href: '/contact' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="w-full bg-navy text-white">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="max-w-md">
          <LogoFullWhite className="h-9 w-auto" />
          <p className="mt-6 font-sans text-base leading-relaxed text-white/70">
            We build digital things that actually work. One senior person on every
            project, with specialists brought in when a job needs them.
          </p>
          <a
            href="mailto:hello@masuyodigital.com"
            className="mt-6 inline-block font-sans text-base font-semibold text-blue transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
          >
            hello@masuyodigital.com
          </a>
        </div>

        {/* Sitemap */}
        <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-12 border-t border-white/10 pt-14 md:grid-cols-3 lg:grid-cols-6">
          {COLUMNS.map(col => (
            <div key={col.heading}>
              <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.06em] text-white/40">
                {col.heading}
              </h2>
              <ul className="mt-5 flex flex-col gap-2.5">
                {col.links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-sans text-sm text-white/70 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Legal */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="font-sans text-xs text-white/40">
            &copy; {new Date().getFullYear()} Masuyo Digital. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy-policy"
              className="font-sans text-xs text-white/40 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
            >
              Privacy policy
            </Link>
            <Link
              href="/terms"
              className="font-sans text-xs text-white/40 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
