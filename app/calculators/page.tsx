import type { Metadata } from 'next'
import Link from 'next/link'
import { FiArrowRight, FiGrid } from 'react-icons/fi'
import { calculators } from './calculatorData'

export const metadata: Metadata = {
  title: 'Financial Calculators | HelloMacha',
  description: 'Use free SIP, lumpsum, retirement, inflation, SWP, and investment calculators to plan your money with clearer numbers.',
  keywords: [
    'financial calculators India',
    'investment calculator',
    'SIP calculator',
    'retirement calculator',
    'mutual fund calculator',
  ],
  alternates: { canonical: 'https://hellomacha.com/calculators' },
  openGraph: {
    title: 'Financial Calculators | HelloMacha',
    description: 'Free calculators for SIPs, retirement planning, inflation, withdrawals, and long-term investing.',
    url: 'https://hellomacha.com/calculators',
    siteName: 'HelloMacha',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary',
    title: 'Financial Calculators | HelloMacha',
    description: 'Free calculators for SIPs, retirement planning, inflation, withdrawals, and long-term investing.',
  },
}

export default function CalculatorsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-4 sm:px-5 sm:py-8">
      <section className="mb-10 border-b border-[var(--line)] pb-8">
        <div className="mb-4 inline-flex items-center gap-2 border border-[var(--brand-red)]/30 bg-[var(--brand-red)]/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--brand-red)]">
          <FiGrid size={14} /> HelloMacha tools
        </div>
        <h1 className="font-yapa text-3xl font-normal leading-tight text-[var(--ink)] sm:text-5xl">Financial Calculators</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)]">
          Explore practical calculators for investing, retirement, withdrawals, inflation, and financial goals.
        </p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {calculators.map((calculator) => (
          <Link
            key={calculator.slug}
            href={`/calculators/${calculator.slug}`}
            className="group border border-[var(--line)] bg-white p-5 transition hover:border-[var(--brand-red)]"
          >
            <h2 className="text-lg font-bold text-[var(--ink)] group-hover:text-[var(--brand-red)]">{calculator.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{calculator.description}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-[var(--brand-red)]">
              Open calculator <FiArrowRight size={13} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
