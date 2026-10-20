import Link from 'next/link'
import AppScreens from '@/components/work/AppScreens'
import DeviceFrame from '@/components/work/DeviceFrame'
import { appScreens, leadImages, type WorkItem } from '@/lib/work'

/**
 * One project: the lead desktop screen, or for an app three phone screens
 * rising from the bottom of the panel, then the name, one line and tags. The
 * whole card links to the case study.
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
  const { desktop } = leadImages(item)
  const app = item.display === 'phone'
  const Heading = headingLevel
  const ground = panel === 'paper' ? 'bg-paper' : 'bg-mist'
  return (
    <Link href={`/work/${item.slug}`} className="group block rounded-card focus-visible:outline-offset-4">
      {app ? (
        <div className={`overflow-hidden rounded-card px-5 pt-5 sm:px-8 sm:pt-8 ${ground}`}>
          <div className="translate-y-2 transition-transform duration-500 ease-brand group-hover:translate-y-0">
            <AppScreens images={appScreens(item)} crop sizes="(min-width: 768px) 16vw, 32vw" />
          </div>
        </div>
      ) : (
        <div className={`rounded-card p-5 sm:p-8 ${ground}`}>
          <div className="transition-transform duration-500 ease-brand group-hover:-translate-y-1">
            {desktop && <DeviceFrame image={desktop} sizes="(min-width: 768px) 45vw, 90vw" />}
          </div>
        </div>
      )}
      <Heading className="mt-5 text-title text-deep underline decoration-transparent decoration-2 underline-offset-[5px] transition-colors group-hover:decoration-petrol">
        {item.name}
      </Heading>
      <p className="mt-1.5 text-body text-steel">{item.line}</p>
      <p className="mt-2 text-small text-petrol">{item.tags.join(' · ')}</p>
    </Link>
  )
}
