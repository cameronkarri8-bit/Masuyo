import type { ComponentType } from 'react'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import ServiceImage from '@/components/ServiceImage'
import LearningMockup from '@/components/placeholder/LearningMockup'
import { PRODUCT_IMAGES, type ServiceImage as ImageData } from '@/lib/images'

/**
 * The five built products, and the grid that renders them.
 *
 * Lifted out of the homepage so any page can show the same set from one source.
 * These are working products rather than client case studies, which is why they
 * can be shown at all: nothing here is a claim about somebody else's business.
 *
 * Starting prices trace to lib/pricing.ts, except the learning platform, which
 * carries its own published pricing on its product page.
 */

interface ProductCard {
  title: string
  href: string
  body: string
  price: string
  /** Supplied photograph. Where present it is used in place of the mockup. */
  image?: ImageData
  /** Generated artwork, used only where no photograph has been supplied. */
  Mockup?: ComponentType<{ aspect?: string; rounded?: boolean }>
}

export const PRODUCTS: ProductCard[] = [
  {
    title: 'Client portal',
    href: '/products/client-portal',
    body: 'A private, branded space where your clients see their own documents, updates and progress.',
    price: 'From £2,200',
    image: PRODUCT_IMAGES.clientPortal,
  },
  {
    title: 'Community platform',
    href: '/products/community-platform',
    body: 'Members, discussion, gated content and events, on your domain rather than someone else’s.',
    price: 'From £2,200',
    image: PRODUCT_IMAGES.communityPlatform,
  },
  {
    title: 'CRM and lead management',
    href: '/products/crm-lead-management',
    body: 'A system built around your pipeline, not one you have to bend your business to fit.',
    price: 'From £3,000',
    image: PRODUCT_IMAGES.crm,
  },
  {
    // No photograph supplied. Deliberately keeps its own mockup rather than
    // borrowing another product's image, which would show the wrong interface.
    title: 'Learning platform',
    href: '/products/custom-learning-platform',
    body: 'Cohorts, progress tracking, certificates and payments into your own account.',
    price: 'From £3,000',
    Mockup: LearningMockup,
  },
  {
    title: 'Something bespoke',
    href: '/products/bespoke',
    body: 'When nothing off the shelf fits, we build the thing your business actually needs.',
    price: 'From £3,500',
    image: PRODUCT_IMAGES.bespoke,
  },
]

export default function ProductGrid() {
  return (
    <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {PRODUCTS.map((p, i) => (
        <RevealAnimation key={p.href} delay={(i % 3) as 0 | 1 | 2}>
          <Link
            href={p.href}
            className="hover-lift group flex h-full flex-col overflow-hidden rounded-card bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
          >
            {p.image !== undefined ? (
              <ServiceImage
                image={p.image}
                hover
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              />
            ) : p.Mockup !== undefined ? (
              <p.Mockup aspect="16/9" rounded={false} />
            ) : null}
            <div className="flex flex-1 flex-col p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <h3 className="text-2xl text-navy">{p.title}</h3>
                <span className="whitespace-nowrap font-sans text-xs font-semibold uppercase tracking-wider text-blue2">
                  {p.price}
                </span>
              </div>
              <p className="mt-3 font-sans text-sm leading-relaxed text-mid">{p.body}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-6 font-sans text-sm font-semibold text-navy transition-colors group-hover:text-blue2">
                See what it does
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M3 7h8M7.5 4l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </Link>
        </RevealAnimation>
      ))}
    </div>
  )
}
