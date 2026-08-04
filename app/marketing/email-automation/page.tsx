import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'
import BrowserMockup from '@/components/placeholder/BrowserMockup'

export const metadata: Metadata = {
  title: 'Email Marketing and Automation UK | Masuyo Digital',
  description: 'Email marketing and automation for UK businesses. Welcome sequences, nurture campaigns, and re-engagement flows that convert leads into customers.',
  openGraph: {
    title: 'Email Marketing and Automation UK | Masuyo Digital',
    description: 'Email marketing and automation for UK businesses. Welcome sequences, nurture campaigns, and re-engagement flows that convert leads into customers.',
    url: 'https://masuyodigital.com/marketing/email-automation',
  },
  alternates: { canonical: 'https://masuyodigital.com/marketing/email-automation' },
}

const solutionPoints = [
  'Welcome and onboarding sequences for new subscribers',
  'Lead nurture campaigns for prospects who are not ready to buy yet',
  'Post-purchase and post-project follow-up sequences',
  'Re-engagement campaigns for cold subscribers',
  'Abandoned enquiry recovery sequences',
  'Review and referral request automation',
]

const features = [
  'Email strategy',
  'Sequence design and copywriting',
  'Platform setup (Mailchimp, Klaviyo, or ActiveCampaign)',
  'Automation workflow build',
  'List segmentation',
  'A/B testing',
  'Performance reporting',
]

export default function EmailAutomationPage() {
  return (
    <>
      <section className="bg-navy py-24 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Email Marketing and Automation
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl text-white mb-6">
                Email that works while you sleep
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.7' }}>
                We build email sequences and automation workflows that nurture your leads, onboard your customers, and keep your audience engaged without you lifting a finger.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <Link href="/start-a-project" className="btn-primary">
                Get an instant estimate
              </Link>
            </RevealAnimation>
            </div>

            <RevealAnimation delay={4}>
              <BrowserMockup aspect="4/3" variant={5} />
            </RevealAnimation>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <RevealAnimation>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--mid)' }}>
                  The problem
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', lineHeight: '1.8' }}>
                  Most businesses send the occasional newsletter and call it email marketing. Without automated sequences and a proper nurture strategy, you are leaving a huge amount of revenue on the table from leads who just needed a bit more time.
                </p>
              </div>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <div>
                <h2 className="text-2xl text-ink mb-6">
                  What we build
                </h2>
                <ul className="flex flex-col gap-4">
                  {solutionPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-1" style={{ color: 'var(--blue)' }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-sm leading-relaxed" style={{ color: 'var(--ink)' }}>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      <section className="py-24 bg-blue-tint">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-10">
              What is included
            </h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, i) => (
              <RevealAnimation key={i} delay={(i % 4 + 1) as 1 | 2 | 3 | 4}>
                <div className="flex items-center gap-3 p-4 rounded-lg h-full" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                  <span className="flex-shrink-0" style={{ color: 'var(--blue)' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-ink">{feature}</span>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="Ready to put your email to work?"
        body="Tell us about your audience and where they are in the buying journey. We will build the sequences to move them forward."
      />
    </>
  )
}
