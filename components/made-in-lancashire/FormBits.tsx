'use client'

/**
 * Small pieces shared by the Made in Lancashire forms: labelled fields with
 * their hint and error tied on with aria-describedby, sized for phones (16px
 * text so iPhones do not zoom, 44px or taller tap targets).
 */

export const INPUT =
  'mt-2 block w-full min-h-[3rem] rounded-control border-2 border-petrol/20 bg-paper px-4 py-3 text-[16px] leading-normal text-deep placeholder:text-steel/80 focus:border-petrol aria-[invalid=true]:border-[#B42318]'

export const SHADOW = 'shadow-[0_1px_2px_rgba(13,26,32,0.06),0_8px_24px_rgba(13,26,32,0.06)]'

export const BUTTON_PRIMARY =
  'inline-flex min-h-[3rem] w-full items-center justify-center rounded-control bg-petrol px-6 py-3 text-[16px] font-semibold text-paper transition-colors hover:bg-deep disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto'

export const BUTTON_SECONDARY =
  'inline-flex min-h-[3rem] w-full items-center justify-center rounded-control border-2 border-petrol px-6 py-3 text-[16px] font-semibold text-petrol transition-colors hover:bg-petrol hover:text-paper sm:w-auto'

export function ErrorText({ id, children }: { id: string; children?: string }) {
  if (!children) return null
  return (
    <p id={id} className="mt-1.5 text-small font-semibold text-[#B42318]">
      {children}
    </p>
  )
}

export function Hint({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-1.5 text-small text-steel">
      {children}
    </p>
  )
}

export function Label({ htmlFor, children, optional = false }: { htmlFor: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="text-body font-semibold text-deep">
      {children}
      {optional && <span className="font-normal text-steel"> (optional)</span>}
    </label>
  )
}

/** Join the ids that describe a field, leaving out any that are empty. */
export function describedBy(...ids: (string | false | undefined)[]) {
  const list = ids.filter(Boolean).join(' ')
  return list || undefined
}

/** Scroll the first field with a problem into view and put the cursor in it. */
export function focusFirst(form: HTMLElement | null, names: string[]) {
  if (!form) return
  for (const name of names) {
    const el = form.querySelector<HTMLElement>(`[name="${name}"]`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      el.focus({ preventScroll: true })
      return
    }
  }
}
