export const runtime = 'edge';

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FiArrowLeft, FiLoader, FiSave, FiTrash2 } from 'react-icons/fi'

interface Article {
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
}

interface FormData {
  title: string
  slug: string
  description: string
  date: string
  thumbnail: string
  author: string
  type: string
  content: string
}

export default function EditArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const router = useRouter()
  const [article, setArticle] = useState<Article | null>(null)
  const [formData, setFormData] = useState<FormData>({
    title: '',
    slug: '',
    description: '',
    date: '',
    thumbnail: '',
    author: '',
    type: '',
    content: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const fetchArticle = async () => {
      const { slug } = await params
      try {
        const response = await fetch(`/api/admin/articles/${slug}`)
        if (response.ok) {
          const data = await response.json()
          setArticle(data)
          setFormData({
            title: data.frontmatter.title || '',
            slug: data.slug,
            description: data.frontmatter.description || '',
            date: data.frontmatter.date || new Date().toISOString().split('T')[0],
            thumbnail: data.frontmatter.thumbnail || '',
            author: data.frontmatter.author || 'Sivarama Krishna',
            type: data.frontmatter.type || 'article',
            content: data.content || '',
          })
        } else {
          setError('Article not found')
        }
      } catch {
        setError('Failed to load article')
      } finally {
        setLoading(false)
      }
    }
    fetchArticle()
  }, [params])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setSaving(true)

    try {
      const { slug } = await params
      const response = await fetch(`/api/admin/articles/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('Article updated successfully!')
        const updatedArticle = await fetch(`/api/admin/articles/${slug}`).then(r => r.json())
        setArticle(updatedArticle)
      } else {
        setError(data.error || 'Failed to update article')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this article? This cannot be undone.')) return

    setDeleting(true)
    try {
      const { slug } = await params
      const response = await fetch(`/api/admin/articles/${slug}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        router.push('/admin/articles')
        router.refresh()
      } else {
        alert('Failed to delete article')
      }
    } catch {
      alert('Failed to delete article')
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <FiLoader className="h-8 w-8 text-[var(--brand-red)] animate-spin" />
      </div>
    )
  }

  if (error && !article) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
        <Link
          href="/admin/articles"
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[var(--brand-red)] text-white font-medium rounded-lg hover:bg-[var(--brand-red-dark)] transition"
        >
          <FiArrowLeft size={18} />
          Back to articles
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/articles"
            className="p-2 text-[var(--muted)] hover:text-[var(--brand-red)] hover:bg-[var(--line)] rounded-lg transition"
            title="Back to articles"
          >
            <FiArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="font-yapa text-3xl font-bold text-[var(--ink)]">Edit Article</h1>
            <p className="mt-1 text-sm text-[var(--muted)]">{article?.slug}</p>
          </div>
        </div>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
          title="Delete article"
        >
          {deleting ? <FiLoader className="h-5 w-5 animate-spin" /> : <FiTrash2 size={20} />}
        </button>
      </div>

      {error && (
        <div className="mb-6 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg p-3">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-[var(--ink)] mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
            className="w-full px-4 py-3 border border-[var(--line)] rounded-lg bg-[var(--surface)] text-[var(--ink)] placeholder-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-red)] focus:border-transparent transition"
            placeholder="Enter article title"
            required
          />
        </div>

        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-[var(--ink)] mb-2">
            Slug <span className="text-red-500">*</span>
          </label>
          <input
            id="slug"
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
            className="w-full px-4 py-3 border border-[var(--line)] rounded-lg bg-[var(--surface)] text-[var(--ink)] placeholder-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-red)] focus:border-transparent transition font-mono"
            placeholder="article-slug"
            required
            readOnly
          />
          <p className="mt-1 text-xs text-[var(--muted)]">Slug cannot be changed after creation.</p>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-[var(--ink)] mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            rows={3}
            className="w-full px-4 py-3 border border-[var(--line)] rounded-lg bg-[var(--surface)] text-[var(--ink)] placeholder-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-red)] focus:border-transparent transition resize-y"
            placeholder="Brief description for SEO and previews"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-[var(--ink)] mb-2">
              Date
            </label>
            <input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
              className="w-full px-4 py-3 border border-[var(--line)] rounded-lg bg-[var(--surface)] text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-red)] focus:border-transparent transition"
            />
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-[var(--ink)] mb-2">
              Type
            </label>
            <select
              id="type"
              value={formData.type}
              onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value }))}
              className="w-full px-4 py-3 border border-[var(--line)] rounded-lg bg-[var(--surface)] text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-red)] focus:border-transparent transition"
            >
              <option value="article">Article</option>
              <option value="page">Page</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-[var(--ink)] mb-2">
              Author
            </label>
            <input
              id="author"
              type="text"
              value={formData.author}
              onChange={(e) => setFormData((prev) => ({ ...prev, author: e.target.value }))}
              className="w-full px-4 py-3 border border-[var(--line)] rounded-lg bg-[var(--surface)] text-[var(--ink)] placeholder-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-red)] focus:border-transparent transition"
              placeholder="Author name"
            />
          </div>

          <div>
            <label htmlFor="thumbnail" className="block text-sm font-medium text-[var(--ink)] mb-2">
              Thumbnail URL
            </label>
            <input
              id="thumbnail"
              type="url"
              value={formData.thumbnail}
              onChange={(e) => setFormData((prev) => ({ ...prev, thumbnail: e.target.value }))}
              className="w-full px-4 py-3 border border-[var(--line)] rounded-lg bg-[var(--surface)] text-[var(--ink)] placeholder-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-red)] focus:border-transparent transition"
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-[var(--ink)] mb-2">
            Content (Markdown/MDX) <span className="text-red-500">*</span>
          </label>
          <textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
            rows={25}
            className="w-full px-4 py-3 border border-[var(--line)] rounded-lg bg-[var(--surface)] text-[var(--ink)] placeholder-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-red)] focus:border-transparent transition resize-y font-mono text-sm"
            placeholder="# Heading

Your markdown content here..."
            required
            spellCheck={false}
          />
          <p className="mt-1 text-xs text-[var(--muted)]">Supports Markdown and MDX syntax. Frontmatter is handled automatically.</p>
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-[var(--line)]">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--brand-red)] text-white font-medium rounded-lg hover:bg-[var(--brand-red-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-red)] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <FiSave size={18} />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <Link
            href="/admin/articles"
            className="px-6 py-3 text-sm font-medium text-[var(--muted)] hover:text-[var(--brand-red)] transition"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
