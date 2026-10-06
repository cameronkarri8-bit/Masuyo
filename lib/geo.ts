/**
 * Coordinates for the stylised maps on the Approach and Preston pages.
 *
 * A rough outline of North West England, traced from well known coastal and
 * boundary points, and the towns the copy names. It is a stylised outline, not
 * a survey: good enough to show where Leyland sits, nothing more.
 */

export type LatLon = [lat: number, lon: number]

export const NORTH_WEST_OUTLINE: LatLon[] = [
  [54.98, -3.03], [54.88, -3.4], [54.71, -3.5], [54.55, -3.6], [54.48, -3.62], [54.35, -3.42],
  [54.2, -3.28], [54.1, -3.23], [54.18, -3.08], [54.2, -2.92], [54.15, -2.85], [54.07, -2.87],
  [53.93, -3.01], [53.82, -3.05], [53.74, -2.96], [53.73, -2.84], [53.68, -2.92], [53.65, -3.01],
  [53.56, -3.07], [53.45, -3.03], [53.4, -3.1], [53.39, -3.19], [53.3, -3.12], [53.22, -2.93],
  [53.0, -2.75], [52.95, -2.55], [53.0, -2.3], [53.2, -2.08], [53.35, -1.97], [53.55, -1.95],
  [53.72, -2.1], [53.88, -2.15], [54.03, -2.3], [54.32, -2.5], [54.55, -2.32], [54.8, -2.4],
  [55.05, -2.68],
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
