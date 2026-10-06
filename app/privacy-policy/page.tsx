import type { Metadata } from 'next'
import Link from 'next/link'
import { pageMetadata } from '@/lib/metadata'
import { ContactCard, LegalLayout, P, Section, Ul } from '@/components/site/Legal'

export const metadata: Metadata = pageMetadata({
  title: 'Privacy policy | Masuyo',
  description: 'Masuyo Digital privacy policy: how we collect, use, and protect your personal data in compliance with UK GDPR.',
  path: '/privacy-policy',
})

const LAST_UPDATED = '6 October 2026'
const COMPANY = 'Masuyo Digital'
const EMAIL = 'hello@masuyodigital.com'

const CONTENTS = ["1. Who we are", "2. What data we collect", "3. How we collect your data", "4. How we use your data", "5. Cookies", "6. Data sharing and third parties", "7. Data retention", "8. Your rights under UK GDPR", "9. Data security", "10. Links to other websites", "11. Children's privacy", "12. Changes to this policy", "13. Contact us"]


export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy policy" updated={LAST_UPDATED} contents={CONTENTS}>
        <P>
          This Privacy Policy explains how {COMPANY} (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) collects, uses, and protects your personal data when you visit our website at masuyodigital.com or engage with our services. We are committed to protecting your privacy and handling your data in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
        </P>
        <P>
          Please read this policy carefully. If you have any questions, contact us at{' '}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </P>

        <Section title="1. Who we are">
          <P>
            {COMPANY} is the data controller responsible for your personal data. We are based in the United Kingdom. You can contact us regarding any data protection matters at{' '}
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
          </P>
        </Section>

        <Section title="2. What data we collect">
          <P>We may collect and process the following categories of personal data:</P>
          <Ul items={[
            'Identity data: your name, business name, and job title where provided.',
            'Contact data: your email address, telephone number, and postal address.',
            'Communication data: messages you send us via our contact or enquiry forms, and email correspondence.',
            'Technical data: your IP address, browser type and version, operating system, time zone, and pages visited on our website.',
            'Usage data: information about how you use our website, including referring URLs, pages viewed, and session duration.',
            'Marketing preferences: your preferences regarding receiving marketing communications from us.',
          ]} />
          <P>
            We do not intentionally collect any special category data (such as health information, racial or ethnic origin, or political opinions). Please do not submit such data to us through our website.
          </P>
        </Section>

        <Section title="3. How we collect your data">
          <P>We collect data through the following means:</P>
          <Ul items={[
            'Direct interactions: when you complete a contact form, project enquiry form, or email us directly.',
            'Automated technologies: when you visit our website, we collect anonymous usage data through Umami analytics. Umami does not use cookies and does not store information that identifies you.',
            'Third-party services: contact forms on our website are sent by email through Resend, with Formspree used as a backup if Resend is unavailable. Both process the details you submit on our behalf.',
          ]} />
        </Section>

        <Section title="4. How we use your data">
          <P>We use your personal data for the following purposes:</P>
          <Ul items={[
            'To respond to enquiries and provide you with information about our services.',
            'To deliver services you have engaged us to provide.',
            'To manage our relationship with you, including billing and account management.',
            'To send you marketing communications where you have consented, or where we have a legitimate interest to do so.',
            'To improve our website and services through analytics.',
            'To comply with our legal obligations.',
          ]} />
          <P>
            Our lawful bases for processing under UK GDPR are: performance of a contract (where we are delivering services to you), legitimate interests (for analytics and internal business purposes), consent (for marketing communications), and legal obligation (where applicable).
          </P>
        </Section>

        <Section title="5. Cookies">
          <P>
            Our website does not use analytics or tracking cookies. We use Umami analytics to understand how our site is used, and Umami measures visits without cookies (small text files stored on your device) and without storing information that identifies you.
          </P>
          <Ul items={[
            'Essential cookies: the only cookies we set are those needed for the website to function, such as keeping you signed in to a password protected client page. These cannot be disabled.',
          ]} />
          <P>
            You can control or delete cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of the website. For more information about managing cookies, visit{' '}
            <strong>www.allaboutcookies.org</strong>.
          </P>
          <P>
            Where required by law (for non-essential cookies), we will seek your consent before placing cookies on your device.
          </P>
        </Section>

        <Section title="6. Data sharing and third parties">
          <P>We do not sell your personal data. We may share your data with:</P>
          <Ul items={[
            'Service providers who process data on our behalf, such as Resend and Formspree for contact form submissions, email delivery platforms, and hosting infrastructure. These parties process data only in accordance with our instructions.',
            'Our analytics provider, Umami, which receives anonymous usage data only and no information that identifies you.',
            'Legal or regulatory authorities where we are required to disclose data by law.',
          ]} />
          <P>
            Where we transfer data outside the UK, we ensure appropriate safeguards are in place in accordance with UK GDPR requirements.
          </P>
        </Section>

        <Section title="7. Data retention">
          <P>
            We retain your personal data only for as long as necessary for the purposes it was collected and in accordance with our legal obligations. Specifically:
          </P>
          <Ul items={[
            'Enquiry and contact data: retained for up to 2 years from last contact, or as long as necessary to manage an ongoing client relationship.',
            'Client and project data: retained for up to 6 years after the end of the client relationship, in line with legal requirements for financial records.',
            'Analytics data: Umami records anonymous, aggregated usage data only, with no cookies and nothing that identifies you.',
          ]} />
          <P>
            Once data is no longer needed, it is securely deleted or anonymised.
          </P>
        </Section>

        <Section title="8. Your rights under UK GDPR">
          <P>You have the following rights regarding your personal data:</P>
          <Ul items={[
            'Right of access: you can request a copy of the personal data we hold about you.',
            'Right to rectification: you can ask us to correct inaccurate or incomplete data.',
            'Right to erasure: in certain circumstances, you can ask us to delete your personal data.',
            'Right to restriction: you can ask us to restrict the processing of your data in certain circumstances.',
            'Right to data portability: you can request that we transfer your data to another organisation in a structured, machine-readable format.',
            'Right to object: you can object to our processing of your data where we rely on legitimate interests as our lawful basis.',
            'Rights related to automated decision-making: we do not make automated decisions with significant effects based on your personal data.',
          ]} />
          <P>
            To exercise any of these rights, contact us at{' '}
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. We will respond within one calendar month. You also have the right to lodge a complaint with the Information Commissioner&apos;s Office (ICO) at{' '}
            <strong>ico.org.uk</strong>.
          </P>
        </Section>

        <Section title="9. Data security">
          <P>
            We take appropriate technical and organisational measures to protect your personal data against accidental or unlawful destruction, loss, alteration, or unauthorised disclosure. Our website is served over HTTPS and our server infrastructure includes access controls, monitoring, and regular backups.
          </P>
          <P>
            No method of transmission or storage is 100% secure. If you believe your data has been compromised, please contact us immediately at{' '}
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
          </P>
        </Section>

        <Section title="10. Links to other websites">
          <P>
            Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to read their privacy policies before providing any personal data.
          </P>
        </Section>

        <Section title="11. Children's privacy">
          <P>
            Our website and services are not directed at individuals under the age of 18. We do not knowingly collect personal data from children. If you believe we have inadvertently collected such data, please contact us and we will delete it promptly.
          </P>
        </Section>

        <Section title="12. Changes to this policy">
          <P>
            We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. The &ldquo;last updated&rdquo; date at the top of this page indicates when the policy was last revised. We encourage you to review this policy periodically. Continued use of our website after changes are posted constitutes your acceptance of the updated policy.
          </P>
        </Section>

        <Section title="13. Contact us">
          <P>
            If you have any questions about this Privacy Policy or how we handle your personal data, please contact us:
          </P>
          <ContactCard company={COMPANY} email={EMAIL} />
        </Section>

        <div className="flex items-center gap-4 border-t border-petrol/15 pt-8">
          <Link href="/terms">
            Terms of service
          </Link>
          <span aria-hidden="true">·</span>
          <Link href="/start">
                Talk to us
              </Link>
        </div>
    </LegalLayout>
  )
}
