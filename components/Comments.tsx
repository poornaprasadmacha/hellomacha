'use client'

import { FormEvent, useCallback, useEffect, useState } from 'react'

interface CommentsProps {
  title?: string
  slug: string
}

interface ArticleComment {
  id: string
  display_name: string
  content: string
  created_at: string
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '')
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const COMMENTS_ENDPOINT = SUPABASE_URL
  ? `${SUPABASE_URL}/rest/v1/article_comments`
  : null

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

function getResponseError(response: Response) {
  return `Comment service error (${response.status}). Please try again later.`
}

export default function Comments({ title, slug }: CommentsProps) {
  const [comments, setComments] = useState<ArticleComment[]>([])
  const [displayName, setDisplayName] = useState('')
  const [content, setContent] = useState('')
  const [website, setWebsite] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loadError, setLoadError] = useState('')
  const [formMessage, setFormMessage] = useState('')

  const isConfigured = Boolean(COMMENTS_ENDPOINT && SUPABASE_ANON_KEY)

  const fetchComments = useCallback(async (): Promise<ArticleComment[]> => {
    if (!COMMENTS_ENDPOINT || !SUPABASE_ANON_KEY) {
      return []
    }

    const query = new URLSearchParams({
      select: 'id,display_name,content,created_at',
      article_slug: `eq.${slug}`,
      status: 'eq.approved',
      order: 'created_at.desc',
    })
    const response = await fetch(`${COMMENTS_ENDPOINT}?${query}`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    })

    if (!response.ok) {
      throw new Error(getResponseError(response))
    }

    const result: unknown = await response.json()
    if (!Array.isArray(result) || !result.every(isArticleComment)) {
      throw new Error('The comment service returned an unexpected response.')
    }

    return result
  }, [slug])

  useEffect(() => {
    let isCurrent = true

    void fetchComments()
      .then((result) => {
        if (isCurrent) {
          setComments(result)
        }
      })
      .catch((error: unknown) => {
        console.error('Unable to load approved article comments.', error)
        if (isCurrent) {
          setLoadError(
            error instanceof Error
              ? error.message
              : 'Comments could not be loaded. Please try again.'
          )
        }
      })
      .finally(() => {
        if (isCurrent) {
          setIsLoading(false)
        }
      })

    return () => {
      isCurrent = false
    }
  }, [fetchComments])

  const retryLoadComments = () => {
    setIsLoading(true)
    setLoadError('')
    void fetchComments()
      .then(setComments)
      .catch((error: unknown) => {
        console.error('Unable to load approved article comments.', error)
        setLoadError(
          error instanceof Error
            ? error.message
            : 'Comments could not be loaded. Please try again.'
        )
      })
      .finally(() => setIsLoading(false))
  }

  const submitComment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormMessage('')

    if (!COMMENTS_ENDPOINT || !SUPABASE_ANON_KEY) {
      setFormMessage('Comments are not configured yet. Please try again later.')
      return
    }

    if (website.trim()) {
      setFormMessage('Please leave the website field empty.')
      return
    }

    const trimmedName = displayName.trim()
    const trimmedContent = content.trim()
    if (!trimmedName || trimmedName.length > 60) {
      setFormMessage('Enter a display name between 1 and 60 characters.')
      return
    }
    if (!trimmedContent || trimmedContent.length > 2000) {
      setFormMessage('Enter a comment between 1 and 2,000 characters.')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch(COMMENTS_ENDPOINT, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          article_slug: slug,
          display_name: trimmedName,
          content: trimmedContent,
        }),
      })

      if (!response.ok) {
        throw new Error(getResponseError(response))
      }

      setDisplayName('')
      setContent('')
      setFormMessage('Thanks for sharing. Your comment will appear after review.')
    } catch (error) {
      console.error('Unable to submit article comment.', error)
      setFormMessage(
        error instanceof Error
          ? error.message
          : 'Your comment could not be submitted. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      className="mx-auto mt-16 w-full max-w-4xl border-t border-gray-200 pt-10"
      aria-labelledby="comments-heading"
    >
      <h2 id="comments-heading" className="mb-3 text-2xl font-bold text-gray-900">
        Comments
      </h2>
      {title ? (
        <p className="mb-8 text-sm text-gray-600">
          Join the discussion about “{title}”.
        </p>
      ) : null}

      <form onSubmit={submitComment} className="mb-10 space-y-5">
        <div>
          <label htmlFor="comment-name" className="mb-2 block text-sm font-semibold text-gray-900">
            Display name
          </label>
          <input
            id="comment-name"
            name="displayName"
            autoComplete="name"
            required
            maxLength={60}
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-red-700 focus:outline-none focus:ring-2 focus:ring-red-700/20"
          />
        </div>

        <div>
          <label htmlFor="comment-content" className="mb-2 block text-sm font-semibold text-gray-900">
            Your comment
          </label>
          <textarea
            id="comment-content"
            name="content"
            required
            rows={5}
            maxLength={2000}
            value={content}
            onChange={(event) => setContent(event.target.value)}
            aria-describedby="comment-guidance"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-red-700 focus:outline-none focus:ring-2 focus:ring-red-700/20"
          />
          <p id="comment-guidance" className="mt-2 text-xs text-gray-500">
            Keep it relevant and respectful. Maximum 2,000 characters.
          </p>
        </div>

        <div
          aria-hidden="true"
          className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden"
        >
          <label htmlFor="comment-website">Leave this field blank</label>
          <input
            id="comment-website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !isConfigured}
          className="rounded-lg bg-[var(--brand-red)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting…' : 'Post comment'}
        </button>

        {formMessage ? (
          <p role="status" className="text-sm text-gray-700">
            {formMessage}
          </p>
        ) : null}
        {!isConfigured ? (
          <p className="text-sm text-amber-800">
            Guest comments are not configured yet. The site owner needs to finish the Supabase setup.
          </p>
        ) : null}
      </form>

      <div aria-live="polite">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          Reader comments ({comments.length})
        </h3>

        {isLoading ? (
          <p className="text-sm text-gray-600">Loading comments…</p>
        ) : loadError ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <p role="alert" className="text-sm text-red-800">{loadError}</p>
            <button
              type="button"
              onClick={retryLoadComments}
              className="mt-3 text-sm font-semibold text-red-800 underline"
            >
              Try again
            </button>
          </div>
        ) : comments.length === 0 ? (
          <p className="text-sm text-gray-600">No approved comments yet. Be the first to join the discussion.</p>
        ) : (
          <ul className="space-y-4">
            {comments.map((comment) => (
              <li key={comment.id} className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-semibold text-gray-900">{comment.display_name}</p>
                  <time
                    dateTime={comment.created_at}
                    className="text-xs text-gray-500"
                  >
                    {new Date(comment.created_at).toLocaleDateString()}
                  </time>
                </div>
                <p className="whitespace-pre-wrap break-words text-sm leading-6 text-gray-700">
                  {comment.content}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
