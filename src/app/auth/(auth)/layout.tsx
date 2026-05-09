import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
   title: 'Authentication - Cyper Store',
   description: 'Sign in or create an account to access Cyper Store'
}

export default function AuthLayout({
   children
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <div className='bg-extra-gray/20 relative flex min-h-screen items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat'>
         {children}
      </div>
   )
}
