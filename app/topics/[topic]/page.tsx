import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { topicBySlug, topics } from '../topicData'

export const dynamic = 'force-static'
export const dynamicParams = false

export function generateStaticParams() {
  return topics.map(({ slug }) => ({ topic: slug }))
}

function getTopicArticles(terms: string[]) {
  const directory = path.join(process.cwd(), 'content/articles')
  if (!fs.existsSync(directory)) return []

  return fs.readdirSync(directory)
    .filter((file) => /\.mdx?$/i.test(file))
    .map((file) => {
      const { data } = matter(fs.readFileSync(path.join(directory, file), 'utf8'))
      const searchable = [
        file,
        data.title,
        data.description,
        ...(Array.isArray(data.seoKeywords) ? data.seoKeywords : []),
      ].join(' ').toLowerCase()
      return {
        slug: file.replace(/\.mdx?$/i, ''),
        title: data.title || file,
        description: data.description || 'Read this practical HelloMacha guide.',
        date: data.date || '',
        matches: terms.some((term) => searchable.includes(term)),
      }
    })
    .filter((article) => article.matches)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }): Promise<Metadata> {
  const { topic } = await params
  const definition = topicBySlug[topic]
  if (!definition) return {}
  return {
    title: `${definition.name} | HelloMacha`,
    description: definition.description,
    keywords: definition.keywords,
    alternates: { canonical: `https://hellomacha.com/topics/${topic}` },
    openGraph: {
      title: `${definition.name} | HelloMacha`,
      description: definition.description,
      url: `https://hellomacha.com/topics/${topic}`,
      siteName: 'HelloMacha',
      type: 'website',
      locale: 'en_IN',
      images: [{ url: 'https://hellomacha.com/og-image.svg', width: 1200, height: 630, alt: `${definition.name} | HelloMacha` }],
    },
  }
}

export default async function TopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params
  const definition = topicBySlug[topic]
  if (!definition) notFound()
  const articles = getTopicArticles(definition.terms)

  const keyConcepts: Record<string, { title: string; description: string }[]> = {
    finance: [
      { title: 'Budgeting & Expense Tracking', description: 'Build a realistic budget using the 50/30/20 rule or zero-based budgeting. Track every rupee to identify leaks and redirect money toward goals.' },
      { title: 'Emergency Fund', description: 'Save 6–12 months of essential expenses in a liquid, accessible account. This buffer protects you from income shocks and prevents high-interest debt.' },
      { title: 'Insurance First', description: 'Buy adequate term life insurance (10–15× annual income) and comprehensive health cover before investing. Insurance protects your wealth-building journey.' },
      { title: 'Goal-Based Investing', description: 'Match each financial goal (house, education, retirement) to the right asset class and time horizon. Avoid one-size-fits-all approaches.' },
      { title: 'Tax-Efficient Planning', description: 'Use deductions (80C, 80D, NPS), choose tax-efficient instruments, and understand capital gains rules to keep more of your returns.' },
      { title: 'Debt Management', description: 'Prioritize high-interest debt repayment. Use the avalanche method (highest rate first) or snowball method (smallest balance first) based on what keeps you motivated.' },
    ],
    'mutual-funds': [
      { title: 'Fund Categories', description: 'Equity funds for growth, debt funds for stability, hybrid funds for balance, index funds for low-cost market tracking, and gold funds for diversification.' },
      { title: 'SIP vs Lumpsum', description: 'SIPs average purchase prices over time (rupee-cost averaging). Lumpsums suit windfalls or market corrections. Both have a place in a disciplined plan.' },
      { title: 'Expense Ratio & Exit Load', description: 'Lower expense ratios mean more of your money stays invested. Exit loads penalize early redemption — check both before investing.' },
      { title: 'Taxation', description: 'Equity funds: STCG 20% (<1 year), LTCG 12.5% (>1 year, above ₹1.25L). Debt funds: taxed at slab rate regardless of holding period (post-April 2023).' },
      { title: 'Portfolio Construction', description: 'Core-satellite approach: broad market index funds as core, sectoral/thematic funds as satellites. Rebalance annually to maintain target allocation.' },
      { title: 'Fund Selection', description: 'Look beyond past returns. Evaluate consistency, risk-adjusted metrics (Sharpe, Sortino), fund manager tenure, AUM, and portfolio quality.' },
    ],
    retirement: [
      { title: 'Retirement Corpus Estimation', description: 'Estimate annual expenses in retirement × 25–30 (4% withdrawal rule) or use the expense × 12 × years method adjusted for inflation.' },
      { title: 'EPF & VPF', description: 'Mandatory 12% of basic salary (employee + employer). VPF allows additional voluntary contributions up to 100% of basic, earning the same tax-free interest.' },
      { title: 'NPS (National Pension System)', description: 'Market-linked pension with equity, corporate bond, and government security options. Tier I has tax benefits; Tier II offers liquidity. 60% withdrawal at 60, 40% annuity.' },
      { title: 'PPF (Public Provident Fund)', description: '15-year sovereign-backed scheme with tax-free interest (currently 7.1%). Extendable in 5-year blocks. Max ₹1.5L/year under 80C.' },
      { title: 'Withdrawal Strategy', description: 'Sequence of withdrawals matters: taxable buckets first (debt funds, FDs), then tax-free (PPF, equity LTCG), preserving tax-advantaged accounts longest.' },
      { title: 'Inflation & Longevity Risk', description: 'Plan for 25–30 years post-retirement. Medical inflation (10–12%) outpaces general inflation. Maintain equity exposure even in retirement for growth.' },
    ],
    loans: [
      { title: 'Reducing Balance EMI', description: 'Interest calculated on outstanding principal only. Each EMI reduces principal, so interest portion decreases over time. Standard for home, auto, personal loans.' },
      { title: 'Prepayment Mathematics', description: 'Prepaying high-rate debt (credit cards, personal loans) guarantees a risk-free return equal to the interest rate. For home loans, compare prepayment vs. investing surplus.' },
      { title: 'Credit Score Impact', description: 'Payment history (35%), credit utilization (30%), credit age (15%), mix (10%), inquiries (10%). Keep utilization below 30%, never miss payments.' },
      { title: 'Loan Comparison', description: 'Compare APR (Annual Percentage Rate), not just interest rate. Include processing fees, prepayment charges, insurance, and floating vs. fixed rate terms.' },
      { title: 'Debt-to-Income Ratio', description: 'Keep total EMI obligations below 40–50% of net monthly income. Higher ratios risk default and limit future borrowing capacity.' },
      { title: 'Debt Consolidation', description: 'Combine multiple high-interest debts into one lower-rate loan. Simplifies repayment but address the root cause (overspending) to avoid recurrence.' },
    ],
    tax: [
      { title: 'Old vs New Tax Regime', description: 'New regime: lower rates, fewer deductions. Old regime: higher rates, 70+ deductions/exemptions. Choose annually (salaried) or once (business income).' },
      { title: 'Section 80C Basket', description: '₹1.5L limit covering EPF, PPF, ELSS, life insurance, NSC, SCSS, 5-year FD, home loan principal, tuition fees. Prioritize by returns, lock-in, and tax treatment.' },
      { title: 'Capital Gains Framework', description: 'Equity: STCG 20% (<12 months), LTCG 12.5% (>12 months, ₹1.25L exempt). Debt/Property: STCG at slab, LTCG 20% with indexation (property) or 12.5% without (debt post-2023).' },
      { title: 'TDS & Advance Tax', description: 'TDS deducted at source on salary, interest, rent, professional fees. Advance tax due in 4 installments (Jun 15, Sep 15, Dec 15, Mar 15) if liability > ₹10K.' },
      { title: 'ITR Forms & Filing', description: 'ITR-1 (salary < ₹50L), ITR-2 (capital gains, >1 house), ITR-3 (business/profession), ITR-4 (presumptive). File by July 31; belated by Dec 31 with penalty.' },
      { title: 'Tax Planning Year-Round', description: 'Invest early in FY for compounding. Harvest tax losses. Track 80D (health insurance), 80E (education loan), 80G (donations), 24(b) (home loan interest).' },
    ],
    'government-schemes': [
      { title: 'Small Savings Schemes', description: 'PPF (15 yr, 7.1%, EEE), NSC (5 yr, 7.7%, taxable interest), SCSS (5 yr, 8.2%, senior citizens), SSY (21 yr, 8.2%, girl child), MSSC (2 yr, 7.5%, women).' },
      { title: 'Pension Schemes', description: 'APY (guaranteed pension ₹1K–₹5K for unorganized sector), PM-SYM (₹3K pension for unorganized workers), NPS (market-linked, all citizens).' },
      { title: 'Insurance Schemes', description: 'PMJJBY (₹2L life cover @ ₹436/yr), PMSBY (₹2L accident cover @ ₹20/yr). Low-cost social security for 18–50/70 age groups.' },
      { title: 'Targeted Welfare Schemes', description: 'PM-KISAN (₹6K/yr for farmers), PMJDY (zero-balance accounts, RuPay insurance), PM-SVANidhi (street vendor loans), PMAY (housing subsidy).' },
      { title: 'Enrollment & KYC', description: 'Most schemes available online (banks, post offices, CSC, UMANG app). Aadhaar + PAN + bank account typically required. Nominee registration is critical.' },
      { title: 'Rate Revisions & Updates', description: 'Small savings rates reviewed quarterly. Scheme rules change via gazette notifications. Track official sources: nsiindia.gov.in, pfrda.org.in, respective ministry portals.' },
    ],
  }

  const commonQuestions: Record<string, { question: string; answer: string }[]> = {
    finance: [
      { question: 'How much should I save each month?', answer: 'Aim for at least 20% of net income. Start with whatever you can — even 5–10% — and increase by 1–2% every year or with each raise. The habit matters more than the amount initially.' },
      { question: 'Should I pay off debt or invest first?', answer: 'High-interest debt (credit cards, personal loans >12%) should be cleared first — it guarantees a risk-free return. For low-interest debt (home loan ~8–9%), investing surplus in equity (expected 11–12%+) often wins mathematically, but peace of mind has value too.' },
      { question: 'How big should my emergency fund be?', answer: '6–12 months of essential expenses (rent, food, utilities, EMIs, insurance, school fees). Keep it in a savings account, sweep-in FD, or liquid fund — accessible within 24 hours without penalty.' },
      { question: 'Do I need a financial advisor?', answer: 'For simple situations (single income, standard goals), DIY with index funds and term insurance works. For complex needs (business income, estate planning, foreign assets, high net worth), a SEBI-registered investment advisor (RIA) adds value. Avoid commission-based "advisors" selling products.' },
    ],
    'mutual-funds': [
      { question: 'What is the minimum amount to start a SIP?', answer: 'Most fund houses allow SIPs from ₹500/month. Some micro-SIP platforms go as low as ₹100. The key is consistency — ₹500 monthly for 20 years at 12% builds ~₹50L.' },
      { question: 'Direct vs Regular plans — which should I choose?', answer: 'Direct plans have lower expense ratios (no distributor commission), earning you 0.5–1.5% more annually. Over 20 years, this can mean 15–25% higher corpus. Buy direct via AMC websites, MF Central, or platforms like Coin, Kuvera, Groww.' },
      { question: 'How many mutual funds do I need?', answer: '3–5 funds are sufficient for most: a broad market index fund (Nifty 500 / Total Market), a mid/small-cap fund for alpha, a debt fund for stability, and optionally an international fund. More funds often mean duplication, not diversification.' },
      { question: 'When should I exit a mutual fund?', answer: 'Exit for goal completion, fundamental strategy change, persistent underperformance vs. benchmark (3+ years), or portfolio rebalancing. Avoid exiting due to short-term volatility — equity funds need 5–7+ year horizons.' },
    ],
    retirement: [
      { question: 'What is the 4% withdrawal rule?', answer: 'Withdraw 4% of your corpus in year one, then adjust annually for inflation. Historically, this sustained a 30-year retirement in US markets. In India, with higher inflation and different return profiles, 3–3.5% may be safer for a 25–30 year horizon.' },
      { question: 'EPF or NPS — which is better?', answer: 'They serve different purposes. EPF: guaranteed, tax-free, mandatory for salaried, low volatility. NPS: market-linked, additional tax deduction (₹50K u/s 80CCD(1B)), flexible allocation, partial withdrawal rules. Do both — max EPF/VPF first, then NPS for the extra deduction.' },
      { question: 'How do I calculate my retirement corpus?', answer: 'Step 1: Estimate monthly expenses today. Step 2: Inflate by expected inflation (6–7%) for years until retirement. Step 3: Multiply annual expense by 25–30 (for 4–3.3% withdrawal rate). Step 4: Calculate SIP needed to reach that corpus at expected return (10–12% equity).' },
      { question: 'Can I retire early (FIRE)?', answer: 'Yes, but it requires 50–70% savings rate, very low expenses, and a larger corpus (35–40× annual expenses) to fund 40+ years. Sequence of returns risk is higher. Most Indian FIRE aspirants aim for "Barista FIRE" — partial work for meaning and health insurance.' },
    ],
    loans: [
      { question: 'Is it better to take a shorter or longer loan tenure?', answer: 'Shorter tenure = higher EMI, much lower total interest. Longer tenure = lower EMI, higher total interest, better cash flow. Choose the shortest tenure you can comfortably afford. If cash flow is tight, take longer tenure but prepay aggressively when possible.' },
      { question: 'Should I prepay my home loan or invest?', answer: 'Compare: home loan rate (8–9%) vs. expected equity return (11–12%+). Mathematically, investing often wins. But prepayment guarantees a risk-free return, reduces stress, and frees cash flow. A balanced approach: prepay enough to keep EMI <30% of income, invest the rest.' },
      { question: 'What is a good credit score for a home loan?', answer: '750+ gets the best rates. 700–750 is acceptable but may cost 0.1–0.25% more. Below 700 limits options and increases rates significantly. Check your score 6 months before applying and fix errors.' },
      { question: 'How does a floating rate home loan work?', answer: 'Rate = Repo rate (or MCLR) + spread. When RBI changes repo rate, your EMI or tenure adjusts (usually tenure). Current loans are linked to external benchmark (repo). Ask your bank for the reset frequency and spread history.' },
    ],
    tax: [
      { question: 'Which tax regime should I choose for FY 2024-25?', answer: 'New regime is default. Compare: calculate tax under both. New regime favors income >₹15L with few deductions. Old regime favors those using 80C (₹1.5L), 80D (₹25K–₹50K), HRA, LTA, home loan interest (₹2L), NPS (₹50K). Salaried can switch annually; business income can switch once.' },
      { question: 'How are mutual fund gains taxed?', answer: 'Equity-oriented (>65% equity): STCG 20% (<12 months), LTCG 12.5% (>12 months, ₹1.25L exempt/yr). Debt-oriented (<65% equity): taxed at slab rate regardless of holding period (post-April 2023). Hybrid funds: check equity % in portfolio.' },
      { question: 'Can I claim HRA if I live with parents?', answer: 'Yes, if you pay rent to parents, they declare it as rental income, and you have rent receipts + rental agreement. Parents can claim standard deduction (30%) and property tax deduction on that income. Both parties benefit if parents are in lower tax bracket.' },
      { question: 'What happens if I miss the ITR filing deadline?', answer: 'Belated return by Dec 31: ₹5,000 penalty (₹1,000 if income <₹5L). After Dec 31: cannot file (except updated return u/s 139(8A) within 24 months with 25–50% additional tax). Interest u/s 234A/B/C applies on unpaid tax. Losses (except house property) cannot be carried forward.' },
    ],
    'government-schemes': [
      { question: 'Can I have both PPF and NPS?', answer: 'Yes. PPF (EEE, 15-yr, 7.1%) and NPS (market-linked, Tier I tax benefits) complement each other. PPF gives guaranteed tax-free corpus; NPS gives equity exposure and additional ₹50K deduction u/s 80CCD(1B). Max both for optimal tax efficiency.' },
      { question: 'Who can open a Sukanya Samriddhi account?', answer: 'Parents/legal guardians of a girl child below 10 years. Max two accounts per family (exceptions for twins/triplets). Minimum ₹250/yr, max ₹1.5L/yr. Matures at 21 years or marriage after 18. Partial withdrawal (50%) allowed for education after 18.' },
      { question: 'Are government scheme returns guaranteed?', answer: 'Small savings schemes (PPF, NSC, SCSS, SSY) have government-guaranteed returns, revised quarterly. NPS returns are market-linked (not guaranteed). Insurance schemes (PMJJBY, PMSBY) provide fixed cover. Always verify current rates on official portals before committing.' },
      { question: 'How do I check my EPF balance?', answer: 'Via UAN portal (unifiedportal-mem.epfindia.gov.in), UMANG app, missed call to 9966044425 from registered mobile, or SMS "EPFOHO UAN ENG" to 7738299899. Passbook shows monthly contributions, interest, and employer details.' },
    ],
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-5 sm:py-12">
      <nav className="mb-8 text-xs text-[var(--muted)]" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-[var(--brand-red)]">Home</Link> <span className="px-2">/</span> {definition.name}
      </nav>
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--brand-red)]">HelloMacha topic</p>
      <h1 className="mt-3 font-yapa text-4xl font-normal text-[var(--ink)] sm:text-6xl">{definition.name}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">{definition.description}</p>

      <section className="mt-10 border border-[var(--line)] bg-white p-6 sm:p-8">
        <h2 className="text-xl font-bold text-[var(--ink)]">What this topic covers</h2>
        <div className="mt-4 prose prose-sm max-w-none text-[var(--muted)]">
          <p>{definition.longDescription}</p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-5 text-2xl font-bold text-[var(--ink)]">Key concepts</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {keyConcepts[topic]?.map((concept, idx) => (
            <article key={idx} className="border border-[var(--line)] bg-white p-5">
              <h3 className="font-semibold text-[var(--ink)]">{concept.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{concept.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 border border-[var(--line)] bg-white p-6 sm:p-8">
        <h2 className="text-xl font-bold text-[var(--ink)]">Common questions</h2>
        <div className="mt-5 space-y-5 text-sm leading-relaxed text-[var(--muted)]">
          {commonQuestions[topic]?.map((faq, idx) => (
            <div key={idx}>
              <h3 className="font-semibold text-[var(--ink)]">{faq.question}</h3>
              <p className="mt-1">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-5 text-2xl font-bold text-[var(--ink)]">Latest guides</h2>
        {articles.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {articles.map((article) => (
              <article key={article.slug} className="border border-[var(--line)] bg-white p-5">
                <p className="text-xs text-[var(--muted)]">{article.date}</p>
                <h3 className="mt-2 text-xl font-bold text-[var(--ink)]">
                  <Link href={`/${article.slug}`} className="hover:text-[var(--brand-red)]">{article.title}</Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{article.description}</p>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-[var(--muted)]">New guides for this topic are coming soon.</p>
        )}
      </section>

      <section className="mt-12 border-t border-[var(--line)] pt-8">
        <h2 className="mb-5 text-2xl font-bold text-[var(--ink)]">Explore related topics</h2>
        <div className="flex flex-wrap gap-3">
          {topics.filter((t) => t.slug !== topic).map((t) => (
            <Link key={t.slug} href={`/topics/${t.slug}`} className="rounded-lg border border-[var(--line)] bg-white px-4 py-2.5 text-sm font-medium text-[var(--ink)] hover:border-[var(--brand-red)] hover:text-[var(--brand-red)]">
              {t.name}
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}