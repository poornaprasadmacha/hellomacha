import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'

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
  const supabase = createSupabaseServerClient()

  const { data, error } = await supabase
    .from('articles')
    .select('slug, title, description, date, thumbnail, author, type')
    .order('date', { ascending: false })

  if (error) {
    return NextResponse.json({ error: 'Failed to load articles' }, { status: 500 })
  }

  const articles: ArticleMeta[] = (data || []).map((article) => ({
    slug: article.slug,
    title: article.title,
    description: article.description,
    date: article.date,
    thumbnail: article.thumbnail,
    author: article.author,
    type: article.type,
    readingTime: Math.max(1, Math.ceil((article.description?.length || 0) / 225)),
  }))

  return NextResponse.json(articles)
}

export async function POST(request: NextRequest) {
  const supabase = createSupabaseServerClient()

  try {
    const { slug, title, description, date, thumbnail, author, content, type } = await request.json()

    if (!slug || !title || !content) {
      return NextResponse.json({ error: 'Slug, title, and content are required' }, { status: 400 })
    }

    const { data: existing } = await supabase
      .from('articles')
      .select('slug')
      .eq('slug', slug)
      .single()

    if (existing) {
      return NextResponse.json({ error: 'Article with this slug already exists' }, { status: 409 })
    }

    const wordCount = content ? content.trim().split(/\s+/).length : 0
    const readingTime = Math.max(1, Math.ceil(wordCount / 225))

    const { data, error } = await supabase
      .from('articles')
      .insert({
        slug,
        title,
        description: description || '',
        content,
        date: date || new Date().toISOString().split('T')[0],
        thumbnail: thumbnail || '/icon.png',
        author: author || 'Sivarama Krishna',
        type: type || 'article',
        reading_time: readingTime,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: 'Failed to create article' }, { status: 500 })
    }

    return NextResponse.json({
      slug: data.slug,
      title: data.title,
      description: data.description,
      date: data.date,
      thumbnail: data.thumbnail,
      author: data.author,
      type: data.type,
      readingTime: data.reading_time,
    })
  } catch {
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 })
  }
}
