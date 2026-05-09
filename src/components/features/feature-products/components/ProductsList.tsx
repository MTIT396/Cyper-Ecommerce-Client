'use client'

import ProductCard from '@/components/ProductCard'
import Button from '@/components/shared/Button'
import ProductCardSkeleton from '@/components/ui/skeleton/ProductCardSkeleton'
import { useInfiniteProducts } from '@/hooks/useProductsQuery'
import { ChevronDown } from 'lucide-react'

type Props = {
   type: 'bestseller' | 'newest' | 'featured'
}

export default function ProductList({ type }: Props) {
   const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteProducts({
      params: { type },
      pageSize: 12
   })

   const total = data?.pages?.[0]?.meta?.total
   const products = data?.pages.flatMap((page) => page.data) ?? []
   const remaining = (total ?? 0) - products.length

   return (
      <div className='mt-4'>
         {isLoading ? (
            <div className='grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 md:grid-cols-4'>
               {Array.from({ length: 8 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
               ))}
            </div>
         ) : products.length ? (
            <>
               <ul className='grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 md:grid-cols-4'>
                  {products.map((product) => (
                     <ProductCard key={product.id} product={product} />
                  ))}
               </ul>
               {hasNextPage && (
                  <div className='mt-6 flex justify-center'>
                     <Button
                        variant='icon'
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        className='bg-bg-gray/80 hover:bg-bg-gray rounded-full border px-4 py-2 text-[15px]'
                     >
                        {isFetchingNextPage ? (
                           'Đang tải...'
                        ) : (
                           <>
                              Xem thêm {Math.max(remaining, 0)} sản phẩm
                              <ChevronDown size={18} />
                           </>
                        )}
                     </Button>
                  </div>
               )}

               {!hasNextPage && !isLoading && (
                  <p className='mt-10 text-center text-[15px]'>Đã hiển thị tất cả sản phẩm</p>
               )}
            </>
         ) : (
            <div className='text-extra-gray flex h-40 items-center justify-center'>
               Không có sản phẩm
            </div>
         )}
      </div>
   )
}
