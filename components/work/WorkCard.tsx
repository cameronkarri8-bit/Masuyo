import Link from 'next/link'
import DeviceFrame from '@/components/work/DeviceFrame'
import { leadImages, type WorkItem } from '@/lib/work'

/**
 * One project: the lead desktop screen, with the lead phone screen over its
 * corner when there is one, then the name, one line and tags. The whole card
 * links to the case study.
 */
export default function WorkCard({
  item,
  headingLevel = 'h3',
  panel = 'paper',
}: {
  item: WorkItem
  headingLevel?: 'h2' | 'h3'
  /** The panel behind the screens: the opposite of the section ground. */
  panel?: 'paper' | 'mist'
}) {
  const { desktop, phone } = leadImages(item)
  const Heading = headingLevel
  return (
    <Link href={`/work/${item.slug}`} className="group block rounded-card focus-visible:outline-offset-4">
      <div className={`relative rounded-card p-5 pb-8 sm:p-8 sm:pb-12 ${panel === 'paper' ? 'bg-paper' : 'bg-mist'}`}>
        <div className="transition-transform duration-500 ease-brand group-hover:-translate-y-1">
          {desktop && <DeviceFrame image={desktop} sizes="(min-width: 768px) 45vw, 90vw" className={phone ? 'mr-[18%]' : ''} />}
        </div>
        {phone && (
          <div className="absolute bottom-4 right-4 w-[24%] transition-transform duration-500 ease-brand group-hover:-translate-y-2 sm:bottom-6 sm:right-6">
            <DeviceFrame image={phone} sizes="(min-width: 768px) 12vw, 24vw" />
          </div>
        )}
      </div>
      <Heading className="mt-5 text-title text-deep underline decoration-transparent decoration-2 underline-offset-[5px] transition-colors group-hover:decoration-petrol">
        {item.name}
      </Heading>
      <p className="mt-1.5 text-body text-steel">{item.line}</p>
      <p className="mt-2 text-small text-petrol">{item.tags.join(' · ')}</p>
    </Link>
  )
}
