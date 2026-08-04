/* TEMPORARY PLACEHOLDER ARTWORK, REPLACE BEFORE LAUNCH */

/**
 * A tinted circle carrying initials, for testimonial attribution.
 *
 * This is deliberately not a face and not an illustrated person. It stands in
 * for a headshot without implying a specific human exists. Replace with a real,
 * permissioned photograph once the testimonial itself is approved.
 *
 * When the surrounding quote is still a placeholder, the initials fall back to
 * a neutral dash rather than inventing a person's initials.
 */

const NAVY = '#1A2939'

interface MonogramAvatarProps {
  /** Name to derive initials from. Placeholder names produce a neutral mark. */
  name?: string
  /** Size in px. */
  size?: number
  /** `dark` for navy and blue sections. */
  tone?: 'light' | 'dark'
  className?: string
}

function initialsFrom(name?: string): string {
  if (!name) return '--'
  // Anything still marked as placeholder must not gain invented initials.
  if (/placeholder|todo|tbc/i.test(name)) return '--'
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '--'
  const letters = parts.slice(0, 2).map(p => p[0]?.toUpperCase() ?? '')
  return letters.join('') || '--'
}

export default function MonogramAvatar({
  name,
  size = 56,
  tone = 'light',
  className = '',
}: MonogramAvatarProps) {
  const initials = initialsFrom(name)
  const dark = tone === 'dark'

  return (
    <div
      aria-hidden="true"
      style={{ width: size, height: size }}
      className={`flex flex-shrink-0 items-center justify-center rounded-full ${
        dark ? 'bg-white/10' : 'bg-blue-tint2'
      } ${className}`}
    >
      <span
        className="font-sans font-semibold tracking-tight"
        style={{
          fontSize: Math.round(size * 0.34),
          color: dark ? '#ffffff' : NAVY,
          opacity: dark ? 0.7 : 0.55,
        }}
      >
        {initials}
      </span>
    </div>
  )
}
