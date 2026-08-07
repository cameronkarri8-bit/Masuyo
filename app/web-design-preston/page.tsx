import type { Metadata } from 'next'
import Link from 'next/link'
import { MonitorSmartphone, RefreshCw, ShoppingCart, Search } from 'lucide-react'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'
import ProductGrid from '@/components/ProductGrid'
import PrestonMap from '@/components/preston/PrestonMap'

/*
  Local SEO landing page for Preston.

  Every figure here traces to lib/pricing.ts. Nothing is rounded, averaged or
  invented, and the ranges in section 7 are shown with their arithmetic so they
  can be checked against the estimate builder.

  No client is named or implied anywhere on this page, in Preston or otherwise,
  because there are none to name. There is deliberately no case studies section
  for the same reason.

  Deliberately out of the main navigation. It is reachable from the footer, and
  it is in the sitemap, so it is crawlable without cluttering the nav.
*/

export const metadata: Metadata = {
  // Absolute, so the root layout does not append its own suffix on top.
  title: { absolute: 'Web Design Preston | Websites Built to Win Enquiries' },
  description:
    'Web design and development for Preston and Lancashire businesses. Fast, modern sites built to bring in enquiries, not just look good. Every price published up front.',
  openGraph: {
    // Absolute, so the root layout does not append its own suffix on top.
  title: { absolute: 'Web Design Preston | Websites Built to Win Enquiries' },
    description:
      'Web design and development for Preston and Lancashire businesses. Fast, modern sites built to bring in enquiries, not just look good. Every price published up front.',
    url: 'https://masuyodigital.com/web-design-preston',
  },
  alternates: { canonical: 'https://masuyodigital.com/web-design-preston' },
}

/* --- Figures, all from lib/pricing.ts --------------------------------------- */

const PRICE = {
  newWebsite: '£249', // PROJECT_TYPES new-website
  redesign: '£349', // PROJECT_TYPES website-redesign
  webApp: '£3,500', // PROJECT_TYPES web-application
  cms: '£150', // FEATURES cms-blog
  ecommerce: '£400', // FEATURES ecommerce
  booking: '£250', // FEATURES booking
  payment: '£200', // FEATURES payment
  seoSetup: '£199', // MARKETING_GROWTH seo-setup
  hosting: '£40', // PROJECT_TYPES hosting, monthly
}

const TRUST = [
  'Every price published up front',
  'Starter sites live in 7 working days',
  'No monthly lock in',
  'You own everything, including the code',
]

const SERVICES = [
  {
    Icon: MonitorSmartphone,
    title: 'Website design and build',
    price: `From ${PRICE.newWebsite}`,
    body: 'A new site built around what you actually sell. Modern technology rather than a page builder, so it loads fast and ranks well. Starter sites go live in 7 working days.',
    href: '/services/web-design',
    schemaName: 'Website design and build',
    schemaPrice: '249',
  },
  {
    Icon: RefreshCw,
    title: 'Website redesign',
    price: `From ${PRICE.redesign}`,
    body: 'You have a site, it just is not working. We keep what is worth keeping, fix the structure, and rebuild the parts losing you enquiries.',
    href: '/services/web-design',
    schemaName: 'Website redesign',
    schemaPrice: '349',
  },
  {
    Icon: ShoppingCart,
    title: 'Ecommerce and booking',
    price: `From ${PRICE.booking}`,
    body: 'Online shops, appointment booking, member areas and payments. Built so you can run it yourself rather than ringing a developer every time something changes.',
    href: '/technology/ecommerce',
    schemaName: 'Ecommerce and booking systems',
    schemaPrice: '250',
  },
  {
    Icon: Search,
    title: 'SEO and local search',
    price: `From ${PRICE.seoSetup}`,
    body: 'Getting found when someone in Preston searches for what you do. Technical setup, Google Business Profile, and content that answers what people are actually typing.',
    href: '/marketing/seo',
    schemaName: 'SEO and local search',
    schemaPrice: '199',
  },
]

const STEPS = [
  {
    title: 'Get a real number',
    body: 'Use the estimate tool and you have a price in two minutes. No form, no email, no discovery call. If you would rather talk it through, we are happy to.',
  },
  {
    title: 'Fixed quote',
    body: 'You get a written price and a delivery date before any work starts. It does not move unless you change the scope.',
  },
  {
    title: 'Build',
    body: 'You see progress on a live preview link as it goes up. A round of revisions is included as standard.',
  },
  {
    title: 'Launch and handover',
    body: 'We sort the domain setup, launch and Search Console, and hand you access to everything including the code. Hosting with us is optional, not a condition.',
  },
]

const ADD_ONS = [
  { label: 'Content management system', price: `+${PRICE.cms}`, note: 'Edit pages and publish posts yourself' },
  { label: 'Ecommerce shop', price: `+${PRICE.ecommerce}`, note: 'Products, checkout and stock' },
  { label: 'Booking or appointments', price: `+${PRICE.booking}`, note: 'Customers schedule directly on the site' },
  { label: 'Payment gateway', price: `+${PRICE.payment}`, note: 'Card and wallet payments into your own account' },
  { label: 'SEO setup', price: `+${PRICE.seoSetup}`, note: 'Metadata, sitemap, schema and Search Console' },
]

const WHY = [
  {
    title: 'One person builds it',
    body: 'One senior person start to finish, with specialists brought in when a job genuinely needs them. No account managers, no handovers, no explaining yourself twice.',
  },
  {
    title: 'The price is the price',
    body: 'Published up front and fixed before we start. It only changes if you change the scope.',
  },
  {
    title: 'You own everything',
    body: 'The domain, the hosting account, the code. If you ever want to move on, nothing is held hostage.',
  },
  {
    title: 'Built to be fast',
    body: 'Modern frameworks rather than stacked plugins, which means better load times and better rankings.',
  },
]

const FAQS = [
  {
    q: 'How much does web design cost in Preston?',
    a: `A starter website is ${PRICE.newWebsite} and a redesign of an existing site starts at ${PRICE.redesign}. Adding a booking system takes a typical site to between £499 and £849, and adding a shop takes it to between £849 and £1,199. Larger web applications start at ${PRICE.webApp}. Every one of those figures is published on the site, and the estimate tool gives you a number in two minutes without a form or an email address.`,
  },
  {
    q: 'Do you have an office in Preston?',
    a: 'No. We work remotely from Hertford with businesses across the UK. That keeps costs lower and means you deal directly with the person building your site rather than a sales office.',
  },
  {
    q: 'How long does a website take to build?',
    a: 'Starter sites go live in 7 working days. Most other websites take two to four weeks. Bigger builds get scoped properly first, and you get the timeline before you commit.',
  },
  {
    q: 'Will I be able to update the website myself?',
    a: 'Yes. Sites are built with a content management system so you can edit text, images and pages without a developer. We walk you through it at handover.',
  },
  {
    q: 'Do you build online shops?',
    a: 'Yes. Ecommerce with payments, stock and delivery options, set up so you can run it yourself. Pricing for that is published on the site.',
  },
  {
    q: 'Do you do SEO as well as design?',
    a: 'Yes. Technical SEO is built into every site as standard. Ongoing SEO and content work is available separately.',
  },
  {
    q: 'What if I already have a website?',
    a: 'We will look at it and tell you honestly whether it needs rebuilding or just fixing. Plenty of sites only need structural changes.',
  },
]

const AREAS =
  'Preston, Fulwood, Penwortham, Bamber Bridge, Leyland, Longridge, Chorley, Lytham St Annes, Blackpool, Blackburn, Lancaster and the wider Lancashire area.'

/* --- Small pieces ----------------------------------------------------------- */

function Tick() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      className="mt-0.5 flex-shrink-0 text-blue"
    >
      <path
        d="M3 9.5l4 4 8-9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Horizontal timeline. Vector rather than an image, so it costs nothing to load. */
function Timeline() {
  const X = [80, 280, 480, 680]
  return (
    <svg
      viewBox="0 0 760 60"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className="h-auto w-full"
    >
      <line x1="80" y1="30" x2="680" y2="30" stroke="#1A2939" strokeOpacity="0.14" strokeWidth="2" />
      {X.map((x, i) => (
        <g key={x}>
          {i < X.length - 1 && (
            <line x1={x} y1="30" x2={X[i + 1]} y2="30" stroke="#35ADDF" strokeOpacity="0.35" strokeWidth="2" />
          )}
          <circle cx={x} cy="30" r="18" fill="#35ADDF" fillOpacity="0.12" />
          <circle cx={x} cy="30" r="11" fill="#1A2939" />
          <text
            x={x}
            y="35"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="12"
            fontWeight="700"
            fontFamily="var(--font-geist), system-ui, sans-serif"
          >
            {i + 1}
          </text>
        </g>
      ))}
    </svg>
  )
}

/* --- Page ------------------------------------------------------------------- */

export default function WebDesignPrestonPage() {
  /*
    Schema is built from the same arrays the page renders, so the markup and the
    visible content cannot drift apart.

    The address is Hertford only. No street address is published anywhere on the
    site, so only the locality is asserted, and nothing here implies a Preston
    address. areaServed carries Preston and Lancashire instead.
  */
  const professionalService = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Masuyo Digital',
    url: 'https://masuyodigital.com/web-design-preston',
    description:
      'Web design and development for Preston and Lancashire businesses. Fast, modern sites built to bring in enquiries, not just look good. Every price published up front.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hertford',
      addressRegion: 'Hertfordshire',
      addressCountry: 'GB',
    },
    areaServed: [
      { '@type': 'City', name: 'Preston' },
      { '@type': 'AdministrativeArea', name: 'Lancashire' },
    ],
    priceRange: '££',
  }

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://masuyodigital.com' },
      // No locations index exists yet, so this rung carries a name only.
      { '@type': 'ListItem', position: 2, name: 'Locations' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Preston',
        item: 'https://masuyodigital.com/web-design-preston',
      },
    ],
  }

  const services = SERVICES.map(s => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.schemaName,
    serviceType: s.schemaName,
    provider: { '@type': 'ProfessionalService', name: 'Masuyo Digital' },
    areaServed: [
      { '@type': 'City', name: 'Preston' },
      { '@type': 'AdministrativeArea', name: 'Lancashire' },
    ],
    offers: {
      '@type': 'Offer',
      price: s.schemaPrice,
      priceCurrency: 'GBP',
      url: `https://masuyodigital.com${s.href}`,
    },
  }))

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(services) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />

      {/* ==================== 1. Hero ==================== */}
      {/*
        Same frame, padding, column width and headline scale as every OfferPage
        hero. `id="site-hero"` is what Nav observes to overlay in white.
      */}
      <section
        id="site-hero"
        className="hero-frame on-dark relative -mt-20 flex w-full items-center overflow-hidden bg-navy"
      >
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-10 pt-24 md:px-8">
          <div className="hero-grid">
            <div className="min-w-0 max-w-[34rem]">
              <RevealAnimation>
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.06em] text-blue">
                  Preston
                </p>
                <h1 className="mt-5 max-w-[15ch] text-white hero-display">
                  Web design in Preston that brings in enquiries
                </h1>
                <p className="preston-body mt-6 max-w-[46ch] font-sans text-white sm:mt-8">
                  Most Preston businesses have a website that just sits there. We build ones
                  that do a job.
                </p>
                <p className="preston-body mt-4 max-w-[46ch] font-sans text-white/80">
                  Fast, modern, properly built sites for businesses across Preston and
                  Lancashire. Every price is published before we start.
                </p>
              </RevealAnimation>

              <RevealAnimation delay={1}>
                <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row">
                  <Link href="/start-a-project" className="btn-primary">
                    Get an instant estimate
                  </Link>
                  <Link href="/contact" className="btn-secondary">
                    Talk to us
                  </Link>
                </div>
              </RevealAnimation>
            </div>

            <RevealAnimation delay={2}>
              <div className="mt-12 lg:mt-0">
                <PrestonMap />
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* ==================== 2. Trust strip ==================== */}
      <section className="w-full bg-white py-12 md:py-14">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-5 lg:grid-cols-4">
            {TRUST.map(item => (
              <li key={item} className="preston-body flex gap-3 font-sans text-ink">
                <Tick />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ==================== 3. The problem ==================== */}
      <section className="w-full bg-[#f5f4f2] py-20 md:py-28">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
            <RevealAnimation>
              <h2 className="max-w-[16ch] text-4xl text-navy md:text-5xl">
                Your website is probably costing you work
              </h2>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <div className="preston-body max-w-[60ch] font-sans text-mid">
                <p>
                  Most small business websites in Preston fall into one of three camps. Built
                  years ago and never touched since. Put together on a template that loads
                  slowly on a phone. Or handed to a developer who has since gone quiet.
                </p>
                <p className="mt-5">
                  All three have the same result. Someone searches, lands on your site, and
                  leaves before they get anywhere near enquiring.
                </p>
                <p className="mt-5">
                  The fix is rarely a rebuild of everything. It is usually clearer
                  positioning, faster load times, and making it obvious what a visitor should
                  do next.
                </p>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* ==================== 4. What we build ==================== */}
      <section className="w-full bg-white py-20 md:py-28">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
          <RevealAnimation>
            <h2 className="max-w-[20ch] text-4xl text-navy md:text-5xl">
              What we build for Preston businesses
            </h2>
          </RevealAnimation>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {SERVICES.map((s, i) => (
              <RevealAnimation key={s.title} delay={(i % 2) as 0 | 1}>
                <div className="flex h-full min-w-0 flex-col rounded-[18px] bg-white p-8 shadow-[0_2px_18px_rgba(26,41,57,0.08)]">
                  <s.Icon size={26} strokeWidth={1.6} aria-hidden="true" className="text-blue" />
                  <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-2xl text-navy">{s.title}</h3>
                    <span className="whitespace-nowrap font-sans text-xs font-semibold uppercase tracking-wider text-blue2">
                      {s.price}
                    </span>
                  </div>
                  <p className="preston-body mt-4 font-sans text-mid">{s.body}</p>
                  <Link
                    href={s.href}
                    className="mt-auto inline-flex items-center gap-1.5 pt-6 font-sans text-sm font-semibold text-navy transition-colors hover:text-blue2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
                  >
                    Read more
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path
                        d="M3 7h8M7.5 4l3 3-3 3"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 5. Local relevance ==================== */}
      <section className="w-full bg-[#f5f4f2] py-20 md:py-28">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
            <RevealAnimation>
              <h2 className="max-w-[18ch] text-4xl text-navy md:text-5xl">
                Working with businesses across Preston and Lancashire
              </h2>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <div className="preston-body max-w-[60ch] font-sans text-mid">
                <p>
                  Preston has a strong base of professional services, trades, healthcare and
                  manufacturing supply businesses. A lot of them compete on reputation rather
                  than price. That changes what your website needs to do.
                </p>
                <p className="mt-5">
                  It is less about volume traffic and more about convincing the right person
                  that you are the safe choice. That means clear proof, straight pricing, and
                  a site that loads before someone gives up on it.
                </p>
                <p className="mt-5">
                  We work remotely from Hertford with businesses across the UK. That is
                  deliberate, and it is why the prices are what they are. You deal directly
                  with the person building your site rather than a local sales office that
                  passes the work somewhere else.
                </p>
                <p className="mt-8 font-sans text-sm leading-relaxed text-mid">
                  <span className="font-semibold text-navy">Areas we cover:</span> {AREAS}
                </p>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* ==================== 6. How it works ==================== */}
      <section className="w-full bg-white py-20 md:py-28">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
          <RevealAnimation>
            <h2 className="max-w-[16ch] text-4xl text-navy md:text-5xl">How it works</h2>
          </RevealAnimation>

          <div className="mt-12 hidden md:block">
            <Timeline />
          </div>

          <ol className="mt-10 grid gap-8 md:mt-8 md:grid-cols-4 md:gap-6">
            {STEPS.map((s, i) => (
              <RevealAnimation key={s.title} delay={(i % 2) as 0 | 1}>
                <li className="min-w-0 border-t-2 border-blue pt-5 md:border-t-0 md:pt-0">
                  <span className="font-display text-3xl text-blue md:hidden">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-2 text-xl text-navy md:mt-0">{s.title}</h3>
                  <p className="preston-body mt-3 font-sans text-mid">{s.body}</p>
                </li>
              </RevealAnimation>
            ))}
          </ol>
        </div>
      </section>

      {/* ==================== 7. What it costs ==================== */}
      <section className="w-full bg-[#f5f4f2] py-20 md:py-28">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
          <RevealAnimation>
            <h2 className="max-w-[20ch] text-4xl text-navy md:text-5xl">
              What a website costs in Preston
            </h2>
            <p className="preston-body mt-6 max-w-[54ch] font-sans text-mid">
              Most agencies will not put a number on a page. Every one of ours is published.
            </p>
          </RevealAnimation>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
            <RevealAnimation>
              <ul className="flex flex-col divide-y divide-border border-y border-border">
                {[
                  { label: 'Starter website', price: PRICE.newWebsite, note: 'Live in 7 working days' },
                  { label: 'Website redesign', price: PRICE.redesign, note: 'Rebuild of an existing site' },
                  { label: 'Web application', price: `From ${PRICE.webApp}`, note: 'Portals, dashboards and internal tools' },
                ].map(row => (
                  <li key={row.label} className="min-w-0 py-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <span className="font-sans text-base font-semibold text-navy">
                        {row.label}
                      </span>
                      <span className="whitespace-nowrap font-display text-2xl text-navy">
                        {row.price}
                      </span>
                    </div>
                    <p className="mt-1 font-sans text-sm text-mid">{row.note}</p>
                  </li>
                ))}
              </ul>

              <h3 className="mt-10 text-xl text-navy">Common add-ons</h3>
              <ul className="mt-4 flex flex-col divide-y divide-border border-y border-border">
                {ADD_ONS.map(row => (
                  <li key={row.label} className="min-w-0 py-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <span className="font-sans text-sm text-ink">{row.label}</span>
                      <span className="whitespace-nowrap font-sans text-sm font-semibold text-blue2">
                        {row.price}
                      </span>
                    </div>
                    <p className="mt-1 font-sans text-xs text-mid">{row.note}</p>
                  </li>
                ))}
              </ul>
            </RevealAnimation>

            <RevealAnimation delay={1}>
              <div className="rounded-[18px] bg-white p-8 shadow-[0_2px_18px_rgba(26,41,57,0.08)]">
                <h3 className="text-xl text-navy">What that adds up to</h3>
                <div className="preston-body mt-4 font-sans text-mid">
                  <p>
                    A site with booking on top typically lands between £499 and £849. That is
                    the {PRICE.newWebsite} starter plus {PRICE.booking} for booking at the
                    lower end, and the same with a content management system and a larger
                    page count at the upper end.
                  </p>
                  <p className="mt-5">
                    A site with a shop typically lands between £849 and £1,199. That is the
                    starter plus {PRICE.ecommerce} for the shop and {PRICE.payment} for the
                    payment gateway, again with the content management system and a larger
                    page count at the top of the range.
                  </p>
                  <p className="mt-5">
                    Support and hosting is optional and starts at {PRICE.hosting} a month. If
                    you would rather manage it yourself, that is fine, and we will show you
                    how.
                  </p>
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="/start-a-project" className="btn-primary">
                    Get an instant estimate
                  </Link>
                </div>
                <p className="mt-5 font-sans text-sm text-mid">
                  Every figure on this page is on the{' '}
                  <Link
                    href="/pricing"
                    className="font-semibold text-blue2 underline underline-offset-2 hover:text-navy"
                  >
                    pricing page
                  </Link>{' '}
                  too, alongside{' '}
                  <Link
                    href="/technology/hosting"
                    className="font-semibold text-blue2 underline underline-offset-2 hover:text-navy"
                  >
                    what hosting covers
                  </Link>
                  .
                </p>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* ==================== 8. Things we have already built ==================== */}
      <section className="w-full bg-white py-20 md:py-28">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
          <RevealAnimation>
            <h2 className="max-w-[18ch] text-4xl text-navy md:text-5xl">
              Things we have already built
            </h2>
            <p className="preston-body mt-6 max-w-[56ch] font-sans text-mid">
              These are working products, not concepts. Each one gets configured around your
              business rather than rebuilt from nothing, which is why they cost what they do.
            </p>
          </RevealAnimation>
          <ProductGrid />
        </div>
      </section>

      {/* ==================== 9. Why businesses choose us ==================== */}
      <section className="w-full bg-[#f5f4f2] py-20 md:py-28">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
          <RevealAnimation>
            <h2 className="max-w-[20ch] text-4xl text-navy md:text-5xl">
              Why businesses choose Masuyo Digital
            </h2>
          </RevealAnimation>

          <div className="mt-12 grid gap-x-16 gap-y-10 md:grid-cols-2">
            {WHY.map((w, i) => (
              <RevealAnimation key={w.title} delay={(i % 2) as 0 | 1}>
                <div className="min-w-0">
                  <h3 className="text-xl text-navy">{w.title}</h3>
                  <p className="preston-body mt-3 max-w-[52ch] font-sans text-mid">{w.body}</p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 10. FAQ ==================== */}
      {/*
        Open text rather than an accordion. The pricing answer is the reason this
        page exists, so it should not be one tap away on a phone.
      */}
      <section className="w-full bg-white py-20 md:py-28">
        <div className="mx-auto w-full max-w-3xl px-6 md:px-8">
          <RevealAnimation>
            <h2 className="max-w-[18ch] text-4xl text-navy md:text-5xl">
              Questions people actually ask
            </h2>
          </RevealAnimation>

          <dl className="mt-12 flex flex-col divide-y divide-border border-y border-border">
            {FAQS.map((item, i) => (
              <RevealAnimation key={item.q} delay={(i % 2) as 0 | 1}>
                <div className="py-7">
                  <dt className="font-sans text-lg font-semibold text-navy">{item.q}</dt>
                  <dd className="preston-body mt-3 font-sans text-mid">{item.a}</dd>
                </div>
              </RevealAnimation>
            ))}
          </dl>
        </div>
      </section>

      {/* ==================== 11. Final CTA ==================== */}
      <CTABand
        headline="Let's talk about your website"
        body="You can get a price in two minutes without speaking to anyone. If you would rather have a conversation first, that is fine too."
      />
    </>
  )
}
