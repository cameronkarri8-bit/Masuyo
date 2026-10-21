import PenMark from '@/components/brand/PenMark'
import { ButtonLink } from '@/components/ui/Button'
import Highlighter from '@/components/ui/Highlighter'

/**
 * "Help a local business get found.": the prompt to nominate someone else,
 * between the member offer and the forms. The button opens the nomination
 * form in the section below (#nominate).
 */
export default function NominateBand() {
  return (
    <section aria-labelledby="nominate-band-title" className="ground-dark bg-petrol text-paper">
      <div className="mx-auto grid max-w-site items-center gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div>
          <h2 id="nominate-band-title" className="text-heading text-balance text-paper">
            Help a local business get <Highlighter>found.</Highlighter>
          </h2>
          <p className="mt-5 max-w-measure text-lead text-mist">
            The café you send friends to. The trader who did a brilliant job. Put them forward and we&apos;ll do the rest.
            It&apos;s free for them, always.
          </p>
        </div>
        <div className="flex items-center gap-6 lg:justify-end">
          <PenMark type="loop-arrow" tone="aqua" className="hidden h-16 w-28 -scale-x-100 sm:block" />
          <ButtonLink href="#nominate" dark>
            Nominate a business
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
