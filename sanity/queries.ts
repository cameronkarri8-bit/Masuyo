import { groq } from 'next-sanity'

// All posts for index page
export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    author,
    category,
    excerpt,
    featuredImage {
      asset-> { url },
      alt
    }
  }
`

// Single post by slug
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    author,
    category,
    excerpt,
    featuredImage {
      asset-> { url },
      alt
    },
    body
  }
`

// Latest 3 posts (for sidebar or related)
export const latestPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    publishedAt,
    category,
    excerpt,
    featuredImage {
      asset-> { url },
      alt
    }
  }
`

// All post slugs (for static generation)
export const allPostSlugsQuery = groq`
  *[_type == "post"] { "slug": slug.current }
`
