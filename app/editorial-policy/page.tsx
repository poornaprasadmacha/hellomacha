import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Editorial Policy — HelloMacha',
  description: 'HelloMacha editorial policy: how we research, write, source, and update every guide. Source-first, India context, kept current.',
  alternates: {
    canonical: 'https://hellomacha.com/editorial-policy',
  },
  openGraph: {
    title: 'Editorial Policy — HelloMacha',
    description: 'How HelloMacha researches, writes, sources, and updates every finance and consumer guide.',
    url: 'https://hellomacha.com/editorial-policy',
    siteName: 'HelloMacha',
    type: 'website',
  },
}

export default function EditorialPolicyPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 pb-16 pt-6 sm:px-5 sm:pt-8">
      <div className="rounded-2xl border border-[var(--line)] bg-white p-6 shadow-sm sm:p-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-red)]">
          Editorial policy
        </p>
        <h1 className="mb-6 text-3xl font-black tracking-tight text-[var(--ink)]">
          Editorial Policy
        </h1>

        <p className="mb-6 text-base leading-relaxed text-[var(--ink)]">
          This page explains how HelloMacha researches, writes, sources, and updates every article and buying guide. It applies to all content published on hellomacha.com.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">1. Source-first research</h2>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          Every finance guide is written from primary and official sources — scheme documents, RBI notifications, fund fact sheets, government portals (EPFO, PIB, Income Tax Department), and press releases. We do not rewrite third-party articles. Where a fact, rate, or rule is stated, the source is named and linked wherever possible.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">2. India context</h2>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          All content is written for Indian readers. Prices, tax rules, scheme limits, and product availability are stated for the Indian market. Calculations are shown in rupees. Product reviews evaluate items as Indian buyers would use them — on Indian voltage, bandwidth, budgets, and after-sales support.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">3. Estimates and assumptions labelled</h2>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          Where exact figures are not available, estimates are clearly labelled as estimates. Assumptions behind calculations (e.g., expected returns, inflation, tax slabs) are stated out loud so readers can adjust them for their own situation.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">4. Kept current</h2>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          Articles are updated when tax rules, scheme rates, product prices, or terms change. Each article shows a "Last updated" date. Corrections from readers are treated as sources, not noise, and credible corrections are applied promptly.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">5. Hands-on product testing</h2>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          For product reviews and financial service guides, we use the product or service ourselves first — we sign up, transact, and wait to observe real results before writing. Recommendations are based on genuine personal experience, not marketing claims or affiliate pressure. Where we reference screenshots, statements, or proof of usage, those are from our own accounts and testing.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">6. No product pitches</h2>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          Recommendations are chosen for usefulness to Indian readers, not for commission. No article on HelloMacha is a sponsored product pitch. Where we mention financial products or services, the mention is based on editorial assessment of features, price, and suitability.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">7. Authorship and accountability</h2>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          Every article carries a visible byline linking to the author's profile page, which describes their background, focus areas, and writing philosophy. Readers can contact the editorial team at{' '}
          <a href="mailto:team.hellomacha@gmail.com" className="text-[var(--brand-red)] hover:underline">
            team.hellomacha@gmail.com
          </a>
          with questions, corrections, or topic suggestions.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">8. Corrections</h2>
        <p className="mb-0 text-base leading-relaxed text-[var(--muted)]">
          If you spot an error or outdated information, email us with the article URL and the correction needed. We review credible reports and publish corrections with a note on what changed and when.
        </p>
      </div>
    </main>
  )
}
