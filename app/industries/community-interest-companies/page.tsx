import type { Metadata } from 'next'
import Link from 'next/link'
import { Accessibility, PenLine, PoundSterling } from 'lucide-react'

import PlaceholderImage from '@/components/cic/PlaceholderImage'
import StatBand, { type Stat } from '@/components/cic/StatBand'
import Swoosh from '@/components/cic/Swoosh'

const CANONICAL = 'https://masuyodigital.com/industries/community-interest-companies'

export const metadata: Metadata = {
  // `absolute` because the root layout applies a '%s | Masuyo Digital' template
  // and the title below already carries the suffix.
  title: {
    absolute:
      'CIC Website Design | Websites for Community Interest Companies | Masuyo Digital',
  },
  description:
    'Website design for community interest companies. Built to evidence your impact for funders and commissioners, accessible to WCAG 2.2 AA, and costable into a funding bid. From £1,750.',
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: 'website',
    url: CANONICAL,
    siteName: 'Masuyo Digital',
    locale: 'en_GB',
    title: 'CIC Website Design | Websites for Community Interest Companies',
    description:
      'Website design for community interest companies. Built to evidence your impact for funders and commissioners, accessible to WCAG 2.2 AA, and costable into a funding bid. From £1,750.',
    images: [
      {
        url: '/images/cic/og-cic.jpg',
        width: 1200,
        height: 630,
        alt: 'Masuyo Digital website design for community interest companies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CIC Website Design | Websites for Community Interest Companies',
    description:
      'Website design for community interest companies. Built to evidence your impact, accessible to WCAG 2.2 AA, and costable into a funding bid. From £1,750.',
    images: ['/images/cic/og-cic.jpg'],
  },
}

/* Office of the Regulator of Community Interest Companies, Annual Report 2024 to 2025. */
const STATS: Stat[] = [
  { to: 37081, label: 'CICs on the register' },
  { to: 8376, label: 'registered last year, a record' },
  { to: 3832, label: 'dissolved in the same year' },
  { to: 22, suffix: '%', label: 'of the 2005 cohort still going' },
]

const TRUST = [
  { icon: Accessibility, text: 'WCAG 2.2 AA as standard' },
  { icon: PoundSterling, text: 'Costable into a funding bid' },
  { icon: PenLine, text: 'Your team can update it' },
]

export default function CommunityInterestCompaniesPage() {
  return (
    <>
      {/* ============================= HERO ============================= */}
      <section className="w-full bg-white pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-[55fr_45fr] lg:gap-16">
            {/* ---------- Left ---------- */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue">
                Masuyo for community interest companies
              </p>

              <h1
                className="mt-5 font-poppins font-bold leading-[1.05] tracking-tight text-navy"
                style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}
              >
                Website design for{' '}
                <span className="relative inline-block">
                  community interest companies
                  <Swoosh />
                </span>
              </h1>

              <p className="mt-7 max-w-[34ch] text-lg leading-relaxed text-mid">
                &ldquo;We do good work in the community&rdquo; is not evidence. Your website can be.
              </p>

              <p className="mt-4 max-w-[46ch] text-sm leading-relaxed text-mid">
                Built for the way CICs actually earn. Grants, contracts and traded income. Not
                donation buttons.
              </p>

              {/* ---------- CTAs ---------- */}
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/start-a-project"
                  className="inline-flex items-center justify-center rounded-lg bg-navy px-7 py-4 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
                >
                  Book a 20 minute call
                </Link>
                <a
                  href="#demo"
                  className="inline-flex items-center justify-center rounded-lg border border-navy px-7 py-4 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
                >
                  See a live example
                </a>
              </div>

              {/* ---------- Trust strip ---------- */}
              <ul className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-7 sm:gap-y-3">
                {TRUST.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-2 text-xs text-mid">
                    <Icon className="h-4 w-4 shrink-0 text-blue" strokeWidth={1.8} aria-hidden="true" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            {/* ---------- Right ---------- */}
            {/* Padded on the lower left so the floating card can sit outside the
                image bounds without being clipped or overlapping the viewport. */}
            <div className="relative pb-16 pl-0 sm:pb-0 sm:pl-6">
              <PlaceholderImage
                width={640}
                height={720}
                src="/images/cic/hero-delivery.jpg"
                alt="A community wellbeing session in progress"
                label="Community delivery in progress. Real people, mid-activity, not posed. Natural light, no stock smiles."
                className="rounded-2xl"
              />

              <div className="absolute bottom-0 left-0 w-[260px] rounded-xl bg-white p-5 shadow-xl ring-1 ring-border sm:-left-6 sm:-bottom-6">
                <p className="text-xs uppercase tracking-wider text-mid">On the register</p>
                <p className="mt-2 font-poppins text-[56px] font-bold leading-none tracking-tight text-navy">
                  37,081
                </p>
                <p className="mt-2 text-xs leading-snug text-mid">
                  community interest companies in the UK, up 12% in a year
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================== STAT BAND =========================== */}
      <StatBand
        stats={STATS}
        summary="The sector has never grown faster. It has also never closed faster. Both records were set in the same twelve months."
        caption="Office of the Regulator of Community Interest Companies, Annual Report 2024 to 2025"
      />
    </>
  )
}

/*
  Keyword placement, Phase 1:
  - "website design for community interest companies" appears in the H1, the meta
    title, the meta description and the first 100 words.
  - "CIC website design" appears in the meta title and the URL slug context.
  Remaining terms from Section C land in later phases: "community interest company
  website design", "social enterprise website design UK", "CIC web design",
  "impact report website", "accessible website design", "grant funded website",
  "not for profit website design".
*/
