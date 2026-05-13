'use client'

import { ListFilter, X } from 'lucide-react'

import CheckboxFilter from '@/components/features/catalog/CheckboxFilter'
import FilterSidebarSkeleton from '@/components/ui/skeleton/FilterSidebarSkeleton'
import Button from '@/components/shared/Button'

import { useFilterProducts } from '@/hooks/useFilterProducts'
import { useCategories } from '@/hooks/useCategories'

import { cn } from '@/lib/utils'
import ColorFilter from '@/components/features/catalog/ColorFilter'
import FilterSection from '@/components/features/catalog/FilterSection'

interface FilterSidebarProps {
   categorySlug?: string
   isShowSidebar: boolean
   onClose?: () => void
}

export default function FilterSidebar({
   categorySlug,
   isShowSidebar,
   onClose
}: FilterSidebarProps) {
   const { data: categories } = useCategories()

   const currentCategory = categories?.find((c) => c.slug === categorySlug)

   const { filters, isLoading } = useFilterProducts(currentCategory?.id as number)

   return (
      <>
         {/* Skeleton */}
         {(isLoading || !filters) && (
            <aside className='hidden lg:block lg:w-full lg:max-w-80'>
               <FilterSidebarSkeleton />
            </aside>
         )}

         {/* Sidebar */}
         {filters && (
            <>
               {/* Overlay */}
               <div
                  onClick={onClose}
                  className={cn(
                     'fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] transition-all duration-300 lg:hidden',
                     isShowSidebar ? 'visible opacity-100' : 'invisible opacity-0'
                  )}
               />

               {/* Sidebar */}
               <aside
                  className={cn(
                     'fixed top-0 left-0 z-50 flex h-dvh w-[88%] max-w-[340px] flex-col bg-white shadow-2xl transition-all duration-300 ease-out lg:sticky lg:top-4 lg:z-auto lg:h-fit lg:max-h-[calc(100vh-32px)] lg:w-full lg:max-w-80 lg:shadow-none',
                     isShowSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                  )}
               >
                  {/* Header */}
                  <div className='flex items-center justify-between border-b px-5 py-4 lg:px-0 lg:pt-0'>
                     <div className='flex items-center gap-x-2 text-lg font-semibold'>
                        <ListFilter size={18} />
                        <span>Bộ lọc tìm kiếm</span>
                     </div>

                     {/* Close */}
                     <Button
                        onClick={onClose}
                        variant='icon'
                        className='size-fit rounded-full border-none p-2 shadow-none lg:hidden'
                     >
                        <X className='size-5' />
                     </Button>
                  </div>

                  {/* Content */}
                  <div className='scrollbar flex-1 space-y-6 overflow-y-auto px-5 py-5 lg:px-0 lg:pb-0'>
                     {/* Brand */}
                     <CheckboxFilter
                        multiple
                        header='Hãng sản xuất'
                        options={filters.brands}
                        paramKey='brands'
                        className='border-b pb-4'
                        onChecked={onClose}
                     />

                     {/* Price */}
                     <CheckboxFilter
                        header='Mức giá'
                        options={filters.price}
                        paramKey='price'
                        className='border-b pb-4'
                        onChecked={onClose}
                     />

                     {/* Specs */}
                     {filters.specs.length > 0 &&
                        filters.specs.map((spec) => (
                           <CheckboxFilter
                              key={spec.slug}
                              header={spec.name}
                              options={spec.values}
                              paramKey='specs'
                              specKey={spec.slug}
                              className='border-b pb-4'
                              multiple
                              onChecked={onClose}
                           />
                        ))}

                     {/* Price */}
                     {filters.colors.length > 0 && (
                        <FilterSection header='Màu sắc'>
                           <ColorFilter options={filters.colors} />
                        </FilterSection>
                     )}

                     {/* Rating */}
                     <CheckboxFilter
                        header='Xếp hạng'
                        options={filters.rating}
                        paramKey='rating'
                        className='border-b pb-4'
                        multiple
                        onChecked={onClose}
                     />
                  </div>
               </aside>
            </>
         )}
      </>
   )
}
