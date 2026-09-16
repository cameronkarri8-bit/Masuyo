import { SAMPLE_NOTICE } from './content'

/**
 * The permanent sample notice.
 *
 * Deliberately not dismissible: there is no close control and no client
 * component behind it, so the notice cannot be hidden by a stray click and
 * cannot be removed with a cookie. It renders in the server output, which means
 * it is present even if JavaScript never runs.
 *
 * It sits inside the sticky header wrapper alongside the nav, so it is on
 * screen at every scroll position. Wrapping it in the same sticky element as
 * the nav rather than stacking two sticky elements is what keeps it correct at
 * 360px, where the sentence runs to two lines and a hard coded offset for the
 * nav would leave a gap or an overlap.
 */
export default function SampleBar() {
  return (
    <div role="note" className="bg-[#050F16] text-fc-frost">
      <p className="mx-auto max-w-6xl px-4 py-2 text-center text-[0.75rem] leading-snug tracking-[0.01em] sm:px-6">
        {SAMPLE_NOTICE}
      </p>
    </div>
  )
}
