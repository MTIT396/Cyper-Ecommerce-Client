'use client'

import Button from '@/components/shared/Button'
import SelectionBox from '@/components/shared/SelectionBox'
import { SelectTrigger, SelectValue } from '@/components/ui/select'
import { sortOptions } from '@/constants/options.constant'
import { useQueryString } from '@/hooks/useQueryString'
import { useUpdateURL } from '@/hooks/useUpdateURL'
import { URLParams } from '@/types/filter.type'
import { Product } from '@/types/product.type'
import { SlidersHorizontal } from 'lucide-react'

export default function ProductsToolbar({
   products,
   onShowSidebar
}: {
   products: Product[]
   isShowSidebar: boolean
   onShowSidebar: () => void
}) {
   const { query }: URLParams = useQueryString()
   const { updateURL } = useUpdateURL()

   const handleValueChange = (value: string) => {
      updateURL('sort', value)
   }

   return (
      <div className='mb-2 flex flex-wrap items-start justify-between gap-2 sm:items-center'>
         {query ? (
            <p className='text-primary text-[15px] font-medium'>
               Kết quả tìm kiếm cho <span className='font-mono text-base font-bold'>{query}</span>{' '}
               <span className='font-mono text-base font-bold'>({products.length})</span>
            </p>
         ) : (
            products.length > 0 && (
               <p className='text-dark-gray text-sm font-medium sm:text-[15px]'>
                  Sản phẩm có sẵn: <b>{products.length}</b>
               </p>
            )
         )}
         <div className='ml-auto flex flex-col items-center gap-2 sm:flex-row sm:gap-6'>
            <Button
               onClick={onShowSidebar}
               variant='secondary'
               className='ml-auto size-fit rounded-md px-2.5 py-2 text-sm lg:hidden'
            >
               <span>Mở bộ lọc</span>
               <SlidersHorizontal className='size-5' />
            </Button>
            <SelectionBox
               searchMode={false}
               header=''
               className='w-50'
               options={sortOptions}
               onValueChange={handleValueChange}
            >
               <SelectTrigger className='w-full rounded-md transition'>
                  <SelectValue placeholder='Sắp xếp theo' />
               </SelectTrigger>
            </SelectionBox>
         </div>
      </div>
   )
}
