/**
 * Case study content.
 *
 * IMPORTANT: every entry below is a structural placeholder. No client name,
 * metric, result or quote here is real, and none of it should be published as
 * though it were. The shapes are correct so the pages can be designed and
 * reviewed, and each field is marked with a TODO for the real value.
 *
 * When real content arrives, replace the values and delete the `isPlaceholder`
 * flag. The pages read that flag to show a visible notice, so nothing can go
 * live looking like a genuine claim by accident.
 */

export interface CaseStudyResult {
  /** TODO: real figure, supplied and approved by the client. */
  metric: string
  /** TODO: what the figure measures, and over what period. */
  label: string
}

export interface CaseStudyTestimonial {
  /** TODO: real quote, in the client's own words, with written permission. */
  quote: string
  /** TODO: real name. */
  name: string
  /** TODO: real job title. */
  role: string
  /** TODO: real company name. */
  company: string
}

export interface CaseStudyImage {
  /** Shot brief. Becomes the ImagePlaceholder label until the asset exists. */
  label: string
  /** Aspect ratio passed to ImagePlaceholder. */
  aspect: string
}

export interface CaseStudy {
  /** Deliberately generic. A real slug would name a real client. */
  slug: string
  /** TODO: real client name. */
  client: string
  /** TODO: confirm the client's actual sector. */
  industry: string
  /** TODO: confirm which of our services this project actually used. */
  services: string[]
  /** One line for cards and listings. */
  summary: string
  /** TODO: the real problem, in the client's framing. */
  problem: string
  /** TODO: the real scope of work delivered. */
  approach: string[]
  /** TODO: real, measurable, client approved outcomes. */
  results: CaseStudyResult[]
  testimonial: CaseStudyTestimonial
  images: CaseStudyImage[]
  /** Remove once every field above holds real, approved content. */
  isPlaceholder: boolean
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'case-study-one',
    client: 'PLACEHOLDER: client name',
    industry: 'PLACEHOLDER: industry, for example independent retail',
    services: ['Websites', 'Hosting and support'],
    summary:
      'PLACEHOLDER: one line summary of the project, written once the work is signed off.',
    problem:
      'PLACEHOLDER: what was actually going wrong before we started, in the words the client would use. Two or three sentences, specific rather than general.',
    approach: [
      'PLACEHOLDER: the first thing we actually built or changed.',
      'PLACEHOLDER: the second piece of work.',
      'PLACEHOLDER: the third piece of work.',
    ],
    results: [
      { metric: 'TBC', label: 'PLACEHOLDER: metric one, supplied by client' },
      { metric: 'TBC', label: 'PLACEHOLDER: metric two, supplied by client' },
      { metric: 'TBC', label: 'PLACEHOLDER: metric three, supplied by client' },
    ],
    testimonial: {
      quote: 'PLACEHOLDER TESTIMONIAL: replace with a real client quote.',
      name: 'PLACEHOLDER: client name',
      role: 'PLACEHOLDER: role',
      company: 'PLACEHOLDER: company',
    },
    images: [
      { label: 'PLACEHOLDER: case study hero, finished site on desktop and mobile', aspect: '16/9' },
      { label: 'PLACEHOLDER: detail shot, a key page or feature', aspect: '4/3' },
      { label: 'PLACEHOLDER: before and after, or the client using the product', aspect: '4/3' },
    ],
    isPlaceholder: true,
  },
  {
    slug: 'case-study-two',
    client: 'PLACEHOLDER: client name',
    industry: 'PLACEHOLDER: industry, for example professional services',
    services: ['Websites', 'Marketing and SEO'],
    summary:
      'PLACEHOLDER: one line summary of the project, written once the work is signed off.',
    problem:
      'PLACEHOLDER: what was actually going wrong before we started, in the words the client would use. Two or three sentences, specific rather than general.',
    approach: [
      'PLACEHOLDER: the first thing we actually built or changed.',
      'PLACEHOLDER: the second piece of work.',
      'PLACEHOLDER: the third piece of work.',
    ],
    results: [
      { metric: 'TBC', label: 'PLACEHOLDER: metric one, supplied by client' },
      { metric: 'TBC', label: 'PLACEHOLDER: metric two, supplied by client' },
      { metric: 'TBC', label: 'PLACEHOLDER: metric three, supplied by client' },
    ],
    testimonial: {
      quote: 'PLACEHOLDER TESTIMONIAL: replace with a real client quote.',
      name: 'PLACEHOLDER: client name',
      role: 'PLACEHOLDER: role',
      company: 'PLACEHOLDER: company',
    },
    images: [
      { label: 'PLACEHOLDER: case study hero, finished site on desktop and mobile', aspect: '16/9' },
      { label: 'PLACEHOLDER: detail shot, a key page or feature', aspect: '4/3' },
    ],
    isPlaceholder: true,
  },
  {
    slug: 'case-study-three',
    client: 'PLACEHOLDER: client name',
    industry: 'PLACEHOLDER: industry, for example membership organisation',
    services: ['Web apps and software', 'Automation and AI'],
    summary:
      'PLACEHOLDER: one line summary of the project, written once the work is signed off.',
    problem:
      'PLACEHOLDER: what was actually going wrong before we started, in the words the client would use. Two or three sentences, specific rather than general.',
    approach: [
      'PLACEHOLDER: the first thing we actually built or changed.',
      'PLACEHOLDER: the second piece of work.',
      'PLACEHOLDER: the third piece of work.',
    ],
    results: [
      { metric: 'TBC', label: 'PLACEHOLDER: metric one, supplied by client' },
      { metric: 'TBC', label: 'PLACEHOLDER: metric two, supplied by client' },
      { metric: 'TBC', label: 'PLACEHOLDER: metric three, supplied by client' },
    ],
    testimonial: {
      quote: 'PLACEHOLDER TESTIMONIAL: replace with a real client quote.',
      name: 'PLACEHOLDER: client name',
      role: 'PLACEHOLDER: role',
      company: 'PLACEHOLDER: company',
    },
    images: [
      { label: 'PLACEHOLDER: case study hero, the product in use', aspect: '16/9' },
      { label: 'PLACEHOLDER: dashboard or admin view', aspect: '4/3' },
      { label: 'PLACEHOLDER: the team using the system', aspect: '4/3' },
    ],
    isPlaceholder: true,
  },
]

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find(c => c.slug === slug)
}

/** True while any entry is still placeholder content. */
export const HAS_PLACEHOLDER_CASE_STUDIES = CASE_STUDIES.some(c => c.isPlaceholder)
