/**
 * Package the brand assets for download.
 *
 *   npm run brand:zip
 *
 * Writes public/brand/masuyo-brand-assets.zip (everything, with a README) and
 * public/brand/masuyo-icons-svg.zip (the twelve icons only). Run it after
 * `npm run brand:png` whenever a logo, icon or the guidelines change.
 */

import { zipSync } from 'fflate'
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = new URL('../../', import.meta.url).pathname
const BRAND = join(ROOT, 'public/brand')
const ICONS = join(BRAND, 'icons')

const README = `Masuyo brand assets
====================

Everything here is free to use when you are working with Masuyo or writing
about us. The full rules are in masuyo-brand-guidelines.pdf.

Which logo to use
-----------------
logo/masuyo-wordmark-petrol.svg
  On white, light grey or any light background, and on aqua.
logo/masuyo-wordmark-paper-aqua-dot.svg
  On dark backgrounds: petrol, deep, or a dark photograph.

Use the SVG wherever you can. It stays sharp at any size. The PNG files are
the same logos with transparent backgrounds, at 800, 1600 and 3200 pixels
wide, for places that will not take an SVG (some email signatures, slide
tools and social platforms).

The monogram
------------
monogram/  The "m." tile, for small spaces: avatars, favicons, stickers and
app icons. Petrol is the default. Mist and aqua are the alternatives.

Icons
-----
icons/  The twelve brand icons. The plain files are for light backgrounds;
the "-on-petrol" files are for dark ones. Never use them below 20 pixels.

App icons
---------
app-icons/  The favicon (favicon.ico and icon.svg) and the 180 pixel
apple-touch-icon.png, all from the petrol monogram.

A few rules
-----------
- Use these files rather than recreating the logo.
- Keep clear space around the logo: the height of the "o" on every side.
- Minimum width: 80 pixels on screen, 20 millimetres in print.
- Do not stretch, recolour, outline it, or add shadows or glows.
- Ask before using our name in an endorsement or a co-branded campaign.

Colours
-------
Petrol  #0F3B4F  RGB 15, 59, 79
Deep    #0D1A20  RGB 13, 26, 32
Aqua    #4FE0E6  RGB 79, 224, 230
Steel   #52626A  RGB 82, 98, 106
Mist    #E4EAEC  RGB 228, 234, 236
Paper   #F3F6F7  RGB 243, 246, 247

Typeface: Albert Sans, free on Google Fonts.

Questions about the brand? hello@masuyodigital.com
`

const read = p => new Uint8Array(readFileSync(p))
const files = { 'masuyo-brand-assets/README.txt': new TextEncoder().encode(README) }

for (const name of readdirSync(BRAND)) {
  const path = join(BRAND, name)
  if (name.startsWith('masuyo-wordmark-')) files[`masuyo-brand-assets/logo/${name}`] = read(path)
  else if (name.startsWith('masuyo-monogram-')) files[`masuyo-brand-assets/monogram/${name}`] = read(path)
  else if (name === 'masuyo-brand-guidelines.pdf') files[`masuyo-brand-assets/${name}`] = read(path)
}

const iconFiles = {}
for (const name of readdirSync(ICONS).filter(n => n.endsWith('.svg'))) {
  files[`masuyo-brand-assets/icons/${name}`] = read(join(ICONS, name))
  iconFiles[`masuyo-icons/${name}`] = read(join(ICONS, name))
}

files['masuyo-brand-assets/app-icons/favicon.ico'] = read(join(ROOT, 'app/favicon.ico'))
files['masuyo-brand-assets/app-icons/icon.svg'] = read(join(ROOT, 'app/icon.svg'))
files['masuyo-brand-assets/app-icons/apple-touch-icon.png'] = read(join(ROOT, 'app/apple-icon.png'))

// A fixed date, so the zip only changes when the files inside it do.
const mtime = new Date('2026-10-01T00:00:00Z')
const opts = { mtime, level: 9 }
writeFileSync(join(BRAND, 'masuyo-brand-assets.zip'), zipSync(files, opts))
writeFileSync(join(BRAND, 'masuyo-icons-svg.zip'), zipSync(iconFiles, opts))
console.log(`wrote masuyo-brand-assets.zip (${Object.keys(files).length} files) and masuyo-icons-svg.zip (${Object.keys(iconFiles).length} files)`)
