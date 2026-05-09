'use client'

import ProductCard from '@/components/ProductCard'
import ProductsToolbar from './ProductsToolbar'
import { Product } from '@/types/product.type'
import BadgeOnFilter from './BadgeOnFilter'
import { URLParams } from '@/types/filter.type'
import NoProductAvailable from '@/components/shared/NoProductAvailable'
import { useQueryString } from '@/hooks/useQueryString'
import { useBuildFilterBadges } from '@/hooks/useBuildFilterBadges'
import Button from '@/components/shared/Button'
import { usePathname, useRouter } from 'next/navigation'
import ProductCardSkeleton from '@/components/ui/skeleton/ProductCardSkeleton'
import { FadeMotionWrapper } from '@/components/shared/FadeMotionWrapper'
import { FadeMotionItem } from '@/components/shared/FadeMotionItem'
import { FadeUpVariants } from '@/lib/variants'

interface ProductsGridProps {
   isLoading: boolean
   categoryId?: number
   products: Product[]
   isShowSidebar: boolean
   onShowSidebar: () => void
}

export default function ProductsGrid({
   isLoading,
   categoryId,
   products,
   isShowSidebar,
   onShowSidebar
}: ProductsGridProps) {
   const router = useRouter()
   const pathname = usePathname()

   const handleClearAllQuery = () => {
      router.replace(pathname)
   }

   const urlParams: URLParams = useQueryString()

   const badges = useBuildFilterBadges(urlParams, categoryId as number)

   if (!products) return null

   return (
      <div className='w-full'>
         <ProductsToolbar
            products={products}
            isShowSidebar={isShowSidebar}
            onShowSidebar={onShowSidebar}
         />
         {/* Badges Filter Bar */}
         <div className='mb-4 flex flex-wrap items-center gap-2'>
            {badges.map((badge, index) => (
               <BadgeOnFilter key={`${badge.key}-${index}`} badge={badge} />
            ))}
            {badges.length > 1 && (
               <Button
                  onClick={handleClearAllQuery}
                  variant='icon'
                  className='size-fit border-none px-4 py-2 text-sm text-red-500 shadow-none hover:bg-transparent hover:text-red-600'
               >
                  Xóa tất cả
               </Button>
            )}
         </div>
         {isLoading ? (
            <div className='grid grid-cols-2 gap-1.5 sm:gap-4 md:grid-cols-3'>
               {Array.from({ length: 6 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
               ))}
            </div>
         ) : !!products.length ? (
            <FadeMotionWrapper className='grid grid-cols-2 gap-1.5 sm:gap-4 md:grid-cols-3'>
               {products.map((product) => (
                  <FadeMotionItem variants={FadeUpVariants} key={product.id}>
                     <ProductCard product={product} />
                  </FadeMotionItem>
               ))}
            </FadeMotionWrapper>
         ) : (
            <NoProductAvailable />
         )}
      </div>
   )
}
