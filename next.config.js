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
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'masuyodigital.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      // Supplied photography. Served through next/image so it is resized,
      // converted and cached rather than hot-linked at full size.
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async redirects() {
    return [
      // Three services pages duplicated deeper pages covering the same ground.
      // The technology and marketing versions are canonical. The old URLs keep
      // working and pass their ranking on rather than 404.
      //
      // statusCode: 301 rather than permanent: true, which would emit a 308.
      { source: '/services/hosting', destination: '/technology/hosting', statusCode: 301 },
      { source: '/services/automation', destination: '/technology/automation', statusCode: 301 },
      { source: '/services/lead-generation', destination: '/marketing/lead-generation', statusCode: 301 },

      // Pages replaced during the October 2026 redesign. Phase 8 adds the
      // rest of the old site's URLs.
      { source: '/about', destination: '/approach', statusCode: 301 },
      { source: '/start-a-project', destination: '/start', statusCode: 301 },

      // Blog, guides, glossary and FAQ are now one Resources hub. Every
      // article kept its slug.
      { source: '/blog', destination: '/resources', statusCode: 301 },
      { source: '/blog/rss.xml', destination: '/resources/rss.xml', statusCode: 301 },
      { source: '/blog/:slug', destination: '/resources/:slug', statusCode: 301 },
      { source: '/guides', destination: '/resources', statusCode: 301 },
      { source: '/guides/:slug', destination: '/resources/:slug', statusCode: 301 },
      { source: '/glossary', destination: '/resources?category=glossary', statusCode: 301 },
      { source: '/faq', destination: '/resources', statusCode: 301 },

      // The old checklist pages under /resources, retired with the redesign.
      // Each goes to the guide that covers the same ground, or to the hub.
      { source: '/resources/seo-quick-start-checklist', destination: '/resources/small-business-website-checklist', statusCode: 301 },
      { source: '/resources/website-legal-pages-checklist', destination: '/resources/small-business-website-checklist', statusCode: 301 },
      { source: '/resources/website-brief-template', destination: '/resources/how-to-brief-a-web-design-agency', statusCode: 301 },
      { source: '/resources/tech-stack-guide', destination: '/resources/tech-solutions-for-small-businesses', statusCode: 301 },
      { source: '/resources/uk-business-launch-checklist', destination: '/resources', statusCode: 301 },
      { source: '/resources/choosing-business-structure', destination: '/resources', statusCode: 301 },
      { source: '/resources/social-media-content-calendar', destination: '/resources', statusCode: 301 },
      { source: '/resources/cash-flow-forecast-template', destination: '/resources', statusCode: 301 },
      { source: '/resources/business-growth-template', destination: '/resources', statusCode: 301 },
    ]
  },
}

module.exports = nextConfig
