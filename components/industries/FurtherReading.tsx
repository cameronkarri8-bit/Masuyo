import Link from 'next/link'
import ResourceCard, { type CardData } from '@/components/resources/ResourceCard'
import Container from '@/components/ui/Container'
import { Dot } from '@/components/ui/SectionTitle'

/**
 * Further reading: guides from Resources, then other industry pages. Hidden
 * when there is nothing to list.
 */
export default function FurtherReading({
  resources,
  industries,
}: {
  resources: CardData[]
  industries: { label: string; href: string }[]
}) {
  if (resources.length === 0 && industries.length === 0) return null
  return (
    <section aria-labelledby="further-reading-title" className="bg-paper py-16 sm:py-20">
      <Container>
        <h2 id="further-reading-title" className="text-title text-deep">
          Further reading
          <Dot />
        </h2>
        {resources.length > 0 && (
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {resources.map(r => (
              <li key={r.slug}>
                <ResourceCard r={r} onPaper />
              </li>
            ))}
          </ul>
        )}
        {industries.length > 0 && (
          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-body">
            {industries.map(i => (
              <li key={i.href}>
                <Link href={i.href} className="font-semibold text-petrol underline decoration-petrol/30 underline-offset-4 hover:decoration-petrol">
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  )
}
