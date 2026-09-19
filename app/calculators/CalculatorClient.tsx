'use client'

import { useMemo, useState } from 'react'
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
      default:
        primary = 0
    }

    return { primary, secondary, label }
  }, [calculator.slug, values])

  return (
    <div className="mx-auto max-w-5xl px-4 py-4 sm:px-5 sm:py-8">
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
            <p className="mt-3 break-words font-mono text-3xl font-extrabold text-[var(--brand-red)] sm:text-4xl">{formatCurrency(result.primary)}</p>
            <p className="mt-4 border-t border-[var(--line)] pt-4 text-sm text-[var(--muted)]">{result.secondary}</p>
          </div>
          <div className="mt-8 border-t border-[var(--line)] pt-5 text-xs leading-relaxed text-[var(--muted)]">
            <FiInfo className="mb-2 text-[var(--brand-red)]" size={16} />
            This is an estimate for education only. Returns are not assured or guaranteed. Consult a qualified financial advisor before investing.
          </div>
        </aside>
      </section>

      <p className="mt-8 text-sm text-[var(--muted)]">
        Explore more tools <FiArrowRight className="inline text-[var(--brand-red)]" size={14} /> from the Calculators section in the footer.
      </p>
    </div>
  )
}
