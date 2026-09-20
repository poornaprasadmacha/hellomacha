export type TopicDefinition = {
  slug: string
  name: string
  description: string
  keywords: string[]
  terms: string[]
}

export const topics: TopicDefinition[] = [
  {
    slug: 'finance',
    name: 'Personal Finance',
    description: 'Practical guides about saving, budgeting, investing, debt, and building long-term financial confidence.',
    keywords: ['personal finance India', 'money management', 'financial planning'],
    terms: ['finance', 'money', 'wealth', 'salary', 'saving', 'budget', 'financial', 'rich'],
  },
  {
    slug: 'mutual-funds',
    name: 'Mutual Funds and SIPs',
    description: 'Understand SIPs, mutual funds, lumpsum investing, gold funds, and long-term compounding.',
    keywords: ['mutual funds India', 'SIP investing', 'mutual fund education'],
    terms: ['mutual fund', 'sip', 'fund', 'dividend', 'gold etf', 'investing'],
  },
  {
    slug: 'retirement',
    name: 'Retirement Planning',
    description: 'Plan for retirement with practical guidance on pensions, retirement corpus, and long-term income.',
    keywords: ['retirement planning India', 'retirement corpus', 'pension planning'],
    terms: ['retirement', 'pension', 'epf', 'nps', 'financial freedom'],
  },
  {
    slug: 'loans',
    name: 'Loans and Debt',
    description: 'Clear explanations of loans, EMIs, debt management, prepayment, and borrowing decisions.',
    keywords: ['loan advice India', 'debt management', 'EMI planning'],
    terms: ['loan', 'debt', 'emi', 'interest', 'credit', 'prepayment'],
  },
  {
    slug: 'tax',
    name: 'Tax and Compliance',
    description: 'Practical tax and filing explainers for Indian readers, with links to verify current rules.',
    keywords: ['income tax India', 'ITR filing', 'tax planning basics'],
    terms: ['tax', 'itr', 'income tax', 'capital gains'],
  },
  {
    slug: 'government-schemes',
    name: 'Government Schemes',
    description: 'Educational guides to Indian government savings, pension, and social security schemes.',
    keywords: ['government schemes India', 'pension schemes', 'government savings schemes'],
    terms: ['government', 'yojana', 'scheme', 'pradhan mantri', 'shram'],
  },
]

export const topicBySlug = Object.fromEntries(topics.map((topic) => [topic.slug, topic])) as Record<string, TopicDefinition>
