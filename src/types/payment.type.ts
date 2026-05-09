export interface MomoPaymentRequest {
   orderId: number
}

export interface CreateMomoPaymentResponse {
   partnerCode: string
   orderId: string
   requestId: string
   amount: number
   responseTime: number
   message: string
   resultCode: number
   payUrl: string
   shortLink: string
}

export interface TransactionStatusResponse {
   message: string
   data: {
      orderId: number
      paymentStatus: PaymentStatus
   }
}

export type PaymentStatus = 'success' | 'failed'
