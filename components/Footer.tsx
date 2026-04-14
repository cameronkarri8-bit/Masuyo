import Link from 'next/link'
import LogoFullWhite from '@/components/LogoFullWhite'

const serviceLinks = [
  { label: 'Web Design & Development', href: '/services/web-design' },
  { label: 'Digital Marketing', href: '/services/digital-marketing' },
  { label: 'Lead Generation', href: '/services/lead-generation' },
  { label: 'Technology Solutions', href: '/services/technology-solutions' },
  { label: 'Automation', href: '/services/automation' },
  { label: 'Hosting & Infrastructure', href: '/services/hosting' },
]

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Industries', href: '/industries' },
  { label: 'Get a Website', href: '/get-a-website' },
  { label: 'Start a Project', href: '/start-a-project' },
  { label: 'Contact', href: '/contact' },
]

const resourceLinks = [
  { label: 'Resource Hub', href: '/resources' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Glossary', href: '/glossary' },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--navy)', color: 'var(--white)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <LogoFullWhite className="h-6 w-auto mb-4" />
            <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
              We build digital things that actually work.
            </p>
            <a
              href="mailto:hello@masuyodigital.com"
              className="text-sm transition-colors"
              style={{ color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}
            >
              hello@masuyodigital.com
            </a>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Geist, sans-serif' }}>
              Services
            </h4>
            <ul className="flex flex-col gap-2">
              {serviceLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'Geist, sans-serif' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Geist, sans-serif' }}>
              Resources
            </h4>
            <ul className="flex flex-col gap-2">
              {resourceLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'Geist, sans-serif' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Geist, sans-serif' }}>
              Company
            </h4>
            <ul className="flex flex-col gap-2">
              {companyLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'Geist, sans-serif' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Geist, sans-serif' }}>
            &copy; {new Date().getFullYear()} Masuyo Digital. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy-policy"
              className="text-xs transition-colors hover:text-white"
              style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Geist, sans-serif' }}>
              Privacy Policy
            </Link>
            <Link href="/terms"
              className="text-xs transition-colors hover:text-white"
              style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Geist, sans-serif' }}>
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
