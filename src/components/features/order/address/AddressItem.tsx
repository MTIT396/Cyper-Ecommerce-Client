import Button from '@/components/shared/Button'
import ReminderBox from '@/components/shared/ReminderBox'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { useAddressQuery } from '@/hooks/useAddressQuery'
import { useCheckoutStore } from '@/store/checkout.store'
import { AddressResponse } from '@/types/address.type'
import { Check, MapPin, Pencil, Phone, X } from 'lucide-react'

type AddressItemProps = {
   address: AddressResponse
   onEdit: (id: number) => void
}

const AddressItem = ({ address, onEdit }: AddressItemProps) => {
   const { updateCheckout } = useCheckoutStore()
   const { setDefaultAddress, deleteAddress } = useAddressQuery()

   const handleSetDefaultAddress = () => {
      setDefaultAddress(address.id)
      updateCheckout({ addressId: address.id })
   }

   const handleDeleteAddress = () => {
      deleteAddress(address.id)
   }

   return (
      <div
         className={`${address.is_default ? 'ring-primary from-extra-gray/10 via-extra-gray/5 bg-linear-to-br to-transparent shadow-[0_4px_12px_rgba(100,100,100,0.15)] ring-[1.5px]' : 'bg-bg-gray'} relative flex items-center justify-between rounded-xl p-4 transition-all duration-200`}
      >
         <div className='flex gap-4'>
            <Checkbox
               checked={address.is_default}
               onCheckedChange={handleSetDefaultAddress}
               className='border-dark-gray size-5 rounded-full border-2'
            />
            <div className='flex flex-col gap-4'>
               <div className='flex items-center gap-2'>
                  <p className='text-dark-gray leading-none font-semibold'>{address.full_name}</p>
                  {address.is_default && (
                     <Badge className='border-green-500 bg-green-200 font-semibold text-green-800'>
                        <Check />
                        Mặc định
                     </Badge>
                  )}
               </div>
               <div className='space-y-2'>
                  <div className='flex items-center gap-2'>
                     <MapPin className='size-4' />
                     <p className='text-sm'>
                        {address.street}, {address.ward}, {address.province}
                     </p>
                  </div>
                  <div className='flex items-center gap-2'>
                     <Phone className='size-4' />
                     <p className='text-sm'>{address.phone}</p>
                  </div>
               </div>
            </div>
         </div>
         <div className='flex items-center gap-4'>
            <Button
               onClick={() => onEdit(address.id)}
               variant='icon'
               className='size-fit rounded-full p-2.5'
            >
               <Pencil size={18} />
            </Button>
            <ReminderBox onConfirm={handleDeleteAddress}>
               <Button
                  aria-label='remove-address-item'
                  variant='icon'
                  className='size-fit rounded-full p-2.5'
               >
                  <X size={18} />
               </Button>
            </ReminderBox>
         </div>
         {address.is_default && (
            <span className='bg-dark-gray absolute top-2 right-2 size-3 rounded-full' />
         )}
      </div>
   )
}

export default AddressItem
