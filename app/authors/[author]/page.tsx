import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type AuthorTopic = {
  label: string
  href: string
}

type AuthorProfile = {
  name: string
  focus: string
  bio: string
  philosophy: string
  expectations: string
  topics: AuthorTopic[]
  articles: string[]
}

const authors: Record<string, AuthorProfile> = {
  'sivarama-krishna': {
    name: 'Sivarama Krishna',
    focus: 'Personal finance, investing, money habits, and long-term wealth building for Indian readers.',
    bio: 'Sivarama Krishna is the founder and lead researcher at HelloMacha. With over a decade of experience in financial technology and personal finance writing, he specialises in translating complex financial concepts into practical, everyday guidance for Indian households. His work focuses on budgeting, debt management, long-term investing, and the financial decisions that shape everyday life in India.',
    philosophy: 'Sivarama Krishna researches every guide from primary sources — scheme documents, RBI notifications, fund fact sheets, and official portals — before writing a single line. His approach is deliberately practical: he translates compound interest, tax rules, and inflation into rupee amounts an Indian household can act on, and he favours boring, repeatable habits over hot tips. He writes the way he would explain a decision to a family member — slowly, with every assumption stated out loud.',
    expectations: 'Every finance guide follows the same editorial bar: primary and official sources first, estimates and assumptions labelled, and calculations shown in rupees. Sivarama updates articles when tax rules, scheme rates, or product terms change, and each piece names the sources it relied on. Nothing on the site is a product pitch — recommendations are chosen for usefulness to Indian readers, not commission.',
    topics: [
      { label: 'Personal finance', href: '/topics/finance' },
      { label: 'Mutual funds and SIPs', href: '/topics/mutual-funds' },
      { label: 'Retirement planning', href: '/topics/retirement' },
      { label: 'Loans and debt', href: '/topics/loans' },
      { label: 'Tax and compliance', href: '/topics/tax' },
      { label: 'Government schemes', href: '/topics/government-schemes' },
    ],
    articles: ['Personal finance and budgeting', 'Mutual funds and SIP investing', 'Debt, loans, and financial decisions', 'Practical wealth-building plans'],
  },
  'poorna-prasad': {
    name: 'Poorna Prasad',
    focus: 'Technology and home-product research that helps Indian buyers compare features, value, and everyday usability.',
    bio: 'Poorna Prasad is HelloMacha technology and home-product researcher. She reviews televisions, laptops, kitchen appliances, and everyday tech with a focus on real-world usability for Indian households. Her guides compare specifications, pricing, availability, and practical performance rather than marketing claims.',
    philosophy: 'Poorna Prasad evaluates products the way Indian buyers actually use them: in smaller homes, on Indian voltage and bandwidth, within realistic budgets. She compares specifications against measurable real-world performance, checks availability and after-sales support, and prices every recommendation for the market it will be bought in. Her research separates marketing claims from differences that matter, so a guide answers not just which product is best, but which is best for you.',
    expectations: 'Expect research, not press releases. Each buying guide states what was compared, how it was evaluated, and what was not tested. Prices, availability, and specifications are checked against current Indian listings, and guides are revisited when models, prices, or standards change. Reader corrections are treated as sources, not noise, and every recommendation is chosen without regard to affiliate revenue.',
    topics: [
      { label: 'Television buying guides', href: '/tv-buying-guide-india' },
      { label: '4K TV recommendations', href: '/best-4k-tvs-india' },
      { label: 'Laptop recommendations', href: '/best-laptops-under-50000' },
      { label: 'Home appliances', href: '/best-dishwashers-india' },
      { label: 'Kitchen essentials', href: '/best-cold-pressed-oils-india' },
    ],
    articles: ['Technology buying guides', 'Televisions and laptops', 'Home appliances', 'Product research and comparisons'],
  },
  chaitanya: {
    name: 'Chaitanya',
    focus: 'Business strategy, entrepreneurship, pricing, and founder stories for people building practical businesses.',
    bio: 'Chaitanya writes about business strategy, entrepreneurship, and pricing for HelloMacha. His articles cover practical business decisions, founder experiences, and the operational choices that shape growing companies. He focuses on real examples and actionable frameworks rather than abstract theory.',
    philosophy: 'Chaitanya builds his articles around real decisions rather than frameworks. He studies how founders actually price, hire, and grow — then distils the patterns into checklists and trade-offs a reader can apply this week. His writing favours concrete numbers and documented outcomes over abstraction, and every strategy piece ends with the operational steps that make the idea executable.',
    expectations: 'Every business guide names its assumptions and points to the evidence behind the strategy — case studies, data, or documented founder experiences. Chaitanya avoids one-size-fits-all advice: each framework comes with its trade-offs and the situations where it breaks. Articles are updated when market conditions, costs, or rules affect the advice, and readers are invited to challenge the reasoning.',
    topics: [
      { label: 'Business strategy', href: '/21-powerful-business-strategies' },
      { label: 'Entrepreneurship', href: '/quit-job-to-start-business' },
      { label: 'Pricing and customer psychology', href: '/pricing-strategy-in-business' },
      { label: 'Founder stories', href: '/vdumpling-dynasty-success-story' },
    ],
    articles: ['Business strategy', 'Entrepreneurship', 'Pricing and customer psychology', 'Founder stories'],
  },
}

export function generateStaticParams() {
  return Object.keys(authors).map((author) => ({ author }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ author: string }> }): Promise<Metadata> {
  const { author } = await params
  const profile = authors[author]
  if (!profile) return {}
  return {
    title: `${profile.name} | HelloMacha`,
    description: `${profile.name} writes for HelloMacha about ${profile.focus.toLowerCase()}. Explore practical guides, research, and expert commentary on personal finance, technology, and business.`,
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
  const profile = authors[author]
  if (!profile) notFound()

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    url: `https://hellomacha.com/authors/${author}`,
    worksFor: { '@type': 'Organization', name: 'HelloMacha', url: 'https://hellomacha.com' },
    knowsAbout: profile.articles,
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-5 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--brand-red)]">HelloMacha author</p>
      <h1 className="mt-3 font-yapa text-4xl font-normal text-[var(--ink)] sm:text-6xl">{profile.name}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">{profile.focus}</p>

      <section className="mt-10 border border-[var(--line)] bg-white p-6 sm:p-8">
        <h2 className="text-xl font-bold text-[var(--ink)]">About the author</h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{profile.bio}</p>
      </section>

      <section className="mt-8 border border-[var(--line)] bg-white p-6 sm:p-8">
        <h2 className="text-xl font-bold text-[var(--ink)]">Writing philosophy</h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{profile.philosophy}</p>
      </section>

      <section className="mt-8 border border-[var(--line)] bg-white p-6 sm:p-8">
        <h2 className="text-xl font-bold text-[var(--ink)]">Focus areas</h2>
        <ul className="mt-4 grid gap-3 text-sm leading-relaxed text-[var(--muted)] sm:grid-cols-2">
          {profile.articles.map((area) => <li key={area}>{area}</li>)}
        </ul>
      </section>

      <section className="mt-8 border border-[var(--line)] bg-white p-6 sm:p-8">
        <h2 className="text-xl font-bold text-[var(--ink)]">What to expect from our guides</h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{profile.expectations}</p>
        <ul className="mt-5 space-y-3 text-sm leading-relaxed text-[var(--muted)]">
          <li className="flex gap-3">
            <span className="font-semibold text-[var(--brand-red)]">Source-first</span>
            <span>Primary and official sources are cited wherever facts, rates, or rules are stated.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-[var(--brand-red)]">India context</span>
            <span>Every guide is written for Indian readers, with local prices, schemes, and regulations in mind.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-[var(--brand-red)]">Kept current</span>
            <span>Articles are updated when facts, rules, or prices change, and corrections are welcomed.</span>
          </li>
        </ul>
      </section>

      <section className="mt-8 border border-[var(--line)] bg-white p-6 sm:p-8">
        <h2 className="text-xl font-bold text-[var(--ink)]">Articles by topic</h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
          Explore the areas {profile.name} covers, with links to the matching topic library and guides.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {profile.topics.map((topic) => (
            <Link key={topic.href} href={topic.href} className="border border-[var(--line)] px-4 py-3 text-sm font-medium text-[var(--ink)] transition hover:border-[var(--brand-red)] hover:text-[var(--brand-red)]">
              {topic.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-xl border border-[var(--line)] bg-white p-6">
        <h2 className="text-xl font-bold text-[var(--ink)]">How we work</h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
          Every article on HelloMacha follows our editorial policy. We use primary and official sources wherever possible, label estimates and assumptions, and update content when facts, rules, or prices change.
        </p>
        <Link href="/editorial-policy" className="mt-4 inline-block text-sm font-semibold text-[var(--brand-red)] hover:underline">
          Read our editorial policy
        </Link>
      </section>

      <p className="mt-8 text-sm text-[var(--muted)]">
        Have questions or corrections for {profile.name}?{' '}
        <a href="mailto:team.hellomacha@gmail.com" className="font-semibold text-[var(--brand-red)] hover:underline">
          Email our editorial team
        </a>.
      </p>
    </main>
  )
}