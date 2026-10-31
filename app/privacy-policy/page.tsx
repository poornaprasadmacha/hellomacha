import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | HelloMacha',
  description: 'HelloMacha privacy policy — how we collect, use, and protect your personal information.',
  alternates: {
    canonical: 'https://hellomacha.com/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy | HelloMacha',
    description: 'Read the HelloMacha privacy policy to understand how we collect, use, and protect your information.',
    url: 'https://hellomacha.com/privacy-policy',
    siteName: 'HelloMacha',
    type: 'website',
  },
}

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 pb-16 pt-6 sm:px-5 sm:pt-8">
      <div className="rounded-2xl border border-[var(--line)] bg-white p-6 shadow-sm sm:p-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-red)]">
          Privacy policy
        </p>
        <h1 className="mb-6 text-3xl font-black tracking-tight text-[var(--ink)]">
          Privacy Policy
        </h1>
        <p className="mb-4 text-sm text-[var(--muted)]">
          Last updated: October 30, 2026
        </p>

        <p className="mb-6 text-base leading-relaxed text-[var(--ink)]">
          HelloMacha ('we', 'us', 'our') operates hellomacha.com ('the Site'). This privacy policy explains how we collect, use, disclose, and protect your information when you visit or use the Site.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">1. Information we collect</h2>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          We may collect personal information you voluntarily provide, such as your name and email address when you contact us via email or subscribe to updates. We also collect non-personal usage data such as browser type, IP address, pages visited, and referral sources through standard server logs and analytics tools.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">2. How we use your information</h2>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          We use collected information to: respond to your inquiries; send updates you have opted into; improve the Site and our content; and analyze aggregate usage trends. We do not sell your personal information to third parties.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">3. Cookies and tracking</h2>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          The Site may use cookies or similar technologies to remember preferences and analyze traffic. You can control cookies through your browser settings. See our <Link href="/cookie-policy">Cookie Policy</Link> for details.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">4. Third-party links</h2>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          The Site may contain links to third-party websites or services. We are not responsible for the privacy practices or content of those sites. We encourage you to read their privacy policies before providing any personal information.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">5. Your rights</h2>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          You may request access to, correction of, or deletion of your personal information by emailing us at team.hellomacha@gmail.com. We will respond within a reasonable timeframe.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">6. Contact us</h2>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          If you have questions about this privacy policy, contact us at team.hellomacha@gmail.com.
        </p>
      </div>
    </main>
  )
}
