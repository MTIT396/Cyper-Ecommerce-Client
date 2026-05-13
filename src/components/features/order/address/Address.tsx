'use client'

import Container from '@/components/Container'

import AddressItem from '@/components/features/order/address/AddressItem'
import AddressItemSkeleton from '@/components/features/order/address/AddressItemSkeleton'
import ProgressBar from '@/components/features/order/address/ProgressBar'

import BodyContent from '@/components/shared/BodyContent'
import Button from '@/components/shared/Button'
import AddressDialog from '@/components/shared/AddressDialog'
import FallbackExpired from '@/components/shared/FallbackExpired'

import { useAddressQuery } from '@/hooks/useAddressQuery'
import { useCartQuery } from '@/hooks/useCartQuery'

import { useCheckoutStore } from '@/store/checkout.store'

import { MapPinHouse, Plus } from 'lucide-react'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

const Address = () => {
   const router = useRouter()

   const { updateCheckout } = useCheckoutStore()

   const { cart } = useCartQuery()

   const [isOpen, setIsOpen] = useState(false)

   const [editId, setEditId] = useState<number | null>(null)

   const { addresses, isLoading } = useAddressQuery()

   const handleOpenDialog = () => {
      setEditId(null)
      setIsOpen(true)
   }

   const handleEdit = (id: number) => {
      setEditId(id)
      setIsOpen(true)
   }

   const handleCloseDialog = () => {
      setEditId(null)
      setIsOpen(false)
   }

   const defaultAddress = addresses.find((address) => address.is_default)

   const handleNext = (id: number) => {
      updateCheckout({
         addressId: id
      })

      router.push('/checkout/shipping')
   }

   if (!cart?.items.length) {
      return <FallbackExpired />
   }

   return (
      <Container>
         <BodyContent className='pb-10'>
            {/* Progress */}
            <ProgressBar step={1} className='py-6 sm:py-8' />

            {/* Header */}
            <div className='mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between'>
               <div>
                  <h1 className='text-xl font-semibold text-zinc-900 sm:text-2xl'>Chọn địa chỉ</h1>

                  <p className='mt-1 text-sm text-zinc-500'>
                     Chọn địa chỉ nhận hàng phù hợp cho đơn hàng của bạn.
                  </p>
               </div>

               {/* Add Address Desktop */}
               {!!addresses.length && (
                  <Button
                     onClick={handleOpenDialog}
                     variant='outline'
                     className='hidden h-11 rounded-xl border-zinc-300 px-5 text-sm font-medium shadow-none lg:flex'
                  >
                     <Plus className='size-4' />
                     Thêm địa chỉ
                  </Button>
               )}
            </div>

            {/* Address List */}
            <div className='space-y-4'>
               {isLoading
                  ? Array.from({
                       length: 3
                    }).map((_, i) => <AddressItemSkeleton key={i} />)
                  : addresses.map((address) => (
                       <AddressItem key={address.id} address={address} onEdit={handleEdit} />
                    ))}
            </div>

            {/* Empty State */}
            {!isLoading && !addresses.length && (
               <div className='flex min-h-[320px] flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50 px-6 text-center'>
                  <div className='flex size-16 items-center justify-center rounded-full bg-white shadow-sm'>
                     <MapPinHouse className='size-7 text-zinc-500' />
                  </div>

                  <h2 className='mt-5 text-lg font-semibold text-zinc-900 sm:text-xl'>
                     Chưa có địa chỉ giao hàng
                  </h2>

                  <p className='mt-2 max-w-md text-sm leading-6 text-zinc-500'>
                     Vui lòng thêm địa chỉ chính xác để việc giao hàng được thuận lợi hơn.
                  </p>

                  <Button
                     variant='secondary'
                     onClick={handleOpenDialog}
                     className='mt-6 rounded-xl px-5 text-sm font-semibold'
                  >
                     <Plus className='size-4' />
                     Thêm địa chỉ
                  </Button>
               </div>
            )}

            {/* Mobile Add Button */}
            {!!addresses.length && (
               <div className='mt-6 sm:hidden'>
                  <Button
                     onClick={handleOpenDialog}
                     variant='outline'
                     className='h-11 w-full rounded-xl border-dashed border-zinc-300 text-sm font-medium shadow-none'
                  >
                     <Plus className='size-4' />
                     Thêm địa chỉ mới
                  </Button>
               </div>
            )}

            {/* Dialog */}
            <AddressDialog editId={editId} isOpen={isOpen} onClose={handleCloseDialog} />

            {/* Footer Actions */}
            <div className='mt-8 flex flex-col-reverse gap-3 border-t border-zinc-100 pt-6 sm:mt-10 sm:flex-row sm:items-center sm:justify-end'>
               <Button
                  onClick={() => router.back()}
                  variant='outline'
                  className='h-11 rounded-xl px-6 text-sm font-medium sm:px-10'
               >
                  Trở về
               </Button>

               <Button
                  onClick={() => handleNext(defaultAddress?.id as number)}
                  variant='primary'
                  className='h-11 rounded-xl px-6 text-sm font-medium sm:px-10'
               >
                  Tiếp tục
               </Button>
            </div>
         </BodyContent>
      </Container>
   )
}

export default Address
