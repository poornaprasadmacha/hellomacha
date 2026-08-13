import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Metadata } from 'next'

// 1. ADD THIS LINE: Completely disables Edge runtime for this route
export const dynamic = 'force-static'
export const dynamicParams = false;

// Helper to fetch a single page from the /content/pages directory
function getPage(slug: string) {
  const filePath = path.join(process.cwd(), 'content/pages', `${slug}.mdx`)
  
  const finalPath = fs.existsSync(filePath) 
    ? filePath 
    : path.join(process.cwd(), 'content/pages', `${slug}.md`)

  if (!fs.existsSync(finalPath)) return null

  const fileContents = fs.readFileSync(finalPath, 'utf8')
  const { data, content } = matter(fileContents)

  return { data, content }
}

// Generate Static Paths for Cloudflare Builds
export async function generateStaticParams() {
  const pagesDirectory = path.join(process.cwd(), 'content/pages')
  if (!fs.existsSync(pagesDirectory)) return []

  const fileNames = fs.readdirSync(pagesDirectory)
  
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    .map((fileName) => ({
      slug: fileName.replace(/\.mdx?$/, ''),
    }))
}

// Define the new Promise type for Next.js 15
type PageProps = {
  params: Promise<{ slug: string }>
}

// 1. Add async/await to Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params // Await the promise here
  const page = getPage(slug)
  
  if (!page) return { title: 'Page Not Found' }

  const { data } = page

  return {
    title: `${data.title} | HelloMacha`,
    description: data.description,
    keywords: data.seoKeywords?.join(', '),
  }
}

// 2. Add async/await to the Component
export default async function StandalonePage({ params }: PageProps) {
  const { slug } = await params // Await the promise here
  const page = getPage(slug)

  if (!page) return notFound()

  const { data, content } = page

  return (
    <div className="w-full pt-24 pb-8">
      <div className="prose prose-lg prose-blue max-w-none text-gray-800">
        <MDXRemote source={content} />
      </div>
    </div>
  )
}