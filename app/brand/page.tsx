import type { Metadata } from 'next'
import Icon from '@/components/brand/Icon'
import Monogram from '@/components/brand/Monogram'
import Wordmark from '@/components/brand/Wordmark'
import ClearSpace from '@/components/brandpage/ClearSpace'
import CopyButton from '@/components/brandpage/CopyButton'
import Donts from '@/components/brandpage/Donts'
import PageHero from '@/components/site/PageHero'
import SectionHeader from '@/components/site/SectionHeader'
import { ButtonLink } from '@/components/ui/Button'
import Checklist from '@/components/ui/Checklist'
import Highlighter from '@/components/ui/Highlighter'
import Section from '@/components/ui/Section'
import { Dot } from '@/components/ui/SectionTitle'
import TextLink from '@/components/ui/TextLink'
import { BRAND_ICONS, GUIDE_ICON_NAMES, type BrandIconName } from '@/lib/brand/icons'
import { pageMetadata } from '@/lib/metadata'
import { SITE } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Brand assets | Masuyo',
  description:
    'The Masuyo logo, monogram, colours, typeface and icons, with the few rules that keep Masuyo looking like Masuyo. Free to use when working with us or writing about us.',
  path: '/brand',
})

const B = '/brand'

function Download({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      download
      className="text-small text-petrol underline decoration-petrol/40 decoration-2 underline-offset-4 hover:decoration-petrol"
    >
      {children}
    </a>
  )
}

const WORDMARKS = [
  { label: 'On light: petrol, dot matches', ground: 'bg-paper', tone: 'petrol' as const, file: 'masuyo-wordmark-petrol' },
  { label: 'On petrol: paper with the aqua dot', ground: 'bg-petrol', tone: 'paper' as const, file: 'masuyo-wordmark-paper-aqua-dot' },
  { label: 'On aqua: petrol, dot matches', ground: 'bg-aqua', tone: 'petrol' as const, file: 'masuyo-wordmark-petrol' },
]

const MONOGRAMS = [
  { tile: 'petrol' as const, label: 'Petrol' },
  { tile: 'mist' as const, label: 'Mist' },
  { tile: 'aqua' as const, label: 'Aqua' },
]

const COLOURS = [
  { name: 'Petrol', hex: '#0F3B4F', rgb: '15, 59, 79', role: 'Primary. Hero areas, buttons, the wordmark.', swatch: 'bg-petrol', dark: true },
  { name: 'Deep', hex: '#0D1A20', rgb: '13, 26, 32', role: 'Body text and dark sections.', swatch: 'bg-deep', dark: true },
  { name: 'Aqua', hex: '#4FE0E6', rgb: '79, 224, 230', role: 'The spark. Dots, pen marks, highlighter.', swatch: 'bg-aqua', dark: false },
  { name: 'Steel', hex: '#52626A', rgb: '82, 98, 106', role: 'Secondary text.', swatch: 'bg-steel', dark: true },
  { name: 'Mist', hex: '#E4EAEC', rgb: '228, 234, 236', role: 'Page ground.', swatch: 'bg-mist ring-1 ring-inset ring-petrol/15', dark: false },
  { name: 'Paper', hex: '#F3F6F7', rgb: '243, 246, 247', role: 'Cards, and text on petrol.', swatch: 'bg-paper ring-1 ring-inset ring-petrol/15', dark: false },
]

const PARAGRAPH = `${SITE.positioning} Based in Leyland, Lancashire, Masuyo works with businesses across the North West and beyond.`

const RULES = [
  'Use the files from this page rather than recreating the logo.',
  'Keep clear space around the logo: the height of the "o" on every side.',
  'Use the right version for the background: petrol on light grounds and on aqua, paper with the aqua dot on dark ones.',
  'Ask before using our name in an endorsement or a co-branded campaign.',
]

export default function BrandPage() {
  const guideIcons = GUIDE_ICON_NAMES.map(name => BRAND_ICONS.find(i => i.name === name)!).filter(Boolean)
  return (
    <>
      <PageHero
        eyebrow="Brand"
        title="Our brand, ready to use."
        body="Logos, colours and the few rules that keep Masuyo looking like Masuyo. Everything here is free to use when you are working with us or writing about us."
        actions={
          <>
            <ButtonLink href={`${B}/masuyo-brand-assets.zip`} dark download>
              Download all assets
            </ButtonLink>
            <ButtonLink href={`${B}/masuyo-brand-guidelines.pdf`} dark variant="secondary">
              Brand guidelines (PDF)
            </ButtonLink>
          </>
        }
      />

      {/* Logo */}
      <Section labelledBy="brand-logo">
        <SectionHeader id="brand-logo" title="Logo." intro="The wordmark is lowercase Albert Sans Extra Bold. The dot carries the brand." />
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {WORDMARKS.map(w => (
            <li key={w.label}>
              <div className={`flex aspect-[16/10] items-center justify-center rounded-card px-10 ${w.ground}`}>
                <Wordmark tone={w.tone} className="h-auto w-full max-w-[13rem]" />
              </div>
              <p className="mt-3 text-small text-deep">{w.label}</p>
              <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                <Download href={`${B}/${w.file}.svg`}>SVG</Download>
                <Download href={`${B}/${w.file}-1600.png`}>PNG</Download>
                <Download href={`${B}/${w.file}-800.png`}>PNG 800px</Download>
                <Download href={`${B}/${w.file}-3200.png`}>PNG 3200px</Download>
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-12 grid items-center gap-8 rounded-card bg-petrol p-6 sm:p-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <ClearSpace className="h-auto w-full" />
          <dl className="space-y-6 text-paper">
            <div>
              <dt className="text-small text-mist">Clear space</dt>
              <dd className="mt-1 text-body">The height of the &ldquo;o&rdquo; on every side. Nothing else goes inside the line.</dd>
            </div>
            <div>
              <dt className="text-small text-mist">Minimum width</dt>
              <dd className="mt-1 text-body">80px on screen, 20mm in print.</dd>
            </div>
          </dl>
        </div>
      </Section>

      {/* Monogram */}
      <Section ground="paper" labelledBy="brand-monogram">
        <SectionHeader id="brand-monogram" title="Monogram." intro="For small spaces: avatars, favicons, stickers and app icons." />
        <ul className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {MONOGRAMS.map(m => (
            <li key={m.tile}>
              <Monogram tile={m.tile} className="h-32 w-32" title={`Masuyo monogram, ${m.label.toLowerCase()} tile`} />
              <p className="mt-3 text-small text-deep">{m.label}</p>
              <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                <Download href={`${B}/masuyo-monogram-${m.tile}.svg`}>SVG</Download>
                <Download href={`${B}/masuyo-monogram-${m.tile}-512.png`}>PNG</Download>
                <Download href={`${B}/masuyo-monogram-${m.tile}-256.png`}>PNG 256px</Download>
                <Download href={`${B}/masuyo-monogram-${m.tile}-1024.png`}>PNG 1024px</Download>
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Please don't */}
      <Section labelledBy="brand-donts">
        <SectionHeader id="brand-donts" title="Please don't." />
        <div className="mt-10">
          <Donts />
        </div>
      </Section>

      {/* Colour */}
      <Section ground="paper" labelledBy="brand-colour">
        <SectionHeader id="brand-colour" title="Colour." />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {COLOURS.map(c => (
            <li key={c.name} className="overflow-hidden rounded-card bg-mist">
              <div className={`h-28 ${c.swatch}`} aria-hidden="true" />
              <div className="p-6">
                <p className="text-subhead text-deep">{c.name}</p>
                <p className="mt-1 text-body text-deep">{c.hex}</p>
                <p className="text-body text-steel">RGB {c.rgb}</p>
                <p className="mt-2 text-small text-steel">{c.role}</p>
                <div className="mt-4">
                  <CopyButton value={c.hex} label={`Copy ${c.name} ${c.hex}`} />
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-8 max-w-3xl space-y-2 text-body text-deep">
          <p>Proportions across a page: mist and paper about half, petrol about a third, deep about a sixth, aqua a spark.</p>
          <p>Aqua only ever sits on petrol or deep, never on the light colours.</p>
        </div>
      </Section>

      {/* Type */}
      <Section labelledBy="brand-type">
        <SectionHeader id="brand-type" title="Albert Sans for everything." intro="Sentence case, tight headlines and roomy body copy. No capitals for shouting and no letter spacing." />
        <dl className="mt-10 divide-y divide-petrol/15 border-y border-petrol/15">
          <div className="grid gap-2 py-6 md:grid-cols-[14rem_1fr] md:items-center">
            <dt className="text-small text-steel">Display, 72 to 120px, extra bold</dt>
            <dd className="text-display text-deep">
              Shipped <Highlighter>once.</Highlighter>
            </dd>
          </div>
          <div className="grid gap-2 py-6 md:grid-cols-[14rem_1fr] md:items-center">
            <dt className="text-small text-steel">Heading, 48px, extra bold</dt>
            <dd className="text-heading text-deep">Websites that pull their weight.</dd>
          </div>
          <div className="grid gap-2 py-6 md:grid-cols-[14rem_1fr] md:items-center">
            <dt className="text-small text-steel">Section title, 32px, ends with the dot</dt>
            <dd className="text-title text-deep">
              Our services
              <Dot />
            </dd>
          </div>
          <div className="grid gap-2 py-6 md:grid-cols-[14rem_1fr] md:items-center">
            <dt className="text-small text-steel">Subhead, 22px, bold</dt>
            <dd className="text-subhead text-deep">Fixed price, agreed up front</dd>
          </div>
          <div className="grid gap-2 py-6 md:grid-cols-[14rem_1fr] md:items-center">
            <dt className="text-small text-steel">Body, 17px, regular</dt>
            <dd className="max-w-measure text-body text-deep">
              We build websites and systems for businesses that run on bookings, quotes and stock, then look after them once
              they are live.
            </dd>
          </div>
          <div className="grid gap-2 py-6 md:grid-cols-[14rem_1fr] md:items-center">
            <dt className="text-small text-steel">Small, 14px, semibold</dt>
            <dd className="text-small text-deep">masuyodigital.com</dd>
          </div>
        </dl>
        <div className="mt-8">
          <TextLink href="https://fonts.google.com/specimen/Albert+Sans" target="_blank" rel="noopener noreferrer">
            Albert Sans on Google Fonts
          </TextLink>
        </div>
      </Section>

      {/* Icons */}
      <Section ground="paper" labelledBy="brand-icons">
        <SectionHeader
          id="brand-icons"
          title="Icons."
          intro="Drawn, not generated. A pen line with a slight wobble, an aqua fill printed just off register, a small tilt and one detail that makes each icon ours."
        />
        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {guideIcons.map(icon => (
            <li key={icon.name} className="flex flex-col items-center rounded-card bg-mist px-4 py-6">
              <Icon name={icon.name as BrandIconName} size={56} />
              <p className="mt-3 text-small text-deep">{icon.label}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <TextLink href={`${B}/masuyo-icons-svg.zip`} download>
            Download icons (SVG)
          </TextLink>
        </div>
      </Section>

      {/* About Masuyo */}
      <Section labelledBy="brand-about">
        <SectionHeader id="brand-about" title="About Masuyo." intro="Copy and paste these when you write about us." />
        <ul className="mt-10 grid gap-5 lg:grid-cols-3">
          {[
            { label: 'One line', text: SITE.oneLiner },
            { label: 'Short paragraph', text: PARAGRAPH },
            { label: 'Tagline', text: SITE.tagline },
          ].map(block => (
            <li key={block.label} className="flex flex-col rounded-card bg-paper p-6 sm:p-7">
              <p className="text-small text-steel">{block.label}</p>
              <p className="mt-3 flex-1 text-body text-deep">{block.text}</p>
              <div className="mt-5">
                <CopyButton value={block.text} label={`Copy the ${block.label.toLowerCase()} version`} />
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* Using the brand with us */}
      <Section ground="paper" labelledBy="brand-using">
        <SectionHeader id="brand-using" title="Using the brand with us." />
        <Checklist items={RULES} className="mt-8 max-w-3xl" />
        <p className="mt-10 text-lead text-deep">
          Questions about the brand?{' '}
          <a href={`mailto:${SITE.email}`} className="font-semibold text-petrol underline decoration-2 underline-offset-4">
            {SITE.email}
          </a>
        </p>
      </Section>
    </>
  )
}
