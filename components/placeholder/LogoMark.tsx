/* TEMPORARY PLACEHOLDER ARTWORK, REPLACE BEFORE LAUNCH */

/**
 * A deliberately generic logo lockup for the client strip.
 *
 * The wordmarks are "Client one", "Client two" and so on precisely so that
 * nobody can mistake them for a real business. Never swap these for invented
 * company names: a plausible sounding name reads as a real client we do not
 * have. Replace the whole component with real, permissioned client logos.
 */

const NAVY = '#1A2939'

type Shape = 'circle' | 'square' | 'triangle' | 'rounded' | 'diamond' | 'arch'

const SHAPES: Shape[] = ['circle', 'square', 'triangle', 'rounded', 'diamond', 'arch']

const WORDS = [
  'Client one',
  'Client two',
  'Client three',
  'Client four',
  'Client five',
  'Client six',
]

function Glyph({ shape }: { shape: Shape }) {
  switch (shape) {
    case 'circle':
      return <circle cx="14" cy="14" r="10" fill={NAVY} />
    case 'square':
      return <rect x="4" y="4" width="20" height="20" fill={NAVY} />
    case 'triangle':
      return <path d="M14 3.5 24.5 24H3.5Z" fill={NAVY} />
    case 'rounded':
      return <rect x="4" y="4" width="20" height="20" rx="7" fill={NAVY} />
    case 'diamond':
      return <path d="M14 3 25 14 14 25 3 14Z" fill={NAVY} />
    case 'arch':
      return <path d="M4 24V14a10 10 0 0 1 20 0v10Z" fill={NAVY} />
  }
}

export default function LogoMark({ index = 0 }: { index?: number }) {
  const shape = SHAPES[index % SHAPES.length]
  const word = WORDS[index % WORDS.length]

  return (
    <div
      /* Decorative. The strip's own heading carries the meaning, and these are
         not real marks, so they are kept out of the accessibility tree. */
      aria-hidden="true"
      className="flex w-full items-center justify-center gap-3 py-4 opacity-40"
    >
      <svg width="28" height="28" viewBox="0 0 28 28" className="flex-shrink-0">
        <Glyph shape={shape} />
      </svg>
      <span
        className="font-sans text-sm font-semibold tracking-tight"
        style={{ color: NAVY }}
      >
        {word}
      </span>
    </div>
  )
}
