import { getAllResources } from '@/lib/resources'
import { SITE } from '@/lib/site'

export const dynamic = 'force-static'

function escapeXml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
}

/** The Resources feed: the twenty most recently updated articles. */
export function GET(): Response {
  const items = getAllResources()
    .slice(0, 20)
    .map(r => {
      const url = `${SITE.url}/resources/${r.slug}`
      return [
        '    <item>',
        `      <title>${escapeXml(r.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <description>${escapeXml(r.description)}</description>`,
        `      <category>${escapeXml(r.category)}</category>`,
        `      <pubDate>${new Date(`${r.updated}T09:00:00Z`).toUTCString()}</pubDate>`,
        '    </item>',
      ].join('\n')
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Masuyo resources</title>
    <link>${SITE.url}/resources</link>
    <description>Plain English guides on websites, custom software, automation and running a business on better technology.</description>
    <language>en-gb</language>
    <atom:link href="${SITE.url}/resources/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}
