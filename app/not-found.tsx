import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="crosshatch-bg min-h-screen flex items-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p
          className="text-8xl font-semibold text-white mb-6"
          style={{ fontFamily: 'Fraunces, serif', opacity: 0.15 }}
        >
          404
        </p>
        <h1
          className="text-4xl md:text-5xl font-semibold text-white mb-4"
          style={{ fontFamily: 'Fraunces, serif' }}
        >
          Page not found.
        </h1>
        <p
          className="text-base mb-8"
          style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'Geist, sans-serif' }}
        >
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded"
          style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}
        >
          Go home
        </Link>
      </div>
    </section>
  )
}
