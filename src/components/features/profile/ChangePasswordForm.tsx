'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { userService } from '@/services/user.service'
import { useAuth } from '@/hooks/useAuth'
import FormWrapper from '@/components/shared/FormWrapper'
import PasswordFormField from '@/components/shared/PasswordFormField'
import Button from '@/components/shared/Button'
import { motion } from 'framer-motion'
import { FadeUpVariants } from '@/lib/variants'
import { FadeMotionItem } from '@/components/shared/FadeMotionItem'

// Schema that makes currentPassword optional

const changePasswordSchema = z
   .object({
      currentPassword: z.string(),
      newPassword: z.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự.'),
      confirmPassword: z.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự.')
   })
   .refine((data) => data.newPassword === data.confirmPassword, {
      message: 'Mật khẩu không khớp',
      path: ['confirmPassword']
   })

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>

export function ChangePasswordForm() {
   const [isLoading, setIsLoading] = useState(false)
   const { user } = useAuth()

   // Check if user is logged in with Google (has google_id)
   const isGoogleUser = !!user?.google_id

   // Create schema with conditional validation

   const schemaWithValidation = useMemo(() => {
      return changePasswordSchema.superRefine((data, ctx) => {
         if (!isGoogleUser) {
            if (!data.currentPassword) {
               ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: 'Vui lòng nhập mật khẩu hiện tại',
                  path: ['currentPassword']
               })
            }

            if (data.currentPassword === data.newPassword) {
               ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: 'Mật khẩu mới phải khác mật khẩu hiện tại',
                  path: ['newPassword']
               })
            }
         }
      })
   }, [isGoogleUser])

   const form = useForm<ChangePasswordFormValues>({
      resolver: zodResolver(schemaWithValidation),
      defaultValues: {
         currentPassword: '',
         newPassword: '',
         confirmPassword: ''
      }
   })

   const onSubmit = async (values: ChangePasswordFormValues) => {
      setIsLoading(true)
      try {
         const payload: {
            newPassword: string
            currentPassword?: string
         } = {
            newPassword: values.newPassword
         }

         if (!isGoogleUser) {
            payload.currentPassword = values.currentPassword
         }

         await userService.changePassword(payload)
         toast.success(
            isGoogleUser
               ? 'Đặt mật khẩu thành công! Giờ bạn có thể đăng nhập bằng email/mật khẩu.'
               : 'Đổi mật khẩu thành công'
         )
         form.reset()
      } catch (error: unknown) {
         const errorMessage = error instanceof Error ? error.message : 'Thất bại khi đổi mật khẩu'
         toast.error(errorMessage)
      } finally {
         setIsLoading(false)
      }
   }

   return (
      <FormWrapper form={form} onSubmit={onSubmit} className='max-w-lg space-y-4'>
         {/* Info banner for Google users - enhanced animation */}
         {isGoogleUser && (
            <FadeMotionItem
               variants={FadeUpVariants}
               className='shadow-full rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100 p-4'
            >
               <div className='flex items-start gap-3'>
                  <div className='text-lg'>🔗</div>
                  <div>
                     <p className='font-medium text-blue-900'>Liên kết tài khoản</p>
                     <p className='mt-1 text-sm text-blue-700'>
                        Bạn đang đăng nhập bằng Google. Đặt mật khẩu để có thể đăng nhập bằng
                        email/mật khẩu trên cùng 1 tài khoản.
                     </p>
                  </div>
               </div>
            </FadeMotionItem>
         )}

         {/* Current password field - smooth conditional animation */}
         {!isGoogleUser && (
            <motion.div
               initial={{ opacity: 0, height: 0 }}
               animate={{ opacity: 1, height: 'auto' }}
               exit={{ opacity: 0, height: 0 }}
               transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            >
               <PasswordFormField
                  name='currentPassword'
                  label='Mật khẩu hiện tại'
                  placeholder='Nhập mật khẩu hiện tại'
                  className='rounded-full'
               />
            </motion.div>
         )}

         {/* New password field - staggered fade in */}
         <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: 0.1 }}
         >
            <PasswordFormField
               name='newPassword'
               label='Mật khẩu mới'
               placeholder='Nhập mật khẩu mới'
               className='rounded-full'
            />
         </motion.div>

         {/* Confirm password field - further staggered */}
         <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: 0.2 }}
         >
            <PasswordFormField
               name='confirmPassword'
               label='Xác nhận mật khẩu'
               placeholder='Xác nhận mật khẩu mới'
               className='rounded-full'
            />
         </motion.div>

         {/* Submit button with adaptive text */}
         <motion.div
            className='pt-2'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
         >
            <Button
               isLoading={isLoading}
               disabled={isLoading}
               loadingText='Đang xử lý...'
               className='w-full py-2.5 text-sm transition-all duration-300'
            >
               {isGoogleUser ? '🔗 Đặt mật khẩu & Liên kết tài khoản' : 'Đổi mật khẩu'}
            </Button>
         </motion.div>
      </FormWrapper>
   )
}
