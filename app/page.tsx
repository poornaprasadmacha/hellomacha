import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Suspense } from 'react'
import type { Metadata } from 'next'
import ArticleClient from './ArticleClient'
import GooeyQuoteLoader from '@/components/GooeyQuoteLoader'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'HelloMacha | Financial Tips & Tech Reviews',
  description:
    'Practical insight for everyday decisions. Actionable guides, clear recommendations, and straightforward reviews to help you decide faster.',
  alternates: {
    canonical: 'https://hellomacha.com/',
  },
  openGraph: {
    title: 'HelloMacha | Financial Tips & Tech Reviews',
    description:
      'Practical insight for everyday decisions. Actionable guides, clear recommendations, and straightforward reviews to help you decide faster.',
    url: 'https://hellomacha.com/',
    siteName: 'HelloMacha',
    type: 'website',
    locale: 'en_IN',
    images: ['https://hellomacha.com/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HelloMacha | Financial Tips & Tech Reviews',
    description:
      'Practical insight for everyday decisions. Actionable guides, clear recommendations, and straightforward reviews to help you decide faster.',
    images: ['https://hellomacha.com/og-image.jpg'],
    site: '@hellomacha',
    creator: '@hellomacha',
  },
  other: {
    'article:published_time': '2026-09-15T00:00:00+05:30',
  },
}

export interface ArticleMeta {
  slug: string
  title: string
  thumbnail: string
  date: string
  description: string
}

function getArticles(): ArticleMeta[] {
  const articlesDirectory = path.join(process.cwd(), 'content/articles')

  if (!fs.existsSync(articlesDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(articlesDirectory)

  const articles = fileNames
    .filter((fileName) => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, '')
      const fullPath = path.join(articlesDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)

      return {
        slug,
        title: data.title || 'Untitled Article',
        thumbnail: data.thumbnail || '/placeholder-image.jpg',
        date: data.date || 'No Date',
        description: data.description || '',
      }
    })

  return articles.sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1))
}

export default function HomePage() {
  // This now runs securely at build-time, safely extracting your articles
  const articles = getArticles()

  return (
    <Suspense fallback={<GooeyQuoteLoader />}>
      <ArticleClient articles={articles} />
    </Suspense>
  )
}