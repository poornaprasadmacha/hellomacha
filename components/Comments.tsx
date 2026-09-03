"use client"

import React from 'react'
import ReactCusdis from 'react-cusdis'

interface CommentsProps {
  title?: string
  slug: string
}

const CusdisComponent = ((ReactCusdis as any).ReactCusdis || (ReactCusdis as any).default || ReactCusdis) as React.ComponentType<any>

export default function Comments({ title, slug }: CommentsProps) {
  const pageTitle = title || ''
  const pageUrl = `https://hellomacha.com/${slug}`

  return (
    <section className="w-full max-w-4xl mx-auto mt-16 pt-10 border-t border-gray-200">
      <h3 className="text-xl font-bold text-gray-900 mb-6 !no-underline">Comments</h3>
      <CusdisComponent
        attrs={{
          host: 'https://cusdis.com',
          appId: '835a4c8a-32ab-437b-9d9e-7166ec526111',
          pageId: slug,
          pageTitle: pageTitle,
          pageUrl: pageUrl,
        }}
      />
    </section>
  )
}
