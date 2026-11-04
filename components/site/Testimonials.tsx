import Image from 'next/image'
import SectionHeader from '@/components/site/SectionHeader'
import Section from '@/components/ui/Section'
import { initials, TESTIMONIALS, type Testimonial } from '@/lib/testimonials'

/**
 * What clients and collaborators say: one card each, with the quote, the
 * person's name and role, and their headshot. A person without a photo yet
 * shows their initials in the same circle, so the layout does not change
 * when the photo is added (see lib/testimonials.ts).
 *
 * Petrol on the home page, a light ground on About. Aqua appears only on
 * petrol, for the quotation mark.
 */

function Headshot({ t, dark }: { t: Testimonial; dark: boolean }) {
  if (t.photo) {
    return (
      <Image
        src={t.photo}
        alt={`${t.name}, ${t.role}`}
        width={112}
        height={112}
        loading="lazy"
        className="h-14 w-14 shrink-0 rounded-full object-cover"
      />
    )
  }
  return (
    <span
      aria-hidden="true"
      data-headshot-placeholder
      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-body font-bold ${
        dark ? 'bg-paper/10 text-paper ring-1 ring-inset ring-paper/25' : 'bg-mist text-petrol ring-1 ring-inset ring-petrol/20'
      }`}
    >
      {initials(t.name)}
    </span>
  )
}

export default function Testimonials({
  ground = 'petrol',
  title = 'What people say about working with us.',
}: {
  ground?: 'petrol' | 'mist' | 'paper'
  title?: string
}) {
  const dark = ground === 'petrol'
  const card = dark ? 'bg-paper/[0.06] ring-1 ring-inset ring-paper/10' : ground === 'paper' ? 'bg-mist' : 'bg-paper'
  return (
    <Section ground={ground} labelledBy="testimonials-title">
      <SectionHeader id="testimonials-title" title={title} dark={dark} />
      <ul className="mt-10 grid items-start gap-5 lg:grid-cols-3">
        {TESTIMONIALS.map(t => (
          <li key={t.name}>
            <figure className={`flex h-full flex-col rounded-card p-6 sm:p-7 ${card}`}>
              <span aria-hidden="true" className={`text-[3.5rem] font-extrabold leading-none ${dark ? 'text-aqua' : 'text-petrol'}`}>
                &ldquo;
              </span>
              <blockquote className={`-mt-3 text-body ${dark ? 'text-paper' : 'text-deep'}`}>
                <p>{t.quote}</p>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-4">
                <Headshot t={t} dark={dark} />
                <span>
                  <span className={`block text-body font-semibold ${dark ? 'text-paper' : 'text-deep'}`}>{t.name}</span>
                  <span className={`block text-small ${dark ? 'text-mist' : 'text-steel'}`}>{t.role}</span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  )
}
