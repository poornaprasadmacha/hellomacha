import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Suspense } from 'react'
import ArticleClient from './ArticleClient'

export const dynamic = 'force-static'

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
    <Suspense fallback={<div className="min-h-[60vh] py-8 text-center text-[var(--muted)]">Loading guides...</div>}>
      <ArticleClient articles={articles} />
    </Suspense>
  )
}