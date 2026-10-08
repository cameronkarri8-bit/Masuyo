import SectionHeader from '@/components/site/SectionHeader'
import Accordion from '@/components/ui/Accordion'
import Section from '@/components/ui/Section'
import type { IndustryFaq, IndustrySource } from '@/lib/industries/types'
import RichText from './RichText'

/**
 * The questions, as an accordion. Closed answers stay in the server HTML
 * (hidden, not removed), so crawlers read every answer. The FAQPage schema
 * is built from the same data in lib/industries/schema.ts.
 */
export default function IndustryFaqs({
  faqs,
  sources,
  title = 'Questions.',
  ground = 'paper',
}: {
  faqs: IndustryFaq[]
  sources: IndustrySource[]
  title?: string
  ground?: 'mist' | 'paper'
}) {
  return (
    <Section ground={ground} labelledBy="questions-title">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
        <SectionHeader id="questions-title" title={title} />
        <Accordion
          items={faqs.map(f => ({
            question: f.question,
            answer: <RichText text={f.answer} sources={sources} />,
          }))}
        />
      </div>
    </Section>
  )
}
