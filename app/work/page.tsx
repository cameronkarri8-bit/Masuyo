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

      <Section>
        {/* Filters appear only once there are four or more projects. With a
            single project the card runs the full width, picture beside words,
            rather than leaving half the row empty. */}
        <ul className={`grid gap-8 ${items.length > 1 ? 'md:grid-cols-2' : ''}`}>
          {items.map(item => (
            <li key={item.slug}>
              <Link
                href={item.href ?? `/work/${item.slug}`}
                className={`group grid gap-6 ${items.length === 1 ? 'items-center lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-14' : ''}`}
              >
                <div className="overflow-hidden rounded-card bg-deep p-6 sm:p-8">
                  <div className="transition-transform duration-500 ease-brand group-hover:scale-[1.02]">
                    <PipelineBoard tone="dark" className="h-auto w-full" />
                  </div>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <h2 className="text-title text-deep underline decoration-transparent decoration-2 underline-offset-[5px] transition-colors group-hover:decoration-petrol">
                      {item.client}
                    </h2>
                    <span className="text-small text-steel">{item.sector}</span>
                  </div>
                  <p className="mt-2 text-lead text-steel">{item.line}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map(tag => (
                      <li key={tag}>
                        <Tag>{tag}</Tag>
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <ClosingBand />
    </>
  )
}
