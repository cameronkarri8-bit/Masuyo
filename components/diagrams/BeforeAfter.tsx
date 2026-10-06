'use client'

import { useState } from 'react'
import { createPen } from '@/lib/brand/pen'
import { arrowHead, Label } from './svg'

/**
 * Home: one connected system instead of five disconnected ones.
 *
 * Before: work arriving in four places, tangling into a spreadsheet and paper
 * job sheets. After: a straight flow from website to updated customer. The two
 * drawings share a scale and a style, so the tangle is the only difference.
 *
 * On a light ground, so the after connectors are petrol rather than aqua. Each
 * drawing has a wide layout and a portrait one for phones, so the labels never
 * shrink below a readable size. On a phone a two option toggle switches between
 * them.
 */

const PETROL = '#0F3B4F'
const STEEL = '#52626A'
const DEEP = '#0D1A20'

function Node({ x, y, w, label, filled = false, muted = false }: { x: number; y: number; w: number; label: string; filled?: boolean; muted?: boolean }) {
  const pen = createPen(Math.round(x * 7 + y))
  return (
    <g>
      <path
        d={pen.rrect(x, y, w, 46, 23)}
        fill={filled ? PETROL : '#F3F6F7'}
        stroke={muted ? STEEL : PETROL}
        strokeWidth={2.5}
      />
      <Label x={x + w / 2} y={y + 29} anchor="middle" size={15} fill={filled ? '#F3F6F7' : muted ? STEEL : DEEP}>
        {label}
      </Label>
    </g>
  )
}

const BEFORE_IN = ['Phone', 'Email', 'Contact form', 'Facebook messages']
const BEFORE_OUT = ['Spreadsheet', 'Paper job sheets']
const AFTER = ['Website', 'CRM', 'Quote sent', 'Job booked', 'Invoice raised', 'Customer updated']

function BeforeWide() {
  const tangle = [
    'M196 53C260 53 270 180 300 160C330 140 290 70 330 90C350 100 352 113 372 113',
    'M196 133C250 133 250 60 290 80C330 100 300 230 372 253',
    'M196 213C240 213 300 90 320 140C340 190 260 250 300 260C330 268 340 113 372 113',
    'M196 293C260 293 240 210 280 200C330 188 300 120 372 253',
    'M196 293C230 280 320 300 340 270C352 252 340 240 372 253',
  ]
  return (
    <svg viewBox="0 0 560 360" className="w-full" aria-hidden="true">
      {tangle.map((d, i) => (
        <path key={i} d={d} fill="none" stroke={STEEL} strokeWidth={2.5} strokeLinecap="round" />
      ))}
      {BEFORE_IN.map((t, i) => (
        <Node key={t} x={16} y={30 + i * 80} w={180} label={t} muted />
      ))}
      {BEFORE_OUT.map((t, i) => (
        <Node key={t} x={372} y={90 + i * 140} w={172} label={t} muted />
      ))}
    </svg>
  )
}

function BeforeNarrow() {
  const tangle = [
    'M90 76C90 160 230 150 180 230C150 280 110 300 96 370',
    'M250 76C250 170 80 170 120 250C150 300 240 300 250 370',
    'M90 156C120 220 260 180 220 270C200 320 120 330 96 370',
    'M250 156C220 230 110 230 150 300C170 340 230 340 250 370',
  ]
  return (
    <svg viewBox="0 0 340 430" className="w-full" aria-hidden="true">
      {tangle.map((d, i) => (
        <path key={i} d={d} fill="none" stroke={STEEL} strokeWidth={2.5} strokeLinecap="round" />
      ))}
      <Node x={10} y={30} w={156} label="Phone" muted />
      <Node x={174} y={30} w={156} label="Email" muted />
      <Node x={10} y={110} w={156} label="Contact form" muted />
      <Node x={174} y={110} w={156} label="Facebook messages" muted />
      <Node x={10} y={370} w={156} label="Spreadsheet" muted />
      <Node x={174} y={370} w={156} label="Paper job sheets" muted />
    </svg>
  )
}

function AfterWide() {
  const xs = [16, 200, 384]
  const conn = { fill: 'none', stroke: PETROL, strokeWidth: 3, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  return (
    <svg viewBox="0 0 560 360" className="w-full" aria-hidden="true">
      <path d={`M176 93L196 93${arrowHead(196, 93, 0, 7)}`} {...conn} />
      <path d={`M360 93L380 93${arrowHead(380, 93, 0, 7)}`} {...conn} />
      <path d={`M464 116L464 180L96 180L96 236${arrowHead(96, 236, 90, 7)}`} {...conn} />
      <path d={`M176 259L196 259${arrowHead(196, 259, 0, 7)}`} {...conn} />
      <path d={`M360 259L380 259${arrowHead(380, 259, 0, 7)}`} {...conn} />
      {AFTER.map((t, i) => (
        <Node key={t} x={xs[i % 3]} y={i < 3 ? 70 : 236} w={160} label={t} filled={i === AFTER.length - 1} />
      ))}
    </svg>
  )
}

function AfterNarrow() {
  const conn = { fill: 'none', stroke: PETROL, strokeWidth: 3, strokeLinecap: 'round' as const }
  return (
    <svg viewBox="0 0 340 470" className="w-full" aria-hidden="true">
      {AFTER.slice(0, -1).map((_, i) => {
        const y0 = 20 + i * 76 + 46
        const y1 = y0 + 26
        return <path key={i} d={`M170 ${y0 + 2}L170 ${y1}${arrowHead(170, y1, 90, 7)}`} {...conn} />
      })}
      {AFTER.map((t, i) => (
        <Node key={t} x={70} y={20 + i * 76} w={200} label={t} filled={i === AFTER.length - 1} />
      ))}
    </svg>
  )
}

function Panel({ title, caption, wide, narrow }: { title: string; caption: string; wide: React.ReactNode; narrow: React.ReactNode }) {
  return (
    <figure className="flex h-full flex-col rounded-card bg-paper p-6 sm:p-8">
      <p className="text-subhead text-deep">{title}</p>
      <div className="mt-6 hidden sm:block">{wide}</div>
      <div className="mx-auto mt-6 w-full max-w-sm sm:hidden">{narrow}</div>
      <figcaption className="mt-6 text-body text-steel">{caption}</figcaption>
    </figure>
  )
}

export default function BeforeAfter() {
  const [view, setView] = useState<'before' | 'after'>('before')
  const before = (
    <Panel
      title="Before"
      caption="Work arrives in four places and gets copied by hand into two more."
      wide={<BeforeWide />}
      narrow={<BeforeNarrow />}
    />
  )
  const after = (
    <Panel
      title="After"
      caption="Every enquiry lands in one place and moves forward on its own."
      wide={<AfterWide />}
      narrow={<AfterNarrow />}
    />
  )
  return (
    <div>
      <div role="group" aria-label="Show the diagram for" className="mb-6 inline-flex rounded-full bg-paper p-1 lg:hidden">
        {(['before', 'after'] as const).map(v => (
          <button
            key={v}
            type="button"
            aria-pressed={view === v}
            onClick={() => setView(v)}
            className={`min-h-[2.75rem] rounded-full px-6 text-[1rem] font-semibold capitalize transition-colors ${
              view === v ? 'bg-petrol text-paper' : 'text-petrol'
            }`}
          >
            {v}
          </button>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className={view === 'before' ? '' : 'hidden lg:block'}>{before}</div>
        <div className={view === 'after' ? '' : 'hidden lg:block'}>{after}</div>
      </div>
    </div>
  )
}
