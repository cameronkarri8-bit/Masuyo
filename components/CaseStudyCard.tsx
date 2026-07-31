import Link from 'next/link'
import ImagePlaceholder from '@/components/ImagePlaceholder'
import type { CaseStudy } from '@/lib/case-studies'

interface CaseStudyCardProps {
  study: CaseStudy
  /** Surface the card sits on, so it can pick a contrasting fill. */
  on?: 'white' | 'tint'
}

export default function CaseStudyCard({ study, on = 'white' }: CaseStudyCardProps) {
  const hero = study.images[0]

  return (
    <article className="h-full">
      <Link
        href={`/work/${study.slug}`}
        className={`hover-lift group flex h-full flex-col overflow-hidden rounded-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue ${
          on === 'white' ? 'bg-blue-tint' : 'bg-white'
        }`}
      >
        <ImagePlaceholder aspect={hero.aspect} rounded={false} label={hero.label} />

        <div className="flex flex-1 flex-col p-7">
          {study.isPlaceholder && (
            <p className="mb-4 inline-block self-start rounded-full bg-amber/15 px-3 py-1 font-sans text-xs font-semibold uppercase tracking-wider text-navy">
              Placeholder
            </p>
          )}

          <p className="font-sans text-xs font-semibold uppercase tracking-wider text-blue2">
            {study.industry}
          </p>

          <h3 className="mt-3 text-2xl text-navy">{study.client}</h3>

          <p className="mt-3 font-sans text-sm leading-relaxed text-mid">{study.summary}</p>

          <ul className="mt-5 flex flex-wrap gap-1.5">
            {study.services.map(s => (
              <li
                key={s}
                className="rounded-full bg-white/80 px-3 py-1 font-sans text-xs font-medium text-navy ring-1 ring-inset ring-border"
              >
                {s}
              </li>
            ))}
          </ul>

          <span className="mt-auto inline-flex items-center gap-1.5 pt-7 font-sans text-sm font-semibold text-navy transition-colors group-hover:text-blue2">
            Read the case study
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 7h8M7.5 4l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </Link>
    </article>
  )
}
