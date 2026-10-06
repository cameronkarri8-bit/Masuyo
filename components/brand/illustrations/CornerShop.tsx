import { createPen, INK, type InkTone } from '@/lib/brand/pen'
import { DrawnMark, Frame, FONT, LINE } from './shared'

/**
 * "The shop on the corner": the businesses we build for. For service pages
 * and local pages. A shop front with its door open, and a phone with a booking
 * confirmed, joined by a loop arrow.
 */
export default function CornerShop({ tone = 'dark', className = '', title }: { tone?: InkTone; className?: string; title?: string }) {
  const c = INK[tone]
  const pen = createPen(32)
  const door = pen.rrect(300, 146, 58, 144, 3)
  const phone = pen.rrect(424, 62, 68, 124, 12)
  // Scalloped edge along the bottom of the awning.
  let scallop = 'M124 112'
  for (let x = 124; x < 386; x += 26) scallop += `C${x + 6} 124 ${x + 20} 124 ${x + 26} 112`
  return (
    <Frame viewBox="0 0 560 310" className={className} title={title}>
      <g fill={c.fill}>
        {[0, 1, 2, 3, 4].map(i => (
          <rect key={i} x={132 + i * 52} y={78} width={26} height={32} />
        ))}
        <path d={door} transform="translate(7 0)" />
        <path d={phone} transform="translate(8 8)" />
      </g>
      <g fill="none" stroke={c.line} strokeWidth={LINE} strokeLinecap="round" strokeLinejoin="round">
        <path d={pen.line(24, 291, 536, 290)} />
        <path d={pen.rrect(176, 22, 140, 40, 6)} />
        <path d={pen.rrect(122, 74, 266, 38, 3)} />
        <path d={scallop} />
        <path d={pen.line(128, 118, 127, 290)} />
        <path d={pen.line(382, 118, 383, 290)} />
        <path d={pen.rrect(150, 150, 122, 88, 6)} />
        <path d={door} />
        <path d={phone} />
        <path d={pen.line(448, 76, 468, 76)} />
        <path d={pen.rrect(440, 98, 38, 38, 5)} />
        <path d="M448 117L456 125L470 109" stroke={c.onFill} />
      </g>
      <g fill={c.line}>
        <path d={pen.dot(314, 222, 4.2)} />
      </g>
      <rect x={180} y={176} width={62} height={30} rx={6} fill={c.line} />
      <text x={211} y={197} textAnchor="middle" fontSize={17} fontWeight={700} fill={tone === 'dark' ? '#0F3B4F' : '#F3F6F7'} style={FONT}>
        Open
      </text>
      <text x={246} y={48} textAnchor="middle" fontSize={18} fontWeight={700} fill={c.text} style={FONT}>
        Corner shop
      </text>
      <DrawnMark type="loop-arrow" x={362} y={196} width={92} height={58} colour={c.mark} />
    </Frame>
  )
}
