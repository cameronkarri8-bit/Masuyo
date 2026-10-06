import { defineConfig, devices } from '@playwright/test'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

/**
 * Browser tests. They run against a production build (`npm run build` first)
 * served on port 3100, with the form transport switched to a local outbox so
 * no email is ever sent.
 *
 * PLAYWRIGHT_CHROMIUM_PATH points at a system Chromium where Playwright's own
 * browser download is not available.
 */
export const OUTBOX = join(tmpdir(), 'masuyo-forms-outbox.jsonl')
const PORT = 3100

export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 60_000,
  fullyParallel: false,
  workers: 1,
  reporter: [['list']],
  use: {
    baseURL: `http://localhost:${PORT}`,
    ...devices['Desktop Chrome'],
    launchOptions: {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined,
      args: ['--no-proxy-server', '--disable-background-networking'],
    },
  },
  webServer: {
    command: `npx next start -p ${PORT}`,
    url: `http://localhost:${PORT}/robots.txt`,
    reuseExistingServer: false,
    timeout: 120_000,
    env: {
      FORMS_TRANSPORT: 'mock',
      FORMS_MOCK_OUTBOX: OUTBOX,
      DIOGENES_PROPOSAL_PASSWORD: 'e2e-password',
      NORTHCOTE_PROPOSAL_PASSWORD: 'e2e-password',
    },
  },
})
