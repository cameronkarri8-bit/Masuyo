import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SingleShop } from '@/components/brand/illustrations/HighStreet'
import { CATEGORY_MOTIF, FoundingTag } from '@/components/made-in-lancashire/DirectoryGrid'
import Gallery from '@/components/made-in-lancashire/Gallery'
import { SHADOW } from '@/components/made-in-lancashire/FormBits'
import JsonLd from '@/components/site/JsonLd'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import { Dot } from '@/components/ui/SectionTitle'
import TextLink from '@/components/ui/TextLink'
import { checkedJsonLd } from '@/lib/industries/schema'
import { getMember, getMembers, memberLinks, memberPath, REVALIDATE } from '@/lib/made-in-lancashire/directory'
import { DIRECTORY_PATH, MADE_IN_LANCASHIRE_PUBLIC, MIL_PATH } from '@/lib/made-in-lancashire/config'
import { pageMetadata } from '@/lib/metadata'
import { SITE } from '@/lib/site'

/**
 * A directory member's page: name, town, category, their story, photos,
 * hours, address and every link they gave. Members published after the last
 * build are rendered on first visit and then cached like the rest.
 */

export const revalidate = REVALIDATE
export const dynamicParams = true

export async function generateStaticParams() {
  return (await getMembers()).map(m => ({ slug: m.directory_slug }))
}

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
  const links = memberLinks(m)
  const url = `${SITE.url}${memberPath(m.directory_slug)}`
  const paragraphs = m.directory_blurb.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean)

  return (
    <>
      <section className="ground-dark bg-petrol text-paper" data-nav-ground="dark">
        <Container className="pb-12 pt-10 sm:pb-14 sm:pt-14">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-small text-mist">
              <li>
                <Link href={MIL_PATH} className="text-paper underline decoration-paper/40 underline-offset-4 hover:decoration-aqua">
                  Made in Lancashire
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={DIRECTORY_PATH} className="text-paper underline decoration-paper/40 underline-offset-4 hover:decoration-aqua">
                  Directory
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{m.business_name}</li>
            </ol>
          </nav>
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
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-14">
          <div className="min-w-0">
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

          <aside className="space-y-6">
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
        data={checkedJsonLd({
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
          ...(links.length ? { sameAs: links.map(l => l.href) } : {}),
        })}
      />
    </>
  )
}
