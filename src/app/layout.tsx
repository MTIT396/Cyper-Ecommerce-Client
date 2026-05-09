import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import Providers from '@/providers/QueryProvider'
import GoogleAuthHandler from '@/providers/AuthToastHandler'
import '@/styles/globals.css'

const poppins = Poppins({
   subsets: ['latin'],
   weight: ['100', '400', '500', '600', '700'],
   variable: '--font-primary'
})

const inter = Inter({
   subsets: ['latin'],
   weight: ['200', '400', '500', '600', '700'],
   variable: '--font-secondary'
})

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
      <html lang='en'>
         <body className={` ${poppins.variable} ${inter.variable} antialiased`}>
            <Providers>
               <GoogleAuthHandler />
               {children}
            </Providers>
         </body>
      </html>
   )
}
