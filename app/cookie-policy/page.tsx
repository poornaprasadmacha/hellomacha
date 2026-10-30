import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy — HelloMacha',
  description: 'HelloMacha cookie policy: what cookies we use, why, and how to manage them. Google Analytics and AdSense cookies disclosed.',
  alternates: {
    canonical: 'https://hellomacha.com/cookie-policy',
  },
  openGraph: {
    title: 'Cookie Policy — HelloMacha',
    description: 'What cookies HelloMacha uses, why, and how to manage them.',
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
          Last updated: October 20, 2026
        </p>

        <p className="mb-6 text-base leading-relaxed text-[var(--ink)]">
          This cookie policy explains what cookies are, how HelloMacha ("we," "us," "our") uses them on hellomacha.com (the "Site"), and your choices regarding cookies.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">What are cookies</h2>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          Cookies are small text files placed on your device (computer, tablet, or mobile) when you visit a website. They help the site remember information about your visit, such as your preferred language and other settings, and can be used for analytics and advertising.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">Cookies we use</h2>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          <strong>Analytics cookies:</strong> We use Google Analytics to understand how visitors interact with the Site. These cookies collect anonymous information such as pages visited, time spent on the Site, and referral source.
        </p>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          <strong>Advertising cookies:</strong> The Site may display ads through Google AdSense. Google uses cookies to serve ads based on your interests and prior visits. You can opt out of personalised ads via the Google Ads Settings page.
        </p>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          <strong>Functional cookies:</strong> We use a cookie to remember your cookie consent preference so the consent banner does not reappear on every visit.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">Managing cookies</h2>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          You can control or disable cookies through your browser settings. Most browsers allow you to block or delete cookies from specific sites or all sites. Disabling cookies may prevent some Site features from working properly.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">Third-party cookies</h2>
        <p className="mb-6 text-base leading-relaxed text-[var(--muted)]">
          Third parties such as Google may place cookies on your device when you visit the Site. These third parties have their own privacy and cookie policies. We encourage you to review them.
        </p>

        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">Contact us</h2>
        <p className="mb-0 text-base leading-relaxed text-[var(--muted)]">
          If you have questions about this cookie policy, contact us at{' '}
          <a href="mailto:team.hellomacha@gmail.com" className="text-[var(--brand-red)] hover:underline">
            team.hellomacha@gmail.com
          </a>
          .
        </p>
      </div>
    </main>
  )
}
