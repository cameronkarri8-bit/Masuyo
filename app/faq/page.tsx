'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import RevealAnimation from '@/components/RevealAnimation'
import Link from 'next/link'

const groups = [
  {
    heading: 'Getting Started',
    faqs: [
      {
        q: 'How do I get started with Masuyo?',
        a: 'The easiest way is to fill in our Start a Project form, which takes about two minutes and gives you an indicative cost range. Alternatively, drop us a message on the Contact page or email hello@masuyodigital.com. We will get back to you within one business day.',
      },
      {
        q: 'Do I need to know exactly what I want before getting in touch?',
        a: 'Not at all. Most of our clients come to us with a rough idea and we help them work out the rest. A short conversation is usually enough to understand what you need and what the right approach is.',
      },
      {
        q: 'Do I need to provide any content before you start building?',
        a: 'It helps to have your logo and a general sense of what you want to say, but it is not essential before we begin. We can work with you to develop copy and will advise on imagery. Just let us know what you have and what you need.',
      },
      {
        q: 'Can you work with businesses outside the UK?',
        a: 'Yes. We are based in the UK but work with clients globally. All communication is handled remotely and we are experienced at working across time zones.',
      },
      {
        q: 'What size of business do you work with?',
        a: 'All sizes. From sole traders launching their first website to established companies scaling their digital presence. Our approach adapts to the size and stage of your business.',
      },
    ],
  },
  {
    heading: 'Pricing and Packages',
    faqs: [
      {
        q: 'How much does a website cost?',
        a: 'Our starter websites begin at £249. More complex projects are priced based on your specific requirements. The best way to get an idea is to use our project estimator, which will give you an indicative range in a couple of minutes. Final pricing is always confirmed after a discovery call.',
      },
      {
        q: 'What is included in the £249 starter website?',
        a: 'The starter package includes up to 5 pages, a contact form, full mobile optimisation, basic SEO setup, SSL certificate, and hosting on our own servers. It is designed to get a professional, working website live quickly for businesses just getting started.',
      },
      {
        q: 'Are there ongoing costs after my site is built?',
        a: 'Hosting and support are available as an ongoing arrangement. Hosting includes server management, uptime monitoring, backups, and SSL. We also offer monthly retainers for ongoing marketing, updates, or development work. There is no obligation to continue beyond the initial build if you just need a one-off project.',
      },
      {
        q: 'Do you offer payment plans?',
        a: 'Yes, for larger projects we typically work to a split payment structure: a deposit to begin, a mid-point payment, and a final payment on completion. We will discuss this during the discovery call.',
      },
      {
        q: 'Can I get a fixed-price quote?',
        a: 'Yes. Once we understand your requirements through a discovery call, we provide a fixed-price quote. There are no surprise invoices at the end of the project.',
      },
    ],
  },
  {
    heading: 'The Build Process',
    faqs: [
      {
        q: 'How long does it take to build a website?',
        a: 'Our starter websites are delivered within 7 working days. More complex websites or web applications typically take 2–6 weeks depending on scope. We will give you a clear timeline before any work begins.',
      },
      {
        q: 'What does the process look like from start to finish?',
        a: 'We start with a discovery call or brief to understand your requirements. We then design and build your site, keeping you informed at key stages. You get a review round before launch and we handle all the technical aspects of going live. We stay in touch after launch to make sure everything is running as expected.',
      },
      {
        q: 'Do I get to review the work before it goes live?',
        a: 'Yes, always. We share the site for your review before launch. Our standard packages include a round of revisions so you can make sure everything is exactly as you want it.',
      },
      {
        q: 'Will my website be mobile friendly?',
        a: 'Yes, every website we build is fully responsive and tested across multiple screen sizes and devices. Mobile-first design is our standard approach.',
      },
      {
        q: 'Do you use templates or build from scratch?',
        a: 'We build from scratch using modern frameworks. We do not use page builders or cookie-cutter templates. This gives you a faster, more flexible site that is designed around your specific business rather than a generic layout.',
      },
    ],
  },
  {
    heading: 'After Launch',
    faqs: [
      {
        q: 'Can I update the site myself after it is built?',
        a: 'Yes, if required. We can build your site with a content management system (CMS) that lets you update text, images, blog posts and more without needing a developer. We will show you how to use it and provide documentation.',
      },
      {
        q: 'What happens if something breaks after launch?',
        a: 'If we built your site and host it with us, we are on hand to fix any issues quickly. We monitor our hosting infrastructure proactively and can usually resolve problems before you even notice them. If something does go wrong, you contact us directly, not through a support ticket system.',
      },
      {
        q: 'What is included in hosting?',
        a: 'Our managed hosting includes your own space on our server infrastructure, fast load times, SSL certificate, daily backups, uptime monitoring, and direct support from the team who built your site. We do not outsource hosting to third parties.',
      },
      {
        q: 'Can you take over hosting for a site built by someone else?',
        a: 'Yes. We regularly migrate existing websites onto our hosting. Get in touch and we will assess what is involved and give you a clear picture of costs.',
      },
    ],
  },
  {
    heading: 'SEO and Marketing',
    faqs: [
      {
        q: 'What is SEO and do I need it?',
        a: 'SEO (Search Engine Optimisation) is the process of improving your website so it appears higher in Google search results when people search for what you offer. If you want to attract customers through search engines, you need it. It is a long-term investment that compounds over time.',
      },
      {
        q: 'Does every website you build come with SEO?',
        a: 'Every website we build includes basic on-page SEO setup: proper page titles, meta descriptions, semantic HTML structure, fast loading speeds, and mobile optimisation. This gives you a solid foundation. Ongoing SEO work (content strategy, link building, technical audits) is a separate service.',
      },
      {
        q: 'How long does SEO take to show results?',
        a: 'Honest answer: 3–6 months is typical before you see meaningful organic traffic growth, though this depends heavily on your industry and competition. SEO is not a quick fix; it is a consistent, compounding strategy. We will always give you a realistic picture of what is achievable in your market.',
      },
      {
        q: 'Do you run paid ads?',
        a: 'Yes. We manage Google Ads, Meta Ads (Facebook and Instagram) and other paid channels. We build campaigns focused on generating real results: enquiries, leads, sales, not just clicks and impressions.',
      },
      {
        q: 'What makes Masuyo different from other digital agencies?',
        a: 'We are a small, focused team that handles everything directly. No account managers passing your work to offshore developers. No bloated retainers for things you do not need. We are honest about what will and will not work, and we measure success by results, not by how many deliverables we can put on a report.',
      },
    ],
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      <button
        className="w-full text-left py-5 flex items-start justify-between gap-4"
        onClick={() => setOpen(o => !o)}
      >
        <span className="text-sm font-semibold text-ink pr-4" style={{ fontFamily: 'Geist, sans-serif', lineHeight: '1.6' }}>{q}</span>
        <span className="flex-shrink-0 mt-0.5 transition-transform" style={{ transform: open ? 'rotate(45deg)' : 'none', color: 'var(--mid)' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <div className={`accordion-content ${open ? 'open' : ''}`}>
        <p className="pb-5 text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.75' }}>{a}</p>
      </div>
    </div>
  )
}

export default function FAQPage() {
  return (
    <>
      {/* Hero */}
      <section className="crosshatch-bg pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24">
          <div className="max-w-2xl">
            <RevealAnimation>
              <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4 leading-tight" style={{ fontFamily: 'Fraunces, serif' }}>
                Frequently asked questions
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <p className="text-lg" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif' }}>
                Straight answers to the questions we hear most often.
              </p>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Jump links */}
      <section className="py-8 sticky top-16 z-40" style={{ background: 'var(--light)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {groups.map(g => (
              <a key={g.heading} href={`#${g.heading.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-xs font-semibold px-3 py-1.5 rounded-full transition-colors hover:bg-white"
                style={{ border: '1px solid var(--border)', color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>
                {g.heading}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ groups */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {groups.map((g, gi) => (
            <div key={g.heading} id={g.heading.toLowerCase().replace(/\s+/g, '-')} className={gi > 0 ? 'mt-16' : ''}>
              <RevealAnimation>
                <h2 className="text-2xl font-semibold text-ink mb-6" style={{ fontFamily: 'Fraunces, serif' }}>
                  {g.heading}
                </h2>
              </RevealAnimation>
              <div style={{ borderTop: '1px solid var(--border)' }}>
                {g.faqs.map((faq, fi) => (
                  <RevealAnimation key={fi} delay={Math.min(fi, 2) as 0 | 1 | 2}>
                    <FAQItem q={faq.q} a={faq.a} />
                  </RevealAnimation>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <RevealAnimation>
            <h2 className="text-2xl md:text-3xl font-semibold text-ink mb-4" style={{ fontFamily: 'Fraunces, serif' }}>
              Still have questions?
            </h2>
          </RevealAnimation>
          <RevealAnimation delay={1}>
            <p className="text-base mb-8" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
              We are happy to talk through anything that is not covered here.
            </p>
          </RevealAnimation>
          <RevealAnimation delay={2}>
            <Link href="/contact" className="inline-block text-sm font-semibold text-white px-6 py-3.5 rounded"
              style={{ background: 'var(--navy)', fontFamily: 'Geist, sans-serif' }}>
              Get in touch
            </Link>
          </RevealAnimation>
        </div>
      </section>
    </>
  )
}
