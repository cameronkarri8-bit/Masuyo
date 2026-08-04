import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import Section from '@/components/Section'
import CTABand from '@/components/CTABand'
import ImagePlaceholder from '@/components/ImagePlaceholder'
import AbstractPanel from '@/components/placeholder/AbstractPanel'

export const metadata: Metadata = {
  title: 'About',
  description:
    'A small team of senior people building digital things that actually work. No account managers, no offices, no bloat.',
  openGraph: {
    title: 'About Masuyo Digital',
    description:
      'A small team of senior people building digital things that actually work. No account managers, no offices, no bloat.',
    url: 'https://masuyodigital.com/about',
  },
  alternates: { canonical: 'https://masuyodigital.com/about' },
}

/*
  TODO: real names and bios.

  Every field below is a placeholder. No person here is real. Replace with the
  actual team, their actual roles and their actual words before this ships.
*/
const TEAM = [
  {
    name: 'TODO: real name',
    role: 'TODO: real role',
    bio: 'TODO: real bio. Two or three sentences on what they actually do here, what they were doing before, and something human.',
    shot: 'PLACEHOLDER: real team photo required',
  },
  {
    name: 'TODO: real name',
    role: 'TODO: real role',
    bio: 'TODO: real bio. Two or three sentences on what they actually do here, what they were doing before, and something human.',
    shot: 'PLACEHOLDER: real team photo required',
  },
  {
    name: 'TODO: real name',
    role: 'TODO: real role',
    bio: 'TODO: real bio. Two or three sentences on what they actually do here, what they were doing before, and something human.',
    shot: 'PLACEHOLDER: real team photo required',
  },
]

/** Existing values copy, kept as written and restyled as bold statements. */
const PRINCIPLES = [
  {
    title: 'We are honest.',
    body: 'If something will not work, we say so. We would rather lose a project than take your money for something that will not deliver results.',
  },
  {
    title: 'Results over deliverables.',
    body: 'A beautiful website that generates no enquiries is a failure. We measure success by business outcomes, not by what we have produced.',
  },
  {
    title: 'No jargon.',
    body: 'We explain what we are doing and why in plain language. You should always understand exactly where your money is going.',
  },
  {
    title: 'Direct relationships.',
    body: 'No account managers, no handoffs to offshore teams. The people you talk to are the people doing the work.',
  },
  {
    title: 'Everything connected.',
    body: 'Your website, marketing and technology should work together. Siloed digital services produce siloed results. We join it all up.',
  },
  {
    title: 'Long term thinking.',
    body: 'We build digital assets that grow in value over time. SEO, content, technology: the compounding effect of doing this properly is significant.',
  },
]

const HOW_WE_WORK = [
  {
    n: '01',
    title: 'We tell you the price first',
    body: 'Every number is published. You can work out roughly what your project costs before you speak to a single person.',
  },
  {
    n: '02',
    title: 'The person you speak to builds it',
    body: 'No handoffs, no briefing chains, nothing lost between the sale and the work.',
  },
  {
    n: '03',
    title: 'We say no when we should',
    body: 'If you do not need the thing you are asking for, we will tell you, even when it costs us the work.',
  },
  {
    n: '04',
    title: 'You own everything',
    body: 'Your site, your domain, your data, your logins. Nothing is rented back to you.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <Section bg="white" width="wide" tight>
        <RevealAnimation>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.06em] text-blue2">
            About
          </p>
          <h1 className="mt-5 max-w-[16ch] text-navy hero-display">
            A digital agency that does things properly.
          </h1>
          <p className="mt-8 max-w-[50ch] font-sans text-lg leading-relaxed text-mid">
            Based in the UK, working globally. No outsourcing, no bloated retainers, no
            fluff.
          </p>
        </RevealAnimation>
      </Section>

      {/* ---------------- The founding idea ---------------- */}
      <Section bg="tint" width="default">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1fr] lg:gap-20">
          <RevealAnimation>
            <h2 className="max-w-[14ch] text-4xl text-navy md:text-5xl">
              Why we started.
            </h2>
            <div className="mt-10 hidden lg:block">
              <AbstractPanel aspect="1/1" variant={0} />
            </div>
          </RevealAnimation>

          <RevealAnimation delay={1}>
            <div className="font-sans text-base leading-relaxed text-mid">
              <p>
                We started Masuyo because we saw too many businesses being sold digital
                services they did not understand, did not need, or that simply did not
                deliver. Overpromised SEO campaigns. Websites built by the cheapest
                contractor. Retainers for reports nobody reads.
              </p>
              <p className="mt-5">
                We wanted to do it differently. Honest work, delivered properly, by a team
                that cares whether it works.
              </p>
              <p className="mt-5">
                We work with businesses of all sizes, from sole traders getting online for
                the first time to established companies scaling their digital presence.
                What they share is that they want results, not jargon, and a team they can
                actually trust to get it done.
              </p>
            </div>
          </RevealAnimation>
        </div>
      </Section>

      {/* ---------------- The team ---------------- */}
      <Section bg="white" width="wide">
        <RevealAnimation>
          <h2 className="max-w-[16ch] text-5xl text-navy md:text-6xl">The team.</h2>
          <p className="mt-7 max-w-[50ch] font-sans text-lg leading-relaxed text-mid">
            Deliberately small. Everybody here is senior, and everybody here builds.
          </p>
        </RevealAnimation>

        {/* TODO: remove this notice once the real team content is in place */}
        <RevealAnimation delay={1}>
          <div className="mt-10 max-w-[52ch] rounded-card border-l-4 border-amber bg-blue-tint p-6">
            <p className="font-sans text-sm font-semibold text-navy">
              Team details are placeholders.
            </p>
            <p className="mt-2 font-sans text-sm leading-relaxed text-mid">
              The names, roles and bios below are not real and are waiting on the actual
              team content.
            </p>
          </div>
        </RevealAnimation>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {TEAM.map((person, i) => (
            <RevealAnimation key={i} delay={(i % 3) as 0 | 1 | 2}>
              <div className="hover-lift flex h-full flex-col overflow-hidden rounded-card bg-blue-tint">
                <ImagePlaceholder aspect="1/1" rounded={false} label={person.shot} />
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-2xl text-navy">{person.name}</h3>
                  <p className="mt-1 font-sans text-sm font-semibold text-blue2">{person.role}</p>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-mid">{person.bio}</p>
                </div>
              </div>
            </RevealAnimation>
          ))}
        </div>
      </Section>

      {/* ---------------- Principles ---------------- */}
      <Section bg="navy" width="wide">
        <RevealAnimation>
          <h2 className="max-w-[16ch] text-5xl text-white md:text-6xl">
            What we believe.
          </h2>
        </RevealAnimation>

        <div className="mt-16 flex flex-col divide-y divide-white/10">
          {PRINCIPLES.map((p, i) => (
            <RevealAnimation key={p.title} delay={(i % 3) as 0 | 1 | 2}>
              <div className="grid gap-4 py-10 lg:grid-cols-[0.9fr_1fr] lg:gap-16">
                <h3 className="max-w-[16ch] text-3xl text-white md:text-4xl">{p.title}</h3>
                <p className="font-sans text-base leading-relaxed text-white/70">{p.body}</p>
              </div>
            </RevealAnimation>
          ))}
        </div>
      </Section>

      {/* ---------------- How we work ---------------- */}
      <Section bg="white" width="wide">
        <RevealAnimation>
          <h2 className="max-w-[16ch] text-5xl text-navy md:text-6xl">How we work.</h2>
        </RevealAnimation>

        <ol className="mt-14 grid gap-10 md:grid-cols-2 md:gap-x-16">
          {HOW_WE_WORK.map((s, i) => (
            <RevealAnimation key={s.n} delay={(i % 2) as 0 | 1}>
              <li className="border-t-2 border-blue pt-6">
                <span className="font-display text-5xl text-blue">{s.n}</span>
                <h3 className="mt-4 text-2xl text-navy">{s.title}</h3>
                <p className="mt-3 font-sans text-base leading-relaxed text-mid">{s.body}</p>
              </li>
            </RevealAnimation>
          ))}
        </ol>
      </Section>

      {/* ---------------- Onward ---------------- */}
      <Section bg="tint" width="default" tight>
        <RevealAnimation>
          <h2 className="max-w-[20ch] text-4xl text-navy md:text-5xl">
            That is us. What are you building?
          </h2>
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
