import { getAllPosts } from '@/lib/blog'

const SITE = 'https://masuyodigital.com'
const FEED_TITLE = 'Masuyo Digital blog'
const FEED_DESCRIPTION =
  'Thinking out loud about digital, marketing and technology. No jargon, just useful.'

/** Escape the five characters that are not legal as raw text in XML. */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/** RFC 822 date, which is what RSS 2.0 expects in pubDate. */
function toRfc822(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return new Date().toUTCString()
  return date.toUTCString()
}

export function GET(): Response {
  const posts = getAllPosts().slice(0, 10)

  const items = posts
    .map(post => {
      const url = `${SITE}/blog/${post.slug}`
      return [
        '    <item>',
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${escapeXml(url)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
        `      <description>${escapeXml(post.excerpt)}</description>`,
        `      <category>${escapeXml(post.category)}</category>`,
        `      <pubDate>${toRfc822(post.publishedAt)}</pubDate>`,
        '    </item>',
      ].join('\n')
    })
    .join('\n')

  const lastBuild =
    posts.length === 0 ? new Date().toUTCString() : toRfc822(posts[0].publishedAt)

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${escapeXml(FEED_TITLE)}</title>`,
    `    <link>${SITE}/blog</link>`,
    `    <description>${escapeXml(FEED_DESCRIPTION)}</description>`,
    '    <language>en-GB</language>',
    `    <lastBuildDate>${lastBuild}</lastBuildDate>`,
    `    <atom:link href="${SITE}/blog/rss.xml" rel="self" type="application/rss+xml" />`,
    items,
    '  </channel>',
    '</rss>',
  ]
    .filter(line => line.length > 0)
    .join('\n')

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
