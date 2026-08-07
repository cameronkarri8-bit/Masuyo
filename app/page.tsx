import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import Section from '@/components/Section'
import CTABand from '@/components/CTABand'
import Hero from '@/components/home/Hero'
import ServiceImage from '@/components/ServiceImage'
import ClientPortalMockup from '@/components/placeholder/ClientPortalMockup'
import CommunityMockup from '@/components/placeholder/CommunityMockup'
import CrmMockup from '@/components/placeholder/CrmMockup'
import LearningMockup from '@/components/placeholder/LearningMockup'
import BespokeMockup from '@/components/placeholder/BespokeMockup'
import MiniEstimator from '@/components/home/MiniEstimator'
import { SERVICE_IMAGES } from '@/lib/images'

/*
  The homepage sells the offer, not a portfolio. There is no client logo strip,
  no case study grid and no testimonial, because we do not yet have the real
  material for any of them and invented proof is worse than none.

  Everything here is either a published price or a statement about how the work
  is actually done.
*/

export const metadata: Metadata = {
  title: 'Masuyo Digital: we build digital things that actually work.',
  description:
    'Websites, marketing and software for growing businesses. Fair prices published up front, no jargon, one senior person on every project. Websites from £249.',
  openGraph: {
    title: 'Masuyo Digital: we build digital things that actually work.',
    description:
      'Websites, marketing and software for growing businesses. Fair prices published up front, one senior person on every project.',
    url: 'https://masuyodigital.com',
  },
  alternates: { canonical: 'https://masuyodigital.com' },
}

/** Proof of substance rather than social proof. Every line is verifiable. */
const SUBSTANCE = [
  { label: 'Prices published up front', detail: 'Every figure is on the site' },
  { label: 'Live in 7 working days', detail: 'On our starter website' },
  { label: 'Hosted on our own servers', detail: 'Not resold, not white labelled' },
  { label: 'One senior person', detail: 'On your project start to finish' },
]

const SERVICES = [
  {
    title: 'Websites',
    image: SERVICE_IMAGES.websites,
    href: '/services/web-design',
    outcome: 'A site that loads fast, looks right on a phone and turns visitors into enquiries.',
    price: 'From £249',
  },
  {
    title: 'Marketing and SEO',
    image: SERVICE_IMAGES.marketing,
    href: '/marketing',
    outcome: 'Get found by people already looking for what you sell. More enquiries, less guesswork.',
    price: 'From £199',
  },
  {
    title: 'Software and automation',
    image: SERVICE_IMAGES.software,
    href: '/technology/web-applications',
    outcome: 'The admin nobody wants to do, done without you. Built around how you actually work.',
    price: 'From £800',
  },
  {
    title: 'Hosting and support',
    image: SERVICE_IMAGES.hosting,
    href: '/technology/hosting',
    outcome: 'Fast, secure, backed up, and someone who answers when you email. No surprise invoices.',
    price: 'From £40 per month',
  },
]

/* Starting prices trace to lib/pricing.ts, except the learning platform, which
   carries its own published pricing on its product page. */
const PRODUCTS = [
  {
    title: 'Client portal',
    href: '/products/client-portal',
    body: 'A private, branded space where your clients see their own documents, updates and progress.',
    price: 'From £2,200',
    Mockup: ClientPortalMockup,
  },
  {
    title: 'Community platform',
    href: '/products/community-platform',
    body: 'Members, discussion, gated content and events, on your domain rather than someone else’s.',
    price: 'From £2,200',
    Mockup: CommunityMockup,
  },
  {
    title: 'CRM and lead management',
    href: '/products/crm-lead-management',
    body: 'A system built around your pipeline, not one you have to bend your business to fit.',
    price: 'From £3,000',
    Mockup: CrmMockup,
  },
  {
    title: 'Learning platform',
    href: '/products/custom-learning-platform',
    body: 'Cohorts, progress tracking, certificates and payments into your own account.',
    price: 'From £3,000',
    Mockup: LearningMockup,
  },
  {
    title: 'Something bespoke',
    href: '/products/bespoke',
    body: 'When nothing off the shelf fits, we build the thing your business actually needs.',
    price: 'From £3,500',
    Mockup: BespokeMockup,
  },
]

/** The honest reason the prices are what they are. */
const WHY_LOWER = [
  {
    title: 'No account managers',
    body: 'Nobody is paid to sit between you and the work. You talk to the person building it.',
  },
  {
    title: 'No layers',
    body: 'No handover chains, no briefing documents passed around, nothing lost in translation.',
  },
  {
    title: 'No juniors on your budget',
    body: 'You are not funding somebody learning the job at your expense.',
  },
]

const STEPS = [
  {
    n: '01',
    title: 'Tell us what you need',
    body: 'A short conversation, or just use the estimate tool. Either way you get a real number, not a discovery call.',
  },
  {
    n: '02',
    title: 'We build it',
    body: 'You see it as it goes up. Most websites take two to four weeks. Bigger builds we scope properly first.',
  },
  {
    n: '03',
    title: 'You grow',
    body: 'Training, your logins, and support if you want it. The site is yours, not rented from us.',
  },
]

export default function HomePage() {
  return (
    <>
      {/* ============================ 1. HERO ============================ */}
      <Hero />

      {/* ====================== 2. WHAT YOU GET BAR ====================== */}
      <Section bg="tint" width="wide" tight>
        <RevealAnimation>
          <dl className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {SUBSTANCE.map(item => (
              <div key={item.label} className="border-t-2 border-blue pt-5">
                <dt className="font-sans text-base font-semibold text-navy">{item.label}</dt>
                <dd className="mt-2 font-sans text-sm leading-relaxed text-mid">{item.detail}</dd>
              </div>
            ))}
          </dl>
        </RevealAnimation>
      </Section>

      {/* ======================= 3. ESTIMATE MODULE ======================= */}
      {/* The single most important section on the site. */}
      <Section bg="blue" width="wide" id="estimate">
        <RevealAnimation>
          <div className="max-w-[46rem]">
            <h2 className="max-w-[18ch] text-5xl text-white md:text-6xl">
              Know the price before you talk to anyone.
            </h2>
            <p className="mt-8 max-w-[54ch] font-sans text-lg leading-relaxed text-white/85">
              Most agencies make you sit through a discovery call to find out whether you
              can afford them. We think that is a waste of your afternoon, so we publish
              everything.
            </p>
            <p className="mt-4 max-w-[54ch] font-sans text-base leading-relaxed text-white/70">
              Move the options below and watch the number change. No email, no form, no
              follow up sequence.
            </p>
          </div>
        </RevealAnimation>

        <div className="mt-14">
          <MiniEstimator />
        </div>
      </Section>

      {/* ========================= 4. WHAT WE DO ========================= */}
      <Section bg="white" width="wide">
        <RevealAnimation>
          <h2 className="max-w-[14ch] text-5xl text-navy md:text-6xl">What we do.</h2>
        </RevealAnimation>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {SERVICES.map((s, i) => (
            <RevealAnimation key={s.href} delay={(i % 2) as 0 | 1}>
              <Link
                href={s.href}
                className="hover-lift group flex h-full flex-col overflow-hidden rounded-card bg-blue-tint focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
              >
                <ServiceImage image={s.image} hover sizes="(min-width: 768px) 50vw, 100vw" />
                <div className="flex flex-1 flex-col p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-3xl text-navy">{s.title}</h3>
                    <span className="whitespace-nowrap font-sans text-xs font-semibold uppercase tracking-wider text-blue2">
                      {s.price}
                    </span>
                  </div>
                  <p className="mt-4 font-sans text-base leading-relaxed text-mid">{s.outcome}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-7 font-sans text-sm font-semibold text-navy transition-colors group-hover:text-blue2">
                    Have a look
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M3 7h8M7.5 4l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            </RevealAnimation>
          ))}
        </div>
      </Section>

      {/* ========================= 5. PRODUCTS ========================= */}
      <Section bg="tint" width="wide">
        <RevealAnimation>
          <h2 className="max-w-[18ch] text-5xl text-navy md:text-6xl">
            Things we have already built.
          </h2>
          <p className="mt-7 max-w-[52ch] font-sans text-lg leading-relaxed text-mid">
            These are working products, not concepts. Each one gets configured around your
            business rather than rebuilt from nothing, which is why they cost what they do.
          </p>
        </RevealAnimation>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <RevealAnimation key={p.href} delay={(i % 3) as 0 | 1 | 2}>
              <Link
                href={p.href}
                className="hover-lift group flex h-full flex-col overflow-hidden rounded-card bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
              >
                <p.Mockup aspect="16/9" rounded={false} />
                <div className="flex flex-1 flex-col p-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <h3 className="text-2xl text-navy">{p.title}</h3>
                    <span className="whitespace-nowrap font-sans text-xs font-semibold uppercase tracking-wider text-blue2">
                      {p.price}
                    </span>
                  </div>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-mid">{p.body}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 font-sans text-sm font-semibold text-navy transition-colors group-hover:text-blue2">
                    See what it does
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M3 7h8M7.5 4l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            </RevealAnimation>
          ))}
        </div>
      </Section>

      {/* =================== 6. WHY OUR PRICES ARE LOWER =================== */}
      <Section bg="navy" width="wide">
        <RevealAnimation>
          <h2 className="max-w-[20ch] text-5xl text-white md:text-6xl">
            One senior person builds your project, start to finish.
          </h2>
          <p className="mt-8 max-w-[56ch] font-sans text-lg leading-relaxed text-white/80">
            Trusted specialists come in when a job genuinely needs them. Nothing gets
            handed down a chain. That is why our prices are what they are, and it is an
            advantage rather than an apology.
          </p>
        </RevealAnimation>

        <div className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-3">
          {WHY_LOWER.map((w, i) => (
            <RevealAnimation key={w.title} delay={(i % 3) as 0 | 1 | 2}>
              <div className="border-t-2 border-blue pt-6">
                <h3 className="text-2xl text-white">{w.title}</h3>
                <p className="mt-3 font-sans text-base leading-relaxed text-white/70">{w.body}</p>
              </div>
            </RevealAnimation>
          ))}
        </div>
      </Section>

      {/* ======================= 7. HOW IT WORKS ======================= */}
      <Section bg="white" width="wide">
        <RevealAnimation>
          <h2 className="max-w-[14ch] text-5xl text-navy md:text-6xl">How it works.</h2>
        </RevealAnimation>

        <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {STEPS.map((s, i) => (
            <RevealAnimation key={s.n} delay={(i % 3) as 0 | 1 | 2}>
              <li className="border-t-2 border-blue pt-6">
                <span className="font-display text-5xl text-blue">{s.n}</span>
                <h3 className="mt-4 text-2xl text-navy">{s.title}</h3>
                <p className="mt-3 font-sans text-base leading-relaxed text-mid">{s.body}</p>
              </li>
            </RevealAnimation>
          ))}
        </ol>
      </Section>

      {/*
        TODO: confirm before launch. This names the sectors we work in. It is
        plain text with no logos and no client names, but it should still be
        checked against reality before it goes out to anyone.
      */}
      <Section bg="white" width="default" flush className="pb-16">
        <RevealAnimation>
          <p className="text-center font-sans text-base text-mid">
            We currently work with businesses across care, private membership and
            community sectors.
          </p>
        </RevealAnimation>
      </Section>

      {/* ========================= 9. CTA BAND ========================= */}
      <CTABand />
    </>
  )
}
