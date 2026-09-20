export type CalculatorField = {
  key: string
  label: string
  defaultValue: number
  min: number
  max: number
  step: number
  suffix: string
}

export type CalculatorDefinition = {
  slug: string
  title: string
  description: string
  seoDescription: string
  keywords: string[]
  fields: CalculatorField[]
}

export const calculators: CalculatorDefinition[] = [
  {
    slug: 'sip',
    title: 'SIP Calculator',
    description: 'Estimate the future value of a monthly mutual fund investment.',
    seoDescription: 'Use this free SIP calculator to estimate mutual fund returns, total investment, and future wealth from monthly investments in India.',
    keywords: ['SIP calculator', 'mutual fund SIP calculator', 'SIP return calculator', 'monthly investment calculator', 'SIP calculator India'],
    fields: [
      { key: 'monthly', label: 'Monthly investment', defaultValue: 5000, min: 500, max: 100000, step: 500, suffix: '₹' },
      { key: 'rate', label: 'Expected annual return', defaultValue: 12, min: 1, max: 30, step: 0.5, suffix: '%' },
      { key: 'years', label: 'Investment period', defaultValue: 10, min: 1, max: 40, step: 1, suffix: 'years' },
    ],
  },
  {
    slug: 'step-up-sip',
    title: 'Step-Up SIP Calculator',
    description: 'See how increasing your SIP every year can accelerate wealth creation.',
    seoDescription: 'Calculate the future value of a step-up SIP with annual investment increases, expected returns, and your investment time horizon.',
    keywords: ['step up SIP calculator', 'step-up SIP calculator India', 'SIP increase calculator', 'annual step-up SIP'],
    fields: [
      { key: 'monthly', label: 'Starting monthly investment', defaultValue: 5000, min: 500, max: 100000, step: 500, suffix: '₹' },
      { key: 'stepUp', label: 'Annual step-up', defaultValue: 10, min: 0, max: 50, step: 1, suffix: '%' },
      { key: 'rate', label: 'Expected annual return', defaultValue: 12, min: 1, max: 30, step: 0.5, suffix: '%' },
      { key: 'years', label: 'Investment period', defaultValue: 10, min: 1, max: 40, step: 1, suffix: 'years' },
    ],
  },
  {
    slug: 'delay-cost',
    title: 'Cost of Delaying SIP Calculator',
    description: 'Measure the potential cost of starting your investment later.',
    seoDescription: 'Find out how much wealth you could lose by delaying your SIP investment with this cost of delay calculator.',
    keywords: ['cost of delaying SIP calculator', 'SIP delay calculator', 'investment delay calculator', 'power of compounding calculator'],
    fields: [
      { key: 'monthly', label: 'Monthly investment', defaultValue: 5000, min: 500, max: 100000, step: 500, suffix: '₹' },
      { key: 'rate', label: 'Expected annual return', defaultValue: 12, min: 1, max: 30, step: 0.5, suffix: '%' },
      { key: 'years', label: 'Total investment period', defaultValue: 20, min: 2, max: 40, step: 1, suffix: 'years' },
      { key: 'delay', label: 'Years delayed', defaultValue: 5, min: 1, max: 15, step: 1, suffix: 'years' },
    ],
  },
  {
    slug: 'target-amount',
    title: 'Target Amount SIP Calculator',
    description: 'Find the monthly SIP needed to reach a future financial target.',
    seoDescription: 'Calculate the monthly SIP required to reach your target amount based on expected returns and investment duration.',
    keywords: ['target amount SIP calculator', 'goal-based SIP calculator', 'monthly SIP goal calculator', 'investment target calculator'],
    fields: [
      { key: 'target', label: 'Target amount', defaultValue: 1000000, min: 10000, max: 100000000, step: 10000, suffix: '₹' },
      { key: 'rate', label: 'Expected annual return', defaultValue: 12, min: 1, max: 30, step: 0.5, suffix: '%' },
      { key: 'years', label: 'Investment period', defaultValue: 10, min: 1, max: 40, step: 1, suffix: 'years' },
    ],
  },
  {
    slug: 'child-education',
    title: 'Child Education Planner',
    description: "Plan a monthly investment for your child's future education costs.",
    seoDescription: 'Plan your child education fund with an inflation-adjusted monthly investment calculator for future education expenses.',
    keywords: ['child education planner', 'child education calculator', 'education fund calculator', 'education inflation calculator'],
    fields: [
      { key: 'currentCost', label: 'Education cost today', defaultValue: 1000000, min: 100000, max: 100000000, step: 10000, suffix: '₹' },
      { key: 'inflation', label: 'Education inflation', defaultValue: 8, min: 1, max: 20, step: 0.5, suffix: '%' },
      { key: 'years', label: 'Years until education', defaultValue: 15, min: 1, max: 30, step: 1, suffix: 'years' },
      { key: 'rate', label: 'Expected annual return', defaultValue: 12, min: 1, max: 30, step: 0.5, suffix: '%' },
    ],
  },
  {
    slug: 'retirement',
    title: 'Retirement Planner',
    description: 'Estimate your retirement corpus and the SIP required to build it.',
    seoDescription: 'Estimate your retirement corpus and calculate the monthly SIP needed for your retirement goals in India.',
    keywords: ['retirement planner', 'retirement calculator India', 'retirement corpus calculator', 'retirement SIP calculator'],
    fields: [
      { key: 'monthlyExpense', label: 'Monthly expense today', defaultValue: 50000, min: 5000, max: 1000000, step: 1000, suffix: '₹' },
      { key: 'inflation', label: 'Expected inflation', defaultValue: 6, min: 1, max: 15, step: 0.5, suffix: '%' },
      { key: 'years', label: 'Years until retirement', defaultValue: 20, min: 1, max: 40, step: 1, suffix: 'years' },
      { key: 'rate', label: 'Expected annual return', defaultValue: 12, min: 1, max: 30, step: 0.5, suffix: '%' },
    ],
  },
  {
    slug: 'swp',
    title: 'SWP with Estate Planner',
    description: 'Estimate how long a portfolio may last while you withdraw regularly.',
    seoDescription: 'Estimate your remaining investment corpus and withdrawals with this systematic withdrawal plan and estate calculator.',
    keywords: ['SWP calculator', 'systematic withdrawal plan calculator', 'SWP with estate planner', 'mutual fund withdrawal calculator'],
    fields: [
      { key: 'corpus', label: 'Starting corpus', defaultValue: 10000000, min: 100000, max: 100000000, step: 10000, suffix: '₹' },
      { key: 'monthly', label: 'Monthly withdrawal', defaultValue: 50000, min: 1000, max: 1000000, step: 1000, suffix: '₹' },
      { key: 'rate', label: 'Expected annual return', defaultValue: 8, min: 1, max: 20, step: 0.5, suffix: '%' },
      { key: 'years', label: 'Withdrawal period', defaultValue: 20, min: 1, max: 40, step: 1, suffix: 'years' },
    ],
  },
  {
    slug: 'fixed-monthly-withdrawal',
    title: 'Fixed Monthly Withdrawal Calculator',
    description: 'Estimate a sustainable monthly withdrawal from a lump-sum investment.',
    seoDescription: 'Calculate an estimated fixed monthly withdrawal from your lump-sum investment for a chosen period and return rate.',
    keywords: ['fixed monthly withdrawal calculator', 'monthly withdrawal calculator', 'lump sum withdrawal calculator', 'retirement withdrawal calculator'],
    fields: [
      { key: 'corpus', label: 'Starting corpus', defaultValue: 10000000, min: 100000, max: 100000000, step: 10000, suffix: '₹' },
      { key: 'rate', label: 'Expected annual return', defaultValue: 8, min: 1, max: 20, step: 0.5, suffix: '%' },
      { key: 'years', label: 'Withdrawal period', defaultValue: 20, min: 1, max: 40, step: 1, suffix: 'years' },
    ],
  },
  {
    slug: 'sip-emi',
    title: 'SIP with EMI Planner',
    description: 'Compare a monthly SIP with the cost of an equivalent loan EMI.',
    seoDescription: 'Compare monthly SIP investing with loan EMI planning using this simple investment and EMI calculator.',
    keywords: ['SIP with EMI calculator', 'SIP EMI planner', 'investment vs EMI calculator', 'loan EMI investment calculator'],
    fields: [
      { key: 'monthly', label: 'Monthly SIP amount', defaultValue: 10000, min: 500, max: 100000, step: 500, suffix: '₹' },
      { key: 'rate', label: 'Expected annual return', defaultValue: 12, min: 1, max: 30, step: 0.5, suffix: '%' },
      { key: 'years', label: 'Investment period', defaultValue: 10, min: 1, max: 40, step: 1, suffix: 'years' },
    ],
  },
  {
    slug: 'lumpsum',
    title: 'Lumpsum Calculator',
    description: 'Estimate how a one-time investment could grow over time.',
    seoDescription: 'Use this lumpsum calculator to estimate the future value and potential returns of a one-time mutual fund investment.',
    keywords: ['lumpsum calculator', 'lump sum investment calculator', 'lumpsum return calculator', 'mutual fund lumpsum calculator'],
    fields: [
      { key: 'principal', label: 'Initial investment', defaultValue: 100000, min: 1000, max: 100000000, step: 1000, suffix: '₹' },
      { key: 'rate', label: 'Expected annual return', defaultValue: 12, min: 1, max: 30, step: 0.5, suffix: '%' },
      { key: 'years', label: 'Investment period', defaultValue: 10, min: 1, max: 40, step: 1, suffix: 'years' },
    ],
  },
  {
    slug: 'inflation',
    title: 'Impact of Inflation Calculator',
    description: 'Understand how inflation can change the future value of your money.',
    seoDescription: 'Calculate how inflation may affect the future cost and purchasing power of your money over time.',
    keywords: ['inflation calculator India', 'impact of inflation calculator', 'inflation impact on money', 'future cost calculator'],
    fields: [
      { key: 'amount', label: 'Amount today', defaultValue: 100000, min: 1000, max: 100000000, step: 1000, suffix: '₹' },
      { key: 'inflation', label: 'Inflation rate', defaultValue: 6, min: 1, max: 20, step: 0.5, suffix: '%' },
      { key: 'years', label: 'Time period', defaultValue: 10, min: 1, max: 40, step: 1, suffix: 'years' },
    ],
  },
  {
    slug: 'cagr',
    title: 'CAGR Calculator',
    description: 'Calculate the annualized growth rate of an investment over time.',
    seoDescription: 'Calculate CAGR from your initial value, final value, and investment period with this free CAGR calculator.',
    keywords: ['CAGR calculator', 'compound annual growth rate calculator', 'investment growth calculator'],
    fields: [
      { key: 'initial', label: 'Initial value', defaultValue: 100000, min: 1000, max: 100000000, step: 1000, suffix: '₹' },
      { key: 'final', label: 'Final value', defaultValue: 200000, min: 1000, max: 200000000, step: 1000, suffix: '₹' },
      { key: 'years', label: 'Investment period', defaultValue: 5, min: 1, max: 50, step: 1, suffix: 'years' },
    ],
  },
  {
    slug: 'fixed-deposit',
    title: 'Fixed Deposit Calculator',
    description: 'Estimate maturity value and interest earned on a fixed deposit.',
    seoDescription: 'Estimate fixed deposit maturity value and interest earned using principal, interest rate, and tenure.',
    keywords: ['FD calculator', 'fixed deposit calculator India', 'FD maturity calculator'],
    fields: [
      { key: 'principal', label: 'Deposit amount', defaultValue: 100000, min: 1000, max: 100000000, step: 1000, suffix: '₹' },
      { key: 'rate', label: 'Annual interest rate', defaultValue: 7, min: 1, max: 20, step: 0.1, suffix: '%' },
      { key: 'years', label: 'Tenure', defaultValue: 5, min: 1, max: 20, step: 1, suffix: 'years' },
    ],
  },
  {
    slug: 'ppf',
    title: 'PPF Calculator',
    description: 'Estimate PPF maturity value from annual contributions and the interest rate.',
    seoDescription: 'Estimate Public Provident Fund maturity value using annual investment, interest rate, and investment period.',
    keywords: ['PPF calculator', 'PPF maturity calculator', 'Public Provident Fund calculator'],
    fields: [
      { key: 'annual', label: 'Annual investment', defaultValue: 150000, min: 500, max: 150000, step: 500, suffix: '₹' },
      { key: 'rate', label: 'Annual interest rate', defaultValue: 7.1, min: 1, max: 15, step: 0.1, suffix: '%' },
      { key: 'years', label: 'Investment period', defaultValue: 15, min: 1, max: 25, step: 1, suffix: 'years' },
    ],
  },
  {
    slug: 'nps',
    title: 'NPS Calculator',
    description: 'Estimate the retirement corpus from regular NPS contributions.',
    seoDescription: 'Estimate NPS retirement corpus from monthly contribution, expected return, and investment period.',
    keywords: ['NPS calculator', 'National Pension System calculator', 'NPS retirement calculator'],
    fields: [
      { key: 'monthly', label: 'Monthly contribution', defaultValue: 5000, min: 500, max: 200000, step: 500, suffix: '₹' },
      { key: 'rate', label: 'Expected annual return', defaultValue: 10, min: 1, max: 20, step: 0.5, suffix: '%' },
      { key: 'years', label: 'Investment period', defaultValue: 20, min: 1, max: 40, step: 1, suffix: 'years' },
    ],
  },
  {
    slug: 'epf',
    title: 'EPF Calculator',
    description: 'Estimate employee provident fund growth from monthly contributions.',
    seoDescription: 'Estimate EPF corpus from employee contribution, employer contribution, interest rate, and investment period.',
    keywords: ['EPF calculator', 'EPF balance calculator', 'provident fund calculator India'],
    fields: [
      { key: 'monthly', label: 'Monthly contribution', defaultValue: 5000, min: 500, max: 200000, step: 500, suffix: '₹' },
      { key: 'rate', label: 'Annual interest rate', defaultValue: 8.25, min: 1, max: 15, step: 0.05, suffix: '%' },
      { key: 'years', label: 'Investment period', defaultValue: 20, min: 1, max: 40, step: 1, suffix: 'years' },
    ],
  },
  {
    slug: 'home-loan-emi',
    title: 'Home Loan EMI Calculator',
    description: 'Calculate monthly EMI, total interest, and total repayment on a home loan.',
    seoDescription: 'Calculate home loan EMI, total interest payable, and total repayment using loan amount, interest rate, and tenure.',
    keywords: ['home loan EMI calculator', 'home loan calculator India', 'housing loan EMI calculator'],
    fields: [
      { key: 'principal', label: 'Loan amount', defaultValue: 3000000, min: 100000, max: 100000000, step: 10000, suffix: '₹' },
      { key: 'rate', label: 'Annual interest rate', defaultValue: 8.5, min: 1, max: 20, step: 0.1, suffix: '%' },
      { key: 'years', label: 'Loan tenure', defaultValue: 20, min: 1, max: 40, step: 1, suffix: 'years' },
    ],
  },
]

export const calculatorBySlug = Object.fromEntries(
  calculators.map((calculator) => [calculator.slug, calculator]),
) as Record<string, CalculatorDefinition>
