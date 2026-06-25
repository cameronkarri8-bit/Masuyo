import FadeIn from './FadeIn'

// --- Design tokens (available as CSS custom properties set by ProposalShell) ---
const H = 'var(--font-ph)'   // Playfair Display
const B = 'var(--font-pb)'   // DM Sans

const CREAM   = '#F9F7F4'
const WHITE   = '#FFFFFF'
const GREEN   = '#2A3D2B'
const GREEN2  = '#4A6B4C'
const SAGE    = '#7A9E75'
const SAND    = '#B8895A'
const BODY    = '#4A4540'
const MUTED   = '#7A7570'
const BORDER  = '#E0DDD6'
const GREENBG = '#2A3D2B'

// Section container
function Section({
  id, bg = CREAM, children, tight = false,
}: {
  id: string
  bg?: string
  children: React.ReactNode
  tight?: boolean
}) {
  return (
    <section
      id={id}
      style={{
        background: bg,
        padding: tight ? '4rem 0' : '5.5rem 0',
        borderTop: `1px solid ${BORDER}`,
      }}
    >
      <div style={{ maxWidth: '46rem', margin: '0 auto', padding: '0 1.75rem' }}>
        {children}
      </div>
    </section>
  )
}

// Label above headings
function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: B,
      fontSize: '0.6875rem',
      fontWeight: 500,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: SAGE,
      marginBottom: '0.75rem',
    }}>
      {children}
    </p>
  )
}

// Section heading
function SectionH2({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2 style={{
      fontFamily: H,
      fontSize: 'clamp(1.625rem, 4vw, 2.25rem)',
      fontWeight: 500,
      color: light ? '#F0ECE4' : GREEN,
      lineHeight: 1.25,
      marginBottom: '1.75rem',
      letterSpacing: '-0.01em',
    }}>
      {children}
    </h2>
  )
}

// Body paragraph
function P({ children, light = false, style: extraStyle }: { children: React.ReactNode; light?: boolean; style?: React.CSSProperties }) {
  return (
    <p style={{
      fontFamily: B,
      fontSize: '1rem',
      lineHeight: 1.85,
      color: light ? 'rgba(240,236,228,0.82)' : BODY,
      marginBottom: '1.25rem',
      ...extraStyle,
    }}>
      {children}
    </p>
  )
}

// Pull-quote stat
function Stat({ value, label, light = false }: { value: string; label: string; light?: boolean }) {
  return (
    <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
      <p style={{
        fontFamily: H,
        fontSize: 'clamp(2.5rem, 7vw, 3.75rem)',
        fontWeight: 600,
        color: light ? '#A8D4A0' : SAGE,
        lineHeight: 1,
        marginBottom: '0.5rem',
      }}>
        {value}
      </p>
      <p style={{ fontFamily: B, fontSize: '0.8125rem', color: light ? 'rgba(240,236,228,0.65)' : MUTED, lineHeight: 1.4 }}>
        {label}
      </p>
    </div>
  )
}

// Numbered strategy point
function StrategyPoint({
  number, title, body,
}: { number: string; title: string; body: string }) {
  return (
    <FadeIn delay={Number(number) * 60}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2.5rem 1fr',
        gap: '1rem',
        paddingBottom: '2rem',
        borderBottom: `1px solid ${BORDER}`,
        marginBottom: '2rem',
      }}>
        <p style={{ fontFamily: H, fontSize: '1.25rem', fontWeight: 500, color: SAGE, paddingTop: '0.125rem' }}>{number}</p>
        <div>
          <p style={{ fontFamily: H, fontSize: '1.0625rem', fontWeight: 500, color: GREEN, marginBottom: '0.5rem' }}>{title}</p>
          <p style={{ fontFamily: B, fontSize: '0.9375rem', lineHeight: 1.8, color: BODY }}>{body}</p>
        </div>
      </div>
    </FadeIn>
  )
}

// Bullet item
function Bullet({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <li style={{
      display: 'flex',
      gap: '0.75rem',
      paddingBottom: '0.875rem',
      borderBottom: `1px solid ${BORDER}`,
      marginBottom: '0.875rem',
      fontFamily: B,
      fontSize: '0.9375rem',
      lineHeight: 1.7,
      color: accent ? BODY : BODY,
      alignItems: 'flex-start',
    }}>
      <span style={{ color: SAGE, flexShrink: 0, paddingTop: '0.35rem' }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
      <span>{children}</span>
    </li>
  )
}

// Discovery tactic
function Tactic({ title, body }: { title: string; body: string }) {
  return (
    <FadeIn>
      <div style={{ paddingBottom: '1.75rem', marginBottom: '1.75rem', borderBottom: `1px solid ${BORDER}` }}>
        <p style={{ fontFamily: H, fontSize: '1rem', fontWeight: 500, color: GREEN, marginBottom: '0.4rem' }}>{title}</p>
        <p style={{ fontFamily: B, fontSize: '0.9375rem', lineHeight: 1.8, color: BODY }}>{body}</p>
      </div>
    </FadeIn>
  )
}

export default function ProposalContent() {
  return (
    <>
      {/* ─── HERO ─── */}
      <div
        style={{
          position: 'relative',
          height: '100svh',
          minHeight: '28rem',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        {/* Hero image - place your image at public/diogenes-hero.jpg to enable */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/diogenes-hero.jpg"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 60%',
          }}
        />
        {/* Gradient overlay for text legibility */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(20,36,22,0.18) 0%, rgba(20,36,22,0.55) 60%, rgba(20,36,22,0.82) 100%)',
        }} />

        {/* Hero content */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '46rem',
            padding: '3rem 1.75rem 3.5rem',
            width: '100%',
          }}
        >
          <FadeIn>
            <p style={{
              fontFamily: B,
              fontSize: '0.6875rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.6)',
              marginBottom: '1rem',
            }}>
              A proposal prepared for
            </p>
            <h1 style={{
              fontFamily: H,
              fontSize: 'clamp(2.25rem, 7vw, 3.5rem)',
              fontWeight: 500,
              color: '#FFFFFF',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              marginBottom: '1rem',
            }}>
              Diogenes Sun Club
            </h1>
            <p style={{
              fontFamily: B,
              fontSize: '1.0625rem',
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.6,
              maxWidth: '28rem',
            }}>
              Prepared by Masuyo Digital for Liz and the Diogenes committee.
            </p>
          </FadeIn>

          <FadeIn delay={300}>
            <p style={{
              marginTop: '3rem',
              fontFamily: B,
              fontSize: '0.8125rem',
              color: 'rgba(255,255,255,0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                <path d="M7 3v8M3 9l4 4 4-4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Scroll to explore
            </p>
          </FadeIn>
        </div>
      </div>

      {/* ─── WELCOME ─── */}
      <Section id="welcome" bg={CREAM}>
        <FadeIn>
          <Label>A note before we start</Label>
          <SectionH2>You are in a stronger position than you might think.</SectionH2>
        </FadeIn>

        <FadeIn delay={80}>
          <P>
            Thank you for taking the time to talk things through. Before getting into the website itself, it is worth setting out what we understand the real goal to be, because the website is the tool, not the point.
          </P>
          <P>
            Diogenes is in a strong position in many ways. You have also been featured in The Times and visited by Naked Wanderings, which is the kind of credibility most clubs would give anything for. The warmth of the club comes through the moment you read the existing site, and that is something we want to build on, not replace.
          </P>
        </FadeIn>

        {/* Stat grid */}
        <FadeIn delay={140}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1px',
            background: BORDER,
            margin: '2.5rem 0',
            borderRadius: '0.5rem',
            overflow: 'hidden',
            border: `1px solid ${BORDER}`,
          }}>
            {[
              { value: '12', label: 'acres of grounds' },
              { value: '2', label: 'heated pools' },
              { value: '400', label: 'target membership' },
              { value: '50:50', label: 'gender balance' },
            ].map(s => (
              <div key={s.label} style={{ background: WHITE }}>
                <Stat value={s.value} label={s.label} />
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={180}>
          <P>
            The club benefits from genuine community, an enviable history, beautiful grounds with facilities many venues could only dream of, and the rare distinction of appearing in national press. The website we build must be worthy of all of that.
          </P>
        </FadeIn>

        {/* Press callout */}
        <FadeIn delay={220}>
          <div style={{
            borderLeft: `3px solid ${SAGE}`,
            paddingLeft: '1.25rem',
            margin: '2rem 0',
          }}>
            <p style={{
              fontFamily: H,
              fontSize: '1.0625rem',
              fontWeight: 400,
              fontStyle: 'italic',
              color: GREEN2,
              lineHeight: 1.65,
            }}>
              "You will not be stared at, propositioned or ogled."
            </p>
            <p style={{ fontFamily: B, fontSize: '0.8125rem', color: MUTED, marginTop: '0.5rem' }}>
              From the Diogenes website - exactly the right tone. We will keep it.
            </p>
          </div>
        </FadeIn>
      </Section>

      {/* ─── THE CHALLENGE ─── */}
      <Section id="challenge" bg={WHITE}>
        <FadeIn>
          <Label>The challenge</Label>
          <SectionH2>The website has one primary job above all others.</SectionH2>
        </FadeIn>

        <FadeIn delay={80}>
          <P>
            But there is a real and pressing challenge, and the website has to be built to solve it. The club needs new members, and it needs them reasonably soon. The membership sits at around 200 and needs to grow toward 400.
          </P>
          <P>
            The 50:50 balance of men and women has to be maintained, which means there is currently a list of men waiting to join who cannot, simply because there are not yet enough women members to keep that balance. On top of this, the current membership skews older, and without a steady flow of new and younger members the long term future of the club becomes uncertain.
          </P>
        </FadeIn>

        {/* Key challenge stats */}
        <FadeIn delay={140}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1px',
            background: BORDER,
            margin: '2.5rem 0',
            borderRadius: '0.5rem',
            overflow: 'hidden',
            border: `1px solid ${BORDER}`,
          }}>
            <div style={{ background: CREAM }}>
              <Stat value="200" label="current members" />
            </div>
            <div style={{ background: CREAM }}>
              <Stat value="400" label="target - the goal" />
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={180}>
          <P>
            So the website has one primary job above all others: to bring new members in, with a particular focus on attracting women and couples, presented in a way that feels warm, safe, modern and completely respectable. Everything in this proposal is built around that goal.
          </P>
        </FadeIn>
      </Section>

      {/* ─── STRATEGY ─── */}
      <Section id="strategy" bg={CREAM}>
        <FadeIn>
          <Label>Our approach</Label>
          <SectionH2>What the website needs to do.</SectionH2>
        </FadeIn>

        <FadeIn delay={60}>
          <P>
            Five principles underpin everything we build for Diogenes. They are not abstract - each one translates directly into decisions about design, copy and functionality.
          </P>
        </FadeIn>

        <div style={{ marginTop: '2.5rem' }}>
          <StrategyPoint
            number="1"
            title="Speak to women and couples first."
            body="The single most important audience is women, because the ratio is what unlocks everything else. The new site will be designed and written to make a woman who is curious but nervous feel immediately at ease. That means warm imagery, reassurance woven through the copy, your existing testimonials from female members brought to the front, and clear signposting of the new ladies events you are planning."
          />
          <StrategyPoint
            number="2"
            title="Reassure, without ever being seedy."
            body="This is a serious naturist club, a sports and wellbeing community, and absolutely not a lifestyle or swingers club. That distinction is non-negotiable and the site will make it unmistakably clear in a calm, confident, non-defensive way. Your own words already do this beautifully. We will make that reassurance easy to find for the people who need it, without ever planting the wrong idea."
          />
          <StrategyPoint
            number="3"
            title="Position the club around wellbeing, not just naturism."
            body="The most powerful way to attract the next generation of members is to lead with what the club genuinely offers: a digital detox, time in nature, body confidence, swimming, sport, yoga, sauna, real human connection away from screens. Naturism is part of that story, but the entry point for a nervous newcomer is wellbeing. This framing widens the appeal enormously."
          />
          <StrategyPoint
            number="4"
            title="Be findable."
            body="A beautiful website that nobody finds does not solve the membership problem. Unlike many adult-oriented venues, naturism is a legitimate lifestyle and sport, which means you are not locked out of mainstream channels. That is a real advantage we will use."
          />
          <StrategyPoint
            number="5"
            title="Respect the community you already have."
            body="The existing members are the heart of the club, and the new site must feel like an evolution of Diogenes, not a replacement of it. Our recommendation is a warm, timeless, wellbeing-led design that appeals to newer and younger visitors while still feeling like home to existing members - but this is a conversation, not a decision we make for you."
          />
        </div>
      </Section>

      {/* ─── DISCOVERY ─── */}
      <Section id="discovery" bg={WHITE}>
        <FadeIn>
          <Label>Getting found</Label>
          <SectionH2>Building the site is half the job.</SectionH2>
        </FadeIn>

        <FadeIn delay={80}>
          <P>
            Helping the right people find it is the other half. Here is how we will approach discovery - all included as part of this project unless noted.
          </P>
        </FadeIn>

        <div style={{ marginTop: '2rem' }}>
          <Tactic
            title="Local search"
            body="We will build the site to rank for the searches that matter - things like naturist club near London, naturist club Buckinghamshire, naked yoga near me, and the wellbeing-led terms that bring in a broader audience. The current site is dated and not built for this; the new one will be."
          />
          <Tactic
            title="Google Business Profile"
            body="We will help set up and optimise your Google presence so the club shows up properly on Google Maps and in local results, with photos, opening information and a route to enquire. This is one of the highest impact, lowest cost things a local club can do, and it is often neglected."
          />
          <Tactic
            title="Built for sharing"
            body="Every page will be designed to look clean and discreet when shared on WhatsApp, Facebook or by email, so members can confidently share the club with friends without any awkward preview images."
          />
          <Tactic
            title="Content that attracts"
            body={`Over time, warm, genuinely useful content - a proper "new to naturism" guide, the wellbeing benefits, what to expect on a first visit, women's experiences - is what pulls curious people in from search and builds trust before they ever enquire. We will structure the site so this content works hard for you, and so it can grow.`}
          />
          <Tactic
            title="The press and partnership angle"
            body="You have already had national press and a Naked Wanderings visit. That is rare and valuable. A modern, credible website makes future press, partnerships and features far easier to attract, because it gives journalists and partners something that reflects the quality of the club."
          />
        </div>
      </Section>

      {/* ─── SCOPE ─── */}
      <Section id="scope" bg={CREAM}>
        <FadeIn>
          <Label>Scope of work</Label>
          <SectionH2>What we will build.</SectionH2>
        </FadeIn>

        <FadeIn delay={80}>
          <P>
            This proposal covers a brand new, fully custom, public-facing website to replace the current one. It is built to be beautiful, fast, secure and mobile first - because most of your nervous first-time visitors will be browsing on a phone.
          </P>
        </FadeIn>

        <FadeIn delay={140}>
          <ul style={{ listStyle: 'none', padding: 0, margin: '2rem 0' }}>
            <Bullet>
              <strong style={{ color: GREEN }}>A welcoming homepage,</strong>{' '}
              built around the wellness, nature, community and confidence message, designed to make a nervous newcomer feel at ease within seconds.
            </Bullet>
            <Bullet>
              <strong style={{ color: GREEN }}>A "new to naturism" and newbie FAQ section,</strong>{' '}
              using and elevating your own excellent existing copy, with the reassurance that women, couples and first timers are especially welcome, and the offer of free ladies events and welcome days.
            </Bullet>
            <Bullet>
              <strong style={{ color: GREEN }}>A facilities section</strong>{' '}
              covering the twelve acres, the two heated indoor and outdoor pools, the sauna, tennis and pickleball, yoga, gardening and creative arts, and camping for tents and campervans - each presented warmly rather than as a dry list.
            </Bullet>
            <Bullet>
              <strong style={{ color: GREEN }}>An events and news section,</strong>{' '}
              public facing, so you can show what life at the club actually looks like and keep the page feeling alive. Display only at this stage.
            </Bullet>
            <Bullet>
              <strong style={{ color: GREEN }}>A clear membership and "arrange a visit" section,</strong>{' '}
              explaining how the trial visit works and including a simple, GDPR-compliant enquiry form that lands directly with you and respects your existing, careful vetting process. There is no automated joining; the human approval step you rely on stays exactly as it is.
            </Bullet>
            <Bullet>
              <strong style={{ color: GREEN }}>A how to find us section</strong>{' '}
              with location, parking and directions.
            </Bullet>
            <Bullet>
              <strong style={{ color: GREEN }}>A clean link through to your existing members area,</strong>{' '}
              which stays exactly as it is and is not touched as part of this project.
            </Bullet>
          </ul>
        </FadeIn>

        <FadeIn delay={200}>
          <P>
            Throughout, the site will use British spelling, your own warm tone of voice, and a calm, premium, modern design. Fully responsive, fast-loading, and accessible - which matters given some of your members, and worth doing properly.
          </P>
        </FadeIn>
      </Section>

      {/* ─── IMAGERY ─── */}
      <Section id="imagery" bg={WHITE}>
        <FadeIn>
          <Label>An honest note</Label>
          <SectionH2>Imagery is the single most important factor.</SectionH2>
        </FadeIn>

        <FadeIn delay={80}>
          <P>
            We need to be straight with you about imagery, because it is the single biggest factor in whether the new site achieves its goal, and it is the one part we cannot simply generate.
          </P>
          <P>
            The warmth you want - women laughing by the pool, outdoor yoga, sauna relaxation, people enjoying the grounds - can only really come from genuine photography of the club and real, consenting people. Generic stock photography of naturists either does not exist tastefully or looks exactly like the dated, posed imagery you want to avoid. We will never use artificially generated images of people for a club like this; it would be both wrong and a risk to your reputation.
          </P>
          <P>
            So the best version of this site depends on real photography. We do not offer photography ourselves, but we can arrange a professional shoot for you as an optional add-on, art directed so the images match the warm, wellbeing-led feel the site is built around.
          </P>
        </FadeIn>

        <FadeIn delay={140}>
          <div style={{
            background: CREAM,
            border: `1px solid ${BORDER}`,
            borderRadius: '0.5rem',
            padding: '1.5rem',
            margin: '1.5rem 0',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
          }}>
            {[
              { option: 'Option A', desc: 'Photographing members who are happy to volunteer - authentic and warm.' },
              { option: 'Option B', desc: 'Bringing in professional models for the shoot - controlled and polished.' },
            ].map(o => (
              <div key={o.option} style={{ padding: '0.75rem' }}>
                <p style={{ fontFamily: H, fontSize: '0.9375rem', fontWeight: 500, color: GREEN, marginBottom: '0.375rem' }}>{o.option}</p>
                <p style={{ fontFamily: B, fontSize: '0.875rem', lineHeight: 1.7, color: BODY }}>{o.desc}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={180}>
          <P>
            Either way, we would discuss which suits you. Where people are not shown, we will lean on your beautiful grounds, the pools, the woodland, sunshine and nature - which carry a great deal of warmth on their own. To get started we can absolutely build the site beautifully using your existing and grounds-based imagery, and elevate it further once new photography is ready.
          </P>
        </FadeIn>
      </Section>

      {/* ─── COMPLIANCE ─── */}
      <Section id="compliance" bg={CREAM}>
        <FadeIn>
          <Label>Peace of mind</Label>
          <SectionH2>Compliance and security, taken seriously.</SectionH2>
        </FadeIn>

        <FadeIn delay={80}>
          <P>
            The site will be built to be GDPR compliant from the ground up: a clear privacy policy, properly handled enquiry forms, a compliant cookie approach, and member data treated correctly.
          </P>
          <P>
            We will host the site on a secure, managed server with an SSL certificate, firewall protection and regular backups, so it is safe and reliable from launch.
          </P>
          <P>
            Naturism is a legitimate lifestyle and sport, and the site will be presented in a way that is entirely respectable and compliant with the major platforms - which protects your ability to be found and to advertise should you choose to later.
          </P>
        </FadeIn>

        <FadeIn delay={140}>
          <ul style={{ listStyle: 'none', padding: 0, margin: '1.5rem 0 0' }}>
            <Bullet>GDPR-compliant privacy policy and cookie handling</Bullet>
            <Bullet>Secure, managed hosting with SSL certificate</Bullet>
            <Bullet>Firewall protection and regular backups</Bullet>
            <Bullet>Enquiry forms that treat personal data correctly</Bullet>
            <Bullet>Presentation compliant with major platforms and search engines</Bullet>
          </ul>
        </FadeIn>
      </Section>

      {/* ─── INVESTMENT ─── */}
      <section
        id="investment"
        style={{
          background: GREENBG,
          padding: '5.5rem 0',
          borderTop: `1px solid rgba(255,255,255,0.08)`,
        }}
      >
        <div style={{ maxWidth: '46rem', margin: '0 auto', padding: '0 1.75rem' }}>
          <FadeIn>
            <Label>Your investment</Label>
            <p style={{
              fontFamily: H,
              fontSize: '0.875rem',
              fontWeight: 400,
              color: 'rgba(240,236,228,0.55)',
              marginBottom: '2.5rem',
              lineHeight: 1.6,
              textTransform: 'none' as const,
              letterSpacing: 0,
            }}>
              Full custom public website, designed and built as described above,
              including discovery and findability work, GDPR compliance and secure setup.
            </p>
          </FadeIn>

          {/* Price card */}
          <FadeIn delay={100}>
            <div style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '0.75rem',
              padding: '2.5rem',
              marginBottom: '2rem',
            }}>
              <p style={{ fontFamily: B, fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(168,212,160,0.7)', marginBottom: '0.625rem' }}>
                Project total
              </p>
              <p style={{ fontFamily: H, fontSize: 'clamp(3rem, 10vw, 5rem)', fontWeight: 600, color: '#FFFFFF', lineHeight: 1, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                £1,300
              </p>
              <p style={{ fontFamily: B, fontSize: '0.875rem', color: 'rgba(240,236,228,0.6)', lineHeight: 1.6, marginBottom: '2rem' }}>
                A complete, done-for-you project. For comparison, this is meaningfully below the £2,400 you were previously quoted, while including the strategic and discovery work that a standard website build quote would not.
              </p>

              <p style={{ fontFamily: B, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(168,212,160,0.7)', marginBottom: '1rem' }}>
                Included
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  'Full custom design and build',
                  'Discovery and SEO setup',
                  'Google Business Profile optimisation',
                  'GDPR compliance and secure setup',
                  'Mobile-first, accessible build',
                  'One revision round as standard',
                ].map(item => (
                  <li key={item} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginBottom: '0.625rem', fontFamily: B, fontSize: '0.9375rem', color: 'rgba(240,236,228,0.82)', lineHeight: 1.5 }}>
                    <svg style={{ flexShrink: 0, marginTop: '0.25rem', color: '#A8D4A0' }} width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Optional extras */}
          <FadeIn delay={160}>
            <p style={{ fontFamily: B, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(168,212,160,0.55)', marginBottom: '1.25rem' }}>
              Optional add-ons
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                {
                  title: 'Secure managed hosting',
                  desc: 'SSL, firewall and backups, with us looking after the technical side so you never have to think about it.',
                  price: 'Monthly fee - to confirm',
                },
                {
                  title: 'Professional photography shoot',
                  desc: 'Arranged and art directed by us: the right images for the right brief.',
                  price: 'Quoted on request',
                },
                {
                  title: 'Ongoing care and updates',
                  desc: 'We keep your news and events current and the site healthy - on a monthly retainer or as needed.',
                  price: 'Monthly fee - to confirm',
                },
              ].map(extra => (
                <div key={extra.title} style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  borderRadius: '0.5rem',
                  padding: '1.25rem 1.5rem',
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: '1rem',
                  alignItems: 'start',
                }}>
                  <div>
                    <p style={{ fontFamily: B, fontSize: '0.9375rem', fontWeight: 500, color: 'rgba(240,236,228,0.9)', marginBottom: '0.25rem' }}>{extra.title}</p>
                    <p style={{ fontFamily: B, fontSize: '0.8125rem', color: 'rgba(240,236,228,0.5)', lineHeight: 1.6 }}>{extra.desc}</p>
                  </div>
                  <p style={{ fontFamily: B, fontSize: '0.75rem', color: 'rgba(168,212,160,0.65)', whiteSpace: 'nowrap', paddingTop: '0.125rem', textAlign: 'right' }}>{extra.price}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── FUTURE PHASES ─── */}
      <Section id="future" bg={WHITE}>
        <FadeIn>
          <Label>Looking ahead</Label>
          <SectionH2>Future phases - for later, not now.</SectionH2>
        </FadeIn>

        <FadeIn delay={80}>
          <P>
            You were clear that the priority right now is the public website, and we agree. For the future, when you are ready, there is a natural second phase.
          </P>
          <P>
            Online visitor and membership booking with proper onboarding, event and camping bookings, and a members and fee management system. Tools like MembershipMojo can handle much of this. We have deliberately kept all of that out of this proposal so you can get the public site live and working for you first.
          </P>
          <P>
            When the time comes, we would be glad to help with the rest.
          </P>
        </FadeIn>
      </Section>

      {/* ─── THINGS TO AGREE ─── */}
      <Section id="discuss" bg={CREAM}>
        <FadeIn>
          <Label>A conversation, not a dictate</Label>
          <SectionH2>A few things we would like to agree with you.</SectionH2>
        </FadeIn>

        <FadeIn delay={80}>
          <P>
            To make the site as effective as possible, there are a few decisions we would love your steer on. These are not things we decide for you.
          </P>
        </FadeIn>

        <FadeIn delay={140}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
            {[
              {
                q: 'How far to lean toward a younger feel.',
                a: 'We recommend a warm, wellbeing-led design that draws in newer and younger visitors while still feeling like home to your existing members. We would like your view on where the balance sits.',
              },
              {
                q: 'Imagery.',
                a: 'Which photography route appeals - members who volunteer, professional models, or starting with grounds and facilities imagery and adding people later.',
              },
              {
                q: 'Sign-off process.',
                a: 'Whether decisions sit with you, Liz, or need to go to the committee, so we can shape things to make that as smooth as possible.',
              },
              {
                q: 'Anything from the other proposal you particularly liked.',
                a: "If there were elements of the quote you were previously sent that resonated, we'd love to know so we can make sure ours is the strongest possible fit.",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: WHITE,
                  border: `1px solid ${BORDER}`,
                  borderRadius: '0.5rem',
                  padding: '1.25rem 1.5rem',
                }}
              >
                <p style={{ fontFamily: H, fontSize: '1rem', fontWeight: 500, color: GREEN, marginBottom: '0.375rem' }}>{item.q}</p>
                <p style={{ fontFamily: B, fontSize: '0.9375rem', lineHeight: 1.75, color: BODY }}>{item.a}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </Section>

      {/* ─── NEXT STEPS ─── */}
      <Section id="next" bg={WHITE}>
        <FadeIn>
          <Label>When you are ready</Label>
          <SectionH2>The next step is just a conversation.</SectionH2>
        </FadeIn>

        <FadeIn delay={80}>
          <P>
            If this feels right, the next step is simply a conversation to confirm the details above and the look and feel you want. From there we would begin design, share early concepts with you for feedback, and build from there - keeping you involved at every stage.
          </P>
          <P>
            We are genuinely excited about helping Diogenes grow, and about building something that does justice to the club you have all worked so hard to create.
          </P>
        </FadeIn>

        {/* Contact card */}
        <FadeIn delay={160}>
          <div style={{
            marginTop: '2.5rem',
            border: `1px solid ${BORDER}`,
            borderRadius: '0.75rem',
            overflow: 'hidden',
          }}>
            <div style={{ background: GREEN, padding: '1.5rem 2rem' }}>
              <p style={{ fontFamily: H, fontSize: '1.125rem', fontWeight: 500, color: '#FFFFFF', marginBottom: '0.25rem' }}>Masuyo Digital</p>
              <p style={{ fontFamily: B, fontSize: '0.8125rem', color: 'rgba(255,255,255,0.55)' }}>Get in touch to move forward</p>
            </div>
            <div style={{ background: CREAM, padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <a
                href="mailto:hello@masuyodigital.com"
                style={{ fontFamily: B, fontSize: '0.9375rem', color: SAGE, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                  <rect x="1" y="3" width="12" height="8" rx="1.2" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M1 4.5l6 4 6-4" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                </svg>
                hello@masuyodigital.com
              </a>
              <a
                href="https://masuyodigital.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: B, fontSize: '0.9375rem', color: SAGE, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                  <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M7 1.5C5.5 3.5 5.5 10.5 7 12.5M7 1.5C8.5 3.5 8.5 10.5 7 12.5M1.5 7h11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                masuyodigital.com
              </a>
            </div>
          </div>
        </FadeIn>

        {/* Closing line */}
        <FadeIn delay={220}>
          <p style={{
            fontFamily: H,
            fontSize: '1.0625rem',
            fontStyle: 'italic',
            fontWeight: 400,
            color: MUTED,
            marginTop: '3rem',
            lineHeight: 1.7,
          }}>
            Thank you for reading this in full. We hope it reflects the care we would bring to the work itself.
          </p>
        </FadeIn>
      </Section>

      {/* Footer strip */}
      <div style={{
        background: CREAM,
        borderTop: `1px solid ${BORDER}`,
        padding: '2rem 1.75rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        flexWrap: 'wrap',
      }}>
        <p style={{ fontFamily: B, fontSize: '0.75rem', color: '#C0BAB2' }}>Diogenes Sun Club - Proposal by Masuyo Digital</p>
        <p style={{ fontFamily: B, fontSize: '0.75rem', color: '#C0BAB2' }}>Private and confidential</p>
      </div>
    </>
  )
}
