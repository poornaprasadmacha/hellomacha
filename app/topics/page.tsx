import type { Metadata } from 'next'
import Link from 'next/link'
import { topics } from './topicData'

export const metadata: Metadata = {
  title: 'Finance Topics | HelloMacha',
  description: 'Explore HelloMacha finance topics including personal finance, mutual funds, retirement, loans, tax, and government schemes.',
  alternates: { canonical: 'https://hellomacha.com/topics' },
}

export default function TopicsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-5 sm:py-12">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--brand-red)]">HelloMacha finance library</p>
      <h1 className="mt-3 font-yapa text-4xl font-normal text-[var(--ink)] sm:text-6xl">Finance Topics</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">Browse focused guides and explanations by the decision you are trying to make.</p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <Link key={topic.slug} href={`/topics/${topic.slug}`} className="border border-[var(--line)] bg-white p-6 transition hover:border-[var(--brand-red)]">
            <h2 className="text-xl font-bold text-[var(--ink)]">{topic.name}</h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{topic.description}</p>
            <span className="mt-5 inline-block text-sm font-semibold text-[var(--brand-red)]">Browse guides</span>
          </Link>
        ))}
      </div>
    </main>
  )
}
