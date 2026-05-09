'use client'
import Container from '@/components/Container'
import AddressItem from '@/components/features/order/address/AddressItem'
import AddressItemSkeleton from '@/components/features/order/address/AddressItemSkeleton'
import Button from '@/components/shared/Button'
import AddressDialog from '@/components/shared/AddressDialog'
import { useAddressQuery } from '@/hooks/useAddressQuery'
import { CirclePlus, MapPinHouse } from 'lucide-react'
import { useState } from 'react'
import ProgressBar from '@/components/features/order/address/ProgressBar'
import { useRouter } from 'next/navigation'
import { useCartQuery } from '@/hooks/useCartQuery'
import FallbackExpired from '@/components/shared/FallbackExpired'
import BodyContent from '@/components/shared/BodyContent'
import { useCheckoutStore } from '@/store/checkout.store'
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
      updateCheckout({ addressId: id })
      router.push('/checkout/shipping')
   }

   if (!cart?.items.length) {
      return <FallbackExpired />
   }
   return (
      <Container>
         <BodyContent>
            <ProgressBar step={1} className='py-6' />
            {/* Title */}
            <h1 className='text-dark-gray mb-8 text-lg font-semibold'>Chọn địa chỉ</h1>

            {/* Address Items */}
            <div className='flex flex-col gap-4'>
               {isLoading
                  ? Array.from({ length: 3 }).map((_, i) => <AddressItemSkeleton key={i} />)
                  : addresses.map((address) => (
                       <AddressItem key={address.id} address={address} onEdit={handleEdit} />
                    ))}
            </div>

            {!isLoading && !addresses.length && (
               <div className='flex min-h-80 w-full flex-col items-center justify-center'>
                  <h1 className='text-dark-gray flex items-center gap-2 text-2xl font-medium tracking-wide text-nowrap'>
                     <MapPinHouse size={20} className='shrink-0' />
                     Thêm địa chỉ khác để tiếp tục đặt hàng.
                  </h1>
                  <p className='text-dark-gray mt-2 font-light'>
                     Vui lòng nhập địa chỉ chính xác để việc giao hàng được thuận lợi nhất.
                  </p>
               </div>
            )}

            {/* Add New Address Btn */}
            <div className='mt-10 flex justify-center py-4'>
               <div className='relative w-full'>
                  <div className='absolute inset-0 flex items-center'>
                     <div className='w-full border-t-2 border-dotted border-gray-300'></div>
                  </div>
                  <div className='relative flex items-center justify-center'>
                     <Button
                        onClick={handleOpenDialog}
                        variant='icon'
                        className='bg-white font-semibold'
                     >
                        <CirclePlus size={22} />
                        Thêm địa chỉ mới
                     </Button>

                     <AddressDialog editId={editId} isOpen={isOpen} onClose={handleCloseDialog} />
                  </div>
               </div>
            </div>

            <div className='mt-10 mb-4 flex justify-end gap-2.5'>
               <Button
                  onClick={() => router.back()}
                  variant='outline'
                  className='w-fit px-16 py-3.5 text-sm'
               >
                  Trở về
               </Button>
               <Button
                  onClick={() => handleNext(defaultAddress?.id as number)}
                  variant='primary'
                  className='w-fit px-16 py-3.5 text-sm'
               >
                  Tiếp tục
               </Button>
            </div>
         </BodyContent>
      </Container>
   )
}

export default Address
