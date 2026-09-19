import './globals.css'
import Link from 'next/link'
import { FiSearch } from 'react-icons/fi'
import HelloMachaLogo from '../components/HelloMachaLogo'
import ShareButtons from '../components/ShareButtons'
import Header from '../components/Header'
import CookieConsent from '../components/CookieConsent'
import GoogleAnalytics from '../components/GoogleAnalytics'
import { calculators } from './calculators/calculatorData'

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

        <footer className="mt-16 bg-[#fff6df] text-[#59606a]">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-5">
            <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr_1fr_1.2fr]">
              <div>
                <div className="mb-4">
                  <HelloMachaLogo textOnly />
                </div>
                <p className="max-w-xs text-sm leading-relaxed">
                  Practical insight for everyday decisions, from money and business to technology and home products.
                </p>
                <div className="mt-5">
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[var(--ink)]">Follow HelloMacha</p>
                  <ShareButtons />
                </div>
                <Link href="/learn" className="mt-5 inline-flex border border-[var(--brand-red)] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[var(--brand-red)] transition hover:bg-[var(--brand-red)] hover:text-white">
                  Explore our tools
                </Link>
              </div>

              <div>
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-[var(--ink)]">Explore</p>
                <nav className="flex flex-col items-start gap-3 text-sm" aria-label="Explore links">
                  <Link href="/" className="transition hover:text-[var(--brand-red)]">Home</Link>
                  <Link href="/learn" className="transition hover:text-[var(--brand-red)]">Learn</Link>
                  <Link href="/about" className="transition hover:text-[var(--brand-red)]">About</Link>
                  <Link href="/contact" className="transition hover:text-[var(--brand-red)]">Contact</Link>
                  <a href="mailto:team.hellomacha@gmail.com" className="transition hover:text-[var(--brand-red)]">Email us</a>
                </nav>
              </div>

              <div>
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-[var(--ink)]">Financial tools</p>
                <nav className="flex flex-col items-start gap-3 text-sm" aria-label="Financial calculator links">
                  <Link href="/calculators" className="font-semibold text-[var(--brand-red)] hover:underline">All calculators</Link>
                  {calculators.slice(0, 6).map((calculator) => (
                    <Link key={calculator.slug} href={`/calculators/${calculator.slug}`} className="transition hover:text-[var(--brand-red)]">
                      {calculator.title}
                    </Link>
                  ))}
                </nav>
              </div>

              <div>
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-[var(--ink)]">More calculators</p>
                <nav className="flex flex-col items-start gap-3 text-sm" aria-label="More calculator links">
                  {calculators.slice(6).map((calculator) => (
                    <Link key={calculator.slug} href={`/calculators/${calculator.slug}`} className="transition hover:text-[var(--brand-red)]">
                      {calculator.title}
                    </Link>
                  ))}
                </nav>
                <p className="mb-3 mt-8 text-xs font-bold uppercase tracking-[0.16em] text-[var(--ink)]">Legal</p>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                  <Link href="/privacy-policy" className="transition hover:text-[var(--brand-red)]">Privacy</Link>
                  <Link href="/terms-and-conditions" className="transition hover:text-[var(--brand-red)]">Terms</Link>
                  <Link href="/disclaimer" className="transition hover:text-[var(--brand-red)]">Disclaimer</Link>
                  <Link href="/sitemap" className="transition hover:text-[var(--brand-red)]">Sitemap</Link>
                </div>
              </div>
            </div>

            <form action="/" method="get" className="mt-12 max-w-xl">
              <label htmlFor="footer-search" className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[var(--ink)]">Search HelloMacha</label>
              <div className="search-pill border-[#b32b2b] bg-white">
                <span className="icon"><FiSearch size={16} /></span>
                <input id="footer-search" type="search" name="q" placeholder="Search articles, guides..." aria-label="Search articles" />
              </div>
            </form>

            <div className="mt-10 border-t border-[#eadfbe] pt-6 text-[10px] uppercase tracking-[0.22em]">
              © {new Date().getFullYear()} HelloMacha. All rights reserved.
            </div>
          </div>
        </footer>

        <CookieConsent />
      </body>
    </html>
  )
}