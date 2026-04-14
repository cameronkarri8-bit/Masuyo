import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'

const industries = [
  {
    slug: 'ecommerce',
    label: 'E-commerce',
    description: 'Conversion-optimised online stores built for growth, mobile-first checkout, and lower cart abandonment.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 5h2.5l2 10h13l2-7H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="11.5" cy="19.5" r="1.5" fill="currentColor" />
        <circle cx="18.5" cy="19.5" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    slug: 'healthcare',
    label: 'Healthcare',
    description: 'Professional, GDPR-compliant websites for clinics, practices, and healthcare providers that build patient trust.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="4" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M14 9v10M9 14h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    slug: 'tradespeople',
    label: 'Tradespeople',
    description: 'Local search dominance, gallery showcases, and lead generation for builders, plumbers, electricians, and more.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M6 22l10-10m0 0l3-7 4 4-7 3z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    slug: 'hospitality',
    label: 'Hospitality',
    description: 'Beautiful hotel and venue websites with direct booking integrations that reduce reliance on third-party platforms.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M5 22V11l9-7 9 7v11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="11" y="16" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    slug: 'legal',
    label: 'Legal',
    description: 'Authority-building websites for law firms and solicitors: practice area pages, consultation booking, and trust signals.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4v20M6 8l4 8H6m12 0h-4l4-8M6 20h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    slug: 'education',
    label: 'Education',
    description: 'Clear enrolment journeys, course pages, and local SEO for schools, colleges, tutors, and training providers.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 5L3 11l11 6 11-6-11-6z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 11v7M8 13.5v5a6 6 0 0012 0v-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    slug: 'finance',
    label: 'Finance',
    description: 'Trust-focused digital presence for IFAs, mortgage brokers, and fintech businesses: compliant, clear, and conversion-ready.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M5 20V12M10 20V8M15 20v-6M20 20V5M3 22h22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    slug: 'real-estate',
    label: 'Real Estate',
    description: 'Property search, local area SEO, and lead capture for estate agents and letting agencies, with less reliance on portals.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M3 22V11l11-9 11 9v11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 22v-7h8v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    slug: 'fitness-wellness',
    label: 'Fitness & Wellness',
    description: 'Class booking integrations, membership landing pages, and results-focused content for gyms, studios, and therapists.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.8" />
        <path d="M10 14a4 4 0 008 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M14 10v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    slug: 'automotive',
    label: 'Automotive',
    description: 'Vehicle inventory pages, high-intent Google Ads, and local SEO for car dealers, garages, and MOT centres.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 16l2-6h16l2 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="3" y="16" width="22" height="5" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="8.5" cy="21" r="2" fill="currentColor" />
        <circle cx="19.5" cy="21" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    slug: 'charity-non-profit',
    label: 'Charity & Non-Profit',
    description: 'Emotive, accessible websites with donation integrations and volunteer recruitment for charities and non-profits.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 22s-9-5.5-9-12a5 5 0 0110 0 5 5 0 0110 0c0 6.5-11 12-11 12z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    slug: 'professional-services',
    label: 'Professional Services',
    description: 'Thought leadership, service landing pages, and lead nurturing for consultants, accountants, and B2B firms.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="6" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M10 6V4h8v2M8 12h12M8 16h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    slug: 'restaurants-food',
    label: 'Restaurants & Food',
    description: 'Direct ordering, menu showcases, and local SEO for restaurants, cafes, and food businesses, with less margin lost to aggregators.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M9 4v7a4 4 0 008 0V4M13 15v9M17 4v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export default function IndustriesPage() {
  return (
    <>
      {/* Hero */}
      <section className="crosshatch-bg pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24">
          <div className="max-w-2xl">
            <RevealAnimation>
              <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4 leading-tight" style={{ fontFamily: 'Fraunces, serif' }}>
                Industries we work with
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <p className="text-lg" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif' }}>
                Every industry has its own digital challenges. We build solutions that fit how your business actually works.
              </p>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, i) => (
              <RevealAnimation key={industry.slug} delay={(i % 3) as 0 | 1 | 2}>
                <Link
                  href={`/industries/${industry.slug}`}
                  className="group block p-6 rounded-lg transition-shadow hover:shadow-md h-full"
                  style={{ border: '1px solid var(--border)', background: 'var(--white)' }}
                >
                  <div className="mb-4" style={{ color: 'var(--blue)' }}>
                    {industry.icon}
                  </div>
                  <h2 className="text-lg font-semibold text-ink mb-2 group-hover:text-navy transition-colors" style={{ fontFamily: 'Fraunces, serif' }}>
                    {industry.label}
                  </h2>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                    {industry.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium transition-colors group-hover:opacity-80" style={{ color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
                    Learn more
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: 'var(--navy)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <RevealAnimation>
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4" style={{ fontFamily: 'Fraunces, serif' }}>
              Not sure which solution fits your business?
            </h2>
          </RevealAnimation>
          <RevealAnimation delay={1}>
            <p className="text-base mb-8" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif' }}>
              Tell us about your project and we will recommend the right approach.
            </p>
          </RevealAnimation>
          <RevealAnimation delay={2}>
            <Link href="/start-a-project" className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded"
              style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
              Start a project
            </Link>
          </RevealAnimation>
        </div>
      </section>
    </>
  )
}
