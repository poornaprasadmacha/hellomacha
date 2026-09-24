'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { FiArrowRight, FiCheck, FiInfo, FiRotateCcw } from 'react-icons/fi'

const STORAGE_KEY = 'hellomacha-emergency-fund'

type EmploymentType = 'stable-salaried' | 'variable-salaried' | 'self-employed' | 'business-owner'

type EmergencyFundValues = {
  housing: number
  utilities: number
  groceries: number
  insurance: number
  transport: number
  childcare: number
  debt: number
  other: number
  currentSavings: number
  monthlySaving: number
  coverageMonths: number
  employment: EmploymentType
  dependents: number
  healthCosts: boolean
  targetMonths: number
}

const defaults: EmergencyFundValues = {
  housing: 25000,
  utilities: 5000,
  groceries: 10000,
  insurance: 3000,
  transport: 5000,
  childcare: 0,
  debt: 5000,
  other: 2000,
  currentSavings: 100000,
  monthlySaving: 10000,
  coverageMonths: 6,
  employment: 'stable-salaried',
  dependents: 0,
  healthCosts: false,
  targetMonths: 12,
}

const moneyFields: { key: keyof EmergencyFundValues; label: string; hint?: string }[] = [
  { key: 'housing', label: 'Rent or home loan EMI', hint: 'Include property tax or maintenance if you pay it monthly.' },
  { key: 'utilities', label: 'Utilities and bills', hint: 'Electricity, phone, internet, and basic household bills.' },
  { key: 'groceries', label: 'Groceries and essentials' },
  { key: 'insurance', label: 'Insurance premiums', hint: 'Health, life, vehicle, and other essential premiums.' },
  { key: 'transport', label: 'Transport and fuel' },
  { key: 'childcare', label: 'Childcare or education' },
  { key: 'debt', label: 'Minimum debt payments' },
  { key: 'other', label: 'Other essential costs' },
]

const employmentLabels: Record<EmploymentType, string> = {
  'stable-salaried': 'Stable salaried income',
  'variable-salaried': 'Salaried with variable pay',
  'self-employed': 'Self-employed or freelancer',
  'business-owner': 'Business owner',
}

const employmentFloors: Record<EmploymentType, number> = {
  'stable-salaried': 3,
  'variable-salaried': 5,
  'self-employed': 6,
  'business-owner': 9,
}

function formatCurrency(value: number) {
  return `₹${Math.max(0, Math.round(value)).toLocaleString('en-IN')}`
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function MoneyInput({
  value,
  onChange,
  label,
  hint,
}: {
  value: number
  onChange: (value: number) => void
  label: string
  hint?: string
}) {
  const [draft, setDraft] = useState(String(value))

  return (
    <label className="block">
      <span className="text-sm font-semibold text-[var(--ink)]">{label}</span>
      {hint && <span className="mt-1 block text-xs leading-relaxed text-[var(--muted)]">{hint}</span>}
      <span className="mt-2 flex items-center border border-[var(--line)] bg-white px-3 py-2 focus-within:border-[var(--brand-red)]">
        <span className="mr-2 font-mono text-sm text-[var(--muted)]">₹</span>
        <input
          type="text"
          inputMode="decimal"
          value={draft}
          aria-label={label}
          onFocus={() => setDraft(String(value))}
          onChange={(event) => {
            const nextDraft = event.target.value.replace(/,/g, '')
            if (!/^\d*\.?\d*$/.test(nextDraft)) return
            setDraft(nextDraft)
            const parsed = Number(nextDraft)
            if (Number.isFinite(parsed)) onChange(Math.max(0, parsed))
          }}
          onBlur={() => {
            const parsed = Number(draft)
            const nextValue = Number.isFinite(parsed) ? Math.max(0, parsed) : 0
            onChange(nextValue)
            setDraft(String(nextValue))
          }}
          className="w-full bg-transparent text-right font-mono text-sm font-bold text-[var(--brand-red)] outline-none"
        />
      </span>
    </label>
  )
}

export default function EmergencyFundClient() {
  const [values, setValues] = useState<EmergencyFundValues>(defaults)
  const [isLoaded, setIsLoaded] = useState(false)
  const [inputRevision, setInputRevision] = useState(0)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY)
        if (stored) setValues({ ...defaults, ...JSON.parse(stored) })
      } catch {
        // Keep the default inputs if browser storage is unavailable or invalid.
      } finally {
        setIsLoaded(true)
        setInputRevision((current) => current + 1)
      }
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isLoaded) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(values))
  }, [isLoaded, values])

  const update = <K extends keyof EmergencyFundValues>(key: K, value: EmergencyFundValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }))
  }

  const result = useMemo(() => {
    const essentialExpenses = moneyFields.reduce((total, field) => total + Number(values[field.key] || 0), 0)
    const employmentFloor = employmentFloors[values.employment]
    const dependentAdjustment = values.dependents >= 2 ? 1 : values.dependents === 1 ? 0.5 : 0
    const healthFloor = values.healthCosts ? 9 : 0
    const recommendedMonths = clamp(Math.max(values.coverageMonths, employmentFloor, values.coverageMonths + dependentAdjustment, healthFloor), 3, 12)
    const target = essentialExpenses * recommendedMonths
    const currentSavings = Math.max(0, values.currentSavings)
    const gap = Math.max(0, target - currentSavings)
    const fundedPercent = target > 0 ? clamp((currentSavings / target) * 100, 0, 100) : 0
    const currentMonths = essentialExpenses > 0 ? currentSavings / essentialExpenses : 0
    const monthlyToTarget = gap / Math.max(1, values.targetMonths)
    const milestones = [1, 3, 6, 9, 12].filter((months) => months <= recommendedMonths)

    return {
      essentialExpenses,
      employmentFloor,
      recommendedMonths,
      target,
      currentSavings,
      gap,
      fundedPercent,
      currentMonths,
      monthlyToTarget,
      milestones,
    }
  }, [values])

  const reset = () => {
    setValues(defaults)
    setInputRevision((current) => current + 1)
    window.localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-4 sm:px-5 sm:py-8">
      <nav className="mb-8 text-xs text-[var(--muted)]" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-[var(--brand-red)]">Home</Link>
        <span className="px-2">/</span>
        <Link href="/calculators" className="hover:text-[var(--brand-red)]">Calculators</Link>
        <span className="px-2">/</span>
        <span>Emergency Fund Calculator</span>
      </nav>

      <section className="mb-10 border-b border-[var(--line)] pb-8">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-[var(--brand-red)]">HelloMacha financial tool</p>
        <h1 className="font-yapa text-3xl font-normal leading-tight text-[var(--ink)] sm:text-5xl">Emergency Fund Calculator</h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--muted)]">
          Build a practical cash buffer from your essential monthly expenses, income stability, dependants, health costs, and current savings.
        </p>
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-[var(--muted)]">
          <span className="inline-flex items-center gap-1.5"><FiCheck className="text-[var(--brand-red)]" /> Runs in your browser</span>
          <span className="inline-flex items-center gap-1.5"><FiCheck className="text-[var(--brand-red)]" /> Saves only on this device</span>
          <span className="inline-flex items-center gap-1.5"><FiCheck className="text-[var(--brand-red)]" /> India-focused estimates</span>
        </div>
      </section>

      <section className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="border border-[var(--line)] bg-white p-5 sm:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[var(--ink)]">Your essential monthly expenses</h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">Leave out holidays, dining out, entertainment, and other costs you could pause during an income disruption.</p>
            </div>
            <button type="button" onClick={reset} title="Reset calculator" aria-label="Reset calculator" className="inline-flex shrink-0 items-center gap-2 border border-[var(--line)] px-3 py-2 text-xs font-bold text-[var(--muted)] hover:border-[var(--brand-red)] hover:text-[var(--brand-red)]">
              <FiRotateCcw size={14} /> Reset
            </button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {moneyFields.map((field) => (
              <MoneyInput key={`${field.key}-${inputRevision}`} label={field.label} hint={field.hint} value={values[field.key] as number} onChange={(next) => update(field.key, next)} />
            ))}
          </div>

          <div className="mt-8 border-t border-[var(--line)] pt-6">
            <h2 className="text-xl font-bold text-[var(--ink)]">Risk profile</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-[var(--ink)]">Income type</span>
                <select value={values.employment} onChange={(event) => update('employment', event.target.value as EmploymentType)} className="mt-2 w-full border border-[var(--line)] bg-white px-3 py-2.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--brand-red)]">
                  {Object.entries(employmentLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-[var(--ink)]">Number of dependants</span>
                <select value={values.dependents} onChange={(event) => update('dependents', Number(event.target.value))} className="mt-2 w-full border border-[var(--line)] bg-white px-3 py-2.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--brand-red)]">
                  {[0, 1, 2, 3, 4, 5, 6].map((count) => <option key={count} value={count}>{count}</option>)}
                </select>
              </label>
              <label className="flex items-start gap-3 border border-[var(--line)] p-3 text-sm text-[var(--ink)] sm:col-span-2">
                <input type="checkbox" checked={values.healthCosts} onChange={(event) => update('healthCosts', event.target.checked)} className="mt-1 accent-[var(--brand-red)]" />
                <span><strong>Include ongoing health costs or a higher medical risk</strong><span className="mt-1 block text-xs text-[var(--muted)]">This raises the suggested reserve floor to 9 months. Keep suitable health insurance separate from this cash target.</span></span>
              </label>
            </div>

            <label className="mt-6 block">
              <span className="flex justify-between gap-4 text-sm font-semibold text-[var(--ink)]"><span>Your starting coverage preference</span><span>{values.coverageMonths} months</span></span>
              <input type="range" min="3" max="12" step="1" value={values.coverageMonths} onChange={(event) => update('coverageMonths', Number(event.target.value))} className="mt-4 w-full accent-[var(--brand-red)]" />
              <span className="mt-1 flex justify-between text-xs text-[var(--muted)]"><span>3 months</span><span>12 months</span></span>
            </label>
          </div>

          <div className="mt-8 border-t border-[var(--line)] pt-6">
            <h2 className="text-xl font-bold text-[var(--ink)]">Your current position</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <MoneyInput key={`current-savings-${inputRevision}`} label="Current emergency savings" value={values.currentSavings} onChange={(next) => update('currentSavings', next)} hint="Include only cash or near-cash money you could access for an emergency." />
              <MoneyInput key={`monthly-saving-${inputRevision}`} label="Monthly amount you can save" value={values.monthlySaving} onChange={(next) => update('monthlySaving', next)} hint="Used to estimate how long it may take to close the gap." />
            </div>
            <label className="mt-6 block">
              <span className="flex justify-between gap-4 text-sm font-semibold text-[var(--ink)]"><span>Target timeline for the gap</span><span>{values.targetMonths} months</span></span>
              <input type="range" min="3" max="24" step="1" value={values.targetMonths} onChange={(event) => update('targetMonths', Number(event.target.value))} className="mt-4 w-full accent-[var(--brand-red)]" />
              <span className="mt-1 flex justify-between text-xs text-[var(--muted)]"><span>3 months</span><span>24 months</span></span>
            </label>
          </div>
        </div>

        <aside className="h-fit border border-[var(--brand-red)]/25 bg-[#fffaf4] p-5 sm:p-8 xl:sticky xl:top-24">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--muted)]">Recommended target</p>
          <p className="mt-3 break-words font-mono text-4xl font-extrabold text-[var(--brand-red)] sm:text-5xl">{formatCurrency(result.target)}</p>
          <p className="mt-2 text-sm text-[var(--muted)]">{result.recommendedMonths} months of essential expenses</p>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="border border-[var(--line)] bg-white p-4"><p className="text-xs text-[var(--muted)]">Monthly essentials</p><p className="mt-1 font-mono text-lg font-bold text-[var(--ink)]">{formatCurrency(result.essentialExpenses)}</p></div>
            <div className="border border-[var(--line)] bg-white p-4"><p className="text-xs text-[var(--muted)]">Current coverage</p><p className="mt-1 font-mono text-lg font-bold text-[var(--ink)]">{result.currentMonths.toFixed(1)} mo</p></div>
            <div className="border border-[var(--line)] bg-white p-4"><p className="text-xs text-[var(--muted)]">Savings gap</p><p className="mt-1 font-mono text-lg font-bold text-[var(--ink)]">{formatCurrency(result.gap)}</p></div>
            <div className="border border-[var(--line)] bg-white p-4"><p className="text-xs text-[var(--muted)]">Planned monthly save</p><p className="mt-1 font-mono text-lg font-bold text-[var(--ink)]">{formatCurrency(values.monthlySaving)}</p></div>
          </div>

          <div className="mt-7">
            <div className="flex justify-between text-xs font-bold text-[var(--muted)]"><span>Funded</span><span>{Math.round(result.fundedPercent)}%</span></div>
            <div className="mt-2 h-3 bg-white"><div className="h-3 bg-[var(--brand-red)] transition-all" style={{ width: `${result.fundedPercent}%` }} /></div>
            <p className="mt-2 text-xs text-[var(--muted)]">{formatCurrency(result.currentSavings)} of {formatCurrency(result.target)} target</p>
          </div>

          <div className="mt-7 border-t border-[var(--line)] pt-5">
            <p className="text-sm font-bold text-[var(--ink)]">Gap plan</p>
            {result.gap === 0 ? <p className="mt-2 text-sm text-[var(--muted)]">You have reached the calculated target. Review it after major changes to your income or essential costs.</p> : <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">To close the gap in {values.targetMonths} months, plan about <strong className="text-[var(--ink)]">{formatCurrency(result.monthlyToTarget)} per month</strong>. Your current plan would take about <strong className="text-[var(--ink)]">{values.monthlySaving > 0 ? Math.ceil(result.gap / values.monthlySaving) : 'an undefined number of'} months</strong>.</p>}
          </div>

          <div className="mt-7 flex items-start gap-2 border-t border-[var(--line)] pt-5 text-xs leading-relaxed text-[var(--muted)]"><FiInfo className="mt-0.5 shrink-0 text-[var(--brand-red)]" size={15} />This is an educational estimate. Coverage needs vary with job security, dependants, insurance, debt, and access to other support.</div>
        </aside>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="border border-[var(--line)] bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-[var(--ink)]">Milestones</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">Build the reserve in stages instead of waiting for the full target before starting.</p>
          <div className="mt-5 space-y-3">
            {result.milestones.map((months) => {
              const milestone = result.essentialExpenses * months
              const completed = result.currentSavings >= milestone
              return <div key={months} className="flex items-center justify-between gap-4 border-b border-[var(--line)] pb-3 text-sm"><span className="flex items-center gap-2 font-semibold text-[var(--ink)]">{completed ? <FiCheck className="text-green-700" /> : <span className="h-4 w-4 border border-[var(--line)]" />}{months} month{months === 1 ? '' : 's'}</span><span className="font-mono text-[var(--muted)]">{formatCurrency(milestone)}</span></div>
            })}
          </div>
        </div>
        <div className="border border-[var(--line)] bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-[var(--ink)]">Where to keep it</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">Prioritise safety and access over chasing returns. Products, insurance limits, taxes, and withdrawal times vary.</p>
          <div className="mt-5 space-y-4 text-sm">
            <div><p className="font-bold text-[var(--ink)]">First month: savings account</p><p className="mt-1 text-[var(--muted)]">Keep the immediately needed portion accessible for urgent bills.</p></div>
            <div><p className="font-bold text-[var(--ink)]">Next layer: sweep-in FD or short-term deposit</p><p className="mt-1 text-[var(--muted)]">Check premature withdrawal rules and whether the bank automatically sweeps funds when needed.</p></div>
            <div><p className="font-bold text-[var(--ink)]">Additional layer: liquid mutual fund, only if understood</p><p className="mt-1 text-[var(--muted)]">Returns are not guaranteed, redemption is not the same as instant cash, and it is not a bank deposit.</p></div>
          </div>
        </div>
      </section>

      <section className="mt-8 border border-[var(--line)] bg-white p-6 sm:p-8">
        <h2 className="text-xl font-bold text-[var(--ink)]">How this calculator works</h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">It adds the essential costs you enter, applies your preferred coverage period, and raises that period when your employment type, dependants, or health risk suggests a larger buffer. The result is capped at 12 months and should be treated as a planning range, not a universal rule.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="border-l-2 border-[var(--brand-red)] pl-4"><p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--muted)]">Base floor</p><p className="mt-2 text-sm text-[var(--ink)]">{employmentLabels[values.employment]} starts at {result.employmentFloor} months.</p></div>
          <div className="border-l-2 border-[var(--brand-red)] pl-4"><p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--muted)]">Formula</p><p className="mt-2 text-sm text-[var(--ink)]">Essential monthly costs × recommended months.</p></div>
          <div className="border-l-2 border-[var(--brand-red)] pl-4"><p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--muted)]">Review trigger</p><p className="mt-2 text-sm text-[var(--ink)]">Recalculate after a job, family, debt, or health-cost change.</p></div>
        </div>
      </section>

      <section className="mt-8 border border-[var(--line)] bg-white p-6 sm:p-8">
        <h2 className="text-xl font-bold text-[var(--ink)]">Emergency fund FAQs</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2 text-sm leading-relaxed text-[var(--muted)]">
          <div><h3 className="font-semibold text-[var(--ink)]">Should I include investments?</h3><p className="mt-1">Use money you can access without relying on a market sale. Shares and equity funds can fall when you need them most.</p></div>
          <div><h3 className="font-semibold text-[var(--ink)]">Should I build this before a SIP?</h3><p className="mt-1">A basic cash buffer can reduce the chance that an emergency forces you to borrow or sell long-term investments. Your priorities depend on your debt, insurance, and household situation.</p></div>
          <div><h3 className="font-semibold text-[var(--ink)]">Are health insurance and emergency savings the same?</h3><p className="mt-1">No. Insurance may cover eligible medical costs, while the cash reserve helps with deductibles, exclusions, delays, and non-medical disruptions.</p></div>
          <div><h3 className="font-semibold text-[var(--ink)]">When should I recalculate?</h3><p className="mt-1">Review it at least yearly and after changes to income, rent or EMI, dependants, insurance, debt, or health costs.</p></div>
        </div>
      </section>

      <p className="mt-8 text-sm text-[var(--muted)]">Explore more tools <FiArrowRight className="inline text-[var(--brand-red)]" size={14} /> from the <Link href="/calculators" className="font-semibold text-[var(--brand-red)] hover:underline">Calculators section</Link>.</p>
    </div>
  )
}
