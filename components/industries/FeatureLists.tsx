import Checklist from '@/components/ui/Checklist'
import type { BulletGroup, IndustrySource } from '@/lib/industries/types'
import RichText from './RichText'

/** Bullet groups side by side, each under its own subheading. */
export default function FeatureLists({ groups, sources }: { groups: BulletGroup[]; sources: IndustrySource[] }) {
  return (
    <div className={`grid gap-10 ${groups.length > 1 ? 'md:grid-cols-2' : ''} lg:gap-14`}>
      {groups.map(group => (
        <div key={group.subheading}>
          <h3 className="text-subhead text-deep">{group.subheading}</h3>
          <Checklist
            className="mt-5"
            items={group.items.map((item, i) => (
              <RichText key={i} text={item} sources={sources} />
            ))}
          />
        </div>
      ))}
    </div>
  )
}
