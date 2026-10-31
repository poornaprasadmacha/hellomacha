'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { FiArrowRight, FiGrid, FiInfo, FiAlertTriangle, FiHelpCircle, FiTrendingUp, FiRefreshCw, FiClock, FiTarget, FiMinus, FiDollarSign, FiThermometer, FiActivity, FiShield, FiUsers, FiBriefcase, FiHome, FiPercent, FiCreditCard, FiZap, FiPieChart } from 'react-icons/fi'
import { MdOutlineSchool, MdCompareArrows, MdStore, MdDirectionsCar } from 'react-icons/md'
import type { CalculatorDefinition } from './calculatorData'

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  TrendingUp: FiTrendingUp,
  RefreshCw: FiRefreshCw,
  Clock: FiClock,
  Target: FiTarget,
  Minus: FiMinus,
  DollarSign: FiDollarSign,
  Thermometer: FiThermometer,
  Activity: FiActivity,
  Shield: FiShield,
  Users: FiUsers,
  Briefcase: FiBriefcase,
  Home: FiHome,
  Percent: FiPercent,
  CreditCard: FiCreditCard,
  Zap: FiZap,
  PieChart: FiPieChart,
  OutlineSchool: MdOutlineSchool,
  CompareArrows: MdCompareArrows,
  Store: MdStore,
  DirectionsCar: MdDirectionsCar,
}

function monthlyFutureValue(monthly: number, annualRate: number, years: number) {
  const months = years * 12
  const monthlyRate = annualRate / 12 / 100
  if (monthlyRate === 0) return monthly * months
  return monthly * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate))
}

function formatCurrency(value: number) {
  return `₹${formatIndianNumber(value)}`
}

function formatIndianNumber(value: number) {
  return Math.max(0, Math.round(value)).toLocaleString('en-IN')
}

function calculateEmi(principal: number, annualRate: number, years: number) {
  const monthlyRate = annualRate / 12 / 100
  const months = years * 12
  if (monthlyRate === 0) return principal / months
  return principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1)
}

function getMinimum(field: CalculatorDefinition['fields'][number]) {
  return field.suffix === '₹' || field.suffix === '%' ? 0 : field.min
}

function clampValue(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value))
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
      return 'Uses the employee and employer contributions entered by the user with monthly compounding. This is a simplified estimate: actual EPF balances depend on eligible wages, EPS allocation, contribution rules, interest declarations, and employment history.'
    case 'home-loan-emi':
      return 'Uses the standard reducing-balance EMI formula. It excludes processing fees, insurance, floating-rate changes, taxes, prepayments, and other lender charges.'
    case 'mortgage-calculator':
      return 'Subtracts the down payment from the property price to get the loan principal, then applies the standard reducing-balance EMI formula. It excludes stamp duty, registration, insurance, processing fees, and other charges.'
    case 'house-affordability':
      return 'Calculates the maximum loan amount from monthly income minus expenses using the EMI formula in reverse, then adds your down payment to get the maximum affordable home price. It assumes all income minus expenses is available for EMI.'
    case 'debt-to-income':
      return 'Divides total monthly debt payments by monthly gross income and multiplies by 100. Lenders typically prefer DTI below 40%; higher ratios reduce loan eligibility.'
    case 'down-payment':
      return 'Multiplies the house price by the down payment percentage to get the required down payment, then divides by monthly savings to estimate months needed to save.'
    case 'rent-vs-buy':
      return 'Compares total rent paid over the period against the net cost of buying (EMI payments plus maintenance minus home price appreciation). A positive result means buying costs more; negative means buying is cheaper.'
    case 'auto-loan-emi':
      return 'Subtracts the down payment from the on-road car price to get the loan principal, then applies the standard reducing-balance EMI formula. It excludes insurance, registration, processing fees, and other charges.'
    case 'net-worth':
      return 'Sums all assets (cash, investments, property, other) and subtracts all liabilities (home loan, other loans, credit card dues) to calculate net worth.'
    case 'bond-yield':
      return 'Current yield is the annual coupon payment divided by the market price. Yield to maturity also accounts for the difference between market price and face value amortized over years to maturity.'
    case 'compound-interest':
      return 'Uses the compound interest formula A = P(1 + r/n)^(nt), where P is principal, r is annual rate, n is compounding frequency per year, and t is years.'
    case 'present-value':
      return 'Discounts a future sum back to today using PV = FV / (1 + r)^t, where FV is future value, r is the discount rate, and t is years.'
    case 'annuity-payout':
      return 'Uses the annuity payment formula PMT = PV × r / (1 - (1 + r)^-n), where PV is the corpus, r is the monthly rate, and n is total months.'
    case 'apr-calculator':
      return 'Calculates the effective annual percentage rate by comparing total repayment (including fees embedded in the loan) against the principal over the loan tenure.'
    default:
      return 'This estimate uses the inputs shown above and does not account for taxes, fees, or changes in market conditions.'
  }
}

function getWhyThisMatters(slug: string) {
  switch (slug) {
    case 'sip':
      return 'SIPs automate investing and remove timing risk. By investing a fixed amount regularly, you buy more units when prices are low and fewer when prices are high — this rupee-cost averaging smooths your entry price over market cycles. The real power appears over 10+ years when compounding accelerates: the later years contribute disproportionately to the final corpus. Starting a ₹5,000 SIP at 25 vs 35 can mean a difference of ₹1.5–2 crore at 60, assuming 12% returns.'
    case 'step-up-sip':
      return 'Most salaries grow 8–12% annually. A step-up SIP mirrors this by increasing your investment each year. A ₹5,000 SIP with 10% annual step-up for 20 years at 12% return builds ~₹1.1 crore vs ~₹50 lakh without step-up — more than double. This is the single highest-impact lever for salaried investors: it aligns investing with income growth without requiring lump-sum decisions.'
    case 'delay-cost':
      return 'Time is the most expensive variable in investing. Delaying a ₹10,000 monthly SIP by just 5 years (20 vs 25 year horizon) at 12% costs ~₹65 lakh in final corpus — far more than the ₹6 lakh you "saved" by not investing those 5 years. The cost of delay is not the missed contributions; it is the missed compounding on those contributions. This calculator makes that invisible cost visible.'
    case 'target-amount':
      return 'Goal-based investing starts with the destination. Whether it is a house down payment (₹50L in 5 years), child education (₹1Cr in 15 years), or retirement (₹5Cr in 25 years), knowing the required monthly SIP turns a wish into a plan. If the required SIP exceeds your capacity, you can adjust the goal (extend timeline, reduce target), increase income, or accept higher risk — all informed choices rather than guesses.'
    case 'child-education':
      return 'Education inflation in India runs 10–12% annually — double the general inflation rate. A ₹10 lakh course today costs ₹31 lakh in 12 years at 10% inflation. Most parents underestimate this and start too late with too little. This calculator forces you to confront the future cost today, so you can start a right-sized SIP early when the monthly amount is manageable.'
    case 'retirement':
      return 'Retirement is the longest and most expensive goal. You may spend 25–30 years in retirement with no active income, facing medical inflation of 10–12%. The 4% withdrawal rule suggests you need 25× annual expenses as corpus. For ₹1 lakh/month today, that is ~₹7.5 crore in 20 years at 6% inflation. Starting at 30 vs 40 changes the required SIP from ~₹12,000 to ~₹45,000/month. This calculator shows the true cost of waiting.'
    case 'swp':
      return 'Systematic Withdrawal Plans (SWP) are the most tax-efficient way to draw income from mutual funds in retirement. Only the gain portion of each withdrawal is taxed (capital gains), not the principal. This calculator helps you stress-test: will ₹50,000/month from a ₹1 crore corpus last 20 years at 8% return? (Answer: ~17 years). It reveals the gap between hope and math so you can plan corpus size or withdrawal rate realistically.'
    case 'fixed-monthly-withdrawal':
      return 'This answers: "If I have ₹X today, how much can I safely withdraw monthly for Y years?" It is the reverse of the SIP calculator. Use it for retirement income planning, legacy planning, or evaluating annuity offers. The key insight: sustainable withdrawal rates are lower than most people assume — 3–4% of corpus annually is a common safe range for 25–30 year horizons.'
    case 'lumpsum':
      return 'Lumpsum investing suits windfalls (bonus, inheritance, property sale) or market corrections. The risk: investing a large sum just before a downturn. The mitigation: stagger deployment over 6–12 months (STP — Systematic Transfer Plan) from a liquid fund to an equity fund. This calculator shows the best-case growth if you stay invested; the STP decision manages the entry-risk.'
    case 'inflation':
      return 'Inflation is the silent wealth destroyer. At 6% inflation, ₹1 crore today has the purchasing power of ₹55 lakh in 10 years and ₹31 lakh in 20 years. This is why "safe" fixed deposits at 7% post-tax (~4.9%) lose purchasing power. This calculator makes inflation tangible — use it to stress-test your goals: if education costs inflate at 10%, your ₹50 lakh target in 15 years is actually ₹2.1 crore.'
    case 'cagr':
      return 'CAGR (Compound Annual Growth Rate) is the only honest way to compare investments across different time periods. A fund that doubled in 3 years (26% CAGR) outperformed one that tripled in 10 years (11.6% CAGR). Use this to evaluate mutual fund performance, property returns, or business growth — but remember: past CAGR does not predict future CAGR.'
    case 'fixed-deposit':
      return 'FDs offer capital protection and predictable returns — essential for short-term goals (<3 years) and the debt portion of a portfolio. But post-tax returns (7% → ~4.9% at 30% slab) often trail inflation. Use FDs for: emergency fund, near-term goals, portfolio stability. Do not use for long-term wealth creation. This calculator helps you compare FD maturity against inflation-adjusted targets.'
    case 'ppf':
      return 'PPF is the gold standard for risk-free, tax-free long-term savings in India: EEE (exempt-exempt-exempt), sovereign guarantee, 15-year horizon extendable in 5-year blocks. At 7.1%, ₹1.5 lakh/year for 15 years builds ~₹41 lakh — all tax-free. It is the best 80C instrument for conservative investors. The lock-in enforces discipline; the tax-free compounding rewards it.'
    case 'nps':
      return 'NPS is the only investment offering an additional ₹50,000 deduction over the ₹1.5 lakh 80C limit (u/s 80CCD(1B)). At 30% tax bracket, that is ₹15,000 annual tax saved — effectively a 15% instant return on the first ₹50K. Combined with equity exposure (up to 75% till age 50), it is a powerful retirement vehicle. The catch: 40% annuity purchase at 60, and annuity income is taxable.'
    case 'epf':
      return 'EPF is the foundation of most salaried Indians\' retirement corpus: 12% of basic (matched by employer) earning ~8.25% tax-free. VPF (Voluntary PF) lets you contribute up to 100% of basic at the same rate — the highest guaranteed, tax-free return available. For a ₹50,000 basic, maxing VPF adds ₹60,000/year at 8.25% tax-free. Over 25 years, that alone builds ~₹4.7 crore. This calculator shows the power of maximizing VPF.'
    case 'home-loan-emi':
      return 'A home loan is likely your largest financial commitment. A ₹50 lakh loan at 8.5% for 20 years costs ~₹1.04 crore total — ₹54 lakh in interest alone. Reducing tenure to 15 years raises EMI by ~₹8,000 but saves ~₹22 lakh in interest.'
    case 'mortgage-calculator':
      return 'A mortgage combines the property price, down payment, and loan terms into one monthly payment. The down payment directly reduces the loan principal and therefore the EMI and total interest — every ₹1 lakh extra down payment saves meaningful interest over 20 years.'
    case 'house-affordability':
      return 'Lenders cap your EMI at a fraction of your income. This calculator shows the maximum home price your income can support before you fall in love with a house you cannot afford. It prevents house-poor situations where the EMI leaves no room for savings or emergencies.'
    case 'debt-to-income':
      return 'Your DTI ratio is one of the first things lenders check. A DTI above 40–50% often means loan rejection or higher interest rates. Knowing your DTI before applying tells you whether to pay down debt first or expect a smaller loan.'
    case 'down-payment':
      return 'A larger down payment reduces the loan, lowers the EMI, cuts total interest, and may get you a better interest rate. This calculator shows exactly how much you need and how long to save, turning a vague goal into a monthly savings target.'
    case 'rent-vs-buy':
      return 'Renting offers flexibility; buying builds equity but adds EMI, maintenance, and transaction costs. The answer depends on how long you stay, price appreciation, and rent growth. This calculator quantifies the trade-off over your actual time horizon.'
    case 'auto-loan-emi':
      return 'Cars depreciate while loans accrue interest. A ₹10 lakh car loan at 9% for 5 years costs ~₹12.4 lakh total — ₹2.4 lakh in interest on a falling asset. A bigger down payment or shorter tenure dramatically cuts the interest cost.'
    case 'net-worth':
      return 'Net worth is the single most important measure of financial health — it tells you where you stand regardless of income. Tracking it annually reveals whether your assets are growing faster than your debts.'
    case 'bond-yield':
      return 'Bond yields move inversely with prices. When market prices fall, yields rise. The current yield tells you the income return today; yield to maturity estimates total return if held to maturity, including price convergence to face value.'
    case 'compound-interest':
      return 'Compound interest is interest on interest. The compounding frequency matters — monthly compounding beats annual at the same nominal rate. Over long periods, compounding dominates the result, which is why starting early beats starting big.'
    case 'present-value':
      return 'A rupee tomorrow is worth less than a rupee today because of inflation and opportunity cost. Present value tells you what a future sum is worth now — essential for comparing lump-sum vs installment offers, insurance payouts, or future goals.'
    case 'annuity-payout':
      return 'An annuity converts a lump-sum corpus into a predictable income stream for a fixed period or life. The payout rate depends on the corpus, expected return, and payout period — this calculator helps you see if an annuity offer is fair.'
    case 'apr-calculator':
      return 'The nominal interest rate hides the true cost of borrowing. Processing fees and other charges effectively raise your rate. APR spreads those fees across the loan tenure to show the effective annual cost — use it to compare loan offers, not just interest rates.'
    default:
      return 'This calculator helps you quantify a specific financial decision. Understanding the numbers behind your choices — whether investing, borrowing, or planning — turns anxiety into action. Use the result as a starting point for deeper research or a conversation with a qualified advisor.'
  }
}

function getCommonMistakes(slug: string) {
  switch (slug) {
    case 'sip':
      return 'Stopping SIPs during market falls — this defeats rupee-cost averaging. Picking funds based on 1-year returns — chasing performance leads to buying high. Ignoring expense ratios — a 1% difference costs 15–20% of corpus over 20 years. Investing in too many funds — 8–10 funds usually means duplication, not diversification. Not reviewing annually — fund strategy drift or life changes may require rebalancing.'
    case 'step-up-sip':
      return 'Setting an unrealistic step-up % (e.g., 20%) that you cannot sustain — a missed step-up breaks the plan. Not linking step-up to actual salary hikes — commit to a percentage of increment (e.g., 50% of hike). Forgetting to increase SIP when you get a bonus — treat bonuses as step-up accelerators. Stopping the step-up after a few years — consistency compounds.'
    case 'delay-cost':
      return 'Waiting for the "right time" to start — the calculator shows there is no right time, only lost time. Investing a lump sum later instead of SIP now — lump sums carry timing risk; SIPs do not. Thinking "I will invest more later to catch up" — later investments have less time to compound; you cannot buy back time.'
    case 'target-amount':
      return 'Using an optimistic return assumption (15%+) — if markets deliver 10%, you fall short. Not accounting for inflation in the target — ₹1 crore in 15 years buys what ₹35 lakh buys today at 7% inflation. Setting a monthly SIP that strains cash flow — unsustainable SIPs get stopped. Not building in a buffer for life events (job loss, health, family).'
    case 'child-education':
      return 'Using general inflation (6%) instead of education inflation (10–12%) — this underestimates the target by 2–3×. Starting when the child is 10+ — the monthly SIP becomes unaffordable. Ignoring the full cost (tuition + hostel + travel + laptop + coaching) — budget ₹30–50 lakh for a good UG program today. Not having a backup plan (education loan, scholarships) if corpus falls short.'
    case 'retirement':
      return 'Underestimating lifespan — plan for 90–95, not 75. Ignoring medical inflation (10–12%) — health costs can become the largest expense. Assuming expenses drop 70–80% in retirement — travel, healthcare, grandchildren often increase them. Counting only EPF/PPF — these alone rarely suffice for urban lifestyles. Not accounting for tax on withdrawals (NPS annuity, debt funds).'
    case 'swp':
      return 'Setting withdrawal rate too high (>6%) — corpus depletes in 12–15 years. Not adjusting withdrawals for inflation — fixed ₹50,000 becomes ₹27,000 purchasing power in 10 years at 6% inflation. Withdrawing from equity funds in a bear market — sequence of returns risk devastates corpus. Better: keep 2–3 years of withdrawals in liquid/debt funds, refill annually.'
    case 'fixed-monthly-withdrawal':
      return 'Assuming the withdrawal amount is guaranteed — it depends on returns. Not inflation-indexing the withdrawal — purchasing power erodes. Withdrawing from a single asset class — diversification across equity, debt, gold, and cash buckets extends corpus life. Ignoring taxes — SWP from equity funds (LTCG 12.5% >₹1.25L) is more tax-efficient than interest income (slab rate).'
    case 'lumpsum':
      return 'Investing the entire amount at a market peak — use STP (Systematic Transfer Plan) over 6–12 months from a liquid fund. Expecting linear returns — equity returns are lumpy; 0% for 3 years then 40% in 1 year is normal. Not having a goal tag — "investing for long term" without a purpose leads to panic selling. Ignoring exit loads and tax on redemption if money is needed early.'
    case 'inflation':
      return 'Using RBI\'s headline CPI (4–6%) for personal planning — your personal inflation (rent, school fees, healthcare, lifestyle) is often 8–10%. Assuming salaries keep pace with inflation — real wage growth in India has been near zero for years. Not inflation-adjusting all long-term goals — a ₹2 crore retirement corpus at 6% inflation is only ₹1.1 crore in today\'s money after 10 years.'
    case 'cagr':
      return 'Comparing CAGR across different periods — a 5-year CAGR cannot be compared to a 10-year CAGR directly. Using CAGR for SIPs — XIRR is the correct metric for irregular cash flows. Ignoring volatility — two funds with 12% CAGR can have very different risk profiles (max drawdown, Sharpe ratio). Assuming past CAGR predicts future returns — mean reversion is powerful.'
    case 'fixed-deposit':
      return 'Locking large sums in long-term FDs — you lose liquidity and miss rate hikes. Ladder FDs (1yr, 2yr, 3yr...) instead. Ignoring post-tax returns — 7% FD = 4.9% post-tax (30% slab) = negative real return at 6% inflation. Not using the ₹50,000 senior citizen exemption (Section 80TTB) for parents\' FDs. Auto-renewal at lower rates — always review at maturity.'
    case 'ppf':
      return 'Not contributing the full ₹1.5L/year — you lose tax-free compounding space forever (cannot carry forward). Depositing after the 5th of the month — interest is calculated on the lowest balance between 5th and month-end; deposit by the 4th. Closing after 15 years instead of extending — extensions in 5-year blocks continue tax-free compounding. Not nominating — nominee claims are simpler than legal heir certificates.'
    case 'nps':
      return 'Choosing "Auto Choice" without understanding the glide path — equity drops to 10% by age 55; you may want more growth. Not using the ₹50K 80CCD(1B) deduction — it is the highest marginal tax-saving investment. Ignoring annuity taxation — 40% corpus must buy an annuity; annuity income is fully taxable at slab rate. Not nominating in both Tier I and Tier II — separate nominations needed.'
    case 'epf':
      return 'Not transferring EPF when changing jobs — multiple accounts complicate tracking and claims. Withdrawing EPF before 5 years — becomes taxable (both contribution and interest). Not checking annual interest credit — employers sometimes delay deposits; interest is lost for those months. Opting out of EPF (if salary >₹15K) — you lose the employer match (12% of basic = 100% instant return). Not nominating — delays claims for family.'
    case 'home-loan-emi':
      return 'Focusing only on EMI fit, not total interest — a 30-year loan costs 2× the principal in interest. Not negotiating the spread — banks often reduce spread by 0.05–0.15% for good credit profiles. Ignoring prepayment charges on fixed-rate loans — floating rate loans have zero prepayment charges (RBI mandate). Not buying term insurance to cover the loan — family loses the home if you are not there. Not modeling rate hikes — a 1% increase on ₹50L adds ~₹3,000/EMI.'
    case 'mortgage-calculator':
      return 'Using the property price instead of loan principal — the EMI applies to price minus down payment, not the full price. Ignoring stamp duty and registration (5–10% of price) — these are upfront, not financed. Not comparing floating vs fixed rates — floating rates can reset upward mid-tenure. Forgeting that a lower down payment may trigger PMI or higher interest.'
    case 'house-affordability':
      return 'Using gross income instead of take-home income — you cannot spend tax and PF deductions on EMI. Not budgeting for maintenance, property tax, insurance, and society charges — these add 1–2% of home value yearly. Assuming income will rise — plan on current income, not hoped-for hikes. Maxing out affordability leaves no buffer for job loss or emergencies.'
    case 'debt-to-income':
      return 'Forgetting to include all debt — credit cards, personal loans, BNPL, and existing EMIs all count. Using net income instead of gross — lenders use gross. Not accounting for the new loan EMI you are applying for — include it in monthly debt. Thinking a high DTI is fine because you pay on time — lenders still cap DTI strictly.'
    case 'down-payment':
      return 'Underestimating the down payment — 20% is typical, but some lenders need more for self-employed or lower credit scores. Forgetting closing costs — stamp duty, registration, legal, and brokerage can add 5–8% beyond the down payment. Not keeping an emergency fund separate — do not drain all savings into the down payment.'
    case 'rent-vs-buy':
      return 'Ignoring transaction costs — buying and selling costs 4–7% each way, which erodes buying advantage in short horizons. Assuming 6–8% appreciation every year — prices can be flat or fall for years. Comparing only EMI vs rent — buying adds maintenance, property tax, insurance, and opportunity cost of the down payment. Not factoring how long you stay — buying wins only over 7–10+ years typically.'
    case 'auto-loan-emi':
      return 'Financing the on-road price including insurance and registration — these should be paid upfront, not borrowed at 9%. Extending tenure to lower EMI — a 7-year loan costs far more interest than 5 years. Not comparing dealer financing with bank or credit union rates — dealer rates are often higher. Rolling negative equity from an old car into a new loan — this compounds debt quickly.'
    case 'net-worth':
      return 'Overvaluing property — use realistic market value, not purchase price or aspiration. Forgetting liabilities — credit cards and personal loans count fully. Not updating annually — net worth is only useful if tracked consistently. Including lifestyle assets (cars, electronics) at full value — they depreciate fast.'
    case 'bond-yield':
      return 'Confusing current yield with yield to maturity — current yield ignores capital gain/loss at maturity. Not accounting for credit risk — a high yield on a corporate bond may mean default risk. Ignoring interest rate risk — if you sell before maturity, rising rates lower the bond price. Not checking coupon frequency — some bonds pay semi-annually, changing effective yield.'
    case 'compound-interest':
      return 'Assuming the nominal rate equals the effective rate — monthly compounding at 8% is 8.3% effective, not 8%. Ignoring inflation — an 8% nominal return at 6% inflation is only 2% real. Not accounting for taxes on interest — FD interest is taxed at slab rate, reducing effective return. Using inconsistent compounding frequencies when comparing products.'
    case 'present-value':
      return 'Using the wrong discount rate — this should be your opportunity cost or required return, not inflation. Ignoring risk — a risky future sum should be discounted at a higher rate than a safe one. Not comparing present values of alternatives — PV only makes sense when comparing options. Forgetting that PV is sensitive to small rate changes over long periods.'
    case 'annuity-payout':
      return 'Not realizing annuity income is taxable — unlike PPF/EPF, annuity payouts are taxed at slab rate. Assuming the payout is guaranteed for life — most annuities have a fixed period or joint-life option. Ignoring inflation — a fixed ₹50,000 payout loses half its purchasing power in 12 years at 6% inflation. Not comparing with SWP from mutual funds, which may be more tax-efficient.'
    case 'apr-calculator':
      return 'Comparing APR across different tenures — a 3-year loan at 14% APR and a 5-year loan at 12% APR are not directly comparable; total cost differs. Ignoring that APR assumes you keep the loan to full tenure — prepaying changes the effective cost. Not including all fees — processing, documentation, insurance, and prepayment charges all affect true cost. Using APR alone — also compare total repayment and EMI affordability.'
    default:
      return 'Using the calculator once and forgetting it — financial planning is iterative; revisit when income, expenses, goals, or market conditions change. Treating the output as a guarantee — it is an estimate based on assumptions. Not consulting a qualified advisor for large, irreversible decisions (home purchase, retirement corpus withdrawal, large lump-sum deployment).'
  }
}

function getStepByStep(slug: string) {
  switch (slug) {
    case 'sip':
      return [
        'Enter the monthly amount you can commit to — start with what you can sustain, not what you wish you could save.',
        'Set the expected annual return. Use 10–12% for diversified equity funds and lower figures for debt or hybrid funds.',
        'Choose the investment period in years, then check how the estimate changes as you extend it.',
        'Read the result: the estimated value, the total invested, and the growth between them.',
        'Adjust one input at a time to see how a higher monthly amount or a longer period changes the outcome.',
      ]
    case 'step-up-sip':
      return [
        'Enter the monthly SIP you can start with today.',
        'Set the annual step-up to match your expected salary growth — 8–10% is typical for salaried employees.',
        'Enter the expected annual return and the total investment period.',
        'Compare the result with a flat SIP of the same starting amount to see exactly what the step-up adds.',
        'Revisit the step-up percentage whenever your income changes so the plan stays realistic.',
      ]
    case 'delay-cost':
      return [
        'Enter the monthly SIP you are considering.',
        'Set the expected annual return and the total investment period.',
        'Enter how many years you would delay starting.',
        'Read the potential cost of delay — the gap between starting today and starting later.',
        'Change the delay to 1, 3, and 5 years to see how each year of waiting compounds.',
      ]
    case 'target-amount':
      return [
        'Enter the target amount you need and when you need it.',
        'Set a realistic expected annual return for the fund category you plan to use.',
        'Read the required monthly SIP.',
        'If the SIP is too high, extend the timeline, reduce the target, or revisit the return assumption — in that order.',
        'Re-check the calculation every year and after every income change.',
      ]
    case 'child-education':
      return [
        'Enter the education cost today, including tuition, hostel, books, and travel.',
        'Set education inflation — 10% is a prudent planning figure in India.',
        'Enter the years until the education begins and the expected annual return.',
        'Read the future cost and the required monthly SIP side by side.',
        'Review the plan every two years, since courses, costs, and goals change.',
      ]
    case 'retirement':
      return [
        'Enter your current monthly expense — what you spend now, not what you earn.',
        'Set the expected inflation and the years until you plan to retire.',
        'Set the expected annual return on your investments.',
        'Read the estimated retirement corpus and the required monthly SIP.',
        'Stress-test the plan with higher inflation or lower returns to see the worst case.',
      ]
    case 'swp':
      return [
        'Enter the corpus you have accumulated at the start of withdrawals.',
        'Set the monthly withdrawal you need.',
        'Enter the expected annual return and the withdrawal period.',
        'Read the estimated remaining corpus — a negative result means the withdrawal is unsustainable.',
        'Lower the withdrawal or shorten the period until the corpus survives the full horizon.',
      ]
    case 'fixed-monthly-withdrawal':
      return [
        'Enter the lump-sum corpus you have today.',
        'Set the expected annual return for the portfolio.',
        'Choose the withdrawal period in years.',
        'Read the estimated sustainable monthly withdrawal.',
        'Compare it with your actual monthly need — the gap is your planning shortfall.',
      ]
    case 'sip-emi':
      return [
        'Enter the monthly amount you are deciding between investing and paying as an EMI.',
        'Set the expected annual return and the investment period.',
        'Compare the estimated SIP value with the total you would pay as EMIs over the same months.',
        'If the EMI funds an asset like a home, weigh its appreciation separately before deciding.',
        'Use the gap to choose between prepaying the loan or investing the surplus.',
      ]
    case 'lumpsum':
      return [
        'Enter the one-time amount you can invest.',
        'Set a realistic expected annual return for the asset class.',
        'Choose the investment period in years.',
        'Read the estimated value and the estimated gain.',
        'If markets are at historic highs, consider staggering the entry over 6–12 months through an STP from a liquid fund.',
      ]
    case 'inflation':
      return [
        'Enter the amount you are planning for, in current prices.',
        'Set the inflation rate that applies to your goal — 6–7% general, 10–12% for education and healthcare.',
        'Choose the time period in years.',
        'Read the future cost equivalent — what that amount will cost later.',
        'Feed the inflated target into your goal-based calculators so your SIP matches future prices.',
      ]
    case 'cagr':
      return [
        'Enter the initial value of the investment.',
        'Enter the final value.',
        'Enter the holding period in years.',
        'Read the annualized growth rate — the only fair way to compare different investments.',
        'Compare the CAGR against your target return, but remember past CAGR does not predict future returns.',
      ]
    case 'fixed-deposit':
      return [
        'Enter the deposit amount.',
        'Enter the annual interest rate the bank offers.',
        'Choose the tenure in years.',
        'Read the maturity value and estimated interest, computed with quarterly compounding.',
        'Compare the post-tax return with inflation before locking money in.',
      ]
    case 'ppf':
      return [
        'Enter your annual PPF contribution, up to the ₹1.5 lakh limit.',
        'Enter the current PPF interest rate, which the government revises quarterly.',
        'Choose the investment period — the minimum is 15 years.',
        'Read the maturity estimate and your total contributions.',
        'Plan to extend the account in 5-year blocks after year 15 to keep compounding tax-free.',
      ]
    case 'nps':
      return [
        'Enter your monthly NPS contribution.',
        'Set the expected annual return — 10–12% for equity-heavy allocation, 7–8% for conservative portfolios.',
        'Choose the period until age 60.',
        'Read the estimated corpus, remembering 40% must buy an annuity at exit.',
        'Claim the additional ₹50,000 deduction under Section 80CCD(1B) when you file taxes.',
      ]
    case 'epf':
      return [
        'Enter your monthly employee contribution — 12% of basic salary is standard.',
        'Enter the matching employer contribution.',
        'Enter the current EPF interest rate, declared annually.',
        'Choose the years until retirement.',
        'Check whether VPF could raise your tax-free corpus at the same guaranteed rate.',
      ]
    case 'home-loan-emi':
      return [
        'Enter the loan amount you need.',
        'Enter the annual interest rate your lender offers.',
        'Choose the tenure — prefer the shortest you can comfortably afford.',
        'Read the EMI and total interest, and compare total repayment with the principal.',
        'Model a prepayment by reducing the tenure, not just the EMI, to save the most interest.',
      ]
    case 'mortgage-calculator':
      return [
        'Enter the property price you are considering.',
        'Enter the down payment you can afford upfront.',
        'Enter the annual interest rate and choose the loan tenure.',
        'Read the monthly mortgage payment and total interest.',
        'Try a larger down payment or shorter tenure to see how much interest you save.',
      ]
    case 'house-affordability':
      return [
        'Enter your monthly take-home income.',
        'Enter monthly expenses excluding rent (you will not pay rent after buying).',
        'Enter the down payment you have available.',
        'Enter the expected home loan rate and tenure.',
        'Read the maximum affordable home price — stay below this, not at it.',
      ]
    case 'debt-to-income':
      return [
        'Enter your monthly gross income before tax and deductions.',
        'Enter all monthly debt payments — EMIs, credit card minimums, personal loans.',
        'Read your DTI percentage.',
        'If DTI is above 40%, pay down smaller debts first before applying for a new loan.',
        'Re-check after any income change or debt payoff.',
      ]
    case 'down-payment':
      return [
        'Enter the house price you are targeting.',
        'Enter the down payment percentage (typically 10–20%).',
        'Enter how much you can save each month.',
        'Read the required down payment and months needed to save.',
        'If the timeline is too long, consider a lower-priced home or a higher monthly savings rate.',
      ]
    case 'rent-vs-buy':
      return [
        'Enter the monthly rent you currently pay or would pay.',
        'Enter the home price and down payment you can afford.',
        'Enter the home loan rate and comparison period.',
        'Set expected home price appreciation and annual maintenance.',
        'Read the net difference — negative means buying is cheaper over the period.',
      ]
    case 'auto-loan-emi':
      return [
        'Enter the on-road car price.',
        'Enter the down payment you will pay upfront.',
        'Enter the annual interest rate and choose the loan tenure.',
        'Read the monthly EMI and total interest.',
        'Prefer a tenure of 3–5 years; longer tenures cost significantly more in interest.',
      ]
    case 'net-worth':
      return [
        'Enter cash, savings, and bank balances.',
        'Enter investment values — mutual funds, stocks, PPF, EPF, NPS.',
        'Enter the current market value of any property.',
        'Enter other assets (gold, jewelry, vehicle at resale value).',
        'Enter liabilities — home loan, car loan, personal loan, credit card dues.',
        'Read your net worth: assets minus liabilities.',
      ]
    case 'bond-yield':
      return [
        'Enter the face value of the bond (typically ₹1,000).',
        'Enter the annual coupon rate the bond pays.',
        'Enter the current market price (may be above or below face value).',
        'Enter years remaining until maturity.',
        'Read the current yield — annual coupon divided by market price.',
      ]
    case 'compound-interest':
      return [
        'Enter the principal amount you are investing.',
        'Enter the annual interest rate.',
        'Choose the compounding frequency — monthly (12) is typical for most products.',
        'Enter the investment period in years.',
        'Read the maturity value and total interest earned.',
      ]
    case 'present-value':
      return [
        'Enter the future sum you expect to receive.',
        'Enter the discount rate — your opportunity cost or required return.',
        'Enter the number of years until you receive it.',
        'Read the present value — what that future sum is worth today.',
        'Compare present values when choosing between receiving money now vs later.',
      ]
    case 'annuity-payout':
      return [
        'Enter the corpus you have available to annuitize.',
        'Enter the expected annual return on the corpus during payout.',
        'Enter the payout period in years.',
        'Read the estimated monthly payout.',
        'Compare with annuity quotes from insurers — check if their rate is competitive.',
      ]
    case 'apr-calculator':
      return [
        'Enter the loan amount you need.',
        'Enter the nominal interest rate quoted by the lender.',
        'Enter all processing fees and upfront charges.',
        'Enter the loan tenure in years.',
        'Read the effective APR — use it to compare loan offers across lenders.',
      ]
    default:
      return [
        'Enter the values shown in the input panel.',
        'Adjust one variable at a time to see how the result responds.',
        'Read the estimate in the result panel, including the secondary detail.',
        'Compare two or three scenarios before deciding.',
        'Revisit the calculation when your income, goals, or market conditions change.',
      ]
  }
}

function getRealLifeExample(slug: string) {
  switch (slug) {
    case 'sip':
      return 'Meera, 28, invests ₹8,000 a month in an index fund expecting 12% a year. Over 20 years she invests ₹19.2 lakh and the estimate shows about ₹79.9 lakh. Extending the same SIP to 25 years grows it to roughly ₹1.52 crore — the final five years add nearly twice the value of the first twenty.'
    case 'step-up-sip':
      return 'Arjun starts a ₹10,000 SIP at 30 and increases it 10% every year, expecting 12% returns. In 20 years he invests about ₹68.7 lakh and the estimate shows roughly ₹3.5 crore. A flat ₹10,000 SIP over the same period would reach only about ₹1 crore — the annual step-ups nearly triple the outcome.'
    case 'delay-cost':
      return 'Kavita plans a ₹12,000 monthly SIP for 25 years at 12%. Starting today, the estimate is about ₹2.28 crore. Waiting 5 years cuts it to roughly ₹1.20 crore — a ₹1.08 crore cost for delaying ₹7.2 lakh of contributions. The lost compounding, not the missed installments, is what hurts.'
    case 'target-amount':
      return 'Nina needs ₹50 lakh in 10 years for her education fund and expects 12% annual returns. The calculator shows a required SIP of about ₹21,500 a month. Extending the horizon to 12 years lowers the monthly SIP to roughly ₹15,500, making the plan easier to sustain.'
    case 'child-education':
      return 'A good engineering course costs about ₹15 lakh today. At 10% education inflation, it will cost roughly ₹42.8 lakh when a newborn needs it in 11 years. Starting a SIP now at 12% expected return means investing about ₹15,600 a month; waiting 5 years raises the required SIP to nearly ₹70,000.'
    case 'retirement':
      return 'Atul, 35, spends ₹60,000 a month and plans to retire in 25 years. At 6% inflation, that expense becomes about ₹2.58 lakh a month, needing a corpus of roughly ₹7.7 crore. At 12% expected return, the required SIP is about ₹40,700 a month — waiting 5 years to start raises it to around ₹1.03 lakh.'
    case 'swp':
      return 'Meena retires with ₹1.2 crore and withdraws ₹80,000 a month, expecting 8% returns over 25 years. The estimate leaves about ₹1.2 crore remaining, so the corpus survives. Raising the withdrawal to ₹90,000 leaves only about ₹25 lakh, and ₹1,00,000 a month exhausts the corpus entirely.'
    case 'fixed-monthly-withdrawal':
      return 'Vikram has ₹80 lakh at retirement and expects 7% returns over 20 years. The calculator estimates a sustainable withdrawal of about ₹62,000 a month. If he needs ₹80,000 instead, he would need a corpus closer to ₹1.03 crore for the same period.'
    case 'sip-emi':
      return 'Deepak pays ₹25,000 a month as a personal loan EMI for 5 years — ₹15 lakh in total payments. Investing the same ₹25,000 a month at 12% for 5 years instead would build about ₹20.6 lakh. The gap shows what the debt costs beyond the principal borrowed.'
    case 'lumpsum':
      return 'Aisha receives a ₹5 lakh bonus and invests it as a lumpsum expecting 12% for 15 years. The estimate is about ₹27.4 lakh — a gain of roughly ₹22.4 lakh. If she waited 3 years to invest, the same ₹5 lakh would grow to only about ₹19.5 lakh in the remaining 12 years.'
    case 'inflation':
      return 'A wedding budget of ₹15 lakh today will cost about ₹26.9 lakh in 10 years at 6% inflation — and about ₹38.9 lakh at 10% inflation. Planning for the current amount without adjusting means falling ₹12–24 lakh short of the actual cost.'
    case 'cagr':
      return 'Rahul bought mutual fund units for ₹4 lakh; they are worth ₹9.5 lakh after 6 years. The CAGR works out to about 15.5% a year. Another investment grew from ₹3 lakh to ₹6 lakh in 3 years — a 26% CAGR — but over a shorter, riskier window.'
    case 'fixed-deposit':
      return 'Sanjay deposits ₹10 lakh in a 5-year FD at 7% with quarterly compounding. The maturity estimate is about ₹14.15 lakh — interest of roughly ₹4.15 lakh. At a 30% tax slab, the post-tax gain is about ₹2.9 lakh, barely above 6% inflation.'
    case 'ppf':
      return 'Diya invests ₹1.5 lakh a year in PPF at 7.1% for 15 years. She contributes ₹22.5 lakh in total and the estimate shows about ₹38 lakh at maturity — fully tax-free. Extending for 5 more years grows it to roughly ₹62 lakh.'
    case 'nps':
      return 'Farah, 30, contributes ₹6,000 a month to NPS expecting 10% returns until 60. She contributes ₹21.6 lakh over 30 years and the estimate shows about ₹1.37 crore. After buying a 40% annuity, roughly ₹82 lakh remains withdrawable — and she saves ₹15,000 a year in tax via 80CCD(1B).'
    case 'epf':
      return 'Ravi, 30, contributes ₹7,500 a month and the employer matches it, earning 8.25% for 28 years. Total contributions are ₹50.4 lakh and the estimate shows about ₹1.98 crore — fully tax-free. Opting into VPF to raise his own contribution compounds the corpus further at the same rate.'
    case 'home-loan-emi':
      return 'Anita takes a ₹40 lakh home loan at 8.5% for 20 years. Her EMI is about ₹34,700 and total interest is roughly ₹43.3 lakh — nearly the principal again. Prepaying ₹5 lakh in year 3 could shorten the loan by about 4 years and save around ₹12–13 lakh in interest.'
    case 'mortgage-calculator':
      return 'Rahul is buying a ₹60 lakh home with ₹12 lakh down payment. The loan is ₹48 lakh at 8.5% for 20 years. His monthly payment is about ₹41,600 and total interest is roughly ₹51.9 lakh. Increasing the down payment to ₹18 lakh lowers the loan to ₹42 lakh, cutting the EMI to about ₹36,400 and saving roughly ₹9 lakh in interest.'
    case 'house-affordability':
      return 'Priya earns ₹1.2 lakh monthly and spends ₹45,000 on expenses, leaving ₹75,000 for EMI. With ₹15 lakh down payment, 8.5% rate, and 20-year tenure, she can afford a home priced up to about ₹78 lakh. Looking at ₹90 lakh homes would stretch her EMI beyond sustainable levels.'
    case 'debt-to-income':
      return 'Suresh earns ₹80,000 monthly and pays ₹20,000 in EMIs and credit card minimums. His DTI is 25% — comfortably within lender limits. If he adds a ₹25,000 car loan EMI, DTI rises to 56%, likely making lenders reject the application. Paying off a ₹50,000 personal loan first brings DTI back under 40%.'
    case 'down-payment':
      return 'A ₹75 lakh home needs ₹15 lakh down payment at 20%. Saving ₹25,000 monthly takes 5 years (60 months) to reach the target. Saving ₹40,000 monthly cuts it to about 3 years and 2 months, letting Priya buy sooner and borrow less.'
    case 'rent-vs-buy':
      return 'Renting at ₹25,000/month costs ₹30 lakh over 10 years. Buying a ₹60 lakh home with ₹12 lakh down at 8.5% for 10 years costs about ₹46.5 lakh in EMIs plus ₹3.6 lakh maintenance. If the home appreciates 6% annually, it is worth ₹107 lakh after 10 years — making buying substantially cheaper after accounting for appreciation.'
    case 'auto-loan-emi':
      return 'An 8 lakh on-road car with ₹1.6 lakh down leaves a ₹6.4 lakh loan at 9% for 5 years. The EMI is about ₹13,300 and total repayment is ₹7.98 lakh — ₹1.58 lakh in interest. Choosing a 3-year tenure raises EMI to ₹20,300 but cuts interest to about ₹87,000, saving ₹71,000.'
    case 'net-worth':
      return 'Ravi has ₹2 lakh cash, ₹5 lakh in mutual funds, a ₹30 lakh home, and ₹1 lakh other assets (₹38.1 lakh total assets). Against ₹20 lakh home loan, ₹3 lakh car loan, and ₹50,000 credit card dues (₹23.55 lakh total liabilities), his net worth is about ₹14.55 lakh. Tracking this annually shows whether he is building wealth or just earning and spending.'
    case 'bond-yield':
      return 'A ₹1,000 face value bond with a 7% coupon pays ₹70 annually. If the market price is ₹950, the current yield is about 7.37%. If held to 5-year maturity, the gain from ₹950 to ₹1,000 adds roughly 1% annualized, putting approximate YTM near 8.5%.'
    case 'compound-interest':
      return '₹1 lakh invested at 8% compounded monthly for 10 years grows to about ₹2.22 lakh — interest of ₹1.22 lakh. At annual compounding, it would be ₹2.16 lakh. Monthly compounding adds about ₹6,000 over the decade, showing why frequency matters.'
    case 'present-value':
      return 'You are promised ₹10 lakh in 10 years. At an 8% discount rate, that is worth about ₹4.63 lakh today. If someone offers you ₹5 lakh now instead, taking ₹5 lakh now is better than waiting for ₹10 lakh in 10 years.'
    case 'annuity-payout':
      return 'A ₹1 crore corpus at 7% return over 20 years can pay about ₹77,500 monthly. Over 20 years that is ₹1.86 crore in total payouts. If the annuity company offers only ₹65,000 monthly for the same corpus, their effective return is lower — you would do better managing it yourself or choosing another provider.'
    case 'apr-calculator':
      return 'A ₹5 lakh personal loan at 12% nominal rate for 5 years with ₹10,000 processing fees has a monthly EMI of about ₹11,122 and total repayment of ₹6.67 lakh. The effective APR works out to roughly 13.2% — the fees add over a percentage point to the true cost. A lender offering 12.5% with no fees would be cheaper.'
    default:
      return 'Run the calculator with current numbers, then change one assumption at a time. The difference between two results is the cost or benefit of that single decision — which is exactly what this tool is designed to make visible.'
  }
}

export default function CalculatorClient({ calculator }: { calculator: CalculatorDefinition }) {
  const [values, setValues] = useState<Record<string, number>>(
    Object.fromEntries(calculator.fields.map((field) => [field.key, field.defaultValue])),
  )
  const [draftValues, setDraftValues] = useState<Record<string, string>>({})

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
        const months = years * 12
        const remaining = monthlyRate === 0
          ? value('corpus') - monthly * months
          : value('corpus') * Math.pow(1 + monthlyRate, months) - monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
        primary = remaining
        label = 'Estimated remaining corpus'
        secondary = `Total withdrawals: ${formatCurrency(monthly * years * 12)}`
        break
      }
      case 'fixed-monthly-withdrawal': {
        const monthlyRate = rate / 12 / 100
        const months = years * 12
        primary = monthlyRate === 0
          ? value('corpus') / months
          : value('corpus') / ((1 - Math.pow(1 + monthlyRate, -months)) / monthlyRate)
        label = 'Estimated monthly withdrawal'
        secondary = `Starting corpus: ${formatCurrency(value('corpus'))}`
        break
      }
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
        primary = annualRate === 0
          ? value('annual') * years
          : value('annual') * ((Math.pow(1 + annualRate, years) - 1) / annualRate)
        secondary = `Total contributions: ${formatCurrency(value('annual') * years)}`
        break
      }
      case 'nps':
        primary = monthlyFutureValue(value('monthly'), value('rate'), years)
        secondary = `Total contributions: ${formatCurrency(value('monthly') * years * 12)}`
        break
      case 'epf': {
        const monthlyContribution = value('employeeMonthly') + value('employerMonthly')
        primary = monthlyFutureValue(monthlyContribution, value('rate'), years)
        secondary = `Total contributions: ${formatCurrency(monthlyContribution * years * 12)}`
        break
      }
      case 'home-loan-emi': {
        const emi = calculateEmi(value('principal'), value('rate'), years)
        const totalRepayment = emi * years * 12
        primary = emi
        label = 'Estimated monthly EMI'
        secondary = `Total interest: ${formatCurrency(totalRepayment - value('principal'))}`
        break
      }
      case 'mortgage-calculator': {
        const loanPrincipal = value('principal') - value('downPayment')
        const emi = calculateEmi(loanPrincipal, value('rate'), years)
        const totalRepayment = emi * years * 12
        primary = emi
        label = 'Estimated monthly mortgage payment'
        secondary = `Loan amount: ${formatCurrency(loanPrincipal)} · Total interest: ${formatCurrency(totalRepayment - loanPrincipal)}`
        break
      }
      case 'house-affordability': {
        const monthlyRate = value('rate') / 12 / 100
        const months = years * 12
        const availableForEmi = value('monthlyIncome') - value('monthlyExpenses')
        const maxLoan = monthlyRate === 0
          ? availableForEmi * months
          : availableForEmi / ((1 - Math.pow(1 + monthlyRate, -months)) / monthlyRate)
        const maxHomePrice = maxLoan + value('downPayment')
        primary = maxHomePrice
        label = 'Maximum affordable home price'
        secondary = `Max loan: ${formatCurrency(maxLoan)} · Down payment: ${formatCurrency(value('downPayment'))}`
        break
      }
      case 'debt-to-income': {
        const dti = value('monthlyIncome') > 0
          ? (value('monthlyDebt') / value('monthlyIncome')) * 100
          : 0
        primary = dti
        label = 'Debt-to-income ratio'
        secondary = `Monthly debt: ${formatCurrency(value('monthlyDebt'))} · Monthly income: ${formatCurrency(value('monthlyIncome'))}`
        break
      }
      case 'down-payment': {
        const downPaymentAmount = value('housePrice') * value('downPaymentPercent') / 100
        const monthsToSave = value('monthlySavings') > 0
          ? Math.ceil(downPaymentAmount / value('monthlySavings'))
          : 0
        primary = downPaymentAmount
        label = 'Down payment required'
        secondary = `Months to save at ${formatCurrency(value('monthlySavings'))}/month: ${monthsToSave}`
        break
      }
      case 'rent-vs-buy': {
        const loanPrincipal = value('homePrice') - value('downPayment')
        const monthlyRate = value('rate') / 12 / 100
        const months = years * 12
        const emi = monthlyRate === 0
          ? loanPrincipal / months
          : loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1)
        const totalRent = value('monthlyRent') * months
        const totalLoanPayments = emi * months
        const homeAppreciated = value('homePrice') * Math.pow(1 + value('appreciation') / 100, years)
        const maintenanceTotal = value('homePrice') * (value('maintenance') / 100) * years
        const buyNetCost = totalLoanPayments + maintenanceTotal - (homeAppreciated - value('homePrice'))
        primary = buyNetCost - totalRent
        label = 'Buy vs rent net difference'
        secondary = `Total rent over ${years} years: ${formatCurrency(totalRent)} · Estimated buy net cost: ${formatCurrency(buyNetCost)}`
        break
      }
      case 'auto-loan-emi': {
        const loanPrincipal = value('carPrice') - value('downPayment')
        const emi = calculateEmi(loanPrincipal, value('rate'), years)
        const totalRepayment = emi * years * 12
        primary = emi
        label = 'Estimated monthly EMI'
        secondary = `Loan amount: ${formatCurrency(loanPrincipal)} · Total interest: ${formatCurrency(totalRepayment - loanPrincipal)}`
        break
      }
      case 'net-worth': {
        const totalAssets = value('cash') + value('investments') + value('property') + value('otherAssets')
        const totalLiabilities = value('homeLoan') + value('otherLoans') + value('creditCards')
        primary = totalAssets - totalLiabilities
        label = 'Net worth'
        secondary = `Total assets: ${formatCurrency(totalAssets)} · Total liabilities: ${formatCurrency(totalLiabilities)}`
        break
      }
      case 'bond-yield': {
        const annualCoupon = value('faceValue') * value('couponRate') / 100
        const currentYield = value('marketPrice') > 0 ? (annualCoupon / value('marketPrice')) * 100 : 0
        primary = currentYield
        label = 'Current yield'
        secondary = `Annual coupon: ${formatCurrency(annualCoupon)} · Market price: ${formatCurrency(value('marketPrice'))}`
        break
      }
      case 'compound-interest': {
        const compounding = value('compounding') || 1
        const maturity = value('principal') * Math.pow(1 + value('rate') / 100 / compounding, compounding * years)
        primary = maturity
        label = 'Maturity value'
        secondary = `Interest earned: ${formatCurrency(maturity - value('principal'))}`
        break
      }
      case 'present-value': {
        const pv = value('futureValue') / Math.pow(1 + value('rate') / 100, years)
        primary = pv
        label = 'Present value'
        secondary = `Future value: ${formatCurrency(value('futureValue'))} · Discount rate: ${value('rate')}%`
        break
      }
      case 'annuity-payout': {
        const monthlyRate = value('rate') / 12 / 100
        const months = years * 12
        const payout = monthlyRate === 0
          ? value('corpus') / months
          : value('corpus') * monthlyRate / (1 - Math.pow(1 + monthlyRate, -months))
        primary = payout
        label = 'Estimated monthly payout'
        secondary = `Total payouts over ${years} years: ${formatCurrency(payout * months)}`
        break
      }
      case 'apr-calculator': {
        const monthlyRate = value('interestRate') / 12 / 100
        const months = years * 12
        const emi = monthlyRate === 0
          ? value('loanAmount') / months
          : value('loanAmount') * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1)
        const totalRepayment = emi * months
        const apr = totalRepayment > 0 ? ((totalRepayment - value('loanAmount')) / value('loanAmount')) / years * 100 : 0
        primary = apr
        label = 'Effective APR'
        secondary = `Monthly EMI: ${formatCurrency(emi)} · Total repayment: ${formatCurrency(totalRepayment)}`
        break
      }
      default:
        primary = 0
    }

    return { primary, secondary, label }
  }, [calculator.slug, values])

  const IconComponent = ICON_MAP[calculator.icon] || FiTrendingUp

  return (
    <div className="mx-auto max-w-5xl px-4 py-4 sm:px-5 sm:py-8">
      <nav className="mb-8 text-xs text-[var(--muted)]" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-[var(--brand-red)]">Home</Link>
        <span className="px-2">/</span>
        <Link href="/financial-calculators" className="hover:text-[var(--brand-red)]">Financial Calculators</Link>
        <span className="px-2">/</span>
        <span>{calculator.title}</span>
      </nav>
      <section className="mb-10 border-b border-[var(--line)] pb-8">
        <div className="mb-4 inline-flex items-center gap-2 border border-[var(--brand-red)]/30 bg-[var(--brand-red)]/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--brand-red)]">
          <FiGrid size={14} /> Financial tool
        </div>
        <h1 className="flex items-center gap-3 font-yapa text-3xl font-normal leading-tight text-[var(--ink)] sm:text-5xl">
          <IconComponent size={32} className="text-[var(--brand-red)] shrink-0" />
          {calculator.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)]">{calculator.description}</p>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
        <div className="border border-[var(--line)] bg-white p-6 sm:p-8">
          <div className="space-y-7">
            {calculator.fields.map((field) => {
              const minimum = getMinimum(field)

              return (
                <div key={field.key}>
                  <div className="mb-2 flex items-center justify-between gap-4 text-sm font-medium">
                    <label htmlFor={field.key} className="text-[var(--ink)]">{field.label}</label>
                    <div className="flex items-center gap-2">
                      <input
                        aria-label={`${field.label} value`}
                        type="text"
                        inputMode="decimal"
                        value={draftValues[field.key] ?? (field.suffix === '₹' ? formatIndianNumber(values[field.key]) : String(values[field.key]))}
                        onFocus={() => setDraftValues((current) => ({ ...current, [field.key]: String(values[field.key]) }))}
                        onBlur={() => {
                          const rawValue = draftValues[field.key] ?? String(values[field.key])
                          const parsedValue = Number(rawValue.replace(/,/g, ''))
                          const nextValue = rawValue === '' || rawValue === '.' || !Number.isFinite(parsedValue)
                            ? minimum
                            : clampValue(parsedValue, minimum, field.max)

                          setValues((current) => ({ ...current, [field.key]: nextValue }))
                          setDraftValues((current) => {
                            const next = { ...current }
                            delete next[field.key]
                            return next
                          })
                        }}
                        onChange={(event) => {
                          const nextDraft = event.target.value.replace(/,/g, '')
                          if (!/^\d*\.?\d*$/.test(nextDraft)) return

                          setDraftValues((current) => ({ ...current, [field.key]: nextDraft }))
                          if (nextDraft !== '' && nextDraft !== '.') {
                            const parsedValue = Number(nextDraft)
                            if (Number.isFinite(parsedValue)) {
                              setValues((current) => ({
                                ...current,
                                [field.key]: clampValue(parsedValue, minimum, field.max),
                              }))
                            }
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
                    min={minimum}
                    max={field.max}
                    step={field.step}
                    value={values[field.key]}
                    onChange={(event) => {
                      const nextValue = Number(event.target.value)
                      setValues((current) => ({ ...current, [field.key]: nextValue }))
                      setDraftValues((current) => {
                        const next = { ...current }
                        delete next[field.key]
                        return next
                      })
                    }}
                    className="w-full accent-[var(--brand-red)]"
                  />
                  <div className="mt-1 flex justify-between text-[10px] text-[var(--muted)]">
                    <span>{field.suffix === '₹' ? formatCurrency(minimum) : `${minimum}${field.suffix}`}</span>
                    <span>{field.suffix === '₹' ? formatCurrency(field.max) : `${field.max} ${field.suffix}`}</span>
                  </div>
                </div>
              )
            })}
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
        <h2 className="text-xl font-bold text-[var(--ink)]">Step-by-step guide</h2>
        <ol className="mt-4 space-y-4">
          {getStepByStep(calculator.slug).map((step, index) => (
            <li key={step} className="flex gap-3 text-sm leading-relaxed text-[var(--muted)]">
              <span className="font-mono font-bold text-[var(--brand-red)]">{index + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-8 border border-[var(--line)] bg-white p-6 sm:p-8">
        <h2 className="text-xl font-bold text-[var(--ink)]">Real-life example</h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{getRealLifeExample(calculator.slug)}</p>
      </section>

      <section className="mt-8 border border-[var(--line)] bg-white p-6 sm:p-8">
        <h2 className="text-xl font-bold text-[var(--ink)]">How this calculator works</h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{getMethodology(calculator.slug)}</p>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
          The result is an educational estimate, not a guaranteed return or personal financial recommendation. Review current product documents and consult a qualified advisor before investing.
        </p>
      </section>

      <section className="mt-8 border border-[var(--line)] bg-white p-6 sm:p-8">
        <h2 className="flex items-center gap-2 text-xl font-bold text-[var(--ink)]">
          <FiHelpCircle className="text-[var(--brand-red)]" size={22} /> Why this matters
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{getWhyThisMatters(calculator.slug)}</p>
      </section>

      <section className="mt-8 border border-[var(--line)] bg-white p-6 sm:p-8">
        <h2 className="flex items-center gap-2 text-xl font-bold text-[var(--ink)]">
          <FiAlertTriangle className="text-[var(--brand-red)]" size={22} /> Common mistakes to avoid
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{getCommonMistakes(calculator.slug)}</p>
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
