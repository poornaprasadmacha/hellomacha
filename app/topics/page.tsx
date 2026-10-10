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

      <section className="mt-10 border border-[var(--line)] bg-white p-6 sm:p-8">
        <h2 className="text-xl font-bold text-[var(--ink)]">About this library</h2>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-[var(--muted)]">
          <p>
            The HelloMacha finance topics library is a curated collection of guides organised around the financial decisions you actually make, rather than around products or jargon. Each topic gathers the concepts, calculations, and rules you need in one place, whether you are starting your first job, buying a home, funding your children&apos;s education, or preparing for retirement.
          </p>
          <p>
            The library is organised into six topics — personal finance, mutual funds and SIPs, retirement planning, loans and debt, tax and compliance, and government schemes — because these are the six pillars of money management for Indian households. Real decisions rarely sit in one silo: a home loan changes your tax planning, and your EPF contribution shapes your retirement corpus. Grouping guides this way lets you follow a decision from first principles to the finer details without hunting across the site.
          </p>
          <p>
            Every topic page lists the key concepts behind the subject, answers the questions readers ask most, and links to the latest guides written for Indian audiences. Start with the topic closest to the decision in front of you, then branch out — the related-topic links at the bottom of each topic page show how one decision connects to the next.
          </p>
        </div>
      </section>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <Link key={topic.slug} href={`/topics/${topic.slug}`} className="border border-[var(--line)] bg-white p-6 transition hover:border-[var(--brand-red)]">
            <h2 className="text-xl font-bold text-[var(--ink)]">{topic.name}</h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{topic.description}</p>
            <span className="mt-5 inline-block text-sm font-semibold text-[var(--brand-red)]">Browse guides</span>
          </Link>
        ))}
      </div>

      <section className="mt-10 border border-[var(--line)] bg-white p-6 sm:p-8">
        <h2 className="text-xl font-bold text-[var(--ink)]">How to use this library</h2>
        <ul className="mt-4 grid gap-4 text-sm leading-relaxed text-[var(--muted)] sm:grid-cols-2">
          <li className="border border-[var(--line)] p-5">
            <h3 className="font-semibold text-[var(--ink)]">Start with a decision, not a topic</h3>
            <p className="mt-2">Pick the choice in front of you today — should I prepay my loan, how much do I need to retire, which SIP fits my goal — and open the matching topic instead of browsing at random.</p>
          </li>
          <li className="border border-[var(--line)] p-5">
            <h3 className="font-semibold text-[var(--ink)]">Read the key concepts first</h3>
            <p className="mt-2">Each topic page opens with foundational ideas and definitions, so you understand the terms and trade-offs before the numbers make sense.</p>
          </li>
          <li className="border border-[var(--line)] p-5">
            <h3 className="font-semibold text-[var(--ink)]">Use the calculators alongside the guides</h3>
            <p className="mt-2">Every major topic pairs with free tools — SIP, EMI, inflation, retirement, and tax calculators — that turn general advice into your own rupee amounts.</p>
          </li>
          <li className="border border-[var(--line)] p-5">
            <h3 className="font-semibold text-[var(--ink)]">Verify time-sensitive rules at the source</h3>
            <p className="mt-2">Tax slabs, scheme interest rates, and government rules change. Guides link to official sources so you can confirm the current position before acting.</p>
          </li>
        </ul>
      </section>

      <section className="mt-8 border border-[var(--line)] bg-white p-6 sm:p-8">
        <h2 className="text-xl font-bold text-[var(--ink)]">Our editorial approach</h2>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-[var(--muted)]">
          <p>
            <strong className="text-[var(--ink)]">Evidence-first.</strong> We build every guide from primary and official sources — RBI notifications, government scheme portals, fund fact sheets, and tax documentation — and we label estimates, assumptions, and historical figures clearly so you can tell verified facts from projections.
          </p>
          <p>
            <strong className="text-[var(--ink)]">Practical.</strong> Guides focus on decisions you can act on this month, with worked examples in rupees rather than abstract theory. Each article is written to answer a specific question, show the calculation where one exists, and flag the mistakes readers make most often.
          </p>
          <p>
            <strong className="text-[var(--ink)]">India-focused.</strong> Everything is written for Indian readers: Indian tax regimes, government schemes, inflation realities, salary structures, and product availability. Content is reviewed and updated when facts, rules, or prices change, and readers can flag corrections to the editorial team at any time.
          </p>
        </div>
        <Link href="/editorial-policy" className="mt-5 inline-block text-sm font-semibold text-[var(--brand-red)] hover:underline">
          Read our editorial policy
        </Link>
      </section>
    </main>
  )
}
