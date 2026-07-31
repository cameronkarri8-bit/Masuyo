/**
 * Single source of truth for estimate pricing.
 *
 * Shared by the full builder at /start-a-project and the mini estimator on the
 * homepage, so the two can never drift apart. Every price published anywhere on
 * the site should trace back to this file.
 */

/* --- Types ------------------------------------------------------------------ */

export type TabId = 'project' | 'features' | 'marketing' | 'scale' | 'timeline'

export interface Option {
  id: string
  label: string
  price: number
  monthly?: boolean
  desc?: string
  tooltip?: string
}

export interface LineItem {
  id: string
  label: string
  price: number
  monthly?: boolean
  tab: TabId
}

export interface SelState {
  project: string
  features: string[]
  marketing: string[]
  scale: string
  timeline: string
}

/* --- Data ------------------------------------------------------------------- */

export const PROJECT_TYPES: Option[] = [
  { id: 'new-website',       label: 'New Website',                      price: 249,  tooltip: 'A professionally designed and developed website built from scratch, tailored to your business goals and brand.' },
  { id: 'website-redesign',  label: 'Website Redesign',                 price: 349,  tooltip: 'A full rebuild of your existing website with improved design, performance, and user experience.' },
  { id: 'mobile-app',        label: 'Mobile App',                       price: 2500, tooltip: 'A native or cross-platform mobile application for iOS and Android, built around your users and business logic.' },
  { id: 'web-application',   label: 'Web Application',                  price: 3500, tooltip: 'A custom browser-based application with complex functionality, user accounts, and data management.' },
  { id: 'course-platform',   label: 'Course or Learning Platform',      price: 1800, tooltip: 'A fully featured online learning environment with course management, student progress tracking, and payment integration.' },
  { id: 'community-hub',     label: 'Community Hub or Member Portal',   price: 2200, tooltip: 'A private, branded online space for your members, customers, or team with content, discussion, and access control.' },
  { id: 'custom-crm',        label: 'Custom CRM or Business System',    price: 3000, tooltip: 'A bespoke internal platform built around your workflows, replacing spreadsheets and disconnected tools.' },
  { id: 'digital-marketing', label: 'Digital Marketing Campaign',       price: 299,  monthly: true, tooltip: 'A managed campaign across your chosen channels, built to drive traffic, leads, and conversions.' },
  { id: 'automation',        label: 'Automation Project',               price: 800,  tooltip: 'A targeted automation build that removes manual tasks from your business processes and connects your tools.' },
  { id: 'hosting',           label: 'Hosting and Maintenance',          price: 40,   monthly: true, tooltip: 'Managed hosting on our own infrastructure with updates, monitoring, backups, and technical support included.' },
]

export const FEATURES: Option[] = [
  { id: 'ecommerce',    label: 'E-commerce / Online Shop',            price: 400, tooltip: 'A fully integrated online store with product management, checkout, and payment processing.' },
  { id: 'booking',      label: 'Booking or Appointment System',       price: 250, tooltip: 'An online booking tool that lets customers schedule appointments, classes, or services directly.' },
  { id: 'cms-blog',     label: 'CMS / Blog',                          price: 150, tooltip: 'A content management system so your team can update pages, publish blog posts, and manage content without a developer.' },
  { id: 'members-area', label: 'Members Area or Login',               price: 600, tooltip: 'A secure, gated section of your site accessible only to registered or paying users.' },
  { id: 'resource-hub', label: 'Interactive Resource Hub',            price: 500, tooltip: 'A searchable library of guides, tools, and downloads with filtering, bookmarking, and gated premium content.' },
  { id: 'progress',     label: 'Student or Member Progress Tracking', price: 600, tooltip: 'A dashboard that shows users their progress through courses, modules, or membership milestones.' },
  { id: 'payment',      label: 'Payment Gateway',                     price: 200, tooltip: 'Secure online payment processing integrated into your site or application, supporting cards and digital wallets.' },
  { id: 'custom-forms', label: 'Custom Forms',                        price: 75,  tooltip: 'Tailored forms with conditional logic, validation, and automated notifications or CRM routing.' },
  { id: 'live-chat',    label: 'Live Chat Integration',               price: 75,  tooltip: 'A real-time chat widget connected to your support or sales team, with fallback to email or bot.' },
  { id: 'multilang',    label: 'Multi-language Support',              price: 400, tooltip: 'Full internationalisation of your site or app so content can be served in multiple languages.' },
  { id: 'api',          label: 'API Development or Integration',      price: 800, tooltip: 'Custom API build or third-party API connection to extend functionality and connect your platforms.' },
  { id: 'ai-chatbot',   label: 'AI Chatbot or Assistant',             price: 700, tooltip: 'An intelligent conversational assistant trained on your content to handle enquiries, support, or lead qualification.' },
]

export const MARKETING_GROWTH: Option[] = [
  { id: 'seo-setup',         label: 'SEO Setup',                                        price: 199,  tooltip: 'Technical SEO foundation including metadata, sitemap, schema markup, and Google Search Console configuration.' },
  { id: 'analytics',         label: 'Google Analytics and Tracking',                   price: 99,   tooltip: 'Full analytics implementation with goal tracking, event monitoring, and conversion reporting.' },
  { id: 'email-automation',  label: 'Email Marketing Automation',                      price: 300,  tooltip: 'Automated email sequences triggered by user behaviour, from welcome flows to re-engagement campaigns.' },
  { id: 'full-funnel',       label: 'Full Funnel Build (ads, landing page, email, CRM)', price: 1200, tooltip: 'End-to-end campaign build covering paid ads, landing page, email sequence, and CRM integration.' },
  { id: 'onboarding',        label: 'Automated Onboarding Workflows',                  price: 350,  tooltip: 'A structured automated journey that guides new customers or users from sign-up to active engagement.' },
  { id: 'review-gen',        label: 'Review Generation Automation',                    price: 200,  tooltip: 'Post-purchase or post-service automated sequences designed to drive Google and Trustpilot reviews.' },
  { id: 'abandoned',         label: 'Abandoned Enquiry Recovery',                      price: 250,  tooltip: 'Automated follow-up sequences that re-engage leads who made contact but did not convert.' },
  { id: 'social-auto',       label: 'Social Media Automation and Scheduling',          price: 300,  tooltip: 'Content planning, creation, and scheduling automation across your social channels.' },
  { id: 'crm-integration',   label: 'CRM Integration',                                 price: 400,  tooltip: 'Connection of your website or application to your CRM platform for seamless lead and customer data flow.' },
  { id: 'whatsapp-sms',      label: 'WhatsApp or SMS Automation',                      price: 300,  tooltip: 'Automated messaging via WhatsApp or SMS for confirmations, reminders, follow-ups, and campaigns.' },
  { id: 'seo-retainer',      label: 'Monthly SEO and Content Retainer',                price: 499,  monthly: true, tooltip: 'Ongoing SEO management, keyword targeting, and content production to grow organic traffic month on month.' },
  { id: 'auto-retainer',     label: 'Managed Automation Retainer',                     price: 599,  monthly: true, tooltip: 'A monthly retainer where we continuously build, optimise, and manage your business automations.' },
  { id: 'growth-retainer',   label: 'Growth Retainer (SEO, content, ads, reporting)',  price: 899,  monthly: true, tooltip: 'A comprehensive monthly package combining SEO, content, paid ads, and performance reporting.' },
]

export const SCALES: Option[] = [
  { id: 'small',      label: 'Small',      desc: '1 to 5 pages or basic scope',     price: 0,    tooltip: 'Suitable for straightforward projects with a clear, limited scope, typically up to 5 pages or a single core function.' },
  { id: 'medium',     label: 'Medium',     desc: '6 to 15 pages or moderate scope', price: 200,  tooltip: 'A moderate scope project with multiple sections, integrations, or content requirements, typically 6 to 15 pages.' },
  { id: 'large',      label: 'Large',      desc: '15+ pages or complex scope',      price: 500,  tooltip: 'A complex project with extensive page count, multiple integrations, custom functionality, or large content volumes.' },
  { id: 'enterprise', label: 'Enterprise', desc: 'Custom workflows, large team',    price: 1500, tooltip: 'A high-complexity build requiring bespoke architecture, large team access, advanced workflows, or phased delivery.' },
]

export const TIMELINES: Option[] = [
  { id: 'flexible',   label: 'Flexible (no rush)', price: 0,   tooltip: 'No fixed deadline. We work this into our schedule at the most efficient point, keeping costs lean.' },
  { id: '3-6-months', label: '3 to 6 months',      price: 0,   tooltip: 'A comfortable timeline that allows for thorough discovery, design, build, and testing without a rush premium.' },
  { id: '1-3-months', label: '1 to 3 months',      price: 300, tooltip: 'An accelerated timeline that requires dedicated resource allocation and priority scheduling.' },
  { id: 'asap',       label: 'ASAP',               price: 700, tooltip: 'Urgent delivery requiring immediate resource prioritisation and extended working hours to hit your deadline.' },
]
