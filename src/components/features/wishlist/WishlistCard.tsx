'use client'

import Button from '@/components/shared/Button'
import ReminderBox from '@/components/shared/ReminderBox'
import { useWishlistQuery } from '@/hooks/useWishlistQuery'
import { formatVNCurrency } from '@/lib/utils'
import { Wishlist } from '@/types/wishlist.type'
import clsx from 'clsx'
import { Loader2, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const WishlistCard = ({ wishlist }: { wishlist: Wishlist }) => {
   const { toggleWishlist } = useWishlistQuery()

   const salePercent =
      wishlist.base_price > wishlist.sale_price
         ? ((wishlist.base_price - wishlist.sale_price) / wishlist.base_price) * 100
         : 0

   const isRemoving = (wishlist as Wishlist & { isRemoving?: boolean }).isRemoving

   return (
      <Link
         href={`/product/${wishlist.slug}`}
         className={clsx(
            'group relative block w-full transition-all duration-300',
            isRemoving && 'pointer-events-none opacity-50'
         )}
      >
         {!!salePercent && (
            <div className='absolute top-3 left-3 z-10'>
               <div className='rounded-full bg-red-500 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm'>
                  -{Math.round(salePercent)}%
               </div>
            </div>
         )}

         <div className='flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-3 transition-all duration-300 hover:border-zinc-300 hover:shadow-md sm:p-4'>
            {/* IMAGE */}
            <div className='shrink-0'>
               <Image
                  width={96}
                  height={96}
                  className='size-20 rounded-xl object-contain p-2 sm:size-24'
                  src={wishlist.image_url}
                  alt={wishlist.name}
               />
            </div>

            {/* INFO */}
            <div className='min-w-0 flex-1'>
               <h2 className='line-clamp-2 text-sm leading-5 font-semibold text-zinc-900 sm:text-base'>
                  {wishlist.name}
               </h2>

               <p className='mt-1 text-xs text-zinc-500 sm:text-sm'>
                  Mã sản phẩm:{' '}
                  <span className='font-medium text-zinc-700'>#{wishlist.product_id}</span>
               </p>
            </div>

            {/* ACTION */}
            <div className='ml-auto flex shrink-0 flex-col items-end gap-1'>
               <span className='text-primary text-sm font-bold sm:text-lg'>
                  {formatVNCurrency(wishlist.sale_price)}
               </span>

               <div className='flex items-center gap-2'>
                  <span className='text-xs text-zinc-400 line-through sm:text-sm'>
                     {formatVNCurrency(wishlist.base_price)}
                  </span>

                  <div
                     onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                     }}
                  >
                     <ReminderBox onConfirm={() => toggleWishlist(wishlist.product_id)}>
                        <Button
                           variant='icon'
                           disabled={isRemoving}
                           className='h-8 w-8 rounded-full border-none bg-zinc-100 p-0 text-zinc-500 shadow-none transition hover:bg-red-50 hover:text-red-500'
                        >
                           {isRemoving ? (
                              <Loader2 className='size-4 animate-spin' />
                           ) : (
                              <Trash2 className='size-4' />
                           )}
                        </Button>
                     </ReminderBox>
                  </div>
               </div>
            </div>
         </div>
      </Link>
   )
}

export default WishlistCard
