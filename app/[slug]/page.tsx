import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import type { Metadata } from 'next'
import { articleSeoMetadata } from '../../content/articles/seoMetadata'

import ScrollToTop from '@/components/ScrollToTop'
import ShareButtons from '@/components/ShareButtons'
import Comments from '@/components/Comments'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export const dynamicParams = false

type ContentData = {
  title: string
  description?: string
  primaryKeyword?: string
  date?: string
  updatedDate?: string
  updated?: string
  lastUpdated?: string
  author?: string
  thumbnail?: string
  seoKeywords?: string[]
  geoRegion?: string
  geoPlacename?: string
  geoPosition?: string
  sources?: { name: string; url: string }[]
  type?: string
}

type ContentItem = {
  type: 'article' | 'page'
  data: ContentData
  content: string
}

const relatedArticleGroups: string[][] = [
  [
    'new-epf-rules-2026',
    'PM-Shram-Yogi-Maandhan-Yojana',
    'personal-finance-tips',
    'financial-freedom-low-salary',
    'build-wealth-7-proven-money-laws',
  ],
  [
    '21-powerful-business-strategies',
    'pricing-strategy-in-business',
    'free-pitch-deck-download',
    'quit-job-to-start-business',
    'vdumpling-dynasty-success-story',
  ],
  [
    'personal-finance-tips',
    'financial-freedom-low-salary',
    'how-to-reduce-monthly-expenses-india',
    'emergency-fund-how-much-do-you-need',
    'middle-class-20000-salary-40-lakh-debt-financial-freedom',
    'become-rich-15-money-lessons',
    'build-wealth-7-proven-money-laws',
    'earn-1-crore-real-story-plan',
  ],
  [
    'how-rich-people-use-debt-to-build-wealth',
    'is-debt-good-rich-people-use-debt',
    'home-loan-interest-reduction',
    'how-to-buy-land-with-low-salary',
    'land-vs-mutual-funds',
    'middle-class-20000-salary-40-lakh-debt-financial-freedom',
  ],
  [
    'best-mutual-fund-5-4-3-2-1-rule',
    'Dividend-Reinvestment-Strategy-Turn-Dividend-Income-Into-Long-Term-Wealth',
    'digital-gold-savings-vs-gold-etf',
    'land-vs-mutual-funds',
    'build-wealth-7-proven-money-laws',
    'personal-finance-tips',
  ],
  [
    'file-itr-self-own',
    'PM-Shram-Yogi-Maandhan-Yojana',
    'upi-charges-2026',
    'personal-finance-tips',
  ],
  [
    'slice-bank-review',
    'tide-bank',
    'personal-finance-tips',
    'emergency-fund-how-much-do-you-need',
  ],
  [
    'tv-buying-guide-india',
    'best-4k-tvs-india',
    'best-oled-tvs-india',
    'best-qled-tvs-india',
    'most-power-efficient-tvs-india',
  ],
  [
    'best-laptops-under-50000',
    'best-i7-13th-gen-laptops-india',
    'best-i7-14th-gen-laptops-india',
  ],
  [
    'best-dishwashers-india',
    'best-cold-pressed-oils-india',
    'cold-pressed-groundnut-oil',
  ],
]

function authorSlug(author?: string) {
  const normalized = (author || '').toLowerCase()
  if (normalized.includes('poorna')) return 'poorna-prasad'
  if (normalized.includes('chaitanya')) return 'chaitanya'
  return 'sivarama-krishna'
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const supabase = createSupabaseServerClient()

  const { data, error } = await supabase.from('articles').select('slug')

  if (error || !data) {
    return []
  }

  return data.map(({ slug }) => ({ slug }))
}

function formatDisplayDate(dateStr?: string): string {
  if (!dateStr) return ''

  const dateObj = new Date(dateStr)
  if (Number.isNaN(dateObj.getTime())) return dateStr

  return dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

async function getContent(slug: string): Promise<ContentItem | null> {
  const supabase = createSupabaseServerClient()

  const { data, error } = await supabase
    .from('articles')
    .select('slug, title, description, date, thumbnail, author, type, content, geo_region, geo_placename, geo_position, seo_keywords, sources')
    .eq('slug', slug)
    .single()

  if (error || !data) {
    return null
  }

  const wordCount = data.content ? data.content.trim().split(/\s+/).length : 0
  const readingTime = Math.max(1, Math.ceil(wordCount / 225))

  return {
    type: (data.type as 'article' | 'page') || 'article',
    data: {
      title: data.title,
      description: data.description,
      date: data.date,
      thumbnail: data.thumbnail,
      author: data.author,
      type: data.type,
      geoRegion: data.geo_region,
      geoPlacename: data.geo_placename,
      geoPosition: data.geo_position,
      seoKeywords: data.seo_keywords as string[] | undefined,
      sources: data.sources as { name: string; url: string }[] | undefined,
    },
    content: data.content,
  }
}

function getRelatedArticles(slug: string) {
  const group = relatedArticleGroups.find((articles) => articles.includes(slug)) || []

  return group
    .filter((relatedSlug) => relatedSlug !== slug)
    .slice(0, 3)
}

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params

  const item = await getContent(slug)

  if (!item) {
    return {
      title: 'Page Not Found | HelloMacha',
    }
  }

  const { type, data } = item
  const articleSeo = type === 'article' ? articleSeoMetadata[slug] : undefined
  const metadataAuthorName = data.author || 'Sivarama Krishna'
  const canonicalUrl = `https://hellomacha.com/${slug}`

  const resolveImageUrl = (url?: string) => {
    if (!url) return 'https://hellomacha.com/og-image.svg'
    try {
      return new URL(url, 'https://hellomacha.com').toString()
    } catch {
      return 'https://hellomacha.com/og-image.svg'
    }
  }

  const imageUrl = resolveImageUrl(data.thumbnail)

  const baseMetadata: Metadata = {
    title: articleSeo?.title || `${data.title} | HelloMacha`,
    description: articleSeo?.description || data.description,
    keywords: articleSeo
      ? [articleSeo.primaryKeyword]
      : data.seoKeywords,
    authors: [{ name: metadataAuthorName, url: `https://hellomacha.com/authors/${authorSlug(data.author)}` }],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: articleSeo?.title || data.title,
      description: articleSeo?.description || data.description,
      url: canonicalUrl,
      siteName: 'HelloMacha',
      images: [{ url: imageUrl, alt: data.title }],
      type: type === 'article' ? 'article' : 'website',
      ...(type === 'article' && data.date
        ? {
            publishedTime: data.date,
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: articleSeo?.title || data.title,
      description: articleSeo?.description || data.description,
      images: [imageUrl],
    },
  }

  if (type === 'article') {
    const geoRegion = data.geoRegion || 'IN-AP'
    const geoPlacename =
      data.geoPlacename || 'Andhra Pradesh, India'
    const geoPosition =
      data.geoPosition || '14.4673;78.8242'

    return {
      ...baseMetadata,
      other: {
        'geo.region': geoRegion,
        'geo.placename': geoPlacename,
        'geo.position': geoPosition,
        ICBM: geoPosition,
      },
    }
  }

  return baseMetadata
}

export default async function DynamicSlugPage({
  params,
}: PageProps) {
  const { slug } = await params

  const item = await getContent(slug)

  if (!item) {
    notFound()
  }

  const { type, data, content } = item
  const articleSeo = type === 'article' ? articleSeoMetadata[slug] : undefined
  const relatedSlugs = getRelatedArticles(slug)

  const resolveImageUrl = (url?: string) => {
    if (!url) return 'https://hellomacha.com/og-image.svg'
    try {
      return new URL(url, 'https://hellomacha.com').toString()
    } catch {
      return 'https://hellomacha.com/og-image.svg'
    }
  }

  const wordCount = content ? content.trim().split(/\s+/).length : 0

  const readingTime = Math.max(
    1,
    Math.ceil(wordCount / 225)
  )

  const authorName = data.author || 'Sivarama Krishna'

  const rawUpdatedDate =
    data.updatedDate ||
    data.updated ||
    data.lastUpdated

  const displayDate = rawUpdatedDate
    ? `Last Updated on ${formatDisplayDate(rawUpdatedDate)}`
    : data.date
      ? formatDisplayDate(data.date)
      : ''

  const canonicalUrl =
    `https://hellomacha.com/${slug}`

  const articleSchema =
    type === 'article'
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: data.title,
          description: articleSeo?.description || data.description || '',
          keywords: articleSeo?.primaryKeyword || data.primaryKeyword,
          image: data.thumbnail
            ? [resolveImageUrl(data.thumbnail)]
            : [],
          datePublished: data.date,
          dateModified:
            rawUpdatedDate || data.date,
          author: {
            '@type': 'Person',
            name: authorName,
          },
          publisher: {
            '@type': 'Organization',
            name: 'HelloMacha',
            logo: {
              '@type': 'ImageObject',
              url: 'https://hellomacha.com/icon.png',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': canonicalUrl,
          },
        }
      : null

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://hellomacha.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: data.title,
        item: canonicalUrl,
      },
    ],
  }

  if (type === 'article') {
    const relatedArticles = await Promise.all(
      relatedSlugs.map(async (relatedSlug) => {
        const item = await getContent(relatedSlug)
        return item ? { slug: relatedSlug, title: item.data.title } : null
      })
    ).then((results) => results.filter(Boolean) as { slug: string; title: string }[])

    return (
      <article className="mx-auto w-full max-w-4xl px-4 pb-12 pt-6 sm:px-6 sm:pt-8">

        <nav className="mb-6 text-xs text-[var(--muted)]" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[var(--brand-red)]">Home</Link>
          <span className="px-2">/</span>
          <span>{data.title}</span>
        </nav>

        {/* Article Schema */}
        {articleSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(articleSchema),
            }}
          />
        )}

        {/* Breadcrumb Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              breadcrumbSchema
            ),
          }}
        />

        {/* Article Header */}
        <header className="mb-8">

          <h1 className="mb-5 text-3xl font-extrabold leading-tight tracking-tight text-[var(--ink)] sm:text-4xl lg:text-5xl">
            {data.title}
          </h1>

          <div className="mb-2 text-sm font-semibold text-[var(--ink)]">
            <Link href={`/authors/${authorSlug(data.author)}`} className="hover:text-[var(--brand-red)] hover:underline">
              {authorName}
            </Link>
          </div>

          <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
            {displayDate && (
              <span>{displayDate}</span>
            )}

            {displayDate && (
              <span className="text-[var(--line)]">
                |
              </span>
            )}

            <span>
              {readingTime} min read
            </span>
          </div>

          {/* Share Buttons */}
          <div className="mb-6">
            <ShareButtons title={data.title} />
          </div>

          {/* Featured Image */}
          {data.thumbnail && (
            <div className="mb-8 w-full overflow-hidden">
              <img
                src={data.thumbnail}
                alt={data.title}
                loading="lazy"
                className="block h-auto w-full"
              />
            </div>
          )}

        </header>

        {/* Article Content */}
        <div className="article-content prose prose-lg max-w-none text-[var(--ink)]">
          <MDXRemote source={content} />
        </div>

        {data.sources && data.sources.length > 0 && (
          <section className="mt-10 border-t border-[var(--line)] pt-6">
            <h2 className="text-xl font-bold text-[var(--ink)]">Sources and references</h2>
            <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
              {data.sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-[var(--brand-red)] underline-offset-2 hover:underline">
                    {source.name}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {relatedArticles.length > 0 && (
          <nav className="mt-10 border-t border-[var(--line)] pt-6" aria-label="Related guides">
            <h2 className="text-xl font-bold text-[var(--ink)]">Related guides</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {relatedArticles.map((article) => (
                <li key={article.slug}>
                  <Link href={`/${article.slug}`} className="text-[var(--brand-red)] underline-offset-2 hover:underline">
                    {article.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Comments */}
        <Comments
          title={data.title}
          slug={slug}
        />

        {/* Scroll To Top */}
        <ScrollToTop />

      </article>
    )
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-4 pb-12 pt-6 sm:px-6">

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema
          ),
        }}
      />

      <div className="article-content prose prose-lg prose-stone max-w-none text-gray-800">
        <MDXRemote source={content} />
      </div>

    </main>
  )
}
