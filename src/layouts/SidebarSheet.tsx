import React from 'react'

import Link from 'next/link'
import Image from 'next/image'

import { ChevronRight, Sparkles } from 'lucide-react'

import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet'

import { NAVIGATIONS } from '@/constants/constants'

interface SidebarSheetProps {
   children: React.ReactNode
   open: boolean
   onOpenChange: (open: boolean) => void
}

const SidebarSheet = ({ children, open, onOpenChange }: SidebarSheetProps) => {
   return (
      <Sheet open={open} onOpenChange={onOpenChange}>
         <SheetTrigger asChild>{children}</SheetTrigger>

         <SheetContent
            side='left'
            onOpenAutoFocus={(e) => e.preventDefault()}
            className='flex w-[85%] flex-col border-r-0 bg-white p-0 sm:max-w-sm'
         >
            {/* Header */}
            <SheetHeader className='border-b border-zinc-100 bg-gradient-to-r from-zinc-100 via-white to-white px-6 py-5 text-left'>
               <Link href='/' className='shrink-0' onClick={() => onOpenChange(false)}>
                  <Image src='/Logo.png' alt='logo' width={96} height={32} />
               </Link>
            </SheetHeader>

            {/* Navigation */}
            <nav className='flex flex-1 flex-col gap-2 p-4'>
               {NAVIGATIONS.map((nav) => (
                  <Link
                     key={nav.id}
                     href={nav.link}
                     onClick={() => onOpenChange(false)}
                     className='group flex items-center justify-between rounded-2xl border border-transparent px-4 py-4 transition-all duration-200 hover:border-red-100 hover:bg-red-50/80 hover:shadow-sm'
                  >
                     <div className='flex items-center gap-3'>
                        <div className='flex size-9 items-center justify-center rounded-xl bg-zinc-100 transition-colors group-hover:bg-red-100'>
                           <Sparkles className='size-4 text-zinc-600 group-hover:text-red-500' />
                        </div>

                        <span className='text-[15px] font-medium text-zinc-700 transition-colors group-hover:text-red-500'>
                           {nav.label}
                        </span>
                     </div>

                     <ChevronRight className='size-4 text-zinc-400 transition-all duration-200 group-hover:translate-x-1 group-hover:text-red-500' />
                  </Link>
               ))}
            </nav>

            {/* Footer */}
            <div className='p-4 pt-0'>
               <div className='overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-500 via-zinc-500 to-zinc-600 p-5 text-white shadow-xl shadow-zinc-200'>
                  <div className='flex items-center gap-2'>
                     <Sparkles className='size-4' />

                     <span className='text-sm font-semibold uppercase'>Cyper Store</span>
                  </div>

                  <h3 className='mt-3 text-xl font-bold'>Trải nghiệm mua sắm công nghệ hiện đại</h3>

                  <p className='mt-2 text-sm text-zinc-100'>
                     Khám phá hàng ngàn sản phẩm chất lượng với trải nghiệm mượt mà.
                  </p>
               </div>
            </div>
         </SheetContent>
      </Sheet>
   )
}

export default SidebarSheet
