import Accordion from '@/components/ui/Accordion'
import Section from '@/components/ui/Section'
import SectionHeader from './SectionHeader'
import JsonLd from './JsonLd'

/**
 * Questions, as an accordion, with matching FAQPage structured data so the
 * answers search engines read are exactly the ones on the page.
 */
export default function FaqSection({
  items,
  title = 'Questions.',
  ground = 'mist',
}: {
  items: { question: string; answer: string }[]
  title?: string
  ground?: 'mist' | 'paper'
}) {
  return (
    <Section ground={ground} labelledBy="questions-title">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
        <SectionHeader id="questions-title" title={title} />
        <Accordion items={items} />
      </div>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: items.map(item => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
          })),
        }}
      />
    </Section>
  )
}
