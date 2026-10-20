import Icon from '@/components/brand/Icon'
import IconFlow from '@/components/diagrams/IconFlow'
import PhoneForm from '@/components/diagrams/PhoneForm'
import { ButtonLink } from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Section from '@/components/ui/Section'
import Tag from '@/components/ui/Tag'
import type { Sector } from '@/lib/content/sectors'
import ClosingBand from './ClosingBand'
import FaqSection from './FaqSection'
import PageHero from './PageHero'
import SectionHeader from './SectionHeader'

/**
 * The sector page template: hero with a phone drawing, the problem in three
 * lines, the lifecycle diagram (the centrepiece), what we build, who we work
 * with, questions and the closing band.
 *
 * The proof section is left out entirely until there is a real project in the
 * sector, as the copy spec asks.
 */
export default function SectorPage({ sector }: { sector: Sector }) {
  return (
    <>
      <PageHero
        eyebrow={sector.eyebrow}
        title={sector.h1}
        body={sector.body}
        actions={
          <ButtonLink href="/start" dark>
            Start a project
          </ButtonLink>
        }
        visual={<PhoneForm kind={sector.phone} className="mx-auto h-auto w-full max-w-sm" />}
      />

      <Section spacing="tight">
        <ul className="divide-y divide-petrol/15 border-y border-petrol/15">
          {sector.problems.map(line => (
            <li key={line} className="py-6 text-title text-deep sm:py-8">
              {line}
            </li>
          ))}
        </ul>
      </Section>

      <Section ground="paper" labelledBy="lifecycle-title">
        <SectionHeader id="lifecycle-title" title={sector.lifecycleTitle} />
        <div className="mt-14">
          <IconFlow steps={sector.lifecycle} onPaper />
        </div>
      </Section>

      <Section labelledBy="sector-build-title">
        <SectionHeader id="sector-build-title" title={sector.buildTitle} />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {sector.build.map(item => (
            <Card as="li" key={item.title} className="p-7">
              <Icon name={item.icon} size={48} />
              <h3 className="mt-5 text-subhead text-deep">{item.title}</h3>
            </Card>
          ))}
        </ul>
      </Section>

      <Section ground="paper" spacing="tight" labelledBy="who-title">
        <SectionHeader id="who-title" title="Who we work with." size="title" />
        <ul className="mt-6 flex flex-wrap gap-3">
          {sector.who.map(w => (
            <li key={w}>
              <Tag>{w}</Tag>
            </li>
          ))}
        </ul>
      </Section>

      <FaqSection items={sector.questions} />
      <ClosingBand />
    </>
  )
}
