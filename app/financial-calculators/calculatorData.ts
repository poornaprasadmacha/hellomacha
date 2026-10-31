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
  icon: string
  fields: CalculatorField[]
}

export const calculators: CalculatorDefinition[] = [
  {
    slug: 'sip',
    title: 'SIP Calculator',
    description: 'Estimate the future value of a monthly mutual fund investment.',
    seoDescription: 'Use this free SIP calculator to estimate mutual fund returns, total investment, and future wealth from monthly investments in India.',
    keywords: ['SIP calculator', 'mutual fund SIP calculator', 'SIP return calculator', 'monthly investment calculator', 'SIP calculator India'],
    icon: 'TrendingUp',
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
    icon: 'RefreshCw',
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
    icon: 'Clock',
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
    icon: 'Target',
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
    icon: 'OutlineSchool',
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
    icon: '',
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
    icon: '',
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
    icon: '',
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
    icon: '',
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
    icon: '',
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
    icon: '',
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
    icon: '',
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
    icon: '',
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
    icon: '',
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
    icon: '',
    fields: [
      { key: 'monthly', label: 'Monthly contribution', defaultValue: 5000, min: 500, max: 200000, step: 500, suffix: '₹' },
      { key: 'rate', label: 'Expected annual return', defaultValue: 10, min: 1, max: 20, step: 0.5, suffix: '%' },
      { key: 'years', label: 'Investment period', defaultValue: 20, min: 1, max: 40, step: 1, suffix: 'years' },
    ],
  },
  {
    slug: 'epf',
    title: 'EPF Calculator',
    description: 'Estimate employee provident fund growth from employee and employer monthly contributions.',
    seoDescription: 'Estimate EPF corpus from employee contribution, employer contribution, interest rate, and investment period.',
    keywords: ['EPF calculator', 'EPF balance calculator', 'provident fund calculator India'],
    icon: '',
    fields: [
      { key: 'employeeMonthly', label: 'Monthly employee contribution', defaultValue: 5000, min: 500, max: 200000, step: 500, suffix: '₹' },
      { key: 'employerMonthly', label: 'Monthly employer contribution', defaultValue: 5000, min: 500, max: 200000, step: 500, suffix: '₹' },
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
    icon: '',
    fields: [
      { key: 'principal', label: 'Loan amount', defaultValue: 3000000, min: 100000, max: 100000000, step: 10000, suffix: '₹' },
      { key: 'rate', label: 'Annual interest rate', defaultValue: 8.5, min: 1, max: 20, step: 0.1, suffix: '%' },
      { key: 'years', label: 'Loan tenure', defaultValue: 20, min: 1, max: 40, step: 1, suffix: 'years' },
    ],
  },
  {
    slug: 'mortgage-calculator',
    title: 'Mortgage Calculator',
    description: 'Estimate monthly mortgage payments, total interest, and full repayment cost.',
    seoDescription: 'Free mortgage calculator for India — estimate monthly EMI, total interest, and repayment based on loan amount, interest rate, and tenure.',
    keywords: ['mortgage calculator India', 'mortgage EMI calculator', 'home mortgage calculator', 'mortgage payment calculator'],
    icon: '',
    fields: [
      { key: 'principal', label: 'Property price', defaultValue: 5000000, min: 500000, max: 50000000, step: 50000, suffix: '₹' },
      { key: 'downPayment', label: 'Down payment', defaultValue: 1000000, min: 0, max: 10000000, step: 50000, suffix: '₹' },
      { key: 'rate', label: 'Annual interest rate', defaultValue: 8.5, min: 1, max: 20, step: 0.1, suffix: '%' },
      { key: 'years', label: 'Loan tenure', defaultValue: 20, min: 1, max: 30, step: 1, suffix: 'years' },
    ],
  },
  {
    slug: 'house-affordability',
    title: 'House Affordability Calculator',
    description: 'Find how much house you can afford based on income, expenses, and down payment.',
    seoDescription: 'House affordability calculator India — calculate maximum home price you can afford using monthly income, expenses, down payment, and loan terms.',
    keywords: ['house affordability calculator India', 'how much house can I afford', 'home affordability calculator', 'affordable home price calculator'],
    icon: 'Store',
    fields: [
      { key: 'monthlyIncome', label: 'Monthly income', defaultValue: 100000, min: 10000, max: 1000000, step: 5000, suffix: '₹' },
      { key: 'monthlyExpenses', label: 'Monthly expenses (excluding rent)', defaultValue: 30000, min: 0, max: 500000, step: 1000, suffix: '₹' },
      { key: 'downPayment', label: 'Down payment available', defaultValue: 1000000, min: 0, max: 10000000, step: 50000, suffix: '₹' },
      { key: 'rate', label: 'Expected home loan rate', defaultValue: 8.5, min: 1, max: 20, step: 0.1, suffix: '%' },
      { key: 'years', label: 'Loan tenure', defaultValue: 20, min: 1, max: 30, step: 1, suffix: 'years' },
    ],
  },
  {
    slug: 'debt-to-income',
    title: 'Debt-to-Income Ratio Calculator',
    description: 'Calculate your DTI ratio to understand loan eligibility and financial health.',
    seoDescription: 'Debt-to-income ratio calculator India — find your DTI percentage from monthly income and debt obligations to assess loan eligibility.',
    keywords: ['debt to income ratio calculator India', 'DTI calculator', 'debt income ratio calculator', 'loan eligibility calculator'],
    icon: '',
    fields: [
      { key: 'monthlyIncome', label: 'Monthly gross income', defaultValue: 80000, min: 10000, max: 1000000, step: 1000, suffix: '₹' },
      { key: 'monthlyDebt', label: 'Monthly debt payments (EMIs, credit cards)', defaultValue: 20000, min: 0, max: 500000, step: 500, suffix: '₹' },
    ],
  },
  {
    slug: 'down-payment',
    title: 'Down Payment Calculator',
    description: 'Plan your down payment — how much you need and how long to save.',
    seoDescription: 'Down payment calculator India — calculate required down payment for a home and months needed to save based on monthly savings.',
    keywords: ['down payment calculator India', 'home down payment calculator', 'down payment savings calculator', 'house down payment planner'],
    icon: '',
    fields: [
      { key: 'housePrice', label: 'House price', defaultValue: 5000000, min: 100000, max: 50000000, step: 50000, suffix: '₹' },
      { key: 'downPaymentPercent', label: 'Down payment percentage', defaultValue: 20, min: 0, max: 100, step: 1, suffix: '%' },
      { key: 'monthlySavings', label: 'Monthly savings', defaultValue: 30000, min: 1000, max: 500000, step: 1000, suffix: '₹' },
    ],
  },
  {
    slug: 'rent-vs-buy',
    title: 'Rent vs Buy Calculator',
    description: 'Compare the long-term cost of renting versus buying a home.',
    seoDescription: 'Rent vs buy calculator India — compare total cost of renting vs buying a home over time including EMI, appreciation, and maintenance.',
    keywords: ['rent vs buy calculator India', 'rent or buy house calculator', 'buy vs rent calculator', 'housing decision calculator'],
    icon: 'CompareArrows',
    fields: [
      { key: 'monthlyRent', label: 'Monthly rent', defaultValue: 20000, min: 1000, max: 200000, step: 500, suffix: '₹' },
      { key: 'homePrice', label: 'Home price', defaultValue: 5000000, min: 500000, max: 50000000, step: 50000, suffix: '₹' },
      { key: 'downPayment', label: 'Down payment', defaultValue: 1000000, min: 0, max: 10000000, step: 50000, suffix: '₹' },
      { key: 'rate', label: 'Home loan rate', defaultValue: 8.5, min: 1, max: 20, step: 0.1, suffix: '%' },
      { key: 'years', label: 'Comparison period (years)', defaultValue: 10, min: 1, max: 30, step: 1, suffix: 'years' },
      { key: 'appreciation', label: 'Annual home price appreciation', defaultValue: 6, min: 0, max: 15, step: 0.5, suffix: '%' },
      { key: 'maintenance', label: 'Annual maintenance (% of home price)', defaultValue: 1, min: 0, max: 5, step: 0.1, suffix: '%' },
    ],
  },
  {
    slug: 'auto-loan-emi',
    title: 'Auto Loan Calculator',
    description: 'Calculate car loan EMI, total interest, and full repayment cost.',
    seoDescription: 'Auto loan EMI calculator India — calculate monthly car loan EMI, total interest, and repayment based on loan amount, interest rate, and tenure.',
    keywords: ['auto loan calculator India', 'car loan EMI calculator', 'vehicle loan calculator', 'car finance calculator'],
    icon: 'DirectionsCar',
    fields: [
      { key: 'carPrice', label: 'Car price (on-road)', defaultValue: 800000, min: 200000, max: 5000000, step: 25000, suffix: '₹' },
      { key: 'downPayment', label: 'Down payment', defaultValue: 160000, min: 0, max: 2000000, step: 25000, suffix: '₹' },
      { key: 'rate', label: 'Annual interest rate', defaultValue: 9, min: 1, max: 20, step: 0.1, suffix: '%' },
      { key: 'years', label: 'Loan tenure', defaultValue: 5, min: 1, max: 7, step: 1, suffix: 'years' },
    ],
  },
  {
    slug: 'net-worth',
    title: 'Net Worth Calculator',
    description: 'Calculate your net worth — total assets minus total liabilities.',
    seoDescription: 'Net worth calculator India — calculate your net worth by summing assets (cash, investments, property) and subtracting liabilities (loans, credit cards).',
    keywords: ['net worth calculator India', 'personal net worth calculator', 'net worth calculator', 'assets liabilities calculator'],
    icon: '',
    fields: [
      { key: 'cash', label: 'Cash & savings', defaultValue: 200000, min: 0, max: 100000000, step: 10000, suffix: '₹' },
      { key: 'investments', label: 'Investments (mutual funds, stocks, PF)', defaultValue: 500000, min: 0, max: 100000000, step: 10000, suffix: '₹' },
      { key: 'property', label: 'Property value', defaultValue: 3000000, min: 0, max: 50000000, step: 50000, suffix: '₹' },
      { key: 'otherAssets', label: 'Other assets', defaultValue: 100000, min: 0, max: 10000000, step: 10000, suffix: '₹' },
      { key: 'homeLoan', label: 'Home loan outstanding', defaultValue: 2000000, min: 0, max: 50000000, step: 10000, suffix: '₹' },
      { key: 'otherLoans', label: 'Other loans (car, personal)', defaultValue: 300000, min: 0, max: 10000000, step: 10000, suffix: '₹' },
      { key: 'creditCards', label: 'Credit card dues', defaultValue: 50000, min: 0, max: 1000000, step: 5000, suffix: '₹' },
    ],
  },
  {
    slug: 'bond-yield',
    title: 'Bond Yield Calculator',
    description: 'Calculate current yield and approximate yield to maturity for a bond.',
    seoDescription: 'Bond yield calculator India — calculate current yield and yield to maturity from face value, coupon rate, market price, and years to maturity.',
    keywords: ['bond yield calculator India', 'bond calculator', 'current yield calculator', 'yield to maturity calculator'],
    icon: '',
    fields: [
      { key: 'faceValue', label: 'Face value', defaultValue: 1000, min: 100, max: 1000000, step: 100, suffix: '₹' },
      { key: 'couponRate', label: 'Annual coupon rate', defaultValue: 7, min: 0.1, max: 20, step: 0.1, suffix: '%' },
      { key: 'marketPrice', label: 'Market price', defaultValue: 950, min: 100, max: 1000000, step: 100, suffix: '₹' },
      { key: 'years', label: 'Years to maturity', defaultValue: 5, min: 1, max: 30, step: 1, suffix: 'years' },
    ],
  },
  {
    slug: 'compound-interest',
    title: 'Compound Interest Calculator',
    description: 'See how compound interest grows your money over time with different compounding frequencies.',
    seoDescription: 'Compound interest calculator India — calculate future value and interest earned using principal, rate, compounding frequency, and time.',
    keywords: ['compound interest calculator India', 'compound interest calculator', 'CI calculator', 'compound interest formula calculator'],
    icon: '',
    fields: [
      { key: 'principal', label: 'Principal amount', defaultValue: 100000, min: 1000, max: 100000000, step: 1000, suffix: '₹' },
      { key: 'rate', label: 'Annual interest rate', defaultValue: 8, min: 0.1, max: 30, step: 0.1, suffix: '%' },
      { key: 'compounding', label: 'Compounding frequency', defaultValue: 12, min: 1, max: 365, step: 1, suffix: 'times/year' },
      { key: 'years', label: 'Time period', defaultValue: 10, min: 1, max: 40, step: 1, suffix: 'years' },
    ],
  },
  {
    slug: 'present-value',
    title: 'Present Value Calculator',
    description: 'Calculate what a future sum is worth in today\'s money.',
    seoDescription: 'Present value calculator India — calculate the present value of a future sum using discount rate and time period.',
    keywords: ['present value calculator India', 'PV calculator', 'present value formula calculator', 'discounted value calculator'],
    icon: '',
    fields: [
      { key: 'futureValue', label: 'Future value needed', defaultValue: 1000000, min: 1000, max: 100000000, step: 10000, suffix: '₹' },
      { key: 'rate', label: 'Discount rate (annual)', defaultValue: 8, min: 0.1, max: 30, step: 0.1, suffix: '%' },
      { key: 'years', label: 'Time period', defaultValue: 10, min: 1, max: 40, step: 1, suffix: 'years' },
    ],
  },
  {
    slug: 'annuity-payout',
    title: 'Annuity Payout Calculator',
    description: 'Calculate regular payouts from a corpus over a fixed period.',
    seoDescription: 'Annuity payout calculator India — calculate regular monthly or annual payouts from a retirement corpus over a chosen period.',
    keywords: ['annuity payout calculator India', 'annuity calculator', 'retirement payout calculator', 'corpus withdrawal calculator'],
    icon: '',
    fields: [
      { key: 'corpus', label: 'Corpus amount', defaultValue: 10000000, min: 100000, max: 100000000, step: 10000, suffix: '₹' },
      { key: 'rate', label: 'Annual return rate', defaultValue: 7, min: 0.1, max: 20, step: 0.1, suffix: '%' },
      { key: 'years', label: 'Payout period', defaultValue: 20, min: 1, max: 40, step: 1, suffix: 'years' },
    ],
  },
  {
    slug: 'apr-calculator',
    title: 'APR Calculator',
    description: 'Calculate the effective annual percentage rate including fees and charges.',
    seoDescription: 'APR calculator India — calculate effective annual percentage rate including processing fees and other loan charges.',
    keywords: ['APR calculator India', 'annual percentage rate calculator', 'effective interest rate calculator', 'loan APR calculator'],
    icon: '',
    fields: [
      { key: 'loanAmount', label: 'Loan amount', defaultValue: 500000, min: 10000, max: 100000000, step: 10000, suffix: '₹' },
      { key: 'interestRate', label: 'Nominal interest rate', defaultValue: 12, min: 0.1, max: 30, step: 0.1, suffix: '%' },
      { key: 'fees', label: 'Processing fees & charges', defaultValue: 10000, min: 0, max: 500000, step: 1000, suffix: '₹' },
      { key: 'years', label: 'Loan tenure', defaultValue: 5, min: 1, max: 30, step: 1, suffix: 'years' },
    ],
  },
]

export const calculatorBySlug = Object.fromEntries(
  calculators.map((calculator) => [calculator.slug, calculator]),
) as Record<string, CalculatorDefinition>

