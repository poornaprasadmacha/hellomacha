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

  return {
    title: `${data.title} | HelloMacha`,
    description: data.description,
    keywords: data.seoKeywords?.join(', '),
    other: {
      ...(data.geoRegion && { 'geo.region': data.geoRegion }),
      ...(data.geoPlacename && { 'geo.placename': data.geoPlacename }),
      ...(data.geoPosition && {
        'geo.position': data.geoPosition,
        'ICBM': data.geoPosition,
      }),
    },
    openGraph: {
      title: data.title,
      description: data.description,
      images: [data.thumbnail || '/placeholder-image.jpg'],
      type: 'article',
      publishedTime: data.date,
    },
  }
}

export default async function ArticlePage({ params }: ArticleProps) {
  const { slug } = await params
  const article = getArticle(slug)

  if (!article) return notFound()

  const { data, content } = article

  return (
    <article className="mx-auto max-w-5xl px-4 pt-20 pb-8 sm:px-6 sm:pt-24 sm:pb-10">
      <header className="mb-8 text-left">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)] text-left sm:text-sm">
          {data.date}
        </p>
        <h1 className="mb-4 font-serif text-2xl font-black leading-snug tracking-tight text-[#2c352d] text-left sm:text-4xl sm:leading-[1.05] sm:tracking-[-0.03em] md:text-5xl lg:text-6xl">
          {data.title}
        </h1>
        <div className="mb-6 text-left">
          <ShareButtons title={data.title} />
        </div>
        {data.thumbnail && (
          <div className="relative h-[220px] w-full overflow-hidden border border-[#dfe4d4] sm:h-[320px] md:h-[420px]">
            <img
              src={data.thumbnail}
              alt={data.title}
              className="h-full w-full object-contain"
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