import './globals.css'
import Link from 'next/link'
import { FiSearch } from 'react-icons/fi'
import HelloMachaLogo from '../components/HelloMachaLogo'
import ShareButtons from '../components/ShareButtons'
import Header from '../components/Header'

import type { Metadata, Viewport } from 'next'

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1b1b1b' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://hellomacha.com'),
  title: 'HelloMacha | Financial Tips & Tech Reviews',
  description: 'Your trusted source for tech reviews, financial tips, and home products.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'HelloMacha',
  },
  other: {
    'google-adsense-account': 'ca-pub-3202279426660861',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Added scroll-pt-24 here so if someone links to a specific heading, it doesn't hide under the fixed navbar
    <html lang="en" className="scroll-pt-24" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-[var(--page)] text-[var(--ink)]" suppressHydrationWarning>
        
        <Header />

        {/* Top padding matches fixed header height (h-12 on mobile, h-16 on desktop) */}
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
                    <Link href="/privacy-policy" className="transition hover:text-[var(--brand-red)]">Privacy Policy</Link>
                    <Link href="/disclaimer" className="transition hover:text-[var(--brand-red)]">Disclaimer</Link>
                    <Link href="/terms-and-conditions" className="transition hover:text-[var(--brand-red)]">Terms</Link>
                    <Link href="/sitemap" className="transition hover:text-[var(--brand-red)]">Sitemap</Link>
                    <a href="mailto:team.hellomacha@gmail.com" className="transition hover:text-[var(--brand-red)]">Contact</a>
                    <div className="ml-4">
                      <ShareButtons />
                    </div>
                  </div>
              </div>
            </div>

            <div className="mt-8 border-t border-[#dfe4d4] pt-6 text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
              © {new Date().getFullYear()} HelloMacha
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}