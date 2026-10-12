'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiPlus, FiEdit, FiTrash2, FiLoader } from 'react-icons/fi'

interface Article {
  slug: string
  title: string
  description: string
  date: string
  thumbnail: string
  author: string
  type: string
  readingTime: number
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    async function loadArticles() {
      try {
        const response = await fetch('/api/admin/articles')
        if (response.ok && mounted) {
          const data = await response.json()
          setArticles(data)
        }
      } catch {
        console.error('Failed to fetch articles')
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadArticles()

    return () => {
      mounted = false
    }
  }, [])

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return

    setDeletingSlug(slug)
    try {
      const response = await fetch(`/api/admin/articles/${slug}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        setArticles((prev) => prev.filter((a) => a.slug !== slug))
      } else {
        alert('Failed to delete article')
      }
    } catch {
      alert('Failed to delete article')
    } finally {
      setDeletingSlug(null)
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return dateStr
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-yapa text-3xl font-bold text-[var(--ink)]">Articles</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">Manage your blog posts</p>
        </div>
        <Link
          href="/admin/articles/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--brand-red)] text-white font-medium rounded-lg hover:bg-[var(--brand-red-dark)] transition"
        >
          <FiPlus size={18} />
          Create New Article
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <FiLoader className="h-8 w-8 text-[var(--brand-red)] animate-spin" />
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-[var(--muted)]">No articles yet.</p>
          <Link
            href="/admin/articles/new"
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[var(--brand-red)] text-white font-medium rounded-lg hover:bg-[var(--brand-red-dark)] transition"
          >
            <FiPlus size={18} />
            Create your first article
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[var(--line)]">
                <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--ink)]">Title</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--ink)]">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--ink)]">Slug</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--ink)]">Type</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--ink)]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.slug} className="border-b border-[var(--line)] hover:bg-[var(--page)] transition">
                  <td className="py-4 px-4">
                    <div className="font-medium text-[var(--ink)]">{article.title}</div>
                    <div className="text-sm text-[var(--muted)] truncate max-w-xs">{article.description}</div>
                  </td>
                  <td className="py-4 px-4 text-sm text-[var(--muted)]">{formatDate(article.date)}</td>
                  <td className="py-4 px-4 text-sm font-mono text-[var(--muted)]">{article.slug}</td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--line)] text-[var(--ink)]">
                      {article.type}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/articles/${article.slug}`}
                        className="p-2 text-[var(--muted)] hover:text-[var(--brand-red)] hover:bg-[var(--line)] rounded-lg transition"
                        title="Edit"
                      >
                        <FiEdit size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(article.slug)}
                        disabled={deletingSlug === article.slug}
                        className="p-2 text-[var(--muted)] hover:text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                        title="Delete"
                      >
                        {deletingSlug === article.slug ? <FiLoader className="h-4 w-4 animate-spin" /> : <FiTrash2 size={18} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}