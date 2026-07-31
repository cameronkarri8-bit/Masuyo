import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import Section from '@/components/Section'
import CTABand from '@/components/CTABand'
import ImagePlaceholder from '@/components/ImagePlaceholder'
import MiniEstimator from '@/components/home/MiniEstimator'

export const metadata: Metadata = {
  title: 'Masuyo Digital: we build digital things that actually work.',
  description:
    'Websites, marketing and software for growing businesses. Fair prices published up front, no jargon, no account managers. Websites from £249.',
  openGraph: {
    title: 'Masuyo Digital: we build digital things that actually work.',
    description:
      'Websites, marketing and software for growing businesses. Fair prices published up front, no jargon, no account managers.',
    url: 'https://masuyodigital.com',
  },
  alternates: { canonical: 'https://masuyodigital.com' },
}

/* TODO: replace with real client logos */
const CLIENT_LOGOS = [
  'PLACEHOLDER: client logo',
  'PLACEHOLDER: client logo',
  'PLACEHOLDER: client logo',
  'PLACEHOLDER: client logo',
  'PLACEHOLDER: client logo',
  'PLACEHOLDER: client logo',
]

const PILLARS = [
  {
    title: 'Websites',
    href: '/services/web-design',
    outcome: 'A site that loads fast, looks right on a phone and turns visitors into enquiries.',
    price: 'From £249',
    shot: 'PLACEHOLDER: website project shown on laptop and phone',
  },
  {
    title: 'Marketing and SEO',
    href: '/marketing',
    outcome: 'Get found by people already looking for what you sell. More enquiries, less guesswork.',
    price: 'From £199',
    shot: 'PLACEHOLDER: search results and analytics dashboard',
  },
  {
    title: 'Software and automation',
    href: '/technology/web-applications',
    outcome: 'The admin nobody wants to do, done without you. Built around how you actually work.',
    price: 'From £800',
    shot: 'PLACEHOLDER: custom dashboard or internal tool interface',
  },
  {
    title: 'Hosting and support',
    href: '/technology/hosting',
    outcome: 'Fast, secure, backed up, and someone who answers when you email. No surprise invoices.',
    price: 'From £40 per month',
    shot: 'PLACEHOLDER: uptime and performance monitoring screen',
  },
]

/*
  PLACEHOLDER CASE STUDIES. No client names, results or claims are invented here.
  Phase 4 replaces these with the real case study data.
*/
const FEATURED_WORK = [
  {
    sector: 'PLACEHOLDER: client type, for example independent retailer',
    result: 'PLACEHOLDER: one line result, supplied by client',
    shot: 'PLACEHOLDER: case study hero image',
  },
  {
    sector: 'PLACEHOLDER: client type, for example professional services',
    result: 'PLACEHOLDER: one line result, supplied by client',
    shot: 'PLACEHOLDER: case study hero image',
  },
  {
    sector: 'PLACEHOLDER: client type, for example membership organisation',
    result: 'PLACEHOLDER: one line result, supplied by client',
    shot: 'PLACEHOLDER: case study hero image',
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
      <Section bg="white" width="wide" tight>
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <RevealAnimation>
            <h1 className="max-w-[13ch] text-6xl text-navy md:text-7xl lg:text-8xl">
              We build digital things that actually work.
            </h1>
            <p className="mt-8 max-w-[46ch] font-sans text-lg leading-relaxed text-mid">
              Websites, marketing and software for growing businesses. Fair prices, no
              jargon, no account managers.
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

          <RevealAnimation delay={1}>
            <ImagePlaceholder
              aspect="4/3"
              label="PLACEHOLDER: homepage hero, screenshot collage of client websites on devices"
            />
          </RevealAnimation>
        </div>
      </Section>

      {/* ========================= 2. PROOF STRIP ========================= */}
      {/* TODO: replace with real client logos */}
      <Section bg="tint" width="wide" tight>
        <RevealAnimation>
          <p className="text-center font-sans text-xs font-semibold uppercase tracking-[0.14em] text-navy/50">
            Trusted by businesses across the UK
          </p>
          <ul className="mt-10 grid grid-cols-2 items-center gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {CLIENT_LOGOS.map((label, i) => (
              <li key={i}>
                <ImagePlaceholder aspect="5/2" label={label} />
              </li>
            ))}
          </ul>
        </RevealAnimation>
      </Section>

      {/* ======================= 3. ESTIMATE MODULE ======================= */}
      {/* The signature section of the site. */}
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

      {/* ====================== 4. WHY WE ARE CHEAP ====================== */}
      <Section bg="white" width="default">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <RevealAnimation>
            <h2 className="max-w-[12ch] text-5xl text-navy md:text-6xl">
              Small team. Senior people. Fair prices.
            </h2>
          </RevealAnimation>

          <RevealAnimation delay={1}>
            <div className="font-sans text-base leading-relaxed text-mid">
              <p>
                We are a small team of experts. No account managers, no offices, no bloat.
                That is why our prices look like a typo.
              </p>
              <p className="mt-5">
                There is nobody here billing you to forward an email. No junior learning on
                your budget. The person who scopes your project is the person who builds it.
              </p>
              <p className="mt-5">
                We also use modern tooling properly, which means a site that used to take
                six weeks takes two. We pass that on rather than pocketing it.
              </p>

              <dl className="mt-10 grid gap-px overflow-hidden rounded-card bg-border sm:grid-cols-3">
                <div className="bg-blue-tint p-6">
                  <dt className="font-sans text-xs font-medium text-mid">Websites</dt>
                  <dd className="mt-2 font-display text-3xl text-navy">from £249</dd>
                </div>
                <div className="bg-blue-tint p-6">
                  <dt className="font-sans text-xs font-medium text-mid">SEO setup</dt>
                  <dd className="mt-2 font-display text-3xl text-navy">from £199</dd>
                </div>
                <div className="bg-blue-tint p-6">
                  <dt className="font-sans text-xs font-medium text-mid">Growth retainers</dt>
                  <dd className="mt-2 font-display text-3xl text-navy">
                    from £499
                    <span className="font-sans text-sm text-mid"> per month</span>
                  </dd>
                </div>
              </dl>
            </div>
          </RevealAnimation>
        </div>
      </Section>

      {/* ========================= 5. WHAT WE DO ========================= */}
      <Section bg="tint" width="wide">
        <RevealAnimation>
          <h2 className="max-w-[14ch] text-5xl text-navy md:text-6xl">What we do.</h2>
        </RevealAnimation>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {PILLARS.map((p, i) => (
            <RevealAnimation key={p.href} delay={(i % 2) as 0 | 1}>
              <Link
                href={p.href}
                className="hover-lift group flex h-full flex-col overflow-hidden rounded-card bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
              >
                <ImagePlaceholder aspect="16/9" rounded={false} label={p.shot} />
                <div className="flex flex-1 flex-col p-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-3xl text-navy">{p.title}</h3>
                    <span className="whitespace-nowrap font-sans text-xs font-semibold uppercase tracking-wider text-blue2">
                      {p.price}
                    </span>
                  </div>
                  <p className="mt-4 font-sans text-base leading-relaxed text-mid">{p.outcome}</p>
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

      {/* ======================= 6. FEATURED WORK ======================= */}
      <Section bg="white" width="wide">
        <RevealAnimation>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-[14ch] text-5xl text-navy md:text-6xl">Recent work.</h2>
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-navy transition-colors hover:text-blue2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
            >
              See all work
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 7h8M7.5 4l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </RevealAnimation>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {FEATURED_WORK.map((w, i) => (
            <RevealAnimation key={i} delay={(i % 3) as 0 | 1 | 2}>
              <article className="hover-lift flex h-full flex-col overflow-hidden rounded-card bg-blue-tint">
                <ImagePlaceholder aspect="4/3" rounded={false} label={w.shot} />
                <div className="flex flex-1 flex-col p-7">
                  <p className="font-sans text-xs font-semibold uppercase tracking-wider text-blue2">
                    {w.sector}
                  </p>
                  <p className="mt-3 font-sans text-base leading-relaxed text-mid">{w.result}</p>
                </div>
              </article>
            </RevealAnimation>
          ))}
        </div>
      </Section>

      {/* ======================== 7. TESTIMONIAL ======================== */}
      <Section bg="navy" width="default">
        <RevealAnimation>
          <figure>
            <blockquote>
              {/*
                PLACEHOLDER TESTIMONIAL: replace with real client quote, name, company.
                Nothing here is attributed to a real person or business.
              */}
              <p className="max-w-[20ch] text-5xl text-white md:text-6xl">
                PLACEHOLDER TESTIMONIAL: replace with real client quote.
              </p>
            </blockquote>
            <figcaption className="mt-10 font-sans text-base text-white/60">
              PLACEHOLDER: client name, role, company
            </figcaption>
          </figure>
        </RevealAnimation>
      </Section>

      {/* ======================= 8. HOW IT WORKS ======================= */}
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

      {/* ========================= 9. CTA BAND ========================= */}
      <CTABand />
    </>
  )
}
