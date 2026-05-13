'use client'

import Image from 'next/image'
import Link from 'next/link'

import { formatVNCurrency } from '@/lib/utils'

import { CartItem } from '@/types/cart.type'

const SummaryItem = ({ item }: { item: CartItem }) => {
   return (
      <div className='rounded-2xl border border-zinc-200 bg-zinc-50/60 p-4 transition-all duration-300 hover:border-zinc-300 hover:bg-white'>
         <div className='flex gap-3'>
            {/* Image */}
            <Link href={`/product/${item?.slug}?sku=${item?.variant?.sku}`} className='shrink-0'>
               <Image
                  width={88}
                  height={88}
                  src={item?.image_url}
                  alt={item?.name}
                  className='size-20 rounded-xl object-contain p-2 sm:size-[88px]'
               />
            </Link>

            {/* Content */}
            <div className='flex min-w-0 flex-1 flex-col'>
               {/* Product Name */}
               <Link href={`/product/${item?.slug}?sku=${item?.variant?.sku}`}>
                  <h2 className='line-clamp-2 text-sm leading-5 font-semibold text-zinc-900 sm:text-base'>
                     {item?.name}
                  </h2>
               </Link>

               {/* Attributes */}
               <div className='mt-2 flex flex-wrap gap-x-4 gap-y-1'>
                  {item?.variant?.attributes.map((attr) => (
                     <div key={attr.id} className='flex items-center gap-1.5 text-sm text-zinc-600'>
                        <span className='font-medium text-zinc-700'>{attr.name}:</span>

                        <span className='text-primary font-medium'>{attr.value}</span>

                        {attr.slug === 'color' && (
                           <div
                              className='size-3.5 rounded-full border border-zinc-200'
                              style={{
                                 background: item?.variant?.color.hex_code
                              }}
                           />
                        )}
                     </div>
                  ))}
               </div>

               {/* Footer */}
               <div className='mt-4 flex items-center justify-between border-t border-zinc-100 pt-3'>
                  <span className='text-sm text-zinc-500'>
                     Số lượng: <span className='font-semibold text-zinc-700'>{item.quantity}</span>
                  </span>

                  <span className='text-base font-bold text-zinc-900 tabular-nums sm:text-lg'>
                     {formatVNCurrency(item?.quantity * item?.price)}
                  </span>
               </div>
            </div>
         </div>
      </div>
   )
}

export default SummaryItem
