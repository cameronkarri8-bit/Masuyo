import { BUSINESS, INERT_HREF } from './content'

/**
 * The two calls to action.
 *
 * Both are inert, like everything else on the concept. Pills rather than
 * rectangles, with no shadow under either: the primary separates by fill and
 * the secondary by a hairline, which is all the separation either needs.
 */

export function BookRepair({ className = '' }: { className?: string }) {
  return (
    <a
      href={INERT_HREF}
      className={`inline-flex items-center justify-center rounded-full bg-fc-cyan px-7 py-3.5 text-[1rem] font-medium tracking-[-0.01em] text-fc-navy transition-opacity hover:opacity-90 ${className}`}
    >
      Book a repair
    </a>
  )
}

/** On a dark band. Frosted glass rather than a filled button. */
export function CallDark({ className = '' }: { className?: string }) {
  return (
    <a
      href={INERT_HREF}
      className={`fc-glass inline-flex items-center justify-center rounded-full px-7 py-3.5 text-[1rem] font-medium tracking-[-0.01em] text-fc-frost transition-colors hover:bg-white/10 ${className}`}
    >
      Call {BUSINESS.phoneDisplay}
    </a>
  )
}
