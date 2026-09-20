'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { FiArrowRight, FiGrid, FiInfo } from 'react-icons/fi'
import type { CalculatorDefinition } from './calculatorData'

function monthlyFutureValue(monthly: number, annualRate: number, years: number) {
  const months = years * 12
  const monthlyRate = annualRate / 12 / 100
  if (monthlyRate === 0) return monthly * months
  return monthly * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate))
}

function formatCurrency(value: number) {
  return `₹${Math.max(0, Math.round(value)).toLocaleString('en-IN')}`
}

function calculateEmi(principal: number, annualRate: number, years: number) {
  const monthlyRate = annualRate / 12 / 100
  const months = years * 12
  if (monthlyRate === 0) return principal / months
  return principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1)
}

function getMethodology(slug: string) {
  switch (slug) {
    case 'sip':
    case 'step-up-sip':
    case 'target-amount':
    case 'child-education':
    case 'retirement':
    case 'sip-emi':
      return 'Uses monthly compounding based on the expected annual return and investment period. Contributions are assumed to be made at the beginning of each month.'
    case 'delay-cost':
      return 'Compares the estimated value of starting today with the estimated value after the selected delay, using the same monthly compounding assumption.'
    case 'swp':
    case 'fixed-monthly-withdrawal':
      return 'Uses a monthly return assumption and a fixed monthly withdrawal. It does not include taxes, fees, inflation in withdrawals, or market volatility.'
    case 'lumpsum':
      return 'Uses annual compounding on the initial investment at the selected expected return. Actual market returns are not constant.'
    case 'inflation':
      return 'Projects the selected amount using the chosen annual inflation rate. Inflation varies across products, services, and time.'
    case 'cagr':
      return 'Calculates the annualized growth rate between the initial and final values. It assumes one beginning value and one ending value, without interim deposits or withdrawals.'
    case 'fixed-deposit':
      return 'Uses quarterly compounding to estimate fixed-deposit maturity. Actual bank rates, taxes, payout frequency, and premature-withdrawal rules may differ.'
    case 'ppf':
      return 'Projects annual contributions using the selected rate. PPF rates are notified by the government and may change; actual account rules and contribution timing matter.'
    case 'nps':
      return 'Uses monthly compounding on regular contributions. NPS returns are market-linked and the final withdrawal, annuity, tax, and allocation rules are not modeled here.'
    case 'epf':
      return 'Uses regular monthly contributions and the selected annual rate. Actual EPF balances depend on eligible wages, contribution rules, interest declarations, and employment history.'
    case 'home-loan-emi':
      return 'Uses the standard reducing-balance EMI formula. It excludes processing fees, insurance, floating-rate changes, taxes, prepayments, and other lender charges.'
    default:
      return 'This estimate uses the inputs shown above and does not account for taxes, fees, or changes in market conditions.'
  }
}

export default function CalculatorClient({ calculator }: { calculator: CalculatorDefinition }) {
  const [values, setValues] = useState<Record<string, number>>(
    Object.fromEntries(calculator.fields.map((field) => [field.key, field.defaultValue])),
  )

  const result = useMemo(() => {
    const value = (key: string) => values[key] ?? 0
    const monthly = value('monthly')
    const rate = value('rate')
    const years = value('years')
    let primary = 0
    let secondary = ''
    let label = 'Estimated value'

    switch (calculator.slug) {
      case 'sip':
      case 'sip-emi':
        primary = monthlyFutureValue(monthly, rate, years)
        secondary = `Total invested: ${formatCurrency(monthly * years * 12)}`
        break
      case 'step-up-sip': {
        let corpus = 0
        let invested = 0
        let currentMonthly = monthly
        for (let year = 0; year < years; year += 1) {
          corpus += monthlyFutureValue(currentMonthly, rate, 1) * Math.pow(1 + rate / 100, year)
          invested += currentMonthly * 12
          currentMonthly *= 1 + value('stepUp') / 100
        }
        primary = corpus
        secondary = `Total invested: ${formatCurrency(invested)}`
        break
      }
      case 'delay-cost': {
        const full = monthlyFutureValue(monthly, rate, years)
        const delayed = monthlyFutureValue(monthly, rate, Math.max(1, years - value('delay')))
        primary = full - delayed
        label = 'Potential cost of delay'
        secondary = `Value if started today: ${formatCurrency(full)}`
        break
      }
      case 'target-amount':
        primary = value('target') / (monthlyFutureValue(1, rate, years) || 1)
        label = 'Required monthly SIP'
        secondary = `Target amount: ${formatCurrency(value('target'))}`
        break
      case 'child-education':
        primary = monthlyFutureValue(1, rate, years)
        primary = value('currentCost') * Math.pow(1 + value('inflation') / 100, years) / (primary || 1)
        label = 'Required monthly SIP'
        secondary = `Future education cost: ${formatCurrency(value('currentCost') * Math.pow(1 + value('inflation') / 100, years))}`
        break
      case 'retirement': {
        const futureExpense = value('monthlyExpense') * Math.pow(1 + value('inflation') / 100, years)
        const corpus = futureExpense * 12 * 25
        primary = corpus / (monthlyFutureValue(1, rate, years) || 1)
        label = 'Required monthly SIP'
        secondary = `Estimated retirement corpus: ${formatCurrency(corpus)}`
        break
      }
      case 'swp': {
        const monthlyRate = rate / 12 / 100
        const remaining = value('corpus') * Math.pow(1 + monthlyRate, years * 12) - monthly * ((Math.pow(1 + monthlyRate, years * 12) - 1) / (monthlyRate || 1))
        primary = remaining
        label = 'Estimated remaining corpus'
        secondary = `Total withdrawals: ${formatCurrency(monthly * years * 12)}`
        break
      }
      case 'fixed-monthly-withdrawal':
        primary = value('corpus') / (((1 - Math.pow(1 + rate / 12 / 100, -(years * 12))) / (rate / 12 / 100 || 1)))
        label = 'Estimated monthly withdrawal'
        secondary = `Starting corpus: ${formatCurrency(value('corpus'))}`
        break
      case 'lumpsum':
        primary = value('principal') * Math.pow(1 + rate / 100, years)
        secondary = `Estimated gain: ${formatCurrency(primary - value('principal'))}`
        break
      case 'inflation':
        primary = value('amount') * Math.pow(1 + value('inflation') / 100, years)
        label = 'Future cost equivalent'
        secondary = `Purchasing power today: ${formatCurrency(value('amount'))}`
        break
      case 'cagr':
        primary = (Math.pow(value('final') / Math.max(value('initial'), 1), 1 / years) - 1) * 100
        label = 'Estimated CAGR'
        secondary = `Growth from ${formatCurrency(value('initial'))} to ${formatCurrency(value('final'))}`
        break
      case 'fixed-deposit': {
        const maturity = value('principal') * Math.pow(1 + value('rate') / 100 / 4, 4 * years)
        primary = maturity
        secondary = `Estimated interest: ${formatCurrency(maturity - value('principal'))}`
        break
      }
      case 'ppf': {
        const annualRate = value('rate') / 100
        primary = value('annual') * ((Math.pow(1 + annualRate, years) - 1) / (annualRate || 1))
        secondary = `Total contributions: ${formatCurrency(value('annual') * years)}`
        break
      }
      case 'nps':
      case 'epf':
        primary = monthlyFutureValue(value('monthly'), value('rate'), years)
        secondary = `Total contributions: ${formatCurrency(value('monthly') * years * 12)}`
        break
      case 'home-loan-emi': {
        const emi = calculateEmi(value('principal'), value('rate'), years)
        const totalRepayment = emi * years * 12
        primary = emi
        label = 'Estimated monthly EMI'
        secondary = `Total interest: ${formatCurrency(totalRepayment - value('principal'))}`
        break
      }
      default:
        primary = 0
    }

    return { primary, secondary, label }
  }, [calculator.slug, values])

  return (
    <div className="mx-auto max-w-5xl px-4 py-4 sm:px-5 sm:py-8">
      <nav className="mb-8 text-xs text-[var(--muted)]" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-[var(--brand-red)]">Home</Link>
        <span className="px-2">/</span>
        <Link href="/calculators" className="hover:text-[var(--brand-red)]">Calculators</Link>
        <span className="px-2">/</span>
        <span>{calculator.title}</span>
      </nav>
      <section className="mb-10 border-b border-[var(--line)] pb-8">
        <div className="mb-4 inline-flex items-center gap-2 border border-[var(--brand-red)]/30 bg-[var(--brand-red)]/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--brand-red)]">
          <FiGrid size={14} /> Financial tool
        </div>
        <h1 className="font-yapa text-3xl font-normal leading-tight text-[var(--ink)] sm:text-5xl">{calculator.title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)]">{calculator.description}</p>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
        <div className="border border-[var(--line)] bg-white p-6 sm:p-8">
          <div className="space-y-7">
            {calculator.fields.map((field) => (
              <div key={field.key}>
                <div className="mb-2 flex items-center justify-between gap-4 text-sm font-medium">
                  <label htmlFor={field.key} className="text-[var(--ink)]">{field.label}</label>
                  <div className="flex items-center gap-2">
                    <input
                      aria-label={`${field.label} value`}
                      type="number"
                      min={field.min}
                      max={field.max}
                      step={field.step}
                      value={values[field.key]}
                      onChange={(event) => {
                        const nextValue = Number(event.target.value)
                        if (!Number.isNaN(nextValue)) {
                          setValues((current) => ({
                            ...current,
                            [field.key]: Math.min(field.max, Math.max(field.min, nextValue)),
                          }))
                        }
                      }}
                      className="w-28 border border-[var(--line)] bg-white px-2 py-1 text-right font-mono text-sm font-bold text-[var(--brand-red)] outline-none focus:border-[var(--brand-red)]"
                    />
                    {field.suffix !== '₹' && <span className="font-mono text-xs text-[var(--muted)]">{field.suffix}</span>}
                  </div>
                </div>
                <input
                  id={field.key}
                  type="range"
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  value={values[field.key]}
                  onChange={(event) => setValues((current) => ({ ...current, [field.key]: Number(event.target.value) }))}
                  className="w-full accent-[var(--brand-red)]"
                />
                <div className="mt-1 flex justify-between text-[10px] text-[var(--muted)]">
                  <span>{field.suffix === '₹' ? formatCurrency(field.min) : `${field.min} ${field.suffix}`}</span>
                  <span>{field.suffix === '₹' ? formatCurrency(field.max) : `${field.max} ${field.suffix}`}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="flex flex-col justify-between border border-[var(--line)] bg-[#fbfbfb] p-6 sm:p-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--muted)]">{result.label}</p>
            <p className="mt-3 break-words font-mono text-3xl font-extrabold text-[var(--brand-red)] sm:text-4xl">{calculator.slug === 'cagr' ? `${result.primary.toFixed(2)}%` : formatCurrency(result.primary)}</p>
            <p className="mt-4 border-t border-[var(--line)] pt-4 text-sm text-[var(--muted)]">{result.secondary}</p>
          </div>
          <div className="mt-8 border-t border-[var(--line)] pt-5 text-xs leading-relaxed text-[var(--muted)]">
            <FiInfo className="mb-2 text-[var(--brand-red)]" size={16} />
            This is an estimate for education only. Returns are not assured or guaranteed. Consult a qualified financial advisor before investing.
          </div>
        </aside>
      </section>

      <section className="mt-8 border border-[var(--line)] bg-white p-6 sm:p-8">
        <h2 className="text-xl font-bold text-[var(--ink)]">How this calculator works</h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{getMethodology(calculator.slug)}</p>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
          The result is an educational estimate, not a guaranteed return or personal financial recommendation. Review current product documents and consult a qualified advisor before investing.
        </p>
      </section>

      <section className="mt-8 border border-[var(--line)] bg-white p-6 sm:p-8">
        <h2 className="text-xl font-bold text-[var(--ink)]">Frequently asked questions</h2>
        <div className="mt-5 space-y-5 text-sm leading-relaxed text-[var(--muted)]">
          <div>
            <h3 className="font-semibold text-[var(--ink)]">Are these calculator results guaranteed?</h3>
            <p className="mt-1">No. They are educational estimates based on the inputs and assumptions shown on this page.</p>
          </div>
          <div>
            <h3 className="font-semibold text-[var(--ink)]">Do the results include tax and fees?</h3>
            <p className="mt-1">No. Unless stated otherwise, taxes, fees, charges, and product-specific rules are not included.</p>
          </div>
          <div>
            <h3 className="font-semibold text-[var(--ink)]">How should I use the result?</h3>
            <p className="mt-1">Use it to compare scenarios, then verify current product documents and seek qualified advice before making a decision.</p>
          </div>
        </div>
      </section>

      <p className="mt-8 text-sm text-[var(--muted)]">
        Explore more tools <FiArrowRight className="inline text-[var(--brand-red)]" size={14} /> from the Calculators section in the footer.
      </p>
    </div>
  )
}
