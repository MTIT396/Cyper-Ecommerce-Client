'use client'

import SelectionBox from '@/components/shared/SelectionBox'
import { Control, Controller, UseFormSetValue, useWatch } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import { AddressRequest } from '@/types/address.type'
import { fetchProvinces, fetchWards } from '@/components/api/location.api'
import { SelectTrigger, SelectValue } from '@/components/ui/select'

type AddressSelectionsProps = {
   control: Control<AddressRequest, unknown, AddressRequest>
   setValue: UseFormSetValue<AddressRequest>
}

const AddressSelections = ({ control, setValue }: AddressSelectionsProps) => {
   /* ================= PROVINCES ================= */

   const { data: provinces = [], isLoading: provinceLoading } = useQuery({
      queryKey: ['provinces'],
      queryFn: fetchProvinces,
      staleTime: Infinity,
      gcTime: Infinity
   })

   /* ================= WATCH FORM VALUES ================= */

   const province = useWatch({
      control,
      name: 'province'
   })

   /* ================= PROVINCE CODE ================= */

   const provinceCode = provinces.find((p) => p.label === province)?.value

   /* ================= WARDS ================= */

   const { data: wards = [], isLoading: wardLoading } = useQuery({
      queryKey: ['wards', provinceCode],
      queryFn: () => fetchWards(provinceCode!),
      enabled: !!provinceCode,
      staleTime: 1000 * 60 * 30,
      gcTime: 1000 * 60 * 30
   })

   return (
      <div className='grid gap-3 sm:grid-cols-2'>
         {/* ================= PROVINCE ================= */}
         <Controller
            control={control}
            name='province'
            render={({ field }) => (
               <SelectionBox
                  value={provinces.find((p) => p.label === field.value)?.value || ''}
                  options={provinces}
                  header='Tỉnh/Thành phố'
                  placeholder={provinceLoading ? 'Đang tải...' : 'Chọn Tỉnh/Thành phố'}
                  onValueChange={(value) => {
                     const selectedProvince = provinces.find((p) => p.value === value)

                     const newProvince = selectedProvince?.label || ''

                     // reset ward only if province changes
                     if (newProvince !== field.value) {
                        setValue('ward', '')
                     }

                     field.onChange(newProvince)
                  }}
               >
                  <SelectTrigger className='hover:border-dark-gray border-extra-gray w-full flex-1 rounded-full py-5 transition'>
                     <SelectValue
                        placeholder={provinceLoading ? 'Đang tải...' : 'Chọn Tỉnh/Thành phố'}
                     />
                  </SelectTrigger>
               </SelectionBox>
            )}
         />

         {/* ================= WARD ================= */}
         <Controller
            control={control}
            name='ward'
            render={({ field }) => (
               <SelectionBox
                  value={wards.find((w) => w.label === field.value)?.value || ''}
                  options={wards}
                  header='Phường/Xã'
                  disabled={!provinceCode || wardLoading}
                  onValueChange={(value) => {
                     const selectedWard = wards.find((w) => w.value === value)

                     field.onChange(selectedWard?.label || '')
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
      </div>
   )
}

export default AddressSelections
