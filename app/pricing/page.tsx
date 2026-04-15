import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'Transparent Project Pricing and Estimates | Masuyo Digital',
  description: 'Explore our project pricing guide for web development, digital marketing, automation, and technology services. Get an instant estimate with our interactive quote builder.',
  openGraph: {
    title: 'Transparent Project Pricing and Estimates | Masuyo Digital',
    description: 'Explore our project pricing guide for web development, digital marketing, automation, and technology services.',
    url: 'https://masuyodigital.com/pricing',
  },
  alternates: { canonical: 'https://masuyodigital.com/pricing' },
}

const howItWorks = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="11" cy="11" r="3" stroke="currentColor" strokeWidth="1.6" />
        <path d="M11 3v2M11 17v2M3 11h2M17 11h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    heading: 'Scoped to your needs',
    body: 'Every estimate starts with understanding what you are trying to achieve, not just what you want to build.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 3l7 3v5c0 4-3.5 7-7 8-3.5-1-7-4-7-8V6l7-3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M7.5 11l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    heading: 'No hidden costs',
    body: 'We agree the scope before we start. If something changes, we tell you before it affects the price.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <rect x="12" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <rect x="3" y="12" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M15.5 12v7M12 15.5h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    heading: 'Flexible engagement',
    body: 'Project-based, retainer, or hybrid. We structure our work around what makes sense for your business.',
  },
]

const factors = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="6" width="16" height="3" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="4" y="11" width="12" height="3" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="7" y="16" width="6" height="2" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: 'Scope and complexity',
    desc: 'The number of pages, features, and integrations required directly affects build time and cost.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M14 3l3 3-9 9H5v-3l9-9z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: 'Design requirements',
    desc: 'Custom design takes longer than template-based work. Brand new design systems cost more than refinements.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 6v4.5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: 'Timeline',
    desc: 'Tighter deadlines require dedicated resource allocation, which carries a premium.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M6.5 13.5L3 17M13.5 6.5L17 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="5" cy="15" r="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="15" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 15h6M5 7v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: 'Integrations',
    desc: 'Connecting third-party tools, APIs, and platforms adds technical complexity and time.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 8h6M7 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: 'Content',
    desc: 'Projects where we produce copy, graphics, or video content are priced accordingly.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 10a6 6 0 0111.66-2M16 10a6 6 0 01-11.66 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M15 7l2.5-2.5M4.5 13.5L2 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: 'Ongoing support',
    desc: 'Retainer arrangements are priced separately from project work and billed monthly.',
  },
]

const techPricing = [
  { label: 'New Website',                    price: 'from £249' },
  { label: 'Website Redesign',               price: 'from £349' },
  { label: 'Mobile App',                     price: 'from £2,500' },
  { label: 'Web Application',                price: 'from £3,500' },
  { label: 'Course or Learning Platform',    price: 'from £1,800' },
  { label: 'Community Hub or Member Portal', price: 'from £2,200' },
  { label: 'Custom CRM or Business System',  price: 'from £3,000' },
  { label: 'DevOps and Infrastructure',      price: 'from £800' },
  { label: 'Automation Project',             price: 'from £800' },
  { label: 'AI Chatbot or Assistant',        price: 'from £700' },
  { label: 'Hosting and Maintenance',        price: 'from £40/mo' },
]

const marketingPricing = [
  { label: 'SEO Setup',                          price: 'from £199' },
  { label: 'Google Analytics and Tracking',      price: 'from £99' },
  { label: 'Email Marketing Automation',         price: 'from £300' },
  { label: 'Full Funnel Build',                  price: 'from £1,200' },
  { label: 'Lead Generation Campaign',           price: 'from £299/mo' },
  { label: 'Review Generation Automation',       price: 'from £200' },
  { label: 'Social Media Automation',            price: 'from £300' },
  { label: 'CRM Integration',                    price: 'from £400' },
  { label: 'Monthly SEO and Content Retainer',   price: 'from £499/mo' },
  { label: 'Managed Automation Retainer',        price: 'from £599/mo' },
  { label: 'Growth Retainer',                    price: 'from £899/mo' },
]

function PriceRow({ label, price, last }: { label: string; price: string; last?: boolean }) {
  const isMonthly = price.includes('/mo')
  return (
    <div
      className="flex items-center justify-between py-3"
      style={{ borderBottom: last ? 'none' : '1px solid var(--border)' }}
    >
      <span className="text-sm text-ink" style={{ fontFamily: 'Geist, sans-serif' }}>{label}</span>
      <span
        className="text-sm font-semibold flex-shrink-0 ml-4"
        style={{ color: isMonthly ? 'var(--blue)' : 'var(--ink)', fontFamily: 'Geist, sans-serif' }}
      >
        {price}
      </span>
    </div>
  )
}

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="crosshatch-bg pt-16 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg viewBox="0 0 1440 480" fill="none" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
            <circle cx="1300" cy="80" r="420" stroke="rgba(53,173,223,0.09)" strokeWidth="1" fill="none" />
            <circle cx="1300" cy="80" r="260" stroke="rgba(53,173,223,0.07)" strokeWidth="1" fill="none" />
            <circle cx="1300" cy="80" r="140" stroke="rgba(53,173,223,0.10)" strokeWidth="1" fill="none" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28 relative">
          <div className="max-w-2xl">
            <RevealAnimation>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'Fraunces, serif' }}>
                Honest Pricing. No Surprises.
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <p className="text-lg mb-10" style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                Every project is different, so every quote is tailored. Use our interactive builder to get an instant estimate, or get in touch and we will work it out together.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/start-a-project"
                  className="inline-block text-center text-sm font-semibold text-white px-6 py-3.5 rounded transition-opacity hover:opacity-90"
                  style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
                  Build your estimate
                </Link>
                <Link href="/contact"
                  className="inline-block text-center text-sm font-semibold px-6 py-3.5 rounded transition-colors hover:bg-white hover:text-ink"
                  style={{ border: '1px solid rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.85)', fontFamily: 'Geist, sans-serif' }}>
                  Talk to us
                </Link>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* How our pricing works */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                How it works
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold text-ink mb-6" style={{ fontFamily: 'Fraunces, serif' }}>
                How our pricing works
              </h2>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                We do not publish fixed price lists because good work is rarely one-size-fits-all. What we do is give you a clear, honest estimate based on what you actually need, and we stick to it.
              </p>
            </RevealAnimation>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {howItWorks.map((card, i) => (
              <RevealAnimation key={i} delay={(i % 3) as 0 | 1 | 2}>
                <div className="p-6 rounded-lg h-full" style={{ border: '1px solid var(--border)', borderTop: '3px solid var(--blue)', background: 'var(--white)' }}>
                  <div className="w-10 h-10 flex items-center justify-center rounded mb-4"
                    style={{ background: 'rgba(53,173,223,0.1)', color: 'var(--blue)' }}>
                    {card.icon}
                  </div>
                  <h3 className="text-base font-semibold text-ink mb-2" style={{ fontFamily: 'Fraunces, serif' }}>
                    {card.heading}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.75' }}>
                    {card.body}
                  </p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* What affects the price */}
      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                Pricing factors
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold text-ink mb-6" style={{ fontFamily: 'Fraunces, serif' }}>
                What affects the cost of a project?
              </h2>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                A number of factors influence how we price a project. Here is what we take into account:
              </p>
            </RevealAnimation>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {factors.map((f, i) => (
              <RevealAnimation key={i} delay={(i % 3) as 0 | 1 | 2}>
                <div className="p-5 rounded-lg h-full flex gap-4" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                  <div className="w-9 h-9 flex items-center justify-center rounded flex-shrink-0"
                    style={{ background: 'rgba(53,173,223,0.1)', color: 'var(--blue)' }}>
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-ink mb-1" style={{ fontFamily: 'Fraunces, serif' }}>
                      {f.label}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                      {f.desc}
                    </p>
                  </div>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Indicative pricing */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                Price guide
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold text-ink mb-4" style={{ fontFamily: 'Fraunces, serif' }}>
                Indicative starting prices
              </h2>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                These are starting points, not fixed prices. Your actual quote will depend on your specific requirements.
              </p>
            </RevealAnimation>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Technology */}
            <RevealAnimation>
              <div className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                <div className="px-6 py-4" style={{ background: 'var(--navy)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                    Service area
                  </p>
                  <h3 className="text-lg font-semibold text-white" style={{ fontFamily: 'Fraunces, serif' }}>
                    Technology
                  </h3>
                </div>
                <div className="px-6 py-2">
                  {techPricing.map((row, i) => (
                    <PriceRow key={row.label} label={row.label} price={row.price} last={i === techPricing.length - 1} />
                  ))}
                </div>
              </div>
            </RevealAnimation>

            {/* Marketing and Growth */}
            <RevealAnimation delay={1}>
              <div className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                <div className="px-6 py-4" style={{ background: 'var(--navy)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                    Service area
                  </p>
                  <h3 className="text-lg font-semibold text-white" style={{ fontFamily: 'Fraunces, serif' }}>
                    Marketing and Growth
                  </h3>
                </div>
                <div className="px-6 py-2">
                  {marketingPricing.map((row, i) => (
                    <PriceRow key={row.label} label={row.label} price={row.price} last={i === marketingPricing.length - 1} />
                  ))}
                </div>
              </div>
            </RevealAnimation>
          </div>

          {/* Disclaimer */}
          <RevealAnimation>
            <p className="text-sm" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
              All prices shown are indicative starting points and exclude VAT. Final pricing is confirmed following a discovery call and scope agreement.
            </p>
          </RevealAnimation>
        </div>
      </section>

      <CTABand
        headline="Ready to get a proper estimate?"
        body="Use our interactive quote builder to see a breakdown of costs for your project in real time."
        buttonLabel="Build your estimate"
        buttonHref="/start-a-project"
      />
    </>
  )
}
