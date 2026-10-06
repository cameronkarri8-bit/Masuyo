import { careBothText, SYSTEMS, TIMELINES, WEBSITES } from '@/lib/pricing'
import { getAllResources } from '@/lib/resources'
import { SITE } from '@/lib/site'

export const dynamic = 'force-static'

/**
 * llms.txt: a plain summary of the site for language models and answer
 * engines, in the llmstxt.org format.
 *
 * Generated from the same price list, article list and site facts the pages
 * use, rather than kept as a hand written file, so it can never quote a price
 * the site no longer charges.
 */
export function GET(): Response {
  const u = (path: string) => `${SITE.url}${path}`
  const articles = getAllResources()
    .map(r => `- [${r.title}](${u(`/resources/${r.slug}`)}): ${r.description}`)
    .join('\n')

  const body = `# ${SITE.name}

> ${SITE.positioning}

Masuyo is a small technology company based in Leyland, Lancashire, working with businesses across the North West and beyond. Clients work directly with the engineer who builds their project, from the first call to launch and after. Masuyo is not VAT registered, so published prices are the prices paid.

## What Masuyo offers

- [Websites](${u('/websites')}): Fast, clear websites built around bookings, quote requests and sales, connected to the way the business handles them. Most cost ${WEBSITES.between} and go live in ${TIMELINES.websiteLive}.
- [Systems](${u('/systems')}): Custom CRMs, client portals, automation, AI assistants and learning platforms, built in short visible stages. ${SYSTEMS.fromText}, scoped and fixed in price before work begins.
- [Care](${u('/care')}): Hosting, security, updates and steady improvements, ${careBothText}. Every build launches with Care.
- [Pricing](${u('/pricing')}): Typical prices, what moves the number, and a website estimator.

## Who it is for

- [Trades and field services](${u('/trades')})
- [Repair and retail](${u('/repair-and-retail')})
- [Clinics and appointment businesses](${u('/clinics')})
- [Professional services](${u('/professional-services')})
- [Web design in Preston](${u('/web-design-preston')}): Websites for businesses across Preston and Central Lancashire.

## Guides

${articles}

## Company

- [Approach](${u('/approach')}): How Masuyo works and who you work with.
- [Work](${u('/work')}): Real projects, explained plainly.
- [Brand assets](${u('/brand')}): Logos, colours and boilerplate for partners and press.
- [Start a project](${u('/start')}): Tell us what is slowing the business down. Replies within one working day.

Contact: ${SITE.email}
`
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
