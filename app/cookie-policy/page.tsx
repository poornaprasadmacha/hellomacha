import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy | HelloMacha',
  description: 'HelloMacha cookie policy — how we use cookies and similar technologies on our site.',
  alternates: {
    canonical: 'https://hellomacha.com/cookie-policy',
  },
  openGraph: {
    title: 'Cookie Policy | HelloMacha',
    description: 'Read the HelloMacha cookie policy to understand how we use cookies and similar technologies.',
    url: 'https://hellomacha.com/cookie-policy',
    siteName: 'HelloMacha',
    type: 'website',
  },
}

export default function CookiePolicyPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 pb-16 pt-6 sm:px-5 sm:pt-8">
      <div className="rounded-2xl border border-[var(--line)] bg-white p-6 shadow-sm sm:p-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-red)]">
          Cookie policy
        </p>
        <h1 className="mb-6 text-3xl font-black tracking-tight text-[var(--ink)]">
          Cookie Policy
        </h1>
        <p className="mb-4 text-sm text-[var(--muted)]">
          Last updated: October 30, 2026
        </p>

        <p className="mb-6 text-base leading-relaxed text-[var(--ink)]">
          HelloMacha ('we', 'us', 'our') uses cookies and similar technologies on hellomacha.com ('the Site'). This cookie policy explains what cookies are, how we use them, and your choices regarding their use.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">1. What are cookies</h2>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          Cookies are small text files placed on your device when you visit a website. They help the site remember your preferences, improve functionality, and analyze how visitors interact with the site.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">2. Types of cookies we use</h2>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          <strong>Essential cookies:</strong> Necessary for the Site to function properly, including security and session management.<br />
          <strong>Analytics cookies:</strong> Help us understand how visitors use the Site so we can improve performance and content. These may be provided by third-party analytics services.<br />
          <strong>Preference cookies:</strong> Remember your settings and choices, such as language or display preferences.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">3. Third-party cookies</h2>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          Third parties, such as analytics providers, may set cookies on your device when you visit the Site. These cookies are subject to the third party's own privacy policy, not ours.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">4. Your choices</h2>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          You can accept or decline cookies through your browser settings. Most browsers allow you to block or delete cookies. Disabling cookies may affect the functionality of some parts of the Site.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">5. Contact us</h2>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          If you have questions about this cookie policy, contact us at team.hellomacha@gmail.com.
        </p>
      </div>
    </main>
  )
}
