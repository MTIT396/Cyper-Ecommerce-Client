'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import Container from '@/components/Container'

import Button from '@/components/shared/Button'
import ReminderBox from '@/components/shared/ReminderBox'
import RadioWrapper from '@/components/shared/RadioWrapper'

import ProgressBar from '@/components/features/order/address/ProgressBar'

import { RadioGroup } from '@/components/ui/radio-group'

import { useCheckoutStore } from '@/store/checkout.store'

import { Shipping } from '@/types/checkout.type'

import { addDays, formattedDate } from '@/lib/time'
import { formatVNCurrency } from '@/lib/utils'

import { Clock3, Truck } from 'lucide-react'
import BodyContent from '@/components/shared/BodyContent'

export const shippingData: Shipping[] = [
   {
      fee: 0,
      label: 'Nhận hàng trong vòng 3-5 ngày làm việc',
      date: formattedDate(addDays(3)),
      value: 'Giao hàng tiêu chuẩn'
   },
   {
      fee: 29000,
      label: 'Ưu tiên xử lý và giao hàng nhanh trong 1-2 ngày',
      date: formattedDate(addDays(1)),
      value: 'Giao hàng nhanh'
   }
]

const ShippingPage = () => {
   const router = useRouter()

   const { updateCheckout } = useCheckoutStore()

   const [shippingMethod, setShippingMethod] = useState<Shipping>(shippingData[0])

   const [selectedValue, setSelectedValue] = useState<string>(shippingData[0].value)

   const handleNext = (shipping: Shipping) => {
      updateCheckout({
         shippingMethod: shipping
      })

      router.push('/checkout/payment')
   }

   return (
      <Container>
         <BodyContent className='pb-10'>
            {/* Progress */}
            <ProgressBar step={2} className='py-6 sm:py-8' />

            {/* Header */}
            <div className='mb-6 sm:mb-8'>
               <h1 className='text-xl font-semibold text-zinc-900 sm:text-2xl'>
                  Phương thức vận chuyển
               </h1>

               <p className='mt-1 text-sm text-zinc-500'>
                  Chọn phương thức giao hàng phù hợp với nhu cầu của bạn.
               </p>
            </div>

            {/* Shipping Methods */}
            <RadioGroup className='space-y-4'>
               {shippingData.map((shipping) => {
                  const isSelected = selectedValue === shipping.value

                  return (
                     <RadioWrapper
                        key={shipping.value}
                        selectedValue={selectedValue}
                        id={shipping.value}
                        value={shipping.value}
                        onValueChange={() => {
                           setSelectedValue(shipping.value)

                           setShippingMethod(shipping)
                        }}
                     >
                        <div className='flex w-full flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5'>
                           {/* Left */}
                           <div className='flex min-w-0 items-start gap-4'>
                              {/* Icon */}
                              <div
                                 className={`flex size-11 shrink-0 items-center justify-center rounded-2xl ${
                                    isSelected
                                       ? 'bg-primary/10 text-primary'
                                       : 'bg-zinc-100 text-zinc-600'
                                 }`}
                              >
                                 {shipping.fee === 0 ? (
                                    <Truck className='size-5' />
                                 ) : (
                                    <Clock3 className='size-5' />
                                 )}
                              </div>

                              {/* Content */}
                              <div className='min-w-0'>
                                 <div className='flex flex-wrap items-center gap-2'>
                                    <h3 className='text-sm font-semibold text-zinc-900 sm:text-base'>
                                       {shipping.value}
                                    </h3>

                                    {!shipping.fee && (
                                       <span className='rounded-full bg-green-100 px-2 py-0.5 text-[11px] font-medium text-green-700'>
                                          Miễn phí
                                       </span>
                                    )}
                                 </div>

                                 <p className='mt-1 text-sm leading-6 text-zinc-500'>
                                    {shipping.label}
                                 </p>
                              </div>
                           </div>

                           {/* Right */}
                           <div className='flex shrink-0 items-center justify-between gap-6 border-t border-zinc-100 pt-3 sm:block sm:space-y-2 sm:border-0 sm:pt-0 sm:text-right'>
                              <div>
                                 <p className='text-xs leading-relaxed text-zinc-500'>Dự kiến</p>

                                 <p className='text-sm font-medium text-zinc-900'>
                                    {shipping.date}
                                 </p>
                              </div>

                              <div>
                                 <p className='text-xs leading-relaxed text-zinc-500'>Chi phí</p>

                                 <p className='text-sm font-semibold text-zinc-900 sm:text-base'>
                                    {shipping.fee ? formatVNCurrency(shipping.fee) : 'Miễn phí'}
                                 </p>
                              </div>
                           </div>
                        </div>
                     </RadioWrapper>
                  )
               })}
            </RadioGroup>

            {/* Footer */}
            <div className='mt-8 flex flex-col-reverse gap-3 border-t border-zinc-100 pt-6 sm:mt-10 sm:flex-row sm:items-center sm:justify-end'>
               <Button
                  onClick={() => router.back()}
                  variant='outline'
                  className='h-11 rounded-xl px-6 text-sm font-medium sm:px-10'
               >
                  Trở về
               </Button>

               {!selectedValue ? (
                  <ReminderBox
                     title='Chưa chọn phương thức vận chuyển'
                     desc='Vui lòng chọn phương thức vận chuyển trước khi tiếp tục.'
                     onConfirm={() => {}}
                  >
                     <Button
                        variant='primary'
                        className='h-11 rounded-xl px-6 text-sm font-medium sm:px-10'
                     >
                        Tiếp tục
                     </Button>
                  </ReminderBox>
               ) : (
                  <Button
                     onClick={() => handleNext(shippingMethod)}
                     variant='primary'
                     className='h-11 rounded-xl px-6 text-sm font-medium sm:px-10'
                  >
                     Tiếp tục
                  </Button>
               )}
            </div>
         </BodyContent>
      </Container>
   )
}

export default ShippingPage
