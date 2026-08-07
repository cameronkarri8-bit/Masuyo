import type { Metadata } from 'next'
import OfferPage from '@/components/OfferPage'
import { SERVICE_IMAGES } from '@/lib/images'

export const metadata: Metadata = {
  title: 'Managed Hosting Services UK | Masuyo Digital',
  description: 'Managed website and application hosting on our own UK infrastructure. Fast, reliable, and fully supported with no third-party middlemen.',
  openGraph: {
    title: 'Managed Hosting Services UK | Masuyo Digital',
    description: 'Managed website and application hosting on our own UK infrastructure. Fast, reliable, and fully supported with no third-party middlemen.',
    url: 'https://masuyodigital.com/technology/hosting',
  },
  alternates: { canonical: 'https://masuyodigital.com/technology/hosting' },
}

export default function HostingPage() {
  return (
    <OfferPage
      eyebrow="Hosting and support"
      title="Hosting where someone answers."
      lead="Your site or application on our own infrastructure, kept fast, patched and backed up, with a person on the other end of the email rather than a ticket number."
      startingPrice="£40 per month"
      priceNote="Rolling monthly. No minimum term, no exit fee, no setup charge."
      heroImage={SERVICE_IMAGES.hosting}
      problem={[
        'Cheap shared hosting puts your site on a machine with hundreds of others, so a busy neighbour slows you down and there is nothing you can do about it. Support is a form, and the answer usually arrives after the problem has cost you something.',
        'The large providers are more reliable but no more helpful. When something breaks you get a ticket number and somebody who has never seen your site before and has no idea how it is built.',
        'Neither is acceptable when the site is how people find you and get in touch. What you want is somewhere fast, somewhere backed up, and somebody who already knows how the thing works when you email them.',
      ]}
      included={[
        {
          title: 'Managed VPS hosting',
          body: 'Your own space on our infrastructure, not a shared box with hundreds of unrelated sites competing for it.',
        },
        {
          title: 'SSL certificate',
          body: 'Installed, renewed automatically and HTTPS enforced. Nothing expires quietly and starts warning your visitors.',
        },
        {
          title: 'Daily backups',
          body: 'Taken every day and kept off the server, so a bad deploy or a bad day is a restore rather than a rebuild.',
        },
        {
          title: 'Uptime monitoring',
          body: 'The site is checked continuously. We usually know something is wrong before you do.',
        },
        {
          title: 'Security updates and patching',
          body: 'The stack is kept current. You are not sitting on an unpatched version because nobody got round to it.',
        },
        {
          title: 'Performance tuning',
          body: 'Caching, compression and image handling configured properly rather than left at whatever the defaults were.',
        },
        {
          title: 'Small content updates',
          body: 'Text changes, a new phone number, swapping an image. Routine edits are part of the plan, not a separate invoice.',
        },
        {
          title: 'Direct support',
          body: 'You email the person who built or took over the site. No first line triage, no reading your issue back to you.',
        },
        {
          title: 'Monthly reporting',
          body: 'Uptime, performance and anything we changed, written plainly rather than as a dashboard export nobody reads.',
        },
      ]}
      process={[
        {
          title: 'We look at what you have',
          body: 'Current host, stack, traffic and anything unusual. If your site will not run well on our setup we will tell you rather than take the money.',
          timing: '1 to 2 days',
        },
        {
          title: 'Migration',
          body: 'We copy the site across and stand it up on a staging URL first, so it is checked and working before anything points at it.',
          timing: '2 to 5 days',
        },
        {
          title: 'DNS switch',
          body: 'We move the domain at a quiet time, with the old host left running until propagation completes. Downtime is normally nil.',
          timing: 'Under an hour',
        },
        {
          title: 'Running it',
          body: 'Monitoring, backups and patching from that point on, with a monthly note on what happened. You only hear from us when it matters.',
          timing: 'Ongoing',
        },
      ]}
      cost={[
        {
          label: 'Hosting and maintenance',
          price: '£40 per month',
          detail: 'Managed hosting, SSL, daily backups, monitoring, updates, small content changes and support.',
        },
        {
          label: 'Migration from another host',
          price: 'included',
          detail: 'Standard site migrations are part of taking you on. Unusually complex moves are quoted first.',
        },
        {
          label: 'Application hosting',
          price: 'from £40 per month',
          detail: 'Web applications and portals with databases and background jobs. Priced on resource, quoted up front.',
        },
        {
          label: 'DevOps and infrastructure',
          price: 'from £800',
          detail: 'One-off work. Deployment pipelines, environments and release automation for a bigger setup.',
        },
        {
          label: 'GDPR and compliance review',
          price: 'quoted',
          detail: 'Data handling, retention and processor documentation for your hosting setup.',
        },
      ]}
      costDrivers={[
        'How much traffic the site handles, and whether it spikes',
        'Whether it is a website or an application with a database and background jobs',
        'How many environments you need, for instance staging alongside production',
        'Whether email hosting is part of it or sits with someone else',
        'How much routine content change you expect each month',
      ]}
      notIncluded={[
        'Domain registration and renewal. The domain stays in your name and you pay the registrar directly',
        'Email hosting. We will help you set it up, but we do not run mail servers',
        'New features, redesigns or new pages. Small edits are included, new work is quoted',
        'Fixing a site somebody else built badly. We will assess it first and quote the repair separately',
        'Third party licence and subscription fees for anything the site depends on',
        'A formal uptime SLA with financial penalties. We monitor and respond quickly, but we do not sell a guarantee we cannot personally honour',
      ]}
      faqs={[
        {
          q: 'Do I have to have had my site built by you?',
          a: 'No. We regularly take over sites built by somebody else. We will look at it first and tell you honestly what state it is in, because occasionally the right advice is to rebuild rather than to keep patching.',
        },
        {
          q: 'Will my site go down during the move?',
          a: 'Normally not at all. We stand the site up on our servers and test it before touching DNS, then switch at a quiet time with the old host still live until propagation finishes. If we expect any interruption we tell you the window in advance.',
        },
        {
          q: 'What counts as a small content update?',
          a: 'Changing text, swapping an image, updating a phone number or opening hours, adding a name to a list. Roughly, anything that takes us under half an hour. New pages, new features and design changes are quoted separately, and we will tell you which side of the line something falls on before doing it.',
        },
        {
          q: 'Am I locked in?',
          a: 'No. It is rolling monthly, there is no minimum term and no exit fee. If you want to leave we will export the site and hand over the files and the database. The domain is in your name throughout, so you never need our permission to move.',
        },
      ]}
      ctaHeadline="Ready to move to hosting that works?"
      ctaBody="Tell us about your site and your current setup. We will look at it and tell you honestly whether moving is worth it."
    />
  )
}
