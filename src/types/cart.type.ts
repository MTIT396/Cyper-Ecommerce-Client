export interface AddItemRequest {
   product_id: number
   variant_id: number
   quantity: number
}

export interface BaseResponse {
   success: boolean
}

export interface CartItem {
   id: number
   product_id: number
   name: string
   slug: string
   quantity: number
   price: number
   image_url: string
   variant?: {
      id: number
      sku: string
      color: {
         id: number
         name: string
         hex_code: string
      }
      attributes: {
         id: number
         name: string
         slug: string
         value: string
      }[]
   }
}

export interface CartResponse {
   id: number
   items: CartItem[]
   total: number
}
