import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import Rise from '@/components/ui/Rise'

/**
 * The hero for the main pages: petrol, words on the left, a visual on the
 * right. On a phone the words come first and the visual sits below.
 *
 * Petrol because the guide puts hero areas there. The nav turns petrol while
 * it sits over this band, so the two read as one.
 */
export default function PageHero({
  eyebrow,
  title,
  body,
  actions,
  visual,
  smallPrint,
  bleed = false,
  centred = false,
  ground = 'petrol',
  children,
}: {
  eyebrow: string
  title: React.ReactNode
  body: React.ReactNode
  actions?: React.ReactNode
  visual?: React.ReactNode
  smallPrint?: React.ReactNode
  /** Let the visual run off the right edge of the page. */
  bleed?: boolean
  centred?: boolean
  ground?: 'petrol' | 'mist'
  children?: React.ReactNode
}) {
  const dark = ground === 'petrol'
  return (
    <section
      data-nav-ground={dark ? 'dark' : undefined}
      className={`relative overflow-hidden ${dark ? 'ground-dark bg-petrol text-paper' : 'bg-mist text-deep'}`}
    >
      <Container
        className={`pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20 ${
          visual && !centred ? 'grid items-center gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-16' : ''
        } ${centred ? 'text-center' : ''}`}
      >
        <div className={centred ? 'mx-auto max-w-3xl' : 'max-w-[44rem]'}>
          <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
          <h1 className={`mt-4 ${visual && !centred ? 'text-hero' : 'text-display'} text-balance ${dark ? 'text-paper' : 'text-deep'}`}>
            {title}
          </h1>
          <div className={`mt-6 max-w-measure text-lead ${dark ? 'text-mist' : 'text-steel'} ${centred ? 'mx-auto' : ''}`}>
            {body}
          </div>
          {actions && (
            <div className={`mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center ${centred ? 'sm:justify-center' : ''}`}>
              {actions}
            </div>
          )}
          {smallPrint && <p className={`mt-6 text-small ${dark ? 'text-mist' : 'text-steel'}`}>{smallPrint}</p>}
          {children}
        </div>
        {visual && (
          <Rise className={`${centred ? 'mx-auto mt-12 max-w-xl' : ''} ${bleed ? 'lg:-mr-[max(0px,calc((100vw-75rem)/2+2rem))]' : ''}`}>
            {visual}
          </Rise>
        )}
      </Container>
    </section>
  )
}
