import type { Metadata } from 'next'
import Link from 'next/link'
import Section from '@/components/Section'
import CTABand from '@/components/CTABand'
import RevealAnimation from '@/components/RevealAnimation'
import {
  getAllGuides,
  getGuidesByCluster,
  GUIDE_CLUSTERS,
  GUIDE_CLUSTER_LABELS,
  type GuideMeta,
} from '@/lib/guides'

/*
  The guides hub.

  Clusters render only when they have content, so adding a cluster to
  GUIDE_CLUSTERS without writing a guide for it changes nothing here. Within a
  cluster the loader already sorts featured first, then newest by updated date.
*/

export const metadata: Metadata = {
  title: 'Guides',
  description:
    'Practical guides on website cost, platform choice, briefing an agency, maintenance and getting more enquiries. Written for UK small businesses, with real figures.',
  openGraph: {
    title: 'Guides | Masuyo Digital',
    description:
      'Practical guides on website cost, platform choice, briefing an agency, maintenance and getting more enquiries.',
    url: 'https://masuyodigital.com/guides',
  },
  alternates: { canonical: 'https://masuyodigital.com/guides' },
}

function GuideCard({ guide, index }: { guide: GuideMeta; index: number }) {
  return (
    <RevealAnimation delay={(index % 3) as 0 | 1 | 2}>
      <Link
        href={`/guides/${guide.slug}`}
        className="hover-lift group flex h-full min-w-0 flex-col rounded-card bg-white p-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
      >
        {guide.featured && (
          <span className="mb-4 inline-flex w-fit rounded-full bg-blue-tint px-3 py-1 font-sans text-xs font-semibold uppercase tracking-wider text-blue2">
            Start here
          </span>
        )}
        <h3 className="text-2xl text-navy">{guide.title}</h3>
        <p className="mt-3 font-sans text-base leading-relaxed text-mid">{guide.description}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-6 font-sans text-sm font-semibold text-navy transition-colors group-hover:text-blue2">
          Read the guide
          {guide.readingTime > 0 && (
            <span className="font-normal text-mid">
              <span aria-hidden="true"> &middot; </span>
              {guide.readingTime} min read
            </span>
          )}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M3 7h8M7.5 4l3 3-3 3"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </Link>
    </RevealAnimation>
  )
}

export default function GuidesPage() {
  const all = getAllGuides()
  const clusters = GUIDE_CLUSTERS.map(cluster => ({
    cluster,
    label: GUIDE_CLUSTER_LABELS[cluster],
    guides: getGuidesByCluster(cluster),
  })).filter(group => group.guides.length > 0)

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <Section bg="white" width="wide" tight>
        <RevealAnimation>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.06em] text-blue2">
            Guides
          </p>
          <h1 className="mt-5 max-w-[16ch] text-navy hero-display">
            Straight answers about websites
          </h1>
          <p className="mt-8 max-w-[54ch] font-sans text-lg leading-relaxed text-mid">
            What things cost, which platform to pick, how to brief the work and how to get more
            out of the site you already have. Real figures, no gatekeeping.
          </p>
        </RevealAnimation>
      </Section>

      {/* ---------------- Clusters ---------------- */}
      {clusters.map((group, groupIndex) => (
        <Section
          key={group.cluster}
          bg={groupIndex % 2 === 0 ? 'tint' : 'white'}
          width="wide"
        >
          <RevealAnimation>
            <h2 className="max-w-[20ch] text-4xl text-navy md:text-5xl">{group.label}</h2>
          </RevealAnimation>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {group.guides.map((guide, i) => (
              <GuideCard key={guide.slug} guide={guide} index={i} />
            ))}
          </div>
        </Section>
      ))}

      {all.length === 0 && (
        <Section bg="tint" width="wide">
          <p className="font-sans text-lg text-mid">Guides are on the way.</p>
        </Section>
      )}

      <CTABand />
    </>
  )
}
