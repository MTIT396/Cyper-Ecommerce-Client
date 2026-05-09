import { formatVNCurrency } from '@/lib/utils'
import { CartItem } from '@/types/cart.type'
import Image from 'next/image'
import Link from 'next/link'

const OrderItem = ({ item }: { item: CartItem }) => {
   return (
      <Link
         href={`/product/${item.slug}?sku=${item.variant?.sku}`}
         className='flex items-center gap-4'
      >
         <div className='flex w-full items-center gap-3 rounded-xl border p-4'>
            <Image
               width={90}
               height={90}
               className='rounded-lg object-contain p-1.5'
               src={item?.image_url as string}
               alt={item?.name as string}
            />
            <div className='flex w-full items-center gap-6'>
               <div className='flex flex-col gap-x-2'>
                  <h2 className='text-dark-gray mb-1.5 line-clamp-2 text-sm font-semibold'>
                     {item?.name}
                  </h2>
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
               <div className='ml-auto flex flex-col justify-center gap-2'>
                  <span className='w-[100px] shrink-0 text-right text-base font-semibold tabular-nums'>
                     {formatVNCurrency(item.quantity * item.price)}
                  </span>
                  <span className='text-dark-gray text-right text-sm font-medium'>
                     Số lượng: <span className='font-semibold'> {item.quantity}</span>
                  </span>
               </div>
            </div>
         </div>
      </Link>
   )
}

export default OrderItem
