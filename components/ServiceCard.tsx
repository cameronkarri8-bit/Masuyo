import Link from 'next/link'

interface ServiceCardProps {
  title: string
  description: string
  href: string
  icon: React.ReactNode
  showLink?: boolean
}

export default function ServiceCard({ title, description, href, icon, showLink = false }: ServiceCardProps) {
  return (
    <div
      className="p-6 transition-colors hover:bg-light flex flex-col gap-4"
      style={{ border: '1px solid var(--border)' }}
    >
      <div
        className="w-10 h-10 flex items-center justify-center rounded"
        style={{ background: 'var(--light)', color: 'var(--navy)' }}
      >
        {icon}
      </div>
      <div className="flex-1">
        <h3
          className="text-lg font-semibold text-ink mb-2"
          style={{ fontFamily: 'Fraunces, serif' }}
        >
          {title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
          {description}
        </p>
      </div>
      {showLink && (
        <Link
          href={href}
          className="text-sm font-medium flex items-center gap-1 transition-colors"
          style={{ color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}
        >
          Learn more
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7h8M7.5 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      )}
    </div>
  )
}
