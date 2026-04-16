import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'Digital Marketing Services | SEO, Paid Ads and Lead Generation | Masuyo Digital',
  description: 'From SEO and paid ads to email automation and content marketing, Masuyo Digital builds marketing systems that generate consistent leads and grow your business.',
  openGraph: {
    title: 'Digital Marketing Services | SEO, Paid Ads and Lead Generation | Masuyo Digital',
    description: 'From SEO and paid ads to email automation and content marketing, Masuyo Digital builds marketing systems that generate consistent leads and grow your business.',
    url: 'https://masuyodigital.com/marketing',
  },
  alternates: { canonical: 'https://masuyodigital.com/marketing' },
}

/* ─── Category icons ──────────────────────────────────────── */
function SearchIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16.5 16.5L23 23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function TargetIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <circle cx="13" cy="13" r="11" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="13" cy="13" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="13" cy="13" r="2.5" fill="currentColor" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <rect x="2" y="5" width="22" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 8l11 8 11-8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

/* ─── Service card icon ───────────────────────────────────── */
function ServiceIcon({ slug }: { slug: string }) {
  const s = { width: '16', height: '16', viewBox: '0 0 16 16', fill: 'none', stroke: 'currentColor', strokeWidth: '1.4', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  if (slug === 'seo')              return <svg {...s}><circle cx="7" cy="7" r="4.5"/><path d="M10.5 10.5l3 3"/><path d="M5 7h4M7 5v4"/></svg>
  if (slug === 'paid-ads')         return <svg {...s}><circle cx="8" cy="8" r="6.5"/><circle cx="8" cy="8" r="3.5"/><circle cx="8" cy="8" r="1" fill="currentColor" stroke="none"/></svg>
  if (slug === 'lead-generation')  return <svg {...s}><path d="M8 2v6l3-3"/><path d="M8 8l-3-3"/><path d="M2 10v2a2 2 0 002 2h8a2 2 0 002-2v-2"/></svg>
  if (slug === 'email-automation') return <svg {...s}><rect x="1" y="3.5" width="14" height="9" rx="1.5"/><path d="M1 6l7 4.5L15 6"/></svg>
  if (slug === 'content')          return <svg {...s}><path d="M3 3h10a1 1 0 011 1v9a1 1 0 01-1 1H3a1 1 0 01-1-1V4a1 1 0 011-1z"/><path d="M5 6h6M5 8.5h6M5 11h4"/></svg>
  return <svg {...s}><circle cx="8" cy="5" r="2.5"/><circle cx="3" cy="12" r="2"/><circle cx="13" cy="12" r="2"/><path d="M8 7.5v1.5M8 9L5 12M8 9l3 3"/></svg>
}

/* ─── Data ────────────────────────────────────────────────── */
const services = [
  { slug: 'seo',              title: 'SEO',                    description: 'Rank higher, get found faster, and drive organic traffic that converts.',                                      href: '/marketing/seo' },
  { slug: 'paid-ads',         title: 'Paid Ads',               description: 'Google and Meta campaigns managed to deliver profitable leads and sales.',                                      href: '/marketing/paid-ads' },
  { slug: 'lead-generation',  title: 'Lead Generation',        description: 'End-to-end systems that bring qualified prospects directly to you.',                                            href: '/marketing/lead-generation' },
  { slug: 'email-automation', title: 'Email and Automation',   description: 'Sequences and workflows that nurture leads and retain customers automatically.',                               href: '/marketing/email-automation' },
  { slug: 'content',          title: 'Content Marketing',      description: 'Strategic content that builds authority, drives traffic, and generates inbound leads.',                        href: '/marketing/content' },
  { slug: 'social',           title: 'Social Media',           description: 'Consistent, on-brand social content and management that builds your audience.',                                href: '/marketing/social' },
]

const stats = [
  {
    label: 'Full funnel',
    description: 'From first click to signed client, we build and manage the entire journey',
  },
  {
    label: 'Data first',
    description: 'Every decision is backed by tracking, analytics, and real performance data',
  },
  {
    label: 'Always connected',
    description: 'Your marketing stack connects to your CRM, your website, and your business systems',
  },
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

/* ─── Page ────────────────────────────────────────────────── */
export default function MarketingPage() {
  return (
    <>
      {/* Hero */}
      <section className="crosshatch-bg pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                Marketing
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'Fraunces, serif' }}>
                Marketing That Generates Real Results
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                We build the campaigns, funnels, and systems that bring you customers consistently. No vanity metrics, no fluff. Just leads, conversions, and growth.
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

      {/* How We Grow Your Business */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-12" style={{ fontFamily: 'Fraunces, serif' }}>
              How We Grow Your Business
            </h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <SearchIcon />,
                heading: 'Get Found',
                description: 'SEO, content marketing, and Google Business Profile optimisation. We make sure the right people find you when they are searching for what you offer.',
              },
              {
                icon: <TargetIcon />,
                heading: 'Generate Leads',
                description: 'Paid ads, lead generation campaigns, and conversion-focused landing pages. We bring qualified prospects to your door and turn them into enquiries.',
              },
              {
                icon: <MailIcon />,
                heading: 'Nurture and Convert',
                description: 'Email automation, retargeting, and follow-up sequences. We make sure no lead goes cold and no opportunity is wasted.',
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
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold text-ink" style={{ fontFamily: 'Fraunces, serif' }}>
                      {card.heading}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.75' }}>
                      {card.description}
                    </p>
                  </div>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-12" style={{ fontFamily: 'Fraunces, serif' }}>
              Our Marketing Services
            </h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <RevealAnimation key={s.slug} delay={(i % 3 + 1) as 1 | 2 | 3}>
                <ServiceCard {...s} />
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Why it works differently */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <RevealAnimation>
              <h2 className="text-3xl font-semibold text-ink mb-6" style={{ fontFamily: 'Fraunces, serif' }}>
                Marketing and technology, working together
              </h2>
              <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                Most agencies separate marketing from technology. We do not. Every campaign we run is backed by proper tracking, automation, and infrastructure. That means better data, faster optimisation, and results that actually last.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <div className="flex flex-col gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex gap-5 p-5 rounded-lg"
                    style={{ border: '1px solid var(--border)', background: 'var(--white)' }}
                  >
                    <div
                      className="w-1 rounded-full flex-shrink-0"
                      style={{ background: 'var(--blue)' }}
                    />
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-semibold text-ink" style={{ fontFamily: 'Fraunces, serif' }}>
                        {stat.label}
                      </p>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                        {stat.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <CTABand
        headline="Ready to build a marketing system that works?"
        body="Tell us where you are and where you want to be. We will build the system to get you there."
        buttonLabel="Start a project"
        buttonHref="/start-a-project"
      />
    </>
  )
}
