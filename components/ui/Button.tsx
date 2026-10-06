import Link from 'next/link'

/**
 * Buttons.
 *
 * Primary on light grounds is solid petrol with paper text. On petrol or deep
 * it is aqua with deep text, the one place aqua is a button. Secondary is a
 * petrol outline on light grounds and a paper outline on dark ones.
 *
 * One primary button per screen. Wording is a verb and an object, three words
 * at most.
 */

type Variant = 'primary' | 'secondary'

const BASE =
  'inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-control px-6 py-3 text-[1rem] font-semibold leading-tight transition-colors duration-200 ease-brand'

const STYLES: Record<'light' | 'dark', Record<Variant, string>> = {
  light: {
    primary: 'bg-petrol text-paper hover:bg-deep',
    secondary: 'border-2 border-petrol text-petrol hover:bg-petrol hover:text-paper',
  },
  dark: {
    primary: 'bg-aqua text-deep hover:bg-paper',
    secondary: 'border-2 border-paper text-paper hover:bg-paper hover:text-petrol',
  },
}

export function buttonClasses(variant: Variant = 'primary', dark = false, full = false) {
  return `${BASE} ${STYLES[dark ? 'dark' : 'light'][variant]} ${full ? 'w-full' : ''}`
}

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  dark = false,
  full = false,
  className = '',
  ...rest
}: {
  href: string
  children: React.ReactNode
  variant?: Variant
  dark?: boolean
  full?: boolean
  className?: string
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className'>) {
  const external = /^(https?:|mailto:|tel:)/.test(href) || href.startsWith('/brand/')
  const classes = `${buttonClasses(variant, dark, full)} ${className}`
  if (external) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  )
}

export function Button({
  children,
  variant = 'primary',
  dark = false,
  full = false,
  className = '',
  ...rest
}: {
  children: React.ReactNode
  variant?: Variant
  dark?: boolean
  full?: boolean
  className?: string
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'>) {
  return (
    <button className={`${buttonClasses(variant, dark, full)} disabled:cursor-not-allowed disabled:opacity-60 ${className}`} {...rest}>
      {children}
    </button>
  )
}
