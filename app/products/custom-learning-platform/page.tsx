import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import CTABand from '@/components/CTABand'

export const metadata: Metadata = {
  title: 'Custom Learning Platform Development UK | Masuyo Digital',
  description: 'We build custom e-learning platforms for UK businesses. Train staff, sell courses, and issue certificates on a branded platform you own outright. No monthly fees.',
  openGraph: {
    title: 'Custom Learning Platform Development UK | Masuyo Digital',
    description: 'A fully custom learning platform built for your business. Train staff or sell courses on a branded portal you own outright.',
    url: 'https://masuyodigital.com/products/custom-learning-platform',
  },
  alternates: { canonical: 'https://masuyodigital.com/products/custom-learning-platform' },
}

const features = [
  {
    title: 'Course Builder',
    description: 'Structure content into modules and lessons with support for video, text, images, and embedded files. No technical knowledge required to create and publish courses.',
  },
  {
    title: 'Progress Tracking',
    description: 'See exactly which students have completed which modules, their quiz scores, and how long they have spent on each section. Exportable reports included.',
  },
  {
    title: 'Completion Certificates',
    description: 'Issue branded certificates automatically when a student finishes a course. Fully customisable with your logo, their name, and the course details.',
  },
  {
    title: 'Enrolment Control',
    description: 'Open access, invite-only, or paid enrolment. Sell courses with one-off payments, subscriptions, or bundle access. You set the rules.',
  },
  {
    title: 'Branded Portal',
    description: 'Your domain, your colour scheme, your logo. The platform feels like a natural extension of your business, not a third-party tool.',
  },
  {
    title: 'Admin Dashboard',
    description: 'Manage all your courses, students, and enrolments from one clean control panel. Add new content, track activity, and update access without touching code.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Discovery',
    body: 'We learn how your business runs, who your learners are, and what they need to achieve. This shapes every decision in the build.',
  },
  {
    number: '02',
    title: 'Build',
    body: 'We design and build the platform around your exact requirements. You review at every stage and we iterate until it is exactly right.',
  },
  {
    number: '03',
    title: 'Launch and Handover',
    body: 'We deploy, test, and hand over the platform with full documentation and a training session for your team. We stay on hand for ongoing support.',
  },
]

const faqs = [
  {
    q: 'Can students access the platform on mobile?',
    a: 'Yes. The platform is fully responsive and works on phones, tablets, and desktops. Students can learn wherever they are.',
  },
  {
    q: 'Do I own the platform once it is built?',
    a: 'Yes, entirely. There are no ongoing platform fees, no vendor lock-in, and no monthly subscriptions to a third party. It is your software, hosted on your infrastructure.',
  },
  {
    q: 'Can I sell courses through the platform?',
    a: 'Yes. We can integrate payment processing so students can purchase access directly. We support one-off payments, subscriptions, and course bundle pricing.',
  },
  {
    q: 'How long does it take to build?',
    a: 'Most platforms take four to eight weeks from kick-off to launch, depending on the complexity of your requirements. We will give you a clear timeline at the start of the project.',
  },
  {
    q: 'Can I add my own courses after launch without developer help?',
    a: 'Yes. The admin dashboard is designed so you can create, publish, and update courses yourself. No technical knowledge needed.',
  },
  {
    q: 'What if I need changes after launch?',
    a: 'We offer ongoing support and development retainers. We can also scope individual change requests — whatever works best for your team.',
  },
]

export default function CustomLearningPlatformPage() {
  return (
    <>
      {/* Hero */}
      <section className="crosshatch-bg pt-16 pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-32">
          <div className="max-w-3xl">
            <RevealAnimation>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}>
                Technology Product
              </p>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
                A Learning Platform Built Around Your Business
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={2}>
              <p className="text-lg mb-10" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif', lineHeight: '1.7' }}>
                Train your staff, onboard new hires, or sell courses to your customers on a fully branded e-learning platform. No monthly fees. No platform compromise. Software you own outright.
              </p>
            </RevealAnimation>
            <RevealAnimation delay={3}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-block text-center text-sm font-semibold text-white px-6 py-3.5 rounded"
                  style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
                  Get a Quote
                </Link>
                <Link
                  href="#features"
                  className="inline-block text-center text-sm font-semibold text-white px-6 py-3.5 rounded border border-[#35ADDF] bg-transparent hover:bg-[#35ADDF] transition-colors"
                  style={{ fontFamily: 'Geist, sans-serif' }}>
                  See What Is Possible
                </Link>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <div className="max-w-2xl mb-12">
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                What is included
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold text-ink" style={{ fontFamily: 'var(--font-poppins)' }}>
                Everything you need to run a professional learning programme
              </h2>
            </div>
          </RevealAnimation>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <RevealAnimation key={f.title} delay={(i % 3 + 1) as 1 | 2 | 3}>
                <div className="p-6 rounded-lg h-full" style={{ background: 'var(--light)', border: '1px solid var(--border)' }}>
                  <div className="w-8 h-8 rounded flex items-center justify-center mb-4 flex-shrink-0" style={{ background: 'rgba(53,173,223,0.12)', color: 'var(--blue)' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2.5 8l3.5 3.5 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-ink mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>{f.description}</p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Browser mockup */}
      <section className="py-24" style={{ background: 'var(--navy)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <div className="max-w-2xl mb-12">
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Geist, sans-serif' }}>
                The platform
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
                Clean, simple, and built for how your people actually work
              </h2>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                The admin and learner interfaces are designed to be intuitive from day one. Your team can manage content, your learners can get on with learning.
              </p>
            </div>
          </RevealAnimation>

          <RevealAnimation delay={1}>
            {/* Browser chrome */}
            <div className="rounded-xl overflow-hidden shadow-2xl" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
              {/* Browser top bar */}
              <div className="flex items-center gap-2 px-4 py-3" style={{ background: '#0f1a26' }}>
                <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
                <span className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
                <span className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
                <div className="flex-1 mx-4">
                  <div className="mx-auto max-w-xs h-6 rounded px-3 flex items-center" style={{ background: 'rgba(255,255,255,0.08)' }}>
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Geist, sans-serif' }}>learn.yourbusiness.com</span>
                  </div>
                </div>
              </div>

              {/* App layout */}
              <div className="flex" style={{ background: '#ffffff', minHeight: 420 }}>
                {/* Sidebar */}
                <div className="flex-shrink-0 py-6 px-3 flex flex-col gap-1" style={{ background: '#1e2a3a', width: 180 }}>
                  <div className="px-3 mb-4">
                    <div className="h-5 rounded" style={{ background: 'rgba(255,255,255,0.15)', width: 100 }} />
                  </div>
                  {[
                    { label: 'Dashboard', active: true },
                    { label: 'Courses', active: false },
                    { label: 'Students', active: false },
                    { label: 'Certificates', active: false },
                    { label: 'Settings', active: false },
                  ].map(item => (
                    <div key={item.label} className="px-3 py-2 rounded text-xs font-medium" style={{
                      fontFamily: 'Geist, sans-serif',
                      color: item.active ? '#ffffff' : 'rgba(255,255,255,0.45)',
                      background: item.active ? 'rgba(53,173,223,0.2)' : 'transparent',
                    }}>
                      {item.label}
                    </div>
                  ))}
                </div>

                {/* Main content */}
                <div className="flex-1 p-6">
                  <div className="mb-5">
                    <p className="text-base font-semibold mb-1" style={{ color: '#1A2939', fontFamily: 'Geist, sans-serif' }}>Learning Dashboard</p>
                    <p className="text-xs" style={{ color: '#9ca3af', fontFamily: 'Geist, sans-serif' }}>Welcome back, Admin</p>
                  </div>

                  {/* Metric cards */}
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {[
                      { label: 'Courses', value: '12' },
                      { label: 'Completion Rate', value: '87%' },
                      { label: 'Certificates Issued', value: '4' },
                    ].map(metric => (
                      <div key={metric.label} className="p-3 rounded-lg" style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}>
                        <p className="text-lg font-semibold mb-0.5" style={{ color: '#1A2939', fontFamily: 'Geist, sans-serif' }}>{metric.value}</p>
                        <p className="text-xs" style={{ color: '#9ca3af', fontFamily: 'Geist, sans-serif' }}>{metric.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Course grid */}
                  <p className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: '#9ca3af', fontFamily: 'Geist, sans-serif' }}>Recent Courses</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { title: 'Staff Onboarding', progress: 100, color: '#35ADDF' },
                      { title: 'Health and Safety', progress: 68, color: '#10b981' },
                      { title: 'Product Training', progress: 45, color: '#f59e0b' },
                      { title: 'Customer Service', progress: 22, color: '#8b5cf6' },
                    ].map(course => (
                      <div key={course.title} className="p-3 rounded-lg" style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}>
                        <div className="h-1.5 rounded-full mb-2.5" style={{ background: '#e5e7eb' }}>
                          <div className="h-1.5 rounded-full" style={{ background: course.color, width: `${course.progress}%` }} />
                        </div>
                        <p className="text-xs font-medium" style={{ color: '#374151', fontFamily: 'Geist, sans-serif' }}>{course.title}</p>
                        <p className="text-xs mt-0.5" style={{ color: '#9ca3af', fontFamily: 'Geist, sans-serif' }}>{course.progress}% complete</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </RevealAnimation>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <div className="max-w-2xl mb-14">
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                How it works
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold text-ink" style={{ fontFamily: 'var(--font-poppins)' }}>
                From brief to live platform in a matter of weeks
              </h2>
            </div>
          </RevealAnimation>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <RevealAnimation key={step.number} delay={(i + 1) as 1 | 2 | 3}>
                <div className="flex flex-col gap-4">
                  <p className="text-4xl font-semibold" style={{ color: 'var(--blue)', fontFamily: 'var(--font-poppins)', opacity: 0.4 }}>{step.number}</p>
                  <h3 className="text-lg font-semibold text-ink" style={{ fontFamily: 'var(--font-poppins)' }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>{step.body}</p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Investment */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <RevealAnimation>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                  Investment
                </p>
                <h2 className="text-3xl font-semibold text-ink mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
                  Transparent pricing. No hidden costs.
                </h2>
                <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                  Every platform is scoped individually because no two businesses have the same needs. We will give you a fixed quote after a brief discovery call so you know exactly what you are committing to.
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                  Once the platform is built, it is yours. You host it, you own it, and you are not paying a monthly fee to keep it running. Optional support and maintenance retainers are available if you want us to stay involved.
                </p>
              </div>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <div className="rounded-xl p-8" style={{ background: 'var(--light)', border: '1px solid var(--border)' }}>
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>Starting from</p>
                <p className="text-5xl font-semibold mb-2" style={{ color: 'var(--navy)', fontFamily: 'var(--font-poppins)' }}>£3,500</p>
                <p className="text-sm mb-8" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>Final price depends on scope and features required</p>
                <ul className="flex flex-col gap-3 mb-8">
                  {[
                    'Fixed project price, no surprises',
                    'No monthly platform fees',
                    'Full ownership of the codebase',
                    'Branded to your business',
                    'Handover training included',
                    'Optional ongoing support available',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm" style={{ color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>
                      <span style={{ color: 'var(--blue)', flexShrink: 0 }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="block text-center text-sm font-semibold text-white py-3.5 rounded" style={{ background: 'var(--navy)', fontFamily: 'Geist, sans-serif' }}>
                  Get a Quote
                </Link>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation>
            <div className="max-w-2xl mb-12">
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                FAQ
              </p>
              <h2 className="text-3xl font-semibold text-ink" style={{ fontFamily: 'var(--font-poppins)' }}>
                Common questions
              </h2>
            </div>
          </RevealAnimation>
          <div className="max-w-3xl flex flex-col" style={{ gap: 0 }}>
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group"
                style={{ borderTop: '1px solid var(--border)', ...(i === faqs.length - 1 ? { borderBottom: '1px solid var(--border)' } : {}) }}
              >
                <summary
                  className="flex items-center justify-between py-5 cursor-pointer list-none"
                  style={{ fontFamily: 'Geist, sans-serif' }}
                >
                  <span className="text-sm font-semibold pr-8" style={{ color: 'var(--ink)' }}>{faq.q}</span>
                  <span className="flex-shrink-0" style={{ color: 'var(--mid)' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-open:rotate-45">
                      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </span>
                </summary>
                <p className="pb-5 text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="Ready to build a learning platform your business owns?"
        body="Tell us what you need to teach, who your learners are, and we will scope the right platform for you."
        buttonLabel="Get a Quote"
        buttonHref="/contact"
      />
    </>
  )
}
