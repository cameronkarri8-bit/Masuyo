# Masuyo website copy and layout spec

> **Read this first.** This is the page by page copy and layout spec for the new masuyodigital.com. It is the source of truth for **words, page structure, sections, layout and behaviour**. It was written before the brand guidelines were finalised, so for anything **visual** (fonts, colours, where aqua may appear, icon and illustration style, label styling, letter case) the attached **Masuyo brand guidelines PDF wins**. The build prompt lists every known conflict and how to resolve it. Bracketed fields such as `[confirm]` or `[client quote]` are handled exactly as the build prompt's placeholder policy says. Never publish a bracket.


Oct 6, 2026 · @Cameron Karri

## How to read this tab

This is the full copy for the new site, page by page, with the layout and design decisions written next to the words they belong to. It follows the audit on the first tab: three offers, nine core pages, no price in headlines, proof over claims.

**Who every page is written for.** The owner or director of a UK business with 3 to 25 staff. They are busy, sceptical of agencies, and read on a phone between jobs. They do not know what an API is and should never need to. They care about three things: will this save me time, will it bring in work, and can I trust the person doing it.

**How each section is laid out in this tab**

- **Layout** explains what sits where on desktop and how it stacks on a phone.
- **Copy** is the exact wording, labelled by element: `Eyebrow` (small label above a heading), `H1` or `H2` (headings), `Body`, `Button`, `Link`.
- **Visual** describes the image, illustration or infographic, and why it is there.
- **Behaviour** covers anything that moves, opens, changes on hover or responds to the visitor.
- **Why** gives the reasoning in a sentence, so anyone building or editing the page understands the intent and does not undo it.

**Bracketed fields** like `[client quote]` are things only you can supply. They stay out of the live site until filled with something real and approved. Prices use the ranges proposed in the audit and are marked `[confirm]` until you sign them off.

**Writing rules applied throughout:** short sentences, British English, no long dashes, no "actually", "properly" or "seamless", one idea per section, and the visitor's problem named in their own words.

## Global elements

These appear on every page, so they are defined once here and referred to by name later.

### Brand and design system

- **Wordmark.** The lowercase masuyo. from the Chalkline pack, top left of every page. The aqua full stop is the one playful detail and should never be animated or enlarged.
- **Colour.** Petrol blue for headings, the footer and dark sections. Aqua only for buttons, links, focus rings and the single highlight on a diagram. Everything else is white, off white and one mid grey for secondary text. If aqua appears more than twice on a screen, it stops meaning "click here".
- **Type.** One sans serif family for everything (Geist, already in the build), plus its mono cut for small labels such as eyebrows, step numbers and the stack list. The mono labels are what make the site read as a technology company rather than a design agency.
- **Spacing.** Generous. Each section has one job and plenty of space around it. On desktop, text never runs wider than about 65 characters a line.
- **Imagery.** Real product screens shown in clean device frames, and simple line diagrams drawn in the brand colours. No stock photos of handshakes, laptops on desks or people pointing at screens. Where a screen is not yet approved for use, use a diagram instead of a fake screenshot.
- **Street culture, the 20%.** Shown in details only: the mono labels, tight letter spacing on large headings, a slightly bolder weight on H1s, and short, confident lines. Never in slang or graffiti styling on the website.
- **Motion.** Sections fade up a few pixels as they enter the screen, once. Nothing loops, bounces or counts up. Anyone with reduced motion turned on sees no animation at all.

### Navigation (header)

**Layout.** A single row, 72px tall, white with a thin grey line underneath once the visitor scrolls. Wordmark on the left, six links in the centre, one button on the right. It stays fixed at the top while scrolling. On a phone it becomes the wordmark and a menu icon; tapping the icon opens a full screen panel.

**Copy**

- Links: `Websites` · `Systems` · `Care` · `Work` · `Pricing` · `Resources`
- `Button` (primary): Start a project
- Mobile panel adds, under the links: `Link` hello@masuyodigital.com

**Behaviour.** No dropdowns. Each link goes straight to its page, and the current page's link is shown in petrol with a short aqua underline. The mobile panel lists the links in large type, with the button pinned to the bottom of the screen where a thumb reaches it.

**Why.** Six words a visitor can understand in two seconds beat a menu of 45 services. Every service still has a home, one click down.

### Footer

**Layout.** Petrol background, white text. Four short columns on desktop, stacked on a phone. A slim bar at the very bottom holds the legal links.

**Copy**

- Brand column: wordmark, then `Body` We build the websites, systems and automation that growing businesses run on. Based in Lancashire, working with businesses across the North West and beyond.
- Column `What we do`: Websites, Systems, Care, Pricing
- Column `Company`: Work, Approach, Start a project
- Column `Learn`: Resources, Web design in Preston
- Column `Talk to us`: hello@masuyodigital.com, then `Body` Replies within one working day.
- Bottom bar: © 2026 Masuyo Digital · Privacy · Terms

**Why.** The old footer linked 48 pages and became a second sitemap. This one links only what a visitor might look for, which makes the brand look more focused.

### Buttons and links

| Element | Look | Used for | Wording rule |
| --- | --- | --- | --- |
| Primary button | Solid aqua, petrol text, rounded corners | The one action the page wants, usually Start a project | A verb plus an object, three words at most |
| Secondary button | Petrol outline, petrol text | The second best action, usually See our work | Same rule |
| Text link | Petrol text with a small arrow that moves 2px on hover | Moving deeper into a topic | Says where it goes: "How Care works", never "Learn more" |

One primary button per screen, never two side by side. Every button has a visible focus ring for keyboard users.

### The closing band (used at the foot of every main page)

**Layout.** A full width petrol band before the footer. Heading and one line on the left, primary button on the right. Stacks on a phone with the button full width.

**Copy**

- `H2`: What is slowing the business down?
- `Body`: Tell us in a few lines. You will get a straight answer on whether we can help, usually the same day.
- `Button`: Start a project

**Why.** It replaces the old band that restated "one senior person" on every page. This asks a question the visitor can answer, which is easier to act on than a promise.

### Forms and microcopy

- Labels sit above fields, never inside them, so they stay visible while typing.
- Optional fields say "(optional)". Required fields are not marked, because nearly all are required.
- Error messages say what to do: "Add an email so we can reply", not "Invalid input".
- The submit button repeats the outcome: "Send my brief", not "Submit".

## Site map and visitor journey

The site has one destination, Start a project, and every page is designed to move a visitor one step closer to it.

Diagram (described): four stages left to right. Arrive: Home, Resources, Sector pages, Preston page. Understand: Websites, Systems, Care. Trust: Work, Approach, Pricing. Act: Start a project (the one highlighted destination, with "Reply within one working day" under it). A dashed shortcut runs from Arrive straight to Act, labelled "The closing band on every page links straight to Start a project".

Most visitors arrive through Google on a Resources article, a sector page or the Preston page, not the homepage. That is why each of those pages carries the global closing band and links to the matching offer page. A visitor who is ready can jump straight to Start a project from anywhere; a visitor who needs convincing moves through an offer page and then Work, Approach or Pricing first.

## Home

The homepage has one job: make a business owner think "that's my problem, and these people fix it" within ten seconds, then point them to the right offer or to Start a project.

- `Page title`: Masuyo | Websites, systems and automation for growing businesses
- `Meta description`: We build the websites, custom systems and automation that growing UK businesses run on. Designed, built and looked after by one senior engineer.

### 1. Hero

**Layout.** Two columns on desktop: words on the left (about 55% of the width), a visual on the right. The section fills most of the first screen but not all of it, so the top of the next section peeks in and invites a scroll. On a phone the words come first and the visual sits below, cropped to its centre.

**Copy**

- `Eyebrow` (mono): Websites · Systems · Automation
- `H1`: We build the technology your business runs on.
- `Body`: Websites, custom systems and automation for growing businesses that have outgrown spreadsheets and off the shelf tools. Designed, built and looked after by one senior engineer.
- `Button` (primary): Start a project
- `Button` (secondary): See our work
- `Small print` under the buttons: Based in Lancashire. Replies within one working day.

**Visual.** A clean, flat diagram card in brand colours showing one enquiry travelling through a business: a website form, then a CRM card, then a quote, then a booked job. Thin connecting lines, one aqua highlight on the booked job. It reads like a product screen, not an illustration.

**Behaviour.** The connecting lines draw in once, left to right, over about a second when the page loads. Static for reduced motion.

**Why.** It shows the whole idea of the business in one picture: the website is the start of a system, not the end of the job.

### 2. The problem

**Layout.** Centred heading, then three cards in a row (stacked on a phone). Each card has a small line icon, a bold first line and two short sentences. One closing line underneath, centred.

**Copy**

- `Eyebrow`: Sound familiar?
- `H2`: Most businesses don't have a website problem. They have a systems problem.
- Card 1 `H3`: Enquiries get lost. `Body`: They arrive by email, phone, Facebook and the contact form. Some get answered. Some get forgotten.
- Card 2 `H3`: The admin lives in spreadsheets. `Body`: Quotes, jobs and stock are tracked by hand, and only one person knows where everything is.
- Card 3 `H3`: The software doesn't fit. `Body`: You pay monthly for big tools you use a fraction of, and they still don't match how you work.
- `Closing line`: We fix the gaps between the front door and the back office.

**Visual.** Icons only: an envelope with a question mark, a spreadsheet grid, a puzzle piece that doesn't quite fit. Single weight line icons in petrol.

**Why.** Visitors trust people who describe their problem better than they could themselves. This section does that before Masuyo says a word about itself.

### 3. Three ways we help

**Layout.** Three tall cards side by side on desktop, swipeable on a phone with a visible edge of the next card. Each card has a small mono label, a heading, two sentences and a text link at the bottom. A thin illustration at the top of each card hints at the offer.

**Copy**

- `H2`: Three ways we help.
- Card 1 `Label`: 01 Websites `H3`: Websites that win work. `Body`: Fast, clear sites that turn visitors into enquiries, bookings and sales. Every form lands where you handle it, not in a forgotten inbox. `Link`: Explore websites
- Card 2 `Label`: 02 Systems `H3`: Systems that run the day. `Body`: Custom CRMs, client portals and automation built around how you already work. Fewer spreadsheets, less copy and paste, no more tools you've outgrown. `Link`: Explore systems
- Card 3 `Label`: 03 Care `H3`: Care that keeps it improving. `Body`: Hosting, security, updates and steady improvements. What we build keeps getting better instead of getting older. `Link`: How Care works

**Visual.** Card 1: a browser outline. Card 2: three connected nodes. Card 3: a simple upward step line. All drawn in the same thin line style.

**Behaviour.** The whole card is clickable, not just the link. On hover the card lifts slightly and the arrow on the link moves 2px.

**Why.** Three choices is the most a visitor can weigh at a glance. Each card answers "what is it" and "what do I get" without jargon.

### 4. Before and after (infographic)

**Layout.** Full width, off white background. A heading and one line, then two diagrams side by side labelled Before and After. On a phone, a two option toggle switches between them.

**Copy**

- `H2`: One connected system instead of five disconnected ones.
- `Body`: Here is what that looks like for a typical service business.
- Before diagram labels: Phone · Email · Contact form · Facebook messages · Spreadsheet · Paper job sheets
- Before caption: Work arrives in four places and gets copied by hand into two more.
- After diagram labels: Website · CRM · Quote sent · Job booked · Invoice raised · Customer updated
- After caption: Every enquiry lands in one place and moves forward on its own.

**Visual.** Before: grey lines tangling from four inputs into a spreadsheet icon. After: a clean left to right flow with straight aqua connectors. Same scale, same icon style, so the difference is the only thing that changes.

**Why.** This is the most persuasive single picture on the site. It shows the outcome rather than describing it, and it works for any sector.

### 5. Recent work

**Layout.** One featured project. A large device mockup on the left (laptop with a phone overlapping its corner), text on the right. Grey background to separate it from the sections around it.

**Copy** (publish only once Frozen Computers is live and Nathan has approved it)

- `Eyebrow`: Recent work
- `H2`: Frozen Computers: from enquiries by phone to bookings, stock and customers in one system.
- `Body`: A computer repair and custom PC business needed more than a new website. We built online repair bookings, a shop fed directly from their supplier's stock, and a custom CRM to replace HubSpot.
- `Fact row` (mono, three items): Repair bookings online · Live supplier stock · Custom CRM
- `Link`: Read the case study

**Visual.** Real screens only: the booking flow on the phone, the shop or CRM on the laptop.

**Fallback until approved.** Swap in Masuyo's own CRM with `Eyebrow` Built in house, `H2` The system we run Masuyo on, and a one line description. It is real, it is yours, and it needs no permission.

**Why.** One strong, specific project beats a grid of thin ones.

### 6. How it works

**Layout.** Four steps in a horizontal row joined by a thin line, each with a mono number. Vertical on a phone, with the line running down the left.

**Copy**

- `H2`: How a project runs.
- `01` Map it. We start with how the business runs today: where work comes in, where it gets stuck, and what to fix first.
- `02` Build it. Work happens in short stages you can see and click through. Nobody disappears for two months.
- `03` Launch it. We move your data across, train your team and stay close for the first few weeks.
- `04` Improve it. Care keeps everything secure and current, and we keep making it better as the business grows.
- `Closing line`: You work directly with the engineer building it, from the first call to launch and after.
- `Link`: More on our approach

**Why.** It removes the fear of the unknown and answers "what happens if I say yes" before anyone has to ask.

### 7. Under the hood

**Layout.** A narrow two column strip. Heading and two sentences on the left, a short list with mono labels on the right.

**Copy**

- `H2`: Built to last. Yours to keep.
- `Body`: Everything is built on modern, widely used technology, so it is fast today and easy to maintain later. You own the code, the data and the logins from day one.
- `Stack`: Next.js · headless CMS · modern databases
- `Hosting`: Managed on our own servers
- `Security`: SSL, daily backups, uptime monitoring
- `Ownership`: Your code, your data, your accounts

**Why.** Technical buyers look for this; non technical buyers find it reassuring. It signals expertise in four lines instead of fourteen pages.

### 8. Closing band

The global closing band, as defined above.

## Websites

For owners whose website looks dated, gets visitors but few enquiries, or makes customers phone to do something they could do online. The page should leave them sure that a Masuyo site does a job, not just sits there.

- `Page title`: Websites that win work | Masuyo
- `Meta description`: Fast, clear websites for growing businesses, built around bookings, quotes and sales, and connected to the way you handle them.

### 1. Hero

**Layout.** Same two column pattern as the homepage hero, slightly shorter. Words left, visual right.

**Copy**

- `Eyebrow`: Websites
- `H1`: A website that brings in work, not just visitors.
- `Body`: We design and build fast, clear websites for businesses where enquiries, bookings and sales matter. Every form, booking and order goes straight to where you deal with it.
- `Button` (primary): Start a project
- `Link`: See pricing

**Visual.** A phone mockup showing a three step booking flow (pick a service, pick a time, confirm), overlapping a laptop showing the same site's homepage. Real client screens once approved; until then, a clean wireframe in brand colours clearly styled as a diagram, not a fake site.

### 2. What makes it different

**Layout.** Three columns, each a short heading and two sentences. No icons; the headings do the work.

**Copy**

- `H2`: Most websites are brochures. Ours are built to do something.
- `H3`: Built around one action. `Body`: Every page leads to the thing that brings you money: a booking, a quote request, an order or a call. Nothing on the page competes with it.
- `H3`: Connected from day one. `Body`: Enquiries go into your CRM, calendar or inbox with the details already sorted. Nobody retypes anything.
- `H3`: Fast on a phone. `Body`: Built phone first, because that is where people look you up between jobs. Pages load quickly, even on a weak signal.

### 3. What we build

**Layout.** A grid of six tiles, three by two on desktop, one column on a phone. Each tile has a small line icon, a heading and one sentence.

**Copy**

- `H2`: What we build.
- Business websites. A clear, fast site that explains what you do and makes it easy to get in touch.
- Bookings and appointments. Customers choose a service and a time, and it lands in your calendar.
- Quote requests. A guided form that collects the details you need, so you can price the job first time.
- Shops and trade catalogues. Products, stock and prices kept up to date, including feeds from your suppliers.
- Landing pages for ads. A focused page for each campaign, so your ad spend lands somewhere that converts.
- Redesigns. Your existing site rebuilt on a faster, more modern base, keeping what already works.

**Behaviour.** Tiles are not links. They are a menu of possibilities, not separate pages.

### 4. What happens to an enquiry (infographic)

**Layout.** A horizontal five step flow across the full width, each step a small icon above a two to four word label and one line of explanation. On a phone it becomes a vertical list with a line down the left.

**Copy**

- `H2`: What happens when someone gets in touch.
- `1` Found. They search Google and find a page that answers their question.
- `2` Convinced. Clear pricing, real work and reviews give them a reason to act.
- `3` Booked. They book, order or ask for a quote in under a minute.
- `4` Sorted. The details land in your system and you get a notification.
- `5` Confirmed. The customer gets an instant confirmation, so they stop shopping around.

**Visual.** Five thin outline icons joined by a single line. Step 4 is the aqua highlight, because it is the step most websites leave out.

**Why.** It explains in five short lines why a connected website is worth more than a pretty one.

### 5. Included in every build

**Layout.** Two column checklist with aqua ticks, on an off white panel.

**Copy**

- `H2`: Included in every website.
- Design around your brand and your customers
- Built for phones first
- Search foundations: page titles, structured data, sitemap and Google Search Console
- Analytics and enquiry tracking, so you can see what works
- A simple editor, so you can change text and photos yourself
- Hosting set up on our servers, with SSL
- A handover session for you and your team
- Full ownership of the site, the domain and the data

**Why.** Answers "what am I actually getting" in one glance and removes the fear of hidden extras.

### 6. How long it takes

**Layout.** A simple horizontal bar split into four labelled segments, with one sentence beneath it.

**Copy**

- `H2`: From first call to live.
- Segments: Plan · Design · Build · Launch
- `Body`: Most websites go live in two to six weeks `[confirm]`, depending on size and how quickly the words and photos are ready. Bigger sites can launch in stages, with the most important pages live first.

**Visual.** Segments in shades of petrol, launch in aqua. Not drawn to a time scale, so it never over promises.

### 7. Price line

**Layout.** A single centred line in a quiet panel, with a text link.

**Copy**

- `Body`: Most websites cost between £1,500 and £4,000 `[confirm]`, with Care from £190 a month `[confirm]`.
- `Link`: See full pricing

**Why.** Keeps the transparency you want without making price the headline.

### 8. Questions

**Layout.** An accordion: questions as rows, one answer open at a time. The first stays closed so the page does not jump.

**Copy**

- Can you redesign my existing site? Yes. We keep what works, such as your best pages and anything Google already ranks, and rebuild the rest on a faster base.
- Do I need to write the words and supply photos? You can, or we can write them with you. Most clients send rough notes and we shape them into clear copy.
- Will it show up on Google? Every site launches with the technical foundations search engines need. Ranking for competitive terms takes ongoing work, which is part of Care.
- Can I edit it myself? Yes. Text, photos, prices and posts are editable through a simple dashboard. Bigger changes are part of Care.
- What is it built on? Modern web technology rather than WordPress. In plain terms: faster pages, fewer security updates and nothing to break when a plugin changes.
- Do I own it? Yes. The code, the domain, the content and the data are yours from day one.

### 9. Closing band

The global closing band.

## Systems

This is the most valuable page on the site. It is for owners drowning in admin: spreadsheets, copy and paste, and software that doesn't fit. It needs to feel calm and expert, and it must never make the visitor feel stupid for not knowing the technical words.

- `Page title`: Custom CRM, portals and automation | Masuyo
- `Meta description`: Custom CRMs, client portals and automation for businesses that have outgrown spreadsheets and off the shelf software. Scoped, fixed price and built in stages.

### 1. Hero

**Layout.** Two columns. Words left; on the right, a large product screen that bleeds off the right edge of the page, which makes it feel like real software rather than a picture of it.

**Copy**

- `Eyebrow`: Systems
- `H1`: Software built around how your business already works.
- `Body`: Custom CRMs, client portals and automation for businesses that have outgrown spreadsheets and off the shelf tools. Less copy and paste, fewer workarounds, and no monthly fees for features you never use.
- `Button` (primary): Start a project
- `Link`: See how we build it (scrolls to section 4)

**Visual.** A pipeline board from Masuyo's own CRM: columns for stages, cards for leads. Real, owned, and safe to show. Blur any client names.

### 2. Signs you need this

**Layout.** A heading on the left, a six item checklist on the right, set on an off white panel.

**Copy**

- `H2`: You might need a system if...
- You track jobs, leads or stock in a spreadsheet.
- Customers ring to ask where their order or repair has got to.
- The same details get typed into two or three places.
- You pay for software like HubSpot and use a fraction of it.
- Only one person really knows how the admin works.
- Quotes, invoices or reminders go out late because someone forgot.
- `Closing line`: If three or more sound familiar, a custom system usually pays for itself.

**Behaviour.** Each line can be ticked. Once three are ticked, the closing line turns petrol and a small `Button` appears: Talk it through. Nothing is saved or sent.

**Why.** The visitor diagnoses themselves, which is far more persuasive than being told.

### 3. What we build

**Layout.** Five cards. The first two are wide (two per row), the next three share a row. Each card has a small interface sketch at the top, a heading and two sentences. On a phone they stack.

**Copy**

- `H2`: What we build.
- `H3`: Custom CRM. `Body`: Leads, customers, jobs and follow ups in one place, using the stages your business already works in. Reminders go out without anyone remembering to send them.
- `H3`: Client portals. `Body`: A private login where your customers see progress, documents and invoices, and pay online. Fewer "just checking in" calls.
- `H3`: Automation and integrations. `Body`: Your tools passing information to each other. Enquiries filed, invoices raised, stock updated, without anyone touching them.
- `H3`: AI assistants. `Body`: Assistants that know your own information and answer common questions, qualify enquiries or draft replies. A person always stays in control.
- `H3`: Learning and member platforms. `Body`: Courses, cohorts, progress tracking and payments, on your own domain rather than someone else's platform.

**Visual.** Each sketch is a simplified screen in line style: a kanban board, a login and document list, two app icons joined by an arrow, a chat bubble, a progress bar.

### 4. How we build a system

**Layout.** A four stage process shown as a horizontal flow, with a curved return arrow from stage 3 back to stage 2 labelled "feedback each stage". On a phone it becomes a vertical list, with the loop described in text.

**Copy**

- `H2`: How we build it.
- `Body`: Custom software goes wrong when it is built in one long, invisible stretch. We work in short, visible stages so you can steer as we go.
- `01` Discovery. We map how work moves through the business today and agree what to fix first. A short paid discovery, credited against the build if you go ahead `[confirm]`.
- `02` Prototype. A clickable version early on, so you can see and feel it before anything is final.
- `03` Build in stages. Each stage goes live and gets used. What we learn shapes the next one.
- `04` Launch and train. Your data moved across, your team trained, and Care keeps it running.

**Why.** Fear of a big, expensive project that goes wrong is the main reason owners do nothing. This section removes it.

### 5. Off the shelf or custom? (comparison)

**Layout.** A simple three column table with a heading and an honest note underneath.

**Copy**

- `H2`: Off the shelf or custom?

|  | Off the shelf software | A Masuyo system |
| --- | --- | --- |
| Fits your process | You change how you work to fit it | It is built around how you already work |
| Cost over time | Monthly fees per user, rising as you grow | A fixed build, then Care |
| Ownership | You rent it | You own the code and the data |
| Changes | You wait for the vendor's roadmap | You ask, we build it |
| Setup time | Quick to start | Takes weeks, delivered in stages |

- `Note`: Sometimes off the shelf is the right answer. If an existing tool will do the job, we will tell you which one and skip the build.

**Why.** An honest comparison, including where custom loses, earns more trust than any claim.

### 6. Built in house

**Layout.** Wide screenshot on the left, short text on the right.

**Copy**

- `Eyebrow`: Built in house
- `H2`: We run Masuyo on a system we built.
- `Body`: Outreach, active contracts, invoices and a client portal, all in one CRM we designed and built for ourselves. Our clients use the portal to see their project and pay.

**Why.** Proof you can show today, with no permission needed.

### 7. Secure by default

**Layout.** Four small items in a row with mono labels.

**Copy**

- `H2`: Secure by default.
- `Logins`: Secure accounts, with each person seeing only what they need
- `Data`: Stored securely and backed up daily
- `Privacy`: Built with UK GDPR in mind from the first day
- `Export`: Your data can be exported whenever you want it

### 8. Price line

- `Body`: Systems usually start from £3,000 `[confirm]`. Every project is scoped and fixed in price before work begins.
- `Link`: See full pricing

### 9. Questions

- We already use HubSpot, Xero or similar. Do we start again? Not necessarily. We can connect to what you use, or replace the parts that don't fit and keep the rest.
- How long until we can use it? The first stage is usually live within weeks, not months. Bigger systems arrive in stages.
- What happens when the business changes? The system changes with it. Small changes are part of Care; bigger ones are scoped and quoted.
- Will my team be able to use it? It is built around the way they already work, and we train everyone at launch.
- Who owns it? You do: the code, the data and the accounts.

### 10. Closing band

The global closing band.

## Care

Care is where the recurring revenue lives, so this page has to make ongoing support feel like the obvious, sensible choice rather than an upsell. The tone is reassuring and practical: someone is looking after this, and it keeps getting better.

- `Page title`: Website and system care | Masuyo
- `Meta description`: Hosting, security, updates and steady improvements for your website and systems. One monthly plan, someone who answers, no surprise invoices.

### 1. Hero

**Layout.** A single centred column, shorter than other heroes. No large image; a small status style panel sits under the buttons instead.

**Copy**

- `Eyebrow`: Care
- `H1`: Looked after, and getting better every month.
- `Body`: Hosting, security, updates and steady improvements for everything we build. You get one monthly plan, a real person who answers, and no surprise invoices.
- `Button` (primary): Start a project
- `Link`: Compare plans

**Visual.** A small panel styled like a system status page: three rows with green dots reading "Site online", "Backups complete", "Security up to date". It says "handled" without a single word of sales copy.

### 2. Why it matters

**Layout.** Three short columns, each with a mono label and two sentences.

**Copy**

- `H2`: Websites and systems don't stay new on their own.
- `Security`: Software needs regular updates. Left alone, a site becomes slower, less secure and harder to fix.
- `Search`: Google rewards sites that are fast, current and well maintained. Neglect quietly costs you rankings.
- `Growth`: Your business changes. Your website and systems should keep up without a rebuild every few years.

### 3. Plans

**Layout.** Two plan cards side by side, with a third, narrower card for systems clients. The middle of the three is visually emphasised with a petrol background. Each card lists what is included with ticks, and Care Plus shows only what it adds, starting with "Everything in Care, plus".

**Copy**

- `H2`: Choose a plan.
- Card 1 `H3`: Care `Price`: £190 a month `[confirm]` `Body`: For websites that need to stay fast, secure and current.
  - Managed hosting on our servers
  - SSL, uptime monitoring and daily backups
  - Security and software updates
  - Small content changes `[set allowance]`
  - Email support, replies within one working day
- Card 2 `H3`: Care Plus `Price`: £290 a month `[confirm]` `Label`: Most chosen `Body`: For businesses that want their site to keep improving.
  - Everything in Care, plus
  - Monthly improvement time `[set hours]`
  - Ongoing SEO and content updates
  - A short monthly report in plain English
  - Priority support
- Card 3 `H3`: Systems Care `Price`: Agreed per system `Body`: For custom CRMs, portals and automation. Monitoring, fixes and improvements matched to how much the system does.
- `Button` on each card: Start a project
- `Note` under the cards: Every new build comes with Care for the first months, so nothing is left unattended at launch. Plans run monthly `[confirm notice period]`.

**Why.** Two clear tiers and one custom option is easy to compare. Showing only what Care Plus adds stops the cards becoming walls of ticks.

### 4. What a month looks like (infographic)

**Layout.** A circular four step cycle in the centre of the section, with a short line beside each point. On a phone, a vertical list with a looping arrow at the end.

**Copy**

- `H2`: What happens each month.
- Monitor. We watch uptime, speed and errors, and fix problems before you notice them.
- Update. Software and security updates applied and tested.
- Improve. Small changes, new content and fixes from your list.
- Report. A short summary of what was done and what is next (Care Plus).

**Visual.** Four nodes on a ring with arrows running clockwise, in petrol line style. "Improve" is the aqua highlight, because that is what separates Care from basic hosting.

### 5. Already have a site?

**Layout.** A slim panel with text on the left and a text link on the right.

**Copy**

- `H2`: Already have a site we didn't build?
- `Body`: We can take it over. We start with a health check and tell you honestly whether to keep it, fix it or replace it.
- `Link`: Ask for a health check

### 6. Questions

- Is there a long contract? No. Plans run month to month `[confirm notice period]`.
- What counts as a small change? Updating text, swapping photos, adding a team member or a new service. Anything that needs new design or development is quoted first.
- What if something breaks? Tell us and we fix it. Problems caused by updates or hosting are covered by the plan.
- Can I change plans? Yes, up or down, from the next month.

### 7. Closing band

The global closing band.

## Work

Proof is what the old site lacked most. This section only ever shows real, approved projects, so it starts small and grows with each build. A short page of real work is far stronger than a long page of invented work.

### Work index

- `Page title`: Work | Masuyo
- `Meta description`: Websites and systems we have built for growing businesses, explained plainly: what they had, what we built and what changed.

**Layout.** A short header, then project cards in a two column grid (one column on a phone). Each card is a large screenshot with the client name, sector and one line underneath. Offer filters (All, Websites, Systems) appear only once there are four or more projects; with fewer, filters look empty.

**Copy**

- `Eyebrow`: Work
- `H1`: Real projects, explained plainly.
- `Body`: What each business had before, what we built and how it works now. Every project here is live and shared with the client's permission.
- Card pattern: `Client` Frozen Computers · `Sector` Repair and retail · `Line` Bookings, stock and customers in one system · `Tags` Website, Systems
- In house card: `Client` Masuyo · `Sector` Our own tools · `Line` The CRM and client portal we run the business on · `Tags` Systems

**Behaviour.** The whole card is a link. On hover the screenshot zooms 2% inside its frame.

### Case study template

Every case study uses the same seven parts, in this order, so they are quick to write and easy to compare.

1. **Header.** Client name, sector, location and tags, over a full width hero screenshot.
2. **At a glance.** A three item strip in mono: what they needed, what we built, the result.
3. **The situation.** Two short paragraphs on how things worked before, in the client's terms.
4. **What we built.** Three to five features, each with a screenshot and two sentences.
5. **How it works now.** A before and after flow diagram, in the same style as the homepage.
6. **Results and quote.** Only measured results and an approved quote. If there are no numbers yet, leave the results out rather than guessing.
7. **Under the hood.** A collapsed panel listing the technology, for technical readers.

Then a link to the next project and the closing band.

### First case study: Frozen Computers (draft, publish after launch and approval)

- `Page title`: Frozen Computers case study | Masuyo
- `Eyebrow`: Repair and retail · `[location]`
- `H1`: Frozen Computers: bookings, stock and customers in one system.
- `At a glance`: Needed: online bookings, a live shop and a CRM that fits · Built: website, supplier stock feed, custom CRM · Result: `[measured result after launch]`
- `H2` The situation. `Body`: Frozen Computers repairs computers and builds custom PCs. Repairs were booked by phone or in person, the product range lived with their supplier rather than on their site, and customer records sat in HubSpot, which they used for a small part of what they paid for.
- `Body`: Nathan, the owner, wanted something live quickly and a clear plan for the rest. So we built it in phases, with the most useful part first.
- `H2` What we built.
  - Repair bookings. Customers pick a repair type and a time online, and it arrives ready to work on.
  - A shop fed by the supplier. Products, stock levels and prices come from their supplier's feed, so the shop stays current without manual updates.
  - Google Shopping listings. Products appear in Google search results through Merchant Center.
  - A custom CRM. Customers, repairs and orders in one place, replacing HubSpot.
  - A client portal. Invoices and project progress in one login.
- `H2` How it works now. Diagram: phone and walk in bookings → online booking → CRM → repair tracked → customer updated.
- `H2` Results. `[only measured outcomes, for example bookings taken online in the first month]`
- `Quote`: `[approved quote from Nathan Woods]`
- `Under the hood`: Custom Next.js site, supplier feed integration, Google Merchant Center, custom CRM and portal, hosted and maintained under Care.

**Why.** It tells a story every repair shop, garage or retailer recognises: phone bookings, stale stock, the wrong software. That makes it a sales tool for your top two priority sectors at once.

**Next in line.** The Invisible Edge learning platform, once Rick has approved screenshots and a quote. Until then, it does not appear anywhere on the site.

## Approach

This replaces About. Its job is trust: who is behind Masuyo, how they think, and what it is like to work together. The old page hid the fact that Masuyo is one person and kept apologising for it. This one puts you front and centre, because for an owner led business, dealing directly with the person who builds the thing is the selling point.

- `Page title`: Our approach | Masuyo
- `Meta description`: How Masuyo works: one senior engineer from first call to launch, short visible stages, honest advice and full ownership of everything we build.

### 1. Hero

**Layout.** Two columns. Words on the left, a real photo of you on the right: natural light, at work or on site, not a studio headshot.

**Copy**

- `Eyebrow`: Approach
- `H1`: Fix the process first. Then build the technology.
- `Body`: Masuyo is a small technology company in Lancashire. We build websites, systems and automation for businesses that run on jobs, quotes, bookings and stock, and we stay on to look after them.

**Visual.** Your photo. A real face is the strongest trust signal a small company has, and every competitor with stock photos looks the same.

### 2. Who you'll work with

**Layout.** Narrow single column of text, like the opening of a well written article, with a pull quote styled larger in petrol.

**Copy**

- `H2`: Who you'll work with.
- `Body`: I'm Cameron, and I founded Masuyo. I've spent `[number]` years in digital marketing and web development, building websites, CRMs and tools for businesses in the UK and the US.
- `Body`: I started Masuyo because too many small businesses were paying for technology that didn't fit them: websites that looked fine but brought in nothing, and software built for companies ten times their size.
- `Body`: When you work with Masuyo, you work with me, from the first conversation to launch and after. When a project needs a specialist, such as a designer or a security expert, I bring in people I trust and stay responsible for the result.
- `Pull quote`: The best technology is the kind your team stops noticing, because it just works.

**Why.** First person here, and only here, makes the page human. Every other page uses "we", which is normal for a company and leaves room to grow.

### 3. How we think

**Layout.** Four principles in a two by two grid, each with a mono number, a short heading and two sentences.

**Copy**

- `H2`: How we think.
- `01` Process before pixels. We look at how work moves through your business before we design a single screen. Most problems are workflow problems wearing a website costume.
- `02` Small, visible steps. You see progress early and often, and you can change direction before it gets expensive.
- `03` Straight advice. If you don't need a custom build, we will say so and point you to something that already exists.
- `04` Yours to keep. Code, data, domains and logins belong to you. Nothing is rented back.

### 4. Where we work

**Layout.** Text on the left, a simple stylised map of the North West on the right with one aqua dot for Leyland and a soft ring around it.

**Copy**

- `H2`: Local when it helps. Remote when it doesn't.
- `Body`: We are based near Preston and work in person with businesses across Lancashire and the North West. It is often quicker to understand a business by standing in it for an hour. For everyone else, video calls and a shared project space work just as well.

**Visual.** Flat map outline in light grey, no road detail. One dot, one ring. Nothing else.

### 5. What we build with

**Layout.** A single row of mono labels on an off white strip, with one sentence above.

**Copy**

- `Body`: Modern, widely supported technology, chosen so your project is easy to maintain for years.
- Labels: Next.js · TypeScript · headless CMS · modern databases · AI models · managed hosting

### 6. Closing band

The global closing band.

## Pricing

Transparency stays, but the tone changes from "look how cheap we are" to "here is what good work costs, and how we keep it predictable". Visitors arrive here comparing options, so the page must be scannable in under a minute.

- `Page title`: Pricing | Masuyo
- `Meta description`: Typical prices for websites, custom systems and ongoing care. Every project is scoped and fixed in price before work begins.

### 1. Hero

**Layout.** Short centred header, no image.

**Copy**

- `Eyebrow`: Pricing
- `H1`: Clear prices, agreed before we start.
- `Body`: Every project is scoped and fixed in price before any work begins. Here is what most projects cost, and what moves the number.

### 2. Typical prices

**Layout.** Three cards in a row, equal height. Each card shows the offer name, the typical range in large type, one sentence on what it usually covers, and a text link to that offer's page.

**Copy**

- `H2`: What most projects cost.
- Card `Websites` `Price`: £1,500 to £4,000 `[confirm]` `Body`: A fast, connected website with bookings, quotes or a shop. Simpler sites sit at the lower end. `Link`: About websites
- Card `Systems` `Price`: From £3,000 `[confirm]` `Body`: A custom CRM, portal or automation, built in stages. Most start with one stage and grow. `Link`: About systems
- Card `Care` `Price`: £190 or £290 a month `[confirm]` `Body`: Hosting, security, updates and improvements. Included with every build from launch. `Link`: Compare Care plans
- `Note` under the cards: Masuyo is not VAT registered, so the price you see is the price you pay.

**Why.** Ranges set honest expectations and screen out budgets that would never fit, without pretending every project costs the same.

### 3. What moves the number

**Layout.** A two column list, each item a bold phrase and one sentence.

**Copy**

- `H2`: What moves the number.
- Size. How many pages, features or user types the project needs.
- Connections. How many other tools it has to talk to, such as your accounts, calendar or supplier.
- Content. Whether we write the words and source the images, or you supply them.
- Data. How much needs moving across from spreadsheets or old systems.
- Timing. A fixed deadline that needs work prioritised can add to the cost.

### 4. Website estimator

**Layout.** A panel split in two. Choices on the left, a live estimate on the right that stays in view while the visitor scrolls the choices. On a phone, the estimate becomes a bar pinned to the bottom of the screen.

**Copy**

- `H2`: Get a rough website price in a minute.
- `Body`: No email needed. You will see a range, not a quote.
- Question 1 `Label`: How big is the site? Options: Up to 5 pages · 6 to 12 pages · 13 pages or more
- Question 2 `Label`: What should it do? (choose any) Options: Take bookings · Collect quote requests · Sell products · Show live stock · Publish news or guides
- Question 3 `Label`: Who writes the words? Options: We will supply them · We would like help
- Result `Label`: Your rough range `Value`: £X to £Y `Small print`: Plus Care from £190 a month `[confirm]`. We confirm a fixed price after a short call.
- `Button`: Send me a fixed quote (opens Start a project with the choices already filled in)

**Behaviour.** The range updates instantly with a quick fade, never a counting animation. Prices come from one shared price list in the code so they can never disagree with the cards above.

**Why systems are not in the estimator.** A slider cannot price a custom system honestly. Systems get a short call instead, which is normal at this level of investment.

### 5. How paying works

**Layout.** Three steps in a row with mono numbers.

**Copy**

- `H2`: How paying works.
- `01` A fixed price, agreed in writing before we start.
- `02` A deposit to begin each phase, the balance when you sign it off `[confirm split]`.
- `03` Care billed monthly from launch, with every invoice in your client portal.

### 6. Questions

- Why don't you just list one price? Because a five page site and a shop with live stock are different jobs. A range is more honest than a starting price nobody actually pays.
- What if the scope changes? We tell you the cost before doing any extra work, and nothing is added without your agreement.
- Do you offer payment in stages? Yes. Larger projects are split into phases, each paid separately.
- Is Care required? Every build launches with Care, because an unattended site or system is a risk to you and to us. You can change plan later.

### 7. Closing band

The global closing band.

## Start a project

This replaces both Contact and the old estimator page. It is the most important conversion point on the site, so every field must earn its place. The form also quietly does your lead qualification: by the time it arrives, you know the size of the business, what they need and roughly what they can spend.

- `Page title`: Start a project | Masuyo
- `Meta description`: Tell us what is slowing the business down. Short form, no obligation, and a reply within one working day.

### Layout

Two columns on desktop. The form on the left takes about two thirds of the width. On the right, a sticky panel explains what happens next and offers the alternatives (email, book a call). On a phone the panel moves above the form, collapsed to a single line that expands when tapped.

The form is one page, not a multi step wizard. Seven fields is short enough that splitting it would only add clicks.

### Copy above the form

- `Eyebrow`: Start a project
- `H1`: Tell us what is slowing the business down.
- `Body`: A few lines is plenty. We reply within one working day with a straight answer on whether we can help and what it might involve.

### Fields

| # | Label | Type | Help text under the field | Why it is there |
| --- | --- | --- | --- | --- |
| 1 | Your name | Text |  | To reply personally |
| 2 | Email | Email | We only use this to reply. | To reply; checked as a real address |
| 3 | Business name and website | Text | If you have a website, paste the address. | Lets you research them before replying |
| 4 | What do you need help with? | Choice chips, pick any |  | Routes the enquiry: Website · System or CRM · Automation · Care for an existing site · Not sure yet |
| 5 | What is slowing the business down? | Large text box | For example: "Quotes take hours and live in a spreadsheet." | The real brief, in their words |
| 6 | How many people work in the business? | Choice chips |  | Qualifies size: Just me · 2 to 5 · 6 to 25 · More than 25 |
| 7 | Roughly what budget do you have in mind? (optional) | Choice chips | It helps us suggest the right approach. | Qualifies spend: Under £1,500 · £1,500 to £4,000 · £4,000 to £10,000 · More than £10,000 · Not sure |

If the visitor arrives from the pricing estimator, fields 4, 5 and 7 are pre-filled from their choices and can be edited.

- `Button`: Send my brief
- `Small print` under the button: No mailing list, no follow up sequence. Just a reply from a person.

### Side panel: what happens next

- `H3`: What happens next
- `01` We read your brief and look at your current site.
- `02` You get a reply within one working day, usually with a couple of questions.
- `03` If it is a fit, we book a short call or visit, then send a fixed price proposal.
- `Divider`
- `H3`: Rather talk?
- `Link`: Book a 20 minute call (opens your booking calendar)
- `Link`: hello@masuyodigital.com

**Why.** It answers the visitor's biggest worry, "what am I signing up for", right beside the button.

### Confirmation screen

**Layout.** The form is replaced in place by a short message, so the page does not reload or jump.

**Copy**

- `H2`: Thanks, \[first name\]. Your brief is with us.
- `Body`: You will hear back within one working day. In the meantime, you might find these useful.
- Two resource cards chosen by what they selected in field 4, for example "How much does a website cost in the UK?" for Website or "Off the shelf or custom software?" for System.

**Behaviour.** The confirmation also arrives by email from hello@masuyodigital.com with a copy of what they sent, and the enquiry is created in your CRM with its source attached.

## Resources

One searchable hub replacing Blog, Guides, Glossary and FAQ, as already decided. It serves two audiences: owners researching a problem, and search engines and AI assistants looking for clear answers to quote. With five or six posts a week planned, the structure has to stay tidy at a few hundred articles.

### Resources hub

- `Page title`: Resources | Masuyo
- `Meta description`: Plain English guides on websites, custom software, automation and running a business on better technology.

**Layout.** A short header with a large search box. Under it, a row of category chips. Then a featured row of two large cards, then a three column grid of article cards with pagination at the bottom. On a phone, chips scroll sideways and cards stack.

**Copy**

- `Eyebrow`: Resources
- `H1`: Plain answers about websites, software and automation.
- `Search placeholder`: Search guides, for example "website cost"
- Category chips: All · Websites · Systems and CRM · Automation and AI · Costs and planning · Care and security · Guides by sector · Glossary
- `Featured label`: Start here
- Card pattern: `Category` (mono) · `Title` · `One line summary` · `Read time` (for example "6 min read")
- `Empty search state`: Nothing matches that yet. Try a broader word, or ask us directly. `Link`: Start a project

**Behaviour.** Search filters instantly as the visitor types. Chips can combine with search. The chosen chip and search are kept in the address bar, so a filtered view can be shared or bookmarked.

**Glossary.** Lives as a chip within Resources rather than its own page: an A to Z list where each term is a short definition and a link to the article that explains it best.

### Article template

**Layout.** A centred reading column of about 680px. On wide screens, a table of contents sits in the left margin and highlights the current section as the reader scrolls. On a phone the contents collapse into a "Jump to" dropdown at the top.

**Order of elements**

1. `Breadcrumb`: Resources / \[Category\]
2. `H1`: the question as people ask it, for example "How much does a website cost in the UK?"
3. `Meta line`: By Cameron Karri · Updated \[date\] · \[x\] min read
4. `The short answer`: a boxed two to three sentence answer straight under the title. This is what search engines and AI assistants quote, and what busy readers need.
5. Body with `H2` sections, short paragraphs, and a table or diagram wherever something is compared.
6. `Inline prompt` placed after the second section, styled as a quiet panel: "Dealing with this right now? Tell us what is slowing you down." `Link`: Start a project
7. `Questions people also ask`: three to five short questions and answers at the end, marked up for search.
8. `Related reading`: three cards from the same category.

**Why.** "The short answer" box respects the reader's time and is exactly what answer engines look for. The single soft prompt converts without turning guides into adverts.

### Rules for every article

- Every statistic links to its source. No source, no statistic.
- Titles are questions or plain statements, never clickbait.
- No article promotes a service in its first half.
- Articles about sectors link to the matching sector page.

## Search landing pages

These pages exist to be found on Google by people searching locally or by sector. They sit outside the main navigation, linked from the footer and from related articles. Each one must stand on its own, because most visitors land on it directly and never see the homepage.

### Web design in Preston

- `URL`: /web-design-preston (keep the existing address, it already has search history)
- `Page title`: Web design in Preston | Websites that bring in work | Masuyo
- `Meta description`: Websites and systems for Preston businesses, built just down the road in Leyland. Meet in person, fixed prices, and support from the person who built it.

**Layout.** The Websites page structure, shortened, with a local section added after the hero.

**Copy**

- `Eyebrow`: Web design in Preston
- `H1`: Websites for Preston businesses, built just down the road.
- `Body`: We design and build fast, connected websites for businesses across Preston and Central Lancashire. Based in Leyland, so we can sit down with you, see how the business works and build around it.
- `Button`: Start a project
- `H2` (local section): Why local helps.
- Meet in person. An hour in your premises tells us more than a week of emails.
- Same person throughout. The person you meet is the person who builds and looks after the site.
- Know the area. We understand who your customers are and how they search locally.
- `H2`: Areas we cover. `Body`: Preston, Leyland, Chorley, Buckshaw Village, Penwortham, Bamber Bridge and the rest of Central Lancashire. Further afield by video call.
- Then: the "What we build" tiles and "Included in every website" checklist from the Websites page, and three local questions:
  - Can we meet in person? Yes. For businesses in and around Preston, the first meeting is usually at your premises.
  - Do you only work with Preston businesses? No, but local businesses get the benefit of meeting face to face.
  - Can you help us show up in local searches? Yes. Every site launches with local search foundations, and ongoing local SEO is part of Care Plus.

**Visual.** The same stylised map as the Approach page, zoomed to Central Lancashire, with the covered towns marked as small dots.

### Sector page template, written out for trades

Build four of these, one per priority sector. The structure stays identical; only the words and the lifecycle diagram change. The trades version is written in full below; the table after it gives the swaps for the other three.

- `URL`: /trades
- `Page title`: Websites and job systems for trades businesses | Masuyo
- `Meta description`: Websites, quote forms and job systems for electricians, plumbers, heating engineers and other trades. Less admin, faster quotes, more booked work.

**1. Hero.** Two columns, a phone mockup of a quote request form on the right.

- `Eyebrow`: For trades and field services
- `H1`: Less time on admin. More time on the tools.
- `Body`: Websites and job systems for trades businesses. Quote requests that arrive with the details you need, jobs that schedule themselves, and customers who always know when you're coming.
- `Button`: Start a project

**2. The problem.** Three short lines, set large, one per row.

- Quotes written up on the van dashboard.
- Jobs juggled across WhatsApp, texts and a paper diary.
- Invoices chased on a Sunday night.

**3. A job, start to finish (infographic).** A horizontal lifecycle of six stages with an icon and one line each. This is the centrepiece of the page.

- `H2`: How a job could run.
- Enquiry. A form collects the job type, postcode and photos.
- Quote. A tidy quote goes out the same day from a template.
- Booked. The customer accepts online and the job lands in your diary.
- On the way. The customer gets an automatic "on our way" message.
- Invoiced. The invoice goes out when the job is marked done.
- Review. A review request follows a few days later.

**4. What we build for trades.** Four tiles: a website that wins local searches, quote request forms with photo upload, a job and customer system, and automatic customer messages.

**5. Who we work with.** A row of mono labels: Electricians · Plumbers · Heating engineers · Roofers · Pest control · Landscapers.

**6. Proof.** Shown only when there is a real trades project. Until then, leave this section out entirely.

**7. Questions and closing band.** Three sector specific questions, for example "Will it work with my accounting software?", then the global closing band.

**Swaps for the other three sectors**

| Sector | URL | H1 | Lifecycle stages |
| --- | --- | --- | --- |
| Repair and retail with stock | /repair-and-retail | Stock, bookings and customers in one place. | Browse or book · Order or drop off · Tracked · Updated · Collected · Review |
| Clinics and appointments | /clinics | Fewer phone calls. Fuller diaries. | Find · Book online · Reminder · Visit · Follow up · Rebook |
| Professional services | /professional-services | Spend less time on admin and more on clients. | Enquiry · Onboarding · Documents · Progress · Invoice · Renewal |

## Small pages and states

The small moments are where a site feels cared for or neglected. Each one gets the same plain, calm voice as the main pages.

### 404 page

**Layout.** Centred, plenty of white space, the normal header and footer around it.

- `Eyebrow` (mono): 404
- `H1`: This page has moved or never existed.
- `Body`: The site was reorganised recently, so an old link may have brought you here. These are the places most people are looking for.
- Three text links: Websites · Systems · Start a project

**Visual.** A single line drawing of a broken connector between two nodes, in the same style as the diagrams. Quiet, not jokey.

### Cookie banner

**Layout.** A small card in the bottom left corner on desktop, a slim bar across the bottom on a phone. Never a full screen pop up.

- `Body`: We use a small number of cookies to see how the site is used. Nothing is sold or shared.
- `Button` (primary): Accept
- `Button` (secondary): Decline
- `Link`: Privacy

If analytics can run without cookies, drop the banner entirely. Fewer interruptions read as more professional.

### Form errors

Shown in petrol text under the field, with a small icon, never in red capitals.

| Situation | Message |
| --- | --- |
| Name missing | Add your name so we know who to reply to. |
| Email missing or malformed | Add an email address we can reply to, for example name@business.co.uk. |
| Brief empty | Tell us a little about what you need. A sentence is fine. |
| Sending failed | That didn't send. Try again, or email hello@masuyodigital.com and we'll pick it up. |

### Loading and empty states

- Estimator before any choice: "Pick a few options to see a rough range."
- Resources search with no match: covered in the Resources section.
- No client portal link in the header or footer: clients reach the portal from the links in their emails, which keeps the public site focused on new visitors.

### Legal pages

Privacy and Terms keep their current text, restyled in the article template with a contents list and an "Updated \[date\]" line. Update the business description in both from "digital agency" to "technology company" to match the new positioning.
