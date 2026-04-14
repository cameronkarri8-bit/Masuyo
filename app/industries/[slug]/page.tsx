import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'
import { industries, getIndustryBySlug } from '@/lib/industries-data'

export async function generateStaticParams() {
  return industries.map(i => ({ slug: i.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const industry = getIndustryBySlug(slug)
  if (!industry) return {}
  return {
    title: industry.seoTitle,
    description: industry.metaDescription,
    openGraph: {
      title: industry.seoTitle,
      description: industry.metaDescription,
      url: `https://masuyodigital.com/industries/${industry.slug}`,
    },
    alternates: { canonical: `https://masuyodigital.com/industries/${industry.slug}` },
  }
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const industry = getIndustryBySlug(slug)
  if (!industry) notFound()

  return (
    <>
      {/* Hero */}
      <section className="crosshatch-bg pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24">
          <div className="max-w-3xl">
            <RevealAnimation>
              <Link
                href="/industries"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest mb-6"
                style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                All Industries
              </Link>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Geist, sans-serif' }}
              >
                {industry.name}
              </p>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight"
                style={{ fontFamily: 'Fraunces, serif' }}
              >
                {industry.hero}
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <Link
                href="/start-a-project"
                className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded transition-opacity hover:opacity-90"
                style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}
              >
                {industry.cta}
              </Link>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-20" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}
              >
                The problem
              </p>
              <p
                className="text-xl md:text-2xl leading-relaxed"
                style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}
              >
                {industry.problem}
              </p>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-14">
            <RevealAnimation>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}
              >
                What we do
              </p>
              <h2
                className="text-3xl md:text-4xl font-semibold text-ink"
                style={{ fontFamily: 'Fraunces, serif' }}
              >
                How we help {industry.name} businesses
              </h2>
            </RevealAnimation>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industry.solutions.map((solution, i) => (
              <RevealAnimation key={i} delay={(i % 3) as 0 | 1 | 2}>
                <div
                  className="p-6 rounded-lg h-full flex flex-col gap-4"
                  style={{ background: 'var(--white)', border: '1px solid var(--border)', borderTop: '3px solid var(--blue)' }}
                >
                  <div
                    className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(53,173,223,0.1)', color: 'var(--blue)' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}
                  >
                    {solution}
                  </p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <RevealAnimation>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-6"
                style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}
              >
                The result
              </p>
              <p
                className="text-2xl md:text-3xl font-semibold text-ink mb-10"
                style={{ fontFamily: 'Fraunces, serif', lineHeight: '1.4' }}
              >
                {industry.benefits}
              </p>
              <Link
                href="/start-a-project"
                className="inline-block text-sm font-semibold text-white px-8 py-4 rounded transition-opacity hover:opacity-90"
                style={{ background: 'var(--navy)', fontFamily: 'Geist, sans-serif' }}
              >
                {industry.cta}
              </Link>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Other industries */}
      <section className="py-16" style={{ background: 'var(--light)', borderTop: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-6"
              style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}
            >
              Other industries
            </p>
          </RevealAnimation>
          <div className="flex flex-wrap gap-3">
            {industries
              .filter(i => i.slug !== slug)
              .map(i => (
                <Link
                  key={i.slug}
                  href={`/industries/${i.slug}`}
                  className="text-sm font-medium px-4 py-2 rounded-full transition-colors hover:bg-white"
                  style={{ border: '1px solid var(--border)', color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}
                >
                  {i.name}
                </Link>
              ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
