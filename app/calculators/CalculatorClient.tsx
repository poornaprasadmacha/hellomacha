'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { FiArrowRight, FiGrid, FiInfo, FiAlertTriangle, FiHelpCircle } from 'react-icons/fi'
import type { CalculatorDefinition } from './calculatorData'

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
      return 'A home loan is likely your largest financial commitment. A ₹50 lakh loan at 8.5% for 20 years costs ~₹1.04 crore total — ₹54 lakh in interest alone. Reducing tenure to 15 years raises EMI by ~₹8,000 but saves ~₹22 lakh in interest. Prepaying ₹5 lakh in year 5 saves ~₹18 lakh and cuts 4 years. This calculator quantifies these trade-offs so you can decide: prepay vs invest, shorter vs longer tenure, float vs fix.'
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
        'Enter the loan amount.',
        'Enter the annual interest rate your lender offers.',
        'Choose the tenure — prefer the shortest you can comfortably afford.',
        'Read the EMI and total interest, and compare total repayment with the principal.',
        'Model a prepayment by reducing the tenure, not just the EMI, to save the most interest.',
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
