/**
 * The twelve pen marks from page 8 of the brand guide.
 *
 * Each is a pen stroke rather than a geometric shape: lines overshoot where
 * they meet, curves are slightly uneven and nothing is perfectly level, so the
 * marks read as made by hand on a printout. Coordinates are in each mark's own
 * viewBox. Strokes are drawn with round caps and joins at a constant width.
 */

export type PenMarkType =
  | 'circle'
  | 'box'
  | 'underline'
  | 'double-underline'
  | 'arrow'
  | 'loop-arrow'
  | 'tick'
  | 'cross'
  | 'strikethrough'
  | 'burst'
  | 'squiggle'
  | 'brackets'

export interface PenMarkShape {
  viewBox: string
  /** One entry per stroke, drawn in order. */
  strokes: string[]
}

export const PEN_MARKS: Record<PenMarkType, PenMarkShape> = {
  // An oval that runs past its own start, the way a quick circle does.
  circle: {
    viewBox: '0 0 120 84',
    strokes: [
      'M84 10C62 3 26 6 12 26C1 42 8 63 30 73C52 82 88 78 105 60C119 45 113 21 92 11C78 5 60 6 47 10',
    ],
  },
  // Four strokes that cross at the corners rather than meeting neatly.
  box: {
    viewBox: '0 0 140 90',
    strokes: [
      'M4 11C46 9 94 7 136 6',
      'M131 3C132 30 133 58 134 85',
      'M137 81C96 82 52 83 6 84',
      'M9 87C8 60 7 35 7 7',
    ],
  },
  underline: {
    viewBox: '0 0 140 16',
    strokes: ['M4 11C44 8 92 6 136 4'],
  },
  'double-underline': {
    viewBox: '0 0 140 26',
    strokes: ['M4 9C46 6 94 5 136 3', 'M14 21C52 18 92 17 126 15'],
  },
  arrow: {
    viewBox: '0 0 140 70',
    strokes: ['M4 62C46 60 92 44 128 12', 'M104 9C113 10 122 10 130 9C128 17 126 25 123 33'],
  },
  'loop-arrow': {
    viewBox: '0 0 150 80',
    strokes: [
      'M4 70C14 44 34 24 56 26C72 28 74 50 62 54C48 58 46 38 64 28C86 16 112 16 140 18',
      'M122 7C129 11 135 15 141 18C135 23 129 28 123 33',
    ],
  },
  tick: {
    viewBox: '0 0 80 66',
    strokes: ['M5 34C12 42 19 50 26 59C40 40 56 21 75 5'],
  },
  cross: {
    viewBox: '0 0 72 72',
    strokes: ['M6 7C26 27 46 46 66 66', 'M65 6C45 26 26 46 7 65'],
  },
  strikethrough: {
    viewBox: '0 0 140 16',
    strokes: ['M3 10C40 7 96 9 137 4'],
  },
  // Short strokes radiating from a point, with uneven lengths and gaps.
  burst: {
    viewBox: '0 0 90 90',
    strokes: [
      'M45 6L45 24',
      'M45 66L45 84',
      'M6 45L24 45',
      'M66 45L84 45',
      'M17 17L29 29',
      'M61 61L73 73',
      'M73 17L61 29',
      'M17 73L29 61',
    ],
  },
  squiggle: {
    viewBox: '0 0 140 40',
    strokes: ['M4 24C14 8 26 8 36 22C46 36 58 36 68 20C78 6 92 8 102 22C112 36 124 34 136 18'],
  },
  brackets: {
    viewBox: '0 0 120 90',
    strokes: ['M26 6C10 22 8 66 25 84', 'M94 6C110 22 112 66 95 84'],
  },
}
