import Container from '@/components/ui/Container'
import { Dot } from '@/components/ui/SectionTitle'
import type { IndustrySource } from '@/lib/industries/types'

/** Every source the page cites, numbered to match the markers in the copy. */
export default function SourcesList({ sources, ground = 'mist' }: { sources: IndustrySource[]; ground?: 'mist' | 'paper' }) {
  return (
    <section aria-labelledby="sources-title" className={`${ground === 'paper' ? 'bg-paper' : 'bg-mist'} py-14 sm:py-16`}>
      <Container>
        <h2 id="sources-title" className="text-title text-deep">
          Sources
          <Dot />
        </h2>
        <ol className="mt-6 max-w-3xl space-y-3 text-small text-steel">
          {sources.map(s => (
            <li key={s.n} id={`source-${s.n}`} className="flex gap-3">
              <span className="w-5 shrink-0 font-semibold text-deep">{s.n}</span>
              <span>
                {s.publisher},{' '}
                <a
                  href={s.url}
                  rel="noopener"
                  className="break-words text-petrol underline decoration-petrol/30 underline-offset-4 hover:decoration-petrol"
                >
                  {s.title}
                </a>
              </span>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
