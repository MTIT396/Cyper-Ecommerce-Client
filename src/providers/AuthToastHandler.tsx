'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'

export default function AuthToastHandler() {
   const searchParams = useSearchParams()
   const router = useRouter()

   useEffect(() => {
      const login = searchParams.get('login')

      if (!login) return

      const messages: Record<string, string> = {
         success: 'Đăng nhập thành công!',
         register: 'Đăng ký thành công! Vui lòng đăng nhập'
      }

      const message = messages[login]

      if (message) {
         toast.success(message)
      }

      router.replace('/')
   }, [router, searchParams])

   return null
}
