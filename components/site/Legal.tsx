import { ContentsRail, JumpTo } from '@/components/resources/Contents'
import Container from '@/components/ui/Container'
import { slugify } from '@/lib/slug'

/**
 * The legal pages in the article layout: a contents list (in the margin on
 * wide screens, "Jump to" on a phone), the title and an "Updated" line. Their
 * text is unchanged from the previous site.
 */

export function LegalLayout({
  title,
  updated,
  contents,
  children,
}: {
  title: string
  updated: string
  contents: string[]
  children: React.ReactNode
}) {
  const headings = contents.map(text => ({ id: slugify(text), text }))
  return (
    <section className="bg-mist pb-24 pt-10 sm:pt-14">
      <Container>
        <div className="grid gap-10 xl:grid-cols-[13rem_minmax(0,42.5rem)_13rem] xl:justify-center xl:gap-14">
          <aside className="hidden xl:block">
            <ContentsRail headings={headings} />
          </aside>
          <div className="min-w-0">
            <h1 className="text-heading text-deep">{title}</h1>
            <p className="mt-4 text-small text-steel">Updated {updated}</p>
            <div className="mt-8 xl:hidden">
              <JumpTo headings={headings} />
            </div>
            <div className="article mt-10">{children}</div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 id={slugify(title)}>{title}</h2>
      {children}
    </section>
  )
}

export function P({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>
}

export function Ul({ items }: { items: string[] }) {
  return (
    <ul>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  )
}

export function ContactCard({ company, email }: { company: string; email: string }) {
  return (
    <div className="rounded-card bg-paper p-6">
      <p className="font-semibold text-deep">{company}</p>
      <a href={`mailto:${email}`}>{email}</a>
    </div>
  )
}
