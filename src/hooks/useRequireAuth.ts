'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from './useAuth'

export function useRequireAuth() {
   const router = useRouter()
   const { isAuthenticated } = useAuth()

   const checkAuth = () => {
      if (isAuthenticated) {
         return true
      }

      // Get current path to redirect back after login
      const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/'

      router.push(`/auth/login?redirect=${encodeURIComponent(currentPath)}`)
      return false
   }

   return checkAuth
}

export function useWithAuth() {
   const requireAuth = useRequireAuth()

   return <T extends unknown[], R>(
      fn: (...args: T) => Promise<R> | R
   ): ((...args: T) => Promise<R | void>) => {
      return async (...args: T) => {
         if (!requireAuth()) {
            return
         }
         return fn(...args)
      }
   }
}
