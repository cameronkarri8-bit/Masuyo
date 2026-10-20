/**
 * Work: websites and web apps we have built.
 *
 * Every project is described by what it is and what it does. No project names
 * a client, an owner or a brand, and none claims a result, a figure or a quote
 * that has not been measured and approved.
 *
 * The screenshots come from the real code, rendered with sample data. Every
 * brand, name and personal detail was replaced before capture, and each image
 * was checked by eye before it was added. Files live in public/work/<slug>/.
 *
 * `published: false` means the page exists at its URL for review, but nothing
 * links to it, it is noindex, and the sitemap leaves it out.
 */
import type { BrandIconName } from './brand/icons'
import { WORK_ITEMS } from './work-items'

export type WorkKind = 'website' | 'web-app'

export interface WorkImage {
  src: string
  alt: string
  device: 'desktop' | 'phone'
  width: number
  height: number
  caption?: string
}

export interface WorkItem {
  slug: string
  name: string
  kind: WorkKind
  /** One sentence: what it is. */
  line: string
  tags: string[]
  published: boolean
  /** A short phrase for the at a glance row. */
  glance: string
  /** A short phrase for the at a glance row, from the real stack. */
  builtWith: string
  /** One or two neutral sentences on the problem it solves. */
  problem: string
  features: { icon: BrandIconName; title: string; body: string }[]
  underTheHood: string
  images: WorkImage[]
  /**
   * How the project is shown. 'desktop' (the default) leads with a desktop
   * screen. 'phone' is for an app: it is shown only on phone screens.
   */
  display?: 'desktop' | 'phone'
}

/** In display order: the first three published appear on the homepage. */
export const WORK: WorkItem[] = WORK_ITEMS

export const publishedWork = () => WORK.filter(w => w.published)
export const getWork = (slug: string) => WORK.find(w => w.slug === slug)

/** The first three phone screens, for an app's card and hero. */
export const appScreens = (item: WorkItem) => item.images.filter(i => i.device === 'phone').slice(0, 3)

/** The first desktop and first phone screen, for cards and the hero. */
export function leadImages(item: WorkItem): { desktop?: WorkImage; phone?: WorkImage } {
  return {
    desktop: item.images.find(i => i.device === 'desktop'),
    phone: item.images.find(i => i.device === 'phone'),
  }
}
