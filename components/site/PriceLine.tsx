import Container from '@/components/ui/Container'
import TextLink from '@/components/ui/TextLink'

/** A single centred price sentence in a quiet panel, with a link to pricing. */
export default function PriceLine({ children, href = '/pricing', link = 'See full pricing' }: { children: React.ReactNode; href?: string; link?: string }) {
  return (
    <section aria-label="Price" className="bg-mist py-12 sm:py-16">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-card bg-paper px-6 py-8 text-center sm:px-10">
          <p className="text-lead text-deep">{children}</p>
          <TextLink href={href}>{link}</TextLink>
        </div>
      </Container>
    </section>
  )
}
