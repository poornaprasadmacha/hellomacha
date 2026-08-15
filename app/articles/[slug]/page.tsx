import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import ScrollToTop from '@/components/ScrollToTop'
import ShareButtons from '@/components/ShareButtons'
import { Metadata } from 'next'

// 1. ADD THIS LINE: Completely disables Edge runtime for this route
export const dynamic = 'force-static' 
export const dynamicParams = false

function getArticle(slug: string) {
  const filePath = path.join(process.cwd(), 'content/articles', `${slug}.mdx`)

  const finalPath = fs.existsSync(filePath)
    ? filePath
    : path.join(process.cwd(), 'content/articles', `${slug}.md`)

  if (!fs.existsSync(finalPath)) return null

  const fileContents = fs.readFileSync(finalPath, 'utf8')
  const { data, content } = matter(fileContents)

  return { data, content }
}

export async function generateStaticParams() {
  const articlesDirectory = path.join(process.cwd(), 'content/articles')

  if (!fs.existsSync(articlesDirectory)) {
    return [{ slug: 'placeholder' }]
  }

  const fileNames = fs.readdirSync(articlesDirectory)
  const articleSlugs = fileNames
    .filter((fileName) => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    .map((fileName) => ({
      slug: fileName.replace(/\.mdx?$/, ''),
    }))

  return articleSlugs.length > 0 ? articleSlugs : [{ slug: 'placeholder' }]
}

type ArticleProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ArticleProps): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)

  if (!article) return { title: 'Article Not Found' }

  const { data } = article
  const geoRegion = data.geoRegion || 'IN-AP'
  const geoPlacename = data.geoPlacename || 'Andhra Pradesh, India'
  const geoPosition = data.geoPosition || '14.4673;78.8242'

  return {
    title: `${data.title} | HelloMacha`,
    description: data.description,
    keywords: data.seoKeywords?.join(', '),
    other: {
      'geo.region': geoRegion,
      'geo.placename': geoPlacename,
      'geo.position': geoPosition,
      'ICBM': geoPosition,
    },
    openGraph: {
      title: data.title,
      description: data.description,
      images: [data.thumbnail || '/placeholder-image.jpg'],
      type: 'article',
      publishedTime: data.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
      images: [data.thumbnail || '/placeholder-image.jpg'],
    },
  }
}

export default async function ArticlePage({ params }: ArticleProps) {
  const { slug } = await params
  const article = getArticle(slug)

  if (!article) return notFound()

  const { data, content } = article

  return (
    <article className="mx-auto max-w-5xl px-4 pt-24 pb-8 sm:px-6 sm:pt-28 sm:pb-10">
      <header className="mt-4 mb-8 text-left sm:mt-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)] text-left sm:text-sm">
          {data.date}
        </p>
        <h1 className="mb-4 font-serif text-lg font-black leading-snug tracking-tight text-[#2c352d] text-left sm:text-2xl md:text-3xl lg:text-4xl">
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