"use client"

import React, { useState } from 'react'

interface ShareButtonsProps {
  title?: string
  url?: string
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const getShareUrl = () => {
    if (url) return url
    if (typeof window !== 'undefined') return window.location.href
    return ''
  }

  const getShareTitle = () => {
    if (title) return title
    if (typeof document !== 'undefined') return document.title
    return ''
  }

  const handleNativeShare = async () => {
    const shareUrl = getShareUrl()
    const shareTitle = getShareTitle()

    if (typeof navigator !== 'undefined' && (navigator as any).share) {
      try {
        await (navigator as any).share({
          title: shareTitle,
          url: shareUrl,
        })
        return
      } catch (e) {
        // User cancelled or share failed, fallback to copy link
      }
    }
    handleCopyLink()
  }

  const handleCopyLink = async () => {
    const shareUrl = getShareUrl()
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch (e) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const handleWhatsAppShare = () => {
    const shareUrl = encodeURIComponent(getShareUrl())
    const shareTitle = encodeURIComponent(getShareTitle())
    window.open(`https://api.whatsapp.com/send?text=${shareTitle}%20${shareUrl}`, '_blank')
  }

  const handleXShare = () => {
    const shareUrl = encodeURIComponent(getShareUrl())
    const shareTitle = encodeURIComponent(getShareTitle())
    window.open(`https://x.com/intent/post?text=${shareTitle}&url=${shareUrl}`, '_blank')
  }

  const handleFacebookShare = () => {
    const shareUrl = encodeURIComponent(getShareUrl())
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank')
  }

  const handleMailShare = () => {
    const shareUrl = encodeURIComponent(getShareUrl())
    const shareTitle = encodeURIComponent(getShareTitle())
    window.location.href = `mailto:?subject=${shareTitle}&body=${shareTitle}%0A%0A${shareUrl}`
  }

  const handleInstagramShare = () => {
    handleCopyLink()
    window.open('https://www.instagram.com', '_blank')
  }

  return (
    <div className="my-4 flex items-center justify-start gap-2.5">
      {/* Share / Copy Link Icon */}
      <button
        type="button"
        onClick={handleNativeShare}
        className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 shadow-sm transition-all hover:border-gray-900 hover:bg-gray-900 hover:text-white active:scale-95"
        title={copied ? "Link Copied!" : "Share / Copy Link"}
        aria-label="Share article"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        {copied && (
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-gray-900 px-2 py-0.5 text-[10px] font-bold text-white shadow whitespace-nowrap">
            Copied!
          </span>
        )}
      </button>

      {/* WhatsApp Icon */}
      <button
        type="button"
        onClick={handleWhatsAppShare}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-emerald-500 bg-emerald-600 text-white shadow-sm transition-all hover:bg-emerald-700 active:scale-95"
        title="Share on WhatsApp"
        aria-label="Share on WhatsApp"
      >
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.554 4.11 1.524 5.845L.055 23.54l5.856-1.503C7.579 22.951 9.71 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.954 0-3.816-.54-5.429-1.501l-.389-.233-3.48.893.92-3.393-.255-.407A9.957 9.957 0 012 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/>
        </svg>
      </button>

      {/* Instagram Icon */}
      <button
        type="button"
        onClick={handleInstagramShare}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-pink-500 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white shadow-sm transition-all hover:opacity-90 active:scale-95"
        title="Share on Instagram"
        aria-label="Share on Instagram"
      >
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      </button>

      {/* X (Twitter) Icon */}
      <button
        type="button"
        onClick={handleXShare}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-900 bg-gray-900 text-white shadow-sm transition-all hover:bg-black active:scale-95"
        title="Share on X"
        aria-label="Share on X"
      >
        <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </button>

      {/* Facebook Icon */}
      <button
        type="button"
        onClick={handleFacebookShare}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-blue-600 bg-blue-600 text-white shadow-sm transition-all hover:bg-blue-700 active:scale-95"
        title="Share on Facebook"
        aria-label="Share on Facebook"
      >
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </button>

      {/* Mail Icon */}
      <button
        type="button"
        onClick={handleMailShare}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-red-600 bg-red-600 text-white shadow-sm transition-all hover:bg-red-700 active:scale-95"
        title="Share via Mail"
        aria-label="Share via Mail"
      >
        <svg className="h-4 w-4 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </button>
    </div>
  )
}
