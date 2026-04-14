import RevealAnimation from '@/components/RevealAnimation'
import Link from 'next/link'

const terms = [
  { term: 'A/B Testing', definition: 'A method of comparing two versions of a webpage or ad to see which performs better. One group of users sees version A, another sees version B, and you measure which achieves your goal — more clicks, sign-ups, or purchases.' },
  { term: 'Alt Text', definition: 'A written description added to an image on a webpage. It helps search engines understand what an image shows, and is read aloud by screen readers for visually impaired users. Missing alt text is both an SEO and accessibility issue.' },
  { term: 'Backlink', definition: 'A link from another website to yours. Search engines treat backlinks as votes of confidence — the more high-quality sites that link to you, the more authority your site tends to have in search rankings.' },
  { term: 'Bounce Rate', definition: 'The percentage of visitors who land on a page and leave without clicking anything else. A high bounce rate is not always bad — it depends on the page purpose — but on key landing pages it often signals a mismatch between what people expect and what they find.' },
  { term: 'Call to Action (CTA)', definition: 'A button, link, or prompt that tells a visitor what to do next. Examples include "Get a free quote", "Book a call", or "Download the guide". A clear CTA is one of the simplest ways to improve conversion rates.' },
  { term: 'Canonical URL', definition: 'The preferred version of a webpage when multiple URLs show the same or similar content. A canonical tag tells search engines which version to index, preventing duplicate content issues that can dilute your rankings.' },
  { term: 'Click-Through Rate (CTR)', definition: 'The percentage of people who click on a link after seeing it. Used in search results (how many people click your listing vs see it) and in email marketing (how many recipients click a link in your email).' },
  { term: 'Content Management System (CMS)', definition: 'Software that lets you create and manage website content without writing code. WordPress, Sanity, and Contentful are popular examples. A CMS allows business owners to update text and images themselves after a site is built.' },
  { term: 'Conversion', definition: 'When a visitor completes a desired action on your website. A conversion could be making a purchase, submitting an enquiry form, signing up for a newsletter, or calling your phone number — whatever goal the page is designed around.' },
  { term: 'Conversion Rate', definition: 'The percentage of visitors who complete a desired action. If 200 people visit your contact page and 14 fill in the form, your conversion rate is 7%. Improving conversion rate is often more cost-effective than driving more traffic.' },
  { term: 'Core Web Vitals', definition: 'A set of three Google metrics that measure real-world user experience: Largest Contentful Paint (how fast the main content loads), First Input Delay (how quickly the page responds to interaction), and Cumulative Layout Shift (how stable the layout is while loading). These directly affect Google rankings.' },
  { term: 'Cost Per Click (CPC)', definition: 'The amount you pay each time someone clicks on one of your paid ads. Used in Google Ads and Meta Ads. A lower CPC means you are paying less to get traffic, but the quality of that traffic also matters.' },
  { term: 'Cost Per Lead (CPL)', definition: 'The total spend divided by the number of leads generated. If you spend £500 on ads and get 25 enquiries, your CPL is £20. This is a more meaningful metric than CPC because it tracks actual business outcomes, not just clicks.' },
  { term: 'Domain Authority (DA)', definition: 'A score (1–100) developed by Moz that predicts how likely a website is to rank in search results. It is based on the number and quality of backlinks pointing to the site. DA is a useful benchmark, but not a metric Google itself uses.' },
  { term: 'Favicon', definition: 'The small icon that appears in a browser tab next to a page title, and in bookmarks. Usually a simplified version of your logo. A missing favicon is a small detail that makes a site look less polished.' },
  { term: 'Google Business Profile (GBP)', definition: 'The free listing that appears in Google Maps and in the local pack of search results. For businesses serving a local area, a fully optimised GBP is often the fastest route to more enquiries — more impactful than the main website for many local searches.' },
  { term: 'Heading Tags (H1, H2, H3)', definition: 'HTML elements that structure content on a page. The H1 is the main heading — there should only be one per page. H2s and H3s are sub-headings. Search engines use these to understand page structure, so using them logically matters for SEO.' },
  { term: 'Heatmap', definition: 'A visual tool that shows where users click, scroll to, or move their mouse on a webpage. Tools like Hotjar generate heatmaps. They are useful for understanding which parts of a page people engage with and where they drop off.' },
  { term: 'Impression', definition: 'The number of times an ad or search result is shown, regardless of whether anyone clicked it. Impressions measure visibility. A high impression count with a low CTR suggests your headline or listing is not compelling enough.' },
  { term: 'Keyword', definition: 'A word or phrase that people type into search engines. SEO involves targeting the keywords your ideal customers use — both to optimise your existing pages and to guide what content to create.' },
  { term: 'Landing Page', definition: 'A standalone webpage designed around a single goal — usually to capture a lead or make a sale. Unlike a standard homepage, a landing page removes distractions and focuses the visitor on one action. Often used in paid advertising campaigns.' },
  { term: 'Meta Description', definition: 'The short summary that appears under your page title in search results. It does not directly affect rankings, but a well-written meta description improves click-through rate by telling searchers exactly what they will find on the page.' },
  { term: 'Organic Traffic', definition: 'Visitors who arrive at your website from unpaid search results. As opposed to paid traffic from ads. Organic traffic is the goal of SEO — building a sustainable source of visitors that does not require ongoing ad spend.' },
  { term: 'Page Speed', definition: 'How quickly a webpage loads. Measured in seconds. Google uses page speed as a ranking signal, and slow pages lose visitors — research consistently shows that each extra second of load time reduces conversions.' },
  { term: 'Responsive Design', definition: 'A web design approach where a site automatically adjusts its layout to fit any screen size — phone, tablet, or desktop. Responsive design is the standard, not a premium feature. Google also uses mobile-first indexing, meaning how your site performs on mobile affects your overall rankings.' },
  { term: 'Return on Ad Spend (ROAS)', definition: 'Revenue generated for every pound spent on advertising. If you spend £1,000 on ads and generate £4,000 in revenue, your ROAS is 4x (or 400%). It is a core metric for judging whether a paid campaign is profitable.' },
  { term: 'Schema Markup', definition: 'Code added to a webpage that helps search engines understand the content in detail — for example, flagging that a page contains a product with a price, a review with a star rating, or an event with a date. Can lead to rich results in Google that stand out from standard listings.' },
  { term: 'Search Engine Optimisation (SEO)', definition: 'The process of improving a website so it ranks higher in search engine results for relevant queries. SEO covers three areas: technical (how the site is built), on-page (the content and structure), and off-page (backlinks and authority). Results take 3–6 months to materialise but compound over time.' },
  { term: 'SSL Certificate', definition: 'A security certificate that encrypts the connection between a website and its visitors. Sites with SSL show "https://" and a padlock icon in the browser. Google treats SSL as a ranking factor, and modern browsers warn users when a site does not have one.' },
  { term: 'Title Tag', definition: 'The clickable headline that appears in search results and in the browser tab. One of the most important on-page SEO elements. Each page should have a unique, descriptive title tag under 60 characters that includes the target keyword.' },
  { term: 'UX (User Experience)', definition: 'How easy and enjoyable a website or app is to use. Good UX means visitors can find what they need quickly, the layout makes sense, and nothing feels confusing or broken. Poor UX drives visitors away regardless of how good your product or service is.' },
  { term: 'XML Sitemap', definition: 'A file that lists all the important pages on your website and helps search engines discover and index them. Submitting a sitemap to Google Search Console is one of the first steps in any SEO setup.' },
]

const letters: string[] = Array.from(new Set<string>(terms.map(t => t.term[0]))).sort()

export default function GlossaryPage() {
  return (
    <>
      {/* Hero */}
      <section className="crosshatch-bg pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24">
          <div className="max-w-2xl">
            <RevealAnimation>
              <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4 leading-tight" style={{ fontFamily: 'Fraunces, serif' }}>
                Digital marketing glossary
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <p className="text-lg" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif' }}>
                Plain-English definitions of the terms you will hear when working with a digital agency.
              </p>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Jump links */}
      <section className="py-6 sticky top-16 z-40" style={{ background: 'var(--light)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-1.5">
            {letters.map(letter => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="text-xs font-semibold w-8 h-8 flex items-center justify-center rounded transition-colors hover:bg-white"
                style={{ border: '1px solid var(--border)', color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}
              >
                {letter}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Terms */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {letters.map(letter => {
            const letterTerms = terms.filter(t => t.term[0] === letter)
            return (
              <div key={letter} id={`letter-${letter}`} className="mb-14">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl font-semibold" style={{ fontFamily: 'Fraunces, serif', color: 'var(--blue)', minWidth: '2rem' }}>
                    {letter}
                  </span>
                  <div className="flex-1" style={{ height: '1px', background: 'var(--border)' }} />
                </div>
                <dl className="flex flex-col gap-8">
                  {letterTerms.map(({ term, definition }) => (
                    <RevealAnimation key={term}>
                      <div>
                        <dt className="text-base font-semibold text-ink mb-2" style={{ fontFamily: 'Fraunces, serif' }}>
                          {term}
                        </dt>
                        <dd className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.75' }}>
                          {definition}
                        </dd>
                      </div>
                    </RevealAnimation>
                  ))}
                </dl>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <RevealAnimation>
            <h2 className="text-2xl md:text-3xl font-semibold text-ink mb-4" style={{ fontFamily: 'Fraunces, serif' }}>
              Want to put these into practice?
            </h2>
          </RevealAnimation>
          <RevealAnimation delay={1}>
            <p className="text-base mb-8" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
              We help UK businesses apply digital marketing properly — no jargon, no bloated retainers.
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
