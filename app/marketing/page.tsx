import type { Metadata } from 'next'
import OfferPage from '@/components/OfferPage'
import SiteScreenshot from '@/components/SiteScreenshot'

export const metadata: Metadata = {
  title: 'Digital Marketing Services | SEO, Paid Ads and Lead Generation | Masuyo Digital',
  description: 'From SEO and paid ads to email automation and content marketing, Masuyo Digital builds marketing systems that generate consistent leads and grow your business.',
  openGraph: {
    title: 'Digital Marketing Services | SEO, Paid Ads and Lead Generation | Masuyo Digital',
    description: 'From SEO and paid ads to email automation and content marketing, Masuyo Digital builds marketing systems that generate consistent leads and grow your business.',
    url: 'https://masuyodigital.com/marketing',
  },
  alternates: { canonical: 'https://masuyodigital.com/marketing' },
}

export default function MarketingPage() {
  return (
    <OfferPage
      eyebrow="Marketing and SEO"
      title="Get found by people already looking for you."
      lead="Search, ads, content and follow up, set up so you can see what is bringing in enquiries and what is not earning its place."
      startingPrice="From £199"
      priceNote="SEO setup as a one-off. Ongoing retainers from £499 a month."
      mockup={
        <SiteScreenshot
          file="marketing.png"
          alt="An analytics dashboard, showing traffic and conversion charts alongside a table of channels."
          fallbackVariant={2}
          priority
        />
      }
      problem={[
        'Marketing spend is easy to lose track of. Money goes out every month, a report arrives full of impressions and reach, and nobody can say which of it produced an enquiry that turned into work.',
        'Part of the reason is that the pieces are usually bought separately. The ads agency does not talk to whoever built the site, the tracking was never set up properly, and nothing connects a click to a customer.',
        'The fix is unglamorous. Get the tracking right first, then work on the channels that actually reach people who are already looking for what you sell, and be willing to switch off what is not working.',
      ]}
      included={[
        {
          title: 'Tracking set up properly first',
          body: 'Analytics, goals, events and conversion tracking configured before we spend anything, so the numbers afterwards mean something.',
        },
        {
          title: 'Technical SEO foundation',
          body: 'Metadata, sitemap, schema markup, site structure and Google Search Console configured and verified.',
        },
        {
          title: 'Keyword and intent research',
          body: 'What people actually type when they are ready to buy, rather than the high volume terms that never convert.',
        },
        {
          title: 'Content that answers real questions',
          body: 'Pages and posts built around the things your buyers ask, written to be useful rather than to hit a word count.',
        },
        {
          title: 'Paid campaigns on Google and Meta',
          body: 'Built around enquiries and sales as the goal, not clicks. Budget moved off what is not converting.',
        },
        {
          title: 'Landing pages that convert',
          body: 'A campaign pointed at a proper landing page rather than your homepage, so the message matches the ad.',
        },
        {
          title: 'Email and follow up automation',
          body: 'Sequences triggered by what somebody actually did, so leads are followed up whether or not you remembered.',
        },
        {
          title: 'CRM connected',
          body: 'Enquiries flow into your CRM with their source attached, so you can see which channel produced the work.',
        },
        {
          title: 'Reporting in plain English',
          body: 'What we did, what it cost, what came of it, and what we are changing next. No jargon, no vanity metrics.',
        },
      ]}
      related={[
        { label: 'SEO', href: '/marketing/seo', blurb: 'Rank higher, get found faster, and drive organic traffic that converts.' },
        { label: 'Paid ads', href: '/marketing/paid-ads', blurb: 'Google and Meta campaigns managed to deliver profitable leads and sales.' },
        { label: 'Lead generation', href: '/marketing/lead-generation', blurb: 'End to end systems that bring qualified prospects directly to you.' },
        { label: 'Email and automation', href: '/marketing/email-automation', blurb: 'Sequences and workflows that nurture leads and retain customers automatically.' },
        { label: 'Content marketing', href: '/marketing/content', blurb: 'Content that builds authority, drives traffic and generates inbound enquiries.' },
        { label: 'Social media', href: '/marketing/social', blurb: 'Consistent, on brand social content and management that builds your audience.' },
      ]}
      relatedHeading="The individual services"
      process={[
        {
          title: 'Audit and tracking',
          body: 'We look at what you have, what is being measured and what is not, and get the tracking right before recommending any spend.',
          timing: 'Week 1',
        },
        {
          title: 'Foundations and plan',
          body: 'Technical SEO fixed, keywords and audiences agreed, and a plan with a budget against each channel. You approve it before anything runs.',
          timing: 'Weeks 2 to 3',
        },
        {
          title: 'Launch and measure',
          body: 'Campaigns and content go live. Early weeks are about data collection rather than results, and we are honest about that.',
          timing: 'Month 1',
        },
        {
          title: 'Iterate monthly',
          body: 'Budget moves towards what is working and away from what is not, with a plain report each month on the decisions and the reasons.',
          timing: 'Ongoing',
        },
      ]}
      cost={[
        {
          label: 'Google Analytics and tracking',
          price: 'from £99',
          detail: 'One-off. Analytics, goal tracking, event monitoring and conversion reporting set up properly.',
        },
        {
          label: 'SEO setup',
          price: 'from £199',
          detail: 'One-off. Metadata, sitemap, schema markup and Search Console configuration.',
        },
        {
          label: 'Digital marketing campaign',
          price: 'from £299 per month',
          detail: 'A managed campaign across your chosen channels, built to drive traffic, leads and conversions.',
        },
        {
          label: 'Email marketing automation',
          price: 'from £300',
          detail: 'One-off. Automated sequences triggered by user behaviour, from welcome flows to re-engagement.',
        },
        {
          label: 'Full funnel build',
          price: 'from £1,200',
          detail: 'One-off. Paid ads, landing page, email sequence and CRM integration, built as one system.',
        },
        {
          label: 'Monthly SEO and content retainer',
          price: '£499 per month',
          detail: 'Ongoing SEO management, keyword targeting and content production.',
        },
        {
          label: 'Growth retainer',
          price: '£899 per month',
          detail: 'SEO, content, paid ads and performance reporting, managed together.',
        },
      ]}
      costDrivers={[
        'How competitive your sector is, particularly for search',
        'Whether the tracking already exists or has to be built from nothing',
        'How many channels you want running at once',
        'Whether we are producing the content and creative or you are',
        'How much content the site already has to work with',
      ]}
      notIncluded={[
        'Your ad spend. Campaign management fees are separate from the money that goes to Google or Meta',
        'Guaranteed rankings or guaranteed lead volumes. Anyone promising those is guessing',
        'Photography, video production and design of major creative assets, quoted separately',
        'Buying links. It breaks Google guidelines and it will eventually cost you more than it gains',
        'Website changes beyond the marketing work itself. Development is quoted separately',
        'Sales. We can bring you enquiries, but converting them is still your job',
      ]}
      faqs={[
        {
          q: 'How long before I see results?',
          a: 'Paid ads produce traffic immediately and usable data within two to four weeks. SEO is slower, and three to six months is typical before meaningful organic growth. Anyone quoting you faster SEO results is either lucky or lying, and the difference matters when it is your money.',
        },
        {
          q: 'Can you guarantee I will rank first for my keywords?',
          a: 'No, and nobody honestly can. Google does not sell positions and does not publish the algorithm. What we can do is fix what is technically holding you back, target the terms your buyers actually use, and show you month on month whether it is moving.',
        },
        {
          q: 'Is the ad spend included in the fee?',
          a: 'No. The management fee is what you pay us, and the ad spend goes directly to Google or Meta from your own account. That is deliberate. You keep control of the budget and you can see exactly what is being spent without going through us.',
        },
        {
          q: 'What if it is not working?',
          a: 'We tell you. If a channel is not earning its place after a fair run we will say so and recommend moving the budget or stopping it, even when that reduces what you pay us. A client who stopped spending on something that did not work usually stays for the things that do.',
        },
      ]}
      ctaHeadline="Ready to build a marketing system that works?"
      ctaBody="Tell us where you are and where you want to be. You will get an honest view of what is realistic before you spend anything."
    />
  )
}
