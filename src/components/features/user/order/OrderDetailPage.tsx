'use client'

import { useEffect, useState } from 'react'

import Container from '@/components/Container'
import Loading from '@/components/shared/Loading'
import BodyContent from '@/components/shared/BodyContent'
import Button from '@/components/shared/Button'
import InfoCard from '@/components/shared/InfoCard'
import InfoRow from '@/components/shared/InfoRow'
import OrderItem from './OrderItem'
import OrderProgressbar from './OrderProgressbar'
import PaymentDialog from '@/components/shared/PaymentDialog'
import ReminderBox from '@/components/shared/ReminderBox'

import {
   BadgeCheckIcon,
   Clock,
   CreditCard,
   Mail,
   MapPinHouse,
   Package,
   Phone,
   ShoppingBag,
   User,
   Wallet,
   X
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'

import Link from 'next/link'
import Image from 'next/image'

import { formatDateTime, formatVNCurrency } from '@/lib/utils'

import { PaymentOptions } from '@/constants/options.constant'

import { CheckoutStatus, Order } from '@/types/order.type'

import { useCancelOrder, useOrderDetail } from '@/hooks/useOrderQuery'
import { usePaymentMomoQuery } from '@/hooks/usePaymentMomoQuery'
import InfoItem from '@/components/shared/InfoItem'

const OrderDetailPage = ({ order_id }: { order_id: number }) => {
   const [open, setOpen] = useState(false)

   const { order, isLoadingOrder } = useOrderDetail(order_id)

   const { cancelOrderAsync, isCancelling } = useCancelOrder()

   const { checkStatus } = usePaymentMomoQuery()

   const [isCheckingPayment, setIsCheckingPayment] = useState(false)

   const payment = PaymentOptions.find(
      (option) => option.value === order?.payment_method?.toLowerCase()
   )

   /* ================= STATUS ================= */

   const isCancelled = order?.status === CheckoutStatus.cancelled

   const isPaid = order?.status === CheckoutStatus.paid

   const isPending =
      order?.status === CheckoutStatus.pending || order?.status === CheckoutStatus.confirm

   const canCancelOrder = order?.can_cancel

   /* ================= PAYMENT CHECK ================= */

   useEffect(() => {
      if (!order?.id) return

      if (isPaid || isCancelled) return

      const checkPaymentStatus = async () => {
         try {
            setIsCheckingPayment(true)

            const res = await checkStatus({
               orderId: order.id
            })

            if (res.data.paymentStatus === 'success') {
               window.location.reload()
            }
         } catch (error) {
            console.log(error)
         } finally {
            setIsCheckingPayment(false)
         }
      }

      checkPaymentStatus()
   }, [order?.id, isPaid, isCancelled, checkStatus])

   /* ================= HANDLERS ================= */

   const handleClose = () => {
      setOpen(false)
   }

   const handleCancelOrder = async () => {
      if (!order?.id) return

      try {
         const res = await cancelOrderAsync(order.id)

         if (res.data.status === 'cancelled') {
            window.location.reload()
         }
      } catch (error) {
         console.log(error)
      }
   }

   /* ================= LOADING ================= */

   if (isLoadingOrder || isCheckingPayment) {
      return (
         <Container className='flex min-h-screen items-center justify-center'>
            <Loading />
         </Container>
      )
   }

   return (
      <Container>
         <BodyContent>
            <div className='space-y-6'>
               {/* ================= HEADER ================= */}

               <div className='rounded-3xl border bg-white p-5 shadow-sm sm:p-6'>
                  <div className='flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between'>
                     {/* LEFT */}
                     <div>
                        <div className='flex flex-wrap items-center gap-3'>
                           <h1 className='text-3xl font-bold text-black'>Đơn hàng #{order?.id}</h1>

                           {isCancelled ? (
                              <Badge className='rounded-xl border border-red-200 bg-red-50 px-3 py-1 text-red-600'>
                                 <div className='flex items-center gap-1.5'>
                                    <X className='size-3.5' />
                                    Đã hủy
                                 </div>
                              </Badge>
                           ) : isPaid ? (
                              <Badge className='rounded-xl border border-green-200 bg-green-50 px-3 py-1 text-green-600'>
                                 <div className='flex items-center gap-1.5'>
                                    <BadgeCheckIcon className='size-3.5' />
                                    Đã thanh toán
                                 </div>
                              </Badge>
                           ) : (
                              <Badge className='rounded-xl border border-yellow-200 bg-yellow-50 px-3 py-1 text-yellow-700'>
                                 <div className='flex items-center gap-1.5'>
                                    <Clock className='size-3.5' />
                                    Chờ thanh toán
                                 </div>
                              </Badge>
                           )}
                        </div>

                        <p className='text-extra-gray mt-2 text-sm'>
                           Đặt đơn lúc {formatDateTime(order?.created_at as string)}
                        </p>
                     </div>

                     {/* RIGHT */}
                     <div className='grid grid-cols-1 gap-3 sm:grid-cols-3'>
                        <div className='rounded-2xl border bg-zinc-50 px-6 py-4'>
                           <div className='flex items-center gap-3'>
                              <div className='rounded-xl bg-white p-2 shadow-sm'>
                                 <Wallet className='size-4 text-zinc-700' />
                              </div>

                              <div>
                                 <p className='text-extra-gray text-xs'>Tổng thanh toán</p>

                                 <h3 className='mt-1 text-base font-bold'>
                                    {formatVNCurrency(order?.total_amount as number)}
                                 </h3>
                              </div>
                           </div>
                        </div>

                        <div className='rounded-2xl border bg-zinc-50 px-6 py-4'>
                           <div className='flex items-center gap-3'>
                              <div className='rounded-xl bg-white p-2 shadow-sm'>
                                 <Package className='size-4 text-zinc-700' />
                              </div>

                              <div>
                                 <p className='text-extra-gray text-xs'>Mặt hàng</p>

                                 <h3 className='mt-1 text-base font-bold'>
                                    {order?.items.length} sản phẩm
                                 </h3>
                              </div>
                           </div>
                        </div>

                        <div className='rounded-2xl border bg-zinc-50 px-6 py-4'>
                           <div className='flex items-center gap-3'>
                              <div className='rounded-xl bg-white p-2 shadow-sm'>
                                 <CreditCard className='size-4 text-zinc-700' />
                              </div>

                              <div>
                                 <p className='text-extra-gray text-xs'>Thanh toán</p>

                                 <div className='mt-1 flex items-center gap-2'>
                                    <span className='text-sm font-semibold uppercase'>
                                       {order?.payment_method}
                                    </span>

                                    {payment?.imgUrl && (
                                       <div className='relative size-5 overflow-hidden rounded'>
                                          <Image
                                             src={payment.imgUrl}
                                             alt='payment'
                                             fill
                                             className='object-contain'
                                          />
                                       </div>
                                    )}
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* ================= TIMELINE + INFO ================= */}

               <div className='grid gap-6 xl:grid-cols-[1.1fr_0.9fr]'>
                  {/* TIMELINE */}
                  <div className='rounded-3xl border bg-white p-5 shadow-sm sm:p-6'>
                     <div className='mb-6 flex items-center justify-between'>
                        <div>
                           <h2 className='text-xl font-bold text-black'>Trạng thái đơn hàng</h2>

                           <p className='text-extra-gray mt-1 text-sm'>
                              Theo dõi tiến trình xử lý đơn hàng của bạn
                           </p>
                        </div>

                        <div className='rounded-2xl bg-zinc-100 p-3'>
                           <ShoppingBag className='size-5 text-zinc-700' />
                        </div>
                     </div>

                     <OrderProgressbar
                        status={order?.status || CheckoutStatus.pending}
                        isPaid={isPaid}
                     />
                  </div>

                  {/* INFO */}
                  <div className='space-y-6'>
                     <InfoCard title='Thông tin nhận hàng' className='space-y-4'>
                        <InfoItem
                           icon={User}
                           label='Người nhận'
                           info={order?.shipping_address.full_name || ''}
                        />

                        <InfoItem
                           icon={Phone}
                           label='Số điện thoại'
                           info={order?.shipping_address.phone || ''}
                        />

                        <InfoItem
                           icon={MapPinHouse}
                           label='Địa chỉ'
                           info={`${order?.shipping_address.street}, ${order?.shipping_address.ward}, ${order?.shipping_address.province}`}
                        />

                        {order?.shipping_address.email && (
                           <InfoItem
                              icon={Mail}
                              label='Email'
                              info={order?.shipping_address.email || ''}
                           />
                        )}
                     </InfoCard>

                     <InfoCard title='Chi phí đơn hàng'>
                        <InfoRow label='Phương thức thanh toán' content={order?.payment_method} />
                        <InfoRow
                           label='Phí vận chuyển'
                           content={
                              order?.shipping_fee === 0
                                 ? 'Miễn phí'
                                 : formatVNCurrency(order?.shipping_fee as number)
                           }
                        />
                        <InfoRow
                           label='Tạm tính'
                           content={formatVNCurrency(order?.subtotal_amount as number)}
                        />
                        <InfoRow
                           className='text-primary border-t pt-3 text-lg font-bold'
                           label='Tổng cộng'
                           content={formatVNCurrency(order?.total_amount as number)}
                        />
                     </InfoCard>
                  </div>
               </div>

               {/* ================= PRODUCTS ================= */}

               <div className='rounded-3xl border bg-white p-5 shadow-sm sm:p-6'>
                  <div className='mb-6 flex items-center justify-between'>
                     <div>
                        <h2 className='text-xl font-bold text-black'>Sản phẩm đã đặt</h2>

                        <p className='text-extra-gray mt-1 text-sm'>
                           {order?.items.length} sản phẩm trong đơn hàng
                        </p>
                     </div>

                     <div className='rounded-2xl bg-zinc-100 p-3'>
                        <Package className='size-5 text-zinc-700' />
                     </div>
                  </div>

                  <div className='space-y-4'>
                     {order?.items.map((item) => (
                        <OrderItem key={item.id} item={item} />
                     ))}
                  </div>
               </div>

               {/* ================= PAYMENT ================= */}

               {isPending && (
                  <div className='rounded-3xl border border-yellow-200 bg-gradient-to-br from-yellow-50 to-yellow-100/40 p-4 shadow-sm sm:p-5'>
                     <div className='flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between'>
                        {/* Left Content */}
                        <div className='flex items-start gap-4'>
                           {/* Icon */}
                           <div className='flex size-11 shrink-0 items-center justify-center rounded-2xl bg-yellow-100 ring-1 ring-yellow-200'>
                              <CreditCard className='size-5 text-yellow-700' />
                           </div>

                           {/* Text */}
                           <div className='min-w-0'>
                              <h3 className='text-base font-semibold text-zinc-900 sm:text-lg'>
                                 Đơn hàng chưa thanh toán
                              </h3>

                              <p className='mt-1 max-w-xl text-sm leading-6 text-zinc-600'>
                                 Hoàn tất thanh toán để đơn hàng được xử lý và giao đến bạn nhanh
                                 hơn.
                              </p>
                           </div>
                        </div>

                        {/* Actions */}
                        <div className='flex shrink-0 items-center gap-3'>
                           <PaymentDialog
                              order={order as Order}
                              isOpen={open}
                              onClose={handleClose}
                           />

                           <Button
                              onClick={() => setOpen(true)}
                              variant='primary'
                              className='h-11 rounded-xl px-5 text-sm font-medium shadow-sm transition hover:shadow-md'
                           >
                              <CreditCard className='size-4 text-white' />

                              <span>Thanh toán ngay</span>
                           </Button>
                        </div>
                     </div>
                  </div>
               )}

               {/* ================= ACTIONS ================= */}

               <div className='flex flex-col gap-3 sm:flex-row'>
                  <Link href='/user/profile/order' className='flex-1'>
                     <Button variant='outline' className='w-full rounded-xl text-sm'>
                        Xem tất cả đơn hàng
                     </Button>
                  </Link>

                  <Link href='/' className='flex-1'>
                     <Button variant='primary' className='w-full rounded-xl text-sm'>
                        Tiếp tục mua sắm
                     </Button>
                  </Link>

                  {canCancelOrder && (
                     <ReminderBox
                        onConfirm={handleCancelOrder}
                        title='Bạn có chắc muốn hủy đơn hàng này không?'
                     >
                        <Button
                           disabled={isCancelling}
                           isLoading={isCancelling}
                           variant='destructive'
                           loadingText='Đang hủy...'
                        >
                           Hủy đơn hàng
                        </Button>
                     </ReminderBox>
                  )}
               </div>
            </div>
         </BodyContent>
      </Container>
   )
}

export default OrderDetailPage
