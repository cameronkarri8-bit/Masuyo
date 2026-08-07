import type { Metadata } from 'next'
import OfferPage from '@/components/OfferPage'
import ClientPortalMockup from '@/components/placeholder/ClientPortalMockup'

export const metadata: Metadata = {
  title: 'Custom Client Portal Development UK | Masuyo Digital',
  description: 'Give your clients a premium branded space to access work, files, and project updates. A fully custom client portal built for your business.',
  openGraph: {
    title: 'Custom Client Portal Development UK | Masuyo Digital',
    description: 'Give your clients a premium branded space to access work, files, and project updates.',
    url: 'https://masuyodigital.com/products/client-portal',
  },
  alternates: { canonical: 'https://masuyodigital.com/products/client-portal' },
}

export default function ClientPortalPage() {
  return (
    <OfferPage
      eyebrow="Client portal"
      title="Stop answering the same question by email."
      lead="A private, branded space where your clients can see their own documents, invoices and progress without having to ask you where things stand."
      startingPrice="From £2,200"
      priceNote="One-off build on your own domain. Hosting from £40 a month. No per client fees, ever."
      mockup={<ClientPortalMockup />}
      problem={[
        'Client updates get scattered across email threads, shared drives and the occasional phone call. When somebody asks where their project is up to, finding the answer takes longer than giving it.',
        'The workarounds are worse than the problem. A shared folder has no structure and no permissions worth the name. A group chat loses everything within a fortnight. A generic project tool makes your clients create an account on somebody else’s platform and looks nothing like your business.',
        'A portal gives each client one place with their own documents, their own updates and their own invoices, on your domain, with access that only shows them what belongs to them.',
      ]}
      included={[
        {
          title: 'Branded client login',
          body: 'Your domain, your colours, your logo. It reads as part of your business rather than a tool you have bolted on.',
        },
        {
          title: 'Project and task visibility',
          body: 'Clients see exactly where their work stands, with the stages and language you actually use, not a generic kanban board.',
        },
        {
          title: 'Secure file sharing',
          body: 'Upload and download of deliverables, contracts and assets, with access controlled per client rather than per link.',
        },
        {
          title: 'Invoices and payments',
          body: 'Raise invoices and take card payments inside the portal, into your own payment account.',
        },
        {
          title: 'Messaging tied to the work',
          body: 'Conversation attached to the relevant project, so context is not scattered across three inboxes.',
        },
        {
          title: 'Admin dashboard',
          body: 'Every client, project and piece of activity from one control panel, with a clear view of what needs your attention.',
        },
        {
          title: 'Access control per client',
          body: 'A client sees their own records and nothing else. Staff roles are set separately with their own permissions.',
        },
        {
          title: 'Email notifications',
          body: 'Clients are told when something changes, so the portal does not depend on them remembering to log in.',
        },
        {
          title: 'Documentation and handover',
          body: 'Written instructions and a walkthrough, so onboarding a new client to the portal is a two minute job.',
        },
      ]}
      process={[
        {
          title: 'Map how you work with clients now',
          body: 'What you send them, what they ask for, and where the friction is. The portal is built around that rather than a generic template.',
          timing: 'Week 1',
        },
        {
          title: 'Screens and permissions agreed',
          body: 'What a client sees, what your staff see, and what happens at each stage of a project. Signed off before the build starts.',
          timing: 'Week 2',
        },
        {
          title: 'Build',
          body: 'Login, projects, files, invoicing and the admin side, built and reviewed in stages so you see it working early.',
          timing: '4 to 8 weeks',
        },
        {
          title: 'Launch and onboard',
          body: 'We migrate your existing client list, test with a small group first, then open it to everybody once it is behaving.',
          timing: '1 to 2 weeks',
        },
      ]}
      cost={[
        {
          label: 'Client portal build',
          price: 'from £2,200',
          detail: 'Branded login, project visibility, file sharing, messaging and the admin dashboard.',
        },
        {
          label: 'Payment gateway',
          price: '+£200',
          detail: 'Card and digital wallet payments taken inside the portal, into your own account.',
        },
        {
          label: 'CRM integration',
          price: '+£400',
          detail: 'Client and project data flowing between the portal and the CRM you already use.',
        },
        {
          label: 'API integration',
          price: '+£800',
          detail: 'Connecting the portal to accounting, storage or any other system you run on.',
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
        'How many user roles the portal needs beyond client and admin',
        'Whether payments and invoicing are part of it or handled elsewhere',
        'What it needs to connect to, and how good those systems’ APIs are',
        'Whether existing client records and files have to be migrated in',
        'How much of your process is standard and how much is genuinely unusual',
      ]}
      notIncluded={[
        'Payment processor fees. Card fees go to your provider and are not ours to include',
        'Your clients’ training. We document it and it is designed to be obvious, but onboarding them is your relationship',
        'A public marketing website. The portal is the logged in side. A site is a separate build from £249',
        'Ongoing feature development after launch, unless you take a retainer',
        'Data cleansing. We will import your client list, but we will not fix bad records for you',
        'Native mobile apps. The portal works on a phone browser. A native app is a separate build from £2,500',
      ]}
      faqs={[
        {
          q: 'Why not just use an off the shelf portal for £30 a month?',
          a: 'If one fits, use it, and we will tell you so. They stop making sense when the per client or per seat fee grows with you, when your process does not match theirs, or when you do not want your clients logging into somebody else’s branded product. Do the arithmetic on three years before you decide.',
        },
        {
          q: 'What does it cost to run once it is built?',
          a: 'Hosting from £40 a month, and that is it. There are no per client fees and no per seat licences, so adding your hundredth client costs the same as adding your tenth. Changes you ask for later are quoted individually.',
        },
        {
          q: 'Will my clients actually use it?',
          a: 'They use it when it is less effort than emailing you, which is why notifications and a genuinely simple login matter more than the feature list. The honest answer is that some clients will always prefer email, and the portal should reduce your admin rather than eliminate it.',
        },
        {
          q: 'Is my clients’ data secure?',
          a: 'Access is controlled per client, so nobody can reach records that are not theirs. Traffic is encrypted, the stack is patched, and backups are taken daily and stored off the server. We will also document what data is held and where, which you will need for your own GDPR obligations.',
        },
      ]}
      ctaHeadline="Ready to give your clients a better experience?"
      ctaBody="Tell us how you work and what your clients keep asking for. We will tell you what a portal would need to do, and what it would cost."
    />
  )
}
