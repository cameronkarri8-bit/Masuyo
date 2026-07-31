/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
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
    ]
  },
}

module.exports = nextConfig
