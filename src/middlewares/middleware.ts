import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
   const accessToken = req.cookies.get('access_token')?.value
   const refreshToken = req.cookies.get('refresh_token')?.value

   if (accessToken || refreshToken) {
      return NextResponse.next()
   }

   const loginUrl = req.nextUrl.clone()
   loginUrl.pathname = '/auth/login'
   loginUrl.searchParams.set('redirect', req.nextUrl.pathname)

   return NextResponse.redirect(loginUrl)
}

export const config = {
   matcher: ['/checkout/:path*', '/payment/:path*', '/user/:path*', '/orders/:path*']
}
