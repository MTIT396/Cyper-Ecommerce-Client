import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addressServices } from '@/services/address.service'
import { AddressRequest, AddressResponse } from '@/types/address.type'
import toast from 'react-hot-toast'
import { ADDRESS_QUERY_KEY } from '@/constants/queryKey'

export const useAddressQuery = () => {
   const queryClient = useQueryClient()

   // fetch addresses
   const {
      data: addresses,
      isLoading,
      isFetching
   } = useQuery<AddressResponse[]>({
      queryKey: ADDRESS_QUERY_KEY.all,
      queryFn: addressServices.getAddresses
   })

   // create mutations
   const createMutation = useMutation({
      mutationFn: (payload: AddressRequest) => addressServices.createAddress(payload),

      onSuccess: () => {
         toast.success('Thêm địa chỉ thành công!')
         queryClient.invalidateQueries({ queryKey: ADDRESS_QUERY_KEY.all })
      }
   })

   // update mutations

   const updateMutation = useMutation({
      mutationFn: ({ id, payload }: { id: number; payload: AddressRequest }) =>
         addressServices.updateAddress(id, payload),

      onSuccess: () => {
         toast.success('Cập nhật địa chỉ thành công!')
         queryClient.invalidateQueries({ queryKey: ADDRESS_QUERY_KEY.all })
      }
   })

   // set default mutations
   const setDefaultMutation = useMutation({
      mutationFn: (id: number) => addressServices.setDefaultAddress(id),

      onMutate: async (id) => {
         await queryClient.cancelQueries({ queryKey: ADDRESS_QUERY_KEY.all })

         const previousData = queryClient.getQueryData<AddressResponse[]>(ADDRESS_QUERY_KEY.all)

         if (previousData) {
            queryClient.setQueryData<AddressResponse[]>(
               ADDRESS_QUERY_KEY.all,
               previousData.map((address) => ({
                  ...address,
                  is_default: address.id === id
               }))
            )
         }

         return { previousData }
      },

      onError: (_err, _variables, context) => {
         if (context?.previousData) {
            queryClient.setQueryData(ADDRESS_QUERY_KEY.all, context.previousData)
         }
      },

      onSettled: () => {
         toast.success('Thay đổi địa chỉ mặc định thành công!')
         queryClient.invalidateQueries({ queryKey: ADDRESS_QUERY_KEY.all })
      }
   })

   //   delete mutations

   const deleteMutation = useMutation({
      mutationFn: (id: number) => addressServices.deleteAddress(id),

      onSuccess: () => {
         toast.success('Xóa địa chỉ thành công!')
         queryClient.invalidateQueries({ queryKey: ADDRESS_QUERY_KEY.all })
      }
   })

   return {
      /* data */
      addresses: addresses || [],
      isLoading,
      isFetching,

      /* create */
      createAddress: createMutation.mutateAsync,
      isCreating: createMutation.isPending,

      /* update */
      updateAddress: updateMutation.mutateAsync,
      isUpdating: updateMutation.isPending,

      /* default */
      setDefaultAddress: setDefaultMutation.mutateAsync,
      isSettingDefault: setDefaultMutation.isPending,

      /* delete */
      deleteAddress: deleteMutation.mutateAsync,
      isDeleting: deleteMutation.isPending
   }
}
