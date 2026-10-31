import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms and Conditions | HelloMacha',
  description: 'HelloMacha terms and conditions governing use of the website.',
  alternates: {
    canonical: 'https://hellomacha.com/terms-and-conditions',
  },
  openGraph: {
    title: 'Terms and Conditions | HelloMacha',
    description: 'Read the HelloMacha terms and conditions governing your use of hellomacha.com.',
    url: 'https://hellomacha.com/terms-and-conditions',
    siteName: 'HelloMacha',
    type: 'website',
  },
}

export default function TermsAndConditionsPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 pb-16 pt-6 sm:px-5 sm:pt-8">
      <div className="rounded-2xl border border-[var(--line)] bg-white p-6 shadow-sm sm:p-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-red)]">
          Terms and conditions
        </p>
        <h1 className="mb-6 text-3xl font-black tracking-tight text-[var(--ink)]">
          Terms and Conditions
        </h1>
        <p className="mb-4 text-sm text-[var(--muted)]">
          Last updated: October 30, 2026
        </p>

        <p className="mb-6 text-base leading-relaxed text-[var(--ink)]">
          Welcome to hellomacha.com ('the Site'), operated by HelloMacha ('we', 'us', 'our'). These terms and conditions govern your use of the Site. By accessing or using the Site, you agree to these terms.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">1. Use of the Site</h2>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          You may use the Site for lawful purposes only. You agree not to use the Site in any way that violates these terms, infringes any intellectual property rights, or harms the Site or its users.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">2. Content and intellectual property</h2>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          All content on the Site, including articles, guides, calculators, text, images, graphics, logos, and software, is owned by HelloMacha or its licensors and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works from the content without our express written permission.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">3. User conduct</h2>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          You agree not to post or transmit any unlawful, harmful, threatening, abusive, harassing, defamatory, or obscene content through the Site. You are solely responsible for any content you submit.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">4. Limitation of liability</h2>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          To the fullest extent permitted by law, HelloMacha is not liable for any indirect, incidental, consequential, or punitive damages, or any loss of profits or revenues, arising out of or related to your use of the Site.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">5. Changes to terms</h2>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          We may update these terms from time to time. Your continued use of the Site after changes are posted constitutes acceptance of the revised terms.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">6. Contact us</h2>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          If you have questions about these terms and conditions, contact us at team.hellomacha@gmail.com.
        </p>
      </div>
    </main>
  )
}
