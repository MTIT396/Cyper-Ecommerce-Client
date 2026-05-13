'use client'

import Button from '@/components/shared/Button'
import ReminderBox from '@/components/shared/ReminderBox'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'

import { useAddressQuery } from '@/hooks/useAddressQuery'
import { useCheckoutStore } from '@/store/checkout.store'

import { AddressResponse } from '@/types/address.type'

import { Check, MapPin, Pencil, Phone, Trash2 } from 'lucide-react'

type AddressItemProps = {
   address: AddressResponse
   onEdit: (id: number) => void
}

const AddressItem = ({ address, onEdit }: AddressItemProps) => {
   const { updateCheckout } = useCheckoutStore()

   const { setDefaultAddress, deleteAddress } = useAddressQuery()

   const handleSetDefaultAddress = () => {
      setDefaultAddress(address.id)

      updateCheckout({
         addressId: address.id
      })
   }

   const handleDeleteAddress = () => {
      deleteAddress(address.id)
   }

   return (
      <div
         className={`relative rounded-2xl border p-4 transition-all duration-300 sm:p-5 ${
            address.is_default
               ? 'border-primary/50 bg-light-gray/50 shadow-sm'
               : 'border-zinc-200 bg-white hover:border-zinc-300'
         }`}
      >
         <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
            {/* Left */}
            <div className='flex min-w-0 gap-3 sm:gap-4'>
               {/* Checkbox */}
               <div className='pt-1'>
                  <Checkbox
                     checked={address.is_default}
                     onCheckedChange={handleSetDefaultAddress}
                     className='size-5 rounded-full border-2'
                  />
               </div>

               {/* Content */}
               <div className='min-w-0 flex-1'>
                  {/* Header */}
                  <div className='flex flex-wrap items-center gap-2'>
                     <h3 className='text-sm font-semibold text-zinc-900 sm:text-base'>
                        {address.full_name}
                     </h3>

                     {address.is_default && (
                        <Badge className='rounded-full border-0 bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700 hover:bg-green-100'>
                           <Check className='mr-1 size-3.5' />
                           Mặc định
                        </Badge>
                     )}
                  </div>

                  {/* Address */}
                  <div className='mt-3 space-y-2'>
                     <div className='flex items-start gap-2 text-sm text-zinc-600'>
                        <MapPin className='mt-0.5 size-4 shrink-0' />

                        <p className='leading-6 break-words'>
                           {address.street}, {address.ward}, {address.province}
                        </p>
                     </div>

                     <div className='flex items-center gap-2 text-sm text-zinc-600'>
                        <Phone className='size-4 shrink-0' />

                        <p>{address.phone}</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Actions */}
            <div className='flex items-center justify-end gap-2 sm:justify-start'>
               {/* Edit */}
               <Button
                  onClick={() => onEdit(address.id)}
                  variant='icon'
                  className='size-9 rounded-full border border-zinc-200 bg-white p-0 text-zinc-600 shadow-none transition hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-900'
               >
                  <Pencil size={16} />
               </Button>

               {/* Delete */}
               <ReminderBox
                  title='Xóa địa chỉ'
                  desc='Bạn có chắc chắn muốn xóa địa chỉ này không?'
                  onConfirm={handleDeleteAddress}
               >
                  <Button
                     aria-label='remove-address-item'
                     variant='icon'
                     className='size-9 rounded-full border border-red-200 bg-red-50 p-0 text-red-500 shadow-none transition hover:border-red-300 hover:bg-red-100 hover:text-red-600'
                  >
                     <Trash2 size={16} />
                  </Button>
               </ReminderBox>
            </div>
         </div>
      </div>
   )
}

export default AddressItem
