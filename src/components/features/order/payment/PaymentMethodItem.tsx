import { Payment } from '@/app/(main)/order/payment/page'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useCheckoutContext } from '@/providers/CheckoutProvider'

type PaymentMethodItem = {
   isSelect: boolean
   onSelect: (value: number) => void
   option: Payment
   index: number
}

export const PaymentMethodItem = ({ option, onSelect, index, isSelect }: PaymentMethodItem) => {
   const id = `payment-${index}`
   const { updateCheckout } = useCheckoutContext()

   return (
      <div
         className={`rounded-md border p-0 transition ${
            isSelect ? 'border-primary' : 'border-outline-border'
         }`}
      >
         <Label htmlFor={id} className='flex cursor-pointer items-center justify-between p-6'>
            <div className='flex items-center gap-3'>
               <Checkbox
                  id={id}
                  checked={isSelect}
                  onCheckedChange={() => {
                     updateCheckout({ paymentMethod: option.label })
                     onSelect(index)
                  }}
                  className='border-dark-gray size-5 rounded-full border-2'
               />

               <div className={`flex gap-3 transition ${!isSelect ? 'opacity-50' : ''}`}>
                  <span className='text-dark-gray text-sm'>{option.label}</span>
               </div>
            </div>
         </Label>
      </div>
   )
}
