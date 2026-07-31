'use client'

import { useState } from 'react'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import Section from '@/components/Section'
import Testimonial from '@/components/Testimonial'
import ImagePlaceholder from '@/components/ImagePlaceholder'
import { CASE_STUDIES } from '@/lib/case-studies'
import CTABand from '@/components/CTABand'

const steps = [
  { number: '01', title: 'Choose your package below.' },
  { number: '02', title: 'Complete a short brief telling us about your business.' },
  { number: '03', title: 'We get to work. No lengthy calls, no back and forth.' },
  { number: '04', title: 'Your site is live within 7 working days.' },
]

const packages = [
  {
    name: 'Starter',
    price: '£249',
    description: 'A clean, professional website for businesses getting online.',
    features: ['Up to 5 pages', 'Contact form', 'Mobile ready', 'SEO setup', 'Hosted by us'],
    cta: 'Get an instant estimate',
    href: '/start-a-project',
    featured: false,
  },
  {
    name: 'Growth',
    price: '£649',
    description: 'For businesses that need more.',
    features: ['Up to 10 pages', 'Blog setup', 'Lead capture', 'Analytics', 'Priority delivery'],
    cta: 'Get an instant estimate',
    href: '/start-a-project',
    featured: true,
  },
  {
    name: 'Custom',
    price: 'Let us talk',
    description: 'Got something more specific in mind? Let us talk it through.',
    features: ['Tailored to your needs', 'Custom functionality', 'Full consultation', 'Bespoke quote'],
    cta: 'Talk to us',
    href: '/contact',
    featured: false,
  },
]

const included = [
  'Built by a real team, not a template generator',
  'Hosted on our own servers',
  'SSL certificate included',
  'Mobile and tablet optimised',
  'Basic SEO setup',
  'Delivered in 7 working days',
]

/** Why the price is what it is. This is the trust builder for £249. */
const WHY_CHEAP = [
  {
    heading: 'No account managers',
    body: 'Nobody here is paid to forward your emails. The person who scopes your site is the person who builds it.',
  },
  {
    heading: 'No offices',
    body: 'We do not have a rent bill in a city centre to pass on to you. That saving goes into the price, not a breakout room.',
  },
  {
    heading: 'No juniors on your budget',
    body: 'Small team, senior people. You are not funding somebody learning the job on your website.',
  },
  {
    heading: 'Modern tooling, used properly',
    body: 'Work that used to take six weeks takes us a fraction of that. We pass the saving on rather than pocketing it.',
  },
]

const MOCKUPS = [
  'PLACEHOLDER: example site, independent retailer, shown on laptop',
  'PLACEHOLDER: example site, professional services, shown on phone',
  'PLACEHOLDER: example site, hospitality venue, shown on tablet',
]

const faqs = [
  {
    q: 'What do I need to provide?',
    a: 'Just a short brief about your business, your logo if you have one, and any copy or images you want included. We can advise on the rest.',
  },
  {
    q: 'What if I do not have a logo or copy?',
    a: 'We can help with that. Just mention it when you submit your brief.',
  },
  {
    q: 'What happens after the 7 days?',
    a: 'Your site goes live. We then offer ongoing hosting and support packages if you want us to stay involved.',
  },
  {
    q: 'Can I make changes after?',
    a: 'Yes. We offer a revision round as standard and ongoing support if needed.',
  },
]

function Tick() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="mt-0.5 flex-shrink-0">
      <path d="M3 9.5l4 4 8-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border">
      <h3>
        <button
          type="button"
          className="flex w-full items-center justify-between gap-4 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
        >
          <span className="font-sans text-base font-semibold text-ink">{q}</span>
          <span
            aria-hidden="true"
            className="flex-shrink-0 text-mid transition-transform"
            style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
              <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
        </button>
      </h3>
      <div className={`accordion-content ${open ? 'open' : ''}`}>
        <p className="pb-5 font-sans text-sm leading-relaxed text-mid">{a}</p>
      </div>
    </div>
  )
}

export default function GetAWebsitePage() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <Section bg="white" width="wide" tight>
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <RevealAnimation>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-blue2">
              Get a website
            </p>
            <h1 className="mt-5 max-w-[12ch] text-6xl text-navy md:text-7xl lg:text-8xl">
              A proper website. £249. Live in 7 working days.
            </h1>
            <p className="mt-8 max-w-[46ch] font-sans text-lg leading-relaxed text-mid">
              Not a template you fill in yourself. A real site, built by real people, live
              inside a fortnight.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/start-a-project" className="btn-primary">
                Get an instant estimate
              </Link>
              <Link href="/contact" className="btn-secondary">
                Talk to us
              </Link>
            </div>
          </RevealAnimation>

          <RevealAnimation delay={1}>
            <ImagePlaceholder
              aspect="4/3"
              label="PLACEHOLDER: finished starter website shown on a laptop and phone"
            />
          </RevealAnimation>
        </div>
      </Section>

      {/* ---------------- Why so cheap ---------------- */}
      <Section bg="navy" width="wide">
        <RevealAnimation>
          <h2 className="max-w-[16ch] text-5xl text-white md:text-6xl">
            Why is it only £249?
          </h2>
          <p className="mt-8 max-w-[54ch] font-sans text-lg leading-relaxed text-white/80">
            It is the question everybody asks, and it is a fair one. The honest answer is
            that most of what agencies charge for is not the website.
          </p>
        </RevealAnimation>

        <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {WHY_CHEAP.map((w, i) => (
            <RevealAnimation key={w.heading} delay={(i % 2) as 0 | 1}>
              <div className="border-t-2 border-blue pt-6">
                <h3 className="text-2xl text-white">{w.heading}</h3>
                <p className="mt-3 font-sans text-base leading-relaxed text-white/70">{w.body}</p>
              </div>
            </RevealAnimation>
          ))}
        </div>
      </Section>

      {/* ---------------- Packages ---------------- */}
      <Section bg="tint" width="wide">
        <RevealAnimation>
          <h2 className="max-w-[16ch] text-5xl text-navy md:text-6xl">Pick a package.</h2>
        </RevealAnimation>

        <div className="mt-14 grid items-start gap-5 lg:grid-cols-3">
          {packages.map((p, i) => (
            <RevealAnimation key={p.name} delay={(i % 3) as 0 | 1 | 2}>
              <div
                className={`hover-lift relative flex h-full flex-col rounded-card p-8 md:p-10 ${
                  p.featured ? 'on-dark bg-blue text-white lg:-mt-6 lg:pb-14 lg:pt-14' : 'bg-white'
                }`}
              >
                {p.featured && (
                  <span className="absolute right-8 top-8 rounded-full bg-white/20 px-3 py-1 font-sans text-xs font-semibold uppercase tracking-wider text-white">
                    Most chosen
                  </span>
                )}

                <h3 className={`text-3xl ${p.featured ? 'text-white' : 'text-navy'}`}>{p.name}</h3>
                <p
                  className={`mt-3 font-sans text-sm leading-relaxed ${
                    p.featured ? 'text-white/80' : 'text-mid'
                  }`}
                >
                  {p.description}
                </p>

                <p
                  className={`mt-8 font-display text-6xl leading-none ${
                    p.featured ? 'text-white' : 'text-navy'
                  }`}
                >
                  {p.price}
                </p>

                <ul
                  className={`mt-8 flex flex-col gap-3 border-t pt-8 ${
                    p.featured ? 'border-white/20' : 'border-border'
                  }`}
                >
                  {p.features.map(f => (
                    <li
                      key={f}
                      className={`flex gap-3 font-sans text-sm leading-relaxed ${
                        p.featured ? 'text-white/90' : 'text-ink'
                      }`}
                    >
                      <span className={p.featured ? 'text-white' : 'text-blue'}>
                        <Tick />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-10">
                  <Link
                    href={p.href}
                    className={`w-full ${p.featured ? 'btn-secondary' : 'btn-primary'}`}
                  >
                    {p.cta}
                  </Link>
                </div>
              </div>
            </RevealAnimation>
          ))}
        </div>
      </Section>

      {/* ---------------- Example sites ---------------- */}
      <Section bg="white" width="wide">
        <RevealAnimation>
          <h2 className="max-w-[16ch] text-5xl text-navy md:text-6xl">
            What you actually get.
          </h2>
          <p className="mt-7 max-w-[50ch] font-sans text-lg leading-relaxed text-mid">
            Clean, fast and built to be read on a phone, because that is where most of
            your visitors are.
          </p>
        </RevealAnimation>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {MOCKUPS.map((label, i) => (
            <RevealAnimation key={i} delay={(i % 3) as 0 | 1 | 2}>
              <ImagePlaceholder aspect="4/3" label={label} />
            </RevealAnimation>
          ))}
        </div>

        <RevealAnimation>
          <ul className="mt-14 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {included.map(f => (
              <li key={f} className="flex gap-3 font-sans text-base leading-relaxed text-ink">
                <span className="text-blue">
                  <Tick />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </RevealAnimation>
      </Section>

      {/* ---------------- How it works ---------------- */}
      <Section bg="tint" width="wide">
        <RevealAnimation>
          <h2 className="max-w-[16ch] text-5xl text-navy md:text-6xl">How it works.</h2>
        </RevealAnimation>

        <ol className="mt-14 grid gap-10 md:grid-cols-4 md:gap-8">
          {steps.map((s, i) => (
            <RevealAnimation key={s.number} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <li className="border-t-2 border-blue pt-6">
                <span className="font-display text-5xl text-blue">{s.number}</span>
                <p className="mt-4 font-sans text-base leading-relaxed text-ink">{s.title}</p>
              </li>
            </RevealAnimation>
          ))}
        </ol>
      </Section>

      {/* ---------------- FAQ ---------------- */}
      <Section bg="white" width="narrow">
        <RevealAnimation>
          <h2 className="text-5xl text-navy md:text-6xl">Questions.</h2>
        </RevealAnimation>
        <div className="mt-12">
          {faqs.map(f => (
            <FAQ key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </Section>

      {/* ---------------- Testimonial ---------------- */}
      <Section bg="tint" width="default" tight>
        <RevealAnimation>
          {/* TODO: replace with a real client quote from lib/case-studies.ts */}
          <Testimonial
            quote={CASE_STUDIES[0].testimonial.quote}
            name={CASE_STUDIES[0].testimonial.name}
            role={CASE_STUDIES[0].testimonial.role}
            company={CASE_STUDIES[0].testimonial.company}
            size="inline"
            avatar
            isPlaceholder={CASE_STUDIES[0].isPlaceholder}
          />
        </RevealAnimation>
      </Section>

      {/* ---------------- CTA ---------------- */}
      <CTABand
        headline="Ready when you are."
        body="Two minutes with the estimate tool and you will know exactly what your site costs. No email required."
      />
    </>
  )
}
