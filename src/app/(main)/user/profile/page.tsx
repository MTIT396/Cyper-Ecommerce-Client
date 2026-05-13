'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ShoppingBag, Package } from 'lucide-react'

import Container from '@/components/Container'
import BodyContent from '@/components/shared/BodyContent'
import Button from '@/components/shared/Button'
import CartSheet from '@/components/features/cart/CartSheet'

import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

import { useAuth } from '@/hooks/useAuth'
import { useCartQuery } from '@/hooks/useCartQuery'
import { useOrders } from '@/hooks/useOrderQuery'

import { formatVNCurrency } from '@/lib/utils'

import { EditProfileDialog } from '@/components/features/profile/EditProfileDialog'
import { ChangePasswordDialog } from '@/components/features/profile/ChangePasswordDialog'
import { CheckoutStatus } from '@/types/order.type'
import { FadeMotionWrapper } from '@/components/shared/FadeMotionWrapper'
import { FadeUpVariants } from '@/lib/variants'
import StatRow from '@/components/shared/StatRow'

export default function ProfilePage() {
   const { user } = useAuth()

   const { cart } = useCartQuery()
   const { orders } = useOrders(1, 10)

   const [editProfileOpen, setEditProfileOpen] = useState(false)
   const [changePasswordOpen, setChangePasswordOpen] = useState(false)

   const totalCost = useMemo(() => {
      return (
         orders?.data
            ?.filter((order) => order.status === CheckoutStatus.completed)
            ?.reduce((total, order) => total + (order.total_amount || 0), 0) || 0
      )
   }, [orders])

   if (!user) {
      return (
         <Container>
            <BodyContent className='space-y-6'>
               <Skeleton className='h-32 w-full rounded-3xl' />
               <Skeleton className='h-[700px] w-full rounded-3xl' />
            </BodyContent>
         </Container>
      )
   }

   return (
      <FadeMotionWrapper customVariants={FadeUpVariants}>
         {/* MAIN */}
         <div className='space-y-6'>
            {/* QUICK INFO */}
            <div className='grid grid-cols-1 gap-6 xl:grid-cols-2'>
               <Card className='h-fit rounded-3xl border-0 shadow-sm'>
                  <CardContent>
                     <div className='mb-6 flex items-center gap-3'>
                        <ShoppingBag className='text-primary size-6' />

                        <h3 className='text-xl font-bold'>Giỏ hàng</h3>
                     </div>

                     {cart && cart.items.length > 0 ? (
                        <div className='space-y-4'>
                           <StatRow label='Tổng tiền' content={formatVNCurrency(cart.total || 0)} />
                           <StatRow label='Sản phẩm' content={`${cart.items.length} sản phẩm`} />

                           <CartSheet>
                              <Button variant='outline' className='mt-4 w-full text-sm'>
                                 Xem giỏ hàng
                              </Button>
                           </CartSheet>
                        </div>
                     ) : (
                        <div className='flex min-h-[450px] flex-col items-center justify-center text-center'>
                           <div className='mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-zinc-50'>
                              <ShoppingBag className='size-12 text-zinc-400' />
                           </div>

                           <h2 className='text-2xl font-bold text-zinc-900'>
                              Giỏ hàng của bạn đang trống
                           </h2>

                           <p className='mt-3 max-w-md text-sm leading-6 text-zinc-500'>
                              Hiện tại bạn chưa thêm sản phẩm nào. Hãy khám phá các sản phẩm mới và
                              bắt đầu mua sắm.
                           </p>

                           <Link href='/'>
                              <Button
                                 variant='secondary'
                                 className='mt-8 rounded-full px-10 text-sm'
                              >
                                 Khám phá sản phẩm
                              </Button>
                           </Link>
                        </div>
                     )}
                  </CardContent>
               </Card>

               <Card className='rounded-3xl border-0 shadow-sm'>
                  <CardContent>
                     <div className='mb-6 flex items-center gap-3'>
                        <Package className='text-primary size-6' />
                        <h3 className='text-xl font-bold'>Đơn hàng </h3>
                     </div>

                     {orders?.data.length ? (
                        <div className='space-y-4'>
                           <StatRow label='Tổng đơn hàng' content={`${orders.data.length} đơn`} />
                           <StatRow label='Tổng tiêu' content={formatVNCurrency(totalCost)} />

                           <Link href='/user/profile/order'>
                              <Button variant='outline' className='mt-4 w-full text-sm'>
                                 Xem tất cả đơn hàng
                              </Button>
                           </Link>
                        </div>
                     ) : (
                        <div className='flex min-h-[450px] flex-col items-center justify-center text-center'>
                           <div className='mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-50'>
                              <Package className='size-12 text-red-400' />
                           </div>

                           <h2 className='text-2xl font-bold text-zinc-900'>
                              Bạn chưa có đơn hàng nào
                           </h2>

                           <p className='mt-3 max-w-md text-sm leading-6 text-zinc-500'>
                              Hiện tại bạn chưa thực hiện đơn mua hàng nào. Hãy khám phá các sản
                              phẩm mới và bắt đầu mua sắm.
                           </p>

                           <Link href='/'>
                              <Button
                                 variant='secondary'
                                 className='mt-8 rounded-full px-10 text-sm'
                              >
                                 Khám phá sản phẩm
                              </Button>
                           </Link>
                        </div>
                     )}
                  </CardContent>
               </Card>
            </div>
         </div>

         {/* DIALOGS */}
         <EditProfileDialog
            defaultValues={{
               username: user.username,
               avatar: user.avatar
            }}
            isOpen={editProfileOpen}
            onOpenChange={setEditProfileOpen}
         />

         <ChangePasswordDialog isOpen={changePasswordOpen} onOpenChange={setChangePasswordOpen} />
      </FadeMotionWrapper>
   )
}
