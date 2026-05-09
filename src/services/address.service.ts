import { apiClient } from '@/lib/axios'
import { AddressRequest, AddressResponse } from '@/types/address.type'

export const addressServices = {
   createAddress: async (payload: AddressRequest): Promise<AddressResponse> => {
      const response = await apiClient.post('/api/address', payload)
      return response.data
   },
   getAddresses: async (): Promise<AddressResponse[]> => {
      const response = await apiClient.get('/api/address')
      return response.data
   },
   updateAddress: async (address_id: number, payload: AddressRequest): Promise<AddressResponse> => {
      const response = await apiClient.put(`/api/address/${address_id}`, payload)
      return response.data
   },
   setDefaultAddress: async (address_id: number): Promise<AddressResponse> => {
      const response = await apiClient.patch(`/api/address/${address_id}/default`)
      return response.data
   },
   deleteAddress: async (address_id: number): Promise<AddressResponse> => {
      const response = await apiClient.delete(`/api/address/${address_id}`)
      return response.data
   }
}
