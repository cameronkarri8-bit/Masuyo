'use client'

import { useEffect, useState } from 'react'

/**
 * Copies a value to the clipboard and confirms with "Copied" for a moment.
 * The confirmation is announced to screen readers.
 */
export default function CopyButton({ value, label, dark = false }: { value: string; label: string; dark?: boolean }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 1800)
    return () => clearTimeout(t)
  }, [copied])

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      // Older browsers: fall back to a hidden textarea.
      const el = document.createElement('textarea')
      el.value = value
      el.setAttribute('readonly', '')
      el.style.position = 'absolute'
      el.style.left = '-9999px'
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setCopied(true)
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? `${label}: copied` : label}
      className={`inline-flex min-h-[2.5rem] items-center gap-2 rounded-full px-4 text-small ring-2 ring-inset transition-colors ${
        dark ? 'text-paper ring-paper/50 hover:ring-paper' : 'text-petrol ring-petrol/30 hover:ring-petrol'
      }`}
    >
      <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden="true">
        {copied ? (
          <path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <>
            <rect x="5" y="5" width="8.5" height="8.5" rx="2" stroke="currentColor" strokeWidth="1.6" />
            <path d="M10.5 5V3.8A1.3 1.3 0 0 0 9.2 2.5H3.8a1.3 1.3 0 0 0-1.3 1.3v5.4a1.3 1.3 0 0 0 1.3 1.3H5" stroke="currentColor" strokeWidth="1.6" />
          </>
        )}
      </svg>
      <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
    </button>
  )
}
