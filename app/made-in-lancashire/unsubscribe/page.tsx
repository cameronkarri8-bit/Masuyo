import type { Metadata } from 'next'
import { Suspense } from 'react'
import Section from '@/components/ui/Section'
import { pageMetadata } from '@/lib/metadata'
import UnsubscribeForm from './UnsubscribeForm'

export const metadata: Metadata = pageMetadata({
  title: 'Unsubscribe | Made in Lancashire',
  description: 'Leave the Made in Lancashire mailing list.',
  path: '/made-in-lancashire/unsubscribe',
  noindex: true,
})

/**
 * Where the unsubscribe link in every mailing list email lands. It asks for
 * one tap rather than unsubscribing on arrival, so a mail scanner opening
 * the link unsubscribes nobody.
 */
export default function UnsubscribePage() {
  return (
    <Section ground="paper" labelledBy="unsubscribe-title">
      <div className="mx-auto max-w-measure py-6 sm:py-12">
        <Suspense>
          <UnsubscribeForm />
        </Suspense>
      </div>
    </Section>
  )
}
