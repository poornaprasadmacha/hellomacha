export const runtime = 'edge';

import { NextResponse } from 'next/server'
import { clearAuthCookie } from '@/lib/admin-auth'

export async function POST() {
  const response = NextResponse.json({ success: true })
  await clearAuthCookie()
  return response
}