import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Metadata } from 'next'
import LearnClient, { ArticleMeta } from './LearnClient'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Learn Hub | HelloMacha - Guides, Finance Tools & Insights',
  description:
    'Master personal finance, strategic wealth building, home buying, and technology with step-by-step guides and interactive tools.',
  alternates: {
    canonical: 'https://hellomacha.com/learn',
  },
  openGraph: {
    title: 'Learn Hub | HelloMacha - Guides, Finance Tools & Insights',
    description:
      'Master personal finance, strategic wealth building, home buying, and technology with step-by-step guides and interactive tools.',
    url: 'https://hellomacha.com/learn',
    siteName: 'HelloMacha',
    type: 'website',
  },
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
        title: data.title || 'Untitled Guide',
        thumbnail: data.thumbnail || '/placeholder-image.jpg',
        date: data.date || 'No Date',
        description: data.description || '',
      }
    })

  return articles.sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1))
}

export default function LearnPage() {
  const articles = getArticles()
  return <LearnClient articles={articles} />
}
