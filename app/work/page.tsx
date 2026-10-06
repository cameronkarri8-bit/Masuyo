import type { Metadata } from 'next'
import Link from 'next/link'
import PipelineBoard from '@/components/diagrams/PipelineBoard'
import ClosingBand from '@/components/site/ClosingBand'
import PageHero from '@/components/site/PageHero'
import Section from '@/components/ui/Section'
import Tag from '@/components/ui/Tag'
import { pageMetadata } from '@/lib/metadata'
import { publishedWork } from '@/lib/work'

export const metadata: Metadata = pageMetadata({
  title: 'Work | Masuyo',
  description:
    'Websites and systems we have built for growing businesses, explained plainly: what they had, what we built and what changed.',
  path: '/work',
})

export default function WorkPage() {
  const items = publishedWork()
  return (
    <>
      <PageHero
        eyebrow="Work"
        title="Real projects, explained plainly."
        body="What each business had before, what we built and how it works now. Every project here is live and shared with the client's permission."
      />

      <Section labelledBy="work-list">
        <h2 id="work-list" className="sr-only">
          Projects
        </h2>
        {/* Filters appear only once there are four or more projects. */}
        <ul className="grid gap-8 md:grid-cols-2">
          {items.map(item => (
            <li key={item.slug}>
              <Link href={item.href ?? `/work/${item.slug}`} className="group block">
                <div className="overflow-hidden rounded-card bg-deep p-6 sm:p-8">
                  <div className="transition-transform duration-500 ease-brand group-hover:scale-[1.02]">
                    <PipelineBoard tone="dark" className="h-auto w-full" />
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
                  <h3 className="text-subhead text-deep underline decoration-transparent decoration-2 underline-offset-[5px] transition-colors group-hover:decoration-petrol">
                    {item.client}
                  </h3>
                  <span className="text-small text-steel">{item.sector}</span>
                </div>
                <p className="mt-1.5 text-body text-steel">{item.line}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {item.tags.map(tag => (
                    <li key={tag}>
                      <Tag>{tag}</Tag>
                    </li>
                  ))}
                </ul>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <ClosingBand />
    </>
  )
}
