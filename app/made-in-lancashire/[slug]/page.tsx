import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/industries/Breadcrumbs'
import { notFound } from 'next/navigation'
import BadgeStrip from '@/components/made-in-lancashire/BadgeStrip'
import PreviewNote from '@/components/made-in-lancashire/PreviewNote'
import VerticalVideo from '@/components/made-in-lancashire/VerticalVideo'
import JsonLd from '@/components/site/JsonLd'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import { Dot } from '@/components/ui/SectionTitle'
import TextLink from '@/components/ui/TextLink'
import { featurePath, getFeature, getFeatures, hookSentence, instagramUrl, monthYear, neighbours, openingLine } from '@/lib/made-in-lancashire'
import { MADE_IN_LANCASHIRE_PUBLIC, MIL_PATH } from '@/lib/made-in-lancashire/config'
import { featureJsonLd, HUB_CRUMBS } from '@/lib/made-in-lancashire/schema'
import { pageMetadata } from '@/lib/metadata'
import MilImage from '@/components/made-in-lancashire/MilImage'

/**
 * A Made in Lancashire feature. The page belongs to the business: no Masuyo
 * selling here, only the site's normal header and footer.
 */

export const dynamicParams = false

export function generateStaticParams() {
  return getFeatures().map(f => ({ slug: f.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const f = getFeature(params.slug)
  if (!f) return {}
  return pageMetadata({
    title: `${f.business_name}, ${f.town} | Made in Lancashire`,
    description: `${f.business_name} in ${f.town}, featured in Made in Lancashire for ${f.hook}.`,
    path: featurePath(f.slug),
    noindex: !MADE_IN_LANCASHIRE_PUBLIC,
  })
}

const SHADOW = 'shadow-[0_1px_2px_rgba(13,26,32,0.06),0_8px_24px_rgba(13,26,32,0.06)]'

function H2({ id, children }: { id: string; children: string }) {
  return (
    <h2 id={id} className="text-title text-deep">
      {children}
      <Dot />
    </h2>
  )
}

export default function FeaturePage({ params }: { params: { slug: string } }) {
  const f = getFeature(params.slug)
  if (!f) notFound()
  const { older, newer } = neighbours(f.slug)
  const instagram = instagramUrl(f)

  return (
    <>
      <section className="ground-dark bg-petrol text-paper" data-nav-ground="dark">
        <Container className="pb-14 pt-10 sm:pb-16 sm:pt-14">
          <Breadcrumbs items={[...HUB_CRUMBS, { name: f.business_name, href: featurePath(f.slug) }]} dark />
          {f.placeholder && (
            <div className="mt-5">
              <PreviewNote />
            </div>
          )}
          <h1 className="mt-6 text-display text-balance text-paper">{f.business_name}</h1>
          <p className="mt-4 text-lead text-mist">
            {f.town} · {f.category} · Featured {monthYear(f.featured_on)}
          </p>
        </Container>
      </section>

      <Section spacing="tight">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-14">
          <div className="min-w-0">
            <p className="text-lead text-deep">{openingLine(f)}</p>

            <div className={`relative mt-8 overflow-hidden rounded-card bg-paper ${SHADOW}`}>
              <MilImage src={f.photo} alt={`${f.business_name} in ${f.town}`} width={1200} height={900} priority sizes="(min-width: 1024px) 60vw, 100vw" className="aspect-[4/3] h-auto w-full bg-mist object-cover" />
              <MilImage src={f.logo} alt={`${f.business_name} logo`} width={72} height={72} className="absolute bottom-4 left-4 h-[72px] w-[72px] rounded-card bg-paper object-contain p-1" />
            </div>

            <section aria-labelledby="story-title" className="mt-12">
              <H2 id="story-title">The story</H2>
              <div className="mt-4 max-w-measure space-y-4 text-body text-steel">
                {f.story.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>

            <section aria-labelledby="words-title" className="mt-12">
              <H2 id="words-title">In their words</H2>
              <figure className="mt-4 border-l-4 border-petrol pl-6">
                <blockquote className="text-subhead text-deep">
                  <p>{f.in_their_words}</p>
                </blockquote>
                <figcaption className="mt-3 text-small text-steel">{f.business_name}</figcaption>
              </figure>
            </section>
          </div>

          <aside className="space-y-6">
            {f.video && <VerticalVideo src={f.video} poster={f.video_poster} label={`${f.business_name}: the Made in Lancashire feature video`} />}

            <section aria-labelledby="find-title" className={`rounded-card bg-paper p-6 sm:p-7 ${SHADOW}`}>
              <H2 id="find-title">Find them</H2>
              <dl className="mt-5 space-y-4 text-body">
                <div>
                  <dt className="text-small text-steel">Address</dt>
                  <dd className="mt-1 text-deep">
                    {f.address}
                    <br />
                    <a href={f.map_url} rel="noopener" className="text-small font-semibold text-petrol underline decoration-petrol/40 underline-offset-4 hover:decoration-petrol">
                      Open in maps
                    </a>
                  </dd>
                </div>
                {f.opening_hours && (
                  <div>
                    <dt className="text-small text-steel">Opening hours</dt>
                    <dd className="mt-1 text-deep">{f.opening_hours}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-small text-steel">Online</dt>
                  <dd className="mt-1 flex flex-col gap-1">
                    <a href={f.website} rel="noopener" className="font-semibold text-petrol underline decoration-petrol/40 underline-offset-4 hover:decoration-petrol">
                      Website
                    </a>
                    <a href={instagram} rel="noopener" className="font-semibold text-petrol underline decoration-petrol/40 underline-offset-4 hover:decoration-petrol">
                      Instagram @{f.instagram_handle}
                    </a>
                  </dd>
                </div>
              </dl>
            </section>

            <section aria-labelledby="post-title" className={`rounded-card bg-paper p-6 sm:p-7 ${SHADOW}`}>
              <H2 id="post-title">The post</H2>
              <p className="mt-3 text-body text-steel">{hookSentence(f)}</p>
              <div className="mt-4">
                <TextLink href={f.instagram_post_url} rel="noopener">
                  See the feature on Instagram
                </TextLink>
              </div>
            </section>
          </aside>
        </div>

        <nav aria-label="More features" className="mt-16 grid gap-4 border-t border-petrol/15 pt-8 sm:grid-cols-3 sm:items-center">
          <div>
            {older && (
              <Link href={featurePath(older.slug)} rel="prev" className="group block">
                <span className="block text-small text-steel">Previous feature</span>
                <span className="font-semibold text-petrol underline decoration-petrol/30 underline-offset-4 group-hover:decoration-petrol">{older.business_name}</span>
              </Link>
            )}
          </div>
          <div className="sm:text-center">
            <TextLink href={MIL_PATH} arrow={false}>
              All features
            </TextLink>
          </div>
          <div className="sm:text-right">
            {newer && (
              <Link href={featurePath(newer.slug)} rel="next" className="group block">
                <span className="block text-small text-steel">Next feature</span>
                <span className="font-semibold text-petrol underline decoration-petrol/30 underline-offset-4 group-hover:decoration-petrol">{newer.business_name}</span>
              </Link>
            )}
          </div>
        </nav>
      </Section>

      <Section ground="paper" spacing="tight" labelledBy={`badge-${f.slug}-title`}>
        <BadgeStrip href={featurePath(f.slug)} headingId={`badge-${f.slug}-title`} />
      </Section>

      <JsonLd data={featureJsonLd(f)} />
    </>
  )
}
