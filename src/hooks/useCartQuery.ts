import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { CART_QUERY_KEY } from '@/constants/queryKey'
import { cartService } from '@/services/cart.service'

import type { AddItemRequest } from '@/types/cart.type'

export const useCartQuery = () => {
   const queryClient = useQueryClient()

   /* ================= FETCH ================= */

   const { data, isLoading, isFetching } = useQuery({
      queryKey: CART_QUERY_KEY.all,
      queryFn: cartService.getCart
   })

   /* ================= HELPERS ================= */

   const invalidateCart = async () => {
      await queryClient.invalidateQueries({
         queryKey: CART_QUERY_KEY.all
      })
   }

   const getErrorMessage = (err: unknown) => {
      if (typeof err === 'object' && err && 'message' in err) {
         return String(err.message)
      }

      return 'Có lỗi xảy ra!'
   }

   /* ================= ADD ================= */

   const addToCart = useMutation({
      mutationFn: (payload: AddItemRequest) => cartService.addItem(payload),

      onSuccess: async () => {
         await invalidateCart()

         toast.success('Thêm giỏ hàng thành công!')
      },

      onError: (err) => {
         toast.error(getErrorMessage(err))
      }
   })

   /* ================= REMOVE ================= */

   const removeFromCart = useMutation({
      mutationFn: (itemId: number) => cartService.removeItem(itemId),

      onSuccess: async () => {
         await invalidateCart()

         toast.success('Xóa sản phẩm thành công!')
      },

      onError: (err) => {
         toast.error(getErrorMessage(err))
      }
   })

   /* ================= UPDATE ================= */

   const updateCartItem = useMutation({
      mutationFn: (payload: { item_id: number; quantity: number }) =>
         cartService.updateItem(payload),

      onSuccess: async () => {
         await invalidateCart()

         toast.success('Cập nhật giỏ hàng thành công!', {
            id: 'cart-update'
         })
      },

      onError: (err) => {
         toast.error(getErrorMessage(err))
      }
   })

   /* ================= CLEAR ================= */

   const removeAll = useMutation({
      mutationFn: cartService.clearCart,

      onSuccess: async () => {
         await invalidateCart()

         toast.success('Xóa giỏ hàng thành công!')
      },

      onError: (err) => {
         toast.error(getErrorMessage(err))
      }
   })

   return {
      cart: data,

      isLoading,
      isFetching,

      addToCart: addToCart.mutate,
      removeFromCart: removeFromCart.mutate,
      updateCartItem: updateCartItem.mutate,
      removeAll: removeAll.mutate,

      addToCartPending: addToCart.isPending,
      removeFromCartPending: removeFromCart.isPending,
      updatePending: updateCartItem.isPending,
      removeAllPending: removeAll.isPending
   }
}
