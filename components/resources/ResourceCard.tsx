import Link from 'next/link'

export interface CardData {
  slug: string
  title: string
  description: string
  category: string
  readingTime: number
}

/** An article card: category, title, one line summary, read time. The whole card is the link. */
export default function ResourceCard({ r, large = false, onPaper = false }: { r: CardData; large?: boolean; onPaper?: boolean }) {
  return (
    <Link
      href={`/resources/${r.slug}`}
      className={`group flex h-full flex-col rounded-card p-6 transition-transform duration-200 ease-brand hover:-translate-y-1 sm:p-7 ${
        onPaper ? 'bg-mist' : 'bg-paper'
      } ${large ? 'lg:p-9' : ''}`}
    >
      <p className="text-small text-steel">{r.category}</p>
      <h3 className={`mt-2 text-deep underline decoration-transparent decoration-2 underline-offset-[5px] transition-colors group-hover:decoration-petrol ${large ? 'text-title' : 'text-subhead'}`}>
        {r.title}
      </h3>
      <p className="mt-3 flex-1 text-body text-steel">{r.description}</p>
      <p className="mt-5 text-small text-petrol">{r.readingTime} min read</p>
    </Link>
  )
}
