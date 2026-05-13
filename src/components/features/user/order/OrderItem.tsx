'use client'

import { formatVNCurrency } from '@/lib/utils'
import { CartItem } from '@/types/cart.type'

import Image from 'next/image'
import Link from 'next/link'

const OrderItem = ({ item }: { item: CartItem }) => {
   return (
      <Link href={`/product/${item.slug}?sku=${item.variant?.sku}`} className='group block'>
         <div className='flex gap-3 rounded-2xl border border-zinc-200 bg-white p-3 transition-all duration-300 hover:border-zinc-300 hover:shadow-sm sm:gap-4 sm:p-4'>
            {/* Product Image */}
            <div className='shrink-0'>
               <Image
                  width={96}
                  height={96}
                  src={item.image_url as string}
                  alt={item.name as string}
                  className='size-20 rounded-xl object-contain p-2 sm:size-24'
               />
            </div>

            {/* Content */}
            <div className='flex min-w-0 flex-1 flex-col justify-between gap-3 sm:flex-row sm:items-start'>
               {/* Left Content */}
               <div className='min-w-0 flex-1'>
                  {/* Product Name */}
                  <h2 className='line-clamp-2 text-sm leading-5 font-semibold text-zinc-900 sm:text-base'>
                     {item.name}
                  </h2>

                  {/* Attributes */}
                  <div className='mt-3 flex flex-col gap-1.5'>
                     {item.variant?.attributes.map((attr) => (
                        <div
                           key={attr.id}
                           className='flex flex-wrap items-center gap-2 text-sm text-zinc-600'
                        >
                           <span className='font-medium text-zinc-700'>{attr.name}:</span>

                           <span className='text-primary font-medium'>{attr.value}</span>

                           {attr.slug === 'color' && (
                              <div
                                 className='size-4 rounded-full border border-zinc-200 shadow-sm'
                                 style={{
                                    background: item.variant?.color.hex_code
                                 }}
                              />
                           )}
                        </div>
                     ))}
                  </div>
               </div>

               {/* Right Content */}
               <div className='flex shrink-0 flex-row items-end justify-between gap-2 sm:min-w-[120px] sm:flex-col sm:items-end'>
                  {/* Price */}
                  <span className='text-base font-bold text-zinc-900 tabular-nums sm:text-lg'>
                     {formatVNCurrency(item.quantity * item.price)}
                  </span>

                  {/* Quantity */}
                  <span className='text-sm text-zinc-500'>
                     SL: <span className='font-semibold text-zinc-700'>{item.quantity}</span>
                  </span>
               </div>
            </div>
         </div>
      </Link>
   )
}

export default OrderItem
