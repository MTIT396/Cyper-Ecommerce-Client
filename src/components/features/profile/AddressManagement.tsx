'use client'

import { useState } from 'react'
import Button from '@/components/shared/Button'
import AddressDialog from '@/components/shared/AddressDialog'
import AddressItem from '@/components/features/order/address/AddressItem'
import { useAddressQuery } from '@/hooks/useAddressQuery'
import { MapPinHouse, Plus } from 'lucide-react'

interface AddressManagementProps {
   headerless?: boolean
}

export function AddressManagement({ headerless = false }: AddressManagementProps) {
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

   const content = (
      <>
         {/* Address List */}
         <div className='space-y-4'>
            {isLoading ? (
               <div className='flex items-center justify-center py-8'>
                  <p className='text-gray-500'>Loading addresses...</p>
               </div>
            ) : addresses.length > 0 ? (
               addresses.map((address) => (
                  <AddressItem key={address.id} address={address} onEdit={handleEdit} />
               ))
            ) : (
               <div className='flex min-h-40 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 py-8'>
                  <MapPinHouse size={32} className='mb-3 text-gray-400' />
                  <p className='text-dark-gray text-center font-medium'>Chưa có địa chỉ nào.</p>
                  <p className='text-center text-sm text-gray-500'>
                     Thêm địa chỉ để việc giao hàng trở nên dễ dàng
                  </p>
               </div>
            )}
         </div>

         {/* Address Dialog */}
         <AddressDialog editId={editId} isOpen={isOpen} onClose={handleCloseDialog} />
      </>
   )

   if (headerless) {
      return content
   }

   return (
      <div>
         <div className='mb-6 flex items-center justify-between'>
            <h2 className='text-2xl font-semibold'>Địa chỉ đã lưu</h2>
            {/* Add New Address Button */}
            <Button
               onClick={handleOpenDialog}
               variant='icon'
               className='w-fit py-2.5 font-semibold text-red-600 hover:text-red-500'
            >
               <Plus className='size-4' />
               Thêm địa chỉ
            </Button>
         </div>

         {content}
      </div>
   )
}
