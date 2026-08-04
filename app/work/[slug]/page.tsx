import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import RevealAnimation from '@/components/RevealAnimation'
import Section from '@/components/Section'
import CTABand from '@/components/CTABand'
import BrowserMockup from '@/components/placeholder/BrowserMockup'
import Testimonial from '@/components/Testimonial'
import CaseStudyCard from '@/components/CaseStudyCard'
import { CASE_STUDIES, getCaseStudy } from '@/lib/case-studies'

export function generateStaticParams() {
  return CASE_STUDIES.map(study => ({ slug: study.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const study = getCaseStudy(params.slug)
  if (!study) return {}

  const title = `${study.client}, ${study.industry}`
  const url = `https://masuyodigital.com/work/${study.slug}`

  return {
    title,
    description: study.summary,
    openGraph: { title: `${title} | Masuyo Digital`, description: study.summary, url },
    alternates: { canonical: url },
    // Placeholder entries are kept out of the index until the content is real.
    robots: study.isPlaceholder ? { index: false, follow: true } : undefined,
  }
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = getCaseStudy(params.slug)
  if (!study) notFound()

  const others = CASE_STUDIES.filter(c => c.slug !== study.slug).slice(0, 2)
  const [hero, ...rest] = study.images

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <Section bg="white" width="wide" tight>
        <RevealAnimation>
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-mid transition-colors hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M11 7H3M6.5 4l-3 3 3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All work
          </Link>

          {study.isPlaceholder && (
            /* TODO: remove once this entry holds real, client approved content */
            <div className="mt-8 max-w-[54ch] rounded-card border-l-4 border-amber bg-blue-tint p-6">
              <p className="font-sans text-sm font-semibold text-navy">
                This is a placeholder case study.
              </p>
              <p className="mt-2 font-sans text-sm leading-relaxed text-mid">
                The client, figures and quote below are not real. They show the shape of
                the page while we wait for approved content.
              </p>
            </div>
          )}

          <p className="mt-10 font-sans text-xs font-semibold uppercase tracking-[0.06em] text-blue2">
            {study.industry}
          </p>
          <h1 className="mt-5 max-w-[16ch] text-6xl text-navy md:text-7xl">{study.client}</h1>
          <p className="mt-8 max-w-[52ch] font-sans text-lg leading-relaxed text-mid">
            {study.summary}
          </p>

          <ul className="mt-8 flex flex-wrap gap-2">
            {study.services.map(s => (
              <li
                key={s}
                className="rounded-full bg-blue-tint px-4 py-1.5 font-sans text-xs font-medium text-navy"
              >
                {s}
              </li>
            ))}
          </ul>
        </RevealAnimation>

        <RevealAnimation delay={1}>
          <div className="mt-14">
            <BrowserMockup aspect={hero.aspect} variant={CASE_STUDIES.findIndex(c => c.slug === study.slug)} />
          </div>
        </RevealAnimation>
      </Section>

      {/* ---------------- Problem and approach ---------------- */}
      <Section bg="tint" width="default">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <RevealAnimation>
            <h2 className="text-4xl text-navy md:text-5xl">The problem</h2>
            <p className="mt-7 font-sans text-base leading-relaxed text-mid">{study.problem}</p>
          </RevealAnimation>

          <RevealAnimation delay={1}>
            <h2 className="text-4xl text-navy md:text-5xl">What we did</h2>
            <ul className="mt-7 flex flex-col gap-4">
              {study.approach.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="font-display text-2xl leading-none text-blue">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-sans text-base leading-relaxed text-mid">{step}</span>
                </li>
              ))}
            </ul>
          </RevealAnimation>
        </div>
      </Section>

      {/* ---------------- Results ---------------- */}
      <Section bg="navy" width="default">
        <RevealAnimation>
          <h2 className="text-4xl text-white md:text-5xl">The results</h2>
        </RevealAnimation>

        <dl className="mt-14 grid gap-10 sm:grid-cols-3">
          {study.results.map((r, i) => (
            <RevealAnimation key={i} delay={(i % 3) as 0 | 1 | 2}>
              <div className="border-t-2 border-blue pt-6">
                <dt className="sr-only">{r.label}</dt>
                <dd>
                  <span className="block font-display text-6xl leading-none text-white">
                    {r.metric}
                  </span>
                  <span className="mt-4 block font-sans text-sm leading-relaxed text-white/60">
                    {r.label}
                  </span>
                </dd>
              </div>
            </RevealAnimation>
          ))}
        </dl>
      </Section>

      {/* ---------------- Supporting imagery ---------------- */}
      {rest.length > 0 && (
        <Section bg="white" width="wide">
          <div className="grid gap-5 md:grid-cols-2">
            {rest.map((img, i) => (
              <RevealAnimation key={i} delay={(i % 2) as 0 | 1}>
                <BrowserMockup aspect={img.aspect} variant={i + 3} />
              </RevealAnimation>
            ))}
          </div>
        </Section>
      )}

      {/* ---------------- Testimonial ---------------- */}
      <Section bg="tint" width="default">
        <RevealAnimation>
          <Testimonial
            quote={study.testimonial.quote}
            name={study.testimonial.name}
            role={study.testimonial.role}
            company={study.testimonial.company}
            avatar
            isPlaceholder={study.isPlaceholder}
          />
        </RevealAnimation>
      </Section>

      {/* ---------------- More work ---------------- */}
      {others.length > 0 && (
        <Section bg="white" width="wide">
          <RevealAnimation>
            <h2 className="text-4xl text-navy md:text-5xl">More work.</h2>
          </RevealAnimation>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {others.map((o, i) => (
              <RevealAnimation key={o.slug} delay={(i % 2) as 0 | 1}>
                <CaseStudyCard study={o} on="white" variant={i + 2} />
              </RevealAnimation>
            ))}
          </div>
        </Section>
      )}

      <CTABand />
    </>
  )
}
