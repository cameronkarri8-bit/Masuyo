import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import Section from '@/components/Section'
import CTABand from '@/components/CTABand'
import CaseStudyCard from '@/components/CaseStudyCard'
import ClientLogoStrip from '@/components/ClientLogoStrip'
import { CASE_STUDIES, HAS_PLACEHOLDER_CASE_STUDIES } from '@/lib/case-studies'

export default function WorkPage() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <Section bg="white" width="wide" tight>
        <RevealAnimation>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.06em] text-blue2">
            Work
          </p>
          <h1 className="mt-5 max-w-[15ch] text-navy hero-display">
            Proof, not promises.
          </h1>
          <p className="mt-8 max-w-[52ch] font-sans text-lg leading-relaxed text-mid">
            Every project below shows the problem, what we actually built, and what
            changed afterwards. No vanity metrics, no numbers we cannot back up.
          </p>
        </RevealAnimation>

        {HAS_PLACEHOLDER_CASE_STUDIES && (
          <RevealAnimation delay={1}>
            {/* TODO: remove once real case study content is in lib/case-studies.ts */}
            <div className="mt-10 max-w-[52ch] rounded-card border-l-4 border-amber bg-blue-tint p-6">
              <p className="font-sans text-sm font-semibold text-navy">
                These case studies are placeholders.
              </p>
              <p className="mt-2 font-sans text-sm leading-relaxed text-mid">
                The layout is built and waiting. The client names, figures and quotes are
                not real and will be replaced with approved content before this page goes
                out to anyone.
              </p>
            </div>
          </RevealAnimation>
        )}
      </Section>

      {/* ---------------- Case studies ---------------- */}
      <Section bg="white" width="wide" flush className="pb-24 md:pb-32">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CASE_STUDIES.map((study, i) => (
            <RevealAnimation key={study.slug} delay={(i % 3) as 0 | 1 | 2}>
              <CaseStudyCard study={study} on="white" />
            </RevealAnimation>
          ))}
        </div>
      </Section>

      {/* ---------------- Logos ---------------- */}
      <Section bg="tint" width="wide" tight>
        <RevealAnimation>
          <ClientLogoStrip />
        </RevealAnimation>
      </Section>

      {/* ---------------- Onward ---------------- */}
      <Section bg="white" width="default" tight>
        <RevealAnimation>
          <h2 className="max-w-[20ch] text-4xl text-navy md:text-5xl">
            Want something like this?
          </h2>
          <p className="mt-6 max-w-[48ch] font-sans text-lg leading-relaxed text-mid">
            The estimate tool gives you a real number in about a minute, without asking
            for your email first.
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
