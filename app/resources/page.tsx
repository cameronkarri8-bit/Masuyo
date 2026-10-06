import type { Metadata } from 'next'
import { Suspense } from 'react'
import HubFallback from '@/components/resources/HubFallback'
import ResourcesHub from '@/components/resources/ResourcesHub'
import ClosingBand from '@/components/site/ClosingBand'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import { GLOSSARY } from '@/lib/glossary'
import { pageMetadata } from '@/lib/metadata'
import { CATEGORIES, getAllResources } from '@/lib/resources'

export const metadata: Metadata = pageMetadata({
  title: 'Resources | Masuyo',
  description: 'Plain English guides on websites, custom software, automation and running a business on better technology.',
  path: '/resources',
})

export default function ResourcesPage() {
  const resources = getAllResources().map(r => ({
    slug: r.slug,
    title: r.title,
    description: r.description,
    category: r.category,
    readingTime: r.readingTime,
    featured: r.featured,
    shortAnswer: r.shortAnswer,
  }))
  return (
    <>
      <section className="bg-mist pb-20 pt-12 sm:pt-16 lg:pb-28 lg:pt-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Resources</Eyebrow>
            <h1 className="mt-4 text-display text-balance text-deep">Plain answers about websites, software and automation.</h1>
          </div>
          <div className="mt-10">
            {/* The hub reads the address bar, so it renders inside Suspense. The
                fallback is the full list, so the static page carries every
                article and works without JavaScript. */}
            <Suspense fallback={<HubFallback resources={resources} categories={CATEGORIES} />}>
              <ResourcesHub resources={resources} categories={CATEGORIES} glossary={GLOSSARY} />
            </Suspense>
          </div>
        </Container>
      </section>
      <ClosingBand />
    </>
  )
}
