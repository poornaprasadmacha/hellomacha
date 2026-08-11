import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import ScrollToTop from '@/components/ScrollToTop'
import { Metadata } from 'next'

export const dynamicParams = false;

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
    <article className="mx-auto max-w-5xl py-8 sm:py-10">
      <header className="mb-10 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
          {data.date}
        </p>
        <h1 className="mb-6 font-serif text-4xl font-black leading-[0.96] tracking-[-0.05em] text-[#2c352d] md:text-6xl">
          {data.title}
        </h1>
        {data.thumbnail && (
          <div className="relative mx-auto h-[280px] w-full overflow-hidden border border-[#dfe4d4] md:h-[420px]">
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