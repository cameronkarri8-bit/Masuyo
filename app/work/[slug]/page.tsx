import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Icon from '@/components/brand/Icon'
import ClosingBand from '@/components/site/ClosingBand'
import PageHero from '@/components/site/PageHero'
import SectionHeader from '@/components/site/SectionHeader'
import Card from '@/components/ui/Card'
import Section from '@/components/ui/Section'
import { Dot } from '@/components/ui/SectionTitle'
import TextLink from '@/components/ui/TextLink'
import DeviceFrame from '@/components/work/DeviceFrame'
import Gallery from '@/components/work/Gallery'
import { pageMetadata } from '@/lib/metadata'
import { WORK, getWork, leadImages } from '@/lib/work'

export const dynamicParams = false

export function generateStaticParams() {
  return WORK.map(item => ({ slug: item.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const item = getWork(params.slug)
  if (!item) return {}
  return pageMetadata({
    title: `${item.name} | Work | Masuyo`,
    description: item.line,
    path: `/work/${item.slug}`,
    // Unpublished projects are reachable for review but never indexed or linked.
    noindex: !item.published,
  })
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const item = getWork(params.slug)
  if (!item) notFound()
  const { desktop } = leadImages(item)
  const glance = [
    { label: 'Type', value: item.kind === 'website' ? 'Website' : 'Web app' },
    { label: 'What it does', value: item.glance },
    { label: 'Built with', value: item.builtWith },
  ]

  return (
    <>
      <PageHero
        title={
          <>
            {item.name}
            <Dot />
          </>
        }
        body={
          <>
            <p>{item.line}</p>
            <p className="mt-4 text-small text-aqua">{item.tags.join(' · ')}</p>
          </>
        }
        visual={desktop ? <DeviceFrame image={desktop} dark priority sizes="(min-width: 1024px) 40vw, 90vw" /> : undefined}
      />

      <section aria-label="At a glance" className="bg-paper">
        <dl className="mx-auto grid max-w-site gap-6 px-5 py-8 sm:grid-cols-3 sm:px-8">
          {glance.map(g => (
            <div key={g.label}>
              <dt className="text-small text-steel">{g.label}</dt>
              <dd className="mt-1 text-body font-semibold text-deep">{g.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <Section labelledBy="problem-title">
        <div className="max-w-measure">
          <SectionHeader id="problem-title" title="The problem it solves." />
          <p className="mt-6 text-lead text-deep">{item.problem}</p>
        </div>
      </Section>

      <Section ground="paper" labelledBy="does-title">
        <SectionHeader id="does-title" title="What it does." />
        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {item.features.map(f => (
            <Card as="li" key={f.title} onPaper className="p-7">
              <Icon name={f.icon} size={48} />
              <h3 className="mt-5 text-subhead text-deep">{f.title}</h3>
              <p className="mt-1.5 text-body text-steel">{f.body}</p>
            </Card>
          ))}
        </ul>
      </Section>

      <Section labelledBy="screens-title">
        <SectionHeader id="screens-title" title="The screens." intro="Shown with sample data. Tap any screen to see it larger." />
        <div className="mt-12">
          <Gallery images={item.images} name={item.name.toLowerCase()} />
        </div>
      </Section>

      <Section ground="paper" spacing="tight">
        <details className="group max-w-3xl rounded-card bg-mist p-6">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 text-subhead text-deep">
            Under the hood
            <span aria-hidden="true" className="text-petrol transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-4 text-body text-steel">{item.underTheHood}</p>
        </details>
        <div className="mt-10">
          <TextLink href="/work">All work</TextLink>
        </div>
      </Section>

      <ClosingBand />
    </>
  )
}
