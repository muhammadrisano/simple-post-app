import { NextRequest, NextResponse } from 'next/server'

export function proxy(request:NextRequest) {
  const token = request.cookies.get('laravel-session')?.value
  const sessionId = request.cookies.get('session_id')?.value

  const isLoggedIn = (!!token  && !!sessionId)

  // If no token exists and the user is trying to access a private route
  if (!isLoggedIn && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  return NextResponse.next()
}
export const config = {
  matcher: ['/dashboard/:path*'], // Protect all routes under /dashboard
}