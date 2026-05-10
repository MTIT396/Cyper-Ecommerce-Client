'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { usePaymentMomoQuery } from '@/hooks/usePaymentMomoQuery'
import { Loader2 } from 'lucide-react'

type Status = 'loading' | 'success' | 'failed' | 'timeout'

export default function PaymentResultPage() {
   const searchParams = useSearchParams()
   const order_id = searchParams.get('order_id')

   const { pollStatus, stopPolling } = usePaymentMomoQuery()

   const [status, setStatus] = useState<Status>('loading')

   useEffect(() => {
      if (!order_id) return

      pollStatus(
         Number(order_id),

         // SUCCESS
         () => {
            setStatus('success')

            setTimeout(() => {
               window.location.href = `/user/orders/${order_id}`
            }, 1000)
         },

         // FAILED (fail thật - hiếm)
         () => {
            setStatus('failed')
         },

         // TIMEOUT (thực tế hay xảy ra hơn failed)
         () => {
            setStatus('timeout')
         }
      )

      // cleanup khi unmount
      return () => {
         stopPolling()
      }
   }, [order_id])

   return (
      <div className='flex min-h-screen items-center justify-center'>
         {status === 'loading' && (
            <div className='text-center'>
               <h2 className='flex items-center gap-2 text-xl font-semibold'>
                  <Loader2 className='size-8 animate-spin' />
                  Đang xác nhận thanh toán...
               </h2>
               <p className='mt-2 text-gray-500'>
                  Quá trình này có thể mất vài giây, vui lòng không đóng trang
               </p>
            </div>
         )}

         {status === 'success' && (
            <div className='text-center'>
               <h2 className='text-2xl font-bold text-green-600'>Thanh toán thành công 🎉</h2>
               <p className='mt-2'>Đang chuyển hướng...</p>
            </div>
         )}

         {status === 'failed' && (
            <div className='text-center'>
               <h2 className='text-2xl font-bold text-red-600'>Thanh toán thất bại ❌</h2>
               <p className='mt-2'>Vui lòng thử lại</p>
            </div>
         )}

         {status === 'timeout' && (
            <div className='text-center'>
               <h2 className='text-2xl font-bold text-yellow-600'>Đang xử lý thanh toán ⏳</h2>
               <p className='mt-2'>
                  Hệ thống chưa nhận được xác nhận. Bạn có thể kiểm tra lại trong đơn hàng.
               </p>
            </div>
         )}
      </div>
   )
}
