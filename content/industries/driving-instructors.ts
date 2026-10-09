import type { IndustryEntry } from '@/lib/industries/types'

/**
 * Driving instructors.
 *
 * Copy is Section B of the brief, word for word. [n] markers cite the sources
 * below (Section A of the brief); they render as small links, and every
 * source is listed at the foot of the page. Sources 2 and 3 are the same
 * page; both are kept so the numbers in the copy line up.
 *
 * Prices are never typed here: the Pricing section renders the shared price
 * cards from lib/pricing.ts. The figures in the copy are source statistics,
 * not Masuyo prices.
 */
const drivingInstructors: IndustryEntry = {
  status: 'published',
  slug: 'driving-instructors',
  titleTag: `Websites for driving instructors and schools | Masuyo`,
  metaDescription: `Fixed price websites for driving instructors and schools. Prices, areas and spaces on show, enquiries straight to your phone, and looked after once live.`,
  label: `Driving instructors and schools`,
  breadcrumb: `Driving instructors`,
  h1: `Websites for driving instructors that fill the diary.`,
  subline: `Fixed price websites for independent instructors and multi-car schools. Your prices, areas and spaces on show, enquiries straight to your phone, and looked after once it's live.`,
  author: 'Cameron Karri',
  updatedDate: '2026-10-09',
  answerBlock: {
    heading: `What should a driving instructor website do in 2026?`,
    paragraphs: [
      `Turn a learner's search into an enquiry you can act on. That means prices and areas on show, manual or automatic clearly marked, the spaces you have this month, real reviews, and a short form that tells you the pupil's postcode and availability before you call back. It has to work on a phone, because that's where learners and parents search.`,
    ],
  },
  sections: [
    {
      heading: `The full diary era is ending.`,
      paragraphs: [
        `For four years the test backlog filled diaries without any marketing. That's changing. The median wait for a practical test fell from 22 weeks in September 2025 to 9.7 weeks in May 2026 [1], and 45.4% of instructors now have space for new pupils, up 8.8 points in a year [1].`,
        `Faster tests mean pupils pass sooner and leave sooner. The instructors who are easy to find online fill those gaps first. At 30 to 45 hours of lessons, one new pupil is worth £1,000 to £1,800 [1], so the maths on a proper website is simple.`,
      ],
    },
    {
      heading: `What we build.`,
      paragraphs: [],
      bulletGroups: [
        {
          subheading: `For independent instructors`,
          items: [
            `Your prices, lesson packages and block booking discounts`,
            `A page for each main town you cover, so you show up in local searches`,
            `Manual, automatic or both, clearly marked`,
            `"Spaces this month" you can update from your phone in seconds`,
            `An enquiry form that asks for postcode, transmission, availability and whether they've passed their theory`,
            `Google Business Profile set up for your service area, no premises needed`,
            `Review requests sent automatically after a pass`,
          ],
        },
        {
          subheading: `For multi-car schools`,
          items: [
            `Everything above, for every instructor`,
            `Enquiries sent to the right instructor by postcode and transmission`,
            `A waiting list that follows up on its own, so pupils don't drift to whoever answered first`,
            `A recruitment page for qualified instructors and trainees`,
            `A pupil area for test dates and booking guidance (below)`,
            `One view of every enquiry, who it went to and whether it booked`,
          ],
        },
      ],
    },
    {
      heading: `Keep the diary app you already use.`,
      paragraphs: [
        `We don't replace Total Drive, MyDriveTime or your paper diary. They handle lessons and payments well. Your website does the job before that: getting you found, answering the questions learners ask, and handing you an enquiry worth calling back. If your app has online booking, we link straight to it.`,
      ],
    },
    {
      heading: `Your pupils book their own tests now.`,
      paragraphs: [
        `Since 12 May 2026, only the learner can book, change or cancel a car driving test, and instructors can no longer see test availability [2]. Learners get two changes per booking, and since 9 June 2026 can only move a test to one of the three nearest centres [2].`,
        `That leaves you responsible for timing without the controls. A pupil area on your site can explain the rules once, so you're not repeating them every lesson. It can hold a simple "ready to book" checklist, remind pupils to add your instructor reference number when they book so the system checks your availability [3], and let them send you their test date so you can keep the car free.`,
      ],
    },
    {
      heading: `Getting found in your area.`,
      paragraphs: [
        `Most learners search "driving lessons near me" or "driving instructor" plus their town. Showing up comes down to three things: a complete Google Business Profile set up for your service area, a steady flow of reviews, and a site with a clear page for each town you cover.`,
        `Car-based instructors can register as a service-area business without premises, and most haven't [1]. We also make sure your entry on the DVSA's find a driving instructor service links to your site, where learners compare prices and cars [4]. If you want paid ads on top, driving school clicks typically cost £0.70 to £2.50 [5], so it pays to send them to a page that converts.`,
      ],
    },
    {
      heading: `How it works.`,
      paragraphs: [],
      steps: [
        {
          title: `Measured.`,
          body: `A 30 minute call about where you teach, how many cars you run and where your pupils come from. You get a fixed price before we start.`,
        },
        {
          title: `Built.`,
          body: `A site built around how you teach. You check it on your phone before it goes live, and we agree the launch date up front.`,
        },
        {
          title: `Looked after.`,
          body: `Hosting, updates, small content changes and monthly checks on forms and speed. Text us a price change, we make it.`,
        },
      ],
    },
    {
      heading: `Pricing.`,
      paragraphs: [],
      pricing: ['websites', 'systems', 'care'],
    },
  ],
  faqHeading: `Questions instructors ask.`,
  faqs: [
    {
      question: `How much does a website for a driving instructor cost?`,
      answer: `Our prices are fixed and published above. Template builders aimed at instructors start at around £350 plus a monthly fee [6]. The difference is a site built around your areas, your availability and your enquiries.`,
    },
    {
      question: `Do I need a website if I'm on the DVSA's find an instructor list?`,
      answer: `Yes, if you want to stand out on it. The DVSA listing lets you link to your website, and learners use that link to check your prices, car and reviews before they get in touch [4].`,
    },
    {
      question: `Can pupils book lessons online?`,
      answer: `Yes. If your diary app has online booking, we link straight to it. If not, we add a booking request form that comes straight to your phone.`,
    },
    {
      question: `Will it work with Total Drive or MyDriveTime?`,
      answer: `It sits alongside them. Your app keeps running lessons and payments; your site brings in the enquiries.`,
    },
    {
      question: `Do I need premises for a Google Business Profile?`,
      answer: `No. Instructors can set up a service-area business, which shows the areas you cover instead of an address.`,
    },
    {
      question: `What do the 2026 test booking rules mean for my website?`,
      answer: `Pupils now book and manage their own tests [2]. A short guide and a test date form on your site saves you explaining it on every lesson and keeps your diary clear for test days.`,
    },
    {
      question: `Do you work with franchise instructors?`,
      answer: `If your franchise controls your website, probably not. We build for independent instructors and independent multi-car schools.`,
    },
    {
      question: `Can you help with marketing beyond the website?`,
      answer: `Yes. Google Business Profile, town pages, review requests and local SEO are part of how we build. Ongoing support covers changes month to month.`,
    },
  ],
  closing: {
    heading: `Gaps in the diary?`,
    body: `Tell us where you teach and how many cars you run. We'll come back with a fixed price.`,
  },
  sources: [
    {
      n: 1,
      title: 'UK driving school marketing data',
      publisher: 'Whito',
      url: 'https://whito.co.uk/driving-schools/guides/uk-driving-school-marketing-data/',
    },
    {
      n: 2,
      title: 'Changes to the driving test booking rules: our webinar and Q&A recap',
      publisher: 'DVSA',
      url: 'https://despatch.blog.gov.uk/2026/05/11/changes-to-the-driving-test-booking-rules-our-webinar-and-qa-recap/',
    },
    {
      n: 3,
      title: 'Changes to the driving test booking rules: our webinar and Q&A recap',
      publisher: 'DVSA',
      url: 'https://despatch.blog.gov.uk/2026/05/11/changes-to-the-driving-test-booking-rules-our-webinar-and-qa-recap/',
    },
    {
      n: 4,
      title: 'Improving the find your nearest driving instructor service',
      publisher: 'DVSA',
      url: 'https://despatch.blog.gov.uk/2017/07/13/improving-the-find-your-nearest-driving-instructor-service/',
    },
    {
      n: 5,
      title: 'UK driving school marketing costs',
      publisher: 'Whito',
      url: 'https://whito.co.uk/driving-schools/guides/uk-driving-school-marketing-costs/',
    },
    {
      n: 6,
      title: 'DIA web builder',
      publisher: 'Driving Instructors Association',
      url: 'https://shop.driving.org/products/dia-web-builder',
    },
  ],
  relatedResources: [],
  siblingIndustries: [],
  illustration: {
    key: 'dual-control-car',
    alt: 'A line drawing of a driving school car with an L plate and a roof sign, parked beside a phone showing lesson slots under the heading Spaces this month, with one slot open.',
  },
}

export default drivingInstructors
