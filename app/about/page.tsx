import type { Metadata } from 'next'
import Image from 'next/image'
import Icon from '@/components/brand/Icon'
import AtTheDesk from '@/components/brand/illustrations/AtTheDesk'
import RegionMap from '@/components/diagrams/RegionMap'
import ClosingBand from '@/components/site/ClosingBand'
import PageHero from '@/components/site/PageHero'
import SectionHeader from '@/components/site/SectionHeader'
import { ButtonLink } from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import Highlighter from '@/components/ui/Highlighter'
import Section from '@/components/ui/Section'
import SectionTitle, { Dot } from '@/components/ui/SectionTitle'
import TextLink from '@/components/ui/TextLink'
import type { BrandIconName } from '@/lib/brand/icons'
import { MADE_IN_LANCASHIRE_PUBLIC, MIL_PATH } from '@/lib/made-in-lancashire/config'
import { pageMetadata } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata({
  title: 'About | Masuyo',
  description:
    'Masuyo is run by Cameron Karri, who designs, builds and looks after every website and system himself, from Leyland in Lancashire.',
  path: '/about',
})

/**
 * The portrait for the hero, a 4:5 photo in /public. Set it to null to show
 * the "at the desk" drawing instead.
 */
const PORTRAIT: string | null = '/people/cameron.webp'

const PROMISES: { title: string; body: string; icon: BrandIconName }[] = [
  {
    title: 'Straight advice.',
    body: "If you don't need a custom build, I'll say so and point you to something that already exists, even when that means you don't need me.",
    icon: 'support',
  },
  {
    title: 'Process before pixels.',
    body: 'I look at how work moves through your business before I design a single screen. Most problems are workflow problems wearing a website costume.',
    icon: 'puzzle',
  },
  {
    title: 'One person responsible.',
    body: 'You deal with me from the first call to long after launch. When a project needs a specialist, such as a designer or a security expert, I bring in people I trust and stay responsible for the result.',
    icon: 'security',
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="One person, from the first call to long after launch."
        body="I'm Cameron. I founded Masuyo, and I design, build and look after every website and system myself, from Leyland in Lancashire."
        actions={
          <ButtonLink href="/start" dark>
            Start a project
          </ButtonLink>
        }
        visual={
          PORTRAIT ? (
            <div className="relative mx-auto w-full max-w-[17rem] sm:max-w-[21rem]">
              <div aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-4 rounded-card bg-aqua" />
              <Image
                src={PORTRAIT}
                alt="Cameron Karri, founder of Masuyo"
                width={900}
                height={1125}
                priority
                sizes="(min-width: 1024px) 21rem, 80vw"
                className="relative aspect-[4/5] w-full rounded-card object-cover"
              />
            </div>
          ) : (
            <AtTheDesk
              tone="dark"
              className="h-auto w-full"
              title="A drawing of a desk with a laptop showing the Masuyo website, a plant and a mug."
            />
          )
        }
      />

      <Section labelledBy="why-title">
        <Container narrow className="!px-0">
          <SectionTitle id="why-title">Why Masuyo exists.</SectionTitle>
          <div className="mt-8 space-y-5 text-lead text-deep">
            <p>
              I&apos;ve spent years in digital marketing and web development, building websites, CRMs and tools for
              businesses in the UK and the US.
            </p>
            <p>
              The same thing kept coming up. Small businesses were paying for technology that didn&apos;t fit them:
              websites that looked fine but brought in nothing, and software built for companies ten times their size.
              Masuyo exists to build the version that does fit, and to stay around to look after it.
            </p>
          </div>
          <blockquote className="mt-12 border-l-4 border-petrol pl-6">
            <p className="text-title text-petrol">
              The best technology is the kind your team stops noticing, because it just works.
            </p>
          </blockquote>
        </Container>
      </Section>

      <Section ground="paper" labelledBy="count-title">
        <SectionHeader id="count-title" title="What you can count on." />
        <ul className="mt-12 grid gap-5 lg:grid-cols-3">
          {PROMISES.map(p => (
            <li key={p.title} className="rounded-card bg-mist p-7 sm:p-8">
              <Icon name={p.icon} size={48} />
              <h3 className="mt-6 text-subhead text-deep">
                {p.title.slice(0, -1)}
                <Dot />
              </h3>
              <p className="mt-2 text-body text-steel">{p.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section ground="petrol" labelledBy="where-title">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionTitle id="where-title" dark>
              Local when it helps. Remote when it doesn&apos;t.
            </SectionTitle>
            <p className="mt-5 max-w-measure text-lead text-mist">
              I&apos;m based in Leyland, near Preston, and work in person with businesses across Lancashire and the
              North West. It&apos;s often quicker to understand a business by standing in it for an hour. For everyone
              else, video calls and a shared project space work just as well.
            </p>
            {MADE_IN_LANCASHIRE_PUBLIC && (
              <>
                <p className="mt-5 max-w-measure text-body text-mist">
                  I also run Made in Lancashire, a free directory and community for independent businesses in the
                  county.
                </p>
                <div className="mt-6">
                  <TextLink href={MIL_PATH} dark>
                    Visit Made in Lancashire
                  </TextLink>
                </div>
              </>
            )}
          </div>
          <RegionMap className="mx-auto h-auto w-full max-w-md" />
        </div>
      </Section>

      {/* The page closes on the tagline, set as the guide's cover sets it. */}
      <Section spacing="tight" labelledBy="tagline">
        <p id="tagline" className="max-w-4xl text-display text-balance text-deep">
          We build the technology your business <Highlighter>runs on.</Highlighter>
        </p>
      </Section>

      <ClosingBand />
    </>
  )
}
