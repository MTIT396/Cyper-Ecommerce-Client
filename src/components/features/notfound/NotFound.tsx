'use client'

import dynamic from 'next/dynamic'

const Header = dynamic(() => import('@/layouts/Header'), {
   ssr: false
})

const Footer = dynamic(() => import('@/layouts/Footer'), {
   ssr: false
})

const FallbackExpired = dynamic(() => import('@/components/shared/FallbackExpired'), {
   ssr: false
})

export default function NotFound() {
   return (
      <>
         <Header />
         <FallbackExpired />
         <Footer />
      </>
   )
}
