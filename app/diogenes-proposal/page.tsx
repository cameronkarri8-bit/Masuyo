import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { getSessionToken } from './session'
import PasswordGate from './PasswordGate'
import ProposalShell from './ProposalShell'
import ProposalContent from './ProposalContent'

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
    return <PasswordGate hasError={searchParams.err === '1'} />
  }

  return (
    <ProposalShell>
      <ProposalContent />
    </ProposalShell>
  )
}
