'use client'
import { cn } from '@/lib/utils'
import { CheckoutStatus } from '@/types/order.type'
import { CheckCheck, CircleCheckBig, CircleX, Clock, CreditCard, Truck } from 'lucide-react'
import React from 'react'

type Checkout = {
   className?: string
   status: CheckoutStatus
}

// Status icons and colors

const STATUS_COLORS: Record<CheckoutStatus, string> = {
   [CheckoutStatus.pending]: 'border-yellow-200 bg-yellow-50 text-yellow-700',
   [CheckoutStatus.confirm]: 'border-teal-200 bg-teal-50 text-teal-700',
   [CheckoutStatus.paid]: 'border-purple-200 bg-purple-50 text-purple-700',
   [CheckoutStatus.shipping]: 'border-blue-200 bg-blue-50 text-blue-700',
   [CheckoutStatus.completed]: 'border-green-200 bg-green-50 text-green-700',
   [CheckoutStatus.cancelled]: 'border-red-200 bg-red-50 text-red-700'
}

const STATUS_ICON: Record<CheckoutStatus, React.ReactNode> = {
   [CheckoutStatus.pending]: <Clock size={16} />,
   [CheckoutStatus.confirm]: <CheckCheck size={16} />,
   [CheckoutStatus.paid]: <CreditCard size={16} />,
   [CheckoutStatus.shipping]: <Truck size={16} />,
   [CheckoutStatus.completed]: <CircleCheckBig size={16} />,
   [CheckoutStatus.cancelled]: <CircleX size={16} />
}

const STATUS_LABEL: Record<CheckoutStatus, string> = {
   [CheckoutStatus.pending]: 'Đã đặt hàng',
   [CheckoutStatus.confirm]: 'Đã xác nhận',
   [CheckoutStatus.paid]: 'Đã thanh toán',
   [CheckoutStatus.shipping]: 'Vận chuyển',
   [CheckoutStatus.completed]: 'Hoàn thành',
   [CheckoutStatus.cancelled]: 'Đã hủy'
}
const CheckoutBadge = ({ className, status }: Checkout) => {
   return (
      <div
         className={cn(
            'flex w-fit items-center justify-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-semibold',
            STATUS_COLORS[status],
            className
         )}
      >
         {STATUS_ICON[status]}
         <span> {STATUS_LABEL[status]}</span>
      </div>
   )
}

export default CheckoutBadge
