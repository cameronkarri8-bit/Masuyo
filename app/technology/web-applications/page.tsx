import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'
import BrowserMockup from '@/components/placeholder/BrowserMockup'

export const metadata: Metadata = {
  title: 'Web Application Development UK | Masuyo Digital',
  description: 'Custom web applications, client portals, and browser-based tools built for complex business needs.',
  openGraph: {
    title: 'Web Application Development UK | Masuyo Digital',
    description: 'Custom web applications, client portals, and browser-based tools built for complex business needs.',
    url: 'https://masuyodigital.com/technology/web-applications',
  },
  alternates: { canonical: 'https://masuyodigital.com/technology/web-applications' },
}

const solutionPoints = [
  'Client portals and internal tools',
  'Booking and reservation systems',
  'Custom dashboards and reporting tools',
  'Multi-user platforms with role-based access',
  'Data management and workflow applications',
  'Integrations with your existing systems',
]

const features = [
  'Next.js and React',
  'Secure authentication',
  'Role-based access control',
  'Real-time data',
  'Third-party integrations',
  'Responsive design',
  'Scalable architecture',
  'Full documentation',
]

export default function WebApplicationsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-24 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Web Applications and Portals
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl text-white mb-6">
                Complex problems, clean solutions
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.7' }}>
                We build web applications that handle the complexity your business needs, without the complexity your users have to deal with. Powerful under the hood, simple on the surface.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <Link href="/start-a-project" className="btn-primary">
                Get an instant estimate
              </Link>
            </RevealAnimation>
            </div>

            <RevealAnimation delay={4}>
              <BrowserMockup aspect="4/3" variant={3} />
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Problem and Solution */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <RevealAnimation>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--mid)' }}>
                  The problem
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', lineHeight: '1.8' }}>
                  Off-the-shelf software rarely fits exactly. You end up paying for features you do not need, missing features you do, and spending hours on workarounds. A custom web application solves your actual problem.
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

      {/* Features */}
      <section className="py-24 bg-blue-tint">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl font-semibold text-ink mb-10">
              How we build it
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
        headline="Have a complex problem to solve?"
        body="Tell us what you need and we will tell you exactly how to build it."
      />
    </>
  )
}
