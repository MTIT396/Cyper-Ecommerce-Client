'use client'

import CheckoutBadge from '@/components/shared/CheckoutBadge'
import { Skeleton } from '@/components/ui/skeleton'
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow
} from '@/components/ui/table'
import { PaymentOptions } from '@/constants/options.constant'
import { formatDateTime, formatVNCurrency } from '@/lib/utils'
import { Order } from '@/types/order.type'
import { Calendar } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

type Props = {
   orders: Order[]
   isLoading?: boolean
}

const OrderTable = ({ orders, isLoading = false }: Props) => {
   const router = useRouter()
   return (
      <div className='border-light-gray min-h-[320px] overflow-hidden rounded-md border'>
         <Table>
            <TableHeader className='bg-light-gray'>
               <TableRow>
                  <TableHead className='w-[120px]'>Mã đơn hàng</TableHead>
                  <TableHead className='w-[200px]'>Ngày đặt hàng</TableHead>
                  <TableHead>Tổng</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Thanh toán</TableHead>
               </TableRow>
            </TableHeader>

            <TableBody>
               {isLoading
                  ? Array.from({ length: 5 }).map((_, i) => (
                       <TableRow key={i}>
                          <TableCell>
                             <Skeleton className='h-4 w-16' />
                          </TableCell>

                          <TableCell>
                             <div className='flex items-center gap-2'>
                                <Skeleton className='size-4 rounded-full' />
                                <Skeleton className='h-4 w-32' />
                             </div>
                          </TableCell>

                          <TableCell>
                             <Skeleton className='h-4 w-24' />
                          </TableCell>

                          <TableCell>
                             <Skeleton className='h-6 w-24 rounded-full' />
                          </TableCell>

                          <TableCell>
                             <div className='flex items-center gap-2'>
                                <Skeleton className='size-6 rounded-md' />
                                <Skeleton className='h-4 w-20' />
                             </div>
                          </TableCell>

                          <TableCell className='text-center'>
                             <Skeleton className='mx-auto h-4 w-24' />
                          </TableCell>
                       </TableRow>
                    ))
                  : orders.map((order) => (
                       <TableRow
                          key={order.id}
                          onClick={() => router.push(`/user/orders/${order.id}`)}
                          className='cursor-pointer'
                       >
                          <TableCell className='font-medium'>#{order.id}</TableCell>

                          <TableCell>
                             <div className='flex items-center gap-1.5'>
                                <Calendar size={18} />
                                {formatDateTime(order.created_at)}
                             </div>
                          </TableCell>

                          <TableCell className='font-semibold'>
                             {formatVNCurrency(order.total_amount as number)}
                          </TableCell>

                          <TableCell>
                             <CheckoutBadge status={order.status} />
                          </TableCell>

                          <TableCell>
                             <div className='flex items-center gap-2 text-sm font-semibold'>
                                <div className='relative size-6'>
                                   <Image
                                      src={
                                         PaymentOptions.find(
                                            (o) => o.value === order.payment_method?.toLowerCase()
                                         )?.imgUrl || '/images/default-avt.jpg'
                                      }
                                      alt={order.payment_method}
                                      fill
                                      className='object-contain'
                                   />
                                </div>
                                {order.payment_method}
                             </div>
                          </TableCell>
                       </TableRow>
                    ))}
            </TableBody>
         </Table>
      </div>
   )
}

export default OrderTable
