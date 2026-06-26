import type { ReactNode } from 'react'
import LogoFullWhite from '@/components/LogoFullWhite'
import FadeIn from './FadeIn'

/* --- Genuine Masuyo brand tokens (globals.css / tailwind.config.ts) --- */
const NAVY = '#1A2939'
const BLUE = '#35ADDF'
const BLUE2 = '#1d96cb'
const INK = '#111318'
const MID = '#6b7280'
const LIGHT = '#f5f4f2'
const WHITE = '#ffffff'
const BORDER = '#e5e3df'
const H = "'Fraunces', serif" // headings
const B = "'Geist', sans-serif" // body

/* ---------- Layout primitives ---------- */

function Section({ id, bg = WHITE, children }: { id: string; bg?: string; children: ReactNode }) {
  return (
    <section id={id} style={{ background: bg, padding: '5rem 0', scrollMarginTop: '56px', borderTop: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: '60rem', margin: '0 auto', padding: '0 1.5rem' }}>{children}</div>
    </section>
  )
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      style={{
        fontFamily: B,
        fontSize: '0.75rem',
        fontWeight: 700,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: light ? BLUE : BLUE2,
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.625rem',
      }}
    >
      <span style={{ width: '1.75rem', height: '2px', background: BLUE, display: 'inline-block', flexShrink: 0 }} />
      {children}
    </p>
  )
}

function H2({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <h2
      style={{
        fontFamily: H,
        fontSize: 'clamp(1.875rem, 4.5vw, 2.75rem)',
        fontWeight: 700,
        color: light ? WHITE : NAVY,
        lineHeight: 1.15,
        letterSpacing: '-0.02em',
        marginBottom: '1.75rem',
      }}
    >
      {children}
    </h2>
  )
}

function Lead({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      style={{
        fontFamily: B,
        fontSize: 'clamp(1.125rem, 2.2vw, 1.375rem)',
        fontWeight: 500,
        lineHeight: 1.5,
        color: light ? 'rgba(255,255,255,0.92)' : INK,
        marginBottom: '1.5rem',
      }}
    >
      {children}
    </p>
  )
}

function Chunk({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      style={{
        fontFamily: B,
        fontSize: '1.0625rem',
        lineHeight: 1.7,
        color: light ? 'rgba(255,255,255,0.78)' : MID,
        marginBottom: '1rem',
      }}
    >
      {children}
    </p>
  )
}

function Check({ light = false }: { light?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: '0.1rem' }} aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill={light ? 'rgba(53,173,223,0.25)' : 'rgba(53,173,223,0.12)'} />
      <path d="M6 10.2l2.6 2.6 5.4-5.6" stroke={BLUE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function BulletList({ items, light = false }: { items: ReactNode[]; light?: boolean }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {items.map((it, i) => (
        <li
          key={i}
          style={{
            display: 'flex',
            gap: '0.75rem',
            alignItems: 'flex-start',
            fontFamily: B,
            fontSize: '1.0625rem',
            lineHeight: 1.55,
            color: light ? 'rgba(255,255,255,0.88)' : INK,
          }}
        >
          <Check light={light} />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  )
}

function StatCard({ value, label, accent = false }: { value: ReactNode; label: string; accent?: boolean }) {
  return (
    <div
      style={{
        background: accent ? NAVY : WHITE,
        border: `1px solid ${accent ? NAVY : BORDER}`,
        borderRadius: '0.875rem',
        padding: '1.75rem 1.25rem',
        textAlign: 'center',
        boxShadow: '0 1px 2px rgba(26,41,57,0.04)',
      }}
    >
      <p
        style={{
          fontFamily: H,
          fontSize: 'clamp(2rem, 6vw, 3rem)',
          fontWeight: 700,
          color: accent ? WHITE : NAVY,
          lineHeight: 1,
          marginBottom: '0.5rem',
          letterSpacing: '-0.02em',
        }}
      >
        {value}
      </p>
      <p style={{ fontFamily: B, fontSize: '0.875rem', fontWeight: 500, color: accent ? 'rgba(255,255,255,0.6)' : MID, lineHeight: 1.4 }}>
        {label}
      </p>
    </div>
  )
}

function Callout({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div
      style={{
        borderLeft: `4px solid ${BLUE}`,
        background: light ? 'rgba(255,255,255,0.06)' : LIGHT,
        padding: '1.25rem 1.5rem',
        borderRadius: '0 0.625rem 0.625rem 0',
        margin: '1.75rem 0',
      }}
    >
      {children}
    </div>
  )
}

function Chips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2" style={{ margin: '1rem 0 0.5rem' }}>
      {items.map((t, i) => (
        <span
          key={i}
          style={{
            fontFamily: B,
            fontSize: '0.875rem',
            fontWeight: 500,
            color: NAVY,
            background: WHITE,
            border: `1px solid ${BORDER}`,
            borderRadius: '999px',
            padding: '0.4rem 0.85rem',
          }}
        >
          {t}
        </span>
      ))}
    </div>
  )
}

/* ---------- Section heading block ---------- */
function Head({ eyebrow, title, light = false }: { eyebrow: string; title: ReactNode; light?: boolean }) {
  return (
    <FadeIn>
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <H2 light={light}>{title}</H2>
    </FadeIn>
  )
}

/* ---------- Page ---------- */

export default function ProposalContent() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section
        className="crosshatch-bg"
        style={{ position: 'relative', overflow: 'hidden', minHeight: 'clamp(30rem, 86vh, 46rem)', display: 'flex', alignItems: 'flex-end' }}
      >
        {/* Optional photograph layer. Drop a file at public/diogenes-hero.jpg to enable. */}
        <div
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/diogenes-hero.jpg)', backgroundSize: 'cover', backgroundPosition: 'center 55%' }}
        />
        {/* Navy gradient overlay keeps the heading legible and on brand if no photo is present */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(26,41,57,0.62) 0%, rgba(26,41,57,0.78) 62%, rgba(26,41,57,0.96) 100%)',
          }}
        />
        {/* Concentric brand circles */}
        <svg viewBox="0 0 1440 900" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <circle cx="1240" cy="160" r="540" stroke="rgba(53,173,223,0.12)" strokeWidth="1" />
          <circle cx="1240" cy="160" r="360" stroke="rgba(53,173,223,0.10)" strokeWidth="1" />
          <circle cx="1240" cy="160" r="200" stroke="rgba(53,173,223,0.14)" strokeWidth="1" />
        </svg>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '60rem', width: '100%', margin: '0 auto', padding: '4rem 1.5rem 4rem' }}>
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
                fontSize: 'clamp(2.5rem, 8vw, 4.25rem)',
                fontWeight: 700,
                color: WHITE,
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                marginBottom: '1.25rem',
              }}
            >
              Diogenes Sun Club
            </h1>
            <p style={{ fontFamily: B, fontSize: 'clamp(1.0625rem, 2.4vw, 1.3125rem)', fontWeight: 500, color: 'rgba(255,255,255,0.82)', lineHeight: 1.5, maxWidth: '34rem' }}>
              A new website built to grow your membership. Prepared by Masuyo Digital for Liz and the Diogenes committee.
            </p>
          </FadeIn>

          <FadeIn delay={250}>
            <div className="flex flex-wrap gap-2" style={{ marginTop: '2.25rem' }}>
              {['12 acres', '2 heated pools', 'Featured in The Times'].map(t => (
                <span
                  key={t}
                  style={{
                    fontFamily: B,
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    color: WHITE,
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    borderRadius: '999px',
                    padding: '0.4rem 0.85rem',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ============ WELCOME ============ */}
      <Section id="welcome" bg={WHITE}>
        <Head eyebrow="A note before we start" title="You are in a stronger position than you might think." />

        <FadeIn delay={80}>
          <Lead>The website is the tool, not the point.</Lead>
          <Chunk>Thank you for taking the time to talk things through.</Chunk>
          <Chunk>Before getting into the website itself, it is worth setting out what we understand the real goal to be.</Chunk>
        </FadeIn>

        {/* Headline stats */}
        <FadeIn delay={140}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4" style={{ margin: '2.5rem 0' }}>
            <StatCard value="12" label="acres of grounds" />
            <StatCard value="2" label="heated pools" />
            <StatCard value="400" label="target membership" accent />
            <StatCard value="50:50" label="gender balance" />
          </div>
        </FadeIn>

        <FadeIn delay={180}>
          <Chunk>Diogenes is in a strong position in many ways. The club benefits from:</Chunk>
          <BulletList
            items={[
              'Genuine community',
              'An enviable history',
              'Beautiful grounds with facilities many venues could only dream of',
              'The rare distinction of appearing in national press',
            ]}
          />
          <Chunk>
            You have been featured in The Times and visited by Naked Wanderings, which is the kind of credibility most clubs would give anything for.
          </Chunk>
          <Chunk>
            The warmth of the club comes through the moment you read the existing site, and that is something we want to build on, not replace.
          </Chunk>
        </FadeIn>

        {/* Press callout */}
        <FadeIn delay={220}>
          <Callout>
            <p style={{ fontFamily: H, fontSize: '1.25rem', fontWeight: 600, fontStyle: 'italic', color: NAVY, lineHeight: 1.5 }}>
              &ldquo;You will not be stared at, propositioned or ogled.&rdquo;
            </p>
            <p style={{ fontFamily: B, fontSize: '0.875rem', color: MID, marginTop: '0.625rem' }}>
              From the Diogenes website. Exactly the right tone, and we will keep it.
            </p>
          </Callout>
        </FadeIn>
      </Section>

      {/* ============ THE CHALLENGE ============ */}
      <Section id="challenge" bg={LIGHT}>
        <Head eyebrow="The challenge" title="The website has one primary job above all others." />

        <FadeIn delay={80}>
          <Chunk>There is a real and pressing challenge, and the website has to be built to solve it.</Chunk>
          <Chunk>The club needs new members, and it needs them reasonably soon.</Chunk>
        </FadeIn>

        <FadeIn delay={120}>
          <div className="grid grid-cols-2 gap-4" style={{ margin: '2.5rem 0' }}>
            <StatCard value="200" label="members today" />
            <StatCard value="400" label="the goal" accent />
          </div>
        </FadeIn>

        <FadeIn delay={160}>
          <Chunk>The membership sits at around 200 and needs to grow toward 400. Standing in the way:</Chunk>
          <BulletList
            items={[
              'The 50:50 balance of men and women has to be maintained.',
              'There is currently a list of men waiting to join who cannot, simply because there are not yet enough women members to keep that balance.',
              'The current membership skews older.',
              'Without a steady flow of new and younger members the long term future of the club becomes uncertain.',
            ]}
          />
        </FadeIn>

        <FadeIn delay={200}>
          <Callout>
            <p style={{ fontFamily: B, fontSize: '1.0625rem', fontWeight: 500, color: INK, lineHeight: 1.6 }}>
              So the website has one primary job above all others: to bring new members in, with a particular focus on attracting women and couples, presented in a way that feels warm, safe, modern and completely respectable.
            </p>
            <p style={{ fontFamily: B, fontSize: '0.9375rem', color: MID, marginTop: '0.625rem' }}>
              Everything in this proposal is built around that goal.
            </p>
          </Callout>
        </FadeIn>
      </Section>

      {/* ============ STRATEGY ============ */}
      <Section id="strategy" bg={WHITE}>
        <Head eyebrow="Our approach" title="What the website needs to do." />

        <FadeIn delay={60}>
          <Lead>Five principles underpin everything we build for Diogenes.</Lead>
          <Chunk>Each one translates directly into decisions about design, copy and functionality.</Chunk>
        </FadeIn>

        <div style={{ marginTop: '2.5rem' }}>
          <NumberedCard n="1" title="Speak to women and couples first.">
            <Chunk>The single most important audience is women, because the ratio is what unlocks everything else.</Chunk>
            <Chunk>The new site will be designed and written to make a woman who is curious but nervous feel immediately at ease. That means:</Chunk>
            <BulletList
              items={[
                'Warm imagery',
                'Reassurance woven through the copy',
                'Your existing testimonials from female members brought to the front',
                'Clear signposting of the new ladies events you are planning',
              ]}
            />
          </NumberedCard>

          <NumberedCard n="2" title="Reassure, without ever being seedy.">
            <Chunk>This is a serious naturist club, a sports and wellbeing community, and absolutely not a lifestyle or swingers club.</Chunk>
            <Chunk>That distinction is non-negotiable, and the site will make it unmistakably clear in a calm, confident, non-defensive way.</Chunk>
            <Chunk>Your own words already do this beautifully. We will make that reassurance easy to find for the people who need it, without ever planting the wrong idea.</Chunk>
          </NumberedCard>

          <NumberedCard n="3" title="Position the club around wellbeing, not just naturism.">
            <Chunk>The most powerful way to attract the next generation of members is to lead with what the club genuinely offers:</Chunk>
            <BulletList
              items={[
                'A digital detox',
                'Time in nature',
                'Body confidence',
                'Swimming, sport, yoga and sauna',
                'Real human connection away from screens',
              ]}
            />
            <Chunk>Naturism is part of that story, but the entry point for a nervous newcomer is wellbeing. This framing widens the appeal enormously.</Chunk>
          </NumberedCard>

          <NumberedCard n="4" title="Be findable.">
            <Chunk>A beautiful website that nobody finds does not solve the membership problem.</Chunk>
            <Chunk>Unlike many adult-oriented venues, naturism is a legitimate lifestyle and sport, which means you are not locked out of mainstream channels. That is a real advantage we will use.</Chunk>
          </NumberedCard>

          <NumberedCard n="5" title="Respect the community you already have." last>
            <Chunk>The existing members are the heart of the club, and the new site must feel like an evolution of Diogenes, not a replacement of it.</Chunk>
            <Chunk>Our recommendation is a warm, timeless, wellbeing-led design that appeals to newer and younger visitors while still feeling like home to existing members. This is a conversation, not a decision we make for you.</Chunk>
          </NumberedCard>
        </div>
      </Section>

      {/* ============ DISCOVERY ============ */}
      <Section id="discovery" bg={LIGHT}>
        <Head eyebrow="Getting found" title="Building the site is half the job." />

        <FadeIn delay={60}>
          <Lead>Helping the right people find it is the other half.</Lead>
          <Chunk>Here is how we will approach discovery, all included as part of this project unless noted.</Chunk>
        </FadeIn>

        <div style={{ marginTop: '2rem' }}>
          <Tactic icon={<IconSearch />} title="Local search">
            <Chunk>We will build the site to rank for the searches that matter:</Chunk>
            <Chips items={['naturist club near London', 'naturist club Buckinghamshire', 'naked yoga near me']} />
            <Chunk>Plus the wellbeing-led terms that bring in a broader audience. The current site is dated and not built for this. The new one will be.</Chunk>
          </Tactic>

          <Tactic icon={<IconPin />} title="Google Business Profile">
            <Chunk>We will help set up and optimise your Google presence so the club shows up properly on Google Maps and in local results, with photos, opening information and a route to enquire.</Chunk>
            <Chunk>This is one of the highest impact, lowest cost things a local club can do, and it is often neglected.</Chunk>
          </Tactic>

          <Tactic icon={<IconShare />} title="Built for sharing">
            <Chunk>Every page will be designed to look clean and discreet when shared on WhatsApp, Facebook or by email.</Chunk>
            <Chunk>Members can confidently share the club with friends without any awkward preview images.</Chunk>
          </Tactic>

          <Tactic icon={<IconDoc />} title="Content that attracts">
            <Chunk>Warm, genuinely useful content is what pulls curious people in from search and builds trust before they ever enquire. Over time that means:</Chunk>
            <BulletList
              items={[
                'A proper "new to naturism" guide',
                'The wellbeing benefits',
                'What to expect on a first visit',
                "Women's experiences",
              ]}
            />
            <Chunk>We will structure the site so this content works hard for you, and so it can grow.</Chunk>
          </Tactic>

          <Tactic icon={<IconStar />} title="The press and partnership angle">
            <Chunk>You have already had national press and a Naked Wanderings visit. That is rare and valuable.</Chunk>
            <Chunk>A modern, credible website makes future press, partnerships and features far easier to attract, because it gives journalists and partners something that reflects the quality of the club.</Chunk>
          </Tactic>
        </div>
      </Section>

      {/* ============ SCOPE ============ */}
      <Section id="scope" bg={WHITE}>
        <Head eyebrow="Scope of work" title="What we will build." />

        <FadeIn delay={60}>
          <Lead>A brand new, fully custom, public-facing website to replace the current one.</Lead>
          <Chunk>Built to be beautiful, fast, secure and mobile first, because most of your nervous first-time visitors will be browsing on a phone.</Chunk>
        </FadeIn>

        <div style={{ marginTop: '2rem' }}>
          <Deliverable title="A welcoming homepage">
            Built around the wellness, nature, community and confidence message, designed to make a nervous newcomer feel at ease within seconds.
          </Deliverable>
          <Deliverable title='A "new to naturism" and newbie FAQ section'>
            Using and elevating your own excellent existing copy, with the reassurance that women, couples and first timers are especially welcome, and the offer of free ladies events and welcome days.
          </Deliverable>
          <Deliverable title="A facilities section">
            Covering the twelve acres, the two heated indoor and outdoor pools, the sauna, tennis and pickleball, yoga, gardening and creative arts, and camping for tents and campervans. Each presented warmly rather than as a dry list.
          </Deliverable>
          <Deliverable title="An events and news section">
            Public facing, so you can show what life at the club actually looks like and keep the page feeling alive. Display only at this stage.
          </Deliverable>
          <Deliverable title='A clear membership and "arrange a visit" section'>
            Explaining how the trial visit works, with a simple, GDPR-compliant enquiry form that lands directly with you and respects your existing, careful vetting process. There is no automated joining; the human approval step you rely on stays exactly as it is.
          </Deliverable>
          <Deliverable title="A how to find us section">
            With location, parking and directions.
          </Deliverable>
          <Deliverable title="A clean link through to your existing members area" last>
            Which stays exactly as it is and is not touched as part of this project.
          </Deliverable>
        </div>

        <FadeIn delay={200}>
          <Callout>
            <p style={{ fontFamily: B, fontSize: '1.0625rem', fontWeight: 500, color: INK, lineHeight: 1.6 }}>
              Throughout, the site will use British spelling, your own warm tone of voice, and a calm, premium, modern design.
            </p>
            <p style={{ fontFamily: B, fontSize: '0.9375rem', color: MID, marginTop: '0.5rem' }}>
              Fully responsive, fast-loading and accessible, which matters given some of your members, and worth doing properly.
            </p>
          </Callout>
        </FadeIn>
      </Section>

      {/* ============ IMAGERY ============ */}
      <Section id="imagery" bg={LIGHT}>
        <Head eyebrow="An honest note" title="Imagery is the single most important factor." />

        <FadeIn delay={60}>
          <Chunk>We need to be straight with you about imagery.</Chunk>
          <Chunk>It is the single biggest factor in whether the new site achieves its goal, and it is the one part we cannot simply generate.</Chunk>
          <Chunk>
            The warmth you want, women laughing by the pool, outdoor yoga, sauna relaxation, people enjoying the grounds, can only really come from genuine photography of the club and real, consenting people.
          </Chunk>
          <Chunk>
            Generic stock photography of naturists either does not exist tastefully or looks exactly like the dated, posed imagery you want to avoid.
          </Chunk>
        </FadeIn>

        <FadeIn delay={120}>
          <Callout>
            <p style={{ fontFamily: B, fontSize: '1.0625rem', fontWeight: 600, color: NAVY, lineHeight: 1.6 }}>
              We will never use artificially generated images of people for a club like this.
            </p>
            <p style={{ fontFamily: B, fontSize: '0.9375rem', color: MID, marginTop: '0.5rem' }}>
              It would be both wrong and a risk to your reputation.
            </p>
          </Callout>
        </FadeIn>

        <FadeIn delay={160}>
          <Chunk>So the best version of this site depends on real photography.</Chunk>
          <Chunk>
            We do not offer photography ourselves, but we can arrange a professional shoot for you as an optional add-on, art directed so the images match the warm, wellbeing-led feel the site is built around.
          </Chunk>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ margin: '2rem 0' }}>
            {[
              { option: 'Option A', desc: 'Photographing members who are happy to volunteer. Authentic and warm.' },
              { option: 'Option B', desc: 'Bringing in professional models for the shoot. Controlled and polished.' },
            ].map(o => (
              <div key={o.option} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: '0.875rem', padding: '1.5rem' }}>
                <p style={{ fontFamily: H, fontSize: '1.125rem', fontWeight: 700, color: NAVY, marginBottom: '0.5rem' }}>{o.option}</p>
                <p style={{ fontFamily: B, fontSize: '1rem', lineHeight: 1.6, color: MID }}>{o.desc}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={240}>
          <Chunk>Either way, we would discuss which suits you.</Chunk>
          <Chunk>
            Where people are not shown, we will lean on your beautiful grounds, the pools, the woodland, sunshine and nature, which carry a great deal of warmth on their own.
          </Chunk>
          <Chunk>
            To get started we can absolutely build the site beautifully using your existing and grounds-based imagery, and elevate it further once new photography is ready.
          </Chunk>
        </FadeIn>
      </Section>

      {/* ============ COMPLIANCE ============ */}
      <Section id="compliance" bg={WHITE}>
        <Head eyebrow="Peace of mind" title="Compliance and security, taken seriously." />

        <FadeIn delay={60}>
          <Chunk>The site will be built to be GDPR compliant from the ground up.</Chunk>
          <Chunk>We will host it on a secure, managed server, so it is safe and reliable from launch.</Chunk>
          <Chunk>
            Naturism is a legitimate lifestyle and sport, and the site will be presented in a way that is entirely respectable and compliant with the major platforms. That protects your ability to be found and to advertise should you choose to later.
          </Chunk>
        </FadeIn>

        <FadeIn delay={120}>
          <BulletList
            items={[
              'GDPR-compliant privacy policy and cookie handling',
              'Secure, managed hosting with SSL certificate',
              'Firewall protection and regular backups',
              'Enquiry forms that treat personal data correctly',
              'Presentation compliant with major platforms and search engines',
            ]}
          />
        </FadeIn>
      </Section>

      {/* ============ INVESTMENT ============ */}
      <section
        id="investment"
        className="crosshatch-bg"
        style={{ position: 'relative', overflow: 'hidden', padding: '5.5rem 0', scrollMarginTop: '56px' }}
      >
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '60rem', margin: '0 auto', padding: '0 1.5rem' }}>
          <Head eyebrow="Your investment" title="A complete, done-for-you project." light />

          <FadeIn delay={60}>
            <Chunk light>
              Full custom public website, designed and built as described above, including discovery and findability work, GDPR compliance and secure setup.
            </Chunk>
          </FadeIn>

          {/* Price card */}
          <FadeIn delay={100}>
            <div
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.14)',
                borderRadius: '1rem',
                padding: 'clamp(1.75rem, 5vw, 2.75rem)',
                margin: '2rem 0',
                backdropFilter: 'blur(2px)',
              }}
            >
              <p style={{ fontFamily: B, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: BLUE, marginBottom: '0.75rem' }}>
                Project total
              </p>
              <p style={{ fontFamily: H, fontSize: 'clamp(3.5rem, 13vw, 6rem)', fontWeight: 700, color: WHITE, lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: '1.25rem' }}>
                £1,300
              </p>
              <p style={{ fontFamily: B, fontSize: '1rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: '2rem', maxWidth: '34rem' }}>
                A complete, done-for-you project. For comparison, this is meaningfully below the £2,400 you were previously quoted, while including the strategic and discovery work that a standard website build quote would not.
              </p>

              <p style={{ fontFamily: B, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(53,173,223,0.85)', marginBottom: '1rem' }}>
                Included
              </p>
              <BulletList
                light
                items={[
                  'Full custom design and build',
                  'Discovery and SEO setup',
                  'Google Business Profile optimisation',
                  'GDPR compliance and secure setup',
                  'Mobile-first, accessible build',
                  'One revision round as standard',
                ]}
              />
            </div>
          </FadeIn>

          {/* Optional add-ons */}
          <FadeIn delay={160}>
            <p style={{ fontFamily: B, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '1.25rem' }}>
              Optional add-ons
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { title: 'Secure managed hosting', desc: 'SSL, firewall and backups, with us looking after the technical side so you never have to think about it.', price: 'Monthly fee, to confirm' },
                { title: 'Professional photography shoot', desc: 'Arranged and art directed by us: the right images for the right brief.', price: 'Quoted on request' },
                { title: 'Ongoing care and updates', desc: 'We keep your news and events current and the site healthy, on a monthly retainer or as needed.', price: 'Monthly fee, to confirm' },
              ].map(extra => (
                <div
                  key={extra.title}
                  className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', padding: '1.25rem 1.5rem' }}
                >
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: H, fontSize: '1.0625rem', fontWeight: 700, color: WHITE, marginBottom: '0.25rem' }}>{extra.title}</p>
                    <p style={{ fontFamily: B, fontSize: '0.9375rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{extra.desc}</p>
                  </div>
                  <p style={{ fontFamily: B, fontSize: '0.8125rem', fontWeight: 600, color: BLUE, whiteSpace: 'nowrap', flexShrink: 0 }}>{extra.price}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ============ FUTURE PHASES ============ */}
      <Section id="future" bg={WHITE}>
        <Head eyebrow="Looking ahead" title="Future phases, for later, not now." />

        <FadeIn delay={60}>
          <Chunk>You were clear that the priority right now is the public website, and we agree.</Chunk>
          <Chunk>For the future, when you are ready, there is a natural second phase:</Chunk>
          <BulletList
            items={[
              'Online visitor and membership booking with proper onboarding',
              'Event and camping bookings',
              'A members and fee management system',
            ]}
          />
          <Chunk>
            Tools like MembershipMojo can handle much of this. We have deliberately kept all of that out of this proposal so you can get the public site live and working for you first.
          </Chunk>
          <Chunk>When the time comes, we would be glad to help with the rest.</Chunk>
        </FadeIn>
      </Section>

      {/* ============ THINGS TO AGREE ============ */}
      <Section id="discuss" bg={LIGHT}>
        <Head eyebrow="A conversation, not a dictate" title="A few things we would like to agree with you." />

        <FadeIn delay={60}>
          <Chunk>To make the site as effective as possible, there are a few decisions we would love your steer on. These are not things we decide for you.</Chunk>
        </FadeIn>

        <FadeIn delay={120}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
            {[
              { q: 'How far to lean toward a younger feel.', a: 'We recommend a warm, wellbeing-led design that draws in newer and younger visitors while still feeling like home to your existing members. We would like your view on where the balance sits.' },
              { q: 'Imagery.', a: 'Which photography route appeals: members who volunteer, professional models, or starting with grounds and facilities imagery and adding people later.' },
              { q: 'Sign-off process.', a: 'Whether decisions sit with you, Liz, or need to go to the committee, so we can shape things to make that as smooth as possible.' },
              { q: 'Anything from the other proposal you particularly liked.', a: "If there were elements of the quote you were previously sent that resonated, we would love to know so we can make sure ours is the strongest possible fit." },
            ].map((item, i) => (
              <div key={i} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: '0.875rem', padding: '1.5rem 1.75rem' }}>
                <p style={{ fontFamily: H, fontSize: '1.125rem', fontWeight: 700, color: NAVY, marginBottom: '0.5rem' }}>{item.q}</p>
                <p style={{ fontFamily: B, fontSize: '1rem', lineHeight: 1.65, color: MID }}>{item.a}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </Section>

      {/* ============ NEXT STEPS ============ */}
      <Section id="next" bg={WHITE}>
        <Head eyebrow="When you are ready" title="The next step is just a conversation." />

        <FadeIn delay={60}>
          <Chunk>If this feels right, the next step is simply a conversation to confirm the details above and the look and feel you want.</Chunk>
          <Chunk>From there we would begin design, share early concepts with you for feedback, and build from there, keeping you involved at every stage.</Chunk>
          <Chunk>
            We are genuinely excited about helping Diogenes grow, and about building something that does justice to the club you have all worked so hard to create.
          </Chunk>
        </FadeIn>

        {/* Contact card */}
        <FadeIn delay={140}>
          <div style={{ marginTop: '2.5rem', borderRadius: '1rem', overflow: 'hidden', border: `1px solid ${BORDER}` }}>
            <div className="crosshatch-bg" style={{ padding: '1.75rem 2rem' }}>
              <LogoFullWhite className="h-4 w-auto mb-3" />
              <p style={{ fontFamily: B, fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)' }}>Get in touch to move forward.</p>
            </div>
            <div style={{ background: WHITE, padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a href="mailto:hello@masuyodigital.com" style={{ fontFamily: B, fontSize: '1rem', fontWeight: 500, color: NAVY, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <IconMail />
                hello@masuyodigital.com
              </a>
              <a href="https://masuyodigital.com" target="_blank" rel="noopener noreferrer" style={{ fontFamily: B, fontSize: '1rem', fontWeight: 500, color: NAVY, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <IconGlobe />
                masuyodigital.com
              </a>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <p style={{ fontFamily: H, fontSize: '1.1875rem', fontWeight: 600, fontStyle: 'italic', color: NAVY, marginTop: '3rem', lineHeight: 1.6 }}>
            Thank you for reading this in full. We hope it reflects the care we would bring to the work itself.
          </p>
        </FadeIn>
      </Section>

      {/* Footer strip */}
      <div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
        style={{ background: NAVY, padding: '1.75rem 1.5rem' }}
      >
        <p style={{ fontFamily: B, fontSize: '0.8125rem', color: 'rgba(255,255,255,0.55)' }}>Diogenes Sun Club, proposal by Masuyo Digital</p>
        <p style={{ fontFamily: B, fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)' }}>Private and confidential</p>
      </div>
    </>
  )
}

/* ---------- Composite components that need brand tokens in scope ---------- */

function NumberedCard({ n, title, children, last = false }: { n: string; title: string; children: ReactNode; last?: boolean }) {
  return (
    <FadeIn>
      <div style={{ display: 'flex', gap: '1.25rem', padding: '1.75rem 0', borderTop: `1px solid ${BORDER}`, borderBottom: last ? `1px solid ${BORDER}` : undefined }}>
        <div
          style={{
            flexShrink: 0,
            width: '2.75rem',
            height: '2.75rem',
            borderRadius: '0.75rem',
            background: NAVY,
            color: WHITE,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: H,
            fontSize: '1.25rem',
            fontWeight: 700,
          }}
        >
          {n}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ fontFamily: H, fontSize: '1.3125rem', fontWeight: 700, color: NAVY, marginBottom: '0.625rem', lineHeight: 1.3 }}>{title}</h3>
          {children}
        </div>
      </div>
    </FadeIn>
  )
}

function Tactic({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <FadeIn>
      <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: '1rem', padding: '1.75rem', marginBottom: '1rem' }}>
        <div className="flex items-center gap-3" style={{ marginBottom: '0.875rem' }}>
          <div style={{ flexShrink: 0, width: '2.5rem', height: '2.5rem', borderRadius: '0.625rem', background: LIGHT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {icon}
          </div>
          <h3 style={{ fontFamily: H, fontSize: '1.25rem', fontWeight: 700, color: NAVY }}>{title}</h3>
        </div>
        {children}
      </div>
    </FadeIn>
  )
}

function Deliverable({ title, children, last = false }: { title: string; children: ReactNode; last?: boolean }) {
  return (
    <FadeIn>
      <div style={{ display: 'flex', gap: '0.875rem', padding: '1.25rem 0', borderTop: `1px solid ${BORDER}`, borderBottom: last ? `1px solid ${BORDER}` : undefined }}>
        <Check />
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontFamily: H, fontSize: '1.125rem', fontWeight: 700, color: NAVY, marginBottom: '0.3rem', lineHeight: 1.3 }}>{title}</p>
          <p style={{ fontFamily: B, fontSize: '1rem', lineHeight: 1.6, color: MID }}>{children}</p>
        </div>
      </div>
    </FadeIn>
  )
}

/* ---------- Icons (tasteful inline SVG, no dependencies) ---------- */

function IconSearch() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="8.5" cy="8.5" r="5.5" stroke={NAVY} strokeWidth="1.6" />
      <path d="M12.8 12.8L17 17" stroke={BLUE} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}
function IconPin() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 18s6-5.2 6-9.5A6 6 0 1 0 4 8.5C4 12.8 10 18 10 18Z" stroke={NAVY} strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="10" cy="8.2" r="2.1" fill={BLUE} />
    </svg>
  )
}
function IconShare() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="5" cy="10" r="2.2" stroke={NAVY} strokeWidth="1.6" />
      <circle cx="15" cy="5" r="2.2" stroke={BLUE} strokeWidth="1.6" />
      <circle cx="15" cy="15" r="2.2" stroke={BLUE} strokeWidth="1.6" />
      <path d="M7 9l6-3M7 11l6 3" stroke={NAVY} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
function IconDoc() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 3h6l4 4v10H5V3Z" stroke={NAVY} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M11 3v4h4" stroke={NAVY} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M7.5 11h5M7.5 13.5h5" stroke={BLUE} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
function IconStar() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 2.5l2.2 4.6 5 .7-3.6 3.5.86 5L10 14l-4.46 2.3.86-5L2.8 7.8l5-.7L10 2.5Z" stroke={NAVY} strokeWidth="1.5" strokeLinejoin="round" fill="rgba(53,173,223,0.18)" />
    </svg>
  )
}
function IconMail() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <rect x="1.5" y="3.5" width="15" height="11" rx="1.5" stroke={BLUE} strokeWidth="1.5" />
      <path d="M2 5l7 4.5L16 5" stroke={BLUE} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}
function IconGlobe() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="9" cy="9" r="7" stroke={BLUE} strokeWidth="1.5" />
      <path d="M9 2c-2 2.4-2 11.6 0 14M9 2c2 2.4 2 11.6 0 14M2 9h14" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
