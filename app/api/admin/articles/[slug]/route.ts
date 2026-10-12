import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { isAuthenticated } from '@/lib/admin-auth'

const articlesDir = path.join(process.cwd(), 'content', 'articles')

interface ArticleData {
  slug: string
  frontmatter: Record<string, unknown>
  content: string
}

function readArticle(slug: string): ArticleData | null {
  const mdxPath = path.join(articlesDir, `${slug}.mdx`)
  const mdPath = path.join(articlesDir, `${slug}.md`)

  let filePath: string | null = null

  if (fs.existsSync(mdxPath)) {
    filePath = mdxPath
  } else if (fs.existsSync(mdPath)) {
    filePath = mdPath
  }

  if (!filePath) {
    return null
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    frontmatter: data,
    content,
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { slug } = await params
  const article = readArticle(slug)

  if (!article) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 })
  }

  return NextResponse.json(article)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { slug } = await params
    const { title, description, date, thumbnail, author, content, type } = await request.json()

    const mdxPath = path.join(articlesDir, `${slug}.mdx`)
    const mdPath = path.join(articlesDir, `${slug}.md`)

    let filePath: string | null = null

    if (fs.existsSync(mdxPath)) {
      filePath = mdxPath
    } else if (fs.existsSync(mdPath)) {
      filePath = mdPath
    }

    if (!filePath) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContents)

    const frontmatter = {
      ...data,
      title: title || data.title,
      description: description !== undefined ? description : data.description,
      date: date || data.date,
      thumbnail: thumbnail !== undefined ? thumbnail : data.thumbnail,
      author: author || data.author,
      type: type || data.type || 'article',
    }

    const mdxContent = matter.stringify(content || '', frontmatter)
    fs.writeFileSync(filePath, mdxContent, 'utf8')

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { slug } = await params
    const mdxPath = path.join(articlesDir, `${slug}.mdx`)
    const mdPath = path.join(articlesDir, `${slug}.md`)

    let filePath: string | null = null

    if (fs.existsSync(mdxPath)) {
      filePath = mdxPath
    } else if (fs.existsSync(mdPath)) {
      filePath = mdPath
    }

    if (!filePath) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    fs.unlinkSync(filePath)

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 })
  }
}