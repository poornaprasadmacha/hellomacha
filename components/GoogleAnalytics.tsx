'use client'

import { useEffect, useState } from 'react'

const COOKIE_KEY = 'hellomacha-cookie-consent'
const GA_ID = 'G-33PLLZZW52'

export default function GoogleAnalytics() {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY)
    if (consent !== 'accepted') {
      return
    }

    setIsReady(true)

    const scriptId = 'gtag-script'
    if (document.getElementById(scriptId)) {
      return
    }

    const script = document.createElement('script')
    script.id = scriptId
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    document.head.appendChild(script)

    const inlineScript = document.createElement('script')
    inlineScript.id = 'gtag-init'
    inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_ID}', { anonymize_ip: true });
    `
    document.head.appendChild(inlineScript)
  }, [])

  if (!isReady) {
    return null
  }

  return null
}
