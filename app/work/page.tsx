import type { Metadata } from 'next'
import Link from 'next/link'
import Section from '@/components/Section'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected projects from Masuyo Digital.',
  openGraph: {
    title: 'Work | Masuyo Digital',
    description: 'Selected projects from Masuyo Digital.',
    url: 'https://masuyodigital.com/work',
  },
  alternates: { canonical: 'https://masuyodigital.com/work' },
}

/*
  PLACEHOLDER PAGE, built in Phase 2 so the new navigation does not point at a
  404. Phase 4 replaces this with the real case study layout.

  Nothing on this page claims a client, a result or a testimonial, because no
  real proof content has been supplied yet.
*/
export default function WorkPage() {
  return (
    <>
      <Section bg="white" width="wide" tight>
        <RevealAnimation>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-blue2">
            Work
          </p>
          <h1 className="mt-5 max-w-[16ch] text-6xl text-navy md:text-7xl">
            Case studies are on the way.
          </h1>
          <p className="mt-8 max-w-[52ch] font-sans text-lg leading-relaxed text-mid">
            We are putting this section together properly rather than filling it with
            stock logos and invented numbers. If you would like to see relevant examples
            of our work in the meantime, ask us and we will send them over.
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
