/** A URL friendly form of a label: "Systems and CRM" becomes "systems-and-crm". */
export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
