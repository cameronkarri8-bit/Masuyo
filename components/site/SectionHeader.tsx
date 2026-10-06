import Eyebrow from '@/components/ui/Eyebrow'
import SectionTitle from '@/components/ui/SectionTitle'

/** Eyebrow, title and a line of introduction, the opening of most sections. */
export default function SectionHeader({
  eyebrow,
  title,
  intro,
  dark = false,
  centred = false,
  id,
  size = 'heading',
  className = '',
}: {
  eyebrow?: string
  title: React.ReactNode
  intro?: React.ReactNode
  dark?: boolean
  centred?: boolean
  id?: string
  size?: 'heading' | 'title'
  className?: string
}) {
  return (
    <div className={`${centred ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'} ${className}`}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <SectionTitle id={id} dark={dark} size={size} className={eyebrow ? 'mt-3' : ''}>
        {title}
      </SectionTitle>
      {intro && (
        <div className={`mt-5 max-w-measure text-lead ${dark ? 'text-mist' : 'text-steel'} ${centred ? 'mx-auto' : ''}`}>
          {intro}
        </div>
      )}
    </div>
  )
}
