import { Poppins } from 'next/font/google'

/**
 * The client proposal page is not part of the marketing site and does not take
 * the Fraunces redesign. It sets its own heading font here so `--font-poppins`
 * resolves inside this route only, rather than being loaded site wide for one
 * password protected page.
 */
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

export default function DiogenesProposalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className={poppins.variable}>{children}</div>
}
