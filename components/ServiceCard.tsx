import Link from 'next/link'

interface ServiceCardProps {
  title: string
  description: string
  href: string
  icon: React.ReactNode
  showLink?: boolean
}

export default function ServiceCard({
  title,
  description,
  href,
  icon,
  showLink = false,
}: ServiceCardProps) {
  return (
    <div className="hover-lift flex h-full flex-col gap-5 rounded-card bg-blue-tint p-7">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-navy">
        {icon}
      </div>

      <div className="flex-1">
        <h3 className="mb-2 text-xl text-ink">{title}</h3>
        <p className="font-sans text-sm leading-relaxed text-mid">{description}</p>
      </div>

      {showLink && (
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-blue2 transition-colors hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
        >
          Learn more
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M3 7h8M7.5 4l3 3-3 3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      )}
    </div>
  )
}
