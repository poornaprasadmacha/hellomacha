import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { Metadata } from 'next'

import ScrollToTop from '@/components/ScrollToTop'
import ShareButtons from '@/components/ShareButtons'
import Comments from '@/components/Comments'

export const dynamic = 'force-static'
export const dynamicParams = false

type ContentData = {
  title: string
  description?: string
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
  [key: string]: any
}

type ContentItem = {
  type: 'article' | 'page'
  data: ContentData
  content: string
}

/* -------------------------------------------------------
   CONTENT DIRECTORIES
------------------------------------------------------- */

const articlesDir = path.join(process.cwd(), 'content', 'articles')
const pagesDir = path.join(process.cwd(), 'content', 'pages')

/* -------------------------------------------------------
   GET ALL CONTENT SLUGS
------------------------------------------------------- */

function getSlugsFromDirectory(directory: string): string[] {
  if (!fs.existsSync(directory)) {
    return []
  }

  return fs
    .readdirSync(directory)
    .filter((file) => /\.(mdx|md)$/i.test(file))
    .map((file) => file.replace(/\.(mdx|md)$/i, ''))
}

/* -------------------------------------------------------
   GENERATE STATIC PARAMS
------------------------------------------------------- */

export function generateStaticParams(): { slug: string }[] {
  const articleSlugs = getSlugsFromDirectory(articlesDir)
  const pageSlugs = getSlugsFromDirectory(pagesDir)

  const allSlugs = [...articleSlugs, ...pageSlugs]

  const uniqueSlugs = Array.from(new Set(allSlugs))

  return uniqueSlugs.map((slug) => ({
    slug,
  }))
}

/* -------------------------------------------------------
   READ CONTENT FILE
------------------------------------------------------- */

function readContentFile(
  directory: string,
  slug: string,
  type: 'article' | 'page'
): ContentItem | null {
  const mdxPath = path.join(directory, `${slug}.mdx`)
  const mdPath = path.join(directory, `${slug}.md`)

  let filePath: string | null = null

  if (fs.existsSync(mdxPath)) {
    filePath = mdxPath
  } else if (fs.existsSync(mdPath)) {
    filePath = mdPath
  }

  if (!filePath) {
    return null
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    type,
    data: data as ContentData,
    content,
  }
}

/* -------------------------------------------------------
   GET CONTENT
------------------------------------------------------- */

function getContent(slug: string): ContentItem | null {
  const article = readContentFile(articlesDir, slug, 'article')

  if (article) {
    return article
  }

  const page = readContentFile(pagesDir, slug, 'page')

  if (page) {
    return page
  }

  return null
}

/* -------------------------------------------------------
   DATE FORMAT
------------------------------------------------------- */

function formatDisplayDate(dateStr?: string): string {
  if (!dateStr) {
    return ''
  }

  const dateObj = new Date(dateStr)

  if (Number.isNaN(dateObj.getTime())) {
    return dateStr
  }

  return dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

/* -------------------------------------------------------
   METADATA
------------------------------------------------------- */

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params

  const item = getContent(slug)

  if (!item) {
    return {
      title: 'Page Not Found | HelloMacha',
    }
  }

  const { type, data } = item

  const canonicalUrl = `https://hellomacha.com/${slug}`

  const imageUrl = data.thumbnail || '/placeholder-image.jpg'

  const baseMetadata: Metadata = {
    title: `${data.title} | HelloMacha`,
    description: data.description,
    keywords: data.seoKeywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: data.title,
      description: data.description,
      url: canonicalUrl,
      siteName: 'HelloMacha',
      images: [imageUrl],
      type: type === 'article' ? 'article' : 'website',
      ...(type === 'article' && data.date
        ? {
            publishedTime: data.date,
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
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

/* -------------------------------------------------------
   ARTICLE PAGE
------------------------------------------------------- */

export default async function DynamicSlugPage({
  params,
}: PageProps) {
  const { slug } = await params

  const item = getContent(slug)

  if (!item) {
    notFound()
  }

  const { type, data, content } = item

  /* -------------------------------------------------------
     READING TIME
  ------------------------------------------------------- */

  const wordCount = content
    ? content.trim().split(/\s+/).length
    : 0

  const readingTime = Math.max(
    1,
    Math.ceil(wordCount / 225)
  )

  /* -------------------------------------------------------
     AUTHOR
  ------------------------------------------------------- */

  const authorName =
    data.author === 'srkmacha'
      ? 'Sivarama Krishna'
      : data.author || 'Sivarama Krishna'

  /* -------------------------------------------------------
     DATE
  ------------------------------------------------------- */

  const rawUpdatedDate =
    data.updatedDate ||
    data.updated ||
    data.lastUpdated

  const displayDate = rawUpdatedDate
    ? `Last Updated on ${formatDisplayDate(rawUpdatedDate)}`
    : data.date
      ? formatDisplayDate(data.date)
      : ''

  /* -------------------------------------------------------
     CANONICAL URL
  ------------------------------------------------------- */

  const canonicalUrl =
    `https://hellomacha.com/${slug}`

  /* -------------------------------------------------------
     ARTICLE SCHEMA
  ------------------------------------------------------- */

  const articleSchema =
    type === 'article'
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: data.title,
          description: data.description || '',
          image: data.thumbnail
            ? [data.thumbnail]
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

  /* -------------------------------------------------------
     BREADCRUMB SCHEMA
  ------------------------------------------------------- */

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

  /* -------------------------------------------------------
     ARTICLE
  ------------------------------------------------------- */

  if (type === 'article') {
    return (
      <article className="mx-auto w-full max-w-4xl px-4 pb-12 pt-6 sm:px-6 sm:pt-8">

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

          <h1 className="mb-5 text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            {data.title}
          </h1>

          <div className="mb-2 text-sm font-semibold text-gray-900">
            {authorName}
          </div>

          <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-gray-500">
            {displayDate && (
              <span>{displayDate}</span>
            )}

            {displayDate && (
              <span className="text-gray-300">
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
            <div className="mb-8 w-full overflow-hidden rounded-2xl">
              <img
                src={data.thumbnail}
                alt={data.title}
                className="block h-auto w-full"
              />
            </div>
          )}

        </header>

        {/* Article Content */}
        <div className="article-content prose prose-lg prose-stone max-w-none text-gray-800">
          <MDXRemote source={content} />
        </div>

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

  /* -------------------------------------------------------
     STANDALONE PAGE
  ------------------------------------------------------- */

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