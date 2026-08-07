import type { Metadata } from 'next'
import OfferPage from '@/components/OfferPage'
import BespokeMockup from '@/components/placeholder/BespokeMockup'

export const metadata: Metadata = {
  title: 'Bespoke Technology Solutions UK | Masuyo Digital',
  description: 'We build bespoke technology products from scratch. If your idea does not fit a template, we design and build it from the ground up.',
  openGraph: {
    title: 'Bespoke Technology Solutions UK | Masuyo Digital',
    description: 'We build bespoke technology products from scratch.',
    url: 'https://masuyodigital.com/products/bespoke',
  },
  alternates: { canonical: 'https://masuyodigital.com/products/bespoke' },
}

export default function BespokePage() {
  return (
    <OfferPage
      eyebrow="Custom products"
      title="When nothing off the shelf fits."
      lead="Software designed from scratch around the thing your business actually does, for the cases where adapting an existing product would cost more than building the right one."
      startingPrice="From £3,500"
      priceNote="One-off build, fixed price agreed before work starts. Hosting from £40 a month."
      mockup={<BespokeMockup />}
      problem={[
        'Sometimes there genuinely is no product for what you do. You have looked, and the closest thing needs so much configuration and so many workarounds that it would be simpler to start from nothing.',
        'The risk with a bespoke build is that it becomes open ended. Scope grows, the timeline slips, and the number at the end bears no relation to the number at the start. That is what makes people wary, and they are right to be.',
        'The way round it is unglamorous: scope properly first, price it fixed, build the core before the extras, and put working software in front of you early enough that you can change your mind while changing your mind is still cheap.',
      ]}
      included={[
        {
          title: 'Discovery before quoting',
          body: 'We work out what the thing has to do and write it down. You get a fixed price against a defined scope, not an hourly rate and a hope.',
        },
        {
          title: 'Custom web applications',
          body: 'Internal tools, dashboards and business systems built around your workflow rather than a generic product’s idea of one.',
        },
        {
          title: 'Marketplace and multi-vendor platforms',
          body: 'Two sided platforms with separate seller and buyer journeys, listings, payments and commission handling.',
        },
        {
          title: 'Booking and scheduling systems',
          body: 'Availability, resources, capacity rules and payment, modelled on how your bookings genuinely work.',
        },
        {
          title: 'Subscription and membership platforms',
          body: 'Recurring billing, tiers, access control and renewals, into your own payment account.',
        },
        {
          title: 'Data dashboards and reporting',
          body: 'Your numbers pulled together from wherever they live and shown on one screen you can trust.',
        },
        {
          title: 'Complex integrations',
          body: 'Connecting systems that were never designed to talk to each other, including older software with awkward interfaces.',
        },
        {
          title: 'Mobile apps where they are needed',
          body: 'Native iOS and Android where a browser genuinely will not do. We will tell you when it would.',
        },
        {
          title: 'Documentation and full handover',
          body: 'The code is in your repository from day one, with written documentation and a walkthrough at the end.',
        },
      ]}
      related={[
        {
          label: 'Client portal',
          href: '/products/client-portal',
          blurb: 'A branded space where clients see their own documents, updates and invoices. From £2,200.',
        },
        {
          label: 'Community platform',
          href: '/products/community-platform',
          blurb: 'Members, discussion, gated content and events on your own domain. From £2,200.',
        },
        {
          label: 'CRM and lead management',
          href: '/products/crm-lead-management',
          blurb: 'A pipeline built on your stages, with no per seat licences. From £3,000.',
        },
        {
          label: 'Learning platform',
          href: '/products/custom-learning-platform',
          blurb: 'Courses, cohorts, progress tracking and payments into your own account. From £3,000.',
        },
      ]}
      relatedHeading="Start from something we have built before"
      process={[
        {
          title: 'Discovery',
          body: 'We work through the idea properly, including what it does not need to do. You leave with a written scope whether or not you build with us.',
          timing: '1 to 3 weeks',
        },
        {
          title: 'Fixed price and phasing',
          body: 'A price against that scope, split into phases so the first version is something usable rather than everything at once.',
          timing: '3 to 5 days',
        },
        {
          title: 'Build the core first',
          body: 'The part that carries the value gets built and put in front of you early, so you are reacting to software rather than a document.',
          timing: '6 to 16 weeks',
        },
        {
          title: 'Launch, then iterate',
          body: 'Testing, data migration, training and handover. Later phases only happen once the first one has proved itself in use.',
          timing: '2 to 4 weeks',
        },
      ]}
      cost={[
        {
          label: 'Bespoke build',
          price: 'from £3,500',
          detail: 'A custom application scoped and fixed priced before any development starts.',
        },
        {
          label: 'Mobile app',
          price: 'from £2,500',
          detail: 'Native or cross platform for iOS and Android, built around your users and business logic.',
        },
        {
          label: 'Discovery phase',
          price: 'quoted separately',
          detail: 'Scoping, technical planning and a written specification. Yours to keep either way.',
        },
        {
          label: 'API development or integration',
          price: '+£800',
          detail: 'Custom APIs, or connections to the platforms and older systems you already run on.',
        },
        {
          label: 'Enterprise scope',
          price: '+£1,500',
          detail: 'Bespoke architecture, large team access, advanced workflows or phased delivery.',
        },
        {
          label: 'Hosting and support',
          price: 'from £40 per month',
          detail: 'Managed hosting, SSL, daily backups, monitoring, updates and support.',
        },
      ]}
      costDrivers={[
        'How well defined the idea is when you arrive. Vague scope is the single biggest cost driver',
        'How many user types the system serves and how differently they behave',
        'Whether it integrates with existing systems, and how cooperative those systems are',
        'Whether it needs a mobile app or a browser will do',
        'How tight the deadline is. Compressing a timeline costs more than extending one',
      ]}
      notIncluded={[
        'An open ended scope. Anything outside the written specification is quoted as a change before it is built',
        'Ongoing development after handover, unless you take a retainer',
        'Third party subscription and licence costs the software depends on',
        'App store fees and the review process, though we will handle submission',
        'Business validation. We can build your idea. We cannot tell you whether people will buy it',
        'Formal penetration testing and certification, which we arrange with a specialist and bill on',
      ]}
      faqs={[
        {
          q: 'How can you fix a price on something that does not exist yet?',
          a: 'By doing discovery first and quoting against a written scope rather than a conversation. That is why discovery is priced separately: it is real work, and it is what makes the fixed price possible. If you decide not to build, the specification is still yours.',
        },
        {
          q: 'What if I want to change something mid build?',
          a: 'You can, and most people do. Changes are quoted before they are built, so nothing appears on an invoice you have not agreed. Changing the shape of the thing early is cheap. Changing it after the data model is set is not, which is why we spend real time on that stage.',
        },
        {
          q: 'What happens if we stop working together?',
          a: 'The code has been in your repository since the first commit and it is built on mainstream technology, so another developer can pick it up. Documentation is written as we go rather than promised at the end. There is nothing to hand over because you already have it.',
        },
        {
          q: 'Should I be building custom at all?',
          a: 'Often not, and we will say so. If an existing product does eighty per cent of the job and the missing twenty is a nuisance rather than a blocker, buying it is the better decision. Custom earns its cost when the gap is the thing your business competes on.',
        },
      ]}
      ctaHeadline="Have an idea that needs a custom build?"
      ctaBody="Tell us what it has to do. We will ask the right questions and tell you honestly what it would take, including whether you should build it at all."
    />
  )
}
