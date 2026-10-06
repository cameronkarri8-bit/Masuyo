import Icon from '@/components/brand/Icon'
import Card from '@/components/ui/Card'
import { WEBSITE_TILES } from '@/lib/content/websites'

/** The six "What we build" tiles. Not links: a menu of possibilities. */
export default function WebsiteTiles({ onPaper = false }: { onPaper?: boolean }) {
  return (
    <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {WEBSITE_TILES.map(tile => (
        <Card as="li" key={tile.title} onPaper={onPaper} className="p-7">
          <Icon name={tile.icon} size={48} />
          <h3 className="mt-5 text-subhead text-deep">{tile.title}</h3>
          <p className="mt-1.5 text-body text-steel">{tile.body}</p>
        </Card>
      ))}
    </ul>
  )
}
