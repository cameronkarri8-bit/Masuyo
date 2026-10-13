import { SINGLE_SIGN, SingleShop } from '@/components/brand/illustrations/HighStreet'
import { SHADOW } from './FormBits'

/**
 * A "Your business here" card: an empty shopfront from the high street with
 * the words on its sign, inviting an application. The sign's words are real
 * text laid over the drawing, not part of the image. The whole card links to
 * the application form.
 */
export default function YourBusinessCard({ headingLevel = 'h3' }: { headingLevel?: 'h3' | 'h4' }) {
  const Heading = headingLevel
  return (
    <a href="#apply" className={`group flex h-full flex-col overflow-hidden rounded-card bg-paper transition-transform duration-200 ease-brand hover:-translate-y-1 ${SHADOW}`}>
      <div className="ground-dark bg-petrol px-4 pt-4">
        <div className="relative mx-auto max-w-[15rem]">
        <SingleShop motif="empty" className="h-auto w-full" />
        <Heading
          className="absolute flex items-center justify-center px-1 text-center font-extrabold leading-tight tracking-normal text-paper"
          style={{
            left: `${SINGLE_SIGN.left * 100}%`,
            top: `${SINGLE_SIGN.top * 100}%`,
            width: `${SINGLE_SIGN.width * 100}%`,
            height: `${SINGLE_SIGN.height * 100}%`,
            fontSize: 'clamp(0.8rem, 3.2vw, 1.05rem)',
          }}
        >
          Your business here
        </Heading>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-body text-steel">Submit your business to be considered for a feature.</p>
        <span className="mt-4 text-small font-semibold text-petrol underline decoration-petrol/40 decoration-2 underline-offset-[5px] group-hover:decoration-petrol">Submit your business</span>
      </div>
    </a>
  )
}
