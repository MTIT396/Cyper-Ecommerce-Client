'use client'

import SelectionBox from '@/components/shared/SelectionBox'
import { Control, Controller, UseFormSetValue, useWatch } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import { AddressRequest } from '@/types/address.type'
import { fetchProvinces, fetchWards } from '@/components/api/location.api'
import { SelectTrigger, SelectValue } from '@/components/ui/select'

type AddressSelectionsProps = {
   isEdit: boolean
   control: Control<AddressRequest, unknown, AddressRequest>
   setValue: UseFormSetValue<AddressRequest>
   editingProvince?: string
}

const AddressSelections = ({
   isEdit,
   editingProvince,
   control,
   setValue
}: AddressSelectionsProps) => {
   // provinces query
   const { data: provinces = [], isLoading: provinceLoading } = useQuery({
      queryKey: ['provinces'],
      queryFn: fetchProvinces,
      staleTime: Infinity,
      gcTime: Infinity
   })

   const province = useWatch({ control, name: 'province' })

   const provinceCode = isEdit
      ? provinces.find((p) => p.label === editingProvince)?.value
      : provinces.find((p) => p.label === province)?.value

   // wards query
   const { data: wards = [], isLoading: wardLoading } = useQuery({
      queryKey: ['wards', provinceCode],
      queryFn: () => fetchWards(provinceCode!),
      enabled: !!provinceCode, //  fetch if exist province code
      staleTime: 1000 * 60 * 30,
      gcTime: 1000 * 60 * 30
   })

   return (
      <div className='grid gap-3 sm:grid-cols-2'>
         {/* Provinces */}
         <Controller
            control={control}
            name='province'
            render={({ field }) => (
               <SelectionBox
                  key={`province-${provinces.length}`}
                  value={provinces.find((p) => p.label === field.value)?.value || ''}
                  options={provinces}
                  header='Tỉnh/Thành phố'
                  placeholder={provinceLoading ? 'Đang tải...' : 'Chọn Tỉnh/Thành phố'}
                  onValueChange={(value) => {
                     const match = provinces.find((p) => p.value === value)
                     // save province as label to form
                     field.onChange(match?.label || '')
                     // reset ward when change province
                     setValue('ward', '')
                  }}
               >
                  <SelectTrigger className='hover:border-dark-gray border-extra-gray w-full flex-1 rounded-full py-5 transition'>
                     <SelectValue
                        placeholder={
                           !provinceCode
                              ? 'Chọn tỉnh trước'
                              : wardLoading
                                ? 'Đang tải...'
                                : 'Chọn Phường/Xã'
                        }
                     />
                  </SelectTrigger>
               </SelectionBox>
            )}
         />
         {/* Ward */}
         <Controller
            control={control}
            name='ward'
            render={({ field }) => {
               return (
                  <SelectionBox
                     key={`ward-${provinceCode}-${wards.length}`}
                     value={field.value || ''}
                     options={wards}
                     header='Phường/Xã'
                     disabled={!provinceCode || wardLoading}
                     onValueChange={field.onChange}
                  >
                     <SelectTrigger className='hover:border-dark-gray border-extra-gray w-full flex-1 rounded-full py-5 transition'>
                        <SelectValue
                           placeholder={
                              !provinceCode
                                 ? 'Chọn tỉnh trước'
                                 : wardLoading
                                   ? 'Đang tải...'
                                   : 'Chọn Phường/Xã'
                           }
                        />
                     </SelectTrigger>
                  </SelectionBox>
               )
            }}
         />
      </div>
   )
}

export default AddressSelections
