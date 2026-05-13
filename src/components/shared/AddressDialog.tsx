/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect } from 'react'

import z from 'zod/v3'

import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog'

import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'

import Button from './Button'
import FormWrapper from './FormWrapper'
import TextFormField from './TextFormField'

import AddressSelections from '../features/order/address/AddressSelections'

import { FadeMotionWrapper } from './FadeMotionWrapper'
import { FadeMotionItem } from './FadeMotionItem'

import { FadeUpVariants } from '@/lib/variants'

import { useAddressQuery } from '@/hooks/useAddressQuery'

import { AddressRequest } from '@/types/address.type'

import { CircleUserRound, Loader2, Mail, MapPinHouse, Phone, Plus, X } from 'lucide-react'
import { DialogClose } from '@radix-ui/react-dialog'

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

   const isEditMode = !!editId

   // form
   const form = useForm<AddressRequest>({
      resolver: zodResolver(AddressInfoSchema),

      defaultValues
   })

   // reset create mode
   useEffect(() => {
      if (isOpen && !isEditMode) {
         form.reset(defaultValues)
      }
   }, [isOpen, isEditMode])

   // fill edit data
   useEffect(() => {
      if (!isOpen || !isEditMode) return

      if (!editingAddress) return

      form.reset(editingAddress)
   }, [isOpen, isEditMode, addresses])

   // submit
   const handleSubmit = async (data: AddressRequest) => {
      try {
         if (isEditMode && editId) {
            await updateAddress({
               id: editId,
               payload: data
            })
         } else {
            await createAddress(data)
         }

         onClose()

         form.reset()
      } catch (err) {
         console.error(err)
      }
   }

   const isLoading = isCreating || isUpdating

   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className='scrollbar max-h-[92vh] overflow-y-auto rounded-3xl border border-zinc-200 bg-white p-0 sm:max-w-2xl'>
            {/* Header */}
            <DialogHeader className='sticky top-0 z-20 border-b border-zinc-100 bg-white px-5 py-4 sm:px-6'>
               <div className='space-y-1'>
                  <DialogTitle className='text-left text-lg font-semibold text-zinc-900 sm:text-xl'>
                     {isEditMode ? 'Chỉnh sửa địa chỉ' : 'Thêm địa chỉ mới'}
                  </DialogTitle>

                  <DialogDescription className='text-left text-sm text-zinc-500'>
                     Điền đầy đủ thông tin để việc giao hàng được thuận lợi hơn.
                  </DialogDescription>
                  <DialogClose
                     className='hover:text-dark-gray absolute top-3 right-3 cursor-pointer transition'
                     asChild
                  >
                     <X className='size-4' />
                  </DialogClose>
               </div>
            </DialogHeader>

            {/* Body */}
            <div className='px-5 pt-4 pb-5 sm:px-6 sm:pb-6'>
               <FadeMotionWrapper mode='normal'>
                  <FormWrapper form={form} onSubmit={handleSubmit} className='space-y-5'>
                     {/* Full Name + Phone */}
                     <FadeMotionItem variants={FadeUpVariants} delay={0.1}>
                        <div className='grid gap-4 sm:grid-cols-2'>
                           <TextFormField
                              name='full_name'
                              type='text'
                              label='Họ và tên'
                              placeholder='Nguyễn Văn A'
                              required
                              className='h-12 rounded-2xl'
                              leftAddon={<CircleUserRound className='size-4.5' />}
                           />

                           <TextFormField
                              name='phone'
                              type='tel'
                              label='Số điện thoại'
                              placeholder='0123456789'
                              required
                              className='h-12 rounded-2xl'
                              leftAddon={<Phone className='size-4.5' />}
                           />
                        </div>
                     </FadeMotionItem>

                     {/* Email */}
                     <FadeMotionItem variants={FadeUpVariants} delay={0.2}>
                        <TextFormField
                           name='email'
                           type='email'
                           label='Email (Không bắt buộc)'
                           placeholder='example@gmail.com'
                           className='h-12 rounded-2xl'
                           leftAddon={<Mail className='size-4.5' />}
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
                           type='text'
                           label='Địa chỉ cụ thể'
                           placeholder='Số nhà, tên đường...'
                           required
                           className='h-12 rounded-2xl'
                           leftAddon={<MapPinHouse className='size-4.5' />}
                        />
                     </FadeMotionItem>

                     {/* Default Checkbox */}
                     {!editingAddress?.is_default && (
                        <FadeMotionItem variants={FadeUpVariants} delay={0.5}>
                           <Controller
                              name='is_default'
                              control={form.control}
                              render={({ field }) => (
                                 <div className='flex items-start gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-4'>
                                    <Checkbox
                                       id='default-address'
                                       checked={field.value}
                                       onCheckedChange={field.onChange}
                                       className='mt-0.5 size-5 rounded-md border-2 border-zinc-400'
                                    />

                                    <div className='space-y-1'>
                                       <Label
                                          htmlFor='default-address'
                                          className='cursor-pointer text-sm font-semibold text-zinc-900'
                                       >
                                          Đặt làm địa chỉ mặc định
                                       </Label>

                                       <p className='text-xs leading-5 text-zinc-500'>
                                          Địa chỉ này sẽ được ưu tiên sử dụng khi thanh toán.
                                       </p>
                                    </div>
                                 </div>
                              )}
                           />
                        </FadeMotionItem>
                     )}

                     {/* Footer */}
                     <FadeMotionItem variants={FadeUpVariants} delay={0.55}>
                        <div className='flex flex-col-reverse gap-3 border-t border-zinc-100 pt-5 sm:flex-row sm:justify-end'>
                           <Button
                              type='button'
                              variant='outline'
                              onClick={onClose}
                              className='h-11 rounded-2xl px-5 text-sm font-medium'
                           >
                              Hủy
                           </Button>

                           <Button
                              disabled={isLoading}
                              className='h-11 rounded-2xl px-5 text-sm font-medium'
                           >
                              {isLoading ? (
                                 <>
                                    <Loader2 className='size-4 animate-spin' />

                                    {isEditMode ? 'Đang lưu...' : 'Đang thêm...'}
                                 </>
                              ) : (
                                 <>
                                    {isEditMode ? (
                                       'Lưu thay đổi'
                                    ) : (
                                       <>
                                          <Plus className='size-4' />
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
            </div>
         </DialogContent>
      </Dialog>
   )
}

export default AddressDialog
