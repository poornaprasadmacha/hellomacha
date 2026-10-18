import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'

interface ArticleData {
  slug: string
  frontmatter: {
    title: string
    description: string
    date: string
    thumbnail: string
    author: string
    type: string
  }
  content: string
  reading_time: number
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const supabase = createSupabaseServerClient()

  const { slug } = await params

  const { data, error } = await supabase
    .from('articles')
    .select('slug, title, description, date, thumbnail, author, type, content, reading_time')
    .eq('slug', slug)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 })
  }

  const article: ArticleData = {
    slug: data.slug,
    frontmatter: {
      title: data.title,
      description: data.description,
      date: data.date,
      thumbnail: data.thumbnail,
      author: data.author,
      type: data.type,
    },
    content: data.content,
    reading_time: data.reading_time,
  }

  return NextResponse.json(article)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const supabase = createSupabaseServerClient()

  try {
    const { slug } = await params
    const { title, description, date, thumbnail, author, content, type } = await request.json()

    const { data: existing } = await supabase
      .from('articles')
      .select('slug')
      .eq('slug', slug)
      .single()

    if (!existing) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    const wordCount = content ? content.trim().split(/\s+/).length : 0
    const readingTime = Math.max(1, Math.ceil(wordCount / 225))

    const { error } = await supabase
      .from('articles')
      .update({
        title: title || undefined,
        description: description !== undefined ? description : undefined,
        date: date || undefined,
        thumbnail: thumbnail !== undefined ? thumbnail : undefined,
        author: author || undefined,
        type: type || undefined,
        content: content !== undefined ? content : undefined,
        reading_time: readingTime,
      })
      .eq('slug', slug)

    if (error) {
      return NextResponse.json({ error: 'Failed to update article' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const supabase = createSupabaseServerClient()

  try {
    const { slug } = await params

    const { data: existing } = await supabase
      .from('articles')
      .select('slug')
      .eq('slug', slug)
      .single()

    if (!existing) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    const { error } = await supabase.from('articles').delete().eq('slug', slug)

    if (error) {
      return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 })
  }
}
