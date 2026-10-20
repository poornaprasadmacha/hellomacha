export const runtime = 'edge';

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FiArrowLeft, FiSave } from 'react-icons/fi'

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

const initialFormData: FormData = {
  title: '',
  slug: '',
  description: '',
  date: new Date().toISOString().split('T')[0],
  thumbnail: '',
  author: 'Sivarama Krishna',
  type: 'article',
  content: '',
}

export default function NewArticlePage() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const response = await fetch('/api/admin/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('Article created successfully!')
        setTimeout(() => {
          router.push(`/admin/articles/${data.slug}`)
          router.refresh()
        }, 1000)
      } else {
        setError(data.error || 'Failed to create article')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/articles"
          className="p-2 text-[var(--muted)] hover:text-[var(--brand-red)] hover:bg-[var(--line)] rounded-lg transition"
          title="Back to articles"
        >
          <FiArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="font-yapa text-3xl font-bold text-[var(--ink)]">Create New Article</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">Write and publish a new blog post</p>
        </div>
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
            onChange={(e) => handleTitleChange(e.target.value)}
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
          />
          <p className="mt-1 text-xs text-[var(--muted)]">URL-friendly identifier. Auto-generated from title.</p>
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

Your markdown content here...

## Subheading

- List item 1
- List item 2

**Bold text** and *italic text*

[Link](https://example.com)

![Image](https://example.com/image.jpg)

\`\`\`code
code block
\`\`\`"
            required
            spellCheck={false}
          />
          <p className="mt-1 text-xs text-[var(--muted)]">Supports Markdown and MDX syntax. Frontmatter is handled automatically.</p>
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-[var(--line)]">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--brand-red)] text-white font-medium rounded-lg hover:bg-[var(--brand-red-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-red)] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <FiSave size={18} />
            {loading ? 'Saving...' : 'Create Article'}
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