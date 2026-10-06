/**
 * The four sector pages: one structure, different words.
 *
 * Trades is written out in full in the copy spec. For the other three the spec
 * gives the heading and the six lifecycle stages; every other line here is
 * built from capabilities the site already describes (bookings, supplier
 * stock feeds, reminders, portals, invoicing), with no prices, figures or
 * client claims. Those three are flagged in the redesign report for review.
 *
 * Every answer in `questions` restates something another page already says,
 * so the pages make no promise the rest of the site does not.
 */
import type { BrandIconName } from '@/lib/brand/icons'
import type { PhoneFormKind } from '@/components/diagrams/PhoneForm'
import { TIMELINES } from '@/lib/pricing'

export interface Sector {
  path: string
  metaTitle: string
  metaDescription: string
  eyebrow: string
  h1: string
  body: string
  phone: PhoneFormKind
  problems: string[]
  lifecycleTitle: string
  lifecycle: { icon: BrandIconName; title: string; body: string }[]
  buildTitle: string
  build: { icon: BrandIconName; title: string }[]
  who: string[]
  questions: { question: string; answer: string }[]
}

const CONNECT_ANSWER = "Not necessarily. We can connect to what you use, or replace the parts that don't fit and keep the rest."

export const SECTORS: Record<string, Sector> = {
  trades: {
    path: '/trades',
    metaTitle: 'Websites and job systems for trades businesses | Masuyo',
    metaDescription:
      'Websites, quote forms and job systems for electricians, plumbers, heating engineers and other trades. Less admin, faster quotes, more booked work.',
    eyebrow: 'For trades and field services',
    h1: 'Less time on admin. More time on the tools.',
    body: "Websites and job systems for trades businesses. Quote requests that arrive with the details you need, jobs that schedule themselves, and customers who always know when you're coming.",
    phone: 'quote',
    problems: [
      'Quotes written up on the van dashboard.',
      'Jobs juggled across WhatsApp, texts and a paper diary.',
      'Invoices chased on a Sunday night.',
    ],
    lifecycleTitle: 'How a job could run.',
    lifecycle: [
      { icon: 'enquiries', title: 'Enquiry', body: 'A form collects the job type, postcode and photos.' },
      { icon: 'document', title: 'Quote', body: 'A tidy quote goes out the same day from a template.' },
      { icon: 'bookings', title: 'Booked', body: 'The customer accepts online and the job lands in your diary.' },
      { icon: 'speed', title: 'On the way', body: 'The customer gets an automatic "on our way" message.' },
      { icon: 'document', title: 'Invoiced', body: 'The invoice goes out when the job is marked done.' },
      { icon: 'support', title: 'Review', body: 'A review request follows a few days later.' },
    ],
    buildTitle: 'What we build for trades.',
    build: [
      { icon: 'seo', title: 'A website that wins local searches' },
      { icon: 'enquiries', title: 'Quote request forms with photo upload' },
      { icon: 'crm', title: 'A job and customer system' },
      { icon: 'web-apps', title: 'Automatic customer messages' },
    ],
    who: ['Electricians', 'Plumbers', 'Heating engineers', 'Roofers', 'Pest control', 'Landscapers'],
    questions: [
      { question: 'Will it work with my accounting software?', answer: CONNECT_ANSWER },
      {
        question: 'Can customers send photos with a quote request?',
        answer: 'Yes. Quote request forms can take photos, so the details you need arrive with the enquiry and you can price the job first time.',
      },
      {
        question: 'How long until it is live?',
        answer: `Most websites go live in ${TIMELINES.websiteLive}, depending on size and how quickly the words and photos are ready.`,
      },
    ],
  },

  'repair-and-retail': {
    path: '/repair-and-retail',
    metaTitle: 'Websites and systems for repair and retail businesses | Masuyo',
    metaDescription:
      'Websites, online repair bookings, live supplier stock and customer systems for repair shops and retailers. Fewer phone calls and a shop that stays current.',
    eyebrow: 'For repair and retail',
    h1: 'Stock, bookings and customers in one place.',
    body: "Websites and systems for repair shops and retailers. Repairs booked online, a shop kept current by your supplier's feed, and customers who can see where their order or repair has got to.",
    phone: 'repair',
    problems: [
      'Repairs booked by phone and written on a pad.',
      'A shop that shows stock you no longer have.',
      'Customers ringing to ask where their repair has got to.',
    ],
    lifecycleTitle: 'How an order or a repair could run.',
    lifecycle: [
      { icon: 'websites', title: 'Browse or book', body: 'They find the product or the repair they need and book a slot online.' },
      { icon: 'shop', title: 'Order or drop off', body: 'Orders arrive with the details sorted, and repairs arrive already booked in.' },
      { icon: 'crm', title: 'Tracked', body: 'Every order and repair has a status, in one system.' },
      { icon: 'enquiries', title: 'Updated', body: 'The customer gets a message when the status changes.' },
      { icon: 'bookings', title: 'Collected', body: 'Collection or delivery is confirmed and the record is closed.' },
      { icon: 'support', title: 'Review', body: 'A review request follows a few days later.' },
    ],
    buildTitle: 'What we build for repair and retail.',
    build: [
      { icon: 'shop', title: 'A shop fed by your supplier' },
      { icon: 'bookings', title: 'Online repair bookings' },
      { icon: 'crm', title: 'A customer and repair system' },
      { icon: 'enquiries', title: 'Automatic customer updates' },
    ],
    who: ['Computer and phone repair', 'Garages', 'Bike shops', 'Independent retailers', 'Online shops'],
    questions: [
      {
        question: 'Can the shop show live stock from my supplier?',
        answer: "Yes. Products, stock levels and prices can come from your supplier's feed, so the shop stays current without manual updates.",
      },
      {
        question: 'Can customers book a repair online?',
        answer: 'Yes. Customers pick a repair type and a time online, and it arrives ready to work on.',
      },
      { question: 'We already use HubSpot, Xero or similar. Do we start again?', answer: CONNECT_ANSWER },
    ],
  },

  clinics: {
    path: '/clinics',
    metaTitle: 'Websites and booking systems for clinics | Masuyo',
    metaDescription:
      'Websites, online booking, reminders and follow ups for clinics and appointment based businesses. Fewer phone calls and fuller diaries.',
    eyebrow: 'For clinics and appointments',
    h1: 'Fewer phone calls. Fuller diaries.',
    body: 'Websites and booking systems for clinics and appointment based businesses. Clients book online, reminders go out on their own, and follow ups never depend on someone remembering.',
    phone: 'appointment',
    problems: [
      "The phone rings while you're with a client.",
      'Appointments kept in a diary only one person can read.',
      'Rebooking left to chance once they walk out of the door.',
    ],
    lifecycleTitle: 'How an appointment could run.',
    lifecycle: [
      { icon: 'seo', title: 'Find', body: 'They search for a clinic nearby and find a page that answers their question.' },
      { icon: 'bookings', title: 'Book online', body: 'They choose a treatment and a time, and it lands in your diary.' },
      { icon: 'enquiries', title: 'Reminder', body: 'A reminder goes out before the appointment, without anyone sending it.' },
      { icon: 'support', title: 'Visit', body: 'Their notes and history are in one place when they arrive.' },
      { icon: 'enquiries', title: 'Follow up', body: 'A follow up message goes out after the visit.' },
      { icon: 'bookings', title: 'Rebook', body: 'They rebook online when it suits them.' },
    ],
    buildTitle: 'What we build for clinics.',
    build: [
      { icon: 'seo', title: 'A website that wins local searches' },
      { icon: 'bookings', title: 'Online booking' },
      { icon: 'enquiries', title: 'Automatic reminders and follow ups' },
      { icon: 'crm', title: 'A client and appointment system' },
    ],
    who: ['Physiotherapy', 'Osteopathy', 'Chiropractic', 'Beauty and wellbeing', 'Therapy and counselling', 'Personal training'],
    questions: [
      {
        question: 'Can clients book and rebook online?',
        answer: 'Yes. Clients choose a service and a time, and it lands in your calendar.',
      },
      {
        question: 'Do reminders go out automatically?',
        answer: 'Yes. Reminders go out without anyone remembering to send them.',
      },
      {
        question: 'How is client information kept secure?',
        answer: 'Data is stored securely and backed up daily, each person sees only what they need, and everything is built with UK GDPR in mind from the first day.',
      },
    ],
  },

  'professional-services': {
    path: '/professional-services',
    metaTitle: 'Websites and client systems for professional services | Masuyo',
    metaDescription:
      'Websites, client onboarding, portals and invoicing for accountants, solicitors, consultants and other professional services firms. Less admin, more time with clients.',
    eyebrow: 'For professional services',
    h1: 'Spend less time on admin and more on clients.',
    body: 'Websites and client systems for professional services firms. Enquiries that arrive with what you need, onboarding that runs itself, and a portal where clients see progress, documents and invoices.',
    phone: 'onboarding',
    problems: [
      'Onboarding done by email, one attachment at a time.',
      'Documents chased, saved and lost in different places.',
      'Clients emailing to ask where things are up to.',
    ],
    lifecycleTitle: 'How a client could run.',
    lifecycle: [
      { icon: 'enquiries', title: 'Enquiry', body: 'A form collects what you need to qualify the enquiry.' },
      { icon: 'web-apps', title: 'Onboarding', body: 'Details and agreements are gathered in one place.' },
      { icon: 'document', title: 'Documents', body: 'Clients upload documents to a private portal, not an inbox.' },
      { icon: 'growth', title: 'Progress', body: 'Clients see where their work is up to without calling.' },
      { icon: 'document', title: 'Invoice', body: 'The invoice goes out when the work is done, and they can pay online.' },
      { icon: 'bookings', title: 'Renewal', body: 'A reminder goes out before the next renewal is due.' },
    ],
    buildTitle: 'What we build for professional services.',
    build: [
      { icon: 'websites', title: 'A website that explains what you do' },
      { icon: 'enquiries', title: 'Enquiry and onboarding forms' },
      { icon: 'web-apps', title: 'A client portal' },
      { icon: 'document', title: 'Automatic reminders and invoices' },
    ],
    who: ['Accountants', 'Solicitors', 'Financial advisers', 'Consultants', 'Estate and letting agents', 'Architects'],
    questions: [
      {
        question: 'Can clients see progress and documents in one place?',
        answer: 'Yes. A private login where your clients see progress, documents and invoices, and pay online.',
      },
      { question: 'Will it work with the tools we already use?', answer: CONNECT_ANSWER },
      { question: 'Who owns it?', answer: 'You do: the code, the data and the accounts.' },
    ],
  },
}
