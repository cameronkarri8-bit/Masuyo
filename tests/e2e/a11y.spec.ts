import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { PAGES } from './routes'

/**
 * Accessibility with axe on every page, at desktop and phone widths, against
 * WCAG 2.2 A and AA. Any serious or critical issue fails the test.
 */

for (const width of [1440, 390]) {
  test.describe(`at ${width}px`, () => {
    test.use({ viewport: { width, height: 900 } })
    for (const path of PAGES) {
      test(`axe: ${path}`, async ({ page }) => {
        await page.emulateMedia({ reducedMotion: 'reduce' })
        await page.goto(path)
        const results = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
          .analyze()
        const blocking = results.violations.filter(v => v.impact === 'serious' || v.impact === 'critical')
        const summary = blocking.map(v => `${v.id} (${v.impact}): ${v.nodes.slice(0, 3).map(n => n.target.join(' ')).join(' | ')}`)
        expect(summary, `${path} at ${width}px`).toEqual([])
      })
    }
  })
}
