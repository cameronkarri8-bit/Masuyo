import Link from 'next/link'
import MilImage from './MilImage'

export interface CardFeature {
  slug: string
  business_name: string
  town: string
  category: string
  hook: string
  photo: string
  href: string
}

/** A feature card: photo, name, town and category. The whole card is the link. */
export default function FeatureCard({ f }: { f: CardFeature }) {
  return (
    <Link
      href={f.href}
      className="group flex h-full flex-col overflow-hidden rounded-card bg-paper shadow-[0_1px_2px_rgba(13,26,32,0.06),0_8px_24px_rgba(13,26,32,0.06)] transition-transform duration-200 ease-brand hover:-translate-y-1"
    >
      {/* Decorative: the business name sits right below as real text. */}
      <MilImage src={f.photo} alt="" width={1200} height={900} sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, 50vw" className="aspect-[4/3] h-auto w-full bg-mist object-cover" />
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="text-subhead text-deep underline decoration-transparent decoration-2 underline-offset-[5px] transition-colors group-hover:decoration-petrol">
          {f.business_name}
        </h3>
        <p className="mt-1 text-small text-steel">
          {f.town} · {f.category}
        </p>
      </div>
    </Link>
  )
}
