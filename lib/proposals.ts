/**
 * Client proposal routes.
 *
 * One list, used by the nav, footer and analytics wrappers to hide themselves,
 * and by robots.ts to build its disallow rules. Adding a proposal here is the
 * single step that keeps it out of all four, which is the point: the previous
 * arrangement repeated the same path string in four files and adding a second
 * proposal meant remembering all of them.
 *
 * A suffix test on "-proposal" would also work for the runtime checks, but
 * robots.ts needs literal paths to emit, so a list serves both and cannot
 * accidentally catch a marketing page that happens to end in the same word.
 *
 * These pages are password gated, noindex, and deliberately absent from
 * sitemap.ts.
 */
export const PROPOSAL_ROUTES = ['/diogenes-proposal', '/northcote-proposal'] as const

/** True for a proposal route and anything nested under it. */
export function isProposalRoute(pathname: string): boolean {
  return PROPOSAL_ROUTES.some(route => pathname === route || pathname.startsWith(`${route}/`))
}
