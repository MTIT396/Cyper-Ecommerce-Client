'use client'
import Container from '@/components/Container'
import Button from '@/components/shared/Button'
import ProgressBar from '@/components/features/order/address/ProgressBar'
import { useRouter } from 'next/navigation'
import { useCartQuery } from '@/hooks/useCartQuery'
import SummaryItem from '@/components/features/order/payment/SummaryItem'
import { useAddressQuery } from '@/hooks/useAddressQuery'
import CartItemSkeleton from '@/components/features/cart/CartItemSkeleton'
import { formatVNCurrency } from '@/lib/utils'
import { useState } from 'react'
import { useCreateOrder } from '@/hooks/useOrderQuery'
import { CreateOrderRequest } from '@/types/order.type'
import InfoRow from '@/components/shared/InfoRow'
import FallbackExpired from '@/components/shared/FallbackExpired'
import Image from 'next/image'
import { RadioGroup } from '@/components/ui/radio-group'
import { usePaymentMomoQuery } from '@/hooks/usePaymentMomoQuery'
import RadioWrapper from '@/components/shared/RadioWrapper'
import ReminderBox from '@/components/shared/ReminderBox'
import LoadingModal from '@/components/shared/LoadingModal'
import BodyContent from '@/components/shared/BodyContent'
import { PaymentOptions } from '@/constants/options.constant'
import { Loader2 } from 'lucide-react'
import { useCheckoutStore } from '@/store/checkout.store'

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

   // handle place order
   const handlePlaceOrder = async (data: CreateOrderRequest) => {
      try {
         setIsSubmitting(true)

         const created = await createOrder(data)

         if (paymentMethod === 'momo') {
            createMomoPayment({ orderId: created.data.order_id })
         } else {
            router.push(`/user/orders/${created.data.order_id}`)
         }

         // clear after trigger navigation
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
      if (isSubmitting)
         return (
            <Container className='flex min-h-screen items-center justify-center'>
               <div className='text-extra-gray flex items-center gap-2 text-base font-medium'>
                  <Loader2 className='size-6 animate-spin' />
                  Đang xử lý đơn hàng...
               </div>
            </Container>
         )
      return <FallbackExpired />
   }
   return (
      <>
         <LoadingModal isOpen={isCreating} />
         <Container>
            <BodyContent>
               <ProgressBar step={3} className='py-6' />

               <div className='flex items-stretch gap-4'>
                  <div className='flex-1 shrink-0 basis-2/3'>
                     <div className='border-input w-full max-w-3xl rounded-md border px-6 py-8'>
                        <h1 className='mb-6 text-2xl font-semibold'>Tóm tắt đơn hàng</h1>

                        <div className='space-y-4'>
                           {isLoading ? (
                              <CartItemSkeleton count={3} />
                           ) : (
                              cart?.items.map((item) => <SummaryItem key={item.id} item={item} />)
                           )}
                        </div>

                        <div className='mt-4 space-y-6 border-b py-4'>
                           <div className='flex flex-col gap-4'>
                              <h2 className='text-dark-gray font-semibold'>Địa chỉ</h2>
                              <span>
                                 {address.street}, {address.ward}, {address.province}
                              </span>
                           </div>
                           <div className='flex flex-col gap-4'>
                              <h2 className='text-dark-gray font-semibold'>
                                 Phương thức vận chuyển
                              </h2>
                              <span>{shippingMethod.value}</span>
                           </div>
                        </div>

                        <div className='mt-4 space-y-4'>
                           <InfoRow
                              className='text-primary text-base'
                              label='Tạm tính'
                              content={`${formatVNCurrency(cart.total)}`}
                           />
                           <InfoRow
                              label='Phí vận chuyển'
                              className='text-base'
                              content={
                                 !!shippingMethod.fee
                                    ? `${formatVNCurrency(shippingMethod.fee)}`
                                    : 'Miễn phí'
                              }
                           />
                           <InfoRow
                              className='text-primary border-t pt-4 text-xl font-semibold'
                              label='Thành tiền'
                              content={`${formatVNCurrency(cart.total + shippingMethod.fee)}`}
                           />
                        </div>
                     </div>
                  </div>

                  <div className='flex-1 shrink-0 basis-1/3'>
                     <h1 className='text-dark-gray mb-8 text-xl font-semibold'>
                        Phương thức thanh toán
                     </h1>

                     <RadioGroup>
                        {PaymentOptions.map((option) => (
                           <RadioWrapper
                              key={option.value}
                              disabled={option.disabled}
                              id={option.value}
                              selectedValue={selectedValue}
                              value={option.value}
                              onValueChange={(value) => {
                                 updateCheckout({ paymentMethod: value })
                                 setSelectedValue(value)
                              }}
                           >
                              <div className='flex items-center gap-3'>
                                 <div className='relative size-8'>
                                    <Image
                                       src={option.imgUrl}
                                       alt={option.value}
                                       className='h-full w-full object-cover'
                                       fill
                                    />
                                 </div>
                                 <h2 className='text-sm'>{option.label}</h2>
                              </div>
                           </RadioWrapper>
                        ))}
                     </RadioGroup>

                     <div className='mt-20 flex items-center gap-2.5'>
                        <Button
                           onClick={() => router.back()}
                           variant='secondary'
                           className='w-full max-w-1/2 text-sm'
                        >
                           Trở về
                        </Button>

                        {!selectedValue ? (
                           <ReminderBox
                              title='Notification'
                              desc='Please select your preferred payment method before placing your order.'
                              onConfirm={() => {}}
                           >
                              <Button variant='primary' className='w-full max-w-1/2 text-sm'>
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
                              className='w-full max-w-1/2 text-sm'
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
