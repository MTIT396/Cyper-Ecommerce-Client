import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { WISHLIST_QUERY_KEY } from '@/constants/queryKey'
import { wishlistServices } from '@/services/wishlist.service'
import { WishlistResponse } from '@/types/wishlist.type'

export const useWishlistQuery = () => {
   const qc = useQueryClient()

   const { data, isLoading, isFetching } = useQuery({
      queryKey: WISHLIST_QUERY_KEY.all,
      queryFn: wishlistServices.getWishlist
   })

   const toggleMutation = useMutation({
      mutationFn: (productId: number) => wishlistServices.toggleWishlist({ productId }),

      onMutate: async (productId) => {
         await qc.cancelQueries({
            queryKey: WISHLIST_QUERY_KEY.all
         })

         const previousWishlist = qc.getQueryData<WishlistResponse>(WISHLIST_QUERY_KEY.all)

         qc.setQueryData<WishlistResponse>(WISHLIST_QUERY_KEY.all, (old) => {
            if (!old) return old

            const exists = old.data.some((item) => item.product_id === productId)

            return {
               ...old,

               data: exists ? old.data.filter((item) => item.product_id !== productId) : old.data
            }
         })

         return { previousWishlist }
      },

      onError: (_, __, context) => {
         if (context?.previousWishlist) {
            qc.setQueryData(WISHLIST_QUERY_KEY.all, context.previousWishlist)
         }

         toast.error('Có lỗi xảy ra!')
      },

      onSuccess: (res) => {
         toast.success(
            res.data.isWishlisted
               ? 'Đã thêm vào danh sách yêu thích!'
               : 'Đã xóa khỏi danh sách yêu thích!'
         )
      },

      onSettled: () => {
         qc.invalidateQueries({
            queryKey: WISHLIST_QUERY_KEY.all
         })
      }
   })

   return {
      wishlist: data?.data || [],
      isLoading,
      isFetching,

      toggleWishlist: toggleMutation.mutate,

      isToggling: toggleMutation.isPending
   }
}
