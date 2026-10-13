/**
 * Photo preparation for the application form, in the browser.
 *
 * Every photo is decoded and re-encoded, even small ones, because that is
 * what fixes the orientation and strips location data (EXIF) from phone
 * photos. Longest edge at most 2,000px, JPEG at 0.82; if it is still over
 * 2 MB, the quality steps down, then the size steps down to 1,600px. The
 * server checks the size and the real type again.
 */

export const MAX_PHOTOS = 5
export const MAX_BYTES = 2 * 1024 * 1024
export const TOO_BIG = "That photo's a bit big. Try a different one or a screenshot of it."
export const CANT_OPEN = "Your browser can't open that photo. Try a JPG, PNG or a screenshot of it."

const ATTEMPTS: { edge: number; quality: number }[] = [
  { edge: 2000, quality: 0.82 },
  { edge: 2000, quality: 0.72 },
  { edge: 2000, quality: 0.62 },
  { edge: 1600, quality: 0.82 },
  { edge: 1600, quality: 0.72 },
  { edge: 1600, quality: 0.62 },
]

type Source = { width: number; height: number; draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void; close: () => void }

/** Decode with orientation applied. createImageBitmap first; an <img> where that fails (older Safari, HEIC). */
async function decode(file: File): Promise<Source> {
  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' })
    return { width: bitmap.width, height: bitmap.height, draw: (ctx, w, h) => ctx.drawImage(bitmap, 0, 0, w, h), close: () => bitmap.close() }
  } catch {
    const url = URL.createObjectURL(file)
    try {
      const img = new Image()
      img.decoding = 'async'
      img.src = url
      await img.decode()
      return { width: img.naturalWidth, height: img.naturalHeight, draw: (ctx, w, h) => ctx.drawImage(img, 0, 0, w, h), close: () => URL.revokeObjectURL(url) }
    } catch {
      URL.revokeObjectURL(url)
      throw new Error(CANT_OPEN)
    }
  }
}

function toBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => canvas.toBlob(b => (b ? resolve(b) : reject(new Error(CANT_OPEN))), 'image/jpeg', quality))
}

/** A JPEG under 2 MB, or an error with a message fit for the visitor. */
export async function preparePhoto(file: File): Promise<Blob> {
  const source = await decode(file)
  try {
    if (!source.width || !source.height) throw new Error(CANT_OPEN)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error(CANT_OPEN)
    let lastEdge = 0
    for (const { edge, quality } of ATTEMPTS) {
      if (edge !== lastEdge) {
        const scale = Math.min(1, edge / Math.max(source.width, source.height))
        canvas.width = Math.max(1, Math.round(source.width * scale))
        canvas.height = Math.max(1, Math.round(source.height * scale))
        // A white ground, so transparent PNGs do not turn black as JPEGs.
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        source.draw(ctx, canvas.width, canvas.height)
        lastEdge = edge
      }
      const blob = await toBlob(canvas, quality)
      if (blob.size <= MAX_BYTES) return blob
    }
    throw new Error(TOO_BIG)
  } finally {
    source.close()
  }
}
