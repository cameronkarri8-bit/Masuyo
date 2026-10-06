import { createPen, INK, type InkTone } from '@/lib/brand/pen'
import { DrawnMark, DrawnWordmark, Frame, FONT, LINE } from './shared'

/**
 * "Going live": launches and handovers. For new site news and case studies.
 * A browser window saying the site is live, a full progress bar, and a ticked
 * circle with a small burst for movement.
 */
export default function GoingLive({ tone = 'light', className = '', title }: { tone?: InkTone; className?: string; title?: string }) {
  const c = INK[tone]
  const pen = createPen(33)
  const win = pen.rrect(96, 44, 342, 214, 14)
  const ink = tone === 'dark' ? c.onFill : c.line
  return (
    <Frame viewBox="0 0 560 300" className={className} title={title}>
      <path d={win} transform="translate(10 10)" fill={c.fill} />
      <g fill="none" stroke={c.line} strokeWidth={LINE} strokeLinecap="round" strokeLinejoin="round">
        <path d={win} />
        <path d={pen.line(96, 68, 438, 67)} />
      </g>
      <g fill={c.line}>
        <path d={pen.dot(114, 56, 3.4)} />
        <path d={pen.dot(127, 56, 3.4)} />
      </g>
      <DrawnWordmark x={124} y={96} width={150} colour={ink} />
      <text x={124} y={168} fontSize={20} fontWeight={600} fill={ink} style={FONT}>
        Your new site is live
      </text>
      <path d={pen.rrect(124, 196, 280, 24, 12)} fill={ink} />
      <DrawnMark type="circle" x={392} y={14} width={110} height={92} colour={c.mark} />
      <DrawnMark type="tick" x={420} y={36} width={56} height={44} colour={c.mark} />
      <g stroke={c.mark} strokeWidth={LINE} strokeLinecap="round">
        <path d="M476 176L494 182" />
        <path d="M470 196L486 210" />
        <path d="M480 156L498 150" />
      </g>
    </Frame>
  )
}
