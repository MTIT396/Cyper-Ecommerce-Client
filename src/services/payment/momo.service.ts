import { apiClient } from '@/lib/axios'
import {
   CreateMomoPaymentResponse,
   MomoPaymentRequest,
   TransactionStatusResponse
} from '@/types/payment.type'

export const momoPaymentServices = {
   createPayment: async (payload: MomoPaymentRequest): Promise<CreateMomoPaymentResponse> => {
      const response = await apiClient.post('/api/payment/momo', payload)
      return response.data
   },
   checkTransactionStatus: async (
      payload: MomoPaymentRequest
   ): Promise<TransactionStatusResponse> => {
      const response = await apiClient.post('/api/payment/momo/transaction-status', payload)
      return response.data
   }
}
