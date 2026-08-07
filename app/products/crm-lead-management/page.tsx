import type { Metadata } from 'next'
import OfferPage from '@/components/OfferPage'
import ServiceImage from '@/components/ServiceImage'
import { PRODUCT_IMAGES } from '@/lib/images'

export const metadata: Metadata = {
  title: 'Custom CRM and Lead Management UK | Masuyo Digital',
  description: 'A lightweight custom CRM built around how your business actually works. Track leads, manage relationships, and close more deals without the bloat.',
  openGraph: {
    title: 'Custom CRM and Lead Management UK | Masuyo Digital',
    description: 'A lightweight custom CRM built around how your business actually works.',
    url: 'https://masuyodigital.com/products/crm-lead-management',
  },
  alternates: { canonical: 'https://masuyodigital.com/products/crm-lead-management' },
}

export default function CrmLeadManagementPage() {
  return (
    <OfferPage
      eyebrow="CRM and lead management"
      title="A pipeline that matches how you actually sell."
      lead="A lightweight CRM built around your stages, your fields and your follow up, instead of a large product you have to bend your business to fit."
      startingPrice="From £3,000"
      priceNote="One-off build. Hosting from £40 a month. No per seat licences, so growing your team costs nothing extra."
      mockup={
        <ServiceImage
          image={PRODUCT_IMAGES.crm}
          rounded
          priority
          sizes="(min-width: 1024px) 45vw, 100vw"
        />
      }
      problem={[
        'Most businesses track leads in a spreadsheet, an inbox and somebody’s memory. It works while there are twenty of them. At two hundred, enquiries go cold because nobody owned the follow up and nobody noticed.',
        'The usual answer is a large CRM, which brings its own problems. You pay per seat, you get several hundred features you will never touch, and configuring it to match your process takes weeks of somebody’s time before it does anything useful.',
        'A custom CRM does the opposite. It has your pipeline stages, your fields and your follow up rules, it does nothing else, and it costs the same whether you have three people or thirty.',
      ]}
      included={[
        {
          title: 'Pipeline built on your stages',
          body: 'The stages you actually use, named the way your team names them, in the order the work really happens.',
        },
        {
          title: 'Contact and company records',
          body: 'Full history, notes, files and communication logs against each contact, in one place rather than four.',
        },
        {
          title: 'Task and follow up reminders',
          body: 'Assigned to a person with a date, so a lead going quiet is visible rather than silently forgotten.',
        },
        {
          title: 'Email and activity tracking',
          body: 'Calls, emails and meetings logged against the right record so the history is there when somebody picks it up.',
        },
        {
          title: 'Custom fields and workflows',
          body: 'The data structure your business needs, plus automatic rules for what happens when a deal moves stage.',
        },
        {
          title: 'Reporting and dashboards',
          body: 'Pipeline health, conversion rates and forecast on one screen, from your data rather than a monthly export.',
        },
        {
          title: 'Lead capture from your website',
          body: 'Enquiries arrive in the pipeline with their source attached, so you know which marketing produced the work.',
        },
        {
          title: 'User roles and permissions',
          body: 'Sales sees their own, managers see everything, and anyone else sees only what you decide they should.',
        },
        {
          title: 'Data import and handover',
          body: 'Your existing spreadsheet or CRM export brought in, plus documentation and training for the people using it.',
        },
      ]}
      process={[
        {
          title: 'Map your sales process',
          body: 'Stages, owners, what has to be true to move forward, and where deals currently stall. Written down and agreed.',
          timing: 'Week 1',
        },
        {
          title: 'Data model and screens',
          body: 'Fields, records, permissions and the pipeline view. Getting this right now is much cheaper than changing it later.',
          timing: 'Week 2',
        },
        {
          title: 'Build',
          body: 'Pipeline, records, tasks, reporting and integrations, built in stages with your team seeing it as it comes together.',
          timing: '4 to 10 weeks',
        },
        {
          title: 'Import, train, go live',
          body: 'Existing data imported, the team trained on the real system with real records, then a switchover date you pick.',
          timing: '1 to 2 weeks',
        },
      ]}
      cost={[
        {
          label: 'Custom CRM or business system',
          price: 'from £3,000',
          detail: 'Pipeline, records, tasks, custom fields, reporting and role based access.',
        },
        {
          label: 'CRM integration with existing tools',
          price: '+£400',
          detail: 'Connecting the CRM to your website, email platform or accounting system.',
        },
        {
          label: 'API development or integration',
          price: '+£800',
          detail: 'A custom API, or a deeper connection to a platform your business already runs on.',
        },
        {
          label: 'Email automation',
          price: '+£300',
          detail: 'Automated sequences triggered by pipeline stage, from first response to re-engagement.',
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
        'How many pipelines you run, and whether they are genuinely different processes',
        'How many user roles there are and how far their permissions diverge',
        'What it needs to connect to, particularly accounting and email platforms',
        'How much existing data has to be imported, and what state it is in',
        'Whether reporting is straightforward pipeline metrics or something more involved',
      ]}
      notIncluded={[
        'Data cleansing. We import what you give us. Duplicates and bad records come across as they are',
        'Your email and calendar subscriptions. We connect to them, you keep paying for them',
        'Telephony and call recording. It can be integrated, but the service itself is bought separately',
        'Ongoing feature development after launch, unless you take a retainer',
        'Sales training and process design. We build the system around the process you already have',
        'Native mobile apps. It works on a phone browser. A native app is a separate build from £2,500',
      ]}
      faqs={[
        {
          q: 'Why build one when the big CRMs have a free tier?',
          a: 'If a free tier does the job, use it. The point where building makes sense is usually per seat pricing as you hire, or a process that the product simply will not model without heavy workarounds. At three or four seats a large CRM is cheaper. At fifteen, over a few years, it often is not.',
        },
        {
          q: 'Can we move our existing data across?',
          a: 'Yes, if it can be exported to a spreadsheet or reached through an API, which covers nearly everything including a plain spreadsheet you already keep. We map the fields with you first so you can see where everything lands before we import it.',
        },
        {
          q: 'What if our process changes next year?',
          a: 'Stage and field changes are usually straightforward because the system is small and we wrote it. Structural changes cost more, which is why we spend proper time on the data model up front. Either way you get a quote before any work happens.',
        },
        {
          q: 'Who owns the data and the code?',
          a: 'You do, both. The database sits on your hosting and the code is in your repository from the first commit. If you want to move it elsewhere or bring in another developer, nothing has to come through us.',
        },
      ]}
      ctaHeadline="Ready to stop losing leads in a spreadsheet?"
      ctaBody="Tell us how you sell and where deals go cold. If a ready made CRM would do the job, we will say so."
    />
  )
}
