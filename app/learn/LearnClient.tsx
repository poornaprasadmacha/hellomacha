'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  FiBookOpen,
  FiTrendingUp,
  FiHome,
  FiCpu,
  FiBriefcase,
  FiSearch,
  FiDollarSign,
  FiArrowRight,
  FiCheckCircle,
  FiPieChart,
} from 'react-icons/fi'

export interface ArticleMeta {
  slug: string
  title: string
  thumbnail: string
  date: string
  description: string
  category?: string
}

interface LearnClientProps {
  articles: ArticleMeta[]
}

export default function LearnClient({ articles }: LearnClientProps) {
  // --- SIP Calculator State ---
  const [monthlyInvest, setMonthlyInvest] = useState<number>(5000)
  const [returnRate, setReturnRate] = useState<number>(12)
  const [years, setYears] = useState<number>(10)

  // --- Category & Search State ---
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Calculate SIP returns
  const sipResult = useMemo(() => {
    const P = monthlyInvest
    const i = returnRate / 12 / 100
    const n = years * 12
    if (i === 0) {
      const invested = P * n
      return { invested, returns: 0, total: invested }
    }
    const total = P * (((Math.pow(1 + i, n) - 1) / i) * (1 + i))
    const invested = P * n
    const returns = total - invested
    return {
      invested: Math.round(invested),
      returns: Math.round(returns),
      total: Math.round(total),
    }
  }, [monthlyInvest, returnRate, years])

  // Infer category for each article based on title/slug keywords
  const categorizedArticles = useMemo(() => {
    return articles.map((article) => {
      const text = `${article.slug} ${article.title} ${article.description}`.toLowerCase()
      let cat = 'Finance'
      if (text.includes('laptop') || text.includes('tech') || text.includes('dishwasher') || text.includes('oil')) {
        cat = 'Tech & Lifestyle'
      } else if (text.includes('business') || text.includes('job') || text.includes('pricing') || text.includes('story') || text.includes('vdumpling')) {
        cat = 'Business'
      } else if (text.includes('land') || text.includes('real estate') || text.includes('loan') || text.includes('house')) {
        cat = 'Real Estate'
      }
      return { ...article, category: cat }
    })
  }, [articles])

  // Filter articles based on category and search
  const filteredArticles = useMemo(() => {
    return categorizedArticles.filter((item) => {
      const matchesCat = selectedCategory === 'All' || item.category === selectedCategory
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCat && matchesSearch
    })
  }, [categorizedArticles, selectedCategory, searchQuery])

  const formatCurrency = (val: number) => {
    return '₹' + val.toLocaleString('en-IN')
  }

  const categories = ['All', 'Finance', 'Real Estate', 'Business', 'Tech & Lifestyle']

  return (
    <div className="mx-auto max-w-6xl pt-4 sm:pt-6 pb-16 px-4 sm:px-5">
      {/* --- HERO SECTION --- */}
      <section className="mb-12 border-b border-[#e6e6e6] pb-10">
        <div className="inline-flex items-center gap-2 border border-[var(--brand-red)]/30 bg-[var(--brand-red)]/5 px-3 py-1 text-xs font-semibold text-[var(--brand-red)] mb-4">
          <FiBookOpen size={14} />
          <span>HELLOMACHA KNOWLEDGE HUB</span>
        </div>
        <h1 className="font-yapa font-normal text-3xl sm:text-4xl md:text-5xl text-[var(--ink)] mb-4 leading-tight">
          Learn, Invest & Make Smarter Everyday Choices
        </h1>
        <p className="max-w-2xl text-base sm:text-lg text-[var(--muted)] leading-relaxed">
          Master personal finance, strategic wealth building, home buying, and technology with step-by-step guides and interactive tools.
        </p>
      </section>

      {/* --- CURATED LEARNING PATHWAYS --- */}
      <section className="mb-14">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-[var(--ink)] flex items-center gap-2">
          <FiTrendingUp className="text-[var(--brand-red)]" />
          <span>Featured Learning Pathways</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Pathway 1 */}
          <div className="border border-[#e6e6e6] bg-white p-5 flex flex-col justify-between hover:border-[var(--brand-red)] transition">
            <div>
              <div className="w-10 h-10 bg-[#fdf2f2] text-[var(--brand-red)] flex items-center justify-center mb-4">
                <FiDollarSign size={20} />
              </div>
              <h3 className="font-bold text-lg mb-2 text-[var(--ink)]">Personal Finance</h3>
              <p className="text-xs text-[var(--muted)] leading-relaxed mb-4">
                Master the 5-4-3-2-1 rule, compounding wealth, mutual funds, and smart budgeting.
              </p>
            </div>
            <button
              onClick={() => setSelectedCategory('Finance')}
              className="text-xs font-semibold text-[var(--brand-red)] flex items-center gap-1 hover:underline"
            >
              Explore Finance Guides <FiArrowRight size={12} />
            </button>
          </div>

          {/* Pathway 2 */}
          <div className="border border-[#e6e6e6] bg-white p-5 flex flex-col justify-between hover:border-[var(--brand-red)] transition">
            <div>
              <div className="w-10 h-10 bg-[#fdf2f2] text-[var(--brand-red)] flex items-center justify-center mb-4">
                <FiHome size={20} />
              </div>
              <h3 className="font-bold text-lg mb-2 text-[var(--ink)]">Real Estate & Loans</h3>
              <p className="text-xs text-[var(--muted)] leading-relaxed mb-4">
                Buying land on low salary, interest reduction hacks, and debt strategies.
              </p>
            </div>
            <button
              onClick={() => setSelectedCategory('Real Estate')}
              className="text-xs font-semibold text-[var(--brand-red)] flex items-center gap-1 hover:underline"
            >
              Explore Real Estate <FiArrowRight size={12} />
            </button>
          </div>

          {/* Pathway 3 */}
          <div className="border border-[#e6e6e6] bg-white p-5 flex flex-col justify-between hover:border-[var(--brand-red)] transition">
            <div>
              <div className="w-10 h-10 bg-[#fdf2f2] text-[var(--brand-red)] flex items-center justify-center mb-4">
                <FiBriefcase size={20} />
              </div>
              <h3 className="font-bold text-lg mb-2 text-[var(--ink)]">Business Strategy</h3>
              <p className="text-xs text-[var(--muted)] leading-relaxed mb-4">
                21 powerful business strategies, pricing tactics, and real founder success stories.
              </p>
            </div>
            <button
              onClick={() => setSelectedCategory('Business')}
              className="text-xs font-semibold text-[var(--brand-red)] flex items-center gap-1 hover:underline"
            >
              Explore Business <FiArrowRight size={12} />
            </button>
          </div>

          {/* Pathway 4 */}
          <div className="border border-[#e6e6e6] bg-white p-5 flex flex-col justify-between hover:border-[var(--brand-red)] transition">
            <div>
              <div className="w-10 h-10 bg-[#fdf2f2] text-[var(--brand-red)] flex items-center justify-center mb-4">
                <FiCpu size={20} />
              </div>
              <h3 className="font-bold text-lg mb-2 text-[var(--ink)]">Tech & Smart Buying</h3>
              <p className="text-xs text-[var(--muted)] leading-relaxed mb-4">
                Best laptops under ₹50,000, dishwashers for Indian kitchens, and appliance guides.
              </p>
            </div>
            <button
              onClick={() => setSelectedCategory('Tech & Lifestyle')}
              className="text-xs font-semibold text-[var(--brand-red)] flex items-center gap-1 hover:underline"
            >
              Explore Tech Guides <FiArrowRight size={12} />
            </button>
          </div>
        </div>
      </section>

      {/* --- INTERACTIVE SIP CALCULATOR --- */}
      <section className="mb-14 border border-[#e6e6e6] bg-white p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-[#f0f0f0] pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-red)]">Interactive Financial Tool</span>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--ink)] flex items-center gap-2 mt-1">
              <FiPieChart className="text-[var(--brand-red)]" />
              <span>SIP Investment Growth Calculator</span>
            </h2>
          </div>
          <p className="text-xs text-[var(--muted)] max-w-sm">
            Calculate how monthly SIP investments can build long-term wealth through compounding returns.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Monthly Investment Slider */}
            <div>
              <div className="flex justify-between items-center text-sm font-medium mb-2">
                <label className="text-[var(--ink)]">Monthly Investment</label>
                <span className="font-bold text-[var(--brand-red)] font-mono">{formatCurrency(monthlyInvest)}</span>
              </div>
              <input
                type="range"
                min={500}
                max={100000}
                step={500}
                value={monthlyInvest}
                onChange={(e) => setMonthlyInvest(Number(e.target.value))}
                className="w-full accent-[var(--brand-red)] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[var(--muted)] mt-1">
                <span>₹500</span>
                <span>₹50,000</span>
                <span>₹1,00,000</span>
              </div>
            </div>

            {/* Expected Annual Return % Slider */}
            <div>
              <div className="flex justify-between items-center text-sm font-medium mb-2">
                <label className="text-[var(--ink)]">Expected Return Rate (p.a.)</label>
                <span className="font-bold text-[var(--brand-red)] font-mono">{returnRate}%</span>
              </div>
              <input
                type="range"
                min={1}
                max={30}
                step={0.5}
                value={returnRate}
                onChange={(e) => setReturnRate(Number(e.target.value))}
                className="w-full accent-[var(--brand-red)] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[var(--muted)] mt-1">
                <span>1%</span>
                <span>15%</span>
                <span>30%</span>
              </div>
            </div>

            {/* Investment Duration Slider */}
            <div>
              <div className="flex justify-between items-center text-sm font-medium mb-2">
                <label className="text-[var(--ink)]">Time Horizon</label>
                <span className="font-bold text-[var(--brand-red)] font-mono">{years} Years</span>
              </div>
              <input
                type="range"
                min={1}
                max={30}
                step={1}
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full accent-[var(--brand-red)] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[var(--muted)] mt-1">
                <span>1 Yr</span>
                <span>15 Yrs</span>
                <span>30 Yrs</span>
              </div>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="lg:col-span-5 border border-[#e6e6e6] bg-[#fbfbfb] p-6 text-center sm:text-left flex flex-col justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-4">Investment Summary</h3>

            <div className="space-y-4 mb-6">
              <div>
                <span className="text-xs text-[var(--muted)] block">Total Invested Amount</span>
                <span className="text-xl font-bold font-mono text-[var(--ink)]">{formatCurrency(sipResult.invested)}</span>
              </div>

              <div>
                <span className="text-xs text-[var(--muted)] block">Estimated Wealth Gain</span>
                <span className="text-xl font-bold font-mono text-[#2e7d32]">{formatCurrency(sipResult.returns)}</span>
              </div>

              <div className="border-t border-[#e6e6e6] pt-3">
                <span className="text-xs font-semibold text-[var(--ink)] block">Future Portfolio Value</span>
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[var(--brand-red)]">
                  {formatCurrency(sipResult.total)}
                </span>
              </div>
            </div>

            {/* Visual ratio bar */}
            <div>
              <div className="h-2.5 w-full bg-[#e6e6e6] flex overflow-hidden">
                <div
                  className="h-full bg-[var(--ink)]"
                  style={{ width: `${(sipResult.invested / (sipResult.total || 1)) * 100}%` }}
                />
                <div
                  className="h-full bg-[var(--brand-red)]"
                  style={{ width: `${(sipResult.returns / (sipResult.total || 1)) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-[var(--muted)] mt-2">
                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-[var(--ink)] inline-block" /> Invested ({Math.round((sipResult.invested / (sipResult.total || 1)) * 100)}%)</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-[var(--brand-red)] inline-block" /> Wealth Gain ({Math.round((sipResult.returns / (sipResult.total || 1)) * 100)}%)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ALL GUIDES & SEARCH SECTION --- */}
      <section>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--ink)]">
            Explore All Guides ({filteredArticles.length})
          </h2>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 font-medium transition ${
                  selectedCategory === cat
                    ? 'bg-[var(--brand-red)] text-white font-semibold'
                    : 'bg-white border border-[#e6e6e6] text-[var(--ink)] hover:border-[var(--brand-red)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar Input */}
        <div className="search-pill mb-8 w-full max-w-md">
          <span className="icon"><FiSearch size={16} /></span>
          <input
            type="text"
            placeholder="Search guides by title or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Guides Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <article
                key={article.slug}
                className="border border-[#e6e6e6] bg-white flex flex-col justify-between p-5 hover:border-[var(--brand-red)] transition group"
              >
                <div>
                  {article.thumbnail && (
                    <div className="w-full h-40 overflow-hidden mb-4 bg-gray-100 border border-[#f0f0f0]">
                      <img
                        src={article.thumbnail}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>
                  )}

                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-red)] bg-[#fdf2f2] px-2 py-0.5">
                      {article.category}
                    </span>
                    <span className="text-xs text-[var(--muted)]">{article.date}</span>
                  </div>

                  <h3 className="font-bold text-base text-[var(--ink)] group-hover:text-[var(--brand-red)] transition mb-2 line-clamp-2">
                    <Link href={`/${article.slug}`}>{article.title}</Link>
                  </h3>

                  <p className="text-xs text-[var(--muted)] leading-relaxed line-clamp-3 mb-4">
                    {article.description}
                  </p>
                </div>

                <Link
                  href={`/${article.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--brand-red)] group-hover:translate-x-1 transition duration-150"
                >
                  <span>Read Full Guide</span>
                  <FiArrowRight size={12} />
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="border border-[#e6e6e6] bg-white p-12 text-center text-[var(--muted)]">
            <p className="text-base">No guides found matching your search criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('All')
                setSearchQuery('')
              }}
              className="mt-4 text-xs font-semibold text-[var(--brand-red)] underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </div>
  )
}
