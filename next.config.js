const fs = require('node:fs')
const path = require('node:path')

/**
 * Whether any industry landing page is published. Until one is, /industries
 * has nothing to list and goes to the home page with a temporary redirect, so
 * nothing is cached once the hub goes live. Read from the data files, so
 * publishing a page switches this over with no other change.
 */
const INDUSTRIES_DIR = path.join(__dirname, 'content', 'industries')
const hasPublishedIndustry =
  fs.existsSync(INDUSTRIES_DIR) &&
  fs
    .readdirSync(INDUSTRIES_DIR)
    .some(f => f.endsWith('.ts') && /status:\s*'published'/.test(fs.readFileSync(path.join(INDUSTRIES_DIR, f), 'utf8')))

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    // Article share cards read these fonts and the articles from disk. They
    // are built ahead of time, but tracing them in as well means a card can
    // still be generated on the server if one is ever requested fresh.
    outputFileTracingIncludes: {
      '/resources/[slug]/opengraph-image': ['./lib/brand/fonts/**', './content/resources/**'],
    },
  },
  async redirects() {
    // Every old URL keeps working: each one sends visitors, and any ranking it
    // has, to the page that now covers the same ground. statusCode: 301 rather
    // than permanent: true, which would emit a 308. Specific paths come before
    // the wildcards that would otherwise catch them.
    const r = (source, destination) => ({ source, destination, statusCode: 301 })
    return [
      // Pages replaced by the October 2026 redesign.
      r('/about', '/approach'),
      r('/start-a-project', '/start'),
      r('/contact', '/start'),
      r('/get-a-website', '/websites'),

      // Services.
      r('/services', '/'),
      r('/services/web-design', '/websites'),
      r('/services/digital-marketing', '/care'),
      r('/services/technology-solutions', '/systems'),
      r('/services/hosting', '/care'),
      r('/services/automation', '/systems'),
      r('/services/lead-generation', '/care'),

      // Technology: most of it is now Systems.
      r('/technology/web-development', '/websites'),
      r('/technology/ecommerce', '/websites'),
      r('/technology/hosting', '/care'),
      r('/technology/architecture', '/approach'),
      r('/technology/devops', '/approach'),
      r('/technology', '/systems'),
      r('/technology/:path*', '/systems'),

      // Marketing is now part of Care.
      r('/marketing', '/care'),
      r('/marketing/:path*', '/care'),

      // Products.
      r('/products', '/systems'),
      r('/products/:path*', '/systems'),

      // Industries. Listed one by one, because
      // /industries is the industry hub once a page is published, and
      // /industries/community-interest-companies stays where it is.
      ...(hasPublishedIndustry ? [] : [{ source: '/industries', destination: '/', statusCode: 307 }]),
      r('/industries/tradespeople', '/trades'),
      r('/industries/automotive', '/repair-and-retail'),
      r('/industries/ecommerce', '/repair-and-retail'),
      r('/industries/healthcare', '/clinics'),
      r('/industries/fitness-wellness', '/clinics'),
      r('/industries/professional-services', '/professional-services'),
      r('/industries/legal', '/professional-services'),
      r('/industries/finance', '/professional-services'),
      r('/industries/real-estate', '/professional-services'),
      r('/industries/hospitality', '/websites'),
      r('/industries/restaurants-food', '/websites'),
      r('/industries/education', '/websites'),
      r('/industries/charity-non-profit', '/websites'),

      // Blog, guides, glossary and FAQ are now one Resources hub. Every
      // article kept its slug.
      r('/blog', '/resources'),
      r('/blog/rss.xml', '/resources/rss.xml'),
      r('/blog/:slug', '/resources/:slug'),
      r('/guides', '/resources'),
      r('/guides/:slug', '/resources/:slug'),
      r('/glossary', '/resources?category=glossary'),
      r('/faq', '/resources'),

      // The old checklist pages under /resources, retired with the redesign.
      // Each goes to the guide that covers the same ground, or to the hub.
      r('/resources/seo-quick-start-checklist', '/resources/small-business-website-checklist'),
      r('/resources/website-legal-pages-checklist', '/resources/small-business-website-checklist'),
      r('/resources/website-brief-template', '/resources/how-to-brief-a-web-design-agency'),
      r('/resources/tech-stack-guide', '/resources/tech-solutions-for-small-businesses'),
      r('/resources/uk-business-launch-checklist', '/resources'),
      r('/resources/choosing-business-structure', '/resources'),
      r('/resources/social-media-content-calendar', '/resources'),
      r('/resources/cash-flow-forecast-template', '/resources'),
      r('/resources/business-growth-template', '/resources'),
    ]
  },
}

module.exports = nextConfig
