import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export const dynamic = 'force-static'

export function GET() {
  const directory = path.join(process.cwd(), 'content/articles')
  const items = fs.existsSync(directory)
    ? fs.readdirSync(directory)
        .filter((file) => /\.mdx?$/i.test(file))
        .map((file) => {
          const { data } = matter(fs.readFileSync(path.join(directory, file), 'utf8'))
          const slug = file.replace(/\.mdx?$/i, '')
          return {
            title: data.title || slug,
            description: data.description || '',
            date: data.updatedDate || data.date || new Date().toISOString(),
            url: `https://hellomacha.com/${slug}`,
          }
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 30)
    : []

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>HelloMacha</title>
    <link>https://hellomacha.com</link>
    <description>Personal finance, business, technology, and practical buying guides.</description>
    <language>en-IN</language>
    ${items.map((item) => `<item><title><![CDATA[${item.title}]]></title><link>${item.url}</link><guid>${item.url}</guid><pubDate>${new Date(item.date).toUTCString()}</pubDate><description><![CDATA[${item.description}]]></description></item>`).join('')}
  </channel>
</rss>`

  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}
