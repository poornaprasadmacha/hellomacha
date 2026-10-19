import { NextRequest, NextResponse } from 'next/server'
import {
  fetchArticleBySlug,
  updateArticle,
  deleteArticle,
  isGoogleSheetsConfigured,
} from '@/lib/google-sheets'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!isGoogleSheetsConfigured()) {
    return NextResponse.json({ error: 'Articles service is not configured.' }, { status: 503 })
  }

  const { slug } = await params

  try {
    const article = await fetchArticleBySlug(slug)

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    return NextResponse.json({
      slug: article.slug,
      frontmatter: {
        title: article.title,
        description: article.description,
        date: article.date,
        thumbnail: article.thumbnail,
        author: article.author,
        type: article.type,
      },
      content: article.content,
      reading_time: article.reading_time,
    })
  } catch {
    return NextResponse.json({ error: 'Failed to load article' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!isGoogleSheetsConfigured()) {
    return NextResponse.json({ error: 'Articles service is not configured.' }, { status: 503 })
  }

  try {
    const { slug } = await params
    const body = await request.json()
    const { title, description, date, thumbnail, author, content, type } = body

    const existing = await fetchArticleBySlug(slug)
    if (!existing) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    await updateArticle(slug, {
      title,
      description,
      date,
      thumbnail,
      author,
      type,
      content,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!isGoogleSheetsConfigured()) {
    return NextResponse.json({ error: 'Articles service is not configured.' }, { status: 503 })
  }

  try {
    const { slug } = await params

    const existing = await fetchArticleBySlug(slug)
    if (!existing) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    await deleteArticle(slug)

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 })
  }
}
