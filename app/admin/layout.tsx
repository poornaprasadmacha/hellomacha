import { redirect } from 'next/navigation'
import Link from 'next/link'
import { isAuthenticated } from '@/lib/admin-auth'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const authenticated = await isAuthenticated()

  if (!authenticated) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-[var(--page)] text-[var(--ink)]">
      <header className="border-b border-[var(--line)] bg-[var(--surface)] sticky top-0 z-10">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-5">
          <h1 className="font-yapa text-xl font-bold text-[var(--ink)]">HelloMacha Admin</h1>
          <nav className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm font-medium text-[var(--muted)] hover:text-[var(--brand-red)] transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Site
            </Link>
            <form action="/api/admin/auth/logout" method="POST" className="inline">
              <button
                type="submit"
                className="text-sm font-medium text-[var(--muted)] hover:text-[var(--brand-red)] transition bg-transparent border-none p-0 cursor-pointer"
              >
                Logout
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-5">
        {children}
      </main>
    </div>
  )
}