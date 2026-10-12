'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        router.push('/admin/articles')
        router.refresh()
      } else {
        setError(data.error || 'Invalid password')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center">
      <div className="w-full max-w-md bg-[var(--surface)] border border-[var(--line)] rounded-xl p-8">
        <div className="text-center mb-8">
          <h1 className="font-yapa text-2xl font-bold text-[var(--ink)]">HelloMacha Admin</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">Sign in to manage articles</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[var(--ink)] mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-[var(--line)] rounded-lg bg-[var(--surface)] text-[var(--ink)] placeholder-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-red)] focus:border-transparent transition"
              placeholder="Enter admin password"
              required
              autoComplete="current-password"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-[var(--brand-red)] text-white font-medium rounded-lg hover:bg-[var(--brand-red-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-red)] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--muted)]">
          <Link href="/" className="text-[var(--brand-red)] hover:underline">
            ← Back to site
          </Link>
        </p>
      </div>
    </div>
  )
}