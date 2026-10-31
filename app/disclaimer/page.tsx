import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disclaimer | HelloMacha',
  description: 'HelloMacha disclaimer — informational purposes only, not financial advice.',
  alternates: {
    canonical: 'https://hellomacha.com/disclaimer',
  },
  openGraph: {
    title: 'Disclaimer | HelloMacha',
    description: 'Read the HelloMacha disclaimer. Content is for informational purposes only and does not constitute financial advice.',
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
          Last updated: October 30, 2026
        </p>

        <p className="mb-6 text-base leading-relaxed text-[var(--ink)]">
          The content on hellomacha.com ('the Site') is provided for general informational and educational purposes only. It is not intended to be, and does not constitute, professional financial, investment, legal, tax, or insurance advice.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">1. Not financial advice</h2>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          Nothing on the Site should be construed as a recommendation to buy, sell, or hold any security, investment product, or financial instrument. All calculators, examples, and illustrations are hypothetical and for educational purposes only. Actual results may vary.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">2. No guarantees</h2>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          We do not guarantee the accuracy, completeness, timeliness, or reliability of any information on the Site. Financial products, interest rates, tax rules, and government schemes change frequently. Always verify current terms with the relevant provider or authority before making a decision.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">3. Consult a professional</h2>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          Before making any financial decision, consult a qualified financial advisor, tax professional, or attorney who can evaluate your specific situation. The Site and its authors are not liable for any losses or damages resulting from reliance on the content.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">4. External links</h2>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          The Site may link to third-party websites. We do not endorse or control those sites and are not responsible for their content or practices.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">5. Contact us</h2>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          If you have questions about this disclaimer, contact us at team.hellomacha@gmail.com.
        </p>
      </div>
    </main>
  )
}
