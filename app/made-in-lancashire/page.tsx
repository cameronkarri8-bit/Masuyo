import type { Metadata } from 'next'
import HighStreet from '@/components/brand/illustrations/HighStreet'
import Wordmark from '@/components/brand/Wordmark'
import BadgeStrip from '@/components/made-in-lancashire/BadgeStrip'
import FeatureCard from '@/components/made-in-lancashire/FeatureCard'
import FeatureGrid from '@/components/made-in-lancashire/FeatureGrid'
import ForwardSection from '@/components/made-in-lancashire/ForwardSection'
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
import { getMembers, REVALIDATE } from '@/lib/made-in-lancashire/directory'
import { HUB_CRUMBS, HUB_TITLE, hubJsonLd } from '@/lib/made-in-lancashire/schema'
import { breadcrumbJsonLd, checkedJsonLd } from '@/lib/industries/schema'
import { pageMetadata } from '@/lib/metadata'

/**
 * Made in Lancashire: a permanent home for the series, where independent
 * Lancashire businesses can apply, be nominated and join the directory.
 *
 * Complete with no features at all: Recent features shows "Your business
 * here" cards until real features replace them, newest first, and the full
 * grid appears only once there are more than three. While
 * MADE_IN_LANCASHIRE_PUBLIC is false the page is noindex, out of the sitemap
 * and unlinked.
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
  const hasMembers = (await getMembers()).length > 0
  const latest = features[0]
  const recent = features.slice(0, RECENT)
  const openSlots = RECENT - recent.length
  const hasPlaceholders = features.some(f => f.placeholder)
  // Grounds alternate down the page whichever optional sections are showing.
  const showEvery = features.length > RECENT
  const middle = Number(showEvery) + Number(hasMembers)
  const directoryGround = showEvery ? 'paper' : 'mist'
  const forwardGround = middle % 2 === 1 ? 'paper' : 'mist'
  const badgeGround = forwardGround === 'paper' ? 'mist' : 'paper'
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
        <SectionHeader id="recent-title" title="Recent features." />
        <ul className="mt-10 grid gap-4 sm:gap-5 md:grid-cols-3">
          {recent.map(f => (
            <li key={f.slug}>
              <FeatureCard f={card(f)} />
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
        <Section labelledBy="every-feature-title">
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

      <Section ground={forwardGround} labelledBy="forward-title">
        <ForwardSection />
      </Section>

      <Section ground={badgeGround} labelledBy="badge-title">
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
              We build websites, web apps and systems for Lancashire businesses that run on bookings, quotes and stock. Measured twice. Shipped once.
            </p>
            <div className="mt-8">
              <TextLink href="/work" dark>
                See our work
              </TextLink>
            </div>
          </div>
        </div>
      </section>

      <JsonLd data={[hubJsonLd(features), checkedJsonLd(breadcrumbJsonLd(HUB_CRUMBS))]} />
    </>
  )
}
