import { deleteTokenCookie } from '@/app/auth/sign-in/actions'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const redirectUrl = request.nextUrl.clone()

  redirectUrl.pathname = '/auth/sign-in'

  deleteTokenCookie()

  return NextResponse.redirect(redirectUrl)
}