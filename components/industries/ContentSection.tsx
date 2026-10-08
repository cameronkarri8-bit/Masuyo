import PricingCards from '@/components/site/PricingCards'
import SectionHeader from '@/components/site/SectionHeader'
import Steps from '@/components/site/Steps'
import Section, { type Ground } from '@/components/ui/Section'
import type { IndustrySection, IndustrySource } from '@/lib/industries/types'
import { slugify } from '@/lib/slug'
import FeatureLists from './FeatureLists'
import RichText from './RichText'

/**
 * One section of an industry page: a title, its paragraphs, and optionally a
 * two column feature list, numbered steps or the shared pricing cards.
 */
export default function ContentSection({
  section,
  sources,
  ground,
}: {
  section: IndustrySection
  sources: IndustrySource[]
  ground: Extract<Ground, 'mist' | 'paper'>
}) {
  const titleId = `${slugify(section.heading)}-title`
  const paragraphs = (list: string[]) => (
    <div className="max-w-measure space-y-5 text-body text-steel">
      {list.map((p, i) => (
        <p key={i}>
          <RichText text={p} sources={sources} />
        </p>
      ))}
    </div>
  )

  return (
    <Section ground={ground} id={section.pricing ? 'pricing' : undefined} labelledBy={titleId}>
      <SectionHeader id={titleId} title={section.heading} />
      {section.paragraphs.length > 0 && <div className="mt-6">{paragraphs(section.paragraphs)}</div>}
      {section.bulletGroups && section.bulletGroups.length > 0 && (
        <div className="mt-10">
          <FeatureLists groups={section.bulletGroups} sources={sources} />
        </div>
      )}
      {section.steps && section.steps.length > 0 && (
        <div className="mt-12">
          <Steps
            steps={section.steps.map(s => ({
              title: s.title,
              body: s.body ? <RichText text={s.body} sources={sources} /> : undefined,
            }))}
          />
        </div>
      )}
      {section.pricing && <PricingCards items={section.pricing} onPaper={ground === 'paper'} />}
      {section.after && section.after.length > 0 && <div className="mt-8">{paragraphs(section.after)}</div>}
    </Section>
  )
}
