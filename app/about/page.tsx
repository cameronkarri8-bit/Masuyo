import type { Metadata } from 'next'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'About',
  description: 'We are Masuyo. A digital agency that does things properly. Based in the UK, working globally.',
  openGraph: {
    title: 'About Masuyo Digital',
    description: 'We are Masuyo. A digital agency that does things properly.',
    url: 'https://masuyodigital.com/about',
  },
  alternates: { canonical: 'https://masuyodigital.com/about' },
}

const beliefs = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 6v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    text: 'Technology should work for your business, not the other way around.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 10h14M10 3l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    text: 'Every business deserves a proper digital presence, regardless of size or budget.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M6 10l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    text: 'Good work does not need to be complicated.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 3l2.2 4.5 5 .7-3.6 3.5.85 5L10 14.25 5.55 16.7l.85-5L2.8 8.2l5-.7L10 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    text: 'Results matter more than deliverables.',
  },
]

const bodyParagraphs = [
  'We started Masuyo because we saw too many businesses being sold digital services they did not understand, did not need, or that simply did not deliver. We wanted to do it differently.',
  'We work with businesses of all sizes, from sole traders getting online for the first time to established companies looking to scale. What they all have in common is that they want results, not jargon, and a team they can actually trust.',
  'We handle everything digital. Websites, marketing, technology, automation and hosting. Not because we want to upsell, but because doing everything together is how you get results that compound. Good marketing drives more value from a great website. The right technology makes everything run better. It all connects.',
  'We are based in the UK and work with clients globally. Every project is handled directly by our team. No outsourcing, no handoffs.',
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="crosshatch-bg pt-16 pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-3xl">
            <RevealAnimation>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight"
                style={{ fontFamily: 'Fraunces, serif' }}
              >
                We are Masuyo. A digital agency that does things properly.
              </h1>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="flex flex-col gap-6">
              {bodyParagraphs.map((p, i) => (
                <RevealAnimation key={i} delay={(Math.min(i, 3)) as 0 | 1 | 2 | 3}>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}
                  >
                    {p}
                  </p>
                </RevealAnimation>
              ))}
            </div>

            {/* What we believe */}
            <div>
              <RevealAnimation>
                <h2
                  className="text-2xl font-semibold text-ink mb-8"
                  style={{ fontFamily: 'Fraunces, serif' }}
                >
                  What we believe
                </h2>
              </RevealAnimation>
              <div className="grid grid-cols-1 gap-4">
                {beliefs.map((belief, i) => (
                  <RevealAnimation key={i} delay={(i % 3 + 1) as 1 | 2 | 3}>
                    <div
                      className="flex gap-4 p-5"
                      style={{ border: '1px solid var(--border)', borderRadius: '8px' }}
                    >
                      <div
                        className="w-9 h-9 flex items-center justify-center rounded flex-shrink-0"
                        style={{ background: 'var(--light)', color: 'var(--navy)' }}
                      >
                        {belief.icon}
                      </div>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif', paddingTop: '2px' }}
                      >
                        {belief.text}
                      </p>
                    </div>
                  </RevealAnimation>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
