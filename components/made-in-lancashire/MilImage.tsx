import Image from 'next/image'

/**
 * Feature images through next/image, as every image on the site is. SVGs
 * (the placeholders and the badge) are served as they are; photos are
 * resized and compressed by Next.
 */
export default function MilImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes,
}: {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  sizes?: string
}) {
  return <Image src={src} alt={alt} width={width} height={height} className={className} priority={priority} sizes={sizes} unoptimized={src.endsWith('.svg')} />
}
