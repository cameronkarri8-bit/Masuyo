import Container from '@/components/ui/Container'
import { withDot } from '@/components/ui/SectionTitle'
import type { IndustrySource } from '@/lib/industries/types'
import RichText from './RichText'

/**
 * The direct answer, straight under the hero, for readers and for answer
 * engines that lift a short passage.
 */
export default function AnswerBlock({
  heading,
  paragraphs,
  sources,
}: {
  heading: string
  paragraphs: string[]
  sources: IndustrySource[]
}) {
  return (
    <section aria-labelledby="answer-title" className="bg-mist pt-14 sm:pt-16 lg:pt-20">
      <Container>
        <div className="max-w-3xl rounded-card border-l-4 border-petrol bg-paper p-6 sm:p-8">
          <h2 id="answer-title" className="text-title text-balance text-deep">
            {withDot(heading)}
          </h2>
          <div className="mt-4 space-y-4 text-lead text-deep">
            {paragraphs.map((p, i) => (
              <p key={i}>
                <RichText text={p} sources={sources} />
              </p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
