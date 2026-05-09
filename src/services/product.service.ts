import { apiClient } from '@/lib/axios'
import { FilterRequest } from '@/types/filter.type'
import {
   ProductDetailResponse,
   ProductFilterListResponse,
   ProductListResponse,
   ProductsRequest
} from '@/types/product.type'

export const productServices = {
   getProducts: async (params?: ProductsRequest): Promise<ProductListResponse> => {
      const response = await apiClient.get('/api/products', { params })
      return response.data
   },
   getProductDetail: async (slug: string): Promise<ProductDetailResponse> => {
      const response = await apiClient.get(`/api/products/${slug}`)
      return response.data
   },
   getFilterProducts: async (params: FilterRequest): Promise<ProductFilterListResponse> => {
      const response = await apiClient.get(`/api/products/filter`, {
         params
      })
      return response.data
   }
}
