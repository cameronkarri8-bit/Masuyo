import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import Section from '@/components/Section'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'What we do',
  description:
    'Websites, web apps, marketing, automation and hosting. A small team of senior experts, fair prices, published up front.',
  openGraph: {
    title: 'What we do | Masuyo Digital',
    description:
      'Websites, web apps, marketing, automation and hosting. A small team of senior experts, fair prices, published up front.',
    url: 'https://masuyodigital.com/services',
  },
  alternates: { canonical: 'https://masuyodigital.com/services' },
}

/** The six things we do, each pointing at its canonical deep page. */
const PILLARS = [
  {
    title: 'Websites',
    href: '/services/web-design',
    body: 'Fast, modern and built to convert. Most sites go live in two to four weeks.',
    price: 'From £249',
    more: [
      { label: 'Web development', href: '/technology/web-development' },
      { label: 'E-commerce', href: '/technology/ecommerce' },
      { label: 'Get a website', href: '/get-a-website' },
    ],
  },
  {
    title: 'Web apps and software',
    href: '/technology/web-applications',
    body: 'When an off the shelf tool will not do it. Portals, dashboards, booking systems, internal tools.',
    price: 'From £3,500',
    more: [
      { label: 'App development', href: '/technology/app-development' },
      { label: 'Architecture', href: '/technology/architecture' },
      { label: 'API integration', href: '/technology/api' },
    ],
  },
  {
    title: 'Marketing and SEO',
    href: '/marketing',
    body: 'More enquiries, less guesswork. We show you what is working and what is not.',
    price: 'From £199',
    more: [
      { label: 'SEO', href: '/marketing/seo' },
      { label: 'Paid ads', href: '/marketing/paid-ads' },
      { label: 'Content', href: '/marketing/content' },
    ],
  },
  {
    title: 'Automation and AI',
    href: '/technology/automation',
    body: 'The admin nobody wants to do, done without you. Get your evenings back.',
    price: 'From £800',
    more: [
      { label: 'AI chatbots', href: '/technology/ai-chatbots' },
      { label: 'CRM', href: '/technology/crm' },
      { label: 'Email automation', href: '/marketing/email-automation' },
    ],
  },
  {
    title: 'Hosting and support',
    href: '/technology/hosting',
    body: 'Hosting, SSL, backups, updates and someone who answers. No surprise invoices.',
    price: 'From £40 per month',
    more: [
      { label: 'DevOps', href: '/technology/devops' },
      { label: 'GDPR compliance', href: '/technology/gdpr-compliance' },
      { label: 'Database', href: '/technology/database' },
    ],
  },
  {
    title: 'Custom products',
    href: '/products/bespoke',
    body: 'Something built around how your business actually works, not the other way round.',
    price: 'From £1,800',
    more: [
      { label: 'Client portals', href: '/products/client-portal' },
      { label: 'Community platforms', href: '/products/community-platform' },
      { label: 'Learning platforms', href: '/products/custom-learning-platform' },
    ],
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <Section bg="white" width="wide" tight>
        <RevealAnimation>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-blue2">
            What we do
          </p>
          <h1 className="mt-5 max-w-[16ch] text-6xl text-navy md:text-7xl lg:text-8xl">
            Everything, minus the bloat.
          </h1>
          <p className="mt-8 max-w-[52ch] font-sans text-lg leading-relaxed text-mid">
            Six things, done properly. Every price on this page is real and published up
            front, because you should not have to book a call to find out what something costs.
          </p>
        </RevealAnimation>
      </Section>

      {/* ---------------- The quiet part ---------------- */}
      <Section bg="navy" width="default" tight>
        <RevealAnimation>
          <p className="max-w-[24ch] text-4xl text-white md:text-5xl">
            We are a small team of experts.
          </p>
          <p className="mt-6 max-w-[46ch] font-sans text-lg leading-relaxed text-white/75">
            No account managers, no offices, no bloat. That is why our prices look like a typo.
          </p>
        </RevealAnimation>
      </Section>

      {/* ---------------- The six ---------------- */}
      <Section bg="tint" width="wide">
        <div className="grid gap-5 md:grid-cols-2">
          {PILLARS.map((p, i) => (
            <RevealAnimation key={p.href} delay={(i % 2) as 0 | 1}>
              <div className="hover-lift flex h-full flex-col rounded-card bg-white p-8 md:p-10">
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="text-3xl text-navy">{p.title}</h2>
                  <span className="whitespace-nowrap font-sans text-xs font-semibold uppercase tracking-wider text-blue2">
                    {p.price}
                  </span>
                </div>

                <p className="mt-4 font-sans text-base leading-relaxed text-mid">{p.body}</p>

                <Link
                  href={p.href}
                  className="mt-6 inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-navy transition-colors hover:text-blue2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
                >
                  {p.title}, in detail
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 7h8M7.5 4l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>

                <div className="mt-auto flex flex-wrap gap-2 border-t border-border pt-6">
                  {p.more.map(m => (
                    <Link
                      key={m.href}
                      href={m.href}
                      className="rounded-full bg-blue-tint px-3.5 py-1.5 font-sans text-xs font-medium text-navy transition-colors hover:bg-blue hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
                    >
                      {m.label}
                    </Link>
                  ))}
                </div>
              </div>
            </RevealAnimation>
          ))}
        </div>
      </Section>

      {/* ---------------- Onward ---------------- */}
      <Section bg="white" width="default" tight>
        <RevealAnimation>
          <h2 className="max-w-[20ch] text-4xl text-navy md:text-5xl">
            Not sure which of those you need?
          </h2>
          <p className="mt-6 max-w-[48ch] font-sans text-lg leading-relaxed text-mid">
            Most people are not, and that is fine. The estimate tool takes about a minute
            and gives you a real number, with no email required.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/start-a-project" className="btn-primary">
              Get an instant estimate
            </Link>
            <Link href="/contact" className="btn-secondary">
              Talk to us
            </Link>
          </div>
        </RevealAnimation>
      </Section>

      <CTABand />
    </>
  )
}
