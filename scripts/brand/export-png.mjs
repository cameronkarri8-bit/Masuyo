/**
 * Render the logo PNGs, the favicons and the app icon from the brand SVGs.
 *
 *   npm run brand:png
 *
 * Writes, with transparent backgrounds:
 *   public/brand/masuyo-wordmark-<version>-<800|1600|3200>.png
 *   public/brand/masuyo-monogram-<tile>-<256|512|1024>.png
 * and the site icons:
 *   app/icon.svg        the petrol monogram, for browsers that take SVG
 *   app/favicon.ico     16 and 32px, for everything else
 *   app/apple-icon.png  180px, square and full bleed: iOS rounds the corners
 *                       itself, and transparency there renders as black
 *   app/opengraph-image.png  the default share card, from og-default.svg
 */

import { Resvg } from '@resvg/resvg-js'
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = new URL('../../', import.meta.url).pathname
const BRAND = join(ROOT, 'public/brand')

function render(svg, fit) {
  return new Resvg(svg, { fitTo: fit, background: 'rgba(0,0,0,0)' }).render().asPng()
}

const written = []

for (const version of ['petrol', 'paper-aqua-dot']) {
  const svg = readFileSync(join(BRAND, `masuyo-wordmark-${version}.svg`), 'utf8')
  for (const width of [800, 1600, 3200]) {
    const name = `masuyo-wordmark-${version}-${width}.png`
    writeFileSync(join(BRAND, name), render(svg, { mode: 'width', value: width }))
    written.push(name)
  }
}

for (const tile of ['petrol', 'mist', 'aqua']) {
  const svg = readFileSync(join(BRAND, `masuyo-monogram-${tile}.svg`), 'utf8')
  for (const size of [256, 512, 1024]) {
    const name = `masuyo-monogram-${tile}-${size}.png`
    writeFileSync(join(BRAND, name), render(svg, { mode: 'width', value: size }))
    written.push(name)
  }
}

// Site icons, all from the petrol monogram.
const petrol = readFileSync(join(BRAND, 'masuyo-monogram-petrol.svg'), 'utf8')
writeFileSync(join(ROOT, 'app/icon.svg'), petrol)

// iOS masks the icon itself, so the tile is drawn square with no corner radius.
const square = petrol.replace(/<rect([^>]*?) rx="[^"]*"/, '<rect$1')
writeFileSync(join(ROOT, 'app/apple-icon.png'), render(square, { mode: 'width', value: 180 }))

// A minimal ICO holding two PNG images, 16 and 32px.
const images = [16, 32].map(size => ({ size, png: render(petrol, { mode: 'width', value: size }) }))
const header = Buffer.alloc(6)
header.writeUInt16LE(0, 0)
header.writeUInt16LE(1, 2)
header.writeUInt16LE(images.length, 4)
let offset = 6 + 16 * images.length
const entries = images.map(({ size, png }) => {
  const e = Buffer.alloc(16)
  e.writeUInt8(size, 0)
  e.writeUInt8(size, 1)
  e.writeUInt8(0, 2)
  e.writeUInt8(0, 3)
  e.writeUInt16LE(1, 4)
  e.writeUInt16LE(32, 6)
  e.writeUInt32LE(png.length, 8)
  e.writeUInt32LE(offset, 12)
  offset += png.length
  return e
})
writeFileSync(join(ROOT, 'app/favicon.ico'), Buffer.concat([header, ...entries, ...images.map(i => i.png)]))

// Default social share card, from the outlined SVG that build_og.py writes.
const og = readFileSync(join(ROOT, 'scripts/brand/og-default.svg'), 'utf8')
writeFileSync(join(ROOT, 'app/opengraph-image.png'), render(og, { mode: 'width', value: 1200 }))

console.log(`wrote ${written.length} logo PNGs, app/opengraph-image.png, app/icon.svg, app/apple-icon.png and app/favicon.ico`)
