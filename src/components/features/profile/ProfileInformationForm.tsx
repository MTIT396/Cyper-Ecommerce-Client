'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState, useRef } from 'react'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { userService } from '@/services/user.service'
import { useQueryClient } from '@tanstack/react-query'
import FormWrapper from '@/components/shared/FormWrapper'
import TextFormField from '@/components/shared/TextFormField'
import Button from '@/components/shared/Button'
import { Info, Upload, UserRoundCheck, X } from 'lucide-react'
import { FadeMotionWrapper } from '@/components/shared/FadeMotionWrapper'
import { FadeMotionItem } from '@/components/shared/FadeMotionItem'
import { FadeUpVariants } from '@/lib/variants'

const profileSchema = z.object({
   username: z.string().min(2, 'Username must be at least 2 characters').optional()
})

type ProfileFormValues = z.infer<typeof profileSchema>

interface ProfileInformationFormProps {
   defaultValues: {
      username?: string
      avatar?: string | null
   }
   onOpenChange: (open: boolean) => void
}

export function ProfileInformationForm({
   defaultValues,
   onOpenChange
}: ProfileInformationFormProps) {
   const [isLoading, setIsLoading] = useState(false)
   const [preview, setPreview] = useState<string | null>(null)
   const [selectedFile, setSelectedFile] = useState<File | null>(null)
   const fileInputRef = useRef<HTMLInputElement>(null)
   const queryClient = useQueryClient()

   const form = useForm<ProfileFormValues>({
      resolver: zodResolver(profileSchema),
      defaultValues: {
         username: defaultValues.username || ''
      }
   })

   const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (!file) return

      // Validate file type
      if (!file.type.startsWith('image/')) {
         toast.error('Vui lòng chọn một tệp hình ảnh.')
         return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
         toast.error('Kích thước tệp phải nhỏ hơn 5MB.')
         return
      }

      // Show preview
      const reader = new FileReader()
      reader.onload = (e) => {
         setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
      setSelectedFile(file)
   }

   const handleClearPreview = () => {
      setPreview(null)
      setSelectedFile(null)
      if (fileInputRef.current) {
         fileInputRef.current.value = ''
      }
   }

   const onSubmit = async (values: ProfileFormValues) => {
      // Check if at least one field is modified
      const hasUsernameChange = values.username !== (defaultValues.username || '')
      const hasAvatarChange = selectedFile !== null

      if (!hasUsernameChange && !hasAvatarChange) {
         toast.success('Không có thay đổi nào để lưu', {
            icon: <Info />
         })
         onOpenChange(false)
         return
      }

      setIsLoading(true)
      try {
         await userService.updateProfileWithAvatar({
            username: hasUsernameChange ? values.username : undefined,
            file: hasAvatarChange ? selectedFile : undefined
         })

         toast.success('Hồ sơ đã được cập nhật thành công.')
         queryClient.invalidateQueries({ queryKey: ['me'] })
         setPreview(null)
         setSelectedFile(null)
         if (fileInputRef.current) {
            fileInputRef.current.value = ''
         }
         onOpenChange(false)
      } catch (error: unknown) {
         const errorMessage = error instanceof Error ? error.message : 'Không thể cập nhật hồ sơ'
         toast.error(errorMessage)
      } finally {
         setIsLoading(false)
      }
   }

   const displayImage = preview || defaultValues.avatar
   const userName = defaultValues.username

   return (
      <FadeMotionWrapper mode='normal'>
         <FormWrapper form={form} onSubmit={onSubmit} className='space-y-8'>
            {/* Username Section */}
            <FadeMotionItem variants={FadeUpVariants} delay={0.1}>
               <div className='space-y-4'>
                  <h3 className='text-dark-gray flex items-center gap-2 border-b pb-2 text-xl font-semibold'>
                     <UserRoundCheck className='text-primary size-5' />
                     Cập nhật thông tin tài khoản
                  </h3>
                  <TextFormField
                     name='username'
                     label='Tên người dùng'
                     placeholder='Nhập tên của bạn'
                     className='rounded-full shadow-sm'
                  />
               </div>
            </FadeMotionItem>

            {/* Avatar Section */}
            <FadeMotionItem variants={FadeUpVariants} delay={0.2}>
               <div className='space-y-4'>
                  <h3 className='text-dark-gray text-sm font-semibold'>Ảnh đại diện</h3>

                  <div className='flex flex-col items-center space-y-4'>
                     {/* Avatar Display */}
                     <div className='ring-accent relative mb-10 size-32 overflow-hidden rounded-full ring-3 ring-offset-2'>
                        {displayImage ? (
                           <Image
                              src={displayImage}
                              alt={userName || 'Profile'}
                              fill
                              className='object-cover'
                           />
                        ) : (
                           <div className='flex size-full items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600'>
                              <span className='text-4xl font-bold text-white'>
                                 {userName?.charAt(0)?.toUpperCase() || 'U'}
                              </span>
                           </div>
                        )}
                     </div>

                     <div className='flex gap-4'>
                        <Button
                           type='button'
                           onClick={() => fileInputRef.current?.click()}
                           disabled={isLoading}
                           variant='outline'
                           className='bg-light-gray text-dark-gray rounded-full py-2 text-sm'
                        >
                           <Upload className='size-4' />
                           Tải ảnh lên
                        </Button>

                        {preview && (
                           <Button
                              type='button'
                              onClick={handleClearPreview}
                              disabled={isLoading}
                              variant='outline'
                              className='rounded-full border-0 py-2 text-sm text-red-500 shadow-none'
                           >
                              <X className='size-4' />
                              Hủy
                           </Button>
                        )}
                     </div>
                     {/* Upload Info */}
                     <div className='text-center'>
                        <p className='text-dark-gray text-sm'>Ảnh đại diện</p>
                        <p className='text-extra-gray text-xs leading-7'>JPG, PNG, GIF (Max 5MB)</p>
                     </div>
                  </div>

                  {/* Upload Button */}
                  <input
                     ref={fileInputRef}
                     type='file'
                     accept='image/*'
                     onChange={handleFileSelect}
                     disabled={isLoading}
                     className='hidden'
                  />
               </div>
            </FadeMotionItem>

            {/* Save Button */}
            <FadeMotionItem variants={FadeUpVariants} delay={0.3}>
               <Button
                  type='submit'
                  isLoading={isLoading}
                  disabled={isLoading}
                  loadingText='Đang tải...'
                  className='w-full py-3 text-sm'
               >
                  Lưu thay đổi
               </Button>
            </FadeMotionItem>
         </FormWrapper>
      </FadeMotionWrapper>
   )
}
