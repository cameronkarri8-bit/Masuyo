import type { IndustryEntry } from '@/lib/industries/types'

/**
 * Driving instructors.
 *
 * Awaiting copy: the page copy (Section B of the brief) has not been supplied,
 * and copy is only ever used exactly as supplied. Until it is filled in and
 * status becomes 'published', the page is not built, listed or put in the
 * sitemap.
 *
 * Sources are Section A of the brief. The [n] markers in the copy refer to
 * these numbers. Sources 2 and 3 are the same page; both are kept so the
 * numbers in the copy line up.
 */
const drivingInstructors: IndustryEntry = {
  status: 'awaiting-copy',
  slug: 'driving-instructors',
  author: 'Cameron Karri',
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
