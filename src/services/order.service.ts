import { apiClient } from '@/lib/axios'
import {
   CancelOrderRequest,
   CancelOrderResponse,
   CreateOrderRequest,
   CreateOrderResponse,
   OrderDetailResponse,
   OrderResponse
} from '@/types/order.type'

type GetOrdersParams = {
   page?: number
   limit?: number
}

export const orderServices = {
   createOrder: async (payload: CreateOrderRequest): Promise<CreateOrderResponse> => {
      const response = await apiClient.post('/api/orders', payload)
      return response.data
   },

   cancelOrder: async (payload: CancelOrderRequest): Promise<CancelOrderResponse> => {
      const response = await apiClient.patch(`/api/orders/${payload.orderId}/cancel`)
      return response.data
   },

   getOrders: async ({ page = 1, limit = 10 }: GetOrdersParams = {}): Promise<OrderResponse> => {
      const response = await apiClient.get('/api/orders', {
         params: { page, limit }
      })

      return response.data
   },

   getOrderDetails: async (id: number): Promise<OrderDetailResponse> => {
      const response = await apiClient.get(`/api/orders/${id}`)
      return response.data
   }
}
