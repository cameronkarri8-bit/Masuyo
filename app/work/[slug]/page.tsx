import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import GoingLive from '@/components/brand/illustrations/GoingLive'
import Icon from '@/components/brand/Icon'
import IconFlow from '@/components/diagrams/IconFlow'
import ClosingBand from '@/components/site/ClosingBand'
import PageHero from '@/components/site/PageHero'
import SectionHeader from '@/components/site/SectionHeader'
import Card from '@/components/ui/Card'
import Section from '@/components/ui/Section'
import Tag from '@/components/ui/Tag'
import TextLink from '@/components/ui/TextLink'
import { pageMetadata } from '@/lib/metadata'
import { caseStudySlugs, getWork } from '@/lib/work'

export const dynamicParams = false

export function generateStaticParams() {
  return caseStudySlugs().map(slug => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const item = getWork(params.slug)
  if (!item?.caseStudy) return {}
  return pageMetadata({
    title: item.caseStudy.metaTitle,
    description: item.caseStudy.description,
    path: `/work/${item.slug}`,
    // Unpublished case studies are reachable for review but never indexed.
    noindex: !item.published,
  })
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const item = getWork(params.slug)
  if (!item?.caseStudy) notFound()
  const cs = item.caseStudy
  const eyebrow = [item.sector, item.location].filter(Boolean).join(' · ')
  const glance = [
    { label: 'Needed', value: cs.atAGlance.needed },
    { label: 'Built', value: cs.atAGlance.built },
    { label: 'Result', value: cs.atAGlance.result },
  ].filter(g => g.value)

  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={cs.title}
        body={
          <ul className="flex flex-wrap gap-2">
            {item.tags.map(tag => (
              <li key={tag}>
                <Tag dark>{tag}</Tag>
              </li>
            ))}
          </ul>
        }
        visual={<GoingLive tone="dark" className="h-auto w-full" />}
      />

      <section aria-label="At a glance" className="bg-paper">
        <dl className="mx-auto grid max-w-site gap-6 px-5 py-8 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
          {glance.map(g => (
            <div key={g.label}>
              <dt className="text-small text-steel">{g.label}</dt>
              <dd className="mt-1 text-body font-semibold text-deep">{g.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <Section labelledBy="situation-title">
        <div className="max-w-measure">
          <SectionHeader id="situation-title" title="The situation." />
          <div className="mt-6 space-y-5 text-lead text-deep">
            {cs.situation.map(p => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
          </div>
        </div>
      </Section>

      <Section ground="paper" labelledBy="built-title">
        <SectionHeader id="built-title" title="What we built." />
        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cs.features.map(f => (
            <Card as="li" key={f.title} onPaper className="p-7">
              <Icon name={f.icon} size={48} />
              <h3 className="mt-5 text-subhead text-deep">{f.title}</h3>
              <p className="mt-1.5 text-body text-steel">{f.body}</p>
            </Card>
          ))}
        </ul>
      </Section>

      <Section labelledBy="now-title">
        <SectionHeader id="now-title" title="How it works now." />
        <div className="mt-14">
          <IconFlow steps={cs.nowFlow} highlight={cs.nowFlow.length - 1} numbered={false} />
        </div>
      </Section>

      {cs.results && cs.results.length > 0 && (
        <Section ground="paper" labelledBy="results-title">
          <SectionHeader id="results-title" title="Results." />
          <ul className="mt-8 space-y-3 text-lead text-deep">
            {cs.results.map(r => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </Section>
      )}

      {cs.quote && (
        <Section ground="petrol">
          <figure className="max-w-3xl">
            <blockquote className="text-title text-paper">{cs.quote.text}</blockquote>
            <figcaption className="mt-5 text-small text-mist">{cs.quote.name}</figcaption>
          </figure>
        </Section>
      )}

      <Section ground="paper" spacing="tight">
        <details className="group max-w-3xl rounded-card bg-mist p-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-subhead text-deep">
            Under the hood
            <span aria-hidden="true" className="text-petrol transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-4 text-body text-steel">{cs.underTheHood}</p>
        </details>
        <div className="mt-10">
          <TextLink href="/work">All work</TextLink>
        </div>
      </Section>

      <ClosingBand />
    </>
  )
}
