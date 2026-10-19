import { NextRequest, NextResponse } from 'next/server'
import {
  fetchAllArticles,
  createArticle,
  isGoogleSheetsConfigured,
} from '@/lib/google-sheets'

interface ArticleMeta {
  slug: string
  title: string
  description: string
  date: string
  thumbnail: string
  author: string
  type: string
  readingTime: number
}

export async function GET() {
  if (!isGoogleSheetsConfigured()) {
    return NextResponse.json({ error: 'Articles service is not configured.' }, { status: 503 })
  }

  try {
    const articles = await fetchAllArticles()

    const meta: ArticleMeta[] = articles.map((article) => ({
      slug: article.slug,
      title: article.title,
      description: article.description,
      date: article.date,
      thumbnail: article.thumbnail,
      author: article.author,
      type: article.type,
      readingTime: article.reading_time,
    }))

    return NextResponse.json(meta)
  } catch {
    return NextResponse.json({ error: 'Failed to load articles' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (!isGoogleSheetsConfigured()) {
    return NextResponse.json({ error: 'Articles service is not configured.' }, { status: 503 })
  }

  try {
    const body = await request.json()
    const { slug, title, description, date, thumbnail, author, content, type } = body

    if (!slug || !title || !content) {
      return NextResponse.json({ error: 'Slug, title, and content are required' }, { status: 400 })
    }

    const article = await createArticle({
      slug,
      title,
      description: description || '',
      date: date || new Date().toISOString().split('T')[0],
      thumbnail: thumbnail || '/icon.png',
      author: author || 'Sivarama Krishna',
      type: type || 'article',
      content,
    })

    return NextResponse.json({
      slug: article.slug,
      title: article.title,
      description: article.description,
      date: article.date,
      thumbnail: article.thumbnail,
      author: article.author,
      type: article.type,
      readingTime: article.reading_time,
    })
  } catch {
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 })
  }
}
