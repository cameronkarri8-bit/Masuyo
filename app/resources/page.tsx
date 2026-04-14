'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import RevealAnimation from '@/components/RevealAnimation'

/* ─── Types ─────────────────────────────────────────────── */
interface Resource {
  id: string
  title: string
  description: string
  category: string
  type: 'guide' | 'checklist' | 'template' | 'toolkit'
  premium: boolean
  slug: string
  content: string[]   // bullet points for the resource detail
}

/* ─── Resource data ─────────────────────────────────────── */
const RESOURCES: Resource[] = [
  // Business Setup
  {
    id: 'r1', title: 'UK Business Launch Checklist', category: 'Business Setup', type: 'checklist', premium: false, slug: 'uk-business-launch-checklist',
    description: 'Everything you need to do before, during, and after registering your UK business — from Companies House to HMRC to your first invoice.',
    content: ['Register with Companies House (Ltd) or HMRC (sole trader)', 'Set up a business bank account', 'Register for VAT if turnover exceeds £90,000', 'Get relevant insurance (public liability, professional indemnity)', 'Set up accounting software (Xero, QuickBooks, or FreeAgent)', 'Create a basic contract template for clients', 'Open a business email address', 'Secure your domain name', 'Set up your Google Business Profile', 'Register for Self Assessment (sole trader) or PAYE (Ltd)', 'Draft terms and conditions for your website', 'Create a simple cash flow forecast'],
  },
  {
    id: 'r2', title: 'Choosing Your Business Structure Guide', category: 'Business Setup', type: 'guide', premium: false, slug: 'choosing-business-structure',
    description: 'Sole trader, limited company, or partnership? This guide walks through the pros, cons, and tax implications of each for UK businesses.',
    content: ['Sole trader: simple setup, personal liability, class 2 NI', 'Limited company: separate legal entity, more admin, often lower tax', 'Partnership: shared ownership, joint liability', 'When to switch from sole trader to Ltd', 'Director salary vs dividends explained', 'IR35 considerations for contractors', 'Key questions to ask your accountant'],
  },
  {
    id: 'r3', title: 'Brand Identity Starter Kit', category: 'Business Setup', type: 'toolkit', premium: true, slug: 'brand-identity-starter-kit',
    description: 'A practical toolkit covering brand positioning, tone of voice, visual identity basics, and the essential brand assets every business needs.',
    content: ['What is a brand and why it matters', 'Defining your brand values (worksheet)', 'Identifying your target audience', 'Crafting a one-line positioning statement', 'Choosing brand colours and fonts', 'Logo types and when to use each', 'Building a basic brand guidelines document', 'Social media profile image sizes', 'Email signature best practices'],
  },

  // Marketing
  {
    id: 'r4', title: 'SEO Quick-Start Checklist for New Websites', category: 'Marketing', type: 'checklist', premium: false, slug: 'seo-quick-start-checklist',
    description: 'The essential on-page SEO tasks to complete when launching a new website. Covers meta data, headings, images, speed, and local SEO.',
    content: ['Set up Google Search Console', 'Set up Google Analytics 4', 'Write unique title tags for every page (under 60 characters)', 'Write meta descriptions for every page (under 155 characters)', 'Use one H1 per page', 'Add alt text to all images', 'Compress images before upload', 'Create and submit an XML sitemap', 'Set up Google Business Profile for local businesses', 'Ensure site loads in under 3 seconds', 'Check mobile usability in Search Console', 'Build at least 3–5 core pages of quality content'],
  },
  {
    id: 'r5', title: 'Google Ads Starter Guide for UK Businesses', category: 'Marketing', type: 'guide', premium: true, slug: 'google-ads-starter-guide',
    description: 'How to set up and run your first Google Ads campaign without wasting budget. Includes keyword strategy, match types, bidding, and tracking.',
    content: ['Understanding search vs display vs shopping', 'Setting up conversion tracking', 'Keyword research with Google Keyword Planner', 'Match types: broad, phrase, exact explained', 'Negative keywords — the most important list you will build', 'Writing ad copy that converts', 'Setting a realistic budget', 'Quality Score and how to improve it', 'Smart bidding vs manual bidding', 'Reading your first report'],
  },
  {
    id: 'r6', title: 'Email Marketing Campaign Template Pack', category: 'Marketing', type: 'template', premium: true, slug: 'email-marketing-template-pack',
    description: 'Ready-to-use email templates for welcome sequences, monthly newsletters, re-engagement campaigns, and post-purchase follow-ups.',
    content: ['Welcome email sequence (5 emails)', 'Monthly newsletter structure', 'Promotional campaign template', 'Re-engagement email sequence (3 emails)', 'Post-purchase follow-up template', 'Subject line formula guide', 'When to send (day and time data)', 'List hygiene best practices'],
  },
  {
    id: 'r7', title: 'Social Media Content Calendar Template', category: 'Marketing', type: 'template', premium: false, slug: 'social-media-content-calendar',
    description: 'A 90-day content calendar template with content pillars, posting frequency guidance, and caption formulas for LinkedIn, Instagram, and Facebook.',
    content: ['Setting your content pillars (3–5 topics)', 'Recommended posting frequency by platform', 'Content mix: educational, promotional, social proof, behind the scenes', '90-day calendar template', 'Caption formulas for each content type', 'Hashtag strategy for UK businesses', 'How to batch content creation', 'Tools for scheduling: Buffer, Later, Hootsuite'],
  },

  // Finance
  {
    id: 'r8', title: 'Cash Flow Forecast Template (12-Month)', category: 'Finance', type: 'template', premium: false, slug: 'cash-flow-forecast-template',
    description: 'A straightforward 12-month cash flow template for UK small businesses. Track income, outgoings, and forecast your position month by month.',
    content: ['Monthly income by source', 'Fixed costs (rent, software, insurance)', 'Variable costs (materials, contractors, ads)', 'Tax provisions (VAT, corporation tax, income tax)', 'Closing balance forecast', 'How to use the forecast to make decisions', 'Warning signs in your cash flow', 'When to speak to an accountant'],
  },
  {
    id: 'r9', title: 'Pricing Your Services Guide', category: 'Finance', type: 'guide', premium: true, slug: 'pricing-your-services-guide',
    description: 'How to price your services with confidence. Covers cost-plus pricing, value-based pricing, day rates, retainers, and how to raise your prices.',
    content: ['Why most small businesses undercharge', 'Cost-plus pricing explained', 'Value-based pricing: charge for outcomes, not time', 'How to calculate your minimum viable day rate', 'Retainers vs project fees', 'Writing proposals that justify your price', 'Handling the "that is too expensive" objection', 'How and when to raise your prices'],
  },

  // Technology
  {
    id: 'r10', title: 'Tech Stack Guide for Small Businesses', category: 'Technology', type: 'guide', premium: false, slug: 'tech-stack-guide',
    description: 'The essential software every UK small business needs — accounting, CRM, communication, project management — with recommendations and alternatives.',
    content: ['Accounting: Xero vs QuickBooks vs FreeAgent', 'CRM: HubSpot Free vs Pipedrive vs Notion', 'Email: Google Workspace vs Microsoft 365', 'Project management: Trello vs Asana vs ClickUp', 'Communication: Slack vs Teams', 'Video calls: Zoom vs Google Meet', 'E-signatures: DocuSign vs SignNow', 'Storage: Google Drive vs Dropbox', 'Invoicing: built-in accounting vs Stripe'],
  },
  {
    id: 'r11', title: 'Website Brief Template', category: 'Technology', type: 'template', premium: false, slug: 'website-brief-template',
    description: 'A structured brief template to help you define exactly what you want from a new website before speaking to a developer or agency.',
    content: ['Business overview (one paragraph)', 'Goals for the website', 'Target audience description', 'Competitor websites you like and why', 'Pages and sections you need', 'Content you already have', 'Content you need help with', 'Design preferences and brand assets', 'Technical requirements', 'Timeline and budget range'],
  },
  {
    id: 'r12', title: 'Automation Opportunities Audit', category: 'Technology', type: 'checklist', premium: true, slug: 'automation-opportunities-audit',
    description: 'A self-assessment checklist to identify where automation can save your business the most time and money — with tool recommendations.',
    content: ['Lead capture and follow-up', 'Client onboarding documents', 'Invoice generation and payment reminders', 'Appointment booking and reminders', 'Internal reporting and dashboards', 'Social media scheduling', 'Email marketing sequences', 'Data entry between systems (Zapier/Make)', 'Payroll and expenses', 'Customer support responses'],
  },

  // Legal
  {
    id: 'r13', title: 'Website Legal Pages Checklist', category: 'Legal', type: 'checklist', premium: false, slug: 'website-legal-pages-checklist',
    description: 'The legal pages every UK business website must have — with plain-English explanations of what goes in each one.',
    content: ['Privacy Policy: what data you collect and why', 'Cookie Policy: GDPR requirements for cookies', 'Terms and Conditions: your rules of engagement', 'Accessibility Statement: legal requirement for some sites', 'Returns and Refunds Policy: required for e-commerce', 'Company information: registration number, address', 'When to use a cookie consent banner', 'Recommended free tools: Termly, iubenda'],
  },
  {
    id: 'r14', title: 'Freelancer Client Contract Template Guide', category: 'Legal', type: 'guide', premium: true, slug: 'freelancer-contract-guide',
    description: 'What to include in a client contract to protect yourself as a UK freelancer or agency — covering scope, payment, IP ownership, and kill fees.',
    content: ['Why you need a contract (and why a verbal agreement is not enough)', 'Scope of work: how to write it clearly', 'Payment terms: deposits, milestones, net 30', 'Intellectual property: who owns what', 'Revision and change request policy', 'Kill fee: protecting your time on abandoned projects', 'Liability limitation clauses', 'Dispute resolution', 'Where to get contracts reviewed cheaply'],
  },

  // Growth
  {
    id: 'r15', title: 'Lead Generation Playbook for Service Businesses', category: 'Growth', type: 'guide', premium: true, slug: 'lead-generation-playbook',
    description: 'A practical playbook for service businesses looking to generate a consistent flow of qualified leads — without relying on word of mouth alone.',
    content: ['Why referrals alone are not a strategy', 'Defining your ideal client', 'Building a lead generation funnel', 'Lead magnets that work for service businesses', 'Landing page essentials', 'Google Ads for service businesses', 'LinkedIn outreach strategy', 'Email nurture sequences', 'Tracking your cost per lead', 'Scaling what works'],
  },
  {
    id: 'r16', title: 'Business Growth Planning Template', category: 'Growth', type: 'template', premium: false, slug: 'business-growth-template',
    description: 'A simple one-page planning template to set growth goals, identify what is working, and build a focused action plan for the next 90 days.',
    content: ['Where you are now (revenue, clients, team)', 'Where you want to be in 90 days', 'Key growth levers for your business', 'What is working and should be doubled down on', 'What is not working and should be stopped', 'Three focus actions for the next 30 days', 'Metrics to track weekly', 'Monthly review prompts'],
  },
]

const CATEGORIES = ['All', ...Array.from(new Set(RESOURCES.map(r => r.category)))]
const TYPE_ICONS: Record<string, string> = { guide: '📖', checklist: '✅', template: '📄', toolkit: '🧰' }

function ResourceCard({ resource, bookmarked, onBookmark, onUnlock, unlocked }: {
  resource: Resource
  bookmarked: boolean
  onBookmark: (id: string) => void
  onUnlock: (id: string, email: string) => void
  unlocked: boolean
}) {
  const [showUnlock, setShowUnlock] = useState(false)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  function handleUnlock(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes('@') || !email.includes('.')) {
      setEmailError('Please enter a valid email address.')
      return
    }
    onUnlock(resource.id, email)
    setShowUnlock(false)
    setEmail('')
    setEmailError('')
  }

  const isPremiumLocked = resource.premium && !unlocked

  return (
    <div className="flex flex-col rounded-lg overflow-hidden transition-colors hover:bg-light"
      style={{ border: '1px solid var(--border)', background: 'var(--white)' }}>
      <div className="p-6 flex flex-col flex-1 gap-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold px-2 py-0.5 rounded"
              style={{ background: 'var(--light)', color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
              {resource.category}
            </span>
            <span className="text-xs" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
              {TYPE_ICONS[resource.type]} {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
            </span>
          </div>
          <button onClick={() => onBookmark(resource.id)} className="flex-shrink-0 transition-colors hover:opacity-70"
            title={bookmarked ? 'Remove bookmark' : 'Save'}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill={bookmarked ? 'var(--navy)' : 'none'}>
              <path d="M4 3h10a1 1 0 011 1v11.5l-6-3-6 3V4a1 1 0 011-1z" stroke="var(--navy)" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Title */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base font-semibold text-ink leading-snug" style={{ fontFamily: 'Fraunces, serif' }}>
              {resource.title}
            </h3>
            {resource.premium && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded flex-shrink-0"
                style={{ background: 'rgba(53,173,223,0.1)', color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
                Premium
              </span>
            )}
          </div>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>{resource.description}</p>
        </div>

        {/* Action */}
        <div className="mt-auto">
          {isPremiumLocked ? (
            <>
              {showUnlock ? (
                <form onSubmit={handleUnlock} className="flex flex-col gap-2">
                  <p className="text-xs" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                    Enter your email to unlock this resource for free.
                  </p>
                  <input type="email" value={email} onChange={e => { setEmail(e.target.value); setEmailError('') }}
                    placeholder="you@example.com"
                    className="w-full px-3 py-2 text-sm rounded outline-none"
                    style={{ border: `1px solid ${emailError ? '#dc2626' : 'var(--border)'}`, fontFamily: 'Geist, sans-serif' }} />
                  {emailError && <p className="text-xs" style={{ color: '#dc2626', fontFamily: 'Geist, sans-serif' }}>{emailError}</p>}
                  <div className="flex gap-2">
                    <button type="submit" className="flex-1 text-sm font-semibold text-white py-2 rounded"
                      style={{ background: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>Unlock</button>
                    <button type="button" onClick={() => setShowUnlock(false)}
                      className="text-sm px-3 py-2 rounded" style={{ border: '1px solid var(--border)', color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>Cancel</button>
                  </div>
                </form>
              ) : (
                <button onClick={() => setShowUnlock(true)}
                  className="w-full text-sm font-semibold py-2.5 rounded flex items-center justify-center gap-2 transition-colors"
                  style={{ border: '1px solid var(--border)', color: 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect x="2" y="6" width="10" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M4.5 6V4.5a2.5 2.5 0 015 0V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  Unlock free
                </button>
              )}
            </>
          ) : (
            <Link href={`/resources/${resource.slug}`}
              className="w-full text-sm font-semibold text-white py-2.5 rounded flex items-center justify-center gap-2 transition-colors"
              style={{ background: 'var(--navy)', fontFamily: 'Geist, sans-serif' }}>
              View resource
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7.5 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Page ──────────────────────────────────────────────── */
export default function ResourcesPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [bookmarks, setBookmarks] = useState<string[]>([])
  const [unlocked, setUnlocked] = useState<string[]>([])
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false)

  // Load from localStorage
  useEffect(() => {
    const b = localStorage.getItem('masuyo_bookmarks')
    if (b) setBookmarks(JSON.parse(b))
    const u = localStorage.getItem('masuyo_unlocked')
    if (u) setUnlocked(JSON.parse(u))
  }, [])

  function handleBookmark(id: string) {
    setBookmarks(prev => {
      const next = prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
      localStorage.setItem('masuyo_bookmarks', JSON.stringify(next))
      return next
    })
  }

  function handleUnlock(id: string, email: string) {
    // Store email in localStorage so we never ask again
    const key = `masuyo_email_${id}`
    localStorage.setItem(key, email)
    setUnlocked(prev => {
      const next = [...prev, id]
      localStorage.setItem('masuyo_unlocked', JSON.stringify(next))
      return next
    })
  }

  const filtered = RESOURCES.filter(r => {
    const matchCat = activeCategory === 'All' || r.category === activeCategory
    const matchSearch = !search || r.title.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase()) || r.category.toLowerCase().includes(search.toLowerCase())
    const matchBookmark = !showBookmarksOnly || bookmarks.includes(r.id)
    return matchCat && matchSearch && matchBookmark
  })

  return (
    <>
      {/* Hero */}
      <section className="crosshatch-bg pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24">
          <div className="max-w-2xl">
            <RevealAnimation>
              <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4 leading-tight" style={{ fontFamily: 'Fraunces, serif' }}>
                Free resources for growing businesses
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={1}>
              <p className="text-lg" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, sans-serif' }}>
                Guides, templates, checklists, and toolkits to help you build and grow your business. No fluff. Just useful.
              </p>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Search + filter bar */}
      <section className="py-8 sticky top-16 z-40" style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="4.5" stroke="var(--mid)" strokeWidth="1.5" />
                <path d="M10.5 10.5l2.5 2.5" stroke="var(--mid)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search resources…"
                className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg outline-none"
                style={{ border: '1px solid var(--border)', fontFamily: 'Geist, sans-serif', color: 'var(--ink)' }} />
            </div>
            {/* Bookmark toggle */}
            <button onClick={() => setShowBookmarksOnly(s => !s)}
              className="text-sm font-medium flex items-center gap-2 px-4 py-2.5 rounded-lg transition-colors"
              style={{ border: `1px solid ${showBookmarksOnly ? 'var(--navy)' : 'var(--border)'}`, background: showBookmarksOnly ? 'var(--navy)' : 'var(--white)', color: showBookmarksOnly ? '#fff' : 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill={showBookmarksOnly ? '#fff' : 'none'}>
                <path d="M3 2h8a.75.75 0 01.75.75V12l-4.75-2.5L2.25 12V2.75A.75.75 0 013 2z" stroke={showBookmarksOnly ? '#fff' : 'var(--navy)'} strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
              Saved ({bookmarks.length})
            </button>
          </div>
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mt-4">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className="text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
                style={{ background: activeCategory === cat ? 'var(--navy)' : 'var(--light)', color: activeCategory === cat ? '#fff' : 'var(--ink)', fontFamily: 'Geist, sans-serif' }}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-base" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                No resources match your search. Try a different term or category.
              </p>
            </div>
          ) : (
            <>
              <p className="text-xs mb-6" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
                Showing {filtered.length} resource{filtered.length !== 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(r => (
                  <ResourceCard key={r.id} resource={r}
                    bookmarked={bookmarks.includes(r.id)}
                    onBookmark={handleBookmark}
                    unlocked={unlocked.includes(r.id)}
                    onUnlock={handleUnlock} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}
