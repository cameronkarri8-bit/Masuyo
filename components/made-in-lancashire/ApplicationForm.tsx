'use client'

import { useEffect, useRef, useState } from 'react'
import { APPLICATION_ENDPOINT, CATEGORIES, REPLY_WORKING_DAYS, ROUNDUP_CONSENT } from '@/lib/made-in-lancashire/config'
import { MAX_PHOTOS, preparePhoto } from '@/lib/made-in-lancashire/photos'
import { BUTTON_PRIMARY, BUTTON_SECONDARY, describedBy, ErrorText, focusFirst, Hint, INPUT, Label, SHADOW } from './FormBits'

/**
 * The Made in Lancashire application form, in four short steps: About you,
 * Your business, Find you online and Photos. Each step is checked before the
 * next; Back keeps everything typed. Photos are prepared in the browser
 * (orientation fixed, resized, re-encoded as JPEG, which strips location
 * data) and sent with the form to the submit-application edge function,
 * which checks everything again.
 */

const STEPS = ['About you', 'Your business', 'Find you online', 'Photos'] as const

export const PHOTO_CONSENT =
  "I own these photos or have permission to use them, and I'm happy for Masuyo to use them on the Made in Lancashire directory and Instagram."

type Values = {
  applicant_name: string
  applicant_role: '' | 'owner' | 'manager' | 'other'
  email: string
  phone: string
  business_name: string
  town: string
  category: string
  one_line: string
  description: string
  year_started: string
  address: string
  opening_hours: string
  extra: string
  website: string
  instagram: string
  facebook: string
  tiktok: string
  linkedin: string
  google_business: string
  other_link: string
  photo_consent: boolean
  roundup_opt_in: boolean
  company_website: string
}

type Field = keyof Values | 'photos'
type Errors = Partial<Record<Field, string>>

const EMPTY: Values = {
  applicant_name: '',
  applicant_role: '',
  email: '',
  phone: '',
  business_name: '',
  town: '',
  category: '',
  one_line: '',
  description: '',
  year_started: '',
  address: '',
  opening_hours: '',
  extra: '',
  website: '',
  instagram: '',
  facebook: '',
  tiktok: '',
  linkedin: '',
  google_business: '',
  other_link: '',
  photo_consent: false,
  roundup_opt_in: false,
  company_website: '',
}

/** Which step each field lives on, in on-screen order. */
const STEP_FIELDS: Field[][] = [
  ['applicant_name', 'applicant_role', 'email', 'phone'],
  ['business_name', 'town', 'category', 'one_line', 'description', 'year_started', 'address', 'opening_hours', 'extra'],
  ['website', 'instagram', 'facebook', 'tiktok', 'linkedin', 'google_business', 'other_link'],
  ['photos', 'photo_consent'],
]

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
const WEB = /^(https?:\/\/)?[^\s/.]+(\.[^\s/.]+)+(\/\S*)?$/i
const HANDLE_OR_WEB = /^(@?[A-Za-z0-9._]{1,60}|(https?:\/\/)?[^\s/.]+(\.[^\s/.]+)+(\/\S*)?)$/i

function validateStep(step: number, v: Values, photoCount: number): Errors {
  const e: Errors = {}
  if (step === 0) {
    if (!v.applicant_name.trim()) e.applicant_name = 'Add your name.'
    if (!v.applicant_role) e.applicant_role = 'Choose your role.'
    if (!v.email.trim()) e.email = 'Add your email so we can reply.'
    else if (!EMAIL.test(v.email.trim())) e.email = 'Check the email address.'
    if (v.phone.trim() && !/^[0-9 +()-]{6,}$/.test(v.phone.trim())) e.phone = 'Check the phone number.'
  }
  if (step === 1) {
    if (!v.business_name.trim()) e.business_name = 'Add the business name.'
    if (!v.town.trim()) e.town = 'Add the town.'
    if (!v.category) e.category = 'Choose a category.'
    if (!v.one_line.trim()) e.one_line = 'Tell us what you do in one line.'
    else if (v.one_line.trim().length > 120) e.one_line = 'Keep it to 120 characters.'
    if (v.description.length > 1500) e.description = 'Keep it to 1,500 characters.'
    const year = v.year_started.trim()
    if (year && (!/^\d{4}$/.test(year) || Number(year) < 1800 || Number(year) > new Date().getFullYear())) e.year_started = 'Use a four digit year, like 2015.'
    if (v.extra.length > 500) e.extra = 'Keep it to 500 characters.'
  }
  if (step === 2) {
    const gentle = "That doesn't look quite right. Check it, or leave it blank."
    if (v.website.trim() && !WEB.test(v.website.trim())) e.website = gentle
    for (const k of ['instagram', 'facebook', 'tiktok'] as const) if (v[k].trim() && !HANDLE_OR_WEB.test(v[k].trim())) e[k] = gentle
    for (const k of ['linkedin', 'google_business', 'other_link'] as const) if (v[k].trim() && !WEB.test(v[k].trim())) e[k] = gentle
  }
  if (step === 3) {
    if (photoCount > 0 && !v.photo_consent) e.photo_consent = 'Tick the box to confirm you can share these photos.'
  }
  return e
}

interface Photo {
  id: string
  name: string
  url: string
  blob: Blob | null
  status: 'preparing' | 'ready' | 'error'
  error?: string
}

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'limited'

export default function ApplicationForm() {
  const [step, setStep] = useState(0)
  const [v, setV] = useState<Values>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [photos, setPhotos] = useState<Photo[]>([])
  const [photoNote, setPhotoNote] = useState('')
  const [dragging, setDragging] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [progress, setProgress] = useState<number[]>([])
  const formRef = useRef<HTMLFormElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const firstRender = useRef(true)

  // Move focus to the step heading when the step changes, for keyboard and screen reader users.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    headingRef.current?.focus()
    headingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [step])

  // Free the thumbnails' memory when the form goes.
  useEffect(() => () => photos.forEach(p => URL.revokeObjectURL(p.url)), []) // eslint-disable-line react-hooks/exhaustive-deps

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setV(prev => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: undefined }))
  }

  const readyPhotos = photos.filter(p => p.status === 'ready')

  async function addFiles(list: FileList | File[]) {
    setPhotoNote('')
    const files = Array.from(list)
    const room = MAX_PHOTOS - photos.length
    if (files.length > room) setPhotoNote(room > 0 ? `You can add ${room} more, so we've used the first ${room}.` : 'You already have 5 photos. Remove one to add another.')
    for (const file of files.slice(0, Math.max(0, room))) {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`
      const url = URL.createObjectURL(file)
      setPhotos(prev => [...prev, { id, name: file.name, url, blob: null, status: 'preparing' }])
      try {
        const blob = await preparePhoto(file)
        const small = URL.createObjectURL(blob)
        URL.revokeObjectURL(url)
        setPhotos(prev => prev.map(p => (p.id === id ? { ...p, blob, url: small, status: 'ready' } : p)))
      } catch (err) {
        setPhotos(prev => prev.map(p => (p.id === id ? { ...p, status: 'error', error: (err as Error).message } : p)))
      }
    }
    if (errors.photos) setErrors(prev => ({ ...prev, photos: undefined }))
  }

  function removePhoto(id: string) {
    setPhotos(prev => {
      const gone = prev.find(p => p.id === id)
      if (gone) URL.revokeObjectURL(gone.url)
      return prev.filter(p => p.id !== id)
    })
  }

  function goTo(next: number) {
    if (next > step) {
      const found = validateStep(step, v, readyPhotos.length)
      setErrors(found)
      const first = STEP_FIELDS[step].find(k => found[k])
      if (first) {
        requestAnimationFrame(() => focusFirst(formRef.current, [first]))
        return
      }
    }
    setErrors({})
    setStep(next)
  }

  function send(form: FormData): Promise<{ status: number; body: { errors?: Errors } }> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open('POST', APPLICATION_ENDPOINT)
      const sizes = readyPhotos.map(p => p.blob!.size)
      const total = sizes.reduce((a, b) => a + b, 0)
      xhr.upload.onprogress = e => {
        if (!total || !e.lengthComputable) return
        // The photos go after the small text fields, in order, so the bytes
        // sent so far can be shared out photo by photo.
        let sent = Math.max(0, e.loaded - (e.total - total))
        setProgress(sizes.map(size => {
          const part = Math.min(size, sent)
          sent -= part
          return Math.round((part / size) * 100)
        }))
      }
      xhr.onload = () => {
        let body = {}
        try {
          body = JSON.parse(xhr.responseText)
        } catch {
          body = {}
        }
        resolve({ status: xhr.status, body })
      }
      xhr.onerror = () => reject(new Error('network'))
      xhr.send(form)
    })
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (step < STEPS.length - 1) return goTo(step + 1)
    if (photos.some(p => p.status === 'preparing')) {
      setPhotoNote('Hang on a moment while your photos get ready.')
      return
    }
    // Check every step once more, and jump to the first one with a problem.
    for (let s = 0; s < STEPS.length; s++) {
      const found = validateStep(s, v, readyPhotos.length)
      const first = STEP_FIELDS[s].find(k => found[k])
      if (first) {
        setErrors(found)
        setStep(s)
        requestAnimationFrame(() => requestAnimationFrame(() => focusFirst(formRef.current, [first])))
        return
      }
    }
    const form = new FormData()
    for (const [k, val] of Object.entries(v)) form.append(k, typeof val === 'boolean' ? String(val) : val)
    if (readyPhotos.length === 0) form.set('photo_consent', 'false')
    readyPhotos.forEach((p, i) => form.append('photos', p.blob!, `photo-${i + 1}.jpg`))
    setStatus('sending')
    setProgress(readyPhotos.map(() => 0))
    try {
      const res = await send(form)
      if (res.status === 429) return setStatus('limited')
      if (res.status === 422 && res.body.errors) {
        const found = res.body.errors
        setErrors(found)
        setStatus('idle')
        const s = STEP_FIELDS.findIndex(list => list.some(k => found[k]))
        if (s >= 0) {
          setStep(s)
          const first = STEP_FIELDS[s].find(k => found[k])!
          requestAnimationFrame(() => requestAnimationFrame(() => focusFirst(formRef.current, [first])))
        }
        return
      }
      if (res.status < 200 || res.status >= 300) return setStatus('error')
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className={`rounded-card bg-paper p-6 sm:p-8 ${SHADOW}`}>
        <p className="text-subhead text-deep">Thanks, your application is in. We&apos;ll get back to you within {REPLY_WORKING_DAYS} working days.</p>
      </div>
    )
  }

  const sending = status === 'sending'
  const err = (k: Field) => errors[k]
  const field = (k: keyof Values, label: string, opts: { optional?: boolean; type?: string; inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']; autoComplete?: string; placeholder?: string; hint?: string; max?: number } = {}) => (
    <div>
      <Label htmlFor={`app-${k}`} optional={opts.optional}>
        {label}
      </Label>
      <input
        id={`app-${k}`}
        name={k}
        type={opts.type ?? 'text'}
        inputMode={opts.inputMode}
        autoComplete={opts.autoComplete ?? 'off'}
        placeholder={opts.placeholder}
        className={INPUT}
        value={v[k] as string}
        onChange={e => set(k, e.target.value as never)}
        aria-invalid={!!err(k)}
        aria-describedby={describedBy(opts.hint && `app-${k}-hint`, err(k) && `app-${k}-error`)}
        maxLength={opts.max ?? 300}
      />
      {opts.hint && <Hint id={`app-${k}-hint`}>{opts.hint}</Hint>}
      <ErrorText id={`app-${k}-error`}>{err(k)}</ErrorText>
    </div>
  )
  const area = (k: 'description' | 'opening_hours' | 'extra' | 'address', label: string, max: number, rows: number, hint?: string, autoComplete?: string) => (
    <div>
      <Label htmlFor={`app-${k}`} optional>
        {label}
      </Label>
      <textarea
        id={`app-${k}`}
        name={k}
        rows={rows}
        autoComplete={autoComplete ?? 'off'}
        className={INPUT}
        value={v[k]}
        onChange={e => set(k, e.target.value)}
        aria-invalid={!!err(k)}
        aria-describedby={describedBy(`app-${k}-hint`, err(k) && `app-${k}-error`)}
        maxLength={max}
      />
      <Hint id={`app-${k}-hint`}>
        {hint ? `${hint} ` : ''}
        <span aria-live="polite">
          {v[k].length.toLocaleString('en-GB')} of {max.toLocaleString('en-GB')} characters
        </span>
      </Hint>
      <ErrorText id={`app-${k}-error`}>{err(k)}</ErrorText>
    </div>
  )

  return (
    <form ref={formRef} onSubmit={submit} noValidate className={`relative rounded-card bg-paper p-5 sm:p-8 ${SHADOW}`} aria-describedby="application-privacy">
      <p className="text-body text-steel">Tell us about your business. Only a few fields are required, but the more you share, the better your directory page will be.</p>

      {/* Progress */}
      <div className="mt-6">
        <p className="text-small font-semibold text-steel">
          Step {step + 1} of {STEPS.length}
        </p>
        <ol className="mt-2 grid grid-cols-4 gap-1.5" aria-label="Application steps">
          {STEPS.map((name, i) => (
            <li key={name} aria-current={i === step ? 'step' : undefined}>
              <span className={`block h-1.5 rounded-full ${i <= step ? 'bg-petrol' : 'bg-petrol/15'}`} />
              <span className={`mt-1.5 hidden text-small sm:block ${i === step ? 'font-semibold text-deep' : 'text-steel'}`}>{name}</span>
            </li>
          ))}
        </ol>
        <h3 ref={headingRef} tabIndex={-1} className="mt-5 scroll-mt-28 text-title text-deep outline-none">
          {STEPS[step]}
        </h3>
      </div>

      <div className="mt-6 space-y-6">
        {step === 0 && (
          <>
            {field('applicant_name', 'Your name', { autoComplete: 'name', max: 120 })}
            <fieldset aria-describedby={err('applicant_role') ? 'app-applicant_role-error' : undefined}>
              <legend className="text-body font-semibold text-deep">Your role</legend>
              <div className="mt-2 grid gap-2 sm:flex sm:gap-6">
                {(['owner', 'manager', 'other'] as const).map(role => (
                  <label key={role} className="inline-flex min-h-[2.75rem] items-center gap-3 text-body text-deep">
                    <input type="radio" name="applicant_role" value={role} checked={v.applicant_role === role} onChange={() => set('applicant_role', role)} className="h-5 w-5 accent-petrol" />
                    {role === 'owner' ? 'Owner' : role === 'manager' ? 'Manager' : 'Other'}
                  </label>
                ))}
              </div>
              <ErrorText id="app-applicant_role-error">{err('applicant_role')}</ErrorText>
            </fieldset>
            {field('email', 'Your email', { type: 'email', inputMode: 'email', autoComplete: 'email', max: 254 })}
            {field('phone', 'Phone', { optional: true, type: 'tel', inputMode: 'tel', autoComplete: 'tel', max: 40 })}
          </>
        )}

        {step === 1 && (
          <>
            {field('business_name', 'Business name', { autoComplete: 'organization', max: 120 })}
            {field('town', 'Town', { autoComplete: 'address-level2', max: 80 })}
            <div>
              <Label htmlFor="app-category">Category</Label>
              <select
                id="app-category"
                name="category"
                className={INPUT}
                value={v.category}
                onChange={e => set('category', e.target.value)}
                aria-invalid={!!err('category')}
                aria-describedby={describedBy(err('category') && 'app-category-error')}
              >
                <option value="">Choose a category</option>
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <ErrorText id="app-category-error">{err('category')}</ErrorText>
            </div>
            <div>
              <Label htmlFor="app-one_line">What you do, in one line</Label>
              <input
                id="app-one_line"
                name="one_line"
                className={INPUT}
                value={v.one_line}
                onChange={e => set('one_line', e.target.value)}
                aria-invalid={!!err('one_line')}
                aria-describedby={describedBy('app-one_line-hint', err('one_line') && 'app-one_line-error')}
                maxLength={120}
              />
              <Hint id="app-one_line-hint">
                For example: Sourdough, pastries and coffee, baked fresh every morning. <span aria-live="polite">{v.one_line.length} of 120</span>
              </Hint>
              <ErrorText id="app-one_line-error">{err('one_line')}</ErrorText>
            </div>
            {area('description', 'Tell us more', 1500, 6, 'Your story, what you sell, what makes you different.')}
            {field('year_started', 'Year you started', { optional: true, inputMode: 'numeric', max: 4, placeholder: 'For example, 2015' })}
            {area('address', 'Address, if customers visit you', 300, 2, undefined, 'street-address')}
            {area('opening_hours', 'Opening hours', 500, 3, 'However suits you, like Tuesday to Saturday, 9am to 5pm.')}
            {area('extra', 'Anything else we should know', 500, 3)}
          </>
        )}

        {step === 2 && (
          <>
            <p className="text-body text-steel">All optional. A full link or an @handle is fine.</p>
            {field('website', 'Website', { optional: true, type: 'url', inputMode: 'url', autoComplete: 'url', placeholder: 'yourbusiness.co.uk' })}
            {field('instagram', 'Instagram', { optional: true, placeholder: '@yourbusiness' })}
            {field('facebook', 'Facebook', { optional: true, placeholder: 'Your page name or link' })}
            {field('tiktok', 'TikTok', { optional: true, placeholder: '@yourbusiness' })}
            {field('linkedin', 'LinkedIn', { optional: true, type: 'url', inputMode: 'url' })}
            {field('google_business', 'Google Business Profile link', { optional: true, type: 'url', inputMode: 'url' })}
            {field('other_link', 'Anything else', { optional: true, type: 'url', inputMode: 'url' })}
          </>
        )}

        {step === 3 && (
          <>
            <div>
              <p className="text-body font-semibold text-deep">
                Photos <span className="font-normal text-steel">(optional, up to 5)</span>
              </p>
              <p id="app-photos-hint" className="mt-1 text-small text-steel">
                Your shop, your work, your team. The first photo is used as the cover.
              </p>
              {photos.length < MAX_PHOTOS && (
                <label
                  htmlFor="app-photos"
                  onDragOver={e => {
                    e.preventDefault()
                    setDragging(true)
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={e => {
                    e.preventDefault()
                    setDragging(false)
                    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files)
                  }}
                  className={`mt-3 flex min-h-[7rem] cursor-pointer flex-col items-center justify-center rounded-card border-2 border-dashed px-4 py-6 text-center transition-colors ${
                    dragging ? 'border-petrol bg-mist' : 'border-petrol/30 hover:border-petrol'
                  }`}
                >
                  <span className="text-body font-semibold text-petrol">Choose photos</span>
                  <span className="mt-1 text-small text-steel">or drag them here. JPG, PNG, WebP or HEIC.</span>
                </label>
              )}
              <input
                ref={fileRef}
                id="app-photos"
                name="photos"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/heic,image/heif,.heic,.heif"
                multiple
                className="sr-only"
                aria-describedby={describedBy('app-photos-hint', err('photos') && 'app-photos-error')}
                onChange={e => {
                  if (e.target.files?.length) addFiles(e.target.files)
                  e.target.value = ''
                }}
              />
              {photoNote && <p className="mt-2 text-small text-steel" role="status">{photoNote}</p>}
              <ErrorText id="app-photos-error">{err('photos')}</ErrorText>
              {photos.length > 0 && (
                <ul className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5" aria-label="Your photos">
                  {photos.map((p, i) => (
                    <li key={p.id} className="relative">
                      <div className="aspect-square overflow-hidden rounded-control bg-mist">
                        {p.status !== 'error' && (
                          // A local preview of the visitor's own file; next/image cannot take a blob URL.
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={p.url} alt={`Photo ${i + 1}${i === 0 ? ', the cover' : ''}`} className={`h-full w-full object-cover ${p.status === 'preparing' ? 'opacity-50' : ''}`} />
                        )}
                        {p.status === 'error' && <p className="p-2 text-[13px] leading-snug text-[#B42318]">{p.error}</p>}
                      </div>
                      {i === 0 && p.status === 'ready' && <span className="absolute left-1.5 top-1.5 rounded-full bg-petrol px-2 py-0.5 text-[12px] font-semibold text-paper">Cover</span>}
                      {sending && p.status === 'ready' && (
                        <div className="mt-1.5 h-1.5 rounded-full bg-petrol/15" role="progressbar" aria-label={`Uploading photo ${i + 1}`} aria-valuenow={progress[readyPhotos.indexOf(p)] ?? 0} aria-valuemin={0} aria-valuemax={100}>
                          <div className="h-1.5 rounded-full bg-petrol transition-[width]" style={{ width: `${progress[readyPhotos.indexOf(p)] ?? 0}%` }} />
                        </div>
                      )}
                      {!sending && (
                        <button
                          type="button"
                          onClick={() => removePhoto(p.id)}
                          className="mt-1.5 flex min-h-[2.75rem] w-full items-center justify-center rounded-control border-2 border-petrol/20 text-small font-semibold text-petrol hover:border-petrol"
                          aria-label={`Remove photo ${i + 1}`}
                        >
                          Remove
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {readyPhotos.length > 0 && (
              <div>
                <label className="flex items-start gap-3 text-body text-deep">
                  <input
                    type="checkbox"
                    name="photo_consent"
                    checked={v.photo_consent}
                    onChange={e => set('photo_consent', e.target.checked)}
                    className="mt-1 h-5 w-5 shrink-0 accent-petrol"
                    aria-invalid={!!err('photo_consent')}
                    aria-describedby={describedBy(err('photo_consent') && 'app-photo_consent-error')}
                  />
                  <span>{PHOTO_CONSENT}</span>
                </label>
                <ErrorText id="app-photo_consent-error">{err('photo_consent')}</ErrorText>
              </div>
            )}

            <div>
              <label className="flex items-start gap-3 text-body text-deep">
                <input type="checkbox" name="roundup_opt_in" checked={v.roundup_opt_in} onChange={e => set('roundup_opt_in', e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-petrol" />
                <span>{ROUNDUP_CONSENT}</span>
              </label>
            </div>
          </>
        )}
      </div>

      {/* Honeypot: hidden from people and screen readers. Bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="app-company_website">Company website</label>
        <input id="app-company_website" name="company_website" tabIndex={-1} autoComplete="off" value={v.company_website} onChange={e => set('company_website', e.target.value)} />
      </div>

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        {step > 0 ? (
          <button type="button" className={BUTTON_SECONDARY} onClick={() => goTo(step - 1)} disabled={sending}>
            Back
          </button>
        ) : (
          <span className="hidden sm:block" />
        )}
        {step < STEPS.length - 1 ? (
          <button type="submit" className={BUTTON_PRIMARY}>
            Next: {STEPS[step + 1]}
          </button>
        ) : (
          <button type="submit" className={BUTTON_PRIMARY} disabled={sending}>
            {sending ? 'Sending…' : 'Submit your business'}
          </button>
        )}
      </div>

      <div role="status" aria-live="polite" className="mt-4 text-small font-semibold text-[#B42318]">
        {status === 'error' && 'That didn’t send. Please try again in a moment, or email hello@masuyodigital.com.'}
        {status === 'limited' && 'You’ve sent a few applications today. Please try again tomorrow.'}
      </div>

      <p id="application-privacy" className="mt-4 text-small text-steel">
        We&apos;ll only use your details to get back to you about your application, unless you tick the round-up box. If you&apos;re approved, only the details shown on your directory page are public.
      </p>
    </form>
  )
}
