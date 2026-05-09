export interface Wishlist {
   wishlist_id: number
   product_id: number
   name: string
   slug: string
   image_url: string
   base_price: number
   sale_price: number
}

export interface WishlistResponse {
   message: string
   data: Wishlist[]
}

export interface ToggleWishlistResponse {
   message: string
   data: {
      isWishlisted: boolean
   }
}

export interface WishlistRequest {
   productId: number
}
