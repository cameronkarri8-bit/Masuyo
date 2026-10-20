import Container from '@/components/ui/Container'
import TextLink from '@/components/ui/TextLink'
import { CHECK_PATH } from '@/lib/check/config'

/**
 * A quiet line offering the free website check, for pages about websites.
 *
 * band: a slim strip of its own between sections, on the ground that
 * contrasts with the section above it. card: a panel inside an article, used
 * at the end of every Resources article.
 */
export default function CheckInvite({
  variant = 'band',
  ground = 'paper',
  title = 'Already have a website.',
  body = 'Get a free check of how it is doing: speed, Google, enquiries and trust. Cameron checks it by hand and sends a short report within two working days.',
  link = 'Get a free website check',
}: {
  variant?: 'band' | 'card'
  ground?: 'mist' | 'paper'
  title?: string
  body?: string
  link?: string
}) {
  const inner = (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-10">
      <div className="max-w-2xl">
        <p className="text-subhead text-deep">{title}</p>
        <p className="mt-1 text-body text-steel">{body}</p>
      </div>
      <p className="shrink-0">
        <TextLink href={CHECK_PATH}>{link}</TextLink>
      </p>
    </div>
  )
  if (variant === 'card') {
    return <aside aria-label="Free website check" className="mt-12 rounded-card border-l-4 border-petrol bg-paper p-6">{inner}</aside>
  }
  return (
    <aside aria-label="Free website check" className={`${ground === 'paper' ? 'bg-paper' : 'bg-mist'} border-t border-petrol/10 py-10 sm:py-12`}>
      <Container>{inner}</Container>
    </aside>
  )
}
