"use client"
import React from 'react'
import { FiShare2, FiMail, FiTwitter, FiFacebook } from 'react-icons/fi'

export default function ShareButtons() {
  const onNativeShare = async () => {
    if (typeof navigator !== 'undefined' && (navigator as any).share) {
      try {
        await (navigator as any).share({
          title: document.title,
          url: window.location.href,
        })
      } catch (e) {
        // ignore
      }
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(window.location.href)
        alert('Link copied to clipboard')
      } catch (e) {
        // fallback
        alert('Copy this URL: ' + window.location.href)
      }
    }
  }

  const openShare = (service: 'twitter' | 'facebook' | 'mail') => {
    if (typeof window === 'undefined') return
    const url = encodeURIComponent(window.location.href)
    const title = encodeURIComponent(document.title)

    if (service === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${title}&url=${url}`, '_blank')
    } else if (service === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
    } else {
      window.location.href = `mailto:?subject=${title}&body=${title}%0A%0A${url}`
    }
  }

  return (
    <div className="flex items-center gap-3">
      <button aria-label="Share" onClick={onNativeShare} className="flex items-center gap-2 text-[var(--muted)]">
        <FiShare2 />
      </button>
      <button aria-label="Share on Twitter" onClick={() => openShare('twitter')} className="text-[var(--muted)]">
        <FiTwitter />
      </button>
      <button aria-label="Share on Facebook" onClick={() => openShare('facebook')} className="text-[var(--muted)]">
        <FiFacebook />
      </button>
      <button aria-label="Share by Email" onClick={() => openShare('mail')} className="text-[var(--muted)]">
        <FiMail />
      </button>
    </div>
  )
}
