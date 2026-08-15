'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  FiArrowRight,
  FiBookOpen,
  FiCalendar,
  FiChevronRight,
  FiClock,
  FiSearch,
  FiStar,
} from 'react-icons/fi'
import ScrollToTop from '@/components/ScrollToTop'
import type { ArticleMeta } from './page'

export default function ArticleClient({ articles }: { articles: ArticleMeta[] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isMounted, setIsMounted] = useState(false)

  // Wait for the browser to load, then read the URL. 
  // This completely bypasses the Next.js server routing.
  useEffect(() => {
    setIsMounted(true)
    const params = new URLSearchParams(window.location.search)
    setSearchQuery(params.get('q')?.trim() || '')
  }, [])

  const filteredArticles = isMounted && searchQuery
    ? articles.filter((article) => {
        const haystack = `${article.title} ${article.description}`.toLowerCase()
        return haystack.includes(searchQuery.toLowerCase())
      })
    : articles

  if (filteredArticles.length === 0) {
    return (
      <div className="min-h-[60vh] py-8">
        <div className="max-w-4xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--muted)]">No results found</p>
          <h1 className="mt-3 font-serif text-4xl font-black tracking-tight text-[#2c352d]">
            Nothing matches “{searchQuery}”
          </h1>
          <p className="mt-4 max-w-xl text-base text-[#4d5649]">
            Try another keyword or browse the latest guides below.
          </p>
        </div>
        <div className="mt-8 border border-[#dfe4d4] bg-white p-4">
          <div className="flex items-center gap-2 text-[var(--muted)]">
            <FiSearch size={16} />
            <span className="text-sm font-semibold uppercase tracking-[0.18em]">Search again</span>
          </div>
          <form action="/" method="get" className="mt-4">
            <div className="search-pill">
              <span className="icon"><FiSearch size={16} /></span>
              <input
                type="search"
                name="q"
                defaultValue={searchQuery}
                placeholder="Search guides..."
                className=""
              />
            </div>
          </form>
        </div>
        <ScrollToTop />
      </div>
    )
  }

  const featured = filteredArticles[0]
  const remaining = filteredArticles.slice(1)

  return (
    <div className="pb-16">
      {isMounted && searchQuery ? (
        <div className="mb-6 text-sm font-medium text-[#62735d]">
          Showing results for <span className="font-bold text-[#2c352d]">“{searchQuery}”</span>
        </div>
      ) : null}

      <section className="mb-8">
        <div
          style={{
            position: 'relative',
            left: '50%',
            right: '50%',
            marginLeft: '-50vw',
            marginRight: '-50vw',
            width: '100vw',
          }}
          className="bg-[var(--brand-red)] text-white"
        >
          <div className="mx-auto max-w-6xl px-6 pb-20 pt-28 md:pt-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest">HelloMacha guides</p>
                <h1 className="mt-4 font-serif text-4xl font-extrabold leading-tight">Smart answers to everyday life decisions.</h1>
                <p className="mt-6 text-lg max-w-xl">Practical insight for everyday decisions. Actionable guides, clear recommendations, and straightforward reviews to help you decide faster.</p>

                <div className="mt-8">
                  <form action="/" method="get" className="max-w-md">
                    <label htmlFor="hero-search" className="sr-only">Search guides</label>
                    <div className="search-pill">
                      <span className="icon"><FiSearch size={18} /></span>
                      <input id="hero-search" name="q" placeholder="Search guides, topics, or reviews" aria-label="Search guides" />
                    </div>
                  </form>
                </div>
              </div>

              <div className="hidden lg:block">
                <img
                  src="https://www.savemyexams.com/cdn-cgi/image/f=auto,width=256/https://cdn.savemyexams.com/images/illustrations/no-results-found-outline-dark.svg"
                  alt="Hero illustration"
                  className="w-full h-64 object-contain"
                  style={{ filter: 'invert(1) brightness(1.4)', opacity: 0.95 }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <article className="group border border-[#e6e6e6] bg-white p-3 sm:p-4">
          <Link href={`/${featured.slug}`} className="block">
            <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
              <div className="relative h-[260px] overflow-hidden sm:h-[340px] lg:h-[420px]">
                <img
                  src={featured.thumbnail}
                  alt={featured.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[rgba(0,0,0,0.15)]" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white sm:p-6">
                  <div className="mb-2 inline-flex items-center gap-2 border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em]">
                    <FiStar size={12} />
                    Featured guide
                  </div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80">{featured.date}</p>
                </div>
              </div>

              <div className="px-2 pb-2 sm:px-4 sm:pb-4">
                <div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--muted)]">
                  <FiBookOpen size={12} />
                  <span>Step-by-step</span>
                </div>

                <h2 className="font-serif text-3xl font-black leading-[0.95] tracking-[-0.05em] text-[#2c352d] sm:text-4xl lg:text-[2.85rem]">
                  {featured.title}
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#4d5649] sm:text-base">{featured.description}</p>

                <div className="mt-6 flex items-center justify-between border-t border-[#eef1ea] pt-4">
                  <div className="flex items-center gap-3 text-xs font-medium text-[#62735d]">
                    <span className="inline-flex items-center gap-1.5"><FiCalendar size={12} /> {featured.date}</span>
                    <span className="inline-flex items-center gap-1.5"><FiClock size={12} /> 6 min read</span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--brand-red)]">
                    Read now <FiArrowRight size={15} />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </article>
      </section>

      <section className="mb-10">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#62735d]">Latest guides</p>
          </div>
          <span className="hidden items-center gap-1 text-sm font-semibold text-[var(--brand-red)] sm:inline-flex">
            Explore all <FiChevronRight size={14} />
          </span>
        </div>

        {remaining.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {remaining.map((article, index) => (
              <article key={article.slug} className="group h-full">
                <Link href={`/${article.slug}`} className="block h-full border border-[#dfe4d4] bg-white p-3 transition-transform duration-200">
                  <div className="overflow-hidden">
                    <img
                      src={article.thumbnail}
                      alt={article.title}
                      className="h-48 w-full object-cover sm:h-52"
                    />
                  </div>

                  <div className="px-1 pb-1 pt-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">{article.date}</p>

                    <h3 className={`mt-3 font-serif font-black text-[var(--ink)] ${
                      index % 3 === 0 ? 'text-2xl' : index % 3 === 1 ? 'text-[1.75rem]' : 'text-2xl'
                    }`}>
                      {article.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-[#4d5649]">{article.description}</p>

                    <div className="mt-4 flex items-center justify-between border-t border-[#eef1ea] pt-3">
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#62735d]">Read</span>
                      <FiArrowRight className="text-[#6a7d52]" size={16} />
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : null}
      </section>

      <ScrollToTop />
    </div>
 )
}