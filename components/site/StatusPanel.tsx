/**
 * Care hero: a small panel styled like a system status page. It says "handled"
 * without a word of sales copy. Aqua dots, because it sits on petrol.
 */
const ROWS = ['Site online', 'Backups complete', 'Security up to date']

export default function StatusPanel() {
  return (
    <div className="mx-auto mt-12 w-full max-w-sm rounded-card bg-paper/[0.06] p-2 text-left ring-1 ring-inset ring-paper/15" aria-label="Example status panel">
      <ul className="divide-y divide-paper/10">
        {ROWS.map(row => (
          <li key={row} className="flex items-center gap-3 px-4 py-3.5 text-body font-semibold text-paper">
            <span className="relative flex h-3 w-3 shrink-0" aria-hidden="true">
              <span className="absolute inset-0 rounded-full bg-aqua" />
            </span>
            {row}
          </li>
        ))}
      </ul>
    </div>
  )
}
