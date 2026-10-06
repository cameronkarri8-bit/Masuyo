import type { Metadata } from 'next'
import SectorPage from '@/components/site/SectorPage'
import { SECTORS } from '@/lib/content/sectors'
import { pageMetadata } from '@/lib/metadata'

const sector = SECTORS['professional-services']

export const metadata: Metadata = pageMetadata({
  title: sector.metaTitle,
  description: sector.metaDescription,
  path: sector.path,
})

export default function Page() {
  return <SectorPage sector={sector} />
}
