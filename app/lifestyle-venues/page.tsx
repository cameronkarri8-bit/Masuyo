import type { Metadata } from 'next'
import Icon from '@/components/brand/Icon'
import PageHero from '@/components/site/PageHero'
import SectionHeader from '@/components/site/SectionHeader'
import Steps from '@/components/site/Steps'
import { ButtonLink } from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Checklist from '@/components/ui/Checklist'
import Eyebrow from '@/components/ui/Eyebrow'
import Section from '@/components/ui/Section'
import SectionTitle from '@/components/ui/SectionTitle'
import TextLink from '@/components/ui/TextLink'
import { pageMetadata } from '@/lib/metadata'
import VenueContactForm from './VenueContactForm'

/*
  Kept from the previous site and restyled to the new brand, with its words
  unchanged. Out of the navigation and the footer pending a decision on it.
*/

export const metadata: Metadata = pageMetadata({
  title: 'Websites and marketing for lifestyle and adult venues | Masuyo',
  description:
    'Web design, SEO and digital marketing built specifically for UK lifestyle, adult and members venues. Built by someone who understands your industry.',
  path: '/lifestyle-venues',
})

const FEATURES = [
  {
    icon: 'websites' as const,
    title: 'Modern websites',
    body: 'Clean, fast, mobile-first sites that make your venue look as good online as it does in person. Easy for you to update, built to be discreet and professional.',
  },
  {
    icon: 'seo' as const,
    title: 'Getting found on Google',
    body: 'Proper search optimisation so people looking for a venue like yours actually find you, without needing the advertising channels you are banned from.',
  },
  {
    icon: 'security' as const,
    title: 'Built for your industry',
    body: 'We already work in this space, so we understand discretion, the audience, the sensitivities and what does and does not work. No awkward conversations, no judgement.',
  },
  {
    icon: 'support' as const,
    title: 'Ongoing support',
    body: 'We do not disappear after launch. Updates, changes and advice when you need them.',
  },
]

const STEPS = [
  { title: 'We talk.', body: 'Tell us about your venue and what you need. No pressure, no pitch, just a conversation.' },
  { title: 'We build.', body: 'We design and build your site, or sort your existing one, and get your search visibility working.' },
  {
    title: 'You grow.',
    body: 'You get a professional online presence that brings people through the door, with us on hand when you need us.',
  },
]

const EXPECT = [
  'We reply within one business day',
  'A discreet, professional conversation',
  'Honest advice on what your venue actually needs',
  'No judgement, no awkward questions',
]

export default function LifestyleVenuesPage() {
  return (
    <>
      <PageHero
        title="Websites and marketing for venues the mainstream will not touch."
        body="We design websites and get you found online, built specifically for UK lifestyle, adult and members venues by someone who already works in your world."
        actions={
          <ButtonLink href="#contact" dark>
            Talk to us
          </ButtonLink>
        }
      />

      <Section labelledBy="venue-problem">
        <div className="max-w-measure">
          <SectionTitle id="venue-problem">You run a great venue. The internet makes it hard to show it.</SectionTitle>
          <div className="mt-6 space-y-4 text-lead text-deep">
            <p>
              If you run a lifestyle, adult or members venue, you already know the problem. You are locked out of Google
              Ads and Meta. Mainstream agencies do not understand your industry, or quietly refuse to work with it. Your
              website might be dated, hard to update, or invisible when people search for you. And the platforms everyone
              else relies on to grow simply are not open to you.
            </p>
            <p>The result is that good venues stay hidden, while the people looking for them cannot find them.</p>
          </div>
        </div>
      </Section>

      <Section ground="paper" labelledBy="venue-build">
        <SectionHeader id="venue-build" title="What we build for you." />
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {FEATURES.map(f => (
            <Card as="li" key={f.title} onPaper className="p-7">
              <Icon name={f.icon} size={48} />
              <h3 className="mt-5 text-subhead text-deep">{f.title}</h3>
              <p className="mt-2 text-body text-steel">{f.body}</p>
            </Card>
          ))}
        </ul>
      </Section>

      <Section ground="petrol" labelledBy="venue-why">
        <div className="max-w-measure">
          <Eyebrow dark>Why us</Eyebrow>
          <SectionTitle id="venue-why" dark className="mt-3">
            We already work in your world.
          </SectionTitle>
          <div className="mt-6 space-y-4 text-lead text-mist">
            <p>
              Masuyo Digital built Venuva, the UK lifestyle and adult venue directory. We built it from the ground up:
              clean, modern, discreet and built to rank. We understand this industry because we work in it every day, and
              we know exactly what a venue needs to be found, trusted and booked.
            </p>
            <p>
              When you work with us, you are not explaining your business to a mainstream agency that does not get it. You
              are working with someone who already does.
            </p>
          </div>
          <div className="mt-8">
            <TextLink href="https://venuva.co.uk" dark target="_blank" rel="noopener noreferrer">
              See our work at Venuva
            </TextLink>
          </div>
        </div>
      </Section>

      <Section labelledBy="venue-steps">
        <SectionHeader id="venue-steps" title="Simple, straightforward, no jargon." />
        <div className="mt-14">
          <Steps steps={STEPS} columns={3} />
        </div>
      </Section>

      <Section id="contact" ground="paper" labelledBy="venue-contact">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <SectionTitle id="venue-contact">Let us talk.</SectionTitle>
            <p className="mt-4 max-w-measure text-lead text-steel">
              Tell us a little about your venue and what you need. We will get back to you within a day. No obligation, no
              hard sell.
            </p>
            <div className="mt-8">
              <VenueContactForm />
            </div>
          </div>
          <div className="rounded-card bg-mist p-7">
            <h3 className="text-subhead text-deep">What to expect</h3>
            <Checklist items={EXPECT} className="mt-5" />
          </div>
        </div>
      </Section>
    </>
  )
}
