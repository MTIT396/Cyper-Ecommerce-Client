import type { Metadata } from 'next'
import Header from '@/layouts/Header'
import Footer from '@/layouts/Footer'
import HelperSidebar from '@/layouts/HelperSidebar'
import { Suspense } from 'react'

export const metadata: Metadata = {
   title: 'Cyper Store',
   description: 'The Best Choice For Technology Gadgets'
}

export default function RootLayout({
   children
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <>
         <Suspense fallback={null}>
            <Header />
         </Suspense>
         {children}
         <div className='fixed right-3 bottom-15 z-50'>
            <HelperSidebar />
         </div>
         <Footer />
      </>
   )
}
