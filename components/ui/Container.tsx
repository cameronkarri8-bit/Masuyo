/** The page width and side gutters, shared by every section. */
export default function Container({
  children,
  className = '',
  narrow = false,
}: {
  children: React.ReactNode
  className?: string
  /** A reading width column, for article style text. */
  narrow?: boolean
}) {
  return (
    <div className={`mx-auto w-full px-5 sm:px-8 ${narrow ? 'max-w-[46rem]' : 'max-w-site'} ${className}`}>
      {children}
    </div>
  )
}
