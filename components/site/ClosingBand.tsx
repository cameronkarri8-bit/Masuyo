import PenMark from '@/components/brand/PenMark'
import { ButtonLink } from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import { withDot } from '@/components/ui/SectionTitle'
import { CHECK_CTA, PRIMARY_CTA } from '@/lib/navigation'

/**
 * The closing band, at the foot of every main page.
 *
 * It asks a question the visitor can answer, which is easier to act on than a
 * promise. Heading and line on the left, the buttons on the right; stacked on
 * a phone with the buttons full width. The second button offers the free
 * website check, for visitors not ready for a project yet.
 */
export default function ClosingBand({
  title = 'What is slowing the business down?',
  body = 'Tell us in a few lines. You will get a straight answer on whether we can help, usually the same day.',
  action = PRIMARY_CTA,
  secondary = CHECK_CTA,
  penMark = true,
}: {
  title?: string
  body?: string
  action?: { label: string; href: string }
  /** The quieter second action. null for none. */
  secondary?: { label: string; href: string } | null
  /** Off on layouts that already use their one pen mark elsewhere. */
  penMark?: boolean
} = {}) {
  return (
    <section aria-labelledby="closing-band-title" className="ground-dark relative overflow-hidden bg-petrol text-paper">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <div className="max-w-2xl">
            <h2 id="closing-band-title" className="text-heading text-balance text-paper">
              {withDot(title)}
            </h2>
            <p className="mt-4 max-w-measure text-lead text-mist">
              {body}
            </p>
          </div>
          <div className="relative flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            {penMark && (
              <PenMark
                type="loop-arrow"
                tone="aqua"
                className="pointer-events-none absolute -left-40 -top-14 hidden h-16 w-32 lg:block"
              />
            )}
            <ButtonLink href={action.href} dark full className="sm:w-auto">
              {action.label}
            </ButtonLink>
            {secondary && secondary.href !== action.href && (
              <ButtonLink href={secondary.href} dark full variant="secondary" className="sm:w-auto">
                {secondary.label}
              </ButtonLink>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
