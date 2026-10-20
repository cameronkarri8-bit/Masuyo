import type { Metadata } from 'next'
import ClosingBand from '@/components/site/ClosingBand'
import PageHero from '@/components/site/PageHero'
import SectionHeader from '@/components/site/SectionHeader'
import Section from '@/components/ui/Section'
import { Dot } from '@/components/ui/SectionTitle'
import WorkCard from '@/components/work/WorkCard'
import { pageMetadata } from '@/lib/metadata'
import { publishedWork, type WorkKind } from '@/lib/work'

export const metadata: Metadata = pageMetadata({
  title: 'Work | Masuyo',
  description: 'Websites and web apps we have built, with screens from the real thing.',
  path: '/work',
})

const SECTIONS: { kind: WorkKind; title: string; intro: string }[] = [
  { kind: 'website', title: 'Websites.', intro: 'Sites that bring in enquiries, bookings and sales.' },
  { kind: 'web-app', title: 'Web apps.', intro: 'Systems, portals and apps that run the day to day.' },
]

export default function WorkPage() {
  const items = publishedWork()
  return (
    <>
      <PageHero
        title={
          <>
            Work
            <Dot />
          </>
        }
        body="Websites and web apps we have built, with screens from the real thing."
      />

      {SECTIONS.map((s, i) => {
        const list = items.filter(item => item.kind === s.kind)
        if (list.length === 0) return null
        return (
          <Section key={s.kind} ground={i % 2 ? 'paper' : undefined} labelledBy={`${s.kind}-title`}>
            <SectionHeader id={`${s.kind}-title`} title={s.title} intro={s.intro} />
            <ul className={`mt-12 grid gap-x-8 gap-y-14 ${list.length > 1 ? 'md:grid-cols-2' : 'md:max-w-[calc(50%-1rem)]'}`}>
              {list.map(item => (
                <li key={item.slug}>
                  <WorkCard item={item} panel={i % 2 ? 'mist' : 'paper'} />
                </li>
              ))}
            </ul>
          </Section>
        )
      })}

      <ClosingBand />
    </>
  )
}
