import { apiClient } from '@/lib/axios'
import { AddItemRequest, BaseResponse, CartResponse } from '@/types/cart.type'

export const cartService = {
   addItem: async (payload: AddItemRequest): Promise<BaseResponse> => {
      const response = await apiClient.post('/api/cart/items', payload)
      return response.data
   },
   removeItem: async (item_id: number) => {
      const response = await apiClient.delete(`/api/cart/items/${item_id}`)
      return response.data
   },
   updateItem: async ({
      item_id,
      quantity
   }: {
      item_id: number
      quantity: number
   }): Promise<BaseResponse> => {
      const response = await apiClient.put(`/api/cart/items/${item_id}`, {
         quantity
      })
      return response.data
   },
   getCart: async (): Promise<CartResponse> => {
      const response = await apiClient.get('/api/cart')
      return response.data
   },
   clearCart: async (): Promise<CartResponse> => {
      const response = await apiClient.delete('/api/cart/clear')
      return response.data
   }
}
