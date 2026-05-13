import type { Metadata } from 'next'
import Image from 'next/image'
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
      <div className='flex h-screen items-center justify-center overflow-hidden'>
         <div className='relative h-full max-h-[920px] w-full max-w-full overflow-hidden bg-white shadow-[0_20px_80px_rgba(0,0,0,0.08)]'>
            <div className='relative grid h-full lg:grid-cols-2'>
               {/* LEFT SIDE */}
               <div className='hidden h-full flex-col justify-between bg-black p-8 text-white lg:flex xl:p-12'>
                  <div>
                     <Image
                        width={100}
                        height={100}
                        src='/Logo.png'
                        alt='Logo'
                        className='object-contain brightness-0 invert'
                     />
                  </div>

                  <div className='space-y-6'>
                     <div className='space-y-4'>
                        <h1 className='text-4xl leading-tight font-bold xl:text-5xl'>
                           Công nghệ hiện đại cho cuộc sống thông minh
                        </h1>

                        <p className='max-w-md text-sm leading-relaxed text-zinc-300 xl:text-base'>
                           Mua sắm laptop, điện thoại và phụ kiện công nghệ với trải nghiệm nhanh
                           chóng, hiện đại và đáng tin cậy.
                        </p>
                     </div>

                     <div className='flex gap-4 pt-2'>
                        <div className='rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur'>
                           <p className='text-xl font-bold'>10K+</p>
                           <span className='text-xs text-zinc-300'>Khách hàng</span>
                        </div>

                        <div className='rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur'>
                           <p className='text-xl font-bold'>100+</p>
                           <span className='text-xs text-zinc-300'>Sản phẩm</span>
                        </div>
                     </div>
                  </div>

                  <p className='text-xs text-zinc-500'>© 2026 Cyper Technology</p>
               </div>
               {/* RIGHT SIDE */}
               {children}
            </div>
         </div>
      </div>
   )
}
