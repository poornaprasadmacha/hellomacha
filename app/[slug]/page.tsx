import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import ScrollToTop from '@/components/ScrollToTop'
import ShareButtons from '@/components/ShareButtons'
import { Metadata } from 'next'

export const dynamic = 'force-static'
export const dynamicParams = false

type ContentItem = {
  type: 'article' | 'page'
  data: {
    title: string
    description?: string
    date?: string
    thumbnail?: string
    seoKeywords?: string[]
    geoRegion?: string
    geoPlacename?: string
    geoPosition?: string
    [key: string]: any
  }
  content: string
}

function getContent(slug: string): ContentItem | null {
  // 1. Check articles
  const articleMdx = path.join(process.cwd(), 'content/articles', `${slug}.mdx`)
  const articleMd = path.join(process.cwd(), 'content/articles', `${slug}.md`)

  if (fs.existsSync(articleMdx)) {
    const fileContents = fs.readFileSync(articleMdx, 'utf8')
    const { data, content } = matter(fileContents)
    return { type: 'article', data: data as ContentItem['data'], content }
  }

  if (fs.existsSync(articleMd)) {
    const fileContents = fs.readFileSync(articleMd, 'utf8')
    const { data, content } = matter(fileContents)
    return { type: 'article', data: data as ContentItem['data'], content }
  }

  // 2. Check standalone pages
  const pageMdx = path.join(process.cwd(), 'content/pages', `${slug}.mdx`)
  const pageMd = path.join(process.cwd(), 'content/pages', `${slug}.md`)

  if (fs.existsSync(pageMdx)) {
    const fileContents = fs.readFileSync(pageMdx, 'utf8')
    const { data, content } = matter(fileContents)
    return { type: 'page', data: data as ContentItem['data'], content }
  }

  if (fs.existsSync(pageMd)) {
    const fileContents = fs.readFileSync(pageMd, 'utf8')
    const { data, content } = matter(fileContents)
    return { type: 'page', data: data as ContentItem['data'], content }
  }

  return null
}

export async function generateStaticParams() {
  const slugs: { slug: string }[] = []

  const articlesDir = path.join(process.cwd(), 'content/articles')
  if (fs.existsSync(articlesDir)) {
    const files = fs.readdirSync(articlesDir)
    files
      .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
      .forEach((f) => slugs.push({ slug: f.replace(/\.mdx?$/, '') }))
  }

  const pagesDir = path.join(process.cwd(), 'content/pages')
  if (fs.existsSync(pagesDir)) {
    const files = fs.readdirSync(pagesDir)
    files
      .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
      .forEach((f) => slugs.push({ slug: f.replace(/\.mdx?$/, '') }))
  }

  return slugs.length > 0 ? slugs : [{ slug: 'placeholder' }]
}

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const item = getContent(slug)

  if (!item) return { title: 'Page Not Found' }

  const { type, data } = item
  const canonicalUrl = `https://hellomacha.com/${slug}`
  const imageUrl = data.thumbnail || '/placeholder-image.jpg'

  if (type === 'article') {
    const geoRegion = data.geoRegion || 'IN-AP'
    const geoPlacename = data.geoPlacename || 'Andhra Pradesh, India'
    const geoPosition = data.geoPosition || '14.4673;78.8242'

    return {
      title: `${data.title} | HelloMacha`,
      description: data.description,
      keywords: data.seoKeywords?.join(', '),
      alternates: {
        canonical: canonicalUrl,
      },
      other: {
        'geo.region': geoRegion,
        'geo.placename': geoPlacename,
        'geo.position': geoPosition,
        'ICBM': geoPosition,
      },
      openGraph: {
        title: data.title,
        description: data.description,
        url: canonicalUrl,
        siteName: 'HelloMacha',
        images: [imageUrl],
        type: 'article',
        publishedTime: data.date,
      },
      twitter: {
        card: 'summary_large_image',
        title: data.title,
        description: data.description,
        images: [imageUrl],
      },
    }
  }

  return {
    title: `${data.title} | HelloMacha`,
    description: data.description,
    keywords: data.seoKeywords?.join(', '),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: data.title,
      description: data.description,
      url: canonicalUrl,
      siteName: 'HelloMacha',
      images: [imageUrl],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
      images: [imageUrl],
    },
  }
}

function formatDisplayDate(dateStr?: string): string {
  if (!dateStr) return ''
  const dateObj = new Date(dateStr)
  if (isNaN(dateObj.getTime())) return dateStr
  return dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default async function DynamicSlugPage({ params }: PageProps) {
  const { slug } = await params
  const item = getContent(slug)

  if (!item) return notFound()

  const { type, data, content } = item

  // Calculate estimated reading time
  const wordCount = content ? content.split(/\s+/).length : 0
  const readingTime = Math.max(1, Math.ceil(wordCount / 225))

  const authorName = data.author === 'srkmacha' ? 'Sivarama Krishna' : (data.author || 'Sivarama Krishna')
  
  const rawUpdatedDate = data.updatedDate || data.updated || data.lastUpdated
  const displayDate = rawUpdatedDate
    ? `Last Updated on ${formatDisplayDate(rawUpdatedDate)}`
    : data.date
    ? formatDisplayDate(data.date)
    : ''

  const articleSchema = type === 'article' ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': data.title,
    'description': data.description,
    'image': data.thumbnail ? [data.thumbnail] : [],
    'datePublished': data.date,
    'dateModified': rawUpdatedDate || data.date,
    'author': {
      '@type': 'Person',
      'name': authorName,
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'HelloMacha',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://hellomacha.com/icon.png',
      },
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://hellomacha.com/${slug}`,
    },
  } : null

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://hellomacha.com',
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': data.title,
        'item': `https://hellomacha.com/${slug}`,
      },
    ],
  }

  if (type === 'article') {
    return (
      <article className="mx-auto max-w-4xl px-4 pt-4 pb-12 sm:px-6 sm:pt-6 sm:pb-14 overflow-x-hidden max-w-full">
        {/* Rich SEO JSON-LD Schemas */}
        {articleSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />

        <header className="mt-2 mb-8 text-left">
          {/* Article Title (H1) - Medium title sizing for best UI/UX */}
          <h1 className="mb-3 text-xl sm:text-2xl md:text-3xl font-bold leading-snug tracking-tight text-gray-900 text-left">
            {data.title}
          </h1>

          {/* Author Name */}
          <div className="mb-1 text-xs sm:text-sm font-semibold text-gray-900">
            {authorName}
          </div>

          {/* Date & Reading Time with Pipe "|" */}
          <div className="mb-5 flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-gray-500">
            {displayDate && <span>{displayDate}</span>}
            {displayDate && <span className="text-gray-300">|</span>}
            <span>{readingTime} min read</span>
          </div>

          {/* Croma Design 5: Share Icons Bar */}
          <div className="mb-6 flex justify-start text-left">
            <ShareButtons title={data.title} />
          </div>

          {/* Croma Design 6: Featured Image with rounded-2xl corners */}
          {data.thumbnail && (
            <div className="relative w-full overflow-hidden rounded-2xl shadow-sm border border-gray-100 mb-8">
              <img
                src={data.thumbnail}
                alt={data.title}
                className="w-full h-auto object-cover block"
              />
            </div>
          )}
        </header>

        <div className="prose prose-lg prose-stone mx-auto max-w-none text-gray-800 leading-relaxed">
          <MDXRemote source={content} />
        </div>

        <ScrollToTop />
      </article>
    )
  }

  return (
    <div className="w-full pt-4 pb-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="prose prose-lg prose-blue max-w-none text-gray-800 leading-relaxed">
        <MDXRemote source={content} />
      </div>
    </div>
  )
}