import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'Masuyo Digital – We build digital things that actually work.',
  description: 'Your website, your marketing, your technology. All working together to grow your business. UK-based digital agency working globally.',
  openGraph: {
    title: 'Masuyo Digital – We build digital things that actually work.',
    description: 'Your website, your marketing, your technology. All working together to grow your business.',
    url: 'https://masuyodigital.com',
  },
  alternates: { canonical: 'https://masuyodigital.com' },
}


const useCases = [
  {
    title: 'You are a local business with no real online presence',
    body: 'We get you online properly. A website that represents you well, local SEO so people in your area find you, and a simple way to capture enquiries.',
  },
  {
    title: 'You are growing and need your marketing to keep up',
    body: 'We build and run campaigns across search and social, set up lead generation systems, and track everything so you know what is working.',
  },
  {
    title: 'You want technology to help run your business more efficiently',
    body: 'We look at what you are currently doing, find where technology saves you time and money, and build or implement the right tools.',
  },
  {
    title: 'You want a full digital partner, not just an agency',
    body: 'Strategy, website, marketing, automation, hosting. We act as your digital team without the overhead of hiring one.',
  },
]

const whatWeBuild = [
  'Websites and web applications',
  'Marketing campaigns and ad management',
  'SEO strategies and content systems',
  'CRM and customer management systems',
  'CMS platforms for your team to manage content',
  'Lead generation funnels and landing pages',
  'Automation workflows and integrations',
  'Hosting, server management and ongoing support',
]

const stats = [
  { value: '10+', label: 'Businesses supported across multiple industries' },
  { value: '2', label: 'Countries served and growing' },
  { value: '1', label: 'Team handling everything digital' },
  { value: '7 days', label: 'Average website delivery time' },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="crosshatch-bg min-h-screen flex items-center pt-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg viewBox="0 0 1440 900" fill="none" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
            <circle cx="1200" cy="150" r="550" stroke="rgba(53,173,223,0.10)" strokeWidth="1" fill="none" />
            <circle cx="1200" cy="150" r="380" stroke="rgba(53,173,223,0.07)" strokeWidth="1" fill="none" />
            <circle cx="1200" cy="150" r="210" stroke="rgba(53,173,223,0.12)" strokeWidth="1" fill="none" />
            <circle cx="1350" cy="750" r="120" stroke="rgba(53,173,223,0.08)" strokeWidth="1" fill="none" />
            <line x1="800" y1="0" x2="1440" y2="600" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            <line x1="900" y1="900" x2="1440" y2="300" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-6"
                style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}
              >
                UK based. Working globally.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-semibold text-white mb-6 leading-tight"
                style={{ fontFamily: 'Fraunces, serif' }}
              >
                We build digital things that{' '}
                <em className="not-italic" style={{ fontStyle: 'italic' }}>actually</em> work.
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p
                className="text-lg md:text-xl mb-10"
                style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}
              >
                Your website, your marketing, your technology. All working together to grow your business.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-block text-center text-sm font-semibold text-white px-6 py-3.5 rounded transition-opacity hover:opacity-90"
                  style={{ background: 'var(--navy)', border: '1px solid rgba(255,255,255,0.15)', fontFamily: 'Geist, sans-serif' }}
                >
                  Start a conversation
                </Link>
                <Link
                  href="/services"
                  className="inline-block text-center text-sm font-semibold px-6 py-3.5 rounded transition-colors hover:bg-white hover:text-ink"
                  style={{ border: '1px solid var(--border)', color: 'rgba(255,255,255,0.8)', fontFamily: 'Geist, sans-serif' }}
                >
                  Our services
                </Link>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Offer block */}
      <section style={{ background: 'var(--blue)' }} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="flex-1">
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'Geist, sans-serif' }}
              >
                Get online fast
              </p>
              <h2
                className="text-2xl md:text-3xl font-semibold text-white mb-3"
                style={{ fontFamily: 'Fraunces, serif' }}
              >
                The simplest way to get your business online.
              </h2>
              <p
                className="text-sm leading-relaxed max-w-2xl"
                style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'Geist, sans-serif' }}
              >
                A professionally built website from just £249, live in 7 working days. You tell us what you need. We handle everything. No lengthy back and forth, no confusing process. Just a website that works, delivered fast.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link
                href="/get-a-website"
                className="inline-block text-sm font-semibold px-6 py-3.5 rounded transition-colors hover:bg-light"
                style={{ background: 'var(--white)', color: 'var(--navy)', fontFamily: 'Geist, sans-serif' }}
              >
                See what is included
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <RevealAnimation>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}
              >
                About Masuyo
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h2
                className="text-3xl md:text-4xl font-semibold text-ink mb-6"
                style={{ fontFamily: 'Fraunces, serif' }}
              >
                One team. Everything digital.
              </h2>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p
                className="text-base leading-relaxed"
                style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}
              >
                Most businesses know they need to do more online. They just do not know where to start, or who to trust. That is where we come in. Masuyo is a full service digital agency working with businesses across the UK and globally. We design, build, market and automate. Everything under one roof, from one team that genuinely cares about your growth.
              </p>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Technology section */}
      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                Technology
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h2 className="text-3xl md:text-4xl font-semibold text-ink mb-5" style={{ fontFamily: 'Fraunces, serif' }}>
                We Build Digital Systems That Scale
              </h2>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                From websites and web applications to DevOps, automation, and AI integrations. We architect, build, and deploy technology that is fast, secure, and built to grow with your business.
              </p>
            </RevealAnimation>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {[
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M4 6l-3 3 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 6l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10.5 3l-3 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                ),
                title: 'Web Development',
                description: 'Modern, performant websites built around your business goals',
              },
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <rect x="2" y="3" width="14" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.4"/>
                    <rect x="2" y="10" width="14" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.4"/>
                    <circle cx="13.5" cy="5.5" r=".9" fill="currentColor" stroke="none"/>
                    <circle cx="13.5" cy="12.5" r=".9" fill="currentColor" stroke="none"/>
                  </svg>
                ),
                title: 'DevOps and Infrastructure',
                description: 'Cloud hosting, pipelines, and architecture that keeps everything running',
              },
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M3 9a6 6 0 0110.39-3M15 9a6 6 0 01-10.39 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                    <path d="M13 5.5l2.5-2.5M5.5 13L3 15.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                ),
                title: 'Workflow Automation',
                description: 'Remove manual tasks and connect your tools into a single system',
              },
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <rect x="4" y="4" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                    <path d="M6 1v3M9 1v3M12 1v3M6 14v3M9 14v3M12 14v3M1 6h3M1 9h3M1 12h3M14 6h3M14 9h3M14 12h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                ),
                title: 'AI and Integrations',
                description: 'Intelligent assistants and API connections that extend what your business can do',
              },
            ].map((card, i) => (
              <RevealAnimation key={card.title} delay={(i % 4 + 1) as 1 | 2 | 3 | 4}>
                <div className="flex flex-col gap-4 p-5 rounded-lg h-full" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                  <div className="w-9 h-9 rounded flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(53,173,223,0.1)', color: 'var(--blue)' }}>
                    {card.icon}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-sm font-semibold text-ink" style={{ fontFamily: 'Fraunces, serif' }}>{card.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>{card.description}</p>
                  </div>
                </div>
              </RevealAnimation>
            ))}
          </div>

          <RevealAnimation>
            <Link
              href="/technology"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-navy"
              style={{ color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}
            >
              Explore technology services
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7.5 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </RevealAnimation>
        </div>
      </section>

      {/* Marketing section */}
      <section className="py-24" style={{ background: 'var(--navy)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Geist, sans-serif' }}>
                Marketing and Growth
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-5" style={{ fontFamily: 'Fraunces, serif' }}>
                Marketing Systems That Generate Real Results
              </h2>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                From SEO and paid ads to email automation and content. We build the campaigns and systems that bring you customers consistently, backed by proper tracking and data.
              </p>
            </RevealAnimation>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {[
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.4"/>
                    <path d="M12.5 12.5L16 16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                    <path d="M6 8h4M8 6v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                ),
                title: 'SEO',
                description: 'Rank higher and drive organic traffic that converts',
              },
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.4"/>
                    <circle cx="9" cy="9" r="4" stroke="currentColor" strokeWidth="1.4"/>
                    <circle cx="9" cy="9" r="1.2" fill="currentColor" stroke="none"/>
                  </svg>
                ),
                title: 'Paid Ads',
                description: 'Google and Meta campaigns managed to deliver profitable leads',
              },
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <rect x="1.5" y="4" width="15" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                    <path d="M1.5 7l7.5 5 7.5-5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
                  </svg>
                ),
                title: 'Email Automation',
                description: 'Sequences that nurture leads and retain customers automatically',
              },
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M9 2v7l3.5-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 9L5.5 5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                    <path d="M2 12v2a2 2 0 002 2h10a2 2 0 002-2v-2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                ),
                title: 'Lead Generation',
                description: 'End-to-end systems that bring qualified prospects directly to you',
              },
            ].map((card, i) => (
              <RevealAnimation key={card.title} delay={(i % 4 + 1) as 1 | 2 | 3 | 4}>
                <div className="flex flex-col gap-4 p-5 rounded-lg h-full" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <div className="w-9 h-9 rounded flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(53,173,223,0.15)', color: 'var(--blue)' }}>
                    {card.icon}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-sm font-semibold text-white" style={{ fontFamily: 'Fraunces, serif' }}>{card.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Geist, sans-serif' }}>{card.description}</p>
                  </div>
                </div>
              </RevealAnimation>
            ))}
          </div>

          <RevealAnimation>
            <Link
              href="/marketing"
              className="inline-flex items-center gap-2 text-sm font-semibold"
              style={{ color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}
            >
              Explore marketing services
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7.5 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </RevealAnimation>
        </div>
      </section>

      {/* Growth section */}
      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <RevealAnimation>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}
              >
                Why it matters
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h2
                className="text-3xl md:text-4xl font-semibold text-ink mb-6"
                style={{ fontFamily: 'Fraunces, serif' }}
              >
                Digital is not a one-off project. It is an ongoing engine for growth.
              </h2>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p
                className="text-base leading-relaxed"
                style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}
              >
                The businesses seeing the biggest results online are not always the biggest or best funded. They are the ones with the right foundations. A website that works hard. Marketing that runs consistently. Technology that supports the team. Automation that removes friction. We help businesses build that engine at any stage, whether starting from scratch, fixing something that is not working, or scaling what they already have.
              </p>
            </RevealAnimation>
          </div>

          {/* Use cases */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {useCases.map((uc, i) => (
              <RevealAnimation key={i} delay={(i % 2 + 1) as 1 | 2}>
                <div
                  className="p-6 rounded-lg h-full"
                  style={{ background: 'var(--white)', border: '1px solid var(--border)', borderLeft: '3px solid var(--blue)' }}
                >
                  <h3
                    className="text-base font-semibold text-ink mb-3"
                    style={{ fontFamily: 'Fraunces, serif' }}
                  >
                    {uc.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                    {uc.body}
                  </p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* What we build */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <RevealAnimation>
              <h2
                className="text-3xl md:text-4xl font-semibold text-ink mb-4"
                style={{ fontFamily: 'Fraunces, serif' }}
              >
                What we build
              </h2>
              <p className="text-base leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                From your first website to full digital infrastructure. Here is the kind of work we do every day.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <ul className="flex flex-col gap-3">
                {whatWeBuild.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm pb-3"
                    style={{ borderBottom: i < whatWeBuild.length - 1 ? '1px solid var(--border)' : 'none', fontFamily: 'Geist, sans-serif', color: 'var(--ink)' }}
                  >
                    <span style={{ color: 'var(--blue)', marginTop: '2px' }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Hosting callout */}
      <section style={{ background: 'var(--navy)' }} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-xl">
              <RevealAnimation>
                <h2
                  className="text-2xl md:text-3xl font-semibold text-white mb-4"
                  style={{ fontFamily: 'Fraunces, serif' }}
                >
                  Your website, hosted by us.
                </h2>
              </RevealAnimation>
              <RevealAnimation delay={1}>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif' }}
                >
                  We run our own server infrastructure, so we host your website directly. No third party hosting companies, no passing the buck. Fast load times, strong uptime, and a team who knows your site inside out.
                </p>
              </RevealAnimation>
            </div>
            <RevealAnimation delay={2}>
              <Link
                href="/services/hosting"
                className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded border transition-colors hover:bg-white hover:text-ink"
                style={{ borderColor: 'rgba(255,255,255,0.25)', fontFamily: 'Geist, sans-serif' }}
              >
                Find out more
              </Link>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: '1px', background: 'var(--border)', border: '1px solid var(--border)' }}>
            {stats.map((stat, i) => (
              <RevealAnimation key={i} delay={(i % 2 + 1) as 1 | 2}>
                <div
                  className="py-10 px-6 text-center flex flex-col items-center justify-center h-full"
                  style={{ background: 'var(--white)' }}
                >
                  <p className="text-4xl font-semibold mb-2" style={{ fontFamily: 'Fraunces, serif', color: 'var(--blue)' }}>
                    {stat.value}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                    {stat.label}
                  </p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <CTABand />
    </>
  )
}
