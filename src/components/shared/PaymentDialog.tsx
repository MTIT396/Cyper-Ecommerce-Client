import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import RadioWrapper from './RadioWrapper'
import { RadioGroup } from '../ui/radio-group'
import Image from 'next/image'
import { DialogDescription } from '@radix-ui/react-dialog'
import { useEffect, useState } from 'react'
import Button from './Button'
import { CreditCard, Shield } from 'lucide-react'
import { Order } from '@/types/order.type'
import { formatVNCurrency } from '@/lib/utils'
import { usePaymentMomoQuery } from '@/hooks/usePaymentMomoQuery'
import { PaymentOptions } from '@/constants/options.constant'

const PaymentDialog = ({
   order,
   isOpen,
   onClose
}: {
   order: Order
   isOpen: boolean
   onClose: () => void
}) => {
   const [selectedValue, setSelectedValue] = useState<string>('')
   const { createMomoPayment } = usePaymentMomoQuery()

   // reset selected payment method if dialog is closed
   useEffect(() => {
      if (!isOpen) {
         setSelectedValue('')
      }
   }, [isOpen])

   const payments = PaymentOptions.filter((option) => option.value !== 'cod')

   const handlePayment = () => {
      if (!selectedValue) return
      if (selectedValue === 'momo') {
         createMomoPayment({ orderId: order.id })
      } else {
         console.log('other payment methods')
      }
   }
   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent>
            <DialogHeader>
               <DialogTitle className='text-center text-2xl font-semibold'>
                  Chọn cổng thanh toán
               </DialogTitle>
               <DialogDescription className='text-dark-gray mb-6 text-center text-sm text-balance'>
                  Chọn phương thức thanh toán ưa thích của bạn để hoàn tất đơn đặt hàng.
               </DialogDescription>

               <div className='from-extra-gray/10 via-extra-gray/5 border-extra-gray/20 mb-4 rounded-xl border bg-linear-to-r to-transparent p-5 shadow-sm'>
                  <div className='flex items-center justify-between'>
                     <div className='flex items-center gap-2'>
                        <div className='bg-extra-gray/10 flex size-10 items-center justify-center rounded-full border'>
                           <CreditCard className='size-5' />
                        </div>
                        <span className='text-dark-gray font-semibold'>Tổng tiền</span>
                     </div>
                     <span className='font-semibold'>{formatVNCurrency(order.total_amount)}</span>
                  </div>
               </div>

               <RadioGroup>
                  {payments.map((option) => (
                     <RadioWrapper
                        key={option.value}
                        id={option.value}
                        value={option.value}
                        selectedValue={selectedValue}
                        onValueChange={(value) => {
                           setSelectedValue(value)
                        }}
                        disabled={option.disabled}
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
                  <div className='flex flex-col gap-2 border-t pt-4'>
                     <Button
                        disabled={!selectedValue}
                        variant='primary'
                        className='w-full py-3 text-sm'
                        aria-label='pay-now-button'
                        onClick={handlePayment}
                     >
                        {!selectedValue ? (
                           <>
                              <Shield className='size-4 text-white' />
                              Chọn phương thức thanh toán
                           </>
                        ) : (
                           <>
                              <Shield className='size-4 text-white' />
                              Tiếp tục thanh toán
                           </>
                        )}
                     </Button>
                     <DialogClose asChild>
                        <Button variant='secondary' className='w-full py-2.5 text-sm'>
                           Hủy
                        </Button>
                     </DialogClose>
                  </div>
               </RadioGroup>
            </DialogHeader>
         </DialogContent>
      </Dialog>
   )
}

export default PaymentDialog
