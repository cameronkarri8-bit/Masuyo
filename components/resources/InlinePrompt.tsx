import TextLink from '@/components/ui/TextLink'

/** The one soft prompt in an article, after the second section. */
export default function InlinePrompt() {
  return (
    <aside className="not-prose my-10 flex flex-col gap-3 rounded-card bg-paper p-6 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-body font-semibold text-deep">Dealing with this right now? Tell us what is slowing you down.</p>
      <TextLink href="/start" className="shrink-0">
        Start a project
      </TextLink>
    </aside>
  )
}
