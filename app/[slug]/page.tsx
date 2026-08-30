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

export default async function DynamicSlugPage({ params }: PageProps) {
  const { slug } = await params
  const item = getContent(slug)

  if (!item) return notFound()

  const { type, data, content } = item

  if (type === 'article') {
    return (
      <article className="mx-auto max-w-5xl px-4 pt-4 pb-8 sm:px-6 sm:pt-6 sm:pb-10 overflow-x-hidden max-w-full">
        <header className="mt-2 mb-8 text-left">
          {data.date && (
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)] text-left sm:text-sm">
              {data.date}
            </p>
          )}
          <h1 className="mb-4 font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold leading-snug tracking-tight text-[#2c352d] text-left">
            {data.title}
          </h1>
          <div className="mb-6 flex justify-start text-left">
            <ShareButtons title={data.title} />
          </div>
          {data.thumbnail && (
            <div className="relative w-full overflow-hidden border border-[#dfe4d4]">
              <img
                src={data.thumbnail}
                alt={data.title}
                className="w-full h-auto object-cover block"
              />
            </div>
          )}
        </header>
        <div className="prose prose-lg prose-stone mx-auto max-w-none text-[#2c352d]">
          <MDXRemote source={content} />
        </div>

        <ScrollToTop />
      </article>
    )
  }

  return (
    <div className="w-full pt-4 pb-8">
      <div className="prose prose-lg prose-blue max-w-none text-gray-800">
        <MDXRemote source={content} />
      </div>
    </div>
  )
}