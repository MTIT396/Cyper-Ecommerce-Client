'use client'
import FallbackExpired from '@/components/shared/FallbackExpired'
import Footer from '@/layouts/Footer'
import Header from '@/layouts/Header'

export default function NotFound() {
   return (
      <>
         <Header />
         <FallbackExpired />
         <Footer />
      </>
   )
}
