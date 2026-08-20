import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

export const metadata = {
  title: 'Sitemap | HelloMacha',
  description: 'A complete directory of all articles, reviews, and pages on HelloMacha.',
}

// Helper to read files and extract the titles
function getLinks(directory: string, prefix: string) {
  const fullPath = path.join(process.cwd(), `content/${directory}`)
  
  if (!fs.existsSync(fullPath)) return []

  const fileNames = fs.readdirSync(fullPath)
  
  return fileNames
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, '')
      const fileContents = fs.readFileSync(path.join(fullPath, file), 'utf8')
      const { data } = matter(fileContents)
      
      return {
        slug,
        title: data.title || slug,
        url: prefix ? `/${prefix}/${slug}` : `/${slug}`
      }
    })
}

export default function SitemapPage() {
  const articles = getLinks('articles', '')
  const pages = getLinks('pages', '')

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 md:px-0">
      <div className="sitemap-hero text-center">
        <h1 className="text-3xl font-extrabold text-[var(--ink)]">Site Directory</h1>
        <div className="sitemap-meta text-sm">{articles.length} articles • {pages.length} pages</div>
      </div>

      <div className="sitemap-grid mt-8">
        <aside className="sitemap-card">
          <h3>Articles & Reviews</h3>
          <p className="sitemap-meta mb-4">Latest and evergreen guides.</p>
          {articles.length === 0 ? (
            <div className="sitemap-item text-sm text-gray-500 italic">No articles published yet.</div>
          ) : (
            <ul className="sitemap-list">
              {articles.slice(0, 18).map((article, i) => (
                <li key={article.slug} className={`sitemap-item animate-fade-up`} style={{ animationDelay: `${i * 45}ms` }}>
                  <Link href={article.url} className="sitemap-link">{article.title}</Link>
                </li>
              ))}
            </ul>
          )}
          {articles.length > 18 && (
            <div className="mt-3 text-sm"><Link href="/" className="sitemap-link">View all articles</Link></div>
          )}
        </aside>

        <aside className="sitemap-card">
          <h3>Company Pages</h3>
          <p className="sitemap-meta mb-4">Key site pages and legal resources.</p>
          <ul className="sitemap-list">
            <li className="sitemap-item" ><Link href="/" className="sitemap-link">Home</Link></li>
            {pages.map((page, i) => (
              <li key={page.slug} className="sitemap-item">
                <Link href={page.url} className="sitemap-link">{page.title}</Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  )
}