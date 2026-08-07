import type { Metadata } from 'next'
import OfferPage from '@/components/OfferPage'
import { SERVICE_IMAGES } from '@/lib/images'

export const metadata: Metadata = {
  title: 'Web Application Development UK | Masuyo Digital',
  description: 'Custom web applications, client portals, and browser-based tools built for complex business needs.',
  openGraph: {
    title: 'Web Application Development UK | Masuyo Digital',
    description: 'Custom web applications, client portals, and browser-based tools built for complex business needs.',
    url: 'https://masuyodigital.com/technology/web-applications',
  },
  alternates: { canonical: 'https://masuyodigital.com/technology/web-applications' },
}

export default function WebApplicationsPage() {
  return (
    <OfferPage
      eyebrow="Web apps and software"
      title="Software built around how you actually work."
      lead="Portals, dashboards, booking systems and internal tools, built for the job your business does rather than the job a generic product assumes you do."
      startingPrice="From £3,500"
      priceNote="One-off build. Hosting and support from £40 a month."
      heroImage={SERVICE_IMAGES.software}
      problem={[
        'Off the shelf software rarely fits exactly. You pay a monthly licence for features you will never touch, the one thing you actually need is missing, and the gap gets filled with a spreadsheet somebody maintains by hand.',
        'That works until it does not. Data gets entered twice, the spreadsheet lives on one laptop, and nobody is certain which version is current. The workaround quietly becomes the process.',
        'A custom application replaces the workaround. It does the specific thing your business does, it holds your data in one place, and the monthly cost is hosting rather than a per seat licence that grows every time you hire.',
      ]}
      included={[
        {
          title: 'Scoping before building',
          body: 'We map what the system has to do, who uses it and where the edge cases are, and write it down before anybody opens an editor.',
        },
        {
          title: 'Secure authentication',
          body: 'Proper login, password reset, session handling and optional two factor. Not a shared password in a group chat.',
        },
        {
          title: 'Role based access control',
          body: 'Admins, staff and customers each see only what they should. Permissions are set per role rather than per person.',
        },
        {
          title: 'Custom dashboards and reporting',
          body: 'The numbers you actually run the business on, on one screen, rather than exported and pivoted every Monday.',
        },
        {
          title: 'Workflow and data management',
          body: 'Records, statuses, approvals and audit trails modelled on your real process, including the awkward parts.',
        },
        {
          title: 'Integrations with what you already use',
          body: 'Accounting, CRM, email, payments and anything else with an API, connected so data moves without a person copying it.',
        },
        {
          title: 'Built on Next.js and React',
          body: 'Mainstream, well documented technology. Any competent developer can pick it up, which matters if we ever part ways.',
        },
        {
          title: 'Responsive interface',
          body: 'Usable on a laptop at a desk and on a phone in a van, because internal tools get used in both places.',
        },
        {
          title: 'Documentation and handover',
          body: 'Written documentation of how it works and how to run it, plus a walkthrough with the people who will use it.',
        },
      ]}
      process={[
        {
          title: 'Discovery and scope',
          body: 'We work through what the system does, who touches it and what it connects to. You get a written scope and a fixed price before anything is committed to.',
          timing: '1 to 2 weeks',
        },
        {
          title: 'Architecture and screens',
          body: 'Data model, permissions and the main screens, agreed with you. Changing the shape of the thing here costs nothing. Changing it later costs a lot.',
          timing: '1 to 2 weeks',
        },
        {
          title: 'Build in stages',
          body: 'The core comes first and you get access to it early, so you are reacting to a working system rather than a document.',
          timing: '4 to 12 weeks',
        },
        {
          title: 'Testing, launch and handover',
          body: 'We test properly, migrate your existing data where there is any, train the people who will use it, and hand over the documentation.',
          timing: '1 to 2 weeks',
        },
      ]}
      cost={[
        {
          label: 'Web application',
          price: 'from £3,500',
          detail: 'A browser based application with user accounts, custom functionality and data management.',
        },
        {
          label: 'Custom CRM or business system',
          price: 'from £3,000',
          detail: 'An internal platform built around your workflows, replacing spreadsheets and disconnected tools.',
        },
        {
          label: 'Client portal or member area',
          price: 'from £2,200',
          detail: 'A private branded space for clients or members, with content, access control and messaging.',
        },
        {
          label: 'API development or integration',
          price: '+£800',
          detail: 'A custom API build, or a connection to a third party platform you already run on.',
        },
        {
          label: 'Payment gateway',
          price: '+£200',
          detail: 'Card and digital wallet payments processed inside the application, into your own account.',
        },
        {
          label: 'Hosting and support',
          price: 'from £40 per month',
          detail: 'Managed hosting on our own infrastructure with monitoring, backups, updates and support.',
        },
      ]}
      costDrivers={[
        'How many distinct user roles the system needs, and how different their views are',
        'How many third party tools we need to connect, and how good their APIs are',
        'Whether existing data has to be migrated, and what state it is currently in',
        'Complexity of the workflow rules, particularly approvals and exceptions',
        'How tight the deadline is. An accelerated build carries a premium',
      ]}
      notIncluded={[
        'Native iOS and Android apps. Those are a separate build from £2,500',
        'Third party subscription costs, such as payment processor fees or licences for tools you connect to',
        'Data cleansing. We will migrate what you have, but we do not fix bad records for you',
        'Ongoing feature development after launch, unless you take a retainer',
        'Formal penetration testing and certification, which we can arrange with a specialist and bill on',
        'Hosting, unless you take a plan. The application will run on your own infrastructure if you prefer',
      ]}
      faqs={[
        {
          q: 'Why is it £3,500 when an off the shelf tool is £40 a month?',
          a: 'Because they are different things. If a ready made tool does the job, use it, and we will tell you so rather than take the work. Custom is worth it when the tool does not fit, when per seat licences are climbing as you grow, or when the workaround is costing somebody several hours a week.',
        },
        {
          q: 'What happens if you disappear halfway through?',
          a: 'The code is in your repository from the first commit, not ours. It is built on Next.js and React, which are mainstream and well documented, so another developer can pick it up. We also write the documentation as we go rather than at the end.',
        },
        {
          q: 'Can it connect to the systems we already use?',
          a: 'Usually. If the tool has an API, we can connect to it. If it does not, there is often a workaround, and occasionally there is not. We check this during scoping rather than discovering it halfway through the build.',
        },
        {
          q: 'What does it cost to run once it is live?',
          a: 'Hosting from £40 a month covers the server, backups, monitoring and updates. Beyond that, you only pay for changes you ask for. There are no per user fees, so adding staff does not increase what you pay.',
        },
      ]}
      ctaHeadline="Have a complex problem to solve?"
      ctaBody="Tell us what the system needs to do. If a ready made tool would do it better, we will say so."
    />
  )
}
