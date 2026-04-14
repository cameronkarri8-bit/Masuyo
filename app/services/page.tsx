import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import ServiceCard from '@/components/ServiceCard'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Everything your business needs, digitally. From your first website to full marketing and automation.',
  openGraph: {
    title: 'Services – Masuyo Digital',
    description: 'Everything your business needs, digitally. From your first website to full marketing and automation.',
    url: 'https://masuyodigital.com/services',
  },
  alternates: { canonical: 'https://masuyodigital.com/services' },
}

const services = [
  {
    title: 'Web Design & Development',
    description: 'A website built around your business goals. Fast, modern, mobile-friendly, and designed to convert visitors into customers. We build websites that work hard.',
    href: '/services/web-design',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="3" width="16" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 17h6M10 14v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Digital Marketing',
    description: 'SEO, paid ads, content and social. We build marketing strategies that get your business in front of the right people and keeps it there consistently.',
    href: '/services/digital-marketing',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 14l4-4 3 3 4-5 3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="2" y="2" width="16" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    title: 'Lead Generation',
    description: 'We build systems that bring real enquiries directly to you, through ads, landing pages and organic search. More leads, less chasing.',
    href: '/services/lead-generation',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 3V1M10 19v-2M3 10H1M19 10h-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Technology Solutions',
    description: 'From CRM systems to custom platforms, we build and implement the technology that helps your business run better and scale faster.',
    href: '/services/technology-solutions',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 5V3M10 17v-2M5 10H3M17 10h-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Automation',
    description: 'We identify the tasks eating your time and automate them. Less admin, fewer errors, more time for the work that actually matters.',
    href: '/services/automation',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 10a6 6 0 0111.66-2M16 10a6 6 0 01-11.66 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M15 7l2.5-2.5M4.5 13.5L2 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Hosting & Infrastructure',
    description: 'We host your website on our own servers. Fast, reliable, and managed by us. No third-party companies, no passing the buck.',
    href: '/services/hosting',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="4" width="16" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="2" y="11" width="16" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="15" cy="6.5" r="1" fill="currentColor"/>
        <circle cx="15" cy="13.5" r="1" fill="currentColor"/>
      </svg>
    ),
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="crosshatch-bg pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-2xl">
            <RevealAnimation>
              <h1
                className="text-4xl md:text-5xl font-semibold text-white mb-4 leading-tight"
                style={{ fontFamily: 'Fraunces, serif' }}
              >
                Everything your business needs, digitally.
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <p
                className="text-lg"
                style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif' }}
              >
                From your first website to full marketing and automation. We do it all.
              </p>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 -m-px">
            {services.map((service, i) => (
              <RevealAnimation key={service.href} delay={(i % 3 + 1) as 1 | 2 | 3}>
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  href={service.href}
                  icon={service.icon}
                  showLink={true}
                />
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <RevealAnimation>
            <h2
              className="text-2xl md:text-3xl font-semibold text-ink mb-4"
              style={{ fontFamily: 'Fraunces, serif' }}
            >
              Not sure which services you need?
            </h2>
          </RevealAnimation>
          <RevealAnimation delay={1}>
            <p
              className="text-base mb-8"
              style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}
            >
              Let us figure that out together.
            </p>
          </RevealAnimation>
          <RevealAnimation delay={2}>
            <Link
              href="/contact"
              className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded"
              style={{ background: 'var(--navy)', fontFamily: 'Geist, sans-serif' }}
            >
              Get in touch
            </Link>
          </RevealAnimation>
        </div>
      </section>
    </>
  )
}
