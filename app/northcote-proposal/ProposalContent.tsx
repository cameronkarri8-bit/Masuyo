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
  'Custom build, no template',
  'Up to six pages',
  'Mobile first, tested on real devices',
  'Enquiry form with email notification',
  'Correct page titles and meta descriptions',
  'Google Analytics and search tracking',
  'SRA badge and regulatory details placed correctly',
  'Content migrated from the current site',
]

const GROWTH = [
  'Individual page for each practice area, five in total',
  'Solicitor profile pages, so named recommendations land somewhere',
  'Guided journey per case type, mapped and built',
  'Enquiry form that routes and prioritises by case type',
  'News and insight section you can update yourself',
  'Reviews presented properly, with structured data so they can appear in search results',
  'Local search setup, with website, Google Business Profile and SRA record aligned',
  'SEO setup across all pages',
  'Structured data for a legal practice, including location and services',
  'Conversion tracking, so you can see which pages produce enquiries',
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
              Website and brand proposal for Northcote Solicitors
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
        section is 955px tall and scrolls into the nav's activation band on its
        own. "Next step" here is only 455px, so without extra room below it the
        page runs out of scroll before the section reaches the band and the last
        nav item never lights up.
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
                The current website was built on Squarespace and has served its purpose. It is a
                single layer brochure site, and it now sits behind where the firm actually is.
                The gap is not that it looks dated, it is that it does very little work.
              </Chunk>
            </FadeIn>
          </Section>

          {/* ============ WHAT WE FOUND ============ */}
          <Section id="found" bg={WHITE}>
            <Head eyebrow="What we found" title="What we found" />

            <FadeIn delay={80}>
              <Chunk>
                We reviewed the live site, the public SRA record and how the firm appears in
                local search. These are the points worth acting on.
              </Chunk>

              <BulletList
                items={[
                  <Point key="services" lead="One page for every service.">
                    Dispute resolution, personal injury, medical negligence, property litigation
                    and commercial litigation all sit inside collapsible panels on a single page.
                    Nothing can rank for &quot;personal injury solicitor Preston&quot; or
                    &quot;commercial litigation solicitor Preston&quot; because no page is about
                    those things.
                  </Point>,
                  <Point key="profiles" lead="No profiles for the solicitors.">
                    Every strong review names an individual, and prospective clients search those
                    names after a recommendation. There is currently nothing for them to land on.
                  </Point>,
                  <Point key="title" lead="The homepage title tag is only the firm name.">
                    That is the most valuable piece of text on the site for search, and it says
                    nothing about what the firm does or where it is.
                  </Point>,
                  <Point key="reviews" lead="Around thirty reviews are pasted onto the homepage as large headings.">
                    That makes the page long, slow on mobile, and hard for search engines to
                    read, because those headings are interpreted as the page&apos;s structure.
                  </Point>,
                  <Point key="form" lead="The enquiry form does not sort enquiries.">
                    Every message arrives the same way regardless of whether it is a personal
                    injury claim or a commercial dispute, so nothing is triaged before you open
                    it.
                  </Point>,
                  <Point key="photo" lead="No photography of the people or the office.">
                    For a family run firm whose entire proposition is a personal, one to one
                    service, this is the biggest brand gap.
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
                This is the part that matters most, and it is the part a redesign usually skips.
              </Chunk>
              <Chunk>
                At the moment the site presents everything at once and leaves the visitor to work
                out what applies to them. Someone with a medical negligence claim and someone
                with a commercial dispute see the same page, read the same panels and reach the
                same single contact route. They have to do the sorting themselves, and a
                proportion of them will not bother.
              </Chunk>
              <Chunk>
                Someone arriving on a solicitor&apos;s website is usually anxious and rarely a
                repeat buyer. They want to know three things quickly: whether you handle their
                kind of problem, whether you have handled it before, and what happens if they get
                in touch. A site that answers those in order converts. A site that presents a
                menu does not.
              </Chunk>
              <Chunk>What we would build instead:</Chunk>

              <BulletList
                items={[
                  <Point key="path" lead="A clear path per case type,">
                    so a personal injury enquiry and a commercial dispute enquiry follow different
                    routes through the site and never see content meant for the other.
                  </Point>,
                  <Point key="decision" lead="One decision per screen.">
                    Each page moves the visitor forward with a single obvious next step, rather
                    than offering several and diluting all of them.
                  </Point>,
                  <Point key="proof" lead="Proof placed where doubt appears.">
                    Reviews sit beside the service they relate to, not collected in one long block
                    that visitors scroll past.
                  </Point>,
                  <Point key="reassurance" lead="Reassurance before the form.">
                    What happens after you make contact, who will read it and how quickly, stated
                    before we ask for anything.
                  </Point>,
                  <Point key="contact" lead="Contact routes suited to the moment.">
                    Some people will ring, some will type at eleven at night. Both need to be
                    available and both need to feel like they will be answered.
                  </Point>,
                  <Point key="measure" lead="Measurement built in from day one.">
                    We track which pages lead to enquiries and which do not, so the next round of
                    changes is based on behaviour rather than opinion.
                  </Point>,
                ]}
              />
            </FadeIn>
          </Section>

          {/* ============ THE MARKET GAP ============ */}
          <Section id="market" bg={WHITE}>
            <Head eyebrow="The market gap" title="The gap in the wider market" />

            <FadeIn delay={80}>
              <Chunk>
                We looked at how firms in this sector present themselves online, and there are
                three openings that almost nobody in the Preston legal market has taken.
              </Chunk>
              <Chunk>
                The first is clarity about cost and process. Prospective clients want to know
                what it will cost, how long it will take and what happens next. Most firms avoid
                all three, so the first firm to answer them clearly wins the enquiry.
              </Chunk>
              <Chunk>
                The second is people over stock imagery. The sector defaults to handshakes,
                gavels and empty boardrooms. A firm that shows its actual solicitors looks more
                credible than one that does not.
              </Chunk>
              <Chunk>
                The third is written answers to real questions. AI assistants and Google&apos;s
                AI summaries now answer legal queries directly and cite the sources they trust.
                Firms publishing clear, solicitor reviewed guidance get named in those answers.
                Firms with a five panel services page do not.
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
                maxWidth: '60rem',
                margin: '0 auto',
                padding: '0 1.5rem',
              }}
            >
              <Head eyebrow="What we propose" title="What we propose" light />

              <FadeIn delay={60}>
                <Chunk light>
                  Two options. Both are custom built rather than templated, hosted on our own
                  infrastructure, and owned outright by you.
                </Chunk>
              </FadeIn>

              {/*
                Two up on desktop, stacked below sm. The grid lives here rather
                than inside PlanCard, exactly as the Diogenes page does it, so
                the three up layout there is unaffected.
              */}
              <FadeIn delay={100}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ marginTop: '2rem' }}>
                  <PlanCard price="£749 one off" name="Essentials" features={ESSENTIALS}>
                    <p style={cardMeta}>Plus £40 per month. Live in one to two weeks.</p>
                    <p style={cardBody}>
                      A like for like rebuild, done properly. The same site you have now, faster,
                      better structured and built on foundations that can grow later.
                    </p>
                    <p style={cardListLabel}>Includes:</p>
                  </PlanCard>

                  <PlanCard price="£1,450 one off" name="Growth" featured features={GROWTH}>
                    <p style={cardMeta}>
                      Plus £40 per month. Live in two to three weeks. Recommended.
                    </p>
                    <p style={cardBody}>
                      Everything in Essentials, plus the structure and journey work above. This is
                      the option that turns the website from a business card into a source of
                      enquiries.
                    </p>
                    <p style={cardListLabel}>Includes everything in Essentials, plus:</p>
                  </PlanCard>
                </div>
              </FadeIn>
            </div>
          </section>

          {/* ============ ONGOING SUPPORT ============ */}
          <Section id="support" bg={WHITE}>
            <Head eyebrow="Ongoing support" title="Ongoing support" />

            <FadeIn delay={80}>
              <Chunk>
                Both options include managed hosting at £40 per month. That covers hosting on our
                own servers, SSL, monitoring, backups, security updates, small content changes
                and technical support when you need it. There is no twelve month tie in and you
                can cancel whenever you like.
              </Chunk>
            </FadeIn>
          </Section>

          {/* ============ WORTH CONSIDERING LATER ============ */}
          <Section id="later" bg={LIGHT}>
            <Head eyebrow="Worth considering later" title="Worth considering later" />

            <FadeIn delay={80}>
              <BulletList
                items={[
                  <Point key="seo" lead="Ongoing SEO at £499 per month.">
                    Keyword targeting and tracking, content published every month for review by a
                    solicitor before publication, and monthly reporting you can actually read.
                    This can be added at any point once the new site is live.
                  </Point>,
                  <Point key="brand" lead="Brand refresh, priced on scope.">
                    Logo refinement with a full set of usable file formats, colour palette,
                    typography, brand guidelines, letterhead, email signature and document
                    templates.
                  </Point>,
                  <Point key="portal" lead="Secure client portal, from £2,200.">
                    A private space where clients see their own documents, case updates and
                    progress. For a dispute resolution practice where clients ask for updates
                    constantly, it reduces admin and looks considerably more professional than
                    email attachments.
                  </Point>,
                ]}
              />
            </FadeIn>
          </Section>

          {/* ============ HOW WE WORK ============ */}
          <Section id="howwework" bg={WHITE}>
            <Head eyebrow="How we work" title="How we work" />

            <FadeIn delay={80}>
              <Chunk>
                One senior person builds your project from start to finish, with trusted
                specialists brought in when a job genuinely needs them. There are no account
                managers, no handover chains and nobody learning the job on your budget. You talk
                to the person doing the work.
              </Chunk>
              <Chunk>The website is yours on completion, not rented from us.</Chunk>
            </FadeIn>
          </Section>

          {/* ============ NEXT STEP ============ */}
          <Section id="next" bg={LIGHT}>
            <Head eyebrow="Next step" title="Next step" />

            <FadeIn delay={80}>
              <Chunk>
                Pick the option that fits and we will confirm the exact figure and timeline
                before anything starts.
              </Chunk>
            </FadeIn>

            <FadeIn delay={120}>
              <BulletList
                items={[
                  'Masuyo Digital',
                  <a
                    key="email"
                    href="mailto:hello@masuyodigital.com"
                    style={{ color: BLUE, textDecoration: 'none', fontWeight: 600 }}
                  >
                    hello@masuyodigital.com
                  </a>,
                  <a
                    key="site"
                    href="https://masuyodigital.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: BLUE, textDecoration: 'none', fontWeight: 600 }}
                  >
                    masuyodigital.com
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
