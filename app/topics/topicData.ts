export type TopicDefinition = {
  slug: string
  name: string
  description: string
  longDescription: string
  keywords: string[]
  terms: string[]
}

export const topics: TopicDefinition[] = [
  {
    slug: 'finance',
    name: 'Personal Finance',
    description: 'Practical guides about saving, budgeting, investing, debt, and building long-term financial confidence.',
    longDescription: 'Personal finance is the foundation of financial wellbeing. It covers the everyday decisions that shape your financial future: how you earn, spend, save, invest, and protect your money. In the Indian context, this means navigating salary structures, understanding tax implications, building emergency funds, managing loans and credit cards, and making informed investment choices that align with your goals. Good personal finance habits — consistent saving, mindful spending, adequate insurance, and disciplined investing — compound over time to create financial security and freedom. This topic brings together guides that help you master these fundamentals, whether you are starting your first job, planning for a major life event, or looking to optimize your existing financial plan.',
    keywords: ['personal finance India', 'money management', 'financial planning'],
    terms: ['finance', 'money', 'wealth', 'salary', 'saving', 'budget', 'financial', 'rich'],
  },
  {
    slug: 'mutual-funds',
    name: 'Mutual Funds and SIPs',
    description: 'Understand SIPs, mutual funds, lumpsum investing, gold funds, and long-term compounding.',
    longDescription: 'Mutual funds are one of the most accessible ways for Indian investors to participate in financial markets. They pool money from many investors to buy a diversified portfolio of stocks, bonds, or other securities, managed by professional fund managers. Systematic Investment Plans (SIPs) make investing disciplined and automatic by investing a fixed amount regularly, which helps average out market volatility through rupee-cost averaging. This topic covers everything from choosing the right fund category — equity, debt, hybrid, index, or gold — to understanding expense ratios, exit loads, taxation, and how to build a goal-based portfolio. Whether you are a first-time investor or looking to refine your strategy, these guides help you make informed decisions about mutual fund investing in India.',
    keywords: ['mutual funds India', 'SIP investing', 'mutual fund education'],
    terms: ['mutual fund', 'sip', 'fund', 'dividend', 'gold etf', 'investing'],
  },
  {
    slug: 'retirement',
    name: 'Retirement Planning',
    description: 'Plan for retirement with practical guidance on pensions, retirement corpus, and long-term income.',
    longDescription: 'Retirement planning is about ensuring you can maintain your lifestyle and dignity after you stop working. In India, this involves understanding the layered retirement ecosystem: mandatory schemes like EPF (Employees\' Provident Fund) and voluntary options like NPS (National Pension System), PPF (Public Provident Fund), and mutual fund-based retirement funds. The key is estimating your future expenses adjusted for inflation, determining the corpus needed to generate sustainable income, and building that corpus through disciplined investing over decades. Starting early lets compounding do the heavy lifting, but it is never too late to begin. This topic covers corpus estimation, withdrawal strategies, annuity options, tax efficiency, and how to coordinate multiple retirement vehicles into a cohesive plan that lasts through your golden years.',
    keywords: ['retirement planning India', 'retirement corpus', 'pension planning'],
    terms: ['retirement', 'pension', 'epf', 'nps', 'financial freedom'],
  },
  {
    slug: 'loans',
    name: 'Loans and Debt',
    description: 'Clear explanations of loans, EMIs, debt management, prepayment, and borrowing decisions.',
    longDescription: 'Borrowing is a tool that can build assets or become a trap — the difference lies in understanding the terms and managing repayment. This topic demystifies the loan landscape in India: home loans, personal loans, education loans, vehicle loans, and credit cards. You will learn how EMIs are calculated under reducing-balance method, the impact of interest rates and tenure on total interest paid, when prepayment makes sense versus investing the surplus, and how to compare loan offers beyond the headline rate. We also cover debt management strategies like the avalanche and snowball methods, debt consolidation, and how to protect your credit score. The goal is to help you borrow wisely, repay efficiently, and avoid the stress of unmanageable debt.',
    keywords: ['loan advice India', 'debt management', 'EMI planning'],
    terms: ['loan', 'debt', 'emi', 'interest', 'credit', 'prepayment'],
  },
  {
    slug: 'tax',
    name: 'Tax and Compliance',
    description: 'Practical tax and filing explainers for Indian readers, with links to verify current rules.',
    longDescription: 'Tax planning is not about evasion — it is about understanding the rules so you keep more of what you earn legally. India\'s tax system offers multiple regimes, deductions, and exemptions that can significantly reduce your tax liability when used correctly. This topic covers income tax slabs under both old and new regimes, Section 80C, 80D, and other key deductions, capital gains taxation on equity, debt, and property, TDS compliance, ITR filing procedures, and common pitfalls to avoid. We also address tax implications of investments like mutual funds, ESOPs, rental income, and foreign assets. Since tax rules change with every budget, each guide includes links to official sources so you can verify the current position before acting. The aim is to make tax compliance straightforward and help you make tax-efficient financial decisions year-round.',
    keywords: ['income tax India', 'ITR filing', 'tax planning basics'],
    terms: ['tax', 'itr', 'income tax', 'capital gains'],
  },
  {
    slug: 'government-schemes',
    name: 'Government Schemes',
    description: 'Educational guides to Indian government savings, pension, and social security schemes.',
    longDescription: 'The Indian government runs numerous savings, insurance, and pension schemes designed to provide financial security across income levels. These include small savings schemes (PPF, NSC, SCSS, Sukanya Samriddhi, Mahila Samman Savings Certificate), pension schemes (APY, NPS, PM-SYM), insurance schemes (PMJJBY, PMSBY), and targeted programs for farmers, workers, and vulnerable groups. Each scheme has specific eligibility, contribution limits, interest rates, tax treatment, and withdrawal rules that change periodically. This topic provides clear, structured explainers on how each scheme works, who should consider it, how to enroll, and how it fits into your overall financial plan. We focus on the practical details — documents needed, online and offline processes, nominee rules, and where to find official updates — so you can take advantage of these schemes confidently.',
    keywords: ['government schemes India', 'pension schemes', 'government savings schemes'],
    terms: ['government', 'yojana', 'scheme', 'pradhan mantri', 'shram'],
  },
]

export const topicBySlug = Object.fromEntries(topics.map((topic) => [topic.slug, topic])) as Record<string, TopicDefinition>
