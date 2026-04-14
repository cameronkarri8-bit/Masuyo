export interface SanityPost {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  author?: string
  category?: string
  excerpt?: string
  featuredImage?: {
    asset: { url: string }
    alt?: string
  }
  body?: unknown[]
}
