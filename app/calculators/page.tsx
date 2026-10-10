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

      <section className="mb-12 border border-[var(--line)] bg-white p-6 sm:p-8">
        <h2 className="text-xl font-bold text-[var(--ink)]">Why use financial calculators?</h2>
        <div className="mt-4 prose prose-sm max-w-none text-[var(--muted)]">
          <p>Financial calculators turn vague goals into concrete numbers. They help you answer questions like: How much should I invest monthly to reach ₹1 crore in 15 years? What will my expenses look like after 20 years of inflation? How long will my retirement corpus last if I withdraw ₹50,000 monthly?</p>
          <p>Each calculator on this page uses transparent, standard financial formulas — compound interest, future value of annuities, EMI calculations, and inflation adjustments. You can adjust every input to model different scenarios: conservative vs. optimistic returns, early vs. delayed start, higher vs. lower inflation.</p>
          <p><strong>How to use them:</strong> Enter your numbers, observe the result, then change one variable at a time to see the sensitivity. Use the output to set realistic targets, compare options, and have informed conversations with a qualified financial advisor. Results are educational estimates — they do not include taxes, fees, or market volatility unless noted.</p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-5 text-2xl font-bold text-[var(--ink)]">Popular calculators</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <article className="border border-[var(--line)] bg-white p-5">
            <h3 className="font-bold text-[var(--ink)]">SIP Calculator</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">Estimate the future value of monthly mutual fund investments. See how compounding grows your wealth over time.</p>
          </article>
          <article className="border border-[var(--line)] bg-white p-5">
            <h3 className="font-bold text-[var(--ink)]">Retirement Planner</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">Calculate the corpus you need and the monthly SIP required to fund your retirement lifestyle.</p>
          </article>
          <article className="border border-[var(--line)] bg-white p-5">
            <h3 className="font-bold text-[var(--ink)]">Step-Up SIP Calculator</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">See how increasing your SIP annually (with salary hikes) dramatically accelerates corpus growth.</p>
          </article>
          <article className="border border-[var(--line)] bg-white p-5">
            <h3 className="font-bold text-[var(--ink)]">Cost of Delaying SIP</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">Quantify the wealth lost by postponing your investment start date — the most powerful argument for starting today.</p>
          </article>
          <article className="border border-[var(--line)] bg-white p-5">
            <h3 className="font-bold text-[var(--ink)]">SWP / Withdrawal Planner</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">Plan systematic withdrawals in retirement. Estimate how long your corpus lasts with monthly drawdowns.</p>
          </article>
          <article className="border border-[var(--line)] bg-white p-5">
            <h3 className="font-bold text-[var(--ink)]">Home Loan EMI Calculator</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">Calculate EMI, total interest, and total repayment. Model prepayment scenarios to save lakhs in interest.</p>
          </article>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/calculators/emergency-fund"
          className="group border border-[var(--brand-red)]/40 bg-[#fffaf4] p-5 transition hover:border-[var(--brand-red)]"
        >
          <h2 className="text-lg font-bold text-[var(--ink)] group-hover:text-[var(--brand-red)]">Emergency Fund Calculator</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">Plan a cash buffer from essential expenses, income stability, dependants, health costs, and current savings.</p>
          <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-[var(--brand-red)]">
            Open calculator <FiArrowRight size={13} />
          </span>
        </Link>
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
