import type { Metadata } from 'next'
import RevealAnimation from '@/components/RevealAnimation'
import VenueContactForm from './VenueContactForm'

export const metadata: Metadata = {
  title: { absolute: 'Websites and marketing for lifestyle and adult venues | Masuyo Digital' },
  description: 'Web design, SEO and digital marketing built specifically for UK lifestyle, adult and members venues. Built by a team that understands your industry.',
  openGraph: {
    title: 'Websites and marketing for lifestyle and adult venues | Masuyo Digital',
    description: 'Web design, SEO and digital marketing built specifically for UK lifestyle, adult and members venues. Built by a team that understands your industry.',
    url: 'https://masuyodigital.com/lifestyle-venues',
  },
  alternates: { canonical: 'https://masuyodigital.com/lifestyle-venues' },
}

const features = [
  {
    title: 'Modern websites',
    body: 'Clean, fast, mobile-first sites that make your venue look as good online as it does in person. Easy for you to update, built to be discreet and professional.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2.5" y="3.5" width="15" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M2.5 7h15M5 17h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Getting found on Google',
    body: 'Proper search optimisation so people looking for a venue like yours actually find you, without needing the advertising channels you are banned from.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.4" />
        <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Built for your industry',
    body: 'We already work in this space, so we understand discretion, the audience, the sensitivities and what does and does not work. No awkward conversations, no judgement.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2.5l6 2.5v4c0 3.8-2.6 6.6-6 8-3.4-1.4-6-4.2-6-8V5l6-2.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M7.5 10l1.8 1.8L13 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Ongoing support',
    body: 'We do not disappear after launch. Updates, changes and advice when you need them.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M10 2v2.5M10 15.5V18M18 10h-2.5M4.5 10H2M15.66 4.34l-1.77 1.77M6.11 13.89l-1.77 1.77M15.66 15.66l-1.77-1.77M6.11 6.11L4.34 4.34" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
]

const steps = [
  {
    number: '01',
    title: 'We talk.',
    body: 'Tell us about your venue and what you need. No pressure, no pitch, just a conversation.',
  },
  {
    number: '02',
    title: 'We build.',
    body: 'We design and build your site, or sort your existing one, and get your search visibility working.',
  },
  {
    number: '03',
    title: 'You grow.',
    body: 'You get a professional online presence that brings people through the door, with us on hand when you need us.',
  },
]

export default function LifestyleVenuesPage() {
  return (
    <>
      {/* Hero */}
      <section className="crosshatch-bg pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="max-w-3xl">
            <RevealAnimation>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
                Websites and marketing for venues the mainstream will not touch.
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <p className="text-lg md:text-xl mb-8" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                We design websites and get you found online, built specifically for UK lifestyle, adult and members venues by a team that already works in your world.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <a
                href="#contact"
                className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded transition-colors"
                style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}
              >
                Get in touch
              </a>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Section 1: The problem */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <RevealAnimation>
              <h2 className="text-3xl md:text-4xl font-semibold text-ink mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
                You run a great venue. The internet makes it hard to show it.
              </h2>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <p className="text-base leading-relaxed mb-5" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                If you run a lifestyle, adult or members venue, you already know the problem. You are locked out of Google Ads and Meta. Mainstream agencies do not understand your industry, or quietly refuse to work with it. Your website might be dated, hard to update, or invisible when people search for you. And the platforms everyone else relies on to grow simply are not open to you.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                The result is that good venues stay hidden, while the people looking for them cannot find them.
              </p>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Section 2: What we do */}
      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl md:text-4xl font-semibold text-ink mb-12" style={{ fontFamily: 'var(--font-poppins)' }}>
              What we build for you.
            </h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <RevealAnimation key={f.title} delay={(i % 4 + 1) as 1 | 2 | 3 | 4}>
                <div className="p-8 rounded-lg h-full" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                  <div className="w-11 h-11 rounded flex items-center justify-center mb-5 flex-shrink-0" style={{ background: 'rgba(53,173,223,0.1)', color: 'var(--blue)' }}>
                    {f.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-ink mb-2.5" style={{ fontFamily: 'var(--font-poppins)' }}>{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>{f.body}</p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Why us */}
      <section className="py-24" style={{ background: 'var(--navy)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Geist, sans-serif' }}>
                Why us
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
                We already work in your world.
              </h2>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-base leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                Masuyo Digital is the team behind Venuva, the UK lifestyle and adult venue directory. We built it from the ground up: clean, modern, discreet and built to rank. We understand this industry because we work in it every day, and we know exactly what a venue needs to be found, trusted and booked.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                When you work with us, you are not explaining your business to a mainstream agency that does not get it. You are working with people who already do.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={4}>
              <a
                href="https://venuva.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                style={{ color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}
              >
                See our work at Venuva
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M7.5 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Section 4: How it works */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <h2 className="text-3xl md:text-4xl font-semibold text-ink mb-12" style={{ fontFamily: 'var(--font-poppins)' }}>
              Simple, straightforward, no jargon.
            </h2>
          </RevealAnimation>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <RevealAnimation key={step.number} delay={(i + 1) as 1 | 2 | 3}>
                <div className="flex flex-col gap-3">
                  <span className="text-3xl font-semibold" style={{ color: 'var(--blue)', fontFamily: 'var(--font-poppins)' }}>{step.number}</span>
                  <h3 className="text-lg font-semibold text-ink" style={{ fontFamily: 'var(--font-poppins)' }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>{step.body}</p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Contact */}
      <section id="contact" className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <RevealAnimation>
              <div>
                <h2 className="text-3xl md:text-4xl font-semibold text-ink mb-5" style={{ fontFamily: 'var(--font-poppins)' }}>
                  Let us talk.
                </h2>
                <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                  Tell us a little about your venue and what you need. We will get back to you within a day. No obligation, no hard sell.
                </p>
                <div className="p-6 rounded-lg" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                  <h3 className="text-base font-semibold text-ink mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>
                    What to expect
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {[
                      'We reply within one business day',
                      'A discreet, professional conversation',
                      'Honest advice on what your venue actually needs',
                      'No judgement, no awkward questions',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                        <svg className="flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7l3 3 6-6" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealAnimation>

            <RevealAnimation delay={1}>
              <VenueContactForm />
            </RevealAnimation>
          </div>
        </div>
      </section>
    </>
  )
}
