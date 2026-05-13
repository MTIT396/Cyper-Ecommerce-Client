'use client'

import Button from '@/components/shared/Button'
import FormWrapper from '@/components/shared/FormWrapper'
import PasswordFormField from '@/components/shared/PasswordFormField'
import TextFormField from '@/components/shared/TextFormField'
import { Checkbox } from '@/components/ui/checkbox'
import { useAuthQuery } from '@/hooks/useAuthQuery'
import { RegisterRequest } from '@/types/auth.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Lock, Mail, User } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { FadeMotionWrapper } from '@/components/shared/FadeMotionWrapper'
import { FadeMotionItem } from '@/components/shared/FadeMotionItem'
import { FadeUpVariants } from '@/lib/variants'
import { Label } from '@/components/ui/label'

const registerSchema = z.object({
   email: z.string().email('Email không hợp lệ'),
   username: z.string().min(6, 'Tên người dùng phải có ít nhất 6 ký tự.'),
   password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự.')
})

export default function RegisterForm() {
   const [isAccepted, setIsAccepted] = useState<boolean>(false)
   const { register, isRegistering } = useAuthQuery()

   const form = useForm<RegisterRequest>({
      resolver: zodResolver(registerSchema)
   })

   const handleSubmit = (data: RegisterRequest) => {
      if (!isAccepted) {
         toast.error('Vui lòng chấp nhận chính sách của Cyper trước khi tiếp tục.', {
            id: 'policy-error'
         })
         return
      }
      // call register API
      register(data)
   }

   return (
      <div className='flex h-full items-center justify-center p-5 sm:p-8 lg:p-10'>
         <FadeMotionWrapper className='w-full max-w-md'>
            {/* HEADING */}
            <FadeMotionItem variants={FadeUpVariants} className='mb-6 text-center'>
               <div className='mb-4 flex justify-center lg:hidden'>
                  <Image
                     width={80}
                     height={80}
                     src='/Logo.png'
                     alt='Logo'
                     className='object-contain'
                  />
               </div>

               <h2 className='text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl'>
                  Đăng ký tài khoản
               </h2>

               <p className='mt-2 text-sm text-zinc-500'>
                  Tạo tài khoản mới nhanh chóng và dễ dàng
               </p>
            </FadeMotionItem>

            {/* FORM */}
            <FadeMotionWrapper mode='normal'>
               <FormWrapper form={form} onSubmit={handleSubmit} className='mt-4 space-y-4'>
                  {/* Email field */}
                  <FadeMotionItem variants={FadeUpVariants} delay={0.1}>
                     <TextFormField
                        name='email'
                        type='email'
                        label='Email'
                        placeholder='Nhập email của bạn'
                        required
                        className='rounded-2xl border-zinc-200 bg-zinc-50 px-4 text-sm transition-all focus:border-black focus:bg-white'
                        leftAddon={<Mail />}
                     />
                  </FadeMotionItem>

                  {/* Username field */}
                  <FadeMotionItem variants={FadeUpVariants} delay={0.2}>
                     <TextFormField
                        name='username'
                        type='text'
                        label='Họ và tên'
                        placeholder='Nhập họ và tên của bạn'
                        required
                        className='rounded-2xl border-zinc-200 bg-zinc-50 px-4 text-sm transition-all focus:border-black focus:bg-white'
                        leftAddon={<User />}
                     />
                  </FadeMotionItem>

                  {/* Password field */}
                  <FadeMotionItem variants={FadeUpVariants} delay={0.3}>
                     <PasswordFormField
                        name='password'
                        label='Mật khẩu'
                        placeholder='Nhập mật khẩu của bạn'
                        className='rounded-2xl border-zinc-200 bg-zinc-50 px-4 text-sm transition-all focus:border-black focus:bg-white'
                        required
                        leftAddon={<Lock />}
                     />
                  </FadeMotionItem>

                  {/* Terms & Conditions checkbox */}
                  <FadeMotionItem variants={FadeUpVariants} delay={0.4}>
                     <div className='flex items-center gap-x-2'>
                        <Checkbox
                           id='terms'
                           checked={isAccepted}
                           onCheckedChange={(v) => setIsAccepted(!!v)}
                           className='border-dark-gray size-4 border'
                        />
                        <Label
                           htmlFor='terms'
                           className='text-dark-gray inline cursor-pointer text-sm font-normal'
                        >
                           <span>Bằng cách tiếp tục, tôi đồng ý với </span>
                           <span className='font-semibold underline'>Điều khoản dịch vụ </span>
                           và
                           <span className='font-semibold underline'> Chính sách bảo mật</span> của
                           Cyper Store.
                        </Label>
                     </div>
                  </FadeMotionItem>

                  {/* Sign up button */}
                  <FadeMotionItem variants={FadeUpVariants} delay={0.5}>
                     <Button className='w-full rounded-full py-2.5' disabled={isRegistering}>
                        {isRegistering ? (
                           <div className='flex items-center gap-1.5'>
                              <Loader2 className='size-4 animate-spin' />
                              Đang tạo...
                           </div>
                        ) : (
                           'Tạo tài khoản'
                        )}
                     </Button>
                  </FadeMotionItem>
               </FormWrapper>
            </FadeMotionWrapper>
         </FadeMotionWrapper>
      </div>
   )
}
