import { Section, Head, Chunk, LIGHT } from '@/components/proposal/primitives'

/** Placeholder body. Copy lands in the next phase. */
export default function ProposalContent() {
  return (
    <Section id="standing" bg={LIGHT} first>
      <Head eyebrow="Placeholder" title="Content to follow." />
      <Chunk>The proposal copy for Northcote Solicitors goes here.</Chunk>
    </Section>
  )
}
