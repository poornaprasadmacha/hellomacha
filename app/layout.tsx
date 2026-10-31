import './globals.css'
import { Suspense } from 'react'
import Link from 'next/link'
import { FiArrowRight, FiSearch } from 'react-icons/fi'
import HelloMachaLogo from '../components/HelloMachaLogo'
import Header from '../components/Header'
import CookieConsent from '../components/CookieConsent'
import GoogleAnalytics from '../components/GoogleAnalytics'
import { calculators } from './financial-calculators/calculatorData'

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
const OG_IMAGE_URL = 'https://hellomacha.com/og-image.svg'

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
  logo: 'https://hellomacha.com/icon.png',
  email: 'team.hellomacha@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'HelloMacha Editorial Office',
    addressLocality: 'Visakhapatnam',
    addressRegion: 'Andhra Pradesh',
    postalCode: '530003',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-90000-00000',
    contactType: 'customer service',
    email: 'team.hellomacha@gmail.com',
  },
  sameAs: [
    'https://www.youtube.com/@HelloMacha',
    'https://x.com/HelloMacha',
    'https://www.linkedin.com/company/hellomacha',
    'https://www.instagram.com/hellomacha',
    'https://www.facebook.com/hellomacha',
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL('https://hellomacha.com'),
  title: 'HelloMacha | Financial Tips, Tech Reviews & Buying Guides',
  description: 'Practical insight for everyday decisions. Actionable guides, clear recommendations, and straightforward reviews to help you decide faster on finance, tech, and home products.',
  applicationName: 'HelloMacha',
  authors: [{ name: 'HelloMacha' }],
  keywords: ['financial tips', 'tech reviews', 'money advice', 'product guides'],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://hellomacha.com',
    languages: {
      'en-IN': 'https://hellomacha.com',
      'en': 'https://hellomacha.com',
    },
    types: {
      'application/rss+xml': 'https://hellomacha.com/feed.xml',
    },
  },
  openGraph: {
    title: 'HelloMacha | Financial Tips, Tech Reviews & Buying Guides',
    description: 'Practical insight for everyday decisions. Actionable guides, clear recommendations, and straightforward reviews to help you decide faster on finance, tech, and home products.',
    url: 'https://hellomacha.com',
    siteName: 'HelloMacha',
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630, alt: 'HelloMacha practical guides and financial tools' }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HelloMacha | Financial Tips, Tech Reviews & Buying Guides',
    description: 'Practical insight for everyday decisions. Actionable guides, clear recommendations, and straightforward reviews to help you decide faster on finance, tech, and home products.',
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630, alt: 'HelloMacha practical guides and financial tools' }],
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="font" href="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2voKBOI.woff2" type="font/woff2" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--page)] text-[var(--ink)]" suppressHydrationWarning>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 p-4 text-[var(--ink)] bg-white border border-[var(--brand-red)]">Skip to main content</a>
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
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>

        <main id="main-content" className="mx-auto w-full max-w-6xl flex-grow px-4 pt-12 md:pt-16 pb-6 sm:px-5 sm:pb-8 min-h-[60vh]">
          {children}
        </main>

        <footer className="mt-16 border-t border-[#eadfbe] bg-[#fffbf5] text-[#4a5568]">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-5">
            <div className="grid gap-8 sm:gap-12 sm:grid-cols-2 lg:grid-cols-4">
              <div className="lg:col-span-1 flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <HelloMachaLogo textOnly />
                  <p className="text-sm leading-relaxed text-[var(--ink)]">
                    Practical insight for everyday decisions, from money and business to technology and home products.
                  </p>
                </div>
                <div className="flex flex-col gap-2 pt-4 border-t border-[#eadfbe]">
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[var(--ink)]">Follow HelloMacha</p>
                  <div className="flex items-center gap-4">
                    <a href="https://www.youtube.com/@HelloMacha" className="text-xs font-semibold text-[var(--brand-red)] hover:underline" target="_blank" rel="noopener noreferrer">YouTube</a>
                    <a href="https://x.com/HelloMacha" className="text-xs font-semibold text-[var(--brand-red)] hover:underline" target="_blank" rel="noopener noreferrer">X</a>
                    <a href="https://www.linkedin.com/company/hellomacha" className="text-xs font-semibold text-[var(--brand-red)] hover:underline" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <a href="https://www.instagram.com/hellomacha" className="text-xs font-semibold text-[var(--brand-red)] hover:underline" target="_blank" rel="noopener noreferrer">Instagram</a>
                    <a href="https://www.facebook.com/hellomacha" className="text-xs font-semibold text-[var(--brand-red)] hover:underline" target="_blank" rel="noopener noreferrer">Facebook</a>
                  </div>
                  <div className="mt-3 text-xs text-[var(--muted)] leading-relaxed">
                    HelloMacha Editorial Office<br />
                    Visakhapatnam, Andhra Pradesh 530003, India<br />
                    Email: team.hellomacha@gmail.com
                  </div>
                </div>
                <div className="mt-auto sm:mt-0 pt-4 border-t border-[#eadfbe]">
                  <Link href="/financial-calculators" className="inline-flex items-center gap-2 border border-[var(--brand-red)] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[var(--brand-red)] transition hover:bg-[var(--brand-red)] hover:text-white">
                    Explore our tools <FiArrowRight size={13} />
                  </Link>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ink)]">Explore</p>
                <nav className="flex flex-col gap-3 text-sm" aria-label="Explore links">
                  <Link href="/" className="transition hover:text-[var(--brand-red)]">Home</Link>
                  <Link href="/learn" className="transition hover:text-[var(--brand-red)]">Learn</Link>
                  <Link href="/topics" className="transition hover:text-[var(--brand-red)]">Finance topics</Link>
                  <Link href="/about" className="transition hover:text-[var(--brand-red)]">About</Link>
                  <Link href="/authors/sivarama-krishna" className="transition hover:text-[var(--brand-red)]">Authors</Link>
                  <Link href="/contact" className="transition hover:text-[var(--brand-red)]">Contact</Link>
                </nav>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ink)]">Financial tools</p>
                <nav className="flex flex-col gap-3 text-sm" aria-label="Financial calculator links">
                  <Link href="/financial-calculators" className="font-semibold text-[var(--brand-red)] hover:underline">All calculators</Link>
                  {calculators.slice(0, 6).map((calculator) => (
                    <Link key={calculator.slug} href={`/financial-calculators/${calculator.slug}`} className="transition hover:text-[var(--brand-red)]">
                      {calculator.title}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ink)]">Legal &amp; policy</p>
                <nav className="flex flex-col gap-3 text-sm" aria-label="Legal links">
                  <Link href="/privacy-policy" className="transition hover:text-[var(--brand-red)]">Privacy policy</Link>
                  <Link href="/cookie-policy" className="transition hover:text-[var(--brand-red)]">Cookie policy</Link>
                  <Link href="/disclaimer" className="transition hover:text-[var(--brand-red)]">Disclaimer</Link>
                  <Link href="/terms-and-conditions" className="transition hover:text-[var(--brand-red)]">Terms and conditions</Link>
                  <Link href="/editorial-policy" className="transition hover:text-[var(--brand-red)]">Editorial policy</Link>
                  <a href="/feed.xml" className="transition hover:text-[var(--brand-red)]">RSS feed</a>
                </nav>
              </div>
            </div>

            <div className="mt-12 border-t border-[#eadfbe] pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-wrap gap-4 text-xs text-[var(--muted)]">
                <span className="flex items-center gap-1.5"><span className="text-[var(--brand-red)]">●</span> No affiliate links</span>
                <span className="flex items-center gap-1.5"><span className="text-[var(--brand-red)]">●</span> No sponsored content</span>
                <span className="flex items-center gap-1.5"><span className="text-[var(--brand-red)]">●</span> Primary-source cited</span>
                <span className="flex items-center gap-1.5"><span className="text-[var(--brand-red)]">●</span> Corrections published</span>
              </div>
              <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row items-center gap-3 text-[10px] uppercase tracking-[0.22em]">
                <span>© {new Date().getFullYear()} HelloMacha.</span>
                <span>All rights reserved.</span>
              </div>
              <div className="mt-4 sm:mt-0 flex flex-col gap-2 items-center sm:items-start">
                <div className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ink)]">Get updates</div>
                <a href="mailto:team.hellomacha@gmail.com?subject=HelloMacha%20updates" className="font-semibold text-[var(--brand-red)] hover:underline">team.hellomacha@gmail.com</a>
              </div>
            </div>
          </div>
        </footer>

        <CookieConsent />
      </body>
    </html>
  )
}