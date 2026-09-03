"use client"

import React, { useEffect } from 'react'

interface CommentsProps {
  title?: string
  slug: string
}

export default function Comments({ title, slug }: CommentsProps) {
  const pageTitle = title || ''
  const pageUrl = `https://hellomacha.com/${slug}`

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cusdis.com/js/cusdis.es.js'
    script.async = true
    script.defer = true
    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [slug])

  return (
    <section className="w-full max-w-4xl mx-auto mt-16 pt-10 border-t border-gray-200">
      <h3 className="text-xl font-bold text-gray-900 mb-6 !no-underline">Comments</h3>
      <div
        id="cusdis_thread"
        data-host="https://cusdis.com"
        data-app-id="835a4c8a-32ab-437b-9d9e-7166ec526111"
        data-page-id={slug}
        data-page-url={pageUrl}
        data-page-title={pageTitle}
      />
    </section>
  )
}
