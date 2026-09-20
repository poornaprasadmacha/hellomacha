'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
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

function getTitleClass(title: string, featured = false) {
  const length = title.length

  if (featured) {
    if (length > 70) return 'text-[clamp(1.55rem,1.45vw,2.2rem)]'
    if (length > 45) return 'text-[clamp(1.7rem,1.7vw,2.5rem)]'
    return 'text-[clamp(1.9rem,2vw,2.8rem)]'
  }

  if (length > 62) return 'text-[clamp(1.15rem,1.3vw,1.7rem)]'
  if (length > 42) return 'text-[clamp(1.25rem,1.5vw,1.9rem)]'
  return 'text-[clamp(1.35rem,1.7vw,2.05rem)]'
}

export default function ArticleClient({ articles }: { articles: ArticleMeta[] }) {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('q')?.trim() || ''

  const filteredArticles = searchQuery
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
      {searchQuery ? (
        <div className="mb-6 text-sm font-medium text-[#62735d]">
          Showing results for <span className="font-bold text-[#2c352d]">“{searchQuery}”</span>
        </div>
      ) : null}

      <section className="mb-8 -mt-12 md:-mt-16">
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
          <div className="mx-auto max-w-6xl px-6 pb-12 pt-20 sm:pt-24 md:pb-16 md:pt-28">
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
                  loading="lazy"
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
                  loading="lazy"
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

              <div className="flex flex-col px-2 pb-2 sm:px-4 sm:pb-4">
                <div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--muted)]">
                  <FiBookOpen size={12} />
                  <span>Step-by-step</span>
                </div>

                <h2 className={`font-serif ${getTitleClass(featured.title, true)} font-extrabold leading-[1.02] tracking-[-0.04em] text-[#2c352d] text-balance`}>
                  {featured.title}
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#4d5649] sm:text-base">{featured.description}</p>

                <div className="mt-auto flex items-center justify-between border-t border-[#eef1ea] pt-4">
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
            {remaining.map((article) => (
              <article key={article.slug} className="group h-full">
                <Link href={`/${article.slug}`} className="flex h-full flex-col border border-[#dfe4d4] bg-white p-3 transition-transform duration-200 hover:-translate-y-0.5">
                  <div className="overflow-hidden">
                    <img
                      src={article.thumbnail}
                      alt={article.title}
                      loading="lazy"
                      className="aspect-[16/9] w-full object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col px-1 pb-1 pt-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">{article.date}</p>

                    <h3 className={`mt-3 font-serif ${getTitleClass(article.title)} font-extrabold leading-[1.08] tracking-[-0.03em] text-[var(--ink)] text-balance`}>
                      {article.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-[#4d5649]">{article.description}</p>

                    <div className="mt-auto flex items-center justify-between border-t border-[#eef1ea] pt-3">
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