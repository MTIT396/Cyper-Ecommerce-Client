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
      updateCartItem({ item_id: item?.id as number, quantity })
   }

   const handleRemoveItem = () => {
      removeFromCart(item?.id as number)
   }

   return (
      <>
         <div className='flex items-center gap-3 py-5'>
            <Link href={`/product/${item?.slug}?sku=${item?.variant?.sku}`}>
               <Image
                  width={90}
                  height={90}
                  className='object-contain'
                  src={item?.image_url as string}
                  alt={item?.name as string}
               />
            </Link>
            <div className='flex w-full items-center justify-between gap-6'>
               <div className='flex flex-1 flex-col gap-x-2 gap-y-0.5'>
                  <Link href={`/product/${item?.slug}?sku=${item?.variant?.sku}`}>
                     <h2 className='text-primary mb-1.5 line-clamp-2 text-sm font-semibold'>
                        {item?.name}
                     </h2>
                  </Link>
                  {/* Attributes */}
                  {item?.variant?.attributes.map((attr) => (
                     <div key={attr.id} className='flex items-center gap-2'>
                        <span className='text-dark-gray text-sm'>
                           {attr.name}:{' '}
                           <span className='text-primary font-medium'>{attr.value}</span>
                        </span>
                        {attr.slug === 'color' && (
                           <div
                              className='size-4 rounded-full'
                              style={{ background: item?.variant?.color.hex_code }}
                           />
                        )}
                     </div>
                  ))}
               </div>
               {/* Actions */}
               <div className='flex shrink-0 flex-col items-end gap-2.5'>
                  <span className='text-base font-semibold tabular-nums'>
                     {formatVNCurrency((item?.quantity as number) * (item?.price as number))}
                  </span>
                  <div className='flex items-center gap-2.5'>
                     <QuantityInput
                        onChange={(value) => handleUpdateQuantity(value)}
                        initialValue={item?.quantity}
                     />
                     <ReminderBox
                        title='Xóa sản phẩm này'
                        desc='Bạn có chắc chắn muốn xóa mặt hàng này không? Thao tác này không thể hoàn tác và mặt hàng này sẽ bị xóa khỏi giỏ hàng của bạn.'
                        onConfirm={handleRemoveItem}
                     >
                        <Button
                           aria-label='remove-item'
                           variant='icon'
                           className='rounded-md border-0 p-1 text-red-500 shadow-none hover:bg-transparent hover:text-red-600'
                        >
                           <Trash2 className='size-5' />
                        </Button>
                     </ReminderBox>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default CartItem
