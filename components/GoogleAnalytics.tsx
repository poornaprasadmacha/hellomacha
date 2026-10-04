'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

const COOKIE_KEY = 'hellomacha-cookie-consent'
const CONSENT_EVENT = 'hellomacha:cookie-consent'
const GA_ID = 'G-33PLLZZW52'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export default function GoogleAnalytics() {
  const pathname = usePathname()
  const previousPathname = useRef<string | null>(null)

  useEffect(() => {
    const initializeAnalytics = () => {
      if (localStorage.getItem(COOKIE_KEY) !== 'accepted') {
        return
      }

      if (document.getElementById('gtag-script')) {
        return
      }

      const inlineScript = document.createElement('script')
      inlineScript.id = 'gtag-init'
      inlineScript.textContent = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_ID}', { anonymize_ip: true });
      `
      document.head.appendChild(inlineScript)

      const script = document.createElement('script')
      script.id = 'gtag-script'
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
      document.head.appendChild(script)
    }

    window.addEventListener(CONSENT_EVENT, initializeAnalytics)
    initializeAnalytics()
    return () => window.removeEventListener(CONSENT_EVENT, initializeAnalytics)
  }, [])

  useEffect(() => {
    const previousPath = previousPathname.current
    previousPathname.current = pathname

    if (
      previousPath === null ||
      previousPath === pathname ||
      localStorage.getItem(COOKIE_KEY) !== 'accepted' ||
      !window.gtag
    ) {
      return
    }

    window.gtag('event', 'page_view', {
      page_path: pathname,
      page_location: `${window.location.origin}${pathname}`,
      page_title: document.title,
    })
  }, [pathname])

  return null
}
