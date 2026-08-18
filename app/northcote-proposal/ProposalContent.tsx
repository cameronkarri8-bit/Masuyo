import type { ReactNode } from 'react'
import LogoFullWhite from '@/components/LogoFullWhite'
import FadeIn from '@/components/proposal/FadeIn'
import {
  BLUE, LIGHT, WHITE, HDR, H, B,
  Section, Head, Chunk, BulletList, PlanCard,
} from '@/components/proposal/primitives'

/*
  Proposal copy supplied by the client and used as written. Nothing here is
  rewritten, shortened or embellished.

  Section ids match the labels passed to ProposalShell in page.tsx. Change one
  and the scroll spy stops tracking, so they move together.
*/

/** Bold lead phrase, then the rest of the point. Used in the bulleted sections. */
function Point({ lead, children }: { lead: string; children: ReactNode }) {
  return (
    <>
      <strong style={{ fontWeight: 700, color: 'inherit' }}>{lead}</strong> {children}
    </>
  )
}

/* Card typography, local to this page so the shared primitive stays untouched. */
const cardMeta: React.CSSProperties = {
  fontFamily: B,
  fontSize: '0.9375rem',
  fontWeight: 600,
  color: 'rgba(255,255,255,0.72)',
  lineHeight: 1.5,
  marginBottom: '1rem',
}
const cardBody: React.CSSProperties = {
  fontFamily: B,
  fontSize: '0.9375rem',
  color: 'rgba(255,255,255,0.62)',
  lineHeight: 1.6,
  marginBottom: '1.25rem',
}
const cardListLabel: React.CSSProperties = {
  fontFamily: B,
  fontSize: '0.6875rem',
  fontWeight: 700,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'rgba(53,173,223,0.8)',
  marginBottom: '0.875rem',
}

const ESSENTIALS = [
  'Existing approved content reorganised into up to six pages: home, services, about, news, contact and one further page',
  'Custom build, no template',
  'Mobile first, built and tested toward WCAG 2.2 AA practices',
  'Enquiry form with email notification',
  'Descriptive page titles and meta descriptions across the site',
  'Google Analytics 4 and Search Console setup',
  'SRA number, digital badge and complaints information implemented using content you supply and approve',
  'URL mapping and permanent redirects so existing links and rankings are preserved',
  'Two consolidated rounds of revisions',
]

const GROWTH = [
  'Up to twelve pages: home, about, contact, services overview, five practice area pages, up to three solicitor profiles and news',
  'Dedicated page for each practice area',
  'Solicitor profile pages, so named recommendations have somewhere to land',
  'Guided journey per case type, mapped before it is built',
  'Enquiry form that captures case type and routes to the appropriate inbox or person',
  'Existing news and insights migrated and improved, with a simpler publishing workflow for future articles',
  'Reviews presented in a clearer, service specific way',
  'LocalBusiness and Organization structured data, covering business identity, address and contact details',
  'Your existing Google Business Profile reviewed and aligned with the new site, so details match across public sources',
  'Stronger internal linking across practice areas',
  'Enquiry conversion tracking for form submissions and key contact actions',
  'Two consolidated rounds of revisions',
]

/*
  Momentum carries two lists. The monthly three sit in the card's children slot
  above the "Also included" label, so the order on screen matches the order in
  the supplied copy.
*/
const MOMENTUM_MONTHLY = [
  'One in depth guide, written to answer a question prospective clients actually search for',
  'One shorter article, tied to a practice area or something current in the firm’s work',
  'One new marketing page, built to target a specific search term and route enquiries properly',
]

const MOMENTUM_ALSO = [
  'Managed hosting, so there is no separate £40 monthly fee',
  'Search performance monitoring and keyword tracking',
  'A monthly summary of what is being found, read and acted on',
  'All content drafted by us and sent to you for solicitor review before anything is published',
]

export default function ProposalContent() {
  return (
    <>
      {/* ====== COVER ====== */}
      <section
        style={{
          background: '#1A2939',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          minHeight: `calc(70svh - ${HDR}px)`,
        }}
      >
        <svg
          viewBox="0 0 1440 900"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        >
          <circle cx="1240" cy="160" r="540" stroke="rgba(53,173,223,0.10)" strokeWidth="1" />
          <circle cx="1240" cy="160" r="360" stroke="rgba(53,173,223,0.08)" strokeWidth="1" />
          <circle cx="1240" cy="160" r="200" stroke="rgba(53,173,223,0.12)" strokeWidth="1" />
        </svg>

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '60rem',
            width: '100%',
            margin: '0 auto',
            padding: '4rem clamp(1rem, 4vw, 2rem) 4.5rem',
          }}
        >
          <FadeIn>
            <LogoFullWhite className="h-4 w-auto mb-8" />
            <p
              style={{
                fontFamily: B,
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.6)',
                marginBottom: '1.25rem',
              }}
            >
              A proposal prepared for
            </p>
            <h1
              style={{
                fontFamily: H,
                fontSize: 'clamp(2.25rem, 6.4vw, 3.75rem)',
                fontWeight: 700,
                color: WHITE,
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                marginBottom: '1.25rem',
              }}
            >
              Website proposal for Northcote Solicitors
            </h1>
            <p
              style={{
                fontFamily: B,
                fontSize: 'clamp(1.0625rem, 2.4vw, 1.3125rem)',
                fontWeight: 500,
                color: 'rgba(255,255,255,0.82)',
                lineHeight: 1.5,
                maxWidth: '34rem',
              }}
            >
              Prepared by Masuyo Digital. 17 August 2026. Valid for 30 days.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ====== FLOATING PANEL ====== */}
      {/*
        The bottom inset is deeper than the Diogenes panel's 3rem. Its last
        section is tall enough to scroll into the nav's activation band on its
        own. "Next step" here is short, so without extra room below it the page
        runs out of scroll before the section reaches the band and the last nav
        item never lights up.
      */}
      <div style={{ padding: '0 clamp(0.75rem, 8vw, 8rem) clamp(3rem, 26vh, 16rem)' }}>
        <div
          style={{
            maxWidth: '82rem',
            margin: '0 auto',
            borderRadius: 'clamp(1rem, 2vw, 1.75rem)',
            background: WHITE,
            boxShadow: '0 24px 80px rgba(0,0,0,0.55), 0 8px 24px rgba(0,0,0,0.28)',
            overflow: 'hidden',
          }}
        >
          {/* ============ WHERE THINGS STAND ============ */}
          <Section id="standing" bg={LIGHT} first>
            <Head eyebrow="Where things stand" title="Where things stand" />

            <FadeIn delay={80}>
              <Chunk>
                Northcote Solicitors has grown from a standing start in 2023 into a firm that
                wins most of its work through recommendation. The reviews do the heavy lifting,
                and they name people rather than the firm, which tells you exactly where the
                trust sits.
              </Chunk>
              <Chunk>
                Your current site is not bad. It reflects where the firm was rather than where
                the firm is now, and it does less work than it could. The opportunity is to turn
                an early stage brochure site into something that reflects a growing practice and
                produces enquiries.
              </Chunk>
            </FadeIn>
          </Section>

          {/* ============ WHAT WE FOUND ============ */}
          <Section id="found" bg={WHITE}>
            <Head eyebrow="What we found" title="What we found" />

            <FadeIn delay={80}>
              <Chunk>
                We reviewed the live site, the public SRA record and how the firm appears in
                local search.
              </Chunk>

              <BulletList
                items={[
                  <Point
                    key="areas"
                    lead="Practice areas are grouped rather than given room to perform."
                  >
                    Personal injury, medical negligence, property litigation and commercial
                    litigation are covered within broader service content instead of having
                    strong, dedicated landing pages. Dedicated pages would give both Google and
                    prospective clients clearer, more relevant destinations for searches such as
                    &quot;personal injury solicitor Preston&quot;.
                  </Point>,
                  <Point key="profiles" lead="There are no profiles for the solicitors.">
                    Every strong review names an individual, and prospective clients search those
                    names after a recommendation. Your SRA record lists three regulated
                    solicitors and none of them currently have a page to land on.
                  </Point>,
                  <Point key="title" lead="The homepage title tag is only the firm name.">
                    That is the most valuable piece of text on the site for search, and it says
                    nothing about what the firm does or where it is.
                  </Point>,
                  <Point
                    key="testimonials"
                    lead="Testimonials carry the same structural weight as primary headings."
                  >
                    Several reviews are formatted with the same prominence as the page&apos;s
                    main headings, which weakens the hierarchy and makes the homepage harder to
                    scan, particularly on a phone.
                  </Point>,
                  <Point key="form" lead="The enquiry form does not capture case type.">
                    Every message arrives the same way whether it is a personal injury claim or a
                    commercial dispute, so nothing is sorted before you open it.
                  </Point>,
                  <Point key="photo" lead="There is no photography of the people or the office.">
                    For a family run firm whose entire proposition is a personal, one to one
                    service, this is the biggest gap between what the firm is and what the
                    website shows.
                  </Point>,
                ]}
              />
            </FadeIn>
          </Section>

          {/* ============ STRUCTURE AND JOURNEY ============ */}
          <Section id="structure" bg={LIGHT}>
            <Head
              eyebrow="Structure and journey"
              title="Structure and how visitors move through the site"
            />

            <FadeIn delay={80}>
              <Chunk>
                This is the part a redesign usually skips, and it is the part that changes the
                numbers.
              </Chunk>
              <Chunk>
                At the moment the site presents everything at once and leaves the visitor to work
                out what applies to them. Someone with a medical negligence claim and someone
                with a commercial dispute see the same content and reach the same single contact
                route. They have to do the sorting themselves.
              </Chunk>
              <Chunk>
                Someone arriving on a solicitor&apos;s website is usually anxious and rarely a
                repeat buyer. They want to know whether you handle their kind of problem, whether
                you have handled it before, and what happens if they get in touch. A site that
                answers those questions clearly removes friction and gives more visitors a reason
                to make contact.
              </Chunk>
              <Chunk>What we would build instead:</Chunk>

              <BulletList
                items={[
                  <Point key="path" lead="A clear path per case type,">
                    so a personal injury enquiry and a commercial dispute enquiry follow different
                    routes and are not asked to read content meant for the other.
                  </Point>,
                  <Point key="action" lead="One clear primary action per page.">
                    Each page has an obvious next step, while keeping phone and enquiry options
                    available for anyone already ready to make contact.
                  </Point>,
                  <Point key="proof" lead="Proof placed where doubt appears.">
                    Reviews sit beside the service they relate to rather than collected in one
                    block that visitors scroll past.
                  </Point>,
                  <Point key="reassurance" lead="Reassurance before the form.">
                    What happens after making contact, who reads it and how quickly, stated
                    before we ask for anything.
                  </Point>,
                  <Point key="contact" lead="Contact routes suited to the moment.">
                    Some people will ring, some will type at eleven at night, and both need to
                    feel like they will be answered.
                  </Point>,
                  <Point key="measure" lead="Measurement from day one,">
                    so the next round of changes is based on what visitors actually do rather
                    than opinion.
                  </Point>,
                ]}
              />
            </FadeIn>
          </Section>

          {/* ============ WHERE NORTHCOTE CAN STAND OUT ============ */}
          <Section id="standout" bg={WHITE}>
            <Head eyebrow="Standing out" title="Where Northcote can stand out" />

            <FadeIn delay={80}>
              <Chunk>
                Three areas where the firm can differentiate itself more clearly in the local
                market.
              </Chunk>
              <Chunk>
                The first is clarity about cost and process. Prospective clients want to know
                what it will cost, how long it will take and what happens next. Answering those
                questions directly makes a firm easier to choose.
              </Chunk>
              <Chunk>
                The second is showing the people. Much of the sector defaults to handshakes and
                empty boardrooms. Given that your reviews are about named individuals, showing
                those individuals is a natural extension of how the firm already wins work.
              </Chunk>
              <Chunk>
                The third is publishing useful guidance. Google&apos;s AI features increasingly
                surface supporting websites alongside generated answers. Original, solicitor
                reviewed guidance gives Northcote more material that can be found through both
                traditional and AI assisted search, though no site can be guaranteed inclusion.
              </Chunk>
            </FadeIn>
          </Section>

          {/* ============ WHAT WE PROPOSE ============ */}
          <section
            id="propose"
            className="dgp-crosshatch"
            style={{
              position: 'relative',
              overflow: 'hidden',
              padding: '5.5rem 0',
              scrollMarginTop: `${HDR}px`,
            }}
          >
            <div
              style={{
                position: 'relative',
                zIndex: 1,
                maxWidth: '72rem',
                margin: '0 auto',
                padding: '0 1.5rem',
              }}
            >
              <Head eyebrow="What we propose" title="What we propose" light />

              <FadeIn delay={60}>
                <Chunk light>
                  Three options, all custom built rather than templated, and owned outright by
                  you.
                </Chunk>
              </FadeIn>

              {/*
                Three up from lg, two up at sm, stacked on a phone. The grid
                lives here rather than inside PlanCard, exactly as the Diogenes
                page does it, so its layouts are unaffected. This section runs
                wider than the 60rem the prose sections use, because three cards
                at 60rem leave roughly 290px each and the lists wrap badly.
              */}
              <FadeIn delay={100}>
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  style={{ marginTop: '2rem' }}
                >
                  <PlanCard price="£595 one off" name="Essentials" features={ESSENTIALS}>
                    <p style={cardMeta}>Plus £40 per month. Live in two to three weeks.</p>
                    <p style={cardBody}>
                      A clean rebuild of the existing site, improving speed, presentation, mobile
                      experience and technical foundations. Deliberately limited in scope.
                    </p>
                  </PlanCard>

                  <PlanCard price="£895 one off" name="Growth" features={GROWTH}>
                    <p style={cardMeta}>Plus £40 per month. Live in three to four weeks.</p>
                    <p style={cardBody}>
                      Everything in Essentials, plus the structure and journey work described
                      above. For £300 more this is where the commercial thinking sits.
                    </p>
                  </PlanCard>

                  <PlanCard
                    price="£895 one off"
                    name="Momentum"
                    featured
                    features={MOMENTUM_ALSO}
                  >
                    <p style={cardMeta}>
                      Plus £290 per month. Live in three to four weeks. Recommended.
                    </p>
                    <p style={cardBody}>
                      The Growth build, plus three new pieces of content published every month.
                      This is the option for a firm that wants the site to bring in work rather
                      than sit there.
                    </p>
                    <p style={cardListLabel}>Everything in Growth, plus every month:</p>
                    <BulletList light items={MOMENTUM_MONTHLY} />
                    <p style={cardListLabel}>Also included:</p>
                  </PlanCard>
                </div>
              </FadeIn>

              <FadeIn delay={140}>
                <Chunk light>
                  A note on how this works. Content of this kind compounds rather than spikes.
                  The pieces published in month one are usually doing more for you in month eight
                  than they were in month two, and the effect builds as the library grows. This
                  is a twelve month view, not a ninety day one, and we would rather say that now
                  than have you judge it in March.
                </Chunk>
              </FadeIn>
            </div>
          </section>

          {/* ============ WORTH CONSIDERING LATER ============ */}
          <Section id="later" bg={WHITE}>
            <Head eyebrow="Worth considering later" title="Worth considering later" />

            <FadeIn delay={80}>
              <BulletList
                items={[
                  <Point key="brand" lead="Brand refresh, priced on scope.">
                    Logo refinement with a full set of usable file formats, colour palette,
                    typography, brand guidelines, letterhead, email signature and document
                    templates.
                  </Point>,
                  <Point key="photo" lead="Photography, arranged separately.">
                    We can supply direction and a shot list, and either work with a photographer
                    you appoint or recommend one locally.
                  </Point>,
                  <Point key="portal" lead="Secure client portal, from £2,200.">
                    A private space where clients see their own documents, case updates and
                    progress, which reduces admin and looks considerably more professional than
                    email attachments.
                  </Point>,
                ]}
              />
            </FadeIn>
          </Section>

          {/* ============ WHAT WE NEED FROM YOU ============ */}
          <Section id="needs" bg={LIGHT}>
            <Head eyebrow="What we need from you" title="What we need from you" />

            <FadeIn delay={80}>
              <Chunk>
                Approved copy for any new or amended pages, or a brief if you would like us to
                draft it for your review. Confirmation of the firm&apos;s correct public contact
                details before launch. Photography, or a decision to arrange it separately.
              </Chunk>
              <Chunk>
                Access to your existing Google Business Profile, Analytics and Search Console.
                Sign off on all regulatory and legal content, which remains the firm&apos;s
                responsibility.
              </Chunk>
              <Chunk>
                On Momentum, a solicitor to review each month&apos;s content before publication.
                We handle the drafting and the publishing, but nothing goes live without your
                approval.
              </Chunk>
            </FadeIn>
          </Section>

          {/* ============ SCOPE AND TERMS ============ */}
          <Section id="terms" bg={WHITE}>
            <Head eyebrow="Scope and terms" title="Scope and terms" />

            <FadeIn delay={80}>
              <Chunk>
                Prices are fixed for the scope described. Anything outside it is quoted and
                agreed before we proceed. Page counts and revision rounds are as listed above.
              </Chunk>
              <Chunk>
                The site and the assets we produce for you transfer to Northcote Solicitors on
                final payment, subject to any third party software or licences. Any third party
                costs such as premium fonts, stock imagery or paid integrations are separate and
                agreed in advance. We include thirty days of post launch fixes for anything not
                working as specified.
              </Chunk>
              <Chunk>
                Momentum runs month to month with no minimum term, though the content needs time
                to work. Cookie and privacy implementation is included in the build, while the
                wording of your privacy notice remains the firm&apos;s responsibility.
              </Chunk>
            </FadeIn>
          </Section>

          {/* ============ HOW WE WORK ============ */}
          <Section id="howwework" bg={LIGHT}>
            <Head eyebrow="How we work" title="How we work" />

            <FadeIn delay={80}>
              <Chunk>
                One senior person builds your project from start to finish, with trusted
                specialists brought in when a job genuinely needs them. There are no account
                managers, no handover chains and nobody learning the job on your budget. You talk
                to the person doing the work.
              </Chunk>
            </FadeIn>
          </Section>

          {/* ============ NEXT STEP ============ */}
          <Section id="next" bg={WHITE}>
            <Head eyebrow="Next step" title="Next step" />

            <FadeIn delay={80}>
              <Chunk>
                Choose the option that suits you and we will confirm the scope, start date and
                anything we need from you before work begins.
              </Chunk>
            </FadeIn>

            <FadeIn delay={120}>
              <BulletList
                items={[
                  <span key="contact">
                    <strong style={{ fontWeight: 700 }}>Your contact throughout:</strong> Cameron
                    Karri
                  </span>,
                  <a
                    key="email"
                    href="mailto:cameron@masuyodigital.com"
                    style={{ color: BLUE, textDecoration: 'none', fontWeight: 600 }}
                  >
                    cameron@masuyodigital.com
                  </a>,
                  <a
                    key="site"
                    href="https://masuyodigital.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: BLUE, textDecoration: 'none', fontWeight: 600 }}
                  >
                    Masuyo Digital, masuyodigital.com
                  </a>,
                ]}
              />
            </FadeIn>
          </Section>
        </div>
      </div>
    </>
  )
}
