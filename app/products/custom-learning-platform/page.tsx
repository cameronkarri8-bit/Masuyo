import type { Metadata } from 'next'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'
import Section from '@/components/Section'
import ImagePlaceholder from '@/components/ImagePlaceholder'
import DeviceMockup from '@/components/placeholder/DeviceMockup'
import FaqAccordion, { type FaqItem } from '@/components/FaqAccordion'

/*
  Coaching and training platforms.

  Copy supplied by the client. Two deliberate deviations from the brief, both
  reported back rather than made silently:

  1. Localised to UK English. The brief was written in US English and flagged
     the choice. The rest of the site is UK throughout.
  2. The prices here are specific to this product and are not in lib/pricing.ts,
     which drives the estimate builder. The builder does not offer this product,
     so the two cannot contradict each other on screen.

  The URL is unchanged, so no redirect is needed.
*/

export const metadata: Metadata = {
  title: 'Coaching and Training Platform Development | Masuyo Digital',
  description:
    'We build and run custom learning platforms for coaches, training providers and certification bodies. Cohorts, certificates and payments on a branded platform built around how you actually deliver.',
  openGraph: {
    title: 'Coaching and Training Platform Development | Masuyo Digital',
    description:
      'A learning platform built for coach-led programmes. Cohorts, progress tracking, certificates and payments, all under your brand.',
    url: 'https://masuyodigital.com/products/custom-learning-platform',
  },
  alternates: { canonical: 'https://masuyodigital.com/products/custom-learning-platform' },
}

const INCLUDED = [
  {
    title: "Course builder",
    body: "Structure content into modules, lessons and topics with video, text, images and downloadable workbooks. Publish and update it yourself, no developer needed.",
  },
  {
    title: "Cohorts and groups",
    body: "Run the same programme with multiple groups at different stages. Each cohort gets its own space, its own schedule, its own coach and its own feed.",
  },
  {
    title: "Coach oversight",
    body: "Coaches see their own students and nobody else's. Who has started, who has stalled, who finished last week. The visibility you currently get by asking.",
  },
  {
    title: "Progress tracking",
    body: "Completion by student, by topic, by cohort. Quiz scores and attempt history. Exportable when you need to report on it.",
  },
  {
    title: "Certificates",
    body: "Branded certificates issued automatically on completion, with a shareable verification link. Built for anyone whose learners need to evidence what they have done.",
  },
  {
    title: "Payments into your account",
    body: "Sell courses, bundles and programme access with one-off payments or subscriptions. Money goes to your Stripe account. No platform surcharge on your own transactions.",
  },
  {
    title: "Community and messaging",
    body: "Discussion, cohort feeds and direct messaging between coaches and students, in the same place as the learning. One login, not three tools.",
  },
  {
    title: "Admin dashboard",
    body: "Manage courses, students, enrolments, cohorts and payments from one panel. Grant access manually, fix problems, issue certificates, see what is going on.",
  },
]

const AUDIENCES = [
  {
    title: "Leadership and executive coaches",
    body: "Cohort programmes with real coach involvement, where knowing how each individual is progressing is the whole point.",
  },
  {
    title: "Corporate training providers",
    body: "Deliver training to multiple client organisations, each with their own branded portal, from one place you control.",
  },
  {
    title: "Professional and certification bodies",
    body: "CPD programmes where completion evidence, certificates and reporting are requirements rather than nice to haves.",
  },
  {
    title: "Franchise networks",
    body: "Onboard and train franchisees consistently, and see who has actually completed what across the whole network.",
  },
]

const STEPS = [
  {
    n: '01',
    title: "Discovery",
    body: "A paid scoping session where we go through how your programme actually runs, what you are moving from, and what needs to come with you. You leave with a written recommendation and a fixed quote, whether or not you go ahead. The fee is credited in full against your build.",
  },
  {
    n: '02',
    title: "Build and brand",
    body: "We configure the platform around your programme, apply your branding, connect your domain and your payment account, and set up your course structure. You review as we go.",
  },
  {
    n: '03',
    title: "Migration",
    body: "If you are coming off another platform, we bring your students, their access and their progress with you. Nobody gets left behind and nobody has to start again.",
  },
  {
    n: '04',
    title: "Launch and training",
    body: "We deploy, test properly, train your team and hand over documentation. Then we stay on and keep it running.",
  },
]

const TIERS = [
  {
    name: 'Discovery',
    price: '£600',
    cadence: 'credited in full against your build',
    body: "A working session and a written recommendation with a fixed quote. If we are not the right fit, we will tell you and you keep the recommendation.",
    features: [] as string[],
    featured: false,
  },
  {
    name: 'Launch',
    price: 'From £3,000',
    cadence: 'setup, then £195 a month',
    body: "For solo coaches and small practices.",
    features: [
      "Your branding on your subdomain",
      "Up to five courses, unlimited students",
      "Cohorts, quizzes and certificates",
      "Community, and your own Stripe account connected",
      "You load your own content, with training and documentation from us",
    ],
    featured: false,
  },
  {
    name: 'Professional',
    price: 'From £6,500',
    cadence: 'setup, then £425 a month',
    body: "The one most people need. Everything in Launch, plus:",
    features: [
      "Your own domain and unlimited courses",
      "Full migration from your existing platform, including student progress",
      "Your first three courses loaded by us",
      "Branded email on your domain and custom certificate design",
      "A quarterly review",
    ],
    featured: true,
  },
  {
    name: 'Bespoke',
    price: 'From £14,000',
    cadence: 'setup, then £750 a month',
    body: "For training providers and certification bodies with real requirements. Everything in Professional, plus:",
    features: [
      "Custom feature development",
      "Integrations with your existing systems",
      "Separate branded portals for each of your own clients",
      "Custom reporting and priority support",
    ],
    featured: false,
  },
]

const FAQS: FaqItem[] = [
  {
    q: "How is this different to Kajabi or Thinkific?",
    a: "Those are built for creators selling courses. This is built for organisations running programmes, so cohorts, coach oversight of individual students and certification are core rather than add-ons. You also keep your own payment processor with no platform surcharge, and you get a named person who runs it rather than a support queue.",
  },
  {
    q: "Do you take a cut of what I sell?",
    a: "No. Payments go directly to your own Stripe account. You pay Stripe's standard processing fee and nothing to us.",
  },
  {
    q: "Can I move my existing students across?",
    a: "Yes. Migration including student accounts, enrolments and completed progress is included on Professional and above, and can be quoted separately on Launch.",
  },
  {
    q: "How long does it take?",
    a: "Most platforms go live four to eight weeks from kick off. Migrations and custom development extend that, and we will give you a firm timeline in discovery.",
  },
  {
    q: "Can I add and edit courses myself?",
    a: "Yes. The admin panel is built for non-technical users. If you would rather not, Fully Managed means we do it for you.",
  },
  {
    q: "What if I need something the platform does not do?",
    a: "We build it. That is the advantage of custom over off the shelf. Small changes are covered under Bespoke, and anything larger gets scoped and quoted.",
  },
  {
    q: "Does it work on mobile?",
    a: "Yes, fully responsive for learners and admins.",
  },
  {
    q: "What happens if I want to leave?",
    a: "You export your data or we hand over a full database dump, and we help you move. No lock in, no exit fee.",
  },
  {
    q: "Why is there a monthly fee if I own the platform?",
    a: "Because someone has to host it, back it up, patch it, monitor it and answer the phone when something breaks. The monthly covers that and the ongoing platform improvements. If you would rather own the code and run it yourself, that is available on Bespoke builds.",
  },
]

function Tick({ light = false }: { light?: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      className={`mt-1 flex-shrink-0 ${light ? 'text-white' : 'text-blue'}`}
    >
      <path d="M3 9.5l4 4 8-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function CoachingAndTrainingPlatformsPage() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <Section bg="white" width="wide" tight>
        <div className="grid items-center gap-12 lg:grid-cols-[1.45fr_1fr] lg:gap-16">
          <RevealAnimation>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.06em] text-blue2">
              Technology product
            </p>
            <h1 className="mt-5 max-w-[20ch] text-navy hero-display">
              A learning platform built for how you actually coach
            </h1>
            <p className="mt-8 max-w-[48ch] font-sans text-lg leading-relaxed text-mid">
              Cohorts, live sessions, progress you can actually see, certificates, and
              payments into your own account. Built around your programme, branded as yours,
              and run for you.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="btn-primary">
                Book a discovery call
              </Link>
              <a href="#included" className="btn-secondary">
                See what is included
              </a>
            </div>
          </RevealAnimation>

          <RevealAnimation delay={1}>
            <DeviceMockup aspect="4/3" variant={1} />
          </RevealAnimation>
        </div>
      </Section>

      {/* ---------------- The problem ---------------- */}
      <Section bg="navy" width="default">
        <RevealAnimation>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.06em] text-blue">
            Why this exists
          </p>
          <h2 className="mt-5 max-w-[20ch] text-4xl text-white md:text-5xl">
            Course platforms were built for selling videos, not running programmes
          </h2>
        </RevealAnimation>

        <RevealAnimation delay={1}>
          <div className="mt-10 max-w-[60ch] font-sans text-lg leading-relaxed text-white/80">
            <p>
              If you deliver a real programme, you have probably worked out that the big
              platforms are not built for you. They are built for creators selling a course
              and moving on.
            </p>
            <p className="mt-6">
              You need to know which student in cohort three has gone quiet. You need a coach
              to see their own group without seeing everyone else&rsquo;s. You need
              certificates that mean something, sessions that sit alongside the content, and
              a way to run the same programme with four different groups at four different
              stages.
            </p>
            <p className="mt-6">
              Most platforms make you bolt that on with spreadsheets, a separate community
              tool, and a lot of manual chasing.
            </p>
          </div>
        </RevealAnimation>

        {/*
          TODO: verify before publishing. This is a specific, dated and checkable
          claim about a named competitor, supplied by the client. "In January"
          will also age badly. Confirm the figures and consider dating it.
        */}
        <RevealAnimation delay={2}>
          <div className="mt-10 max-w-[60ch] rounded-card border-l-4 border-blue bg-white/5 p-7">
            <p className="font-sans text-lg leading-relaxed text-white/85">
              Then in January, Kajabi raised prices by around 25 percent, pulled its entry
              plan from public pricing, and added a surcharge on payments taken through your
              own Stripe account. Existing customers were not protected. If you have been
              looking for a way out since, this is what the alternative looks like.
            </p>
          </div>
        </RevealAnimation>
      </Section>

      {/* ---------------- What is included ---------------- */}
      <Section bg="white" width="wide" id="included">
        <RevealAnimation>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.06em] text-blue2">
            What is included
          </p>
          <h2 className="mt-5 max-w-[22ch] text-4xl text-navy md:text-5xl">
            Everything you need to run a programme, not just sell a course
          </h2>
        </RevealAnimation>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {INCLUDED.map((f, i) => (
            <RevealAnimation key={f.title} delay={(i % 2) as 0 | 1}>
              <div className="hover-lift flex h-full flex-col rounded-card bg-blue-tint p-8">
                <h3 className="text-2xl text-navy">{f.title}</h3>
                <p className="mt-4 font-sans text-base leading-relaxed text-mid">{f.body}</p>
              </div>
            </RevealAnimation>
          ))}
        </div>
      </Section>

      {/* ---------------- Who it is for ---------------- */}
      <Section bg="tint" width="wide">
        <RevealAnimation>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.06em] text-blue2">
            Who we build for
          </p>
          <h2 className="mt-5 max-w-[22ch] text-4xl text-navy md:text-5xl">
            Built for organisations that run programmes, not content libraries
          </h2>
        </RevealAnimation>

        <div className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {AUDIENCES.map((a, i) => (
            <RevealAnimation key={a.title} delay={(i % 2) as 0 | 1}>
              <div className="border-t-2 border-blue pt-6">
                <h3 className="text-2xl text-navy">{a.title}</h3>
                <p className="mt-3 font-sans text-base leading-relaxed text-mid">{a.body}</p>
              </div>
            </RevealAnimation>
          ))}
        </div>
      </Section>

      {/* ---------------- The platform ---------------- */}
      <Section bg="navy" width="wide">
        <RevealAnimation>
          <div className="max-w-2xl">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.06em] text-blue">
              The platform
            </p>
            <h2 className="mt-5 text-4xl text-white md:text-5xl">
              Clean enough that your team will actually use it
            </h2>
            <p className="mt-8 font-sans text-lg leading-relaxed text-white/75">
              The admin side is built so a non-technical person can run it. The learner side
              is built so nobody needs a walkthrough. Both are yours, on your domain, in your
              colours.
            </p>
          </div>
        </RevealAnimation>

        <RevealAnimation delay={1}>
          {/* Sample data uses cohort language on purpose. Generic course
              completion percentages would undercut the whole positioning. */}
          <div className="mt-14 overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10">
            <div className="flex items-center gap-2 px-4 py-3" style={{ background: '#0f1a26' }}>
              <span className="h-3 w-3 rounded-full" style={{ background: '#ff5f57' }} />
              <span className="h-3 w-3 rounded-full" style={{ background: '#febc2e' }} />
              <span className="h-3 w-3 rounded-full" style={{ background: '#28c840' }} />
              <div className="mx-4 flex-1">
                <div
                  className="mx-auto flex h-6 max-w-xs items-center rounded px-3"
                  style={{ background: 'rgba(255,255,255,0.08)' }}
                >
                  <span className="font-sans text-xs text-white/40">academy.yourbrand.com</span>
                </div>
              </div>
            </div>

            <div className="flex bg-white" style={{ minHeight: 420 }}>
              <div
                className="hidden flex-shrink-0 flex-col gap-1 px-3 py-6 sm:flex"
                style={{ background: '#1e2a3a', width: 180 }}
              >
                <div className="mb-4 px-3">
                  <div className="h-5 rounded" style={{ background: 'rgba(255,255,255,0.15)', width: 100 }} />
                </div>
                {[
                  { label: 'Dashboard', active: true },
                  { label: 'Cohorts', active: false },
                  { label: 'Courses', active: false },
                  { label: 'Students', active: false },
                  { label: 'Certificates', active: false },
                ].map(item => (
                  <div
                    key={item.label}
                    className="rounded px-3 py-2 font-sans text-xs font-medium"
                    style={{
                      color: item.active ? '#ffffff' : 'rgba(255,255,255,0.45)',
                      background: item.active ? 'rgba(53,173,223,0.2)' : 'transparent',
                    }}
                  >
                    {item.label}
                  </div>
                ))}
              </div>

              <div className="min-w-0 flex-1 p-6">
                <div className="mb-5">
                  <p className="font-sans text-base font-semibold" style={{ color: '#1A2939' }}>
                    Cohort 4, Spring intake
                  </p>
                  <p className="mt-0.5 font-sans text-xs" style={{ color: '#9ca3af' }}>
                    Coach: Sarah Whitlock. 18 students, week 6 of 12
                  </p>
                </div>

                <div className="mb-5 grid grid-cols-3 gap-3">
                  {[
                    { label: 'On track', value: '13' },
                    { label: 'Gone quiet', value: '3' },
                    { label: 'Certificates due', value: '2' },
                  ].map(m => (
                    <div
                      key={m.label}
                      className="rounded-lg p-3"
                      style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}
                    >
                      <p className="font-sans text-lg font-semibold" style={{ color: '#1A2939' }}>
                        {m.value}
                      </p>
                      <p className="font-sans text-xs" style={{ color: '#9ca3af' }}>{m.label}</p>
                    </div>
                  ))}
                </div>

                <p
                  className="mb-3 font-sans text-xs font-semibold uppercase tracking-wider"
                  style={{ color: '#9ca3af' }}
                >
                  Individual progress
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    { name: 'A. Okafor', note: 'Module 8, on track', progress: 92, color: '#10b981' },
                    { name: 'J. Halvorsen', note: 'Module 7, on track', progress: 74, color: '#35ADDF' },
                    { name: 'M. Duarte', note: 'No activity, 11 days', progress: 41, color: '#f59e0b' },
                    { name: 'K. Bhatt', note: 'No activity, 19 days', progress: 18, color: '#ef4444' },
                  ].map(s => (
                    <div
                      key={s.name}
                      className="rounded-lg p-3"
                      style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}
                    >
                      <div className="mb-2.5 h-1.5 rounded-full" style={{ background: '#e5e7eb' }}>
                        <div
                          className="h-1.5 rounded-full"
                          style={{ background: s.color, width: `${s.progress}%` }}
                        />
                      </div>
                      <p className="font-sans text-xs font-medium" style={{ color: '#374151' }}>{s.name}</p>
                      <p className="mt-0.5 font-sans text-xs" style={{ color: '#9ca3af' }}>{s.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </RevealAnimation>
      </Section>

      {/* ---------------- How it works ---------------- */}
      <Section bg="white" width="wide">
        <RevealAnimation>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.06em] text-blue2">
            How it works
          </p>
          <h2 className="mt-5 max-w-[22ch] text-4xl text-navy md:text-5xl">
            From first call to live platform in weeks, not quarters
          </h2>
        </RevealAnimation>

        <ol className="mt-14 grid gap-10 md:grid-cols-2 md:gap-x-16">
          {STEPS.map((s, i) => (
            <RevealAnimation key={s.n} delay={(i % 2) as 0 | 1}>
              <li className="border-t-2 border-blue pt-6">
                <span className="font-display text-5xl text-blue">{s.n}</span>
                <h3 className="mt-4 text-2xl text-navy">{s.title}</h3>
                <p className="mt-3 font-sans text-base leading-relaxed text-mid">{s.body}</p>
              </li>
            </RevealAnimation>
          ))}
        </ol>
      </Section>

      {/* ---------------- Pricing ---------------- */}
      <Section bg="tint" width="wide">
        <RevealAnimation>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.06em] text-blue2">
            Investment
          </p>
          <h2 className="mt-5 max-w-[22ch] text-4xl text-navy md:text-5xl">
            Clear pricing, quoted before you commit
          </h2>
          <p className="mt-8 max-w-[54ch] font-sans text-lg leading-relaxed text-mid">
            Every platform is scoped in discovery so you get a fixed number before you decide
            anything. Below is what our tiers typically cost. We quote in your currency.
          </p>
        </RevealAnimation>

        <div className="mt-14 grid items-start gap-5 md:grid-cols-2">
          {TIERS.map((t, i) => (
            <RevealAnimation key={t.name} delay={(i % 2) as 0 | 1}>
              <div
                className={`hover-lift relative flex h-full flex-col rounded-card p-8 md:p-10 ${
                  t.featured ? 'on-dark bg-blue text-white' : 'bg-white'
                }`}
              >
                {t.featured && (
                  <span className="absolute right-8 top-8 rounded-full bg-white/20 px-3 py-1 font-sans text-xs font-semibold uppercase tracking-wider text-white">
                    Most chosen
                  </span>
                )}

                <h3 className={`text-3xl ${t.featured ? 'text-white' : 'text-navy'}`}>{t.name}</h3>

                <p className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span
                    className={`font-display text-5xl leading-none ${
                      t.featured ? 'text-white' : 'text-navy'
                    }`}
                  >
                    {t.price}
                  </span>
                  <span className={`font-sans text-sm ${t.featured ? 'text-white/70' : 'text-mid'}`}>
                    {t.cadence}
                  </span>
                </p>

                <p
                  className={`mt-6 font-sans text-base leading-relaxed ${
                    t.featured ? 'text-white/85' : 'text-mid'
                  }`}
                >
                  {t.body}
                </p>

                {t.features.length > 0 && (
                  <ul
                    className={`mt-7 flex flex-col gap-3 border-t pt-7 ${
                      t.featured ? 'border-white/20' : 'border-border'
                    }`}
                  >
                    {t.features.map(f => (
                      <li
                        key={f}
                        className={`flex gap-3 font-sans text-sm leading-relaxed ${
                          t.featured ? 'text-white/90' : 'text-ink'
                        }`}
                      >
                        <Tick light={t.featured} />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-auto pt-10">
                  <Link
                    href="/contact"
                    className={`w-full ${t.featured ? 'btn-secondary' : 'btn-primary'}`}
                  >
                    Book a discovery call
                  </Link>
                </div>
              </div>
            </RevealAnimation>
          ))}
        </div>

        <RevealAnimation>
          <div className="mt-5 rounded-card bg-navy p-8 md:p-10">
            <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
              <h3 className="text-3xl text-white">Fully managed</h3>
              <p className="font-display text-4xl leading-none text-white">
                Add £1,400
                <span className="ml-2 font-sans text-base font-normal text-white/70">
                  a month to any tier
                </span>
              </p>
            </div>
            <p className="mt-6 max-w-[64ch] font-sans text-base leading-relaxed text-white/75">
              We run it. Content uploads and edits, user and enrolment management, cohort
              administration, reporting and monitoring. A named contact who answers the same
              day. For teams who would rather coach than administrate.
            </p>
          </div>
        </RevealAnimation>

        <RevealAnimation>
          <div className="mt-10 max-w-[64ch] font-sans text-base leading-relaxed text-mid">
            <p>
              Included on every tier: hosting, backups, security updates, platform
              improvements and support. No per-contact limits, no feature gates, and no
              surcharge on your own transactions.
            </p>
            <p className="mt-4">
              Annual payment takes two months off. Twelve month minimum term on the monthly.
            </p>
          </div>
        </RevealAnimation>
      </Section>

      {/* ---------------- Ownership ---------------- */}
      <Section bg="white" width="default">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
          <RevealAnimation>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.06em] text-blue2">
              Ownership
            </p>
            <h2 className="mt-5 max-w-[14ch] text-4xl text-navy md:text-5xl">
              It is yours, and we mean it properly
            </h2>
          </RevealAnimation>

          <RevealAnimation delay={1}>
            <div className="font-sans text-base leading-relaxed text-mid">
              <p>
                Your content is yours. Your student data is yours. Your payments go into your
                account, not ours, and we do not take a percentage of what you sell.
              </p>
              <p className="mt-5">
                You can export everything at any time, and if you ever want to leave we will
                hand over your full database. We will not hold your business hostage, because
                a platform that has to trap you was never worth paying for.
              </p>
              <p className="mt-5">
                The monthly is not rent on software. It covers hosting, backups, security,
                support, and the improvements that get built into the platform over time. If
                you would rather buy the platform outright and host it yourself, we do that
                too on Bespoke builds. Ask in discovery.
              </p>
            </div>
          </RevealAnimation>
        </div>
      </Section>

      {/* ---------------- Proof ---------------- */}
      <Section bg="tint" width="wide">
        <RevealAnimation>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.06em] text-blue2">
            In the wild
          </p>
          <h2 className="mt-5 max-w-[22ch] text-4xl text-navy md:text-5xl">
            Built and running for Invisible Edge
          </h2>
          <div className="mt-8 max-w-[60ch] font-sans text-lg leading-relaxed text-mid">
            <p>
              Invisible Edge is a US leadership coaching and executive development firm. We
              moved their entire academy off WordPress and LearnDash onto a custom platform:
              eleven courses, cohort programmes with live coach involvement, quizzes,
              certificates, community and Stripe checkout.
            </p>
            <p className="mt-5">We built it, we host it, and we run it for them day to day.</p>
          </div>
        </RevealAnimation>

        {/*
          TODO: the quote and screenshots below need the client's sign-off before
          this page goes live. Nothing is attributed to a named person yet, on
          purpose, and no quote has been written for them.
        */}
        <RevealAnimation delay={1}>
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <figure className="rounded-card border-l-4 border-amber bg-white p-8">
              <p className="inline-block rounded-full bg-amber/15 px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-wider text-navy">
                Awaiting client sign-off
              </p>
              <blockquote className="mt-6">
                <p className="text-2xl text-navy">PLACEHOLDER: client quote, pending approval.</p>
              </blockquote>
              <figcaption className="mt-6 font-sans text-sm text-mid">
                PLACEHOLDER: name, role, Invisible Edge
              </figcaption>
            </figure>

            <div className="grid gap-5 sm:grid-cols-2">
              <ImagePlaceholder
                aspect="4/3"
                label="PLACEHOLDER: Invisible Edge platform screenshot, pending approval"
              />
              <ImagePlaceholder
                aspect="4/3"
                label="PLACEHOLDER: Invisible Edge cohort or certificate view, pending approval"
              />
            </div>
          </div>
        </RevealAnimation>
      </Section>

      {/* ---------------- FAQ ---------------- */}
      <Section bg="white" width="narrow">
        <RevealAnimation>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.06em] text-blue2">
            FAQ
          </p>
          <h2 className="mt-5 text-4xl text-navy md:text-5xl">Common questions</h2>
        </RevealAnimation>
        <div className="mt-12">
          <FaqAccordion items={FAQS} />
        </div>
      </Section>

      {/* ---------------- Final CTA ---------------- */}
      <Section bg="navy" width="default" tight>
        <RevealAnimation>
          <h2 className="max-w-[22ch] text-4xl text-white md:text-5xl">
            Ready to run your programme on something built for it?
          </h2>
          <p className="mt-8 max-w-[54ch] font-sans text-lg leading-relaxed text-white/80">
            Tell us how your programme works and who your learners are. We will scope the
            right platform and give you a fixed price before you commit to anything.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="btn-primary">
              Book a discovery call
            </Link>
            <Link href="/contact" className="btn-secondary">
              Talk to us first
            </Link>
          </div>
        </RevealAnimation>
      </Section>
    </>
  )
}
