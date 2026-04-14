import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const RESOURCES = [
  { slug: 'uk-business-launch-checklist', title: 'UK Business Launch Checklist', category: 'Business Setup', type: 'checklist', description: 'Everything you need to do before, during, and after registering your UK business.', content: ['Register with Companies House (Ltd) or HMRC (sole trader)', 'Set up a business bank account', 'Register for VAT if turnover exceeds £90,000', 'Get relevant insurance (public liability, professional indemnity)', 'Set up accounting software (Xero, QuickBooks, or FreeAgent)', 'Create a basic contract template for clients', 'Open a business email address', 'Secure your domain name', 'Set up your Google Business Profile', 'Register for Self Assessment (sole trader) or PAYE (Ltd)', 'Draft terms and conditions for your website', 'Create a simple cash flow forecast'], premium: false },
  { slug: 'choosing-business-structure', title: 'Choosing Your Business Structure Guide', category: 'Business Setup', type: 'guide', description: 'Sole trader, limited company, or partnership? Pros, cons, and tax implications.', content: ['Sole trader: simple setup, personal liability, class 2 NI', 'Limited company: separate legal entity, more admin, often lower tax', 'Partnership: shared ownership, joint liability', 'When to switch from sole trader to Ltd', 'Director salary vs dividends explained', 'IR35 considerations for contractors', 'Key questions to ask your accountant'], premium: false },
  { slug: 'seo-quick-start-checklist', title: 'SEO Quick-Start Checklist for New Websites', category: 'Marketing', type: 'checklist', description: 'The essential on-page SEO tasks to complete when launching a new website.', content: ['Set up Google Search Console', 'Set up Google Analytics 4', 'Write unique title tags for every page (under 60 characters)', 'Write meta descriptions for every page (under 155 characters)', 'Use one H1 per page', 'Add alt text to all images', 'Compress images before upload', 'Create and submit an XML sitemap', 'Set up Google Business Profile for local businesses', 'Ensure site loads in under 3 seconds', 'Check mobile usability in Search Console', 'Build at least 3–5 core pages of quality content'], premium: false },
  { slug: 'social-media-content-calendar', title: 'Social Media Content Calendar Template', category: 'Marketing', type: 'template', description: 'A 90-day content calendar template with content pillars and caption formulas.', content: ['Setting your content pillars (3–5 topics)', 'Recommended posting frequency by platform', 'Content mix: educational, promotional, social proof, behind the scenes', '90-day calendar template', 'Caption formulas for each content type', 'Hashtag strategy for UK businesses', 'How to batch content creation', 'Tools for scheduling: Buffer, Later, Hootsuite'], premium: false },
  { slug: 'cash-flow-forecast-template', title: 'Cash Flow Forecast Template (12-Month)', category: 'Finance', type: 'template', description: 'A 12-month cash flow template for UK small businesses.', content: ['Monthly income by source', 'Fixed costs (rent, software, insurance)', 'Variable costs (materials, contractors, ads)', 'Tax provisions (VAT, corporation tax, income tax)', 'Closing balance forecast', 'How to use the forecast to make decisions', 'Warning signs in your cash flow', 'When to speak to an accountant'], premium: false },
  { slug: 'tech-stack-guide', title: 'Tech Stack Guide for Small Businesses', category: 'Technology', type: 'guide', description: 'The essential software every UK small business needs.', content: ['Accounting: Xero vs QuickBooks vs FreeAgent', 'CRM: HubSpot Free vs Pipedrive vs Notion', 'Email: Google Workspace vs Microsoft 365', 'Project management: Trello vs Asana vs ClickUp', 'Communication: Slack vs Teams', 'Video calls: Zoom vs Google Meet', 'E-signatures: DocuSign vs SignNow', 'Storage: Google Drive vs Dropbox', 'Invoicing: built-in accounting vs Stripe'], premium: false },
  { slug: 'website-brief-template', title: 'Website Brief Template', category: 'Technology', type: 'template', description: 'A structured brief template to define what you want from a new website.', content: ['Business overview (one paragraph)', 'Goals for the website', 'Target audience description', 'Competitor websites you like and why', 'Pages and sections you need', 'Content you already have', 'Content you need help with', 'Design preferences and brand assets', 'Technical requirements', 'Timeline and budget range'], premium: false },
  { slug: 'website-legal-pages-checklist', title: 'Website Legal Pages Checklist', category: 'Legal', type: 'checklist', description: 'The legal pages every UK business website must have.', content: ['Privacy Policy: what data you collect and why', 'Cookie Policy: GDPR requirements for cookies', 'Terms and Conditions: your rules of engagement', 'Accessibility Statement: legal requirement for some sites', 'Returns and Refunds Policy: required for e-commerce', 'Company information: registration number, address', 'When to use a cookie consent banner', 'Recommended free tools: Termly, iubenda'], premium: false },
  { slug: 'business-growth-template', title: 'Business Growth Planning Template', category: 'Growth', type: 'template', description: 'A one-page planning template for your next 90-day growth sprint.', content: ['Where you are now (revenue, clients, team)', 'Where you want to be in 90 days', 'Key growth levers for your business', 'What is working and should be doubled down on', 'What is not working and should be stopped', 'Three focus actions for the next 30 days', 'Metrics to track weekly', 'Monthly review prompts'], premium: false },
]

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return RESOURCES.filter(r => !r.premium).map(r => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resource = RESOURCES.find(r => r.slug === params.slug)
  if (!resource) return {}
  return {
    title: resource.title,
    description: resource.description,
    alternates: { canonical: `https://masuyodigital.com/resources/${params.slug}` },
  }
}

export default function ResourcePage({ params }: Props) {
  const resource = RESOURCES.find(r => r.slug === params.slug)
  if (!resource) notFound()

  return (
    <section className="py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mb-6 flex items-center gap-2">
          <Link href="/resources" className="text-sm flex items-center gap-1 transition-colors hover:opacity-70"
            style={{ color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 7H3M6.5 4L3 7l3.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Resources
          </Link>
          <span style={{ color: 'var(--border)' }}>/</span>
          <span className="text-sm" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>{resource.category}</span>
        </div>

        <span className="text-xs font-semibold px-2.5 py-1 rounded mb-4 inline-block"
          style={{ background: 'var(--light)', color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
          {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
        </span>

        <h1 className="text-3xl md:text-4xl font-semibold text-ink mb-4" style={{ fontFamily: 'Fraunces, serif' }}>{resource.title}</h1>
        <p className="text-base mb-10" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.75' }}>{resource.description}</p>

        <div className="rounded-lg p-6 mb-10" style={{ background: 'var(--light)', border: '1px solid var(--border)' }}>
          <h2 className="text-lg font-semibold text-ink mb-4" style={{ fontFamily: 'Fraunces, serif' }}>
            {resource.type === 'checklist' ? 'Checklist items' : resource.type === 'template' ? 'What is included' : 'What we cover'}
          </h2>
          <ul className="flex flex-col gap-3">
            {resource.content.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm" style={{ fontFamily: 'Geist, sans-serif', color: 'var(--ink)' }}>
                <svg className="flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7l3 3 6-6" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 rounded-lg" style={{ background: 'var(--navy)' }}>
          <h3 className="text-xl font-semibold text-white mb-2" style={{ fontFamily: 'Fraunces, serif' }}>
            Need help putting this into practice?
          </h3>
          <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif' }}>
            We work with businesses across the UK to implement exactly what is covered in these resources.
          </p>
          <Link href="/contact" className="inline-block text-sm font-semibold text-white px-5 py-2.5 rounded"
            style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
            Get in touch
          </Link>
        </div>
      </div>
    </section>
  )
}
