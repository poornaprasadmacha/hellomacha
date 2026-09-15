import './globals.css'
import Link from 'next/link'
import { FiSearch } from 'react-icons/fi'
import HelloMachaLogo from '../components/HelloMachaLogo'
import ShareButtons from '../components/ShareButtons'
import Header from '../components/Header'
import CookieConsent from '../components/CookieConsent'
import GoogleAnalytics from '../components/GoogleAnalytics'

import type { Metadata, Viewport } from 'next'

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1b1b1b' },
  ],
  width: 'device-width',
  initialScale: 1,
}

const FAVICON_URL = 'https://blogger.googleusercontent.com/img/a/AVvXsEi_qTT1QbSC9r3oXthk950ikDo1z6bBdeygo1iXS5TSQ8XOVWEz8gcNcbsXT1CJB75kYeSbv3Le3dfJ99rCDDa0THFlkdy0XS_cxhVCDNzKNb7aGrN3gFQ26kqV-3KCHpeOXH63ifxOrh-DSaFEb7gqStt_HtLnrnhGY38rEJJ469EoZOeGUwHQdYqTAhk'

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'HelloMacha',
  url: 'https://hellomacha.com',
  description:
    'Your trusted source for tech reviews, financial tips, and home products.',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://hellomacha.com/?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'HelloMacha',
  url: 'https://hellomacha.com',
  email: 'team.hellomacha@gmail.com',
  sameAs: [],
}

export const metadata: Metadata = {
  metadataBase: new URL('https://hellomacha.com'),
  title: 'HelloMacha | Financial Tips & Tech Reviews',
  description: 'Your trusted source for tech reviews, financial tips, and home products.',
  applicationName: 'HelloMacha',
  authors: [{ name: 'HelloMacha' }],
  keywords: ['financial tips', 'tech reviews', 'money advice', 'product guides'],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://hellomacha.com',
  },
  openGraph: {
    title: 'HelloMacha | Financial Tips & Tech Reviews',
    description: 'Your trusted source for tech reviews, financial tips, and home products.',
    url: 'https://hellomacha.com',
    siteName: 'HelloMacha',
    images: [FAVICON_URL],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HelloMacha | Financial Tips & Tech Reviews',
    description: 'Your trusted source for tech reviews, financial tips, and home products.',
    images: [FAVICON_URL],
  },
  icons: {
    icon: [
      { url: FAVICON_URL },
      { url: '/favicon.ico' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    shortcut: FAVICON_URL,
    apple: FAVICON_URL,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'HelloMacha',
  },
  other: {
    'google-adsense-account': 'ca-pub-7224147187406212',
    'geo.region': 'IN-AP',
    'geo.placename': 'Andhra Pradesh, India',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-pt-24" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-[var(--page)] text-[var(--ink)]" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        <Header />
        <GoogleAnalytics />

        <main className="mx-auto w-full max-w-6xl flex-grow px-4 pt-12 md:pt-16 pb-6 sm:px-5 sm:pb-8">
          {children}
        </main>

        <footer className="mt-16 bg-[var(--page)] text-[var(--muted)]">
          <div className="mx-auto max-w-6xl px-4 py-12 text-sm sm:px-5">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <HelloMachaLogo textOnly />
                </div>
                <p className="max-w-md text-[var(--muted)]">
                  Practical insight for everyday decisions.
                </p>
                <p className="max-w-md text-[var(--muted)]">
                  All content is written, reviewed, and edited by our editorial team for clarity, accuracy, and usefulness.
                </p>
              </div>

              <div className="flex flex-col gap-4 md:min-w-[320px] md:items-end">
                <form action="/" method="get" className="w-full max-w-md">
                  <div className="search-pill">
                    <span className="icon"><FiSearch size={16} /></span>
                    <input
                      type="search"
                      name="q"
                      placeholder="Search articles, guides..."
                      aria-label="Search articles"
                    />
                  </div>
                </form>

                <div className="flex flex-wrap gap-5 text-sm items-center">
                  <Link href="/about" className="transition hover:text-[var(--brand-red)]">About</Link>
                  <Link href="/contact" className="transition hover:text-[var(--brand-red)]">Contact</Link>
                  <Link href="/privacy-policy" className="transition hover:text-[var(--brand-red)]">Privacy Policy</Link>
                  <Link href="/disclaimer" className="transition hover:text-[var(--brand-red)]">Disclaimer</Link>
                  <Link href="/terms-and-conditions" className="transition hover:text-[var(--brand-red)]">Terms</Link>
                  <Link href="/disclaimer#affiliate-disclosure" className="transition hover:text-[var(--brand-red)]">Affiliate Disclosure</Link>
                  <Link href="/sitemap" className="transition hover:text-[var(--brand-red)]">Sitemap</Link>
                  <a href="mailto:team.hellomacha@gmail.com" className="transition hover:text-[var(--brand-red)]">Email</a>
                  <div className="ml-4">
                    <ShareButtons />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                  <span className="mr-1">Follow:</span>
                  <a href="https://x.com/search?q=HelloMacha" target="_blank" rel="noopener noreferrer" className="transition hover:text-[var(--brand-red)]">X</a>
                  <a href="https://www.instagram.com/explore/tags/hellomacha/" target="_blank" rel="noopener noreferrer" className="transition hover:text-[var(--brand-red)]">Instagram</a>
                  <a href="https://www.facebook.com/search/top?q=HelloMacha" target="_blank" rel="noopener noreferrer" className="transition hover:text-[var(--brand-red)]">Facebook</a>
                  <a href="https://www.youtube.com/results?search_query=HelloMacha" target="_blank" rel="noopener noreferrer" className="transition hover:text-[var(--brand-red)]">YouTube</a>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-[#dfe4d4] pt-6 text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
              © {new Date().getFullYear()} HelloMacha
            </div>
          </div>
        </footer>

        <CookieConsent />
      </body>
    </html>
  )
}