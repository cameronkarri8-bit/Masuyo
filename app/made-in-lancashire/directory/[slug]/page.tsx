import type { Metadata } from 'next'
import Breadcrumbs from '@/components/industries/Breadcrumbs'
import { notFound, permanentRedirect } from 'next/navigation'
import { SingleShop } from '@/components/brand/illustrations/HighStreet'
import { CATEGORY_MOTIF, FoundingTag } from '@/components/made-in-lancashire/DirectoryGrid'
import ContactCard from '@/components/made-in-lancashire/ContactCard'
import Gallery from '@/components/made-in-lancashire/Gallery'
import { SHADOW } from '@/components/made-in-lancashire/FormBits'
import JsonLd from '@/components/site/JsonLd'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import { Dot } from '@/components/ui/SectionTitle'
import TextLink from '@/components/ui/TextLink'
import { breadcrumbJsonLd, checkedJsonLd } from '@/lib/industries/schema'
import { DIRECTORY_CRUMBS } from '@/lib/made-in-lancashire/schema'
import { encodeEmail, getMember, memberLinks, memberPath } from '@/lib/made-in-lancashire/directory'
import { DIRECTORY_PATH, MADE_IN_LANCASHIRE_PUBLIC } from '@/lib/made-in-lancashire/config'
import { pageMetadata } from '@/lib/metadata'
import { SITE } from '@/lib/site'

/**
 * A directory member's page: name, town, category, their story, photos,
 * hours, address and every link they gave.
 *
 * Rendered on every request, never cached. As ISR, a member's URL requested
 * before they were published cached its 404, and Next 14.2 kept serving that
 * 404 after they were published, until the next restart. Rendering each time
 * (with getMember() reading uncached) means approving, editing or
 * unpublishing shows straight away. Traffic is low, so one small read per
 * view is fine.
 */

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const m = await getMember(params.slug)
  if (!m) return {}
  return pageMetadata({
    title: `${m.business_name}, ${m.town} | Made in Lancashire directory`,
    description: m.one_line,
    path: memberPath(m.directory_slug),
    noindex: !MADE_IN_LANCASHIRE_PUBLIC,
  })
}

export default async function MemberPage({ params }: { params: { slug: string } }) {
  const m = await getMember(params.slug)
  if (!m) notFound()
  // An address they had before: send visitors (and search engines) to the current one.
  if (m.directory_slug !== params.slug) permanentRedirect(memberPath(m.directory_slug))
  const links = memberLinks(m)
  const url = `${SITE.url}${memberPath(m.directory_slug)}`
  const hasContact = Boolean(m.directory_email || m.directory_phone)
  const paragraphs = m.directory_blurb.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean)

  return (
    <>
      <section className="ground-dark bg-petrol text-paper" data-nav-ground="dark">
        <Container className="pb-12 pt-10 sm:pb-14 sm:pt-14">
          <Breadcrumbs items={[...DIRECTORY_CRUMBS, { name: m.business_name, href: memberPath(m.directory_slug) }]} dark />
          <h1 className="mt-6 text-display text-balance text-paper">{m.business_name}</h1>
          <p className="mt-4 text-lead text-mist">
            {m.town} · {m.category}
          </p>
          {m.founding_member && (
            <div className="mt-5">
              <FoundingTag dark />
            </div>
          )}
        </Container>
      </section>

      <Section spacing="tight">
        {/* On a phone, Contact comes first, above the photos. From lg it heads the
            sidebar, with the story and photos down the left. */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-x-14 lg:gap-y-6">
          {hasContact && (
            <div className="lg:col-start-2 lg:row-start-1">
              <ContactCard name={m.business_name} emailCode={m.directory_email ? encodeEmail(m.directory_email) : null} phone={m.directory_phone} />
            </div>
          )}
          <div className={`min-w-0 lg:col-start-1 lg:row-start-1 ${hasContact ? 'lg:row-span-2' : ''}`}>
            {m.photo_urls.length > 0 ? (
              <Gallery photos={m.photo_urls} name={m.business_name} />
            ) : (
              <div className="ground-dark rounded-card bg-petrol px-8 pt-6">
                <SingleShop motif={CATEGORY_MOTIF[m.category] ?? 'empty'} className="mx-auto h-auto w-full max-w-sm" />
              </div>
            )}
            <section aria-labelledby="about-title" className="mt-10">
              <h2 id="about-title" className="text-title text-deep">
                Their story
                <Dot />
              </h2>
              <p className="mt-4 text-lead text-deep">{m.one_line}</p>
              {paragraphs.length > 0 && paragraphs.join(' ') !== m.one_line && (
                <div className="mt-4 max-w-measure space-y-4 text-body text-steel">
                  {paragraphs.map((p, i) => (
                    <p key={i} className="whitespace-pre-line">
                      {p}
                    </p>
                  ))}
                </div>
              )}
            </section>
          </div>

          <aside className={`space-y-6 lg:col-start-2 ${hasContact ? 'lg:row-start-2' : 'lg:row-start-1'}`}>
            {(m.directory_hours || m.directory_address) && (
              <section aria-labelledby="visit-title" className={`rounded-card bg-paper p-6 sm:p-7 ${SHADOW}`}>
                <h2 id="visit-title" className="text-title text-deep">
                  Visit
                  <Dot />
                </h2>
                <dl className="mt-5 space-y-4 text-body">
                  {m.directory_address && (
                    <div>
                      <dt className="text-small text-steel">Address</dt>
                      <dd className="mt-1 whitespace-pre-line text-deep">
                        {m.directory_address}
                        <br />
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${m.directory_address}, ${m.town}`)}`}
                          rel="noopener"
                          className="inline-flex min-h-[2.75rem] items-center text-small font-semibold text-petrol underline decoration-petrol/40 underline-offset-4 hover:decoration-petrol"
                        >
                          Open in maps
                        </a>
                      </dd>
                    </div>
                  )}
                  {m.directory_hours && (
                    <div>
                      <dt className="text-small text-steel">Opening hours</dt>
                      <dd className="mt-1 whitespace-pre-line text-deep">{m.directory_hours}</dd>
                    </div>
                  )}
                </dl>
              </section>
            )}

            {links.length > 0 && (
              <section aria-labelledby="online-title" className={`rounded-card bg-paper p-6 sm:p-7 ${SHADOW}`}>
                <h2 id="online-title" className="text-title text-deep">
                  Find them online
                  <Dot />
                </h2>
                <ul className="mt-5 flex flex-wrap gap-3">
                  {links.map(l => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        rel="noopener"
                        className="inline-flex min-h-[2.75rem] items-center rounded-full border-2 border-petrol/25 px-4 text-small font-semibold text-petrol hover:border-petrol"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </aside>
        </div>

        <div className="mt-14 border-t border-petrol/15 pt-8">
          <TextLink href={DIRECTORY_PATH}>Back to the directory</TextLink>
        </div>
      </Section>

      <JsonLd
        data={checkedJsonLd([
          breadcrumbJsonLd([...DIRECTORY_CRUMBS, { name: m.business_name, href: memberPath(m.directory_slug) }]),
          {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: m.business_name,
          description: m.one_line,
          url,
          ...(m.photo_urls.length ? { image: m.photo_urls } : {}),
          address: {
            '@type': 'PostalAddress',
            ...(m.directory_address ? { streetAddress: m.directory_address } : {}),
            addressLocality: m.town,
            addressRegion: 'Lancashire',
            addressCountry: 'GB',
          },
          ...(m.directory_hours ? { openingHours: m.directory_hours } : {}),
          ...(m.directory_phone ? { telephone: m.directory_phone } : {}),
          ...(links.length ? { sameAs: links.map(l => l.href) } : {}),
          },
        ])}
      />
    </>
  )
}
