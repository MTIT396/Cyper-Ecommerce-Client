'use client'
import FallbackExpired from '@/components/shared/FallbackExpired'
import Footer from '@/layouts/Footer'
import Header from '@/layouts/Header'
import { Suspense } from 'react'

export default function NotFound() {
   return (
      <>
         <Suspense fallback={null}>
            <Header />
         </Suspense>

         <FallbackExpired />
         <Footer />
      </>
   )
}
