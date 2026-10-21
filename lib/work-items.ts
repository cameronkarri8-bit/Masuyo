/* Generated from the checked screenshot manifests. Edit the copy here freely. */
import type { WorkItem } from './work'

export const WORK_ITEMS: WorkItem[] = [
  {
    "slug": "home-management-app",
    "name": "Home management app",
    "kind": "web-app",
    "published": true,
    "line": "A shared home base for households: running costs, upkeep and the daily jobs, in one app.",
    "tags": [
      "App",
      "Phone first",
      "Household money"
    ],
    "glance": "Bills, upkeep and household jobs in one shared app",
    "builtWith": "Next.js, Supabase, installable on a phone",
    "problem": "Household bills, long-term repairs and everyday jobs usually live in separate spreadsheets, calendars and group chats. This app keeps them in one shared place so everyone in the house can see what is due, what it costs and whose turn it is.",
    "features": [
      {
        "title": "The joint account number",
        "body": "Adds up every shared bill and pot contribution, works out what goes into the joint account by the next pay date and splits it between the adults.",
        "icon": "spreadsheet"
      },
      {
        "title": "Low point and renewals",
        "body": "Projects the account balance through the month to show its lowest point, and flags fixed terms such as broadband that are about to end.",
        "icon": "growth"
      },
      {
        "title": "Upkeep and the replacement curve",
        "body": "Tracks recurring jobs like the boiler service and gutters, then charts 25 years of expected costs against what each savings pot will hold.",
        "icon": "puzzle"
      },
      {
        "title": "Shared calendar",
        "body": "One month, week and list view of events, bills, bin days, meals and jobs, coloured by the person each entry belongs to.",
        "icon": "bookings"
      },
      {
        "title": "Household tasks",
        "body": "Jobs with due dates, repeats and rotating assignees, including children who have no login of their own.",
        "icon": "crm"
      },
      {
        "title": "Built for the phone",
        "body": "Installs as an app with a bottom tab bar, push reminders and an offline queue for changes made without signal.",
        "icon": "web-apps"
      }
    ],
    "underTheHood": "Built with Next.js 14, React 18 and TypeScript, styled with Tailwind CSS, running on Supabase for Postgres, sign-in and Edge Functions, installable as a web app with push notifications, and tested with Vitest and Playwright.",
    "images": [
      {
        "src": "/work/home-management-app/05-phone-today.webp",
        "alt": "Phone view of the Today dashboard with tonight's bins, an evening event, jobs to do and a bottom tab bar",
        "device": "phone",
        "width": 780,
        "height": 1688,
        "caption": "Today"
      },
      {
        "src": "/work/home-management-app/07-phone-shopping.webp",
        "alt": "Shopping list with quick add buttons for common items, a Start shopping button and items to tick off",
        "device": "phone",
        "width": 780,
        "height": 1688,
        "caption": "Shopping list"
      },
      {
        "src": "/work/home-management-app/08-phone-calendar.webp",
        "alt": "Calendar list for the week with bin days, a planned purchase, jobs with who is doing them, and a social event",
        "device": "phone",
        "width": 780,
        "height": 1688,
        "caption": "Calendar"
      },
      {
        "src": "/work/home-management-app/09-phone-meals.webp",
        "alt": "Meal plan for the week, with who is cooking each night and an empty slot asking what we are having",
        "device": "phone",
        "width": 780,
        "height": 1688,
        "caption": "Meal plan"
      },
      {
        "src": "/work/home-management-app/06-phone-bills.webp",
        "alt": "Phone view of the bills list showing mortgage, council tax, energy, water, broadband, home insurance and TV licence with monthly equivalents and next due dates",
        "device": "phone",
        "width": 780,
        "height": 1688,
        "caption": "Every bill with its monthly cost"
      },
      {
        "src": "/work/home-management-app/10-phone-pots.webp",
        "alt": "Savings pots for upkeep, big projects and an emergency fund, each with a monthly amount and progress bar",
        "device": "phone",
        "width": 780,
        "height": 1688,
        "caption": "Savings pots"
      }
    ],
    "display": "phone"
  },
  {
    "slug": "crm-and-client-portal",
    "name": "CRM and client portal",
    "kind": "web-app",
    "published": true,
    "line": "A sales CRM and client portal, from first email to proposal, contract, invoices and delivery.",
    "tags": [
      "CRM",
      "Client portal",
      "Invoicing",
      "Mobile first"
    ],
    "glance": "Leads, contracts, invoices and a client portal in one place",
    "builtWith": "Next.js, Supabase, Stripe",
    "problem": "Leads, conversations, proposals, project progress and invoices usually live in separate inboxes, spreadsheets and accounting tools. This brings them into one place that works on a phone, and gives clients a single page showing what they owe and where their project has got to.",
    "features": [
      {
        "title": "Outreach pipeline",
        "body": "Every lead moves through stages from not contacted to won, with whose turn it is, the next action and a follow-up date worked out from the emails logged.",
        "icon": "crm"
      },
      {
        "title": "Lead scoring and research",
        "body": "Each lead carries a score out of 100 broken down into pay, need, retainer, reach and risk, with the reason for each and the hook to open with.",
        "icon": "growth"
      },
      {
        "title": "Today screen",
        "body": "One list of replies waiting, follow-ups due, calls, unpaid invoices, tasks and proposals about to expire, with the action for each one beside it.",
        "icon": "bookings"
      },
      {
        "title": "Contracts and invoices",
        "body": "Each client has phases, a payment schedule and an invoice builder that only takes the next number when an invoice is issued, with PDF downloads and retainer drafts.",
        "icon": "document"
      },
      {
        "title": "Client portal",
        "body": "Clients sign in to see payments due, pay by card through Stripe Checkout, download receipts and follow phase progress and updates, which refresh live as they change.",
        "icon": "web-apps"
      },
      {
        "title": "Campaign board",
        "body": "Separate outreach campaigns track each business from finding its handle to posting, with filters, scores, a daily DM limit and follow-ups due.",
        "icon": "enquiries"
      }
    ],
    "underTheHood": "Built with Next.js 16, React 19, TypeScript and Tailwind CSS 4, on Supabase for the database, sign in, file storage, realtime updates and edge functions, with Stripe Checkout for card payments, React PDF for invoices and Resend for email.",
    "images": [
      {
        "src": "/work/crm-and-client-portal/01-desktop-outreach.webp",
        "alt": "Outreach list of leads with stage badges, whose turn it is, the next action and due date, emails sent and received, a score and a one tap action for each row",
        "device": "desktop",
        "width": 1600,
        "height": 1000,
        "caption": "The outreach list, sorted by what needs attention"
      },
      {
        "src": "/work/crm-and-client-portal/02-desktop-lead-detail.webp",
        "alt": "Lead page for a driving school showing a stage bar at Proposal sent, quick actions, the email conversation with notes and a research card with a score breakdown",
        "device": "desktop",
        "width": 1600,
        "height": 1000,
        "caption": "A lead with its conversation, stage and score"
      },
      {
        "src": "/work/crm-and-client-portal/03-desktop-client-invoices.webp",
        "alt": "Client account for a bakery on the Invoices tab, listing sent, paid and planned invoices with amounts, status badges, PDF and preview links",
        "device": "desktop",
        "width": 1600,
        "height": 1000,
        "caption": "A client's invoices, from planned to paid"
      },
      {
        "src": "/work/crm-and-client-portal/04-desktop-campaign-board.webp",
        "alt": "Campaign board with totals for each status, reply rate, DMs sent today against the daily limit, filters and a table of local businesses with scores and status",
        "device": "desktop",
        "width": 1600,
        "height": 1000,
        "caption": "A campaign board for social media outreach"
      }
    ]
  },
  {
    "slug": "computer-repair-shop",
    "name": "Computer repair shop",
    "kind": "website",
    "published": true,
    "line": "A mobile first website and repair booking flow for a computer and laptop repair shop.",
    "tags": [
      "Website",
      "Bookings",
      "Mobile first",
      "Local search"
    ],
    "glance": "Repair bookings, plus every service and area page from one set of content",
    "builtWith": "Next.js, TypeScript, typed content files",
    "problem": "Customers with a broken device need to find the right repair service quickly and book it in without phoning during opening hours. The shop needs every service and local area page generated from one set of content so it stays consistent and easy to update.",
    "features": [
      {
        "title": "Repair ticket on the homepage",
        "body": "Visitors pick the device, describe the fault and choose drop off, call-out or remote help, and those choices carry straight into the booking flow.",
        "icon": "bookings"
      },
      {
        "title": "Six step booking flow",
        "body": "A guided form covers device, make and model, fault, how it reaches the shop and contact details, with clear error messages and a live ticket summary that shows the diagnostic fee before confirming.",
        "icon": "enquiries"
      },
      {
        "title": "Service pages from one template",
        "body": "Fifteen repair service pages and the local area pages are built from typed content files, each with an on this page menu, common faults, how it works and FAQs.",
        "icon": "websites"
      },
      {
        "title": "Sticky Call and Book bar",
        "body": "On phones a bottom bar with Call and Book appears once the header scrolls away and hides whenever another main button is on screen.",
        "icon": "speed"
      },
      {
        "title": "Prebuilt PCs",
        "body": "A custom and prebuilt PC section lists tested specifications with their own detail pages and an enquiry route instead of a cart.",
        "icon": "shop"
      },
      {
        "title": "Private staging previews",
        "body": "A staging mode puts the whole site behind a password and tells search engines not to index it, while production stays open and indexable.",
        "icon": "security"
      }
    ],
    "underTheHood": "Built with Next.js 16 and React 19 in TypeScript, styled with Tailwind CSS 4 mapped to a set of brand design tokens, with all copy in typed content files and Playwright scripts for layout, accessibility and booking flow checks.",
    "images": [
      {
        "src": "/work/computer-repair-shop/01-desktop-home.webp",
        "alt": "Homepage hero with a large headline for computer and laptop repairs and a repair ticket card where a laptop and drop off have been selected",
        "device": "desktop",
        "width": 1600,
        "height": 1000,
        "caption": "Homepage hero with the quick repair ticket"
      },
      {
        "src": "/work/computer-repair-shop/02-desktop-repair-service.webp",
        "alt": "Laptop repairs service page with breadcrumbs, headline, intro copy, Book a repair and Call buttons and a photo of a laptop being repaired",
        "device": "desktop",
        "width": 1600,
        "height": 1000,
        "caption": "A repair service page built from the shared template"
      },
      {
        "src": "/work/computer-repair-shop/03-desktop-book-review.webp",
        "alt": "Final step of the booking flow showing a progress bar at step 6 of 6 and a repair ticket summarising device, make, fault, drop off, contact details and the diagnostic fee",
        "device": "desktop",
        "width": 1600,
        "height": 1000,
        "caption": "Booking flow review step with the live ticket"
      },
      {
        "src": "/work/computer-repair-shop/04-desktop-prebuilt-pcs.webp",
        "alt": "Custom and prebuilt PCs page showing how builds are put together and three prebuilt specification cards",
        "device": "desktop",
        "width": 1600,
        "height": 1000,
        "caption": "Prebuilt PC specifications"
      }
    ]
  },
  {
    "slug": "leadership-training-platform",
    "name": "Leadership training platform",
    "kind": "web-app",
    "published": false,
    "line": "An online training platform with video courses, quizzes, cohorts and certificates.",
    "tags": [
      "Web app",
      "E-learning",
      "Payments"
    ],
    "glance": "Courses, cohorts, quizzes and certificates, with paid enrolment",
    "builtWith": "Next.js, Supabase, Stripe",
    "problem": "Training providers need one place to sell self paced courses, track each learner's progress and run group cohorts, without stitching together separate video, payment and community tools.",
    "features": [
      {
        "title": "Learner dashboard",
        "body": "Shows enrolled courses with per course progress, lessons completed, certificates, upcoming cohort sessions, community posts and recent notes.",
        "icon": "growth"
      },
      {
        "title": "Course player and progress",
        "body": "Modules and lessons with video, mark complete tracking and a progress bar worked out from every lesson in the course.",
        "icon": "web-apps"
      },
      {
        "title": "Quizzes and certificates",
        "body": "Multiple choice quizzes with instant feedback and a pass mark, and a certificate issued automatically once every lesson is complete.",
        "icon": "puzzle"
      },
      {
        "title": "Lesson notes and workbooks",
        "body": "Learners keep autosaved notes against each lesson and download course workbooks.",
        "icon": "document"
      },
      {
        "title": "Paid enrolment",
        "body": "Course pages lead to a Stripe checkout, including paying as a guest and setting a password afterwards, while free courses enrol straight away.",
        "icon": "shop"
      },
      {
        "title": "Admin and coach tools",
        "body": "Admins see users, enrolments, revenue and certificates and manage courses, quizzes, bundles and announcements, while coaches run cohorts and students.",
        "icon": "crm"
      }
    ],
    "underTheHood": "Built with Next.js 16 and React 19 on Supabase for auth and data, with Stripe for payments, Resend for email, Tailwind CSS and lucide icons.",
    "images": [
      {
        "src": "/work/leadership-training-platform/01-desktop-learner-dashboard.webp",
        "alt": "Learner dashboard with progress stats, a course table with progress bars, upcoming live sessions, community posts and notes",
        "device": "desktop",
        "width": 1600,
        "height": 1000,
        "caption": "Learner dashboard"
      },
      {
        "src": "/work/leadership-training-platform/02-desktop-lesson-notes.webp",
        "alt": "Lesson page with a module and lesson list, video player, lesson notes, a quiz prompt and a mark complete button",
        "device": "desktop",
        "width": 1600,
        "height": 1336,
        "caption": "Lesson with notes and quiz"
      },
      {
        "src": "/work/leadership-training-platform/03-desktop-quiz.webp",
        "alt": "Multiple choice quiz question with the correct answer highlighted in green and a progress bar showing question 2 of 5",
        "device": "desktop",
        "width": 1600,
        "height": 1000,
        "caption": "Module quiz with instant feedback"
      },
      {
        "src": "/work/leadership-training-platform/04-desktop-course-enrol.webp",
        "alt": "Public course page showing modules and lessons, a generated course cover, price and an Enroll Now button",
        "device": "desktop",
        "width": 1600,
        "height": 1000,
        "caption": "Course page and enrolment"
      },
      {
        "src": "/work/leadership-training-platform/05-desktop-admin-dashboard.webp",
        "alt": "Admin dashboard with totals for users, courses, enrolments and certificates, enrolments by course and recent signups",
        "device": "desktop",
        "width": 1600,
        "height": 1000,
        "caption": "Admin overview"
      },
      {
        "src": "/work/leadership-training-platform/06-phone-course-content.webp",
        "alt": "Phone view of the course content sheet showing course progress and the module list with completed lessons",
        "device": "phone",
        "width": 780,
        "height": 1688,
        "caption": "Course content on a phone"
      }
    ]
  }
]
