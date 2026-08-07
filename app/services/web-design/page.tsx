import type { Metadata } from 'next'
import OfferPage from '@/components/OfferPage'
import { SERVICE_IMAGES } from '@/lib/images'

export const metadata: Metadata = {
  title: 'Web Design & Development',
  description: 'Websites that work as hard as you do. Fast, modern, mobile-friendly websites built to convert visitors into customers.',
  openGraph: {
    title: 'Web Design & Development | Masuyo Digital',
    description: 'Websites that work as hard as you do. Fast, modern, mobile-friendly websites built to convert visitors into customers.',
    url: 'https://masuyodigital.com/services/web-design',
  },
  alternates: { canonical: 'https://masuyodigital.com/services/web-design' },
}

export default function WebDesignPage() {
  return (
    <OfferPage
      eyebrow="Websites"
      title="A website that turns visitors into enquiries."
      lead="Fast, modern and built around what your business actually needs to do, not around a template that happened to be on offer."
      startingPrice="From £249"
      priceNote="One-off build. Hosting from £40 a month if you want us to look after it."
      heroImage={SERVICE_IMAGES.websites}
      heroLayout="fullBleed"
      problem={[
        'Your website is often the first thing a potential customer sees. If it loads slowly, looks wrong on a phone, or makes somebody hunt for a way to get in touch, they leave and go to whoever is next in the search results.',
        'The usual fixes are both bad. A cheap template site looks like every other site in your sector and cannot be changed once it is up. A traditional agency build takes months, costs thousands, and arrives with a support contract you did not ask for.',
        'What most businesses want is straightforward: a site that is quick, reads well on a phone, is easy to update, and gives people an obvious reason to make contact.',
      ]}
      included={[
        {
          title: 'Design built around your business',
          body: 'Laid out around what you need people to do on the page, not dropped into a stock theme with your logo swapped in.',
        },
        {
          title: 'Fast by default',
          body: 'Built lean and hosted on our own servers. No page builder plugins loading three seconds of code before anything appears.',
        },
        {
          title: 'Works on every screen',
          body: 'Designed on a phone first, because that is where most of your visitors will be, then scaled up to tablet and desktop.',
        },
        {
          title: 'SEO foundations in place',
          body: 'Proper page titles, meta descriptions, semantic HTML, a sitemap and clean URL structure from day one.',
        },
        {
          title: 'Contact and enquiry forms',
          body: 'Forms that validate properly, land in your inbox, and can route into a CRM later without a rebuild.',
        },
        {
          title: 'SSL and security',
          body: 'Certificate installed, HTTPS enforced, and the stack kept patched for as long as we host it.',
        },
        {
          title: 'A CMS if you want one',
          body: 'Optional content management so you can edit pages and publish posts yourself without coming back to us.',
        },
        {
          title: 'Analytics connected',
          body: 'So you can see what people actually do on the site rather than guessing at it.',
        },
        {
          title: 'You own all of it',
          body: 'Your domain, your hosting account, your content, your code. Nothing is rented back to you.',
        },
      ]}
      process={[
        {
          title: 'We agree the scope and the price',
          body: 'You tell us what the site needs to do. We tell you what it will cost and what it will not include, before anything starts.',
          timing: 'Day one',
        },
        {
          title: 'Structure and design',
          body: 'Pages, layout and the route a visitor takes through the site. You see it and change it before a line of code exists.',
          timing: '2 to 5 days',
        },
        {
          title: 'Build',
          body: 'The site is built, content goes in, forms are wired up and everything is checked on real phones rather than a browser window.',
          timing: '1 to 3 weeks',
        },
        {
          title: 'Launch and hand over',
          body: 'We point the domain, install the certificate, submit the sitemap and give you the logins. Then we are on hand if anything needs adjusting.',
          timing: 'Launch day',
        },
      ]}
      cost={[
        {
          label: 'New website',
          price: 'from £249',
          detail: 'A complete site built from scratch. The starter build goes live in 7 working days.',
        },
        {
          label: 'Website redesign',
          price: 'from £349',
          detail: 'A full rebuild of an existing site with better design, performance and structure.',
        },
        {
          label: 'CMS or blog',
          price: '+£150',
          detail: 'Add content management so you can update pages and publish posts yourself.',
        },
        {
          label: 'E-commerce',
          price: '+£400',
          detail: 'Product management, checkout and payment processing built into the site.',
        },
        {
          label: 'Booking system',
          price: '+£250',
          detail: 'Customers schedule appointments, classes or services directly on the site.',
        },
        {
          label: 'Hosting and maintenance',
          price: '£40 per month',
          detail: 'Optional. Managed hosting, SSL, daily backups, monitoring, updates and support.',
        },
      ]}
      costDrivers={[
        'How many pages the site needs, and whether the content already exists',
        'Whether the design is bespoke or a refinement of something you already have',
        'Features like e-commerce, bookings, member logins or payment gateways',
        'Whether we are writing the copy and producing the images, or you are',
        'How tight the deadline is. A rush is more expensive because it moves other work',
      ]}
      notIncluded={[
        'Logo design and full brand identity work. We will work to your existing brand',
        'Photography and video production. We can advise on what to shoot, or use stock',
        'Copywriting, unless you ask for it and we price it in',
        'Ongoing SEO, content and link building. That is a separate monthly service from £499',
        'Paid ad management. Priced separately from £299 a month',
        'Third party licence fees, such as premium fonts or paid plugins, which you buy directly',
        'Hosting, unless you take the £40 a month plan. You are free to host it wherever you like',
      ]}
      faqs={[
        {
          q: 'Is £249 really the price, or does it climb once we start?',
          a: 'It is really the price for a starter site, and it is the number the estimate builder will quote you. It climbs only if you add things to the scope, and we agree every one of those with you before the work happens. Nothing appears on an invoice that you have not seen first.',
        },
        {
          q: 'How long does it take?',
          a: 'The starter build goes live in 7 working days. A larger site with bespoke design, more pages or features like e-commerce is usually two to four weeks. The main thing that slows a build down is waiting on content, so if you have your copy and images ready it goes faster.',
        },
        {
          q: 'Can I update the site myself afterwards?',
          a: 'Yes, if you add the CMS option. That gives you an editor for pages and blog posts so you do not need us for routine changes. Without it, the site is still yours and any developer can work on it, but content changes come back to us.',
        },
        {
          q: 'What happens if I want to leave?',
          a: 'You take everything with you. The domain is in your name, the code is yours, and we will export the site and hand over the files and logins. There is no notice period on the hosting plan and nothing is held hostage.',
        },
        {
          q: 'Do I have to host it with you?',
          a: 'No. The £40 a month plan exists because most people would rather not think about servers, but the site is built on standard technology and will run anywhere. If you want to host it elsewhere we will hand it over and help you move it.',
        },
      ]}
      ctaHeadline="Ready to talk about your website?"
      ctaBody="Tell us what the site needs to do. You will get a real number, and an honest answer about whether you need what you are asking for."
    />
  )
}
