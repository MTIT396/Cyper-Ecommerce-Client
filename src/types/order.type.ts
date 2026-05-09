import { AddressRequest } from './address.type'
import { CartItem } from './cart.type'

/* Create Order */
export interface CreateOrderRequest {
   addressId: number
   paymentMethod: string
   shippingFee: number
}

export interface CreateOrderResponse {
   message: string
   data: {
      order_id: number
      subtotal: number
      shipping_fee: number
      total_amount: number
      status: CheckoutStatus
   }
}
// Cancel Order

export interface CancelOrderRequest {
   orderId: number
}

export interface CancelOrderResponse {
   message: string
   data: {
      order_id: number
      status: CheckoutStatus.cancelled
   }
}
// Order
export interface Order {
   id: number
   subtotal_amount: number
   shipping_fee: number
   total_amount: number
   status: CheckoutStatus
   payment_method: string
   created_at: string
   can_cancel: boolean
}

export interface OrderResponse {
   data: Order[]
   meta: {
      page: number
      limit: number
      total: number
      total_pages: number
   }
}

// Order Detail
export interface OrderItem extends CartItem {
   quantity: number
   order_price: number
}

export interface OrderDetailResponse extends Order {
   items: OrderItem[]
   shipping_address: Omit<AddressRequest, 'is_default'>
}

export enum CheckoutStatus {
   pending = 'pending',
   paid = 'paid',
   confirm = 'confirm',
   shipping = 'shipping',
   completed = 'completed',
   cancelled = 'cancelled'
}
