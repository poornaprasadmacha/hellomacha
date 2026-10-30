import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — HelloMacha',
  description: 'HelloMacha privacy policy: how we collect, use, and protect your personal information. Google Analytics, cookies, email, and contact data disclosure.',
  alternates: {
    canonical: 'https://hellomacha.com/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy — HelloMacha',
    description: 'How HelloMacha collects, uses, and protects your personal information.',
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
          Last updated: October 20, 2026
        </p>

        <p className="mb-6 text-base leading-relaxed text-[var(--ink)]">
          This privacy policy explains how HelloMacha ("we," "us," "our") collects, uses, and protects information when you visit hellomacha.com (the "Site").
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">1. Information we collect</h2>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          We do not collect personal information from visitors simply by browsing the Site. Personal information is only collected if you voluntarily provide it, for example by emailing us at team.hellomacha@gmail.com or using the contact form.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">2. How we use your information</h2>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          If you email us, we use your email address and message solely to respond to your inquiry, correct published content, or discuss collaboration. We do not sell, rent, or share your personal information with third parties.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">3. Analytics and advertising</h2>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          The Site uses Google Analytics to measure anonymous traffic and usage patterns. Google Analytics uses cookies and similar technologies to collect non-personal information such as IP address, browser type, pages visited, and referral source. This data is aggregated and anonymised.
        </p>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          The Site may display advertisements served through Google AdSense. Google uses cookies to serve ads based on your prior visits to this Site and other websites. You may opt out of personalised advertising by visiting the Google Ads Settings page.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">4. Cookies</h2>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          The Site uses cookies for analytics, advertising, and site functionality. You can control or disable cookies through your browser settings. Disabling cookies may affect some Site features.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">5. Third-party links</h2>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          The Site may contain links to third-party websites (e.g., government portals, product retailers). We are not responsible for the privacy practices of those sites. We encourage you to read their privacy policies before providing any personal information.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">6. Data security</h2>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          We take reasonable technical and organisational measures to protect any personal information you provide to us. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">7. Contact us</h2>
        <p className="mb-0 text-base leading-relaxed text-[var(--muted)]">
          If you have questions about this privacy policy or your personal information, contact us at{' '}
          <a href="mailto:team.hellomacha@gmail.com" className="text-[var(--brand-red)] hover:underline">
            team.hellomacha@gmail.com
          </a>
          .
        </p>
      </div>
    </main>
  )
}
