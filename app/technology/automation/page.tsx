import type { Metadata } from 'next'
import OfferPage from '@/components/OfferPage'

export const metadata: Metadata = {
  title: 'Workflow Automation Services UK | Masuyo Digital',
  description: 'Business workflow automation for UK companies. Remove manual tasks, connect your tools, and let your systems do the work.',
  openGraph: {
    title: 'Workflow Automation Services UK | Masuyo Digital',
    description: 'Business workflow automation for UK companies. Remove manual tasks, connect your tools, and let your systems do the work.',
    url: 'https://masuyodigital.com/technology/automation',
  },
  alternates: { canonical: 'https://masuyodigital.com/technology/automation' },
}

export default function AutomationPage() {
  return (
    <OfferPage
      eyebrow="Automation and AI"
      title="Get the admin off your desk."
      lead="We find the repetitive work that eats your week and build the automations that do it instead, connecting the tools you already pay for."
      startingPrice="From £800"
      priceNote="One-off automation build. Managed retainer from £599 a month if you want it looked after."
      problem={[
        'Most businesses run on a patchwork of tools that do not talk to each other. Something is entered in one place, then typed again into another. Follow ups depend on somebody remembering. Reports get built by hand every month.',
        'None of that work is difficult, which is exactly why it is expensive. It is hours of attention spent on tasks that follow a completely predictable pattern, and it is the first thing to slip when you get busy.',
        'Automation is worth doing when a process happens often, follows the same steps every time, and currently depends on a person not forgetting. Not everything meets that bar, and we will tell you when it does not.',
      ]}
      included={[
        {
          title: 'Process mapping and audit',
          body: 'We work through how the job actually happens now, step by step, including the bits nobody has written down.',
        },
        {
          title: 'An honest recommendation',
          body: 'Which processes are worth automating, which are not, and roughly what each one gives you back in hours per month.',
        },
        {
          title: 'Lead capture into your CRM',
          body: 'Enquiries land in the right place with the right tags, without anyone rekeying a form submission.',
        },
        {
          title: 'Document and proposal generation',
          body: 'Quotes, contracts and proposals built from your templates and populated from your data automatically.',
        },
        {
          title: 'Invoice and payment workflows',
          body: 'Invoices raised, sent, chased and reconciled, with reminders that go out whether or not you remembered.',
        },
        {
          title: 'Onboarding sequences',
          body: 'A structured journey that takes a new client or customer from sign up to active without manual chasing.',
        },
        {
          title: 'Approvals and internal sign off',
          body: 'Requests routed to the right person, with a record of who approved what and when.',
        },
        {
          title: 'Built on Zapier, Make or custom code',
          body: 'Whichever is right for the job. Simple links use tools you can maintain yourself. Complex logic gets a proper webhook.',
        },
        {
          title: 'Testing, documentation and training',
          body: 'Each automation is tested against real cases, documented, and walked through with the people who depend on it.',
        },
      ]}
      process={[
        {
          title: 'Audit what happens now',
          body: 'We map your current processes and count the manual steps. This is the part that decides whether the rest is worth doing.',
          timing: '3 to 5 days',
        },
        {
          title: 'Agree what gets automated',
          body: 'You get a prioritised list with the effort and the saving against each item, and you pick. We do not automate things for the sake of it.',
          timing: '2 to 3 days',
        },
        {
          title: 'Build and test',
          body: 'Automations are built one at a time and tested against real data, including the awkward cases that break naive rules.',
          timing: '1 to 4 weeks',
        },
        {
          title: 'Hand over and monitor',
          body: 'We document each flow, train whoever needs to know, and watch the first few weeks for anything behaving unexpectedly.',
          timing: 'Ongoing',
        },
      ]}
      cost={[
        {
          label: 'Automation project',
          price: 'from £800',
          detail: 'A targeted build that removes manual steps from a process and connects the tools involved.',
        },
        {
          label: 'AI chatbot or assistant',
          price: 'from £700',
          detail: 'A conversational assistant trained on your content, handling enquiries, support or lead qualification.',
        },
        {
          label: 'CRM integration',
          price: '+£400',
          detail: 'Your site or application connected to your CRM so lead and customer data flows both ways.',
        },
        {
          label: 'Automated onboarding workflows',
          price: '+£350',
          detail: 'A guided journey that takes new customers from sign up to active engagement.',
        },
        {
          label: 'Email, WhatsApp or SMS automation',
          price: '+£300',
          detail: 'Behaviour triggered sequences for confirmations, reminders, follow ups and re-engagement.',
        },
        {
          label: 'Managed automation retainer',
          price: '£599 per month',
          detail: 'Optional. We keep building, optimising and maintaining your automations month on month.',
        },
      ]}
      costDrivers={[
        'How many separate processes you want automated',
        'How many tools we need to connect, and whether they have usable APIs',
        'Whether the process has clean rules or a lot of exceptions and judgement calls',
        'Whether a ready made connector exists, or we need custom webhook development',
        'Whether you want us to maintain it afterwards or hand it over entirely',
      ]}
      notIncluded={[
        'Subscription costs for the platforms involved, such as Zapier, Make, your CRM or your email tool',
        'Fixing processes that are broken rather than manual. Automating a bad process makes it faster, not better',
        'Ongoing monitoring and repairs after handover, unless you take the retainer',
        'Replacing the tools you use. We automate around your stack rather than selling you a new one',
        'Training beyond the handover session, though we will always answer a question',
        'Anything that needs a person to exercise judgement. We will tell you where that line falls',
      ]}
      faqs={[
        {
          q: 'How do I know automation will actually save time?',
          a: 'You do not, until the audit. That is why it comes first and why we put a rough hours per month figure against each process before you commit to building anything. If the numbers do not justify the build, we will say so, and you will have spent the audit fee rather than the project fee.',
        },
        {
          q: 'What happens when a process changes?',
          a: 'Automations need maintenance, and anyone who tells you otherwise is selling. Small tweaks are quick and we quote them individually. If your processes change often, the retainer usually works out cheaper than paying per change.',
        },
        {
          q: 'Will this replace someone on my staff?',
          a: 'That is not usually what happens. What tends to change is that the same people stop spending their afternoons on data entry and chasing, and spend them on work that needs a person. If your goal is headcount reduction, say so up front so we scope the right thing.',
        },
        {
          q: 'Do you use AI, and is that safe with our data?',
          a: 'We use AI where it genuinely helps, such as drafting responses or classifying enquiries, and not where a plain rule would be more reliable. Any AI component is set up so you know what data goes to which provider, and you approve that before it is switched on.',
        },
      ]}
      ctaHeadline="Ready to automate the repetitive stuff?"
      ctaBody="Tell us where the hours are going. We will map the process and tell you honestly whether automating it is worth the money."
    />
  )
}
