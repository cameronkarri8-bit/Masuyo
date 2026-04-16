'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import LogoFull from '@/components/LogoFull'

const technologyGroups = [
  {
    heading: 'Build',
    items: [
      { label: 'Web Development', href: '/technology/web-development' },
      { label: 'App Development', href: '/technology/app-development' },
      { label: 'Web Applications and Portals', href: '/technology/web-applications' },
      { label: 'E-commerce Development', href: '/technology/ecommerce' },
    ],
  },
  {
    heading: 'Infrastructure and DevOps',
    items: [
      { label: 'DevOps', href: '/technology/devops' },
      { label: 'Hosting', href: '/technology/hosting' },
      { label: 'Database Design and Management', href: '/technology/database' },
      { label: 'Systems Architecture', href: '/technology/architecture' },
      { label: 'GDPR and Compliance', href: '/technology/gdpr-compliance' },
    ],
  },
  {
    heading: 'Automation and Intelligence',
    items: [
      { label: 'Workflow Automation', href: '/technology/automation' },
      { label: 'API Development and Integration', href: '/technology/api' },
      { label: 'AI Chatbots and Assistants', href: '/technology/ai-chatbots' },
      { label: 'CRM and Business Systems', href: '/technology/crm' },
      { label: 'Community and Learning Platforms', href: '/technology/community-platforms' },
    ],
  },
]

const marketing = [
  { label: 'SEO', href: '/marketing/seo' },
  { label: 'Paid Ads', href: '/marketing/paid-ads' },
  { label: 'Lead Generation', href: '/marketing/lead-generation' },
  { label: 'Email and Automation', href: '/marketing/email-automation' },
  { label: 'Content Marketing', href: '/marketing/content' },
  { label: 'Social Media', href: '/marketing/social' },
]

const industries = [
  { label: 'E-commerce', href: '/industries/ecommerce' },
  { label: 'Healthcare', href: '/industries/healthcare' },
  { label: 'Tradespeople', href: '/industries/tradespeople' },
  { label: 'Hospitality', href: '/industries/hospitality' },
  { label: 'Legal', href: '/industries/legal' },
  { label: 'Education', href: '/industries/education' },
  { label: 'Finance', href: '/industries/finance' },
  { label: 'Real Estate', href: '/industries/real-estate' },
  { label: 'Fitness and Wellness', href: '/industries/fitness-wellness' },
  { label: 'Automotive', href: '/industries/automotive' },
  { label: 'Charity and Non-Profit', href: '/industries/charity-non-profit' },
  { label: 'Professional Services', href: '/industries/professional-services' },
  { label: 'Restaurants and Food', href: '/industries/restaurants-food' },
]

const resources = [
  { label: 'Resource Hub', href: '/resources' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Glossary', href: '/glossary' },
]

const ChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [technologyOpen, setTechnologyOpen] = useState(false)
  const [marketingOpen, setMarketingOpen] = useState(false)
  const [industriesOpen, setIndustriesOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-16"
      style={{
        background: 'rgba(255,255,255,0.96)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <LogoFull className="h-4 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-5">

          {/* Technology mega-menu */}
          <div className="nav-dropdown-trigger relative">
            <button className="text-sm font-medium text-ink hover:text-navy transition-colors flex items-center gap-1" style={{ fontFamily: 'Geist, sans-serif' }}>
              Technology <ChevronDown />
            </button>
            <div
              className="nav-dropdown absolute top-full left-0 mt-3 rounded-lg shadow-lg overflow-hidden"
              style={{ background: 'var(--white)', border: '1px solid var(--border)', width: '580px' }}
            >
              <div className="grid grid-cols-3 p-2">
                {technologyGroups.map(group => (
                  <div key={group.heading} className="p-2">
                    <p
                      className="text-xs font-semibold uppercase tracking-wider mb-2 px-2"
                      style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}
                    >
                      {group.heading}
                    </p>
                    {group.items.map(item => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-2 py-2 text-sm text-ink hover:bg-light rounded transition-colors leading-snug"
                        style={{ fontFamily: 'Geist, sans-serif' }}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Marketing dropdown */}
          <div className="nav-dropdown-trigger relative">
            <button className="text-sm font-medium text-ink hover:text-navy transition-colors flex items-center gap-1" style={{ fontFamily: 'Geist, sans-serif' }}>
              Marketing <ChevronDown />
            </button>
            <div
              className="nav-dropdown absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 rounded-lg shadow-lg overflow-hidden"
              style={{ background: 'var(--white)', border: '1px solid var(--border)' }}
            >
              {marketing.map(s => (
                <Link key={s.href} href={s.href}
                  className="block px-4 py-3 text-sm text-ink hover:bg-light transition-colors"
                  style={{ fontFamily: 'Geist, sans-serif' }}>
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Industries dropdown */}
          <div className="nav-dropdown-trigger relative">
            <button className="text-sm font-medium text-ink hover:text-navy transition-colors flex items-center gap-1" style={{ fontFamily: 'Geist, sans-serif' }}>
              Industries <ChevronDown />
            </button>
            <div className="nav-dropdown absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 rounded-lg shadow-lg overflow-hidden"
              style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
              <Link href="/industries"
                className="block px-4 py-3 text-sm font-semibold text-ink hover:bg-light transition-colors border-b"
                style={{ fontFamily: 'Geist, sans-serif', borderColor: 'var(--border)' }}>
                All Industries
              </Link>
              {industries.map(s => (
                <Link key={s.href} href={s.href}
                  className="block px-4 py-2.5 text-sm text-ink hover:bg-light transition-colors"
                  style={{ fontFamily: 'Geist, sans-serif' }}>
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Resources dropdown */}
          <div className="nav-dropdown-trigger relative">
            <button className="text-sm font-medium text-ink hover:text-navy transition-colors flex items-center gap-1" style={{ fontFamily: 'Geist, sans-serif' }}>
              Resources <ChevronDown />
            </button>
            <div className="nav-dropdown absolute top-full left-1/2 -translate-x-1/2 mt-3 w-44 rounded-lg shadow-lg overflow-hidden"
              style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
              {resources.map(s => (
                <Link key={s.href} href={s.href}
                  className="block px-4 py-3 text-sm text-ink hover:bg-light transition-colors"
                  style={{ fontFamily: 'Geist, sans-serif' }}>
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/pricing" className="text-sm font-medium text-ink hover:text-navy transition-colors" style={{ fontFamily: 'Geist, sans-serif' }}>
            Pricing
          </Link>

          <Link href="/about" className="text-sm font-medium text-ink hover:text-navy transition-colors" style={{ fontFamily: 'Geist, sans-serif' }}>
            About
          </Link>
          <Link href="/blog" className="text-sm font-medium text-ink hover:text-navy transition-colors" style={{ fontFamily: 'Geist, sans-serif' }}>
            Blog
          </Link>

          {/* Secondary CTA */}
          <Link href="/start-a-project"
            className="text-sm font-medium px-4 py-2 rounded transition-colors"
            style={{ color: 'var(--navy)', border: '1px solid var(--navy)', fontFamily: 'Geist, sans-serif' }}>
            Start a project
          </Link>

          {/* Primary CTA */}
          <Link href="/contact"
            className="text-sm font-medium text-white px-4 py-2 rounded transition-colors"
            style={{ background: 'var(--navy)', fontFamily: 'Geist, sans-serif' }}>
            Get in touch
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-ink transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-ink transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-ink transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 h-screen overflow-y-auto"
          style={{ background: 'var(--white)', borderTop: '1px solid var(--border)' }}>
          <div className="px-4 py-6 flex flex-col gap-1">

            {/* Technology accordion */}
            <div>
              <button className="w-full text-left text-base font-medium text-ink py-3 flex items-center justify-between"
                onClick={() => setTechnologyOpen(!technologyOpen)}>
                Technology
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`transition-transform ${technologyOpen ? 'rotate-180' : ''}`}>
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {technologyOpen && (
                <div className="pl-4 flex flex-col gap-1 pb-2">
                  {technologyGroups.map(group => (
                    <div key={group.heading}>
                      <p className="text-xs font-semibold uppercase tracking-wider mt-3 mb-1"
                        style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                        {group.heading}
                      </p>
                      {group.items.map(item => (
                        <Link key={item.href} href={item.href}
                          className="block text-sm text-mid py-2 hover:text-navy transition-colors"
                          onClick={() => setMenuOpen(false)}>
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Marketing accordion */}
            <div style={{ borderTop: '1px solid var(--border)' }}>
              <button className="w-full text-left text-base font-medium text-ink py-3 flex items-center justify-between"
                onClick={() => setMarketingOpen(!marketingOpen)}>
                Marketing
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`transition-transform ${marketingOpen ? 'rotate-180' : ''}`}>
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {marketingOpen && (
                <div className="pl-4 flex flex-col gap-1 pb-2">
                  {marketing.map(s => (
                    <Link key={s.href} href={s.href}
                      className="text-sm text-mid py-2 hover:text-navy transition-colors"
                      onClick={() => setMenuOpen(false)}>
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Industries accordion */}
            <div style={{ borderTop: '1px solid var(--border)' }}>
              <button className="w-full text-left text-base font-medium text-ink py-3 flex items-center justify-between"
                onClick={() => setIndustriesOpen(!industriesOpen)}>
                Industries
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`transition-transform ${industriesOpen ? 'rotate-180' : ''}`}>
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {industriesOpen && (
                <div className="pl-4 flex flex-col gap-1 pb-2">
                  <Link href="/industries" className="text-sm text-mid py-2 hover:text-navy transition-colors font-semibold"
                    onClick={() => setMenuOpen(false)}>
                    All Industries
                  </Link>
                  {industries.map(s => (
                    <Link key={s.href} href={s.href}
                      className="text-sm text-mid py-2 hover:text-navy transition-colors"
                      onClick={() => setMenuOpen(false)}>
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Resources accordion */}
            <div style={{ borderTop: '1px solid var(--border)' }}>
              <button className="w-full text-left text-base font-medium text-ink py-3 flex items-center justify-between"
                onClick={() => setResourcesOpen(!resourcesOpen)}>
                Resources
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`transition-transform ${resourcesOpen ? 'rotate-180' : ''}`}>
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {resourcesOpen && (
                <div className="pl-4 flex flex-col gap-1 pb-2">
                  {resources.map(s => (
                    <Link key={s.href} href={s.href}
                      className="text-sm text-mid py-2 hover:text-navy transition-colors"
                      onClick={() => setMenuOpen(false)}>
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {[
              { href: '/pricing', label: 'Pricing' },
              { href: '/about', label: 'About' },
              { href: '/blog', label: 'Blog' },
            ].map(link => (
              <Link key={link.href} href={link.href}
                className="text-base font-medium text-ink py-3 border-t"
                style={{ borderColor: 'var(--border)' }}
                onClick={() => setMenuOpen(false)}>
                {link.label}
              </Link>
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <Link href="/start-a-project"
                className="block text-center text-base font-medium px-6 py-3 rounded"
                style={{ border: '1px solid var(--navy)', color: 'var(--navy)' }}
                onClick={() => setMenuOpen(false)}>
                Start a project
              </Link>
              <Link href="/contact"
                className="block text-center text-base font-medium text-white px-6 py-3 rounded"
                style={{ background: 'var(--navy)' }}
                onClick={() => setMenuOpen(false)}>
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
