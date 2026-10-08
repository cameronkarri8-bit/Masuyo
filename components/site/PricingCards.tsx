import Card from '@/components/ui/Card'
import TextLink from '@/components/ui/TextLink'
import { careBothText, SYSTEMS, WEBSITES } from '@/lib/pricing'

/**
 * The typical price cards, shared by the pricing page and the industry pages.
 *
 * Every figure comes from lib/pricing.ts, so the cards can never disagree with
 * the rest of the site.
 */

export type PricingCardKey = 'websites' | 'systems' | 'care'

export const PRICING_CARDS: Record<PricingCardKey, { name: string; price: string; body: string; link: string; href: string }> = {
  websites: {
    name: 'Websites',
    price: WEBSITES.range,
    body: 'A fast, connected website with bookings, quotes or a shop. Simpler sites sit at the lower end.',
    link: 'About websites',
    href: '/websites',
  },
  systems: {
    name: 'Systems',
    price: SYSTEMS.fromText,
    body: 'A custom CRM, portal or automation, built in stages. Most start with one stage and grow.',
    link: 'About systems',
    href: '/systems',
  },
  care: {
    name: 'Care',
    price: careBothText,
    body: 'Hosting, security, updates and improvements. Included with every build from launch.',
    link: 'Compare Care plans',
    href: '/care#plans',
  },
}

export const VAT_NOTE = 'Masuyo is not VAT registered, so the price you see is the price you pay.'

export default function PricingCards({
  items = ['websites', 'systems', 'care'],
  onPaper = false,
}: {
  items?: PricingCardKey[]
  onPaper?: boolean
}) {
  const cols = items.length === 1 ? '' : items.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'
  return (
    <>
      <ul className={`mt-12 grid gap-5 ${cols}`}>
        {items.map(key => {
          const card = PRICING_CARDS[key]
          return (
            <Card as="li" key={key} onPaper={onPaper} className="flex flex-col p-7 sm:p-8">
              <h3 className="text-subhead text-deep">{card.name}</h3>
              <p className="mt-3 text-title text-petrol">{card.price}</p>
              <p className="mt-3 flex-1 text-body text-steel">{card.body}</p>
              <div className="mt-6">
                <TextLink href={card.href}>{card.link}</TextLink>
              </div>
            </Card>
          )
        })}
      </ul>
      <p className="mt-8 text-body font-semibold text-deep">{VAT_NOTE}</p>
    </>
  )
}
