import LearnerCar from '@/components/brand/illustrations/LearnerCar'
import type { IllustrationKey } from '@/lib/industries/types'

/** The hero drawing for each industry, chosen by the key in its data file. */
const DRAWINGS: Record<IllustrationKey, (props: { className?: string; title?: string }) => JSX.Element> = {
  'dual-control-car': LearnerCar,
}

export default function IndustryIllustration({ illustration }: { illustration: { key: IllustrationKey; alt: string } }) {
  const Drawing = DRAWINGS[illustration.key]
  return <Drawing className="h-auto w-full" title={illustration.alt} />
}
