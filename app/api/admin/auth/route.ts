import { NextRequest, NextResponse } from 'next/server'
import { verifyPassword, setAuthCookie } from '@/lib/admin-auth'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 })
    }

    if (verifyPassword(password)) {
      const response = NextResponse.json({ success: true })
      await setAuthCookie()
      return response
    }

    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}