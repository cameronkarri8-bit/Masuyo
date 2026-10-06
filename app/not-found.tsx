import type { Metadata } from 'next'
import BrokenConnector from '@/components/diagrams/BrokenConnector'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import { Dot } from '@/components/ui/SectionTitle'
import TextLink from '@/components/ui/TextLink'

export const metadata: Metadata = {
  title: { absolute: 'Page not found | Masuyo' },
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <section className="bg-mist py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <BrokenConnector className="mx-auto h-auto w-full max-w-sm" />
          <Eyebrow className="mt-12">404</Eyebrow>
          <h1 className="mt-4 text-heading text-balance text-deep">
            This page has moved or never existed
            <Dot />
          </h1>
          <p className="mx-auto mt-6 max-w-measure text-lead text-steel">
            The site was reorganised recently, so an old link may have brought you here. These are the places most people
            are looking for.
          </p>
          <ul className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-10">
            <li>
              <TextLink href="/websites">Websites</TextLink>
            </li>
            <li>
              <TextLink href="/systems">Systems</TextLink>
            </li>
            <li>
              <TextLink href="/start">Start a project</TextLink>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  )
}
