/**
 * Coordinates for the stylised maps on the Approach and Preston pages.
 *
 * A rough outline of North West England, traced from well known coastal and
 * boundary points, and the towns the copy names. It is a stylised outline, not
 * a survey: good enough to show where Leyland sits, nothing more.
 */

export type LatLon = [lat: number, lon: number]

export const NORTH_WEST_OUTLINE: LatLon[] = [
  // Solway coast, south down the Cumbrian coast.
  [54.99, -3.06], [54.95, -3.21], [54.87, -3.39], [54.77, -3.44], [54.71, -3.5], [54.64, -3.57],
  [54.55, -3.59], [54.51, -3.64], [54.4, -3.48], [54.35, -3.41], [54.22, -3.33], [54.2, -3.29],
  // Duddon estuary, Furness and Walney.
  [54.23, -3.18], [54.19, -3.21], [54.1, -3.24], [54.09, -3.16],
  // Leven estuary, Cartmel, Morecambe Bay.
  [54.16, -3.06], [54.21, -3.06], [54.15, -2.94], [54.19, -2.91], [54.2, -2.83], [54.17, -2.83],
  [54.13, -2.78], [54.07, -2.87], [54.04, -2.9], [54.0, -2.89], [53.94, -2.9],
  // The Fylde coast.
  [53.93, -3.0], [53.92, -3.02], [53.88, -3.04], [53.82, -3.06], [53.75, -3.03],
  // The Ribble estuary, traced inland to Preston: the north bank from Lytham,
  // the tidal limit between Preston and Penwortham, then the south bank back
  // out past Longton and Hesketh Bank.
  [53.738, -2.965], [53.748, -2.89], [53.752, -2.866], [53.755, -2.8], [53.757, -2.725],
  [53.753, -2.722], [53.749, -2.762], [53.73, -2.81], [53.7, -2.86], [53.68, -2.94],
  // Sefton coast to the Mersey.
  [53.65, -3.01], [53.57, -3.07], [53.52, -3.06], [53.48, -3.04], [53.45, -3.01],
  // Mersey estuary, in to Runcorn and back out along the Wirral.
  [53.41, -2.99], [53.34, -2.85], [53.35, -2.73], [53.28, -2.9], [53.39, -3.01], [53.44, -3.04],
  // North Wirral and the Dee estuary.
  [53.39, -3.18], [53.37, -3.18], [53.33, -3.11], [53.29, -3.07], [53.24, -3.0], [53.19, -2.89],
  // The Welsh border, Cheshire and the Peak.
  [53.08, -2.88], [52.98, -2.76], [52.99, -2.51], [53.05, -2.3], [53.16, -2.2], [53.25, -2.03],
  [53.36, -2.04], [53.51, -2.03], [53.55, -1.95],
  // The Pennines, north to Scotland.
  [53.65, -2.08], [53.71, -2.1], [53.85, -2.15], [53.92, -2.2], [53.96, -2.43], [54.08, -2.45],
  [54.32, -2.52], [54.47, -2.35], [54.55, -2.25], [54.81, -2.44], [54.95, -2.55], [55.11, -2.8],
]

export const TOWNS: Record<string, LatLon> = {
  Leyland: [53.697, -2.687],
  Preston: [53.763, -2.703],
  Chorley: [53.653, -2.632],
  'Buckshaw Village': [53.681, -2.66],
  Penwortham: [53.746, -2.733],
  'Bamber Bridge': [53.722, -2.661],
}

/** Equirectangular projection scaled to a box, good enough at this latitude. */
export function project(
  [lat, lon]: LatLon,
  bounds: { north: number; south: number; west: number; east: number },
  width: number,
  height: number
): [number, number] {
  const k = Math.cos((((bounds.north + bounds.south) / 2) * Math.PI) / 180)
  const spanX = (bounds.east - bounds.west) * k
  const spanY = bounds.north - bounds.south
  const scale = Math.min(width / spanX, height / spanY)
  const x = (lon - bounds.west) * k * scale + (width - spanX * scale) / 2
  const y = (bounds.north - lat) * scale + (height - spanY * scale) / 2
  return [x, y]
}
