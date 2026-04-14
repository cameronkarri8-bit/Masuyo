import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'

const studies = [
  {
    id: 'tradie-leads',
    label: 'Case Study 01',
    title: 'How a local plumber went from zero online presence to 40+ enquiries a month',
    industry: 'Tradespeople',
    services: ['Web Design', 'Local SEO', 'Google Business Profile'],
    challenge: 'A sole-trader plumber in Manchester had been relying entirely on word-of-mouth for 11 years. He had no website, no Google presence, and was turning away work because his pipeline was unpredictable. When a competitor started winning jobs he would normally have got, he reached out to us.',
    solution: 'We built a fast, mobile-first website focused on the three services that drove his highest margins. We optimised his Google Business Profile, built location-specific service pages for the surrounding areas, and set up a simple lead capture form with a click-to-call button. No social media, no paid ads — just local SEO done properly.',
    results: [
      '40+ inbound enquiries in the first full month after launch',
      'Ranked top 3 in Google Maps for 14 local search terms within 90 days',
      'Conversion rate of 34% from website visitor to enquiry',
      'Fully booked 6 weeks ahead within 4 months',
    ],
    quote: 'I wish I had done this years ago. The phone does not stop.',
    quoteAuthor: 'Client, Manchester',
  },
  {
    id: 'ecommerce-growth',
    label: 'Case Study 02',
    title: 'Rebuilding an e-commerce store that was losing 70% of visitors at checkout',
    industry: 'E-commerce',
    services: ['Web Design & Development', 'Conversion Rate Optimisation', 'Performance'],
    challenge: 'An online homeware retailer had a Shopify store that looked fine but performed badly. Analytics showed a 70% drop-off at the cart stage, page load times of over 6 seconds on mobile, and a checkout flow that required account creation before purchase. Revenue had plateaued despite increasing ad spend.',
    solution: 'We rebuilt the store with a focus on speed and conversion. We reduced page load time to under 2 seconds, simplified the checkout to a single-page guest flow, added trust signals at every step (reviews, secure payment badges, clear returns policy), and rewrote product descriptions with benefit-led copy. We also implemented structured data for product listings.',
    results: [
      'Checkout abandonment fell from 70% to 41%',
      'Average page load time reduced from 6.2s to 1.8s on mobile',
      'Revenue increased 58% in the 3 months following relaunch',
      'Organic product impressions doubled within 60 days of structured data implementation',
    ],
    quote: 'We were spending more on ads but making the same money. Now the site actually converts.',
    quoteAuthor: 'Client, Bristol',
  },
  {
    id: 'professional-services-seo',
    label: 'Case Study 03',
    title: 'From page 4 to page 1: a 14-month SEO campaign for a regional accountancy firm',
    industry: 'Professional Services',
    services: ['SEO', 'Content Strategy', 'Technical SEO'],
    challenge: 'A four-partner accountancy firm in the East Midlands had a website but no organic visibility. They were spending £2,500 a month on Google Ads just to get enquiries, with no long-term asset being built. Their managing partner wanted to reduce ad dependency and build a sustainable source of inbound leads.',
    solution: 'We started with a full technical SEO audit and fixed 34 issues ranging from duplicate content to missing canonical tags. We developed a content strategy around the questions their ideal clients were actually searching — tax planning, IR35, R&D tax credits — and published one substantive article per week. We also built links through industry directories, local press, and partner mentions.',
    results: [
      'Page 1 rankings for 22 target keywords within 14 months',
      'Organic traffic increased 340% year-on-year',
      'Monthly ad spend reduced from £2,500 to £600',
      '18 inbound enquiries per month from organic search alone',
    ],
    quote: 'We are now getting calls from people who found us on Google without paying for every click. That is exactly what we wanted.',
    quoteAuthor: 'Managing Partner, East Midlands',
  },
]

export default function CaseStudiesPage() {
  return (
    <>
      {/* Hero */}
      <section className="crosshatch-bg pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24">
          <div className="max-w-2xl">
            <RevealAnimation>
              <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4 leading-tight" style={{ fontFamily: 'Fraunces, serif' }}>
                Case studies
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <p className="text-lg" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif' }}>
                Real projects, real results. Here is a look at some of the work we are proud of.
              </p>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Studies */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-20">
            {studies.map((study, i) => (
              <RevealAnimation key={study.id}>
                <article>
                  {/* Label + tags */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-xs font-semibold" style={{ color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
                      {study.label}
                    </span>
                    <span style={{ color: 'var(--border)' }}>·</span>
                    <span className="text-xs px-2.5 py-1 rounded" style={{ background: 'var(--light)', color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                      {study.industry}
                    </span>
                    {study.services.map(s => (
                      <span key={s} className="text-xs px-2.5 py-1 rounded" style={{ background: 'var(--light)', color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                        {s}
                      </span>
                    ))}
                  </div>

                  <h2 className="text-2xl md:text-3xl font-semibold text-ink mb-8 leading-snug" style={{ fontFamily: 'Fraunces, serif' }}>
                    {study.title}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Challenge */}
                    <div className="p-6 rounded-lg" style={{ background: 'var(--light)', border: '1px solid var(--border)' }}>
                      <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                        The challenge
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif', lineHeight: '1.75' }}>
                        {study.challenge}
                      </p>
                    </div>

                    {/* Solution */}
                    <div className="p-6 rounded-lg" style={{ background: 'var(--light)', border: '1px solid var(--border)' }}>
                      <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                        What we did
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif', lineHeight: '1.75' }}>
                        {study.solution}
                      </p>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="p-6 rounded-lg mb-6" style={{ border: '1px solid var(--border)' }}>
                    <h3 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                      The results
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {study.results.map((r, ri) => (
                        <li key={ri} className="flex items-start gap-3 text-sm" style={{ fontFamily: 'Geist, sans-serif', color: 'var(--ink)' }}>
                          <svg className="flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M2.5 7l3 3 6-6" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Quote */}
                  <blockquote className="pl-4" style={{ borderLeft: '3px solid var(--blue)' }}>
                    <p className="text-base italic mb-1" style={{ color: 'var(--ink)', fontFamily: 'Fraunces, serif' }}>
                      &ldquo;{study.quote}&rdquo;
                    </p>
                    <cite className="text-xs not-italic" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                      — {study.quoteAuthor}
                    </cite>
                  </blockquote>

                  {i < studies.length - 1 && (
                    <div className="mt-20" style={{ borderBottom: '1px solid var(--border)' }} />
                  )}
                </article>
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
              Want results like these?
            </h2>
          </RevealAnimation>
          <RevealAnimation delay={1}>
            <p className="text-base mb-8" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif' }}>
              Tell us about your business and we will work out the right approach together.
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
