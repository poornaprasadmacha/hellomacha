'use client'

import { useEffect, useState } from 'react'

const COOKIE_KEY = 'hellomacha-cookie-consent'

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsMounted(true)
      const consent = localStorage.getItem(COOKIE_KEY)
      if (!consent) setIsVisible(true)
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  const saveConsent = (value: 'accepted' | 'rejected') => {
    localStorage.setItem(COOKIE_KEY, value)
    setIsVisible(false)
  }

  if (!isMounted || !isVisible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-[var(--line)] bg-white/95 p-4 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl text-sm text-[var(--ink)]">
          <p className="font-semibold">Cookie preferences</p>
          <p className="mt-1 text-[var(--muted)]">
            We use cookies to improve site experience, measure traffic, and support advertising. You can accept or reject non-essential cookies.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => saveConsent('rejected')}
            className="rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium text-[var(--ink)] transition hover:bg-gray-50"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => saveConsent('accepted')}
            className="rounded-full bg-[var(--brand-red)] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
