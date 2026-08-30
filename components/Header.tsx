'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiSearch, FiMenu, FiX } from 'react-icons/fi'
import HelloMachaLogo from './HelloMachaLogo'
import ReadingProgressBar from './ReadingProgressBar'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile menu when pathname changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <header className="fixed top-0 w-full z-50 bg-white border-b border-[var(--line)]" role="banner">
      <div className="mx-auto flex h-12 md:h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-5">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 select-none flex-shrink-0">
          <HelloMachaLogo textOnly compact />
        </Link>

        {/* Desktop Navigation - Names Only (No Icons) */}
        <nav className="hidden items-center gap-6 text-sm font-semibold md:flex">
          <Link
            href="/"
            className={`transition hover:text-[var(--brand-red)] ${
              pathname === '/' ? 'text-[var(--brand-red)]' : 'text-[var(--ink)]'
            }`}
          >
            Home
          </Link>
          <Link
            href="/learn"
            className={`transition hover:text-[var(--brand-red)] ${
              pathname?.startsWith('/learn') ? 'text-[var(--brand-red)]' : 'text-[var(--ink)]'
            }`}
          >
            Learn
          </Link>
          <Link
            href="/about"
            className={`transition hover:text-[var(--brand-red)] ${
              pathname === '/about' ? 'text-[var(--brand-red)]' : 'text-[var(--ink)]'
            }`}
          >
            About
          </Link>
        </nav>

        {/* Desktop Search Form ONLY */}
        <form action="/" method="get" className="header-desktop-search search-pill w-[200px] lg:w-[280px]">
          <span className="icon"><FiSearch size={18} /></span>
          <input
            type="search"
            name="q"
            placeholder="Search..."
            aria-label="Search"
          />
        </form>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
          className="flex items-center justify-center p-1.5 text-[var(--ink)] hover:text-[var(--brand-red)] focus:outline-none md:hidden"
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Reading Progress Indicator */}
      <ReadingProgressBar />

      {/* Mobile Navigation Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          {/* Overlay backdrop */}
          <div
            className="fixed inset-0 top-12 bg-black/40 z-40 transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Mobile Drawer */}
          <div className="fixed top-12 left-0 right-0 z-50 bg-white border-b border-[var(--line)] shadow-lg">
            <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-3">
              {/* Mobile Search Input - Search ONLY inside mobile menu */}
              <form action="/" method="get" className="search-pill w-full">
                <span className="icon"><FiSearch size={18} /></span>
                <input
                  type="search"
                  name="q"
                  placeholder="Search articles, guides..."
                  aria-label="Search articles"
                />
              </form>

              {/* Mobile Navigation Links - Names Only */}
              <nav className="flex flex-col text-base font-semibold">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2.5 px-3 transition hover:bg-gray-50 hover:text-[var(--brand-red)] border-b border-gray-100 ${
                    pathname === '/' ? 'text-[var(--brand-red)] font-bold bg-red-50/50' : 'text-[var(--ink)]'
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/learn"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2.5 px-3 transition hover:bg-gray-50 hover:text-[var(--brand-red)] border-b border-gray-100 ${
                    pathname?.startsWith('/learn') ? 'text-[var(--brand-red)] font-bold bg-red-50/50' : 'text-[var(--ink)]'
                  }`}
                >
                  Learn
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2.5 px-3 transition hover:bg-gray-50 hover:text-[var(--brand-red)] ${
                    pathname === '/about' ? 'text-[var(--brand-red)] font-bold bg-red-50/50' : 'text-[var(--ink)]'
                  }`}
                >
                  About
                </Link>
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
