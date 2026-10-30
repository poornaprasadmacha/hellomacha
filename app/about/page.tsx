import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About HelloMacha',
  description: 'About HelloMacha — an independent Indian personal finance and consumer advice site. Meet the editorial team, our mission, and how we research and write every guide.',
  alternates: {
    canonical: 'https://hellomacha.com/about',
  },
  openGraph: {
    title: 'About HelloMacha',
    description: 'Meet the HelloMacha editorial team and learn about our mission to provide practical, evidence-first financial guidance for Indian households.',
    url: 'https://hellomacha.com/about',
    siteName: 'HelloMacha',
    type: 'website',
  },
}

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 pb-16 pt-6 sm:px-5 sm:pt-8">
      <div className="rounded-2xl border border-[var(--line)] bg-white p-6 shadow-sm sm:p-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-red)]">
          About
        </p>
        <h1 className="mb-6 text-3xl font-black tracking-tight text-[var(--ink)]">
          About HelloMacha
        </h1>

        <p className="mb-6 text-base leading-relaxed text-[var(--ink)]">
          HelloMacha is an independent editorial site that publishes practical guides for everyday financial and consumer decisions in India. We cover personal finance, taxes, government schemes, mutual funds, loans, insurance, and buying guides for TVs, laptops, appliances, and other household products.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">Our mission</h2>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          We help Indian households make confident, informed decisions about money and everyday purchases. Every guide is written to be practical, evidence-first, and free of jargon. We translate complex rules — EPF, tax, mutual funds, home loans — into rupee amounts and actions an Indian family can actually use.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">Who we are</h2>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          HelloMacha is run by a small editorial team based in India. Our lead researcher,{' '}
          <Link href="/authors/sivarama-krishna" className="text-[var(--brand-red)] hover:underline font-semibold">
            Macha Venkata Sivarama Krishna
          </Link>
          , has over a decade of experience in financial technology and personal finance writing. Our product researcher,{' '}
          <Link href="/authors/poorna-prasad" className="text-[var(--brand-red)] hover:underline font-semibold">
            Poorna Prasad
          </Link>
          , reviews televisions, laptops, kitchen appliances, and everyday tech with a focus on real-world usability for Indian households.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">What we cover</h2>
        <ul className="mb-6 space-y-2 text-base leading-relaxed text-[var(--ink)] list-disc list-inside">
          <li>Personal finance, budgeting, and debt management</li>
          <li>Tax filing, EPF, and government schemes for Indian employees</li>
          <li>Mutual funds, SIPs, and long-term wealth building</li>
          <li>Home loans, insurance, and financial planning</li>
          <li>TV, laptop, appliance, and kitchen product buying guides</li>
          <li>Business strategy and founder stories</li>
        </ul>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">How we research</h2>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          We write from primary and official sources — scheme documents, RBI notifications, fund fact sheets, government portals, and press releases. Every article names the sources it relied on, labels estimates and assumptions, and is updated when tax rules, scheme rates, or product terms change.
        </p>

        <div className="mt-8 rounded-xl border border-[var(--line)] bg-[#f9f9f9] p-6">
          <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">Contact us</h2>
          <p className="mb-2 text-sm text-[var(--ink)]">
            <span className="font-semibold">Email:</span> {' '}
            <a href="mailto:team.hellomacha@gmail.com" className="text-[var(--brand-red)] hover:underline">
              team.hellomacha@gmail.com
            </a>
          </p>
          <p className="mb-2 text-sm text-[var(--ink)]">
            <span className="font-semibold">Phone:</span> {' '}
            <a href="tel:+917075864991" className="text-[var(--brand-red)] hover:underline">
              +91 70758 64991
            </a>
          </p>
          <p className="mb-0 text-sm text-[var(--muted)]">
            Typically responds within 1–3 business days.
          </p>
        </div>
      </div>
    </main>
  )
}
