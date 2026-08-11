import fs from 'fs'
import path from 'path'
import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hellomacha.com'

  // 1. Get all articles
  const articlesDir = path.join(process.cwd(), 'content/articles')
  let articles: MetadataRoute.Sitemap = []
  
  if (fs.existsSync(articlesDir)) {
    const fileNames = fs.readdirSync(articlesDir)
    articles = fileNames
      .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
      .map((file) => ({
        url: `${baseUrl}/articles/${file.replace(/\.mdx?$/, '')}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      }))
  }

  // 2. Get all standalone pages (About, Terms, etc.)
  const pagesDir = path.join(process.cwd(), 'content/pages')
  let pages: MetadataRoute.Sitemap = []
  
  if (fs.existsSync(pagesDir)) {
    const fileNames = fs.readdirSync(pagesDir)
    pages = fileNames
      .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
      .map((file) => ({
        url: `${baseUrl}/${file.replace(/\.mdx?$/, '')}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      }))
  }

  // 3. Return the complete sitemap array
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...pages,
    ...articles,
  ]
}