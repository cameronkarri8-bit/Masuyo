import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'
import Section from '@/components/Section'
import Testimonial from '@/components/Testimonial'
import { CASE_STUDIES } from '@/lib/case-studies'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Every price we charge, published. Monthly care and growth plans from £40 per month, and one-off project prices from £249. No hidden costs.',
  openGraph: {
    title: 'Pricing | Masuyo Digital',
    description:
      'Every price we charge, published. Monthly plans from £40 per month and projects from £249.',
    url: 'https://masuyodigital.com/pricing',
  },
  alternates: { canonical: 'https://masuyodigital.com/pricing' },
}

/*
  Plan contents are derived from the existing option tooltips in lib/pricing.ts.
  Care maps to `hosting`, Grow to `seo-retainer`, Scale to `growth-retainer`.
  No price or inclusion here is invented.
*/
const PLANS = [
  {
    name: 'Care',
    price: '£40',
    cadence: 'per month',
    tagline: 'Keep the thing you already have working properly.',
    features: [
      'Managed hosting on our own infrastructure',
      'SSL, monitoring and backups',
      'Security updates and patching',
      'Small content updates',
      'Technical support when you need it',
    ],
    featured: false,
  },
  {
    name: 'Grow',
    price: '£499',
    cadence: 'per month',
    tagline: 'Get found by people already looking for you.',
    features: [
      'Ongoing SEO management',
      'Keyword targeting and tracking',
      'Content produced every month',
      'Organic traffic grown month on month',
      'Reporting you can actually read',
    ],
    featured: true,
  },
  {
    name: 'Scale',
    price: '£899',
    cadence: 'per month',
    tagline: 'Everything working together, measured properly.',
    features: [
      'SEO and content',
      'Paid ads managed for you',
      'Performance reporting',
      'Campaign planning and iteration',
      'A senior person on your account',
    ],
    featured: false,
  },
]

const BUILD_PRICES = [
  { label: 'New website', price: 'from £249' },
  { label: 'Website redesign', price: 'from £349' },
  { label: 'AI chatbot or assistant', price: 'from £700' },
  { label: 'Automation project', price: 'from £800' },
  { label: 'DevOps and infrastructure', price: 'from £800' },
  { label: 'Course or learning platform', price: 'from £1,800' },
  { label: 'Community hub or member portal', price: 'from £2,200' },
  { label: 'Mobile app', price: 'from £2,500' },
  { label: 'Custom CRM or business system', price: 'from £3,000' },
  { label: 'Web application', price: 'from £3,500' },
]

const MARKETING_PRICES = [
  { label: 'Google Analytics and tracking', price: 'from £99' },
  { label: 'SEO setup', price: 'from £199' },
  { label: 'Review generation automation', price: 'from £200' },
  { label: 'Lead generation campaign', price: 'from £299 per month' },
  { label: 'Email marketing automation', price: 'from £300' },
  { label: 'Social media automation', price: 'from £300' },
  { label: 'CRM integration', price: 'from £400' },
  { label: 'Full funnel build', price: 'from £1,200' },
  { label: 'Managed automation retainer', price: 'from £599 per month' },
]

const FACTORS = [
  'How many pages, features and integrations you need',
  'Whether the design is bespoke or a refinement of what you have',
  'How tight the deadline is',
  'How many third party tools we need to connect',
  'Whether we are writing the copy and producing the images',
]

function Tick() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="mt-0.5 flex-shrink-0">
      <path d="M3 9.5l4 4 8-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PriceTable({ title, rows }: { title: string; rows: { label: string; price: string }[] }) {
  return (
    <div className="rounded-card bg-white p-8 md:p-10">
      <h3 className="text-2xl text-navy">{title}</h3>
      <dl className="mt-7">
        {rows.map((r, i) => (
          <div
            key={r.label}
            className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-0.5 py-3.5 ${
              i === rows.length - 1 ? '' : 'border-b border-border'
            }`}
          >
            <dt className="min-w-0 font-sans text-sm text-ink">{r.label}</dt>
            <dd
              className={`flex-shrink-0 font-sans text-sm font-semibold ${
                r.price.includes('per month') ? 'text-blue2' : 'text-navy'
              }`}
            >
              {r.price}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export default function PricingPage() {
  return (
    <>
      {/* ---------------- (a) Hero ---------------- */}
      <Section bg="white" width="wide" tight>
        <RevealAnimation>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.06em] text-blue2">
            Pricing
          </p>
          <h1 className="mt-5 max-w-[15ch] text-navy hero-display">
            Every price, published.
          </h1>
          <p className="mt-8 max-w-[54ch] font-sans text-lg leading-relaxed text-mid">
            You should not have to sit through a call to find out whether you can afford
            us. So here is the lot: what we charge monthly, what we charge to build things,
            and what makes a number go up.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/start-a-project" className="btn-primary">
              Get an instant estimate
            </Link>
            <Link href="/contact" className="btn-secondary">
              Talk to us
            </Link>
          </div>
        </RevealAnimation>
      </Section>

      {/* ---------------- (b) Monthly plans ---------------- */}
      <Section bg="tint" width="wide">
        <RevealAnimation>
          <h2 className="max-w-[18ch] text-5xl text-navy md:text-6xl">
            Monthly plans.
          </h2>
          <p className="mt-7 max-w-[50ch] font-sans text-lg leading-relaxed text-mid">
            Most of what we do is ongoing. Pick the level that fits, change it whenever you
            like, cancel whenever you like. No twelve month tie in.
          </p>
        </RevealAnimation>

        <div className="mt-14 grid items-start gap-5 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <RevealAnimation key={plan.name} delay={(i % 3) as 0 | 1 | 2}>
              <div
                className={`hover-lift relative flex h-full flex-col rounded-card p-8 md:p-10 ${
                  plan.featured ? 'on-dark bg-blue text-white lg:-mt-6 lg:pb-14 lg:pt-14' : 'bg-white'
                }`}
              >
                {plan.featured && (
                  <span className="absolute right-8 top-8 rounded-full bg-white/20 px-3 py-1 font-sans text-xs font-semibold uppercase tracking-wider text-white">
                    Most chosen
                  </span>
                )}

                <h3 className={`text-3xl ${plan.featured ? 'text-white' : 'text-navy'}`}>
                  {plan.name}
                </h3>
                <p
                  className={`mt-3 font-sans text-sm leading-relaxed ${
                    plan.featured ? 'text-white/80' : 'text-mid'
                  }`}
                >
                  {plan.tagline}
                </p>

                <p className="mt-8 flex items-baseline gap-2">
                  <span
                    className={`font-display text-6xl leading-none ${
                      plan.featured ? 'text-white' : 'text-navy'
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`font-sans text-sm ${plan.featured ? 'text-white/70' : 'text-mid'}`}
                  >
                    {plan.cadence}
                  </span>
                </p>

                <ul
                  className={`mt-8 flex flex-col gap-3 border-t pt-8 ${
                    plan.featured ? 'border-white/20' : 'border-border'
                  }`}
                >
                  {plan.features.map(f => (
                    <li
                      key={f}
                      className={`flex gap-3 font-sans text-sm leading-relaxed ${
                        plan.featured ? 'text-white/90' : 'text-ink'
                      }`}
                    >
                      <span className={plan.featured ? 'text-white' : 'text-blue'}>
                        <Tick />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-10">
                  <Link
                    href="/start-a-project"
                    className={`w-full ${plan.featured ? 'btn-secondary' : 'btn-primary'}`}
                  >
                    Get an instant estimate
                  </Link>
                </div>
              </div>
            </RevealAnimation>
          ))}
        </div>

        <RevealAnimation>
          <p className="mt-10 max-w-[56ch] font-sans text-sm leading-relaxed text-mid">
            Plans can be combined. Plenty of clients sit on Care for hosting and add Grow
            when they are ready to push. Prices are the starting point for a typical
            business, and we confirm the exact figure before anything begins.
          </p>
        </RevealAnimation>
      </Section>

      {/* ---------------- (c) One-off project prices ---------------- */}
      <Section bg="white" width="wide">
        <RevealAnimation>
          <h2 className="max-w-[18ch] text-5xl text-navy md:text-6xl">
            One-off builds.
          </h2>
          <p className="mt-7 max-w-[50ch] font-sans text-lg leading-relaxed text-mid">
            Starting prices for the things we get asked for most. The estimate tool turns
            these into a real number for your project.
          </p>
        </RevealAnimation>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <RevealAnimation>
            <div className="h-full rounded-card bg-blue-tint p-1">
              <PriceTable title="Build and technology" rows={BUILD_PRICES} />
            </div>
          </RevealAnimation>
          <RevealAnimation delay={1}>
            <div className="h-full rounded-card bg-blue-tint p-1">
              <PriceTable title="Marketing and automation" rows={MARKETING_PRICES} />
            </div>
          </RevealAnimation>
        </div>
      </Section>

      {/* ---------------- (d) What affects price ---------------- */}
      <Section bg="navy" width="default">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <RevealAnimation>
            <h2 className="max-w-[14ch] text-4xl text-white md:text-5xl">
              What moves the number.
            </h2>
          </RevealAnimation>

          <RevealAnimation delay={1}>
            <p className="font-sans text-base leading-relaxed text-white/75">
              A starting price is a starting price. What pushes it up is usually scope,
              deadline, or how much of the work is ours rather than yours. We agree all of
              it before we begin, and if something changes we tell you before it reaches
              the invoice.
            </p>
            <ul className="mt-8 flex flex-col gap-3">
              {FACTORS.map(f => (
                <li key={f} className="flex gap-3 font-sans text-sm leading-relaxed text-white/85">
                  <span className="text-blue">
                    <Tick />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </RevealAnimation>
        </div>
      </Section>

      {/* ---------------- (e) Testimonial ---------------- */}
      <Section bg="tint" width="default" tight>
        <RevealAnimation>
          {/* TODO: replace with a real client quote from lib/case-studies.ts */}
          <Testimonial
            quote={CASE_STUDIES[2].testimonial.quote}
            name={CASE_STUDIES[2].testimonial.name}
            role={CASE_STUDIES[2].testimonial.role}
            company={CASE_STUDIES[2].testimonial.company}
            size="inline"
            avatar
            isPlaceholder={CASE_STUDIES[2].isPlaceholder}
          />
        </RevealAnimation>
      </Section>

      {/* ---------------- (f) CTA band ---------------- */}
      <CTABand />
    </>
  )
}
