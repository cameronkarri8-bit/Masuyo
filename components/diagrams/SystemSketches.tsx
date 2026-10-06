import { createPen, INK } from '@/lib/brand/pen'

/**
 * Small interface sketches for the Systems cards: a kanban board, a login
 * with a document list, two apps passing information, a chat, and a progress
 * bar. Pen line, light ground.
 */
const c = INK.light
const line = { fill: 'none', stroke: c.line, strokeWidth: 3, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 300 130" className="h-auto w-full max-w-[18rem]" aria-hidden="true">
      {children}
    </svg>
  )
}

export function KanbanSketch() {
  const pen = createPen(81)
  return (
    <Frame>
      {[0, 1, 2].map(col => (
        <g key={col}>
          <path d={pen.line(14 + col * 96, 14, 86 + col * 96, 13)} {...line} strokeWidth={5} />
          {Array.from({ length: 3 - col }).map((_, k) => {
            const d = pen.rrect(14 + col * 96, 28 + k * 34, 72, 26, 6)
            return col === 1 && k === 0 ? (
              <g key={k}>
                <path d={d} transform="translate(5 5)" fill={c.fill} />
                <path d={d} {...line} fill="#F3F6F7" />
              </g>
            ) : (
              <path key={k} d={d} {...line} />
            )
          })}
        </g>
      ))}
    </Frame>
  )
}

export function PortalSketch() {
  const pen = createPen(82)
  const box = pen.rrect(10, 10, 116, 110, 10)
  return (
    <Frame>
      <path d={box} transform="translate(6 6)" fill={c.fill} />
      <path d={box} fill="#F3F6F7" />
      <g {...line}>
        <path d={box} />
        <path d={pen.circle(68, 34, 10)} />
        <path d={pen.rrect(26, 56, 84, 16, 5)} />
        <path d={pen.rrect(26, 78, 84, 16, 5)} />
      </g>
      <path d={pen.rrect(44, 100, 48, 12, 6)} fill={c.line} />
      {[0, 1, 2].map(i => (
        <g key={i} {...line}>
          <path d={`M${152} ${16 + i * 38}L${168} ${16 + i * 38}L${176} ${24 + i * 38}L${176} ${44 + i * 38}L${152} ${44 + i * 38}Z`} />
          <path d={pen.line(190, 26 + i * 38, 284, 25 + i * 38)} />
          <path d={pen.line(190, 38 + i * 38, 250, 37 + i * 38)} />
        </g>
      ))}
    </Frame>
  )
}

export function IntegrationSketch() {
  const pen = createPen(83)
  const a = pen.rrect(14, 26, 78, 78, 16)
  const b = pen.rrect(208, 26, 78, 78, 16)
  return (
    <Frame>
      <path d={a} transform="translate(6 6)" fill={c.fill} />
      <path d={b} transform="translate(6 6)" fill={c.fill} />
      <g {...line}>
        <path d={a} />
        <path d={b} />
        <path d={pen.circle(53, 65, 16)} />
        <path d={pen.poly([[230, 80], [246, 52], [262, 80]], true)} />
        <path d="M108 56C140 44 164 44 194 56" />
        <path d="M184 46L196 56L182 63" />
        <path d="M194 78C164 90 138 90 108 78" />
        <path d="M118 88L106 78L120 71" />
      </g>
    </Frame>
  )
}

export function AssistantSketch() {
  const pen = createPen(84)
  const them = pen.rrect(14, 12, 168, 44, 16)
  const us = pen.rrect(110, 70, 176, 48, 16)
  return (
    <Frame>
      <path d={us} transform="translate(5 5)" fill={c.fill} />
      <path d={us} fill="#F3F6F7" />
      <g {...line}>
        <path d={them} />
        <path d="M36 56L30 70L50 56" />
        <path d={pen.line(34, 34, 150, 33)} />
        <path d={us} />
        <path d={pen.line(130, 92, 262, 91)} />
        <path d={pen.line(130, 104, 220, 103)} />
      </g>
    </Frame>
  )
}

export function LearningSketch() {
  const pen = createPen(85)
  const bar = pen.rrect(14, 14, 272, 24, 12)
  return (
    <Frame>
      <path d={pen.rrect(14, 14, 168, 24, 12)} transform="translate(4 4)" fill={c.fill} />
      <path d={bar} {...line} />
      <path d={pen.rrect(14, 14, 168, 24, 12)} fill={c.line} />
      {[0, 1, 2].map(i => (
        <g key={i}>
          <path d={pen.circle(26, 64 + i * 24, 8)} {...line} strokeWidth={2.5} fill={i < 2 ? c.line : 'none'} />
          <path d={pen.line(46, 64 + i * 24, i === 2 ? 170 : 220, 63 + i * 24)} {...line} />
        </g>
      ))}
    </Frame>
  )
}
