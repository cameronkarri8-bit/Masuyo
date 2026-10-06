/**
 * The highlighter: aqua behind the lower half of one word.
 *
 * Flat colour, straight edges, a slight tilt. 55% on light grounds, 45% inside
 * a dark section. Use it on one word per layout, at most.
 */
export default function Highlighter({ children }: { children: React.ReactNode }) {
  return <span className="highlighter">{children}</span>
}
