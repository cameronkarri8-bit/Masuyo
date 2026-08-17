import LogoFullWhite from '@/components/LogoFullWhite'
import FadeIn from '@/components/proposal/FadeIn'
import {
  BLUE, LIGHT, WHITE, HDR, H, B,
  Section, Head, Chunk, BulletList, Callout, PlanCard, subLabel,
} from '@/components/proposal/primitives'

/*
  Proposal copy supplied by the client and used as written. Nothing here is
  rewritten, shortened or embellished.

  Section ids match the labels passed to ProposalShell in page.tsx. Change one
  and the scroll spy stops tracking, so they move together.
*/

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
      <div style={{ padding: '0 clamp(0.75rem, 8vw, 8rem) 3rem' }}>
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
              <Chunk>
                The site has one services page. Dispute resolution, personal injury, medical
                negligence, property litigation and commercial litigation all sit inside
                collapsible panels on that single page. Search engines have nothing to rank for
                &quot;personal injury solicitor Preston&quot; or &quot;commercial litigation
                solicitor Preston&quot; because no page is about those things.
              </Chunk>
              <Chunk>
                There are no profiles for the solicitors. Every strong review names an
                individual, and prospective clients search for those names after a
                recommendation. At the moment there is nothing for them to land on.
              </Chunk>
              <Chunk>
                The homepage title tag is just the firm name. That is the single most valuable
                piece of text on the site for search, and it currently says nothing about what
                the firm does or where it is.
              </Chunk>
              <Chunk>
                Around thirty reviews are pasted onto the homepage as large headings. That makes
                the page long, slow on mobile, and confusing to search engines, which read those
                headings as the page&apos;s structure.
              </Chunk>
              <Chunk>
                The registered office in the site footer and the head office on the SRA register
                are two different Preston addresses. Inconsistent address details across your
                website, Google Business Profile and the SRA record weaken local search
                performance and look careless to anyone checking.
              </Chunk>
              <Chunk>
                There is no photography of the people or the office. For a family run firm whose
                entire proposition is a personal, one to one service, this is the biggest brand
                gap. The one Preston image on the site is doing a job that faces should be doing.
              </Chunk>
              <Chunk>
                There is a shopping cart link in the navigation. It is a Squarespace default
                rather than a decision, and it is the sort of small thing that undermines a
                professional impression.
              </Chunk>
              <Chunk>
                Enquiries currently rely on a phone number and an email address. There is no
                structured enquiry form, no case type routing and no way to request a callback
                outside office hours.
              </Chunk>
            </FadeIn>
          </Section>

          {/* ============ THE MARKET GAP ============ */}
          <Section id="market" bg={LIGHT}>
            <Head eyebrow="The market gap" title="The gap in the wider market" />

            <FadeIn delay={80}>
              <Chunk>
                We looked at how firms in this sector present themselves online, and there are
                three openings that almost nobody in the Preston legal market has taken.
              </Chunk>
              <Chunk>
                The first is plain English about cost and process. Prospective clients want to
                know what it will cost, how long it will take and what happens next. Most firms
                avoid all three, so the first firm to answer them clearly wins the enquiry.
              </Chunk>
              <Chunk>
                The second is people over stock imagery. The sector defaults to handshakes,
                gavels and empty boardrooms. A firm that shows its actual solicitors looks more
                credible than one that does not, and it costs nothing but a photographer.
              </Chunk>
              <Chunk>
                The third is written answers to real questions. AI assistants and Google&apos;s
                AI summaries now answer legal queries directly and cite the sources they trust.
                Firms publishing clear, solicitor reviewed guidance get named in those answers.
                Firms with a five panel services page do not.
              </Chunk>
            </FadeIn>

            <FadeIn delay={120}>
              <Callout>
                <Chunk>
                  There is also a compliance point worth raising with your COLP. The SRA
                  Transparency Rules require published price and service information for certain
                  categories, including debt recovery up to £100,000, alongside a published
                  complaints procedure and the SRA digital badge. Given the debt recovery work
                  the firm handles, this is worth confirming rather than assuming, and we would
                  build the pages to accommodate it either way.
                </Chunk>
              </Callout>
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
                  Three options. All three are custom built rather than templated, hosted on our
                  own infrastructure, and owned outright by you.
                </Chunk>
              </FadeIn>

              <FadeIn delay={100}>
                <p style={subLabel}>Option one. Refresh</p>
                <PlanCard
                  price="£749 one off"
                  name="Plus £40 per month"
                  features={[
                    'Custom build, no template',
                    'Up to six pages',
                    'Mobile first, tested on real devices',
                    'Enquiry form with email notification',
                    'Correct page titles and meta descriptions',
                    'Google Analytics and search tracking',
                    'SRA badge and regulatory details placed correctly',
                    'Content migrated from the current site',
                    'Live in one to two weeks',
                  ]}
                />
                <Chunk light>
                  A like for like rebuild of the current site, done properly. Up to six pages,
                  custom built, fast on mobile, with a proper enquiry form and analytics in
                  place.
                </Chunk>
              </FadeIn>

              <FadeIn delay={140}>
                <p style={subLabel}>Option two. The firm site, done properly</p>
                <PlanCard
                  price="£1,450 one off"
                  name="Recommended. Plus £40 per month"
                  featured
                  features={[
                    'Individual page for each practice area, five in total',
                    'Solicitor profile pages, so named recommendations land somewhere',
                    'News and insight section you can update yourself',
                    'Reviews presented properly, with structured data so they can appear in search results',
                    'Local search setup, with website, Google Business Profile and SRA record aligned',
                    'Enquiry form that routes by case type',
                    'SEO setup across all pages',
                    'Structured data for a legal practice, including location and services',
                    'Live in two to three weeks',
                  ]}
                />
                <Chunk light>
                  Everything in option one, plus the structure the firm actually needs to be
                  found. This is the option that turns the website from a business card into a
                  source of enquiries.
                </Chunk>
              </FadeIn>

              <FadeIn delay={180}>
                <p style={subLabel}>Option three. Rebrand and growth</p>
                <PlanCard
                  price="£2,750 one off"
                  name="Plus £499 per month"
                  features={[
                    'Logo refinement and a full set of usable file formats',
                    'Colour palette, typography and brand guidelines',
                    'Photography direction and shot list for team and office images',
                    'Letterhead, email signature and document templates',
                    'Ongoing SEO management at £499 per month',
                    'Content published every month, written for review by a solicitor before publication',
                    'Monthly reporting in plain English',
                    'Live in three to four weeks',
                  ]}
                />
                <Chunk light>
                  Everything in option two, plus the brand work. This is the option if the
                  intention is to look like the established firm you now are, rather than the one
                  you started as.
                </Chunk>
                <p
                  style={{
                    fontFamily: B,
                    fontSize: '0.9375rem',
                    color: 'rgba(255,255,255,0.5)',
                    lineHeight: 1.6,
                    marginTop: '1rem',
                  }}
                >
                  Options two and three each include everything in the option before them.
                </p>
              </FadeIn>
            </div>
          </section>

          {/* ============ ONGOING SUPPORT ============ */}
          <Section id="support" bg={WHITE}>
            <Head eyebrow="Ongoing support" title="Ongoing support" />

            <FadeIn delay={80}>
              <Chunk>
                Every option includes managed hosting at £40 per month. That covers hosting on
                our own servers, SSL, monitoring, backups, security updates, small content
                changes and technical support when you need it. There is no twelve month tie in
                and you can cancel whenever you like.
              </Chunk>
              <Chunk>
                The £499 per month plan in option three adds ongoing SEO, keyword tracking,
                monthly content and reporting. It can be added to options one or two later,
                whenever the timing suits.
              </Chunk>
            </FadeIn>
          </Section>

          {/* ============ WORTH CONSIDERING LATER ============ */}
          <Section id="later" bg={LIGHT}>
            <Head eyebrow="Worth considering later" title="Worth considering later" />

            <FadeIn delay={80}>
              <Chunk>
                A secure client portal, from £2,200, would give clients a private space to see
                their own documents, case updates and progress. For a dispute resolution practice
                where clients ask for updates constantly, it reduces admin and looks considerably
                more professional than email attachments. This is a phase two conversation rather
                than part of this proposal.
              </Chunk>
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
              <Chunk>
                All prices exclude VAT. The website is yours on completion, not rented from us.
              </Chunk>
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
