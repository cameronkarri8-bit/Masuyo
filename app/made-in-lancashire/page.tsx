import type { Metadata } from 'next'
import HighStreet from '@/components/brand/illustrations/HighStreet'
import Wordmark from '@/components/brand/Wordmark'
import BadgeStrip from '@/components/made-in-lancashire/BadgeStrip'
import { MemberCard } from '@/components/made-in-lancashire/DirectoryGrid'
import FeatureGrid from '@/components/made-in-lancashire/FeatureGrid'
import ForwardSection from '@/components/made-in-lancashire/ForwardSection'
import FounderNote from '@/components/made-in-lancashire/FounderNote'
import MemberOffer from '@/components/made-in-lancashire/MemberOffer'
import NominateBand from '@/components/made-in-lancashire/NominateBand'
import PreviewNote from '@/components/made-in-lancashire/PreviewNote'
import Breadcrumbs from '@/components/industries/Breadcrumbs'
import VerticalVideo from '@/components/made-in-lancashire/VerticalVideo'
import WhyItMatters from '@/components/made-in-lancashire/WhyItMatters'
import YourBusinessCard from '@/components/made-in-lancashire/YourBusinessCard'
import JsonLd from '@/components/site/JsonLd'
import PageHero from '@/components/site/PageHero'
import SectionHeader from '@/components/site/SectionHeader'
import { ButtonLink } from '@/components/ui/Button'
import Highlighter from '@/components/ui/Highlighter'
import Section from '@/components/ui/Section'
import { Dot } from '@/components/ui/SectionTitle'
import TextLink from '@/components/ui/TextLink'
import { featurePath, getFeatures } from '@/lib/made-in-lancashire'
import { DIRECTORY_PATH, HUB_DESCRIPTION, MADE_IN_LANCASHIRE_PUBLIC, MIL_PATH } from '@/lib/made-in-lancashire/config'
import { getMembers, memberPath, REVALIDATE } from '@/lib/made-in-lancashire/directory'
import { HUB_CRUMBS, HUB_TITLE, hubJsonLd } from '@/lib/made-in-lancashire/schema'
import { breadcrumbJsonLd, checkedJsonLd } from '@/lib/industries/schema'
import { pageMetadata } from '@/lib/metadata'

/**
 * Made in Lancashire: a permanent home for the series, where independent
 * Lancashire businesses can apply, be nominated and join the directory.
 *
 * Recently added shows the newest members of the directory, newest first,
 * with "Your business here" cards filling any of the three places not yet
 * taken. Written features, once there are any, have their own grid. While
 * MADE_IN_LANCASHIRE_PUBLIC is false the page is noindex, out of the sitemap
 * and unlinked. The badge section's id (#badge) is linked from the approval
 * emails, so keep it.
 *
 * The directory block appears once at least one member is published. The
 * page reads the directory on the server and refreshes every few minutes,
 * like the directory itself, so the block turns up without a rebuild.
 */

export const revalidate = REVALIDATE

export const metadata: Metadata = pageMetadata({
  title: HUB_TITLE,
  description: HUB_DESCRIPTION,
  path: MIL_PATH,
  noindex: !MADE_IN_LANCASHIRE_PUBLIC,
})

const RECENT = 3

export default async function MadeInLancashire() {
  const features = getFeatures()
  // Newest approval first, as the directory view sorts them.
  const members = await getMembers()
  const hasMembers = members.length > 0
  const latest = features[0]
  const recent = members.slice(0, RECENT)
  const openSlots = RECENT - recent.length
  const hasPlaceholders = features.some(f => f.placeholder)
  // Grounds alternate down the page whichever optional sections are showing.
  // "Recently added" is paper, so the next light section is mist, and so on.
  const showEvery = features.length > 0
  const grounds = (['mist', 'paper', 'mist', 'paper', 'mist', 'paper'] as const).slice()
  const next = () => grounds.shift() ?? 'mist'
  const everyGround = showEvery ? next() : 'mist'
  const directoryGround = hasMembers ? next() : 'mist'
  const founderGround = next()
  const offerGround = next()
  const forwardGround = next()
  const badgeGround = next()
  const card = (f: (typeof features)[number]) => ({
    slug: f.slug,
    business_name: f.business_name,
    town: f.town,
    category: f.category,
    hook: f.hook,
    photo: f.photo,
    href: featurePath(f.slug),
  })

  return (
    <>
      <PageHero
        breadcrumbs={
          <div className="flex flex-col items-start gap-4">
            <Breadcrumbs items={HUB_CRUMBS} dark />
            {hasPlaceholders && <PreviewNote />}
          </div>
        }
        title={
          <>
            Made in <Highlighter>Lancashire</Highlighter>
            <Dot />
          </>
        }
        body={HUB_DESCRIPTION}
        actions={
          <>
            <ButtonLink href="#apply" dark full className="sm:w-auto">
              Submit your business
            </ButtonLink>
            <a
              href="#nominate"
              className="inline-flex min-h-[2.75rem] items-center justify-center font-semibold text-paper underline decoration-aqua decoration-2 underline-offset-[5px] hover:text-aqua sm:justify-start"
            >
              Nominate a business
            </a>
          </>
        }
        visual={
          latest?.video ? (
            <VerticalVideo
              src={latest.video}
              poster={latest.video_poster}
              label={`${latest.business_name}, ${latest.town}: the Made in Lancashire feature video`}
            />
          ) : (
            <HighStreet
              tone="dark"
              className="h-auto w-full"
              title="A line drawing of a high street: a bakery, a bike workshop, a florist, a café, a hair salon and a hardware shop side by side, joined by one string of bunting."
            />
          )
        }
      />

      <WhyItMatters />

      <Section ground="paper" labelledBy="recent-title">
        <SectionHeader id="recent-title" title="Recently added." />
        <ul className="mt-10 grid gap-4 sm:gap-5 md:grid-cols-3">
          {recent.map(m => (
            <li key={m.directory_slug}>
              <MemberCard
                m={{
                  slug: m.directory_slug,
                  href: memberPath(m.directory_slug),
                  business_name: m.business_name,
                  town: m.town,
                  category: m.category,
                  one_line: m.one_line,
                  cover: m.photo_urls[0] ?? null,
                }}
              />
            </li>
          ))}
          {Array.from({ length: openSlots }, (_, i) => (
            <li key={`open-${i}`}>
              <YourBusinessCard />
            </li>
          ))}
        </ul>
      </Section>

      {showEvery && (
        <Section ground={everyGround} labelledBy="every-feature-title">
          <SectionHeader id="every-feature-title" title="Every feature so far." />
          <div className="mt-10">
            <FeatureGrid features={features.map(card)} />
          </div>
        </Section>
      )}

      {hasMembers && (
        <Section ground={directoryGround} labelledBy="directory-title">
          <div className="max-w-3xl">
            <SectionHeader
              id="directory-title"
              title="The directory."
              intro="Independent Lancashire businesses, checked and approved by us. Every one is a founding member of the Made in Lancashire network."
            />
            <div className="mt-6">
              <TextLink href={DIRECTORY_PATH}>Browse the directory</TextLink>
            </div>
          </div>
        </Section>
      )}

      <Section ground={founderGround} labelledBy="founder-title">
        <FounderNote />
      </Section>

      <Section ground={offerGround} labelledBy="offer-title">
        <MemberOffer onPaper={offerGround === 'paper'} />
      </Section>

      <NominateBand />

      <Section ground={forwardGround} labelledBy="forward-title">
        <ForwardSection />
      </Section>

      <Section id="badge" ground={badgeGround} labelledBy="badge-title">
        <BadgeStrip href={MIL_PATH} />
      </Section>

      <section aria-labelledby="behind-title" className="ground-dark bg-petrol text-paper">
        <div className="mx-auto max-w-site px-5 py-16 sm:px-8 sm:py-20">
          <div className="max-w-2xl">
            <Wordmark tone="paper" className="h-8 w-auto" />
            <h2 id="behind-title" className="mt-8 text-heading text-balance text-paper">
              Made in Lancashire is a masuyo<span className="text-aqua">.</span> project.
            </h2>
            <p className="mt-4 max-w-measure text-lead text-mist">
              We build the technology businesses run on, and Made in Lancashire is where we start: helping the independents that make our towns worth visiting.
            </p>
            <div className="mt-8">
              <TextLink href="/about" dark>
                More about Masuyo
              </TextLink>
            </div>
          </div>
        </div>
      </section>

      <JsonLd data={[hubJsonLd(features), checkedJsonLd(breadcrumbJsonLd(HUB_CRUMBS))]} />
    </>
  )
}
