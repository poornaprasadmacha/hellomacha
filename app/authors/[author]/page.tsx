import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const authors = {
  'sivarama-krishna': {
    name: 'Sivarama Krishna',
    focus: 'Personal finance, investing, money habits, and long-term wealth building for Indian readers.',
    areas: ['Personal finance and budgeting', 'Mutual funds and SIP investing', 'Debt, loans, and financial decisions', 'Practical wealth-building plans'],
  },
  'poorna-prasad': {
    name: 'Poorna Prasad',
    focus: 'Technology and home-product research that helps Indian buyers compare features, value, and everyday usability.',
    areas: ['Technology buying guides', 'Televisions and laptops', 'Home appliances', 'Product research and comparisons'],
  },
  chaitanya: {
    name: 'Chaitanya',
    focus: 'Business strategy, entrepreneurship, pricing, and founder stories for people building practical businesses.',
    areas: ['Business strategy', 'Entrepreneurship', 'Pricing and customer psychology', 'Founder stories'],
  },
} as const

export function generateStaticParams() {
  return Object.keys(authors).map((author) => ({ author }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ author: string }> }): Promise<Metadata> {
  const { author } = await params
  const profile = authors[author as keyof typeof authors]
  if (!profile) return {}
  return {
    title: `${profile.name} | HelloMacha`,
    description: `${profile.name} writes for HelloMacha about ${profile.focus.toLowerCase()}`,
    alternates: { canonical: `https://hellomacha.com/authors/${author}` },
    openGraph: {
      title: `${profile.name} | HelloMacha`,
      description: profile.focus,
      url: `https://hellomacha.com/authors/${author}`,
      siteName: 'HelloMacha',
      type: 'profile',
      locale: 'en_IN',
    },
  }
}

export default async function AuthorPage({ params }: { params: Promise<{ author: string }> }) {
  const { author } = await params
  const profile = authors[author as keyof typeof authors]
  if (!profile) notFound()

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    url: `https://hellomacha.com/authors/${author}`,
    worksFor: { '@type': 'Organization', name: 'HelloMacha', url: 'https://hellomacha.com' },
    knowsAbout: profile.areas,
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-5 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--brand-red)]">HelloMacha author</p>
      <h1 className="mt-3 font-yapa text-4xl font-normal text-[var(--ink)] sm:text-6xl">{profile.name}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">{profile.focus}</p>
      <section className="mt-10 border border-[var(--line)] bg-white p-6 sm:p-8">
        <h2 className="text-xl font-bold text-[var(--ink)]">Focus areas</h2>
        <ul className="mt-4 grid gap-3 text-sm leading-relaxed text-[var(--muted)] sm:grid-cols-2">
          {profile.areas.map((area) => <li key={area}>{area}</li>)}
        </ul>
      </section>
      <p className="mt-8 text-sm text-[var(--muted)]">
        Read how HelloMacha researches and updates content in the <Link href="/editorial-policy" className="font-semibold text-[var(--brand-red)] hover:underline">editorial policy</Link>.
      </p>
    </main>
  )
}
