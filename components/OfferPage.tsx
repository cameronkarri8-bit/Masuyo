import Link from 'next/link'
import Image from 'next/image'
import RevealAnimation from '@/components/RevealAnimation'
import Section from '@/components/Section'
import CTABand from '@/components/CTABand'
import FaqAccordion, { type FaqItem } from '@/components/FaqAccordion'
import type { ServiceImage as ImageData } from '@/lib/images'

/**
 * The template every service and product page uses.
 *
 * The site sells on the offer rather than on a portfolio, so these pages carry
 * the weight. The section order is fixed on purpose: what it is, why it exists,
 * what you get, how it runs, what it costs, what it does not cover, then the
 * objections. The "not included" block is deliberate. It builds more trust than
 * anything else on the page, and it is the section a buyer checks first.
 */

export interface OfferPageProps {
  /** Small label above the headline. Sentence case. */
  eyebrow: string
  /** Outcome led, not feature led. */
  title: string
  /** One sentence. What the buyer ends up with. */
  lead: string
  /** Stated plainly in the hero, for example "From £2,200". */
  startingPrice: string
  /** Qualifies the price, for example "one-off build, VAT not charged". */
  priceNote: string
  /**
   * The hero photograph. OfferPage renders it rather than taking a ready made
   * node, so the treatment is identical on every page and the set cannot drift.
   * Omit it and the hero runs as a single column, which reads better than a
   * decorative filler where no useful image exists.
   */
  heroImage?: ImageData

  /**
   * `contained` sits the image beside the copy. `fullBleed` runs it behind the
   * whole hero with a scrim over it, matching the homepage.
   *
   * Full bleed only works when the photograph has a subject that survives being
   * darkened. On a dark image it reads as a flat field, so it is opt in per
   * page rather than the default.
   */
  heroLayout?: 'contained' | 'fullBleed'

  /** Two or three sentences of plain language. No accusations. */
  problem: string[]
  /** Overrides the default problem heading where a page needs its own. */
  problemHeading?: string

  /** Specific and itemised. Never vague benefit statements. */
  included: { title: string; body: string }[]

  /**
   * Deeper pages under this one. Only for hub pages. The links matter for
   * internal linking, so they are kept rather than flattened into the copy.
   */
  related?: { label: string; href: string; blurb: string }[]
  relatedHeading?: string

  /** The actual process, with a realistic timing on each step. */
  process: { title: string; body: string; timing: string }[]

  /** Real figures, taken from the published pricing. */
  cost: { label: string; price: string; detail: string }[]
  /** What pushes the number up or down. */
  costDrivers: string[]

  /** Stated honestly, so nobody buys the wrong thing. */
  notIncluded: string[]

  /** Three or four. The objections a buyer actually has. */
  faqs: FaqItem[]

  ctaHeadline: string
  ctaBody: string
}

function Tick() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="mt-1 flex-shrink-0"
    >
      <path
        d="M3 8.5l3 3 6.5-7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Cross() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="mt-1 flex-shrink-0"
    >
      <path
        d="M4 4l8 8M12 4l-8 8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function OfferPage({
  eyebrow,
  title,
  lead,
  startingPrice,
  priceNote,
  heroImage,
  heroLayout = 'contained',
  problem,
  problemHeading = 'The problem this solves',
  included,
  related,
  relatedHeading = 'Go deeper',
  process,
  cost,
  costDrivers,
  notIncluded,
  faqs,
  ctaHeadline,
  ctaBody,
}: OfferPageProps) {
  // Built from the same array the page renders, so the schema and the visible
  // section cannot drift apart.
  const fullBleed = heroLayout === 'fullBleed'
  // Narrowed rather than checked inline, so the image branch below is type safe.
  const showBeside = !fullBleed && heroImage !== undefined

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ---------------- 1. Hero ---------------- */}
      {/*
        Same frame, padding, content width and headline scale as the homepage
        hero, so the ten heroes read as one set. `id="site-hero"` is the handle
        Nav observes to swap to the white logo while it is over the hero.
      */}
      <section
        id="site-hero"
        className="hero-frame on-dark relative -mt-20 flex w-full items-center overflow-hidden bg-navy"
      >
        {fullBleed && heroImage !== undefined && (
          <>
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              priority
              sizes="100vw"
              className="hero-image object-cover"
            />
            <div aria-hidden="true" className="hero-scrim absolute inset-0" />
          </>
        )}

        <div className="relative mx-auto w-full max-w-7xl px-6 pb-10 pt-24 md:px-8">
          <div className={showBeside ? 'hero-grid' : ''}>
            {/*
              Capped at the same 34rem the homepage uses. In the grid the column
              is already that width, so this only bites on the full bleed
              layout, where an uncapped column would run the headline out past
              the scrim and lose its contrast on a wide screen.
            */}
            <div className="min-w-0 max-w-[34rem]">
              <RevealAnimation>
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.06em] text-blue">
                  {eyebrow}
                </p>
                <h1 className="mt-5 max-w-[15ch] text-white hero-display">{title}</h1>
                <p className="mt-6 max-w-[46ch] font-sans text-lg leading-relaxed text-white/80 sm:mt-8">
                  {lead}
                </p>
              </RevealAnimation>

              <RevealAnimation delay={1}>
                <p className="mt-8 font-display text-4xl text-white md:text-5xl">
                  {startingPrice}
                </p>
                <p className="mt-2 font-sans text-sm text-white/75">{priceNote}</p>
              </RevealAnimation>

              <RevealAnimation delay={2}>
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

            {showBeside && (
              <RevealAnimation delay={2}>
                {/*
                  Desktop only. Stacked under the copy on a phone it pushed the
                  hero to about 120vh against a 60vh target, so below the
                  breakpoint the hero is copy on navy, exactly as the homepage
                  is on a phone.
                */}
                <div className="relative hidden aspect-[16/9] w-full overflow-hidden rounded-card bg-navy/40 lg:block">
                  <Image
                    src={heroImage.src}
                    alt={heroImage.alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </RevealAnimation>
            )}
          </div>
        </div>
      </section>

      {/* ---------------- 2. The problem ---------------- */}
      <Section bg="white" width="default" tight>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1fr] lg:gap-20">
          <RevealAnimation>
            <h2 className="max-w-[16ch] text-4xl text-navy md:text-5xl">{problemHeading}</h2>
          </RevealAnimation>
          <RevealAnimation delay={1}>
            <div className="font-sans text-base leading-relaxed text-mid">
              {problem.map((p, i) => (
                <p key={p} className={i === 0 ? '' : 'mt-5'}>
                  {p}
                </p>
              ))}
            </div>
          </RevealAnimation>
        </div>
      </Section>

      {/* ---------------- 3. What is included ---------------- */}
      <Section bg="tint" width="wide">
        <RevealAnimation>
          <h2 className="max-w-[18ch] text-4xl text-navy md:text-5xl">What is included</h2>
          <p className="mt-6 max-w-[52ch] font-sans text-lg leading-relaxed text-mid">
            Everything below is in the price quoted above. Nothing here is an upsell
            waiting to appear on an invoice later.
          </p>
        </RevealAnimation>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {included.map((f, i) => (
            <RevealAnimation key={f.title} delay={(i % 3) as 0 | 1 | 2}>
              <div className="hover-lift flex h-full min-w-0 flex-col rounded-card bg-white p-7">
                <span className="text-blue2">
                  <Tick />
                </span>
                <h3 className="mt-4 text-xl text-navy">{f.title}</h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-mid">{f.body}</p>
              </div>
            </RevealAnimation>
          ))}
        </div>
      </Section>

      {/* ---------------- 3b. Deeper pages, hub pages only ---------------- */}
      {related !== undefined && related.length > 0 && (
        <Section bg="white" width="wide" tight>
          <RevealAnimation>
            <h2 className="max-w-[18ch] text-4xl text-navy md:text-5xl">{relatedHeading}</h2>
          </RevealAnimation>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {related.map((r, i) => (
              <RevealAnimation key={r.href} delay={(i % 3) as 0 | 1 | 2}>
                <Link
                  href={r.href}
                  className="hover-lift flex h-full min-w-0 flex-col rounded-card border border-border bg-white p-7 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
                >
                  <h3 className="text-xl text-navy">{r.label}</h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-mid">{r.blurb}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-blue2">
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
                  </span>
                </Link>
              </RevealAnimation>
            ))}
          </div>
        </Section>
      )}

      {/* ---------------- 4. How it works ---------------- */}
      <Section bg="white" width="wide">
        <RevealAnimation>
          <h2 className="max-w-[18ch] text-4xl text-navy md:text-5xl">How it works</h2>
          <p className="mt-6 max-w-[52ch] font-sans text-lg leading-relaxed text-mid">
            The timings are what we actually work to. If something is going to slip, you
            hear it from us before the date passes, not after.
          </p>
        </RevealAnimation>

        <ol className="mt-14 grid gap-10 md:grid-cols-2 md:gap-x-16">
          {process.map((s, i) => (
            <RevealAnimation key={s.title} delay={(i % 2) as 0 | 1}>
              <li className="min-w-0 border-t-2 border-blue pt-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <span className="font-display text-5xl text-blue">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-sans text-xs font-semibold uppercase tracking-wider text-mid">
                    {s.timing}
                  </span>
                </div>
                <h3 className="mt-4 text-2xl text-navy">{s.title}</h3>
                <p className="mt-3 font-sans text-base leading-relaxed text-mid">{s.body}</p>
              </li>
            </RevealAnimation>
          ))}
        </ol>
      </Section>

      {/* ---------------- 5. What it costs ---------------- */}
      <Section bg="navy" width="wide">
        <RevealAnimation>
          <h2 className="max-w-[18ch] text-4xl text-white md:text-5xl">What it costs</h2>
          <p className="mt-6 max-w-[52ch] font-sans text-lg leading-relaxed text-white/75">
            Real figures, published up front. You should not have to book a call to find
            out what something costs.
          </p>
        </RevealAnimation>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <RevealAnimation>
            <ul className="flex flex-col divide-y divide-white/10 border-y border-white/10">
              {cost.map(row => (
                <li key={row.label} className="min-w-0 py-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <span className="font-sans text-base font-semibold text-white">
                      {row.label}
                    </span>
                    <span className="whitespace-nowrap font-display text-2xl text-blue">
                      {row.price}
                    </span>
                  </div>
                  <p className="mt-2 max-w-[54ch] font-sans text-sm leading-relaxed text-white/60">
                    {row.detail}
                  </p>
                </li>
              ))}
            </ul>
          </RevealAnimation>

          <RevealAnimation delay={1}>
            <h3 className="text-2xl text-white">What changes the price</h3>
            <ul className="mt-6 flex flex-col gap-3">
              {costDrivers.map(d => (
                <li
                  key={d}
                  className="flex gap-3 font-sans text-sm leading-relaxed text-white/85"
                >
                  <span className="text-blue">
                    <Tick />
                  </span>
                  {d}
                </li>
              ))}
            </ul>
            <Link href="/start-a-project" className="btn-primary mt-9 inline-flex">
              Build your estimate
            </Link>
            <p className="mt-4 max-w-[40ch] font-sans text-sm text-white/60">
              About a minute, no email required, and it gives you a real number rather
              than a range.
            </p>
          </RevealAnimation>
        </div>
      </Section>

      {/* ---------------- 6. What is not included ---------------- */}
      <Section bg="white" width="default">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
          <RevealAnimation>
            <h2 className="max-w-[16ch] text-4xl text-navy md:text-5xl">
              What is not included
            </h2>
            <p className="mt-6 max-w-[42ch] font-sans text-base leading-relaxed text-mid">
              Everything below is either out of scope or priced separately. We would
              rather you knew now than found out at the invoice.
            </p>
          </RevealAnimation>

          <RevealAnimation delay={1}>
            <ul className="flex flex-col divide-y divide-border border-y border-border">
              {notIncluded.map(item => (
                <li
                  key={item}
                  className="flex gap-3 py-4 font-sans text-base leading-relaxed text-ink"
                >
                  <span className="text-mid">
                    <Cross />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </RevealAnimation>
        </div>
      </Section>

      {/* ---------------- 7. Questions ---------------- */}
      <Section bg="tint" width="narrow">
        <RevealAnimation>
          <h2 className="max-w-[18ch] text-4xl text-navy md:text-5xl">
            Questions people actually ask
          </h2>
        </RevealAnimation>
        <RevealAnimation delay={1}>
          <div className="mt-10">
            <FaqAccordion items={faqs} />
          </div>
        </RevealAnimation>
      </Section>

      {/* ---------------- 8. CTA ---------------- */}
      <CTABand headline={ctaHeadline} body={ctaBody} />
    </>
  )
}
