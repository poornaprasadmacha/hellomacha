import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disclaimer — HelloMacha',
  description: 'HelloMacha disclaimer: financial content is for educational purposes only and is not professional financial advice. Consult a qualified advisor before making financial decisions.',
  alternates: {
    canonical: 'https://hellomacha.com/disclaimer',
  },
  openGraph: {
    title: 'Disclaimer — HelloMacha',
    description: 'HelloMacha disclaimer — educational content, not professional financial advice.',
    url: 'https://hellomacha.com/disclaimer',
    siteName: 'HelloMacha',
    type: 'website',
  },
}

export default function DisclaimerPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 pb-16 pt-6 sm:px-5 sm:pt-8">
      <div className="rounded-2xl border border-[var(--line)] bg-white p-6 shadow-sm sm:p-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-red)]">
          Disclaimer
        </p>
        <h1 className="mb-6 text-3xl font-black tracking-tight text-[var(--ink)]">
          Disclaimer
        </h1>
        <p className="mb-4 text-sm text-[var(--muted)]">
          Last updated: October 20, 2026
        </p>

        <p className="mb-6 text-base leading-relaxed text-[var(--ink)]">
          HelloMacha ("we," "us," "our") publishes general information about personal finance, taxes, government schemes, mutual funds, loans, insurance, and consumer products for educational purposes only. The content on hellomacha.com is not professional financial advice.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">Not financial advice</h2>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          Nothing on this Site constitutes professional financial, tax, investment, legal, or insurance advice. The information is general in nature and may not be suitable for your individual circumstances. Before making any financial decision, consult a qualified financial advisor, tax professional, or other licensed expert who can evaluate your specific situation.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">No guarantee of accuracy</h2>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          We strive to keep information accurate and up to date, but we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the content. Tax rules, scheme rates, product prices, and terms change frequently. Always verify information with official sources (e.g., EPFO, Income Tax Department, RBI, SEBI) before acting on it.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">No endorsement</h2>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          Mention of any product, service, company, or government scheme does not constitute an endorsement or recommendation. Product comparisons are based on publicly available specifications, pricing, and features at the time of writing. Prices and availability may change without notice.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">No liability</h2>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          To the fullest extent permitted by law, HelloMacha and its authors are not liable for any loss, damage, or expense arising directly or indirectly from your use of or reliance on any content on this Site. You use the Site and its content at your own risk.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">External links</h2>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          The Site may contain links to external websites. We do not control, endorse, or assume responsibility for the content of those sites. Your use of external links is at your own risk.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">Contact us</h2>
        <p className="mb-0 text-base leading-relaxed text-[var(--muted)]">
          If you have questions about this disclaimer, contact us at{' '}
          <a href="mailto:team.hellomacha@gmail.com" className="text-[var(--brand-red)] hover:underline">
            team.hellomacha@gmail.com
          </a>
          .
        </p>
      </div>
    </main>
  )
}
