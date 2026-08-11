import './globals.css'
import Link from 'next/link'
import { FiBookOpen, FiCompass, FiCpu, FiSearch, FiHome, FiInfo } from 'react-icons/fi'
import HelloMachaLogo from '../components/HelloMachaLogo'
import ShareButtons from '../components/ShareButtons'

export const metadata = {
  title: 'HelloMacha | Financial Tips & Tech Reviews',
  description: 'Your trusted source for tech reviews, financial tips, and home products.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-[var(--page)] text-[var(--ink)]" suppressHydrationWarning>
        <header className="sticky top-0 z-50 bg-white border-b" role="banner">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-5">
            <Link href="/" className="flex items-center gap-3 select-none">
              <HelloMachaLogo textOnly />
            </Link>

            <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
              <Link href="/" className="flex items-center gap-2 transition hover:text-[var(--brand-red)]">
                <FiHome size={16} />
                <span>Home</span>
              </Link>
              <Link href="/learn" className="flex items-center gap-2 transition hover:text-[var(--brand-red)]">
                <FiBookOpen size={16} />
                <span>Learn</span>
              </Link>
              <Link href="/about" className="flex items-center gap-2 transition hover:text-[var(--brand-red)]">
                <FiInfo size={16} />
                <span>About</span>
              </Link>
            </nav>

            <form action="/" method="get" className="search-pill w-full max-w-[240px] sm:max-w-[360px]">
              <span className="icon"><FiSearch size={18} /></span>
              <input
                type="search"
                name="q"
                placeholder="Search..."
                aria-label="Search"
              />
            </form>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl flex-grow px-4 pt-0 pb-6 sm:px-5 sm:pb-8">{children}</main>

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