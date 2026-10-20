import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { isAuthenticated } from '@/lib/admin-auth'

const articlesDir = path.join(process.cwd(), 'content', 'articles')

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

function getArticles(): ArticleMeta[] {
  if (!fs.existsSync(articlesDir)) {
    return []
  }

  const fileNames = fs.readdirSync(articlesDir)

  const articles = fileNames
    .filter((fileName) => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, '')
      const fullPath = path.join(articlesDir, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      const wordCount = content ? content.trim().split(/\s+/).length : 0
      const readingTime = Math.max(1, Math.ceil(wordCount / 225))

      return {
        slug,
        title: data.title || 'Untitled Article',
        description: data.description || '',
        date: data.date || 'No Date',
        thumbnail: data.thumbnail || '/icon.png',
        author: data.author || 'Sivarama Krishna',
        type: data.type || 'article',
        readingTime,
      }
    })

  return articles.sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1))
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const articles = getArticles()
  return NextResponse.json(articles)
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { slug, title, description, date, thumbnail, author, content, type } = await request.json()

    if (!slug || !title || !content) {
      return NextResponse.json({ error: 'Slug, title, and content are required' }, { status: 400 })
    }

    const filePath = path.join(articlesDir, `${slug}.mdx`)

    if (fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Article with this slug already exists' }, { status: 409 })
    }

    const frontmatter = {
      title,
      description: description || '',
      date: date || new Date().toISOString().split('T')[0],
      thumbnail: thumbnail || '/icon.png',
      author: author || 'Sivarama Krishna',
      type: type || 'article',
    }

    const mdxContent = matter.stringify(content, frontmatter)

    if (!fs.existsSync(articlesDir)) {
      fs.mkdirSync(articlesDir, { recursive: true })
    }

    fs.writeFileSync(filePath, mdxContent, 'utf8')

    const wordCount = content ? content.trim().split(/\s+/).length : 0
    const readingTime = Math.max(1, Math.ceil(wordCount / 225))

    return NextResponse.json({
      slug,
      title,
      description: frontmatter.description,
      date: frontmatter.date,
      thumbnail: frontmatter.thumbnail,
      author: frontmatter.author,
      type: frontmatter.type,
      readingTime,
    })
  } catch {
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 })
  }
}
