'use client'
import Container from '@/components/Container'
import Button from '@/components/shared/Button'
import ProgressBar from '@/components/features/order/address/ProgressBar'
import { useRouter } from 'next/navigation'
import { Shipping } from '@/types/checkout.type'
import { addDays, formattedDate } from '@/lib/time'
import ReminderBox from '@/components/shared/ReminderBox'
import { useState } from 'react'
import { RadioGroup } from '@/components/ui/radio-group'
import RadioWrapper from '@/components/shared/RadioWrapper'
import { formatVNCurrency } from '@/lib/utils'
import { useCheckoutStore } from '@/store/checkout.store'

export const shippingData: Shipping[] = [
   {
      fee: 0,
      label: 'Tiêu chuẩn - Nhận hàng trong vòng 3-5 ngày',
      date: formattedDate(addDays(3)),
      value: 'Giao hàng tiêu chuẩn'
   },
   {
      fee: 29000,
      label: 'Nhanh - Nhận hàng của bạn sớm nhất có thể (1-2 ngày)',
      date: formattedDate(addDays(1)),
      value: 'Giao hàng nhanh'
   }
]

const ShippingPage = () => {
   const router = useRouter()
   const [shippingMethod, setShippingMethod] = useState<Shipping>(shippingData[0])
   const [selectedValue, setSelectedValue] = useState<string>(shippingData[0].value)

   const { updateCheckout } = useCheckoutStore()

   const handleNext = (shipping: Shipping) => {
      updateCheckout({ shippingMethod: shipping })
      router.push('/checkout/payment')
   }

   return (
      <Container className='py-10'>
         <div className='mt-20 py-6'>
            <ProgressBar step={2} />
         </div>
         {/* Title */}
         <h1 className='text-dark-gray mb-8 text-lg font-semibold'>Phương thức vận chuyển</h1>

         <RadioGroup>
            {shippingData.map((shipping) => (
               <RadioWrapper
                  key={shipping.value}
                  selectedValue={selectedValue}
                  id={shipping.value}
                  value={shipping.value}
                  className='p-6'
                  onValueChange={() => {
                     setSelectedValue(shipping.value)
                     setShippingMethod(shipping)
                  }}
               >
                  <div className={`flex items-center gap-3 transition`}>
                     <span className='w-[100px] text-sm font-semibold'>
                        {!!shipping.fee
                           ? `${formatVNCurrency(shipping.fee as number)}`
                           : 'Miễn phí'}
                     </span>
                     <span className='text-dark-gray text-xs text-balance sm:text-sm'>
                        {shipping.label}
                     </span>
                  </div>
                  <span className={`ml-auto text-xs transition sm:text-sm`}>{shipping.date}</span>
               </RadioWrapper>
            ))}
         </RadioGroup>
         <div className='mt-20 mb-4 flex justify-end gap-2.5'>
            <Button
               onClick={() => router.back()}
               variant='secondary'
               className='w-fit px-16 py-3.5 text-sm'
            >
               Trở về
            </Button>

            {!selectedValue ? (
               <ReminderBox
                  title='Notification'
                  desc='Please select your preferred shipping method before placing your order.'
                  onConfirm={() => {}}
               >
                  <Button variant='primary' className='w-fit px-16 py-3.5 text-sm'>
                     Tiếp tục
                  </Button>
               </ReminderBox>
            ) : (
               <Button
                  onClick={() => handleNext(shippingMethod as Shipping)}
                  variant='primary'
                  className='w-fit px-16 py-3.5 text-sm'
               >
                  Tiếp tục
               </Button>
            )}
         </div>
      </Container>
   )
}

export default ShippingPage
