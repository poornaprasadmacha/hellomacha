import { cookies } from 'next/headers'

export function verifyPassword(password: string): boolean {
  return password === process.env.ADMIN_PASSWORD
}

export async function setAuthCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set('admin_auth', 'valid', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24,
    path: '/',
  })
}

export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete('admin_auth')
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get('admin_auth')
  return authCookie?.value === 'valid'
}