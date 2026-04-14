import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Masuyo Digital terms of service.',
  alternates: { canonical: 'https://masuyodigital.com/terms' },
}

export default function TermsPage() {
  return (
    <section className="py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <h1
          className="text-4xl font-semibold text-ink mb-8"
          style={{ fontFamily: 'Fraunces, serif' }}
        >
          Terms of Service
        </h1>
        <p
          className="text-base leading-relaxed"
          style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}
        >
          This page is being updated. Please contact{' '}
          <a href="mailto:hello@masuyodigital.com" style={{ color: 'var(--blue)' }}>
            hello@masuyodigital.com
          </a>{' '}
          for any queries relating to our terms of service.
        </p>
      </div>
    </section>
  )
}
