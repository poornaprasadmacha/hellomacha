import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { topicBySlug, topics } from '../topicData'

export const dynamic = 'force-static'
export const dynamicParams = false

export function generateStaticParams() {
  return topics.map(({ slug }) => ({ topic: slug }))
}

function getTopicArticles(terms: string[]) {
  const directory = path.join(process.cwd(), 'content/articles')
  if (!fs.existsSync(directory)) return []

  return fs.readdirSync(directory)
    .filter((file) => /\.mdx?$/i.test(file))
    .map((file) => {
      const { data } = matter(fs.readFileSync(path.join(directory, file), 'utf8'))
      const searchable = [
        file,
        data.title,
        data.description,
        ...(Array.isArray(data.seoKeywords) ? data.seoKeywords : []),
      ].join(' ').toLowerCase()
      return {
        slug: file.replace(/\.mdx?$/i, ''),
        title: data.title || file,
        description: data.description || 'Read this practical HelloMacha guide.',
        date: data.date || '',
        matches: terms.some((term) => searchable.includes(term)),
      }
    })
    .filter((article) => article.matches)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }): Promise<Metadata> {
  const { topic } = await params
  const definition = topicBySlug[topic]
  if (!definition) return {}
  return {
    title: `${definition.name} | HelloMacha`,
    description: definition.description,
    keywords: definition.keywords,
    alternates: { canonical: `https://hellomacha.com/topics/${topic}` },
    openGraph: {
      title: `${definition.name} | HelloMacha`,
      description: definition.description,
      url: `https://hellomacha.com/topics/${topic}`,
      siteName: 'HelloMacha',
      type: 'website',
      locale: 'en_IN',
      images: [{ url: 'https://hellomacha.com/og-image.svg', width: 1200, height: 630, alt: `${definition.name} | HelloMacha` }],
    },
  }
}

export default async function TopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params
  const definition = topicBySlug[topic]
  if (!definition) notFound()
  const articles = getTopicArticles(definition.terms)

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-5 sm:py-12">
      <nav className="mb-8 text-xs text-[var(--muted)]" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-[var(--brand-red)]">Home</Link> <span className="px-2">/</span> {definition.name}
      </nav>
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--brand-red)]">HelloMacha topic</p>
      <h1 className="mt-3 font-yapa text-4xl font-normal text-[var(--ink)] sm:text-6xl">{definition.name}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">{definition.description}</p>

      <section className="mt-10">
        <h2 className="mb-5 text-2xl font-bold text-[var(--ink)]">Latest guides</h2>
        {articles.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {articles.map((article) => (
              <article key={article.slug} className="border border-[var(--line)] bg-white p-5">
                <p className="text-xs text-[var(--muted)]">{article.date}</p>
                <h3 className="mt-2 text-xl font-bold text-[var(--ink)]">
                  <Link href={`/${article.slug}`} className="hover:text-[var(--brand-red)]">{article.title}</Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{article.description}</p>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-[var(--muted)]">New guides for this topic are coming soon.</p>
        )}
      </section>
    </main>
  )
}
