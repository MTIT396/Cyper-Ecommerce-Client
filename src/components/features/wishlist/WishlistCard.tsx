'use client'
import Button from '@/components/shared/Button'
import ReminderBox from '@/components/shared/ReminderBox'
import { useWishlistQuery } from '@/hooks/useWishlistQuery'
import { formatVNCurrency } from '@/lib/utils'
import { Wishlist } from '@/types/wishlist.type'
import { Loader2, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const WishlistCard = ({ wishlist }: { wishlist: Wishlist }) => {
   const { toggleWishlist, isToggling } = useWishlistQuery()
   const salePercent = ((wishlist.base_price - wishlist.sale_price) / wishlist.base_price) * 100
   return (
      <Link href={`/product/${wishlist.slug}`} className='relative w-full max-w-3xl'>
         <div className='flex items-center justify-between gap-3 rounded-md border p-4 transition duration-300 hover:shadow-sm'>
            <Image
               width={80}
               height={80}
               className='rounded-lg object-contain p-1.5'
               src={wishlist.image_url}
               alt={wishlist.name}
            />
            <div className='flex w-full flex-col gap-x-2'>
               <h2 className='mb-1 line-clamp-2 text-sm font-semibold sm:text-base'>
                  {wishlist.name}
               </h2>
               <p className='text-sm'>
                  Mã sản phẩm: <span className='font-semibold'>{wishlist.product_id}</span>
               </p>
            </div>

            <div className='flex flex-wrap items-center sm:gap-6'>
               <div className='ml-auto flex flex-col items-center'>
                  <span className='text-primary text-sm font-semibold sm:text-lg'>
                     {formatVNCurrency(wishlist.sale_price)}
                  </span>
                  <div className='flex items-center gap-2'>
                     <span className='text-extra-gray text-sm line-through sm:text-sm'>
                        {formatVNCurrency(wishlist.base_price)}
                     </span>

                     {/* Remove Wishlist Btn */}
                     <div
                        className='size-4'
                        onClick={(e) => {
                           e.preventDefault()
                           e.stopPropagation()
                        }}
                     >
                        <ReminderBox onConfirm={() => toggleWishlist(wishlist.product_id)}>
                           <Button
                              variant='icon'
                              disabled={isToggling}
                              className='h-fit w-fit border-none p-0 text-sm text-red-400 shadow-none hover:text-red-600'
                           >
                              {isToggling ? (
                                 <Loader2 className='animate-spin' />
                              ) : (
                                 <Trash2 className='size-4' />
                              )}
                           </Button>
                        </ReminderBox>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {!!salePercent && (
            <div className='absolute -top-[7px] left-4'>
               <span
                  className='relative bg-red-500 px-1.5 py-1 text-xs font-semibold text-white'
                  style={{ borderRadius: '0 4px 4px 4px' }}
               >
                  <span
                     style={{
                        content: '',
                        position: 'absolute',
                        top: 0,
                        left: '-6px',
                        width: 0,
                        height: 0,
                        borderBottom: '6px solid #970b12',
                        borderLeft: '6px solid transparent'
                     }}
                     aria-hidden='true'
                  />
                  Giảm {Math.round(salePercent)}%
               </span>
            </div>
         )}
      </Link>
   )
}

export default WishlistCard
