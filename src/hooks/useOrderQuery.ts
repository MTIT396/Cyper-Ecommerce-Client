/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import toast from 'react-hot-toast'

import { orderServices } from '@/services/order.service'

import { CreateOrderRequest } from '@/types/order.type'

import { ORDER_QUERY_KEY } from '@/constants/queryKey'

/* ================= ORDER DETAIL ================= */

export const useOrderDetail = (orderId?: number) => {
   const {
      data: order,
      isLoading: isLoadingOrder,
      isFetching: isFetchingOrder
   } = useQuery({
      queryKey: [...ORDER_QUERY_KEY.item, orderId],

      queryFn: () => orderServices.getOrderDetails(orderId as number),

      enabled: !!orderId
   })

   return {
      order,
      isLoadingOrder,
      isFetchingOrder
   }
}

/* ================= ORDERS ================= */

export const useOrders = (page: number, limit = 10) => {
   const {
      data: orders,
      isLoading: isLoadingOrders,
      isFetching: isFetchingOrders
   } = useQuery({
      queryKey: [...ORDER_QUERY_KEY.all, page, limit],

      queryFn: () =>
         orderServices.getOrders({
            page,
            limit
         })
   })

   return {
      orders,
      isLoadingOrders,
      isFetchingOrders
   }
}

/* ================= CANCEL ORDER ================= */

export const useCancelOrder = () => {
   const queryClient = useQueryClient()

   const cancelMutation = useMutation({
      mutationFn: (orderId: number) =>
         orderServices.cancelOrder({
            orderId
         }),

      onSuccess: async (_, orderId) => {
         toast.success('Hủy đơn hàng thành công!')

         /* refresh order list */
         await queryClient.invalidateQueries({
            queryKey: ORDER_QUERY_KEY.all
         })

         /* refresh order detail */
         await queryClient.invalidateQueries({
            queryKey: [...ORDER_QUERY_KEY.item, orderId]
         })
      },

      onError: (error: any) => {
         toast.error(error?.response?.data?.message || 'Hủy đơn hàng thất bại!')
      }
   })

   return {
      cancelOrder: cancelMutation.mutate,
      cancelOrderAsync: cancelMutation.mutateAsync,
      isCancelling: cancelMutation.isPending
   }
}

/* ================= CREATE ORDER ================= */

export const useCreateOrder = () => {
   const queryClient = useQueryClient()

   const createMutation = useMutation({
      mutationFn: (payload: CreateOrderRequest) => orderServices.createOrder(payload),

      onSuccess: async (data) => {
         toast.success('Đặt đơn hàng thành công!')

         const orderId = data.data.order_id

         /* prefetch detail */
         await queryClient.prefetchQuery({
            queryKey: [...ORDER_QUERY_KEY.item, orderId],

            queryFn: () => orderServices.getOrderDetails(orderId)
         })

         /* refresh list */
         await queryClient.invalidateQueries({
            queryKey: ORDER_QUERY_KEY.all
         })
      },

      onError: (error: any) => {
         toast.error(error?.response?.data?.message || 'Có lỗi xảy ra')
      }
   })

   return {
      createOrder: createMutation.mutateAsync,
      orderCreated: createMutation.data,
      isCreating: createMutation.isPending
   }
}
