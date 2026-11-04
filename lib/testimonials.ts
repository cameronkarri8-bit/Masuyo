/**
 * What clients and collaborators say, shown by components/site/Testimonials.
 * Quotes are kept as each person wrote them.
 *
 * Headshots: save a square photo (at least 240 x 240, WebP) in
 * public/people/testimonials/, then set `photo` to its path, for example
 * '/people/testimonials/kerry-stevens.webp'. Until then the card shows the
 * person's initials in the space the photo will fill.
 */

export interface Testimonial {
  name: string
  /** Job title and organisation, as the person gave them. */
  role: string
  quote: string
  /** Path under public/, or null to show initials. */
  photo: string | null
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Kerry Stevens',
    role: 'Founding Director, Beanstalk CIC',
    quote:
      'An absolutely fantastic company to work with! We have been working with Cameron and Masuyo for a couple of years, collaborating on many digital projects. Cameron has a naturally creative ability and charm that gets us the results we never imagined!',
    photo: null,
  },
  {
    name: 'Af Malhotra',
    role: 'Founder and CEO, Growth Enabler',
    quote:
      'Cam has been working with me on various ventures and nonprofit initiatives. He is - without question - a rock solid design master, with a deep sense of purpose and has resilience to learn / unlearn and re-skill himself at an incredible pace. Cam has co-led complex strategic design and product development campaigns for global 50 clients! Serious stuff. He asks the best questions and has the courage to do what most would fear. For these reasons - he will be a core part of my global gig talent team.',
    photo: null,
  },
  {
    name: 'Rick Snyder',
    role: 'CEO and Executive Coach, Invisible Edge',
    quote:
      "Cameron is a top-level designer. It's rare to find talent that knows how a design should look, have the backend skills to make it happen, and also be a great human being to work with. Masuyo is all the above and I highly recommend.",
    photo: null,
  },
]

export const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .map(w => w[0]!.toUpperCase())
    .slice(0, 2)
    .join('')
