import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { getSessionToken } from './session'
import { checkPassword } from './actions'
import PasswordGate from '@/components/proposal/PasswordGate'
import ProposalShell from '@/components/proposal/ProposalShell'
import ProposalContent from './ProposalContent'

export const metadata: Metadata = {
  title: 'Proposal',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
}

const SECTIONS = [
  { id: 'standing',  label: 'Where things stand' },
  { id: 'found',     label: 'What we found' },
  { id: 'structure', label: 'Structure and journey' },
  { id: 'standout',  label: 'Standing out' },
  { id: 'propose',   label: 'What we propose' },
  { id: 'later',     label: 'Worth considering later' },
  { id: 'needs',     label: 'What we need from you' },
  { id: 'terms',     label: 'Scope and terms' },
  { id: 'howwework', label: 'How we work' },
  { id: 'next',      label: 'Next step' },
]

export default async function NorthcoteProposalPage({
  searchParams,
}: {
  searchParams: { err?: string }
}) {
  const cookieStore = cookies()
  const session = cookieStore.get('ncp_session')
  const expected = getSessionToken()
  const isAuthenticated = !!expected && session?.value === expected

  if (!isAuthenticated) {
    return (
      <PasswordGate
        hasError={searchParams.err === '1'}
        title="Northcote Solicitors"
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
