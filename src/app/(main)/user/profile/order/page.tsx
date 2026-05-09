'use client'

import { Package } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

import OrderTable from '@/components/features/user/order/OrderTable'
import Pagination from '@/components/shared/Pagination'
import Button from '@/components/shared/Button'

import { useOrders } from '@/hooks/useOrderQuery'

import Link from 'next/link'
import { FadeMotionItem } from '@/components/shared/FadeMotionItem'
import { FadeUpVariants, LeftInVariants } from '@/lib/variants'
import { FadeMotionWrapper } from '@/components/shared/FadeMotionWrapper'

export default function OrderPage() {
   const searchParams = useSearchParams()

   const page = Number(searchParams.get('page')) || 1

   const { orders, isLoadingOrders } = useOrders(page, 10)

   const totalPages = orders?.meta.total_pages || 1
   const orderList = orders?.data || []

   return (
      <FadeMotionWrapper customVariants={LeftInVariants}>
         <FadeMotionItem
            variants={FadeUpVariants}
            className='rounded-3xl bg-white p-4 shadow-sm sm:p-8'
         >
            {/* HEADER */}
            <div className='mb-8 flex items-center justify-between'>
               <div>
                  <h1 className='text-xl font-bold text-zinc-900 sm:text-2xl'>Đơn hàng của tôi</h1>

                  <p className='text-extra-gray mt-1 text-xs sm:text-sm'>
                     Theo dõi và quản lý các đơn hàng của bạn
                  </p>
               </div>

               {!!orderList.length && (
                  <div className='text-dark-gray bg-light-gray rounded-2xl px-4 py-2 text-xs font-medium text-nowrap sm:text-sm'>
                     {orders?.meta.total || 0} đơn hàng
                  </div>
               )}
            </div>

            {/* EMPTY UI */}
            {!isLoadingOrders && !orderList.length ? (
               <div className='flex min-h-[450px] flex-col items-center justify-center text-center'>
                  <div className='mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-50'>
                     <Package className='size-12 text-red-400' />
                  </div>

                  <h2 className='text-2xl font-bold text-zinc-900'>Bạn chưa có đơn hàng nào</h2>

                  <p className='mt-3 max-w-md text-sm leading-6 text-zinc-500'>
                     Hiện tại bạn chưa thực hiện đơn mua hàng nào. Hãy khám phá các sản phẩm mới và
                     bắt đầu mua sắm.
                  </p>

                  <Link href='/'>
                     <Button variant='secondary' className='mt-8 rounded-full px-10 text-sm'>
                        Khám phá sản phẩm
                     </Button>
                  </Link>
               </div>
            ) : (
               <>
                  {/* TABLE */}
                  <OrderTable orders={orderList} />

                  {/* PAGINATION */}
                  {totalPages > 1 && (
                     <div className='mt-8'>
                        <Pagination totalPages={totalPages} isLoading={isLoadingOrders} />
                     </div>
                  )}
               </>
            )}
         </FadeMotionItem>
      </FadeMotionWrapper>
   )
}
