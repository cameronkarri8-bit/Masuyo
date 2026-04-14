import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'
import ServiceCard from '@/components/ServiceCard'

export const metadata: Metadata = {
  title: 'Masuyo Digital – We build digital things that actually work.',
  description: 'Your website, your marketing, your technology. All working together to grow your business. UK-based digital agency working globally.',
  openGraph: {
    title: 'Masuyo Digital – We build digital things that actually work.',
    description: 'Your website, your marketing, your technology. All working together to grow your business.',
    url: 'https://masuyodigital.com',
  },
  alternates: { canonical: 'https://masuyodigital.com' },
}

const serviceItems = [
  {
    title: 'Web Design & Development',
    description: 'A website built around your business goals. Fast, modern, mobile-friendly, and designed to convert visitors into customers.',
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
    description: 'SEO, paid ads, content and social. We build marketing that gets your business in front of the right people and keeps it there.',
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
    description: 'We build systems that bring real enquiries directly to you, through ads, landing pages and organic search.',
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
    description: 'From CRM systems to custom platforms, we build the technology that helps your business run better and scale faster.',
    href: '/services/technology-solutions',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2a1.5 1.5 0 011.5 1.5V5a5 5 0 010 10v1.5A1.5 1.5 0 0110 18a1.5 1.5 0 01-1.5-1.5V15a5 5 0 010-10V3.5A1.5 1.5 0 0110 2z" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="10" cy="10" r="2" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    title: 'Automation',
    description: 'We identify the tasks eating your time and automate them. Less admin, fewer errors, more time for what matters.',
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
    description: 'We host your website on our own servers. Fast, reliable, and managed by us.',
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

const useCases = [
  {
    title: 'You are a local business with no real online presence',
    body: 'We get you online properly. A website that represents you well, local SEO so people in your area find you, and a simple way to capture enquiries.',
  },
  {
    title: 'You are growing and need your marketing to keep up',
    body: 'We build and run campaigns across search and social, set up lead generation systems, and track everything so you know what is working.',
  },
  {
    title: 'You want technology to help run your business more efficiently',
    body: 'We look at what you are currently doing, find where technology saves you time and money, and build or implement the right tools.',
  },
  {
    title: 'You want a full digital partner, not just an agency',
    body: 'Strategy, website, marketing, automation, hosting. We act as your digital team without the overhead of hiring one.',
  },
]

const whatWeBuild = [
  'Websites and web applications',
  'Marketing campaigns and ad management',
  'SEO strategies and content systems',
  'CRM and customer management systems',
  'CMS platforms for your team to manage content',
  'Lead generation funnels and landing pages',
  'Automation workflows and integrations',
  'Hosting, server management and ongoing support',
]

const stats = [
  { value: '10+', label: 'Businesses supported across multiple industries' },
  { value: '2', label: 'Countries served and growing' },
  { value: '1', label: 'Team handling everything digital' },
  { value: '7 days', label: 'Average website delivery time' },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="crosshatch-bg min-h-screen flex items-center pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-6"
                style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}
              >
                UK based. Working globally.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-semibold text-white mb-6 leading-tight"
                style={{ fontFamily: 'Fraunces, serif' }}
              >
                We build digital things that{' '}
                <em className="not-italic" style={{ fontStyle: 'italic' }}>actually</em> work.
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p
                className="text-lg md:text-xl mb-10"
                style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}
              >
                Your website, your marketing, your technology. All working together to grow your business.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-block text-center text-sm font-semibold text-white px-6 py-3.5 rounded transition-opacity hover:opacity-90"
                  style={{ background: 'var(--navy)', border: '1px solid rgba(255,255,255,0.15)', fontFamily: 'Geist, sans-serif' }}
                >
                  Start a conversation
                </Link>
                <Link
                  href="/services"
                  className="inline-block text-center text-sm font-semibold px-6 py-3.5 rounded transition-colors hover:bg-white hover:text-ink"
                  style={{ border: '1px solid var(--border)', color: 'rgba(255,255,255,0.8)', fontFamily: 'Geist, sans-serif' }}
                >
                  Our services
                </Link>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Offer block */}
      <section style={{ background: 'var(--blue)' }} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="flex-1">
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'Geist, sans-serif' }}
              >
                Get online fast
              </p>
              <h2
                className="text-2xl md:text-3xl font-semibold text-white mb-3"
                style={{ fontFamily: 'Fraunces, serif' }}
              >
                The simplest way to get your business online.
              </h2>
              <p
                className="text-sm leading-relaxed max-w-2xl"
                style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'Geist, sans-serif' }}
              >
                A professionally built website from just £249, live in 7 working days. You tell us what you need. We handle everything. No lengthy back and forth, no confusing process. Just a website that works, delivered fast.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link
                href="/get-a-website"
                className="inline-block text-sm font-semibold px-6 py-3.5 rounded transition-colors hover:bg-light"
                style={{ background: 'var(--white)', color: 'var(--navy)', fontFamily: 'Geist, sans-serif' }}
              >
                See what is included
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <RevealAnimation>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}
              >
                About Masuyo
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h2
                className="text-3xl md:text-4xl font-semibold text-ink mb-6"
                style={{ fontFamily: 'Fraunces, serif' }}
              >
                One team. Everything digital.
              </h2>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p
                className="text-base leading-relaxed"
                style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}
              >
                Most businesses know they need to do more online. They just do not know where to start, or who to trust. That is where we come in. Masuyo is a full service digital agency working with businesses across the UK and globally. We design, build, market and automate. Everything under one roof, from one team that genuinely cares about your growth.
              </p>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Client logos */}
      <section className="py-14" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-center mb-10" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
            Trusted by growing businesses
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20">
            {/* Verizon */}
            <svg viewBox="0 0 120 36" width="110" height="33" aria-label="Verizon" style={{ opacity: 0.35 }}>
              <text x="0" y="28" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="30" fill="currentColor" style={{ color: 'var(--ink)' }}>verizon</text>
            </svg>
            {/* UCLan */}
            <div style={{ opacity: 0.35 }}>
              <svg viewBox="0 0 100 36" width="90" height="33" aria-label="UCLan">
                <text x="0" y="28" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="30" fill="currentColor">UCLan</text>
              </svg>
            </div>
            {/* Myerscough College */}
            <div style={{ opacity: 0.35 }}>
              <svg viewBox="0 0 240 36" width="200" height="33" aria-label="Myerscough College">
                <text x="0" y="28" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="22" fill="currentColor">Myerscough College</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 -m-px">
            {serviceItems.map((service, i) => (
              <RevealAnimation key={service.href} delay={(i % 2 + 1) as 1 | 2}>
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  href={service.href}
                  icon={service.icon}
                />
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Growth section */}
      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <RevealAnimation>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}
              >
                Why it matters
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h2
                className="text-3xl md:text-4xl font-semibold text-ink mb-6"
                style={{ fontFamily: 'Fraunces, serif' }}
              >
                Digital is not a one-off project. It is an ongoing engine for growth.
              </h2>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p
                className="text-base leading-relaxed"
                style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}
              >
                The businesses seeing the biggest results online are not always the biggest or best funded. They are the ones with the right foundations. A website that works hard. Marketing that runs consistently. Technology that supports the team. Automation that removes friction. We help businesses build that engine at any stage, whether starting from scratch, fixing something that is not working, or scaling what they already have.
              </p>
            </RevealAnimation>
          </div>

          {/* Use cases */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {useCases.map((uc, i) => (
              <RevealAnimation key={i} delay={(i % 2 + 1) as 1 | 2}>
                <div
                  className="p-6 rounded-lg"
                  style={{ background: 'var(--white)', border: '1px solid var(--border)', borderLeft: '3px solid var(--blue)' }}
                >
                  <h3
                    className="text-base font-semibold text-ink mb-3"
                    style={{ fontFamily: 'Fraunces, serif' }}
                  >
                    {uc.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                    {uc.body}
                  </p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* What we build */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <RevealAnimation>
              <h2
                className="text-3xl md:text-4xl font-semibold text-ink mb-4"
                style={{ fontFamily: 'Fraunces, serif' }}
              >
                What we build
              </h2>
              <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                From your first website to full digital infrastructure. Here is the kind of work we do every day.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <ul className="flex flex-col gap-3">
                {whatWeBuild.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm pb-3"
                    style={{ borderBottom: i < whatWeBuild.length - 1 ? '1px solid var(--border)' : 'none', fontFamily: 'Geist, sans-serif', color: 'var(--ink)' }}
                  >
                    <span style={{ color: 'var(--blue)', marginTop: '2px' }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Hosting callout */}
      <section style={{ background: 'var(--navy)' }} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-xl">
              <RevealAnimation>
                <h2
                  className="text-2xl md:text-3xl font-semibold text-white mb-4"
                  style={{ fontFamily: 'Fraunces, serif' }}
                >
                  Your website, hosted by us.
                </h2>
              </RevealAnimation>
              <RevealAnimation delay={1}>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif' }}
                >
                  We run our own server infrastructure, so we host your website directly. No third party hosting companies, no passing the buck. Fast load times, strong uptime, and a team who knows your site inside out.
                </p>
              </RevealAnimation>
            </div>
            <RevealAnimation delay={2}>
              <Link
                href="/services/hosting"
                className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded border transition-colors hover:bg-white hover:text-ink"
                style={{ borderColor: 'rgba(255,255,255,0.25)', fontFamily: 'Geist, sans-serif' }}
              >
                Find out more
              </Link>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0" style={{ borderColor: 'var(--border)' }}>
            {stats.map((stat, i) => (
              <RevealAnimation key={i} delay={(i % 2 + 1) as 1 | 2}>
                <div
                  className="py-10 px-6 text-center"
                  style={{ border: '1px solid var(--border)' }}
                >
                  <p
                    className="text-4xl font-semibold text-ink mb-2"
                    style={{ fontFamily: 'Fraunces, serif' }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                    {stat.label}
                  </p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <CTABand />
    </>
  )
}
