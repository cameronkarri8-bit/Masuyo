import type { Metadata } from 'next'
import CornerShop from '@/components/brand/illustrations/CornerShop'
import PenMark from '@/components/brand/PenMark'
import Wordmark from '@/components/brand/Wordmark'
import BadgeStrip from '@/components/made-in-lancashire/BadgeStrip'
import FeatureGrid from '@/components/made-in-lancashire/FeatureGrid'
import NominationForm from '@/components/made-in-lancashire/NominationForm'
import PreviewNote from '@/components/made-in-lancashire/PreviewNote'
import VerticalVideo from '@/components/made-in-lancashire/VerticalVideo'
import JsonLd from '@/components/site/JsonLd'
import PageHero from '@/components/site/PageHero'
import SectionHeader from '@/components/site/SectionHeader'
import { ButtonLink } from '@/components/ui/Button'
import Section from '@/components/ui/Section'
import SectionTitle, { Dot } from '@/components/ui/SectionTitle'
import TextLink from '@/components/ui/TextLink'
import { featurePath, getFeatures, hookSentence } from '@/lib/made-in-lancashire'
import { MADE_IN_LANCASHIRE_PUBLIC, MIL_PATH } from '@/lib/made-in-lancashire/config'
import { HUB_DESCRIPTION, HUB_TITLE, hubJsonLd } from '@/lib/made-in-lancashire/schema'
import { pageMetadata } from '@/lib/metadata'
import MilImage from '@/components/made-in-lancashire/MilImage'

/**
 * Made in Lancashire: the permanent home of the weekly Instagram series.
 *
 * While MADE_IN_LANCASHIRE_PUBLIC is false (lib/made-in-lancashire/config.ts)
 * the page is live but noindex, out of the sitemap and unlinked, like the
 * proposal pages.
 */

export const metadata: Metadata = pageMetadata({
  title: HUB_TITLE,
  description: HUB_DESCRIPTION,
  path: MIL_PATH,
  noindex: !MADE_IN_LANCASHIRE_PUBLIC,
})

const SHADOW = 'shadow-[0_1px_2px_rgba(13,26,32,0.06),0_8px_24px_rgba(13,26,32,0.06)]'

export default function MadeInLancashire() {
  const features = getFeatures()
  const latest = features[0]
  const hasPlaceholders = features.some(f => f.placeholder)

  return (
    <>
      <PageHero
        breadcrumbs={hasPlaceholders ? <PreviewNote /> : undefined}
        title={
          <>
            Made in{' '}
            <span className="relative inline-block">
              Lancashire
              <PenMark type="circle" tone="aqua" stretch animate={false} strokeWidth={3} className="pointer-events-none absolute -left-[6%] -top-[18%] h-[136%] w-[112%]" />
            </span>
            <Dot />
          </>
        }
        body="One independent Lancashire business every week. The ones opening doors, winning awards and doing right by their town. Picked on merit, featured for free."
        actions={
          <ButtonLink href="#nominate" dark>
            Nominate a business
          </ButtonLink>
        }
        visual={
          latest?.video ? (
            <VerticalVideo src={latest.video} poster={latest.video_poster} label={`${latest.business_name}, ${latest.town}: the Made in Lancashire feature video`} />
          ) : (
            <CornerShop tone="dark" className="h-auto w-full" title="A line drawing of a shop on a corner with its door open, beside a phone showing a booking confirmed." />
          )
        }
      />

      {latest && (
        <Section labelledBy="this-week-title">
          <SectionHeader id="this-week-title" title="This week." />
          <article className={`mt-10 grid overflow-hidden rounded-card bg-paper ${SHADOW} md:grid-cols-2`}>
            <MilImage src={latest.photo} alt={`${latest.business_name} in ${latest.town}`} width={1200} height={900} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[4/3] h-full w-full bg-mist object-cover" />
            <div className="flex flex-col justify-center p-6 sm:p-10">
              <p className="text-small text-steel">
                {latest.town} · {latest.category}
              </p>
              <h3 className="mt-2 text-title text-deep">{latest.business_name}</h3>
              <p className="mt-4 text-lead text-steel">{hookSentence(latest)}</p>
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
                <TextLink href={featurePath(latest.slug)}>Read the story</TextLink>
                <TextLink href={latest.instagram_post_url} rel="noopener">
                  See the post
                </TextLink>
              </div>
            </div>
          </article>
        </Section>
      )}

      {features.length > 0 && (
        <Section ground="paper" labelledBy="every-feature-title">
          <SectionHeader id="every-feature-title" title="Every feature so far." />
          <div className="mt-10">
            <FeatureGrid
              features={features.map(f => ({
                slug: f.slug,
                business_name: f.business_name,
                town: f.town,
                category: f.category,
                hook: f.hook,
                photo: f.photo,
                href: featurePath(f.slug),
              }))}
            />
          </div>
        </Section>
      )}

      <Section id="nominate" labelledBy="nominate-title">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
          <div>
            <SectionTitle id="nominate-title">Know somewhere brilliant?</SectionTitle>
            <p className="mt-4 max-w-measure text-lead text-steel">
              Tell me about a Lancashire business that deserves a shout. A big win, a new opening, or just the place everyone round here loves.
            </p>
          </div>
          <NominationForm />
        </div>
      </Section>

      <Section ground="paper" labelledBy="badge-title">
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

      <JsonLd data={hubJsonLd(features)} />
    </>
  )
}

