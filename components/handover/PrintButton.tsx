'use client'

/** Prints the page. The print styles in globals.css leave only the handover checklist on the sheet. */
export default function PrintButton({ label = 'Print this checklist' }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex min-h-[2.75rem] items-center gap-2 rounded-control px-1 text-body font-semibold text-petrol underline decoration-petrol/40 decoration-2 underline-offset-[5px] hover:decoration-petrol print:hidden"
    >
      <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" aria-hidden="true">
        <path d="M6 7V3h8v4M6 14H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-2M6 11h8v6H6v-6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
      {label}
    </button>
  )
}
