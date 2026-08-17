import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { getSessionToken } from './session'
import PasswordGate from '@/components/proposal/PasswordGate'
import ProposalShell from '@/components/proposal/ProposalShell'
import ProposalContent from './ProposalContent'
import { checkPassword } from './actions'

/* Unchanged from before the primitives were extracted, just passed in now. */
const SECTIONS = [
  { id: 'challenge',  label: 'The Challenge' },
  { id: 'strategy',   label: 'Strategy' },
  { id: 'discovery',  label: 'Getting Found' },
  { id: 'scope',      label: 'What We Build' },
  { id: 'imagery',    label: 'Imagery' },
  { id: 'compliance', label: 'Compliance' },
  { id: 'investment', label: 'Investment' },
  { id: 'future',     label: 'Future Phases' },
  { id: 'next',       label: 'Next Steps' },
]

export const metadata: Metadata = {
  title: 'Proposal',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
}

export default async function DiogenesProposalPage({
  searchParams,
}: {
  searchParams: { err?: string }
}) {
  const cookieStore = cookies()
  const session = cookieStore.get('dgp_session')
  const expected = getSessionToken()
  const isAuthenticated = !!expected && session?.value === expected

  if (!isAuthenticated) {
    return (
      <PasswordGate
        hasError={searchParams.err === '1'}
        title="Diogenes Sun Club"
        subline="Your proposal is waiting. Please enter the password to continue."
        action={checkPassword}
      />
    )
  }

  return (
    <ProposalShell sections={SECTIONS}>
      <ProposalContent />
    </ProposalShell>
  )
}
