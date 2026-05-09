import React from 'react'
import { Body, Content, Skeleton } from '../skeleton'

const FilterSidebarSkeleton = () => {
   return (
      <div className='w-full max-w-80'>
         <div className='scrollbar max-h-[calc(100vh-200px)] space-y-6 pr-1'>
            <Body>
               <Content>
                  <Skeleton className='h-4 w-1/3' />
                  <Skeleton className='h-4 w-3/4' />
                  <Skeleton className='h-16' />
                  <Skeleton className='h-16' />
                  <Skeleton className='h-4 w-3/4' />
                  <Skeleton className='h-16' />
                  <Skeleton className='h-16' />
                  <Skeleton className='h-4 w-3/4' />
                  <Skeleton className='h-10' />
               </Content>
            </Body>
         </div>
      </div>
   )
}

export default FilterSidebarSkeleton
