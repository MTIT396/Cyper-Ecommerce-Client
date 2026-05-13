'use client'

import { cn } from '@/lib/utils'
import { CheckoutStatus } from '@/types/order.type'

import { CheckCheck, CircleCheckBig, Clock, CreditCard, Truck, XCircle } from 'lucide-react'

type Props = {
   className?: string
   status: CheckoutStatus
   isPaid: boolean
}

export default function OrderProgressbar({ className, status, isPaid }: Props) {
   const isCancelled = status === CheckoutStatus.cancelled

   const steps = [
      {
         key: CheckoutStatus.pending,
         label: 'Đã đặt hàng',
         icon: Clock
      },
      {
         key: CheckoutStatus.confirm,
         label: 'Đã xác nhận',
         icon: CheckCheck
      },
      {
         key: CheckoutStatus.paid,
         label: 'Thanh toán',
         icon: CreditCard
      },
      {
         key: CheckoutStatus.shipping,
         label: 'Đang vận chuyển',
         icon: Truck
      },
      {
         key: CheckoutStatus.completed,
         label: 'Hoàn thành',
         icon: CircleCheckBig
      }
   ]

   /* ================= CANCELLED ================= */

   if (isCancelled) {
      return (
         <div className={cn('flex flex-col gap-4', className)}>
            <div className='flex items-start gap-4 rounded-2xl border border-red-200 bg-red-50 p-4'>
               <div className='flex size-11 shrink-0 items-center justify-center rounded-full bg-red-500 text-white'>
                  <XCircle className='size-5' />
               </div>

               <div>
                  <h3 className='text-base font-semibold text-red-600'>Đơn hàng đã bị hủy</h3>

                  <p className='mt-1 text-sm text-red-500'>
                     Đơn hàng này không thể tiếp tục xử lý.
                  </p>
               </div>
            </div>
         </div>
      )
   }

   const currentStep = steps.findIndex((s) => s.key === status)
   console.log(status)
   return (
      <div className={cn('flex flex-col gap-0', className)}>
         {steps.map((step, index) => {
            const Icon = step.icon

            const active = index <= currentStep

            let circleClass = 'bg-zinc-100 border-zinc-200 text-zinc-400'

            let lineClass = 'bg-zinc-200'

            let textClass = 'text-zinc-500'

            if (active) {
               if (step.key === CheckoutStatus.paid && !isPaid) {
                  circleClass = 'bg-yellow-500 border-yellow-500 text-white'

                  textClass = 'text-yellow-600 font-semibold'
               } else {
                  circleClass = 'bg-green-500 border-green-500 text-white'

                  textClass = 'text-green-600 font-semibold'

                  lineClass = 'bg-green-500'
               }
            }

            return (
               <div key={step.key} className='flex gap-4'>
                  {/* LEFT */}
                  <div className='flex flex-col items-center'>
                     <div
                        className={cn(
                           'flex size-10 items-center justify-center rounded-full border transition-all',
                           circleClass
                        )}
                     >
                        <Icon className='size-4' />
                     </div>

                     {index !== steps.length - 1 && (
                        <div className={cn('my-1 h-16 w-[3px] rounded-full', lineClass)} />
                     )}
                  </div>

                  {/* RIGHT */}
                  <div className='pb-8'>
                     <h3 className={cn('text-sm font-medium transition-colors', textClass)}>
                        {step.label}
                     </h3>

                     <p className='mt-1 text-xs text-zinc-400'>
                        {active ? 'Đã hoàn thành' : 'Đang chờ xử lý'}
                     </p>
                  </div>
               </div>
            )
         })}
      </div>
   )
}
