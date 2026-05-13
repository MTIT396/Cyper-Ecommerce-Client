'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import Image from 'next/image'

import Container from '@/components/Container'

import ProgressBar from '@/components/features/order/address/ProgressBar'
import SummaryItem from '@/components/features/order/payment/SummaryItem'
import CartItemSkeleton from '@/components/features/cart/CartItemSkeleton'

import BodyContent from '@/components/shared/BodyContent'
import Button from '@/components/shared/Button'
import FallbackExpired from '@/components/shared/FallbackExpired'
import InfoRow from '@/components/shared/InfoRow'
import LoadingModal from '@/components/shared/LoadingModal'
import RadioWrapper from '@/components/shared/RadioWrapper'
import ReminderBox from '@/components/shared/ReminderBox'

import { RadioGroup } from '@/components/ui/radio-group'

import { useAddressQuery } from '@/hooks/useAddressQuery'
import { useCartQuery } from '@/hooks/useCartQuery'
import { useCreateOrder } from '@/hooks/useOrderQuery'
import { usePaymentMomoQuery } from '@/hooks/usePaymentMomoQuery'

import { useCheckoutStore } from '@/store/checkout.store'

import { PaymentOptions } from '@/constants/options.constant'

import { formatVNCurrency } from '@/lib/utils'

import { CreateOrderRequest } from '@/types/order.type'

import { CreditCard, Loader2, MapPin, Truck } from 'lucide-react'
import InfoItem from '@/components/shared/InfoItem'

const PaymentPage = () => {
   // hooks & states
   const router = useRouter()

   const { addresses } = useAddressQuery()

   const { addressId, shippingMethod, paymentMethod, clearCheckout, updateCheckout } =
      useCheckoutStore()

   const { createMomoPayment } = usePaymentMomoQuery()

   const { createOrder, isCreating } = useCreateOrder()

   const { cart, isLoading } = useCartQuery()

   const [selectedValue, setSelectedValue] = useState<string>('')

   const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

   // resolve address
   const address = addresses.find((address) => address.id === addressId)

   // place order
   const handlePlaceOrder = async (data: CreateOrderRequest) => {
      try {
         setIsSubmitting(true)

         const created = await createOrder(data)

         if (paymentMethod === 'momo') {
            createMomoPayment({
               orderId: created.data.order_id
            })
         } else {
            router.push(`/user/orders/${created.data.order_id}`)
         }

         setTimeout(() => {
            clearCheckout()
         }, 0)
      } catch (err) {
         console.error(err)
         setIsSubmitting(false)
      }
   }

   // fallback
   if (!shippingMethod || !address || !cart?.items.length) {
      if (isSubmitting) {
         return (
            <Container className='flex min-h-screen items-center justify-center'>
               <div className='flex items-center gap-3 text-base font-medium text-zinc-600'>
                  <Loader2 className='size-6 animate-spin' />
                  Đang xử lý đơn hàng...
               </div>
            </Container>
         )
      }

      return <FallbackExpired />
   }

   return (
      <>
         <LoadingModal isOpen={isCreating} />

         <Container>
            <BodyContent className='pb-10'>
               {/* Progress */}
               <ProgressBar step={3} className='py-6 sm:py-8' />

               {/* Header */}
               <div className='mb-6 sm:mb-8'>
                  <h1 className='text-xl font-semibold text-zinc-900 sm:text-2xl'>Thanh toán</h1>

                  <p className='mt-1 text-sm text-zinc-500'>
                     Kiểm tra lại thông tin đơn hàng trước khi hoàn tất thanh toán.
                  </p>
               </div>

               {/* Layout */}
               <div className='grid gap-6 lg:grid-cols-[1.4fr_0.8fr]'>
                  {/* LEFT */}
                  <div className='space-y-6'>
                     {/* Order Summary */}
                     <div className='overflow-hidden rounded-3xl border border-zinc-200 bg-white'>
                        <div className='border-b border-zinc-100 px-5 py-4 sm:px-6'>
                           <h2 className='text-lg font-semibold text-zinc-900'>Tóm tắt đơn hàng</h2>
                        </div>

                        <div className='space-y-4 p-4 sm:p-6'>
                           {isLoading ? (
                              <CartItemSkeleton count={3} />
                           ) : (
                              cart?.items.map((item) => <SummaryItem key={item.id} item={item} />)
                           )}
                        </div>
                     </div>

                     {/* Shipping Info */}
                     <div className='rounded-3xl border border-zinc-200 bg-white p-5 sm:p-6'>
                        <div className='space-y-6'>
                           {/* Address */}
                           <InfoItem
                              label='Địa chỉ giao hàng'
                              icon={MapPin}
                              info={`${address.street}, ${address.ward}, ${address.province}`}
                           />
                           {/* Shipping */}
                           <InfoItem
                              label='Phương thức vận chuyển'
                              icon={Truck}
                              info={shippingMethod.value}
                           />
                        </div>
                     </div>

                     {/* Pricing */}
                     <div className='rounded-3xl border border-zinc-200 bg-white p-5 sm:p-6'>
                        <div className='space-y-4'>
                           <InfoRow
                              label='Tạm tính'
                              content={formatVNCurrency(cart.total)}
                              className='text-sm text-zinc-700'
                           />

                           <InfoRow
                              label='Phí vận chuyển'
                              content={
                                 shippingMethod.fee
                                    ? formatVNCurrency(shippingMethod.fee)
                                    : 'Miễn phí'
                              }
                              className='text-sm text-zinc-700'
                           />

                           <InfoRow
                              label='Thành tiền'
                              content={formatVNCurrency(cart.total + shippingMethod.fee)}
                              className='border-t border-zinc-100 pt-4 text-lg font-bold text-zinc-900 sm:text-xl'
                           />
                        </div>
                     </div>
                  </div>

                  {/* RIGHT */}
                  <div className='h-fit rounded-3xl border border-zinc-200 bg-white p-5 sm:p-6 lg:sticky lg:top-24'>
                     <div className='mb-6 flex items-center gap-3'>
                        <div className='flex size-11 items-center justify-center rounded-2xl bg-zinc-100'>
                           <CreditCard className='size-5 text-zinc-700' />
                        </div>

                        <div>
                           <h2 className='text-lg font-semibold text-zinc-900'>Thanh toán</h2>

                           <p className='text-sm text-zinc-500'>
                              Chọn phương thức thanh toán phù hợp.
                           </p>
                        </div>
                     </div>

                     {/* Payment Methods */}
                     <RadioGroup className='space-y-4'>
                        {PaymentOptions.map((option) => (
                           <RadioWrapper
                              key={option.value}
                              disabled={option.disabled}
                              id={option.value}
                              selectedValue={selectedValue}
                              value={option.value}
                              onValueChange={(value) => {
                                 updateCheckout({
                                    paymentMethod: value
                                 })

                                 setSelectedValue(value)
                              }}
                           >
                              <div className='flex items-center gap-3'>
                                 <div className='relative size-10 shrink-0 overflow-hidden rounded-xl border border-zinc-200 bg-white'>
                                    <Image
                                       src={option.imgUrl}
                                       alt={option.value}
                                       fill
                                       className='object-contain p-1.5'
                                    />
                                 </div>

                                 <div className='min-w-0'>
                                    <h3 className='text-sm font-semibold text-zinc-900'>
                                       {option.label}
                                    </h3>

                                    <p className='mt-0.5 text-xs text-zinc-500'>{option.value}</p>
                                 </div>
                              </div>
                           </RadioWrapper>
                        ))}
                     </RadioGroup>

                     {/* Actions */}
                     <div className='mt-8 flex flex-col-reverse gap-3 border-t border-zinc-100 pt-6'>
                        <Button
                           onClick={() => router.back()}
                           variant='outline'
                           className='h-11 rounded-xl text-sm font-medium'
                        >
                           Trở về
                        </Button>

                        {!selectedValue ? (
                           <ReminderBox
                              title='Chưa chọn phương thức thanh toán'
                              desc='Vui lòng chọn phương thức thanh toán trước khi đặt hàng.'
                              onConfirm={() => {}}
                           >
                              <Button
                                 variant='primary'
                                 className='h-11 rounded-xl text-sm font-medium'
                              >
                                 Đặt hàng
                              </Button>
                           </ReminderBox>
                        ) : (
                           <Button
                              onClick={() =>
                                 handlePlaceOrder({
                                    addressId: addressId,
                                    paymentMethod: paymentMethod,
                                    shippingFee: shippingMethod.fee
                                 } as CreateOrderRequest)
                              }
                              isLoading={isCreating}
                              loadingText='Đang xử lý...'
                              variant='primary'
                              className='h-11 rounded-xl text-sm font-medium'
                           >
                              Đặt hàng
                           </Button>
                        )}
                     </div>
                  </div>
               </div>
            </BodyContent>
         </Container>
      </>
   )
}

export default PaymentPage
