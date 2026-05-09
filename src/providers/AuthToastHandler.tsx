'use client'

import { useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function AuthToastHandler() {
   const searchParams = useSearchParams()
   const router = useRouter()

   useEffect(() => {
      const login = searchParams.get('login')

      if (!login) return

      if (login === 'success') {
         toast.success('Đăng nhập thành công! ')
      }

      if (login === 'register') {
         toast.success('Đăng ký thành công! Vui lòng đăng nhập')
      }

      router.replace('/')
   }, [searchParams, router])

   return null
}
