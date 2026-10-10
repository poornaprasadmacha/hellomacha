import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Metadata } from 'next'
import ArticleClient from './ArticleClient'
import Link from 'next/link'
import { FiShield, FiBookOpen, FiUsers, FiSearch } from 'react-icons/fi'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'HelloMacha | Financial Tips & Tech Reviews',
  description:
    'Practical insight for everyday decisions. Actionable guides, clear recommendations, and straightforward reviews to help you decide faster.',
  alternates: {
    canonical: 'https://hellomacha.com/',
  },
  openGraph: {
    title: 'HelloMacha | Financial Tips & Tech Reviews',
    description:
      'Practical insight for everyday decisions. Actionable guides, clear recommendations, and straightforward reviews to help you decide faster.',
    url: 'https://hellomacha.com/',
    siteName: 'HelloMacha',
    type: 'website',
    locale: 'en_IN',
    images: [{ url: 'https://hellomacha.com/og-image.svg', width: 1200, height: 630, alt: 'HelloMacha practical guides and financial tools' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HelloMacha | Financial Tips & Tech Reviews',
    description:
      'Practical insight for everyday decisions. Actionable guides, clear recommendations, and straightforward reviews to help you decide faster.',
    images: [{ url: 'https://hellomacha.com/og-image.svg', width: 1200, height: 630, alt: 'HelloMacha practical guides and financial tools' }],
    site: '@hellomacha',
    creator: '@hellomacha',
  },
}

export interface ArticleMeta {
  slug: string
  title: string
  thumbnail: string
  date: string
  description: string
  readingTime?: number
}

function getArticles(): ArticleMeta[] {
  const articlesDirectory = path.join(process.cwd(), 'content/articles')

  if (!fs.existsSync(articlesDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(articlesDirectory)

  const articles = fileNames
    .filter((fileName) => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, '')
      const fullPath = path.join(articlesDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      const wordCount = content ? content.trim().split(/\s+/).length : 0
      const readingTime = Math.max(1, Math.ceil(wordCount / 225))

      return {
        slug,
        title: data.title || 'Untitled Article',
        thumbnail: data.thumbnail || '/icon.png',
        date: data.date || 'No Date',
        description: data.description || '',
        readingTime,
      }
    })

  return articles.sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1))
}

export default function HomePage() {
  // This now runs securely at build-time, safely extracting your articles
  const articles = getArticles()

  return (
    <div className="pb-16">
      <ArticleClient articles={articles} />
      <section className="mt-12 border-t border-[var(--line)] pt-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-5">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--brand-red)]">HelloMacha</p>
          <h2 className="mt-3 font-yapa text-3xl font-normal text-[var(--ink)] sm:text-4xl">Why HelloMacha</h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
            We exist to help Indian households make better financial and purchase decisions with confidence.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <article className="border border-[var(--line)] bg-white p-6">
              <FiShield className="text-[var(--brand-red)]" size={24} />
              <h3 className="mt-4 text-lg font-bold text-[var(--ink)]">Evidence-first editorial</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                Every guide cites primary sources — RBI circulars, SEBI regulations, Income Tax Act, government gazettes, manufacturer specifications. We link to official documents so you can verify.
              </p>
            </article>
            <article className="border border-[var(--line)] bg-white p-6">
              <FiBookOpen className="text-[var(--brand-red)]" size={24} />
              <h3 className="mt-4 text-lg font-bold text-[var(--ink)]">Practical, not theoretical</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                We focus on actionable steps: which form to fill, which portal to use, what documents to keep, how to compare products. No jargon without explanation. No advice without context.
              </p>
            </article>
            <article className="border border-[var(--line)] bg-white p-6">
              <FiUsers className="text-[var(--brand-red)]" size={24} />
              <h3 className="mt-4 text-lg font-bold text-[var(--ink)]">Built for Indian realities</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                Tax slabs, EPF rules, mutual fund taxation, government schemes, home loan math — all specific to India. We update when rules, rates, or prices change.
              </p>
            </article>
          </div>
          <div className="mt-8 rounded-xl border border-[var(--line)] bg-white p-6">
            <h3 className="text-lg font-bold text-[var(--ink)]">Our editorial approach</h3>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[var(--muted)]">
              <li className="flex items-start gap-2"><span className="text-[var(--brand-red)]">→</span> Primary sources over secondary summaries</li>
              <li className="flex items-start gap-2"><span className="text-[var(--brand-red)]">→</span> Assumptions and estimates labeled explicitly</li>
              <li className="flex items-start gap-2"><span className="text-[var(--brand-red)]">→</span> No affiliate links, no sponsored content, no hidden agendas</li>
              <li className="flex items-start gap-2"><span className="text-[var(--brand-red)]">→</span> Corrections published promptly when facts change</li>
            </ul>
            <Link href="/editorial-policy" className="mt-4 inline-block text-sm font-semibold text-[var(--brand-red)] hover:underline">
              Read our full editorial policy
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}