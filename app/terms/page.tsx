import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Masuyo Digital terms of service — the terms that govern your use of our website and services.',
  alternates: { canonical: 'https://masuyodigital.com/terms' },
}

const LAST_UPDATED = '14 April 2025'
const COMPANY = 'Masuyo Digital'
const EMAIL = 'hello@masuyodigital.com'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold text-ink mb-4" style={{ fontFamily: 'Fraunces, serif' }}>
        {title}
      </h2>
      <div className="flex flex-col gap-4">
        {children}
      </div>
    </section>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.8' }}>
      {children}
    </p>
  )
}

function Ul({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2 pl-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif', lineHeight: '1.75' }}>
          <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--blue)' }} />
          {item}
        </li>
      ))}
    </ul>
  )
}

export default function TermsPage() {
  return (
    <section className="py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {/* Header */}
        <div className="mb-10 pb-8" style={{ borderBottom: '1px solid var(--border)' }}>
          <h1 className="text-4xl font-semibold text-ink mb-3" style={{ fontFamily: 'Fraunces, serif' }}>
            Terms of Service
          </h1>
          <p className="text-sm" style={{ color: 'var(--mid)', fontFamily: 'Geist, sans-serif' }}>
            Last updated: {LAST_UPDATED}
          </p>
        </div>

        <P>
          These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the website located at masuyodigital.com and any services provided by {COMPANY} (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;). By accessing our website or engaging our services, you agree to be bound by these Terms. If you do not agree, please do not use our website or services.
        </P>

        <div className="my-8" style={{ borderTop: '1px solid var(--border)' }} />

        <Section title="1. About us">
          <P>
            {COMPANY} is a digital agency based in the United Kingdom providing web design, digital marketing, technology solutions, automation, and hosting services. For any enquiries regarding these Terms, please contact us at{' '}
            <a href={`mailto:${EMAIL}`} style={{ color: 'var(--blue)' }}>{EMAIL}</a>.
          </P>
        </Section>

        <Section title="2. Use of our website">
          <P>You may use our website for lawful purposes only. You agree not to:</P>
          <Ul items={[
            'Use the website in any way that violates applicable laws or regulations.',
            'Transmit any unsolicited or unauthorised advertising or promotional material.',
            'Attempt to gain unauthorised access to any part of the website, its servers, or any related systems.',
            'Introduce viruses, trojans, worms, or other malicious or harmful material.',
            'Harvest or collect email addresses or other personal data from the website without permission.',
            'Reproduce, duplicate, copy, or resell any part of our website without our express written consent.',
            'Use automated tools to scrape, crawl, or index our website content.',
          ]} />
          <P>
            We reserve the right to suspend or terminate access to the website for any user who violates these conditions, at our sole discretion and without prior notice.
          </P>
        </Section>

        <Section title="3. Our services">
          <P>
            Details of our services, including scope, deliverables, timelines, and pricing, are agreed in writing between {COMPANY} and the client before work commences. These Terms apply in addition to any project-specific agreement or statement of work.
          </P>
          <P>
            We reserve the right to modify, suspend, or discontinue any aspect of our services at any time. Where we make material changes affecting an existing client agreement, we will provide reasonable prior notice.
          </P>
        </Section>

        <Section title="4. Quotes and pricing">
          <P>
            All prices stated on this website are indicative and subject to confirmation following a discovery call or review of your requirements. A formal quote or proposal will be provided before any work begins.
          </P>
          <P>
            Prices on the website are stated in GBP (£) and are exclusive of VAT unless stated otherwise. Where VAT applies, it will be itemised on invoices.
          </P>
          <P>
            We reserve the right to change our advertised prices at any time. Price changes will not affect quotes already accepted or projects already in progress under a signed agreement.
          </P>
        </Section>

        <Section title="5. Payment terms">
          <P>
            Payment terms for each project are agreed in the project proposal or statement of work. Standard terms are:
          </P>
          <Ul items={[
            'A deposit (typically 50% of the agreed project fee) is due before work commences.',
            'The remaining balance is due upon completion of the project or as specified in the project agreement.',
            'For ongoing services (such as hosting or retainers), invoices are issued monthly and payment is due within 14 days of the invoice date.',
          ]} />
          <P>
            Late payments may incur interest at 8% above the Bank of England base rate per annum in accordance with the Late Payment of Commercial Debts (Interest) Act 1998. We reserve the right to suspend services for accounts with overdue invoices.
          </P>
        </Section>

        <Section title="6. Intellectual property">
          <P>
            All content on this website, including text, graphics, logos, images, and software, is the property of {COMPANY} or our licensors and is protected by UK and international intellectual property laws.
          </P>
          <P>
            Upon full payment for a project, ownership of the deliverables (such as website design, code, and content created for you) transfers to the client, except as otherwise agreed in writing. We retain the right to display work completed for clients in our portfolio unless otherwise agreed.
          </P>
          <P>
            Any third-party software, frameworks, or libraries incorporated into your project are subject to their respective licences. We will advise you of any licensing obligations that may affect your use of the deliverables.
          </P>
        </Section>

        <Section title="7. Client responsibilities">
          <P>To enable us to deliver services effectively, clients are responsible for:</P>
          <Ul items={[
            'Providing accurate, complete, and timely information and materials required for the project.',
            'Reviewing and approving work within agreed timelines. Delays caused by client inaction may affect delivery dates.',
            'Ensuring that any content, images, or materials provided to us do not infringe the rights of any third party.',
            'Maintaining appropriate backups of any content or data you provide to us.',
            'Obtaining any necessary licences, permissions, or consents required for materials you supply.',
          ]} />
        </Section>

        <Section title="8. Hosting services">
          <P>
            Where we provide hosting services, we will use reasonable endeavours to maintain uptime and server availability. We do not guarantee 100% uptime and are not liable for losses arising from scheduled or unscheduled downtime.
          </P>
          <P>
            Hosting services are provided on a monthly or annual basis. Either party may terminate hosting with 30 days&apos; written notice. Upon termination, we will provide a reasonable opportunity for you to retrieve your data.
          </P>
          <P>
            We reserve the right to suspend hosting immediately and without notice if the hosted content violates our acceptable use policy or applicable law.
          </P>
        </Section>

        <Section title="9. Confidentiality">
          <P>
            Each party agrees to keep confidential any proprietary or sensitive information received from the other party in connection with a project, and not to disclose it to any third party without prior written consent, except as required by law.
          </P>
        </Section>

        <Section title="10. Limitation of liability">
          <P>
            To the fullest extent permitted by applicable law, {COMPANY} shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, loss of revenue, loss of data, or loss of business opportunity, arising from your use of our website or services.
          </P>
          <P>
            Our total aggregate liability to any client in connection with any project shall not exceed the total fees paid by that client to us in the twelve months preceding the claim.
          </P>
          <P>
            Nothing in these Terms excludes or limits our liability for: death or personal injury caused by our negligence; fraud or fraudulent misrepresentation; or any other liability that cannot be excluded or limited under applicable law.
          </P>
        </Section>

        <Section title="11. Indemnification">
          <P>
            You agree to indemnify and hold harmless {COMPANY} and its team members from any claims, losses, damages, or expenses (including reasonable legal fees) arising from your use of our website or services, your breach of these Terms, or your infringement of any third-party rights.
          </P>
        </Section>

        <Section title="12. Acceptable use">
          <P>
            You must not use our services to create, host, promote, or distribute content that:
          </P>
          <Ul items={[
            'Is unlawful, harmful, defamatory, obscene, or offensive.',
            'Infringes any intellectual property, privacy, or other rights of any third party.',
            'Involves the collection or processing of personal data without appropriate legal basis.',
            'Constitutes spam, phishing, or any form of unsolicited communication.',
            'Is designed to defraud, mislead, or cause harm to any person or organisation.',
            'Violates any applicable UK law or regulation.',
          ]} />
        </Section>

        <Section title="13. Termination">
          <P>
            Either party may terminate a project or service agreement by giving notice as specified in the relevant project agreement. In the absence of a specific agreement, 30 days&apos; written notice is required.
          </P>
          <P>
            Upon termination, any outstanding fees for work completed up to the date of termination become immediately due and payable. Deposits paid are non-refundable unless expressly agreed otherwise.
          </P>
          <P>
            We may terminate services immediately and without refund where a client has materially breached these Terms or a project agreement.
          </P>
        </Section>

        <Section title="14. Governing law and disputes">
          <P>
            These Terms are governed by the laws of England and Wales. Any disputes arising from these Terms or our services shall be subject to the exclusive jurisdiction of the courts of England and Wales.
          </P>
          <P>
            We are committed to resolving disputes fairly and without unnecessary escalation. If you have a complaint, please contact us at{' '}
            <a href={`mailto:${EMAIL}`} style={{ color: 'var(--blue)' }}>{EMAIL}</a>{' '}
            and we will aim to reach a resolution within 14 working days.
          </P>
        </Section>

        <Section title="15. Changes to these terms">
          <P>
            We may update these Terms from time to time. Changes will be posted on this page with an updated &ldquo;last updated&rdquo; date. Continued use of our website or services after changes are posted constitutes acceptance of the updated Terms. We recommend reviewing this page periodically.
          </P>
        </Section>

        <Section title="16. Contact">
          <P>
            For any questions regarding these Terms, please contact us:
          </P>
          <div className="p-5 rounded-lg" style={{ background: 'var(--light)', border: '1px solid var(--border)' }}>
            <p className="text-sm font-semibold text-ink mb-1" style={{ fontFamily: 'Geist, sans-serif' }}>{COMPANY}</p>
            <a href={`mailto:${EMAIL}`} className="text-sm" style={{ color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>{EMAIL}</a>
          </div>
        </Section>

        <div className="mt-10 pt-8 flex items-center gap-4" style={{ borderTop: '1px solid var(--border)' }}>
          <Link href="/privacy-policy" className="text-sm" style={{ color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
            Privacy Policy
          </Link>
          <span style={{ color: 'var(--border)' }}>·</span>
          <Link href="/contact" className="text-sm" style={{ color: 'var(--blue)', fontFamily: 'Geist, sans-serif' }}>
            Contact us
          </Link>
        </div>
      </div>
    </section>
  )
}
