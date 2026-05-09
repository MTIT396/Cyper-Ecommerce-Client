import { apiClient } from '@/lib/axios'
import { ToggleWishlistResponse, WishlistRequest, WishlistResponse } from '@/types/wishlist.type'

export const wishlistServices = {
   getWishlist: async (): Promise<WishlistResponse> => {
      const response = await apiClient.get('/api/wishlist')
      return response.data
   },
   toggleWishlist: async (payload: WishlistRequest): Promise<ToggleWishlistResponse> => {
      const response = await apiClient.post('/api/wishlist/toggle', payload)
      return response.data
   }
}
