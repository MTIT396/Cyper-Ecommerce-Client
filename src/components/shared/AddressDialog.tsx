/* eslint-disable react-hooks/exhaustive-deps */
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod/v3'
import FormWrapper from './FormWrapper'
import TextFormField from './TextFormField'
import Button from './Button'
import { CircleUserRound, Loader2, Mail, MapPinHouse, Phone, Plus } from 'lucide-react'
import AddressSelections from '../features/order/address/AddressSelections'
import { useAddressQuery } from '@/hooks/useAddressQuery'
import { AddressRequest } from '@/types/address.type'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import { useEffect } from 'react'
import { FadeMotionWrapper } from './FadeMotionWrapper'
import { FadeMotionItem } from './FadeMotionItem'
import { FadeUpVariants } from '@/lib/variants'

interface AddressDialogProps {
   isOpen: boolean
   onClose: () => void
   editId: number | null
}

// schema
const AddressInfoSchema = z.object({
   full_name: z.string().min(6, 'Họ tên tối thiểu 6 ký tự'),
   phone: z
      .string()
      .min(9, 'Số điện thoại không hợp lệ')
      .regex(/^[0-9]+$/, 'Chỉ được nhập số'),
   email: z
      .string()
      .trim()
      .optional()
      .or(z.literal(''))
      .refine((val) => !val || z.string().email().safeParse(val).success, {
         message: 'Email không hợp lệ'
      }),
   province: z.string().min(1, 'Bắt buộc'),
   ward: z.string().min(1, 'Bắt buộc'),
   street: z.string().min(1, 'Bắt buộc'),
   is_default: z.boolean()
})

const defaultValues: AddressRequest = {
   full_name: '',
   phone: '',
   email: '',
   province: '',
   ward: '',
   street: '',
   is_default: false
}

const AddressDialog = ({ isOpen, onClose, editId }: AddressDialogProps) => {
   const { addresses, createAddress, isCreating, updateAddress, isUpdating } = useAddressQuery()
   const editingAddress = addresses.find((a) => a.id === editId)

   // edit mode
   const isEditMode = !!editId

   // use form
   const form = useForm<AddressRequest>({
      resolver: zodResolver(AddressInfoSchema),
      defaultValues
   })

   // reset form if it isn't edit mode
   useEffect(() => {
      if (isOpen && !isEditMode) {
         form.reset(defaultValues)
      }
   }, [isOpen, isEditMode])

   // edit mode fill form data
   useEffect(() => {
      if (!isOpen || !isEditMode) return

      if (!editingAddress) return

      form.reset(editingAddress)
   }, [isOpen, isEditMode, addresses])

   // other functions
   const handleSubmit = async (data: AddressRequest) => {
      try {
         if (isEditMode && editId) {
            console.log(data)
            await updateAddress({ id: editId, payload: data })
         } else {
            await createAddress(data)
         }
         onClose()
         form.reset()
      } catch (err) {
         console.error(err)
      }
   }

   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent>
            <DialogHeader>
               <DialogTitle className='flex items-center gap-2 border-b pb-3.5'>
                  {isEditMode ? 'Chỉnh sửa địa chỉ' : 'Thêm địa chỉ mới'}
               </DialogTitle>

               <FadeMotionWrapper mode='normal'>
                  <FormWrapper form={form} onSubmit={handleSubmit} className='mt-4 space-y-4'>
                     {/* Fullname + Phone Number */}
                     <FadeMotionItem variants={FadeUpVariants} delay={0.1}>
                        <div className='grid gap-3 sm:grid-cols-2'>
                           <TextFormField
                              name='full_name'
                              type='text'
                              label='Họ và tên'
                              placeholder='Họ và tên'
                              required
                              className='rounded-full'
                              leftAddon={<CircleUserRound />}
                           />
                           <TextFormField
                              name='phone'
                              type='tel'
                              label='Số điện thoại'
                              placeholder='Số điện thoại'
                              required
                              className='rounded-full'
                              leftAddon={<Phone />}
                           />
                        </div>
                     </FadeMotionItem>

                     {/* Email */}
                     <FadeMotionItem variants={FadeUpVariants} delay={0.2}>
                        <TextFormField
                           name='email'
                           type='email'
                           label='Email (Nếu có)'
                           placeholder='Email'
                           className='rounded-full'
                           leftAddon={<Mail />}
                        />
                     </FadeMotionItem>

                     {/* Province + Ward */}
                     <FadeMotionItem variants={FadeUpVariants} delay={0.3}>
                        <AddressSelections control={form.control} setValue={form.setValue} />
                     </FadeMotionItem>

                     {/* Street */}
                     <FadeMotionItem variants={FadeUpVariants} delay={0.4}>
                        <TextFormField
                           name='street'
                           type='tel'
                           label='Địa chỉ cụ thể'
                           placeholder='Địa chỉ cụ thể (số nhà, tên đường, ...)'
                           required
                           className='rounded-full'
                           leftAddon={<MapPinHouse />}
                        />
                     </FadeMotionItem>

                     {/* set default address checkbox */}
                     {!editingAddress?.is_default && (
                        <FadeMotionItem variants={FadeUpVariants} delay={0.5}>
                           <Controller
                              name='is_default'
                              control={form.control}
                              render={({ field }) => (
                                 <div className='relative flex items-center gap-2'>
                                    <Checkbox
                                       id='default-address'
                                       checked={field.value}
                                       onCheckedChange={field.onChange}
                                       className='border-dark-gray size-4 border-2'
                                    />
                                    <Label
                                       htmlFor='default-address'
                                       className='text-dark-gray cursor-pointer text-sm font-semibold'
                                    >
                                       Đặt làm địa chỉ mặc định
                                    </Label>
                                 </div>
                              )}
                           />
                        </FadeMotionItem>
                     )}

                     {/* Btn Add Address */}
                     <FadeMotionItem variants={FadeUpVariants} delay={0.55}>
                        <div className='flex justify-end gap-4'>
                           <Button disabled={isCreating || isUpdating} className='px-8 text-sm'>
                              {isCreating || isUpdating ? (
                                 <>
                                    <Loader2 size={20} className='animate-spin' />
                                    {isEditMode ? 'Đang lưu...' : 'Đang thêm...'}
                                 </>
                              ) : (
                                 <>
                                    {isEditMode ? (
                                       'Lưu thay đổi'
                                    ) : (
                                       <>
                                          <Plus size={18} />
                                          Thêm địa chỉ
                                       </>
                                    )}
                                 </>
                              )}
                           </Button>
                        </div>
                     </FadeMotionItem>
                  </FormWrapper>
               </FadeMotionWrapper>
            </DialogHeader>
         </DialogContent>
      </Dialog>
   )
}

export default AddressDialog
