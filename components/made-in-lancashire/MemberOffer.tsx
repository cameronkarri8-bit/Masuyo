import Icon from '@/components/brand/Icon'
import { ButtonLink } from '@/components/ui/Button'
import Highlighter from '@/components/ui/Highlighter'
import SectionTitle, { Dot } from '@/components/ui/SectionTitle'
import { CARE_PLANS, gbp, WEBSITES } from '@/lib/pricing'

/**
 * The thank you for members: three months of Care free with a new website,
 * and the three steps to get there. Prices come from lib/pricing.ts, so this
 * can never disagree with the pricing page.
 */

const STEPS = [
  { title: 'Free check', body: 'We look over your site and send you what we find.', icon: 'seo' as const },
  { title: 'Quick chat', body: 'We agree what you need, at a fixed price.', icon: 'support' as const },
  { title: 'Go live', body: 'Your new site goes live, with three months of Care free.', icon: 'growth' as const },
]

export default function MemberOffer({ onPaper = false }: { onPaper?: boolean }) {
  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
      <div>
        <SectionTitle id="offer-title">A thank you for members.</SectionTitle>
        <p className="mt-4 max-w-measure text-lead text-steel">
          The bakery that sells out by ten, the trader everyone recommends, the shop that has been on the corner for years.
          If you&apos;re a Made in Lancashire member and want a better website, here&apos;s something just for you.
        </p>
        <ol className="mt-10 space-y-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className={`flex items-start gap-5 rounded-card p-5 ${onPaper ? 'bg-mist' : 'bg-paper'}`}>
              <Icon name={s.icon} size={40} />
              <div>
                <h3 className="text-subhead text-deep">
                  <span className="text-petrol">{i + 1}.</span> {s.title}
                </h3>
                <p className="mt-1 text-body text-steel">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="lg:pt-16">
        <div className="ground-dark relative rounded-card bg-petrol p-7 text-paper sm:p-9">
          <h3 className="text-heading text-balance text-paper">
            Three months of Care, <Highlighter>free</Highlighter>
            <Dot />
          </h3>
          <p className="mt-4 text-body text-mist">
            Care covers hosting, updates, backups and small changes. Have your new website built by Masuyo and the first
            three months are on us.
          </p>
          <dl className="mt-8 divide-y divide-paper/15 border-y border-paper/15">
            <div className="flex items-baseline justify-between gap-4 py-4">
              <dt className="text-body font-semibold text-paper">Websites</dt>
              <dd className="text-subhead text-paper">{WEBSITES.fromText.replace('From', 'from')}</dd>
            </div>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-4">
              <dt className="text-body font-semibold text-paper">Care plan</dt>
              <dd className="flex items-baseline gap-3">
                <s className="text-body text-mist">
                  <span className="sr-only">Usually </span>
                  {gbp(CARE_PLANS.care.monthly)} a month
                </s>
                <span className="text-subhead text-aqua">£0 for 3 months</span>
              </dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <ButtonLink href="/check" dark>
              Get your free check
            </ButtonLink>
            <p className="text-small text-mist">Or email hello@masuyodigital.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}
