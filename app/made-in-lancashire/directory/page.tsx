import type { Metadata } from 'next'
import Link from 'next/link'
import DirectoryGrid from '@/components/made-in-lancashire/DirectoryGrid'
import JsonLd from '@/components/site/JsonLd'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import { Dot } from '@/components/ui/SectionTitle'
import TextLink from '@/components/ui/TextLink'
import { checkedJsonLd } from '@/lib/industries/schema'
import { getMembers, memberPath, REVALIDATE } from '@/lib/made-in-lancashire/directory'
import { DIRECTORY_PATH, MADE_IN_LANCASHIRE_PUBLIC, MIL_PATH } from '@/lib/made-in-lancashire/config'
import { pageMetadata } from '@/lib/metadata'
import { SITE } from '@/lib/site'

/**
 * The Made in Lancashire directory: every published member, read from the
 * directory_members view and refreshed every few minutes, so publishing in
 * MasCRM reaches the site without a rebuild. Builds cleanly with no members.
 */

export const revalidate = REVALIDATE

const INTRO = 'Independent Lancashire businesses, checked and approved by us. Every one is a founding member of the Made in Lancashire network.'

export const metadata: Metadata = pageMetadata({
  title: 'The Made in Lancashire directory | Masuyo',
  description: INTRO,
  path: DIRECTORY_PATH,
  noindex: !MADE_IN_LANCASHIRE_PUBLIC,
})

export default async function DirectoryPage() {
  const members = await getMembers()

  return (
    <>
      <section className="ground-dark bg-petrol text-paper" data-nav-ground="dark">
        <Container className="pb-14 pt-10 sm:pb-16 sm:pt-14">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-small text-mist">
              <li>
                <Link href={MIL_PATH} className="text-paper underline decoration-paper/40 underline-offset-4 hover:decoration-aqua">
                  Made in Lancashire
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">Directory</li>
            </ol>
          </nav>
          <h1 className="mt-6 text-display text-balance text-paper">
            The directory
            <Dot />
          </h1>
          <p className="mt-5 max-w-measure text-lead text-mist">{INTRO}</p>
        </Container>
      </section>

      <Section labelledBy="members-title">
        <h2 id="members-title" className="sr-only tracking-normal">
          Members
        </h2>
        {members.length === 0 ? (
          <div className="max-w-2xl">
            <p className="text-lead text-deep">Our first members are being added now.</p>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:gap-8">
              <TextLink href={`${MIL_PATH}#apply`}>Submit your business</TextLink>
              <TextLink href={MIL_PATH}>Back to Made in Lancashire</TextLink>
            </div>
          </div>
        ) : (
          <>
            <DirectoryGrid
              members={members.map(m => ({
                slug: m.directory_slug,
                href: memberPath(m.directory_slug),
                business_name: m.business_name,
                town: m.town,
                category: m.category,
                one_line: m.one_line,
                cover: m.photo_urls[0] ?? null,
              }))}
            />
            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:gap-8">
              <TextLink href={`${MIL_PATH}#apply`}>Submit your business</TextLink>
              <TextLink href={MIL_PATH}>Back to Made in Lancashire</TextLink>
            </div>
          </>
        )}
      </Section>

      <JsonLd
        data={checkedJsonLd({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'The Made in Lancashire directory',
          description: INTRO,
          url: `${SITE.url}${DIRECTORY_PATH}`,
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: members.length,
            itemListElement: members.map((m, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE.url}${memberPath(m.directory_slug)}`, name: `${m.business_name}, ${m.town}` })),
          },
        })}
      />
    </>
  )
}
