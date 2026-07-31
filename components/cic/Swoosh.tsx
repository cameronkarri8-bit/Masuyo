interface SwooshProps {
  /** Stroke colour. Defaults to the brand blue. */
  className?: string
}

/**
 * Hand drawn style underline, sat beneath a keyword phrase.
 *
 * Purely decorative, so it is hidden from assistive technology. Absolutely
 * positioned, so the parent needs `relative inline-block`.
 *
 * Deliberately rationed: two per page maximum, any more reads as cheap.
 */
export default function Swoosh({ className = 'text-blue' }: SwooshProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 300 12"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute -bottom-1 left-0 h-[0.35em] w-full ${className}`}
    >
      <path
        d="M2 8.5C48 4.2 104 2.4 160 3.1c38 .5 76 2.2 138 5.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}
