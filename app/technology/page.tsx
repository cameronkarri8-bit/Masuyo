import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'Technology Services | Web Development, DevOps and Automation | Masuyo Digital',
  description: 'From web development and cloud infrastructure to AI integrations and workflow automation, Masuyo Digital builds and deploys technology that scales with your business.',
  openGraph: {
    title: 'Technology Services | Web Development, DevOps and Automation | Masuyo Digital',
    description: 'From web development and cloud infrastructure to AI integrations and workflow automation, Masuyo Digital builds and deploys technology that scales with your business.',
    url: 'https://masuyodigital.com/technology',
  },
  alternates: { canonical: 'https://masuyodigital.com/technology' },
}

/* ─── Category icons ──────────────────────────────────────── */
function LayersIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <path d="M13 2L2 8l11 5.5L24 8 13 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M2 14l11 5.5L24 14" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M2 20l11 5.5L24 20" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

function ServerIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <rect x="3" y="3" width="20" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3" y="15" width="20" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="7.5" cy="7" r="1.25" fill="currentColor" />
      <circle cx="7.5" cy="19" r="1.25" fill="currentColor" />
    </svg>
  )
}

function CpuIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <rect x="8" y="8" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 2v6M13 2v6M16 2v6M10 18v6M13 18v6M16 18v6M2 10h6M2 13h6M2 16h6M18 10h6M18 13h6M18 16h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/* ─── Service card icon ───────────────────────────────────── */
function ServiceIcon({ slug }: { slug: string }) {
  const s = { width: '16', height: '16', viewBox: '0 0 16 16', fill: 'none', stroke: 'currentColor', strokeWidth: '1.4', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  if (slug === 'web-development')   return <svg {...s}><path d="M4 5l-3 3 3 3"/><path d="M12 5l3 3-3 3"/><path d="M9 3l-2 10"/></svg>
  if (slug === 'app-development')   return <svg {...s}><rect x="4" y="1" width="8" height="14" rx="1.5"/><path d="M7 12h2"/></svg>
  if (slug === 'web-applications')  return <svg {...s}><rect x="1" y="3" width="14" height="10" rx="1.5"/><path d="M1 6h14"/><circle cx="3.5" cy="4.5" r=".6" fill="currentColor" stroke="none"/><circle cx="5.5" cy="4.5" r=".6" fill="currentColor" stroke="none"/></svg>
  if (slug === 'ecommerce')         return <svg {...s}><path d="M2 2h2l1.5 7h7l1.5-5H5.5"/><circle cx="8" cy="13.5" r="1"/><circle cx="12" cy="13.5" r="1"/></svg>
  if (slug === 'devops')            return <svg {...s}><circle cx="8" cy="8" r="2.5"/><path d="M8 2v1.5M8 12.5V14M2 8h1.5M12.5 8H14M3.64 3.64l1.06 1.06M11.3 11.3l1.06 1.06M3.64 12.36l1.06-1.06M11.3 4.7l1.06-1.06"/></svg>
  if (slug === 'hosting')           return <svg {...s}><rect x="1" y="4" width="14" height="4" rx="1"/><rect x="1" y="10" width="14" height="4" rx="1"/><circle cx="3.5" cy="6" r=".8" fill="currentColor" stroke="none"/><circle cx="3.5" cy="12" r=".8" fill="currentColor" stroke="none"/></svg>
  if (slug === 'database')          return <svg {...s}><ellipse cx="8" cy="4" rx="6" ry="2"/><path d="M2 4v4c0 1.1 2.69 2 6 2s6-.9 6-2V4"/><path d="M2 8v4c0 1.1 2.69 2 6 2s6-.9 6-2V8"/></svg>
  if (slug === 'architecture')      return <svg {...s}><circle cx="8" cy="8" r="2"/><circle cx="2" cy="3" r="1.5"/><circle cx="14" cy="3" r="1.5"/><circle cx="14" cy="13" r="1.5"/><circle cx="2" cy="13" r="1.5"/><path d="M3.2 4l3.4 2.7M9.4 5.3l3.4-2M12.5 4l-3.5 2.7M3.5 12.2l3.5-2.5M9 9.7l3.5 2.5"/></svg>
  if (slug === 'gdpr-compliance')   return <svg {...s}><path d="M8 1L2 4v4c0 3.5 2.6 6.7 6 7.7 3.4-1 6-4.2 6-7.7V4L8 1z"/><path d="M5.5 8l2 2 3-3"/></svg>
  if (slug === 'automation')        return <svg {...s}><path d="M5 4H3a1 1 0 00-1 1v6a1 1 0 001 1h2"/><path d="M11 4h2a1 1 0 011 1v6a1 1 0 01-1 1h-2"/><path d="M8 2v12M5 8h6"/></svg>
  if (slug === 'api')               return <svg {...s}><path d="M2 8h12"/><circle cx="5" cy="8" r="2"/><circle cx="11" cy="8" r="2"/><path d="M5 6V4M5 10v2M11 6V4M11 10v2"/></svg>
  if (slug === 'ai-chatbots')       return <svg {...s}><path d="M14 3H2a1 1 0 00-1 1v7a1 1 0 001 1h2v3l3-3h7a1 1 0 001-1V4a1 1 0 00-1-1z"/><path d="M5 7.5h6M5 9.5h4"/></svg>
  if (slug === 'crm')               return <svg {...s}><circle cx="8" cy="5" r="2.5"/><path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6"/></svg>
  // community-platforms
  return <svg {...s}><circle cx="4" cy="6" r="2"/><circle cx="12" cy="6" r="2"/><circle cx="8" cy="12" r="2"/><path d="M5.8 7.2L6.5 10M10.2 7.2L9.5 10M4 8v2.5M12 8v2.5"/></svg>
}

/* ─── Data ────────────────────────────────────────────────── */
const buildServices = [
  { slug: 'web-development',   title: 'Web Development',             description: 'Modern, fast, and built to convert.',                                       href: '/technology/web-development' },
  { slug: 'app-development',   title: 'App Development',             description: 'Native and cross-platform apps for iOS and Android.',                       href: '/technology/app-development' },
  { slug: 'web-applications',  title: 'Web Applications and Portals', description: 'Complex browser-based tools and client portals.',                          href: '/technology/web-applications' },
  { slug: 'ecommerce',         title: 'E-commerce Development',      description: 'Online stores built around your products and customers.',                   href: '/technology/ecommerce' },
]

const infraServices = [
  { slug: 'devops',            title: 'DevOps',                          description: 'CI/CD pipelines, deployment automation, and release management.',                  href: '/technology/devops' },
  { slug: 'hosting',           title: 'Hosting',                         description: 'Managed hosting on our own infrastructure. Fast, reliable, and fully supported.',  href: '/technology/hosting' },
  { slug: 'database',          title: 'Database Design and Management',  description: 'Structured, scalable, and secure data architecture.',                              href: '/technology/database' },
  { slug: 'architecture',      title: 'Systems Architecture',            description: 'Technical strategy and system design for complex digital products.',               href: '/technology/architecture' },
  { slug: 'gdpr-compliance',   title: 'GDPR and Compliance',             description: 'Data protection implementation that keeps you on the right side of the law.',      href: '/technology/gdpr-compliance' },
]

const automationServices = [
  { slug: 'automation',            title: 'Workflow Automation',              description: 'Remove the manual tasks and connect your business tools.',              href: '/technology/automation' },
  { slug: 'api',                   title: 'API Development and Integration',  description: 'Build and connect APIs across your entire tech stack.',                href: '/technology/api' },
  { slug: 'ai-chatbots',           title: 'AI Chatbots and Assistants',       description: 'Intelligent assistants trained on your content and workflows.',        href: '/technology/ai-chatbots' },
  { slug: 'crm',                   title: 'CRM and Business Systems',         description: 'Custom CRM platforms and internal business tools.',                    href: '/technology/crm' },
  { slug: 'community-platforms',   title: 'Community and Learning Platforms', description: 'Member portals, course platforms, and community hubs.',               href: '/technology/community-platforms' },
]

/* ─── Sub-components ──────────────────────────────────────── */
function ServiceCard({ slug, title, description, href }: { slug: string; title: string; description: string; href: string }) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-4 p-5 rounded-lg transition-colors hover:bg-light h-full"
      style={{ border: '1px solid var(--border)', background: 'var(--white)' }}
    >
      <div
        className="w-9 h-9 rounded flex items-center justify-center flex-shrink-0"
        style={{ background: 'rgba(53,173,223,0.1)', color: 'var(--blue)' }}
      >
        <ServiceIcon slug={slug} />
      </div>
      <div className="flex flex-col gap-1.5 flex-1">
        <h3 className="text-sm font-semibold text-ink leading-snug" style={{ fontFamily: 'Fraunces, serif' }}>
          {title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
          {description}
        </p>
      </div>
      <span className="flex items-center gap-1.5 text-xs font-semibold transition-colors group-hover:text-navy" style={{ color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
        Learn more
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  )
}

function SectionHeading({ label, id }: { label: string; id: string }) {
  return (
    <div id={id} className="flex items-center gap-4 mb-10">
      <h2 className="text-3xl font-semibold text-ink" style={{ fontFamily: 'Fraunces, serif' }}>
        {label}
      </h2>
      <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
    </div>
  )
}

/* ─── Page ────────────────────────────────────────────────── */
export default function TechnologyPage() {
  return (
    <>
      {/* Hero */}
      <section className="crosshatch-bg pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                Technology
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'Fraunces, serif' }}>
                We Build Technology That Works at Scale
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                From architecture and infrastructure to automation and AI, we design and deploy digital systems that are fast, secure, and built to grow with your business.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <Link
                href="/start-a-project"
                className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded"
                style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}
              >
                Start a project
              </Link>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* What We Build - 3 category cards */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-12" style={{ fontFamily: 'Fraunces, serif' }}>
              What We Build
            </h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <LayersIcon />,
                heading: 'Build',
                description: 'Websites, web applications, mobile apps, and e-commerce platforms. Built from scratch, built to perform, built around your goals.',
                anchor: '#build',
              },
              {
                icon: <ServerIcon />,
                heading: 'Infrastructure and DevOps',
                description: 'Cloud hosting, CI/CD pipelines, database architecture, systems design, and GDPR compliance. The foundations that keep everything running.',
                anchor: '#infrastructure',
              },
              {
                icon: <CpuIcon />,
                heading: 'Automation and Intelligence',
                description: 'Workflow automation, API integrations, AI assistants, CRM systems, and community platforms. Technology that works while you sleep.',
                anchor: '#automation',
              },
            ].map((card, i) => (
              <RevealAnimation key={card.heading} delay={(i + 1) as 1 | 2 | 3}>
                <div
                  className="flex flex-col gap-5 p-6 rounded-lg h-full"
                  style={{ border: '1px solid var(--border)', background: 'var(--white)' }}
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ background: 'var(--navy)', color: 'var(--blue)' }}
                  >
                    {card.icon}
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <h3 className="text-lg font-semibold text-ink" style={{ fontFamily: 'Fraunces, serif' }}>
                      {card.heading}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.75' }}>
                      {card.description}
                    </p>
                  </div>
                  <Link
                    href={card.anchor}
                    className="flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-navy"
                    style={{ color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}
                  >
                    View services
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 7h8M7.5 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Build */}
      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <SectionHeading label="Build" id="build" />
          </RevealAnimation>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {buildServices.map((s, i) => (
              <RevealAnimation key={s.slug} delay={(i % 4 + 1) as 1 | 2 | 3 | 4}>
                <ServiceCard {...s} />
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure and DevOps */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <SectionHeading label="Infrastructure and DevOps" id="infrastructure" />
          </RevealAnimation>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {infraServices.map((s, i) => (
              <RevealAnimation key={s.slug} delay={(i % 3 + 1) as 1 | 2 | 3}>
                <ServiceCard {...s} />
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Automation and Intelligence */}
      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <SectionHeading label="Automation and Intelligence" id="automation" />
          </RevealAnimation>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {automationServices.map((s, i) => (
              <RevealAnimation key={s.slug} delay={(i % 3 + 1) as 1 | 2 | 3}>
                <ServiceCard {...s} />
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="Ready to build something that lasts?"
        body="Tell us what you need and we will tell you how to build it properly."
        buttonLabel="Start a project"
        buttonHref="/start-a-project"
      />
    </>
  )
}
