'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'
import { Toaster } from 'react-hot-toast'

export default function Providers({ children }: { children: ReactNode }) {
   const [client] = useState(
      () =>
         new QueryClient({
            defaultOptions: {
               queries: {
                  retry: 1,
                  staleTime: 60_000,
                  gcTime: 5 * 60_000,
                  refetchOnWindowFocus: false
               }
            }
         })
   )

   return (
      <QueryClientProvider client={client}>
         {children}

         <Toaster
            position='top-center'
            gutter={12}
            containerStyle={{
               top: 24
            }}
            toastOptions={{
               duration: 5000,
               style: {
                  borderRadius: '16px',
                  padding: '14px 20px',
                  fontSize: '15px',
                  fontWeight: 600,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                  minWidth: '280px'
               },

               success: {
                  style: {
                     background: '#f0fdf4',
                     color: '#22c55e',
                     border: '1px solid #4ade80'
                  },

                  iconTheme: {
                     primary: '#22c55e',
                     secondary: '#f0fdf4'
                  }
               },

               error: {
                  style: {
                     background: '#fef2f2',
                     color: '#ef4444',
                     border: '1px solid #f87171'
                  },

                  iconTheme: {
                     primary: '#ef4444',
                     secondary: '#fef2f2'
                  }
               }
            }}
         />
      </QueryClientProvider>
   )
}
