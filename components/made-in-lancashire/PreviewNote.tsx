/** Shown while any placeholder feature is on the page. */
export default function PreviewNote({ dark = true }: { dark?: boolean }) {
  return (
    <p
      className={`inline-flex rounded-full border px-3 py-1 text-small font-semibold ${
        dark ? 'border-paper/40 text-paper' : 'border-petrol/30 bg-paper text-petrol'
      }`}
    >
      Preview: placeholder content
    </p>
  )
}
