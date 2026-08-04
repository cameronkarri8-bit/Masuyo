import type { Metadata } from 'next'
import OfferPage from '@/components/OfferPage'
import BrowserMockup from '@/components/placeholder/BrowserMockup'

export const metadata: Metadata = {
  title: 'Custom Community Platform Development UK | Masuyo Digital',
  description: 'Launch a private branded community your members will actually use. A fully custom community platform built for your audience.',
  openGraph: {
    title: 'Custom Community Platform Development UK | Masuyo Digital',
    description: 'Launch a private branded community your members will actually use.',
    url: 'https://masuyodigital.com/products/community-platform',
  },
  alternates: { canonical: 'https://masuyodigital.com/products/community-platform' },
}

export default function CommunityPlatformPage() {
  return (
    <OfferPage
      eyebrow="Community platform"
      title="Your community, on your domain."
      lead="Discussion, member profiles, gated content and events in one branded space that you own, rather than an audience you are renting from a social network."
      startingPrice="From £2,200"
      priceNote="One-off build on your own domain. Hosting from £40 a month. No per member fees."
      mockup={<BrowserMockup aspect="4/3" variant={2} />}
      problem={[
        'Most communities start on a platform somebody else controls. It works, until the algorithm changes, the pricing changes, or a policy decision you had no say in removes half your reach overnight.',
        'The other problem is that you cannot see who your members are. You have follower counts rather than contact details, and no way to reach the people who care most without paying to be shown to them.',
        'Owning the platform fixes both. Your members are on your domain, your data is yours to export, and what people see is decided by you rather than by a feed ranking system.',
      ]}
      included={[
        {
          title: 'Discussion feed and topics',
          body: 'Threaded conversation and topic channels, with a feed structured so activity is visible rather than buried.',
        },
        {
          title: 'Member profiles and directory',
          body: 'Profiles, bios and a searchable directory, so members can find each other rather than only talking to you.',
        },
        {
          title: 'Content and resource library',
          body: 'Videos, guides, templates and downloads, organised and available only to members who should have them.',
        },
        {
          title: 'Events and live sessions',
          body: 'Schedule events and calls, take sign ups, and send reminders without running it out of a spreadsheet.',
        },
        {
          title: 'Membership tiers and access control',
          body: 'Free, paid or invitation only, with different tiers seeing different content. All controlled by you.',
        },
        {
          title: 'Payments and subscriptions',
          body: 'Recurring memberships taken through your own payment account, with renewals and failed payments handled.',
        },
        {
          title: 'Moderation tools',
          body: 'Report, remove, suspend and pin, plus an activity view so problems are visible before they become arguments.',
        },
        {
          title: 'Email notifications and digests',
          body: 'Members hear about replies and new activity, which is what brings people back rather than good intentions.',
        },
        {
          title: 'Your data, exportable',
          body: 'Members, posts and payments are yours. You can export the lot at any time without asking anyone.',
        },
      ]}
      process={[
        {
          title: 'Define what the community is for',
          body: 'Who joins, why they come back, and what they should be able to do. Communities fail on this rather than on features.',
          timing: 'Week 1',
        },
        {
          title: 'Structure and tiers agreed',
          body: 'Topics, member tiers, what is gated and what is open, and the moderation rules. Agreed before the build starts.',
          timing: 'Week 2',
        },
        {
          title: 'Build',
          body: 'Accounts, feed, library, events, payments and the admin side, built in stages with review points along the way.',
          timing: '4 to 8 weeks',
        },
        {
          title: 'Soft launch, then open',
          body: 'A small founding group goes in first so the space is not empty on day one, then it opens properly.',
          timing: '2 to 4 weeks',
        },
      ]}
      cost={[
        {
          label: 'Community platform build',
          price: 'from £2,200',
          detail: 'Accounts, discussion, profiles, resource library, access control and moderation tools.',
        },
        {
          label: 'Members area and login',
          price: '+£600',
          detail: 'Where a gated section is being added to an existing site rather than built as a standalone platform.',
        },
        {
          label: 'Payment gateway',
          price: '+£200',
          detail: 'Subscriptions and one-off payments taken inside the platform, into your own account.',
        },
        {
          label: 'Interactive resource hub',
          price: '+£500',
          detail: 'A searchable library with filtering, bookmarking and gated premium content.',
        },
        {
          label: 'Larger scope',
          price: '+£200 to £1,500',
          detail: 'Added where the build is medium, large or enterprise rather than a straightforward first version.',
        },
        {
          label: 'Hosting and support',
          price: 'from £40 per month',
          detail: 'Managed hosting, SSL, daily backups, monitoring, updates and support.',
        },
      ]}
      costDrivers={[
        'How many membership tiers there are and how differently they behave',
        'Whether payments and subscriptions are part of it',
        'Whether members are migrating from an existing platform, and what can be exported from it',
        'How much moderation tooling you need, which depends on how large and how public it is',
        'Whether events and live sessions are core or can wait for a later phase',
      ]}
      notIncluded={[
        'Community management and moderation. We build the tools, you run the room',
        'Content. The library is empty until you fill it, and that is the part that decides whether people stay',
        'Members. A platform does not create an audience, and anyone selling you that is selling you something else',
        'Payment processor fees, which go to your provider',
        'Video hosting and streaming costs where you use a third party service for it',
        'Native mobile apps. It works on a phone browser. A native app is a separate build from £2,500',
      ]}
      faqs={[
        {
          q: 'Why not just use a ready made community platform?',
          a: 'For a small free community, do. The case for building changes when the per member pricing starts to bite, when you want members on your own domain and in your own database, or when the platform structure is fighting how your community actually works. Compare the three year cost, not the first month.',
        },
        {
          q: 'What if nobody joins?',
          a: 'That is the real risk, and it is worth naming before you spend £2,200. Communities succeed on having a clear reason to exist and somebody committed to keeping conversation going in the first months. If you do not have an audience yet, spend the money on getting one first, and we will tell you that rather than take the build.',
        },
        {
          q: 'Can members be moved over from where we are now?',
          a: 'Usually, depending on what your current platform lets you export. Contact details normally come across cleanly. Historic posts sometimes do and sometimes do not. We check what is actually exportable before you commit to moving.',
        },
        {
          q: 'What happens to our data if we stop working with you?',
          a: 'You export it and take it with you. Members, posts, payments and files are in your database on your hosting, and the code is in your repository. There is no lock in, because there is nothing we are holding that you would have to ask us for.',
        },
      ]}
      ctaHeadline="Ready to own your community?"
      ctaBody="Tell us who your members are and what you want them doing. We will be honest about whether a platform is the right next step."
    />
  )
}
