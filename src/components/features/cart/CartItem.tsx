'use client'

import Button from '@/components/shared/Button'
import QuantityInput from '@/components/shared/QuantityInput'
import ReminderBox from '@/components/shared/ReminderBox'

import { useCartQuery } from '@/hooks/useCartQuery'

import { formatVNCurrency } from '@/lib/utils'

import type { CartItem } from '@/types/cart.type'

import { Trash2 } from 'lucide-react'

import Image from 'next/image'
import Link from 'next/link'

type CartItemProps = {
   item?: CartItem
}

const CartItem = ({ item }: CartItemProps) => {
   const { removeFromCart, updateCartItem } = useCartQuery()

   const handleUpdateQuantity = (quantity: number) => {
      updateCartItem({
         item_id: item?.id as number,
         quantity
      })
   }

   const handleRemoveItem = () => {
      removeFromCart(item?.id as number)
   }

   return (
      <div className='rounded-2xl border border-zinc-200 bg-white p-4 transition-all duration-300 hover:border-zinc-300 hover:shadow-sm'>
         <div className='flex gap-3'>
            {/* Product Image */}
            <Link href={`/product/${item?.slug}?sku=${item?.variant?.sku}`} className='shrink-0'>
               <Image
                  width={88}
                  height={88}
                  src={item?.image_url as string}
                  alt={item?.name as string}
                  className='size-20 rounded-xl object-contain p-2 sm:size-[88px]'
               />
            </Link>

            {/* Right Content */}
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

               {/* Bottom Section */}
               <div className='mt-4 flex flex-col gap-3 border-t border-zinc-100 pt-3 sm:flex-row-reverse sm:items-center sm:justify-between'>
                  {/* Quantity + Remove */}
                  <div className='ml-auto flex items-center gap-2'>
                     <QuantityInput
                        onChange={(value) => handleUpdateQuantity(value)}
                        initialValue={item?.quantity}
                     />

                     <ReminderBox
                        title='Xóa sản phẩm'
                        desc='Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng không?'
                        onConfirm={handleRemoveItem}
                     >
                        <Button
                           aria-label='remove-item'
                           variant='icon'
                           className='size-9 rounded-full border border-red-200 bg-red-50 p-0 text-red-500 shadow-none transition hover:border-red-300 hover:bg-red-100 hover:text-red-600'
                        >
                           <Trash2 className='size-4' />
                        </Button>
                     </ReminderBox>
                  </div>

                  {/* Price */}
                  <span className='text-right text-lg font-bold text-zinc-900 tabular-nums'>
                     {formatVNCurrency((item?.quantity as number) * (item?.price as number))}
                  </span>
               </div>
            </div>
         </div>
      </div>
   )
}

export default CartItem
