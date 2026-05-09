import { formatVNCurrency } from '@/lib/utils'
import { Product } from '@/types/product.type'
import Image from 'next/image'
import Link from 'next/link'

export default function ProductSuggestItem({ product }: { product: Product }) {
   const salePercent = ((product.base_price - product.sale_price) / product.base_price) * 100
   return (
      <Link
         href={`/product/${product.slug}`}
         className='hover:bg-light-gray flex cursor-pointer items-center gap-3 rounded-md p-2 font-mono transition duration-300 ease-in-out'
      >
         <Image
            src={product.image_url}
            alt={product.name}
            width={56}
            height={56}
            className='rounded-md object-contain'
         />
         <div className='flex-1'>
            <p className='line-clamp-2 text-[13px] font-medium'>{product.name}</p>

            <div className='flex flex-col'>
               <div className='flex items-center gap-2'>
                  <span className='text-sm font-semibold'>
                     {formatVNCurrency(product.sale_price)}
                  </span>
                  <span className='ml-2 text-xs font-semibold text-red-600'>
                     -{Math.round(salePercent)}%
                  </span>
               </div>
               <span className='text-extra-gray text-[13px] line-through'>
                  {formatVNCurrency(product.base_price)}
               </span>
            </div>
         </div>
      </Link>
   )
}
