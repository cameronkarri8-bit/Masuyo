/**
 * Supplied imagery.
 *
 * Every remote image the site renders is named here so a swap is a one line
 * change rather than a hunt through JSX. The host is allow-listed in
 * next.config.js under images.remotePatterns, so all of these go through
 * next/image and are resized and cached rather than hot-linked.
 *
 * Alt text lives beside each URL for the same reason: the description and the
 * file it describes should never drift apart. British English throughout, no
 * client names, and no claim the picture cannot evidence.
 */

const CLOUDINARY = 'https://res.cloudinary.com/dfzhei0ae/image/upload'

/* --- Homepage hero ---------------------------------------------------------- */

export const HERO_IMAGE = `${CLOUDINARY}/v1786107147/Masuyo_Hero_Image_fpk1uj.png`

/*
  Empty on purpose. The photograph sits behind the headline as a backdrop, and
  the h1 next to it states the message in full, so there is nothing the image
  adds that a screen reader would otherwise miss. An empty alt marks it as
  decorative, which is the correct treatment for that.

  If the photograph turns out to carry information the copy does not, replace
  this with a real description. Do not describe people or imply a team size:
  the whole site is careful not to claim one.
*/
export const HERO_IMAGE_ALT = ''

/**
 * Focal point for the hero on narrow screens.
 *
 * Below 768px the frame is much taller relative to its width, so a centred crop
 * can push the subject out of view. This is the one value in this file that
 * needs a human to look at the photograph and confirm it, because it depends on
 * where the subject actually sits. `50% 50%` is the neutral default and is what
 * ships until somebody checks.
 *
 * TODO: confirm against the real image and adjust the second value. Lower
 * percentages move the visible window towards the top of the photograph.
 */
export const HERO_OBJECT_POSITION_MOBILE = '50% 50%'

/* --- Homepage service tiles and the matching service page heroes ------------- */

export interface ServiceImage {
  src: string
  alt: string
}

/*
  TODO: confirm these four descriptions against the images themselves.

  They are deliberately short and general, naming only the subject each file is
  named for. They were written without sight of the images, so anything more
  specific would be a guess, and alt text that describes the wrong thing is
  worse for a screen reader than alt text that describes little. Each card also
  carries a visible heading, so nothing is lost while these stay general.
*/
export const SERVICE_IMAGES = {
  websites: {
    src: `${CLOUDINARY}/v1786107303/Websites_lgxrpa.png`,
    alt: 'Website design work.',
  },
  marketing: {
    src: `${CLOUDINARY}/v1786107379/Marketing_and_SEO_o2woyd.png`,
    alt: 'Marketing and search optimisation work.',
  },
  software: {
    src: `${CLOUDINARY}/v1786107469/Software_and_Automation_qgns6f.png`,
    alt: 'Custom software and automation work.',
  },
  hosting: {
    src: `${CLOUDINARY}/v1786107566/Hosting_and_support_ge2kuz.png`,
    alt: 'Hosting and support infrastructure.',
  },
} satisfies Record<string, ServiceImage>
