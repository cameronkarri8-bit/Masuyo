import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import HandoverForm from '@/components/handover/HandoverForm'
import PrintButton from '@/components/handover/PrintButton'
import AnswerBlock from '@/components/industries/AnswerBlock'
import Breadcrumbs from '@/components/industries/Breadcrumbs'
import JsonLd from '@/components/site/JsonLd'
import PageHero from '@/components/site/PageHero'
import SectionHeader from '@/components/site/SectionHeader'
import Steps from '@/components/site/Steps'
import Accordion from '@/components/ui/Accordion'
import Checklist from '@/components/ui/Checklist'
import Section from '@/components/ui/Section'
import TextLink from '@/components/ui/TextLink'
import { checkedJsonLd } from '@/lib/industries/schema'
import { pageMetadata } from '@/lib/metadata'
import { SITE } from '@/lib/site'
import { HANDOVER } from './copy'

/**
 * For freelance web designers and small agencies stepping back from client
 * work: how a handover to masuyo works, how they are paid, and what happens
 * to their clients. A landing page in the pattern of the industry pages:
 * every word in the server HTML, not in the main navigation, linked from the
 * footer and from Care. The copy lives in ./copy.ts, where the build checks
 * it against the brand rules.
 */

const PATH = '/sell-your-web-design-clients'
const URL = `${SITE.url}${PATH}`

export const metadata: Metadata = {
  ...pageMetadata({ title: HANDOVER.titleTag, description: HANDOVER.metaDescription, path: PATH }),
  robots: { index: true, follow: true },
}

const link = 'font-semibold text-petrol underline decoration-petrol/40 decoration-2 underline-offset-[5px] hover:decoration-petrol'

const CRUMBS = [
  { name: 'Home', href: '/' },
  { name: 'Sell your web design clients', href: PATH },
]

/** WebPage, Service and BreadcrumbList, from the same words as the page. The Organization is sitewide, in the root layout. */
function jsonLd() {
  const provider = { '@type': 'Organization', name: SITE.legalName, alternateName: 'masuyo', url: SITE.url }
  return checkedJsonLd([
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${URL}#webpage`,
      url: URL,
      name: HANDOVER.titleTag,
      description: HANDOVER.metaDescription,
      inLanguage: 'en-GB',
      isPartOf: { '@type': 'WebSite', name: SITE.name, url: SITE.url },
      about: { '@id': `${URL}#service` },
      primaryImageOfPage: `${URL}/opengraph-image`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${URL}#service`,
      name: 'Web design client handover',
      serviceType: 'Taking on the clients of web designers who are stepping back',
      description: HANDOVER.answer[0],
      url: URL,
      provider,
      areaServed: [
        { '@type': 'Country', name: 'United Kingdom' },
        { '@type': 'AdministrativeArea', name: 'Lancashire' },
      ],
      audience: { '@type': 'BusinessAudience', audienceType: 'Freelance web designers, sole traders and small web design agencies' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: CRUMBS.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: `${SITE.url}${c.href === '/' ? '' : c.href}` })),
    },
  ])
}

export default function SellYourWebDesignClientsPage() {
  const h = HANDOVER
  return (
    <>
      <PageHero
        breadcrumbs={<Breadcrumbs items={CRUMBS} dark />}
        eyebrow={h.eyebrow}
        title={h.h1}
        body={h.heroBody}
      />

      <AnswerBlock heading={h.answerHeading} paragraphs={[...h.answer]} sources={[]} />

      <Section labelledBy="who-title">
        <SectionHeader id="who-title" title={h.who.heading} intro={h.who.intro} />
        <Checklist className="mt-8 max-w-3xl" items={[...h.who.items]} />
        <p className="mt-8 max-w-measure text-body text-steel">{h.who.after}</p>
      </Section>

      <Section ground="paper" labelledBy="how-title">
        <SectionHeader id="how-title" title={h.how.heading} intro={h.how.intro} />
        <div className="mt-10">
          <Steps onPaper columns={3} steps={h.how.steps.map(s => ({ title: s.title, body: s.body }))} />
        </div>
      </Section>

      <Section labelledBy="paid-title">
        <SectionHeader id="paid-title" title={h.paid.heading} intro={h.paid.intro} />
        <div className="mt-10">
          <table className="block w-full text-left md:table md:border-collapse">
            <caption className="sr-only">{h.paid.caption}</caption>
            <thead className="hidden md:table-header-group">
              <tr>
                <th scope="col" className="p-4 text-small font-semibold text-steel">
                  Option
                </th>
                {h.paid.columns.map(c => (
                  <th key={c} scope="col" className="p-4 text-small font-semibold text-steel">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="block space-y-4 md:table-row-group md:space-y-0">
              {h.paid.rows.map(row => (
                <tr key={row.option} className="block rounded-card bg-paper p-5 md:table-row md:rounded-none md:border-t md:border-petrol/15 md:bg-transparent md:p-0">
                  <th scope="row" className="block pb-2 text-subhead text-deep md:table-cell md:p-4 md:align-top">
                    {row.option}
                  </th>
                  {row.cells.map((cell, i) => (
                    <td key={i} className="block py-1.5 text-body text-deep md:table-cell md:p-4 md:align-top">
                      <span className="block text-small font-semibold text-steel md:hidden">{h.paid.columns[i]}</span>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-8 max-w-measure text-body text-steel">{h.paid.after}</p>
      </Section>

      <Section ground="paper" labelledBy="clients-title">
        <SectionHeader id="clients-title" title={h.clients.heading} intro={h.clients.intro} />
        <Checklist className="mt-8 max-w-3xl" items={[...h.clients.items]} />
        <p className="mt-8 max-w-measure text-body text-steel">
          {h.clients.afterBefore}{' '}
          <Link href="/care" className={link}>
            Care plans
          </Link>{' '}
          and{' '}
          <Link href="/pricing" className={link}>
            prices
          </Link>{' '}
          are published, so nobody has to ask.
        </p>
      </Section>

      <Section labelledBy="ready-title">
        <div data-print-area className="handover-print max-w-3xl">
          <p className="hidden text-small font-semibold text-steel print:block">masuyodigital.com{PATH}</p>
          <SectionHeader id="ready-title" title={h.ready.heading} intro={h.ready.intro} />
          <ul className="mt-8 space-y-3">
            {h.ready.items.map(item => (
              <li key={item.label} className="flex gap-4 rounded-control bg-paper p-4 print:rounded-none print:border-b print:border-steel/40 print:bg-transparent print:px-0 print:py-2.5">
                <span aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 rounded-[4px] border-2 border-petrol" />
                <span>
                  <span className="block text-body font-semibold text-deep">{item.label}</span>
                  <span className="block text-body text-steel">{item.detail}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-body text-steel">{h.ready.after}</p>
          <div className="mt-4">
            <PrintButton />
          </div>
        </div>
      </Section>

      <Section ground="paper" labelledBy="why-title">
        <SectionHeader id="why-title" title={h.why.heading} intro={h.why.intro} />
        <ul className="mt-10 grid max-w-5xl gap-5 md:grid-cols-2">
          {h.why.points.map(p => (
            <li key={p.title} className="rounded-card bg-mist p-6">
              <h3 className="text-subhead text-deep">{p.title}</h3>
              <p className="mt-2 text-body text-steel">{p.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8">
          <TextLink href="/about">More about masuyo and Cameron</TextLink>
        </p>
      </Section>

      <Section labelledBy="questions-title">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
          <SectionHeader id="questions-title" title="Questions designers ask." />
          <Accordion
            items={[
              ...h.faqs.map(f => ({ question: f.question, answer: f.answer })),
              {
                question: h.dataFaq.question,
                answer: (
                  <>
                    {h.dataFaq.answer}{' '}
                    <a href={h.dataFaq.icoUrl} className={link} rel="noopener">
                      {h.dataFaq.icoLabel}
                    </a>
                    {h.dataFaq.note}
                  </>
                ),
              },
            ]}
          />
        </div>
      </Section>

      <Section ground="paper" labelledBy="start-title">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
          <div>
            <SectionHeader id="start-title" title={h.next.heading} intro={h.next.intro} />
            <p className="mt-6 max-w-measure text-body text-steel">
              {h.next.after}{' '}
              <Link href="/resources/website-care-plans" className={link}>
                what a website care plan covers
              </Link>
              .
            </p>
          </div>
          <div className="[&_form]:bg-mist [&>div]:bg-mist">
            <HandoverForm />
          </div>
        </div>
      </Section>

      <Section spacing="tight" labelledBy="cameron-title">
        <div className="flex max-w-3xl flex-col gap-6 rounded-card bg-paper p-6 sm:flex-row sm:items-center sm:p-8">
          <Image
            src="/people/cameron.webp"
            alt="Cameron Karri, founder of masuyo"
            width={900}
            height={1125}
            loading="lazy"
            sizes="8rem"
            className="h-32 w-[6.4rem] shrink-0 rounded-card object-cover"
          />
          <div>
            <h2 id="cameron-title" className="text-subhead text-deep">
              {h.cameron.heading}
            </h2>
            {h.cameron.lines.map(line => (
              <p key={line} className="mt-2 text-body text-steel">
                {line}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <JsonLd data={jsonLd()} />
    </>
  )
}
