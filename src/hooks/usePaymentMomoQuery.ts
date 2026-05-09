import { momoPaymentServices } from '@/services/payment/momo.service'
import { MomoPaymentRequest, PaymentStatus } from '@/types/payment.type'
import { useMutation } from '@tanstack/react-query'
import { useRef } from 'react'

export const usePaymentMomoQuery = () => {
   const timerRef = useRef<NodeJS.Timeout | null>(null)

   // CREATE PAYMENT
   const createMutation = useMutation({
      mutationFn: (payload: MomoPaymentRequest) => momoPaymentServices.createPayment(payload),

      onSuccess: (data) => {
         if (data?.payUrl) {
            window.location.href = data.payUrl
         }
      }
   })

   // CHECK STATUS
   const checkStatusMutation = useMutation({
      mutationFn: (payload: MomoPaymentRequest) =>
         momoPaymentServices.checkTransactionStatus(payload)
   })

   // STOP polling
   const stopPolling = () => {
      if (timerRef.current) {
         clearTimeout(timerRef.current)
         timerRef.current = null
      }
   }

   // POLLING (chuẩn)
   const pollStatus = async (
      orderId: number,
      onSuccess: () => void,
      onFailed: () => void,
      onTimeout?: () => void,
      interval = 3000,
      maxAttempts = 15
   ) => {
      let attempts = 0

      const check = async () => {
         try {
            const res = await checkStatusMutation.mutateAsync({ orderId })
            const status: PaymentStatus = res?.data?.paymentStatus

            console.log('Polling status:', status, 'attempt:', attempts)

            // ✅ SUCCESS → kết thúc ngay
            if (status === 'success') {
               stopPolling()
               onSuccess()
               return
            }

            // ❗ FAILED chưa chắc fail thật → retry
            attempts++

            if (attempts >= maxAttempts) {
               stopPolling()

               // bạn có thể chọn 1 trong 2:
               // onFailed()
               onTimeout?.()

               return
            }

            timerRef.current = setTimeout(check, interval)
         } catch (err) {
            console.error('Polling error:', err)

            // ❗ lỗi network → retry
            attempts++

            if (attempts >= maxAttempts) {
               stopPolling()
               onTimeout?.()
               return
            }

            timerRef.current = setTimeout(check, interval)
         }
      }

      check()
   }

   return {
      createMomoPayment: createMutation.mutate,
      isCreating: createMutation.isPending,

      checkStatus: checkStatusMutation.mutateAsync,
      isChecking: checkStatusMutation.isPending,

      pollStatus,
      stopPolling
   }
}
