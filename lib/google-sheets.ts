interface Article {
  slug: string
  title: string
  description: string
  date: string
  thumbnail: string
  author: string
  type: string
  content: string
  reading_time: number
  geo_region?: string
  geo_placename?: string
  geo_position?: string
  seo_keywords?: string[]
  sources?: { name: string; url: string }[]
}

interface ArticleComment {
  id: string
  display_name: string
  content: string
  created_at: string
}

const GOOGLE_SHEETS_WEB_APP_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEB_APP_URL

function isArticle(value: unknown): value is Article {
  if (!value || typeof value !== 'object') {
    return false
  }
  const article = value as Record<string, unknown>
  return (
    typeof article.slug === 'string' &&
    typeof article.title === 'string' &&
    typeof article.description === 'string' &&
    typeof article.date === 'string' &&
    typeof article.author === 'string' &&
    typeof article.type === 'string' &&
    typeof article.content === 'string'
  )
}

function isArticleComment(value: unknown): value is ArticleComment {
  if (!value || typeof value !== 'object') {
    return false
  }
  const comment = value as Record<string, unknown>
  return (
    typeof comment.id === 'string' &&
    typeof comment.display_name === 'string' &&
    typeof comment.content === 'string' &&
    typeof comment.created_at === 'string'
  )
}

export function isGoogleSheetsConfigured(): boolean {
  return Boolean(GOOGLE_SHEETS_WEB_APP_URL)
}

/* ---------- Articles ---------- */

export async function fetchAllArticles(): Promise<Article[]> {
  if (!GOOGLE_SHEETS_WEB_APP_URL) {
    return []
  }

  const response = await fetch(
    `${GOOGLE_SHEETS_WEB_APP_URL}?action=listArticles`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
  )

  if (!response.ok) {
    throw new Error(`Articles service error (${response.status}).`)
  }

  const result: unknown = await response.json()
  if (!Array.isArray(result) || !result.every(isArticle)) {
    throw new Error('The articles service returned an unexpected response.')
  }

  return result
}

export async function fetchArticleBySlug(slug: string): Promise<Article | null> {
  if (!GOOGLE_SHEETS_WEB_APP_URL) {
    return null
  }

  const response = await fetch(
    `${GOOGLE_SHEETS_WEB_APP_URL}?action=getArticle&slug=${encodeURIComponent(slug)}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
  )

  if (!response.ok) {
    if (response.status === 404) {
      return null
    }
    throw new Error(`Articles service error (${response.status}).`)
  }

  const result: unknown = await response.json()
  if (!isArticle(result)) {
    throw new Error('The articles service returned an unexpected response.')
  }

  return result
}

export async function createArticle(article: Omit<Article, 'reading_time'>): Promise<Article> {
  if (!GOOGLE_SHEETS_WEB_APP_URL) {
    throw new Error('Articles service is not configured.')
  }

  const wordCount = article.content ? article.content.trim().split(/\s+/).length : 0
  const readingTime = Math.max(1, Math.ceil(wordCount / 225))

  const response = await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'createArticle',
      ...article,
      reading_time: readingTime,
    }),
  })

  if (!response.ok) {
    throw new Error(`Failed to create article (${response.status}).`)
  }

  const result: unknown = await response.json()
  if (!isArticle(result)) {
    throw new Error('The articles service returned an unexpected response.')
  }

  return result
}

export async function updateArticle(slug: string, article: Partial<Article>): Promise<void> {
  if (!GOOGLE_SHEETS_WEB_APP_URL) {
    throw new Error('Articles service is not configured.')
  }

  const wordCount = article.content ? article.content.trim().split(/\s+/).length : 0
  const readingTime = Math.max(1, Math.ceil(wordCount / 225))

  const response = await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'updateArticle',
      slug,
      ...article,
      reading_time: readingTime,
    }),
  })

  if (!response.ok) {
    throw new Error(`Failed to update article (${response.status}).`)
  }
}

export async function deleteArticle(slug: string): Promise<void> {
  if (!GOOGLE_SHEETS_WEB_APP_URL) {
    throw new Error('Articles service is not configured.')
  }

  const response = await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'deleteArticle', slug }),
  })

  if (!response.ok) {
    throw new Error(`Failed to delete article (${response.status}).`)
  }
}

/* ---------- Comments ---------- */

export async function fetchComments(slug: string): Promise<ArticleComment[]> {
  if (!GOOGLE_SHEETS_WEB_APP_URL) {
    return []
  }

  const response = await fetch(
    `${GOOGLE_SHEETS_WEB_APP_URL}?action=getComments&slug=${encodeURIComponent(slug)}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
  )

  if (!response.ok) {
    throw new Error(`Comments service error (${response.status}).`)
  }

  const result: unknown = await response.json()
  if (!Array.isArray(result) || !result.every(isArticleComment)) {
    throw new Error('The comments service returned an unexpected response.')
  }

  return result
}

export async function submitComment({
  slug,
  displayName,
  content,
}: {
  slug: string
  displayName: string
  content: string
}): Promise<void> {
  if (!GOOGLE_SHEETS_WEB_APP_URL) {
    throw new Error('Comments service is not configured.')
  }

  const response = await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'createComment',
      slug,
      display_name: displayName,
      content,
    }),
  })

  if (!response.ok) {
    throw new Error(`Failed to submit comment (${response.status}).`)
  }
}
