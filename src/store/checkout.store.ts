import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Shipping } from '@/types/checkout.type'

type CheckoutState = {
   addressId: number | null
   shippingMethod: Shipping | null
   paymentMethod: string | null

   // actions
   updateCheckout: (data: Partial<CheckoutState>) => void
   clearCheckout: () => void
}

export const useCheckoutStore = create<CheckoutState>()(
   persist(
      (set) => ({
         addressId: null,
         shippingMethod: null,
         paymentMethod: null,

         updateCheckout: (data) =>
            set((state) => ({
               ...state,
               ...data
            })),

         clearCheckout: () =>
            set({
               addressId: null,
               shippingMethod: null,
               paymentMethod: null
            })
      }),
      {
         name: 'checkout-storage' // key localStorage
      }
   )
)
