import { apiClient } from '@/lib/axios'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
   const searchParams = request.nextUrl.searchParams
   const code = searchParams.get('code')
   const error = searchParams.get('error')

   if (error) {
      return NextResponse.redirect(new URL(`/auth/login?error=${error}`, request.url))
   }

   if (!code) {
      return NextResponse.redirect(new URL('/auth/login?error=no_code', request.url))
   }

   try {
      // Call backend to exchange code for token
      const response = await apiClient.post('/api/auth/google', { code })

      // Backend should set cookies automatically
      // Redirect to home page or dashboard
      return NextResponse.redirect(new URL('/', request.url))
   } catch (error) {
      console.error('Google callback error:', error)
      return NextResponse.redirect(new URL('/auth/login?error=callback_failed', request.url))
   }
}
